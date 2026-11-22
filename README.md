# TVCN Site Kit

TVCN 的站点引擎、页面骨架、检索/SEO/路由脚本和发布工具。内容正文与图解在 `video-production-handbook`，公开站点在 `video-production-hub` 和 8 个分站仓。

## 目录

- `tvcn-ui-v2.html`：主源单文件页面（含路由、双语、搜索、主题、文章渲染）
- `404.html`：GitHub Pages 404
- `manifest.webmanifest`、`sw.js`：PWA 安装与离线缓存
- `robots.txt`：抓取规则
- `site-registry.json`：9 个站点仓与共享仓的映射
- `scripts/`：路由、搜索、内容、移动端、无障碍、发布 QA
- `make-release.py`：从 `v2/prototype` 生成 Pages 发布包
- `prepare-pages-sites.ps1`：为 9 个站点生成独立 CNAME 和分站默认入口

## 不放入本仓

- `assets/`：图片、音频和图标随内容仓或发布包走
- `v2/content/`：Markdown 与图解在 `video-production-handbook`
- `v2/dist/`：构建产物，不提交到源码仓

## 许可

代码与构建脚本：MIT，见 `LICENSE`。文字、术语和原创图解：CC BY-SA 4.0，见内容仓。
