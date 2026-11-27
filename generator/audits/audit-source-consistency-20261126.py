#!/usr/bin/env python3
"""V1.1 source consistency audit.

Read-only. Produces build/source-consistency-20261126.json with pair-level
status for the 490 bilingual content pairs, source registry coverage,
deep-dive external-link debt, thin field notes, and review-date debt.
"""
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

import yaml

ROOT = Path(r"C:\Users\chenhua\Desktop\tvcn")
CONTENT = ROOT / "content"
OUT = ROOT / "generator" / "audits" / "source-consistency-20261126.json"
STATIONS = ["main", "story", "shoot", "post", "animation", "formats", "tools", "context"]
FM = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)
START = "<!-- SOURCES_START -->"
END = "<!-- SOURCES_END -->"
BLOCK = re.compile(r"<!-- SOURCES_START -->(.*?)<!-- SOURCES_END -->", re.S)
URL = re.compile(r"https?://[^\s)<>\"']+")
CJK = re.compile(r"[\u4e00-\u9fff]")
EN_WORD = re.compile(r"[A-Za-z][A-Za-z'-]*")
TAG = re.compile(r"<[^>]+>")
COMMENT = re.compile(r"<!--.*?-->", re.S)
TODAY = date(2026, 11, 26)


def parse(path: Path):
    text = path.read_text(encoding="utf-8")
    m = FM.match(text)
    if not m:
        return {}, text
    try:
        meta = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError:
        meta = {}
    return meta, text[m.end():]


def visible(body: str) -> str:
    body = re.sub(r"<!-- SOURCES_START -->.*?<!-- SOURCES_END -->", " ", body, flags=re.S)
    body = COMMENT.sub(" ", body)
    body = re.sub(r"```.*?```", " ", body, flags=re.S)
    body = TAG.sub(" ", body)
    body = re.sub(r"[#*_>`~|]", " ", body)
    return re.sub(r"\s+", " ", body).strip()


def words(body: str, lang: str) -> int:
    return len(CJK.findall(visible(body))) if lang == "zh" else len(EN_WORD.findall(visible(body)))


def block_status(body: str):
    starts = body.count(START)
    ends = body.count(END)
    matches = BLOCK.findall(body)
    block_text = "\n".join(matches)
    urls = URL.findall(block_text)
    if starts == 0 and ends == 0:
        return "no_block", block_text, urls
    if starts != 1 or ends != 1 or starts != ends:
        return "malformed", block_text, urls
    if not matches:
        return "malformed", block_text, urls
    if not urls:
        if ("经验说明" in block_text) or ("Experience note" in block_text):
            return "experience_note", block_text, urls
        if "SOURCES.md" in block_text:
            return "placeholder", block_text, urls
        return "empty_block", block_text, urls
    return "has_url", block_text, urls


def experience_note(body: str) -> bool:
    tail = visible(body)[-500:]
    return ("经验说明" in tail) or ("Experience note" in tail) or ("experience note" in tail.lower())


registry_text = (CONTENT / "SOURCES.md").read_text(encoding="utf-8")
registry = {}
for line in registry_text.splitlines():
    m = re.match(r"\| <a id=\"s(\d{2})\"></a>(S\d{2}) \| (.*?) \| (.*?) \| \[(https?://[^\]]+)\]", line)
    if m:
        registry[m.group(2)] = {
            "id": m.group(2),
            "title_zh": m.group(3).strip(),
            "title_en": m.group(4).strip(),
            "url": m.group(5).strip(),
        }

pairs = defaultdict(dict)
for station in STATIONS:
    for lang in ("zh", "en"):
        folder = CONTENT / station / lang
        if not folder.exists():
            continue
        for path in sorted(folder.rglob("*.md")):
            meta, body = parse(path)
            key = str(meta.get("translation_key") or meta.get("id") or "")
            if not key:
                continue
            status, block_text, block_urls = block_status(body)
            links = re.findall(r"\[[^\]]+\]\((https?://[^)]+)\)", body)
            links += re.findall(r'href=["\'](https?://[^"\']+)["\']', body)
            sid = [str(x) for x in (meta.get("sources") or [])]
            pairs[key][lang] = {
                "station": station,
                "lang": lang,
                "path": str(path.relative_to(ROOT)),
                "type": str(meta.get("type") or ""),
                "stage": str(meta.get("stage") or ""),
                "title": str(meta.get("title") or ""),
                "summary": str(meta.get("summary") or ""),
                "slug": str(meta.get("slug") or ""),
                "words": words(body, lang),
                "deep": "<!-- DEEP_DIVE_START -->" in body,
                "external_links": len(set(links)),
                "body_external": len(set(links)),
                "source_kind": str(meta.get("source_kind") or ""),
                "source_ids": sid,
                "missing_ids": [x for x in sid if x not in registry],
                "block_status": status,
                "block_urls": block_urls,
                "placeholder": bool(block_text and ("SOURCES.md" in block_text)),
                "experience_note": experience_note(body) or ("经验说明" in block_text) or ("Experience note" in block_text),
                "last_verified": str(meta.get("last_verified") or ""),
                "review_due": str(meta.get("review_due") or ""),
                "related": meta.get("related") or [],
                "status": str(meta.get("status") or ""),
            }

rows = []
for key, langs in sorted(pairs.items()):
    zh = langs.get("zh")
    en = langs.get("en")
    if not zh or not en:
        continue
    statuses = {zh["block_status"], en["block_status"]}
    if "malformed" in statuses:
        pstatus = "malformed"
    elif "has_url" in statuses:
        pstatus = "has_url"
    elif "placeholder" in statuses:
        pstatus = "placeholder"
    elif "experience_note" in statuses:
        pstatus = "experience_note" if (zh["experience_note"] and en["experience_note"]) else "experience_no_note"
    elif "no_block" in statuses and "sourced" in {zh["source_kind"], en["source_kind"]}:
        pstatus = "no_block"
    elif "no_block" in statuses and "experience" in {zh["source_kind"], en["source_kind"]}:
        pstatus = "experience_no_note" if not (zh["experience_note"] and en["experience_note"]) else "experience_note"
    else:
        pstatus = "no_block"
    rows.append({
        "translation_key": key,
        "station": zh["station"],
        "type": zh["type"],
        "stage": zh["stage"],
        "title_zh": zh["title"],
        "title_en": en["title"],
        "slug": zh["slug"],
        "words_zh": zh["words"],
        "words_en": en["words"],
        "deep": zh["deep"] or en["deep"],
        "source_kind": zh["source_kind"] or en["source_kind"],
        "source_ids": sorted(set(zh["source_ids"] + en["source_ids"])),
        "missing_ids": sorted(set(zh["missing_ids"] + en["missing_ids"])),
        "source_block_status": pstatus,
        "zh_block_status": zh["block_status"],
        "en_block_status": en["block_status"],
        "zh_external": zh["external_links"],
        "en_external": en["external_links"],
        "placeholder": zh["placeholder"] or en["placeholder"],
        "experience_note": zh["experience_note"] and en["experience_note"],
        "last_verified": zh["last_verified"],
        "review_due": zh["review_due"],
        "related": zh["related"],
        "path_zh": zh["path"],
        "path_en": en["path"],
        "status": zh["status"],
    })

status_counts = Counter(r["source_block_status"] for r in rows)
BASE_PATH = Path(__file__).with_name("source-consistency-baseline-20261126.json")
BASE_ROWS = json.loads(BASE_PATH.read_text(encoding="utf-8"))["pages"] if BASE_PATH.exists() else []
# 基线文件属于旧结构，未迁移时退化为“全部页”，避免 source_pages_total 恒为 0。
cohort = (
    {r["translation_key"] for r in BASE_ROWS if r["source_kind"] == "sourced" or r["source_block_status"] in {"has_url", "placeholder", "malformed"}}
    if BASE_ROWS
    else {r["translation_key"] for r in rows}
)
for r in rows:
    r["cohort"] = r["translation_key"] in cohort
source_pages = [r for r in rows if r["cohort"]]
deep_missing = [r for r in rows if r["deep"] and (r["zh_external"] == 0 or r["en_external"] == 0)]
thin = [r for r in rows if r["type"] == "article" and 300 <= r["words_zh"] <= 449]
no_external = [r for r in rows if r["type"] == "article" and r["zh_external"] == 0]
experience_pages = [r for r in rows if r["source_kind"] == "experience"]
experience_no_note = [r for r in experience_pages if not r["experience_note"]]
review_missing = [r for r in rows if not r["last_verified"] or not r["review_due"]]
review_overdue = []
for r in rows:
    try:
        if r["review_due"] and date.fromisoformat(r["review_due"]) < TODAY:
            review_overdue.append(r)
    except ValueError:
        review_missing.append(r)

refs = Counter()
for r in rows:
    refs.update(r["source_ids"])

out = {
    "audit_date": TODAY.isoformat(),
    "content_pairs": len(rows),
    "zh": sum(1 for r in rows if r["words_zh"] > 0),
    "en": sum(1 for r in rows if r["words_en"] > 0),
    "source_registry_ids": len(registry),
    "source_registry_links": len(registry),
    "source_registry_referenced": len(refs),
    "source_registry_unused": sorted(set(registry) - set(refs)),
    "source_registry_missing_refs": sorted({x for r in rows for x in r["missing_ids"]}),
    "source_pages_total": len(source_pages),
    "source_pages_with_real_url": sum(1 for r in source_pages if r["source_block_status"] == "has_url"),
    "source_pages_placeholder": sum(1 for r in source_pages if r["source_block_status"] == "placeholder"),
    "source_pages_malformed": sum(1 for r in source_pages if r["source_block_status"] == "malformed"),
    "source_pages_no_block": sum(1 for r in source_pages if r["source_block_status"] == "no_block"),
    "source_pages_with_experience_note": sum(1 for r in source_pages if r["source_block_status"] == "experience_note"),
    "sourced_pairs": sum(1 for r in rows if r["source_kind"] == "sourced"),
    "sourced_no_visible_source": sum(1 for r in rows if r["source_kind"] == "sourced" and r["source_block_status"] != "has_url"),
    "experience_pages_total": len(experience_pages),
    "experience_with_note": sum(1 for r in experience_pages if r["experience_note"]),
    "experience_no_note": len(experience_no_note),
    "experience_no_note_list": [r["translation_key"] for r in experience_no_note],
    "deep_pairs": sum(1 for r in rows if r["deep"]),
    "deep_no_external": len(deep_missing),
    "deep_missing_external": deep_missing,
    "thin_300_449": len(thin),
    "thin_300_449_list": thin,
    "no_external": len(no_external),
    "no_external_by_station": dict(Counter(r["station"] for r in no_external)),
    "no_external_by_stage": dict(Counter(r["stage"] for r in no_external)),
    "no_external_deep": sum(1 for r in no_external if r["deep"]),
    "review_missing": len(review_missing),
    "review_overdue": len(review_overdue),
    "review_missing_list": [r["translation_key"] for r in review_missing],
    "review_overdue_list": [r["translation_key"] for r in review_overdue],
    "status_counts": dict(status_counts),
    "pages": rows,
}

OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({k: out[k] for k in [
    "content_pairs", "source_registry_ids", "source_registry_referenced",
    "source_pages_total", "source_pages_with_real_url", "source_pages_placeholder",
    "source_pages_malformed", "source_pages_no_block", "source_pages_with_experience_note",
    "sourced_pairs", "sourced_no_visible_source", "experience_pages_total", "experience_with_note", "experience_no_note",
    "deep_no_external", "thin_300_449",
    "no_external", "review_missing", "review_overdue", "status_counts",
]}, ensure_ascii=False, indent=2))
print("WROTE", OUT)
