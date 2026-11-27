#!/usr/bin/env python3
"""Audit the 15 case pages' composite/anonymous disclosure."""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(r"C:\Users\chenhua\Desktop\tvcn")
INV = ROOT / "generator" / "audits" / "content-quality-inventory-2026-11-26.json"
OUT = ROOT / "generator" / "audits" / "case-disclosure-audit-2026-11-26.csv"
JSON = ROOT / "generator" / "audits" / "case-disclosure-audit-2026-11-26.json"

FM = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)
TAG = re.compile(r"<[^>]+>")


def main() -> int:
    rows = json.loads(INV.read_text(encoding="utf-8"))["pairs"]
    cases = [r for r in rows if r["type"] == "case"]
    out = []
    for r in cases:
        zh = (ROOT / r["path_zh"]).read_text(encoding="utf-8")
        en = (ROOT / r["path_en"]).read_text(encoding="utf-8")
        body_zh = TAG.sub(" ", zh).replace("\n", " ")
        body_zh = re.sub(r"\s+", " ", body_zh)
        disclosure = bool(re.search(r"匿名|复合|不对应单一客户|脱敏", body_zh))
        sentence = ""
        m = re.search(r"([^。]{0,40}(?:匿名|复合|不对应单一客户|脱敏)[^。]{0,80}。)", body_zh)
        if m:
            sentence = m.group(1).strip()
        out.append({
            "translation_key": r["translation_key"], "slug": r["slug"], "title_zh": r["title_zh"],
            "path_zh": r["path_zh"], "audit_disclosure": r["case_disclosure"],
            "visible_disclosure": disclosure, "sentence": sentence,
            "experience_note": r["source_kind"] == "experience",
            "status": "A" if r["case_disclosure"] and disclosure else "B",
        })
    with OUT.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(out[0].keys()))
        w.writeheader()
        w.writerows(out)
    JSON.write_text(json.dumps({"generated": "2026-11-26", "rows": out}, ensure_ascii=False, indent=2), encoding="utf-8")
    print("cases", len(out), "visible", sum(x["visible_disclosure"] for x in out), "A", sum(x["status"] == "A" for x in out))
    for x in out:
        print(x["status"], x["slug"], x["sentence"][:80])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
