# -*- coding: utf-8 -*-
"""QA for the built AI video site v6."""
import argparse
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
SITE_URL = "https://ai.tvcn.org"


class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.links = []
        self.imgs = 0
        self.figures = 0
        self.videos = 0
        self.img_srcs = []
        self.img_alts = []
        self.video_srcs = []
        self.video_posters = []
        self.h1 = 0
        self.title = ""
        self._in_title = False
        self.text = []
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        self.tags.append(tag)
        a = dict(attrs)
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "img":
            self.imgs += 1
            self.img_srcs.append(a.get("src", ""))
            self.img_alts.append(a.get("alt", ""))
        if tag == "figure":
            self.figures += 1
        if tag == "video":
            self.videos += 1
            self.video_posters.append(a.get("poster", ""))
        if tag == "source" and a.get("type") == "video/mp4":
            self.video_srcs.append(a.get("src", ""))
        if tag == "h1":
            self.h1 += 1
        if tag == "title":
            self._in_title = True
        if tag in ("script", "style"):
            self._skip += 1

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        if tag in ("script", "style") and self._skip:
            self._skip -= 1

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if not self._skip and data.strip():
            self.text.append(data.strip())


def resolve(site, href):
    if not href or href.startswith(("http://", "https://", "mailto:", "#", "tel:")):
        return None
    href = href.split("#")[0].split("?")[0]
    if not href.startswith("/"):
        return None
    p = site / href.lstrip("/")
    if href.endswith("/") or not p.suffix:
        return p / "index.html"
    return p


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default=str(ROOT / "build" / "ai6" / "site"))
    args = ap.parse_args()
    site = Path(args.site).resolve()
    failures, warnings = [], []

    htmls = sorted(site.rglob("*.html"))
    if len(htmls) != 50:
        failures.append(f"expected 50 html files (45 pages + 4 shell pages + 404), got {len(htmls)}")
    zh_pages = [p for p in htmls if "/en/" not in p.as_posix() and "/search/" not in p.as_posix() and p.name == "index.html"]
    en_pages = [p for p in htmls if "/en/" in p.as_posix() and "/search/" not in p.as_posix() and p.name == "index.html"]
    if len(zh_pages) != 31:
        failures.append(f"expected 31 zh index pages, got {len(zh_pages)}")
    if len(en_pages) != 16:
        failures.append(f"expected 16 en index pages, got {len(en_pages)}")

    shell_pages = {
        site / "about" / "index.html",
        site / "en" / "about" / "index.html",
        site / "articles" / "index.html",
        site / "en" / "articles" / "index.html",
    }

    evidence_pages = {site / "tools" / "index.html", site / "en" / "tools" / "index.html"}

    parsed = {}
    for f in htmls:
        p = Parser()
        p.feed(f.read_text(encoding="utf-8"))
        parsed[f] = p
        if p.imgs or p.figures or p.videos:
            if f not in evidence_pages:
                failures.append(f"{f}: unexpected {p.imgs} <img> / {p.figures} <figure> / {p.videos} <video> tags")
            elif p.imgs != 6 or p.figures != 8 or p.videos != 2:
                failures.append(f"{f}: evidence expected 6 imgs / 8 figures / 2 videos, got {p.imgs}/{p.figures}/{p.videos}")
        for src in p.video_srcs + p.video_posters:
            target = resolve(site, src)
            if target is not None and not target.exists():
                failures.append(f"{f}: missing sample media {src}")
        for src in p.img_srcs:
            target = resolve(site, src)
            if target is not None and not target.exists():
                failures.append(f"{f}: missing image {src}")
        for alt in p.img_alts:
            if not alt.strip():
                failures.append(f"{f}: empty image alt")
        if p.h1 != 1:
            failures.append(f"{f}: expected 1 h1, got {p.h1}")
        if not p.title.strip():
            failures.append(f"{f}: empty title")
        text = " ".join(p.text)
        if re.search(r"TODO|TBD|lorem ipsum|占位文案|待补", text):
            failures.append(f"{f}: placeholder text found")
        if "`" in text:
            failures.append(f"{f}: literal backtick found in rendered text")
        for href in p.links:
            target = resolve(site, href)
            if target is not None and not target.exists():
                failures.append(f"{f}: broken internal link {href}")

    for f, p in parsed.items():
        content = f.read_text(encoding="utf-8")
        if f.name == "index.html" and ("/en/" not in f.as_posix()):
            if "<html lang=\"zh-CN\"" not in content:
                failures.append(f"{f}: missing zh-CN lang")
        if "/en/" in f.as_posix() and f.name == "index.html":
            if "<html lang=\"en\"" not in content:
                failures.append(f"{f}: missing en lang")
        if "404.html" in f.name:
            continue
        if 'rel="canonical"' not in content:
            failures.append(f"{f}: missing canonical")
        if "hreflang" not in content:
            failures.append(f"{f}: missing hreflang")
        if "<article class=\"article-body\">" in content and "article-sources" not in content and f not in shell_pages:
            warnings.append(f"{f}: article has no sources block")
        # English UI bleed: allow the language switch label and brand, block common UI strings.
        if "/en/" in f.as_posix() and f.name == "index.html":
            if re.search(r"本文目录|参考来源|跳到正文|复制|工具卡|价格:|限制:|上一页", content):
                failures.append(f"{f}: Chinese UI string on English page")

    templates = [
        "route-card.md", "budget-calculator.csv", "90s-script.md", "16-shot-list.csv",
        "character-bible.md", "prompt-pack.md", "qc-checklist.md", "platform-specs.csv",
        "model-test-card.md", "comfyui-setup.md", "project-folders.txt", "lab-demo-pack.md",
    ]
    for name in templates:
        if not (site / "assets" / "templates" / name).exists():
            failures.append(f"missing zh template {name}")
    for name in ["route-card.md", "model-test-card.md", "comfyui-setup.md", "90s-script.md",
                 "16-shot-list.csv", "character-bible.md", "platform-specs.csv", "qc-checklist.md", "lab-demo-pack.md"]:
        if not (site / "assets" / "templates" / "en" / name).exists():
            failures.append(f"missing en template {name}")

    idx = json.loads((site / "search-index.json").read_text(encoding="utf-8"))
    enidx = json.loads((site / "en" / "search-index.json").read_text(encoding="utf-8"))
    if len(idx) != 29:
        failures.append(f"zh search index expected 29, got {len(idx)}")
    if len(enidx) != 14:
        failures.append(f"en search index expected 14, got {len(enidx)}")

    sitemap = (site / "sitemap.xml").read_text(encoding="utf-8")
    locs = re.findall(r"<loc>([^<]+)</loc>", sitemap)
    if len(locs) != 47:
        failures.append(f"sitemap expected 47 urls, got {len(locs)}")
    for name in ("comfyui.png", "minimax-h3.png", "kling-40.png", "seedance-25.png", "heygen.png", "runway.png"):
        if not (site / "assets" / "evidence" / name).exists():
            failures.append(f"missing evidence image {name}")

    if (site / "assets" / "ai6.css").stat().st_size < 5000:
        failures.append("ai6.css too small")
    if (site / "assets" / "article.css").stat().st_size < 10000:
        warnings.append("article.css smaller than expected")

    print(f"HTML files: {len(htmls)} (zh {len(zh_pages)}, en {len(en_pages)})")
    print(f"Sitemap URLs: {len(locs)}; search zh/en: {len(idx)}/{len(enidx)}")
    print(f"Failures: {len(failures)}")
    for x in failures:
        print("FAIL", x)
    print(f"Warnings: {len(warnings)}")
    for x in warnings[:20]:
        print("WARN", x)
    if failures:
        sys.exit(1)


if __name__ == "__main__":
    main()

