import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "content");
const REQUIRED = [
  "id", "site", "type", "lang", "translation_key", "translation_status",
  "title", "summary", "slug", "canonical_site", "canonical_path", "status"
];
const LANGS = new Set(["zh", "en"]);
const TYPES = new Set([
  "page", "path", "track", "node", "article", "tool", "calculator",
  "case", "history", "literacy", "template", "update", "glossary"
]);
const STATUSES = new Set(["draft", "published", "archived"]);
const TRANSLATION_STATUSES = new Set(["source", "draft", "machine_draft", "reviewed"]);

const ROOT_FILES = new Set(["README.md", "INDEX.md", "SOURCES.md"]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!entry.isFile() || !entry.name.endsWith(".md")) return [];
    if (path.resolve(dir) === ROOT && ROOT_FILES.has(entry.name)) return [];
    return [full];
  });
}

function frontmatter(file) {
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error("missing frontmatter");
  const data = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return data;
}

const files = walk(ROOT);
const errors = [];
const records = [];
const ids = new Map();
const sourceText = fs.existsSync(path.join(ROOT, "SOURCES.md"))
  ? fs.readFileSync(path.join(ROOT, "SOURCES.md"), "utf8")
  : "";
const sourceIds = new Set([...sourceText.matchAll(/<a id="(s\d+)"><\/a>/gi)].map((m) => m[1].toUpperCase()));

for (const file of files) {
  let data;
  try {
    data = frontmatter(file);
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
    continue;
  }

  for (const key of REQUIRED) {
    if (!data[key]) errors.push(`${file}: missing ${key}`);
  }
  if (!LANGS.has(data.lang)) errors.push(`${file}: invalid lang ${data.lang}`);
  if (!TYPES.has(data.type)) errors.push(`${file}: invalid type ${data.type}`);
  if (!STATUSES.has(data.status)) errors.push(`${file}: invalid status ${data.status}`);
  if (!TRANSLATION_STATUSES.has(data.translation_status)) {
    errors.push(`${file}: invalid translation_status ${data.translation_status}`);
  }
  if (data.canonical_path && !data.canonical_path.startsWith("/")) {
    errors.push(`${file}: canonical_path must start with /`);
  }
  if (data.lang === "en" && data.canonical_path && !data.canonical_path.startsWith("/en/")) {
    errors.push(`${file}: English canonical_path must start with /en/`);
  }

  if (!data.diagram) {
    errors.push(`${file}: missing diagram`);
  } else {
    const expectedPrefix = `/images/diagrams/${data.lang}/`;
    if (!data.diagram.startsWith(expectedPrefix)) errors.push(`${file}: diagram path should start with ${expectedPrefix}`);
    const diagramFile = path.join(ROOT, data.diagram.replace(/^\//, ""));
    if (!fs.existsSync(diagramFile)) errors.push(`${file}: missing diagram asset ${data.diagram}`);
  }
  if (!data.diagram_alt) errors.push(`${file}: missing diagram_alt`);
  if (!data.diagram_caption) errors.push(`${file}: missing diagram_caption`);
  const bodyText = fs.readFileSync(file, "utf8");
  if (!bodyText.includes("<!-- DIAGRAM_START -->") || !bodyText.includes("<!-- DIAGRAM_END -->")) {
    errors.push(`${file}: missing diagram block`);
  }
  if (data.diagram && !bodyText.includes(`src="${data.diagram}"`)) {
    errors.push(`${file}: diagram block does not use ${data.diagram}`);
  }

  const sourceRefs = [...(data.sources || "").matchAll(/\bS\d{2}\b/g)].map((m) => m[0]);
  for (const sourceId of sourceRefs) {
    if (!sourceIds.has(sourceId)) errors.push(`${file}: unknown source ${sourceId}`);
  }
  if (data.site === "context") {
    if (!data.sources || data.sources === "[]") errors.push(`${file}: context page needs sources`);
    if (!bodyText.includes("<!-- SOURCES_START -->") || !bodyText.includes("<!-- SOURCES_END -->")) {
      errors.push(`${file}: context page needs a sources block`);
    }
  }

  if (ids.has(data.id)) errors.push(`${file}: duplicate id ${data.id}`);
  ids.set(data.id, file);
  records.push({ file, ...data });
}

const pairs = new Map();
for (const record of records) {
  if (!pairs.has(record.translation_key)) pairs.set(record.translation_key, {});
  const group = pairs.get(record.translation_key);
  if (group[record.lang]) {
    errors.push(`${record.file}: duplicate ${record.lang} for ${record.translation_key}`);
  }
  group[record.lang] = record;
}

for (const [key, group] of pairs) {
  if (!group.zh || !group.en) {
    errors.push(`${key}: need exactly one zh and one en`);
    continue;
  }
  const zh = group.zh;
  const en = group.en;

  for (const field of ["site", "type", "slug", "canonical_site"]) {
    if (zh[field] !== en[field]) {
      errors.push(`${key}: ${field} mismatch (${zh[field]} vs ${en[field]})`);
    }
  }
  if (en.canonical_path !== `/en${zh.canonical_path}`) {
    errors.push(`${key}: English canonical_path should be /en${zh.canonical_path}`);
  }

  if (zh.status === "published" || en.status === "published") {
    if (!["source", "reviewed"].includes(zh.translation_status)) {
      errors.push(`${key}: published zh needs source/reviewed`);
    }
    if (en.translation_status !== "reviewed") {
      errors.push(`${key}: published en needs reviewed`);
    }
  }
}

for (const file of ["README.md", "INDEX.md"]) {
  if (!fs.existsSync(path.join(ROOT, file))) errors.push(`missing content ${file}`);
}

const indexPath = path.join(ROOT, "index.json");
let index = null;
if (!fs.existsSync(indexPath)) {
  errors.push("missing index.json");
} else {
  try {
    index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  } catch (error) {
    errors.push(`index.json: ${error.message}`);
  }
}
if (index) {
  if (!Array.isArray(index.items)) {
    errors.push("index.json: missing items array");
  } else {
    if (index.items.length !== records.length) {
      errors.push(`index.json: ${index.items.length} items, expected ${records.length}`);
    }
    if (index.counts?.documents !== records.length) {
      errors.push(`index.json: documents count ${index.counts?.documents}, expected ${records.length}`);
    }
    if (index.counts?.pairs !== pairs.size) {
      errors.push(`index.json: pairs count ${index.counts?.pairs}, expected ${pairs.size}`);
    }
    const indexKeys = new Set();
    for (const item of index.items) {
      const key = `${item.id}\0${item.lang}`;
      if (indexKeys.has(key)) errors.push(`index.json: duplicate ${item.id}/${item.lang}`);
      indexKeys.add(key);
      const file = path.join(ROOT, item.file || "");
      if (!fs.existsSync(file)) errors.push(`index.json: missing file ${item.file}`);
      const record = records.find((entry) => entry.id === item.id && entry.lang === item.lang);
      if (!record) errors.push(`index.json: unknown record ${item.id}/${item.lang}`);
      else if (record.file !== file) errors.push(`index.json: file mismatch ${item.id}/${item.lang}`);
    }
    for (const record of records) {
      if (!indexKeys.has(`${record.id}\0${record.lang}`)) errors.push(`index.json: missing ${record.id}/${record.lang}`);
    }
  }
}

if (errors.length) {
  console.error(`FAIL: ${errors.length} issue(s)`);
  for (const error of errors.slice(0, 30)) console.error(`- ${error}`);
  process.exit(1);
}

const published = records.filter((record) => record.status === "published").length;
const diagrammed = records.filter((record) => record.diagram).length;
console.log(`OK: ${files.length} files, ${pairs.size} pairs, ${published} published, ${diagrammed} diagrams, ${index?.items?.length || 0} index records`);
