// 2026-11-24: interactive calculator widgets for the seven calculator pages.
// Values are transparent formulas, not hidden scores. No external service.
export const CALCULATOR_IDS = [
  'nd-calculator', 'dof-calculator', 'storage-calculator', 'bitrate-calculator',
  'budget-calculator', 'subtitle-cps', 'aspect-calculator'
];

export const CALCULATOR_CSS = `
.static-page .calc-widget{max-width:760px;margin:22px 0 8px;padding:16px 18px;border:1px solid var(--line);border-radius:12px;background:var(--surface)}
.static-page .calc-widget h2{margin:0 0 6px;font-size:20px}
.static-page .calc-widget h2::before{display:none}
.static-page .calc-lede{margin:0 0 12px;color:var(--muted);font-size:12.5px;line-height:1.6}
.static-page .calc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.static-page .calc-field{display:flex;flex-direction:column;gap:5px;font-size:11.5px;line-height:1.35;color:var(--muted)}
.static-page .calc-field span{font-weight:600;color:var(--ink)}
.static-page .calc-field input,.static-page .calc-field select{width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);color:var(--ink);font:13px/1.2 var(--sans,system-ui,sans-serif)}
.static-page .calc-field input:focus,.static-page .calc-field select:focus{outline:2px solid var(--accent);outline-offset:1px}
.static-page .calc-output{margin-top:13px;padding:12px 14px;border-left:3px solid var(--accent);border-radius:8px;background:var(--surface-2);font-size:12.5px;line-height:1.6;color:var(--muted)}
.static-page .calc-output strong{display:block;margin-bottom:2px;color:var(--ink);font-size:22px;line-height:1.25;font-variant-numeric:tabular-nums}
.static-page .calc-actions{margin-top:10px;display:flex;justify-content:flex-end}
.static-page .calc-actions button{padding:6px 10px;border:1px solid var(--line);border-radius:999px;background:var(--surface);color:var(--muted);font:11px/1.2 var(--sans,system-ui,sans-serif);cursor:pointer}
.static-page .calc-actions button:hover{color:var(--ink);border-color:var(--line-strong)}
.static-page .calc-formula{margin:10px 0 0;color:var(--muted);font-size:11px;line-height:1.55}
.static-page .calc-noscript{margin:8px 0 0;color:var(--accent);font-size:11px}
@media(max-width:560px){.static-page .calc-widget{padding:14px}.static-page .calc-grid{grid-template-columns:1fr 1fr}.static-page .calc-output strong{font-size:19px}}
@media(max-width:360px){.static-page .calc-grid{grid-template-columns:1fr}}
`;

const field = (label, name, value, step = 'any', min = '') =>
  `<label class="calc-field"><span>${label}</span><input type="number" inputmode="decimal" data-calc="${name}" data-default="${value}" value="${value}" step="${step}"${min ? ` min="${min}"` : ''}></label>`;

const select = (label, name, options, def) =>
  `<label class="calc-field"><span>${label}</span><select data-calc="${name}" data-default="${def}">${options.map(([v, t]) => `<option value="${v}"${v === def ? ' selected' : ''}>${t}</option>`).join('')}</select></label>`;

const shell = ({ id, title, lede, fields, result, formula, reset, noscript, extra = '' }) => `<section class="calc-widget" data-calculator="${id}">
<h2>${title}</h2>
<p class="calc-lede">${lede}</p>
<div class="calc-grid">${fields}</div>
<div class="calc-output" aria-live="polite"><strong data-out="result">${result}</strong><span data-out="detail">${extra}</span></div>
<div class="calc-actions"><button type="button" data-reset>${reset}</button></div>
<p class="calc-formula">${formula}</p>
<noscript><p class="calc-noscript">${noscript}</p></noscript>
</section>`;

export const CALC_WIDGETS = {
  zh: {
    'nd-calculator': shell({
      id: 'nd-calculator', title: 'ND 计算器',
      lede: '输入当前快门与目标快门，算出需要几档减光，并给出最接近的标准 ND。',
      fields: field('当前快门分母（1/s）', 'current', 50, '1', '1') + field('目标快门分母（1/s）', 'target', 25, '1', '1'),
      result: 'ND —', extra: '两档之间优先选更少减光，再用光圈微调。',
      formula: '公式：档数 = log₂(当前分母 ÷ 目标分母)；ND 系数 = 2^档数。',
      reset: '恢复默认', noscript: 'JavaScript 关闭时按上方公式手算；默认值 50 → 25 约需 1 档，即 ND2。'
    }),
    'dof-calculator': shell({
      id: 'dof-calculator', title: '景深计算器',
      lede: '按全画幅常用弥散圆 0.03mm 估算；换传感器请在弥散圆里改。',
      fields: field('焦距（mm）', 'focal', 35, '1', '1') + field('光圈（f/）', 'fnumber', 2.8, '0.1', '0.1') + field('对焦距离（m）', 'distance', 3, '0.1', '0.1') + field('弥散圆（mm）', 'coc', 0.03, '0.001', '0.001'),
      result: '景深 —', extra: '超焦距与前后界会随焦距、光圈和距离变化。',
      formula: '公式：H = f² ÷ (N × c) + f；近界 = H×s ÷ (H+s−f)；远界 = H×s ÷ (H−s+f)。',
      reset: '恢复默认', noscript: 'JavaScript 关闭时按公式手算；35mm、f/2.8、3m、c=0.03mm 的景深约 1.3m。'
    }),
    'storage-calculator': shell({
      id: 'storage-calculator', title: '存储计算器',
      lede: '按十进制 GB（1GB=8000 Mb）估算；实际格式化容量和录制开销会更少。',
      fields: field('卡容量（GB）', 'capacity', 128, '1', '1') + field('录制码率（Mbps）', 'bitrate', 200, '1', '1') + field('预留安全空间（%）', 'safety', 10, '1', '0'),
      result: '可录 —', extra: '长时间录制还要考虑电池、分段和卡速。',
      formula: '公式：分钟 = 容量GB × 8000 ÷ 码率Mbps ÷ 60 × (1 − 安全比例)。',
      reset: '恢复默认', noscript: 'JavaScript 关闭时按公式手算；128GB、200Mbps、留 10% 约 76 分钟。'
    }),
    'bitrate-calculator': shell({
      id: 'bitrate-calculator', title: '码率 / 文件大小计算器',
      lede: '已知时长和目标文件大小，反推平均码率；不含音频和封装开销。',
      fields: field('时长（分钟）', 'minutes', 10, '0.1', '0.1') + field('目标大小（GB）', 'size', 4, '0.1', '0.1'),
      result: '码率 —', extra: '平台上传还要留 5%–10% 封装与音频余量。',
      formula: '公式：Mbps = 大小GB × 8000 ÷ 时长秒数。',
      reset: '恢复默认', noscript: 'JavaScript 关闭时按公式手算；10 分钟 4GB 约 53.3 Mbps。'
    }),
    'budget-calculator': shell({
      id: 'budget-calculator', title: '预算分配计算器',
      lede: '输入总预算和四类占比，得到金额与未分配余额；比例之和不要超过 100%。',
      fields: field('总预算（元）', 'total', 20000, '1', '0') + field('拍摄 %', 'shoot', 30, '1', '0') + field('后期 %', 'post', 30, '1', '0') + field('器材 %', 'gear', 15, '1', '0') + field('意外金 %', 'contingency', 10, '1', '0'),
      result: '未分配 —', extra: '意外金不等于利润，单独记账。',
      formula: '金额 = 总预算 × 占比；未分配 = 总预算 − 四项金额。',
      reset: '恢复默认', noscript: 'JavaScript 关闭时按公式手算；2 万元、30/30/15/10% 后未分配 3,000 元。'
    }),
    'subtitle-cps': shell({
      id: 'subtitle-cps', title: '字幕速度（CPS）计算器',
      lede: '中文建议不超过 9–15 字/秒；超过 15 就拆句或延长停留。',
      fields: field('字幕字数（含标点）', 'chars', 24, '1', '1') + field('停留时长（秒）', 'seconds', 2, '0.1', '0.1'),
      result: 'CPS —', extra: '台词密度高时，优先删字，不要只缩时长。',
      formula: '公式：CPS = 字数 ÷ 停留秒数。',
      reset: '恢复默认', noscript: 'JavaScript 关闭时按公式手算；24 字 / 2 秒 = 12 CPS。'
    }),
    'aspect-calculator': shell({
      id: 'aspect-calculator', title: '比例裁切计算器',
      lede: '按目标比例从原图内最大裁切，输出保留像素与裁切比例。',
      fields: field('原片宽（px）', 'width', 3840, '1', '1') + field('原片高（px）', 'height', 2160, '1', '1') + select('目标比例', 'ratio', [['1:1', '1:1 方图'], ['4:5', '4:5 竖版'], ['9:16', '9:16 全屏'], ['16:9', '16:9 横版'], ['2.35:1', '2.35:1 宽银幕']], '9:16'),
      result: '裁切 —', extra: '先保主体，再裁边；不要从中间硬切。',
      formula: '比较原片与目标比例：偏宽则裁宽，偏窄则裁高；保留另一边的全部像素。',
      reset: '恢复默认', noscript: 'JavaScript 关闭时按公式手算；3840×2160 转 9:16 保留 1215×2160。'
    })
  },
  en: {
    'nd-calculator': shell({
      id: 'nd-calculator', title: 'ND calculator',
      lede: 'Enter current and target shutter denominators to get stops and the nearest standard ND.',
      fields: field('Current shutter denominator (1/s)', 'current', 50, '1', '1') + field('Target shutter denominator (1/s)', 'target', 25, '1', '1'),
      result: 'ND —', extra: 'Between two densities, pick less ND and trim with aperture.',
      formula: 'Formula: stops = log₂(current ÷ target); ND factor = 2^stops.',
      reset: 'Reset defaults', noscript: 'With JavaScript off, use the formula; 50 → 25 is about one stop, ND2.'
    }),
    'dof-calculator': shell({
      id: 'dof-calculator', title: 'Depth of field calculator',
      lede: 'Estimated with a full-frame circle of confusion of 0.03mm; change it for other sensors.',
      fields: field('Focal length (mm)', 'focal', 35, '1', '1') + field('Aperture (f/)', 'fnumber', 2.8, '0.1', '0.1') + field('Focus distance (m)', 'distance', 3, '0.1', '0.1') + field('Circle of confusion (mm)', 'coc', 0.03, '0.001', '0.001'),
      result: 'DOF —', extra: 'Hyperfocal distance and near/far limits move with focal, aperture and distance.',
      formula: 'Formula: H = f² ÷ (N × c) + f; near = H×s ÷ (H+s−f); far = H×s ÷ (H−s+f).',
      reset: 'Reset defaults', noscript: 'With JavaScript off, use the formula; 35mm, f/2.8, 3m, c=0.03mm gives about 1.3m DOF.'
    }),
    'storage-calculator': shell({
      id: 'storage-calculator', title: 'Storage calculator',
      lede: 'Uses decimal GB (1GB=8000 Mb); formatted capacity and recording overhead will reduce it.',
      fields: field('Card capacity (GB)', 'capacity', 128, '1', '1') + field('Recording bitrate (Mbps)', 'bitrate', 200, '1', '1') + field('Safety reserve (%)', 'safety', 10, '1', '0'),
      result: 'Record —', extra: 'Long takes also depend on battery, clip splitting and card speed.',
      formula: 'Formula: minutes = capacityGB × 8000 ÷ bitrateMbps ÷ 60 × (1 − safety).',
      reset: 'Reset defaults', noscript: 'With JavaScript off: 128GB, 200Mbps, 10% reserve is about 76 minutes.'
    }),
    'bitrate-calculator': shell({
      id: 'bitrate-calculator', title: 'Bitrate / file size calculator',
      lede: 'Given duration and target size, estimate average bitrate; audio and container overhead excluded.',
      fields: field('Duration (minutes)', 'minutes', 10, '0.1', '0.1') + field('Target size (GB)', 'size', 4, '0.1', '0.1'),
      result: 'Bitrate —', extra: 'Leave 5%–10% headroom for audio and container on upload.',
      formula: 'Formula: Mbps = sizeGB × 8000 ÷ durationSeconds.',
      reset: 'Reset defaults', noscript: 'With JavaScript off: 10 minutes at 4GB is about 53.3 Mbps.'
    }),
    'budget-calculator': shell({
      id: 'budget-calculator', title: 'Budget allocation calculator',
      lede: 'Enter total and four percentages to get amounts and unallocated balance; keep the total at or below 100%.',
      fields: field('Total budget', 'total', 20000, '1', '0') + field('Shoot %', 'shoot', 30, '1', '0') + field('Post %', 'post', 30, '1', '0') + field('Gear %', 'gear', 15, '1', '0') + field('Contingency %', 'contingency', 10, '1', '0'),
      result: 'Unallocated —', extra: 'Contingency is not profit; keep it on its own line.',
      formula: 'Amount = total × percentage; unallocated = total − four amounts.',
      reset: 'Reset defaults', noscript: 'With JavaScript off: 20,000 at 30/30/15/10% leaves 3,000 unallocated.'
    }),
    'subtitle-cps': shell({
      id: 'subtitle-cps', title: 'Subtitle CPS calculator',
      lede: 'Chinese subtitles should stay around 9–15 characters per second; above 15, split or hold longer.',
      fields: field('Characters (with punctuation)', 'chars', 24, '1', '1') + field('Duration (seconds)', 'seconds', 2, '0.1', '0.1'),
      result: 'CPS —', extra: 'When dialogue is dense, cut words before cutting duration.',
      formula: 'Formula: CPS = characters ÷ seconds.',
      reset: 'Reset defaults', noscript: 'With JavaScript off: 24 characters in 2 seconds = 12 CPS.'
    }),
    'aspect-calculator': shell({
      id: 'aspect-calculator', title: 'Aspect-ratio crop calculator',
      lede: 'Finds the largest crop at the target ratio and reports kept pixels and crop percentage.',
      fields: field('Source width (px)', 'width', 3840, '1', '1') + field('Source height (px)', 'height', 2160, '1', '1') + select('Target ratio', 'ratio', [['1:1', '1:1 square'], ['4:5', '4:5 vertical'], ['9:16', '9:16 full screen'], ['16:9', '16:9 horizontal'], ['2.35:1', '2.35:1 widescreen']], '9:16'),
      result: 'Crop —', extra: 'Protect the subject first, then trim edges; do not center-crop blindly.',
      formula: 'Compare source and target ratios: if wider, crop width; if taller, crop height. Keep the other axis.',
      reset: 'Reset defaults', noscript: 'With JavaScript off: 3840×2160 to 9:16 keeps 1215×2160.'
    })
  }
};

export const CALCULATOR_JS = `(function(){
  var std = [2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384];
  function num(root, name){ var el = root.querySelector('[data-calc="'+name+'"]'); var n = el ? parseFloat(el.value) : NaN; return isFinite(n) ? n : NaN; }
  function text(root, name, value){ var el = root.querySelector('[data-out="'+name+'"]'); if(el) el.textContent = value; }
  function f(n, d){ if(!isFinite(n)) return '—'; var p = Math.pow(10, d||0); return (Math.round(n*p)/p).toLocaleString('zh-CN', {maximumFractionDigits: d||0}); }
  function nearestStd(v){ var best = std[0]; for(var i=0;i<std.length;i++){ if(std[i] <= v + 0.001) best = std[i]; } return best; }
  function calc(root){
    var type = root.getAttribute('data-calculator');
    if(type === 'nd-calculator'){
      var cur = num(root,'current'), target = num(root,'target');
      if(!isFinite(cur)||!isFinite(target)||cur<=0||target<=0){ text(root,'result','ND —'); text(root,'detail','请输入大于 0 的快门分母。'); return; }
      var stops = Math.log2(cur/target); var factor = Math.pow(2, stops); var nd = nearestStd(factor);
      if(stops <= 0.05){ text(root,'result','无需 ND'); text(root,'detail','目标快门不比当前慢；可收小光圈或降 ISO。'); return; }
      text(root,'result','ND' + nd); text(root,'detail','需要 ' + f(stops,1) + ' 档；理论系数 ' + f(factor,1) + '，最接近 ND' + nd + '。');
    }
    if(type === 'dof-calculator'){
      var fo=num(root,'focal'), fn=num(root,'fnumber'), s=num(root,'distance'), c=num(root,'coc');
      if(!isFinite(fo)||!isFinite(fn)||!isFinite(s)||!isFinite(c)||fo<=0||fn<=0||s<=0||c<=0){ text(root,'result','景深 —'); return; }
      var sm = s * 1000;
      var H = (fo*fo)/(fn*c) + fo; var near = (H*sm)/(H+sm-fo); var far = sm < H ? (H*sm)/(H-sm+fo) : Infinity;
      var dof = isFinite(far) ? (far-near)/1000 : Infinity;
      text(root,'result', isFinite(dof) ? f(dof,2)+' m' : '无限远');
      text(root,'detail','近界 ' + f(near/1000,2) + ' m；远界 ' + (isFinite(far) ? f(far/1000,2)+' m' : '∞') + '；超焦距 ' + f(H/1000,1) + ' m。');
    }
    if(type === 'storage-calculator'){
      var cap=num(root,'capacity'), br=num(root,'bitrate'), safe=num(root,'safety');
      if(!isFinite(cap)||!isFinite(br)||cap<=0||br<=0){ text(root,'result','可录 —'); return; }
      var mins = cap*8000/br/60*(1-(isFinite(safe)?safe:0)/100);
      text(root,'result', f(mins,1)+' 分钟');
      text(root,'detail','约 ' + f(mins/60,2) + ' 小时；按十进制 GB 估算，未计格式化损耗。');
    }
    if(type === 'bitrate-calculator'){
      var m=num(root,'minutes'), sz=num(root,'size');
      if(!isFinite(m)||!isFinite(sz)||m<=0||sz<=0){ text(root,'result','码率 —'); return; }
      var mbps = sz*8000/(m*60);
      text(root,'result', f(mbps,1)+' Mbps');
      text(root,'detail','含音频与封装前；留 5%–10% 余量更稳。');
    }
    if(type === 'budget-calculator'){
      var total=num(root,'total'), a=num(root,'shoot'), b=num(root,'post'), g=num(root,'gear'), e=num(root,'contingency');
      if(!isFinite(total)){ text(root,'result','未分配 —'); return; }
      var pct = (isFinite(a)?a:0)+(isFinite(b)?b:0)+(isFinite(g)?g:0)+(isFinite(e)?e:0);
      var left = total*(1-pct/100);
      text(root,'result', '未分配 ' + f(left,0) + ' 元');
      text(root,'detail','拍摄 ' + f(total*(a||0)/100,0) + '；后期 ' + f(total*(b||0)/100,0) + '；器材 ' + f(total*(g||0)/100,0) + '；意外金 ' + f(total*(e||0)/100,0) + '。');
    }
    if(type === 'subtitle-cps'){
      var ch=num(root,'chars'), sec=num(root,'seconds');
      if(!isFinite(ch)||!isFinite(sec)||ch<=0||sec<=0){ text(root,'result','CPS —'); return; }
      var cps = ch/sec; var label = cps<=9 ? '偏慢' : cps<=15 ? '合适' : '偏快';
      text(root,'result', f(cps,1)+' CPS · '+label);
      text(root,'detail','中文建议 9–15 字/秒；超过 15 先删字，再考虑延长停留。');
    }
    if(type === 'aspect-calculator'){
      var w=num(root,'width'), h=num(root,'height'), r=root.querySelector('[data-calc="ratio"]').value;
      if(!isFinite(w)||!isFinite(h)||w<=0||h<=0){ text(root,'result','裁切 —'); return; }
      var parts = r.split(':'); var tr = parseFloat(parts[0])/parseFloat(parts[1]);
      var sr = w/h, kw, kh;
      if(sr > tr){ kh = h; kw = Math.round(h*tr); } else { kw = w; kh = Math.round(w/tr); }
      text(root,'result', kw+' × '+kh);
      text(root,'detail','保留原片 ' + f((kw*kh)/(w*h)*100,0) + '%；目标比例 ' + r + '。');
    }
  }
  document.querySelectorAll('[data-calculator]').forEach(function(root){
    root.addEventListener('input', function(){ calc(root); });
    root.addEventListener('change', function(){ calc(root); });
    var reset = root.querySelector('[data-reset]');
    if(reset){ reset.addEventListener('click', function(){ root.querySelectorAll('[data-calc]').forEach(function(el){ var d = el.getAttribute('data-default'); if(d !== null){ el.value = d; } }); calc(root); }); }
    calc(root);
  });
})();`;
