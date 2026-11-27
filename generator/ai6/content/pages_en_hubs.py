# -*- coding: utf-8 -*-
"""English hubs added after v6: short-form, fix desk and a budget page."""

PAGES = [
{
    "id": "EN30", "path": "/short/", "section": "Short-form", "section_key": "short", "section_href": "/en/short/",
    "type": "Format hub", "title": "Short-form AI video: 15s, product and talking-head recipes",
    "short_title": "Short-form hub",
    "deck": "Three short formats, three different jobs. Pick one, run three shots, and do not turn a 15-second clip into a ten-shot trailer. Each recipe below is a starting structure, not a model demo.",
    "goal": "Choose one short recipe and produce a three-shot first test.",
    "output": "One 3-shot plan + three 5s tests + one exportable cut.",
    "time": "30–90 minutes", "cost": "¥0–50", "level": "Beginner",
    "not_fit": "You want to compress a 90-second story into 15 seconds. Pick one selling point or one action.",
    "prereq": [
        "One platform and one aspect ratio.",
        "One subject: a product, a face, or a result.",
        "A 5s test budget and a retry cap.",
        "Read `/en/lab/` if you have not seen the three recipe timelines.",
    ],
    "tool_ids": [], "model_ids": [],
    "sections": [
        {"h": "Three recipes, one job each", "p": [
            "A 15s short sells one thing. A product film proves one physical detail. A talking head delivers one claim. If you cannot say the job in one sentence, the edit will not fix it.",
        ], "table": {"head": ["Recipe", "Job", "Shots", "First test"], "rows": [
            ["15s short", "One hook, one demo, one payoff", "3", "5s / 720p / 3 takes"],
            ["Product film", "Label, hand, result", "3", "5s / 720p / 3 takes"],
            ["Talking head", "Hook, proof, CTA", "3", "10s / 720p / 1 take"],
        ]}},
        {"h": "15s short: hook, demo, payoff", "table": {"head": ["Time", "Shot", "Action", "Sound"], "rows": [
            ["0–3s", "Close", "State the result; no logo, no intro", "VO first"],
            ["3–8s", "Medium", "One action that proves the claim", "Foley + VO"],
            ["8–15s", "Close", "Payoff; leave caption safe area", "One closing line"],
        ]}, "p": ["The first three seconds carry the whole clip. If the result is not visible or audible by 3s, rewrite the hook before generating more shots."]},
        {"h": "Product film: label, hand, result", "table": {"head": ["Time", "Shot", "Action", "Sound"], "rows": [
            ["0–3s", "Macro", "Label fills half the frame; hand enters", "Room tone"],
            ["3–8s", "Medium", "Lift, open, pour; one action only", "Product foley"],
            ["8–15s", "Close", "Result on a clean background; caption space right", "One VO line"],
        ]}, "p": ["Do not ask the model to render label text. Shoot the real label or add typography in the edit."]},
        {"h": "Talking head: hook, proof, CTA", "table": {"head": ["Time", "Shot", "Action", "Sound"], "rows": [
            ["0–5s", "Close / front", "First line is the result, not a bio", "VO first"],
            ["5–20s", "Medium", "One verifiable action or screen result", "VO + room tone"],
            ["20–30s", "Close / front", "One CTA; leave caption space", "VO lands"],
        ]}, "p": ["Front light, short sentences, one camera angle. A side-face avatar with a covered mouth is a lip-sync failure waiting to happen."]},
        {"h": "Choose one and run it", "p": [
            "Do not produce all three in one day. Choose the recipe that matches the deliverable; run the first test; log face, hands, text, audio sync, time and cost; then decide whether the format is viable.",
        ]},
    ],
    "steps": [
        "Write the job in one sentence: sell, prove, or explain.",
        "Pick the matching recipe and copy its three shots.",
        "Set 5s / 720p / 3 takes for the first test.",
        "Log face, hands, text, audio sync, time and cost.",
        "Cut the best take to 15s; do not add a fourth shot.",
        "Export with captions and check the first frame.",
    ],
    "prompts": [
        {"label": "15s short control prompt", "text": "Subject: ____ (one product or one person).\nJob: ____ (one result the viewer must understand).\nShot: locked-off medium close; subject fills half the frame.\nAction: one action completed in 5s.\nLight: soft window light; clean background.\nSound: room tone only; no music.\nOutput: 5s, 9:16, 720p; three takes.\nNegative: extra hands, label text, camera shake, background jump."},
        {"label": "Product label shot", "text": "Macro shot of the real product label, label fills half the frame, one hand enters from frame right, hold 0.5s, soft side light, no generated text, 5s, 9:16."},
    ],
    "checks": [
        "The clip has one job, not three.",
        "The first three seconds show or say the result.",
        "There are exactly three shots.",
        "The first test was 5s / 720p / 3 takes.",
        "Label text was shot or added in post, not generated.",
    ],
    "faults": [
        ("Hook is slow", "Intro before result", "Move result to 0s", "Cut the intro"),
        ("Too many shots", "No single job", "Keep three shots", "Drop the fourth"),
        ("Label is garbled", "Model-generated text", "Shoot the real label", "Add type in post"),
        ("Avatar mouth fails", "Side face or covered mouth", "Front close-up, short line", "Use a human"),
    ],
    "cost_rows": [
        ["Three 5s tests", "¥0–20", "Cloud per-second billing"],
        ["One 15s finish", "¥10–50", "Before human edit"],
        ["Product label shoot", "¥0", "Phone + window light"],
    ],
    "downloads": [("16-shot list", "/assets/templates/en/16-shot-list.csv", "Trim to three shots"), ("Demo recipe pack", "/assets/templates/en/lab-demo-pack.md", "Three timelines + log")],
    "next": "Read `/en/short/15s/` for the full 15s walkthrough, or `/en/deliver/export/` for platform specs.",
    "related": [("First 15s", "/en/short/15s/"), ("Demo lab", "/en/lab/"), ("Tools", "/en/tools/"), ("Export", "/en/deliver/export/")],
    "sources": [("Seedance 2.5", "https://www.seedance.tv/zh/seedance-2-5"), ("Kling 4.0 guide", "https://kling.ai/quickstart/kling-4-model-user-guide")],
    "zh_path": "/short/",
},
{
    "id": "EN31", "path": "/fix/", "section": "Fix & deliver", "section_key": "fix", "section_href": "/en/fix/",
    "type": "Symptom desk", "title": "AI video fix desk: hands, faces, flicker, text and sync",
    "short_title": "Fix desk",
    "deck": "Fix the symptom, not the whole pipeline. Reproduce the failure, isolate one variable, change one thing, and run three takes. If the same failure survives three takes, change the model or the shot.",
    "goal": "Turn one failed generation into a named symptom, one changed variable and a retest.",
    "output": "A symptom card: symptom, cause, first fix, retest result.",
    "time": "10–30 minutes", "cost": "¥0–20", "level": "Beginner",
    "not_fit": "You want a magic prompt that fixes every shot. No prompt does.",
    "prereq": [
        "The original prompt, seed, model and settings.",
        "The failed clip, not just a screenshot.",
        "A retry cap: three takes per variable.",
        "Read `/en/lab/` for the first-test log.",
    ],
    "tool_ids": [], "model_ids": [],
    "sections": [
        {"h": "Symptom table: first fix, second fix", "p": [
            "Start with the visible symptom. Do not change the model, the prompt and the seed at the same time; then you learn nothing.",
        ], "table": {"head": ["Symptom", "Likely cause", "First fix", "If it survives"], "rows": [
            ["Extra or fused hands", "Hand action too complex", "One hand, one action, hide the other", "Change shot size or model"],
            ["Face drift", "Too many references / angle change", "Front close-up, 2–3 refs", "Lock the character / recast"],
            ["Flicker or texture boil", "Temporal model or too much detail", "Shorter clip, simpler background", "Try another model"],
            ["Garbled text", "Model-rendered text", "Remove text from prompt", "Shoot the label / add type"],
            ["Lip sync off", "Side face, covered mouth, long line", "Front close-up, 5s line", "Human or H3 native audio"],
            ["Background jumps", "Cut or camera move", "Locked-off, one background", "Split into two shots"],
            ["Audio drifts", "Separate audio pipeline", "Generate audio with picture", "Align in edit"],
            ["Too slow / expensive", "Too many retries", "720p, 5s, three takes", "Change stack"],
        ]}},
        {"h": "Fix order: symptom → variable → retest", "p": [
            "Write the symptom in six words or fewer. Name the one variable you will change. Run three takes with everything else fixed. If all three fail, change the next variable. Do not judge a model on one bad take.",
        ]},
        {"h": "When to stop", "p": [
            "Stop when the shot is usable at 50–70%, or when three takes on the same variable fail. ‘Usable’ means the audience will not notice at normal speed. Do not chase a perfect frame that the story does not need.",
        ]},
    ],
    "steps": [
        "Reproduce the failure at 5s/720p.",
        "Name the symptom in six words.",
        "Change one variable only.",
        "Run three takes and log the result.",
        "If all three fail, change the next variable.",
        "If two variables fail, change the shot or model.",
    ],
    "prompts": [
        {"label": "Fix-test control prompt", "text": "Subject: ____ (one character or product).\nShot: locked-off medium close, one action, one background.\nOutput: 5s, 9:16, 720p; three takes.\nKeep constant: seed if supported, light direction, lens, duration.\nChange one: hand action / reference count / background / model.\nNegative: extra hands, face swap, text, camera shake, background jump."},
    ],
    "checks": [
        "Symptom is named in six words or fewer.",
        "Only one variable changed.",
        "Three takes were run before changing the model.",
        "The retest is logged with face, hands, text, audio, time, cost.",
        "A stop rule was written before retrying.",
    ],
    "faults": [
        ("Changing everything", "No isolation", "One variable per test", "Log the variable"),
        ("One bad take = bad model", "Small sample", "Run three takes", "Compare at speed"),
        ("Fixing in post", "Model failure", "Regenerate or reshoot", "Accept a simpler shot"),
        ("Endless retries", "No stop rule", "Cap at three per variable", "Change shot"),
    ],
    "cost_rows": [
        ["One fix test", "¥0–20", "Three 5s takes"],
        ["One model switch", "¥0–50", "Re-test the same shot"],
        ["Reshoot a label", "¥0", "Phone + window light"],
    ],
    "downloads": [("QC checklist", "/assets/templates/en/qc-checklist.md", "Technical and visual checks"), ("Model test card", "/assets/templates/en/model-test-card.md", "Log one variable at a time")],
    "next": "Go to `/en/tools/` for tool boundaries, `/en/models/` for model choice, or `/en/lab/` for the first-test log.",
    "related": [("Tools", "/en/tools/"), ("Models", "/en/models/"), ("Export & QC", "/en/deliver/export/"), ("Demo lab", "/en/lab/")],
    "sources": [("ComfyUI docs", "https://docs.comfy.org/"), ("MiniMax H3", "https://www.minimax.io/news/minimax-h3-open-source"), ("Kling 4.0 guide", "https://kling.ai/quickstart/kling-4-model-user-guide")],
    "zh_path": "/fix/",
},
{
    "id": "EN03", "path": "/start/budget/", "section": "Start here", "section_key": "start", "section_href": "/en/",
    "type": "Decision page", "title": "Hardware and budget: cloud, local or hybrid",
    "short_title": "Hardware & budget",
    "deck": "Do not budget by GPU price. Budget by usable finished seconds: generation × retries + voice + music + edit + subscriptions + electricity. This page gives three configurations and a payback formula.",
    "goal": "Calculate a three-month and six-month cost, then decide whether to buy a GPU now.",
    "output": "A budget sheet: cloud spend, hardware, electricity, subscriptions, time, payback period.",
    "time": "30–60 minutes", "cost": "¥0 (calculation only)", "level": "Beginner",
    "not_fit": "You want a GPU to make video free. Hardware swaps per-second billing for electricity and time, not zero cost.",
    "prereq": [
        "Your route card from `/en/start/route/`.",
        "Planned videos per month, seconds per video, and retry count.",
        "Local candidate: GPU, VRAM, RAM, SSD, PSU.",
        "Cloud candidate: current public prices with a read date.",
    ],
    "tool_ids": ["tool.comfyui", "tool.jimeng", "tool.kling", "tool.hailuo", "tool.runway"],
    "model_ids": ["model.h3", "model.wan22-5b", "model.wan22-14b", "model.ltx25"],
    "calculator": True,
    "sections": [
        {"h": "Usable-second cost, not generation price", "p": [
            "A platform price of ¥0.5/second is not your finished cost. You generate three takes to pick one, retry, add voice, edit, and spend time selecting. The number that matters is total spend divided by seconds that actually reach the cut.",
            "Example: a 90s drama at ¥0.80/second, 2.5 retries: 90 × 0.80 × 2.5 = ¥180. Add voice ¥30, music/SFX ¥20, edit 3h × ¥50 = ¥150; total about ¥380 per episode.",
        ], "table": {"head": ["Cost line", "How to calculate", "Easy to miss"], "rows": [
            ["Generation", "Finished seconds × price × retry factor", "Failed takes, queue time"],
            ["Voice", "Characters / 1k price, or subscription", "Clone consent, re-records"],
            ["Music / SFX", "Subscription or track license", "Commercial rights, platform claims"],
            ["Edit", "Hours × rate", "Selects, captions, revisions"],
            ["Hardware", "GPU + RAM + SSD + PSU, amortized 24 months", "Electricity, depreciation"],
            ["Subscriptions", "Fixed monthly, charged even if unused", "Annual lock-in, auto-renew"],
        ]}},
        {"h": "Three configurations: what runs, what does not", "p": [
            "These are 2026-11 local thresholds. The same GPU changes with model, quantization and resolution; write the test config. Without 16GB VRAM, do not expect stable local 1080p.",
        ], "table": {"head": ["Config", "Runs", "Barely runs", "Do not expect"], "rows": [
            ["8GB VRAM", "SDXL images, Wan 2.2 5B 480/720p short clips", "Hunyuan 1.5 low-res/quantized", "14B, LTX 22B, local H3 2K"],
            ["16GB VRAM", "Wan 2.2 5B stable, SDXL/FLUX FP8, Hunyuan 1.5", "Wan 14B quantized, LTX quantized", "4K, 30s batch"],
            ["24GB VRAM", "Wan 14B, Hunyuan 1.5, local H3 768p, LTX quantized", "LTX 4K short clips, batch", "Local H3 2K, complex direction"],
            ["32GB+", "Parallel models, LTX 4K, longer batches", "Local 2K upscale", "‘Replacing cloud’ blindly"],
        ]}},
        {"h": "Payback formula and two examples", "p": [
            "Local payback (months) = (GPU + RAM + SSD + PSU + electricity) / monthly cloud spend. The denominator is what you would actually spend, not what you imagine.",
            "A: 40 × 15s clips/month at ¥3 = ¥120/month. An ¥8,000 16GB card takes 66 months, before electricity. B: 200 × 5s drafts + 20 finals at ¥500/month; local drafts cut cloud to ¥200, payback about 40 months. Local rarely pays back for occasional work.",
        ], "note": "Price learning time at ¥50/hour. First local setup is often 8–12 hours, or ¥400–600 before you render a frame."},
        {"h": "Buying order: account first, GPU second", "p": [
            "Run one 15s clip on a free tier or the lowest subscription before buying a card. You may discover you do not enjoy video, or that an editor’s AI tools are enough. The GPU-first buyer often ends up with a second router on the desk.",
            "If you do go local: VRAM first, 16GB is the entry line, 24GB is comfortable; 32GB RAM minimum, 64GB for video; keep 200GB free for models and cache.",
        ]},
        {"h": "Public price audit, not an account bill", "p": [
            "This page uses public list prices and published limits. It is not a logged-in account statement: free-tier quotas, regional taxes, queue priority and failed generations can change the real bill. Record the read date and recheck before purchase.",
        ], "table": {"head": ["Item", "Public reference", "What to verify yourself"], "rows": [
            ["H3 / MiniMax", "Per-second pricing and token/credit rules on the official pricing page", "Login quota, failed-take charge, 2K availability"],
            ["Seedance", "Per-second / credit pricing on the official product page", "Queue, native audio, 30s access"],
            ["Kling", "Plan and credit pricing on the official pricing page", "4K access, retry policy, regional tax"],
            ["Runway", "Plan credits and seat rules", "Credit burn per second, watermark"],
            ["HeyGen / Hedra", "Plan minutes and avatar limits", "Commercial use, extra minutes"],
            ["Local", "GPU price + electricity + your hourly rate", "Actual tokens/second, fan noise, failure rate"],
        ]}},
    ],
    "steps": [
        "Fill monthly videos, seconds and retries to get monthly generated seconds.",
        "Use public per-second prices and a 2.5 retry factor.",
        "Add voice, music, edit and subscriptions.",
        "Write the local configuration and amortize hardware over 24 months.",
        "Estimate electricity from full-system watts × hours × rate.",
        "Run the payback formula; if over 24 months, delay the GPU.",
        "Add learning time to the first-year cost.",
        "Stress test: 4 retries and a 30% price increase.",
        "Save the sheet; recheck in three months, do not edit the old sheet.",
    ],
    "prompts": [
        {"label": "Budget formulas (copy to a sheet)", "text": "Cost per finished clip = finished seconds × price per second × retry factor + voice + music/SFX + edit hours × rate\nLocal payback (months) = (GPU + RAM + SSD + PSU + first-year electricity) / monthly cloud spend\nUsable-second cost = total spend / seconds that reach the cut"},
    ],
    "checks": [
        "The budget includes a retry factor, not one successful take.",
        "Local config names VRAM, RAM, SSD and PSU, not only the GPU.",
        "Cloud spend includes subscriptions/credits, not only per-second.",
        "Electricity and learning time are included.",
        "Payback over 24 months is marked ‘delay the GPU’.",
        "Price read date is written on the sheet.",
    ],
    "faults": [
        ("Local 14B will not run", "VRAM/RAM shortage or too high resolution", "Use 5B or quantized", "Drop to 480p; if it still fails, cloud"),
        ("Cloud bill overruns", "Retries and multiple subscriptions", "Disable auto-renew; buy project credits", "Draft locally"),
        ("GPU sits idle", "Bought before a goal", "Sell after 30 days unused", "Validate with cloud first"),
        ("Electricity higher than expected", "Full-system watts + long queues", "Log cost per hour", "Batch runs, no idle"),
        ("Models fill the SSD", "Multiple weights and cache", "Keep only the current workflow", "External SSD / clear cache"),
    ],
    "cost_rows": [
        ["Cloud start (20 × 15s/month)", "¥60–200/month", "With retries, before labor"],
        ["16GB local entry", "¥6,000–10,000 hardware", "Electricity ¥0.5–2/hour"],
        ["24GB local step-up", "¥12,000–20,000 hardware", "Electricity ¥1–4/hour"],
        ["Hybrid", "Hardware + ¥200–500/month cloud", "Local drafts, cloud finals"],
    ],
    "downloads": [("Budget calculator", "/assets/templates/en/budget-calculator.csv", "Seconds, price, retries, voice, labor")],
    "next": "Take the budget to `/en/tools/` or `/en/tools/comfyui/`; if it says delay, stay on cloud.",
    "related": [("Starter route", "/en/start/route/"), ("ComfyUI", "/en/tools/comfyui/"), ("Tools", "/en/tools/"), ("Models", "/en/models/")],
    "sources": [("ComfyUI requirements", "https://docs.comfy.org/zh/installation/system_requirements"), ("MiniMax pricing", "https://platform.minimaxi.com/docs/guides/pricing-paygo"), ("Runway pricing", "https://runway.com/pricing")],
    "zh_path": "/start/budget/",
},
]

PAGES_SHORT = [p for p in PAGES if p["id"] == "EN30"]
PAGES_FIX = [p for p in PAGES if p["id"] == "EN31"]
PAGES_BUDGET = [p for p in PAGES if p["id"] == "EN03"]
