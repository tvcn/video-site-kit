// Search regression test: aliases, full English names, platform old names, typo tolerance.
// Usage: node qa-search.mjs
const pageUrl = 'file:///C:/Users/chenhua/Desktop/tvcn/v2/prototype/tvcn-ui-v2.html';

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
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ' :: ' + expression.slice(0, 120));
  return result.result.value;
}
let failures = 0;
let totalChecks = 0;
function check(name, ok, detail) {
  totalChecks += 1;
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail === undefined ? '' : ' ' + JSON.stringify(detail)}`);
}

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 1000, screenOrientation: { type: 'landscapePrimary', angle: 0 } });
await send('Page.navigate', { url: pageUrl });
await sleep(1200);
await evaluate(`localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light'); location.reload();`);
await sleep(1400);
await evaluate(`location.hash = '#/search';`);
await sleep(500);

const shell = await evaluate(`(() => {
  const status = document.getElementById('searchStatus');
  return {
    input: Boolean(document.getElementById('searchInput')),
    inputName: document.getElementById('searchInput') && document.getElementById('searchInput').getAttribute('aria-label'),
    statusRole: status && status.getAttribute('role'),
    statusLive: status && status.getAttribute('aria-live')
  };
})()`);
check('search shell/status', shell.input && shell.inputName && shell.statusRole === 'status' && shell.statusLive === 'polite', shell);

const cases = [
  ['final cut pro', 'nle-compare', '英文全称 Final Cut Pro'],
  ['FCPX', 'nle-compare', '旧写 FCPX'],
  ['Adobe Premiere Pro', 'nle-compare', '英文全称 Premiere Pro'],
  ['DaVinci Resolve', 'davinci-node', '英文全称 DaVinci Resolve'],
  ['Sony Alpha 7 IV', 'mirrorless-video', '英文全称 Sony Alpha 7 IV'],
  ['Canon EOS R5', 'camera-choice', '英文全称 Canon EOS R5'],
  ['Adobe After Effects', 'keying', '英文全称 After Effects'],
  ['ElevenLabs', 'ai-tts', '英文全称 ElevenLabs'],
  ['Premire', 'nle-compare', '错字 Premire'],
  ['达分奇', 'davinci-node', '错字 达分奇'],
  ['Capcutt', 'capcut-subtitle', '错字 Capcutt'],
  ['Resolv', 'davinci-node', '错字 Resolv'],
  ['Musical.ly', 'platform-rules', '平台旧名 Musical.ly'],
  ['bilibili', 'platform-rules', '平台旧名 bilibili'],
  ['WeChat Channels', 'platform-rules', '平台旧名 WeChat Channels'],
  ['YouTube Shorts', 'platform-rules', '平台旧名 YouTube Shorts'],
  ['Instagram Reels', 'platform-rules', '平台旧名 Instagram Reels'],
  ['Kling AI', 'ai-video-tool', '英文全称 Kling AI'],
  ['抖音 B站 视频号', 'platform-rules', '多平台词'],
  ['Twitter', 'platform-rules', '平台旧名 Twitter'],
  ['小红书', 'platform-rules', '平台旧名 小红书'],
  ['通告单', '#/templates', '模板 通告单'],
  ['AI 提示表', '#/templates', '模板 AI 提示表'],
  ['编辑标准', '#/trust/standards', '信任页 编辑标准'],
  ['更正与反馈', '#/trust/corrections', '信任页 更正与反馈'],
  ['使用条款', '#/trust/terms', '信任页 使用条款'],
  ['结构演示', '#/structures', '结构演示页']
];
for (const [query, expected, label] of cases) {
  const row = await evaluate(`(() => {
    setSearch(${JSON.stringify(query)});
    const links = [...document.querySelectorAll('#searchResults .search-result')].map((a) => a.getAttribute('href'));
    const status = document.getElementById('searchStatus').textContent;
    return { count: links.length, links, status };
  })()`);
  const hit = row.links.some((href) => href.includes(expected));
  check(`${label} -> ${expected}`, hit && row.count > 0 && row.count < 120, { count: row.count, found: row.links.slice(0, 6), status: row.status });
}

const topCases = [
  ['小红书', 'platform-rules', '平台词 Top1 小红书'],
  ['抖音', 'platform-rules', '平台词 Top1 抖音'],
  ['B站', 'platform-rules', '平台词 Top1 B站'],
  ['视频号', 'platform-rules', '平台词 Top1 视频号'],
  ['调色', 'color', '主题词 Top1 调色'],
  ['三幕', 'three-act', '主题词 Top1 三幕']
];
for (const [query, expected, label] of topCases) {
  const row = await evaluate(`(() => {
    setSearch(${JSON.stringify(query)});
    const links = [...document.querySelectorAll('#searchResults .search-result')].map((a) => a.getAttribute('href'));
    return { count: links.length, first: links[0] || '', links, unique: new Set(links).size };
  })()`);
  check(label, row.first.includes(expected) && row.unique === row.count, { count: row.count, first: row.first, unique: row.unique });
}

const empty = await evaluate(`(() => {
  setSearch('zzzz-no-such-tvcn-topic');
  return { count: document.querySelectorAll('#searchResults .search-result').length, empty: Boolean(document.querySelector('#searchResults .empty')), status: document.getElementById('searchStatus').textContent };
})()`);
check('no-result state', empty.count === 0 && empty.empty && empty.status.includes('0'), empty);

const restored = await evaluate(`(() => {
  setSearch('fcp');
  return { count: document.querySelectorAll('#searchResults .search-result').length };
})()`);
check('query can be changed back', restored.count > 0, restored);

console.log(`\n${failures === 0 ? 'SEARCH CHECKS OK' : failures + ' SEARCH CHECK(S) FAILED'} (${totalChecks} checks)`);
ws.close();
if (failures) process.exitCode = 1;
