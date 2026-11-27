#!/usr/bin/env python3
"""TVCN 2026-11-26 content quality baseline.

One row per bilingual content pair; plus AI pages and static hubs/glossary.
This is deliberately conservative: it flags only observable defects and
structural gaps, not "writing style". Human review still owns the final A/S.
"""
from __future__ import annotations

import csv, json, re
from collections import Counter, defaultdict
from pathlib import Path

import yaml

ROOT = Path(r"C:\Users\chenhua\Desktop\tvcn")
CONTENT = ROOT / "content"
STATIC = ROOT / "out"
AI_SITE = ROOT / "generator" / "ai6" / "site"
OUT_CSV = ROOT / "generator" / "audits" / "content-quality-inventory-2026-11-26.csv"
OUT_JSON = ROOT / "generator" / "audits" / "content-quality-inventory-2026-11-26.json"
S_SELECTION = ROOT / "generator" / "audits" / "data" / "topic-s-pages-2026-11-26.json"
if S_SELECTION.exists():
    S_KEYS = {x["translation_key"] for x in json.loads(S_SELECTION.read_text(encoding="utf-8")).get("picks", [])}
else:
    S_KEYS = set()

STATIONS = ["main", "story", "shoot", "post", "animation", "formats", "tools", "context"]
FRONT = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)
H2 = re.compile(r"<h2[^>]*>(.*?)</h2>", re.S | re.I)
DEEP = "<!-- DEEP_DIVE_START -->"
SOURCES = "<!-- SOURCES_START -->"
SID = re.compile(r"\[\s*S(\d{1,2})\s*\]")
CJK = re.compile(r"[\u4e00-\u9fff]")
ENW = re.compile(r"[A-Za-z][A-Za-z'-]*")
TAG = re.compile(r"<[^>]+>")
COMMENT = re.compile(r"<!--.*?-->", re.S)


def parse(path: Path):
    text = path.read_text(encoding="utf-8")
    m = FRONT.match(text)
    if not m:
        return {}, text
    raw, body = m.group(1), text[m.end():]
    try:
        meta = yaml.safe_load(raw) or {}
    except yaml.YAMLError:
        meta = {}
    return meta, body


def visible(text: str) -> str:
    text = COMMENT.sub(" ", text)
    text = TAG.sub(" ", text)
    text = re.sub(r"[#*_>`~|]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def words(text: str, lang: str) -> int:
    return len(CJK.findall(text)) if lang == "zh" else len(ENW.findall(text))


def headings(body: str):
    return [re.sub(TAG, "", h).strip() for h in H2.findall(body)]


def has_any(hs: list[str], terms: list[str]) -> bool:
    return any(any(t.lower() in h.lower() for t in terms) for h in hs)


def source_claim(body: str, lang: str) -> str:
    if lang == "zh":
        m = re.search(r"用于核对(?:首段|：|:)?“([^”]+)”", body)
    else:
        m = re.search(r"checks?.{0,40}opening paragraph[^“]*“([^”]+)”", body, re.I)
        if not m:
            m = re.search(r"Used to check[^“]*“([^”]+)”", body, re.I)
    return m.group(1).strip() if m else ""


def empty_headings(body: str) -> int:
    """H2 immediately followed by another heading/section close with no text."""
    n = 0
    for m in re.finditer(r"<h2[^>]*>.*?</h2>", body, re.S | re.I):
        tail = body[m.end():]
        # Strip whitespace and comments before checking the next block.
        tail = COMMENT.sub("", tail)
        if re.match(r"\s*(?:</section>|<section\b|<h2\b|</article>)", tail, re.I):
            n += 1
    return n


def static_html_for(station: str, slug: str, lang: str) -> str:
    # static pages live under /article/<slug>/index.html (or en/article/...)
    cand = STATIC / station / ("en" if lang == "en" else "") / "article" / slug / "index.html"
    if cand.exists():
        return cand.read_text(encoding="utf-8", errors="replace")
    return ""


def source_block_text(body: str) -> str:
    if SOURCES not in body:
        return ""
    return body.split(SOURCES, 1)[1].split("<!-- SOURCES_END -->", 1)[0]


def body_without_source(body: str) -> str:
    if SOURCES not in body:
        return visible(body)
    return visible(body.split(SOURCES, 1)[0])


def pair_rows():
    by_key = defaultdict(dict)
    for station in STATIONS:
        for lang in ("zh", "en"):
            folder = CONTENT / station / lang
            for path in sorted(folder.rglob("*.md")):
                meta, body = parse(path)
                key = str(meta.get("translation_key") or "")
                if not key:
                    continue
                by_key[key][lang] = (meta, body, path)
    rows = []
    for key, pair in sorted(by_key.items()):
        if not pair.get("zh") or not pair.get("en"):
            continue
        zh_meta, zh_body, zh_path = pair["zh"]
        en_meta, en_body, en_path = pair["en"]
        hs_zh, hs_en = headings(zh_body), headings(en_body)
        w_zh, w_en = words(visible(zh_body), "zh"), words(visible(en_body), "en")
        sid_zh = [f"S{int(x):02d}" for x in SID.findall(source_block_text(zh_body))]
        sid_en = [f"S{int(x):02d}" for x in SID.findall(source_block_text(en_body))]
        source_kind = str(zh_meta.get("source_kind") or "")
        front_sources = [str(x) for x in (zh_meta.get("sources") or [])]
        claim_zh = source_claim(zh_body, "zh")
        claim_en = source_claim(en_body, "en")
        opening_claim = ("用于核对首段" in zh_body) or ("opening paragraph" in en_body.lower())
        generic_template = ("模板每段都有，但人物没有决定" in zh_body) or ("Every beat exists, but no one makes a decision" in en_body) or ("template only orders structure" in en_body.lower())
        case_disclosure = ("复合" in zh_body or "匿名" in zh_body or "脱敏" in zh_body or "不对应单一" in zh_body) and ("composite" in en_body.lower() or "anonymi" in en_body.lower() or "withheld" in en_body.lower())
        related = zh_meta.get("related") or []
        related_unique = len(set(str(x).replace(".en", "") for x in related))
        # type-aware required sections
        typ = str(zh_meta.get("type") or "")
        fail_terms = ["失败", "翻车", "别踩", "不要用", "避坑", "Failures", "Avoid", "What goes wrong"]
        limit_terms = ["边界", "限制", "不解决", "什么时候不该用", "Limits", "When not", "Not for"]
        test_terms = ["验收", "检查", "60 秒自测", "10 分钟练习", "Check", "Test", "Exercise"]
        main_text_zh = body_without_source(zh_body)
        main_text_en = body_without_source(en_body)
        concept_fail = has_any(hs_zh, fail_terms) or has_any(hs_en, fail_terms) or any(t in main_text_zh for t in ["失败", "翻车", "别把", "别在", "不要用", "会坏", "会出问题"]) or any(t.lower() in main_text_en.lower() for t in ["failure", "fails", "avoid", "do not", "don't"])
        concept_limit = has_any(hs_zh, limit_terms) or has_any(hs_en, limit_terms) or any(t in main_text_zh for t in ["不适合", "不适用", "只适合", "不解决", "边界", "限制", "不能保证"]) or any(t.lower() in main_text_en.lower() for t in ["not suitable", "not for", "only for", "does not solve", "limit", "boundary"])
        concept_test = has_any(hs_zh, test_terms) or has_any(hs_en, test_terms) or any(t in main_text_zh for t in ["验收", "检查", "练习", "自测", "测试"]) or any(t.lower() in main_text_en.lower() for t in ["check", "test", "exercise"])
        has_fail = concept_fail
        has_limit = concept_limit
        has_test = concept_test
        # Case pages use "任务与限制", "三次翻车", "可复用清单" as equivalents.
        if typ == "case":
            has_fail = has_fail or ("翻车" in " ".join(hs_zh) and "结果" in " ".join(hs_zh))
            has_limit = has_limit or ("任务与限制" in " ".join(hs_zh))
            has_test = has_test or ("可复用清单" in " ".join(hs_zh))
        score = 40
        if w_zh >= 300:
            score += 10
        if len(hs_zh) >= 4:
            score += 10
        if has_fail:
            score += 10
        if has_limit:
            score += 10
        if has_test:
            score += 10
        if SOURCES in zh_body:
            score += 5
        if related_unique >= 3:
            score += 5
        if DEEP in zh_body and DEEP in en_body:
            score += 5
        defects = []
        if empty_headings(zh_body) or empty_headings(en_body):
            defects.append("empty_heading")
            score -= 15
        if generic_template:
            defects.append("generic_template")
            score -= 25
        if opening_claim:
            defects.append("source_claim_opening")
            score -= 5
        if source_kind == "sourced" and not sid_zh:
            defects.append("sourced_no_visible_source")
            score -= 15
        if not SOURCES in zh_body:
            defects.append("no_source_block")
            score -= 15
        if related_unique < 3:
            defects.append("related_lt3")
            score -= 5
        if typ == "case" and not case_disclosure:
            defects.append("case_no_disclosure")
            score -= 15
        if w_zh < 250 and typ in {"article", "case", "history", "literacy"}:
            defects.append("article_under250")
            score -= 10
        # Case pages are long; tools can be short.
        if typ in {"tool", "calculator", "template"} and w_zh < 250:
            defects.append("card_under250")
            score -= 5
        if not has_fail and typ in {"article", "case", "template"}:
            defects.append("missing_failure")
            score -= 8
        if not has_limit and typ in {"article", "tool", "calculator", "template"}:
            defects.append("missing_limit")
            score -= 6
        if not has_test and typ in {"article", "case", "tool", "calculator", "template", "path"}:
            defects.append("missing_test")
            score -= 6
        if score > 100:
            score = 100
        if score < 0:
            score = 0
        critical = [x for x in defects if x in {"empty_heading", "generic_template", "sourced_no_visible_source", "case_no_disclosure"}]
        if score >= 95 and not defects and key in S_KEYS:
            grade = "S"
        elif score >= 85 and not critical:
            grade = "A"
        else:
            grade = "B"
        rows.append({
            "translation_key": key, "station": zh_meta.get("site") or key.split(".")[0],
            "slug": zh_meta.get("slug") or "", "type": typ,
            "title_zh": zh_meta.get("title") or "", "title_en": en_meta.get("title") or "",
            "words_zh": w_zh, "words_en": w_en,
            "headings_zh": len(hs_zh), "headings_en": len(hs_en),
            "source_kind": source_kind, "source_ids_zh": ",".join(sid_zh),
            "source_ids_en": ",".join(sid_en), "front_sources": ",".join(front_sources),
            "source_claim_zh": claim_zh, "source_claim_en": claim_en,
            "source_claim_opening": opening_claim,
            "deep_both": DEEP in zh_body and DEEP in en_body,
            "has_failure": has_fail, "has_limit": has_limit, "has_test": has_test,
            "related_count": len(related), "related_unique": related_unique,
            "case_disclosure": case_disclosure,
            "generic_template": generic_template,
            "empty_headings": empty_headings(zh_body) + empty_headings(en_body),
            "score": score, "grade": grade, "defects": ";".join(defects),
            "path_zh": zh_path.relative_to(ROOT).as_posix(),
            "path_en": en_path.relative_to(ROOT).as_posix(),
        })
    return rows


def ai_rows():
    sitemap = (AI_SITE / "sitemap.xml").read_text(encoding="utf-8")
    urls = re.findall(r"<loc>(.*?)</loc>", sitemap)
    utility = {"", "en", "search", "en/search", "lab", "en/lab", "about", "en/about", "articles", "en/articles"}
    rows = []
    for p in sorted(AI_SITE.rglob("index.html")):
        rel = p.parent.relative_to(AI_SITE).as_posix()
        rel = "" if rel == "." else rel
        html = p.read_text(encoding="utf-8", errors="replace")
        body = re.search(r'<article class="article-body">.*</article>', html, re.S) or re.search(r"<main\b.*?</main>", html, re.S)
        frag = body.group(0) if body else html
        plain = visible(frag)
        lang = "en" if rel == "en" or rel.startswith("en/") else "zh"
        w = words(plain, lang)
        h2 = len(re.findall(r"<h2\b", frag, re.I))
        title = re.search(r"<title>(.*?)</title>", html, re.S)
        title = re.sub(r"\s+", " ", title.group(1)).strip() if title else rel
        links = len(re.findall(r"<a\b[^>]*href=", html, re.I))
        has_task = 'class="ai6-taskcard"' in html
        has_checks = 'class="ai6-checks"' in frag
        has_faults = 'ai6-fault-table' in frag
        has_steps = 'class="steps-list"' in frag
        has_prompts = 'class="ai6-prompt"' in frag
        has_sources = 'class="article-sources"' in frag
        has_related = 'class="related"' in frag
        has_table = '<table' in frag
        has_evidence = 'ai6-evidence-card' in frag
        has_samples = 'ai6-sample-card' in frag
        has_calc = 'data-bc' in frag
        is_utility = rel in utility
        defects = []
        if is_utility:
            score = min(96, 82 + min(10, links) + (4 if 'id="q"' in frag else 0))
            if links < 3:
                defects.append("ai_utility_no_next")
            grade = "A" if score >= 85 and not defects else "B"
        else:
            score = 45
            score += 10 if has_task else 0
            score += 8 if h2 >= 4 else 0
            score += 8 if has_checks else 0
            score += 8 if has_faults else 0
            score += 6 if has_steps else 0
            score += 5 if has_prompts or has_table else 0
            score += 6 if has_sources else 0
            score += 5 if has_related or links >= 8 else 0
            score += 4 if w >= 300 else 0
            score = min(100, score)
            if w < 300:
                defects.append("ai_under300")
            if not has_task:
                defects.append("ai_no_taskcard")
            if not has_checks:
                defects.append("ai_no_checks")
            if not has_faults:
                defects.append("ai_no_faults")
            if h2 < 4:
                defects.append("ai_thin_sections")
            if defects:
                grade = "B" if score >= 65 else "C"
            elif score >= 88 and (has_evidence or has_samples or has_calc):
                grade = "S"
            elif score >= 80:
                grade = "A"
            else:
                grade = "B"
        rows.append({
            "translation_key": "ai." + (rel or "home"), "station": "ai", "slug": rel or "home",
            "type": "ai_utility" if is_utility else "ai_article",
            "title_zh": title if lang == "zh" else "", "title_en": title if lang == "en" else "",
            "words_zh": w if lang == "zh" else 0, "words_en": w if lang == "en" else 0,
            "headings_zh": h2, "headings_en": 0, "source_kind": "",
            "source_ids_zh": "", "source_ids_en": "", "front_sources": "",
            "source_claim_zh": "", "source_claim_en": "", "source_claim_opening": False,
            "deep_both": False, "has_failure": has_faults, "has_limit": has_task, "has_test": has_checks,
            "related_count": links if has_related else 0, "related_unique": links if has_related else 0,
            "case_disclosure": False,
            "generic_template": False, "empty_headings": 0,
            "score": score, "grade": grade, "defects": ";".join(defects),
            "path_zh": p.relative_to(ROOT).as_posix(), "path_en": "",
        })
    return rows


def main():
    rows = pair_rows()
    ai = ai_rows()
    with OUT_CSV.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
        w.writerows([{**r, "path_zh": r["path_zh"]} for r in ai])
    OUT_JSON.write_text(json.dumps({"generated": "2026-11-26", "pairs": rows, "ai": ai}, ensure_ascii=False, indent=2), encoding="utf-8")
    print("pairs", len(rows), "AI", len(ai))
    print("grades", Counter(r["grade"] for r in rows))
    print("defects", Counter(x for r in rows for x in r["defects"].split(";") if x).most_common(20))
    print("wrote", OUT_CSV, OUT_JSON)


if __name__ == "__main__":
    main()
