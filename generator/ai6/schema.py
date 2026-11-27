# -*- coding: utf-8 -*-
"""Renderers for the AI video site v6: 29 zh pages, 11 en pages, zero decorative images."""
import csv
import html
import json
import re
from pathlib import Path

ROOT = Path(r"C:\Users\chenhua\Desktop\tvcn")
SITE_URL = "https://ai.tvcn.org"
DATE = "2026-11-26"
ASSET_VERSION = "20261127"
EN_PATHS = {
    "/start/route/", "/start/budget/", "/tools/", "/models/", "/tools/comfyui/", "/models/h3/",
    "/models/seedance-kling/", "/drama/", "/short/", "/short/15s/", "/fix/", "/deliver/export/", "/lab/",
}
SECTION_ORDER = [
    ("开始", "/", "start"),
    ("短剧", "/drama/", "drama"),
    ("短视频", "/short/", "short"),
    ("工具与模型", "/tools/", "knowledge"),
    ("排障交付", "/fix/", "fix"),
]
SITE_NAV = [
    ("主站", "https://tvcn.org/", "main"),
    ("故事", "https://story.tvcn.org/", "story"),
    ("拍摄", "https://shoot.tvcn.org/", "shoot"),
    ("后期", "https://post.tvcn.org/", "post"),
    ("AI", "https://ai.tvcn.org/", "ai"),
    ("动画", "https://animation.tvcn.org/", "animation"),
    ("片型", "https://formats.tvcn.org/", "formats"),
    ("工具", "https://tools.tvcn.org/", "tools"),
    ("影像史", "https://context.tvcn.org/", "context"),
]


def esc(value):
    return html.escape(str(value or ""), quote=True)


def inline_text(value):
    """Escape text, then turn `path` into a link and other `code` into code."""
    text = esc(value)
    def repl(m):
        token = html.unescape(m.group(1))
        if token.startswith("/") and " " not in token:
            return f'<a href="{esc(token)}">{esc(token)}</a>'
        if token.startswith("http"):
            return f'<a href="{esc(token)}" target="_blank" rel="noopener">{esc(token)}</a>'
        return f'<code>{esc(token)}</code>'
    return re.sub(r"`([^`]+)`", repl, text)


def load_cards():
    path = ROOT / "generator" / "ai6" / "data" / "tool-model-cards.csv"
    rows = list(csv.DictReader(path.open(encoding="utf-8-sig")))
    for row in rows:
        row["used_in"] = [x.strip() for x in row.get("used_in", "").split(",") if x.strip()]
    return rows


def card_by_id(cards):
    return {c["id"]: c for c in cards}


def nav_current(key):
    return ' aria-current="page"' if key == "ai" else ""


def site_header(lang="zh", en_path=None, zh_path=None):
    if lang == "zh":
        brand = '<a class="static-brand" href="/" aria-label="TVCN">TVCN<span>影像制作知识库</span></a>'
        label_search = "搜索"
        label_lang = "EN"
        lang_href = en_path or "/en/"
        lang_attr = 'hreflang="en"'
        nav = "".join(
            f'<a class="site-nav-link" href="{url}" data-site-nav="{key}"{nav_current(key)}>{name}</a>'
            for name, url, key in SITE_NAV
        )
        return f'''<header class="static-header">
  <div class="static-header-inner">
    {brand}
    <nav class="static-nav site-nav" aria-label="站点导航">
      {nav}
      <a class="icon-btn search-btn" href="/search/" aria-label="搜索全站">{label_search}</a>
      <a class="icon-btn lang-btn" href="{lang_href}" {lang_attr}>{label_lang}</a>
      <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="切换明暗">明暗</button>
    </nav>
  </div>
</header>'''
    brand = '<a class="static-brand" href="/en/">TVCN<span>Video Production Knowledge</span></a>'
    nav = "".join(
        f'<a class="site-nav-link" href="{url}" data-site-nav="{key}"{nav_current(key)}>{name_en}</a>'
        for name_en, url, key in [
            ("Main", "https://tvcn.org/", "main"),
            ("Story", "https://story.tvcn.org/", "story"),
            ("Shoot", "https://shoot.tvcn.org/", "shoot"),
            ("Post", "https://post.tvcn.org/", "post"),
            ("AI", "https://ai.tvcn.org/", "ai"),
            ("Animation", "https://animation.tvcn.org/", "animation"),
            ("Formats", "https://formats.tvcn.org/", "formats"),
            ("Tools", "https://tools.tvcn.org/", "tools"),
            ("History", "https://context.tvcn.org/", "context"),
        ]
    )
    return f'''<header class="static-header">
  <div class="static-header-inner">
    {brand}
    <nav class="static-nav site-nav" aria-label="Site navigation">
      {nav}
      <a class="icon-btn search-btn" href="/en/search/" aria-label="Search the library">Search</a>
      <a class="icon-btn lang-btn" href="{zh_path or '/'}" hreflang="zh-CN">中文</a>
      <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="Toggle theme">Theme</button>
    </nav>
  </div>
</header>'''


def section_nav(current, lang="zh"):
    items = []
    en_names = {"start": "Start here", "drama": "Drama", "short": "Short-form", "knowledge": "Tools & models", "fix": "Fix"}
    for name, href, key in SECTION_ORDER:
        if lang == "en":
            if key == "start":
                href = "/en/"
            elif key == "short":
                href = "/en/short/"
            elif key == "fix":
                href = "/en/fix/"
            else:
                href = "/en" + href
        label = en_names.get(key, name) if lang == "en" else name
        if key == current:
            items.append(f'<a class="ai6-subnav-link" href="{href}" aria-current="page">{esc(label)}</a>')
        else:
            items.append(f'<a class="ai6-subnav-link" href="{href}">{esc(label)}</a>')
    label = "Sections" if lang == "en" else "栏目"
    return f'<nav class="ai6-subnav wrap" aria-label="{label}"><span class="ai6-subnav-label">{label}</span>{"".join(items)}</nav>'


def site_footer(lang="zh"):
    if lang == "zh":
        sites = "".join(
            f'<a class="footer-site-link" href="{url}" data-site-nav="{key}"{nav_current(key)}>{name}</a>'
            for name, url, key in SITE_NAV
        )
        footer_text = (
            '<div class="static-footer-inner"><span>文字 CC BY-SA 4.0 · 代码 MIT · 编辑 2026-11-25</span>'
            '<span><a href="/about/">关于与编辑标准</a> · <a href="https://tvcn.org/glossary/">术语表</a> · '
            '<a href="/about/#corrections">信任与更正</a> · <a href="https://tvcn.org/app/" rel="nofollow">交互版</a> · <a href="https://tvcn.org/topics/">主题</a> · '
            '<a href="/search/">搜索</a> · TVCN</span></div>'
        )
        tabbar = "".join(
            f'<a class="tab-site-link" href="{url}" data-site-nav="{key}"{nav_current(key)}>{name}</a>'
            for name, url, key in SITE_NAV
        )
    else:
        sites = "".join(
            f'<a class="footer-site-link" href="{url}" data-site-nav="{key}"{nav_current(key)}>{name}</a>'
            for name, url, key in [
                ("Main", "https://tvcn.org/", "main"), ("Story", "https://story.tvcn.org/", "story"),
                ("Shoot", "https://shoot.tvcn.org/", "shoot"), ("Post", "https://post.tvcn.org/", "post"),
                ("AI", "https://ai.tvcn.org/", "ai"), ("Animation", "https://animation.tvcn.org/", "animation"),
                ("Formats", "https://formats.tvcn.org/", "formats"), ("Tools", "https://tools.tvcn.org/", "tools"),
                ("History", "https://context.tvcn.org/", "context"),
            ]
        )
        footer_text = (
            '<div class="static-footer-inner"><span>Text CC BY-SA 4.0 · Code MIT · Edited 2026-11-25</span>'
            '<span><a href="/en/about/">About &amp; standards</a> · <a href="https://tvcn.org/en/glossary/">Glossary</a> · '
            '<a href="/en/about/#corrections">Corrections</a> · <a href="https://tvcn.org/app/" rel="nofollow">Interactive</a> · <a href="https://tvcn.org/en/topics/">Topics</a> · '
            '<a href="/en/search/">Search</a> · TVCN</span></div>'
        )
        tabbar = "".join(
            f'<a class="tab-site-link" href="{url}" data-site-nav="{key}"{nav_current(key)}>{name}</a>'
            for name, url, key in [
                ("Main", "https://tvcn.org/", "main"), ("Story", "https://story.tvcn.org/", "story"),
                ("Shoot", "https://shoot.tvcn.org/", "shoot"), ("Post", "https://post.tvcn.org/", "post"),
                ("AI", "https://ai.tvcn.org/", "ai"), ("Animation", "https://animation.tvcn.org/", "animation"),
                ("Formats", "https://formats.tvcn.org/", "formats"), ("Tools", "https://tools.tvcn.org/", "tools"),
                ("History", "https://context.tvcn.org/", "context"),
            ]
        )
    return f'''<footer class="static-footer">
  <nav class="footer-sites" aria-label="{"Footer site navigation" if lang == "en" else "页脚站点导航"}">{sites}</nav>
  {footer_text}
</footer>
<nav class="static-tabbar" aria-label="{"Bottom site navigation" if lang == "en" else "底部站点导航"}">{tabbar}</nav>'''


def head(lang, title, desc, canonical, en_path=None, zh_path=None, page_type="article", section="AI 视频"):
    if lang == "zh":
        alt_en = f'<link rel="alternate" hreflang="en" href="{SITE_URL}{en_path}">' if en_path else ''
        alt_zh = f'<link rel="alternate" hreflang="zh-CN" href="{canonical}">'
        xdef = f'<link rel="alternate" hreflang="x-default" href="{canonical}">'
        locale = "zh_CN"
        locale_alt = "en_US"
        lang_html = "zh-CN"
    else:
        zh_abs = SITE_URL + (zh_path or "/")
        alt_en = f'<link rel="alternate" hreflang="en" href="{canonical}">'
        alt_zh = f'<link rel="alternate" hreflang="zh-CN" href="{zh_abs}">'
        xdef = f'<link rel="alternate" hreflang="x-default" href="{zh_abs}">'
        locale = "en_US"
        locale_alt = "zh_CN"
        lang_html = "en"
    if page_type == "website":
        schema = {
            "@context": "https://schema.org", "@type": "WebSite",
            "name": "AI 视频工作库" if lang == "zh" else "AI Video Field Guide",
            "description": desc, "inLanguage": lang_html, "url": canonical,
            "publisher": {"@type": "Organization", "name": "TVCN", "logo": {"@type": "ImageObject", "url": "https://ai.tvcn.org/assets/icon-512.png"}},
        }
    else:
        schema = {"@context": "https://schema.org", "@graph": [
            {"@type": "Article", "name": title, "description": desc, "inLanguage": lang_html,
             "url": canonical, "headline": title, "datePublished": DATE, "dateModified": DATE,
             "author": {"@type": "Organization", "name": "TVCN AI Desk" if lang == "en" else "TVCN AI 组", "url": "https://tvcn.org/about/"},
             "publisher": {"@type": "Organization", "name": "TVCN", "logo": {"@type": "ImageObject", "url": "https://ai.tvcn.org/assets/icon-512.png"}},
             "mainEntityOfPage": canonical},
            {"@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "TVCN", "item": "https://tvcn.org/"},
                {"@type": "ListItem", "position": 2, "name": "AI", "item": "https://ai.tvcn.org/" if lang == "zh" else "https://ai.tvcn.org/en/"},
                {"@type": "ListItem", "position": 3, "name": section, "item": canonical},
            ]},
        ]}
    schema_json = json.dumps(schema, ensure_ascii=False, separators=(",", ":"))
    return f'''<!doctype html>
<html lang="{lang_html}" data-theme="light" data-theme-pref="auto">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f4f1eb" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d100f" media="(prefers-color-scheme: dark)">
<title>{esc(title)} · TVCN</title>
<meta name="description" content="{esc(desc)}">
<meta name="author" content="TVCN AI Desk">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="canonical" href="{canonical}">
{alt_en}
{alt_zh}
{xdef}
<meta property="og:site_name" content="TVCN">
<meta property="og:type" content="{page_type}">
<meta property="og:title" content="{esc(title)} · TVCN">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{canonical}">
<meta property="og:locale" content="{locale}">
<meta property="og:locale:alternate" content="{locale_alt}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{esc(title)} · TVCN">
<meta name="twitter:description" content="{esc(desc)}">
<script type="application/ld+json">{schema_json}</script>
<link rel="stylesheet" href="/assets/article.css?v={ASSET_VERSION}">
<link rel="stylesheet" href="/assets/ai6.css?v={ASSET_VERSION}">
<script>try{{var t=localStorage.getItem('tvcn.theme')||'auto';var d=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='auto'?(d?'dark':'light'):t;document.documentElement.dataset.theme=r;document.documentElement.dataset.themePref=t;}}catch(e){{}}</script>
</head>'''


def breadcrumbs(lang, section, label, section_href=None):
    home = "首页" if lang == "zh" else "Home"
    ai = "AI 视频" if lang == "zh" else "AI Video"
    if section_href is None:
        section_href = "/" if lang == "zh" else "/en/"
    return (f'<div class="breadcrumbs"><a href="{"/" if lang == "zh" else "/en/"}">{home}</a><span>/</span>'
            f'<a href="{section_href}">{esc(section)}</a><span>/</span><span>{esc(label)}</span></div>')


def task_card(page, lang="zh"):
    if lang == "zh":
        items = [("产出", page.get("output")), ("时间", page.get("time")), ("花费", page.get("cost")), ("难度", page.get("level"))]
        fit = page.get("not_fit")
        extra = f'<div class="ai6-taskcard-fit"><span>不适合</span><b>{inline_text(fit)}</b></div>' if fit else ""
    else:
        items = [("Output", page.get("output")), ("Time", page.get("time")), ("Cost", page.get("cost")), ("Level", page.get("level"))]
        fit = page.get("not_fit")
        extra = f'<div class="ai6-taskcard-fit"><span>Not for</span><b>{inline_text(fit)}</b></div>' if fit else ""
    cells = "".join(f'<div class="ai6-taskcard-item"><span>{k}</span><b>{esc(v)}</b></div>' for k, v in items if v)
    return f'<div class="ai6-taskcard">{cells}{extra}</div>'


def render_sections(sections, lang="zh"):
    out = []
    for idx, s in enumerate(sections, 1):
        title = s.get("h", "")
        body = [f'<section><h2 id="s{idx}">{esc(title)}</h2>']
        for p in s.get("p", []):
            body.append(f'<p>{inline_text(p)}</p>')
        if s.get("bullets"):
            body.append('<ul>' + "".join(f'<li>{inline_text(x)}</li>' for x in s["bullets"]) + '</ul>')
        if s.get("steps"):
            body.append('<ol class="steps-list">' + "".join(f'<li>{inline_text(x)}</li>' for x in s["steps"]) + '</ol>')
        if s.get("table"):
            t = s["table"]
            head = "".join(f"<th>{x}</th>" for x in t["head"])
            ncols = len(t["head"])
            cls = "spec-table" + (" col-4" if ncols >= 4 else " col-3" if ncols == 3 else "")
            rows = "".join(
                "<tr>" + "".join(f'<td data-label="{esc(t["head"][i])}">{x}</td>' for i, x in enumerate(row)) + "</tr>"
                for row in t["rows"]
            )
            body.append(f'<div class="table-scroll"><table class="{cls}"><thead><tr>{head}</tr></thead><tbody>{rows}</tbody></table></div>')
        if s.get("prompts"):
            for i, p in enumerate(s["prompts"], 1):
                body.append(f'<div class="ai6-prompt"><div class="ai6-prompt-head"><span>{esc(p.get("label", "Prompt"))}</span><button type="button" class="ai6-copy" data-copy="prompt-{idx}-{i}">{"Copy" if lang == "en" else "复制"}</button></div><pre id="prompt-{idx}-{i}">{esc(p["text"])}</pre></div>')
        if s.get("note"):
            body.append(f'<div class="ai6-note">{s["note"]}</div>')
        if s.get("faults"):
            if lang == "en":
                fault_head = "<tr><th>Symptom</th><th>Cause</th><th>First fix</th><th>Then</th></tr>"
                fault_labels = ["Symptom", "Cause", "First fix", "Then"]
            else:
                fault_head = "<tr><th>症状</th><th>原因</th><th>先改</th><th>再改</th></tr>"
                fault_labels = ["症状", "原因", "先改", "再改"]
            body.append('<div class="table-scroll"><table class="spec-table ai6-fault-table col-4"><thead>' + fault_head + '</thead><tbody>' + "".join(
                f'<tr><td data-label="{fault_labels[0]}"><b>{esc(a)}</b></td><td data-label="{fault_labels[1]}">{esc(b)}</td><td data-label="{fault_labels[2]}">{esc(c)}</td><td data-label="{fault_labels[3]}">{esc(d)}</td></tr>' for a, b, c, d in s["faults"]) + '</tbody></table></div>')
        if s.get("checks"):
            body.append('<ul class="ai6-checks">' + "".join(f'<li>{inline_text(x)}</li>' for x in s["checks"]) + '</ul>')
        if s.get("cards"):
            body.append(s["cards"])
        if s.get("html"):
            body.append(s["html"])
        body.append('</section>')
        out.append("".join(body))
    return "".join(out)


def tool_cards(ids, cards_by_id, lang="zh"):
    if not ids:
        return ""
    prefix = "/en" if lang == "en" else ""
    parts = []
    for cid in ids:
        c = cards_by_id.get(cid)
        if not c:
            continue
        used = ", ".join(c["used_in"])
        labels = ("Price", "Limits", "Tool card", "used in") if lang == "en" else ("价格", "限制", "工具卡", "used_in")
        parts.append(
            f'<article class="ai6-minicard" id="tool-{esc(c["id"])}"><div class="ai6-minicard-top"><b>{esc(c["name"])}</b><span>{esc(c["access"])}</span></div>'
            f'<p>{esc(c["best_for"])}</p><div class="ai6-minicard-meta"><span>{labels[0]}: {esc(c["price"])}</span><span>{labels[1]}: {esc(c["limits"])}</span></div>'
            f'<div class="ai6-minicard-links"><a href="{prefix}/tools/#{esc(c["id"])}">{labels[2]}</a><span>{labels[3]} {esc(used)}</span></div></article>'
        )
    return '<div class="ai6-cards">' + "".join(parts) + '</div>'


def model_cards(ids, cards_by_id, lang="zh"):
    if not ids:
        return ""
    prefix = "/en" if lang == "en" else ""
    parts = []
    for cid in ids:
        c = cards_by_id.get(cid)
        if not c:
            continue
        labels = ("Length", "Resolution", "Audio", "Refs", "Model card") if lang == "en" else ("长度", "分辨率", "音频", "参考", "模型卡")
        parts.append(
            f'<article class="ai6-minicard" id="model-{esc(c["id"])}"><div class="ai6-minicard-top"><b>{esc(c["name"])}</b><span>{esc(c["access"])}</span></div>'
            f'<p>{esc(c["best_for"])}</p><div class="ai6-minicard-meta"><span>{labels[0]}: {esc(c["length"]) or "—"}</span><span>{labels[1]}: {esc(c["resolution"]) or "—"}</span>'
            f'<span>{labels[2]}: {esc(c["audio"]) or "—"}</span><span>{labels[3]}: {esc(c["refs"]) or "—"}</span></div>'
            f'<div class="ai6-minicard-links"><a href="{prefix}/models/#{esc(c["id"])}">{labels[4]}</a><span>{esc(c["price"])}</span></div></article>'
        )
    return '<div class="ai6-cards">' + "".join(parts) + '</div>'


def evidence_gallery(items, lang="zh"):
    if not items:
        return ""
    kicker = "Official public page · raw screenshot" if lang == "en" else "官方公开页 · 原始截图"
    link_label = "Open official page ↗" if lang == "en" else "打开官方页 ↗"
    cards = []
    for it in items:
        title = it.get("title_" + lang, it.get("title_zh", ""))
        what = it.get("what_" + lang, it.get("what_zh", ""))
        date = it.get("date_" + lang, it.get("date_zh", ""))
        alt = it.get("alt_" + lang, it.get("alt", title))
        cards.append(
            f'<figure class="ai6-evidence-card">'
            f'<a class="ai6-evidence-shot" href="{esc(it["source"])}" target="_blank" rel="noopener">'
            f'<img src="/assets/evidence/{esc(it["file"])}" alt="{esc(alt)}" width="1280" height="900" loading="lazy" decoding="async"></a>'
            f'<figcaption><span class="ai6-evidence-kicker">{kicker} · {esc(date)}</span>'
            f'<strong>{esc(title)}</strong><p>{esc(what)}</p>'
            f'<a href="{esc(it["source"])}" target="_blank" rel="noopener">{link_label}</a></figcaption></figure>'
        )
    return '<div class="ai6-evidence-grid">' + "".join(cards) + '</div>'


def sample_gallery(items, lang="zh"):
    if not items:
        return ""
    kicker = "Free commercial-use real footage · not AI-generated" if lang == "en" else "免费商用实拍素材 · 非 AI 生成"
    download = "Download MP4" if lang == "en" else "下载 MP4"
    license_label = "License" if lang == "en" else "许可"
    cards = []
    for it in items:
        title = it.get("title_" + lang, it.get("title_zh", ""))
        what = it.get("what_" + lang, it.get("what_zh", ""))
        cards.append(
            f'<figure class="ai6-sample-card">'
            f'<video controls preload="metadata" poster="/assets/samples/{esc(it["poster"])}" width="960" height="540" playsinline>'
            f'<source src="/assets/samples/{esc(it["file"])}" type="video/mp4">'
            f'<a href="/assets/samples/{esc(it["file"])}" download>{download}</a></video>'
            f'<figcaption><span class="ai6-sample-kicker">{kicker} · 960×540 · 10s</span>'
            f'<strong>{esc(title)}</strong><p>{esc(what)}</p>'
            f'<div class="ai6-sample-meta"><span>{esc(it["credit"])}</span>'
            f'<a href="{esc(it["license"])}" target="_blank" rel="noopener">{license_label} ↗</a>'
            f'<a href="{esc(it["source"])}" target="_blank" rel="noopener">Pexels ↗</a>'
            f'<a href="/assets/samples/{esc(it["file"])}" download>{download} ↓</a></div></figcaption></figure>'
        )
    return '<div class="ai6-sample-grid">' + "".join(cards) + '</div>'


def budget_calculator(lang="zh"):
    if lang == "en":
        labels = dict(seconds="Finished seconds / video", price="Price per second (CNY)", retry="Retry factor", voice="Voice cost / video", music="Music & SFX / video", hours="Edit hours / video", rate="Edit rate / hour", videos="Videos / month",
                      gen="Generation", per="Total per video", sec="Usable cost / second", monthly="Monthly total", annual="12-month total", note="A public-price model, not an account bill. Change the price and retry factor; failed takes and taxes can move the real number.")
        currency = "¥"
    else:
        labels = dict(seconds="每条成片秒数", price="每秒单价（元）", retry="重试系数", voice="每条配音成本", music="每条音乐/音效", hours="每条剪辑小时", rate="剪辑时薪", videos="每月条数",
                      gen="生成成本", per="单条总成本", sec="可用秒成本", monthly="每月总支出", annual="12 个月总支出", note="这是公开价模型，不是账户账单。改单价和重试系数；失败条、税费会让真实数字变化。")
        currency = "¥"
    def field(key, value, step="1", minimum="0"):
        return f'<label class="ai6-budget-field"><span>{labels[key]}</span><input data-bc="{key}" type="number" min="{minimum}" step="{step}" value="{value}" inputmode="decimal"></label>'
    return f'''<div class="ai6-budget-calc">
<div class="ai6-budget-fields">
{field("seconds", "90", "1", "1")}
{field("price", "0.80", "0.01", "0")}
{field("retry", "2.5", "0.1", "1")}
{field("voice", "30", "1", "0")}
{field("music", "20", "1", "0")}
{field("hours", "3", "0.5", "0")}
{field("rate", "50", "1", "0")}
{field("videos", "4", "1", "1")}
</div>
<div class="ai6-budget-out">
<div><span>{labels["gen"]}</span><b data-out="gen">{currency}180</b></div>
<div><span>{labels["per"]}</span><b data-out="per">{currency}380</b></div>
<div><span>{labels["sec"]}</span><b data-out="sec">{currency}4.22</b></div>
<div><span>{labels["monthly"]}</span><b data-out="monthly">{currency}1,520</b></div>
<div><span>{labels["annual"]}</span><b data-out="annual">{currency}18,240</b></div>
</div>
<p class="ai6-budget-note">{labels["note"]}</p>
</div>
<script>
(function(){{
  var root=document.currentScript.closest('.ai6-budget-calc')||document.querySelector('.ai6-budget-calc');
  if(!root)return;
  function num(k){{var el=root.querySelector('[data-bc="'+k+'"]');var v=el?parseFloat(el.value):0;return isFinite(v)?v:0;}}
  function fmt(n){{return n.toLocaleString('en-US',{{maximumFractionDigits:0}});}}
  function upd(){{
    var s=num('seconds'),p=num('price'),r=num('retry'),v=num('voice'),m=num('music'),h=num('hours'),rate=num('rate'),n=num('videos');
    var gen=s*p*r, per=gen+v+m+h*rate, sec=s?per/s:0, monthly=per*n, annual=monthly*12;
    var out={{gen:'{currency}'+fmt(gen),per:'{currency}'+fmt(per),sec:'{currency}'+sec.toFixed(2),monthly:'{currency}'+fmt(monthly),annual:'{currency}'+fmt(annual)}};
    Object.keys(out).forEach(function(k){{var el=root.querySelector('[data-out="'+k+'"]');if(el)el.textContent=out[k];}});
  }}
  root.querySelectorAll('[data-bc]').forEach(function(el){{el.addEventListener('input',upd);}});
  upd();
}})();
</script>'''


def article_page(page, cards_by_id, lang="zh"):
    title = page["title"]
    desc = page.get("desc", page.get("deck", ""))
    canonical = SITE_URL + (page["path"] if lang == "zh" else "/en" + page["path"])
    if page["path"] == "/":
        canonical = SITE_URL + ("/" if lang == "zh" else "/en/")
    section = page.get("section", "AI 视频")
    section_href = page.get("section_href", "/")
    hero = f'''<div class="wrap">
{breadcrumbs(lang, section, page.get("short_title", title), section_href)}
<header class="article-hero"><p class="eyebrow">{esc(section)} / {esc(page.get("type", "任务课"))}</p><h1>{esc(title)}</h1><p class="article-deck">{inline_text(page.get("deck", ""))}</p>{task_card(page, lang)}<div class="article-meta"><span>{esc(page.get("type", "任务课"))}</span><span>TVCN AI Desk</span><span>{"Edited" if lang == "en" else "编辑"} {DATE}</span></div></header>'''
    if page.get("hub_items"):
        href_prefix = "/en" if lang == "en" else ""
        hub = '<div class="ai6-hub-grid">'
        for label, href, note in page["hub_items"]:
            hub += f'<a class="ai6-hub-card" href="{href_prefix}{href}"><b>{esc(label)}</b><span>{esc(note)}</span></a>'
        hub += '</div>'
        hero += hub
    sections = list(page.get("sections", []))
    if page.get("evidence"):
        sections.insert(min(2, len(sections)), {
            "h": "Official page screenshots: read the limits" if lang == "en" else "官方公开页截图：先看限制",
            "html": evidence_gallery(page["evidence"], lang),
        })
    if page.get("samples"):
        sections.insert(min(3, len(sections)), {
            "h": "Free commercial-use footage: real footage, not AI output" if lang == "en" else "免费商用实拍样片：不是 AI 生成，用来做对照",
            "html": sample_gallery(page["samples"], lang),
        })
    if page.get("calculator"):
        sections.insert(min(1, len(sections)), {
            "h": "Budget calculator: change the retry factor" if lang == "en" else "预算计算器：先改重试系数",
            "html": budget_calculator(lang),
        })
    if page.get("prereq"):
        sections.append({"h": "先决条件" if lang == "zh" else "Prerequisites", "bullets": page["prereq"]})
    if page.get("tool_ids") and lang == "zh":
        cards = tool_cards(page["tool_ids"], cards_by_id, lang)
        sections.append({"h": "这一步用什么工具" if lang == "zh" else "Tools for this step", "cards": cards})
    if page.get("model_ids") and lang == "zh":
        mcards = model_cards(page["model_ids"], cards_by_id, lang)
        sections.append({"h": "这一步用什么模型" if lang == "zh" else "Models for this step", "cards": mcards})
    if page.get("tool_hub") and lang == "zh":
        all_tools = [k for k in cards_by_id if cards_by_id[k].get("kind") == "tool"]
        sections.append({"h": "21 张工具卡" if lang == "zh" else "All 21 tool cards", "cards": tool_cards(all_tools, cards_by_id, lang)})
    if page.get("model_hub") and lang == "zh":
        all_models = [k for k in cards_by_id if cards_by_id[k].get("kind") in ("video", "image")]
        sections.append({"h": "19 张模型卡" if lang == "zh" else "All 19 model cards", "cards": model_cards(all_models, cards_by_id, lang)})
    if page.get("steps"):
        sections.append({"h": "操作步骤" if lang == "zh" else "Steps", "steps": page["steps"]})
    if page.get("prompts"):
        sections.append({"h": "可复制提示词 / 参数" if lang == "zh" else "Copy-ready prompts / settings", "prompts": page["prompts"]})
    if page.get("checks"):
        sections.append({"h": "验收清单" if lang == "zh" else "Checks", "checks": page["checks"]})
    if page.get("faults"):
        sections.append({"h": "卡住了怎么查" if lang == "zh" else "Troubleshooting", "faults": page["faults"]})
    if page.get("cost_rows"):
        cost_head = (["Item", "Basis", "Note"] if lang == "en" else ["项目", "口径", "说明"])
        sections.append({"h": "时间与成本" if lang == "zh" else "Time and cost", "table": {"head": cost_head, "rows": page["cost_rows"]}})
    sections.append({
        "h": "本页口径" if lang == "zh" else "Page basis",
        "bullets": [
            "版本与日期：工具/模型参数按 2026-11-26 官方公开页与页面卡片核对；价格、额度、排队与地区可用性会变，执行前再看官方页。" if lang == "zh" else "Version and date: tool and model parameters were checked on 2026-11-26 against official public pages and the cards here. Prices, quotas, queues and regional availability change; re-check the official page before you run it.",
            "许可：工具/模型的许可与商用条款以官方页为准；页面里的“免费/开源/按官方”只是检索标签，不是授权结论。" if lang == "zh" else "License: the tool or model's own license and commercial terms govern. “Free / open source / see official” here is a finding label, not a licensing conclusion.",
            "复现口径：步骤、提示词、参数与验收清单可复现；平台队列、模型版本与账号额度不可复现，结果按失败表复测。" if lang == "zh" else "Reproducibility: the steps, prompts, settings and checks are reproducible; queue position, model version and account quota are not. Re-test with the troubleshooting table.",
            "素材标识：实拍样片标注“非 AI 生成”；官方截图标注“官方公开页”；没有标注的图片是示意，不是本页实测输出。" if lang == "zh" else "Asset labels: real footage is marked “not AI-generated”; official screenshots are marked “official public page”; unlabelled images are illustrative, not this page's test output.",
        ],
    })
    if page.get("downloads"):
        links = "".join(f'<li><a href="{esc(p)}">{esc(n)}</a><span>{esc(note)}</span></li>' for n, p, note in page["downloads"])
        sections.append({"h": "本页下载物" if lang == "zh" else "Downloads", "html": f'<ul class="ai6-downloads">{links}</ul>'})
    if page.get("next"):
        sections.append({"h": "下一步" if lang == "zh" else "Next", "p": [page["next"]]})
    toc = "".join(f'<li><a href="#s{i}">{esc(s["h"])}</a></li>' for i, s in enumerate(sections, 1))
    toc_label = "Contents" if lang == "en" else "本文目录"
    sources = page.get("sources", [])
    source_html = ""
    if sources:
        source_html = f'<div class="article-sources"><p class="source-types">{"Sources; prices and availability follow the official page." if lang == "en" else "参考来源，价格与可用性以官方页为准。"}</p><ul>' + "".join(
            f'<li><a href="{esc(u)}" target="_blank" rel="noopener">{esc(t)}</a></li>' for t, u in sources) + '</ul></div>'
    related = page.get("related", [])
    related_html = ""
    if related:
        related_html = '<div class="related">' + "".join(f'<a href="{esc(h)}">{esc(t)} →</a>' for t, h in related) + '</div>'
    body = f'''<nav class="article-toc" aria-label="{toc_label}"><span class="toc-label">{toc_label}</span><ol>{toc}</ol></nav>
<article class="article-body">{render_sections(sections, lang)}{related_html}{source_html}</article>
</div>'''
    en_path = ("/en" + page["path"]) if (lang == "zh" and page["path"] in EN_PATHS) else None
    zh_path = page["path"] if lang == "en" else page.get("zh_path", page["path"])
    return head(lang, title, desc, canonical, en_path=en_path, zh_path=zh_path, section=section) + f'''
<body class="static-page">
<a class="skip-link" href="#main">{"Skip to content" if lang == "en" else "跳到正文"}</a>
{site_header(lang, en_path=en_path, zh_path=zh_path)}
{section_nav(page.get("section_key", ""), lang)}
<main id="main" class="static-main" tabindex="-1">
{hero}
{body}
</main>
{site_footer(lang)}
<script>
var ai6Done={'"Copied"' if lang == "en" else '"已复制"'}, ai6Reset={'"Copy"' if lang == "en" else '"复制"'};
document.querySelectorAll('[data-copy]').forEach(function(b){{b.addEventListener('click',function(){{var el=document.getElementById(b.getAttribute('data-copy'));if(!el)return;var t=el.textContent;if(navigator.clipboard&&navigator.clipboard.writeText){{navigator.clipboard.writeText(t).then(function(){{b.textContent=ai6Done;setTimeout(function(){{b.textContent=ai6Reset}},1500)}})}}else{{var r=document.createRange();r.selectNodeContents(el);var s=window.getSelection();s.removeAllRanges();s.addRange(r)}}}})}});
document.querySelectorAll('[data-theme-toggle]').forEach(function(b){{b.addEventListener('click',function(){{var cur=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=cur;document.documentElement.dataset.themePref=cur;try{{localStorage.setItem('tvcn.theme',cur)}}catch(e){{}}}})}});
</script>
</body>
</html>'''


def simple_page(lang, title, desc, path, body, section="AI 视频", page_type="article", section_key="", en_path=None, zh_path=None):
    canonical = SITE_URL + path
    return head(lang, title, desc, canonical, en_path=en_path, zh_path=zh_path, page_type=page_type, section=section) + f'''
<body class="static-page">
<a class="skip-link" href="#main">{"Skip to content" if lang == "en" else "跳到正文"}</a>
{site_header(lang, en_path=en_path, zh_path=zh_path)}
{section_nav(section_key, lang)}
<main id="main" class="static-main" tabindex="-1">
{body}
</main>
{site_footer(lang)}
<script>document.querySelectorAll('[data-theme-toggle]').forEach(function(b){{b.addEventListener('click',function(){{var cur=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=cur;document.documentElement.dataset.themePref=cur;try{{localStorage.setItem('tvcn.theme',cur)}}catch(e){{}}}})}});</script>
</body>
</html>'''



