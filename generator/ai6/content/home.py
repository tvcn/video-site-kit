# -*- coding: utf-8 -*-
"""Home pages (zh / en) for AI video v6."""

ZH_CATALOG = [
    ("开始", [
        ("P01", "首页", "/", "五个入口、三条路线、全站 29 页索引"),
        ("P02", "10 分钟选路线", "/start/route/", "四问诊断；先定交付物，再定模型"),
        ("P03", "硬件与预算", "/start/budget/", "8GB / 16GB / 24GB / 云，分别能做什么"),
    ]),
    ("短剧", [
        ("P04", "短剧总览", "/drama/", "90 秒、16 镜头、2 角色、7 步路线"),
        ("P05", "剧本", "/drama/script/", "logline、五段节拍、可拍台词"),
        ("P06", "分镜", "/drama/storyboard/", "16 行 Shot List、景别、时长、转场"),
        ("P07", "角色一致性", "/drama/character/", "6–10 张参考、锁脸、服装、光向"),
        ("P08", "镜头生成", "/drama/shots/", "模型路由、三遍法、A/B/C 选条"),
        ("P09", "配音与口型", "/drama/audio/", "TTS、口型、环境声、-14 LUFS"),
        ("P10", "剪辑", "/drama/edit/", "粗剪、字幕、转场、节奏、导出"),
    ]),
    ("短视频", [
        ("P11", "短视频总览", "/short/", "15 秒 / 30 秒 / 产品 / 口播，四种配方"),
        ("P12", "第一条 15 秒", "/short/15s/", "一个钩子、一个演示、一个落点"),
        ("P13", "产品视频", "/short/product/", "标签、手部、材质、卖点顺序"),
        ("P14", "口播", "/short/talking-head/", "提词、光、声、数字人边界"),
    ]),
    ("扩展片型", [
        ("P15", "品牌/氛围", "/brand/", "5 秒 hero、15 秒 cut、无对白叙事"),
        ("P16", "MV/概念", "/music-video/", "节奏表、转场、色彩、版权"),
        ("P17", "教程/解说", "/explainer/", "步骤、录屏、图示、口播"),
        ("P18", "旅拍/空间", "/travel/", "路线、地标、空间、天气"),
    ]),
    ("工具与模型", [
        ("P19", "工具全景", "/tools/", "21 个工具，按目标抽 3 个"),
        ("P20", "模型矩阵", "/models/", "13 视频 + 6 图像，按镜头选"),
        ("P21", "ComfyUI", "/tools/comfyui/", "安装顺序、5 秒跑通、何时停"),
        ("P22", "MiniMax H3", "/models/h3/", "原生音频、9 参考、2K 云线"),
        ("P23", "Seedance/Kling", "/models/seedance-kling/", "30 秒、动作、4K 怎么选"),
        ("P24", "Wan/LTX 本地", "/models/wan-ltx/", "8/16/24GB 能跑什么、4K 代价"),
        ("P25", "AI 自动剪辑", "/tools/auto-edit/", "能省粗活，不能替导演"),
    ]),
    ("排障交付", [
        ("P26", "修复症状库", "/fix/", "手、脸、闪烁、文字、音画不同步"),
        ("P27", "导出与 QC", "/deliver/export/", "平台规格、编码、12 项验收"),
        ("P28", "项目管理", "/workflow/", "文件夹、命名、版本、3-2-1 备份"),
    ]),
    ("实验室", [
        ("P29", "AI 实验室", "/lab/", "3 条 Demo 时间轴、逐镜播放、10 秒选工具"),
    ]),
]

EN_CATALOG = [
    ("Start", [
        ("EN01", "Home", "/en/", "Five entries, three routes, fourteen English pages"),
        ("EN02", "Starter route", "/en/start/route/", "Four questions; pick one deliverable"),
        ("EN03", "Hardware & budget", "/en/start/budget/", "Cloud/local/hybrid; usable-second cost"),
    ]),
    ("Drama", [("EN04", "90s drama", "/en/drama/", "16 shots, 2 characters, six stages")]),
    ("Short-form", [
        ("EN12", "First 15s", "/en/short/15s/", "One hook, one demo, one payoff"),
        ("EN30", "Short-form hub", "/en/short/", "15s, product and talking-head recipes"),
    ]),
    ("Tools & models", [
        ("EN19", "Tool hub", "/en/tools/", "21 tools; build a three-tool stack"),
        ("EN20", "Model matrix", "/en/models/", "13 video + 6 image; pick by shot"),
        ("EN21", "ComfyUI", "/en/tools/comfyui/", "Install order, first 5s, stop rules"),
        ("EN22", "MiniMax H3", "/en/models/h3/", "Native audio, 9 refs, 2K cloud"),
        ("EN23", "Seedance / Kling", "/en/models/seedance-kling/", "30s, action, 4K"),
    ]),
    ("Fix & deliver", [
        ("EN31", "Fix desk", "/en/fix/", "Hands, faces, flicker, text, sync"),
        ("EN27", "Export & QC", "/en/deliver/export/", "Platform specs, encoding, 12 checks"),
    ]),
    ("Lab", [("EN29", "Demo lab", "/en/lab/", "Three recipes, shot strip, tool picker")]),
]


def home_zh(pages, cards):
    stats = f'''<div class="ai6-stat-grid">
<div class="ai6-stat"><span>中文页</span><b>29 页</b></div>
<div class="ai6-stat"><span>英文页</span><b>14 页</b></div>
<div class="ai6-stat"><span>工具 / 模型卡</span><b>21 / 19</b></div>
<div class="ai6-stat"><span>装饰图</span><b>0 张</b></div>
</div>'''
    entries = f'''<div class="ai6-home-grid">
<a class="ai6-home-card" href="/start/route/"><span>01 开始</span><b>先选路线，不要先选模型</b><p>四个问题、三条路线、7 天计划。10 分钟内知道自己这周做什么、不做什么。</p><em>进入开始 →</em></a>
<a class="ai6-home-card" href="/drama/"><span>02 短剧</span><b>90 秒、16 镜头、2 个角色</b><p>从剧本、分镜、锁脸、镜头、配音到剪辑，一条能交付的短剧生产线。</p><em>进入短剧 →</em></a>
<a class="ai6-home-card" href="/short/"><span>03 短视频</span><b>15 秒讲清一个卖点</b><p>产品、口播、第一条 15 秒；一个钩子、一个演示、一个落点。</p><em>进入短视频 →</em></a>
<a class="ai6-home-card" href="/tools/"><span>04 工具与模型</span><b>21 个工具，只留 3 个</b><p>ComfyUI、H3、Seedance、Kling、Wan、LTX 的真实边界；按镜头选，不按榜单选。</p><em>进入工具与模型 →</em></a>
<a class="ai6-home-card ai6-home-card-wide" href="/fix/"><span>05 排障交付</span><b>能上传，才算完成</b><p>手/脸/闪烁/文字/音画不同步的处置；导出规格、12 项 QC、项目归档。</p><em>进入排障交付 →</em></a>
<a class="ai6-home-card ai6-home-card-wide" href="/lab/"><span>06 实验室 · 新</span><b>3 条 Demo 时间轴，10 秒选工具</b><p>90 秒短剧、15 秒产品、30 秒口播，逐镜看结构；四个问题给出主选/备用/先别。</p><em>打开 AI 实验室 →</em></a>
</div>'''
    three = f'''<div class="ai6-cards ai6-cards-3">
<article class="ai6-minicard"><div class="ai6-minicard-top"><b>路线 A：90 秒短剧</b><span>2–5 天</span></div><p>适合：有故事、2 个角色、愿意做 16 个镜头。先做 15 秒 proof，再做 90 秒。预算 ¥150–500/集。</p><div class="ai6-minicard-links"><a href="/drama/">短剧总览 →</a><span>16 镜头</span></div></article>
<article class="ai6-minicard"><div class="ai6-minicard-top"><b>路线 B：15 秒短视频</b><span>2–3 小时</span></div><p>适合：产品、口播、社媒。一个钩子、一个演示、一个落点；3 个镜头就够。预算 ¥0–50。</p><div class="ai6-minicard-links"><a href="/short/15s/">第一条 15 秒 →</a><span>3 镜头</span></div></article>
<article class="ai6-minicard"><div class="ai6-minicard-top"><b>路线 C：品牌/氛围</b><span>1–2 天</span></div><p>适合：MV、旅拍、空间、无对白。先做 5 秒 hero，再做 15 秒 cut；光线和色彩比剧情重要。</p><div class="ai6-minicard-links"><a href="/brand/">品牌/氛围 →</a><span>5s hero</span></div></article>
</div>'''
    catalog = ""
    for group, items in ZH_CATALOG:
        links = "".join(
            f'<a class="ai6-hub-card" href="{href}"><span>{pid}</span><b>{label}</b><small>{note}</small></a>'
            for pid, label, href, note in items
        )
        catalog += f'<h3>{group}</h3><div class="ai6-hub-grid">{links}</div>'
    return f'''<div class="wrap ai6-home">
<header class="article-hero">
<p class="eyebrow">AI 视频工作库 / v6 / 2026-11-25</p>
<h1>把 AI 视频做成能交付的作品，不是一堆演示片</h1>
<p class="article-deck">29 个中文页 + 14 个英文页，按“开始、短剧、短视频、工具与模型、排障交付”组织，外加一个可交互实验室。没有装饰图，没有“最强模型”，只有任务、参数、成本、验收和失败处置。</p>
<div class="ai6-quick"><a href="/start/route/">10 分钟选路线</a><a href="/drama/">做 90 秒短剧</a><a href="/short/15s/">做第一条 15 秒</a><a href="/lab/">Demo 实验室</a><a href="/tools/">只看工具</a><a href="/fix/">我卡住了</a></div>
<div class="article-meta"><span>TVCN AI Desk</span><span>29 页中文 / 14 页英文</span><span>编辑 2026-11-25</span></div>
</header>
{stats}
<section><h2>五个入口 + 实验室</h2><p class="ai6-section-lead">第一次来，先走“开始”；有明确片子，直接进对应片型；先想看一条片子怎么拆，去实验室；只有工具问题，去工具与模型；已经崩了，去排障。</p>{entries}</section>
<section><h2>三条起步路线</h2><p class="ai6-section-lead">不要同时开三条。选一条，做完一条，再开下一条。</p>{three}</section>
<section><h2>全站 29 页</h2><p class="ai6-section-lead">按顺序读，或按问题跳。每一页都有产出、时间、成本、步骤、提示词、验收和排障；实验室是唯一的交互页。</p>{catalog}</section>
<section><h2>本站的取舍</h2>
<div class="ai6-rule"><b>零装饰图</b><p>没有 AI hero、图库实拍、氛围图、流程图、图标插画。没有真实截图就不放图；文字、表格、可复制提示词承担全部信息。</p></div>
<div class="ai6-rule"><b>不写“最强/最好”</b><p>只写“在什么条件下适合”。模型/工具都有失败场景；每张卡标读取日期，价格与可用性以官方页为准。</p></div>
<div class="ai6-rule"><b>先云跑通，再本地</b><p>没有 16GB 显卡不推荐 ComfyUI；没有 24GB 不推荐 H3 本地 2K。云先验证，本地再降本。</p></div>
<div class="ai6-rule"><b>自动剪辑只省粗活</b><p>AI 能转写、粗剪、字幕、拆条；选条、叙事、混音仍然是人。不要把“一键成片”当交付。</p></div>
</section>
</div>'''


def home_en(pages, cards):
    stats = f'''<div class="ai6-stat-grid">
<div class="ai6-stat"><span>Chinese pages</span><b>29</b></div>
<div class="ai6-stat"><span>English pages</span><b>14</b></div>
<div class="ai6-stat"><span>Tool / model cards</span><b>21 / 19</b></div>
<div class="ai6-stat"><span>Decorative images</span><b>0</b></div>
</div>'''
    entries = f'''<div class="ai6-home-grid">
<a class="ai6-home-card" href="/en/start/route/"><span>01 Start</span><b>Pick a route, not a model</b><p>Four questions, three routes, a seven-day plan. Know what you will ship this week.</p><em>Start here →</em></a>
<a class="ai6-home-card" href="/en/drama/"><span>02 Drama</span><b>90 seconds, 16 shots, 2 characters</b><p>Script, storyboard, character consistency, shots, voice and edit in one pipeline.</p><em>Open drama →</em></a>
<a class="ai6-home-card" href="/en/short/15s/"><span>03 Short-form</span><b>One selling point in 15 seconds</b><p>A hook, a demo, a payoff. Three shots are enough.</p><em>Make the first 15s →</em></a>
<a class="ai6-home-card" href="/en/tools/"><span>04 Tools &amp; models</span><b>21 tools, keep three</b><p>ComfyUI, H3, Seedance, Kling, Wan, LTX: what each is bad at, and which shot it fits.</p><em>Compare tools →</em></a>
<a class="ai6-home-card ai6-home-card-wide" href="/en/deliver/export/"><span>05 Deliver</span><b>Uploadable is finished</b><p>Platform specs, encoding, 12 QC checks, naming and archive.</p><em>Export &amp; QC →</em></a>
<a class="ai6-home-card ai6-home-card-wide" href="/en/lab/"><span>06 Lab · New</span><b>Three demo timelines, a 10-second tool picker</b><p>90s drama, 15s product, 30s talking head. See the structure shot by shot; four questions return main/backup/avoid.</p><em>Open the lab →</em></a>
</div>'''
    three = f'''<div class="ai6-cards ai6-cards-3">
<article class="ai6-minicard"><div class="ai6-minicard-top"><b>Route A: 90s drama</b><span>2–5 days</span></div><p>For a story with two characters and 16 shots. Make a 15s proof first. Budget ¥150–500 per episode.</p><div class="ai6-minicard-links"><a href="/en/drama/">Drama hub →</a><span>16 shots</span></div></article>
<article class="ai6-minicard"><div class="ai6-minicard-top"><b>Route B: 15s short</b><span>2–3 hours</span></div><p>For a product, a talking head, or social. One hook, one demo, one payoff. Budget ¥0–50.</p><div class="ai6-minicard-links"><a href="/en/short/15s/">First 15s →</a><span>3 shots</span></div></article>
<article class="ai6-minicard"><div class="ai6-minicard-top"><b>Route C: brand / mood</b><span>1–2 days</span></div><p>For MV, travel, space, no dialogue. A 5s hero shot first, then a 15s cut. Light and color carry it.</p><div class="ai6-minicard-links"><a href="/brand/">Brand / mood →</a><span>5s hero</span></div></article>
</div>'''
    catalog = ""
    for group, items in EN_CATALOG:
        links = "".join(
            f'<a class="ai6-hub-card" href="{href}"><span>{pid}</span><b>{label}</b><small>{note}</small></a>'
            for pid, label, href, note in items
        )
        catalog += f'<h3>{group}</h3><div class="ai6-hub-grid">{links}</div>'
    return f'''<div class="wrap ai6-home">
<header class="article-hero">
<p class="eyebrow">AI Video Field Guide / v6 / 2026-11-25</p>
<h1>Make AI video you can actually deliver</h1>
<p class="article-deck">Fourteen English pages backed by 29 Chinese pages: start, drama, short-form, tools and models, fix and deliver, plus an interactive lab. No decorative images, no "best model", only tasks, settings, cost, QC and failure handling.</p>
<div class="ai6-quick"><a href="/en/start/route/">Pick a route</a><a href="/en/drama/">Make a 90s drama</a><a href="/en/short/15s/">First 15s</a><a href="/en/lab/">Demo lab</a><a href="/en/tools/">Tools</a><a href="/en/models/">Models</a></div>
<div class="article-meta"><span>TVCN AI Desk</span><span>14 English pages</span><span>Edited 2026-11-25</span></div>
</header>
{stats}
<section><h2>Five entries + lab</h2><p class="ai6-section-lead">First visit: start with the route. A specific film: open the format. Want to see how a film is structured: open the lab. A tool question: tools and models. Already broken: fix.</p>{entries}</section>
<section><h2>Three starter routes</h2><p class="ai6-section-lead">Do not run all three. Pick one, ship one, then open the next.</p>{three}</section>
<section><h2>English pages</h2><p class="ai6-section-lead">Each page has output, time, cost, steps, copy-ready prompts, checks and troubleshooting. The full detail lives in the Chinese pages.</p>{catalog}</section>
<section><h2>Editorial rules</h2>
<div class="ai6-rule"><b>Zero decorative images</b><p>No AI hero, stock photo, mood image, flowchart or icon illustration. If there is no real screenshot, there is no image. Text, tables and copyable prompts carry the information.</p></div>
<div class="ai6-rule"><b>No "strongest/best"</b><p>Only "best under these conditions". Every model and tool has a failure case. Cards carry a read date; prices and access follow the official page.</p></div>
<div class="ai6-rule"><b>Cloud first, local later</b><p>No 16GB GPU, no ComfyUI recommendation. No 24GB, no local H3 2K. Validate in the cloud, then cut cost locally.</p></div>
<div class="ai6-rule"><b>Auto-edit saves chores, not directing</b><p>AI can transcribe, rough-cut, caption and repurpose. Selecting a performance, building narrative and mixing remain human.</p></div>
</section>
</div>'''


