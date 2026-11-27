// Build, assemble and verify all nine sites.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/chenhua/Desktop/tvcn';
const sites = ['main', 'story', 'shoot', 'post', 'animation', 'formats', 'tools', 'context'];
const run = (script, args = []) => execFileSync(process.execPath, [script, ...args], { cwd: root, stdio: 'inherit' });
const runPy = (rel, args = []) => execFileSync('python', [path.join(root, rel), ...args], { cwd: root, stdio: 'inherit' });

// Markdown 是唯一内容源：每次构建先重建索引，再把正文渲染进页面片段缓存。
runPy('generator/make-content-index.py');
runPy('generator/sync-static-bodies.py');

for (const site of sites) {
  run('generator/build-site.mjs', [`--site=${site}`]);
  run('generator/assemble-site.mjs', [`--site=${site}`]);
}

execFileSync('python', [path.join(root, 'generator/ai6/build_site.py'), '--out', path.join(root, 'generator/ai6/site')], { cwd: root, stdio: 'inherit' });
const aiOut = path.join(root, 'out', 'ai');
fs.rmSync(aiOut, { recursive: true, force: true });
fs.cpSync(path.join(root, 'generator/ai6/site'), aiOut, { recursive: true });
execFileSync('python', [path.join(root, 'generator/ai6/qa_site.py'), '--site', path.join(root, 'out/ai')], { cwd: root, stdio: 'inherit' });

run('generator/qa-sites.mjs');
run('generator/qa-links.mjs');
run('generator/audits/audit-inbound-links.mjs');
runPy('generator/audits/audit-intent-clusters.py');

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else files.push(full);
  }
})(path.join(root, 'out'));
const bytes = files.reduce((sum, f) => sum + fs.statSync(f).size, 0);
console.log(`OUT: ${files.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
