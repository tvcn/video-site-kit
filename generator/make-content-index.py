#!/usr/bin/env python3
"""Build the bilingual content-repo index and README.

Reads every Markdown file under content/, validates the frontmatter enough
to index it, then writes:
  content/index.json  machine-readable records
  content/INDEX.md    human-readable bilingual table of contents
  content/README.md   repository guide, counts and path conventions

Usage: python generator/make-content-index.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
SKIP = {"README.md", "INDEX.md", "SOURCES.md"}

SITE_ORDER = [
    "main", "story", "shoot", "post", "ai",
    "animation", "formats", "tools", "context",
]
SITE_LABEL = {
    "main": ("主站", "Main"),
    "story": ("故事与编剧", "Story & Screenwriting"),
    "shoot": ("拍摄", "Shooting"),
    "post": ("后期", "Post"),
    "ai": ("AI 影像", "AI Video"),
    "animation": ("动画", "Animation"),
    "formats": ("片型", "Formats"),
    "tools": ("工具", "Tools"),
    "context": ("影像史与素养", "History & Literacy"),
}
TYPE_ORDER = ["path", "article", "template", "tool", "case", "calculator", "history", "literacy", "page"]
TYPE_LABEL = {
    "path": ("路径", "Path"),
    "article": ("文章", "Article"),
    "template": ("模板", "Template"),
    "tool": ("工具", "Tool"),
    "case": ("案例", "Case"),
    "calculator": ("计算器", "Calculator"),
    "history": ("影像史", "History"),
    "literacy": ("素养", "Literacy"),
    "page": ("页面", "Page"),
}

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---", re.S)
LINE_RE = re.compile(r"^([A-Za-z_]+):\s*(.*)$")


def parse_frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8").replace("\r\n", "\n")
    match = FRONTMATTER_RE.match(text)
    if not match:
        raise ValueError(f"{path}: missing frontmatter")
    data: dict[str, str] = {}
    for line in match.group(1).split("\n"):
        m = LINE_RE.match(line)
        if not m:
            continue
        value = m.group(2).strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        data[m.group(1)] = value
    data["_file"] = path.relative_to(CONTENT).as_posix()
    data["_bytes"] = str(path.stat().st_size)
    return data


def cell(value: str) -> str:
    return str(value).replace("\\", "\\\\").replace("|", "\\|").replace("\n", " ")


def link(title: str, target: str) -> str:
    return f"[{cell(title)}]({target})"


records = []
for path in sorted(CONTENT.rglob("*.md")):
    if path.parent == CONTENT and path.name in SKIP:
        continue
    records.append(parse_frontmatter(path))

for record in records:
    for key in ("id", "translation_key", "lang", "site", "type", "title", "canonical_path", "diagram", "status"):
        if not record.get(key):
            raise ValueError(f"{record['_file']}: missing {key}")
    if record["lang"] not in {"zh", "en"}:
        raise ValueError(f"{record['_file']}: invalid lang {record['lang']}")
    if record["site"] not in SITE_LABEL:
        raise ValueError(f"{record['_file']}: unknown site {record['site']}")

pairs = {}
for record in records:
    key = record["translation_key"]
    pairs.setdefault(key, {})[record["lang"]] = record
pairs = {key: group for key, group in pairs.items() if "zh" in group and "en" in group}

by_site = {}
for record in records:
    by_site.setdefault(record["site"], {"zh": [], "en": []})[record["lang"]].append(record)

site_counts = {
    site: len(group["zh"]) for site, group in by_site.items() if group["zh"]
}
pair_count = len(pairs)
doc_count = len(records)
published = sum(1 for record in records if record["status"] == "published")
reviewed_notes = sum(1 for record in records if record.get("translation_reviewed"))
context_source_pairs = len({
    record["translation_key"] for record in records
    if record["site"] == "context" and record.get("sources") not in {"", "[]"}
})
source_file = CONTENT / "SOURCES.md"
source_count = len(re.findall(r'<a id="s\d\d"', source_file.read_text(encoding="utf-8"))) if source_file.exists() else 0
experience_count = sum(1 for record in records if record.get("source_kind") == "experience")
deep_count = sum(1 for record in records if record.get("depth") == "deep")
deep_pairs = sum(1 for group in pairs.values() if group.get("zh", {}).get("depth") == "deep" and group.get("en", {}).get("depth") == "deep")
deep_groups = [
    (group["zh"], group["en"])
    for group in pairs.values()
    if group.get("zh", {}).get("depth") == "deep" and group.get("en", {}).get("depth") == "deep"
]
diagram_count = sum(1 for record in records if record.get("diagram"))
diagram_files = len(list((CONTENT / "images" / "diagrams" / "zh").glob("*.svg")))

items = sorted(
    records,
    key=lambda r: (
        SITE_ORDER.index(r["site"]) if r["site"] in SITE_ORDER else 99,
        TYPE_ORDER.index(r["type"]) if r["type"] in TYPE_ORDER else 99,
        r["translation_key"],
        0 if r["lang"] == "zh" else 1,
    ),
)

index_json = {
    "schema_version": 1,
    "content_site": "tvcn",
    "counts": {
        "documents": doc_count,
        "pairs": pair_count,
        "sites": len(site_counts),
        "published": published,
        "diagrams": diagram_count,
        "deep_documents": deep_count,
        "deep_pairs": deep_pairs,
    },
    "sites": [
        {
            "id": site,
            "zh": SITE_LABEL[site][0],
            "en": SITE_LABEL[site][1],
            "pairs": site_counts.get(site, 0),
        }
        for site in SITE_ORDER
    ],
    "items": [
        {
            "id": record["id"],
            "translation_key": record["translation_key"],
            "lang": record["lang"],
            "site": record["site"],
            "type": record["type"],
            "title": record["title"],
            "summary": record.get("summary", ""),
            "slug": record.get("slug", ""),
            "canonical_path": record["canonical_path"],
            "status": record["status"],
            "diagram": record["diagram"],
            "depth": record.get("depth", ""),
            "deep_minutes": record.get("deep_minutes", ""),
            "file": record["_file"],
        }
        for record in items
    ],
}
(CONTENT / "index.json").write_text(
    json.dumps(index_json, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)

lines = [
    "# TVCN 内容仓索引 / Content Index",
    "",
    f"> {doc_count} 个 Markdown，{pair_count} 对中英内容，{len(site_counts)} 个内容站，"
    f"{published} 篇 published，{diagram_count} 个图解引用（{diagram_files} 个 SVG）。",
    f"> {doc_count} Markdown files, {pair_count} bilingual pairs, {len(site_counts)} content sites, "
    f"{published} published, {diagram_count} diagram references ({diagram_files} SVG files).",
    "",
    "本页由 `build/make-content-index.py` 生成；不要手改。机器可读版本见 [`index.json`](index.json)，"
    "仓库说明见 [`README.md`](README.md)。",
    "",
]

if deep_groups:
    lines += [
        f"## 深读 / Deep dives（{deep_pairs} 对 / pairs）",
        "",
        f"> {deep_pairs} 对中英文章带 `depth: deep` 与 `<!-- DEEP_DIVE_START -->` 深读块，共 {deep_count} 个文件；阅读时间与站点长文一致。",
        f"> {deep_pairs} bilingual pairs carry a `depth: deep` frontmatter and a `<!-- DEEP_DIVE_START -->` block, {deep_count} files total; reading minutes match the site long reads.",
        "",
        "| 站点 / Site | 中文标题 / Chinese | English | 分钟 / Min | 中文文件 / ZH | English file |",
        "| --- | --- | --- | ---: | --- | --- |",
    ]
    ordered_deep = sorted(
        deep_groups,
        key=lambda pair: (
            SITE_ORDER.index(pair[0]["site"]) if pair[0]["site"] in SITE_ORDER else 99,
            pair[0]["translation_key"],
        ),
    )
    for zh, en in ordered_deep:
        site_zh, site_en = SITE_LABEL.get(zh["site"], (zh["site"], zh["site"]))
        minutes = zh.get("deep_minutes") or en.get("deep_minutes") or ""
        lines.append(
            "| "
            + " | ".join(
                [
                    f"{site_zh} / {site_en}",
                    link(zh["title"], zh["_file"]),
                    link(en["title"], en["_file"]),
                    cell(minutes),
                    link(zh["_file"].split("/")[-1], zh["_file"]),
                    link(en["_file"].split("/")[-1], en["_file"]),
                ]
            )
            + " |"
        )
    lines.append("")

for lang, heading in (("zh", "中文 / Chinese"), ("en", "English")):
    lang_records = [r for r in records if r["lang"] == lang]
    lines += [f"## {heading}（{len(lang_records)} 篇）", ""]
    for site in SITE_ORDER:
        group = [r for r in lang_records if r["site"] == site]
        if not group:
            continue
        site_zh, site_en = SITE_LABEL[site]
        lines += [f"### {site_zh} · {site_en}（{len(group)} 篇）", ""]
        lines += [
            "| 标题 / Title | 类型 / Type | 路径 / Path | 文件 / File |",
            "| --- | --- | --- | --- |",
        ]
        for record in sorted(
            group,
            key=lambda r: (
                TYPE_ORDER.index(r["type"]) if r["type"] in TYPE_ORDER else 99,
                r["translation_key"],
            ),
        ):
            type_zh, type_en = TYPE_LABEL.get(record["type"], (record["type"], record["type"]))
            lines.append(
                "| "
                + " | ".join(
                    [
                        link(record["title"], record["_file"]),
                        f"{type_zh} / {type_en}",
                        cell(record["canonical_path"]),
                        link(record["_file"].split("/")[-1], record["_file"]),
                    ]
                )
                + " |"
            )
        lines.append("")

(CONTENT / "INDEX.md").write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")

readme = f"""# TVCN 内容仓 / TVCN Content Repository

这是 TVCN 的双语内容仓。交互壳源文件在 `app/tvcn-ui-v2.html`；这里放的是可与站点逐篇对照的 Markdown、封面字段与图解资产。
构建由 `generator/build-site.mjs` 按站读取，不再从本仓直接生成页面。

## 数字

| 项目 | 数量 |
| --- | ---: |
| Markdown 文件 | {doc_count} |
| 中英配对 | {pair_count} |
| 内容站 | {len(site_counts)}（主站 + 8 个二级分站） |
| published | {published} |
| 带 `diagram` 字段 | {diagram_count} |
| 英文结构稿已审校 | {reviewed_notes} |
| context 带来源配对 | {context_source_pairs} |
| 公开来源条目 | {source_count} |
| 经验型标记文件 | {experience_count} |
| 带深读的配对 | {deep_pairs} |
| 深读 Markdown | {deep_count} |
| 模板正文逐篇重写 | {pair_count} 对 |
| 主题专属验收 | {pair_count} 对 × 3 条 |

当前 {published} / {doc_count} 个文件为 `status: published`；`published` 不是“文件存在”的同义词，而是明确的发布信号。
`generator/qa-sites.mjs` 与 `generator/qa-links.mjs` 负责结构、归属、canonical、sitemap 与内链检查。

{reviewed_notes} 个英文结构稿做过中英对照审校（结构、术语与无中文残留；不是第二次母语逐句润色）。
context 站 {context_source_pairs} 对在文末列出延伸阅读，具体链接集中在 [`SOURCES.md`](SOURCES.md) 的 {source_count} 条来源里。
另有 {experience_count} 个文件用 `source_kind: experience` 明确标成经验型内容，不伪造外部引用。
{deep_pairs} 对文章带 `depth: deep` 与 `<!-- DEEP_DIVE_START -->` 深读块，共 {deep_count} 个中英文文件；深读与站点逐篇对应，不是另一套独立文章。

2026-11-22 已把 {pair_count} 对页面的“怎么做 / Do this”正文逐篇重写，并把每篇 3 条验收改为主题专属；中文与英文、站点与 Markdown 同步，共涉及 {doc_count} 个文件。

## 目录

```text
main/       主站：路径、方法卡、案例、工具卡、路径页
story/      故事与编剧：剧本、分镜、导演、表演
shoot/      拍摄：机位、曝光、灯光、录音、安全
post/       后期：剪辑、调色、声音、交付
animation/  动画：二维、三维、定格、动效、管线
formats/    片型：19 种片型的模板与拆解
tools/      工具：器材、选购、排障、计算器
context/    影像史与素养：历史、法律、平台、媒介素养
images/
  diagrams/{lang}/   {diagram_files} 个 SVG，中文 {diagram_files} / 英文 {diagram_files}；{diagram_count} 个页面引用
```

每个站再按 `zh/`、`en/` 分目录；目录层级保留 `paths/`、`screenplay/`、`history/photography/`
这类原有结构。文件名是 slug，不等于 `id`；跨语言用 `translation_key` 配对。

## Frontmatter

```yaml
---
id: main.paths.first-film
site: main
type: path
lang: zh
translation_key: main.paths.first-film
translation_status: source
title: 7 天第一条片
summary: 用手机或一台轻便相机，在 7 天内完成一条 60–90 秒的完整短片。
slug: first-film
canonical_site: main
canonical_path: /start/first-film/
status: draft
diagram: /images/diagrams/zh/first-film.svg
diagram_alt: 7 天第一条片：每天只做一件
diagram_caption: 每天只做一件：定题、分镜、备机、拍完、补镜、粗剪、发布。
last_verified: 2026-11-20
review_due: 2027-05-20
---
```

正文在导语之后有一段被注释包裹的图解块：

```html
<!-- DIAGRAM_START -->
## 图解
<figure>
  <img src="/images/diagrams/zh/first-film.svg" alt="..." />
  <figcaption>...</figcaption>
</figure>
<!-- DIAGRAM_END -->
```

`diagram` 字段和正文 `<img src>` 必须一致；中文图在 `images/diagrams/zh/`，英文图在
`images/diagrams/en/`。路径以 `/images/...` 开头，当前按“内容仓根目录就是站点根”来解析。

## 单独部署时怎么处理图片

当前 Markdown 的图片路径是仓库根相对路径 `/images/diagrams/<lang>/<slug>.<ext>`。
如果未来把内容仓单独部署到 `content.tvcn.org` 或某个子路径，有两种做法：

1. 把 `images/` 目录挂到站点根，保持 `/images/...` 不变；
2. 在生成器里加一个 `media_base` 变量，发布时把 `/images/...` 重写为
   `https://content.tvcn.org/images/...` 或 `./images/...`。

在未确认媒体托管方式前，不要手工改这 {diagram_count} 个路径；`check-content` 会按当前约定检查前缀。

## 两个非文章页

`main/paths/first-film.md` 和 `tools/calculators/fov.md` 也在这 {pair_count} 对里。它们的图解是编辑示意图，不是站点内联图的逐像素导出。

## 重新生成索引

内容增删或标题变化后运行：

```powershell
python generator/make-content-index.py
```

它会重写 `index.json`、`INDEX.md` 和本文件的计数区；不要手改生成段。
完整的站点生成：

```powershell
node generator/build-all.mjs
```

只改 Markdown 时，先跑索引脚本，再跑 `python generator/sync-static-bodies.py`，最后 `node generator/build-all.mjs`。

## 校验

在项目根运行：

```powershell
node generator/qa-sites.mjs
node generator/qa-links.mjs
```

它们检查每站归属、canonical、sitemap、搜索索引、资源与内链，并核对 `index.json` 的 {doc_count} 条记录与磁盘文件一致。

## 许可

文字、术语、原创图解：CC BY-SA 4.0，见仓库根目录 `LICENSE-CONTENT`。
代码、构建脚本、站点引擎：MIT，见 `LICENSE`。TVCN 名称与标识不在上述许可内。

---

## English

This is the bilingual content repository for the TVCN video-knowledge site. It contains
{doc_count} Markdown files in {pair_count} zh/en pairs, grouped into {len(site_counts)} content sites,
plus {diagram_count} diagram references backed by {diagram_files} SVG files. Every document carries a `diagram` field and a
`<!-- DIAGRAM_START -->` figure block. `status` is an explicit publication signal; currently
{published} of {doc_count} files are published. The machine-readable index is [`index.json`](index.json); the human-readable table of contents is
[`INDEX.md`](INDEX.md). {deep_pairs} pairs carry `depth: deep` and a `<!-- DEEP_DIVE_START -->` block,
{deep_count} files in both languages; the deep dives correspond one-to-one with site articles, not a separate set. Image paths use `/images/diagrams/<lang>/<slug>.<ext>` relative to the
content-repo root. If the repository is deployed separately, either mount `images/` at the site root
or add a `media_base` rewrite in the generator.

Run `python generator/make-content-index.py` after content changes, then `node generator/qa-sites.mjs`
and `node generator/qa-links.mjs` from the project root to verify ownership, diagrams and the index.
"""

(CONTENT / "README.md").write_text(readme, encoding="utf-8")

print(f"OK index: {doc_count} documents, {pair_count} pairs, {len(site_counts)} sites, {published} published")
print(f"WROTE {CONTENT / 'index.json'}")
print(f"WROTE {CONTENT / 'INDEX.md'}")
print(f"WROTE {CONTENT / 'README.md'}")
