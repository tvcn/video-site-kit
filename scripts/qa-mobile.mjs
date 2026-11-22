// Mobile overflow smoke-test for the pages added in the final gap pass.
const pageUrl = 'file:///C:/Users/chenhua/Desktop/tvcn/v2/prototype/tvcn-ui-v2.html';
const routes = [
  '#/', '#/templates', '#/trust', '#/trust/standards', '#/trust/privacy', '#/trust/license', '#/structures',
  '#/format/talking-head', '#/article/vertical-talk', '#/search', '#/progress',
  '#/article/talking-head-breakdown', '#/article/product-ad-breakdown', '#/article/documentary-breakdown',
  '#/article/brand-film-breakdown', '#/article/short-drama-breakdown', '#/article/vlog-breakdown',
  '#/article/news-breakdown', '#/article/tutorial-breakdown', '#/article/music-video-breakdown',
  '#/article/wedding-breakdown', '#/article/event-breakdown', '#/article/interview-breakdown',
  '#/article/experimental-breakdown'
];

const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const page = targets.find((t) => t.type === 'page');
if (!page) throw new Error('No page target found on port 9222');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
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
  const callId = ++id;
  return new Promise((resolve, reject) => {
    pending.set(callId, { resolve, reject });
    ws.send(JSON.stringify({ id: callId, method, params }));
  });
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 390, screenHeight: 844, screenOrientation: { type: 'portraitPrimary', angle: 0 } });
await send('Page.navigate', { url: pageUrl });
await sleep(1200);
await send('Runtime.evaluate', { expression: `localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light');` });
await send('Page.reload', { ignoreCache: true });
await sleep(1500);

let failures = 0;
let checks = 0;
function check(label, ok, detail) {
  checks += 1;
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`, detail);
}
for (const route of routes) {
  await send('Runtime.evaluate', { expression: `location.hash = ${JSON.stringify(route)};` });
  await sleep(350);
  const result = await send('Runtime.evaluate', {
    expression: `(() => ({ h1: document.querySelectorAll('#main h1').length, innerWidth, scrollWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth, title: document.querySelector('#main h1')?.innerText || '' }))()`,
    returnByValue: true,
  });
  const row = result.result.value;
  check(`mobile ${route}`, row.h1 === 1 && row.scrollWidth <= row.innerWidth + 1 && row.bodyWidth <= row.innerWidth + 1, row);
}
console.log(`\n${failures === 0 ? 'MOBILE CHECKS OK' : failures + ' MOBILE CHECK(S) FAILED'} (${checks} checks)`);
ws.close();
if (failures) process.exitCode = 1;
