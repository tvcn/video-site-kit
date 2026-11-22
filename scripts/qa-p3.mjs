// P3 detail checks: credits, sources, related links, Top 40 diagrams, deep minutes.
// Usage: node scripts/qa-p3.mjs
import fs from 'node:fs';
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
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: pageUrl });
await sleep(1200);
await evaluate(`localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light'); location.reload();`);
await sleep(1200);

const report = JSON.parse(await evaluate(`JSON.stringify((() => {
  const ids = Object.keys(P3_DATA.credits);
  const holder = document.createElement('div');
  const rows = ids.map((id) => {
    holder.innerHTML = articleView(id);
    const credit = holder.querySelector('.article-credit');
    const sources = holder.querySelector('.article-sources');
    const related = holder.querySelectorAll('.related a').length;
    const diagramImg = holder.querySelector('.diagram-body img');
    return { id, credit: !!credit, sources: !!sources, related, diagram: diagramImg ? diagramImg.getAttribute('src') : null };
  });
  return { count: ids.length, rows, bad: rows.filter((r) => !r.credit || !r.sources || r.related < 3) };
})())`));
const top40Ids = JSON.parse(await evaluate(`JSON.stringify(Object.keys(TOP40_DIAGRAMS))`));
const top40Rows = JSON.parse(await evaluate(`JSON.stringify((() => {
  const holder = document.createElement('div');
  return Object.keys(TOP40_DIAGRAMS).map((id) => {
    holder.innerHTML = articleView(id);
    const img = holder.querySelector('.diagram-body img');
    return { id, src: img ? img.getAttribute('src') : null };
  });
})())`));
const missingSvg = [];
const notApplied = top40Rows.filter((row) => !row.src || !row.src.includes('-top40'));
for (const id of top40Ids) {
  const rel = `v2/prototype/assets/notes/${id}-top40.svg`;
  if (!fs.existsSync(`C:/Users/chenhua/Desktop/tvcn/${rel}`)) missingSvg.push(rel);
}
const deepBad = JSON.parse(await evaluate(`JSON.stringify(Object.entries(DEEP_DIVES).filter(([,v]) => typeof v.minutes !== 'number').map(([id]) => id))`));
console.log(JSON.stringify({ count: report.count, bad: report.bad, top40: top40Ids.length, notApplied, missingSvg, deepBad }, null, 2));
await send('Page.navigate', { url: 'about:blank' });
ws.close();
