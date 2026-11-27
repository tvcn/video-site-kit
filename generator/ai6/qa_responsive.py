# -*- coding: utf-8 -*-
"""Responsive and interaction QA for the ai6 static site."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import os
import re
import json

SITE = Path(r"C:\Users\chenhua\Desktop\tvcn\build\ai6\site")
BASE = os.environ.get("AI_QA_BASE", "http://127.0.0.1:8765")
sitemap = (SITE / "sitemap.xml").read_text(encoding="utf-8")
paths = re.findall(r"<loc>(.*?)</loc>", sitemap)
paths = [u.replace("https://ai.tvcn.org", "") or "/" for u in paths]

failures = []
checks = 0
with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        headless=True,
    )
    for path in paths:
        for w, h in ((390, 844), (510, 844), (1280, 900)):
            page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
            page.goto(BASE + path, wait_until="domcontentloaded")
            page.wait_for_timeout(150)
            metrics = page.evaluate("""() => ({
              innerWidth: window.innerWidth,
              docScrollWidth: document.documentElement.scrollWidth,
              bodyScrollWidth: document.body.scrollWidth,
              h1: document.querySelectorAll('h1').length,
              imgs: document.querySelectorAll('img').length,
              figures: document.querySelectorAll('figure').length,
              videos: document.querySelectorAll('video').length
            })""")
            checks += 1
            if metrics["docScrollWidth"] > metrics["innerWidth"] + 1:
                failures.append((path, w, "overflow", metrics))
            if metrics["h1"] != 1:
                failures.append((path, w, "h1", metrics))
            if (metrics["imgs"] or metrics["figures"] or metrics["videos"]) and path not in ("/tools/", "/en/tools/"):
                failures.append((path, w, "unexpected-media", metrics))
            if path in ("/tools/", "/en/tools/") and (metrics["imgs"] != 6 or metrics["figures"] != 8 or metrics["videos"] != 2):
                failures.append((path, w, "evidence-count", metrics))
            page.close()

    # Search interactions on both languages.
    for path, query in (("/search/", "H3"), ("/en/search/", "Kling")):
        page = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
        page.goto(BASE + path, wait_until="networkidle")
        page.fill("#q", query)
        page.wait_for_timeout(350)
        count = page.locator("#results a").count()
        checks += 1
        if count == 0:
            failures.append((path, 390, "search-empty", query))
        print("SEARCH", path, query, "results", count)
        page.close()

    # Lab: tab switch, shot-strip playback, picker result.
    for path in ("/lab/", "/en/lab/"):
        page = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
        page.goto(BASE + path, wait_until="networkidle")
        page.locator('[data-lab-tab="product"]').click()
        clock = page.locator(".ai6-lab-clock").inner_text()
        page.locator("[data-lab-play]").click()
        page.wait_for_timeout(900)
        active = page.locator(".ai6-lab-beat.is-active").count()
        page.locator("#lab-task").select_option("talking")
        page.wait_for_timeout(80)
        cards = page.locator("#lab-result .ai6-minicard").count()
        checks += 1
        if "00:15" not in clock or active < 1 or cards != 3:
            failures.append((path, 390, "lab-interaction", (clock, active, cards)))
        print("LAB", path, "clock", clock, "active", active, "picker", cards)
        page.close()

    # Budget calculator: one input change must move the output.
    for path in ("/start/budget/", "/en/start/budget/"):
        page = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
        page.goto(BASE + path, wait_until="networkidle")
        page.fill('[data-bc="seconds"]', "60")
        page.fill('[data-bc="price"]', "1")
        page.fill('[data-bc="retry"]', "2")
        gen = page.locator('[data-out="gen"]').inner_text()
        checks += 1
        if "120" not in gen:
            failures.append((path, 390, "budget-calculator", gen))
        print("CALC", path, "gen", gen)
        page.close()

    # Theme toggle should switch data-theme.
    page = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    page.goto(BASE + "/", wait_until="networkidle")
    before = page.evaluate("document.documentElement.dataset.theme || ''")
    page.click("[data-theme-toggle]")
    page.wait_for_timeout(150)
    after = page.evaluate("document.documentElement.dataset.theme || ''")
    checks += 1
    if before == after:
        failures.append(("/", 390, "theme-toggle", f"{before}->{after}"))
    print("THEME", before, "->", after)
    page.close()
    browser.close()

print("CHECKS", checks)
print("FAILURES", len(failures))
for f in failures[:20]:
    print("FAIL", f)
