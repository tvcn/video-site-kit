# -*- coding: utf-8 -*-
"""Build a client-side redirect map for legacy AI site URLs.

GitHub Pages cannot issue HTTP 301/410. The 404 page reads this map and
navigates the visitor to the closest new task page; a CDN-level 301 list can
be generated from the same CSV.
"""
import csv
import json
import re
from pathlib import Path

ROOT = Path(r"C:\Users\chenhua\Desktop\tvcn")
OLD_SITEMAP = ROOT / "generator" / "ai6" / "legacy-sitemap.xml"
OUT_JSON = ROOT / "generator" / "ai6" / "legacy_map.json"
OUT_CSV = ROOT / "generator" / "ai6" / "legacy-url-map.csv"


def slug_of(path, prefix):
    if path.startswith(prefix) and path.endswith("/"):
        return path[len(prefix):-1]
    return ""


def zh_article_target(slug):
    # Model deep dives that have an exact new page.
    exact = {
        "model-minimax-h3": "/models/h3/",
        "model-seedance-2-5": "/models/seedance-kling/",
        "model-kling-3-4": "/models/seedance-kling/",
        "model-wan-3": "/models/wan-ltx/",
        "model-runway-4-5": "/models/",
        "model-veo-3-1": "/models/",
        "model-gemini-omni-flash": "/models/",
        "model-radar": "/models/",
        "model-comparison": "/models/",
        "model-changelog": "/models/",
        "model-sunset": "/models/",
    }
    if slug in exact:
        return exact[slug]
    if any(k in slug for k in ("product", "ecommerce", "packshot")):
        return "/short/product/"
    if any(k in slug for k in ("music-video", "music")):
        return "/music-video/"
    if any(k in slug for k in ("tutorial", "education", "explainer")):
        return "/explainer/"
    if any(k in slug for k in ("travel", "real-estate", "space")):
        return "/travel/"
    if any(k in slug for k in ("brand", "corporate")):
        return "/brand/"
    if any(k in slug for k in ("tts", "voice", "digital-human", "lipsync", "audio")):
        return "/short/talking-head/"
    if any(k in slug for k in ("short", "social", "platform", "15s", "first-cut")):
        return "/short/15s/" if "15" in slug or "short" in slug else "/short/"
    if any(k in slug for k in ("consent", "disclosure", "procurement-rights")):
        return "/workflow/"
    if any(k in slug for k in ("qc", "delivery", "spec", "platform-spec", "disclosure", "consent", "rights")):
        return "/deliver/export/"
    if any(k in slug for k in ("upscale", "denoise", "rotoscope", "vfx", "color", "replacement", "troubleshooting", "failure")):
        return "/fix/"
    if any(k in slug for k in ("cost", "budget", "procurement", "hardware", "software", "batch-api")):
        return "/start/budget/" if any(k in slug for k in ("cost", "budget", "procurement")) else "/start/route/"
    if slug.startswith("workflow-"):
        if "product" in slug:
            return "/short/product/"
        if "social" in slug or "short" in slug:
            return "/short/15s/"
        if "native-audio" in slug:
            return "/drama/audio/"
        if "script" in slug or "multishot" in slug or "shot" in slug:
            return "/drama/shots/"
        return "/workflow/"
    if slug.startswith("test-"):
        return "/fix/"
    if any(k in slug for k in ("drama", "script", "storyboard", "shot", "character", "consistency", "wardrobe", "scene", "previz", "camera", "prompt", "image-to-video", "text-to-video", "motion-control", "negative")):
        if any(k in slug for k in ("script", "storyboard", "shot-list", "prompt", "camera", "negative", "previz")):
            return "/drama/storyboard/" if "storyboard" in slug or "shot-list" in slug else "/drama/shots/"
        if any(k in slug for k in ("character", "wardrobe", "consistency", "scene")):
            return "/drama/character/"
        return "/drama/"
    if any(k in slug for k in ("self-host", "comfy", "glossary", "faq", "anatomy", "batch")):
        return "/tools/comfyui/" if "self-host" in slug or "comfy" in slug else "/tools/"
    if any(k in slug for k in ("start-here", "first-video", "first-step")):
        return "/start/route/"
    return "/start/route/"


def en_target(path):
    slug = slug_of(path, "/en/article/")
    if slug:
        if "drama" in slug or "script" in slug or "storyboard" in slug or "shot" in slug:
            return "/en/drama/"
        if "short" in slug or "social" in slug or "platform" in slug or "15" in slug:
            return "/en/short/15s/"
        if "h3" in slug or "minimax" in slug:
            return "/en/models/h3/"
        if "seedance" in slug or "kling" in slug:
            return "/en/models/seedance-kling/"
        if "wan" in slug or "ltx" in slug:
            return "/en/models/wan-ltx/" if "ltx" in slug or "wan" in slug else "/en/models/"
        if "comfy" in slug or "self-host" in slug:
            return "/en/tools/comfyui/"
        if "qc" in slug or "delivery" in slug or "export" in slug or "spec" in slug:
            return "/en/deliver/export/"
        if "model" in slug or "veo" in slug or "runway" in slug:
            return "/en/models/"
        if "tool" in slug or "tts" in slug or "voice" in slug or "edit" in slug:
            return "/en/tools/"
        return "/en/"
    if path.startswith("/en/models/"):
        if "h3" in path or "minimax" in path:
            return "/en/models/h3/"
        if "seedance" in path or "kling" in path:
            return "/en/models/seedance-kling/"
        return "/en/models/"
    if path.startswith("/en/tools/"):
        if "comfy" in path:
            return "/en/tools/comfyui/"
        return "/en/tools/"
    if path.startswith("/en/"):
        return "/en/"
    return "/en/"


def zh_target(path):
    if path in ("/article/", "/articles/"):
        return "/"
    if path == "/models/" or path == "/tools/":
        return path
    if path == "/scenarios/":
        return "/drama/"
    if path == "/start/":
        return "/start/route/"
    if path == "/tests/":
        return "/fix/"
    if path == "/updates/":
        return "/"
    if path == "/workflows/":
        return "/workflow/"
    if path == "/paths/":
        return "/start/route/"
    if path == "/glossary/":
        return "/tools/"
    if path in ("/about/", "/app/"):
        return "/"
    if path.startswith("/article/"):
        return zh_article_target(slug_of(path, "/article/"))
    if path.startswith("/models/"):
        slug = slug_of(path, "/models/")
        if "h3" in slug or "minimax" in slug:
            return "/models/h3/"
        if "seedance" in slug or "kling" in slug:
            return "/models/seedance-kling/"
        if "wan" in slug or "ltx" in slug:
            return "/models/wan-ltx/"
        return "/models/"
    if path.startswith("/tools/"):
        slug = slug_of(path, "/tools/")
        if "comfy" in slug or "self-host" in slug:
            return "/tools/comfyui/"
        if "edit" in slug or "auto" in slug or "opus" in slug:
            return "/tools/auto-edit/"
        return "/tools/"
    if path.startswith("/scenarios/"):
        slug = slug_of(path, "/scenarios/")
        if "social" in slug or "short" in slug:
            return "/short/15s/"
        if "ecommerce" in slug or "product" in slug:
            return "/short/product/"
        if "music" in slug:
            return "/music-video/"
        if "education" in slug:
            return "/explainer/"
        if "real-estate" in slug or "corporate" in slug:
            return "/brand/"
        return "/drama/"
    if path.startswith("/start/"):
        return "/start/budget/" if "budget" in path or "cost" in path else "/start/route/"
    if path.startswith("/tests/"):
        return "/fix/"
    if path.startswith("/updates/"):
        return "/"
    if path.startswith("/workflows/"):
        return "/workflow/"
    if path.startswith("/paths/"):
        return "/start/route/"
    return "/"


def main():
    xml = OLD_SITEMAP.read_text(encoding="utf-8")
    old_paths = [u.replace("https://ai.tvcn.org", "") for u in re.findall(r"<loc>(.*?)</loc>", xml)]
    old_paths = sorted(set(old_paths))
    new_xml = (ROOT / "build" / "ai6" / "site" / "sitemap.xml").read_text(encoding="utf-8")
    new_paths = set(u.replace("https://ai.tvcn.org", "") for u in re.findall(r"<loc>(.*?)</loc>", new_xml))
    mapping = {}
    for p in old_paths:
        if p in new_paths:
            continue
        target = en_target(p) if p.startswith("/en/") else zh_target(p)
        mapping[p] = target
    OUT_JSON.write_text(json.dumps(mapping, ensure_ascii=False, indent=1), encoding="utf-8")
    with OUT_CSV.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(["old_url", "new_url", "method", "note"])
        for p, t in sorted(mapping.items()):
            w.writerow(["https://ai.tvcn.org" + p, "https://ai.tvcn.org" + t, "404 client redirect",
                        "GitHub Pages has no 301; use CDN 301 for search equity"])
    print("legacy paths", len(mapping))
    print("sample", list(mapping.items())[:5])


if __name__ == "__main__":
    main()
