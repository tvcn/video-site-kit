// Internal link and asset existence check for out/<site>.
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/chenhua/Desktop/tvcn';
const registry = JSON.parse(fs.readFileSync(path.join(root, 'site-kit/sites.json'), 'utf8'));
let total = 0;
const broken = [];

function walk(dir, ext, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, ext, out);
    else if (!ext || full.endsWith(ext)) out.push(full);
  }
  return out;
}
function existsTarget(siteRoot, baseDir, raw) {
  let clean = String(raw).split('#')[0].split('?')[0];
  if (!clean) clean = './';
  if (/^['"+]/.test(clean) || /^\$\{/.test(clean)) return true;
  if (/^(?:https?:)?\/\//i.test(clean) || /^(?:mailto:|javascript:|data:)/i.test(clean)) return true;
  let target;
  if (clean.startsWith('/')) target = path.join(siteRoot, clean);
  else target = path.resolve(baseDir, clean);
  if (!target.startsWith(siteRoot)) return true;
  try {
    const stat = fs.statSync(target);
    if (stat.isDirectory()) target = path.join(target, 'index.html');
  } catch {
    return false;
  }
  return fs.existsSync(target);
}

for (const cfg of registry.sites) {
  const site = cfg.id;
  const siteRoot = path.join(root, 'out', site);
  if (!fs.existsSync(siteRoot)) { broken.push(`${site}: missing output`); continue; }
  for (const file of walk(siteRoot, '.html')) {
    const html = fs.readFileSync(file, 'utf8');
    let baseDir = path.dirname(file);
    const baseTag = html.match(/<base href="([^"]+)">/);
    if (baseTag) {
      baseDir = baseTag[1].startsWith('/') ? path.join(siteRoot, baseTag[1]) : path.resolve(path.dirname(file), baseTag[1]);
    }
    for (const m of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
      total += 1;
      if (!existsTarget(siteRoot, baseDir, m[1])) broken.push(`${site}: ${path.relative(siteRoot, file)} -> ${m[1]}`);
    }
    for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
      for (const part of m[1].split(',')) {
        const url = part.trim().split(/\s+/)[0];
        if (!url) continue;
        total += 1;
        if (!existsTarget(siteRoot, baseDir, url)) broken.push(`${site}: ${path.relative(siteRoot, file)} -> ${url}`);
      }
    }
  }
}

console.log(`checked ${total} internal links/assets, broken ${broken.length}`);
for (const b of broken.slice(0, 80)) console.log(`- ${b}`);
if (broken.length) process.exit(1);
console.log('LINK CHECKS OK');
