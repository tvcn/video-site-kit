# TVCN 全站 UI 统一规范

日期：2026-11-25  
适用范围：`tvcn.org` 主站、8 个分站（story / shoot / post / ai / animation / formats / tools / context），以及各站 `/app/` 交互版与 `404.html`。

这份规范不是视觉建议，而是构建与发布时必须满足的约束。机器可读版本是 `build/ui-contract.json`，执行检查是 `python build/ui-audit.py`。

## 一、本轮统一后的结论

全站统一的是 **外壳、画布、导航、页脚、缓存键和特殊页生成方式**；各站的内容组件（卡片、表格、对比块）可以有自己的业务形态，但不能另起一套 header/footer。

- 9 个站的 `assets/article.css` 已是同一个文件：原始字节 SHA-256 前缀 `E19CB63906AF`，99,354 bytes；归一化 CRLF→LF 后为 `1D70E54E79C4`，与线上文件一致。
- 8 个静态站的正文页、首页、关于页、搜索页、文章索引页统一使用 `.static-page` + `.static-header` + `.static-footer` + `.static-tabbar`。
- `header` 的 9 个站点链接顺序固定，移动端 760px 以下隐藏站点链接，只保留「搜索 / EN / 明暗」和底部 9 站 tabbar。
- 当前站点高亮按 **访问域名** 判断，而不是按文章内容所属编辑台判断。主站所有页面高亮「主站」，分站所有页面高亮自己的站，AI 站高亮「AI」。
- 8 个静态站的 `/app/` 已换成同一套外壳，仅保留 app 自身的内容组件；app 的语言按钮输出 `EN / 中文`，主题按钮输出 `明暗 / Theme`。
- 8 个静态站和 AI 的 `404.html` 都使用浅色当前壳层，带 `noindex,follow`，并提供首页、搜索、全部文章三个出口。
- 所有静态页统一使用 `article.css?v=20261125c`；AI 同时使用 `ai6.css?v=20261125c`；app 使用 `app-shell.css?v=20261125c`。
- 页脚日期统一为 `2026-11-25`。
- 主站与 AI 页脚保留「主题」入口；分站没有独立主题页，页脚不再放相对 `/topics/` 链接，避免死链。

## 二、不可变的设计令牌

| 项目 | 值 | 落点 |
|---|---|---|
| 内容最大宽度 | `1180px` | `article.css` / `app-shell.css` 的 `--max` |
| 桌面 header 高度 | `59px` | 实测于 1280px 视口 |
| 移动 header 高度 | `55px` | 实测于 390px 视口 |
| 首页 h1 | `48px` | 1280px 视口；390px 为 `30px` |
| 内页 / 文章 h1 | `40px` | 1280px 视口 |
| 移动端内页 h1 | `28px` | 390px 视口；首页为 `30px` |
| 背景 / 墨色 / 强调 | `#f4f1eb` / `#171513` / `#b04421` | 亮色主题 |
| 暗色背景 / 墨色 / 强调 | `#0d100f` / `#f3efe7` / `#ff8a5b` | 暗色主题 |
| 正文最大宽度 | 文章正文 `760px`；关于等普通内页 `680–760px` | 阅读型页面 |
| 术语表 | `980px` 窄版 | 允许的页面类型差异 |

字体栈固定为：

```css
-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC",
"PingFang SC", "Microsoft YaHei", sans-serif
```

## 三、唯一内容轨

所有页面的 header 内容、正文容器、文章 TOC、正文、页脚内容必须落在同一条左轨。2026-11-25 c 版把 AI 文章页的 `.wrap` 提前闭合问题修掉，并把 header/footer 的 24px 横向 padding 归零，统一到这条轨：

| 视口 | 左轨 x | 内容宽 | 文章正文宽 |
|---|---:|---:|---:|
| 1280px | `50px` | `1180px`（`min(var(--max), calc(100% - 40px))`） | `760px` |
| 390px | `14px` | `362px`（`calc(100% - 28px)`） | `362px` |

具体要求：

- `.static-header-inner`、`.static-footer-inner`、`.footer-sites` 与 `main .wrap` 的 x 必须相同；桌面 `50px`，手机 `14px`。
- `.article-hero`、`.article-toc`、`.article-body` 必须都在同一个 `.wrap` 内，且 x 与 header 相同；文章 TOC 左对齐（`margin:9px 0 2px`），不再 `margin:auto` 居中。
- `.article-body` 不得作为 `.wrap` 的兄弟节点直接挂在 `body` 下。AI 文章模板 `article_page()` 只允许末尾一个 `</div>` 关闭 `.wrap`。
- AI 的 41 个中英文文章页全部适用；英文页 header 的 `data-site-nav="ai"` 必须同时带 `aria-current="page"`。
- 首页 h1 `48/30`，内页 h1 `40/28`；`article.css` 与 `app-shell.css` 不得再出现 `font-size:27px` 的内页 h1。

允许的差异只有两类：AI 站顶部有 `ai6-subnav` 栏目导航；术语表是 980px 窄版。首页 `48/30` 与内页 `40/28` 已全站同值，其他差异都视为回归。

## 三、外壳结构

普通页必须同时满足：

```html
<body class="static-page">
  <a class="skip-link" href="#main">跳到正文</a>
  <header class="static-header">…</header>
  <main id="main" class="static-main" tabindex="-1">…</main>
  <footer class="static-footer">…</footer>
  <nav class="static-tabbar" aria-label="底部站点导航">…</nav>
</body>
```

导航顺序固定：

`主站 → 故事 → 拍摄 → 后期 → AI → 动画 → 片型 → 工具 → 影像史`

三组链接都必须正好 9 条，标签在本组内唯一；每组只能有一个 `aria-current="page"`，且等于当前访问站点的 `data-site-nav`。

页脚核心链接：

- 所有站点：`关于 / 术语表 / 搜索 / 交互版`
- 主站和 AI：额外保留 `主题`（AI 使用 `https://tvcn.org/topics/` 绝对链接）
- 分站：不出现相对 `topics/` 链接

禁止再出现：

- `<header class="site-header">`
- `<footer class="site-footer">`
- `class="brand-mark"`
- 旧 app 的方形 `TV` 标志
- `article.css?v=20261124*`
- 页脚 `2026-11-24`

## 四、以后新增内容怎么走

### 1. 新增普通文章

1. 内容写进 `v2/content/` 的 Markdown / 数据源。
2. 运行静态生成器：
   ```powershell
   node build/make-static-articles.mjs
   ```
3. 生成后不要手改 header/footer；如果需要改外壳，改 `build/make-static-articles.mjs` 里的 `header()` / `footer()` / `tabbar()`。
4. 构建 staging 前运行：
   ```powershell
   python build/ui-audit.py
   ```
   失败项必须清零，不能带病发布。

### 2. 新增一个页面类型或栏目

- 必须复用 `page()`、`header()`、`footer()`、`tabbar()`，不要复制旧 HTML 再改文字。
- `site` 参数表示 **内容所属编辑台**，用于 JSON-LD 作者和面包屑；页面高亮由 staging 的 `normalize-host-shell.py` 按访问站重写，不靠内容编辑台。
- 新页面如果需要特殊宽度，先确认属于允许类型（术语表 980px），否则用 1180px。

### 3. 新增分站

1. 更新 `v2/site-registry.json` 和生成器里的 `NAV_SITES`。
2. 三处导航必须同时加：主站静态 header/footer/tabbar、AI 的 `SITE_NAV`、app 的外壳生成器。
3. 新站必须有 `404.html` 和 `/app/index.html`，由 `build/make-ui-404.py`、`build/reskin-app-shell.py` 生成。
4. 运行 `python build/ui-audit.py`，确认三组导航都是 9 条。

### 4. 新增 / 修改 404

不要手写。运行：

```powershell
python build/make-ui-404.py
```

它会给 8 个静态站和主站 dist 写入当前浅色壳层，保留 `noindex,follow` 和三个出口。

### 5. 新增 / 修改 app

不要手写旧 app 壳。运行：

```powershell
python build/reskin-app-shell.py
python build/normalize-host-shell.py --root build/pages-sites/<site> --site <site>
```

app 必须使用 `/assets/app-shell.css?v=20261125c`，不要再引入完整 `article.css`，以免内容组件的 `.btn`、`.card`、`.wrap` 被全局样式覆盖。

### 6. 全量重建 staging

```powershell
pwsh -NoProfile -File build/prepare-pages-sites.ps1
```

运行前先停掉占用 `build/pages-sites` 的本地测试服务器。脚本会保留每个站点目录下的 `.git`，不会再把主站/AI 的提交历史清空；AI 的源固定为 `build/ai6/site`，不再从主站 dist 复制 1066 页。

## 五、缓存版本怎么升

同时改三处，缺一不可：

1. `build/ui-contract.json` 的 `version`
2. `build/make-static-articles.mjs` 的 `ASSET_VERSION`
3. `build/ai6/schema.py` 的 `ASSET_VERSION`

然后：

```powershell
python build/bump-ui-assets.py
python build/ai6/build_site.py
```

最后跑 `python build/ui-audit.py`，确认所有 HTML 都引用新版本。

## 六、发布前检查

`build/push-site-fast.ps1` 和 `build/deploy-pages.ps1` 已在推送前自动执行 `python build/ui-audit.py`；审计失败会直接终止部署，不会上传半套 UI。仍然建议在本地先手动跑一遍，便于看到完整报告。

最低门槛：

```powershell
python build/ui-audit.py
```

必须看到：

- `8624` 个 HTML（主站 1116；7 个静态分站各 1066；AI 46；其中 404 9 个、app 8 个）
- `nav_header_groups = nav_footer_groups = nav_tabbar_groups`
- `pages_404 = 9`
- `pages_app = 8`
- `failures = {}`

主站正文全量回归：

```powershell
python build/main-regression-20261125.py
```

基线：`1038` 页、`2076` 次检查、`0` 横向溢出、`0` 页面错误、`0` 控制台错误。

AI 站 QA：

```powershell
$env:AI_QA_BASE="http://127.0.0.1:8766"
python build/ai6/qa_site.py
python build/ai6/qa_responsive.py
```

基线：`Failures 0 / Warnings 0`，响应式 `136` 项 `0` 失败。

可访问性：

```powershell
python build/axe-recheck-20261125.py
```

基线：16 个代表页 `0` 违规。

## 七、审计脚本的判定逻辑

`build/ui-audit.py` 逐页检查：

- 是否存在 `.static-page` 和三类壳层；
- 三组导航是否各 9 条、顺序正确、标签唯一、只有一个当前站；
- 当前站是否等于访问站；
- 普通页是否引用 `article.css?v=20261125c`；app 是否引用 `app-shell.css?v=20261125c`；
- 404 是否有 `noindex`；
- 页脚是否有核心链接、日期是否最新；
- 主站/AI 是否有主题入口，分站是否误放相对主题链接；
- 9 站 `article.css` 是否同一哈希、app-shell 是否同一哈希；
- 生成器里的版本常量是否与契约一致；
- staging 流程是否接入 `normalize-host-shell.py`；
- 文章页是否把 `.article-toc` / `.article-body` 留在 `.wrap` 内（检测 `</header></div>` 后直接跟 TOC/正文的结构错误）；
- `article.css` / `app-shell.css` 是否仍有 header/footer 横向 padding 或 27px 内页 h1；
- `.article-toc` 是否仍为居中 `margin:auto`。

任何一项失败，脚本以退出码 `1` 结束，并写入 `build/ui-audit-20261125/ui-consistency.json`。

## 八、当前基线（2026-11-25 c 版本）

- 全站扫描：`8624` 个 HTML，`0` 失败；导航三组各 `8624` 条；404 `9` 个、app `8` 个。
- 结构扫描：两个构建根共 `8,362` 个 `.article-body`，`0` 个在 `.wrap` 外。
- AI 全站几何：`46` 页 × 1280/390，`92` 次测量，`0` 失败；本地、线上各一遍均 `0`。
- 9 站代表页几何：本地 `36` 页 `72` 次测量，线上 `37` 页 `74` 次测量，均 `0` 失败。
- 主站正文回归：`1038` 页 × 2 宽度，`2076` 次检查，`0` 失败、`0` 控制台错误页。
- axe：16 个代表页，`0` 违规。
- AI QA：`Failures 0 / Warnings 0`；响应式 `136` 项，`0` 失败。
- 主站 staging 与 `v2/dist`：`1116` 个 HTML，`0 diffs / 0 missing`。
- `article.css`：`99,354` bytes，原始 `E19CB63906AF`，归一化 `1D70E54E79C4`；`app-shell.css`：`4,775` bytes，`F7F1617757EC`。

## 九、线上复核（2026-11-25 c 版本）

9 个域名全部 `200`，首页、内页与 404 全部引用 `20261125c`；AI 首页同时引用 `article.css` 与 `ai6.css` 的 c 版本。

逐站实测：

| 站点 | 首页 h1 1280/390 | 文章/内页 | 内页 h1 1280/390 | 当前站 |
|---|---:|---|---:|---|
| `tvcn.org` | 48/30 | `/article/16mm/` | 40/28 | `main` |
| `story.tvcn.org` | 48/30 | `/article/16mm/` | 40/28 | `story` |
| `shoot.tvcn.org` | 48/30 | `/article/16mm/` | 40/28 | `shoot` |
| `post.tvcn.org` | 48/30 | `/article/16mm/` | 40/28 | `post` |
| `ai.tvcn.org` | 48/30 | `/short/15s/`、`/en/short/15s/` | 40/28 | `ai` |
| `animation.tvcn.org` | 48/30 | `/article/16mm/` | 40/28 | `animation` |
| `formats.tvcn.org` | 48/30 | `/article/16mm/` | 40/28 | `formats` |
| `tools.tvcn.org` | 48/30 | `/article/16mm/` | 40/28 | `tools` |
| `context.tvcn.org` | 48/30 | `/article/16mm/` | 40/28 | `context` |

补充实测：

- 所有页面 header `59/55`，`scrollWidth = bodyWidth`，`pageerrors = []`。
- 桌面 header/brand/wrap/hero/TOC/body/footer 全部 `x=50`；手机全部 `x=14`；AI `/short/15s/` 中英文一致。
- 主站 `/app/?r=tools`：`40/28`、`x=50/14`，引用 `app-shell.css?v=20261125c`。
- 9 个站 `/404.html`：全部 `200`、h1 `40/28`、`noindex`，内容轨与首页一致。
- AI 英文页 header 的「AI」均有 `aria-current="page"`。
- 9 个站远端提交：main `e0ad265`、ai `def4d93`、story `f94fd90`、shoot `0413cec`、post `9a14815`、animation `536816a`、formats `9b6024a`、tools `4d9f8a3`、context `f3a3919`。

证据文件：`build/ui-audit-20261125/ai-geometry-20261125c.json`、`ai-geometry-live-20261125c.json`、`nine-localhost-20261125c.json`、`nine-sites-live-20261125c.json`、`live-c/ai-15s-live-1280.png`、`live-c/ai-15s-live-390.png`、`deploy-commits.json`。

这份基线是下一次新增内容的最低起点，不是“以后不会再乱”的承诺；每次构建后必须重跑审计。

