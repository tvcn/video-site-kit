#!/usr/bin/env python3
"""意图簇审计：20 个簇的 owner 存在，支撑页带范围说明并指回 owner。

数据：generator/audits/data/intent-clusters.json（簇定义）
       generator/audits/source-consistency-20261126.json（slug → 页面路径与标题）
输出：generator/audits/intent-clusters.json
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(r"C:\Users\chenhua\Desktop\tvcn")
DATA = json.loads((ROOT / "generator" / "audits" / "data" / "intent-clusters.json").read_text(encoding="utf-8"))
AUDIT = json.loads((ROOT / "generator" / "audits" / "source-consistency-20261126.json").read_text(encoding="utf-8"))
BY = {p["slug"]: p for p in AUDIT["pages"]}
OUT = ROOT / "generator" / "audits" / "intent-clusters.json"


def main():
    unresolved = []
    checked = 0
    for c in DATA["clusters"]:
        owner = BY.get(c["owner"])
        if not owner:
            unresolved.append({"cluster": c["cluster"], "reason": "owner missing"})
            continue
        for slug in c["supports"]:
            p = BY.get(slug)
            if not p:
                unresolved.append({"cluster": c["cluster"], "slug": slug, "reason": "page missing"})
                continue
            checked += 1
            for path in (ROOT / p["path_zh"], ROOT / p["path_en"]):
                text = path.read_text(encoding="utf-8")
                if "<!-- INTENT_SCOPE -->" not in text or (
                    c["owner"] not in text and owner["title_zh"] not in text and owner["title_en"] not in text
                ):
                    unresolved.append({"cluster": c["cluster"], "slug": slug, "lang": path.name, "reason": "scope note missing"})
    out = {
        "clusters_total": len(DATA["clusters"]),
        "owners_present": len({c["owner"] for c in DATA["clusters"]}),
        "support_pages_checked": checked,
        "unresolved_intent_clusters": 0 if not unresolved else len({x.get("cluster") for x in unresolved}),
        "unresolved": unresolved[:20],
        "clusters": DATA["clusters"],
    }
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: out[k] for k in ["clusters_total", "owners_present", "support_pages_checked", "unresolved_intent_clusters"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
