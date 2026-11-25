# TVCN Site Kit

TVCN 的站点引擎、页面骨架、检索/SEO/路由脚本和发布工具。内容正文与图解在 `video-production-handbook`，公开站点在 `video-production-hub` 和 8 个分站仓。

## UI 唯一基线（2026-11-25）

全站 UI 以本仓 `UI-CONTRACT.md` 和 `ui-contract.json` 为准，版本 `20261125c`：

- 最大画布 `1180px`；桌面 header `59px`，移动端 `55px`。
- 首页 h1 `48/30`，内页 h1 `40/28`（桌面/移动）。
- 共享 `assets/article.css` 与 `assets/app-shell.css`；不要再复制旧样式。
- 导航 9 站顺序固定，当前站高亮按访问域名判断。
- 9 个 `404.html` 使用同一浅色壳层，带 `noindex,follow`。
- 新页面、分站或 404 的生成入口见 `UI-CONTRACT.md`；推送前必须跑 `python build/ui-audit.py`。

`tvcn-ui-v2.html` 是 2026 年早期单文件原型，只作历史参考，**不是新页面的模板，也不代表当前 UI**。新站必须从当前生成器和 `assets/` 取壳。

## 目录

- `tvcn-ui-v2.html`：早期主源单文件原型（仅归档参考）
- `404.html`：当前统一 404，引用 `assets/article.css?v=20261125c`
- `assets/article.css`、`assets/app-shell.css`：当前共享壳层样式
- `ui-contract.json`、`UI-CONTRACT.md`：机器契约与人类规范
- `manifest.webmanifest`、`sw.js`：PWA 安装与离线缓存
- `robots.txt`：抓取规则
- `site-registry.json`：9 个站点仓与共享仓的映射
- `scripts/`：路由、搜索、内容、移动端、无障碍、发布 QA
- `make-release.py`：从 `v2/prototype` 生成 Pages 发布包
- `prepare-pages-sites.ps1`：为 9 个站点生成独立 CNAME 和分站默认入口

## 不放入本仓

- `v2/content/`：Markdown 与图解在 `video-production-handbook`
- `v2/dist/`：构建产物，不提交到源码仓

## 许可

代码与构建脚本：MIT，见 `LICENSE`。文字、术语和原创图解：CC BY-SA 4.0，见内容仓。

