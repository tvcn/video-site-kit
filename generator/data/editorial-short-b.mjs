// Short-form depth for camera, lighting, sound, color and delivery pages.
export const EDITORIAL_SHORT_B = {
  'night-practical': {
    zh: `<h2>夜景先保高光，再提暗部</h2><p>有实景灯的夜景，先让灯和窗在画面里保留颜色，不要把亮部曝到死白。人物脸用一块小补光或墙面反光提半档，剩下的暗部交给后期；现场把噪声控制住，比后期降噪更重要。</p><p>拍一条回放，看暗部有没有色块和闪烁；有，就加一点环境光或换更高宽容度模式，不要靠后期硬拉。</p><h2>边界</h2><p>夜景不是把画面调亮。黑要黑得下去，灯要亮得起来；全画面灰亮，反而没有夜晚。</p>`,
    en: `<h2>Protect highlights, then lift the shadows</h2><p>In a practical-lit night scene, keep lamps and windows colored, not blown to white. Lift the face half a stop with a small fill or wall bounce and leave the rest to post; control noise on set rather than fixing it later.</p><p>Play back a take and check shadows for blocks and flicker. If present, add ambient light or a higher-latitude mode; do not rely on lifting in post.</p><h2>Limits</h2><p>Night is not a brighter image. Blacks must stay black and lamps must read; a uniformly gray frame stops being night.</p>`
  },
  'proxy-create': {
    zh: `<h2>代理要保留原名、时间码和卷名</h2><p>生成代理时不要改文件名，也不要换目录结构。剪辑软件靠原名和时间码回批；改名会让回批变成手工找文件。</p><p>代理分辨率按时间线需要选：多机位 4K 可以降到 1080p 或 720p，但帧率和色彩空间要跟原素材一致。</p><h2>边界</h2><p>代理不是交付。输出母版前确认时间线链接的是原素材；链接代理直接导出，画质会掉一档。</p>`,
    en: `<h2>Proxies keep names, timecode and reel</h2><p>Do not rename files or change folder structure when generating proxies. The editor relinks by original name and timecode; renaming turns relinking into manual hunting.</p><p>Pick proxy resolution from timeline needs: multicam 4K can go to 1080p or 720p, but frame rate and color space must match the original.</p><h2>Limits</h2><p>A proxy is not delivery. Before the master, confirm the timeline points at originals; exporting from proxies loses a generation.</p>`
  },
  'room-tone-record': {
    zh: `<h2>每个空间录 30 秒“没有人”的房间声</h2><p>房间声不是静音，是空间底噪。每个主要机位录 30 秒：所有人不动、不说话的同一麦克风、同一增益。剪辑时用它填对白之间的缝，声音才不会突然“死掉”。</p><p>换场地、换麦克风位置、换增益，都要重录一条；不同条件的房间声不能混用。</p><h2>边界</h2><p>房间声不能修掉对白里的噪声。它只提供连续底噪；对白本身有风、回声或电流声，要回现场重录或单独处理。</p>`,
    en: `<h2>Record thirty seconds of empty room per space</h2><p>Room tone is not silence; it is the space's floor. At each main setup, record thirty seconds with everyone still and quiet, same mic, same gain. Use it to fill gaps between lines so the sound does not die.</p><p>Re-record after changing room, mic position or gain; tones from different conditions cannot be mixed.</p><h2>Limits</h2><p>Room tone cannot fix noise inside dialogue. It supplies continuous floor; wind, echo or hum on the line needs a re-record or separate repair.</p>`
  },
  'lighting-one-light': {
    zh: `<h2>一盏灯先定方向，再用反光补</h2><p>只有一盏灯时，先决定它从哪来：侧后方做轮廓，侧前方做脸，顶光做压迫。方向定错，加十盏灯也救不回来。补光用白墙、泡沫板或反光板，不要再加第二盏同方向的灯。</p><p>拍一条，看鼻子和下巴的阴影；阴影形状决定观众读到的情绪。</p><h2>边界</h2><p>单灯不是“平”。可以用黑旗压暗另一侧，让反差更大；不要为了省事把灯怼到正面，脸会变平。</p>`,
    en: `<h2>One lamp sets direction; bounce fills</h2><p>With one lamp, decide where it comes from: side-back for a rim, side-front for the face, top for pressure. Wrong direction cannot be saved by ten more lamps. Fill with a white wall, foam board or reflector, not a second lamp from the same side.</p><p>Shoot a test and read the nose and jaw shadow; the shape tells the audience the mood.</p><h2>Limits</h2><p>One light is not flat. Flag the other side to deepen contrast; do not shove the lamp straight on to save time, or the face goes flat.</p>`
  },
  'slider-shot': {
    zh: `<h2>滑轨是“关系镜头”，不是炫技</h2><p>用滑轨时先问：移动要让观众多看到什么关系？前景遮挡到露出人物、从一个人的背到另一个人的脸、从空椅到门口。没有关系变化，移动就是多余。</p><p>行程控制在 20–40 厘米，速度慢到能看清背景变化；起幅和落幅都要能单独构图。</p><h2>边界</h2><p>滑轨不适合快速动作和狭窄空间。地面不平、脚下有电线，都会让画面抖；先清场，再铺轨。</p>`,
    en: `<h2>A slider is a relationship shot, not a flourish</h2><p>Ask what relationship the move reveals: foreground blocking giving way to a face, one person's back to another's face, an empty chair to a doorway. Without a change in relationship, the move is decoration.</p><p>Keep the travel 20–40 cm and slow enough to read the background; both start and end must compose on their own.</p><h2>Limits</h2><p>A slider is wrong for fast action and tight spaces. Uneven floors and cables cause shake; clear the path before laying track.</p>`
  },
  'lighting-window': {
    zh: `<h2>窗光先看时间和方向</h2><p>窗光不是固定光源，它会随时间变冷、变弱、变方向。先定拍摄时段，再用纱帘、百叶或反光板控制硬度和方向；不要在同一天混用早晨和下午的光。</p><p>人物离窗越近，反差越大；想柔，就把人往后拉或加一块 diffusion。</p><h2>边界</h2><p>窗光好看但不稳定。长时间采访要准备补光，否则云一过，前后镜头接不上。</p>`,
    en: `<h2>Window light changes with time and direction</h2><p>Window light is not a fixed source; it cools, dims and moves. Lock the shooting window, then use sheer curtains, blinds or bounce to control hardness and direction. Do not mix morning and afternoon light in one scene.</p><p>The closer the subject, the higher the contrast; to soften, move them back or add diffusion.</p><h2>Limits</h2><p>Window light is beautiful and unstable. For long interviews, prepare fill; a cloud passing breaks shot-to-shot continuity.</p>`
  },
  'color-checker': {
    zh: `<h2>每次换光，先拍一张色卡</h2><p>色卡不是开机仪式，是后期校正的锚点。每个场景、每次换灯或换色温，拍一张色卡占画面 1/3，焦点清楚，曝光正常；不要只在第一条拍。</p><p>后期用色卡校准白平衡和肤色，再用示波器统一镜头；色卡不能代替创作判断。</p><h2>边界</h2><p>色卡不能修正混合光。一个画面里两种色温，色卡只能选一个参考；先在现场把光统一，再拍卡。</p>`,
    en: `<h2>Shoot a color chart every time the light changes</h2><p>The chart is not an opening ritual; it is an anchor for post. At each scene, lamp change or color-temperature change, fill one third of frame with the chart, sharp and correctly exposed. Do not shoot it only on take one.</p><p>Use it to calibrate white balance and skin, then use scopes to match shots. The chart does not replace creative judgment.</p><h2>Limits</h2><p>A chart cannot fix mixed light. With two temperatures in one frame, it gives one reference; fix the light on set first, then shoot the chart.</p>`
  },
  'lav-hidden': {
    zh: `<h2>藏麦先保“不摩擦”，再保“看不见”</h2><p>领夹麦最怕衣服摩擦和布料遮住。把麦头固定在衣领内侧，线与皮肤之间留一层胶带，外套和纽扣远离麦头；不要直接把麦塞进头发或围巾。</p><p>录一条让演员转头、抬手、坐下，回放听有没有沙沙声；有，就换位置，不要靠后期降噪。</p><h2>边界</h2><p>看不见不等于听得好。藏得太深会闷、会远；宁可露一点麦头，也要保住对白清楚。</p>`,
    en: `<h2>Hide the lav without rubbing</h2><p>The enemy is cloth friction and muffling. Anchor the capsule inside a collar, tape the cable away from skin, keep jacket and buttons off the capsule. Do not bury it in hair or a scarf.</p><p>Record the actor turning, raising an arm and sitting; play back for rustle. If present, reposition rather than denoise later.</p><h2>Limits</h2><p>Invisible is not audible. Too deep sounds hollow and distant; let the capsule show a little rather than lose the line.</p>`
  },
  'gimbal-balance': {
    zh: `<h2>先断电、再调平，最后装镜头</h2><p>稳定器调平顺序：锁轴、装相机、调前后和左右、看三轴是否都停在任意角度。每次换镜头或加滤镜都要重调；不平衡的电机耗电、发热、抖动。</p><p>调平后先低速走一圈，听电机有没有异响；再上快速跟随。</p><h2>边界</h2><p>调平不能代替步伐。走路上下起伏，稳定器只能救一部分；先练“脚跟先着地、膝盖微屈”的走法。</p>`,
    en: `<h2>Power off, balance, then mount the lens</h2><p>Balance order: lock axes, mount camera, adjust fore-aft and left-right, check that all three axes rest at any angle. Rebalance after every lens or filter change; an unbalanced motor drains power, heats and jitters.</p><p>Walk a slow circle and listen for motor noise before fast follow.</p><h2>Limits</h2><p>Balance is not a substitute for walking. The gimbal saves only part of vertical bounce; practice heel-first, soft-knee steps.</p>`
  },
  'hdr': {
    zh: `<h2>HDR 先保高光，再谈“亮”</h2><p>HDR 不是把暗部无限拉亮，而是保留从窗到暗角的信息。曝光时让高光刚好不贴顶，用假色或波形确认；暗部留噪声空间，后期再决定压多少。</p><p>交付前用目标屏幕看一遍：HDR 母版在普通屏上可能发灰，需要单独做 SDR 版本，不要一版通投。</p><h2>边界</h2><p>HDR 不是风格滤镜。没有 HDR 屏幕和正确元数据，观众看到的可能比 SDR 更差；先确认交付链，再决定拍不拍。</p>`,
    en: `<h2>HDR protects highlights before brightness</h2><p>HDR is not lifting shadows infinitely; it preserves information from window to dark corner. Expose so highlights just avoid clipping, confirmed with false color or waveform; leave noise room in shadows and decide later how far to push.</p><p>Check on the target display before delivery: an HDR master can look gray on a normal screen. Make a separate SDR version; do not post one master everywhere.</p><h2>Limits</h2><p>HDR is not a look filter. Without an HDR display and correct metadata, the audience may see worse than SDR. Confirm the delivery chain before shooting.</p>`
  },
  'set-mediabay': {
    zh: `<h2>素材站先做“校验和”，再做“三份”</h3><p>拷卡不是拖进文件夹就完。用校验和工具核对源卡与目标盘，生成一份清单；三份副本分别放在机身、现场盘和离线盘。没有校验和的“拷贝完成”不算备份。</p><p>每张卡拷完立刻抽一个文件回放；确认文件名、时长和声音都对，再格式化卡。</p><h2>边界</h2><p>素材站不是剪辑台。不要在现场盘上直接剪；先做副本和代理，再开工程，避免误删和性能瓶颈。</p>`,
    en: `<h2>Checksum first, then three copies</h2><p>Offloading is not dragging a folder. Use a checksum tool to compare source card and destination, and write a manifest. Keep three copies: camera, set drive, offline drive. “Copy completed” without a checksum is not a backup.</p><p>After each card, play one file back; confirm name, duration and sound before formatting.</p><h2>Limits</h2><p>The media station is not an edit bay. Do not cut from the set drive; make copies and proxies first to avoid deletion and performance limits.</p>`
  },
  'sync-multicam': {
    zh: `<h2>多机位先给一个“共同事件”</h2><p>没有时间码时，用一声拍手、一句台词或闪光作为共同事件。每台机器都拍到，剪辑时按波形对齐；不要靠“看起来差不多”手动拖。</p><p>开机前统一帧率、快门和录音采样率；不同帧率的多机位，后期只能靠变速，会破坏声音同步。</p><h2>边界</h2><p>同步一次不等于全程同步。长时间拍摄会有漂移，每 20–30 分钟重新对一次，或使用时间码。</p>`,
    en: `<h2>Give multicam one shared event</h2><p>Without timecode, use a clap, a line or a flash seen by every camera. Align by audio waveform in the edit; do not drag by “looks close.”</p><p>Match frame rate, shutter and audio sample rate before rolling. Mixed frame rates force speed changes that break sound sync.</p><h2>Limits</h2><p>Syncing once is not syncing forever. Long takes drift; re-sync every twenty to thirty minutes or use timecode.</p>`
  },
  'boom-swing': {
    zh: `<h2>话筒杆跟着动作走，不横穿画面</h2><p>操作杆的人要提前知道演员下一步去哪：看排练、听指令、盯脚步。杆头保持在演员前上方 40–60 厘米，避免影子入画；换位时从画面外绕，不要从头顶横过去。</p><p>每个镜头前录一句“杆位测试”，确认没有撞到灯或反光板。</p><h2>边界</h2><p>杆不是越近越好。太近会录到呼吸和衣服；太远会空。先保对白，再追求“看不见杆”。</p>`,
    en: `<h2>The boom follows action without crossing frame</h2><p>The operator must know where the actor goes next: watch rehearsal, listen for cues, track feet. Keep the tip 40–60 cm above and ahead, out of the shadow; move around outside frame, never across the head.</p><p>Record a boom test before each setup to confirm it clears lamps and bounce boards.</p><h2>Limits</h2><p>Closer is not better. Too close captures breath and cloth; too far sounds empty. Protect the line before hiding the pole.</p>`
  },
  'exposure-check': {
    zh: `<h2>先看脸，再看高光，最后看整体</h2><p>曝光检查顺序：脸是否在可接受亮度、窗和灯是否贴顶、暗部是否有细节。三项不能同时满足时，先保脸，再保高光；暗部可以欠一点。</p><p>用假色或斑马确认高光，用波形确认肤色；不要只看监视器亮度，屏幕会骗人。</p><h2>边界</h2><p>“正确曝光”不是单一数值。逆光、夜景、风格化低对比都有不同基准；先定意图，再定曝光。</p>`,
    en: `<h2>Face, highlights, then the whole frame</h2><p>Check in order: face at acceptable brightness, windows and lamps not clipped, shadows holding detail. When all three cannot coexist, protect the face, then highlights; shadows may go under.</p><p>Use false color or zebra for highlights and waveform for skin. Do not trust monitor brightness alone; the screen lies.</p><h2>Limits</h2><p>“Correct exposure” is not one number. Backlight, night and stylized low contrast have different references. Set intention before exposure.</p>`
  },
  'camera-black-balance': {
    zh: `<h2>黑平衡要在“完全黑、同设置”下做</h2><p>盖住镜头、关掉所有光，用拍摄时的同一帧率、快门和增益做黑平衡；不同设置做的黑平衡不能通用。做完拍一条纯黑，放大看有没有固定亮点或色斑。</p><p>传感器温度变化后要重做；长时间拍摄，开机预热 10 分钟再做。</p><h2>边界</h2><p>黑平衡不能修坏点。固定亮点是传感器问题，黑平衡只压暗电流；坏点要靠坏点映射或后期。</p>`,
    en: `<h2>Black balance in full dark, same settings</h2><p>Cap the lens, turn off all light, and black-balance at the shooting frame rate, shutter and gain. A balance made at other settings does not carry over. Shoot a black frame and zoom in for fixed bright dots or color patches.</p><p>Redo after sensor temperature changes; on long shoots, warm up ten minutes first.</p><h2>Limits</h2><p>Black balance cannot fix dead pixels. Fixed dots are a sensor issue; black balance only suppresses dark current. Dead pixels need mapping or post.</p>`
  },
  'restore-test': {
    zh: `<h2>备份的验收，是“能恢复”，不是“有副本”</h2><p>每月随机抽一个项目，从备份恢复到另一块盘，打开工程、链接素材、导出 10 秒。恢复失败，备份就等于没有。</p><p>记录恢复耗时和缺失文件；如果每次都要手工找，说明目录结构或校验有问题。</p><h2>边界</h2><p>RAID 和同步盘不是备份。它们会同步误删、同步加密；至少保留一份离线、只读或版本化副本，并定期做恢复测试。</p>`,
    en: `<h2>A backup passes when it restores, not when it exists</h2><p>Once a month, restore one random project to a different drive, open it, relink media and export ten seconds. If restore fails, the backup is not there.</p><p>Record restore time and missing files; if every restore needs manual hunting, the structure or checksum is broken.</p><h2>Limits</h2><p>RAID and sync folders are not backup. They sync deletions and encryption. Keep one offline, read-only or versioned copy and test restore regularly.</p>`
  },
  'handheld-brace': {
    zh: `<h2>手持先锁肘，再谈呼吸</h2><p>双手握机，肘贴肋骨，取景器贴眉骨；脚与肩同宽，膝盖微屈。移动时脚跟先着地，身体带着相机走，不要手臂单独晃。</p><p>用广角比长焦稳；需要长焦时，找墙、桌或膝盖做支点，不要硬扛。</p><h2>边界</h2><p>手持不是越稳越好。完全不动会像三脚架，失去现场感；保留一点呼吸，但不要上下跳。</p>`,
    en: `<h2>Lock the elbows before discussing breath</h2><p>Two hands on the camera, elbows against ribs, viewfinder to brow, feet shoulder-width, knees soft. Walk heel-first and move the body with the camera; do not let the arms swing alone.</p><p>Wide is steadier than long. With a long lens, brace on a wall, table or knee rather than muscle.</p><h2>Limits</h2><p>Handheld is not “as stable as possible.” A frozen frame looks like a tripod and loses presence; keep some breath, but no vertical bouncing.</p>`
  },
  'proxy-cache': {
    zh: `<h2>代理和缓存不是一回事</h2><p>代理是低分辨率副本，用来剪辑；缓存是软件生成的预览文件，用来播放特效。删缓存不会丢原素材，删代理会让时间线离线；两者要分目录。</p><p>代理放“Proxy”文件夹，缓存放软件默认缓存目录；清理时只清缓存，不动代理。</p><h2>边界</h2><p>不要用清理软件一键删“媒体缓存”。它可能把代理和原素材一起扫掉；先确认路径，再删。</p>`,
    en: `<h2>Proxies and cache are different things</h2><p>A proxy is a low-resolution copy for editing; a cache is a preview file generated for playback. Deleting cache does not lose media; deleting proxies takes the timeline offline. Keep them in separate folders.</p><p>Put proxies in a Proxy folder and cache in the software's cache directory; clean cache only.</p><h2>Limits</h2><p>Do not let a cleaner app delete “media cache” in one click. It may sweep proxies and originals. Confirm the path before deleting.</p>`
  },
  'mastering': {
    zh: `<h2>母版只做一次，平台版从母版派生</h2><p>母版是唯一高质量文件：最高分辨率、最高码率、无字幕或独立字幕、声音分轨。平台版从母版导出，不要拿平台版再二次压缩。</p><p>母版文件名带日期、版本和项目名；存两份，一份离线。以后重发、改字幕、做合集，都从母版开始。</p><h2>边界</h2><p>母版不是“最大文件”。码率超过平台和屏幕需要，只会增加存储；质量目标是“无可见压缩”，不是数字最大。</p>`,
    en: `<h2>Master once; platform cuts derive from it</h2><p>The master is the single high-quality file: max resolution, max bitrate, no burned-in captions or separate tracks. Platform versions export from it; never re-compress a platform file.</p><p>Name it with date, version and project; keep two copies, one offline. Re-releases, caption changes and compilations all start here.</p><h2>Limits</h2><p>A master is not “the biggest file.” Bitrate beyond platform and display needs only costs storage; the goal is no visible compression, not the largest number.</p>`
  },
  'white-balance-gray': {
    zh: `<h2>灰卡要放在“主体受光”的位置</h2><p>白平衡不是对着天空或白墙点一下。把灰卡放在人物脸的位置，朝摄影机，确保它和人物受同一束光；混合光下，灰卡只能代表一个方向。</p><p>每换一个光位或色温拍一张；后期用它校准，再用肤色微调。</p><h2>边界</h2><p>灰卡不能把两种色温变成一种。窗光偏冷、台灯偏暖时，先决定保留哪种，再用补光或 gel 统一。</p>`,
    en: `<h2>Put the gray card where the subject is lit</h2><p>White balance is not clicking on sky or a white wall. Place the card at the face position, facing camera, in the same light as the subject. Under mixed light it represents one direction only.</p><p>Shoot one per light position or color temperature; calibrate in post, then fine-tune skin.</p><h2>Limits</h2><p>A gray card cannot turn two temperatures into one. With cool window and warm lamp, decide which to keep, then unify with fill or gel.</p>`
  },
  'multilingual-subtitles': {
    zh: `<h2>一种语言一条轨，不要混在一条里</h2><p>多语言字幕分轨交付：每条轨只放一种语言，时间码对齐，样式分开。不要把中英叠在同一行；移动端会挤成一团，也无法单独关闭。</p><p>每条轨单独做换行和字符数检查：中文每行不超过 16–18 字，英文不超过 42 字符；两种语言的行长不同，不能共用断句。</p><h2>边界</h2><p>翻译不是逐字替换。地名、术语和语气要找目标语言的习惯；字幕错一个字，观众会怀疑整条片。</p>`,
    en: `<h2>One track per language, never mixed</h2><p>Deliver multilingual captions as separate tracks: one language each, aligned timecode, separate styles. Do not stack Chinese and English on one line; mobile collapses and neither can be turned off.</p><p>Check line breaks per track: about 16–18 Chinese characters or 42 Latin characters per line. The languages need different breaks, not shared ones.</p><h2>Limits</h2><p>Translation is not word replacement. Place names, terms and tone follow the target language; one wrong character makes the audience doubt the whole film.</p>`
  },
  'sdh': {
    zh: `<h2>SDH 要写“听见了什么”</h2><p>听障字幕不只写对白，还要写声音事件：关门、脚步、电话铃、音乐情绪。说话人变化要标名字或位置；多人重叠时，标“同时”。</p><p>音乐用方括号写风格和情绪，不要只写“音乐”。关键剧情声音要写清方向：从左后方靠近。</p><h2>边界</h2><p>SDH 不是把声音全写一遍。只写推动理解或情绪的声音；每一声都标，会把画面压垮。</p>`,
    en: `<h2>SDH writes what is heard</h2><p>SDH is not only dialogue; it names sound events: door, footsteps, phone, music mood. Mark speaker changes by name or position; overlap gets “together.”</p><p>Describe music in brackets by style and feeling, not just “music.” Key plot sounds include direction: approaching from back left.</p><h2>Limits</h2><p>SDH is not a full sound list. Caption only what drives understanding or emotion; labeling every sound buries the image.</p>`
  },
  'accessibility-caption': {
    zh: `<h2>字幕先保“能读”，再谈好看</h2><p>无障碍字幕要高对比、位置避开主体、速度可读。白字加黑边或半透明底，不要用细字体和低对比灰；移动端每行不超过两行，停留时间按每秒 12–15 字估算。</p><p>重要画面信息用文字补充，但不要遮住画面关键动作；位置随构图调整。</p><h2>边界</h2><p>自动字幕不能直接上线。专有名词、数字、否定句最容易错；至少人工校对一遍，再交付。</p>`,
    en: `<h2>Captions must be readable before pretty</h2><p>Accessible captions need contrast, placement off the subject and readable speed. White with a black edge or translucent box; no thin or low-contrast gray. Two lines max on mobile, timing at roughly 12–15 characters per second.</p><p>Describe important visual information in text, but do not cover the key action; move the block with the composition.</p><h2>Limits</p><p>Auto captions do not go live unchecked. Names, numbers and negation fail most; proofread at least once before delivery.</p>`
  },
  'data-security': {
    zh: `<h2>项目数据先分级，再谈加密</h2><p>把素材分三级：可公开、仅客户、含个人信息。含个人信息的素材单独加密盘、单独权限、单独归档；不要和宣传素材混在一个共享文件夹。</p><p>交付用加密链接或硬盘，设置有效期；项目结束撤销共享权限，保留一份归档清单。</p><h2>边界</h2><p>加密不是万能。弱密码、重复密码、把密钥和文件放一起，等于没加密；权限和流程比算法更重要。</p>`,
    en: `<h2>Classify project data before encrypting it</h2><p>Three levels: public, client-only, personal data. Personal material gets its own encrypted drive, permissions and archive; never mix it with marketing footage in one shared folder.</p><p>Deliver via encrypted link or drive with an expiry; revoke sharing at project end and keep an archive manifest.</p><h2>Limits</h2><p>Encryption is not magic. Weak or reused passwords, or keys stored beside files, equal no encryption. Permissions and process matter more than the algorithm.</p>`
  },
  'privacy-blur': {
    zh: `<h2>模糊要跟住脸，也要跟住影子</h2><p>打码不是画一个静态方块。逐帧跟踪人脸、车牌、门牌和屏幕；运动、转身、遮挡时检查边缘。模糊半径要够大，别让轮廓仍可辨认。</p><p>导出前放大看 100%：边缘有没有漏出、跟踪有没有漂移；关键帧之间要手动修。</p><h2>边界</h2><p>打码不等于同意。公共场所拍到的人，如果可识别且用于商业内容，仍可能需要肖像授权；模糊只降低识别，不自动获得许可。</p>`,
    en: `<h2>The blur must track the face and the shadow</h2><p>Blurring is not a static box. Track faces, plates, house numbers and screens frame by frame; check edges through motion, turns and occlusion. Use enough radius that the outline is not recognizable.</p><p>Zoom to 100% before export: check leaks and drift, and fix keys manually.</p><h2>Limits</h2><p>Blurring is not consent. A recognizable person in public may still need a likeness release for commercial use; blur lowers recognition, not the legal requirement.</p>`
  },
  'secondary-correction': {
    zh: `<h2>二级只改“选中的区域”</h2><p>二级校正用蒙版、HSL 或限定器，只动一个范围：天空、肤色、衣服或背景。先做一级统一，再做二级；一级没统一，二级会把偏色锁死。</p><p>每个节点只做一个目的，命名清楚；节点太多时，关掉全部再逐个开，找出真正起作用的那一个。</p><h2>边界</h2><p>二级不是“局部滤镜”。选区边缘要柔，运动镜头要跟踪；边缘硬、跟踪飘，观众第一眼就看到假。</p>`,
    en: `<h2>Secondary only changes the selected area</h2><p>Use masks, HSL or qualifiers to move one range: sky, skin, clothing or background. Primary first, secondary second; without a primary, secondary locks the cast in.</p><p>One node, one purpose, named clearly. With too many nodes, disable all and re-enable one by one to find what actually works.</p><h2>Limits</h2><p>Secondary is not a local filter. Feather the edge and track motion; hard edges and drifting masks read as fake immediately.</p>`
  },
  'cleanup': {
    zh: `<h2>擦除先问“背景有没有信息”</h2><p>移除电线、麦克风、灯架前，先看背景：纯墙容易补，纹理、树叶、人群难补。拍摄时多拍一条“干净板”或空镜，后期才有源可补。</p><p>擦除后匹配颗粒、噪点和运动模糊；静止帧干净、一动就露馅，是最常见的失败。</p><h2>边界</h2><p>不要擦掉叙事信息。移走一个关键道具、一个路标，可能改变观众对空间的理解；先确认它不重要。</p>`,
    en: `<h2>Ask what the background contains before erasing</h2><p>Before removing a cable, mic or stand, read the background: a plain wall is easy; foliage, crowds and texture are not. Shoot a clean plate or empty frame so post has a source.</p><p>Match grain, noise and motion blur. A clean still that falls apart in motion is the usual failure.</p><h2>Limits</h2><p>Do not erase story information. Removing a key prop or sign can change how the audience reads the space; confirm it is not load-bearing.</p>`
  },
  'foley': {
    zh: `<h2>先对动作，再谈创意</h2><p>Foley 的第一关是同步：脚步落地的帧、衣服摩擦的帧、杯子放下的帧。先把动作对上，再加重量和材质；不同步的 Foley 比没有更假。</p><p>分层做：接触声、运动声、环境声分开录，剪辑时分别调；不要一条音轨包办。</p><h2>边界</p><p>Foley 不是“加声音就丰富”。画面没有的动作，不要硬加；观众会感到声画分离。</p>`,
    en: `<h2>Sync to action before getting creative</h2><p>Foley passes first on sync: the frame the foot lands, cloth rubs, cup meets table. Match the action, then add weight and material; out-of-sync Foley is worse than none.</p><p>Layer contact, movement and ambience separately and mix them independently; do not put everything on one track.</p><h2>Limits</h2><p>Foley is not “more sound equals richer.” Do not add actions the picture does not show; the audience feels the separation.</p>`
  },
  'stabilizer': {
    zh: `<h2>稳定先看“有没有空间裁切”</h2><p>后期稳定会放大画面、裁掉边缘。先确认构图四周有余量；没有余量，稳定后会出现黑边或软边。手持广角比长焦更容易救。</p><p>稳定的顺序：先做相机校正，再做稳定，最后做构图微调；不要先裁再稳。</p><h2>边界</h2><p>稳定不能修运动模糊和果冻。快门太慢、滚动快门太强，稳定只会让变形更明显；先回拍摄解决。</p>`,
    en: `<h2>Check room to crop before stabilizing</h2><p>Post stabilization zooms and cuts edges. Confirm the frame has margin; without it you get black or soft edges. Handheld wide is easier to rescue than long lens.</p><p>Order: lens correction, stabilization, then reframe. Do not crop before stabilizing.</p><h2>Limits</h2><p>Stabilization cannot fix motion blur or rolling shutter. Slow shutter and heavy skew become more visible; fix them on set.</p>`
  },
  'prop-continuity': {
    zh: `<h2>道具连续性靠“照片+表格”，不靠记忆</h2><p>每个场景开拍前拍一张道具全景，记录位置、数量、状态：杯子里的水、烟灰、纸张、伤口。换镜头前对照照片复位；不要凭演员或场记的记忆。</p><p>消耗品要备双份：食物、饮料、香烟、易碎品。拍多条时，每一条都从同一状态开始。</p><h2>边界</h2><p>连续性不是洁癖。观众不会数杯子里的水，但会感到“刚才不是这样”；只保观众会注意到的状态。</p>`,
    en: `<h2>Prop continuity uses photos and a sheet, not memory</h2><p>Photograph the full prop layout before each scene: position, count, state—water level, ash, papers, wounds. Reset against the photo before every setup; do not rely on actor or script-supervisor memory.</p><p>Keep doubles of consumables: food, drinks, cigarettes, breakables. Every take starts from the same state.</p><h2>Limits</h2><p>Continuity is not OCD. The audience will not count water level, but they feel “that changed.” Protect only what they notice.</p>`
  },
  'render': {
    zh: `<h2>渲染前先锁时间线，再锁设置</h2><p>确认时间线帧率、分辨率、色彩空间和音频采样率；渲染设置必须与交付表一致。不要一边改时间线一边渲染，出来的文件对不上。</p><p>渲染后抽三个点回放：开头、中间动作、结尾字幕；检查黑帧、静帧、断音和字幕溢出。文件大小和时长也要对。</p><h2>边界</h2><p>渲染不是交付。渲染通过只说明文件生成成功，不说明内容正确；QC 仍要单独做。</p>`,
    en: `<h2>Lock the timeline, then the settings</h2><p>Confirm frame rate, resolution, color space and audio sample rate; render settings must match the delivery sheet. Do not edit while rendering; the file will not match.</p><p>Play three points after render: opening, mid action, end credits. Check black frames, freezes, audio dropouts and caption overflow. Verify size and duration.</p><h2>Limits</h2><p>Rendering is not delivery. A successful render proves the file exists, not that it is correct; QC is a separate pass.</p>`
  },
  'edit-manipulation': {
    zh: `<h2>先找“剪切点”，再判断删了什么</h2><p>看一条可疑视频，先找三处剪切：画面跳变、声音断点、口型不连续。每个剪切点前后各看两秒，问“中间缺了什么”。</p><p>再看速度：音频波形是否被拉长、人物动作是否不自然、环境声是否循环。剪辑可以制造因果，也可以删掉因果。</p><h2>边界</h2><p>有剪切不等于造假。正常剪辑也会删时间；判断标准是删掉的部分是否改变了意思，而不是“剪过”。</p>`,
    en: `<h2>Find the cuts, then ask what was removed</h2><p>Look for three cuts first: picture jump, sound break, lip mismatch. Watch two seconds before and after each and ask what is missing.</p><p>Then check speed: stretched audio waveform, unnatural motion, looping ambience. Editing can create cause and remove it.</p><h2>Limits</h2><p>A cut is not automatically deception. Normal editing removes time; the test is whether the removal changes meaning, not whether it was cut.</p>`
  },
  'versioning': {
    zh: `<h2>版本号只增不减，说明写“改了什么”</h2><p>文件名用 v001、v002，不用“最终”“最终2”。每次输出写一行变更：改了哪一场、哪个镜头、为什么。没有变更说明，版本号只是数字。</p><p>只保留当前版和上一版在工作目录，旧版归档；交付时明确哪一版是母版，避免客户打开错文件。</p><h2>边界</h2><p>版本不是越多越好。每次改一个目的，改完立刻命名；一天出十个版本，等于没有版本。</p>`,
    en: `<h2>Version numbers only go up, with a change note</h2><p>Use v001, v002, never “final” or “final2.” Every export gets one line: which scene, which shot, why. Without a note, a version number is just a number.</p><p>Keep current and previous in the working folder, archive older ones. State which version is the master at delivery so the client opens the right file.</p><h2>Limits</h2><p>More versions is not better. One purpose per pass, name it immediately; ten versions a day means no version control.</p>`
  },
  'insert-shot': {
    zh: `<h2>插入镜头是“剪辑的呼吸”，不是随手空镜</h2><p>每个场景准备 2–3 个插入：手部动作、道具状态、环境细节。它们要能接在主镜头任何位置，帮剪辑藏跳切、压节奏、补信息。</p><p>拍插入时多拍 5 秒头和尾，剪辑才有余量；不要只拍动作中心那一秒。</p><h2>边界</h2><p>插入不能替代缺失的主镜头。主镜头没拍清楚，插十个特写也讲不清空间；先保主镜头。</p>`,
    en: `<h2>Inserts are the edit's breath, not random scenery</h2><p>Prepare two or three inserts per scene: hand action, prop state, environment detail. They must cut anywhere into the master and help hide jumps, pace the scene or add information.</p><p>Shoot five seconds of head and tail around the action; one second at the center leaves no room.</p><h2>Limits</h2><p>Inserts cannot replace a missing master. If the space is unclear, ten close-ups will not explain it; protect the master first.</p>`
  },
  'music-editing': {
    zh: `<h2>先剪故事，再对音乐</h2><p>不要一开始就按节拍切画面。先把故事剪到成立，再把音乐铺上去；需要时移动音乐段落，而不是把画面切碎去凑拍子。</p><p>用音乐的分句和留白做转场：副歌前留半拍、桥段前收音乐；不要每一拍都切。</p><h2>边界</h2><p>音乐不是情绪的万能胶。画面没有变化，加再大的音乐也只是吵；先让动作成立。</p>`,
    en: `<h2>Cut the story first, then the music</h2><p>Do not cut picture to the beat from the start. Make the story work, then lay the music; move the track's sections when needed instead of chopping picture to fit.</p><p>Use phrases and rests as transitions: half a beat before the chorus, pull music before the bridge. Do not cut on every beat.</p><h2>Limits</h2><p>Music is not emotional glue. If the picture does not change, louder music is only noise; make the action work first.</p>`
  },
  'archive': {
    zh: `<h2>归档不是“打包”，是“下次能打开”</h2><p>归档包要包含：最终工程、原素材或代理、字体、LUT、音乐授权、字幕、交付文件和一页说明。缺字体和 LUT，下次打开就是满屏报错。</p><p>用校验和生成清单，存两份，一份离线；每年抽一个包恢复测试。</p><h2>边界</h2><p>归档不是把所有版本都塞进去。只留最终工程和必要素材；旧版本另存，否则包大到没人敢开。</p>`,
    en: `<h2>Archiving is not zipping; it is opening next time</h2><p>The package includes final project, originals or proxies, fonts, LUTs, music licenses, captions, delivery files and a one-page note. Missing fonts and LUTs means a wall of errors next time.</p><p>Generate a checksum manifest, keep two copies, one offline; restore-test one package a year.</p><h2>Limits</h2><p>Archiving is not every version. Keep the final project and necessary media; store old versions separately or the package becomes too big to open.</p>`
  },
  'audio-noise-fix': {
    zh: `<h2>先分类噪声，再选工具</h2><p>噪声分三类：持续底噪（空调、风扇）、间歇噪声（关门、车）、人声瑕疵（齿音、喷麦）。持续底噪可以降噪；间歇噪声要剪掉或重录；齿音用 EQ 和 de-ess，不要全局降噪。</p><p>降噪前留一条原始轨；处理后再听对白是否变闷、变金属。宁可保留一点底噪，也不要把人声修成机器人。</p><h2>边界</h2><p>降噪不能救听不清的对白。语音本身含糊，先重录或配音；降噪只会让含糊更明显。</p>`,
    en: `<h2>Classify noise before choosing a tool</h2><p>Three kinds: constant floor (AC, fan), intermittent (door, car), voice flaws (sibilance, plosives). Constant floor can be reduced; intermittent must be cut or re-recorded; sibilance uses EQ and de-essing, not global denoise.</p><p>Keep an untouched track; after processing, listen for muffled or metallic dialogue. A little floor is better than a robot voice.</p><h2>Limits</h2><p>Denoise cannot rescue unintelligible dialogue. If speech is mushy, re-record or dub; denoise makes mush more obvious.</p>`
  },
  'hard-light': {
    zh: `<h2>硬光先看“影子边缘”</h2><p>硬光的特征是影子边缘清楚、反差高。用小块光源、裸灯或远距离太阳光；想要硬但不想过曝，就降输出或加 ND，不要用大柔光箱。</p><p>硬光适合表现权力、冲突、质感；拍人脸时注意鼻影和眼窝，必要时用一块小反光补暗部。</p><h2>边界</h2><p>硬光不是“不打光”。它需要更精确的位置和控制；影子方向错了，画面会像事故现场。</p>`,
    en: `<h2>Hard light is read at the shadow edge</h2><p>Hard light has a crisp shadow edge and high contrast. Use a small source, bare lamp or distant sun; to keep it hard without clipping, lower output or add ND, not a big softbox.</p><p>Hard light suits power, conflict and texture. On faces, watch nose and eye-socket shadows; use a small bounce if needed.</p><h2>Limits</h2><p>Hard is not “no lighting.” It needs more precise placement and control; a wrong shadow direction looks like an accident.</p>`
  },
  'night-interior': {
    zh: `<h2>室内夜景先定“哪盏灯是真的”</h2><p>画面里至少要有一盏可信的实景光源：台灯、窗、电视、走廊灯。人物补光从这盏灯的方向来，不要从摄影机方向打平。曝光保灯罩和窗外，暗部留一点细节。</p><p>拍前关掉所有非画面光源，避免混合色温和频闪；需要时用暗色窗帘压窗。</p><h2>边界</h2><p>夜景不是蓝月亮。室内夜戏可以有暖灯、冷窗、混合色；统一成单一蓝色，反而假。</p>`,
    en: `<h2>Interior night needs one believable source</h2><p>At least one practical must motivate the light: lamp, window, TV, hallway. Fill the face from that direction, not flat from camera. Protect the shade and window; keep some shadow detail.</p><p>Turn off all off-screen sources to avoid mixed color and flicker; darken windows with curtains if needed.</p><h2>Limits</h2><p>Night is not blue moonlight. Interior night can mix warm lamps and cool windows; one uniform blue looks fake.</p>`
  },
  'nd-filter': {
    zh: `<h2>ND 先算档位，再看红外</h2><p>ND 的作用是把快门拉回电影感而不让画面过曝。先按“目标光圈 + 快门 1/50 + 当前 ISO”算差几档，再选 ND；不要凭“看起来暗”随手加。</p><p>强 ND 可能带来红外偏色，黑色衣物变紫红；用带 IR 抑制的 ND，或拍色卡对比。</p><h2>边界</h2><p>ND 不能替代收光圈。景深需要 F1.4 时，ND 才有意义；需要 F8 时，先收光圈，再考虑 ND。</p>`,
    en: `<h2>Calculate ND stops, then check IR</h2><p>ND restores a cinematic shutter without overexposure. Calculate the gap from target aperture, 1/50 shutter and current ISO, then choose the filter; do not guess by “it looks dark.”</p><p>Strong ND can cause IR cast, turning black fabric purple. Use IR-suppressed ND or shoot a color chart comparison.</p><h2>Limits</h2><p>ND is not a substitute for stopping down. It matters when you need F1.4; at F8, stop the lens first and then consider ND.</p>`
  },
  'set-dressing': {
    zh: `<h2>陈设先服务“谁住在这里”</h2><p>道具不是摆得满。先写人物的三个习惯：鞋怎么放、杯子放哪、墙上留什么。每个习惯对应一个可见痕迹；观众从痕迹读生活，不从数量读丰富。</p><p>前景留一件能遮挡的物件，后景留一块能呼吸的空白；中间才是人物。</p><h2>边界</h2><p>陈设不能抢表演。颜色太跳、图案太密，观众会看墙不看人；先压背景，再谈细节。</p>`,
    en: `<h2>Dressing answers who lives here</h2><p>Props are not abundance. Write three habits: where shoes go, where the cup sits, what stays on the wall. Each habit leaves a visible trace; the audience reads life from traces, not quantity.</p><p>Keep one foreground object for blocking and one empty background area to breathe; the person belongs in between.</p><h2>Limits</h2><p>Dressing must not steal performance. Too much color or pattern and the audience watches the wall; calm the background first.</p>`
  },
  'overheat-fix': {
    zh: `<h2>过热先降规格，不要等死机</h2><p>长时间录制前，把分辨率、帧率、码率和屏幕亮度降到稳定档；关闭机身防抖和无线传输，取出电池散热。每 20–30 分钟检查温度，提前换卡换电池。</p><p>不要用外置风扇直吹传感器，会带来振动和灰尘；用机身散热孔和阴凉环境。</p><h2>边界</h2><p>过热不是“机器坏了”。它常在高温、阳光直射、高码率同时出现；先改条件，再判断设备。</p>`,
    en: `<h2>Drop specs before the camera dies</h2><p>For long takes, lower resolution, frame rate, bitrate and screen brightness to a stable setting; disable IBIS and wireless, remove the battery to cool. Check temperature every twenty to thirty minutes and swap cards early.</p><p>Do not blow a fan directly at the sensor; it adds vibration and dust. Use vents and shade.</p><h2>Limits</h2><p>Overheating is not “broken.” It appears with heat, direct sun and high bitrate together; change conditions before blaming the body.</p>`
  },
  'frame-rate': {
    zh: `<h2>先定项目帧率，再谈慢动作</h2><p>项目帧率决定声音、字幕和平台兼容；慢动作只是拍摄帧率。24/25/30 是叙事基准，60/120 用于后期放慢。不要在同一个项目里混用多个基准帧率。</p><p>慢动作要按“想放慢多少”算拍摄帧率：想放慢 2 倍，拍 48/50/60；想放慢 4 倍，拍 96/100/120。</p><h2>边界</h2><p>高帧率不是更“电影感”。它会让动作太顺、失去重量；叙事片通常用 24/25，慢动作只用在需要的镜头。</p>`,
    en: `<h2>Set the project rate before slow motion</h2><p>Project frame rate drives sound, captions and platform compatibility; slow motion is a capture rate. 24/25/30 is the narrative base, 60/120 for later slowdown. Do not mix base rates in one project.</p><p>Choose capture rate by the slowdown: 2x needs 48/50/60; 4x needs 96/100/120.</p><h2>Limits</h2><p>High frame rate is not more cinematic. It makes action too smooth and weightless; narrative usually stays at 24/25, with slow motion only where needed.</p>`
  },
  'jelly-fix': {
    zh: `<h2>果冻先看“运动方向”</h2><p>滚动快门在横向快速移动时最明显：柱子变斜、脸变窄、手变软。拍前避免快速横摇，用更广的镜头、更稳的支撑；后期稳定只能裁切，不能还原形状。</p><p>需要快速运动时，用全局快门机型或降低运动速度；不要靠后期“修复”严重变形。</p><h2>边界</h2><p>轻微果冻可以接受。观众不会逐帧看柱子；只要动作读得懂，不必为此重拍全部。</p>`,
    en: `<h2>Read the direction of motion for rolling shutter</h2><p>Rolling shutter shows most in fast lateral moves: poles lean, faces narrow, hands bend. Avoid fast pans, use a wider lens and steadier support; stabilization can crop but cannot restore shape.</p><p>For fast action, use a global-shutter camera or slow the action; do not “fix” heavy skew in post.</p><h2>Limits</h2><p>Mild skew is acceptable. The audience does not freeze-frame poles; if the action reads, do not reshoot everything.</p>`
  },
  'live-encoding': {
    zh: `<h2>直播先保“不断”，再保“好看”</h2><p>码率按上传带宽的 70% 设，留余量；关键帧间隔 2 秒，音频 128–192 kbps。分辨率高但码率不够，运动画面会糊成块；宁可 720p 稳，不要 4K 卡。</p><p>开播前测 10 分钟：丢帧、延迟、声音同步、备用网络。不要用主网络开播才发现上传不够。</p><h2>边界</h2><p>直播不是录播。不能靠后期补，所有信息要一次说清；字幕和图表要提前准备，不要现场找。</p>`,
    en: `<h2>Live starts with staying up, then looking good</h2><p>Set bitrate at 70% of upload, keyframe every two seconds, audio 128–192 kbps. High resolution without bitrate turns motion into blocks; stable 720p beats stuttering 4K.</p><p>Test ten minutes before: dropped frames, latency, audio sync, backup network. Do not discover upload limits after going live.</p><h2>Limits</h2><p>Live is not recorded. Post cannot fix it; state information once, prepare captions and graphics in advance.</p>`
  },
  'shutter-angle': {
    zh: `<h2>180 度是起点，不是法律</h2><p>快门 1/50（25p）或 1/48（24p）对应 180 度，运动模糊接近电影感。想要更“锐”的瞬间，可以提高快门；想要更柔的拖影，可以降低，但要注意频闪和果冻。</p><p>快门和灯光要匹配：50Hz 地区用 1/50 或 1/100，避免 1/60 造成滚动黑带。</p><h2>边界</h2><p>快门不是曝光工具。曝光不够时先加灯或开光圈，不要靠降快门救；慢快门会让动作糊成泥。</p>`,
    en: `<h2>180 degrees is a start, not a law</h2><p>1/50 at 25p or 1/48 at 24p approximates 180 degrees and film-like motion. A faster shutter sharpens the instant; a slower one lengthens blur but risks flicker and skew.</p><p>Match mains: in 50Hz regions use 1/50 or 1/100, not 1/60, to avoid rolling bands.</p><h2>Limits</h2><p>Shutter is not an exposure tool. If light is low, add light or open the iris; slow shutter turns action to mud.</p>`
  },
  'practical-light': {
    zh: `<h2>实景灯要“可信”，也要“可控”</h2><p>台灯、窗、霓虹可以入画，但要确认色温、亮度和频闪。用可调色温灯泡替换原有灯泡，加柔光罩或调光器；不要让实景灯直接照脸过曝。</p><p>拍前用手机慢动作看频闪；有滚动黑带，就换灯或改快门。</p><h2>边界</h2><p>实景灯不是主光。它提供动机和背景，人脸还需要单独补光；只靠台灯，暗部会脏。</p>`,
    en: `<h2>Practicals must be believable and controllable</h2><p>Lamps, windows and neon can be in frame, but confirm color, output and flicker. Swap bulbs for adjustable temperature, add diffusion or dimmers; do not let a practical blow out the face.</p><p>Check flicker with phone slow motion; rolling bands mean change the lamp or shutter.</p><h2>Limits</h2><p>A practical is not a key light. It motivates and fills the background; the face still needs separate fill, or shadows go muddy.</p>`
  },
  'log-footage': {
    zh: `<h2>Log 先保高光，再保中间调</h2><p>Log 不是“越亮越好”。曝光时让高光留 1–1.5 档余量，中间调落在波形中段；暗部可以欠，但不要死黑。用假色或斑马确认，不要靠监视器 LUT 判断。</p><p>后期先套还原 LUT，再做一级和风格；不同机型、不同 ISO 的 Log 不要混用同一个 LUT。</p><h2>边界</h2><p>Log 不是免费宽容度。高 ISO 下暗部噪声照样存在；能打灯就打灯，不要靠后期拉回。</p>`,
    en: `<h2>Log protects highlights, then midtones</h2><p>Log is not “brighter is better.” Expose with one to one-and-a-half stops of highlight headroom, midtones in the middle of the waveform; shadows may underexpose but must not crush. Use false color or zebra, not the monitor LUT.</p><p>Apply the conversion LUT first, then primary and look. Do not use one LUT across different cameras and ISOs.</p><h2>Limits</h2><p>Log is not free latitude. Noise still exists at high ISO; light the scene rather than lifting in post.</p>`
  },
  'mixed-light': {
    zh: `<h2>混合光先选“一个主色温”</h2><p>窗光、台灯、霓虹同时出现时，先决定画面主色温：白天偏窗、夜晚偏灯。然后用 gel 或补光把其他光源拉近主色温；不要全部中和成白色，会失去现场感。</p><p>拍色卡，后期以主光为准；保留次要光的色彩作为层次。</p><h2>边界</h2><p>混合光不是“白平衡坏了”。有时冷暖对比就是画面意思；只要肤色可接受，不必把所有灯都统一。</p>`,
    en: `<h2>Choose one dominant temperature in mixed light</h2><p>With window, lamp and neon together, decide the dominant temperature: daylight leans to window, night to lamp. Use gel or fill to bring others closer; do not neutralize everything to white and lose the place.</p><p>Shoot a chart and balance to the dominant source; keep secondary color as layering.</p><h2>Limits</h2><p>Mixed light is not “bad white balance.” A warm-cool contrast can be the point; if skin is acceptable, do not unify every lamp.</p>`
  },
  'multicam-sync': {
    zh: `<h2>多机位先统一“时间基准”</h2><p>有时间码就 jam sync，没有就用共同拍手或闪光。每台机位必须拍到同一事件，剪辑按音频波形对齐；不要靠画面猜。</p><p>统一帧率、快门、白平衡和录音采样率；不同机位色彩可以后期匹配，帧率不同则无法无损同步。</p><h2>边界</h2><p>同步不是一次性。长时间录制会漂移，每 20–30 分钟重新对齐；重要场次用时间码发生器。</p>`,
    en: `<h2>Unify the time base before multicam</h2><p>With timecode, jam sync; without it, use a shared clap or flash. Every camera must see the same event and align by audio waveform; do not guess from picture.</p><p>Match frame rate, shutter, white balance and audio sample rate. Color can be matched later; mixed frame rates cannot sync losslessly.</p><h2>Limits</h2><p>Sync is not one-time. Long records drift; realign every twenty to thirty minutes, and use a timecode generator for critical scenes.</p>`
  },
  'wireless-lav': {
    zh: `<h2>无线麦先扫频率，再谈距离</h2><p>现场先扫频，避开电视台和 Wi-Fi 密集段；发射器贴近身体，接收器高于人群，天线不要贴金属。每套麦备一条有线备份，录到机身或第二录音机。</p><p>开拍前让演员走遍全场，听有没有断音、静电和衣服摩擦；不要只在站位测试。</p><h2>边界</h2><p>无线不是免布线。电池、遮挡、人体吸收都会让信号掉；重要对白必须双重录音。</p>`,
    en: `<h2>Scan frequencies before discussing range</h2><p>Scan the room, avoid TV and crowded Wi-Fi bands; keep the transmitter on the body, receiver above the crowd, antennas off metal. Every wireless pair needs a wired backup to camera or a second recorder.</p><p>Walk the actor through the whole space and listen for dropouts, static and cloth noise; do not test only at the mark.</p><h2>Limits</h2><p>Wireless is not cable-free. Batteries, blocking and body absorption drop signal; critical dialogue needs a second recording.</p>`
  },
  'dual-system-sound': {
    zh: `<h2>双系统先录“参考声”，再录“干净声”</h2><p>相机自带麦克风只做参考，外接录音机录干净对白。开机前拍手或报镜号，让两条文件有共同同步点；不要只靠相机声对齐。</p><p>录音机设置 48kHz/24bit，保留原始 WAV；现场不要降噪、不要压缩，后期再做。</p><h2>边界</h2><p>双系统不是“有两份声音”。如果外接麦没戴好、增益不对，干净声也会废；现场必须监听。</p>`,
    en: `<h2>Dual system records scratch and clean sound</h2><p>The camera mic is scratch; the external recorder captures clean dialogue. Clap or slate before rolling so both files share a sync point; do not align by camera audio alone.</p><p>Record 48 kHz/24-bit, keep raw WAV; no denoise or compression on set.</p><h2>Limits</h2><p>Dual system is not “two copies of sound.” If the lav is misplaced or gain is wrong, the clean track is also ruined; monitor on set.</p>`
  },
  'boom-operator': {
    zh: `<h2>杆操先学“听”，再学“举”</h2><p>杆操不是把杆举高。先听演员的呼吸和脚步，预判下一句和下一个动作；杆头跟着动作走，不跟着台词走。演员停，杆也停；演员转身，杆从外侧绕。</p><p>每场先录 10 秒房间声和杆位测试；确认没有撞灯、没有影子、没有衣服摩擦。</p><h2>边界</h2><p>杆不是越长越好。长杆在窄空间会撞墙、会累；能用短杆就短，保对白比保姿势重要。</p>`,
    en: `<h2>Boom operating is listening before lifting</h2><p>It is not holding the pole high. Listen to breath and footsteps, anticipate the next line and action; the tip follows action, not dialogue. When the actor stops, the pole stops; when they turn, go around the outside.</p><p>Record ten seconds of room tone and a boom test each scene; confirm no lamp hit, shadow or cloth rub.</p><h2>Limits</h2><p>Longer is not better. A long pole hits walls and tires arms in tight spaces; use the shortest that works. Protect the line over the pose.</p>`
  },
  'lighting-style': {
    zh: `<h2>风格先写“光比”，再写“颜色”</h2><p>灯光风格不是套预设。先定光比：人脸亮部与暗部差几档；再定方向：主光从哪来；最后定颜色：暖、冷还是混合。三项定下来，风格才可复制。</p><p>用参考图只看“光从哪来、影子多硬、脸亮多少”，不要只看色调；色调可以后期，光位不能。</p><h2>边界</h2><p>风格不是每场换一种。整片要有一条光比主线；每场都换，观众只感到乱。</p>`,
    en: `<h2>Style starts with ratio, then color</h2><p>Lighting style is not a preset. Set the ratio—how many stops between face highlight and shadow; then direction—where the key comes from; then color—warm, cool or mixed. With those three, the style repeats.</p><p>Read references for direction, shadow hardness and face brightness, not only tone. Tone can be graded; position cannot.</p><h2>Limits</h2><p>Style is not a new look every scene. The film needs one ratio through-line; changing every scene reads as chaos.</p>`
  },
  'scopes': {
    zh: `<h2>波形看亮度，矢量看颜色， parade 看分离</h2><p>波形图看整体亮度和高光贴顶；矢量示波器看饱和度和色相；RGB parade 看三个通道是否对齐。三者一起用，才能判断“亮”和“偏色”是两件事。</p><p>先看 parade 的黑白平衡，再看矢量肤色线，最后回波形确认高光；不要只看一个示波器就下结论。</p><h2>边界</h2><p>示波器不是创作裁判。风格化低对比、夜景和逆光都可能“不好看”；先定意图，再读示波器。</p>`,
    en: `<h2>Waveform for luma, vector for color, parade for separation</h2><p>Waveform shows overall brightness and clipped highlights; vector shows saturation and hue; RGB parade shows channel alignment. Use all three to separate “bright” from “cast.”</p><p>Check parade black and white balance, then vector skin line, then waveform highlights; do not conclude from one scope.</p><h2>Limits</h2><p>Scopes are not creative judges. Stylized low contrast, night and backlight can look “wrong”; set intention before reading them.</p>`
  }
};
