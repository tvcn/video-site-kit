// Smoke-test every route in the local prototype through Chrome DevTools Protocol.
// Usage: node qa-routes.mjs
const pageUrl = 'file:///C:/Users/chenhua/Desktop/tvcn/v2/prototype/tvcn-ui-v2.html';
const sites = ['story', 'shoot', 'post', 'ai', 'animation', 'formats', 'tools', 'context'];
const articles = [];
const cases = [];
const paths = ['first-film', 'live-film', 'story', 'post', 'history', 'literacy', 'producing', 'distribution', 'career'];
const formats = ['talking-head', 'vlog', 'product-ad', 'brand-film', 'documentary', 'news', 'tutorial', 'short-drama', 'music-video', 'wedding', 'event', 'interview', 'experimental'];
const howtos = ['phone-footage', 'three-point-light', 'lavalier', 'davinci-export', 'capcut-subtitle', 'character-sheet'];

const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const page = targets.find((t) => t.type === 'page');
if (!page) throw new Error('No page target found on port 9222');

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
function send(method, params = {}) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 1000, screenOrientation: { type: 'landscapePrimary', angle: 0 } });
await send('Page.navigate', { url: pageUrl });
await sleep(900);
await send('Runtime.evaluate', { expression: `localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light'); location.reload();` });
await sleep(900);

const articleResult = await send('Runtime.evaluate', { expression: `JSON.stringify(ARTICLES.map((item) => item.id))`, returnByValue: true });
articles.push(...JSON.parse(articleResult.result.value));
const caseResult = await send('Runtime.evaluate', { expression: `JSON.stringify(CASES.map((item) => item.id))`, returnByValue: true });
cases.push(...JSON.parse(caseResult.result.value));
const routes = [
  ['home', '#/'],
  ['methods', '#/methods'],
  ['paths', '#/paths'],
  ['articles', '#/articles'],
  ['sites', '#/sites'],
  ['tools', '#/tools'],
  ['formats', '#/formats'],
  ['cases', '#/cases'],
  ...cases.map((id) => ['case:' + id, '#/case/' + id]),
  ['howtos', '#/howtos'],
  ['progress', '#/progress'],
  ['search', '#/search'],
  ['templates', '#/templates'],
  ['trust', '#/trust'],
  ['trust:standards', '#/trust/standards'],
  ['trust:sources', '#/trust/sources'],
  ['trust:corrections', '#/trust/corrections'],
  ['trust:privacy', '#/trust/privacy'],
  ['trust:license', '#/trust/license'],
  ['trust:terms', '#/trust/terms'],
  ['structures', '#/structures'],
  ...sites.map((id) => ['site:' + id, '#/site/' + id]),
  ...articles.map((id) => ['article:' + id, '#/article/' + id]),
  ...paths.map((id) => ['path:' + id, '#/path/' + id]),
  ...formats.map((id) => ['format:' + id, '#/format/' + id]),
  ...howtos.map((id) => ['howto:' + id, '#/howto/' + id]),
];

let failures = 0;
for (const [name, route] of routes) {
  await send('Runtime.evaluate', { expression: `location.hash = ${JSON.stringify(route)};` });
  await sleep(180);
  const result = await send('Runtime.evaluate', {
    expression: `(() => {
      const main = document.getElementById('main');
      const h1 = document.querySelector('#main h1')?.innerText || '';
      const text = main?.innerText || '';
      return JSON.stringify({
        name: ${JSON.stringify(name)},
        h1,
        articleCards: document.querySelectorAll('#main .article-card').length,
        nodeCards: document.querySelectorAll('#main .node-card').length,
        siteCards: document.querySelectorAll('#main .site-card').length,
        empty: text.length < 30,
        overflow: document.documentElement.scrollWidth - innerWidth,
        notFound: h1.includes('404') || text.includes('正在迁移')
      });
    })()`,
    returnByValue: true,
  });
  const row = JSON.parse(result.result.value);
  const fail = row.empty || row.overflow > 1 || row.notFound || (name.startsWith('site:') && row.articleCards === 0) || (name.startsWith('path:') && row.nodeCards === 0) || ((name.startsWith('article:') || name.startsWith('format:') || name.startsWith('howto:') || name.startsWith('case:')) && row.h1.length === 0);
  if (fail) failures += 1;
  console.log(`${fail ? 'FAIL' : 'OK  '} ${name.padEnd(22)} h1=${row.h1.slice(0, 30).replace(/\n/g, ' ')} cards=${row.articleCards} nodes=${row.nodeCards} overflow=${row.overflow}`);
}
console.log(`\n${failures === 0 ? 'ALL ROUTES OK' : failures + ' ROUTE(S) FAILED'} (${routes.length} routes)`);
ws.close();
if (failures) process.exitCode = 1;
