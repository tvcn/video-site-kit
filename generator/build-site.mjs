// Generate one site's bilingual article pages, indexes and sitemap.
// Input: generator/data/static-articles-data.json + site-kit/sites.json.
// Output: out/<site>/ (assembled by generator/assemble-site.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { EDITORIAL_DEPTH } from './data/editorial-depth.mjs';
import { EDITORIAL_HISTORY } from './data/editorial-history.mjs';
import { EDITORIAL_TOOLS } from './data/editorial-tools-extra.mjs';
import { EDITORIAL_CALCULATORS } from './data/editorial-calculators.mjs';
import { EDITORIAL_START } from './data/editorial-start.mjs';
import { EDITORIAL_TEMPLATES } from './data/editorial-templates.mjs';
import { EDITORIAL_SHORT_A } from './data/editorial-short-a.mjs';
import { EDITORIAL_SHORT_B } from './data/editorial-short-b.mjs';
import { EDITORIAL_SHORT_C } from './data/editorial-short-c.mjs';
import { EDITORIAL_SHORT_D } from './data/editorial-short-d.mjs';
import { EXPANSION_CASES_20261124 } from './data/editorial-cases-20261124.mjs';
import { EXPANSION_BUSINESS_20261124 } from './data/editorial-business-20261124.mjs';
import { EXPANSION_CRAFT_20261124 } from './data/editorial-craft-20261124.mjs';
import { EXPANSION_SHORT_20261124 } from './data/editorial-short-20261124.mjs';
import { EXPANSION_EXPERIMENTAL_20261124 } from './data/editorial-experimental-20261124.mjs';
import { BUYING_PROTOCOLS_20261124 } from './data/editorial-buying-20261124.mjs';
import { EXPANSION_SOURCE_GAP_20261124 } from './data/editorial-source-gap-20261124.mjs';
import { EXPANSION_FOV_20261124 } from './data/editorial-fov-20261124.mjs';
import { BREAKDOWN_NOTES_20261124 } from './data/editorial-breakdown-notes-20261124.mjs';
import { CALCULATOR_IDS, CALC_WIDGETS, CALCULATOR_JS } from './data/calculator-widgets.mjs';
const BASE_EDITORIAL_EXTRA = { ...EDITORIAL_START, ...EDITORIAL_TEMPLATES, ...EDITORIAL_SHORT_A, ...EDITORIAL_SHORT_B, ...EDITORIAL_SHORT_C, ...EDITORIAL_SHORT_D, ...EDITORIAL_DEPTH, ...EDITORIAL_HISTORY, ...EDITORIAL_TOOLS, ...EDITORIAL_CALCULATORS };
const EXPANSION_CASE_ALIASES = {
  tutorial: 'tutorial-structure',
  'short-drama': 'vertical-drama',
  event: 'event-structure',
  interview: 'interview-structure'
};
const EXPANSION_CASES_ALIASED = { ...EXPANSION_CASES_20261124 };
for (const [source, target] of Object.entries(EXPANSION_CASE_ALIASES)) {
  if (EXPANSION_CASES_ALIASED[source]) {
    EXPANSION_CASES_ALIASED[target] = EXPANSION_CASES_ALIASED[source];
    delete EXPANSION_CASES_ALIASED[source];
  }
}
for (const extra of Object.values(EXPANSION_CASES_ALIASED)) {
  extra.zh = String(extra.zh || '').replace('</h2>', '</h2><p class="case-disclosure">案例说明：匿名复合复盘，来自多个同类型项目的合并与改写；金额为区间，人物、地点与客户信息已隐去，不对应单一真实客户。</p>');
  extra.en = String(extra.en || '').replace('</h2>', '</h2><p class="case-disclosure">Case note: an anonymised composite of several similar projects. Figures are ranges; people, places and clients are withheld. It does not represent one real client job.</p>');
}
const EXPANSION_EXTRA = {};
for (const group of [EXPANSION_CASES_ALIASED, EXPANSION_BUSINESS_20261124, EXPANSION_CRAFT_20261124, EXPANSION_SHORT_20261124, EXPANSION_EXPERIMENTAL_20261124, BUYING_PROTOCOLS_20261124, EXPANSION_SOURCE_GAP_20261124, EXPANSION_FOV_20261124]) {
  for (const [id, extra] of Object.entries(group)) {
    const old = EXPANSION_EXTRA[id] || { zh: '', en: '' };
    EXPANSION_EXTRA[id] = {
      zh: `${old.zh || ''}${extra.zh || ''}`,
      en: `${old.en || ''}${extra.en || ''}`
    };
  }
}
const EDITORIAL_EXTRA = { ...BASE_EDITORIAL_EXTRA };
for (const [id, extra] of Object.entries(EXPANSION_EXTRA)) {
  const old = EDITORIAL_EXTRA[id] || { zh: '', en: '' };
  EDITORIAL_EXTRA[id] = {
    zh: `${old.zh || ''}${extra.zh || ''}`,
    en: `${old.en || ''}${extra.en || ''}`
  };
}

const root = 'C:/Users/chenhua/Desktop/tvcn';
const argv = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)=(.*)$/);
  return m ? [m[1], m[2]] : [a.replace(/^--/, ''), 'true'];
}));
const SITE_ID = argv.site || 'main';
const SITE_REGISTRY = JSON.parse(fs.readFileSync(path.join(root, 'site-kit/sites.json'), 'utf8'));
const SITE_CFG = SITE_REGISTRY.sites.find((s) => s.id === SITE_ID);
if (!SITE_CFG) throw new Error(`unknown site: ${SITE_ID}`);
const IS_MAIN = SITE_ID === 'main';
const CONTENT_SITE = SITE_CFG.content_site || SITE_ID;
const dataPath = path.join(root, 'generator/data/static-articles-data.json');
const outRoot = path.join(root, 'out', SITE_ID);
fs.rmSync(outRoot, { recursive: true, force: true });
fs.mkdirSync(outRoot, { recursive: true });
const SITE = `https://${SITE_CFG.domain}`;
const MAIN_SITE = 'https://tvcn.org';
const OG_FALLBACK = 'assets/og-cover.png';
const ASSET_VERSION = '20261127';
const DATE_PUBLISHED = '2026-11-20';
const DATE_MODIFIED = '2026-11-27';
const AI_LEGACY_MAP = JSON.parse(fs.readFileSync(path.join(root, 'generator/data/ai-legacy-map.json'), 'utf8'));

const TEMPLATE_IDS = ['talking-head-template','product-ad-template','documentary-template','brand-film-template','short-drama-template','vlog-template','news-template','tutorial-template','music-video-template','wedding-template','event-template','interview-template','corporate-video-template','sports-video-template','food-video-template','real-estate-video-template','fashion-beauty-video-template','live-podcast-template'];
const TOPICS = [
  { slug: 'main-craft', site: 'main', zh: '手艺与判断', en: 'Craft and judgement', dz: '从定义问题到验收交付：先判断这片子要解决什么，再选方法，最后用可检查的结果收尾。', de: 'From defining the problem to accepting the deliverable: decide what the film must solve, choose the method, and close with a checkable result.', keys: ['判断', '方法', '手艺', '练习', '训练', '验收', '流程'] },
  { slug: 'main-business', site: 'main', zh: '业务与交付', en: 'Business and delivery', dz: '报价、合同、授权、保险与跨境交付：把范围写清，把改动计价，把风险留在合同里。', de: 'Quotes, contracts, rights, insurance and cross-border delivery: write scope down, price revisions, and keep risk inside the contract.', keys: ['业务', '合同', '报价', '授权', '保险', '发票', '客户', '预算'] },
  { slug: 'story-writing', site: 'story', zh: '编剧与人物', en: 'Writing and character', dz: '人物想要什么、被什么挡住、对白怎么不解释；先让冲突成立，再谈台词漂亮。', de: 'What a character wants, what blocks it, and dialogue that does not explain: make the conflict real before making the lines pretty.', keys: ['编剧', '人物', '对白', '冲突', '欲望', '角色', '潜台词'] },
  { slug: 'story-structure', site: 'story', zh: '结构与分镜', en: 'Structure and boards', dz: '开场、场景、转折、节奏与分镜：观众先知道跟谁走，镜头才知道该看什么。', de: 'Opening, scene, turn, pace and storyboards: once the audience knows whom to follow, the camera knows what to look at.', keys: ['结构', '分镜', '节奏', '场景', '开场', '转折', '故事'] },
  { slug: 'shoot-exposure', site: 'shoot', zh: '曝光与构图', en: 'Exposure and frame', dz: '曝光、构图、机位与运镜：先保证每条都能剪，再谈镜头风格。', de: 'Exposure, composition, camera position and movement: make every take editable before chasing a style.', keys: ['曝光', '构图', '机位', '运镜', '镜头', '画幅'] },
  { slug: 'shoot-light', site: 'shoot', zh: '灯光', en: 'Lighting', dz: '一扇窗、一盏灯、一块反光板：先有方向，再谈氛围；先保肤色，再谈造型。', de: 'A window, one lamp, one bounce: direction first, mood second; skin first, shape second.', keys: ['灯光', '窗光', '布光', '色温', '柔光', '反光'] },
  { slug: 'shoot-sound', site: 'shoot', zh: '现场声音', en: 'Location sound', dz: '话筒位置、环境声、无线与备份：声音坏了，画面很难救回来。', de: 'Mic position, room tone, wireless and backup: once sound is broken, pictures are hard to rescue.', keys: ['声音', '录音', '话筒', '无线', '环境声', '现场'] },
  { slug: 'post-edit', site: 'post', zh: '剪辑与节奏', en: 'Editing and pace', dz: '剪辑点、节奏、J-cut 与 L-cut：让观众在下一句之前就想听。', de: 'Cut points, pace, J-cuts and L-cuts: make the audience want the next line before it arrives.', keys: ['剪辑', '节奏', '叙事', 'J-cut', 'L-cut', '转场'] },
  { slug: 'post-color', site: 'post', zh: '调色与合成', en: 'Color and compositing', dz: '先统一，再风格；合成先让两层信同一种光，再谈特效。', de: 'Unify first, stylise second; make both layers believe the same light before adding effects.', keys: ['调色', '合成', '抠像', '输出', '色彩'] },
  { slug: 'post-audio', site: 'post', zh: '声音后期与字幕', en: 'Post audio and subtitles', dz: '降噪、混音、字幕与交付：先修可修的，再谈氛围；字幕是读的，不是抄的。', de: 'Noise reduction, mix, subtitles and delivery: fix what can be fixed, then add mood; subtitles are read, not transcribed.', keys: ['声音', '混音', '噪声', '字幕', '后期'] },
  { slug: 'animation-2d', site: 'animation', zh: '二维动画', en: '2D animation', dz: '原画、口型、循环与时间感：两张原画之间，决定动作的重量。', de: 'Key drawings, lip sync, cycles and timing: the space between two drawings decides the weight of a move.', keys: ['2D', '二维', '原画', '口型', '循环', '时间', '动画'] },
  { slug: 'animation-3d', site: 'animation', zh: '三维与管线', en: '3D and pipeline', dz: '绑定、材质、渲染、合成与管线：先锁资产，再谈镜头；先算时间，再谈质量。', de: 'Rigging, materials, rendering, compositing and pipeline: lock assets before shots, budget time before quality.', keys: ['3D', '三维', '绑定', '渲染', '管线', '合成', '材质'] },
  { slug: 'formats-brand', site: 'formats', zh: '广告与品牌', en: 'Ads and brands', dz: '产品广告、品牌片、企业宣传：三秒问题、十秒证明，最后落回一句可相信的话。', de: 'Product ads, brand films, corporate videos: a three-second problem, ten seconds of proof, and one believable closing line.', keys: ['广告', '品牌', '企业', '产品'] },
  { slug: 'formats-doc', site: 'formats', zh: '纪录与活动', en: 'Documentary and events', dz: '纪录、访谈、活动与婚礼：先保现场，再谈风格；先让人物成立，再让流程好看。', de: 'Documentary, interview, event and wedding: protect the scene before styling it; make the person real before making the process look good.', keys: ['纪录', '访谈', '活动', '婚礼', '采访', '现场'] },
  { slug: 'formats-social', site: 'formats', zh: '短视频与直播', en: 'Short form and live', dz: '竖屏短剧、Vlog、教程、直播与播客：前三秒先给理由，后面才有停留。', de: 'Vertical drama, vlog, tutorial, live and podcast: give a reason in the first three seconds, then earn the stay.', keys: ['短剧', '竖屏', 'Vlog', '直播', '播客', '教程', '封面'] },
  { slug: 'tools-camera', site: 'tools', zh: '机身与镜头', en: 'Bodies and lenses', dz: '机身、镜头、取景与稳定：先问拍什么，再问买什么；参数不等于画面。', de: 'Bodies, lenses, framing and support: ask what you shoot before what you buy; specs are not pictures.', keys: ['机身', '镜头', '相机', '取景', '对焦', '画质'] },
  { slug: 'tools-support', site: 'tools', zh: '支撑与稳定', en: 'Support and stability', dz: '三脚架、云台、肩托与移动：稳定不是配件，是镜头能成立的前提。', de: 'Tripods, gimbals, shoulder rigs and movement: stability is not an accessory, it is what makes a shot hold.', keys: ['三脚架', '云台', '稳定', '肩托', '移动', '支撑'] },
  { slug: 'tools-light-audio', site: 'tools', zh: '灯光与录音', en: 'Light and sound gear', dz: 'LED、柔光、无线麦与录音机：先解决方向与距离，再谈功率与品牌。', de: 'LEDs, diffusion, wireless mics and recorders: solve direction and distance before power and brand.', keys: ['灯', '柔光', '无线', '话筒', '录音', '音频', '麦克'] },
  { slug: 'tools-storage', site: 'tools', zh: '存储与备份', en: 'Storage and backup', dz: '卡、硬盘、NAS 与 3-2-1：先算容量与时长，再谈速度；先能恢复，再谈便宜。', de: 'Cards, drives, NAS and 3-2-1: calculate capacity and runtime before speed; make recovery possible before making it cheap.', keys: ['存储', '硬盘', 'NAS', '备份', '卡', '容量', 'RAID'] },
  { slug: 'tools-post', site: 'tools', zh: '导出与软件', en: 'Export and software', dz: '编码、导出、软件与交付：先问平台和用途，再选参数；先能重做，再谈一键。', de: 'Codecs, exports, software and delivery: ask the platform and purpose before the settings; keep it reproducible before one-click.', keys: ['导出', '编码', '软件', '交付', '代理', '项目'] },
  { slug: 'context-history', site: 'context', zh: '影像史', en: 'Image history', dz: '摄影、电影、动画与电视的技术史：今天的工具不是凭空来的，每个限制都留下过痕迹。', de: 'A technical history of photography, film, animation and TV: today tools did not appear from nowhere; every limit left a mark.', keys: ['影像史', '摄影', '电影', '动画', '电视', '历史', '胶片'] },
  { slug: 'context-literacy', site: 'context', zh: '媒介与伦理', en: 'Media and ethics', dz: '媒介、伦理、法律与算法：看懂画面，也看懂画面背后的条件、权力与责任。', de: 'Media, ethics, law and algorithms: read the image, and read the conditions, power and responsibility behind it.', keys: ['媒介', '伦理', '法律', '算法', '广告', '版权', '平台'] }
];

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const metaPath = path.join(root, 'generator/data/static-meta.json');
const staticMeta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf8')) : {};
if (!Array.isArray(data.zh) || !data.zh.length) throw new Error('bad zh data');
if (!Array.isArray(data.en) || data.en.length !== data.zh.length) throw new Error('zh/en length mismatch');
const COUNT = data.en.filter((a) => a.site !== 'ai').length;
const contentIndexPath = path.join(root, 'content/index.json');
const contentIndex = fs.existsSync(contentIndexPath) ? JSON.parse(fs.readFileSync(contentIndexPath, 'utf8')) : { items: [] };
const typeBySlug = new Map();
for (const item of contentIndex.items || []) {
  if (item.lang === 'zh' && item.slug) typeBySlug.set(item.slug, item.type || 'article');
}
for (const lang of ['zh', 'en']) {
  for (const article of data[lang]) {
    article.type = typeBySlug.get(article.id) || article.type || 'article';
  }
}
const SITE_AUTHOR = {
  main: ['TVCN 编辑部', 'TVCN Editorial'],
  story: ['TVCN 故事组', 'TVCN Story Desk'],
  shoot: ['TVCN 拍摄组', 'TVCN Shoot Desk'],
  post: ['TVCN 后期组', 'TVCN Post Desk'],
  ai: ['TVCN AI 组', 'TVCN AI Desk'],
  animation: ['TVCN 动画组', 'TVCN Animation Desk'],
  formats: ['TVCN 片型组', 'TVCN Formats Desk'],
  tools: ['TVCN 工具组', 'TVCN Tools Desk'],
  context: ['TVCN 研究组', 'TVCN Research Desk']
};

const NAV_SITES = [
  { id: 'main', domain: 'tvcn.org', zh: '主站', en: 'Main' },
  { id: 'story', domain: 'story.tvcn.org', zh: '故事', en: 'Story' },
  { id: 'shoot', domain: 'shoot.tvcn.org', zh: '拍摄', en: 'Shoot' },
  { id: 'post', domain: 'post.tvcn.org', zh: '后期', en: 'Post' },
  { id: 'ai', domain: 'ai.tvcn.org', zh: 'AI', en: 'AI' },
  { id: 'animation', domain: 'animation.tvcn.org', zh: '动画', en: 'Animation' },
  { id: 'formats', domain: 'formats.tvcn.org', zh: '片型', en: 'Formats' },
  { id: 'tools', domain: 'tools.tvcn.org', zh: '工具', en: 'Tools' },
  { id: 'context', domain: 'context.tvcn.org', zh: '影像史', en: 'History' }
];
const SITE_START = {
  story: ['obstacle-escalation', 'scene-sequence', 'midpoint-turn', 'ending-choice', 'script-format'],
  shoot: ['blocking', 'coverage', 'sensor-size', 'waveform', 'set-safety'],
  post: ['fine-cut', 'proxy-workflow', 'primary-correction', 'loudness', 'qc'],
  ai: ['ai-start-here', 'ai-first-video', 'ai-video-anatomy', 'workflow-script-to-screen', 'ai-generate-select'],
  animation: ['animation-principles', 'blockout', 'rigging', 'animatic-pipeline', 'asset-handoff'],
  formats: ['talking-head-breakdown', 'product-ad-breakdown', 'short-drama-breakdown', 'vlog-structure', 'news-structure'],
  tools: ['cine-camera', 'prime-lens', 'lav-system', 'led-panel', 'backup-3-2-1'],
  context: ['camera-obscura', 'montage', 'platform-rules', 'portrait-rights', 'music-license']
};
const ICON_ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"></path></svg>`;
function siteNavLinks(lang, className, currentSite = '') {
  return NAV_SITES.map((s) => `<a class="${className}" href="https://${s.domain}/" data-site-nav="${s.id}"${s.id === currentSite ? ' aria-current="page"' : ''}>${lang === 'en' ? s.en : s.zh}</a>`).join('');
}

function authorFor(id, lang, site) {
  const m = staticMeta[id] && staticMeta[id][lang];
  if (m && m.author) return m.author;
  const pair = SITE_AUTHOR[site] || SITE_AUTHOR.main;
  return lang === 'en' ? pair[1] : pair[0];
}
function verifiedFor(id, lang) {
  const m = staticMeta[id] && staticMeta[id][lang];
  return (m && m.verified) || DATE_MODIFIED;
}
function appHref(prefix, lang, route) {
  const params = [];
  if (lang === 'en') params.push('lang=en');
  if (route) params.push(`r=${route}`);
  return `${prefix}app/${params.length ? `?${params.join('&')}` : ''}`;
}

function esc(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
function ogImage(image) {
  const src = String(image || '');
  const clean = (/\.svg$/i.test(src) || !src) ? OG_FALLBACK : src;
  return SITE + '/' + clean.replace(/^\.?\//, '');
}
function stripTags(html) {
  return String(html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
// 正文已经写进 Markdown，旧的补丁块只在缺失时注入，避免同一标题出现两次。
function firstHeading(fragment) {
  const m = String(fragment || '').match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  return m ? stripTags(m[1]).replace(/\s+/g, ' ').trim() : '';
}
function uniqueBlocks(html, fragment) {
  const text = String(fragment || '');
  let blocks = text.split(/(?=<section[\s>])/i).filter((b) => b.trim());
  if (blocks.length < 2) blocks = text.split(/(?=<h2[\s>])/i).filter((b) => b.trim());
  const seen = stripTags(html);
  return blocks.filter((block) => {
    const heading = firstHeading(block);
    return !heading || !seen.includes(heading);
  }).join('');
}

const ASSET_ROOT = path.join(root, 'assets');
const imageSizeCache = new Map();
function svgSize(buffer) {
  const text = buffer.toString('utf8', 0, Math.min(buffer.length, 4096));
  const open = text.match(/<svg\b[^>]*>/i);
  if (!open) return null;
  const tag = open[0];
  const view = tag.match(/\bviewBox="([^"]+)"/i);
  if (view) {
    const parts = view[1].trim().split(/\s+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      return { width: Math.round(parts[2]), height: Math.round(parts[3]) };
    }
  }
  const width = tag.match(/\bwidth="([0-9.]+)(?:px)?"/i);
  const height = tag.match(/\bheight="([0-9.]+)(?:px)?"/i);
  if (width && height) return { width: Math.round(Number(width[1])), height: Math.round(Number(height[1])) };
  return null;
}
function jpegSize(buffer) {
  let offset = 2;
  const sof = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    const length = buffer.readUInt16BE(offset);
    if (length < 2) break;
    if (sof.has(marker)) {
      const height = buffer.readUInt16BE(offset + 3);
      const width = buffer.readUInt16BE(offset + 5);
      if (width && height) return { width, height };
    }
    offset += length;
  }
  return null;
}
function imageSize(src) {
  const clean = String(src || '').split(/[?#]/)[0];
  if (!clean.startsWith('assets/')) return null;
  if (imageSizeCache.has(clean)) return imageSizeCache.get(clean);
  const file = path.join(ASSET_ROOT, clean.slice('assets/'.length));
  let result = null;
  try {
    const buffer = fs.readFileSync(file);
    if (buffer.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
      result = { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    } else if (buffer.slice(0, 2).equals(Buffer.from([0xff, 0xd8]))) {
      result = jpegSize(buffer);
    } else if (/\.svg$/i.test(clean) || /^<svg\b/i.test(buffer.toString('utf8', 0, 8))) {
      result = svgSize(buffer);
    } else if (buffer.slice(0, 6).toString('ascii') === 'GIF89a' || buffer.slice(0, 6).toString('ascii') === 'GIF87a') {
      result = { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
    }
  } catch (error) {
    result = null;
  }
  imageSizeCache.set(clean, result);
  return result;
}
function addImageDimensions(html) {
  return String(html || '').replace(/<img\b[^>]*>/gi, (tag) => {
    const src = tag.match(/\bsrc="([^"]+)"/i);
    if (!src) return tag;
    const size = imageSize(src[1]);
    if (!size || !size.width || !size.height) return tag;
    const hasWidth = /\bwidth=/i.test(tag);
    const hasHeight = /\bheight=/i.test(tag);
    if (hasWidth && hasHeight) return tag;
    const closing = tag.endsWith('/>') ? '/>' : '>';
    let next = tag.slice(0, -closing.length);
    if (!hasWidth) next += ` width="${size.width}"`;
    if (!hasHeight) next += ` height="${size.height}"`;
    return next + closing;
  });
}
function addArticleToc(html, lang) {
  const headings = String(html || '').match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [];
  if (headings.length < 3) return html;
  let index = 0;
  const items = [];
  let output = String(html).replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, content) => {
    index += 1;
    const existing = attrs.match(/\bid="([^"]+)"/i);
    const id = existing ? existing[1] : `section-${index}`;
    const label = stripTags(content).trim();
    items.push({ id, label });
    const nextAttrs = existing ? attrs : `${attrs} id="${id}"`;
    return `<h2${nextAttrs}>${content}</h2>`;
  });
  const label = lang === 'en' ? 'On this page' : '本文目录';
  const list = items.map((item) => `<li><a href="#${esc(item.id)}">${esc(item.label)}</a></li>`).join('');
  const nav = `<nav class="article-toc" aria-label="${label}"><span class="toc-label">${label}</span><ol>${list}</ol></nav>`;
  const headerEnd = output.indexOf('</header>');
  if (headerEnd !== -1) return output.slice(0, headerEnd + 9) + nav + output.slice(headerEnd + 9);
  return output.replace(/<div class="wrap">/i, `<div class="wrap">${nav}`);
}
function reflowAI84Visuals(html) {
  const output = String(html);
  const heroStart = output.indexOf('<figure class="article-media inline-media"');
  if (heroStart < 0) return output;
  const heroEnd = output.indexOf('</figure>', heroStart);
  if (heroEnd < 0) return output;
  const hero = output.slice(heroStart, heroEnd + 9);
  let body = output.slice(0, heroStart) + output.slice(heroEnd + 9);
  const diagramStart = body.indexOf('<figure class="diagram"');
  let diagram = '';
  if (diagramStart >= 0) {
    const diagramEnd = body.indexOf('</figure>', diagramStart);
    if (diagramEnd >= 0) {
      diagram = body.slice(diagramStart, diagramEnd + 9);
      body = body.slice(0, diagramStart) + body.slice(diagramEnd + 9);
    }
  }
  const articleHeader = body.indexOf('<header class="article-hero"');
  if (articleHeader >= 0) {
    const headerEnd = body.indexOf('</header>', articleHeader);
    if (headerEnd >= 0) {
      const at = headerEnd + 9;
      body = body.slice(0, at) + hero + body.slice(at);
    }
  }
  if (diagram) {
    const section4 = body.indexOf('<section><h2 id="section-4"');
    if (section4 >= 0) {
      body = body.slice(0, section4) + diagram + body.slice(section4);
    } else {
      const articleEnd = body.lastIndexOf('</article>');
      body = articleEnd >= 0 ? body.slice(0, articleEnd) + diagram + body.slice(articleEnd) : body + diagram;
    }
  }
  return body;
}
function addEditorialDepth(html, id, lang) {
  if (String(html).includes('data-content-v2="1"')) return html;
  const extra = EDITORIAL_EXTRA[id];
  if (!extra || !extra[lang]) return html;
  const payload = uniqueBlocks(html, extra[lang]);
  if (!payload.trim()) return html;
  let output = String(html);
  output = output.replace(/(<article class="article-body">)([\s\S]*?<\/section>)([\s\S]*?)(?=<\/article>)/i, (match, open, first, rest) => (
    `${open}${first}<section class="editorial-depth">${payload}</section>${rest}</article>`
  ));
  if (!output.includes('editorial-depth')) {
    output = output.replace(/(<section class="article-body">)([\s\S]*?)<\/section>/i, (match, open, inner) => (
      `${open}${inner}<section class="editorial-depth">${payload}</section></section>`
    ));
  }
  if (id.startsWith('tool-card-')) {
    output = output.replace(/<section><h2[^>]*>(?:怎么做|Do this)<\/h2>[\s\S]*?<\/section>/i, '');
  }
  return output;
}
function personalizeGenericIntros(html, article, lang) {
  const title = stripTags(article.title || '').trim();
  if (!title) return html;
  if (lang === 'en') {
    return String(html)
      .replaceAll('Check these three causes first; each has an observable signal and a five-minute test.', `For “${title}”, check three directions first. Change one variable, record a 30-second comparison, and see which link the change follows.`)
      .replaceAll('These three moves make it worse; if one appears, stop and return to diagnosis.', `With “${title}”, these three moves make it worse. Pick one replacement action and do not change three variables at once.`);
  }
  return String(html)
    .replaceAll('先按这三个原因排查，每个原因都要有一个现场能观察到、五分钟能验证的信号。', `针对“${title}”，先按三个方向排查；每次只改一个变量，改完录 30 秒对比，看变化跟着哪个环节走。`)
    .replaceAll('下面三种做法会让问题更糟；出现任意一种，先停下来回到诊断。', `处理“${title}”时，下面三种做法会更糟；先选一个替换动作，别同时改三个变量。`);
}
const AUDIO_MAP = {
  'brand-film': 'fmt-brand-film',
  documentary: 'fmt-documentary',
  'event-structure': 'fmt-event',
  'experimental-structure': 'fmt-experimental',
  'interview-structure': 'fmt-interview',
  'music-video-structure': 'fmt-music-video',
  'news-structure': 'fmt-news',
  'product-ad': 'fmt-product-ad',
  'vertical-drama': 'fmt-short-drama',
  'talking-head': 'fmt-talking-head',
  'tutorial-structure': 'fmt-tutorial',
  'vlog-structure': 'fmt-vlog',
  'wedding-structure': 'fmt-wedding',
  'audio-position': 'tool-audio-position',
  'backup-3-2-1': 'tool-backup-3-2-1',
  'budget-map': 'tool-budget-map',
  'camera-choice': 'tool-camera-choice',
  'export-h264': 'tool-export-h264',
  'lav-system': 'tool-lav-system',
  'lighting-one-light': 'tool-lighting-one-light',
  tripod: 'tool-tripod'
};
function addAudioDemo(html, id, lang) {
  const base = AUDIO_MAP[id];
  if (!base) return html;
  const folder = lang === 'en' ? 'en' : 'zh';
  const root = lang === 'en' ? '../../../assets/audio' : '../../assets/audio';
  const caption = lang === 'en'
    ? '20-second audio demo: one check point and the most common failure. Transcript and steps are in the article.'
    : '20 秒语音演示：一个检查点和最常见的失败。文字稿与步骤在正文里。';
  return String(html).replace('</article>', `<figure class="article-audio"><audio controls preload="none" src="${root}/${folder}/${base}.${lang}.mp3"></audio><figcaption>${caption}</figcaption></figure></article>`);
}
function addFigureNature(html, lang) {
  const zh = lang === 'zh';
  const note = zh ? '编辑示意图，不是本页实测照片。' : 'Editorial illustration, not a test photograph from this page.';
  return String(html).replace(/<figure([^>]*)>([\s\S]*?)<\/figure>/gi, (match, attrs, inner) => {
    if (/<(audio|video)\b/i.test(inner)) return match;
    const labelled = /<figcaption[\s\S]*?<\/figcaption>/i.test(inner)
      ? inner.replace(/(<figcaption[^>]*>)([\s\S]*?)(<\/figcaption>)/i, (m, open, text, close) => `${open}${text} <span class="fig-nature">${note}</span>${close}`)
      : `${inner}<figcaption><span class="fig-nature">${note}</span></figcaption>`;
    return `<figure${attrs} data-image-nature="editorial-illustration">${labelled}</figure>`;
  });
}
function addCalculatorWidget(html, id, lang) {
  if (!CALCULATOR_IDS.includes(id)) return html;
  const widget = CALC_WIDGETS[lang] && CALC_WIDGETS[lang][id];
  if (!widget) return html;
  let output = String(html);
  if (!output.includes(`data-calculator="${id}"`)) output = output.replace('</article>', `${widget}</article>`);
  if (!output.includes('calculators.js')) output = output.replace('</article>', '<script src="/assets/calculators.js" defer></script></article>');
  return output;
}
function addExpansionSource(html, id, lang, site) {
  if (!EXPANSION_EXTRA[id] || String(html).includes('data-expansion-source')) return html;
  const zh = lang === 'zh';
  const internal = site === 'main'
    ? [['contract-scope', zh ? '合同范围' : 'Contract scope'], ['invoice-tax-cross-border', zh ? '跨境制作发票与税务' : 'Cross-border invoicing'], ['insurance-equipment', zh ? '器材与制作保险' : 'Gear and production insurance']]
    : [['test-protocols', zh ? '测试协议' : 'Test protocol'], ['about', zh ? '编辑标准' : 'Editorial standards']];
  const external = {
    animation: [['https://docs.blender.org/manual/en/latest/', 'Blender Manual'], ['https://helpx.adobe.com/after-effects/user-guide.html', 'After Effects User Guide'], ['https://docs.toonboom.com/', 'Toon Boom Documentation']],
    ai: [['https://c2pa.org/', 'C2PA'], ['https://openai.com/sora/', 'OpenAI Sora'], ['https://deepmind.google/models/veo/', 'Google Veo']],
    context: [['https://www.bfi.org.uk/', 'BFI'], ['https://www.kodak.com/en/motion/', 'Kodak Motion'], ['https://www.eastman.org/', 'George Eastman Museum']]
  }[site] || [];
  const localLinks = internal.map(([slug, label]) => `<a href="${slug === 'about' ? '../../about/' : `../${slug}/`}">${label}</a>`).join(' · ');
  const externalLinks = external.map(([href, label]) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`).join(' · ');
  const addition = `<p class="source-list" data-expansion-source>${zh ? '本条补充参考来源' : 'Additional sources'}：${localLinks}${externalLinks ? ` · ${externalLinks}` : ''}</p>`;
  if (String(html).includes('class="article-sources')) {
    return String(html).replace(/(<aside class="article-sources[^"]*"[\s\S]*?)(<\/aside>)/, (m, open, close) => `${open}${addition}${close}`);
  }
  return String(html).replace('</article>', `<aside class="article-sources expansion-source"><div class="article-credit-head"><p class="eyebrow">${zh ? '来源 / Sources' : 'Sources / 来源'}</p><span class="mono">${zh ? '方法复核' : 'Method review'}</span></div><p class="source-types">${zh ? '本文依据 TVCN 现场测试流程、编辑标准与公开技术文档；未实测的参数不做数值结论。' : 'Based on TVCN field-test process, editorial standards and public technical documentation; untested parameters are not given numeric conclusions.'}</p>${addition}</aside></article>`);
}
function replaceSampleNote(html, id, lang) {
  if (lang !== 'zh' || !BREAKDOWN_NOTES_20261124[id]) return html;
  const replacement = `<blockquote><p><strong>样本说明：</strong>${BREAKDOWN_NOTES_20261124[id]}</p></blockquote>`;
  return String(html).replace(/<blockquote><p><strong>样本说明：<\/strong>[\s\S]*?<\/p><\/blockquote>/, replacement);
}
function addRegionalNote(html, lang, site) {
  if (lang !== 'en') return html;
  if (String(html).includes('class="regional-note"')) return html;
  const chinaMarkers = /抖音|B站|小红书|RMB|CNY|人民币|中国大陆|国内|广电|微信|视频号|快手|淘宝|天猫|京东|爱奇艺|腾讯视频|优酷|豆瓣|¥|China|Chinese|mainland|Renminbi/;
  if (!chinaMarkers.test(html)) return html;
  const variants = {
    ai: 'Model availability, training-data rules, disclosure duties and privacy law differ by market; check the EU AI Act, UK GDPR and your local platform policy before publishing.',
    tools: 'Voltage, plug, warranty, import duty and radio certification differ by market; check the local spec sheet before ordering gear or batteries.',
    formats: 'Platform names and monetisation rules differ by market; treat Douyin, Bilibili and Xiaohongshu as examples, then re-check TikTok, YouTube, Instagram or the local platform.',
    main: 'Contracts, tax, insurance and consent rules differ by market; use the local currency and local counsel before signing or invoicing.',
    context: 'Film-history examples are kept in their original market context; distribution and rights clearance still follow your local law.'
  };
  const note = variants[site] || variants.main;
  return String(html).replace('</article>', `<aside class="regional-note"><p><strong>Regional note for US / UK / EU readers</strong></p><p>This English page keeps mainland-China examples where they are part of the method. Read platform names as examples, not as the only market: Douyin ↔ TikTok/Reels, Bilibili ↔ YouTube, Xiaohongshu ↔ Instagram/Pinterest; RMB figures are not converted here. ${note}</p></aside></article>`);
}
function addMediaDisclosure(html, lang) {
  if (!/<(?:figure|img)\b/i.test(html)) return html;
  const text = lang === 'en'
    ? '<p class="media-disclosure"><strong>Image note.</strong> Covers, diagrams and step images on this page are editorial illustrations or structure diagrams, not photographs of a test performed here; they are not evidence of measured gear performance. Where an image is AI-assisted, the caption says so. Read the test conditions in the text before treating an image as proof.</p>'
    : '<p class="media-disclosure"><strong>图片说明</strong>：本页封面、图解与步骤图是编辑示意或结构图，不是本页实测照片，也不能当作器材测试证据；AI 辅助生成的图会在图注标出。判断器材或画面，以正文的测试条件与现场记录为准。</p>';
  return String(html).replace('</article>', `${text}</article>`);
}
function readingUnits(html, lang) {
  const text = stripTags(String(html).replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<aside[\s\S]*?<\/aside>/gi, ' '));
  if (lang === 'zh') return (text.match(/\p{Script=Han}/gu) || []).length;
  return (text.match(/[A-Za-z0-9]+/g) || []).length;
}
function fixReadingTime(html, lang) {
  const units = readingUnits(html, lang);
  const minutes = Math.max(2, Math.ceil(units / (lang === 'zh' ? 320 : 180)));
  const deep = Math.max(6, minutes);
  if (lang === 'zh') {
    if (/分钟速读/.test(html)) {
      return html.replace(/(\d+)\s*分钟速读\s*\+\s*(\d+)\s*分钟深读/, `2 分钟速读 + ${deep} 分钟深读`);
    }
    return html.replace(/(\d+)\s*分钟阅读/, `${minutes} 分钟阅读`);
  }
  if (/min quick read/.test(html)) {
    return html.replace(/(\d+)\s*min quick read\s*\+\s*(\d+)\s*min deep read/, `2 min quick read + ${deep} min deep read`);
  }
  return html.replace(/(\d+)\s*min read/, `${minutes} min read`);
}
function removeDuplicateIntro(html, article) {
  const summary = stripTags(article.summary || '').replace(/\s+/g, '').trim();
  if (!summary) return html;
  return String(html).replace(/(<article class="article-body">)(\s*<section>[\s\S]*?<\/section>)/i, (match, open, section) => {
    const text = stripTags(section.replace(/^[\s\S]*?<\/h2>/i, '')).replace(/\s+/g, '').trim();
    if (text === summary || (text.startsWith(summary) && text.length <= summary.length + 24)) {
      return open;
    }
    return match;
  });
}
function removeRepeatedFiller(html, lang) {
  const zh = lang === 'zh';
  return String(html)
    .replace(/<div class="diagram-hint">[\s\S]*?<\/div>/gi, '')
    .replaceAll('把三步按顺序做完，再回看画面或文件。', '')
    .replaceAll('Do the three steps in order, then look again at the image or file.', '')
    .replace(/<figcaption><span>这是为这一条画的(?:现场手册|拉片工作纸)封面，不是实拍。<\/span>/g, '<figcaption><span>图解封面，非实拍。</span>')
    .replace(/<figcaption><span>A (?:field-note|breakdown worksheet) cover drawn for this entry, not a photograph.<\/span>/g, '<figcaption><span>Illustration, not a photo.</span>')
    .replace(/<figcaption><span>图解封面，非实拍。<\/span>/g, zh ? '<figcaption><span>图解封面，非实拍。</span>' : '<figcaption><span>Illustration, not a photo.</span>');
}
function reflowArticle(html, article, lang) {
  const zh = lang === 'zh';
  let output = String(html);
  const summary = String(article.summary || '').trim();

  // One clear deck line under the title; replace the old long header paragraph.
  output = output.replace(/(<header class="article-hero">[\s\S]*?<\/header>)/, (header) => {
    let next = header.replace(/<p(?![^>]*class=)[^>]*>[\s\S]*?<\/p>/i, '');
    next = next.replace(/<\/h1>/i, `</h1><p class="article-deck">${esc(summary)}</p>`);
    return next;
  });

  const cover = output.match(/<figure class="article-media">[\s\S]*?<\/figure>/i);
  const check = output.match(/<div class="check-box">[\s\S]*?<\/div>/i);
  const diagrams = [];
  output = output.replace(/<figure class="diagram">[\s\S]*?<\/figure>/gi, (match) => {
    diagrams.push(match);
    return '';
  });
  if (cover) output = output.replace(cover[0], '');
  if (check) output = output.replace(check[0], '');

  const bodyStart = output.indexOf('<article class="article-body">');
  const bodyEnd = bodyStart >= 0 ? output.indexOf('</article>', bodyStart) : -1;
  if (bodyEnd < 0) return output;

  let insert = '';
  if (cover) insert += cover[0].replace('<figure class="article-media">', '<figure class="article-media inline-media">');
  insert += diagrams.join('');
  if (check) insert += check[0].replace('<div class="check-box">', '<div class="check-box check-box-after">');
  return output.slice(0, bodyEnd + '</article>'.length) + insert + output.slice(bodyEnd + '</article>'.length);
}
function rewrite(html, prefix, lang) {
  const langPrefix = lang === 'en' ? 'en/' : '';
  return addImageDimensions(String(html))
    .replace(/href="#\/article\/([^"/]+)"/g, (_, id) => `href="${prefix}${langPrefix}article/${id}/"`)
    .replace(/href="#\/"/g, `href="${prefix}${langPrefix}"`)
    .replace(/href="#\/site\/([^"/]+)"/g, (_, id) => {
      const site = NAV_SITES.find((item) => item.id === id);
      return site ? `href="https://${site.domain}/"` : `href="${appHref(prefix, lang, `site/${id}`)}"`;
    })
    .replace(/href="#\/path\/([^"/]+)"/g, (_, id) => data.zh.some((a) => a.id === id)
      ? `href="${prefix}${langPrefix}article/${id}/"`
      : `href="${appHref(prefix, lang, `path/${id}`)}"`)
    .replace(/href="#\/search[^"]*"/g, `href="${prefix}${langPrefix}search/"`)
    .replace(/href="#\/trust[^"]*"/g, `href="${prefix}${langPrefix}about/"`)
    .replace(/href="#\/paths"/g, `href="${prefix}${langPrefix}paths/"`)
    .replace(/href="#\/([^"]+)"/g, (_, route) => `href="${appHref(prefix, lang, route)}"`)
    .replaceAll('src="assets/', `src="${prefix}assets/`)
    .replaceAll('poster="assets/', `poster="${prefix}assets/`)
    .replaceAll('srcset="assets/', `srcset="${prefix}assets/`)
    .replace(/href="(?:\.\.\/)+assets\//g, `href="${prefix}assets/`)
    .replaceAll('href="assets/', `href="${prefix}assets/`);
}
function write(relative, content) {
  const target = path.join(outRoot, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
  return target;
}



function head({ lang, title, description, canonical, altZh, altEn, image, type = 'article', author = 'TVCN', site = 'main', verified = DATE_MODIFIED, origin = SITE, robots = '' }) {
  const locale = lang === 'en' ? 'en_US' : 'zh_CN';
  const alternateLocale = lang === 'en' ? 'zh_CN' : 'en_US';
  const schemaTitle = String(title).replace(/ · TVCN$/, '');
  const authorUrl = `${origin}/${lang === 'en' ? 'en/' : ''}about/#desk-${site}`;
  const schemaType = type === 'article' ? 'Article' : type === 'home' ? 'WebSite' : type === 'about' ? 'AboutPage' : 'CollectionPage';
  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: schemaTitle,
    description,
    image: [image],
    inLanguage: lang === 'en' ? 'en' : 'zh-CN',
    url: canonical,
    publisher: { '@type': 'Organization', name: 'TVCN', logo: { '@type': 'ImageObject', url: origin + '/assets/icon-512.png' } }
  };
  if (schemaType === 'Article') {
    schema.headline = schemaTitle;
    schema.author = { '@type': 'Organization', name: author, url: authorUrl };
    schema.mainEntityOfPage = canonical;
    schema.datePublished = DATE_PUBLISHED;
    schema.dateModified = verified;
  }
  if (schemaType === 'WebSite') {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${origin}/${lang === 'en' ? 'en/' : ''}search/?q={search_term_string}` },
      'query-input': 'required name=search_term_string'
    };
  }
  const siteNav = NAV_SITES.find((item) => item.id === site);
  let jsonLd = schema;
  if (schemaType === 'Article') {
    const home = `${origin}/${lang === 'en' ? 'en/' : ''}`;
    const siteRoot = siteNav ? `https://${siteNav.domain}/${lang === 'en' ? 'en/' : ''}` : home;
    const siteName = siteNav ? (lang === 'en' ? siteNav.en : siteNav.zh) : (lang === 'en' ? 'Main' : '主站');
    const items = site === 'main' || !siteNav
      ? [{ name: lang === 'en' ? 'TVCN' : 'TVCN', item: home }]
      : [{ name: lang === 'en' ? 'TVCN' : 'TVCN', item: home }, { name: siteName, item: siteRoot }];
    const graphSchema = { ...schema };
    delete graphSchema['@context'];
    items.push({ name: schemaTitle, item: canonical });
    jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        graphSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: items.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: entry.name,
            item: entry.item
          }))
        }
      ]
    };
  }
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f4f1eb" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d100f" media="(prefers-color-scheme: dark)">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${robots ? `<meta name="robots" content="${esc(robots)}">` : ''}
<meta name="author" content="${esc(author)}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="PREFIXassets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="PREFIXassets/apple-touch-icon.png">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="zh-CN" href="${esc(altZh)}">
<link rel="alternate" hreflang="en" href="${esc(altEn)}">
<link rel="alternate" hreflang="x-default" href="${esc(altZh)}">
<meta property="og:site_name" content="TVCN">
<meta property="og:type" content="${type === 'article' ? 'article' : 'website'}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:alt" content="${esc(schemaTitle)}">
<meta property="og:locale" content="${locale}">
<meta property="og:locale:alternate" content="${alternateLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
<meta name="twitter:image:alt" content="${esc(schemaTitle)}">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

const themeScript = `<script>try{var t=localStorage.getItem('tvcn.theme')||'auto';var d=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='auto'?(d?'dark':'light'):t;document.documentElement.dataset.theme=r;document.documentElement.dataset.themePref=t;}catch(e){}</script>`;

function header(prefix, lang, id, altHref = '/', altLabel = 'EN', site = 'main') {
  const zh = lang === 'zh';
  const brandHref = prefix || './';
  return `<header class="static-header">
  <div class="static-header-inner">
    <a class="static-brand" href="${brandHref}${zh ? '' : 'en/'}">TVCN<span>${zh ? '影像制作知识库' : 'Video Production Knowledge'}</span></a>
    <nav class="static-nav site-nav" aria-label="${zh ? '站点导航' : 'Site navigation'}">
      ${siteNavLinks(lang, 'site-nav-link', site)}
      <a class="icon-btn search-btn" href="${prefix}${zh ? 'search/' : 'en/search/'}" aria-label="${zh ? '搜索全站' : 'Search the library'}">${zh ? '搜索' : 'Search'}</a>
      <a class="icon-btn lang-btn" href="${altHref}" hreflang="${zh ? 'en' : 'zh-CN'}">${altLabel}</a>
      <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="${zh ? '切换明暗' : 'Toggle theme'}">${zh ? '明暗' : 'Theme'}</button>
    </nav>
  </div>
</header>`;
}
function footer(prefix, lang, id = '', site = 'main') {
  const zh = lang === 'zh';
  const isMain = site === 'main';
  const sharedBase = isMain ? prefix : `${MAIN_SITE}/`;
  const aboutHref = `${sharedBase}${zh ? 'about/' : 'en/about/'}`;
  const glossaryHref = `${sharedBase}${zh ? 'glossary/' : 'en/glossary/'}`;
  const topicsHref = `${sharedBase}${zh ? 'topics/' : 'en/topics/'}`;
  const searchHref = `${prefix}${zh ? 'search/' : 'en/search/'}`;
  const appQuery = lang === 'en' ? 'lang=en&' : '';
  const interactive = isMain
    ? `<a href="${appHref(prefix, lang, id ? `article/${esc(id)}` : '')}" rel="nofollow">${zh ? '交互版' : 'Interactive'}</a>`
    : `<a href="${MAIN_SITE}/app/?${appQuery}r=${encodeURIComponent(`site/${site}`)}" rel="nofollow">${zh ? '交互版' : 'Interactive'}</a>`;
  return `<footer class="static-footer">
  <nav class="footer-sites" aria-label="${zh ? '页脚站点导航' : 'Footer site navigation'}">${siteNavLinks(lang, 'footer-site-link', site)}</nav>
  <div class="static-footer-inner">
    <span>${zh ? '文字与图解 CC BY-SA 4.0 · 代码 MIT' : 'Text and diagrams CC BY-SA 4.0 · Code MIT'}</span>
    <span><a href="${aboutHref}">${zh ? '关于与编辑标准' : 'About and standards'}</a> · <a href="${glossaryHref}">${zh ? '术语表' : 'Glossary'}</a> · <a href="${aboutHref}#corrections">${zh ? '信任与更正' : 'Trust and corrections'}</a> · ${interactive} · ${isMain ? `<a href="${topicsHref}">${zh ? '主题' : 'Topics'}</a> · ` : ''}<a href="${searchHref}">${zh ? '搜索' : 'Search'}</a> · <a href="${prefix}">TVCN</a> · ${DATE_MODIFIED}</span>
  </div>
</footer>`;
}

function tabbar(prefix, lang, site = 'main') {
  return `<nav class="static-tabbar" aria-label="${lang === 'zh' ? '底部站点导航' : 'Bottom site navigation'}">${siteNavLinks(lang, 'tab-site-link', site)}</nav>`;
}

function rewriteAiLegacyLinks(html, lang) {
  const zhMap = AI_LEGACY_MAP.zh || {};
  const enMap = AI_LEGACY_MAP.en || {};
  let output = String(html);
  for (const [id, zhUrl] of Object.entries(zhMap)) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`href="([^"]*\\/article\\/${escaped}\\/[^"]*)"`, 'g');
    output = output.replace(re, (match, href) => {
      const target = href.includes('/en/article/') ? (enMap[id] || zhUrl) : zhUrl;
      return `href="${target}"`;
    });
  }
  return output;
}

function page({ lang, title, description, canonical, altZh, altEn, image, prefix, body, type = 'article', author = 'TVCN 编辑部', site = 'main', verified = DATE_MODIFIED, altHref = '/', altLabel = lang === 'en' ? '中文' : 'EN', origin = SITE, robots = '' }) {
  const headHtml = head({ lang, title, description, canonical, altZh, altEn, image, type, author, site, verified, origin, robots }).replaceAll('PREFIX', prefix);
  const themeScript = `<script>try{var t=localStorage.getItem('tvcn.theme')||'auto';var d=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='auto'?(d?'dark':'light'):t;document.documentElement.dataset.theme=r;document.documentElement.dataset.themePref=t;}catch(e){}</script>`;
  const siteNavScript = `<script>(function(){var h=location.hostname.replace(/^www\./i,'');var m={'tvcn.org':'main','story.tvcn.org':'story','shoot.tvcn.org':'shoot','post.tvcn.org':'post','ai.tvcn.org':'ai','animation.tvcn.org':'animation','formats.tvcn.org':'formats','tools.tvcn.org':'tools','context.tvcn.org':'context'};var c=m[h];if(!c)return;document.querySelectorAll('[data-site-nav]').forEach(function(a){if(a.getAttribute('data-site-nav')===c)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})})();</script>`;

const themeToggleScript = `<script>document.querySelectorAll('[data-theme-toggle]').forEach(function(b){b.addEventListener('click',function(){var cur=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=cur;document.documentElement.dataset.themePref=cur;try{localStorage.setItem('tvcn.theme',cur)}catch(e){}})});</script>`;
  return `<!doctype html>
<html lang="${lang === 'en' ? 'en' : 'zh-CN'}" data-theme="light" data-theme-pref="auto">
<head>
${headHtml}
<link rel="stylesheet" href="${prefix}assets/article.css?v=${ASSET_VERSION}">
${themeScript}
</head>
<body class="static-page">
<a class="skip-link" href="#main">${lang === 'en' ? 'Skip to content' : '跳到正文'}</a>
${header(prefix, lang, body.articleId || '', altHref, altLabel, site)}
<main id="main" class="static-main" tabindex="-1">
${rewriteAiLegacyLinks(body.html, lang)}
</main>
${footer(prefix, lang, body.articleId || '', site)}
${tabbar(prefix, lang, site)}
${siteNavScript}
${themeToggleScript}
</body>
</html>
`;
}


// Single source of truth for the article stylesheet: site-kit carries the
// audited c-version rail/TOC/H1 fixes that generated snippets must not drift from.
const css = fs.readFileSync(path.join(root, 'site-kit/assets/article.css'), 'utf8');
write('assets/article.css', css);
write('assets/calculators.js', CALCULATOR_JS);

let written = 0;
for (const lang of ['zh', 'en']) {
  const prefix = lang === 'en' ? '../../../' : '../../';
  const altPrefix = lang === 'en' ? '../../' : '../../../';
  for (const article of data[lang]) {
    if (article.site === 'ai') continue;
    if (article.site !== CONTENT_SITE) continue;
    const siteBase = article.site === 'ai' ? 'https://ai.tvcn.org' : SITE;
    const canonical = lang === 'en' ? `${siteBase}/en/article/${article.id}/` : `${siteBase}/article/${article.id}/`;
    const altZh = `${siteBase}/article/${article.id}/`;
    const altEn = `${siteBase}/en/article/${article.id}/`;
    const image = ogImage(article.image);
    const title = `${article.title} · TVCN`;
    const description = stripTags(article.summary).slice(0, 160);
    const author = authorFor(article.id, lang, article.site);
    const verified = verifiedFor(article.id, lang);
    let bodyHtml = rewrite(article.html, prefix, lang);
    const authorHref = IS_MAIN
      ? `${prefix}${lang === 'en' ? 'en/' : ''}about/#desk-${article.site}`
      : `${MAIN_SITE}/${lang === 'en' ? 'en/' : ''}about/#desk-${article.site}`;
    const authorLink = `<a href="${authorHref}">${esc(author)}</a>`;
    bodyHtml = bodyHtml
      .replace('<span>TVCN 编辑部</span>', `<span>${authorLink}</span>`)
      .replace('<span>TVCN Editorial</span>', `<span>${authorLink}</span>`)
      .replace('<p>TVCN 编辑部</p>', `<p>${authorLink}</p>`)
      .replace('<p>TVCN Editorial</p>', `<p>${authorLink}</p>`)
      .replace(`<p>${esc(author)}</p>`, `<p>${authorLink}</p>`)
      .replace(/<span>TVCN \/ \d+<\/span>/g, `<span>${authorLink}</span>`);
    bodyHtml = removeRepeatedFiller(bodyHtml, lang);
    bodyHtml = addEditorialDepth(bodyHtml, article.id, lang);
    bodyHtml = addCalculatorWidget(bodyHtml, article.id, lang);
    bodyHtml = addExpansionSource(bodyHtml, article.id, lang, article.site);
    bodyHtml = personalizeGenericIntros(bodyHtml, article, lang);
    bodyHtml = removeDuplicateIntro(bodyHtml, article);
    bodyHtml = addArticleToc(bodyHtml, lang);
    bodyHtml = reflowArticle(bodyHtml, article, lang);
    bodyHtml = replaceSampleNote(bodyHtml, article.id, lang);
    bodyHtml = addAudioDemo(bodyHtml, article.id, lang);
    bodyHtml = addFigureNature(bodyHtml, lang);
    bodyHtml = addRegionalNote(bodyHtml, lang, article.site);
    bodyHtml = addMediaDisclosure(bodyHtml, lang);
    bodyHtml = fixReadingTime(bodyHtml, lang);
    if (TEMPLATE_IDS.includes(article.id)) {
      bodyHtml += `<aside class="template-download"><p><strong>${lang === 'en' ? 'Reusable Markdown template' : '可套用的 Markdown 模板'}</strong><br>${lang === 'en' ? 'Same segments as the table above; replace the brackets with your own shots.' : '与上方分段表同一套内容，把方括号换成你的镜头即可。'}</p><a href="${prefix}assets/templates/${article.id}.${lang}.md" download>${lang === 'en' ? 'Download .md' : '下载 .md'}</a></aside>`;
    }
    const altHref = lang === 'en' ? `${prefix}article/${article.id}/` : `${prefix}en/article/${article.id}/`;
    const html = page({
      lang, title, description, canonical, altZh, altEn, image, prefix,
      body: { id: article.id, articleId: article.id, html: bodyHtml },
      author, site: article.site, verified, altHref,
      altLabel: lang === 'en' ? '中文' : 'EN'
    });
    write(`${lang === 'en' ? 'en/' : ''}article/${article.id}/index.html`, html);
    written += 1;
  }
}
console.log(`static article pages: ${written}`);

const siteOrder = ['main', ...data.sites.map((s) => s.id)];
const siteInfo = new Map(data.sites.map((s) => [s.id, s]));
for (const lang of ['zh', 'en']) {
  const prefix = lang === 'en' ? '../../' : '../';
  const articles = data[lang].filter((a) => a.site === CONTENT_SITE);
  const groups = [];
  for (const siteId of siteOrder) {
    const rows = articles.filter((a) => a.site === siteId);
    if (!rows.length) continue;
    const info = siteInfo.get(siteId);
    const name = siteId === 'main' ? (lang === 'en' ? 'Main hub' : '主站') : (lang === 'en' ? info.nameEn : info.nameZh);
    groups.push({ id: siteId, name, rows });
  }
  const cards = (rows) => rows.map((a) => `<a class="article-index-card" href="${prefix}${lang === 'en' ? 'en/' : ''}article/${a.id}/">
    <b>${esc(a.title)}</b><small>${esc(stripTags(a.summary)).slice(0, 120)}</small>
  </a>`).join('\n');
  const html = `<div class="wrap">
    <header class="article-index-head">
      <p class="eyebrow">LIBRARY / ${articles.length}</p>
      <h1>${lang === 'en' ? 'All articles' : '全部文章'}</h1>
      <p>${lang === 'en' ? `${articles.length} guides · ${SITE_ID} · bilingual` : `${articles.length} 篇 · ${SITE_ID} · 中英双语`}</p>
    </header>
    ${groups.map((g) => `<details class="article-index-site" id="site-${esc(g.id)}" open><summary><b>${esc(g.name)}</b><span>${g.rows.length} ${lang === 'en' ? 'guides' : '篇'}</span></summary><div class="article-index-grid">${cards(g.rows)}</div></details>`).join('\n')}
    <script>(function(){if(!window.matchMedia('(min-width:561px)').matches){document.querySelectorAll('details.article-index-site').forEach(function(d){d.open=false})}})();</script>
  </div>`;
  const canonical = lang === 'en' ? `${SITE}/en/articles/` : `${SITE}/articles/`;
  const altZh = `${SITE}/articles/`;
  const altEn = `${SITE}/en/articles/`;
  const title = lang === 'en' ? 'All articles · TVCN' : '全部文章 · TVCN';
  const description = lang === 'en' ? `${articles.length} bilingual video-production guides from ${SITE_ID}.` : `${articles.length} 篇中英双语影像制作指南（${SITE_ID}）。`;
  const altHref = lang === 'en' ? `${prefix}articles/` : `${prefix}en/articles/`;
  write(`${lang === 'en' ? 'en/' : ''}articles/index.html`, page({
    lang, title, description, canonical, altZh, altEn, image: ogImage(OG_FALLBACK), prefix,
    body: { id: 'articles', html },
    type: 'collection',
    author: lang === 'en' ? 'TVCN Editorial' : 'TVCN 编辑部',
    site: SITE_ID,
    verified: DATE_MODIFIED,
    altHref,
    altLabel: lang === 'en' ? '中文' : 'EN'
  }));
}

const allSites = [{ id: 'main', domain: 'tvcn.org', nameZh: '主站', nameEn: 'Main', descZh: '从第一条片到完整工作流：路径、方法、案例和索引。', descEn: 'From a first film to a full workflow: paths, methods, cases and indexes.' }, ...data.sites];
const aiSite = allSites.find((s) => s.id === 'ai');
if (aiSite) {
  aiSite.descZh = '84 页 AI 视频工作库：模型档案、七天路径、工作流、实测、场景、后期与交付。';
  aiSite.descEn = 'An 84-page AI video library: model dossiers, a seven-day path, workflows, tests, scenarios, post and delivery.';
}
function topicArticles(topic) {
  const pool = data.zh.filter((a) => a.site === topic.site);
  const seen = new Set();
  const picked = [];
  for (const a of pool) {
    const hay = `${a.title} ${a.kicker} ${stripTags(a.summary || '')}`;
    if (topic.keys.some((k) => hay.includes(k))) {
      picked.push(a);
      seen.add(a.id);
    }
  }
  for (const a of pool) {
    if (picked.length >= 8) break;
    if (!seen.has(a.id)) {
      picked.push(a);
      seen.add(a.id);
    }
  }
  return picked.slice(0, 20);
}
function topicView(topic, lang, articles) {
  const zh = lang === 'zh';
  const rows = articles.map((a) => {
    const href = `../../article/${esc(a.id)}/`;
    return `<li class="topic-item"><p class="topic-item-kicker">${esc(a.kicker || '')}</p><h2><a href="${href}">${esc(a.title)}</a></h2><p>${esc(stripTags(a.summary || ''))}</p></li>`;
  }).join('\n');
  const seq = articles.slice(0, 5).map((a, i) => {
    const href = `../../article/${esc(a.id)}/`;
    const labels = zh ? ['先读：定问题', '再读：选动作', '补读：看失败', '验读：做验收', '横读：补一课'] : ['Start: frame it', 'Next: choose the move', 'Then: failure modes', 'Check: prove it', 'Cross-read: one more'];
    return `<li><span>${labels[i]}</span><a href="${href}">${esc(a.title)}</a><p>${esc(stripTags(a.summary || ''))}</p></li>`;
  }).join('\n');
  return `<div class="topic-page">
  <header class="topic-hero">
    <p class="eyebrow">${zh ? '主题' : 'TOPIC'} / ${esc(topic.site)}</p>
    <h1>${esc(zh ? topic.zh : topic.en)}</h1>
    <p class="topic-lede"><strong>${zh ? '判断' : 'Judgement'}：</strong>${esc(zh ? topic.dz : topic.de)}</p>
    <p class="topic-meta">${articles.length} ${zh ? '篇' : 'guides'} · ${zh ? '按问题顺序，不按发布时间' : 'ordered by problem, not publish date'}</p>
  </header>
  <section class="topic-sequence" aria-label="${zh ? '建议阅读顺序' : 'Suggested reading order'}">
    <h2>${zh ? '先读这五篇' : 'Read these five first'}</h2>
    <ol>${seq}</ol>
    <p>${zh ? '为什么这样排：先判断问题，再选动作，接着补失败与验收，最后横向补一课；不是按发布时间，也不是按文章数量。下面 8 篇以上是完整子页清单。' : 'Why this order: frame the problem, choose the action, add failure and proof, then cross-read one more page. It is not publish order, and not a count of articles. The full list below has eight or more subpages.'}</p>
  </section>
  <section class="topic-list" aria-label="${zh ? '文章列表' : 'Article list'}"><ol>${rows}</ol></section>
  <p class="topic-back"><a href="../">${zh ? '全部主题' : 'All topics'}</a></p>
</div>`;
}
function topicsIndexView(lang) {
  const zh = lang === 'zh';
  const sections = allSites.map((site) => {
    const rows = TOPICS.filter((t) => t.site === site.id);
    if (!rows.length) return '';
    return `<section class="topic-group"><h2>${esc(zh ? site.nameZh : site.nameEn)}</h2><div class="topic-cards">${rows.map((t) => {
      const count = topicArticles(t).length;
      return `<a class="topic-card" href="${esc(t.slug)}/"><span>${esc(zh ? t.zh : t.en)}</span><small>${count} ${zh ? '篇' : 'guides'}</small></a>`;
    }).join('')}</div></section>`;
  }).filter(Boolean).join('\n');
  return `<div class="topic-page">
  <header class="topic-hero">
    <p class="eyebrow">${zh ? '主题索引' : 'TOPIC INDEX'}</p>
    <h1>${zh ? '按问题找，不按栏目找' : 'Find by problem, not by section'}</h1>
    <p class="topic-lede">${zh ? `${TOPICS.length} 个主题把 9 个站的文章重新编组：先说你遇到的是什么问题，再给出可执行的读法。` : `${TOPICS.length} topics regroup articles across nine sites: start from the problem you have, then follow a working reading order.`}</p>
  </header>
  ${sections}
</div>`;
}

const homeFeatured = ['logline', 'exposure', 'buy-camera-budget', 'color-management', 'contract-scope', 'corporate-video-breakdown', 'model-comparison', 'seven-day-plan'];

// Static glossary generated from the compact app's 100-term GLOSSARY.
// Terms that point at a retired app route fall back to search, not a dead link.
const appSource = fs.readFileSync(path.join(root, 'app/tvcn-ui-v2.html'), 'utf8');
const glossaryMatch = appSource.match(/const GLOSSARY = (\[[\s\S]*?\]);/);
if (!glossaryMatch) throw new Error('GLOSSARY not found in compact app');
const GLOSSARY = Function(`return ${glossaryMatch[1]}`)();
const articleIdSet = new Set(data.zh.map((a) => a.id));

function glossaryView(lang, prefix) {
  const zh = lang === 'zh';
  const langPrefix = zh ? '' : 'en/';
  const groups = [];
  for (const site of allSites) {
    const rows = GLOSSARY.filter((g) => (g.site || 'main') === site.id);
    if (rows.length) groups.push({ site, rows });
  }
  const cards = groups.map(({ site, rows }) => {
    const items = rows.map((g, i) => {
      const id = String(g.href || '').replace(/^\?r=article\//, '').trim();
      const href = articleIdSet.has(id)
        ? `${prefix}${langPrefix}article/${id}/`
        : `${prefix}${langPrefix}search/?q=${encodeURIComponent(g.term[lang])}`;
      const near = [rows[i - 1], rows[i + 1]].filter(Boolean);
      const short = (s) => String(s || '').split(/[；。]/)[0].trim();
      const confuse = near.length
        ? `<p class="glossary-confuse"><strong>${zh ? '易混' : 'Easy to confuse'}：</strong>${near.map((x) => esc(x.term[lang])).join(' / ')}<br><span>${zh ? '区分看定义里的动作对象' : 'Tell them apart by the object they act on'}：${near.map((x) => `${esc(x.term[lang])} — ${esc(short(x.def[lang]))}`).join('；')}；${esc(g.term[lang])} — ${esc(short(g.def[lang]))}。</span></p>`
        : '';
      return `<a class="glossary-card" href="${href}" data-term="${esc(`${g.term.zh} ${g.term.en} ${g.def.zh} ${g.def.en} ${g.action?.zh || ''} ${g.action?.en || ''} ${near.map((x) => x.term.zh + ' ' + x.term.en).join(' ')}`.toLowerCase())}">
        <h3>${esc(g.term[lang])}<small>${esc(lang === 'en' ? g.term.zh : g.term.en)}</small></h3>
        <p>${esc(g.def[lang])}</p>
        ${g.action ? `<p class="glossary-action">${esc(g.action[lang])}</p>` : ''}${confuse}<span>${zh ? '读相关指南' : 'Read the guide'} ${ICON_ARROW}</span>
      </a>`;
    }).join('');
    return `<section class="glossary-group" data-glossary-group><h2>${esc(zh ? site.nameZh : site.nameEn)} <small>${rows.length}</small></h2><div class="glossary-grid">${items}</div></section>`;
  }).join('');
  return `<div class="wrap glossary-page">
    <header class="article-hero glossary-hero">
      <p class="eyebrow">${zh ? '术语表 / 100 条' : 'Glossary / 100 terms'}</p>
      <h1>${zh ? '影像制作术语表' : 'Video production glossary'}</h1>
      <p class="article-deck">${zh ? '按站点分组的 100 条常用术语。每条给一句可执行的定义，并链到相关指南；没有对应指南的，转到搜索。' : 'One hundred working terms grouped by desk. Each has an actionable definition and a link to the relevant guide; where no guide exists, it goes to search.'}</p>
      <div class="glossary-tools"><label><span class="sr-only">${zh ? '筛选术语' : 'Filter terms'}</span><input type="search" data-glossary-filter placeholder="${zh ? '筛选：术语、解释或英文名' : 'Filter: term, definition or Chinese name'}"></label><span class="glossary-count" data-glossary-count>${GLOSSARY.length} ${zh ? '条' : 'terms'}</span></div>
    </header>
    <article class="article-body glossary-body">${cards}</article>
    <script>(function(){var i=document.querySelector('[data-glossary-filter]'),c=document.querySelector('[data-glossary-count]'),cards=[].slice.call(document.querySelectorAll('[data-glossary-group] .glossary-card')),groups=[].slice.call(document.querySelectorAll('[data-glossary-group]'));function f(){var q=(i.value||'').trim().toLowerCase(),n=0;cards.forEach(function(a){var ok=!q||(a.getAttribute('data-term')||'').indexOf(q)>-1;a.hidden=!ok;if(ok)n++});groups.forEach(function(g){var v=g.querySelectorAll('.glossary-card:not([hidden])').length;g.hidden=v===0});c.textContent=n+' ${zh ? '条' : 'terms'}'}i.addEventListener('input',f)})();</script>
  </div>`;
}

if (IS_MAIN) {
for (const lang of ['zh', 'en']) {
  const prefix = lang === 'en' ? '../../' : '../';
  const zh = lang === 'zh';
  const canonical = zh ? `${SITE}/glossary/` : `${SITE}/en/glossary/`;
  const altZh = `${SITE}/glossary/`;
  const altEn = `${SITE}/en/glossary/`;
  const title = `${zh ? '影像制作术语表' : 'Video production glossary'} · TVCN`;
  const description = zh ? '100 条影像制作术语，按站点分组，每条给一句可执行定义、30 秒动作、易混项和相关指南链接。' : 'One hundred video-production terms, grouped by desk, each with an actionable definition, a 30-second action, confusion pairs and a guide link.';
  const html = page({
    lang, title, description, canonical, altZh, altEn, image: ogImage(OG_FALLBACK), prefix,
    body: { id: 'glossary', articleId: 'glossary', html: glossaryView(lang, prefix) },
    type: 'collection', author: zh ? 'TVCN 编辑部' : 'TVCN Editorial', site: 'main', verified: DATE_MODIFIED,
    altHref: zh ? `${prefix}en/glossary/` : `${prefix}glossary/`, altLabel: zh ? 'EN' : '中文'
  });
  write(`${zh ? '' : 'en/'}glossary/index.html`, html);
}
console.log(`glossary pages: 2, terms: ${GLOSSARY.length}`);

for (const lang of ['zh', 'en']) {
  const zh = lang === 'zh';
  const langPrefix = zh ? '' : 'en/';
  const prefix = zh ? '../' : '../../';
  const canonical = zh ? `${SITE}/topics/` : `${SITE}/en/topics/`;
  const title = zh ? '主题索引 · TVCN' : 'Topic index · TVCN';
  const description = zh ? `${TOPICS.length} 个主题把 9 个站的文章重新编组：按问题找，不按栏目找，每个主题给阅读顺序。` : `${TOPICS.length} topics regroup articles across nine sites: find by problem, not by section, with a reading order for each.`;
  write(`${langPrefix}topics/index.html`, page({
    lang, title, description, canonical,
    altZh: `${SITE}/topics/`, altEn: `${SITE}/en/topics/`, image: ogImage(OG_FALLBACK), prefix,
    body: { id: 'topics', html: topicsIndexView(lang) },
    type: 'collection', author: zh ? 'TVCN 编辑部' : 'TVCN Editorial', site: 'main', verified: DATE_MODIFIED,
    altHref: zh ? `${prefix}en/topics/` : `${prefix}topics/`, altLabel: zh ? 'EN' : '中文'
  }));
  for (const topic of TOPICS) {
    const articles = topicArticles(topic);
    const articleLang = data[lang] || data.zh;
    const rows = articles.map((a) => articleLang.find((x) => x.id === a.id) || a);
    const topicPrefix = zh ? '../../' : '../../../';
    const canonicalTopic = zh ? `${SITE}/topics/${topic.slug}/` : `${SITE}/en/topics/${topic.slug}/`;
    const topicTitle = `${zh ? (topic.slug === 'context-history' ? '影像史主题' : topic.zh) : (topic.slug === 'context-history' ? 'Image history topic' : topic.en)} · TVCN`;
    const topicDesc = zh ? topic.dz : topic.de;
    write(`${langPrefix}topics/${topic.slug}/index.html`, page({
      lang, title: topicTitle, description: topicDesc, canonical: canonicalTopic,
      altZh: `${SITE}/topics/${topic.slug}/`, altEn: `${SITE}/en/topics/${topic.slug}/`, image: ogImage(OG_FALLBACK),
      prefix: topicPrefix, body: { id: 'topics', html: topicView(topic, lang, rows) },
      type: 'collection', author: zh ? 'TVCN 编辑部' : 'TVCN Editorial', site: 'main', verified: DATE_MODIFIED,
      altHref: zh ? `${topicPrefix}en/topics/${topic.slug}/` : `${topicPrefix}topics/${topic.slug}/`, altLabel: zh ? 'EN' : '中文'
    }));
  }
}
console.log(`topic pages: ${TOPICS.length * 2 + 2}, topics: ${TOPICS.length}`);
}



function homeView(lang, prefix) {
  const zh = lang === 'zh';
  const articles = data[lang].filter((a) => a.site !== 'ai');
  const paths = articles.filter((a) => a.type === 'path');
  const featured = homeFeatured.map((id) => articles.find((a) => a.id === id)).filter(Boolean);
  const pathCards = paths.map((a, i) => `<a class="home-path" href="${prefix}${zh ? '' : 'en/'}article/${a.id}/">
    <span class="mono">${String(i + 1).padStart(2, '0')}</span>
    <b>${esc(a.title)}</b>
    <small>${esc(stripTags(a.summary))}</small>
  </a>`).join('');
  const featureCards = featured.map((a) => `<a class="home-feature" href="${prefix}${zh ? '' : 'en/'}article/${a.id}/">
    <span class="mono">${esc(a.site.toUpperCase())}</span>
    <b>${esc(a.title)}</b>
    <small>${esc(stripTags(a.summary))}</small>
  </a>`).join('');
  return `<div class="wrap home-view">
    <header class="home-hero has-quick">
      <div class="home-hero-main">
        <p class="eyebrow">TVCN / VIDEO PRODUCTION KNOWLEDGE</p>
        <h1>${zh ? '影像制作方法库' : 'Video production methods'}</h1>
        <p class="home-lead"><span>${zh ? `9 个站` : `9 sites`}</span><span>${COUNT} ${zh ? '对中英指南' : 'bilingual pairs'}</span><span>${zh ? '条件 / 步骤 / 失败 / 验收' : 'conditions / steps / failures / checks'}</span></p>
        <div class="home-actions"><a class="btn btn-primary" href="${prefix}${zh ? '' : 'en/'}articles/">${zh ? '浏览全部文章' : 'Browse all articles'} ${ICON_ARROW}</a><a class="btn btn-ghost" href="${prefix}${zh ? '' : 'en/'}paths/">${zh ? '全部路径' : 'All paths'}</a></div>
      </div>
      <aside class="home-quick" aria-label="${zh ? '快速入口' : 'Quick start'}">
        <a href="${prefix}${zh ? '' : 'en/'}article/first-film/"><span>${zh ? '第一次拍' : 'First film'}</span><b>${zh ? '7 天第一条片' : 'First film in 7 days'}</b></a>
        <a href="${prefix}${zh ? '' : 'en/'}article/buy-camera-budget/"><span>${zh ? '买器材' : 'Buy gear'}</span><b>${zh ? '先定预算，再定机身' : 'Budget first, body second'}</b></a>
        <a href="${prefix}${zh ? '' : 'en/'}article/publish-checklist/"><span>${zh ? '交付前' : 'Before delivery'}</span><b>${zh ? '发布前 12 项检查' : '12 publishing checks'}</b></a>
      </aside>
    </header>
    <section class="home-block"><div class="home-block-head"><div><p class="eyebrow">START / 09</p><h2>${zh ? '先选一条路径' : 'Pick a path first'}</h2></div><a href="${prefix}${zh ? '' : 'en/'}paths/">${zh ? '全部路径' : 'All paths'} ${ICON_ARROW}</a></div><div class="home-path-grid">${pathCards}</div></section>
    <section class="home-block"><div class="home-block-head"><div><p class="eyebrow">SELECTED / 08</p><h2>${zh ? '先读这几篇' : 'Start with these'}</h2></div><a href="${prefix}${zh ? '' : 'en/'}articles/">${zh ? '全部文章' : 'All articles'} ${ICON_ARROW}</a></div><div class="home-feature-grid">${featureCards}</div></section>
  </div>`;
}

function aboutView(lang, prefix) {
  const zh = lang === 'zh';
  const desks = allSites.map((s) => {
    const pair = SITE_AUTHOR[s.id] || SITE_AUTHOR.main;
    return `<div class="about-desk" id="desk-${esc(s.id)}"><p class="eyebrow">${esc(s.id === 'main' ? '00' : s.id)} / DESK</p><h3>${esc(zh ? pair[0] : pair[1])}</h3><p>${esc(zh ? `负责${s.nameZh}的内容复核与更新；按公开来源、可复现步骤和失败记录工作。` : `Owns review and updates for ${s.nameEn}; works from public sources, reproducible steps and logged failures.`)}</p></div>`;
  }).join('');
  return `<div class="wrap about-view">
    <header class="page-head"><p class="eyebrow">ABOUT / EDITORIAL</p><h1>${zh ? '关于 TVCN' : 'About TVCN'}</h1><p>${zh ? '影像制作知识库。编辑、复核和更正规则如下。' : 'A video-production knowledge library. The editorial, review and correction rules are below.'}</p></header>
    <section class="about-section"><h2>${zh ? '编辑方法' : 'How we work'}</h2><p>${zh ? '每篇回答三件事：适用于什么项目、具体怎么做、什么情况下不要用。技术页给出机器、软件版本或复核环境；没有实验室数据就写“未实测”。法律与平台页只做条文对照，不冒充法律意见。' : 'Every piece answers three questions: what project it fits, how to do it, and when not to use it. Technical pages name the machine, software version or review setup; without lab data they say “not measured.” Legal and platform pages compare primary text; they are not legal advice.'}</p></section>
    <section class="about-section"><h2>${zh ? '九个编辑台' : 'Nine desks'}</h2><div class="about-desk-grid">${desks}</div></section>
    <section class="about-section" id="corrections"><h2>${zh ? '更正与 AI' : 'Corrections and AI'}</h2><p>${zh ? '发现错误请给出页面地址、原句、依据和可核对来源。事实错误先改正文，再在文末记更正；版权或隐私问题先下线再核实。AI 只用于提纲、翻译草稿、示意图和代码辅助，不用于伪造采访、现场、证词或测试数据。' : 'For a correction, include the page URL, the sentence, the evidence and a checkable source. Factual errors are fixed first, then logged at the end; copyright or privacy issues are taken down before verification. AI is used for outlines, translation drafts, illustrations and code help, never to fake interviews, sets, testimony or test data.'}</p><div class="about-links"><a class="btn btn-ghost" href="${appHref(prefix, lang, 'trust/standards')}">${zh ? '编辑标准' : 'Editorial standards'} ${ICON_ARROW}</a><a class="btn btn-ghost" href="${appHref(prefix, lang, 'trust/corrections')}">${zh ? '更正流程' : 'Corrections'} ${ICON_ARROW}</a></div></section>
  </div>`;
}

const AI_HOME_HUBS = [
  ['start', '从这里开始', 'Start here', '七天路径，从第一次生成到第一条能剪的片。', 'Seven days from first generation to a first editable cut.'],
  ['models', '模型与成本', 'Models & cost', '七份档案、停运表、变更日志和可用秒成本。', 'Seven dossiers, sunset table, changelog and cost per kept clip.'],
  ['workflows', '工作流', 'Workflows', '从脚本到交付的七条流程，再接预演、批量与自托管。', 'Seven workflows from script to delivery, plus previz, batch and self-hosting.'],
  ['tests', '实测与提示词', 'Tests & prompts', '同一题跑三次，记录失败类型，再算可用率。', 'Three runs of the same prompt, failure types logged, usable rate calculated.'],
  ['tools', '工具与后期', 'Tools & post', '转片、清理、调色、声音、交付规格与机器配置。', 'Conversion, cleanup, colour, audio, delivery specs and hardware.'],
  ['updates', '更新与停运', 'Updates & sunset', '只放有日期的模型、价格与地区变更。', 'Only dated model, price and regional changes.'],
  ['scenarios', '场景', 'Scenarios', '八种片型，各有自己的交付、授权和失败点。', 'Eight formats, each with its own delivery, rights and failure points.']
];
function siteHomeView(lang, site, prefix) {
  const zh = lang === 'zh';
  const langPrefix = zh ? '' : 'en/';
  const articles = data[lang].filter((a) => a.site === site.id);
  const startIds = SITE_START[site.id] || [];
  const start = startIds.map((id) => articles.find((a) => a.id === id)).filter(Boolean);
  const rest = articles.filter((a) => !startIds.includes(a.id));
  const firstGuide = start[0] || articles[0];
  const firstLink = site.id === 'ai' ? `${prefix}${langPrefix}start/` : `${prefix}${langPrefix}article/${firstGuide.id}/`;
  const firstLabel = site.id === 'ai' ? (zh ? '七天路径' : 'Seven-day path') : (zh ? '第一篇' : 'First guide');
  const card = (a) => `<a class="article-index-card" href="${prefix}${langPrefix}article/${a.id}/">
    <b>${esc(a.title)}</b><small>${esc(stripTags(a.summary)).slice(0, 120)}</small>
  </a>`;
  const startCards = (start.length ? start : articles.slice(0, 5)).map((a) => `<a class="home-feature" href="${prefix}${langPrefix}article/${a.id}/">
    <span class="mono">${esc((a.type || 'guide').toUpperCase())}</span>
    <b>${esc(a.title)}</b><small>${esc(stripTags(a.summary)).slice(0, 110)}</small>
  </a>`).join('');
  const aiHubSection = site.id === 'ai' ? `<section class="home-block"><div class="home-block-head"><div><p class="eyebrow">EXPLORE / 7 HUBS</p><h2>${zh ? '七个入口' : 'Seven hubs'}</h2></div><a href="${prefix}${langPrefix}articles/">${zh ? '全部 84 篇' : 'All 84 pages'} ${ICON_ARROW}</a></div><div class="hub-grid">${AI_HOME_HUBS.map(([id, tzh, ten, dzh, den]) => `<a class="hub-card" href="${prefix}${langPrefix}${id}/"><img src="${prefix}assets/ai/hero/${id === 'start' ? '02-seven-day-path' : id === 'models' ? '03-model-radar' : id === 'workflows' ? '05-post-workflow' : id === 'tests' ? '07-test-lab' : id === 'tools' ? '06-batch-ops' : id === 'updates' ? '08-troubleshooting' : '04-scenario-matrix'}.webp" alt="${esc(zh ? tzh : ten)}" loading="eager"><span>HUB ${String(AI_HOME_HUBS.findIndex((x) => x[0] === id) + 1).padStart(2, '0')}</span><b>${esc(zh ? tzh : ten)}</b><small>${esc(zh ? dzh : den)}</small></a>`).join('')}</div></section>` : '';
  const aiHero = site.id === 'ai' ? `<figure class="home-hero-art"><img src="${prefix}assets/ai/hero/01-home-hero.webp" alt="${zh ? 'TVCN AI 影像工作台 — AI 生成示意图' : 'TVCN AI video workstation — AI illustration'}" loading="eager"><figcaption class="mono" style="padding:8px 12px;color:var(--muted);font-size:11px">${zh ? 'AI 生成示意图 / 非现场记录' : 'AI illustration / not a set record'}</figcaption></figure>` : '';
  return `<div class="wrap home-view site-home">
    <header class="home-hero">
      <p class="eyebrow">${esc(site.num || '')} / ${esc(site.domain.toUpperCase())}</p>
      <h1>${esc(zh ? site.nameZh : site.nameEn)}</h1>
      <p class="home-lead">${esc(zh ? site.descZh : site.descEn)}</p>
      ${aiHero}
      <div class="home-actions"><a class="btn btn-primary" href="${prefix}${langPrefix}articles/">${zh ? '浏览全部文章' : 'Browse all articles'} ${ICON_ARROW}</a><a class="btn btn-ghost" href="${MAIN_SITE}/app/?${lang === 'en' ? 'lang=en&' : ''}r=${encodeURIComponent(`site/${site.id}`)}">${zh ? '打开交互版' : 'Open interactive'}</a></div>
    </header>
    ${aiHubSection}
    <section class="home-block"><div class="home-block-head"><div><p class="eyebrow">START / ${String(start.length || Math.min(articles.length, 5)).padStart(2, '0')}</p><h2>${zh ? '从这里开始' : 'Start here'}</h2></div><a href="${firstLink}">${firstLabel} ${ICON_ARROW}</a></div><div class="home-feature-grid">${startCards}</div></section>
    <section class="home-block"><div class="home-block-head"><div><p class="eyebrow">${esc(site.id.toUpperCase())} / ${articles.length}</p><h2>${zh ? `本站全部 ${articles.length} 篇` : `All ${articles.length} guides`}</h2></div></div><div class="article-index-grid">${rest.map(card).join('')}</div></section>
  </div>`;
}

function pathsView(lang, prefix) {
  const zh = lang === 'zh';
  const langPrefix = zh ? '' : 'en/';
  const paths = data[lang].filter((a) => a.site !== 'ai' && a.type === 'path');
  const cards = paths.map((a, i) => `<a class="home-path" href="${prefix}${langPrefix}article/${a.id}/">
    <span class="mono">${String(i + 1).padStart(2, '0')}</span><b>${esc(a.title)}</b><small>${esc(stripTags(a.summary))}</small>
  </a>`).join('');
  return `<div class="wrap home-view">
    <header class="home-hero"><p class="eyebrow">PATHS / ${paths.length}</p><h1>${zh ? '9 条路径' : '9 paths'}</h1><p class="home-lead"><span>${zh ? '从任务开始' : 'Start from a job'}</span><span>${zh ? '按顺序给页面 / 动作 / 验收' : 'pages / actions / checks in order'}</span></p></header>
    <section class="home-block"><div class="home-path-grid">${cards}</div></section>
    <section class="home-block"><div class="path-guide">
      <div><b>${zh ? '选最近的一条' : 'Pick the nearest job'}</b><span>${zh ? '不要从“我想学什么”开始，从“这周要交什么”开始。' : 'Start from what is due this week, not what you want to study.'}</span></div>
      <div><b>${zh ? '按节点做，不跳步' : 'Work node by node'}</b><span>${zh ? '每个节点都有一个动作和一个验收；没验收就不算过。' : 'Each node has one action and one check; no check means not passed.'}</span></div>
      <div><b>${zh ? '卡住就回上一节点' : 'Go back one node when stuck'}</b><span>${zh ? '多数问题不是当前步骤错，是上一步没交付。' : 'Most blocks are a missing deliverable from the previous step.'}</span></div>
    </div>
    <div class="path-actions"><p>${zh ? '路径是顺序，不是课程。需要补某一项时，直接去对应文章或搜索。' : 'A path is an order, not a course. When one skill is missing, go straight to the guide or search.'}</p><div class="home-actions"><a class="btn btn-primary" href="${prefix}${langPrefix}articles/">${zh ? '全部文章' : 'All guides'} ${ICON_ARROW}</a><a class="btn btn-ghost" href="${prefix}${langPrefix}search/">${zh ? '搜索' : 'Search'}</a></div></div></section>
  </div>`;
}

function searchView(lang, prefix, index) {
  const zh = lang === 'zh';
  const langPrefix = zh ? '' : 'en/';
  const siteName = {
    main: zh ? '主站' : 'Main', story: zh ? '故事' : 'Story', shoot: zh ? '拍摄' : 'Shoot',
    post: zh ? '后期' : 'Post', ai: 'AI', animation: zh ? '动画' : 'Animation',
    formats: zh ? '片型' : 'Formats', tools: zh ? '工具' : 'Tools', context: zh ? '影像史' : 'History'
  };
  const defaultPicks = ['logline', 'exposure-check', 'sound', 'primary-correction', 'prompt-structure', 'copyright'];
  const defaultCards = defaultPicks.map((id) => index[lang].find((x) => x.id === id)).filter(Boolean).map((x) => `<a class="search-result" href="${x.url}"><span class="result-type">${esc(siteName[x.site] || x.site)}</span><span><span class="result-title">${esc(x.title)}</span><span class="result-summary">${esc(x.summary)}</span></span></a>`).join('');
  return `<div class="wrap"><div class="page-head"><p class="eyebrow">SEARCH</p><h1>${zh ? '搜索全站' : 'Search the library'}</h1></div>
    <div class="search-shell"><label class="search-box"><input id="staticSearchInput" type="search" placeholder="${zh ? '例如：三幕、手持、LUT、录音' : 'e.g. three acts, handheld, LUT, sound'}" aria-label="${zh ? '搜索全站' : 'Search the library'}" autocomplete="off" spellcheck="false"></label><div id="staticSearchResults" aria-live="polite" aria-atomic="false"><p class="search-hint">${zh ? '输入关键词开始搜索。' : 'Type a keyword to start.'}</p></div></div>
    <div class="search-suggest"><p class="eyebrow">${zh ? '常搜 / POPULAR' : 'POPULAR / 常搜'}</p><div class="search-chips">${(zh ? ['构图', '曝光', '录音', '调色', '剪辑', 'LUT', '分镜', '器材'] : ['composition', 'exposure', 'sound', 'color', 'editing', 'LUT', 'storyboard', 'gear']).map((word) => `<a href="?q=${encodeURIComponent(word)}">${esc(word)}</a>`).join('')}</div></div>
    <div class="search-default" id="searchDefault"><div class="home-block-head"><div><p class="eyebrow">START / 06</p><h2>${zh ? '先读这几篇' : 'Start with these'}</h2></div><a href="${prefix}${langPrefix}articles/">${zh ? '全部文章' : 'All guides'} ${ICON_ARROW}</a></div><div class="search-default-grid">${defaultCards}</div></div>
    <noscript><p class="search-hint">${zh ? '需要开启 JavaScript 才能搜索；也可以直接' : 'JavaScript is required to search; you can also'} <a href="${prefix}${langPrefix}articles/">${zh ? '浏览全部文章' : 'browse all articles'}</a>${zh ? '。' : '.'}</p></noscript>
  </div>
  <script>
  (function(){
    var index=${JSON.stringify(index[lang])};
    var siteName=${JSON.stringify(siteName)};
    var input=document.getElementById('staticSearchInput');
    var out=document.getElementById('staticSearchResults');
    var defaultBox=document.getElementById('searchDefault');
    function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
    function syncQuery(){
      var params=new URLSearchParams(location.search);
      var value=input.value.trim();
      if(value) params.set('q',value); else params.delete('q');
      var query=params.toString();
      try{history.replaceState(null,'',location.pathname+(query?'?'+query:''))}catch(e){}
    }
    function render(){
      var q=input.value.trim().toLowerCase();
      if(defaultBox) defaultBox.style.display=q?'none':'';
      if(!q){out.innerHTML='<p class="search-hint">${zh ? '输入关键词开始搜索。' : 'Type a keyword to start.'}</p>';return}
      var all=index.filter(function(x){return (x.title+' '+x.summary+' '+x.site+' '+x.id).toLowerCase().indexOf(q)>=0}); var hits=all.slice(0,24);
      if(!hits.length){out.innerHTML='<div class="empty"><p class="search-hint">${zh ? '没有匹配的文章。' : 'No matching guides.'}</p></div>';return}
      out.innerHTML='<p class="search-count">'+all.length+' ${zh ? '条结果' : 'results'}'+(all.length>24?' ${zh ? '（显示前 24 条）' : ' (showing first 24)'}':'')+'</p><div class="search-results">'+hits.map(function(x){return '<a class="search-result" href="'+x.url+'"><span class="result-type">'+esc(siteName[x.site]||x.site)+'</span><span><span class="result-title">'+esc(x.title)+'</span><span class="result-summary">'+esc(x.summary)+'</span></span></a>'}).join('')+'</div>';
    }
    function update(){render();syncQuery()}
    input.addEventListener('input',update);
    var initial=new URLSearchParams(location.search).get('q');
    if(initial){input.value=initial;render()}
  })();
  </script>`;
}

if (IS_MAIN) {
for (const lang of ['zh', 'en']) {
  const zh = lang === 'zh';
  const prefix = lang === 'en' ? '../' : '';
  const canonical = lang === 'en' ? `${SITE}/en/` : `${SITE}/`;
  const altZh = `${SITE}/`;
  const altEn = `${SITE}/en/`;
  const title = lang === 'en' ? 'TVCN · Video Production Knowledge' : 'TVCN · 影像制作知识库';
  const description = lang === 'en'
    ? 'Nine bilingual video-production sites: paths, methods, formats, tools, post, AI, animation, history and literacy.'
    : '9 个中英双语影像内容站：路径、方法、片型、工具、后期、AI、动画、影像史与素养。';
  const altHref = lang === 'en' ? `${prefix}` : `${prefix}en/`;
  write(`${lang === 'en' ? 'en/' : ''}index.html`, page({
    lang, title, description, canonical, altZh, altEn, image: ogImage(OG_FALLBACK), prefix,
    body: { id: 'home', html: homeView(lang, prefix) },
    type: 'home', author: zh ? 'TVCN 编辑部' : 'TVCN Editorial', site: 'main',
    verified: DATE_MODIFIED, altHref, altLabel: zh ? 'EN' : '中文'
  }));

  const aboutCanonical = lang === 'en' ? `${SITE}/en/about/` : `${SITE}/about/`;
  const aboutTitle = lang === 'en' ? 'About and editorial standards · TVCN' : '关于与编辑标准 · TVCN';
  const aboutDesc = lang === 'en'
    ? 'How TVCN writes, reviews, labels experience, handles corrections and uses AI.'
    : 'TVCN 怎么写、怎么复核、怎么标注经验、怎么更正，以及 AI 的使用边界。';
  const aboutPrefix = lang === 'en' ? '../../' : '../';
  const aboutAlt = lang === 'en' ? `${aboutPrefix}about/` : `${aboutPrefix}en/about/`;
  write(`${lang === 'en' ? 'en/' : ''}about/index.html`, page({
    lang, title: aboutTitle, description: aboutDesc, canonical: aboutCanonical,
    altZh: `${SITE}/about/`, altEn: `${SITE}/en/about/`, image: ogImage(OG_FALLBACK),
    prefix: aboutPrefix, body: { id: 'about', html: aboutView(lang, aboutPrefix) },
    type: 'about', author: zh ? 'TVCN 编辑部' : 'TVCN Editorial', site: 'main',
    verified: DATE_MODIFIED, altHref: aboutAlt, altLabel: zh ? 'EN' : '中文'
  }));
}
}
const searchIndex = {
  zh: data.zh.filter((a) => a.site === CONTENT_SITE).map((a) => ({ id: a.id, title: a.title, summary: stripTags(a.summary), site: a.site, url: `/article/${a.id}/` })),
  en: data.en.filter((a) => a.site === CONTENT_SITE).map((a) => ({ id: a.id, title: a.title, summary: stripTags(a.summary), site: a.site, url: `/en/article/${a.id}/` }))
};
write('search-index.json', JSON.stringify(searchIndex));

for (const lang of ['zh', 'en']) {
  const zh = lang === 'zh';
  const prefix = zh ? '../' : '../../';
  const langPrefix = zh ? '' : 'en/';
  const altPrefix = zh ? '../' : '../../';
  const canonicalBase = zh ? `${SITE}/paths/` : `${SITE}/en/paths/`;
  const title = zh ? '学习路径 · TVCN' : 'Learning paths · TVCN';
  const description = zh ? '9 条从真实任务开始的学习路径：按顺序读、按步骤做、按验收点检查。' : 'Nine learning paths that start from a real task: read in order, do the steps, pass the checks.';
  if (IS_MAIN) {
  write(`${langPrefix}paths/index.html`, page({
    lang, title, description, canonical: canonicalBase,
    altZh: `${SITE}/paths/`, altEn: `${SITE}/en/paths/`, image: ogImage(OG_FALLBACK), prefix,
    body: { id: 'paths', html: pathsView(lang, prefix) },
    type: 'collection', author: zh ? 'TVCN 编辑部' : 'TVCN Editorial', site: 'main',
    verified: DATE_MODIFIED, altHref: zh ? `${altPrefix}en/paths/` : `${altPrefix}paths/`, altLabel: zh ? 'EN' : '中文'
  }));
  }

  const searchCanonical = zh ? `${SITE}/search/` : `${SITE}/en/search/`;
  const searchTitle = zh ? '搜索全站 · TVCN' : 'Search · TVCN';
  const searchDescription = zh ? '按标题、摘要、分站或旧名搜索全部静态文章。' : 'Search all static guides by title, summary, site, or former name.';
  write(`${langPrefix}search/index.html`, page({
    lang, title: searchTitle, description: searchDescription, canonical: searchCanonical,
    altZh: `${SITE}/search/`, altEn: `${SITE}/en/search/`, image: ogImage(OG_FALLBACK), prefix,
    body: { id: 'search', html: searchView(lang, prefix, searchIndex) },
    type: 'collection', author: zh ? 'TVCN 编辑部' : 'TVCN Editorial', site: SITE_ID,
    verified: DATE_MODIFIED, altHref: zh ? `${altPrefix}en/search/` : `${altPrefix}search/`, altLabel: zh ? 'EN' : '中文',
    robots: 'noindex,follow'
  }));
}

if (!IS_MAIN && SITE_ID !== 'ai') {
  const site = allSites.find((s) => s.id === SITE_ID);
  for (const lang of ['zh', 'en']) {
    const zh = lang === 'zh';
    const prefix = zh ? '' : '../';
    const canonical = `https://${site.domain}${zh ? '/' : '/en/'}`;
    const altZh = `https://${site.domain}/`;
    const altEn = `https://${site.domain}/en/`;
    const title = `${zh ? site.nameZh : site.nameEn} · TVCN`;
    const description = zh ? site.descZh : site.descEn;
    const author = SITE_AUTHOR[site.id] ? (zh ? SITE_AUTHOR[site.id][0] : SITE_AUTHOR[site.id][1]) : 'TVCN';
    const html = page({
      lang, title, description, canonical, altZh, altEn,
      image: `https://${site.domain}/assets/og-cover.png`, prefix,
      body: { id: 'site-home', html: siteHomeView(lang, site, prefix) },
      type: 'home', author, site: site.id, verified: DATE_MODIFIED,
      altHref: zh ? 'en/' : '../', altLabel: zh ? 'EN' : '中文', origin: `https://${site.domain}`
    });
    write(`${zh ? '' : 'en/'}index.html`, html);
  }
}

const urls = [];
const alternatesFor = (zhLoc, enLoc) => [
  { hreflang: 'zh-CN', href: zhLoc },
  { hreflang: 'en', href: enLoc },
  { hreflang: 'x-default', href: zhLoc }
];
urls.push({ loc: SITE + '/', changefreq: 'weekly', priority: '1.0', alternates: alternatesFor(SITE + '/', SITE + '/en/') });
urls.push({ loc: SITE + '/en/', changefreq: 'weekly', priority: '0.9', alternates: alternatesFor(SITE + '/', SITE + '/en/') });
urls.push({ loc: SITE + '/articles/', changefreq: 'weekly', priority: '0.8', alternates: alternatesFor(SITE + '/articles/', SITE + '/en/articles/') });
urls.push({ loc: SITE + '/en/articles/', changefreq: 'weekly', priority: '0.8', alternates: alternatesFor(SITE + '/articles/', SITE + '/en/articles/') });
if (IS_MAIN) {
  urls.push({ loc: SITE + '/about/', changefreq: 'monthly', priority: '0.5', alternates: alternatesFor(SITE + '/about/', SITE + '/en/about/') });
  urls.push({ loc: SITE + '/en/about/', changefreq: 'monthly', priority: '0.5', alternates: alternatesFor(SITE + '/about/', SITE + '/en/about/') });
  urls.push({ loc: SITE + '/glossary/', changefreq: 'monthly', priority: '0.7', alternates: alternatesFor(SITE + '/glossary/', SITE + '/en/glossary/') });
  urls.push({ loc: SITE + '/en/glossary/', changefreq: 'monthly', priority: '0.6', alternates: alternatesFor(SITE + '/glossary/', SITE + '/en/glossary/') });
  urls.push({ loc: SITE + '/paths/', changefreq: 'monthly', priority: '0.7', alternates: alternatesFor(SITE + '/paths/', SITE + '/en/paths/') });
  urls.push({ loc: SITE + '/en/paths/', changefreq: 'monthly', priority: '0.6', alternates: alternatesFor(SITE + '/paths/', SITE + '/en/paths/') });
  urls.push({ loc: SITE + '/topics/', changefreq: 'monthly', priority: '0.7', alternates: alternatesFor(SITE + '/topics/', SITE + '/en/topics/') });
  urls.push({ loc: SITE + '/en/topics/', changefreq: 'monthly', priority: '0.6', alternates: alternatesFor(SITE + '/topics/', SITE + '/en/topics/') });
  for (const topic of TOPICS) {
    const zhLoc = `${SITE}/topics/${topic.slug}/`;
    const enLoc = `${SITE}/en/topics/${topic.slug}/`;
    urls.push({ loc: zhLoc, changefreq: 'monthly', priority: '0.6', alternates: alternatesFor(zhLoc, enLoc) });
    urls.push({ loc: enLoc, changefreq: 'monthly', priority: '0.5', alternates: alternatesFor(zhLoc, enLoc) });
  }
}
for (const a of data.zh.filter((x) => x.site === CONTENT_SITE)) {
  const zhLoc = `${SITE}/article/${a.id}/`;
  const enLoc = `${SITE}/en/article/${a.id}/`;
  const alternates = alternatesFor(zhLoc, enLoc);
  urls.push({ loc: zhLoc, lastmod: verifiedFor(a.id, 'zh'), changefreq: 'monthly', priority: '0.7', alternates });
  urls.push({ loc: enLoc, lastmod: verifiedFor(a.id, 'en'), changefreq: 'monthly', priority: '0.6', alternates });
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url><loc>${esc(u.loc)}</loc><lastmod>${u.lastmod || DATE_MODIFIED}</lastmod>${(u.alternates || []).map((a) => `<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}"/>`).join('')}<changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
console.log(`sitemap urls: ${urls.length}`);



