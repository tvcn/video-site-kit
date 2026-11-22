// Accessibility-tree smoke audit for key routes and the article filter.
// Usage: node scripts/qa-ax.mjs (Chrome with --remote-debugging-port=9222)
const PAGE = 'file:///C:/Users/chenhua/Desktop/tvcn/v2/prototype/tvcn-ui-v2.html';
const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const page = targets.find((item) => item.type === 'page');
if (!page) throw new Error('No page target on port 9222');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let sequence = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
});
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});
const send = (method, params = {}) => {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await send('Page.enable');
await send('Runtime.enable');
await send('Accessibility.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false,
  screenWidth: 1440, screenHeight: 1000,
  screenOrientation: { type: 'landscapePrimary', angle: 0 }
});

const INTERACTIVE = new Set(['button', 'link', 'checkbox', 'radio', 'textbox', 'searchbox', 'combobox', 'switch', 'slider', 'menuitem', 'option', 'tab']);

async function audit(label, route, prepare) {
  await send('Page.navigate', { url: PAGE + route });
  await sleep(850);
  if (prepare) {
    await send('Runtime.evaluate', { expression: `localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light'); ${prepare}` });
    await sleep(450);
  }
  const tree = await send('Accessibility.getFullAXTree');
  const visible = tree.nodes.filter((node) => !node.ignored);
  const unnamed = [];
  const emptyImages = [];
  const emptyHeadings = [];
  let interactive = 0;
  for (const node of visible) {
    const role = node.role?.value || '';
    const name = (node.name?.value || '').trim();
    if (INTERACTIVE.has(role)) {
      interactive += 1;
      if (!name) unnamed.push(`${role} @ ${node.backendDOMNodeId}`);
    }
    if (role === 'image' || role === 'img') {
      if (!name) emptyImages.push(`${role} @ ${node.backendDOMNodeId}`);
    }
    if (role === 'heading' && !name) emptyHeadings.push(`heading @ ${node.backendDOMNodeId}`);
  }
  const state = await send('Runtime.evaluate', {
    expression: `JSON.stringify({ h1: document.querySelectorAll('h1').length, title: document.title, active: [...document.querySelectorAll('.filter-chip.is-active')].map((b) => b.innerText.trim()).join(' / '), count: document.getElementById('articleCount')?.textContent || '' })`,
    returnByValue: true
  });
  const info = JSON.parse(state.result.value);
  const summary = { label, route, interactive, unnamed: unnamed.length, emptyImages: emptyImages.length, emptyHeadings: emptyHeadings.length, ...info };
  console.log((unnamed.length || emptyImages.length || emptyHeadings.length) ? 'FAIL' : 'PASS', JSON.stringify(summary));
  if (unnamed.length) console.log('  unnamed', unnamed.slice(0, 8).join(', '));
  if (emptyImages.length) console.log('  emptyImages', emptyImages.slice(0, 8).join(', '));
  if (emptyHeadings.length) console.log('  emptyHeadings', emptyHeadings.slice(0, 8).join(', '));
  return { summary, unnamed, emptyImages, emptyHeadings };
}

const results = [];
results.push(await audit('home', '#/'));
results.push(await audit('articles-all', '#/articles', `clearArticleFilters();`));
results.push(await audit('articles-filtered', '#/articles?site=story&depth=deep', ``));
results.push(await audit('article-copyright', '#/article/copyright', ``));
results.push(await audit('site-story', '#/site/story', ``));
results.push(await audit('search-platform', '#/search?q=' + encodeURIComponent('小红书'), ``));
results.push(await audit('tools', '#/tools', ``));
results.push(await audit('progress', '#/progress', ``));
results.push(await audit('glossary', '#/glossary', ``));
results.push(await audit('templates', '#/templates', ``));
results.push(await audit('trust-standards', '#/trust/standards', ``));
results.push(await audit('structures', '#/structures', ``));

const bad = results.filter((item) => item.unnamed.length || item.emptyImages.length || item.emptyHeadings.length);
if (bad.length) {
  console.error(`AX CHECKS FAILED (${bad.length} route(s))`);
  process.exit(1);
}
console.log(`AX CHECKS OK (${results.length} routes)`);
ws.close();
