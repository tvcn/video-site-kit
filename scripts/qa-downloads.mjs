// Click every template download button and verify the files land on disk.
import fs from 'node:fs';
import path from 'node:path';

const pageUrl = 'file:///C:/Users/chenhua/Desktop/tvcn/v2/prototype/tvcn-ui-v2.html';
const downloadDir = 'C:/Users/chenhua/Desktop/tvcn/build/downloads';
fs.rmSync(downloadDir, { recursive: true, force: true });
fs.mkdirSync(downloadDir, { recursive: true });

const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const page = targets.find((t) => t.type === 'page');
if (!page) throw new Error('No page target found on port 9222');

function connect(url) {
  const socket = new WebSocket(url);
  let id = 0;
  const calls = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && calls.has(message.id)) {
      const { resolve, reject } = calls.get(message.id);
      calls.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  });
  const ready = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  const send = async (method, params = {}) => {
    await ready;
    const callId = ++id;
    return new Promise((resolve, reject) => {
      calls.set(callId, { resolve, reject });
      socket.send(JSON.stringify({ id: callId, method, params }));
    });
  };
  return { socket, send, ready };
}

const versionData = await (await fetch('http://127.0.0.1:9222/json/version')).json();
const browser = connect(versionData.webSocketDebuggerUrl);
await browser.ready;
const downloadPath = path.resolve(downloadDir);
await browser.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath, eventsEnabled: true });
browser.socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.method && message.method.startsWith('Browser.download')) console.log(message.method, JSON.stringify(message.params));
});

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
await send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: path.resolve(downloadDir) });
await send('Page.navigate', { url: pageUrl });
await sleep(1200);
await send('Runtime.evaluate', { expression: `localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light');` });
await send('Page.reload', { ignoreCache: true });
await sleep(1500);
await send('Runtime.evaluate', { expression: `location.hash = '#/templates';` });
await sleep(900);

const listResult = await send('Runtime.evaluate', {
  expression: `JSON.stringify(TEMPLATES.map((t) => ({ id: t.id, filename: t.filename, format: t.format })))`,
  returnByValue: true,
});
const templates = JSON.parse(listResult.result.value);
let failures = 0;
const checks = [];
function check(label, ok, detail) {
  checks.push({ label, ok, detail });
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`, detail ?? '');
}

check('template count', templates.length === 12, templates.length);
for (const template of templates) {
  const clicked = await send('Runtime.evaluate', {
    expression: `(() => { const btn = document.querySelector('[data-download-template="${template.id}"]'); if (!btn) return false; btn.click(); return true; })()`,
    returnByValue: true,
    userGesture: true,
  });
  check(`click ${template.id}`, clicked.result.value === true);
  await sleep(450);
}
await sleep(2500);

const files = fs.readdirSync(downloadDir).filter((name) => !name.endsWith('.crdownload'));
check('download count', files.length === 12, files.length);

for (const template of templates) {
  const filePath = path.join(downloadDir, template.filename);
  const exists = fs.existsSync(filePath);
  check(`file ${template.filename}`, exists);
  if (!exists) continue;
  const text = fs.readFileSync(filePath, 'utf8');
  if (template.format === 'csv') {
    check(`csv bom ${template.id}`, text.charCodeAt(0) === 0xFEFF, JSON.stringify(text.slice(0, 3)));
    check(`csv rows ${template.id}`, text.split(/\r?\n/).length >= 4, text.split(/\r?\n/).length);
  } else {
    check(`md body ${template.id}`, text.startsWith('# ') && text.length > 300, text.slice(0, 24));
    check(`md checks ${template.id}`, (text.match(/^- \[ \]/gm) || []).length >= 8, (text.match(/^- \[ \]/gm) || []).length);
  }
}

console.log(`\n${failures === 0 ? 'DOWNLOAD CHECKS OK' : failures + ' DOWNLOAD CHECK(S) FAILED'} (${checks.length} checks)`);
ws.close();
browser.socket.close();
if (failures) process.exitCode = 1;
