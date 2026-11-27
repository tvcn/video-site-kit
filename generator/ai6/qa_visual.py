from playwright.sync_api import sync_playwright
import json
from pathlib import Path

OUT = Path(r"C:\Users\chenhua\Desktop\tvcn\build\ai6\shots")
URLS = [
    ("home-390", "http://127.0.0.1:8765/", 390, 844),
    ("h3-390", "http://127.0.0.1:8765/models/h3/", 390, 844),
    ("tools-390", "http://127.0.0.1:8765/tools/", 390, 844),
    ("en-home-390", "http://127.0.0.1:8765/en/", 390, 844),
    ("en-tools-390", "http://127.0.0.1:8765/en/tools/", 390, 844),
    ("home-1280", "http://127.0.0.1:8765/", 1280, 900),
]
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
    for name, url, w, h in URLS:
        page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        page.goto(url, wait_until="networkidle")
        metrics = page.evaluate("""() => {
          const q = s => document.querySelector(s)?.getBoundingClientRect();
          return {
            innerWidth: window.innerWidth,
            docScrollWidth: document.documentElement.scrollWidth,
            bodyScrollWidth: document.body.scrollWidth,
            wrap: q('.wrap'),
            hero: q('.article-hero'),
            main: q('main')
          };
        }""")
        print(name, json.dumps(metrics, ensure_ascii=False))
        page.screenshot(path=str(OUT / f"{name}.png"), full_page=True)
        page.close()
    browser.close()
