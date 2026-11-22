// Verify the generated static article layer inside v2/dist.
// Usage: node scripts/qa-static.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/chenhua/Desktop/tvcn/v2/dist';
const SITE = 'https://tvcn.org';
let failures = 0;
function check(label, ok, detail = '') {
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}${detail ? ' ' + detail : ''}`);
}
function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, 'utf8');
}
function countMatches(text, re) {
  return [...text.matchAll(re)].length;
}

const zhDir = path.join(root, 'article');
const enDir = path.join(root, 'en/article');
const zhIds = fs.existsSync(zhDir) ? fs.readdirSync(zhDir) : [];
const enIds = fs.existsSync(enDir) ? fs.readdirSync(enDir) : [];
const EXPECTED_ARTICLES = zhIds.length;
const EXPECTED_URLS = 4 + EXPECTED_ARTICLES * 2;
check('zh article dirs', zhIds.length > 400, String(zhIds.length));
check('en article dirs', enIds.length === EXPECTED_ARTICLES, String(enIds.length));
check('zh/en id sets match', JSON.stringify(zhIds.slice().sort()) === JSON.stringify(enIds.slice().sort()));

const samples = ['logline', 'frame-rate', 'blocking', 'ai-look', 'delivery-specs', 'color-management', 'corporate-video-breakdown', 'portrait-rights', 'budget-quote'];
for (const id of samples) {
  for (const lang of ['zh', 'en']) {
    const rel = `${lang === 'en' ? 'en/' : ''}article/${id}/index.html`;
    const html = read(rel);
    check(`static ${lang} ${id} exists`, Boolean(html));
    if (!html) continue;
    const canonical = lang === 'en' ? `${SITE}/en/article/${id}/` : `${SITE}/article/${id}/`;
    check(`static ${lang} ${id} canonical`, html.includes(`rel="canonical" href="${canonical}"`));
    check(`static ${lang} ${id} hreflang pair`, html.includes(`hreflang="zh-CN" href="${SITE}/article/${id}/"`) && html.includes(`hreflang="en" href="${SITE}/en/article/${id}/"`));
    check(`static ${lang} ${id} description`, /<meta name="description" content="[^"]{20,}"/.test(html));
    check(`static ${lang} ${id} article body`, html.includes('<article class="article-body"') && html.length > 3000);
    check(`static ${lang} ${id} jsonld`, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"Article"/.test(html));
    check(`static ${lang} ${id} no raw hash links`, !html.includes('href="#/'));
    check(`static ${lang} ${id} no bare asset links`, !html.includes('="assets/'));
  }
}

const zhIndex = read('articles/index.html');
const enIndex = read('en/articles/index.html');
check('zh article index exists', Boolean(zhIndex));
check('en article index exists', Boolean(enIndex));
check('zh index links', countMatches(zhIndex || '', /class="article-index-card" href="\.\.\/article\//g) === EXPECTED_ARTICLES, String(countMatches(zhIndex || '', /class="article-index-card"/g)));
check('en index links', countMatches(enIndex || '', /class="article-index-card" href="\.\.\/\.\.\/en\/article\//g) === EXPECTED_ARTICLES, String(countMatches(enIndex || '', /class="article-index-card"/g)));

const sitemap = read('sitemap.xml');
const locs = [...(sitemap || '').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
check('sitemap exists', Boolean(sitemap));
check('sitemap url count', locs.length === EXPECTED_URLS, String(locs.length));
check('sitemap all https', locs.every((loc) => loc.startsWith('https://')));
check('sitemap same host', locs.every((loc) => loc.startsWith(SITE + '/')));
check('sitemap sample article', locs.includes(`${SITE}/article/logline/`) && locs.includes(`${SITE}/en/article/logline/`));

const robots = read('robots.txt');
check('robots sitemap line', Boolean(robots && robots.includes('Sitemap: https://tvcn.org/sitemap.xml')));

const css = read('assets/article.css');
check('article css', Boolean(css && css.length > 60000));

let brokenCanonical = 0;
let missingDescription = 0;
let rawHash = 0;
for (const id of zhIds) {
  const html = read(`article/${id}/index.html`) || '';
  if (!html.includes(`rel="canonical" href="${SITE}/article/${id}/"`)) brokenCanonical += 1;
  if (!/<meta name="description" content="[^"]{10,}"/.test(html)) missingDescription += 1;
  if (html.includes('href="#/')) rawHash += 1;
}
check('all zh canonicals self-referencing', brokenCanonical === 0, String(brokenCanonical));
check('all zh descriptions present', missingDescription === 0, String(missingDescription));
check('all zh hash links rewritten', rawHash === 0, String(rawHash));

const p3Samples = ['logline', 'corporate-video-breakdown', 'color-management', 'contract-scope', 'budget-quote'];
for (const id of p3Samples) {
  for (const lang of ['zh', 'en']) {
    const html = read(`${lang === 'en' ? 'en/' : ''}article/${id}/index.html`) || '';
    check(`static ${lang} ${id} credits/sources`, html.includes('class="article-credit"') && html.includes('class="article-sources"') && html.includes('source-types'));
  }
}
const logline = read('article/logline/index.html') || '';
check('static top40 logline image', logline.includes('logline-top40.svg'));
const top40Files = fs.existsSync(path.join(root, 'assets/notes')) ? fs.readdirSync(path.join(root, 'assets/notes')).filter((x) => /-top40(-en)?\.svg$/.test(x)) : [];
check('static top40 assets', top40Files.length === 80, String(top40Files.length));

console.log(failures === 0 ? 'STATIC CHECKS OK' : `STATIC CHECKS FAILED (${failures})`);
process.exit(failures === 0 ? 0 : 1);
