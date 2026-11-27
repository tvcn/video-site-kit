# TVCN 全站 UI 规范

> 最后更新：2026-11-27。本文是构建与发布的约束，不是视觉建议。机器契约见 `site-kit/ui-contract.json` 与 `site-kit/UI-CONTRACT.md`，样式唯一真源是 `site-kit/assets/article.css`。

## 1. 统一的是什么

统一外壳、画布、导航、页脚、缓存键和特殊页生成方式；各站内容组件（卡片、表格、对比块）可以有自己的业务形态，但不能另起一套 header/footer。

- 9 个站发布时都写同一份 `assets/article.css`（构建直接复制 `site-kit/assets/article.css`），不允许站点目录里各存一份。
- 静态页统一 `body.static-page` + `.static-header` + `.static-main` + `.static-footer` + `.static-tabbar`。
- header 的 9 个站点链接顺序固定；760px 以下隐藏站点链接，只保留「搜索 / EN / 明暗」与底部 tabbar。
- 当前站高亮按访问域名判断，不按文章所属编辑台。
- AI 站额外有 `ai6-subnav`；术语表是 980px 窄版。除这两类，其他宽度差异视为回归。

## 2. 设计令牌

| 项目 | 值 |
|---|---|
| 内容最大宽度 | `1180px` |
| 正文宽度 | 文章 `760px`；关于等内页 `680–760px`；术语表 `980px` |
| 桌面 header 高度 | `59px`（1280 视口） |
| 移动 header 高度 | `55px`（390 视口） |
| 首页 h1 | `48px` / 移动 `30px` |
| 内页与文章 h1 | `40px` / 移动 `28px` |
| 亮色 | 背景 `#f4f1eb`、墨色 `#171513`、强调 `#b04421` |
| 暗色 | 背景 `#0d100f`、墨色 `#f3efe7`、强调 `#ff8a5b` |

字体栈：

```css
-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC",
"PingFang SC", "Microsoft YaHei", sans-serif
```

## 3. 内容轨

所有页面的 header、正文容器、文章 TOC、正文、footer 必须在同一条左轨：

| 视口 | 左轨 x | 内容宽 | 文章正文宽 |
|---|---:|---:|---:|
| 1280px | `50px` | `1180px` | `760px` |
| 390px | `14px` | `362px` | `362px` |

要求：

- `.static-header-inner`、`.static-footer-inner`、`.footer-sites`、`main .wrap` 的 x 相同。
- `.article-hero`、`.article-toc`、`.article-body` 都必须在同一个 `.wrap` 内；TOC 左对齐。
- `.article-body` 不能作为 `.wrap` 的兄弟节点直接挂 `body`。

## 4. 外壳结构

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

三组链接（header / footer / tabbar）各 9 条，组内标签唯一，只有一个 `aria-current="page"`，且等于当前访问站的 `data-site-nav`。

页脚核心链接：所有站点 `关于 / 术语表 / 搜索 / 交互版`；主站与 AI 额外「主题」（AI 用绝对地址 `https://tvcn.org/topics/`）；分站不出现相对 `topics/`。

禁止：`<header class="site-header">`、`<footer class="site-footer">`、`class="brand-mark"`、旧方形 `TV` 标志、过期 `article.css?v=…`、页脚旧日期。

## 5. 改 UI 怎么走

1. 样式只改 `site-kit/assets/article.css`（或 `app-shell.css`），不要改 `out/`、`deploy/` 里的副本。
2. 外壳结构改 `generator/build-site.mjs` 的 `page()/header()/footer()/tabbar()`；AI 站改 `generator/ai6/templates`。
3. 交互壳改 `app/tvcn-ui-v2.html`，只发布到主站 `/app/`。
4. 404 / robots / manifest / sw 改 `site-kit/shell/`。
5. 升缓存版本时同步改：`site-kit/ui-contract.json` 的 `version`、`generator/build-site.mjs` 的 `ASSET_VERSION`、`generator/ai6/schema.py` 的 `ASSET_VERSION`。
6. 跑 `node generator\build-all.mjs`，再按第 6 节抽查。

## 6. 改完抽查

- 390 与 1280 两个宽度：首页、文章页、搜索页、404，无横向溢出（`scrollWidth == bodyWidth`）。
- header/footer/正文左轨 x 一致：桌面 50、手机 14。
- 三组导航各 9 条，当前站高亮正确。
- 文章 TOC、正文、hero 都在 `.wrap` 内。
- `/app/` 只引用 `app-shell.css`；文章页只引用 `article.css`。
- 9 站 `assets/article.css` 与 `site-kit/assets/article.css` 字节一致（构建自动复制，构建后抽查即可）。

当前基线：390/1280 烟测通过，页头/页脚/底栏齐全；9 站全量视觉截图回归尚未重跑。
