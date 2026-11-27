// 入站链接与主题枢纽审计：直接扫描 out/，不依赖旧 build/ 链接图。
// 输出：generator/audits/inbound-links.json
//
// 口径：
//   正文页   = /article/<slug>/ 与 /en/article/<slug>/，且不是兼容跳转页、旧 AI 兼容页
//   兼容页   = 带 meta refresh 的旧 URL 跳转页（主站 429 对）与 canonical 指向 ai.tvcn.org 的旧 AI 页（84 对）
//   inbound_total = 同站其他页面的站内链接（排除自链）
//   inbound_editorial = 只统计来自其他正文页的链接（不含首页/索引/搜索/主题等聚合页）
// 通过条件：正文页 inbound_total 全不为 0；主站每个主题页至少 8 个子链接；主题页无失效子链接。
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/chenhua/Desktop/tvcn';
const OUT = path.join(ROOT, 'out');
const REPORT = path.join(ROOT, 'generator/audits/inbound-links.json');
const HREF = /href="([^"]+)"/g;
const REFRESH = /http-equiv="refresh"/i;
const AI_CANONICAL = /rel="canonical" href="https:\/\/ai\.tvcn\.org/i;

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

function articleKey(rel) {
  const m = rel.match(/^(en\/)?article\/([^/]+)\/index\.html$/);
  return m ? `${m[1] || ''}${m[2]}` : null;
}

function resolveHref(pageFile, siteDir, href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || /^(https?:|mailto:|tel:|javascript:|data:)/.test(clean)) return null;
  const target = clean.startsWith('/') ? path.join(siteDir, clean) : path.resolve(path.dirname(pageFile), clean);
  if (clean.endsWith('/')) return path.join(target, 'index.html');
  return path.extname(target) ? target : path.join(target, 'index.html');
}

const sites = fs.readdirSync(OUT, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
const report = { audited_at: new Date().toISOString().slice(0, 10), sites: {}, totals: {} };
let grandArticles = 0;
const grandOrphans = [];
const grandGaps = [];

for (const site of sites) {
  const siteDir = path.join(OUT, site);
  const files = walk(siteDir);
  const html = new Map();
  const real = new Map();
  const stubs = new Map();
  for (const f of files) {
    const rel = path.relative(siteDir, f).replace(/\\/g, '/');
    const body = fs.readFileSync(f, 'utf8');
    html.set(f, body);
    const key = articleKey(rel);
    if (!key) continue;
    if (REFRESH.test(body) || AI_CANONICAL.test(body)) stubs.set(f, key);
    else real.set(f, key);
  }
  const inboundAll = new Map();
  const inboundArticle = new Map();
  for (const [f, body] of html) {
    const from = real.get(f);
    const seen = new Set();
    for (const m of body.matchAll(HREF)) {
      const target = resolveHref(f, siteDir, m[1]);
      if (!target || target === f) continue;
      const key = real.get(target) || stubs.get(target);
      if (!key) continue;
      const id = `${real.has(target) ? 'r' : 's'}:${key}`;
      if (seen.has(id)) continue;
      seen.add(id);
      if (!real.has(target)) continue;
      inboundAll.set(key, (inboundAll.get(key) || 0) + 1);
      if (from && from !== key) inboundArticle.set(key, (inboundArticle.get(key) || 0) + 1);
    }
  }
  const nodes = [...new Set(real.values())].sort();
  const orphans = nodes.filter((k) => !(inboundAll.get(k) || 0));
  const gaps = nodes.filter((k) => (inboundArticle.get(k) || 0) < 2);
  const dist = { e0: 0, e1: 0, e2to3: 0, e4to9: 0, e10plus: 0 };
  for (const k of nodes) {
    const n = inboundArticle.get(k) || 0;
    if (n === 0) dist.e0++;
    else if (n === 1) dist.e1++;
    else if (n < 4) dist.e2to3++;
    else if (n < 10) dist.e4to9++;
    else dist.e10plus++;
  }
  report.sites[site] = {
    html_pages: files.length,
    article_pages: nodes.length,
    compat_pages: stubs.size,
    orphan_pages: orphans.length,
    orphan_list: orphans.slice(0, 50),
    editorial_lt2: gaps.length,
    editorial_lt2_list: gaps.slice(0, 50),
    editorial_distribution: dist,
  };
  if (site === 'main') {
    const topicFiles = files.filter((f) => /^(en\/)?topics\/(.+\/)?index\.html$/.test(path.relative(siteDir, f).replace(/\\/g, '/')));
    const hubs = [];
    const broken = [];
    for (const f of topicFiles) {
      const rel = path.relative(siteDir, f).replace(/\\/g, '/');
      const isIndex = /^(en\/)?topics\/index\.html$/.test(rel);
      const links = [...html.get(f).matchAll(HREF)]
        .map((m) => m[1])
        .filter((h) => (isIndex ? h.endsWith('/') && !/^(\.\.\/|http|#|\?)/.test(h) : h.includes('/article/')));
      for (const h of links) {
        const t = resolveHref(f, siteDir, h);
        if (t && !fs.existsSync(t)) broken.push({ page: rel, href: h });
      }
      hubs.push({ page: rel, child_links: links.length });
    }
    hubs.sort((a, b) => a.page.localeCompare(b.page));
    const under = hubs.filter((h) => h.child_links < 8);
    Object.assign(report.sites.main, {
      topic_hubs: hubs.length,
      topic_hubs_min_children: hubs.length ? Math.min(...hubs.map((h) => h.child_links)) : null,
      topic_hubs_under8: under,
      topic_hub_broken: broken.length,
      topic_hub_broken_list: broken.slice(0, 30),
      hubs,
    });
  }
  grandArticles += nodes.length;
  grandOrphans.push(...orphans.map((k) => `${site}:${k}`));
  grandGaps.push(...gaps.map((k) => `${site}:${k}`));
  console.log(
    site.padEnd(10),
    `pages ${String(files.length).padStart(5)}`,
    `articles ${String(nodes.length).padStart(4)}`,
    `compat ${String(stubs.size).padStart(4)}`,
    `orphan ${String(orphans.length).padStart(3)}`,
    `editorial<2 ${String(gaps.length).padStart(4)}`,
    report.sites[site].topic_hubs ? `hubs ${report.sites[site].topic_hubs} min ${report.sites[site].topic_hubs_min_children} broken ${report.sites[site].topic_hub_broken}` : ''
  );
}

const m = report.sites.main;
report.totals = {
  article_pages: grandArticles,
  compat_pages: Object.values(report.sites).reduce((s, x) => s + x.compat_pages, 0),
  orphan_pages: grandOrphans.length,
  orphan_list: grandOrphans.slice(0, 100),
  editorial_lt2: grandGaps.length,
  editorial_lt2_list: grandGaps.slice(0, 100),
  topic_hubs: m.topic_hubs,
  topic_hubs_min_children: m.topic_hubs_min_children,
  topic_hubs_under8: m.topic_hubs_under8.length,
  topic_hub_broken: m.topic_hub_broken,
};
fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
console.log(`TOTAL articles ${grandArticles} compat ${report.totals.compat_pages} orphan ${grandOrphans.length} editorial<2 ${grandGaps.length}`);
console.log('WROTE', REPORT);
