// Detail checks for the local UI prototype: index images, glossary terms, article nav, search.
// Usage: node scripts/qa-detail.mjs (Chrome with --remote-debugging-port=9222)
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
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 1000, screenOrientation: { type: 'landscapePrimary', angle: 0 } });
await send('Page.navigate', { url: pageUrl });
await sleep(900);
await send('Runtime.evaluate', { expression: `localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light'); location.reload();` });
await sleep(900);

const failures = [];
async function check(name, hash, expression, test) {
  await send('Runtime.evaluate', { expression: `location.hash = ${JSON.stringify(hash)};` });
  await sleep(450);
  const result = await send('Runtime.evaluate', { expression, returnByValue: true });
  const raw = result.result.value;
  const value = typeof raw === 'string' ? JSON.parse(raw) : raw;
  const passed = test(value);
  if (!passed) failures.push(name);
  console.log(`${passed ? 'OK  ' : 'FAIL'} ${name} ${JSON.stringify(value)}`);
}

await check('library-counts', '#/', `(() => JSON.stringify({
  articles: ARTICLES.length,
  articleImages: Object.keys(ARTICLE_IMAGES).length,
  uniqueImages: new Set(Object.values(ARTICLE_IMAGES).map((item) => item.src)).size,
  diagrams: Object.keys(ARTICLE_DIAGRAMS).length,
  glossary: GLOSSARY.length
}))()`, (v) => v.articles === 418 && v.articleImages === 418 && v.uniqueImages >= 405 && v.diagrams === 418 && v.glossary === 100);

await check('articles-index', '#/articles', `(() => {
  const cards = [...document.querySelectorAll('#main .article-card')];
  const imgs = [...document.querySelectorAll('#main .article-card img')];
  const missingSrc = imgs.filter((img) => !img.getAttribute('src')).map((img) => img.getAttribute('src'));
  return JSON.stringify({ cards: cards.length, imgs: imgs.length, missingSrc });
})()`, (v) => v.cards === 418 && v.imgs === 418 && v.missingSrc.length === 0);

await check('article-filters', '#/articles', `(() => {
  clearArticleFilters();
  setArticleFilter('site', 'story');
  const story = document.querySelectorAll('#articleResults .article-card').length;
  setArticleFilter('depth', 'deep');
  const storyDeep = document.querySelectorAll('#articleResults .article-card').length;
  clearArticleFilters();
  setArticleQuery('小红书');
  const first = document.querySelector('#articleResults .article-card h3')?.innerText || '';
  const count = document.getElementById('articleCount')?.textContent || '';
  clearArticleFilters();
  return JSON.stringify({ story, storyDeep, first, count, back: document.querySelectorAll('#articleResults .article-card').length });
})()`, (v) => v.story === 40 && v.storyDeep === 9 && v.first.includes('平台规则') && v.count === '4 / 418' && v.back === 418);

await check('glossary', '#/glossary', `(() => ({
  terms: document.querySelectorAll('#main .glossary-item').length,
  groups: document.querySelectorAll('#main .glossary-group').length,
  links: document.querySelectorAll('#main .glossary-item a').length,
  formatLinks: document.querySelectorAll('#main .glossary-item [data-glossary-format]').length,
  missingFormat: [...document.querySelectorAll('#main .glossary-item')].filter((item) => !item.querySelector('[data-glossary-format]')).length
}))()`, (v) => v.terms === 100 && v.groups === 8 && v.links === 200 && v.formatLinks === 100 && v.missingFormat === 0);

await check('about', '#/about', `(() => ({
  h1: document.querySelector('#main h1')?.innerText || '',
  links: [...document.querySelectorAll('#main a')].map((a) => a.getAttribute('href')).filter(Boolean).length,
  text: (document.getElementById('main')?.innerText || '').length
}))()`, (v) => v.h1.includes('先把话说清') && v.links >= 3 && v.text > 400);

await check('article-nav', '#/article/animation-timing', `(() => ({
  prev: document.querySelectorAll('#main .article-nav a').length,
  labels: [...document.querySelectorAll('#main .article-nav')].map((n) => n.innerText.trim())
}))()`, (v) => v.prev === 2);

const deepIdsResult = await send('Runtime.evaluate', { expression: `JSON.stringify(Object.keys(DEEP_DIVES))`, returnByValue: true });
const deepIds = JSON.parse(deepIdsResult.result.value);
for (const id of deepIds) {
  await check(`deep-dive-${id}`, `#/article/${id}`, `(() => ({
    blocks: document.querySelectorAll('#main .deep-dive').length,
    sections: document.querySelectorAll('#main .deep-dive .article-body section').length,
    chars: (document.querySelector('#main .deep-dive .article-body')?.innerText || '').replace(/\\s/g, '').length
  }))()`, (v) => v.blocks === 1 && v.sections >= 4 && v.chars > 600);
}

await check('notfound', '#/no-such-page', `(() => ({
  h1: document.querySelector('#main h1')?.innerText || '',
  back: [...document.querySelectorAll('#main a')].some((a) => a.getAttribute('href') === '#/'),
  title: document.title
}))()`, (v) => v.h1.includes('这个地址没有内容') && v.back && v.title.includes('页面不存在'));

await check('format-case-links', '#/format/product-ad', `(() => ({
  cases: document.querySelectorAll('#main .related a[href^="#/case/"]').length,
  hrefs: [...document.querySelectorAll('#main .related a[href^="#/case/"]')].map((a) => a.getAttribute('href'))
}))()`, (v) => v.cases >= 2 && v.hrefs.every((href) => href && href.startsWith('#/case/')));

await check('format-quotes', '#/format/product-ad', `(() => ({
  cards: document.querySelectorAll('#main .format-quote-card').length,
  prices: [...document.querySelectorAll('#main .format-quote-price')].filter((el) => el.innerText.trim()).length,
  deliver: [...document.querySelectorAll('#main .format-quote-card .format-quote-line span')].filter((el) => el.innerText.trim()).length,
  empty: [...document.querySelectorAll('#main .format-quote-card')].filter((card) => !card.querySelector('.format-quote-price')?.innerText.trim()).length
}))()`, (v) => v.cards === 3 && v.prices === 3 && v.deliver === 6 && v.empty === 0);

await check('search-term', '#/search', `(() => {
  const input = document.querySelector('#main input[type="search"], #main input');
  if (!input) return JSON.stringify({ error: 'no input' });
  input.value = '曝光';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  const rows = document.querySelectorAll('#main .search-row, #main .search-result, #main .result-row').length;
  return JSON.stringify({ rows, text: document.querySelector('#main')?.innerText.slice(0, 200) });
})()`, (v) => v.rows > 0);

await check('search-case', '#/search', `(() => {
  setSearch('婚礼');
  const rows = [...document.querySelectorAll('#main .search-result')];
  const caseRows = rows.filter((row) => (row.querySelector('.result-type')?.textContent || '').trim() === '案例');
  return JSON.stringify({
    rows: rows.length,
    cases: caseRows.length,
    caseLinks: caseRows.map((row) => row.getAttribute('href'))
  });
})()`, (v) => v.cases >= 1 && v.caseLinks.every((href) => href && href.startsWith('#/case/')));

await check('format-compare', '#/formats', `(() => ({
  rows: document.querySelectorAll('#main .format-compare-table tbody tr').length,
  names: document.querySelectorAll('#main .format-compare-table tbody .fc-name a').length,
  empty: [...document.querySelectorAll('#main .format-compare-table tbody tr')].filter((row) => [...row.querySelectorAll('td')].slice(1).some((cell) => !cell.innerText.trim())).length,
  ladders: document.querySelectorAll('#main .format-ladder-card').length,
  ladderEmpty: [...document.querySelectorAll('#main .format-ladder-card')].filter((card) => [...card.querySelectorAll('.format-ladder-line p')].some((p) => !p.innerText.trim())).length,
  quoteFormats: Object.keys(FORMAT_QUOTES).length,
  quoteTiers: Object.values(FORMAT_QUOTES).reduce((sum, tiers) => sum + tiers.length, 0),
  quoteBad: Object.values(FORMAT_QUOTES).filter((tiers) => tiers.length !== 3 || tiers.some((tier) => tier.length !== 5 || !tier[0] || !tier[1] || !tier[2] || !tier[3]?.zh || !tier[4]?.zh)).length
}))()`, (v) => v.rows === 13 && v.names === 13 && v.empty === 0 && v.ladders === 13 && v.ladderEmpty === 0 && v.quoteFormats === 13 && v.quoteTiers === 39 && v.quoteBad === 0);

await check('format-deep-links', '#/format/talking-head', `(() => ({
  mappings: Object.keys(FORMAT_DEEP_LINKS).length,
  valid: Object.entries(FORMAT_DEEP_LINKS).filter(([, deepId]) => DEEP_DIVES[deepId]).length,
  links: document.querySelectorAll('#main .format-deep a[href^="#/article/"]').length,
  href: document.querySelector('#main .format-deep a')?.getAttribute('href') || '',
  title: document.querySelector('#main .format-deep h2')?.innerText || ''
}))()`, (v) => v.mappings === 13 && v.valid === 13 && v.links === 1 && v.href.startsWith('#/article/') && v.title.length > 6);

await check('templates-page', '#/templates', `(() => ({
  cards: document.querySelectorAll('#main .template-card').length,
  csv: TEMPLATES.filter((item) => item.format === 'csv').length,
  md: TEMPLATES.filter((item) => item.format === 'md').length,
  buttons: document.querySelectorAll('#main [data-download-template]').length,
  unique: new Set(TEMPLATES.map((item) => item.filename)).size,
  previewRows: document.querySelectorAll('#main .template-preview tbody tr').length,
  empty: TEMPLATES.filter((item) => !item.use?.zh || !item.use?.en || !item.note?.zh || !item.note?.en).length
}))()`, (v) => v.cards === 12 && v.csv === 9 && v.md === 3 && v.buttons === 12 && v.unique === 12 && v.previewRows >= 24 && v.empty === 0);

await check('template-content', '#/templates', `(() => ({
  short: TEMPLATES.filter((item) => (item.format === 'csv' ? templateCsv(item).length < 80 : templateMarkdown(item).length < 80)).map((item) => item.id),
  bom: TEMPLATES.filter((item) => item.format === 'csv').every((item) => templateCsv(item).charCodeAt(0) === 0xFEFF),
  csvRows: TEMPLATES.filter((item) => item.format === 'csv').map((item) => templateCsv(item).split('\\r\\n').length),
  mdChecks: TEMPLATES.filter((item) => item.format === 'md').map((item) => (templateMarkdown(item).match(/- \\[ \\]/g) || []).length)
}))()`, (v) => v.short.length === 0 && v.bom && v.csvRows.every((n) => n >= 4) && v.mdChecks.every((n) => n >= 8));

await check('trust-index', '#/trust', `(() => ({
  cards: document.querySelectorAll('#main .trust-card').length,
  pages: Object.keys(TRUST_PAGES).length,
  links: [...document.querySelectorAll('#main .trust-card')].map((a) => a.getAttribute('href')),
  empty: Object.values(TRUST_PAGES).filter((page) => !page.lead?.zh || !page.lead?.en || page.sections.length < 3).length
}))()`, (v) => v.cards === 6 && v.pages === 6 && v.links.every((href) => href && href.startsWith('#/trust/')) && v.empty === 0);

for (const trustId of ['standards', 'sources', 'corrections', 'privacy', 'license', 'terms']) {
  await check(`trust-${trustId}`, `#/trust/${trustId}`, `(() => ({
    sections: document.querySelectorAll('#main .trust-body section').length,
    paragraphs: document.querySelectorAll('#main .trust-body p').length,
    links: document.querySelectorAll('#main .trust-links a').length,
    updated: document.querySelector('#main .trust-meta')?.innerText || '',
    title: document.querySelector('#main h1')?.innerText || ''
  }))()`, (v) => v.sections >= 3 && v.paragraphs >= 6 && v.links >= 2 && v.updated.includes('2026-11') && v.title.length > 3);
}

await check('structures-page', '#/structures', `(() => ({
  cards: document.querySelectorAll('#main .structure-card').length,
  frames: document.querySelectorAll('#main .structure-frame').length,
  on: document.querySelectorAll('#main .structure-frame.on').length,
  plays: document.querySelectorAll('#main [data-demo-play]').length,
  labels: [...document.querySelectorAll('#main .structure-foot span')].filter((el) => el.innerText.includes('非实拍') || el.innerText.toLowerCase().includes('not live action')).length,
  empty: STRUCTURE_DEMOS.filter((demo) => demo.beats.length !== 4 || demo.beats.some((beat) => !beat.label?.zh || !beat.note?.en)).length
}))()`, (v) => v.cards === 21 && v.frames === 84 && v.on === 21 && v.plays === 21 && v.labels === 21 && v.empty === 0);

await check('tool-fallbacks', '#/tools', `(() => ({
  cards: document.querySelectorAll('#main .tool-card').length,
  fallbacks: document.querySelectorAll('#main .tool-fallback').length,
  empty: [...document.querySelectorAll('#main .tool-fallback')].filter((item) => item.innerText.trim().length < 4).length,
  tests: document.querySelectorAll('#main .tool-test').length,
  testData: Object.keys(TOOL_SELF_TESTS).length,
  testBad: Object.values(TOOL_SELF_TESTS).filter((item) => !item.task?.zh || !item.pass?.zh || !item.fail?.zh).length,
  testEmpty: [...document.querySelectorAll('#main .tool-test')].filter((item) => !item.querySelector('.tool-test-task')?.textContent.trim() || item.querySelectorAll('.tool-test-result').length !== 2).length
}))()`, (v) => v.cards === 30 && v.fallbacks === 30 && v.empty === 0 && v.tests === 30 && v.testData === 30 && v.testBad === 0 && v.testEmpty === 0);

await check('search-alias-fcp', '#/search', `(() => { setSearch('FCP'); const rows = [...document.querySelectorAll('#main .search-result')]; return JSON.stringify({ rows: rows.length, titles: rows.map((row) => row.querySelector('.result-title')?.textContent || '') }); })()`, (v) => v.rows >= 1);
await check('search-alias-a7', '#/search', `(() => { setSearch('A7'); const rows = [...document.querySelectorAll('#main .search-result')]; return JSON.stringify({ rows: rows.length, titles: rows.map((row) => row.querySelector('.result-title')?.textContent || '') }); })()`, (v) => v.rows >= 1);
await check('search-alias-davinci', '#/search', `(() => { setSearch('达芬奇'); const rows = [...document.querySelectorAll('#main .search-result')]; return JSON.stringify({ rows: rows.length, titles: rows.map((row) => row.querySelector('.result-title')?.textContent || '') }); })()`, (v) => v.rows >= 2);

await check('cases-index', '#/cases', `(() => {
  const cards = [...document.querySelectorAll('#main .case-card')];
  return JSON.stringify({
    cards: cards.length,
    thumbs: document.querySelectorAll('#main .case-card img').length,
    details: CASES.filter((item) => CASE_DETAILS[item.id]).length,
    links: cards.map((card) => card.getAttribute('href'))
  });
})()`, (v) => v.cards === 13 && v.thumbs === 13 && v.details === 13 && v.links.every((href) => href && href.startsWith('#/case/')));

await check('case-format-map', '#/cases', `(() => {
  const entries = Object.entries(CASE_FORMATS);
  const invalid = entries.filter(([caseId, formatId]) => !CASES.some((item) => item.id === caseId) || !FORMATS.some((item) => item.id === formatId));
  return JSON.stringify({ entries: entries.length, invalid: invalid.map(([caseId, formatId]) => caseId + ':' + formatId) });
})()`, (v) => v.entries === 13 && v.invalid.length === 0);

await check('case-sketch-data', '#/cases', `(() => {
  const sketches = Object.values(CASE_SHOT_SKETCHES);
  const phones = Object.values(CASE_PHONE_PLANS);
  return JSON.stringify({
    sketchCases: Object.keys(CASE_SHOT_SKETCHES).length,
    sketchShots: sketches.reduce((count, list) => count + list.length, 0),
    sketchEmpty: sketches.flat().filter((shot) => !shot.scene || !shot.note || !shot.note.zh || !shot.note.en).length,
    phoneCases: Object.keys(CASE_PHONE_PLANS).length,
    phoneFields: phones.reduce((count, plan) => count + PHONE_PLAN_FIELDS.filter(([key]) => plan[key] && plan[key].zh && plan[key].en).length, 0),
    phoneMissing: phones.reduce((count, plan) => count + PHONE_PLAN_FIELDS.filter(([key]) => !plan[key] || !plan[key].zh || !plan[key].en).length, 0)
  });
})()`, (v) => v.sketchCases === 13 && v.sketchShots === 52 && v.sketchEmpty === 0 && v.phoneCases === 13 && v.phoneFields === 52 && v.phoneMissing === 0);

await check('site-stage-data', '#/sites', `(() => {
  const checks = Object.entries(SITE_STAGE_CHECKS);
  return JSON.stringify({
    sites: checks.length,
    stages: checks.reduce((count, [, list]) => count + list.length, 0),
    empty: checks.flatMap(([, list]) => list).filter((entry) => !entry.zh || !entry.en).length,
    maps: Object.keys(SITE_MAPS).length,
    mapStages: Object.values(SITE_MAPS).reduce((count, list) => count + list.length, 0),
    mismatch: SITES.filter((site) => (SITE_MAPS[site.id] || []).length !== (SITE_STAGE_CHECKS[site.id] || []).length).map((site) => site.id)
  });
})()`, (v) => v.sites === 8 && v.stages === 24 && v.empty === 0 && v.maps === 8 && v.mapStages === 24 && v.mismatch.length === 0);

for (const site of ['story', 'shoot', 'post', 'ai', 'animation', 'formats', 'tools', 'context']) {
  await check(`site-brief-${site}`, `#/site/${site}`, `(() => {
    const brief = document.querySelectorAll('#main .site-brief');
    const starts = [...document.querySelectorAll('#main .site-brief-start a')];
    return JSON.stringify({
      brief: brief.length,
      starts: starts.length,
      summaries: starts.filter((a) => (a.querySelector('.brief-link-text small')?.textContent || '').trim().length > 20).length,
      rules: document.querySelectorAll('#main .site-brief-rules li').length,
      action: document.querySelectorAll('#main .site-brief-do').length,
      paths: document.querySelectorAll('#main .related a[href^="#/path/"]').length,
      pathHrefs: [...document.querySelectorAll('#main .related a[href^="#/path/"]')].map((a) => a.getAttribute('href')),
      mapStages: document.querySelectorAll('#main .site-map-card').length,
      mapLinks: document.querySelectorAll('#main .site-map-links a').length,
      mapHrefs: [...document.querySelectorAll('#main .site-map-links a')].map((a) => a.getAttribute('href')),
      passes: document.querySelectorAll('#main .site-map-pass').length,
      passText: [...document.querySelectorAll('#main .site-map-pass label > span')].filter((node) => (node.textContent || '').trim().length > 24).length,
      hrefs: starts.map((a) => a.getAttribute('href'))
    });
  })()`, (v) => v.brief === 1 && v.starts === 5 && v.summaries === 5 && v.rules === 3 && v.action === 1 && v.paths === 3 && v.pathHrefs.every((href) => href && href.startsWith('#/path/')) && v.mapStages === 3 && v.mapLinks === 9 && v.mapHrefs.every((href) => href && href.startsWith('#/article/')) && v.passes === 3 && v.passText === 3 && v.hrefs.every((href) => href && href.startsWith('#/article/')));
}

await check('progress-overview', '#/progress', `(() => {
  const siteCards = [...document.querySelectorAll('#main .site-progress-card')];
  return JSON.stringify({
    stats: document.querySelectorAll('#main .progress-stat').length,
    pathCards: document.querySelectorAll('#main .progress-path').length,
    siteCards: siteCards.length,
    siteStages: document.querySelectorAll('#main .site-progress-stages span').length,
    doneStages: document.querySelectorAll('#main .site-progress-stages span.on').length,
    siteHrefs: siteCards.map((card) => card.getAttribute('href')),
    statText: [...document.querySelectorAll('#main .progress-stat b')].map((node) => (node.textContent || '').trim())
  });
})()`, (v) => v.stats === 2 && v.pathCards === 9 && v.siteCards === 8 && v.siteStages === 24 && v.doneStages === 0 && v.siteHrefs.every((href) => href && href.startsWith('#/site/')) && v.statText.every((text) => text.includes('/')) && v.statText[1].endsWith('/ 24'));

const caseIdsResult = await send('Runtime.evaluate', { expression: `JSON.stringify(CASES.map((item) => item.id))`, returnByValue: true });
const caseIds = JSON.parse(caseIdsResult.result.value);
const caseFormatsResult = await send('Runtime.evaluate', { expression: `JSON.stringify(CASE_FORMATS)`, returnByValue: true });
const caseFormats = JSON.parse(caseFormatsResult.result.value);
for (const id of caseIds) {
  await check(`case-detail-${id}`, `#/case/${id}`, `(() => ({
    hero: document.querySelectorAll('#main .case-detail-hero').length,
    image: document.querySelectorAll('#main .case-detail-hero img').length,
    beats: document.querySelectorAll('#main .case-beat').length,
    moves: document.querySelectorAll('#main .case-detail-body .check-box ol li').length,
    mistakes: document.querySelectorAll('#main .case-detail-body .check-box:not(.case-fallbacks) > ul:not(.case-checklist) li').length,
    action: document.querySelectorAll('#main .case-do').length,
    notes: document.querySelectorAll('#main .article-card').length,
    formatLinks: document.querySelectorAll('#main .related a[href^="#/format/"]').length,
    shots: document.querySelectorAll('#main .case-shot-table tbody tr').length,
    checklist: document.querySelectorAll('#main .case-checklist li').length,
    fallbacks: document.querySelectorAll('#main .case-fallbacks li').length,
    sketches: document.querySelectorAll('#main .case-sketch').length,
    sketchSvgs: document.querySelectorAll('#main .case-sketch svg').length,
    sketchNotes: [...document.querySelectorAll('#main .case-sketch figcaption span')].filter((node) => (node.textContent || '').trim().length > 18).length,
    phoneItems: document.querySelectorAll('#main .phone-plan-item').length,
    phoneText: [...document.querySelectorAll('#main .phone-plan-item p')].filter((node) => (node.textContent || '').trim().length > 16).length
  }))()`, (v) => v.hero === 1 && v.image === 1 && v.beats >= 4 && v.beats <= 8 && v.moves === 3 && v.mistakes === 3 && v.action === 1 && v.notes >= 2 && (caseFormats[id] ? v.formatLinks === 1 : v.formatLinks === 0) && v.shots === 4 && v.checklist === 4 && v.fallbacks === 4 && v.sketches === 4 && v.sketchSvgs === 4 && v.sketchNotes === 4 && v.phoneItems === 4 && v.phoneText === 4);
}

console.log(`\n${failures.length === 0 ? 'DETAIL CHECKS OK' : failures.length + ' DETAIL CHECK(S) FAILED'}`);
ws.close();
if (failures.length) process.exitCode = 1;
