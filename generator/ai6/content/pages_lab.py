# -*- coding: utf-8 -*-
"""P29/P30: interactive lab page (zh/en).

The lab is deliberately honest: no fake model footage. It provides three
production recipes with a timed shot strip, and a four-question tool picker.
"""
from schema import esc

DATE_LABEL = "2026-11-25"


def fmt_time(seconds):
    return f"{seconds // 60:02d}:{seconds % 60:02d}"


RECIPES_ZH = [
    {
        "id": "drama", "label": "90 秒短剧", "total": 90, "beats_label": "8 beats / 16 镜头",
        "meta": [("产出", "16 镜 Shot List + 90 秒 MP4 + SRT"), ("时间", "2–5 天"), ("预算", "¥150–500 / 集")],
        "beats": [
            ("00:00–00:08", "收到语音", "近景 / 手机屏幕", "手机占画面 1/3，拇指悬在播放键上，不点开。", "H3 / Seedance", "环境声 + 提示音", "手机屏幕占画面 1/3；拇指悬停，不点开；固定机位。"),
            ("00:08–00:18", "第一次回拨", "中景 / 手", "手指按下回拨，镜头切到门外走廊。", "Kling 4.0 / Seedance", "低频心跳", "手指按下回拨；切门外走廊；中景。"),
            ("00:18–00:30", "门外有人", "全景 / 门", "门开一条缝，走廊灯闪一下，不露脸。", "Kling 4.0", "门锁 + 脚步", "门开一条缝；走廊灯闪；不露脸。"),
            ("00:30–00:42", "反转", "近景 / 脸", "她听见自己的声音，但台词来自未来。", "H3", "语音重叠", "近景脸；她说自己的台词，但内容来自未来。"),
            ("00:42–00:54", "代价", "特写 / 时钟", "每次回拨，时钟少 10 分钟；只拍钟面和手。", "H3", "滴答声", "钟面和手；时间少 10 分钟；特写。"),
            ("00:54–01:08", "决定", "中景 / 走廊", "她走向门口，镜头跟背，不拍正脸。", "Kling 4.0", "脚步 + 呼吸", "跟背走向门；不拍正脸。"),
            ("01:08–01:20", "高潮", "双人近景", "两个声音同时说话，画面只给一个脸。", "Seedance 2.5", "双轨对白", "一个脸；两个声音同时说话；近景。"),
            ("01:20–01:30", "收尾", "特写 / 黑屏", "手机黑屏，门外安静；留 2 秒黑场。", "H3", "静音 2 秒", "手机黑屏；门外安静；2 秒黑场。"),
        ],
    },
    {
        "id": "product", "label": "15 秒产品", "total": 15, "beats_label": "3 beats / 3 镜头",
        "meta": [("产出", "3 镜产品片 + 封面 + 字幕"), ("时间", "2–3 小时"), ("预算", "¥20–80")],
        "beats": [
            ("00:00–00:03", "标签微距", "微距 / 标签", "标签占画面 1/2，手指入画，停 0.5 秒。", "H3 / Seedance", "无音乐，保留环境声", "标签占画面 1/2；手入画；微距。"),
            ("00:03–00:08", "手入画", "中景 / 使用", "一个动作：拿起、旋开、倒出；只拍一个卖点。", "Seedance 2.5", "布料/瓶身摩擦声", "拿起、旋开、倒出；一个动作；中景。"),
            ("00:08–00:15", "结果", "近景 / 结果", "结果放在干净背景，右侧留字幕安全区。", "H3", "一句 VO + 轻音乐", "结果干净背景；右侧留字幕区。"),
        ],
    },
    {
        "id": "talking", "label": "30 秒口播", "total": 30, "beats_label": "3 beats / 3 镜头",
        "meta": [("产出", "30 秒口播 + SRT + 封面"), ("时间", "1–2 小时"), ("预算", "¥10–50")],
        "beats": [
            ("00:00–00:05", "钩子", "近景 / 正面", "第一句只讲结果，不讲自我介绍。", "HeyGen / Hedra", "VO 先入", "正面近景；第一句讲结果；不看稿。"),
            ("00:05–00:20", "证明", "中景 / 演示", "一个可验证的动作或屏幕结果，别切 5 个角度。", "Hedra / H3", "VO + 环境声", "演示一个可验证动作或屏幕结果。"),
            ("00:20–00:30", "收尾", "近景 / CTA", "一句行动指令；留字幕位，不加 logo 动画。", "HeyGen", "VO 落点", "一句 CTA；留字幕位；不加 logo 动画。"),
        ],
    },
]

RECIPES_EN = [
    {
        "id": "drama", "label": "90s drama", "total": 90, "beats_label": "8 beats / 16 shots",
        "meta": [("Output", "16-shot list + 90s MP4 + SRT"), ("Time", "2–5 days"), ("Budget", "¥150–500 / episode")],
        "beats": [
            ("00:00–00:08", "The voice note", "Close / phone screen", "Phone fills one third of the frame; thumb hovers, does not play.", "H3 / Seedance", "Room tone + notification", "Phone fills 1/3; thumb hovers; do not play; locked-off."),
            ("00:08–00:18", "First callback", "Medium / hand", "Thumb hits callback; cut to the hallway outside.", "Kling 4.0 / Seedance", "Low heartbeat", "Thumb hits callback; cut to hallway; medium."),
            ("00:18–00:30", "Someone outside", "Wide / door", "Door opens a crack; hall light flickers; no face.", "Kling 4.0", "Lock + footsteps", "Door ajar; hall light flickers; no face."),
            ("00:30–00:42", "Turn", "Close / face", "She hears her own voice, but the line is from the future.", "H3", "Overlapping voice", "Close face; her own line, but from the future."),
            ("00:42–00:54", "The cost", "Insert / clock", "Each callback costs ten minutes; only clock and hand.", "H3", "Ticking", "Clock and hand; ten minutes gone; insert."),
            ("00:54–01:08", "The decision", "Medium / hallway", "She walks to the door; follow her back, no face.", "Kling 4.0", "Steps + breath", "Follow her back to the door; no face."),
            ("01:08–01:20", "Climax", "Two-shot close", "Two voices speak at once; only one face on screen.", "Seedance 2.5", "Dual dialogue", "One face; two voices at once; close."),
            ("01:20–01:30", "Out", "Close / black", "Phone goes black; silence outside; hold two seconds.", "H3", "Two seconds of silence", "Phone black; silence; two-second black hold."),
        ],
    },
    {
        "id": "product", "label": "15s product", "total": 15, "beats_label": "3 beats / 3 shots",
        "meta": [("Output", "3-shot product film + cover + SRT"), ("Time", "2–3 hours"), ("Budget", "¥20–80")],
        "beats": [
            ("00:00–00:03", "Label macro", "Macro / label", "Label fills half the frame; hand enters; hold 0.5s.", "H3 / Seedance", "No music; keep room tone", "Label fills 1/2; hand enters; macro."),
            ("00:03–00:08", "Hand in frame", "Medium / use", "One action: lift, open, pour; one selling point only.", "Seedance 2.5", "Fabric / bottle foley", "Lift, open, pour; one action; medium."),
            ("00:08–00:15", "Payoff", "Close / result", "Result on a clean background; leave caption safe area.", "H3", "One VO line + light music", "Result on clean background; caption safe area right."),
        ],
    },
    {
        "id": "talking", "label": "30s talking head", "total": 30, "beats_label": "3 beats / 3 shots",
        "meta": [("Output", "30s talking head + SRT + cover"), ("Time", "1–2 hours"), ("Budget", "¥10–50")],
        "beats": [
            ("00:00–00:05", "Hook", "Close / front", "First line is the result, not an introduction.", "HeyGen / Hedra", "VO first", "Front close; first line is the result; no reading."),
            ("00:05–00:20", "Proof", "Medium / demo", "One verifiable action or screen result; do not cut five angles.", "Hedra / H3", "VO + room tone", "One verifiable action or screen result."),
            ("00:20–00:30", "Close", "Close / CTA", "One action line; leave caption space; no logo animation.", "HeyGen", "VO lands", "One CTA; caption space; no logo animation."),
        ],
    },
]


def render_recipes(recipes, lang):
    tabs = []
    panels = []
    for i, r in enumerate(recipes):
        active = " is-active" if i == 0 else ""
        tabs.append(
            f'<button class="ai6-lab-tab{active}" type="button" role="tab" data-lab-tab="{r["id"]}" '
            f'aria-selected="{str(i == 0).lower()}">{esc(r["label"])}</button>'
        )
        meta = "".join(f'<div><span>{esc(k)}</span><b>{esc(v)}</b></div>' for k, v in r["meta"])
        beats = []
        for n, b in enumerate(r["beats"], 1):
            beats.append(
                '<article class="ai6-lab-beat" data-duration="%d">'
                '<div class="ai6-lab-beat-top"><span>%s</span><b>%02d %s</b><em>%s</em></div>'
                '<p>%s</p><div class="ai6-lab-beat-meta"><span>%s：%s</span><span>%s：%s</span></div>'
                '<div class="ai6-lab-beat-prompt"><b>%s</b> %s</div></article>'
                % (
                    _duration(b[0]),
                    esc(b[0]), n, esc(b[1]), esc(b[2]),
                    esc(b[3]), "Model" if lang == "en" else "模型", esc(b[4]),
                    "Sound" if lang == "en" else "声音", esc(b[5]),
                    "Prompt core" if lang == "en" else "提示词核心", esc(b[6]),
                )
            )
        panels.append(
            f'<div class="ai6-lab-panel" data-lab-panel="{r["id"]}" data-total="{r["total"]}"{"" if i == 0 else " hidden"}>'
            f'<div class="ai6-lab-meta">{meta}</div>'
            f'<div class="ai6-lab-beats">{ "".join(beats) }</div></div>'
        )
    tabs_html = '<div class="ai6-lab-tabs" role="tablist" aria-label="Demo recipes">' + "".join(tabs) + "</div>"
    player = (
        '<div class="ai6-lab-player"><button class="ai6-lab-play" type="button" data-lab-play>'
        + ("Play shot strip" if lang == "en" else "逐镜播放")
        + '</button><span class="ai6-lab-clock" data-lab-clock>'
        + f'{fmt_time(recipes[0]["total"])} / {fmt_time(recipes[0]["total"])}'
        + '</span><span class="ai6-lab-total">'
        + ("timeline demo · not video playback" if lang == "en" else "时间轴演示 · 不是视频播放")
        + '</span></div>'
    )
    return tabs_html + player + "".join(panels)


def _duration(time_range):
    start, end = time_range.split("–")
    def sec(v):
        m, s = v.split(":")
        return int(m) * 60 + int(s)
    return max(1, sec(end) - sec(start))


PICKER_ZH = '''<div class="ai6-lab-picker">
<label class="ai6-lab-field"><span>要做什么</span><select id="lab-task"><option value="drama">90 秒短剧</option><option value="short">15 秒短视频</option><option value="product">产品视频</option><option value="talking">口播 / 数字人</option><option value="brand">品牌 / 氛围</option></select></label>
<label class="ai6-lab-field"><span>手上有什么</span><select id="lab-hw"><option value="none">没有独显 / 只用云</option><option value="16">16GB 显卡</option><option value="24">24GB 以上</option></select></label>
<label class="ai6-lab-field"><span>每月预算</span><select id="lab-budget"><option value="low">¥0–100</option><option value="mid">¥100–500</option><option value="high">¥500 以上</option></select></label>
<label class="ai6-lab-field"><span>优先什么</span><select id="lab-priority"><option value="speed">出片速度</option><option value="control">可控 / 本地</option><option value="audio">原生音频</option></select></label>
</div>
<div id="lab-result" class="ai6-lab-result" aria-live="polite"></div>
<p class="ai6-footer-note">只给方向，不是排行榜；价格、额度和可用性以官方页为准。</p>'''

PICKER_EN = '''<div class="ai6-lab-picker">
<label class="ai6-lab-field"><span>Deliverable</span><select id="lab-task"><option value="drama">90s drama</option><option value="short">15s short</option><option value="product">Product film</option><option value="talking">Talking head</option><option value="brand">Brand / mood</option></select></label>
<label class="ai6-lab-field"><span>Hardware</span><select id="lab-hw"><option value="none">No GPU / cloud only</option><option value="16">16GB GPU</option><option value="24">24GB or more</option></select></label>
<label class="ai6-lab-field"><span>Monthly budget</span><select id="lab-budget"><option value="low">¥0–100</option><option value="mid">¥100–500</option><option value="high">¥500+</option></select></label>
<label class="ai6-lab-field"><span>Priority</span><select id="lab-priority"><option value="speed">Speed</option><option value="control">Control / local</option><option value="audio">Native audio</option></select></label>
</div>
<div id="lab-result" class="ai6-lab-result" aria-live="polite"></div>
<p class="ai6-footer-note">Directions, not a leaderboard. Prices, quotas and access follow the official pages.</p>'''


LAB_JS = r'''<script>
(function(){
  var en = document.documentElement.lang.indexOf('en') === 0;
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-lab-tab]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-lab-panel]'));
  var play = document.querySelector('[data-lab-play]');
  var clock = document.querySelector('[data-lab-clock]');
  var timer = null;
  function fmt(n){ n = Math.max(0, Math.floor(n)); var m = Math.floor(n/60), s = n%60; return (m<10?'0':'')+m+':'+(s<10?'0':'')+s; }
  function activePanel(){ for(var i=0;i<panels.length;i++){ if(!panels[i].hidden) return panels[i]; } return panels[0]; }
  function stop(reset){
    if(timer){ clearInterval(timer); timer=null; }
    if(play) play.textContent = en ? 'Play shot strip' : '逐镜播放';
    if(reset){ var p=activePanel(); if(p){ var b=p.querySelectorAll('.ai6-lab-beat'); for(var i=0;i<b.length;i++) b[i].classList.remove('is-active'); if(clock) clock.textContent=fmt(+p.dataset.total)+' / '+fmt(+p.dataset.total); } }
  }
  function setTab(id){
    stop(true);
    tabs.forEach(function(t){ var on=t.dataset.labTab===id; t.classList.toggle('is-active',on); t.setAttribute('aria-selected',on?'true':'false'); });
    panels.forEach(function(p){ p.hidden = p.dataset.labPanel!==id; });
    var p=activePanel(); if(p&&clock) clock.textContent=fmt(+p.dataset.total)+' / '+fmt(+p.dataset.total);
  }
  if(play) play.addEventListener('click',function(){
    if(timer){ stop(false); return; }
    var p=activePanel(); if(!p) return;
    var total=+p.dataset.total, elapsed=0, beats=Array.prototype.slice.call(p.querySelectorAll('.ai6-lab-beat'));
    stop(true); play.textContent = en ? 'Stop' : '停止';
    timer=setInterval(function(){
      elapsed += 2;
      if(clock) clock.textContent = fmt(Math.min(elapsed,total))+' / '+fmt(total);
      var acc=0, current=null;
      beats.forEach(function(b){ acc += +b.dataset.duration; if(elapsed<=acc) current=b; });
      beats.forEach(function(b){ b.classList.toggle('is-active', b===current); });
      if(elapsed>=total){ stop(false); }
    },500);
  });
  tabs.forEach(function(t){ t.addEventListener('click',function(){ setTab(t.dataset.labTab); }); });

  var DATA = {
    zh: {
      tasks: {
        drama:{main:'小云雀 + Seedance/H3', backup:'Kling 4.0：动作/多人镜头', avoid:'一个模型硬扛 16 镜头', link:'/drama/shots/', label:'先跑 3 个镜头，每个 3 条'},
        short:{main:'即梦 + 剪映', backup:'CapCut + Seedance', avoid:'10 个镜头堆满 15 秒', link:'/short/15s/', label:'先跑 3 个 5 秒镜头'},
        product:{main:'H3 / Seedance + 剪映', backup:'Seedream 5.5 + Kling', avoid:'让模型生成标签文字', link:'/short/product/', label:'先拍标签和手，再生成'},
        talking:{main:'HeyGen / Hedra + ElevenLabs', backup:'H3 原生音频 + 剪映', avoid:'侧脸/遮挡嘴的数字人', link:'/short/talking-head/', label:'先跑 10 秒正面一句'},
        brand:{main:'Runway / Veo / LTX + DaVinci', backup:'Kling 4.0 + 剪映', avoid:'15 秒素材硬拖 60 秒', link:'/brand/', label:'先跑 5 秒 hero'}
      },
      hw:{none:'只用云，不装 ComfyUI', '16':'云主 + ComfyUI Wan 2.2 5B 备选', '24':'ComfyUI Wan 14B / H3 768p 可做本地草稿'},
      budget:{low:'720p 草稿，终版再 1080p', mid:'1080p 终版，4K 只做单片', high:'可跑 4K/30 秒，但先做 5 秒测试'},
      priority:{speed:'先用一个云工具跑通，不排队等本地', control:'能本地就本地：ComfyUI/Wan，先跑 5 秒', audio:'优先带原生音频的 H3/Seedance'},
      labels:{main:'主选', backup:'备用', avoid:'先别', test:'第一试验', link:'按这个方案做'}
    },
    en: {
      tasks: {
        drama:{main:'Xiaoyunque + Seedance/H3', backup:'Kling 4.0 for action/multi-person', avoid:'One model carrying 16 shots', link:'/en/drama/', label:'Run 3 shots, 3 takes each'},
        short:{main:'Jimeng + Jianying', backup:'CapCut + Seedance', avoid:'Ten shots stuffed into 15s', link:'/en/short/15s/', label:'Run 3 five-second shots'},
        product:{main:'H3 / Seedance + Jianying', backup:'Seedream 5.5 + Kling', avoid:'Asking the model to render label text', link:'/en/short/15s/', label:'Shoot label and hand first'},
        talking:{main:'HeyGen / Hedra + ElevenLabs', backup:'H3 native audio + Jianying', avoid:'A side-face avatar with a covered mouth', link:'/en/start/route/', label:'Run 10s front-facing line'},
        brand:{main:'Runway / Veo / LTX + DaVinci', backup:'Kling 4.0 + Jianying', avoid:'Stretching 15s of footage to 60s', link:'/en/tools/', label:'Run a 5s hero first'}
      },
      hw:{none:'Cloud only; do not install ComfyUI', '16':'Cloud first + ComfyUI Wan 2.2 5B as backup', '24':'ComfyUI Wan 14B / H3 768p for local drafts'},
      budget:{low:'720p drafts; final at 1080p', mid:'1080p final; 4K for one shot only', high:'4K/30s is possible; test 5s first'},
      priority:{speed:'Use one cloud tool first; do not wait on local', control:'Local if possible: ComfyUI/Wan; test 5s first', audio:'Prefer H3/Seedance with native audio'},
      labels:{main:'Main', backup:'Backup', avoid:'Avoid', test:'First test', link:'Build this stack'}
    }
  };
  var L = en ? DATA.en : DATA.zh;
  function pick(){
    var task=document.getElementById('lab-task'), hw=document.getElementById('lab-hw');
    var budget=document.getElementById('lab-budget'), priority=document.getElementById('lab-priority');
    if(!task||!hw||!budget||!priority) return;
    var t=L.tasks[task.value]||L.tasks.drama, sep=en?'; ':'；';
    var main=t.main+sep+L.priority[priority.value], backup=t.backup+sep+L.hw[hw.value], avoid=t.avoid+sep+L.budget[budget.value];
    var out=document.getElementById('lab-result');
    if(!out) return;
    out.innerHTML='<div class="ai6-cards ai6-cards-3">'
      +'<article class="ai6-minicard"><div class="ai6-minicard-top"><b>'+L.labels.main+'</b><span>'+t.main+'</span></div><p>'+main+'</p><div class="ai6-minicard-links"><a href="'+t.link+'">'+L.labels.link+' →</a><span>'+L.labels.test+'</span></div></article>'
      +'<article class="ai6-minicard"><div class="ai6-minicard-top"><b>'+L.labels.backup+'</b><span>'+L.labels.test+'</span></div><p>'+backup+'</p><div class="ai6-minicard-links"><span>'+t.label+'</span></div></article>'
      +'<article class="ai6-minicard"><div class="ai6-minicard-top"><b>'+L.labels.avoid+'</b><span>'+L.labels.test+'</span></div><p>'+avoid+'</p><div class="ai6-minicard-links"><a href="/tools/">Tools →</a></div></article>'
      +'</div>';
  }
  ['lab-task','lab-hw','lab-budget','lab-priority'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('change',pick); });
  pick();
})();
</script>'''


def page_zh():
    tabs = render_recipes(RECIPES_ZH, "zh")
    return {
        "id": "P29", "path": "/lab/", "section": "工具与模型", "section_key": "knowledge", "section_href": "/tools/",
        "type": "交互实验室", "title": "AI 实验室：3 条 Demo 配方 + 10 秒选工具", "short_title": "AI 实验室",
        "deck": "Demo 不是一支假成片，而是一张能照着跑的镜头表。这里把短剧、产品、口播拆成时间轴，再用四个问题给出工具组合。没有真实素材，就不放装饰图。",
        "goal": "先看懂一条片子怎么拆，再用自己的硬件和预算选出 3 个工具。",
        "output": "1 张所选配方的时间轴 + 1 组 3 工具组合 + 1 条第一试验记录。",
        "time": "10–40 分钟", "cost": "¥0", "level": "入门",
        "not_fit": "想要“一键生成成片”的人；这里给配方、顺序和验收，不代替实际生成。",
        "prereq": [
            "先读 `/start/route/`，或已经有一个明确的交付物。",
            "知道自己的显卡/云额度/每月预算；不知道就按最低档选。",
            "准备一张记录表：模型、时长、分辨率、耗时、花费、失败类型。",
        ],
        "tool_ids": [], "model_ids": [],
        "sections": [
            {"h": "三条 Demo：先看结构，不先看效果", "p": [
                "这不是模型实拍，也不是渲染图。它是三条可以直接照着跑的镜头配方：时间、景别、动作、模型、声音、提示词核心都在一条时间轴上。",
                "点“逐镜播放”只会走时间轴和镜头卡，不播放视频；它的用途是检查节奏，不是证明某个模型能力。",
            ], "html": tabs},
            {"h": "10 秒选工具：四个问题，三张卡", "p": [
                "先选交付物，再看硬件和预算，最后选优先级。结果不是“最强”，而是“在这个条件下先跑什么、备用什么、先别碰什么”。",
                "每次只改一个变量；先用 5 秒、720p、同题 3 条跑通，再谈 1080p/4K 和 30 秒。",
            ], "html": PICKER_ZH + LAB_JS},
        ],
        "steps": [
            "选一条配方：短剧、产品或口播。",
            "把时间轴里的 3–8 个 beat 抄进 Shot List，不改时长。",
            "用四个问题选出主选/备用/先别三张卡。",
            "只跑第一试验：5 秒、720p、同题 3 条。",
            "记录脸、手、文字、音画、耗时和花费。",
            "按失败类型改一个变量，再决定是否升 1080p。",
        ],
        "prompts": [
            {"label": "实验室统一测试提示词", "text": "主体：____（一个角色/一个产品）。\n动作：____（只做一个动作，5 秒内完成）。\n镜头：固定机位，中近景，主体占画面 1/2。\n光：窗光从右，柔光，背景干净。\n声音：只保留环境声，不加音乐。\n输出：5 秒，9:16，720p；同题 3 条。\n负面：换脸、多手、文字乱码、镜头抖动、背景突变。"},
        ],
        "checks": [
            "能说出三条配方各自的 beat 数和总时长。",
            "知道时间轴演示不是视频播放，不把配方当模型实拍。",
            "选出的工具组合有主选、备用、先别，不是一张排行榜。",
            "第一试验固定 5 秒/720p/3 条，没有一上来跑 4K。",
            "记录表包含脸、手、文字、音画、耗时、花费六项。",
        ],
        "faults": [
            ("Demo 看爽了，自己跑不出来", "只看了效果，没拆结构", "抄时间轴和提示词", "先跑 5 秒"),
            ("选工具选回排行榜", "没有先定交付物", "按四问重选", "只留 3 个"),
            ("第一试验就烧钱", "直接 1080/4K/30 秒", "720p/5 秒/3 条", "记录后再升级"),
            ("数字人口型不对", "侧脸/遮挡/长句", "正面近景/短句", "换真人或 H3"),
        ],
        "cost_rows": [
            ["实验室本身", "¥0", "不需要账号"],
            ["第一条 5 秒测试", "¥0–20", "云模型按秒计费"],
            ["三条配方全跑", "¥50–200", "不含人工剪辑"],
        ],
        "downloads": [("Demo 配方包.md", "/assets/templates/lab-demo-pack.md", "三条时间轴 + 四问 + 记录表")],
        "next": "按选出的方案去 `/drama/shots/`、`/short/15s/` 或 `/tools/`；先跑第一条 5 秒。",
        "related": [("工具全景", "/tools/"), ("模型矩阵", "/models/"), ("镜头生成", "/drama/shots/"), ("第一条 15 秒", "/short/15s/")],
        "sources": [
            ("MiniMax H3 计费", "https://platform.minimaxi.com/docs/guides/pricing-paygo"),
            ("Seedance 2.5", "https://www.seedance.tv/zh/seedance-2-5"),
            ("Kling 4.0 Guide", "https://kling.ai/quickstart/kling-4-model-user-guide"),
        ],
        "en_path": "/en/lab/",
    }


def page_en():
    tabs = render_recipes(RECIPES_EN, "en")
    return {
        "id": "EN29", "path": "/lab/", "section": "Tools & models", "section_key": "knowledge", "section_href": "/en/tools/",
        "type": "Interactive lab", "title": "AI lab: three demo recipes + a 10-second tool picker", "short_title": "AI lab",
        "deck": "A demo is not a fake finished film. It is a shot sheet you can actually run. Three recipes are broken into timed beats; four questions return a tool stack. No real footage, no decorative images.",
        "goal": "See how a film is structured, then pick three tools for your hardware and budget.",
        "output": "One recipe timeline + one three-tool stack + one first-test record.",
        "time": "10–40 minutes", "cost": "¥0", "level": "Beginner",
        "not_fit": "You want one-click finished video. This gives recipes, order and checks, not generation.",
        "prereq": [
            "Read `/en/start/route/`, or already have a defined deliverable.",
            "Know your GPU / cloud credit / monthly budget; if not, pick the lowest tier.",
            "Prepare a log: model, length, resolution, time, cost, failure type.",
        ],
        "tool_ids": [], "model_ids": [],
        "sections": [
            {"h": "Three demos: structure first, not the highlight reel", "p": [
                "This is not model footage and not a rendered still. It is three shot recipes you can run: time, shot size, action, model, sound and prompt core on one timeline.",
                "“Play shot strip” only walks the timeline and highlights cards. It does not play video; it is for pacing, not proof of model quality.",
            ], "html": tabs},
            {"h": "10-second tool picker: four questions, three cards", "p": [
                "Pick the deliverable, then hardware and budget, then priority. The result is not “the best”; it is what to run first, what to keep as backup, and what to avoid under these conditions.",
                "Change one variable at a time. Run 5s, 720p, three takes on the same prompt before 1080p/4K or 30s.",
            ], "html": PICKER_EN + LAB_JS},
        ],
        "steps": [
            "Pick one recipe: drama, product or talking head.",
            "Copy its three to eight beats into a shot list without changing durations.",
            "Run the four questions; get main / backup / avoid cards.",
            "Run only the first test: 5s, 720p, three takes.",
            "Log face, hands, text, audio sync, time and cost.",
            "Change one variable per failure; then decide on 1080p.",
        ],
        "prompts": [
            {"label": "Lab control prompt", "text": "Subject: ____ (one character / one product).\nAction: ____ (one action completed in 5s).\nCamera: locked-off medium close; subject fills half the frame.\nLight: soft window light from camera right; clean background.\nSound: room tone only; no music.\nOutput: 5s, 9:16, 720p; three takes on the same prompt.\nNegative: face swap, extra hands, garbled text, camera shake, background jump."},
        ],
        "checks": [
            "Can name the beat count and total duration of each recipe.",
            "Knows the timeline is not video playback, and the recipe is not model footage.",
            "The tool result has main, backup and avoid, not a leaderboard.",
            "First test is fixed at 5s/720p/3 takes; no 4K first.",
            "The log includes face, hands, text, audio sync, time and cost.",
        ],
        "faults": [
            ("Demo looks easy; my run fails", "Watched output, not structure", "Copy timeline and prompt", "Run 5s first"),
            ("Back to a leaderboard", "Deliverable not fixed", "Answer the four questions", "Keep three tools"),
            ("First test burns budget", "Straight to 1080/4K/30s", "720p/5s/3 takes", "Log before upgrade"),
            ("Avatar lip sync fails", "Side face / covered mouth / long line", "Front close-up / short line", "Use a human or H3"),
        ],
        "cost_rows": [
            ["The lab", "¥0", "No account needed"],
            ["First 5s test", "¥0–20", "Cloud per-second billing"],
            ["All three recipes", "¥50–200", "Before human edit"],
        ],
        "downloads": [("Demo recipe pack", "/assets/templates/en/lab-demo-pack.md", "Three timelines + four questions + log")],
        "next": "Take the selected stack to `/en/drama/`, `/en/short/15s/` or `/en/tools/`; run the first 5s.",
        "related": [("Tool hub", "/en/tools/"), ("Model matrix", "/en/models/"), ("Drama", "/en/drama/"), ("First 15s", "/en/short/15s/")],
        "sources": [
            ("MiniMax H3 pricing", "https://platform.minimaxi.com/docs/guides/pricing-paygo"),
            ("Seedance 2.5", "https://www.seedance.tv/zh/seedance-2-5"),
            ("Kling 4.0 Guide", "https://kling.ai/quickstart/kling-4-model-user-guide"),
        ],
        "zh_path": "/lab/",
    }


PAGES = [page_zh()]
EN_PAGES = [page_en()]

