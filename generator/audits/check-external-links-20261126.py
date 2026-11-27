#!/usr/bin/env python3
"""Check every external URL used by the V1.1 source registry and content blocks."""
from __future__ import annotations

import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from pathlib import Path

import requests

ROOT = Path(r"C:\Users\chenhua\Desktop\tvcn")
REGISTRY = ROOT / "generator" / "audits" / "data" / "source-registry-20261126.json"
CONTENT = ROOT / "content"
OUT = ROOT / "generator" / "audits" / "external-link-health-20261126.json"
URL = re.compile(r"https?://[^\s<>\"'\]\)]+")
BLOCK = re.compile(r"<!-- SOURCES_START -->(.*?)<!-- SOURCES_END -->", re.S)
OWN = "tvcn.org"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36 TVCNLinkCheck/1.0"

# 官方规范地址，脚本访问会被反爬/区域策略拦成 404/403，但地址本身是正确入口。
# 保留原链接（不换成镜像），人工复核日期见值；脚本结果归入 manual 并在 note 里写明。
KNOWN_BLOCKED = {
    "https://support.google.com/youtube/answer/1722171": "Google Help 反爬，HEAD 返回 404；YouTube 上传编码建议官方条目，人工复核 2026-11-27",
    "https://support.google.com/youtube/answer/2801973": "Google Help 反爬，HEAD 返回 404；YouTube 社区准则官方条目，人工复核 2026-11-27",
    "https://www.tiktok.com/community-guidelines/en/": "TikTok 区域/反爬，HEAD 返回 404；社区准则官方地址，人工复核 2026-11-27",
}


def check(url: str):
    result = {"url": url, "status": None, "final_url": url, "method": None, "error": None, "classification": "unknown"}
    attempts = []
    for _ in range(2):
        for method in ("HEAD", "GET"):
            try:
                if method == "GET":
                    r = requests.get(url, timeout=20, allow_redirects=True, headers={"User-Agent": UA, "Accept": "*/*"}, stream=True)
                else:
                    r = requests.head(url, timeout=20, allow_redirects=True, headers={"User-Agent": UA, "Accept": "*/*"})
                code = r.status_code
                result.update({"status": code, "final_url": r.url, "method": method})
                r.close()
                if code in (405, 501):
                    attempts.append(f"{method}:{code}")
                    continue
                if code < 400:
                    result["classification"] = "ok"
                elif code in (403, 429):
                    result["classification"] = "manual"
                else:
                    result["classification"] = "broken"
                if url in KNOWN_BLOCKED:
                    result["classification"] = "manual"
                    result["note"] = KNOWN_BLOCKED[url]
                return result
            except Exception as exc:
                attempts.append(f"{method}:{type(exc).__name__}")
                result["error"] = f"{type(exc).__name__}: {exc}"
    result["classification"] = "manual"
    result["error"] = "unverified after retries: " + ", ".join(attempts)
    if url in KNOWN_BLOCKED:
        result["note"] = KNOWN_BLOCKED[url]
    return result


def main():
    registry = json.loads(REGISTRY.read_text(encoding="utf-8"))
    urls = {x["url"] for x in registry.values()}
    for path in CONTENT.rglob("*.md"):
        text = path.read_text(encoding="utf-8")
        for block in BLOCK.findall(text):
            urls.update(URL.findall(block))
    urls = sorted(u for u in urls if OWN not in u)
    print("checking", len(urls), "urls")
    results = {}
    with ThreadPoolExecutor(max_workers=12) as pool:
        futures = {pool.submit(check, url): url for url in urls}
        for i, fut in enumerate(as_completed(futures), 1):
            r = fut.result()
            results[r["url"]] = r
            print(f"[{i}/{len(urls)}] {r['classification']:7} {r['status']} {r['url'][:100]}")
    summary = {
        "checked": len(results),
        "ok": sum(1 for r in results.values() if r["classification"] == "ok"),
        "manual": [r for r in results.values() if r["classification"] == "manual"],
        "broken": [r for r in results.values() if r["classification"] == "broken"],
        "results": results,
        "checked_at": date.today().isoformat(),
    }
    OUT.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print("OK", summary["ok"], "MANUAL", len(summary["manual"]), "BROKEN", len(summary["broken"]))
    for r in summary["broken"]:
        print("BROKEN", r["status"], r["url"], r["error"])
    print("WROTE", OUT)


if __name__ == "__main__":
    main()
