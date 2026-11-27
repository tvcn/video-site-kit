# TVCN AI 团队交接文档

- 最后更新：2026-11-27
- 交接对象：下一支接手 TVCN 的 AI / 工程 / 内容团队
- 当前结论：**结构、内容、审计、仓库、线上发布全部收口；可以直接进入日常内容与改版工作。**
- 配套阅读：根目录 `README.md`、`docs/项目总结.md`、`docs/部署与密钥.md`、`docs/内容运营手册.md`、`docs/UI规范.md`。

> 这是一份执行手册。第一天只读核对，不要改内容，不要推 GitHub。

## 0. 先记住 10 件事

1. **规模**：506 对中英内容 = 1,012 篇 Markdown；149 对深读；22 主题 / 46 页；100 条术语；9 条路径。
2. **一篇文章只属于一个站**，以 `article.site` 为唯一归属。
3. **正文只有一个来源**：`content/<site>/<zh|en>/<slug>.md`。`generator/data/static-articles-data.json` 只是页面壳缓存，不手工编辑。
4. **canonical 自指**：每站文章 canonical 指向本站域名。
5. **主站保留 429 对旧 URL 兼容页**（`noindex` 跳转），以及 84 对旧 AI 兼容页（`noindex,follow`，canonical → `ai.tvcn.org`）。
6. **about / glossary / paths / topics / 全站索引 / `/app/` 只在主站**；分站页脚用绝对地址链接回主站。
7. **构建链**：`content → generator → out → deploy → GitHub Pages`；`out/` 与 `deploy/` 都是可重建产物。
8. **一条命令完成构建**：`node generator\build-all.mjs`（自动重建索引、同步正文、8 站、AI 站、QA、两个链接审计）。
9. **发布先 canary**：先发 story，再 `-Site all -Push`；不要手改 `deploy/`。
10. **token 在项目外**：`C:\Users\chenhua\.config\tvcn\github.env`（两行：账号 URL + classic PAT）。不要打印、不要写进仓库或聊天。

## 1. 当前状态快照

### 1.1 内容与产物

```text
506 对 / 1,012 篇 / 149 对深读
main 77 / story 48 / shoot 50 / post 54
animation 40 / formats 64 / tools 125 / context 48
AI 站 49 页 + 404
out/ 5,437 files / 61.1MB
本地合计 368.4MB（deploy 224.8 / out 61.1 / content 27.4 / generator 20.4 / assets 15.3 / app 2.6）
```

### 1.2 线上 HEAD（2026-11-27）

| 站 | HEAD |
|---|---|
| main | `9706893` |
| story | `a1808ab` |
| shoot | `9b49d84` |
| post | `a496b66` |
| ai | `c0691ba` |
| animation | `552a1b8` |
| formats | `95258a6` |
| tools | `7a67c3e` |
| context | `554d267` |

内容仓 `875dfab`。9 站 Pages 全部 `built`，`deploy/` 工作区干净，`out/` 与 `deploy/` 文件数逐站一致。

### 1.3 sitemap 计数

main 210、story 100、shoot 104、post 112、animation 84、formats 132、tools 254、context 100、ai 47；合计 1,143。

## 2. 文档与事实源

优先级从高到低：

1. 代码与产物：`content/index.json`、`out/` 实际文件、`generator/audits/*.json`、QA 输出。
2. `README.md`、`docs/项目总结.md`、本文。
3. `docs/部署与密钥.md`、`docs/内容运营手册.md`、`docs/UI规范.md`。
4. `docs/archive/` 已删除；不再保留按日期分叉的历史文档。需要旧决策时看 Git 历史。

发生冲突时以代码和产物为准，并在同一天更新文档。

## 3. 目录与仓库

### 3.1 本地

| 路径 | 性质 | 用途 |
|---|---|---|
| `content/` | 源（独立仓库） | 506 对 Markdown、图解、`SOURCES.md`、`index.json` |
| `assets/` | 源 | 封面 JPG、图解 SVG、音频、模板、图标 |
| `app/` | 源 | `tvcn-ui-v2.html`，只发布到主站 `/app/` |
| `site-kit/` | 源 | `article.css`、`app-shell.css`、`shell/`、`sites.json`、UI 契约 |
| `generator/` | 源 | 构建、组装、QA、发布、索引、正文同步、审计 |
| `generator/data/` | 源 + 缓存 | 页面壳缓存、来源映射、编辑增量 |
| `generator/ai6/` | 源 | AI 站独立管线（content/data/evidence/samples/templates） |
| `generator/legacy-ai/` | 源 | 84 对旧 AI 兼容页模板 |
| `out/` | 生成物 | 每站构建产物（gitignored） |
| `deploy/` | 发布副本 | 9 个站点仓工作副本，各自带 `.git`（gitignored） |
| `docs/` | 文档 | 当前 5 份文档 |

根目录本身是仓库，远端 `tvcn/video-site-kit`，收 `generator / site-kit / app / assets / docs`。`content/`、`deploy/`、`out/` 被根 `.gitignore` 排除（注意：规则写成 `/content/` 这类根路径，避免误伤 `generator/ai6/content/`）。

### 3.2 远端

| 仓库 | 用途 |
|---|---|
| `tvcn/video-production-hub` | 主站 `tvcn.org` |
| `tvcn/video-storytelling` | `story.tvcn.org` |
| `tvcn/video-shooting` | `shoot.tvcn.org` |
| `tvcn/video-editing` | `post.tvcn.org` |
| `tvcn/ai-video` | `ai.tvcn.org` |
| `tvcn/video-animation` | `animation.tvcn.org` |
| `tvcn/video-formats` | `formats.tvcn.org` |
| `tvcn/video-tools` | `tools.tvcn.org` |
| `tvcn/media-literacy` | `context.tvcn.org` |
| `tvcn/video-production-handbook` | 内容仓（唯一内容源，无站点） |
| `tvcn/video-site-kit` | 构建/共享仓（无站点） |

内容仓与构建仓不要开 Pages。

## 4. 环境与依赖

| 项 | 当前值 |
|---|---|
| OS | Windows 10/11，PowerShell 5 |
| 项目根 | `C:\Users\chenhua\Desktop\tvcn` |
| Node | 22.x |
| Python | 3.13.x |
| Python 包 | `markdown`、`pyyaml`、`requests` |
| Git | `C:\Program Files\Git\cmd\git.exe` |
| token 文件 | `C:\Users\chenhua\.config\tvcn\github.env` |
| DNS/HTTPS | Cloudflare，用户侧维护 |

缺依赖：

```powershell
python -m pip install markdown pyyaml requests
```

## 5. 内容模型与不变量

### 5.1 归属

- 路径 `content/<site>/<zh|en>/<分组>/<slug>.md`（分组可省略）。
- 同一对文件 `translation_key`、`slug` 相同，`lang` 不同。
- 归属由 frontmatter `site` 决定；每站只渲染本站文章。
- `content/index.json` 由 `make-content-index.py` 从 Markdown 重建，不要手改。

### 5.2 frontmatter 必填

`id`、`site`、`type`、`lang`、`translation_key`、`title`、`summary`、`slug`、`canonical_site`、`canonical_path`、`status`、`difficulty`、`stage`、`format`、`authors`、`last_verified`、`review_due`、`related`、`source_kind`、`diagram`、`diagram_alt`、`diagram_caption`。

常见可选：`cover`、`aliases`、`sources`、`depth`、`tools`、`verified`、`test_context`、`known_failures`。

### 5.3 canonical

- 正文：`https://<本站域名>/article/<slug>/`；英文 `/en/article/<slug>/`。
- 旧 AI 兼容页：canonical → `ai.tvcn.org`，`noindex,follow`。
- 主站兼容页：canonical → 目标分站，`noindex` + meta refresh。

### 5.4 正文约定

- 每页 `## 图解` 放结构图（`<!-- DIAGRAM_START -->` / `<!-- DIAGRAM_END -->` 包裹）。
- 来源或经验说明放文末 `<!-- SOURCES_START -->` → `## 参考与延伸阅读` 或 `## 经验说明` → `<!-- SOURCES_END -->`。
- 范围说明行 `<!-- INTENT_SCOPE -->` 前保留「意图分工」引用块；删掉会触发意图簇审计。
- 不要在正文里重复同名 `##` 小节；构建会保留第一份、删除旧壳副本，但内容本身的重复要编辑处理。

### 5.5 页面壳缓存

`generator/data/static-articles-data.json` 每条含 `id / site / title / kicker / summary / meta / image / html`。`html` 是壳（breadcrumbs、hero、封面 figure、`<article class="article-body">` 占位），正文由 `sync-static-bodies.py` 每次构建覆盖。同步会：保留图解 figure、删正文外的同名小节、删多余 `article-body`、重排来源 aside。

## 6. 标准工作流

### 6.1 只读体检

```powershell
cd C:\Users\chenhua\Desktop\tvcn
node generator\build-all.mjs
```

预期结尾：

```text
SITE CHECKS OK
LINK CHECKS OK
TOTAL articles 1012 compat 1026 orphan 0
OUT: 5437 files, 61.1 MB
```

再确认仓库干净：

```powershell
git -C content status --short
git status --short
git -C deploy\main status --porcelain
```

### 6.2 改一篇现有文章

1. 改 `content/<site>/<zh|en>/.../<slug>.md`。
2. 跑 `node generator\build-all.mjs`（索引与正文同步自动执行）。
3. 看 `generator/audits/inbound-links.json`、`content-quality-inventory-2026-11-26.json` 是否仍达标。
4. 发布前先发 story，再全量。

### 6.3 新增一对内容

1. 在 `content/<site>/zh/` 与 `en/` 各写一篇，`translation_key`、`slug` 一致。
2. 图解：源文件 `content/images/diagrams/<lang>/<slug>.(svg|png)`；站点实际引用 `assets/notes/<slug>.svg`、`<slug>-en.svg`，需要同步放到 `assets/notes/`。
3. 在 `generator/data/static-articles-data.json` 的 `zh` / `en` 数组各加一条页面壳（复制同站相近条目，改 `id/site/title/kicker/summary/meta/image` 与壳里的封面、breadcrumbs、hero；`html` 必须保留 `<article class="article-body">`）。
4. `node generator\build-all.mjs`，确认 pairs +1、QA 与审计通过。
5. 检查新页 canonical、sitemap、related、入站链接、资源。
6. 若来源是新的 Sxx，先在 `content/SOURCES.md` 登记再引用。

### 6.4 改站点配置或 UI

- 站点配置：`site-kit/sites.json`。
- 文章样式唯一真源：`site-kit/assets/article.css`。
- 外壳函数：`generator/build-site.mjs` 的 `page()/header()/footer()/tabbar()`。
- 交互壳：`app/tvcn-ui-v2.html`（只主站 `/app/`）。
- 404 / robots / manifest / sw：`site-kit/shell/`。
- 改完跑全量构建，并按 `docs/UI规范.md` 抽查 390/1280。

### 6.5 改 AI 站

```powershell
python generator\ai6\build_site.py --out generator\ai6\site
python generator\ai6\qa_site.py --site generator\ai6\site
node generator\build-all.mjs
```

AI 站不经过 `content/`，也不进内容站 sitemap。

### 6.6 发布与线上核验

```powershell
# canary
powershell -ExecutionPolicy Bypass -File generator\publish.ps1 -Site story -Push

# 全量
powershell -ExecutionPolicy Bypass -File generator\publish.ps1 -Site all -Push
```

核验清单：

1. 9 站首页 200。
2. 发布站文章页 200，canonical 为本站域名。
3. 主站旧 URL 兼容页 200 且跳转到正确分站。
4. 旧 AI 页 `noindex`，canonical → `ai.tvcn.org`。
5. sitemap 计数与本地一致。
6. 分站不出现其他站 slug（抽查应 404）。
7. Pages 构建状态 `built`，`deploy/<site>` 工作区干净。

## 7. QA 门槛与当前基线

| 脚本 | 检查 | 当前 |
|---|---|---|
| `node generator/qa-sites.mjs` | 归属、canonical、sitemap、搜索索引、资源、跨站链接 | 通过 |
| `node generator/qa-links.mjs` | 全站内链与资源 | 89,740 条，0 broken |
| `node generator/audits/audit-inbound-links.mjs` | 入站链接、孤立页、主题枢纽 | 1,012 正文页 0 孤立；46 主题页最少 15 子链接、0 失效 |
| `python generator/audits/audit-intent-clusters.py` | 20 个意图簇 | 96 支撑页，0 未解决 |
| `python generator/audits/content-quality-audit.py` | 结构与可观察缺陷 | 476 A + 30 S，0 缺陷 |
| `python generator/audits/source-claim-audit-20261126.py` | 来源/经验/claim 绑定 | 506 A；354 sourced + 152 experience |
| `python generator/audits/case-disclosure-audit-20261126.py` | 案例匿名复合披露 | 15/15 A |
| `python generator/audits/audit-source-consistency-20261126.py` | 来源块与注册表一致 | `thin_300_449=0`、`no_external=0`、`experience_no_note=0`、`review_missing=0` |
| `python generator/audits/check-external-links-20261126.py` | 外链健康 | 43 ok + 16 manual，0 broken |
| `python generator/ai6/qa_site.py` | AI 站 | 50 HTML / 47 sitemap / 0 失败 |

`deep_no_external=2` 是两篇深读经验页（`source_kind: experience`），属预期，不是缺陷。

## 8. 已知风险与待办

**P0**

1. 页面壳仍是整段 HTML 缓存：新增一对要加壳；改版式要在旧壳上增量。目标是改成 frontmatter 渲染。
2. 发布链路不能跳步：`build-all` → `publish.ps1` → 线上核验；不要手改 `deploy/` 或线上仓。

**P1**

3. `deploy/` Git 历史约 160MB，可评估压缩。
4. 未做 9 站全量视觉截图回归（只有 390/1280 烟测与抽查）。
5. `generator/data/editorial-*.mjs` 仍有旧增量文案，只在缺标题时补位；新内容不要再写进去。
6. `site-kit/assets/app-shell.css` 未被当前 app 引用（app 用内联样式），保留作参考。

**P2**

7. `content/README.md` 里可能还有旧口径（如 context 来源数），内容编辑可顺手校准。

## 9. 前 48 小时

**第一天：只读**

1. 读 `README.md`、`docs/项目总结.md`、本文。
2. 跑 `node generator\build-all.mjs`，记录输出与上面基线是否一致。
3. 看 `content/index.json` 的 documents / pairs，`out/` 的目录结构。
4. 本地起静态服务，抽查 `out/story/`、`out/main/`：首页、文章、搜索、主题、术语、404。
5. 抽查主站兼容页 `out/main/article/logline/` 跳 `story.tvcn.org`；旧 AI 页 canonical → `ai.tvcn.org`。

**第二天：跑审计**

1. 跑 `generator/audits/` 下六个审计，对比第 7 节。
2. 读 `inbound-links.json`、`intent-clusters.json` 的字段含义。
3. 确认 `out/` 与 `deploy/` 文件数一致。
4. 决定是否先发 story canary。

## 10. 交接验收清单

- [ ] 能说出 506 对 / 1,012 篇 / 149 对深读 / 22 主题。
- [ ] 能解释「一篇文章只属于一个站」和 `site` 字段。
- [ ] 能解释 canonical 自指、主站兼容页、旧 AI 页的区别。
- [ ] 能跑 `node generator\build-all.mjs` 并复现两条 OK。
- [ ] 能改一篇 Markdown 并完成 build → QA（索引与正文同步自动跑）。
- [ ] 能说明新增一对为什么仍要加页面壳（技术债）。
- [ ] 能定位 token 文件但不打印 token。
- [ ] 能按 canary 流程发布 story，并核对 canonical、sitemap、404。
- [ ] 能列出 P0/P1 待办，不把「结构拆分完成」说成「项目全部完成」。

## 11. 命令速查

```powershell
cd C:\Users\chenhua\Desktop\tvcn

# 全量构建（自动索引 + 正文同步）+ QA + 审计
node generator\build-all.mjs

# 单站
node generator\build-site.mjs --site=story
node generator\assemble-site.mjs --site=story

# QA
node generator\qa-sites.mjs
node generator\qa-links.mjs
node generator\audits\audit-inbound-links.mjs
python generator\audits\audit-intent-clusters.py

# AI 站
python generator\ai6\build_site.py --out generator\ai6\site
python generator\ai6\qa_site.py --site generator\ai6\site

# 发布
powershell -ExecutionPolicy Bypass -File generator\publish.ps1 -Site story
powershell -ExecutionPolicy Bypass -File generator\publish.ps1 -Site story -Push

# 仓库状态
git -C content status
git status
git -C deploy\main status --porcelain
```

## 12. 常见问题

| 现象 | 处理 |
|---|---|
| 改了 Markdown，页面没变 | 是否跑了 `build-all`？不要直接改 `static-articles-data.json`。 |
| 页面出现同一小节两次 | 正文里重复了 `##`；删掉后出现的旧副本，重建即可。别删 `<!-- INTENT_SCOPE -->` 前的引用块。 |
| 计算器页出现两个计算器 | 检查 Markdown 是否已含 `data-calculator="<id>"`；构建已做幂等，若仍重复说明正文里写了两份。 |
| 推送 403 / 401 | 检查 token 文件两行格式；push 用 `git -c http.extraheader="Authorization: Basic <base64(x-access-token:TOKEN)>"`，不要把 token 写进 remote URL 或 `.git/config`。 |
| 推送连接重置 | 重试；历史上前端仓库偶发，用同样的 `http.extraheader` 方式重试即可。 |
| 某页外链显示 404 | 先人工在浏览器确认；确认可用就在 `check-external-links-20261126.py` 的 `KNOWN_BLOCKED` 登记原因，否则换源或删除。 |
| sitemap 数量不对 | 看 `out/<site>/sitemap.xml` 与 `qa-sites.mjs` 输出；多半是 `status` 不是 `published` 或站点归属写错。 |
| 页面 canonical 指错站 | 检查 frontmatter `canonical_site` / `site` 与 `site-kit/sites.json` 的 `content_site`。 |

## 13. 一句话交接

**9 站结构、内容、审计、线上发布都已收口：正文只改 Markdown，一条 `build-all` 重建全站，发布先 story canary；剩下的最大一件事是把页面壳从 frontmatter 渲染。**
