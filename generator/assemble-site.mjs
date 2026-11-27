// Assemble one site's deployable output from generator/build-site.mjs output.
// - main: legacy AI stubs, compatibility redirects for non-main articles, app shell
// - all sites: 404, robots, manifest, CNAME, referenced assets only
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/chenhua/Desktop/tvcn';
const argv = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)=(.*)$/);
  return m ? [m[1], m[2]] : [a.replace(/^--/, ''), 'true'];
}));
const SITE_ID = argv.site || 'main';
const registry = JSON.parse(fs.readFileSync(path.join(root, 'site-kit/sites.json'), 'utf8'));
const cfg = registry.sites.find((s) => s.id === SITE_ID);
if (!cfg) throw new Error(`unknown site: ${SITE_ID}`);
const IS_MAIN = SITE_ID === 'main';
const outRoot = path.join(root, 'out', SITE_ID);
if (!fs.existsSync(outRoot)) throw new Error(`missing build output: ${outRoot}`);

const data = JSON.parse(fs.readFileSync(path.join(root, 'generator/data/static-articles-data.json'), 'utf8'));
const legacyMap = JSON.parse(fs.readFileSync(path.join(root, 'generator/data/ai-legacy-map.json'), 'utf8')).zh || {};
const slugSite = Object.fromEntries(data.zh.map((a) => [a.id, a.site]));
for (const slug of Object.keys(legacyMap)) slugSite[slug] = 'ai';
const domainOf = (id) => registry.sites.find((s) => s.id === id).domain;
const AI_FALLBACK = { 'model-comparison': '/models/', 'seven-day-plan': '/start/' };

function write(rel, content) {
  const target = path.join(outRoot, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
}
function copy(rel, src) {
  const target = path.join(outRoot, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(src, target);
}
function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

// 1. Legacy AI compatibility stubs live on main only.
if (IS_MAIN) {
  for (const slug of Object.keys(legacyMap)) {
    for (const [lang, prefix] of [['zh', 'article'], ['en', 'en/article']]) {
      const src = path.join(root, 'generator/legacy-ai', prefix, slug, 'index.html');
      if (fs.existsSync(src)) copy(`${prefix}/${slug}/index.html`, src);
    }
  }
}

// 2. Old main URLs for articles that now live on a subsite -> tiny redirect stubs.
function compatPage(lang, slug, target) {
  const zh = lang === 'zh';
  const title = zh ? '文章已迁移 · TVCN' : 'Article moved · TVCN';
  const text = zh
    ? '这篇文章现在在对应的 TVCN 分站。'
    : 'This guide now lives on its TVCN desk site.';
  const label = zh ? '前往新地址' : 'Go to the new address';
  return `<!doctype html>
<html lang="${zh ? 'zh-CN' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0;url=${target}">
<title>${title}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f4f1eb;color:#1c1b18;font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}main{max-width:34rem;padding:2rem}a{color:#9a3d22}@media(prefers-color-scheme:dark){body{background:#0d100f;color:#eee}a{color:#e0a184}}</style>
</head>
<body><main><h1>${title}</h1><p>${text}</p><p><a href="${target}">${label} →</a></p></main></body>
</html>`;
}
if (IS_MAIN) {
  for (const a of data.zh) {
    if (a.site === 'main' || a.site === 'ai') continue;
    const target = `https://${domainOf(a.site)}/article/${a.id}/`;
    const targetEn = `https://${domainOf(a.site)}/en/article/${a.id}/`;
    write(`article/${a.id}/index.html`, compatPage('zh', a.id, target));
    write(`en/article/${a.id}/index.html`, compatPage('en', a.id, targetEn));
  }
}

// 3. Shared shell files.
{
  let notFound = fs.readFileSync(path.join(root, 'site-kit/shell/404.html'), 'utf8');
  if (!IS_MAIN) {
    notFound = notFound.replace('href="/app/"', `href="https://tvcn.org/app/?r=${encodeURIComponent(`site/${SITE_ID}`)}"`);
  }
  write('404.html', notFound);
}
const robots = fs.readFileSync(path.join(root, 'site-kit/shell/robots.txt'), 'utf8')
  .replace('https://tvcn.org/sitemap.xml', `https://${cfg.domain}/sitemap.xml`);
write('robots.txt', robots);
copy('manifest.webmanifest', path.join(root, 'site-kit/shell/manifest.webmanifest'));
write('.nojekyll', '');
write('CNAME', cfg.domain);
for (const name of ['icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon-32.png', 'og-cover.png']) {
  const src = path.join(root, 'assets', name);
  if (fs.existsSync(src)) copy(`assets/${name}`, src);
}
if (IS_MAIN) {
  copy('sw.js', path.join(root, 'site-kit/shell/sw.js'));
  const app = fs.readFileSync(path.join(root, 'app/tvcn-ui-v2.html'), 'utf8')
    .replace('<head>', '<head>\n<base href="/">\n<meta name="robots" content="noindex,follow">');
  write('app/index.html', app);
  fs.cpSync(path.join(root, 'assets'), path.join(outRoot, 'assets'), { recursive: true, force: true });
}

// 4. Link rewrite: every article link resolves to the owning site.
function resolveArticleHref(href, current) {
  if (!href || /^(?:#|mailto:|javascript:)/i.test(href)) return null;
  let en = false;
  let slug = null;
  let m = href.match(/^https?:\/\/(?:www\.)?tvcn\.org\/(en\/)?article\/([^/?#]+)\/?$/);
  if (m) { en = !!m[1]; slug = m[2]; }
  if (!slug) {
    m = href.match(/^https?:\/\/([a-z]+)\.tvcn\.org\/(en\/)?article\/([^/?#]+)\/?$/);
    if (m) { en = !!m[2]; slug = m[3]; }
  }
  if (!slug) {
    m = href.match(/^\/(en\/)?article\/([^/?#]+)\/?$/);
    if (m) { en = !!m[1]; slug = m[2]; }
  }
  if (!slug) {
    m = href.match(/^(?:(?:\.\.\/)*)(en\/)?article\/([^/?#]+)\/?$/);
    if (m) { en = !!m[1]; slug = m[2]; }
  }
  if (!slug) {
    m = href.match(/^\.\.\/([^/?#]+)\/?$/);
    if (m && slugSite[m[1]]) slug = m[1];
  }
  if (!slug) return null;
  if (AI_FALLBACK[slug]) return `https://ai.tvcn.org${AI_FALLBACK[slug]}`;
  const target = slugSite[slug];
  if (!target) return null;
  const langPrefix = en ? 'en/' : '';
  const targetUrl = `https://${domainOf(target)}/${langPrefix}article/${slug}/`;
  if (target === current) {
    if (/^https?:\/\/(?:www\.)?tvcn\.org\//.test(href) && current !== 'main') return targetUrl;
    return null;
  }
  return targetUrl;
}

const SHARED_PAGES = new Set(['about', 'glossary', 'paths', 'topics']);
function resolveSharedHref(href, current) {
  if (current === 'main') return null;
  const m = href.match(/^(?:(?:\.\.\/)*|\/)(about|glossary|paths|topics)\/(#[^"]*)?$/);
  if (!m) return null;
  return `https://tvcn.org/${m[1]}/${m[2] || ''}`;
}
for (const file of walkHtml(outRoot)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(/href="([^"]+)"/g, (match, href) => {
    const resolved = resolveArticleHref(href, SITE_ID) || resolveSharedHref(href, SITE_ID);
    return resolved ? `href="${resolved}"` : match;
  });
  if (after !== before) fs.writeFileSync(file, after, 'utf8');
}

// 5. Copy only referenced assets for subsites; main already has the full set.
if (!IS_MAIN) {
  const refs = new Set();
  const add = (url) => {
    const clean = String(url || '').split(/[?#]/)[0];
    const at = clean.indexOf('assets/');
    if (at < 0) return;
    const rel = clean.slice(at + 'assets/'.length);
    if (!rel || rel.includes('..')) return;
    refs.add(rel);
  };
  for (const file of walkHtml(outRoot)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(/(?:src|href|poster|content)="([^"]*assets\/[^"]+)"/g)) add(m[1]);
    for (const m of text.matchAll(/srcset="([^"]+)"/g)) {
      for (const part of m[1].split(',')) add(part.trim().split(/\s+/)[0]);
    }
  }
  for (const name of ['article.css', 'calculators.js']) refs.add(name);
  for (const name of ['icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon-32.png', 'og-cover.png']) refs.add(name);
  const sources = [
    path.join(root, 'assets'),
    path.join(root, 'site-kit/assets')
  ];
  let copied = 0;
  const missing = [];
  for (const rel of refs) {
    const target = path.join(outRoot, 'assets', rel);
    if (fs.existsSync(target)) continue;
    const src = sources.map((base) => path.join(base, rel)).find((p) => fs.existsSync(p));
    if (!src) { missing.push(rel); continue; }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(src, target);
    copied += 1;
  }
  console.log(`assets copied: ${copied}, missing: ${missing.length}`);
  if (missing.length) console.log(`missing assets: ${missing.slice(0, 20).join(', ')}`);
}

const files = walkHtml(outRoot).length;
const all = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else all.push(full);
  }
})(outRoot);
const bytes = all.reduce((sum, f) => sum + fs.statSync(f).size, 0);
console.log(`assembled ${SITE_ID}: html=${files} files=${all.length} bytes=${bytes}`);
