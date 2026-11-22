// Capture a true mobile viewport through Chrome DevTools Protocol.
// Usage: node capture-ui.mjs <width> <height> <output.png> [light|dark] [zh|en] [route] [action]
import fs from 'node:fs';

const width = Number(process.argv[2] || 390);
const height = Number(process.argv[3] || 844);
const output = process.argv[4] || 'capture.png';
const theme = process.argv[5] || 'light';
const lang = process.argv[6] || 'zh';
const route = process.argv[7] || '';
const action = process.argv[8] || '';
const viewportMode = process.argv[9] || (width <= 500 ? 'mobile' : 'desktop');
const mobile = viewportMode === 'mobile';
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

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: 1,
  mobile,
  screenWidth: width,
  screenHeight: height,
  screenOrientation: { type: mobile ? 'portraitPrimary' : 'landscapePrimary', angle: mobile ? 0 : 90 },
});
await send('Emulation.setScrollbarsHidden', { hidden: true });
await send('Page.navigate', { url: pageUrl });
await sleep(1200);

await send('Runtime.evaluate', {
  expression: `localStorage.setItem('tvcn.theme', ${JSON.stringify(theme)}); localStorage.setItem('tvcn.lang', ${JSON.stringify(lang)}); document.cookie='theme=${theme}; path=/; max-age=31536000'; document.cookie='lang=${lang}; path=/; max-age=31536000'; location.reload();`,
});
await sleep(1500);

if (route) {
  await send('Runtime.evaluate', { expression: `location.hash = ${JSON.stringify(route)};` });
  await sleep(800);
}

if (action === 'menu') {
  await send('Runtime.evaluate', { expression: `document.getElementById('menuBtn').click();` });
  await sleep(500);
}

if (action === 'switcher') {
  await send('Runtime.evaluate', { expression: `document.querySelector('details.site-switcher').open = true;` });
  await sleep(400);
}

if (action === 'test') {
  await send('Runtime.evaluate', { expression: `(() => { const test = document.querySelector('.tool-test'); if (test) test.open = true; const card = test?.closest('.tool-card'); if (card) card.scrollIntoView({ block: 'start' }); return card ? card.getBoundingClientRect().top : -1; })()` });
  await sleep(1800);
}

if (action === 'diagram') {
  await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('#main .diagram'); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 150; window.scrollTo(0, Math.round(top)); } })()` });
  await sleep(500);
}

if (action === 'sketch') {
  await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('#main .case-sketch-board'); if (el) el.scrollIntoView({ block: 'start' }); return el ? el.getBoundingClientRect().top : -1; })()` });
  await sleep(1800);
}

if (action === 'phone') {
  await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('#main .case-phone-plan'); if (el) el.scrollIntoView({ block: 'start' }); return el ? el.getBoundingClientRect().top : -1; })()` });
  await sleep(1800);
}

if (action === 'steps') {
  await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('#main .site-map'); if (el) el.scrollIntoView({ block: 'start' }); return el ? el.getBoundingClientRect().top : -1; })()` });
  await sleep(1800);
}

if (action === 'progress-check') {
  await send('Runtime.evaluate', { expression: `(() => { const input = document.querySelector('#main .site-map-pass input'); if (input && !input.checked) input.click(); return Boolean(input); })()` });
  await sleep(1000);
  await send('Runtime.evaluate', { expression: `location.hash = '#/progress';` });
  await sleep(1800);
}

if (action === 'tools-audio-top') {
  await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('#main .tool-media-grid'); if (el) window.scrollTo(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 120)); return Boolean(el); })()` });
  await sleep(700);
}

if (action === 'tools-audio') {
  await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('#main .tool-media-grid'); if (el) window.scrollTo(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 120)); const btn = document.querySelector('#main [data-media-play="tool-camera-choice"]'); if (btn) btn.click(); return Boolean(btn); })()`, userGesture: true });
  await sleep(1400);
}

if (action === 'demo') {
  await send('Runtime.evaluate', { expression: `(() => { const wrap = document.querySelector('#main .structure-card'); if (wrap) wrap.scrollIntoView({ block: 'start' }); const btn = document.querySelector('#main .structure-play'); if (btn) btn.click(); return Boolean(btn); })()` });
  await sleep(1300);
}

if (action === 'template-card') {
  await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('#main .template-card'); if (el) el.scrollIntoView({ block: 'start' }); return el ? el.getBoundingClientRect().top : -1; })()` });
  await sleep(700);
}

if (action === 'trust-body') {
  await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('#main .trust-body'); if (el) el.scrollIntoView({ block: 'start' }); return el ? el.getBoundingClientRect().top : -1; })()` });
  await sleep(700);
}

if (action === 'rewrite') {
  await send('Runtime.evaluate', { expression: `(() => { const sections = document.querySelectorAll('#main .article-body section'); const el = sections[2]; if (el) window.scrollTo(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 90)); return el ? el.getBoundingClientRect().top : -1; })()` });
  await sleep(700);
}

if (action.startsWith('scroll')) {
  const ratio = Number(action.split(':')[1] || 0.35);
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, Math.round(document.body.scrollHeight * ${ratio}));` });
  await sleep(500);
}

const metrics = await send('Runtime.evaluate', {
  expression: `(() => {
    const box = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { x: Math.round(rect.x), width: Math.round(rect.width), right: Math.round(rect.right) };
    };
    return JSON.stringify({
      innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      wrap: box('.wrap'),
      headerInner: box('.header-inner'),
      actions: box('.header-actions'),
      lead: box('.hero-lead'),
      leadScrollWidth: document.querySelector('.hero-lead')?.scrollWidth,
      tabbar: box('.tabbar'),
      langButton: box('#langBtn'),
      themeButton: box('#themeBtn'),
      menuButton: box('#menuBtn'),
    });
  })()`,
  returnByValue: true,
});
console.log(metrics.result.value);

const shot = await send('Page.captureScreenshot', {
  format: 'png',
  fromSurface: true,
  captureBeyondViewport: false,
});
fs.writeFileSync(output, Buffer.from(shot.data, 'base64'));
console.log(`Wrote ${output}`);
if (action === 'progress-check') {
  await send('Runtime.evaluate', { expression: `localStorage.removeItem('tvcn.v2.siteProgress');` });
}
ws.close();
