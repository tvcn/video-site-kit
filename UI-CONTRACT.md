# TVCN 全站 UI 统一规范

日期：2026-11-25  
适用范围：`tvcn.org` 主站、8 个分站（story / shoot / post / ai / animation / formats / tools / context），以及各站 `/app/` 交互版与 `404.html`。

这份规范不是视觉建议，而是构建与发布时必须满足的约束。机器可读版本是 `build/ui-contract.json`，执行检查是 `python build/ui-audit.py`。

## 一、本轮统一后的结论

全站统一的是 **外壳、画布、导航、页脚、缓存键和特殊页生成方式**；各站的内容组件（卡片、表格、对比块）可以有自己的业务形态，但不能另起一套 header/footer。

- 9 个站的 `assets/article.css` 已是同一个文件：SHA-256 前缀 `91599E1DC350`，99,182 bytes。
- 8 个静态站的正文页、首页、关于页、搜索页、文章索引页统一使用 `.static-page` + `.static-header` + `.static-footer` + `.static-tabbar`。
- `header` 的 9 个站点链接顺序固定，移动端 760px 以下隐藏站点链接，只保留「搜索 / EN / 明暗」和底部 9 站 tabbar。
- 当前站点高亮按 **访问域名** 判断，而不是按文章内容所属编辑台判断。主站所有页面高亮「主站」，分站所有页面高亮自己的站，AI 站高亮「AI」。
- 8 个静态站的 `/app/` 已换成同一套外壳，仅保留 app 自身的内容组件；app 的语言按钮输出 `EN / 中文`，主题按钮输出 `明暗 / Theme`。
- 8 个静态站和 AI 的 `404.html` 都使用浅色当前壳层，带 `noindex,follow`，并提供首页、搜索、全部文章三个出口。
- 所有静态页统一使用 `article.css?v=20261125b`；AI 同时使用 `ai6.css?v=20261125b`；app 使用 `app-shell.css?v=20261125b`。
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

app 必须使用 `/assets/app-shell.css?v=20261125b`，不要再引入完整 `article.css`，以免内容组件的 `.btn`、`.card`、`.wrap` 被全局样式覆盖。

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

- `8624` 个 HTML 左右（主站 + 7 个静态分站各 1065，AI 45，另有 404）
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
- 普通页是否引用 `article.css?v=20261125b`；app 是否引用 `app-shell.css?v=20261125b`；
- 404 是否有 `noindex`；
- 页脚是否有核心链接、日期是否最新；
- 主站/AI 是否有主题入口，分站是否误放相对主题链接；
- 9 站 `article.css` 是否同一哈希、app-shell 是否同一哈希；
- 生成器里的版本常量是否与契约一致；
- staging 流程是否接入 `normalize-host-shell.py`。

任何一项失败，脚本以退出码 `1` 结束，并写入 `build/ui-audit-20261125/ui-consistency.json`。

## 八、当前基线

- 全站扫描：`8624` 个 HTML，`0` 失败。
- 主站正文回归：`1038` 页 × 2 宽度，`0` 失败。
- axe：16 个代表页，`0` 违规。
- AI QA：`Failures 0 / Warnings 0`；响应式 `136` 项，`0` 失败。
- 主站 staging 与 `v2/dist`：1116 个 HTML 全部同哈希。

## 九、线上复核（2026-11-25 推送后）

9 个域名首页全部 `200`，且都引用 `article.css?v=20261125b` 与 `2026-11-25` 页脚日期：

`tvcn.org`、`story.tvcn.org`、`shoot.tvcn.org`、`post.tvcn.org`、`animation.tvcn.org`、`formats.tvcn.org`、`tools.tvcn.org`、`context.tvcn.org`、`ai.tvcn.org`。

生产实测：

- 主站首页：header `59/55`，h1 `48/30`，无横向溢出，当前站 `main`。
- 主站 `/app/`：header `59/55`，h1 `48/30`，引用 `app-shell.css?v=20261125b`，无横向溢出。
- 主站 `/404.html`：header `59/55`，h1 `40/28`，`noindex` 存在。
- 动画站 `/about/`：header `59/55`，h1 `40/28`，当前站 `animation`，页脚不含相对主题链接。
- AI 首页：header `59/55`，h1 `40/27`，当前站 `ai`，页脚保留主题入口。
- 5 个检查页均 `pageerrors = []`，`scrollWidth = bodyWidth`。
- 主站、动画站、AI 的线上 `article.css` 归一化换行后哈希一致：`0F80BF9D51F7`；`app-shell.css` 为 `F623FFFFDEC9`。字节差异只来自 Git 的 CRLF/LF 转换，内容一致。
- 线上 `404.html` 均带 `noindex`。直接访问 `/404.html` 返回的是文件本身（200）；访问真实未知路径时返回 HTTP `404`，但仍是同一套浅色壳层并带 `noindex`。
- 推送提交记录：`build/ui-audit-20261125/deploy-commits.json`。

证据文件：`build/ui-audit-20261125/live-check.txt`、`build/ui-audit-20261125/live/`。

这份基线是下一次新增内容的最低起点，不是“以后不会再乱”的承诺；每次构建后必须重跑审计。
