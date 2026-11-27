// Curated depth for the thinnest tool cards and method cards.
// These blocks are appended to the static article body; they are deliberately
// specific: setup choices, a field test, and a "do not use it here" boundary.
export const EDITORIAL_DEPTH = {
  'tool-card-basic-kit': {
    zh: `<h2>按项目倒推，不按清单买</h2>
<ul><li><strong>最低档：</strong>一台可手动曝光的机身、一支等效 24–70mm 的镜头、一支领夹或机头麦、一块可调亮度的灯、两张卡和一块移动硬盘。先把 30 秒对白和 10 个镜头拍完。</li><li><strong>工作档：</strong>加一支定焦、一支枪麦加录音机、ND 滤镜和监视器。声音与曝光能独立控制，才有条件谈风格。</li><li><strong>备份档：</strong>第二台机身、第二套录音、第二块电池和独立备份盘。商单现场坏一个环节还能继续拍。</li></ul>
<h2>第一笔钱先花在哪里</h2>
<p>先补声音，再补光，最后才补镜头。观众能容忍画面平，但忍不了对白听不清。机身决定上限，录音和布光决定下限。</p>
<h2>开机前的 3 个测试</h2>
<ol><li>录 30 秒对白，戴耳机听底噪和齿音，再拔掉监听回放。</li><li>拍一张有窗外高光的画面，确认高光不爆、暗部还有细节。</li><li>把卡里的测试素材拷到硬盘，拔卡后只从硬盘回放一遍。</li></ol>
<h2>什么情况下不要升级</h2>
<p>如果现在的瓶颈是脚本、调度或剪辑，不要买第四支镜头。先用现有器材拍完三条完整短片，再按失败点补设备。</p>`,
    en: `<h2>Build backwards from the job</h2>
<ul><li><strong>Minimum:</strong> one camera with manual exposure, one 24–70mm-equivalent lens, one lav or on-camera mic, one dimmable light, two cards, one portable drive. Finish a 30-second dialogue scene and ten shots first.</li><li><strong>Working:</strong> add a prime, a shotgun mic and recorder, ND filters, and a monitor. Independent sound and exposure are the entry ticket to style.</li><li><strong>Backup:</strong> a second body, a second audio chain, spare batteries, and a separate backup drive. A paid shoot should survive one failed link.</li></ul>
<h2>Where the first money goes</h2>
<p>Sound first, light second, lenses last. Viewers forgive a flat image; they do not forgive dialogue they cannot hear. The body sets the ceiling; sound and lighting set the floor.</p>
<h2>Three tests before you shoot</h2>
<ol><li>Record 30 seconds of dialogue, listen on headphones for noise and sibilance, then play it back without monitoring.</li><li>Shoot a frame with a bright window: check that highlights hold and shadows still carry detail.</li><li>Copy the test clip to the drive, eject the card, and play it back from the drive only.</li></ol>
<h2>When not to upgrade</h2>
<p>If the bottleneck is script, blocking or editing, a fourth lens will not help. Finish three complete short films with the current kit, then buy against a recorded failure.</p>`
  },
  'tool-card-audio-kit': {
    zh: `<h2>一条能独立的信号链</h2>
<p>枪麦负责主对白，领夹做备份，录音机负责把两路分开录，监听耳机负责当场发现底噪。四件里少一件，现场就会靠猜。</p>
<ul><li><strong>最低档：</strong>枪麦直接进机身，领夹用手机或第二台机器备份；只适合安静室内与单人。</li><li><strong>工作档：</strong>枪麦进 4 通道录音机，领夹单独占一轨，耳机实时监听；双人访谈和室外都够用。</li><li><strong>保险档：</strong>再加一支领夹、一台备用录音机和时间码；商单现场坏一条链，另一条还能交。</li></ul>
<h2>电平与备份</h2>
<p>对白峰值留在 -12 到 -6 dBFS，别把 32-bit 浮点当保险。32-bit 能救爆点，救不了没戴麦、没按录制和风灌进咪头的对白。每个机位至少留一条独立音轨。</p>
<h2>30 秒验收</h2>
<ol><li>让一个人正常说话，枪麦和领夹同时录；两条都能单独听懂。</li><li>录 30 秒安静房间，把增益推到你实际拍摄的位置，听底噪是否可接受。</li><li>在室外有风处录 10 秒，确认防风罩和背风位置有效，辅音没有被吞。</li></ol>
<h2>别用后期降噪掩盖</h2>
<p>降噪只能去掉稳定底噪，去不掉风噪、衣服摩擦和房间反射。现场换位置、换麦距、加挡风，永远比后期便宜。</p>`,
    en: `<h2>One chain that can stand alone</h2>
<p>A shotgun carries the main dialogue, a lav is the backup, a recorder keeps the tracks separate, and headphones catch noise on the spot. Missing one of the four turns the shoot into guesswork.</p>
<ul><li><strong>Minimum:</strong> shotgun into camera, lav backed up on a phone or second body; only for a quiet interior and one speaker.</li><li><strong>Working:</strong> shotgun into a 4-channel recorder, lav on its own track, headphones live; enough for two-person interviews and exteriors.</li><li><strong>Insured:</strong> add a second lav, a backup recorder and timecode; one broken chain does not end the shoot.</li></ul>
<h2>Levels and redundancy</h2>
<p>Keep dialogue peaks around -12 to -6 dBFS. Do not treat 32-bit float as insurance: it can rescue a clipped peak, not a missing lav, a stopped recorder, or wind inside the capsule. Every camera position needs at least one independent audio track.</p>
<h2>Thirty-second acceptance</h2>
<ol><li>Have one person speak normally while shotgun and lav record; each track must be intelligible alone.</li><li>Record 30 seconds of a quiet room at the gain you will actually use; listen for an acceptable noise floor.</li><li>Record 10 seconds outdoors in wind; confirm the blimp and shelter work and consonants survive.</li></ol>
<h2>Do not hide it in post</h2>
<p>Denoise removes steady hiss, not wind, clothing rustle or room reflection. Change position, mic distance or wind protection on set; it is always cheaper than repair.</p>`
  },
  'tool-card-lighting-kit': {
    zh: `<h2>先有方向，再谈柔硬</h2>
<p>一盏灯加一块柔光箱，先把光从哪边来定下来；再用反光板补暗部。没有方向的多灯，只会把脸打平。</p>
<ul><li><strong>最低档：</strong>一盏可调色温的 COB、一只 60–90cm 柔光箱、一根灯架和两个沙袋。室内单人访谈够用。</li><li><strong>工作档：</strong>加一块五合一反光板、一块黑旗和一只小灯做背景分离；能控制脸、背景和轮廓。</li><li><strong>保险档：</strong>第二盏同色温灯做备用或补光，加延长线和独立电源；现场少一个插座也能拍。</li></ul>
<h2>色温先统一</h2>
<p>把窗光、实用灯和影视灯的色温写在纸上，再用一张灰卡确认。混合光不是“氛围”，多数时候只是没对白平衡。</p>
<h2>开机测试</h2>
<ol><li>灯放 45° 侧前方，拍一张；再移到正面，拍一张；比较鼻影和眼神光。</li><li>把柔光箱从 1.5 米推到 0.8 米，各拍一张；影子边缘应明显变软。</li><li>用手机拍一张灯的画面，确认没有可见频闪；快门分别试 1/50 和 1/100。</li></ol>
<h2>什么情况下不要加灯</h2>
<p>如果窗光方向已经成立，先加反光板或黑旗，不要再用第二盏灯打平。夜景和纪实场景里，保留现有光源的方向，比“补亮”更重要。</p>`,
    en: `<h2>Direction first, softness second</h2>
<p>One light and one softbox establish where the light comes from; a reflector then opens the shadow side. Multiple lights without direction only flatten the face.</p>
<ul><li><strong>Minimum:</strong> one dimmable COB, one 60–90cm softbox, one stand, two sandbags. Enough for a single interior interview.</li><li><strong>Working:</strong> add a 5-in-1 reflector, a black flag and a small background light; now you can separate face, background and edge.</li><li><strong>Insured:</strong> a second matched light for backup or fill, plus extension cables and independent power; one missing outlet does not stop the shoot.</li></ul>
<h2>Match color temperature first</h2>
<p>Write down the color temperature of window light, practicals and fixtures, then confirm with a gray card. Mixed light is not “atmosphere” most of the time; it is a white balance problem.</p>
<h2>Startup test</h2>
<ol><li>Place the light 45° to the side, shoot one frame; move it to the front, shoot another; compare nose shadow and catchlight.</li><li>Move the softbox from 1.5m to 0.8m and shoot both; the shadow edge should visibly soften.</li><li>Film the fixture with a phone to check for flicker; test at 1/50 and 1/100 shutter.</li></ol>
<h2>When not to add a light</h2>
<p>If window light already has a direction, add a reflector or black flag before a second fixture. In night and documentary scenes, preserving the existing direction matters more than filling every shadow.</p>`
  },
  'tool-card-travel-kit': {
    zh: `<h2>先算重量，再算焦段</h2>
<p>旅拍的第一限制是背包和步行，不是镜头数量。机身加两支镜头加录音加脚架，超过你走一小时还能举起的重量，就会开始漏拍。</p>
<ul><li><strong>轻装：</strong>一台机身、一支 24–70mm 等效变焦、一支轻枪麦或领夹、一块 ND、两张卡、一块 SSD。脚架用轻量反折。</li><li><strong>完整：</strong>加一支广角或长焦、备用电池、轻量补光灯；所有配件能塞进一个登机包。</li><li><strong>不要带：</strong>没有拍摄计划的无人机、第三支重复焦段、超过现场能用的灯。</li></ul>
<h2>每天结束的 3 件事</h2>
<ol><li>把当天素材拷到 SSD，再从卡回放一遍，确认不是空文件。</li><li>给电池充电，给卡格式化前先确认备份完成。</li><li>写下第二天的第一个机位和光线时间，不要到现场再想。</li></ol>
<h2>现场测试</h2>
<p>出发前把最终背包背上，走十分钟、爬一层楼，再拍 30 秒。如果肩带勒、脚架晃或录音线找不到，回桌上减东西，不要到目的地再减。</p>`,
    en: `<h2>Weight budget before focal length</h2>
<p>The first constraint on a travel shoot is the bag and the walk, not the number of lenses. If body, two lenses, audio and tripod exceed what you can lift after an hour, you start missing shots.</p>
<ul><li><strong>Light:</strong> one body, one 24–70mm-equivalent zoom, one small shotgun or lav, one ND, two cards, one SSD, one lightweight reversing tripod.</li><li><strong>Full:</strong> add one wide or tele, spare batteries and a small fill light; everything fits one carry-on.</li><li><strong>Leave behind:</strong> a drone with no shot plan, a third duplicate focal length, and lights the location cannot power.</li></ul>
<h2>Three things at the end of each day</h2>
<ol><li>Copy the day to the SSD, then play back from the card to confirm the files are not empty.</li><li>Charge batteries; format a card only after the backup is verified.</li><li>Write tomorrow's first location and light time; do not decide at the location.</li></ol>
<h2>Field test</h2>
<p>Before leaving, wear the final bag, walk ten minutes and climb one floor, then shoot 30 seconds. If a strap cuts, the tripod wobbles or an audio cable is missing, remove gear at the table, not at the destination.</p>`
  },
  'tool-card-interview-kit': {
    zh: `<h2>两台机不是两台同样的机</h2>
<p>一台广角保全身和手，一台中近景保表情；两台用同一段声音，剪辑才有选择。两台完全相同的机位，只会给你两份一样的素材。</p>
<ul><li><strong>最低档：</strong>一台主机拍中景，一台备机拍广角；领夹进主机，备机用机头麦只做参考。</li><li><strong>工作档：</strong>两台可手动曝光机身、两支定焦、两支领夹加枪麦、两盏灯、同步时间码或拍手同步。</li><li><strong>保险档：</strong>独立录音机、第三支领夹、备用电池和一张备用卡；主机故障时访谈不中断。</li></ul>
<h2>开拍前 10 分钟</h2>
<ol><li>让受访者正常说一段，确认两条机位都合焦、两路声音都不爆。</li><li>拍手或打时间码，现场回放一次同步。</li><li>拍一张空镜和一张带手部的构图，确认字幕安全区。</li></ol>
<h2>不要做的事</h2>
<p>不要用两台不同品牌的机器还指望后期一键匹配；不要只给受访者戴一支领夹；不要在访谈中途换电池而不停机。访谈的价值在连续性，不在机位数量。</p>`,
    en: `<h2>Two cameras, not two copies</h2>
<p>One wide camera holds body and hands; one medium-close camera holds the face. Both share the same audio so the edit has choices. Two identical angles only give you the same footage twice.</p>
<ul><li><strong>Minimum:</strong> main camera on a medium shot, second camera on a wide; lav into the main, on-camera mic on the second as reference only.</li><li><strong>Working:</strong> two manual-exposure bodies, two primes, two lavs plus a shotgun, two lights, timecode or a clap sync.</li><li><strong>Insured:</strong> separate recorder, third lav, spare batteries and a spare card; a main-camera failure does not stop the interview.</li></ul>
<h2>Ten minutes before rolling</h2>
<ol><li>Have the subject speak normally; confirm both angles are in focus and neither audio channel clips.</li><li>Clap or jam timecode, then play back one sync check.</li><li>Shoot an empty frame and a frame with hands to confirm subtitle safe area.</li></ol>
<h2>Do not</h2>
<p>Do not pair two different camera brands and expect a one-click match; do not give the subject only one lav; do not change a battery mid-interview without stopping. Continuity is the value of an interview, not the number of angles.</p>`
  },
  'tool-card-live-kit': {
    zh: `<h2>先保网络和声音，再谈画面</h2>
<p>直播断掉，观众不会等你重开；声音爆掉，画面再清楚也没人看。清单顺序应是网络、音频、备份录制、机位、灯光。</p>
<ul><li><strong>最低档：</strong>一台相机、一张采集卡、一台笔记本、有线网络、一个领夹或调音台输出；先做 15 分钟私密测试。</li><li><strong>工作档：</strong>第二路网络（热点或路由器）、独立录音、备份录制、监看耳机和波形；能发现掉帧与爆音。</li><li><strong>保险档：</strong>硬件编码器、UPS、第二台相机和独立备份机；主链路坏了能切。</li></ul>
<h2>开播前测试</h2>
<ol><li>按实际码率推 15 分钟私密流，记录掉帧、延迟和上传波动。</li><li>让主播正常说话，确认直播端和备份录制端都不爆、不延迟。</li><li>拔掉主网络，确认备用网络能接管；再插回，确认不会重复推流。</li></ol>
<h2>不要用无线碰运气</h2>
<p>能插网线就插网线；无线只做备份。不要等开播才发现上行不够，也不要把备份录制放在同一台没有独立电源的机器上。</p>`,
    en: `<h2>Network and audio before image</h2>
<p>If the stream drops, viewers do not wait; if audio clips, a sharp image does not save it. The order is network, audio, backup recording, cameras, lighting.</p>
<ul><li><strong>Minimum:</strong> one camera, one capture card, one laptop, wired network, one lav or console feed; run a 15-minute private test first.</li><li><strong>Working:</strong> a second network path (hotspot or router), independent audio, backup recording, headphones and a waveform display; you can see drops and clipping.</li><li><strong>Insured:</strong> hardware encoder, UPS, second camera and independent backup recorder; a failed primary path can be switched.</li></ul>
<h2>Pre-broadcast test</h2>
<ol><li>Push a private stream for 15 minutes at the real bitrate; log dropped frames, latency and upload variation.</li><li>Have the host speak normally; confirm both the live feed and backup recording do not clip or drift.</li><li>Unplug the primary network, confirm the backup takes over, then plug it back and confirm no duplicate stream.</li></ol>
<h2>Do not gamble on wireless</h2>
<p>Use Ethernet whenever possible; wireless is backup only. Do not discover insufficient upload at showtime, and do not put backup recording on the same machine without independent power.</p>`
  },
  'tool-card-storage-kit': {
    zh: `<h2>3-2-1 是底线，不是口号</h2>
<p>三份副本、两种介质、一份离开现场。RAID 不是备份，同步盘也不是备份；删除会同步删除，勒索软件也会同步加密。</p>
<ul><li><strong>最低档：</strong>工作 SSD 一份、现场移动硬盘一份、收工后带回另一块硬盘或云盘一份。</li><li><strong>工作档：</strong>SSD 工作盘、NAS 或双盘备份、离线硬盘；关键项目加 LTO 或云冷备。</li><li><strong>团队档：</strong>校验和、版本命名、恢复日志、介质轮换；任何人能在一个月后找到并打开原素材。</li></ul>
<h2>拷完必须做的三件事</h2>
<ol><li>按项目/日期/机位命名，不把“新建文件夹”带进后期。</li><li>生成校验和或至少比对文件数量与总大小；不要只看进度条。</li><li>随机抽一个文件，从备份介质打开并播放 10 秒。</li></ol>
<h2>恢复演练</h2>
<p>每月随机抽一个项目，从备份恢复到一台空机器，记录耗时和失败点。没有恢复演练的备份，只是心理安慰。</p>`,
    en: `<h2>3-2-1 is the floor, not a slogan</h2>
<p>Three copies, two media types, one off-site. RAID is not backup; a sync folder is not backup either. Deletion syncs, and ransomware encrypts the sync target too.</p>
<ul><li><strong>Minimum:</strong> one working SSD, one on-set drive, one drive or cloud copy taken away after the shoot.</li><li><strong>Working:</strong> SSD working disk, NAS or two-drive backup, offline drive; add LTO or cold cloud for critical projects.</li><li><strong>Team:</strong> checksums, version naming, restore log, media rotation; anyone can find and open the original footage a month later.</li></ul>
<h2>Three things after a copy</h2>
<ol><li>Name by project/date/camera; do not carry “New Folder” into post.</li><li>Generate checksums or at least compare file count and total size; do not trust a progress bar.</li><li>Pick one random file, open it from the backup media and play ten seconds.</li></ol>
<h2>Restore drill</h2>
<p>Once a month, restore one random project to an empty machine and record the time and failure points. A backup without a restore drill is only reassurance.</p>`
  },
  'tool-card-ai-kit': {
    zh: `<h2>先锁住不能变的东西</h2>
<p>AI 工作流不是“写一句提示词就出片”。先锁剧本、人物设定、镜头清单、授权范围和交付规格，再决定哪几个镜头交给生成。</p>
<ul><li><strong>最低档：</strong>一个可用的生成模型、一组人物参考图、一个放大/修复工具、剪辑软件和一份授权记录。</li><li><strong>工作档：</strong>角色设定表、镜头提示模板、生成素材编号、合成与调色、人工检查清单。</li><li><strong>保险档：</strong>本地备份、模型/版本记录、可替换的实拍方案；生成失败时项目还能继续。</li></ul>
<h2>只用在可控位置</h2>
<p>先用在空镜、背景、概念图和补插镜头；不要一上来就生成主角正脸和长对白。人手、文字、快速运动、镜面反射和复杂遮挡仍是高风险区。</p>
<h2>三条验收</h2>
<ol><li>同一角色在三个角度下，脸型、发型、服装和光线方向一致。</li><li>连续 5 秒运动中没有明显形变、闪烁或肢体粘连。</li><li>输出文件、模型版本、提示词和授权来源都能在项目记录里找到。</li></ol>
<h2>什么时候不要用</h2>
<p>新闻、纪录片、证词、真实人物代言和需要明确作者署名的项目，不要用生成画面冒充现场。没有授权链的素材，不进交付。</p>`,
    en: `<h2>Lock what must not change</h2>
<p>An AI workflow is not “one prompt and a finished film.” Lock the script, character bible, shot list, rights scope and delivery specs before deciding which shots to generate.</p>
<ul><li><strong>Minimum:</strong> one usable generator, a set of character references, an upscale/repair tool, an editor and a rights log.</li><li><strong>Working:</strong> character sheet, shot-prompt template, generated-asset IDs, compositing and grade, human check list.</li><li><strong>Insured:</strong> local backups, model/version records and a live-action fallback; a failed generation does not stop the project.</li></ul>
<h2>Use it where it is controllable</h2>
<p>Start with inserts, backgrounds, concept frames and pickups; do not start with a hero close-up and long dialogue. Hands, text, fast motion, mirrors and complex occlusion remain high-risk.</p>
<h2>Three checks</h2>
<ol><li>The same character across three angles keeps face, hair, wardrobe and light direction.</li><li>A continuous five-second move shows no warping, flicker or limb fusion.</li><li>Output files, model version, prompts and rights sources are all findable in the project record.</li></ol>
<h2>When not to use it</h2>
<p>News, documentary, testimony, real-person endorsement and projects requiring clear authorship must not use generated images as on-set evidence. Assets without a rights chain do not enter delivery.</p>`
  },
  'tool-card-accessibility': {
    zh: `<h2>先做四件事</h2>
<p>字幕、对比、口述影像、闪烁检查。四件里最容易被跳过的是对比和口述，而它们决定弱视观众能不能跟上。</p>
<ul><li><strong>最低档：</strong>准确的字幕文件、可读的字幕样式、关键信息的文字补充。</li><li><strong>工作档：</strong>听障字幕（含音效/说话人）、口述影像脚本、对比度检查、键盘可操作的页面。</li><li><strong>保险档：</strong>多语言字幕、音频描述混音、闪屏检测、真实用户测试。</li></ul>
<h2>字幕不是把对白打上去</h2>
<p>每行不超过 16–18 个汉字，保持 1–2 行；标出说话人和关键音效；让字幕在安全区内，别贴底边。语速快时拆句，不要靠缩小字号硬塞。</p>
<h2>三条验收</h2>
<ol><li>静音观看，仍能知道谁在说、发生了什么、关键音效是什么。</li><li>把画面缩到手机大小，字幕仍可读，和背景有足够对比。</li><li>用键盘走一遍页面，焦点可见，所有链接和按钮可达。</li></ol>
<h2>不要假装无障碍</h2>
<p>自动字幕不校对、口述影像只读画面、对比度只凭肉眼，都不算完成。无障碍是交付规格，不是附加善举。</p>`,
    en: `<h2>Four things first</h2>
<p>Captions, contrast, audio description and a flash check. Contrast and description are the ones most often skipped, and they decide whether low-vision viewers can follow.</p>
<ul><li><strong>Minimum:</strong> an accurate caption file, readable caption styling, text for essential information.</li><li><strong>Working:</strong> SDH captions (sound effects and speakers), an audio-description script, contrast checks, keyboard-operable pages.</li><li><strong>Insured:</strong> multilingual captions, described audio mix, flash testing, tests with real users.</li></ul>
<h2>Captions are not just dialogue</h2>
<p>Keep each line under roughly 16–18 Chinese characters, one or two lines. Mark speakers and key sounds. Keep captions inside the safe area, not on the bottom edge. Split fast speech instead of shrinking type.</p>
<h2>Three checks</h2>
<ol><li>Watch muted: you still know who speaks, what happens and which sounds matter.</li><li>Shrink the frame to phone size: captions remain readable and contrast with the background.</li><li>Tab through the page: focus is visible and every link and button is reachable.</li></ol>
<h2>Do not fake accessibility</h2>
<p>Unedited auto-captions, description that only narrates the image, and contrast judged by eye do not count. Accessibility is a delivery spec, not a favor.</p>`
  },

  'method-ai-uncanny': {
    zh: `<h2>先判断是哪一种“假”</h2>
<ul><li><strong>皮肤与光：</strong>脸太干净、眼神光位置不对、背景和人物的光方向不一致。先查光源，不要先加磨皮。</li><li><strong>运动：</strong>走路时膝盖反向、手指粘连、衣服没有惯性。把动作拆短，或改用实拍。</li><li><strong>细节：</strong>文字乱码、耳环不对称、牙齿数量不对。远景可以藏，近景必须换。</li></ul>
<h2>一个 2 秒测试</h2>
<p>截取生成镜头中最靠近脸的一帧，和同场实拍帧并排放在手机上看。如果第一眼先注意到皮肤或眼神光，而不是表演，这条就还不能用。再把视频静音播放一遍，看运动是否露馅。</p>
<h2>什么时候不要用</h2>
<p>主角正脸、长对白、真实采访和新闻现场，不要用生成画面替代。AI 适合空镜、背景、概念图和实拍无法补的插入镜头。</p>`,
    en: `<h2>Identify which kind of “fake”</h2>
<ul><li><strong>Skin and light:</strong> too-clean skin, catchlights in the wrong place, background and subject lit from different directions. Fix the source first, not with more smoothing.</li><li><strong>Motion:</strong> knees bending backwards, fingers merging, clothes without inertia. Shorten the action or shoot it live.</li><li><strong>Detail:</strong> garbled text, asymmetric earrings, the wrong number of teeth. Hide it wide; replace it close.</li></ul>
<h2>A two-second test</h2>
<p>Take the frame closest to the face and place it beside a live-action frame from the same scene on a phone. If you notice skin or catchlights before performance, it is not usable. Then watch the clip muted and check whether the motion gives it away.</p>
<h2>When not to use it</h2>
<p>Do not replace a hero close-up, long dialogue, a real interview or a news scene with generated images. Use AI for inserts, backgrounds, concept frames and pickups that cannot be shot.</p>`
  },
  'method-crew-conflict': {
    zh: `<h2>先分清冲突类型</h2>
<ul><li><strong>职责不清：</strong>两个人都在指挥机位。把每个部门的最后决定权写进通告单，现场只留一个决策人。</li><li><strong>时间压力：</strong>进度落后导致互相指责。先砍镜头或改调度，不要用加班和情绪补计划。</li><li><strong>安全问题：</strong>有人觉得危险但不敢说。安全否决权必须高于导演和制片，任何人可以叫停。</li></ul>
<h2>五分钟站会</h2>
<p>开拍前让每个组长说一句：今天最重要的一个镜头、最可能失败的一个环节、需要谁配合。只记录行动，不评价人。冲突发生时，先复述对方的要求，再给一个可执行的选择。</p>
<h2>不要做的事</h2>
<p>不要在群里公开点名，不要用“大家都这样”压人，不要在危险未排除时继续拍。现场吵架不是创作风格，是管理失败。</p>`,
    en: `<h2>Name the conflict type</h2>
<ul><li><strong>Unclear ownership:</strong> two people direct the camera. Write final authority for each department into the call sheet; keep one decision-maker on set.</li><li><strong>Schedule pressure:</strong> falling behind turns into blame. Cut shots or change the plan; do not fix a schedule with overtime and temper.</li><li><strong>Safety:</strong> someone sees a hazard but stays quiet. Safety veto outranks director and producer; anyone can call stop.</li></ul>
<h2>A five-minute stand-up</h2>
<p>Before rolling, each lead states the most important shot, the most likely failure and who they need. Record actions only, not judgments. In a conflict, repeat the other person's request first, then offer one executable option.</p>
<h2>Do not</h2>
<p>Do not call someone out in a group chat, do not pressure with “everyone does it,” and do not continue while a hazard is unresolved. On-set shouting is not a creative style; it is a management failure.</p>`
  },
  'method-wind-noise': {
    zh: `<h2>先判断风从哪来</h2>
<ul><li><strong>持续侧风：</strong>枪麦的防风毛套不够，换笼式防风或再加毛衣；麦头不要正对风口。</li><li><strong>阵风：</strong>领夹最容易被吹到，给领夹加防风罩，并把麦藏在衣领内侧。</li><li><strong>低频轰隆：</strong>多半是风打在咪头或杆上，不是底噪。把杆移开、加挡风，别先开降噪。</li></ul>
<h2>30 秒现场测试</h2>
<p>让主持人正常说一句话，分别站在开阔处、墙边和用身体挡风的位置各录 10 秒。戴耳机比较三者，选辅音最清楚的位置。录一条 10 秒纯环境声，作为后期判断降噪程度的参考。</p>
<h2>什么时候不要用后期</h2>
<p>风把辅音吞掉后，降噪只能让声音更闷。现场换位置、缩短麦距、加防风，永远比后期修复便宜。对白已经有风噪，不要再用音乐去盖。</p>`,
    en: `<h2>Find where the wind comes from</h2>
<ul><li><strong>Steady crosswind:</strong> a furry windshield is not enough; move to a blimp or add a second cover, and do not point the capsule into the gust.</li><li><strong>Gusts:</strong> lavs suffer first. Add a windshield and hide the capsule inside the collar.</li><li><strong>Low-frequency rumble:</strong> usually wind hitting the capsule or boom, not a noisy floor. Move the boom and add protection before denoise.</li></ul>
<h2>Thirty-second field test</h2>
<p>Have the host say one sentence in the open, beside a wall, and with a body blocking the wind; record ten seconds in each. Compare on headphones and choose the position with the clearest consonants. Record ten seconds of ambience as a reference for post.</p>
<h2>When not to rely on post</h2>
<p>Once wind eats the consonants, denoise only makes the voice duller. Move, shorten the mic distance and add protection on set; it is always cheaper. If dialogue already has wind, do not cover it with music.</p>`
  },
  'method-budget-overrun': {
    zh: `<h2>先判断超在哪一块</h2>
<ul><li><strong>前期超：</strong>器材、场地、人员天数增加。先砍范围，不要砍保险和安全。</li><li><strong>拍摄超：</strong>每天少拍一个镜头，连续三天就会拖垮后期。把剩余镜头按“没有它能不能交”重排。</li><li><strong>后期超：</strong>修改轮次没有上限，或素材量超出预算。把修改写进合同，按轮次计价。</li></ul>
<h2>一张 10 分钟的表</h2>
<p>把预算分成四块：前期、拍摄、后期、 contingency。每块至少留 10% 缓冲；把已超和将超的项目写成两列，只处理“将超”的前三项。不要用“到时候再说”盖住缺口。</p>
<h2>什么时候该停</h2>
<p>当超支已经威胁到安全、保险或交付质量时，停拍并重谈范围，比硬撑到交片更专业。客户可以接受少一个镜头，不能接受一个不能用的成片。</p>`,
    en: `<h2>Find which bucket is over</h2>
<ul><li><strong>Prep:</strong> gear, location or crew days grew. Cut scope, never insurance or safety.</li><li><strong>Shoot:</strong> losing one shot a day for three days sinks post. Re-rank the remaining shots by “can we deliver without it?”</li><li><strong>Post:</strong> unlimited revisions or more footage than budgeted. Put revision rounds in the contract and price them.</li></ul>
<h2>A ten-minute table</h2>
<p>Split the budget into prep, shoot, post and contingency. Keep at least 10% buffer in each. List actual and forecast overruns in two columns, then work only the top three forecast items. Do not hide the gap with “we'll figure it out.”</p>
<h2>When to stop</h2>
<p>When an overrun threatens safety, insurance or delivery quality, stop and renegotiate scope. That is more professional than pushing to a film nobody can use. A client can accept one missing shot; not an unusable master.</p>`
  },
  'method-color-cast': {
    zh: `<h2>先判断偏色来自哪里</h2>
<ul><li><strong>白平衡：</strong>同一场景里白纸不白，先拍灰卡，再统一相机和灯。</li><li><strong>混合光：</strong>窗光偏蓝、实用灯偏黄，脸一半冷一半暖。先决定以哪一边为主，再用色纸或黑旗处理另一边。</li><li><strong>Log/监看：</strong>监看 LUT 和输出 LUT 不一致，现场看着对，导出偏绿。用同一套色彩管理，别在监看和输出之间换 LUT。</li></ul>
<h2>一个 30 秒测试</h2>
<p>让一个人拿灰卡站在主体位置，拍一张；再把灰卡放到背景，拍一张。两张都按同一白平衡。如果灰卡在两张里不一致，先处理光源，不要先调色。</p>
<h2>什么时候不要用 LUT 掩盖</h2>
<p>偏色来自光源或白平衡时，套 LUT 只会让肤色更脏。先把拍摄端统一，再在后期做风格。肤色不对，不要用“电影感”解释。</p>`,
    en: `<h2>Find where the cast comes from</h2>
<ul><li><strong>White balance:</strong> white paper is not white in the same scene. Shoot a gray card, then match camera and lights.</li><li><strong>Mixed light:</strong> window light is blue, practicals are yellow, and the face is half cool and half warm. Choose the dominant side, then gel or flag the other.</li><li><strong>Log/monitoring:</strong> the monitor LUT and output LUT differ; it looks right on set and green on export. Use one color pipeline; do not switch LUTs between monitoring and output.</li></ul>
<h2>A thirty-second test</h2>
<p>Have a person hold a gray card at the subject position, shoot one frame; move the card to the background, shoot another. Use the same white balance. If the card differs, fix the light before grading.</p>
<h2>When not to hide it with a LUT</h2>
<p>If the cast comes from the source or white balance, a LUT only makes skin dirtier. Match the capture side first, then add style in post. Do not call bad skin “cinematic.”</p>`
  },
  'method-too-long': {
    zh: `<h2>先判断是故事长还是剪辑长</h2>
<ul><li><strong>故事长：</strong>人物目标出现太晚，或支线太多。先删支线，不要先加速。</li><li><strong>剪辑长：</strong>每个镜头都多留了两秒，或转场重复。把每个镜头去掉首尾各 6 帧，再看一遍。</li><li><strong>结构长：</strong>同一信息说了两遍。把重复的场景合并，保留更具体的那一个。</li></ul>
<h2>一次“无暂停”观看</h2>
<p>不看时间轴，完整看一遍，手里只拿一张纸。每次想拿手机或走神，记一个时间点；结束后看这些点之间有没有共同场景。先删这些场景，不要先调速度。</p>
<h2>什么时候不要剪短</h2>
<p>如果删掉后人物动机断了，问题不是长度，是结构。补一个动作或一句台词，而不是硬压到平台时长。</p>`,
    en: `<h2>Is the story long or the edit long?</h2>
<ul><li><strong>Story:</strong> the goal arrives late or there are too many subplots. Remove a subplot before speeding anything up.</li><li><strong>Edit:</strong> every shot holds two seconds too long, or transitions repeat. Trim six frames from both ends of each shot and watch again.</li><li><strong>Structure:</strong> the same information appears twice. Merge the scenes and keep the more specific one.</li></ul>
<h2>One uninterrupted watch</h2>
<p>Watch the whole cut without looking at the timeline, holding only a sheet of paper. Every time you reach for your phone or drift, note the time. See which scene those points share; cut that scene before changing speed.</p>
<h2>When not to cut shorter</h2>
<p>If removing it breaks the character's motivation, the problem is structure, not length. Add an action or a line instead of forcing the platform runtime.</p>`
  },
  'method-ai-rights': {
    zh: `<h2>先分清四种权利</h2>
<ul><li><strong>模型条款：</strong>商用许可、输出归属、是否允许训练衍生模型。先读当前版本，保存截图和日期。</li><li><strong>输入素材：</strong>参考图、视频、声音是否有权用于生成；不要拿客户未授权的素材做风格参考。</li><li><strong>人物形象：</strong>真实人脸、声音、姓名和肖像权；AI 生成也不能绕过授权。</li><li><strong>输出相似性：</strong>是否撞到现有角色、商标、音乐或美术作品。交付前做一次相似性检查。</li></ul>
<h2>一个 5 分钟记录</h2>
<p>为每个生成素材记录：模型与版本、提示词、输入参考、输出文件、授权来源、使用位置。没有这六项，不要放进商单交付。</p>
<h2>什么时候不要用</h2>
<p>新闻、纪录片、证词、真实人物代言和平台明确要求“实拍”的项目，不要用生成画面替代。版权不清的素材，不要先上线再补授权。</p>`,
    en: `<h2>Separate four rights</h2>
<ul><li><strong>Model terms:</strong> commercial use, output ownership, whether training a derivative is allowed. Read the current version and save a dated screenshot.</li><li><strong>Input assets:</strong> do you have the right to use reference images, video or voice for generation? Do not use a client's uncleared asset as a style reference.</li><li><strong>Personality:</strong> real face, voice, name and likeness. AI generation does not bypass consent.</li><li><strong>Output similarity:</strong> existing characters, trademarks, music or artwork. Run a similarity check before delivery.</li></ul>
<h2>A five-minute record</h2>
<p>For every generated asset, log model and version, prompt, input references, output file, rights source and where it is used. Without all six, it does not go into a paid delivery.</h2>
<h2>When not to use it</h2>
<p>News, documentary, testimony, real-person endorsement and projects that explicitly require live action must not use generated images. Never publish an uncleared asset and fix the rights later.</p>`
  },
  'method-continuity-break': {
    zh: `<h2>先查四类穿帮</h2>
<ul><li><strong>道具：</strong>杯子位置、烟头长度、手机屏幕内容。每个镜头前后各拍一张道具位置照。</li><li><strong>服装：</strong>领口、袖口、汗渍、纽扣。连续拍摄时让演员穿同一件，不要靠后期。</li><li><strong>走位：</strong>人物从画面左边出，下一个镜头从右边进。用地标和站位胶带固定。</li><li><strong>光线：</strong>窗外从白天变晚上，影子方向变了。先拍覆盖，再拍特写。</li></ul>
<h2>一个 1 分钟检查</h2>
<p>每个机位切换前，让场记拍三张：全景、道具特写、演员手部。下一场开机前对照上一场的最后一张，再决定是否重拍。</p>
<h2>什么时候不要补拍</h2>
<p>如果穿帮在画面边缘且不影响信息，先用插入镜头或声音转移注意力；不要为一个杯子重拍整场。主角脸上的穿帮，必须重拍。</p>`,
    en: `<h2>Check four continuity classes</h2>
<ul><li><strong>Props:</strong> cup position, cigarette length, phone screen. Photograph the prop before and after every shot.</li><li><strong>Wardrobe:</strong> collar, cuffs, sweat, buttons. Keep the actor in the same garment; do not fix it in post.</li><li><strong>Blocking:</strong> a character exits left and enters right in the next shot. Mark positions and use landmarks.</li><li><strong>Light:</strong> the window turns from day to night, shadows change direction. Shoot coverage before close-ups.</li></ul>
<h2>A one-minute check</h2>
<p>Before each camera move, have the script supervisor take three frames: wide, prop detail, hands. Compare them with the last frame of the previous setup before deciding whether to reshoot.</p>
<h2>When not to reshoot</h2>
<p>If the break sits at the edge of frame and carries no story information, use an insert or sound to move attention; do not reshoot a whole scene for a cup. A break on the hero's face must be reshot.</p>`
  },
  'method-platform-reject': {
    zh: `<h2>先按四类问题排查</h2>
<ul><li><strong>内容类别：</strong>暴力、医疗、金融、未成年人、政治与新闻，各自有额外材料要求。先看平台当前规则，不看旧经验。</li><li><strong>声明与证明：</strong>功效、价格、对比、专家身份。没有证据的绝对化表述先删。</li><li><strong>音乐与素材：</strong>是否商用授权、是否只允许平台内使用。不要拿“别人也在用”当授权。</li><li><strong>人物与隐私：</strong>肖像、声音、住址、车牌、未成年人。能授权就授权，不能就遮挡或删除。</li></ul>
<h2>一个 10 分钟预检</h2>
<p>把成片静音看一遍，只找画面风险；再闭眼听一遍，只找声音和 claims。最后逐条对照平台规则，把可能被拒的点写成“问题—依据—修改”三列。</p>
<h2>什么时候不要反复重传</h2>
<p>同一版本反复上传不会改变审核结果，还可能触发风控。先拿到具体拒因，补材料或改画面，再申诉。没有证据的“我觉得没问题”不算修改。</p>`,
    en: `<h2>Check four categories first</h2>
<ul><li><strong>Content class:</strong> violence, medical, financial, minors, politics and news each carry extra documentation. Read the platform's current rule, not last year's experience.</li><li><strong>Claims and proof:</strong> efficacy, price, comparison, expert identity. Delete absolute claims without evidence.</li><li><strong>Music and assets:</strong> commercial license or platform-only use? “Others use it” is not a license.</li><li><strong>People and privacy:</strong> likeness, voice, address, plate, minors. Get consent, or obscure and remove.</li></ul>
<h2>A ten-minute pre-check</h2>
<p>Watch the cut muted for visual risk; then listen with eyes closed for sound and claims. Compare each item with the current rule and write three columns: issue, evidence, fix.</p>
<h2>When not to re-upload repeatedly</h2>
<p>Uploading the same version again does not change the result and may trigger risk controls. Get the specific reason, add evidence or change the frame, then appeal. “I think it's fine” is not a fix.</p>`
  },
  'method-thumbnail-weak': {
    zh: `<h2>先判断是没人看见，还是看见不想点</h2>
<ul><li><strong>曝光不足：</strong>平台没有把封面推给目标观众。先看发布时间、标题关键词和首帧，不要只改图。</li><li><strong>信息不清：</strong>缩到 120px 宽还看不出主体。裁掉背景，只留一张脸、一个物件或一个动作。</li><li><strong>标题与画面对不上：</strong>封面承诺的内容正文没有。点击进来会立刻掉线，长期更伤。</li><li><strong>对比不足：</strong>脸和背景同色、字压在花背景上。用纯色块或暗角把主体推出来。</li></ul>
<h2>一个手机大小测试</h2>
<p>把三张候选封面并排缩到手机宽度，挡住标题，只看图：3 秒内能说出“这是关于什么”吗？再放开标题，看图和字是否说同一件事。选那张不用解释的。</p>
<h2>什么时候不要做标题党</h2>
<p>封面可以具体，但不能承诺正文没有的东西。一次骗点会换来长期不信任；平台也会用完播和负反馈惩罚。</p>`,
    en: `<h2>Is it unseen or unclicked?</h2>
<ul><li><strong>Distribution:</strong> the platform did not show it to the right audience. Check publish time, title terms and first frame before redesigning the image.</li><li><strong>Legibility:</strong> at 120px wide the subject disappears. Crop out the background; keep one face, one object or one action.</li><li><strong>Mismatch:</strong> the thumbnail promises something the video does not deliver. Viewers leave immediately and the damage compounds.</li><li><strong>Contrast:</strong> face and background share a tone, or type sits on a busy pattern. Use a solid block or vignette to separate the subject.</li></ul>
<h2>A phone-size test</h2>
<p>Place three candidates side by side at phone width, cover the titles, and look only at the images: can you say what it is about in three seconds? Then reveal the title and check that image and words tell the same story. Pick the one that needs no explanation.</h2>
<h2>When not to bait</h2>
<p>A thumbnail can be specific, but must not promise what the video lacks. One bait click buys long-term distrust, and platforms punish it through retention and negative feedback.</p>`
  },
  'method-ai-consistency': {
    zh: `<h2>先锁四件事</h2>
<ul><li><strong>脸：</strong>正面、侧面、3/4 角度各一张参考，固定发型和眉形。不要每次只用一句文字描述。</li><li><strong>服装：</strong>材质、颜色、领口、纽扣写进角色表；同一场不要换相近色。</li><li><strong>光：</strong>主光方向、色温、柔硬写进镜头卡；换镜头先换光，不要换脸。</li><li><strong>镜头：</strong>焦段和景别决定脸型。同一角色在广角和长焦下会像两个人，先固定焦段。</li></ul>
<h2>三角度测试</h2>
<p>同一角色生成正面、侧面、低头三个角度，放在同一张图上比较。如果颧骨、鼻梁、发际线和服装细节不能对上，不要开始批量生成。先修参考图，再修提示词。</p>
<h2>什么时候不要硬生成</h2>
<p>角色需要长时间说话、复杂表情或与真人同框时，先用实拍定基准，再用生成补远景和插入。不要用“后期统一”掩盖角色漂移。</p>`,
    en: `<h2>Lock four things</h2>
<ul><li><strong>Face:</strong> one front, one profile and one three-quarter reference; fix hair and brow shape. Do not rely on a text description each time.</li><li><strong>Wardrobe:</strong> material, color, collar and buttons in the character sheet; do not switch to a near-match color in the same scene.</li><li><strong>Light:</strong> key direction, color temperature and softness in the shot card; change the light before changing the face.</li><li><strong>Lens:</strong> focal length and shot size change the face. The same character on a wide and a tele looks like two people; lock the lens first.</li></ul>
<h2>Three-angle test</h2>
<p>Generate front, profile and looking-down views and compare them in one image. If cheekbones, nose bridge, hairline and wardrobe do not align, do not start batch generation. Fix the references, then the prompt.</h2>
<h2>When not to force it</h2>
<p>For long dialogue, complex expressions or sharing the frame with a real actor, shoot a live reference first and use generation for wides and inserts. Do not hide drift with “we'll match it in post.”</p>`
  },
  'method-phone-only': {
    zh: `<h2>先把手机变成可控的相机</h2>
<ul><li><strong>曝光：</strong>锁定 AE/AF，不要让它跟着人脸忽明忽暗；高光优先，暗部留给后期。</li><li><strong>声音：</strong>手机内置麦离人太远。用领夹或枪麦，哪怕只加一支领夹，对白也会清楚一倍。</li><li><strong>稳定：</strong>双手肘部夹紧，或靠墙、桌面、背包；不要边走边举手，数码防抖会裁切和抖动。</li><li><strong>镜头：</strong>用主摄，不用数码变焦；需要长焦就走过去，不要放大。</li></ul>
<h2>一个 30 秒测试</h2>
<p>在最终拍摄位置录 30 秒：先锁曝光拍一段，再让一个人正常说话，最后回放听声音。如果高光爆、对白空或画面抖，先解决其中一个，不要同时加滤镜和转场。</p>
<h2>什么时候不要用手机</h2>
<p>需要大幅浅景深、低光干净画面、长焦压缩或专业收音时，手机不是省钱的替代，是另一种媒介。不要用手机硬模仿电影机。</p>`,
    en: `<h2>Turn the phone into a controllable camera</h2>
<ul><li><strong>Exposure:</strong> lock AE/AF so the image does not pulse with the face; protect highlights and leave shadow detail for post.</li><li><strong>Sound:</strong> the built-in mic is too far away. Use a lav or shotgun; even one lav doubles intelligibility.</li><li><strong>Stability:</strong> tuck your elbows, or brace against a wall, table or bag. Do not walk with the phone held out; electronic stabilization crops and jitters.</li><li><strong>Lens:</strong> use the main camera, not digital zoom. Need a longer lens? Walk closer, do not magnify.</li></ul>
<h2>A thirty-second test</h2>
<p>Record 30 seconds at the final position: lock exposure for one take, have someone speak normally, then play back for sound. If highlights clip, dialogue is hollow or the frame shakes, fix one cause before adding filters and transitions.</p>
<h2>When not to use a phone</h2>
<p>For very shallow depth of field, clean low light, telephoto compression or professional sound, a phone is not a cheaper cinema camera; it is a different medium. Do not force it to imitate one.</p>`
  },
  'method-story-slow': {
    zh: `<h2>先看前 8 秒发生了什么</h2>
<ul><li><strong>只有环境：</strong>开场是空镜、字幕和音乐，人物还没想要什么。把第一个有目标的人提前。</li><li><strong>只有解释：</strong>旁白在讲背景，画面没有动作。删掉解释，用一个可见的动作替代。</li><li><strong>冲突太晚：</strong>人物过了 30 秒才遇到障碍。把障碍提到第一个镜头里。</li></ul>
<h2>一个 8 秒测试</h2>
<p>把前 8 秒单独放给没看过的人，关掉声音，问他：你看到谁、想要什么、被什么挡住？如果答不出，开头就还没开始。不要用音乐和字幕补答案。</p>
<h2>什么时候不要加快</h2>
<p>如果人物还没建立，直接加速只会让人更不明白。先补一个动作或一句有信息的台词，再谈节奏。</p>`,
    en: `<h2>What happens in the first eight seconds?</h2>
<ul><li><strong>Only atmosphere:</strong> the opening is a wide shot, titles and music, and nobody wants anything yet. Move the first person with a goal earlier.</li><li><strong>Only explanation:</strong> narration explains backstory while nothing happens. Delete it and replace it with a visible action.</li><li><strong>Late conflict:</strong> the character meets the obstacle after 30 seconds. Put the obstacle in the first shot.</li></ul>
<h2>An eight-second test</h2>
<p>Show only the first eight seconds to someone who has not seen it, muted, then ask: who did you see, what did they want, what blocked them? If they cannot answer, the opening has not started. Do not use music or titles to supply the answer.</p>
<h2>When not to speed up</h2>
<p>If the character is not established, speeding up only makes it less clear. Add an action or one informative line before discussing pace.</p>`
  },
  'method-subtitle-bad': {
    zh: `<h2>先查四项</h2>
<ul><li><strong>行长：</strong>每行超过 18 个汉字，或一行塞两种语言。拆句，不要缩字号。</li><li><strong>对比：</strong>白字压在天空、白墙或人脸高光上。加半透明底、描边或阴影，先保证可读。</li><li><strong>停留：</strong>一句话只停 0.8 秒。按每秒 4–6 个汉字控制，长句拆成两条。</li><li><strong>安全区：</strong>字幕贴底边，被平台 UI 遮住。上移到画面高度 10% 以内。</li></ul>
<h2>一个手机测试</h2>
<p>把成片缩到手机宽度，亮度调到 50%，静音看 30 秒。你能在不停顿的情况下读完吗？再把背景换成最亮的镜头，确认字幕仍然清楚。</p>
<h2>什么时候不要用自动字幕</h2>
<p>人名、术语、方言、数字和否定句，自动字幕最容易错。没有人工校对，不要直接交付。错一个字，观众就会怀疑整条片。</p>`,
    en: `<h2>Check four things</h2>
<ul><li><strong>Line length:</strong> over 18 Chinese characters, or two languages on one line. Split the sentence; do not shrink the type.</li><li><strong>Contrast:</strong> white type over sky, a white wall or a bright face. Add a translucent plate, outline or shadow; readability first.</li><li><strong>Duration:</strong> one sentence held for 0.8 seconds. Target 4–6 Chinese characters per second and split long lines.</li><li><strong>Safe area:</strong> captions on the bottom edge get covered by platform UI. Move them inside the lower 10% of frame height.</li></ul>
<h2>A phone test</h2>
<p>Shrink the cut to phone width, set brightness to 50%, and watch muted for 30 seconds. Can you read without pausing? Then switch to the brightest shot and confirm the captions still hold.</p>
<h2>When not to ship auto-captions</h2>
<p>Names, technical terms, dialect, numbers and negation are where auto-captions fail. Without human review, do not deliver. One wrong character makes viewers doubt the whole film.</p>`
  },
  'method-scene-boring': {
    zh: `<h2>先查这场戏有没有变化</h2>
<ul><li><strong>目标：</strong>人物在这场戏里想要什么？如果说不出来，这场戏只是过场。</li><li><strong>障碍：</strong>谁或什么在阻止他？障碍必须在场，不能只在台词里。</li><li><strong>转折：</strong>这场戏结束时，人物知道的东西、位置或关系有没有变？没变就删或合并。</li></ul>
<h2>一个 beat 表测试</h2>
<p>用三句话写：开始他想要什么、什么阻挡、结束他做了什么。写不出第三句，这场戏没有事件。不要用更多机位和音乐去救一个没有变化的场景。</p>
<h2>什么时候不要加戏</h2>
<p>如果这场戏不改变人物或信息，删掉它比加一场动作更有效。短片里，每场戏都要承担一个转折。</p>`,
    en: `<h2>Does the scene change anything?</h2>
<ul><li><strong>Goal:</strong> what does the character want in this scene? If you cannot say it, the scene is a transition.</li><li><strong>Obstacle:</strong> who or what blocks them? The obstacle must be present, not only in dialogue.</li><li><strong>Turn:</strong> by the end, what the character knows, where they are or who they are to someone must change. If nothing changes, cut or merge it.</li></ul>
<h2>A beat-sheet test</h2>
<p>Write three sentences: what they want at the start, what blocks them, what they do by the end. If the third sentence does not exist, the scene has no event. Do not rescue it with more angles and music.</p>
<h2>When not to add a scene</h2>
<p>If the scene changes neither character nor information, deleting it is stronger than adding action. In a short film, every scene carries one turn.</p>`
  },
  'method-flat-image': {
    zh: `<h2>先看画面有没有三层</h2>
<ul><li><strong>前景：</strong>画面最前面有没有东西？没有前景，人物像贴在一张背景纸上。</li><li><strong>角度：</strong>机位是否和人物眼睛同高？换低一点、高一点或侧一点，空间会出来。</li><li><strong>光：</strong>主体和背景是否同样亮？让背景暗一档或亮一档，人物就会分离。</li><li><strong>镜头：</strong>广角是否太广、长焦是否太压缩？先换机位，再换镜头。</li></ul>
<h2>一个三平面测试</h2>
<p>在监视器上画三条横线：前景、人物、背景。如果三条线落在同一个平面上，移动机位或加一个前景物件。不要先加滤镜；滤镜不会制造空间。</p>
<h2>什么时候不要追求层次</h2>
<p>纪实、监控和某些平面构图本来就需要平。先确认你要的是空间感还是图形感，不要把所有画面都拍成同一种“电影感”。</p>`,
    en: `<h2>Does the frame have three planes?</h2>
<ul><li><strong>Foreground:</strong> is there anything in front? Without it, the subject looks pasted onto a backdrop.</li><li><strong>Angle:</strong> is the camera at eye height? Move lower, higher or to the side and space appears.</li><li><strong>Light:</strong> are subject and background equally bright? Take one down a stop and the subject separates.</li><li><strong>Lens:</strong> too wide or too compressed? Change position before changing the lens.</li></ul>
<h2>A three-plane test</h2>
<p>Draw three horizontal lines on the monitor: foreground, subject, background. If all three land on one plane, move the camera or add a foreground object. Do not add a filter; a filter does not create space.</h2>
<h2>When not to chase depth</h2>
<p>Documentary, surveillance and some graphic compositions are meant to be flat. Decide whether you want space or graphic tension; do not turn every frame into the same “cinematic” look.</p>`
  },
  'method-no-light': {
    zh: `<h2>先把现有光用尽</h2>
<ul><li><strong>窗：</strong>让人物侧对窗户，不要正对；窗是免费的大柔光箱。</li><li><strong>反光：</strong>白墙、白纸、泡沫板都能补暗部；先试反射，再买灯。</li><li><strong>黑旗：</strong>用黑衣服或黑卡纸压暗背景，主体就会出来。</li><li><strong>实用灯：</strong>台灯、屏幕、手电筒可以入画，但先确认色温和频闪。</li></ul>
<h2>一个 3 位置测试</h2>
<p>同一个人分别站在窗边、离窗 1 米、背对窗，各拍一张。选暗部还有细节、脸上有方向的那一张。不要用机头灯直打；它会把所有空间压平。</p>
<h2>什么时候不要硬拍</h2>
<p>如果现场只有混合色温的实用灯，且不能改，先拍剪影或环境，不要硬要正脸对白。没有光不是罪，假装有光才会毁片。</p>`,
    en: `<h2>Use the light you already have</h2>
<ul><li><strong>Window:</strong> turn the subject sideways to the window, not toward it; it is a free large softbox.</li><li><strong>Bounce:</strong> a white wall, paper or foam board fills the shadow; try reflection before buying a light.</li><li><strong>Black flag:</strong> a dark shirt or card darkens the background and separates the subject.</li><li><strong>Practicals:</strong> a lamp, screen or torch can be in frame, but check color temperature and flicker first.</li></ul>
<h2>A three-position test</h2>
<p>Place the same person by the window, one meter away, and with their back to it; shoot each. Choose the frame with shadow detail and a clear direction on the face. Do not use an on-camera light; it flattens every space.</p>
<h2>When not to force it</h2>
<p>If the room has only mixed practicals and cannot be changed, shoot silhouette or atmosphere instead of forcing a lit face. Having no light is not a crime; pretending you do ruins the film.</p>`
  },
  'method-no-script': {
    zh: `<h2>先写三行，不写十页</h2>
<ul><li><strong>谁：</strong>一个具体的人，带职业、年龄或一个正在做的动作。</li><li><strong>想要什么：</strong>一个今天能完成、能被看见的目标。</li><li><strong>被什么挡住：</strong>一个具体的人、规则、时间或自己的恐惧。</li></ul>
<h2>一个一页纸测试</h2>
<p>把这三行写成开头、冲突、结尾三个 beat，每个 beat 只写一个动作。读给一个没看过的人，问他能不能复述。不能复述，不是演员问题，是结构还没写清。</p>
<h2>什么时候不要即兴</h2>
<p>没有终点就不要即兴。即兴适合在清晰的目标和障碍之间找细节，不适合替代结构。先写一页，再让演员在页内自由。</p>`,
    en: `<h2>Write three lines, not ten pages</h2>
<ul><li><strong>Who:</strong> a specific person with a job, an age or an action already in progress.</li><li><strong>Want:</strong> a goal that can be completed today and seen on screen.</li><li><strong>Blocked by:</strong> a specific person, rule, deadline or their own fear.</li></ul>
<h2>A one-page test</h2>
<p>Turn the three lines into three beats: opening, conflict, ending; one action per beat. Read it to someone who has not seen it and ask them to retell it. If they cannot, the structure is unclear, not the actor.</p>
<h2>When not to improvise</h2>
<p>Do not improvise without an ending. Improvisation works inside a clear goal and obstacle; it cannot replace structure. Write one page first, then let actors move inside it.</p>`
  },
  'method-one-location': {
    zh: `<h2>先把这个房间拆成六个镜头</h2>
<ul><li><strong>走位：</strong>人物从门到桌、从桌到窗，位置变化就是场面变化。</li><li><strong>画外：</strong>声音、电话、邻居、走廊，能把房间扩大一倍。</li><li><strong>插入：</strong>手、杯子、屏幕、门缝，用细节替代新场景。</li><li><strong>光：</strong>同一房间换一盏灯、拉一次窗帘，就是另一个时间。</li></ul>
<h2>一个六镜头测试</h2>
<p>在同一个房间里拍六个不同景别和角度，要求不重复机位：全景、中景、特写、低角、高角、画外声音。剪成 30 秒，看是否能讲一个变化。不要靠换场景掩盖调度单调。</p>
<h2>什么时候不要加场景</h2>
<p>如果人物关系还没有在一个房间里建立，换场景只会增加成本。先把房间里的权力关系拍出来。</p>`,
    en: `<h2>Break one room into six shots</h2>
<ul><li><strong>Blocking:</strong> from door to table, table to window; a change in position is a change in scene.</li><li><strong>Off-screen:</strong> sound, a phone, a neighbor, the corridor can double the room.</li><li><strong>Inserts:</strong> hands, a cup, a screen, the gap under a door replace a new location.</li><li><strong>Light:</strong> one lamp or one curtain changes the time of day in the same room.</li></ul>
<h2>A six-shot test</h2>
<p>Shoot six different sizes and angles in one room without repeating a setup: wide, medium, close, low, high and an off-screen sound. Cut 30 seconds and see whether it tells a change. Do not hide flat blocking behind a new location.</p>
<h2>When not to add a location</h2>
<p>If the relationship is not established inside one room, a new location only adds cost. Stage the power relationship in the room first.</p>`
  },
  'method-no-actor': {
    zh: `<h2>先判断你需要“像”还是“会演”</h2>
<ul><li><strong>像：</strong>职业、年龄、身体状态。找真实职业的人，往往比找演员更像。</li><li><strong>会演：</strong>需要连续情绪和台词。没有训练的人，先用动作和短句，不要给长段独白。</li><li><strong>可控：</strong>时间、授权、现场配合。熟人比陌生人好沟通，但不要因为熟就省掉授权。</li></ul>
<h2>一个 2 分钟试镜</h2>
<p>让对方做三个动作：进门、找东西、听到一个坏消息。不要给形容词，只给动词。看反应是否自然、是否能重复。不能重复的人，进现场会耗掉所有时间。</p>
<h2>什么时候不要用非职业演员</h2>
<p>需要复杂哭戏、长台词、精确走位或亲密戏时，非职业演员的风险很高。先改剧本，或换有训练的人，不要在现场硬逼。</p>`,
    en: `<h2>Do you need “real” or “trained”?</h2>
<ul><li><strong>Real:</strong> job, age, physicality. Casting an actual worker often reads truer than casting an actor.</li><li><strong>Trained:</strong> sustained emotion and dialogue. Untrained performers do better with actions and short lines; do not hand them a long monologue.</li><li><strong>Controllable:</strong> time, consent, availability. A friend is easier to talk to, but familiarity does not replace a release form.</li></ul>
<h2>A two-minute audition</h2>
<p>Ask for three actions: enter, look for something, hear bad news. Give verbs, not adjectives. Watch whether the response is natural and repeatable. Someone who cannot repeat it will consume the whole day on set.</p>
<h2>When not to cast a non-actor</h2>
<p>Complex crying, long speeches, precise blocking or intimacy carry high risk with an untrained performer. Rewrite the scene or cast someone trained; do not force it on set.</p>`
  }
};
