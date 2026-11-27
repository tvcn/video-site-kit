const SPECS = {
  'buy-camera-budget': {
    zh: ['连续录制 20 分钟，记录过热提示与自动关机时间', '横向甩动拍 1 秒，回看卷帘与果冻', '装电池、卡、麦克风后称重，连续手持 10 分钟'],
    en: ['Record 20 minutes continuously; note heat warnings and shutdown time', 'Whip-pan for one second and check rolling shutter / jelly', 'Weigh body with battery, card and mic; handhold for 10 minutes'],
    passZh: '不过热降格、卷帘在可接受范围、重量不迫使你换手持方案。',
    passEn: 'No heat throttling, acceptable skew, and a weight you can actually handhold.'
  },
  'buy-lens-first': {
    zh: ['从最近对焦到无穷远来回拉三次，观察呼吸', '全开光圈拍点光源，检查边缘与色散', '装到机身，测最近对焦距离与遮光罩'],
    en: ['Focus from minimum to infinity three times; watch focus breathing', 'Shoot a point light wide open; check edges and CA', 'Mount it; measure minimum focus distance and hood fit'],
    passZh: '呼吸不改变构图、边缘可接受、最近对焦够你拍手部或产品细节。',
    passEn: 'Breathing does not reframe, edges are usable, and close focus covers hands or product detail.'
  },
  'buy-audio-first': {
    zh: ['安静房间录 30 秒空场，回听本底噪声', '增益开到常用档，拍手与说话各一次', '无线麦走到隔一堵墙，记录断点'],
    en: ['Record 30 seconds of room tone; listen for noise floor', 'Set normal gain; clap and speak once', 'Walk the wireless mic behind one wall; note dropouts'],
    passZh: '底噪不淹没呼吸、常用增益不爆、隔墙不断或少断。',
    passEn: 'Noise does not mask breathing, normal gain does not clip, and one wall does not kill the signal.'
  },
  'buy-light-kit': {
    zh: ['1 米拍白纸，测照度与色温', '手机慢门拍灯面，检查频闪', '全功率开 10 分钟，摸灯体与电源温度'],
    en: ['At 1 m, meter a white card for illuminance and CCT', 'Use a slow shutter on the panel to check flicker', 'Run full power 10 minutes; check lamp and PSU heat'],
    passZh: '照度够你的机位、色温能匹配、常用快门无频闪。',
    passEn: 'Enough output for your blocking, CCT matches, and no banding at your shutter.'
  },
  'buy-storage': {
    zh: ['从本机拷 50GB，记录持续写入曲线', '剩 10% 空间再写，观察掉速', '拔盘重插，检查重建与挂载时间'],
    en: ['Copy 50 GB from the card; log sustained write curve', 'Write again at 10% free space; watch for drop', 'Unplug/replug; measure rebuild and mount time'],
    passZh: '持续写入不低于你的码率、接近满盘不掉速、重建在可接受时间。',
    passEn: 'Sustained write above your bitrate, no near-full drop, and a rebuild you can wait for.'
  },
  'buy-monitor': {
    zh: ['全白场测峰值亮度与均匀性', '接上相机，测 4K 输入延迟', '遮光罩下看暗部与焦点辅助'],
    en: ['Full white field for peak brightness and uniformity', 'Connect camera; measure 4K input latency', 'Check shadows and focus assist under the hood'],
    passZh: '户外能看清、延迟不耽误跟焦、暗部不糊成一块。',
    passEn: 'Visible outdoors, latency does not break follow focus, and shadows keep separation.'
  },
  'buy-tripod': {
    zh: ['挂上实际机身与镜头，测云台下沉', '锁死中轴，轻推三脚架测扭转', '升高到常用机位，测风阻与展开时间'],
    en: ['Load the actual body and lens; measure head sag', 'Lock the column; nudge the tripod and measure twist', 'Raise to working height; check wind sway and setup time'],
    passZh: '不沉头、不扭、常用高度 30 秒内能架稳。',
    passEn: 'No sag, no twist, and stable at working height within 30 seconds.'
  },
  'buy-camera-cine': {
    zh: ['开机录 20 分钟最高格式，记录风扇与降格', '换电池，测热插拔与供电锁定', '装 ND 与遮光罩，检查呼吸与配件干涉'],
    en: ['Record 20 minutes at top format; log fan noise and throttling', 'Swap batteries; test hot-swap and power lock', 'Fit ND and matte box; check breathing and accessory collision'],
    passZh: '不掉格式、换电不断、常用配件不挡画面。',
    passEn: 'No format drop, no power interruption, and normal accessories do not block the frame.'
  },
  'buy-lens-zoom': {
    zh: ['推拉全程拍 Chart，检查齐焦', '全开与长焦端拍点光，测呼吸与边缘', '接伺服，测变焦起停与延迟'],
    en: ['Zoom through a chart; check parfocal behaviour', 'At wide open and long end, shoot a point light for breathing and edges', 'Connect servo; measure zoom start/stop and latency'],
    passZh: '推拉不跑焦、呼吸可接受、伺服不抢动作。',
    passEn: 'Focus holds through zoom, breathing is tolerable, and the servo does not fight the move.'
  },
  'buy-audio-field': {
    zh: ['接两支麦，录 10 分钟，检查通道串扰', '把增益推到 32 位浮点极限，回听削波', '接时码，关机再开，测同步'],
    en: ['Connect two mics for 10 minutes; check channel bleed', 'Push gain into 32-bit float limits; listen for clipping', 'Jam timecode, power-cycle, and check sync'],
    passZh: '通道不串、极端增益可恢复、重启不丢时码。',
    passEn: 'No channel bleed, recoverable extreme gain, and timecode survives a restart.'
  },
  'buy-light-led': {
    zh: ['全功率 10 分钟，测照度与色温漂移', '慢门拍灯面，检查频闪与 PWM', '用 V 口/电池各跑 10 分钟，测供电'],
    en: ['Full power 10 minutes; meter output and CCT drift', 'Slow-shutter the panel for flicker and PWM', 'Run 10 minutes on V-mount and on battery; check power'],
    passZh: '亮度不塌、色温不漂、常用快门无频闪。',
    passEn: 'Output holds, CCT does not drift, and no banding at normal shutter.'
  },
  'buy-monitor-hdr': {
    zh: ['峰值白块与 1% 灰阶并排，测局部调光', '接 HDR 信号，检查色调映射', '测 SDI/HDMI 输入延迟与色彩空间'],
    en: ['Place peak white next to 1% grey; check local dimming', 'Feed HDR; inspect tone mapping', 'Measure SDI/HDMI latency and colour space'],
    passZh: '高光不糊、暗部有层次、延迟能跟焦。',
    passEn: 'Highlights retain detail, shadows keep separation, and latency supports focus.'
  },
  'buy-storage-cards': {
    zh: ['卡满 80% 后录最高码率，记录掉帧', '连续写 10 分钟，测卡面温度', '换读卡器，测兼容与挂载'],
    en: ['At 80% full, record top bitrate; count dropped frames', 'Write 10 minutes; measure card surface heat', 'Try a second reader; check compatibility and mount'],
    passZh: '不掉帧、不烫手、常用读卡器能识别。',
    passEn: 'No dropped frames, no unsafe heat, and common readers mount it.'
  },
  'buy-tripod-fluid': {
    zh: ['装实际负载，测俯仰阻尼与回弹', '调平后松手，测漂移', '低温/高温各放 20 分钟，测阻尼变化'],
    en: ['Load real rig; test tilt drag and spring return', 'Balance, release, and measure drift', 'Cold/heat soak 20 minutes; recheck drag'],
    passZh: '起停不弹、松手不漂、温度变化后仍可调。',
    passEn: 'No kick on start/stop, no drift when released, and adjustable after temperature change.'
  },
  'buy-gimbal-first': {
    zh: ['装手机/相机，测三轴调平时间', '走路、跑楼梯、上下坡各拍 30 秒', '快速转向，测跟随与回中'],
    en: ['Mount phone/camera; time three-axis balance', 'Walk, run stairs and slope for 30 seconds each', 'Whip pan; check follow and recentre'],
    passZh: '30 秒内调平、走路不抽、转向不晕。',
    passEn: 'Balance within 30 seconds, no jitter while walking, and no dizzying whip pans.'
  },
  'buy-wireless-lav': {
    zh: ['室内 10 米、室外 30 米各走一遍', '隔一堵墙/一个人体，记录断点', '看监视器口型，测延迟'],
    en: ['Walk 10 m indoor and 30 m outdoor', 'Block with one wall/body; log dropouts', 'Watch lip sync on monitor; measure latency'],
    passZh: '常用距离不断、断点可恢复、延迟不超一帧。',
    passEn: 'No drop at normal distance, recoverable dropouts, and latency under one frame.'
  },
  'buy-timecode': {
    zh: ['两台同时开机，录 60 分钟测漂移', '关机再开，测重新同步', '换电池，测设置是否保留'],
    en: ['Run two units 60 minutes; measure drift', 'Power-cycle; re-jam and check sync', 'Swap battery; check settings retention'],
    passZh: '一小时不漂、重启能同步、换电不丢设置。',
    passEn: 'No drift in an hour, re-jam works, and battery swap keeps settings.'
  },
  'buy-nas-raid': {
    zh: ['拷 100GB 混合文件，测持续吞吐', '拔一块盘，测重建时间与告警', '夜间待机，测风扇噪声'],
    en: ['Copy 100 GB mixed files; measure sustained throughput', 'Pull one drive; measure rebuild time and alerting', 'Idle overnight; measure fan noise'],
    passZh: '吞吐够剪代理、重建有告警、噪声不扰眠。',
    passEn: 'Enough throughput for proxies, rebuild alerts, and noise that does not disturb sleep.'
  },
  'buy-used-gear': {
    zh: ['查快门数/通电数，拍 30 张连拍', '全白/全黑/长曝各一张，查坏点与霉斑', '查维修记录、序列号与配件'],
    en: ['Read shutter/actuation count; shoot a 30-frame burst', 'White/black/long exposure frames for hot pixels and fungus', 'Check repair history, serial and included parts'],
    passZh: '快门在寿命内、无坏点霉斑、序列号与描述一致。',
    passEn: 'Shutter within life, no hot pixels or fungus, and serial matches the listing.'
  },
  'buy-batteries': {
    zh: ['满电录到关机，测实际时长', '装机身看通信与剩余显示', '过充/过放各一次，测保护与温度'],
    en: ['Record from full to shutdown; measure runtime', 'Mount and check communication / remaining display', 'One overcharge/overdischarge cycle; check protection and heat'],
    passZh: '时长够一场、通信正常、保护不鼓包。',
    passEn: 'Runtime covers a shoot, communication works, and protection does not swell the pack.'
  },
  'buy-post-software': {
    zh: ['导入 10 条不同格式，测转码与代理', '做一次回套，检查时间码与效果', '导出 H.264/ProRes 各一版，测时长'],
    en: ['Import 10 mixed formats; test transcode and proxy', 'Round-trip once; check timecode and effects', 'Export H.264 and ProRes; measure render time'],
    passZh: '格式能进、回套不丢、导出时间可接受。',
    passEn: 'Formats import, round-trip holds, and export time is workable.'
  }
};

function section(id, zh) {
  const s = SPECS[id];
  if (!s) return '';
  const rows = zh
    ? s.zh.map((t, i) => `<tr><td>${i + 1}</td><td>${t}</td><td>未实测</td></tr>`).join('')
    : s.en.map((t, i) => `<tr><td>${i + 1}</td><td>${t}</td><td>Not measured</td></tr>`).join('');
  if (zh) {
    return `<section class="buying-protocol"><h2>测试条件：买之前怎么验</h2>
<p>这不是跨型号横评，也不替品牌下结论。下面三项是可在店里或借机时复现的验机协议；没有实测数据的格子写“未实测”，不编数值。测试时记录机身、固件、室温、录制格式与存储卡，换一个条件结果就可能变。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>#</th><th>现场怎么测</th><th>本轮状态</th></tr></thead><tbody>${rows}</tbody></table></div>
<p><strong>通过线：</strong>${s.passZh}</p>
<p class="source-list">参考来源：<a href="../../about/">编辑标准</a> · <a href="../test-protocols/">测试协议</a>；厂商参数以公开规格页为准，未实测不写数值。</p>
<p>如果三项里有一项只能靠“听说”或“参数表”，就先别下单；把条件写进你的拍摄计划，再决定要不要为它换方案。</p></section>`;
  }
  return `<section class="buying-protocol"><h2>Test conditions: how to check before buying</h2>
<p>This is not a cross-brand shootout and it does not settle brands. These three checks are a field protocol you can repeat in a shop or with a loaner; cells without measurements say “not measured” rather than inventing numbers. Record body, firmware, room temperature, recording format and card; change one condition and the result can change.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>#</th><th>How to test</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>
<p><strong>Pass line:</strong> ${s.passEn}</p>
<p class="source-list">Sources: <a href="../../about/">editorial standards</a> · <a href="../test-protocols/">test protocols</a>; manufacturer specs come from public spec sheets, and untested values are not turned into numbers.</p>
<p>If one of the three can only be answered by “I heard” or a spec sheet, do not order yet. Write the condition into your shoot plan, then decide whether it changes your kit.</p></section>`;
}

export const BUYING_PROTOCOLS_20261124 = Object.fromEntries(
  Object.keys(SPECS).map((id) => [id, { zh: section(id, true), en: section(id, false) }])
);
