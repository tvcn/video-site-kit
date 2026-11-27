#!/usr/bin/env python3
"""Audit visible source blocks against frontmatter source IDs."""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

import yaml

ROOT = Path(r"C:\Users\chenhua\Desktop\tvcn")
INV = ROOT / "generator" / "audits" / "content-quality-inventory-2026-11-26.json"
OUT = ROOT / "generator" / "audits" / "source-claim-audit-2026-11-26.csv"
JSON = ROOT / "generator" / "audits" / "source-claim-audit-2026-11-26.json"

FM = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)
BLOCK = re.compile(r"<!-- SOURCES_START -->(.*?)<!-- SOURCES_END -->", re.S)
SID = re.compile(r"\[S\d{2}\]")
H2 = re.compile(r"<h2[^>]*>(.*?)</h2>|##\s*(.*?)\n", re.S)


def main() -> int:
    rows = json.loads(INV.read_text(encoding="utf-8"))["pairs"]
    out = []
    for r in rows:
        zh_path = ROOT / r["path_zh"]
        text = zh_path.read_text(encoding="utf-8")
        m = FM.match(text)
        meta = yaml.safe_load(m.group(1)) if m else {}
        fm_ids = [str(x) for x in (meta.get("sources") or [])]
        block_m = BLOCK.search(text)
        block = block_m.group(1) if block_m else ""
        block_ids = SID.findall(block)
        claim_headings = [x for x in (a or b for a, b in H2.findall(block)) if x]
        has_check = "用于核对" in block or "核对" in block
        generic = "核对首段" in block or "见 SOURCES.md" in block
        status = "A" if (r["source_kind"] != "sourced" or (fm_ids and block_ids and has_check and not generic)) else "B"
        out.append({
            "translation_key": r["translation_key"], "station": r["station"], "type": r["type"],
            "source_kind": r["source_kind"], "front_sources": ";".join(fm_ids),
            "visible_sources": ";".join(sorted(set(block_ids))), "claim_headings": " | ".join(claim_headings[:3]),
            "has_claim_phrase": has_check, "generic_opening_claim": generic, "status": status,
        })
    with OUT.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(out[0].keys()))
        w.writeheader()
        w.writerows(out)
    JSON.write_text(json.dumps({"generated": "2026-11-26", "rows": out}, ensure_ascii=False, indent=2), encoding="utf-8")
    from collections import Counter
    print(Counter(x["status"] for x in out), "sourced", sum(x["source_kind"] == "sourced" for x in out),
          "experience", sum(x["source_kind"] == "experience" for x in out))
    print("B", [(x["translation_key"], x["source_kind"], x["front_sources"], x["visible_sources"]) for x in out if x["status"] != "A"][:10])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
