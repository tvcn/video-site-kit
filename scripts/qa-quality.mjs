// Content audit: thin articles, missing diagrams, duplicate summaries.
// Usage: node qa-quality.mjs
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
  const result = await send('Runtime.evaluate', { expression, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 1000, screenOrientation: { type: 'landscapePrimary', angle: 0 } });
await send('Page.navigate', { url: pageUrl });
await sleep(1200);
await evaluate(`localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light'); location.reload();`);
await sleep(1400);

const data = await evaluate(`(() => {
  const strip = (html) => String(html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\\s+/g, ' ').trim();
  const rows = ARTICLES.map((a) => {
    const zhBody = a.sections.map((s) => strip(s.body && (s.body.zh || s.body))).join(' ');
    return {
      id: a.id,
      site: a.site,
      title: a.title && a.title.zh,
      sections: a.sections.length,
      chars: zhBody.length,
      hasImage: Boolean(ARTICLE_IMAGES[a.id]),
      hasDiagram: Boolean(ARTICLE_DIAGRAMS[a.id]),
      hasDeep: Boolean(DEEP_DIVES[a.id]),
      checks: (a.checks && (a.checks.zh || a.checks.en) || []).length,
      related: a.related.length,
      summary: strip(a.summary && (a.summary.zh || a.summary))
    };
  });
  const byLength = rows.slice().sort((a, b) => a.chars - b.chars);
  const noDiagram = rows.filter((r) => !r.hasDiagram);
  const noImage = rows.filter((r) => !r.hasImage);
  const thin = rows.filter((r) => r.chars < 300 || r.sections < 3);
  const badChecks = rows.filter((r) => r.checks < 3);
  const dupSummary = rows.filter((r, i) => rows.findIndex((x) => x.summary === r.summary) !== i);
  const sites = {};
  for (const row of rows) {
    sites[row.site] = sites[row.site] || { count: 0, chars: 0, diagrams: 0, deep: 0 };
    sites[row.site].count += 1;
    sites[row.site].chars += row.chars;
    sites[row.site].diagrams += row.hasDiagram ? 1 : 0;
    sites[row.site].deep += row.hasDeep ? 1 : 0;
  }
  return { total: rows.length, sites, byLength: byLength.slice(0, 15), noDiagram, noImage, thin, badChecks, dupSummary };
})()`);
console.log(JSON.stringify({
  total: data.total,
  sites: data.sites,
  shortest: data.byLength,
  noDiagram: data.noDiagram.map((r) => ({ id: r.id, site: r.site, title: r.title, chars: r.chars })),
  noImage: data.noImage.map((r) => ({ id: r.id, site: r.site, title: r.title })),
  thin: data.thin.map((r) => ({ id: r.id, site: r.site, title: r.title, chars: r.chars, sections: r.sections })),
  badChecks: data.badChecks.map((r) => ({ id: r.id, site: r.site, title: r.title, checks: r.checks })),
  duplicateSummaries: data.dupSummary.map((r) => ({ id: r.id, site: r.site, title: r.title }))
}, null, 2));
const qualityFailures = data.noDiagram.length + data.noImage.length + data.badChecks.length + data.dupSummary.length;
console.log(`\n${qualityFailures === 0 ? 'QUALITY CHECKS OK' : qualityFailures + ' QUALITY CHECK(S) FAILED'} (${data.total} articles; ${data.thin.length} short cards are expected)`);
ws.close();
if (qualityFailures) process.exitCode = 1;
