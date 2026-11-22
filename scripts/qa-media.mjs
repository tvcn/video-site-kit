// Verify the 21 bilingual narration demos are present and actually play.
const fs = await import('node:fs');
const pageUrl = 'file:///C:/Users/chenhua/Desktop/tvcn/v2/prototype/tvcn-ui-v2.html';
const assetRoot = 'C:/Users/chenhua/Desktop/tvcn/v2/prototype/';
const formatIds = ['talking-head', 'vlog', 'product-ad', 'brand-film', 'documentary', 'news', 'tutorial', 'short-drama', 'music-video', 'wedding', 'event', 'interview', 'experimental'];
const toolIds = ['camera-choice', 'audio-position', 'lighting-one-light', 'tripod', 'lav-system', 'export-h264', 'backup-3-2-1', 'budget-map'];

const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const page = targets.find((t) => t.type === 'page');
if (!page) throw new Error('No page target found on port 9222');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
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
  const callId = ++id;
  return new Promise((resolve, reject) => {
    pending.set(callId, { resolve, reject });
    ws.send(JSON.stringify({ id: callId, method, params }));
  });
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 1000, screenOrientation: { type: 'landscapePrimary', angle: 90 } });
await send('Page.navigate', { url: pageUrl });
await sleep(900);
await send('Runtime.evaluate', { expression: `localStorage.setItem('tvcn.lang','zh'); localStorage.setItem('tvcn.theme','light');` });
await send('Page.reload', { ignoreCache: true });
await sleep(1500);

let failures = 0;
let checks = 0;
function check(label, ok, detail) {
  checks += 1;
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`, detail ?? '');
}

const counts = await send('Runtime.evaluate', {
  expression: `(() => ({
    demos: Object.keys(MEDIA_DEMOS).length,
    formats: Object.keys(MEDIA_DEMOS).filter((key) => key.startsWith('fmt-')).length,
    tools: Object.keys(MEDIA_DEMOS).filter((key) => key.startsWith('tool-')).length,
    paths: Object.entries(MEDIA_DEMOS).flatMap(([key, item]) => [item.zh.audio, item.en.audio]),
    external: Object.values(MEDIA_DEMOS).filter((item) => item.zh.audio.startsWith('assets/audio/') && item.en.audio.startsWith('assets/audio/')).length,
    embedded: Object.values(MEDIA_DEMOS).filter((item) => item.zh.audio.startsWith('data:') || item.en.audio.startsWith('data:')).length
  }))()`,
  returnByValue: true,
});
check('21 media demos', counts.result.value.demos === 21, counts.result.value);
check('13 format demos', counts.result.value.formats === 13, counts.result.value.formats);
check('8 tool demos', counts.result.value.tools === 8, counts.result.value.tools);
check('all 42 audio tracks external', counts.result.value.paths.length === 42 && counts.result.value.external === 21 && counts.result.value.embedded === 0, counts.result.value);
const missingAudio = counts.result.value.paths.filter((relative) => !fs.existsSync(assetRoot + relative));
check('all 42 audio files exist', missingAudio.length === 0, missingAudio);

await send('Runtime.evaluate', { expression: `location.hash = '#/tools';` });
await sleep(450);
const toolsPage = await send('Runtime.evaluate', {
  expression: `(() => ({
    cards: [...document.querySelectorAll('#main .media-demo')].length,
    audios: [...document.querySelectorAll('#main audio')].length,
    ids: [...document.querySelectorAll('#main .media-demo')].map((el) => el.dataset.media)
  }))()`,
  returnByValue: true,
});
check('tools page 8 audio demos', toolsPage.result.value.cards === 8 && toolsPage.result.value.audios === 8, toolsPage.result.value);
check('tools page IDs complete', toolIds.every((key) => toolsPage.result.value.ids.includes('tool-' + key)), toolsPage.result.value.ids);

const toolsRoute = await send('Runtime.evaluate', {
  expression: `(() => { location.hash = '#/article/camera-choice'; return true; })()`,
  returnByValue: true,
});
await sleep(450);
const toolMedia = await send('Runtime.evaluate', {
  expression: `(() => ({
    cards: [...document.querySelectorAll('#main .media-demo')].length,
    audios: [...document.querySelectorAll('#main audio')].length,
    transcripts: [...document.querySelectorAll('#main .media-copy')].length,
    ids: [...document.querySelectorAll('#main .media-demo')].map((el) => el.dataset.media)
  }))()`,
  returnByValue: true,
});
check('camera tool article 1 media', toolMedia.result.value.cards === 1 && toolMedia.result.value.audios === 1, toolMedia.result.value);
check('tool media id', toolMedia.result.value.ids.includes('tool-camera-choice'), toolMedia.result.value.ids);

for (const toolId of toolIds) {
  await send('Runtime.evaluate', { expression: `location.hash = '#/article/${toolId}';` });
  await sleep(250);
  const row = await send('Runtime.evaluate', {
    expression: `(() => ({
      demos: document.querySelectorAll('#main .media-demo').length,
      audio: document.querySelector('#main audio')?.id || '',
      button: document.querySelector('#main [data-media-play]')?.dataset.mediaPlay || '',
      transcript: Boolean(document.querySelector('#main .media-copy p')?.textContent.trim())
    }))()`,
    returnByValue: true,
  });
  check(`tool ${toolId} media`, row.result.value.demos === 1 && row.result.value.audio === 'audio-tool-' + toolId && row.result.value.transcript, row.result.value);
}

for (const formatId of formatIds) {
  await send('Runtime.evaluate', { expression: `location.hash = '#/format/${formatId}';` });
  await sleep(250);
  const row = await send('Runtime.evaluate', {
    expression: `(() => ({
      demos: document.querySelectorAll('#main .media-demo').length,
      audio: document.querySelector('#main audio')?.id || '',
      button: document.querySelector('#main [data-media-play]')?.dataset.mediaPlay || '',
      transcript: Boolean(document.querySelector('#main .media-copy p')?.textContent.trim())
    }))()`,
    returnByValue: true,
  });
  check(`format ${formatId} media`, row.result.value.demos === 1 && row.result.value.audio === 'audio-fmt-' + formatId && row.result.value.transcript, row.result.value);
}

await send('Runtime.evaluate', { expression: `location.hash = '#/tools';` });
await sleep(350);
const playResult = await send('Runtime.evaluate', {
  expression: `(async () => {
    const button = document.querySelector('[data-media-play="tool-camera-choice"]');
    if (!button) return { error: 'missing button' };
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 800));
    const audio = document.getElementById('audio-tool-camera-choice');
    return { src: audio.src, paused: audio.paused, currentTime: audio.currentTime, duration: audio.duration, pressed: button.getAttribute('aria-pressed') };
  })()`,
  awaitPromise: true,
  returnByValue: true,
  userGesture: true,
});
check('audio actually plays', playResult.result.value.src?.endsWith('/assets/audio/zh/tool-camera-choice.zh.mp3') && playResult.result.value.currentTime > 0, playResult.result.value);

const pauseResult = await send('Runtime.evaluate', {
  expression: `(async () => {
    document.querySelector('[data-media-play="tool-camera-choice"]')?.click();
    await new Promise((resolve) => setTimeout(resolve, 300));
    const audio = document.getElementById('audio-tool-camera-choice');
    const button = document.querySelector('[data-media-play="tool-camera-choice"]');
    return { paused: audio.paused, pressed: button.getAttribute('aria-pressed'), label: button.textContent.trim() };
  })()`,
  awaitPromise: true,
  returnByValue: true,
  userGesture: true,
});
check('audio pauses and resets label', pauseResult.result.value.paused && pauseResult.result.value.pressed === 'false', pauseResult.result.value);

const langPlayResult = await send('Runtime.evaluate', {
  expression: `(async () => {
    setLang('en');
    await new Promise((resolve) => setTimeout(resolve, 500));
    document.querySelector('[data-media-play="tool-camera-choice"]')?.click();
    await new Promise((resolve) => setTimeout(resolve, 900));
    const audio = document.getElementById('audio-tool-camera-choice');
    return { src: audio.src, error: audio.error?.code ?? null, duration: audio.duration };
  })()`,
  awaitPromise: true,
  returnByValue: true,
  userGesture: true,
});
check('English switch reloads English audio', langPlayResult.result.value.src?.endsWith('/assets/audio/en/tool-camera-choice.en.mp3') && langPlayResult.result.value.duration > 0, langPlayResult.result.value);

console.log(`\n${failures === 0 ? 'MEDIA CHECKS OK' : failures + ' MEDIA CHECK(S) FAILED'} (${checks} checks)`);
ws.close();
if (failures) process.exitCode = 1;
