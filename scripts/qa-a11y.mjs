// Accessibility smoke test through Chrome DevTools Protocol.
// Covers landmarks, focus handoff, skip link, mobile menu trap, target size,
// contrast, reduced motion, heading order, IDs and image/SVG names.
// Usage: node qa-a11y.mjs
const pageUrl = 'file:///C:/Users/chenhua/Desktop/tvcn/v2/prototype/tvcn-ui-v2.html';

const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const page = targets.find((t) => t.type === 'page');
if (!page) throw new Error('No page target found on port 9222');

const ws = new WebSocket(page.webSocketDebuggerUrl);
let sequence = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
});
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});
function send(method, params = {}) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ' :: ' + expression.slice(0, 120));
  return result.result.value;
}
let failures = 0;
let totalChecks = 0;
function check(name, ok, detail) {
  totalChecks += 1;
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail === undefined ? '' : ' ' + JSON.stringify(detail)}`);
}
async function route(hash) {
  await evaluate(`location.hash = ${JSON.stringify(hash)};`);
  await sleep(420);
}

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 1000, screenOrientation: { type: 'landscapePrimary', angle: 0 } });
await send('Page.navigate', { url: pageUrl });
await sleep(1200);
await evaluate(`localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light'); location.reload();`);
await sleep(1400);
await route('#/');

const firstArticle = await evaluate('ARTICLES[0].id');
const base = await evaluate(`(() => {
  const all = [...document.querySelectorAll('a[href], button, summary, input, select')].filter((el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && getComputedStyle(el).visibility !== 'hidden';
  });
  const labels = all.map((el) => {
    const name = el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || '';
    return { tag: el.tagName, cls: el.className, name: name.trim().slice(0, 24), id: el.id };
  });
  const unnamed = labels.filter((item) => !item.name);
  const tiny = [];
  for (const el of all) {
    if (!(el.matches('button, summary, select') || (el.matches('input') && el.type === 'checkbox'))) continue;
    const rect = (el.closest('label') || el).getBoundingClientRect();
    if (rect.width < 24 || rect.height < 24) tiny.push({ tag: el.tagName, id: el.id, cls: String(el.className).slice(0, 30), w: Math.round(rect.width), h: Math.round(rect.height) });
  }
  const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const imgs = [...document.querySelectorAll('img')].filter((img) => !img.hasAttribute('alt'));
  const svgs = [...document.querySelectorAll('svg')].filter((svg) => !(svg.getAttribute('aria-hidden') === 'true' || (svg.getAttribute('role') === 'img' && svg.getAttribute('aria-label'))));
  const positiveTabs = [...document.querySelectorAll('[tabindex]')].filter((el) => Number(el.getAttribute('tabindex')) > 0).length;
  const headingList = [...document.querySelectorAll('#main h1, #main h2, #main h3, #main h4, #main h5, #main h6')].map((el) => ({ level: Number(el.tagName.slice(1)), text: el.innerText.trim().slice(0, 32) }));
  let skipped = null;
  for (let i = 1; i < headingList.length; i += 1) {
    if (headingList[i].level - headingList[i - 1].level > 1) skipped = [headingList[i - 1], headingList[i]];
  }
  const firstFocusable = document.querySelector('a[href], button, input, select, summary');
  return {
    landmarks: { main: document.querySelectorAll('main').length, header: document.querySelectorAll('header').length, footer: document.querySelectorAll('footer').length, nav: document.querySelectorAll('nav').length },
    mainTab: document.getElementById('main').getAttribute('tabindex'),
    mainLabel: document.getElementById('main').getAttribute('aria-label'),
    docTitle: document.title,
    skipFirst: firstFocusable ? firstFocusable.classList.contains('skip-link') : false,
    unnamed,
    tiny,
    duplicateIds,
    missingAlt: imgs.map((img) => img.src),
    unnamedSvg: svgs.map((svg) => svg.outerHTML.slice(0, 80)),
    positiveTabs,
    headingList,
    skipped,
    tabCurrent: document.querySelectorAll('.tab-link[aria-current="page"]').length,
    menuRole: document.getElementById('menuPanel').getAttribute('role'),
    menuModal: document.getElementById('menuPanel').getAttribute('aria-modal'),
    menuExpanded: document.getElementById('menuBtn').getAttribute('aria-expanded')
  };
})()`);
check('landmarks', base.landmarks.main === 1 && base.landmarks.header === 1 && base.landmarks.footer === 1 && base.landmarks.nav >= 2, base.landmarks);
check('main tabindex/name', base.mainTab === '-1' && base.mainLabel === base.docTitle, { tab: base.mainTab, label: base.mainLabel, title: base.docTitle });
check('skip link first', base.skipFirst, base.skipFirst);
check('heading h1', base.headingList.filter((item) => item.level === 1).length === 1, base.headingList);
check('heading no jump', base.skipped === null, base.skipped);
check('unnamed controls', base.unnamed.length === 0, base.unnamed);
check('target >=24', base.tiny.length === 0, base.tiny);
check('duplicate ids', base.duplicateIds.length === 0, base.duplicateIds);
check('image alt attr', base.missingAlt.length === 0, base.missingAlt);
check('svg named/hidden', base.unnamedSvg.length === 0, base.unnamedSvg);
check('no positive tabindex', base.positiveTabs === 0, base.positiveTabs);
check('mobile tabs current exactly one', base.tabCurrent === 1, base.tabCurrent);
check('menu semantic shell', base.menuRole === 'dialog' && base.menuModal === 'true' && base.menuExpanded === 'false', { role: base.menuRole, modal: base.menuModal, expanded: base.menuExpanded });

const contrast = await evaluate(`(() => {
  function rgb(hex) {
    const h = String(hex).trim().replace('#', '');
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  }
  function lum(hex) {
    const f = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    const [r, g, b] = rgb(hex);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }
  function ratio(a, b) {
    const x = lum(a), y = lum(b);
    return Number(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2));
  }
  function read(theme) {
    document.documentElement.dataset.theme = theme;
    const cs = getComputedStyle(document.documentElement);
    const get = (name) => cs.getPropertyValue(name).trim();
    const vars = { bg: get('--bg'), surface: get('--surface'), ink: get('--ink'), muted: get('--muted'), accent: get('--accent'), teal: get('--teal'), gold: get('--gold') };
    return {
      theme, vars,
      ink: ratio(vars.ink, vars.bg),
      muted: ratio(vars.muted, vars.bg),
      accent: ratio(vars.accent, vars.bg),
      accentSurface: ratio(vars.accent, vars.surface),
      teal: ratio(vars.teal, vars.bg),
      gold: ratio(vars.gold, vars.bg)
    };
  }
  const light = read('light');
  const dark = read('dark');
  document.documentElement.dataset.theme = 'light';
  return { light, dark };
})()`);
for (const theme of [contrast.light, contrast.dark]) {
  check(`contrast ${theme.theme} ink`, theme.ink >= 7, theme.ink);
  check(`contrast ${theme.theme} muted`, theme.muted >= 4.5, theme.muted);
  check(`contrast ${theme.theme} accent`, theme.accent >= 4.5 && theme.accentSurface >= 4.5, { bg: theme.accent, surface: theme.accentSurface });
  check(`contrast ${theme.theme} teal`, theme.teal >= 4.5, theme.teal);
  check(`contrast ${theme.theme} gold graphic`, theme.gold >= 3, theme.gold);
}

await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await sleep(120);
const motion = await evaluate(`(() => {
  const media = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const btn = getComputedStyle(document.querySelector('.btn'));
  return { media, transition: btn.transitionDuration, scroll: getComputedStyle(document.documentElement).scrollBehavior };
})()`);
check('reduced motion media', motion.media === true, motion);
check('reduced motion css', motion.transition.split(',').every((value) => value.trim() === '0s') && motion.scroll === 'auto', motion);
await send('Emulation.setEmulatedMedia', { features: [] });

await route('#/article/' + firstArticle);
let focusState = await evaluate(`(() => ({ active: document.activeElement && document.activeElement.id, scrollY, label: document.getElementById('main').getAttribute('aria-label'), title: document.title }))()`);
check('route focus to main', focusState.active === 'main' && focusState.scrollY === 0 && focusState.label === focusState.title, focusState);
await route('#/site/story');
focusState = await evaluate(`(() => ({ active: document.activeElement && document.activeElement.id, scrollY, label: document.getElementById('main').getAttribute('aria-label'), title: document.title }))()`);
check('site route focus to main', focusState.active === 'main' && focusState.scrollY === 0 && focusState.label === focusState.title, focusState);

await evaluate(`window.scrollTo(0, 420); const skip = document.querySelector('.skip-link'); skip.focus();`);
await sleep(100);
const beforeSkip = await evaluate('location.hash');
await evaluate(`document.querySelector('.skip-link').click();`);
await sleep(220);
const skipState = await evaluate(`(() => ({ active: document.activeElement && document.activeElement.id, hash: location.hash, scrollY }))()`);
check('skip link keeps route', skipState.active === 'main' && skipState.hash === beforeSkip, { before: beforeSkip, after: skipState });

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 390, screenHeight: 844, screenOrientation: { type: 'portraitPrimary', angle: 0 } });
await route('#/');
const menuOpen = await evaluate(`(() => {
  document.getElementById('menuBtn').click();
  const panel = document.getElementById('menuPanel');
  return {
    hidden: panel.hidden,
    expanded: document.getElementById('menuBtn').getAttribute('aria-expanded'),
    inert: document.getElementById('main').hasAttribute('inert'),
    inside: panel.contains(document.activeElement),
    active: document.activeElement && document.activeElement.className
  };
})()`);
check('menu opens, focus inside', menuOpen.hidden === false && menuOpen.expanded === 'true' && menuOpen.inert === true && menuOpen.inside === true, menuOpen);
const trapForward = await evaluate(`(() => {
  const panel = document.getElementById('menuPanel');
  const links = [...panel.querySelectorAll('a')];
  links[links.length - 1].focus();
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
  return { active: document.activeElement && document.activeElement.id };
})()`);
check('menu trap forward', trapForward.active === 'menuBtn', trapForward);
const trapBack = await evaluate(`(() => {
  const panel = document.getElementById('menuPanel');
  const first = panel.querySelector('a');
  first.focus();
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
  return { active: document.activeElement && document.activeElement.id };
})()`);
check('menu trap backward', trapBack.active === 'menuBtn', trapBack);
const menuClosed = await evaluate(`(() => {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  return {
    hidden: document.getElementById('menuPanel').hidden,
    expanded: document.getElementById('menuBtn').getAttribute('aria-expanded'),
    inert: document.getElementById('main').hasAttribute('inert'),
    active: document.activeElement && document.activeElement.id
  };
})()`);
check('escape closes and restores focus', menuClosed.hidden === true && menuClosed.expanded === 'false' && menuClosed.inert === false && menuClosed.active === 'menuBtn', menuClosed);

const routesForHeadings = ['#/', '#/article/' + firstArticle, '#/site/story', '#/format/talking-head', '#/case/vertical-talk', '#/tools', '#/glossary', '#/progress', '#/search', '#/templates', '#/trust', '#/trust/standards', '#/structures'];
for (const hash of routesForHeadings) {
  await route(hash);
  const row = await evaluate(`(() => {
    const heads = [...document.querySelectorAll('#main h1, #main h2, #main h3, #main h4, #main h5, #main h6')].map((el) => ({ level: Number(el.tagName.slice(1)), text: el.innerText.trim().slice(0, 24) }));
    let skipped = null;
    for (let i = 1; i < heads.length; i += 1) if (heads[i].level - heads[i - 1].level > 1) skipped = [heads[i - 1], heads[i]];
    const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
    return { h1: heads.filter((item) => item.level === 1).length, skipped, dup: ids.filter((id, index) => ids.indexOf(id) !== index), overflow: document.documentElement.scrollWidth - innerWidth };
  })()`);
  check(`route ${hash} headings`, row.h1 === 1 && row.skipped === null, row);
  check(`route ${hash} ids/overflow`, row.dup.length === 0 && row.overflow <= 1, row);
}

console.log(`\n${failures === 0 ? 'A11Y CHECKS OK' : failures + ' A11Y CHECK(S) FAILED'} (${totalChecks} checks)`);
ws.close();
if (failures) process.exitCode = 1;
