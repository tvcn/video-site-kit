#!/usr/bin/env python3
"""Sync every Markdown body into generator/data/static-articles-data.json.

The static builder reads `html` fragments from this JSON, not from
content/.  Earlier V1.1 work edited the Markdown bodies but only patched the
source asides in the JSON, so a rebuild would have shipped old bodies.  This
pass replaces each fragment's <article class="article-body"> with the current
Markdown, keeps the existing hero/diagram/credit, and replaces the old source
aside with the current visible source block.
"""
from __future__ import annotations

import html as html_mod
import json
import re
from pathlib import Path

import markdown
import yaml

ROOT = Path(r"C:\Users\chenhua\Desktop\tvcn")
DATA_PATH = ROOT / "generator" / "data" / "static-articles-data.json"
INDEX_PATH = ROOT / "content" / "index.json"
LOG_PATH = ROOT / "generator" / "data" / "sync-static-bodies.json"

FM = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)
ARTICLE = re.compile(r'(<article class="article-body">)(.*?)(</article>)', re.S)
SECTION_BODY = re.compile(r'(<section class="article-body">)(.*?)(</section>)', re.S)
ASIDE = re.compile(r'<aside class="article-sources[^"]*"[^>]*>.*?</aside>', re.S)
CHECK = re.compile(r'<div class="check-box[^"]*">.*?</div>', re.S)
DIAGRAM = re.compile(r"<!-- DIAGRAM_START -->.*?<!-- DIAGRAM_END -->", re.S)
BODY_OPEN = re.compile(r'<(article|section) class="article-body">')
BOUNDARY = re.compile(r'<section>\s*<h2[^>]*>\s*(?:边界|Boundary)\s*</h2>.*?</section>\s*', re.S)
OUTER_SECTION = re.compile(r'<section[^>]*>\s*<h2[^>]*>(?P<h>.*?)</h2>.*?</section>\s*', re.S)
H2 = re.compile(r'<h2[^>]*>(.*?)</h2>', re.S)
SOURCES_START = "<!-- SOURCES_START -->"
SOURCES_END = "<!-- SOURCES_END -->"


def render(md_text: str) -> str:
    return markdown.markdown(md_text, extensions=["extra", "sane_lists"])


def split_body(text: str) -> tuple[str, str]:
    body = text
    if SOURCES_START in body:
        body, tail = body.split(SOURCES_START, 1)
        source = tail.split(SOURCES_END, 1)[0] if SOURCES_END in tail else tail
        return body.strip(), source.strip()
    return body.strip(), ""


def source_aside(raw_md: str, kind: str, lang: str) -> str:
    if not raw_md:
        return ""
    zh = lang == "zh"
    heading = "经验说明 / Experience note" if kind == "experience" else ("来源 / Sources" if zh else "Sources / 来源")
    intro = ("本页把现场判断和公开资料分开；没有外部来源时只写经验边界。"
             if zh else "This page separates field judgement from public references; where there is no external source, it states the field limits.")
    body = render(raw_md)
    return (f'<aside class="article-sources" data-source-kind="{kind}">\n'
            f'<div class="article-credit-head"><p class="eyebrow">{heading}</p><span class="mono">{"无外部引用" if kind == "experience" and zh else "No external citation" if kind == "experience" else "公开来源与现场复核" if zh else "Public references and field review"}</span></div>\n'
            f'<p class="source-types">{intro}</p>\n{body}</aside>')


def body_span(fragment: str):
    """返回正文容器的 (start, end)；section 容器按嵌套深度配对。"""
    m = BODY_OPEN.search(fragment)
    if not m:
        return None
    if m.group(1) == "article":
        end = fragment.find("</article>", m.end())
        return (m.start(), end + len("</article>")) if end >= 0 else None
    depth = 1
    pos = m.end()
    for tag in re.finditer(r"<section\b[^>]*>|</section>", fragment[m.end():]):
        depth += 1 if tag.group(0).startswith("<section") else -1
        if depth == 0:
            end = m.end() + tag.end()
            return (m.start(), end)
    return None


def dedupe_boundary(fragment: str) -> tuple[str, bool]:
    """正文已有同名小节时，删掉正文外的旧壳副本（边界与 v11 追加段）。"""
    span = body_span(fragment)
    if not span:
        return fragment, False
    start, stop = span
    body = fragment[fragment.index(">", start) + 1: stop]
    body = re.sub(r"</(?:article|section)>\s*$", "", body)
    heads = {strip_tags(x).strip() for x in H2.findall(body)}
    if not heads:
        return fragment, False
    removed = 0

    def clean(part: str) -> str:
        nonlocal removed

        def repl(mm):
            nonlocal removed
            if strip_tags(mm.group("h")).strip() in heads:
                removed += 1
                return ""
            return mm.group(0)

        part = OUTER_SECTION.sub(repl, part)
        # aside / related 里的标题是壳自己的，不能动；只清理正文外的裸 <h2> 段。
        guards = list(re.finditer(r'<aside[\s\S]*?</aside>|<div class="related">[\s\S]*?</div>', part))
        segments, cursor = [], 0
        for g in guards:
            segments.append((cursor, g.start()))
            cursor = g.end()
        segments.append((cursor, len(part)))
        pieces = []
        for s, e in segments:
            chunk = part[s:e]
            hits = [m for m in H2.finditer(chunk) if strip_tags(m.group(1)).strip() in heads]
            for m in reversed(hits):
                end = len(chunk)
                for nxt in re.finditer(r"<h2[\s>]", chunk[m.end():]):
                    end = m.end() + nxt.start()
                    break
                chunk = chunk[: m.start()] + chunk[end:]
                removed += 1
            pieces.append(chunk)
        out, cursor = "", 0
        for (s, e), piece in zip(segments, pieces):
            out += part[cursor:s] + piece
            cursor = e
        return out + part[cursor:]

    head = clean(fragment[:start])
    tail = clean(fragment[stop:])
    return head + fragment[start:stop] + tail, removed > 0


def drop_extra_bodies(fragment: str) -> tuple[str, int]:
    """旧壳里可能有两个 article-body：保留刚写入的第一个，删掉后面遗留的整块。"""
    opens = [m for m in re.finditer(r'<article class="article-body">', fragment)]
    if len(opens) < 2:
        return fragment, 0
    removed = 0
    out = fragment
    while True:
        opens = [m for m in re.finditer(r'<article class="article-body">', out)]
        if len(opens) < 2:
            break
        start = opens[1].start()
        close = out.find("</article>", start)
        if close < 0:
            break
        out = out[:start] + out[close + len("</article>"):]
        removed += 1
    return out, removed


def strip_tags(text: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", text or "")).strip()


def main() -> int:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    index = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
    maps = {
        "zh": {(x["site"], x["id"]): x for x in data["zh"]},
        "en": {(x["site"], x["id"]): x for x in data["en"]},
    }
    log = {"pages": 0, "missing": [], "with_source": 0, "without_source": 0, "diagram_removed": 0}
    for item in index["items"]:
        if item.get("status") != "published":
            continue
        path = ROOT / "content" / item["file"]
        text = path.read_text(encoding="utf-8")
        m = FM.match(text)
        if not m:
            continue
        meta = yaml.safe_load(m.group(1)) or {}
        body_md, source_md = split_body(text[m.end():])
        lang = item["lang"]
        entry = maps[lang].get((item["site"], item["slug"]))
        if not entry or not entry.get("html"):
            log["missing"].append(item["file"])
            continue
        source_html = source_aside(source_md, str(meta.get("source_kind") or "experience"), lang)
        old = entry["html"]
        old_article = ARTICLE.search(old)
        old_body = old_article.group(2) if old_article else ""
        old_figures = re.findall(r'<figure class="[^"]*diagram[^"]*">.*?</figure>', old_body, re.S)
        body_html = render(body_md)
        diagram_name = f"{item['slug']}-en.svg" if lang == "en" else f"{item['slug']}.svg"
        asset_prefix = "../../../assets/notes/" if lang == "en" else "../../assets/notes/"
        body_html = re.sub(
            rf'src="/images/diagrams/{lang}/[^"]+"',
            f'src="{asset_prefix}{diagram_name}"',
            body_html,
        )
        if '<figure class="diagram">' in old:
            body_html2 = DIAGRAM.sub("", body_html).strip()
            if body_html2 != body_html:
                log["diagram_removed"] += 1
            body_html = body_html2
        if old_figures:
            body_html = re.sub(r'<figure class="[^"]*diagram[^"]*">.*?</figure>', '', body_html, flags=re.S).rstrip()
            body_html += "\n" + "\n".join(old_figures)
            log["figures_preserved"] = log.get("figures_preserved", 0) + len(old_figures)
        if ARTICLE.search(old):
            old = ARTICLE.sub(lambda mm: mm.group(1) + body_html + mm.group(3), old, count=1)
        elif SECTION_BODY.search(old):
            old = SECTION_BODY.sub(lambda mm: mm.group(1) + body_html + mm.group(3), old, count=1)
        elif '<article class="article-body">' in old:
            # A few legacy fragments (the ten composite cases, first-film and
            # fov) never closed the <article> tag. Replace up to the related
            # block and close it here.
            start = old.find('<article class="article-body">') + len('<article class="article-body">')
            end = old.find('<div class="related">', start)
            if end < 0:
                continue
            old = old[:start] + body_html + "</article>\n" + old[end:]
        else:
            continue
        old = CHECK.sub("", old)
        old = ASIDE.sub("", old)
        if source_html:
            log["with_source"] += 1
            if '<div class="related">' in old:
                # 固定插入点前的空白，避免每次构建多出一行空行。
                old = re.sub(r"\s*<div class=\"related\">", lambda mm: f'\n{source_html}\n<div class="related">', old, count=1)
            else:
                # insert before the final closing wrapper div
                old = old.rstrip()
                if old.endswith("</div>"):
                    old = old[: -len("</div>")].rstrip() + "\n" + source_html + "\n</div>"
                else:
                    old += "\n" + source_html
        else:
            log["without_source"] += 1
        old, deduped = dedupe_boundary(old)
        if deduped:
            log["boundary_deduped"] = log.get("boundary_deduped", 0) + 1
        old, extra = drop_extra_bodies(old)
        if extra:
            log["extra_bodies_removed"] = log.get("extra_bodies_removed", 0) + extra
        entry["html"] = old
        log["pages"] += 1
    data["meta"]["articles"] = sum(1 for item in index["items"] if item.get("lang") == "zh")
    data["meta"]["deep_pairs"] = sum(1 for item in index["items"] if item.get("lang") == "zh" and item.get("depth") == "deep")
    data["meta"]["documents"] = len(index["items"])
    data["meta"]["deep"] = data["meta"]["deep_pairs"]
    data["meta"]["generated"] = "2026-11-27"
    DATA_PATH.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    LOG_PATH.write_text(json.dumps(log, ensure_ascii=False, indent=2), encoding="utf-8")
    print("synced", log["pages"], "pages; source", log["with_source"], "diagram removed", log["diagram_removed"],
          "boundary deduped", log.get("boundary_deduped", 0), "missing", len(log["missing"]))
    return 0 if not log["missing"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
