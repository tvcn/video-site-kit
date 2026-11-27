// Verify the per-site build: ownership, canonical, sitemap, search, assets, links.
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/chenhua/Desktop/tvcn';
const registry = JSON.parse(fs.readFileSync(path.join(root, 'site-kit/sites.json'), 'utf8'));
const data = JSON.parse(fs.readFileSync(path.join(root, 'generator/data/static-articles-data.json'), 'utf8'));
const legacyMap = JSON.parse(fs.readFileSync(path.join(root, 'generator/data/ai-legacy-map.json'), 'utf8')).zh || {};
const slugSite = Object.fromEntries(data.zh.map((a) => [a.id, a.site]));
for (const slug of Object.keys(legacyMap)) slugSite[slug] = 'ai';
const pairsBySite = {};
for (const a of data.zh) pairsBySite[a.site] = (pairsBySite[a.site] || 0) + 1;
const domainOf = (id) => registry.sites.find((s) => s.id === id).domain;
const failures = [];
const warnings = [];
const fail = (site, msg) => failures.push(`${site}: ${msg}`);

function walk(dir, ext, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, ext, out);
    else if (!ext || full.endsWith(ext)) out.push(full);
  }
  return out;
}
function canonicalOf(html) {
  const m = html.match(/<link rel="canonical" href="([^"]+)">/);
  return m ? m[1] : '';
}
function articleMatch(href) {
  let m = href.match(/^https?:\/\/(?:www\.)?tvcn\.org\/(en\/)?article\/([^/?#]+)\/?$/);
  if (m) return { en: !!m[1], slug: m[2], host: 'tvcn.org', absolute: true };
  m = href.match(/^https?:\/\/([a-z]+)\.tvcn\.org\/(en\/)?article\/([^/?#]+)\/?$/);
  if (m) return { en: !!m[2], slug: m[3], host: `${m[1]}.tvcn.org`, absolute: true };
  m = href.match(/^\/(en\/)?article\/([^/?#]+)\/?$/);
  if (m) return { en: !!m[1], slug: m[2], host: '', absolute: false };
  m = href.match(/^(?:(?:\.\.\/)*)(en\/)?article\/([^/?#]+)\/?$/);
  if (m) return { en: !!m[1], slug: m[2], host: '', absolute: false };
  return null;
}

for (const cfg of registry.sites.filter((s) => s.kind !== 'ai')) {
  const site = cfg.id;
  const out = path.join(root, 'out', site);
  if (!fs.existsSync(out)) { fail(site, 'missing output'); continue; }
  const htmlFiles = walk(out, '.html');
  const zhDirs = fs.readdirSync(path.join(out, 'article'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  const enDirs = fs.readdirSync(path.join(out, 'en/article'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  const expectedPairs = site === 'main' ? 77 : pairsBySite[site];
  const expectedDirs = site === 'main' ? 590 : expectedPairs;
  if (zhDirs.length !== expectedDirs) fail(site, `zh article dirs ${zhDirs.length} != ${expectedDirs}`);
  if (enDirs.length !== expectedDirs) fail(site, `en article dirs ${enDirs.length} != ${expectedDirs}`);

  for (const slug of zhDirs) {
    const file = path.join(out, 'article', slug, 'index.html');
    const html = fs.readFileSync(file, 'utf8');
    const canonical = canonicalOf(html);
    const owner = slugSite[slug];
    if (owner && owner !== 'ai' && owner !== site) {
      if (site !== 'main') fail(site, `foreign article ${slug} (owner ${owner})`);
      else {
        if (!canonical.startsWith(`https://${domainOf(owner)}/article/${slug}/`)) fail(site, `compat canonical wrong ${slug}: ${canonical}`);
        if (!/noindex/.test(html) || !/http-equiv="refresh"/.test(html)) fail(site, `compat not redirect ${slug}`);
      }
    } else if (legacyMap[slug] && site === 'main') {
      if (!canonical.startsWith('https://ai.tvcn.org/')) fail(site, `legacy canonical wrong ${slug}: ${canonical}`);
      if (!/noindex/.test(html)) fail(site, `legacy not noindex ${slug}`);
    } else if (owner === site) {
      if (canonical !== `https://${domainOf(site)}/article/${slug}/`) fail(site, `canonical wrong ${slug}: ${canonical}`);
      if (/noindex/.test(html)) fail(site, `full article noindex ${slug}`);
    } else {
      fail(site, `unknown article ${slug}`);
    }
  }

  const search = JSON.parse(fs.readFileSync(path.join(out, 'search-index.json'), 'utf8'));
  if (search.zh.length !== expectedPairs) fail(site, `search zh ${search.zh.length} != ${expectedPairs}`);
  if (search.en.length !== expectedPairs) fail(site, `search en ${search.en.length} != ${expectedPairs}`);
  for (const rec of [...search.zh, ...search.en]) if (rec.site !== site) fail(site, `search foreign record ${rec.id}`);

  const sitemap = fs.readFileSync(path.join(out, 'sitemap.xml'), 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expectedSitemap = site === 'main' ? 210 : 4 + expectedPairs * 2;
  if (locs.length !== expectedSitemap) fail(site, `sitemap ${locs.length} != ${expectedSitemap}`);
  for (const loc of locs) {
    const u = new URL(loc);
    if (u.hostname !== domainOf(site)) fail(site, `sitemap foreign host ${loc}`);
    const m = u.pathname.match(/^\/(?:en\/)?article\/([^/]+)\/$/);
    if (m) {
      const owner = slugSite[m[1]];
      if (owner !== site) fail(site, `sitemap foreign article ${loc} (owner ${owner})`);
    }
  }

  const assetRefs = new Set();
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    for (const m of html.matchAll(/(?:src|href|poster|content)="([^"]*assets\/[^"]+)"/g)) {
      const clean = m[1].split(/[?#]/)[0];
      const at = clean.indexOf('assets/');
      if (at >= 0) assetRefs.add(clean.slice(at + 'assets/'.length));
    }
    for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
      for (const part of m[1].split(',')) {
        const clean = part.trim().split(/\s+/)[0].split(/[?#]/)[0];
        const at = clean.indexOf('assets/');
        if (at >= 0) assetRefs.add(clean.slice(at + 'assets/'.length));
      }
    }
  }
  let missingAssets = 0;
  for (const rel of assetRefs) if (!fs.existsSync(path.join(out, 'assets', rel))) missingAssets += 1;
  if (missingAssets) fail(site, `missing assets ${missingAssets}`);

  let badLinks = 0;
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    for (const m of html.matchAll(/href="([^"]+)"/g)) {
      const href = m[1];
      const hit = articleMatch(href);
      if (!hit) continue;
      const owner = slugSite[hit.slug];
      if (!owner) continue;
      const expectedHost = domainOf(owner);
      if (hit.absolute) {
        if (hit.host !== expectedHost) { badLinks += 1; if (badLinks <= 5) warnings.push(`${site}: ${path.relative(out, file)} -> ${href} expected ${expectedHost}`); }
      } else if (owner !== site) {
        badLinks += 1;
        if (badLinks <= 5) warnings.push(`${site}: relative cross-site ${path.relative(out, file)} -> ${href} owner ${owner}`);
      }
    }
  }
  if (badLinks) fail(site, `bad article links ${badLinks}`);

  for (const req of ['CNAME', 'robots.txt', '404.html', 'sitemap.xml', 'assets/article.css']) {
    if (!fs.existsSync(path.join(out, req))) fail(site, `missing ${req}`);
  }
  if (site === 'main' && !fs.existsSync(path.join(out, 'app/index.html'))) fail(site, 'missing app');
  if (site !== 'main' && fs.existsSync(path.join(out, 'app/index.html'))) fail(site, 'app should be main-only');
  console.log(`${site}: html=${htmlFiles.length} dirs=${zhDirs.length} sitemap=${locs.length} assets=${assetRefs.size} missing=${missingAssets} badLinks=${badLinks}`);
}

// AI site remains its own pipeline.
const ai = path.join(root, 'out', 'ai');
if (!fs.existsSync(ai)) fail('ai', 'missing output');
else {
  const aiSitemap = fs.readFileSync(path.join(ai, 'sitemap.xml'), 'utf8');
  const aiLocs = [...aiSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].length;
  if (aiLocs !== 47) fail('ai', `sitemap ${aiLocs} != 47`);
  if (!fs.existsSync(path.join(ai, 'CNAME'))) fail('ai', 'missing CNAME');
  console.log(`ai: html=${walk(ai, '.html').length} sitemap=${aiLocs}`);
}

if (warnings.length) {
  console.log('\nWARNINGS');
  for (const w of warnings) console.log(`- ${w}`);
}
if (failures.length) {
  console.log(`\nFAILURES ${failures.length}`);
  for (const f of failures.slice(0, 50)) console.log(`- ${f}`);
  process.exit(1);
}
console.log('\nSITE CHECKS OK');
