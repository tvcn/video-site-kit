# -*- coding: utf-8 -*-
"""Build the AI video site v6 into a static directory.

Usage:
  python generator/ai6/build_site.py --out generator/ai6/site
"""
import argparse
import json
import re
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(HERE / "content"))

from schema import SITE_URL, DATE, load_cards, card_by_id, article_page, simple_page, site_header, site_footer, esc  # noqa: E402
import pages_start, pages_drama, pages_drama2, pages_short, pages_ext, pages_kb, pages_kb2, pages_fix, pages_lab, pages_en, pages_en_hubs, home  # noqa: E402

PAGES = (
    pages_start.PAGES + pages_drama.PAGES + pages_drama2.PAGES + pages_short.PAGES
    + pages_ext.PAGES + pages_kb.PAGES + pages_kb2.PAGES + pages_fix.PAGES
    + pages_lab.PAGES
)
EN_PAGES = pages_en.PAGES + pages_lab.EN_PAGES + pages_en_hubs.PAGES


def out_path(site_root, url_path):
    if url_path == "/":
        return site_root / "index.html"
    return site_root / url_path.strip("/") / "index.html"


def plain(value, depth=0):
    if depth > 8 or value is None:
        return ""
    if isinstance(value, str):
        return re.sub(r"<[^>]+>", " ", value)
    if isinstance(value, (list, tuple)):
        return " ".join(plain(v, depth + 1) for v in value)
    if isinstance(value, dict):
        return " ".join(plain(v, depth + 1) for k, v in value.items() if k not in ("path", "section_href", "en_path", "zh_path"))
    return str(value)


def search_entry(title, path, section, page_type, desc, text):
    return {
        "title": title, "path": path, "section": section, "type": page_type,
        "desc": re.sub(r"\s+", " ", desc).strip(),
        "text": re.sub(r"\s+", " ", plain(text)).strip()[:9000],
    }


def build_search_body(lang):
    idx = "/en/search-index.json" if lang == "en" else "/search-index.json"
    if lang == "en":
        title, deck, placeholder, btn, empty, fail = (
            "Search the field guide", "Search 14 English pages. Try “H3”, “Kling”, “15s”, “QC”.",
            "Search a tool, model, or task", "Search", "Type a keyword to start.", "Index could not load. Try again.")
    else:
        title, deck, placeholder, btn, empty, fail = (
            "搜索全站", "搜索 29 个中文页。试试“H3”“可灵”“15 秒”“验收”。",
            "搜工具、模型或任务", "搜索", "输入关键词开始。", "索引加载失败，请刷新重试。")
    return f'''<div class="wrap">
<header class="article-hero"><p class="eyebrow">{"Search" if lang == "en" else "搜索"} / TVCN AI Desk</p><h1>{title}</h1><p class="article-deck">{deck}</p></header>
<div class="ai6-search"><input id="q" type="search" placeholder="{placeholder}" autocomplete="off" aria-label="{placeholder}"><button type="button" id="go">{btn}</button></div>
<div id="results" class="ai6-search-results"><p class="ai6-footer-note">{empty}</p></div>
</div>
<script>
(function(){{
  var q=document.getElementById('q'), out=document.getElementById('results'), data=null;
  var initial=new URLSearchParams(location.search).get('q');
  if(initial){{q.value=initial;}}
  function render(){{
    if(!data){{out.innerHTML='<p class="ai6-footer-note">{fail}</p>';return;}}
    var v=q.value.trim().toLowerCase();
    if(!v){{out.innerHTML='<p class="ai6-footer-note">{empty}</p>';return;}}
    var hits=data.filter(function(x){{return (x.title+' '+x.desc+' '+x.text+' '+x.section).toLowerCase().indexOf(v)>=0;}}).slice(0,20);
    if(!hits.length){{out.innerHTML='<p class="ai6-footer-note">{"No result. Try a broader term." if lang=="en" else "没有结果，换一个更宽的关键词。"}</p>';return;}}
    out.innerHTML=hits.map(function(x){{return '<div class="ai6-search-result"><span class="ai6-tag">'+x.section+'</span><a href="'+x.path+'">'+x.title+'</a><p>'+x.desc+'</p></div>';}}).join('');
  }}
  fetch('{idx}').then(function(r){{return r.json();}}).then(function(j){{data=j;render();}}).catch(function(){{data=[];render();}});
  q.addEventListener('input',render); document.getElementById('go').addEventListener('click',render);
}})();
</script>'''


def make_404(site_root):
    legacy = json.loads((HERE / "legacy_map.json").read_text(encoding="utf-8"))
    (site_root / "legacy-map.json").write_text(json.dumps(legacy, ensure_ascii=False), encoding="utf-8")
    body = '''<div class="wrap"><header class="article-hero"><p class="eyebrow">404</p><h1>这个页面不存在</h1><p class="article-deck">地址可能变了。从下面五个入口重新开始，或用搜索找。</p><div class="ai6-quick"><a href="/">开始</a><a href="/drama/">短剧</a><a href="/short/">短视频</a><a href="/tools/">工具与模型</a><a href="/fix/">排障交付</a><a href="/search/">搜索</a></div></header></div>'''
    html = simple_page("zh", "页面不存在", "404：这个页面不存在。", "/404.html", body, section="AI 视频", page_type="website", section_key="start")
    html = html.replace("<head>", '<head>\n<meta name="robots" content="noindex">', 1)
    html = html.replace("</body>", '''<script>
(function(){
  var p=location.pathname;
  fetch('/legacy-map.json').then(function(r){return r.json();}).then(function(m){
    var t=m[p]||m[p.replace(/\\/$/,'')+'/'];
    if(t && t!==p){location.replace(t+location.search+location.hash);}
  }).catch(function(){});
})();
</script>
</body>''', 1)
    (site_root / "404.html").write_text(html, encoding="utf-8")


def make_sitemap(entries, site_root):
    urls = []
    for e in entries:
        urls.append(f'''  <url><loc>{SITE_URL}{e["path"]}</loc><lastmod>{DATE}</lastmod><changefreq>monthly</changefreq><priority>{"1.0" if e["path"] in ("/", "/en/") else "0.8"}</priority></url>''')
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>\n"
    (site_root / "sitemap.xml").write_text(xml, encoding="utf-8")


def about_body(lang):
    zh = lang == "zh"
    if zh:
        return '''<div class="wrap">
<header class="article-hero"><p class="eyebrow">关于 / AI 视频工作库</p><h1>关于与编辑标准</h1><p class="article-deck">这个站只回答一件事：在 AI 视频工具、模型和平台都在变的时候，怎样做出一条能交付的片子。</p></header>
<article class="article-body">
<section><h2>这个站是什么</h2><p>AI 视频工作库是 TVCN 的第九个站。它不追“最强模型”，而是把任务、工具、参数、成本、失败和验收放在同一页：你先说要交什么，再决定用云还是本地、用哪个模型、花多少钱。这里的页面按任务组织，不按厂商组织。</p></section>
<section><h2>我们怎么写</h2><ul><li>先写交付物、时间盒和预算，再写工具。</li><li>工具和模型卡写价格、限制、许可和最后核对日期；价格与额度会变，执行前再看官方页。</li><li>每页有操作步骤、可复制提示词/参数、验收清单和失败表；没有这些，不算一篇完整任务页。</li><li>官方截图标“官方公开页”，实拍样片标“非 AI 生成”，没有标注的图是示意。</li></ul></section>
<section><h2>AI 使用边界</h2><p>我们不用 AI 生成“客户案例”或“实测数据”。模型输出只作为示意，不能当作现场测试；涉及肖像、版权、平台规则和商用许可时，以官方条款和执业律师意见为准。页面里的“免费/开源/按官方”是检索标签，不是授权结论。</p></section>
<section><h2>版本与更正</h2><p>每页标注编辑日期；工具价格、模型版本、平台政策和地区可用性变化时，优先更新对应页，不按日历凑更新。发现错误，请把页面地址、具体句子和证据发到编辑邮箱；我们会在页内标注更正，不悄悄改掉。</p></section>
<section><h2>许可</h2><p>文字采用 CC BY-SA 4.0，代码采用 MIT；第三方工具截图、商标和样片归各自权利人。转载文字请保留作者、站点和原文链接；商用前自行核对第三方许可。</p></section>
</article></div>'''
    return '''<div class="wrap">
<header class="article-hero"><p class="eyebrow">About / AI Video Field Guide</p><h1>About and editorial standards</h1><p class="article-deck">This site answers one question: when AI video tools, models and platforms keep changing, how do you finish a film that can actually be delivered?</p></header>
<article class="article-body">
<section><h2>What this site is</h2><p>The AI Video Field Guide is TVCN's ninth desk. It does not chase the “strongest model”. It puts task, tool, settings, cost, failure and checks on one page: state the deliverable first, then decide cloud or local, which model, and what budget. Pages are organised by job, not by vendor.</p></section>
<section><h2>How we write</h2><ul><li>Deliverable, time box and budget come before the tool.</li><li>Tool and model cards state price, limits, licence and last-checked date. Prices and quotas change; check the official page before you run it.</li><li>Every task page has steps, copy-ready prompts/settings, a check list and a failure table. Without these, it is not a complete task page.</li><li>Official screenshots are labelled “official public page”; real footage is labelled “not AI-generated”; unlabelled images are illustrative.</li></ul></section>
<section><h2>Where AI stops</h2><p>We do not generate fake client cases or fake measurements. Model output is illustrative, not an on-set test. For likeness, copyright, platform rules and commercial licensing, the official terms and a qualified lawyer govern. “Free / open source / see official” is a finding label, not a licensing conclusion.</p></section>
<section><h2>Versions and corrections</h2><p>Each page carries an edited date. When tool prices, model versions, platform policies or regional availability change, we update that page first, not on a calendar. If you find an error, send the URL, the exact sentence and the evidence to the editorial inbox. We mark corrections on the page instead of silently rewriting it.</p></section>
<section><h2>Licence</h2><p>Text is CC BY-SA 4.0; code is MIT. Third-party screenshots, trademarks and sample footage belong to their owners. When republishing text, keep the author, site and source link. Check third-party licences before commercial use.</p></section>
</article></div>'''


def articles_body(lang):
    zh = lang == "zh"
    groups = {}
    for p in (PAGES if zh else EN_PAGES):
        groups.setdefault(p.get("section", "AI 视频" if zh else "AI Video"), []).append(p)
    blocks = []
    for section, rows in groups.items():
        links = "".join(
            f'<li><a href="{("/en" if not zh else "") + p["path"]}">{esc(p["title"])}</a><span>{esc(p.get("type", ""))}</span></li>'
            for p in rows
        )
        blocks.append(f'<section><h2>{esc(section)}</h2><ul class="ai6-article-index">{links}</ul></section>')
    return f'''<div class="wrap">
<header class="article-hero"><p class="eyebrow">{"索引" if zh else "INDEX"} / AI</p><h1>{"全部页面" if zh else "All pages"}</h1><p class="article-deck">{"按任务线分组的全部中文与英文页面；先选任务，再看工具和模型。" if zh else "Every Chinese and English page, grouped by task line: pick the job first, then the tool and model."}</p></header>
<article class="article-body">{''.join(blocks)}</article></div>'''


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(HERE / "site"))
    args = ap.parse_args()
    site_root = Path(args.out).resolve()
    if site_root.exists():
        shutil.rmtree(site_root)
    site_root.mkdir(parents=True)
    (site_root / "assets").mkdir()
    (site_root / "assets" / "templates").mkdir()

    cards = load_cards()
    cards_by_id = card_by_id(cards)

    # Assets: CSS/icons, templates and six captioned official-page screenshots.
    old_assets = ROOT / "assets"
    canonical_assets = ROOT / "site-kit" / "assets"
    shutil.copy2(canonical_assets / "article.css", site_root / "assets" / "article.css")
    shutil.copy2(HERE / "ai6.css", site_root / "assets" / "ai6.css")
    for name in ("icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "favicon-32.png"):
        src = old_assets / name
        if src.exists():
            shutil.copy2(src, site_root / "assets" / name)
    shutil.copytree(HERE / "templates", site_root / "assets" / "templates", dirs_exist_ok=True)
    shutil.copytree(HERE / "evidence", site_root / "assets" / "evidence", dirs_exist_ok=True)
    shutil.copytree(HERE / "samples", site_root / "assets" / "samples", dirs_exist_ok=True)

    # Homepages
    zh_home = home.home_zh(PAGES, cards)
    en_home = home.home_en(EN_PAGES, cards)
    (site_root / "index.html").write_text(
        simple_page("zh", "AI 视频工作库", "29 个中文页 + 14 个英文页：短剧、短视频、产品、口播、工具与模型、排障交付。零装饰图，按任务选工具。", "/", zh_home, section="AI 视频", page_type="website", section_key="start", en_path="/en/", zh_path="/"),
        encoding="utf-8")
    (site_root / "en" / "index.html").parent.mkdir(parents=True, exist_ok=True)
    (site_root / "en" / "index.html").write_text(
        simple_page("en", "AI Video Field Guide", "Fourteen English pages for AI video: drama, short-form, tools, models, ComfyUI, H3, Seedance, Kling, fix desk and delivery.", "/en/", en_home, section="AI Video", page_type="website", section_key="start", zh_path="/"),
        encoding="utf-8")

    # About and a complete article index. These are shell pages, not task pages.
    for lang, path, title, desc, body, zh_path, en_path in (
        ("zh", "/about/", "关于与编辑标准", "TVCN AI 视频工作库怎么写、怎么复核、AI 使用边界和更正规则。", about_body("zh"), "/about/", "/en/about/"),
        ("en", "/en/about/", "About and editorial standards", "How the TVCN AI Video Field Guide writes, reviews, limits AI and corrects errors.", about_body("en"), "/about/", "/en/about/"),
        ("zh", "/articles/", "全部页面", "按任务线分组的全部 AI 视频页面。", articles_body("zh"), "/articles/", "/en/articles/"),
        ("en", "/en/articles/", "All pages", "Every AI video page, grouped by task line.", articles_body("en"), "/articles/", "/en/articles/"),
    ):
        target = out_path(site_root, path)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(simple_page(lang, title, desc, path, body, section="AI 视频" if lang == "zh" else "AI Video", page_type="website", section_key="start", zh_path=zh_path, en_path=en_path), encoding="utf-8")

    # Chinese 28 article pages + EN 10 article pages (plus two homepages)
    zh_entries = []
    en_entries = []
    for page in PAGES:
        target = out_path(site_root, page["path"])
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(article_page(page, cards_by_id, "zh"), encoding="utf-8")
        zh_entries.append(search_entry(page["title"], page["path"], page["section"], page.get("type", ""), page.get("deck", ""), page))
    for page in EN_PAGES:
        en_path = "/en" + page["path"]
        target = out_path(site_root, en_path)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(article_page(page, cards_by_id, "en"), encoding="utf-8")
        en_entries.append(search_entry(page["title"], en_path, page.get("section", "AI Video"), page.get("type", ""), page.get("deck", ""), page))

    # Search pages + indexes
    for lang, path, entries, idx_rel in (
        ("zh", "/search/", zh_entries + [search_entry("首页", "/", "开始", "首页", "五个入口、三条路线、29 中文页 + 14 英文页", "首页 28 页 五个入口")], "search-index.json"),
        ("en", "/en/search/", en_entries + [search_entry("Home", "/en/", "Start", "Home", "Five entries, three routes, fourteen English pages", "home five entries three routes")], "en/search-index.json"),
    ):
        target = out_path(site_root, path)
        target.parent.mkdir(parents=True, exist_ok=True)
        en_path = "/en/search/" if lang == "zh" else None
        zh_path = "/search/" if lang == "en" else None
        target.write_text(simple_page(lang, "搜索全站" if lang == "zh" else "Search", "搜索 AI 视频工作库。" if lang == "zh" else "Search the AI Video Field Guide.", path, build_search_body(lang), section="AI 视频" if lang == "zh" else "AI Video", page_type="website", section_key="start", en_path=en_path, zh_path=zh_path), encoding="utf-8")
        idx_target = site_root / idx_rel
        idx_target.parent.mkdir(parents=True, exist_ok=True)
        idx_target.write_text(json.dumps(entries, ensure_ascii=False, indent=1), encoding="utf-8")

    # sitemap: 31 zh (incl home + about/articles) + 16 en = 47
    all_entries = [
        search_entry("首页", "/", "开始", "首页", "", ""),
        search_entry("关于与编辑标准", "/about/", "关于", "website", "编辑标准与 AI 使用边界", ""),
        search_entry("全部页面", "/articles/", "索引", "website", "全部 AI 视频页面", ""),
    ] + zh_entries + [
        search_entry("Home", "/en/", "Start", "Home", "", ""),
        search_entry("About and editorial standards", "/en/about/", "About", "website", "Editorial standards and AI limits", ""),
        search_entry("All pages", "/en/articles/", "Index", "website", "Every AI video page", ""),
    ] + en_entries
    make_sitemap(all_entries, site_root)

    (site_root / "robots.txt").write_text("User-agent: *\nAllow: /\n\nSitemap: https://ai.tvcn.org/sitemap.xml\n", encoding="utf-8")
    (site_root / "CNAME").write_text("ai.tvcn.org\n", encoding="utf-8")
    (site_root / ".nojekyll").write_text("", encoding="utf-8")
    (site_root / "manifest.webmanifest").write_text(json.dumps({
        "name": "AI 视频工作库 / AI Video Field Guide", "short_name": "TVCN AI",
        "start_url": "/", "display": "standalone", "background_color": "#f4f1eb", "theme_color": "#b04421",
        "icons": [{"src": "/assets/icon-192.png", "sizes": "192x192", "type": "image/png"},
                  {"src": "/assets/icon-512.png", "sizes": "512x512", "type": "image/png"}],
    }, ensure_ascii=False, indent=2), encoding="utf-8")
    make_404(site_root)

    # Deployment note for the repo
    (site_root / "README-DEPLOY.md").write_text(
        "# AI video site v6\n\n"
        "Static build: 29 Chinese pages + 14 English pages. Six captioned official-page screenshots and two free commercial-use real reference clips on the tool hub; no decorative images.\n\n"
        "- Build: `python generator/ai6/build_site.py --out generator/ai6/site`\n"
        "- QA: `python generator/ai6/qa_site.py --site generator/ai6/site`\n"
        "- Publish: `node generator/build-all.mjs`, then `generator/publish.ps1 -Site ai`.\n"
        "- Templates: `/assets/templates/` (zh) and `/assets/templates/en/` (en).\n"
        "- Legacy: `/legacy-map.json` maps 178 old URLs; `404.html` performs a client-side redirect. GitHub Pages cannot issue HTTP 301, so use a CDN 301 list if search equity matters.\n",
        encoding="utf-8")

    print(f"BUILT {site_root}")
    print(f"ZH pages {len(PAGES)+1} (incl home); EN pages {len(EN_PAGES)+1} (incl home)")
    print(f"Search entries {len(all_entries)}")


if __name__ == "__main__":
    main()


