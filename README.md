# TVCN · 影像制作知识库

TVCN 是面向中文影像创作者的双语知识库，主站 `https://tvcn.org/`，另有故事、拍摄、后期、AI、动画、片型、工具、影像史 8 个分站。全站静态发布，内容源只有一份 Markdown，构建时用共享核心与 UI 分别产出 9 个站点仓。

## 架构

```text
content/                 唯一内容源：506 对中英 Markdown、图解与来源
        +
site-kit/                共享核心：article.css、UI 契约、站点清单
        +
generator/               构建器：按站渲染、组装、QA
        ↓
out/<site>/              每站只含本站文章、本站索引、本站搜索与引用资源
        ↓
deploy/<site>/           9 个发布工作副本（带 .git）
        ↓
GitHub Pages             9 个站点仓
```

硬规则：

- **一篇文章只属于一个站**。`article.site` 是唯一归属依据。
- **共享的是壳，不是正文**：CSS、页头页脚、导航、搜索组件共享；文章只进本站。
- **canonical 自指**：每站文章 canonical 指向本站域名。
- **主站保留旧 URL 兼容页**：原先在 `tvcn.org/article/<slug>/` 的非主站文章，现在是 `noindex` 跳转页，指向对应分站。
- **共享页只在主站**：about、glossary、paths、topics、全站索引、`/app/` 交互壳只在主站；分站页脚用绝对地址链接过去。
- **旧 AI 2.0 兼容页只在主站**：84 对，`noindex,follow`，canonical 指向 `ai.tvcn.org`。
- **AI 站独立**：`generator/ai6/` 产出 49 页内容页 + 404，不经过内容站构建器。

## 目录

```text
content/                 Markdown 内容仓（独立 .git → tvcn/video-production-handbook）
  main/ story/ shoot/ post/ animation/ formats/ tools/ context/
  images/diagrams/       zh/en 图解
assets/                  共享素材：封面 JPG、图解 SVG、音频、模板、图标
app/                     交互壳源文件 tvcn-ui-v2.html（只发布到主站 /app/）
site-kit/
  assets/article.css     文章样式唯一真源
  assets/app-shell.css   交互壳样式
  shell/                 404、robots、manifest、sw
  sites.json             9 站域名、repo、内容站、共享页策略
  ui-contract.json       UI 机器契约
generator/
  build-site.mjs         单站渲染
  assemble-site.mjs      单站组装：兼容页、旧 AI 页、资源、CNAME
  build-all.mjs          全量构建：索引 → 正文 → 8 站 → AI → QA → 审计
  qa-sites.mjs           归属、canonical、sitemap、搜索、资源
  qa-links.mjs           全站内链与资源存在性
  publish.ps1            镜像到 deploy，可选 push
  make-content-index.py  重建内容索引（build-all 自动调用）
  sync-static-bodies.py  Markdown 正文 → 页面片段缓存（build-all 自动调用）
  data/                  静态页壳数据、来源映射、编辑增量
  audits/                内容质量、来源、案例披露、来源一致性、外链健康、入站链接、意图簇
  legacy-ai/             84 对旧 AI 兼容页
  ai6/                   AI 站独立管线
out/                     每站构建产物（可重建）
deploy/                  9 个站点仓工作副本（可重建）
docs/                    当前文档
docs/archive/            历史文档
```

上面除 `content/` 与 `deploy/` 外的全部内容（含 `generator/`、`site-kit/`、`app/`、`assets/`）都在根仓库里，远端是 `tvcn/video-site-kit`。

## 站点与规模

| 站 | 域名 | 仓库 | 本站内容对 | 文章目录/语言 | sitemap |
|---|---|---|---:|---:|---:|
| main | `tvcn.org` | `video-production-hub` | 77 | 590（77 正文 + 84 旧 AI + 429 兼容） | 210 |
| story | `story.tvcn.org` | `video-storytelling` | 48 | 48 | 100 |
| shoot | `shoot.tvcn.org` | `video-shooting` | 50 | 50 | 104 |
| post | `post.tvcn.org` | `video-editing` | 54 | 54 | 112 |
| animation | `animation.tvcn.org` | `video-animation` | 40 | 40 | 84 |
| formats | `formats.tvcn.org` | `video-formats` | 64 | 64 | 132 |
| tools | `tools.tvcn.org` | `video-tools` | 125 | 125 | 254 |
| context | `context.tvcn.org` | `media-literacy` | 48 | 48 | 100 |
| ai | `ai.tvcn.org` | `ai-video` | 49 页 | — | 47 |

内容合计 506 对 / 1,012 篇 Markdown；`out/` 当前 5,437 文件 / 61.1MB。

## 构建

```powershell
cd C:\Users\chenhua\Desktop\tvcn

# 全量构建 9 站并跑 QA（会自动重建内容索引、同步 Markdown 正文）
node generator\build-all.mjs

# 单站
node generator\build-site.mjs --site=story
node generator\assemble-site.mjs --site=story

# 只跑 QA
node generator\qa-sites.mjs
node generator\qa-links.mjs

# AI 站单独构建
python generator\ai6\build_site.py --out generator\ai6\site
python generator\ai6\qa_site.py --site generator\ai6\site
```

内容只有一个来源：`content/` 里的 Markdown。`build-all.mjs` 会先跑 `make-content-index.py`，再跑 `sync-static-bodies.py`，把正文渲染进 `generator/data/static-articles-data.json` 的页面壳；这个 JSON 是构建缓存，不手工编辑。

## 发布

```powershell
# 只镜像到 deploy 并本地提交，不推送
powershell -ExecutionPolicy Bypass -File generator\publish.ps1 -Site story

# 推送（需要 C:\Users\chenhua\.config\tvcn\github.env）
powershell -ExecutionPolicy Bypass -File generator\publish.ps1 -Site story -Push
```

`publish.ps1` 会用 `out/<site>` 覆盖 `deploy/<site>`，保留 `.git`；默认只提交，不推送。token 只在项目外，不写入仓库。

## QA 基线

- `qa-sites.mjs`：每站文章归属、canonical、sitemap、搜索索引、资源缺失、跨站链接。
- `qa-links.mjs`：全站内链与资源，当前 89,740 条，0 broken。
- `qa-sites.mjs` 当前输出：8 个内容站 + AI 站全部通过。
- `generator/audits/content-quality-audit.py`：506 对 476 A + 30 S，0 缺陷。
- `generator/audits/source-claim-audit-20261126.py`：506 对 A；354 sourced + 152 experience。
- `generator/audits/case-disclosure-audit-20261126.py`：15/15 A。
- `generator/audits/audit-source-consistency-20261126.py`：0 缺陷。
- `generator/audits/check-external-links-20261126.py`：43 ok + 16 manual，0 broken。
- `generator/audits/audit-inbound-links.mjs`：扫描 `out/`，1,012 正文页 0 孤立页；主站 46 个主题页最少 15 个子链接，0 失效。
- `generator/audits/audit-intent-clusters.py`：20 个意图簇，96 个支撑页，0 未解决。
- 页面结构检查：1,012 篇正文没有重复 H2（2026-11-27 修完 47 页的历史重复段）。
- 移动端/桌面烟测：390 与 1280 宽无横向溢出，页头/页脚/底栏齐全。

## SEO

- 主站 sitemap 只列主站正文、主题、术语、路径、关于与索引。
- 分站 sitemap 只列本站正文、首页与本站文章索引。
- 分站文章 canonical 自指；旧 `tvcn.org/article/<非主站 slug>/` 是 `noindex` 兼容跳转页。
- 84 对旧 AI 页只在主站，canonical 指向 `ai.tvcn.org`。
- 子站不发布 topics；主题页只在主站。

## 文档

- `docs/TVCN项目总结-2026-11-27.md`：当前状态总览（按站拆分后）
- `docs/TVCN-AI团队交接文档-2026-11-27.md`：后续开发接手手册
- `docs/TVCN项目总结-2026-11-26.md`、`docs/TVCN-AI团队交接文档-2026-11-26.md`：上一轮文档，含旧路径提示
- `docs/网站内容补全报告-2026-11-26.md`、`docs/网站内容补全计划-2026-11-26.md`：最近一轮内容批次
- `docs/内容运营手册-2026-11-26.md`：来源分级、经验说明、发布检查
- `docs/全站UI统一规范-2026-11-25.md`：UI 合同
- `docs/部署与密钥.md`：凭据与 Pages
- `docs/archive/`：历史计划、旧报告与旧架构文档

9 站已于 2026-11-27 发布到线上，Pages 全部 `built`，`deploy/` 工作区干净。当前 HEAD：main `4040b97`、story `0b485db`、shoot `a956c55`、post `71a5f84`、ai `c0691ba`、animation `d9d2f7a`、formats `1ce24d5`、tools `16ef2f6`、context `323efa7`；内容仓 `3cf028c`；构建/共享仓 `118f519`。

## 许可

- 文字、术语、原创图解：CC BY-SA 4.0，见 `LICENSE-CONTENT`
- 代码、构建脚本、站点引擎：MIT，见 `LICENSE`
- TVCN 名称与标识不在上述许可内
