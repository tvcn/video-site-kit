// 2026-11-24: deepen the 30 thinnest bodies with one concrete on-set patch
// each. These are additions, not rewrites; existing sections stay in place.
export const EXPANSION_SHORT_20261124 = {
  'method-first-idea': {
    zh: `<h2>把“模糊想法”变成 30 秒能说清的测试</h2>
<p>先不要写剧本。用三句话填一张纸：谁、想要什么、什么挡着他。三句里只要有一句是抽象名词（“成长”“温度”“连接”），就换成可拍的动作。</p>
<ol><li>找三张参考图：一张人物状态、一张空间、一张光线。不要找同类型的成片，找“感觉的来源”。</li><li>用手机录一段 30 秒口述，不剪辑；给三个没参与的人听，问他们记住了什么。三个人记住的不同，说明想法还没收拢。</li><li>把口述里被追问最多的那句写成第一场；写不出动作，就继续问“他在做什么”。</li></ol>
<p>验收：30 秒内能让听者复述“谁想要什么、被什么挡住”，才算可以进入分镜；否则先别谈器材和风格。</p>`,
    en: `<h2>Turn a vague idea into a 30-second test</h2>
<p>Do not write a script yet. Fill one page with three lines: who, what they want, what blocks them. If any line is an abstract noun (“growth,” “warmth,” “connection”), replace it with a filmable action.</p>
<ol><li>Find three references: one for the person's state, one for the space, one for the light. Do not collect films in the same genre; collect the sources of the feeling.</li><li>Record a 30-second spoken pitch on your phone, unedited. Play it for three uninvolved people and ask what they remember. If they remember different things, the idea is not focused.</li><li>Turn the most-questioned sentence into the first scene. If you cannot write an action, keep asking “what is he doing?”</li></ol>
<p>Acceptance: within 30 seconds a listener can repeat “who wants what, and what blocks them.” Only then move to a storyboard; do not discuss gear or style first.</p>`
  },
  'storage': {
    zh: `<h2>当天备份的可执行版本</h2>
<p>“记得备份”没有用，要写成三步动作：拷贝、校验、异地。拍摄当天收工前完成，不等到剪辑前。</p>
<ol><li>卡→工作盘→第二块盘，三份；工作盘只用于剪辑，第二块盘断电存放。</li><li>拷贝后用校验工具比对哈希或文件数量与总大小；不要只看进度条。</li><li>命名统一：<code>YYYYMMDD_客户_项目_机位_卡号</code>；卡格式化前再核对一次目录。</li></ol>
<p>团队共享时，NAS 不是唯一备份。NAS 做协作，第二块盘做离线，重要项目再加一份异地。验收：随机抽一个文件，从备份盘恢复并打开，确认不是 0 字节。</p>`,
    en: `<h2>An executable version of “back up today”</h2>
<p>“Remember to back up” is useless. Write three actions: copy, verify, offsite. Finish before wrap, not before the edit.</p>
<ol><li>Card → work drive → second drive: three copies. The work drive is for editing; the second drive is powered down and stored.</li><li>After copying, compare hashes or file count and total size with a verification tool. Do not trust a progress bar.</li><li>Use one name: <code>YYYYMMDD_client_project_camera_card</code>. Check the folder once more before formatting the card.</li></ol>
<p>For teams, a NAS is not the only backup. NAS for collaboration, a second drive offline, and one offsite copy for important jobs. Acceptance: pick a random file, restore it from the backup drive and open it; confirm it is not zero bytes.</p>`
  },
  'anticipation': {
    zh: `<h2>预备动作只提前 2–4 帧</h2>
<p>预备动作太久，观众会提前猜到；太短，动作像突然跳出来。二维和三维都先用 24fps 数帧：主体动作前 2–4 帧做反向小动作，再进入主动作。</p>
<ol><li>抬手前先压肩 3 帧；起跳前先屈膝 4 帧；转头前先移眼 2 帧。</li><li>预备动作的幅度小于主动作，方向相反；不要用同一个幅度，会变成两个主动作。</li><li>如果镜头剪得很快，预备动作可以省略，用声音或视线代替。</li></ol>
<p>验收：遮住主动作只看预备，观众应该知道“要发生什么”，但不知道“具体怎么发生”。</p>`,
    en: `<h2>Anticipation leads by only 2–4 frames</h2>
<p>Too much anticipation and the viewer guesses; too little and the action pops. At 24fps, give the main action a small opposite move 2–4 frames before it starts.</p>
<ol><li>Press the shoulder three frames before raising the arm; bend the knees four frames before a jump; move the eyes two frames before a head turn.</li><li>The anticipation is smaller than the main action and moves the other way. Equal size turns it into two main actions.</li><li>In a fast cut, skip the anticipation and use sound or a glance instead.</li></ol>
<p>Acceptance: cover the main action and watch only the lead-in. The viewer should know something is about to happen, but not exactly how.</p>`
  },
  'lighting-window': {
    zh: `<h2>窗光补光：反光板放哪，放多远</h2>
<p>窗光做主光时，反光板不是越近越好。先看窗的方向，再把板放在主体侧前方 45°，距离 0.5–1 米；太近会把暗部填平，太远没有效果。</p>
<ol><li>白色板最通用；银色板更硬，适合需要眼神光但不想加灯的场景。</li><li>板的角度低于视线，避免把光打到鼻孔和下巴；需要柔一点就用布面或柔光布。</li><li>先拍一张只靠窗光的画面，再加板；对比暗部是否出现细节但不发灰。</li></ol>
<p>验收：暗部有细节、亮部不过曝、皮肤不发灰。如果板一拿开画面就“死”，说明主光其实不够，先调整窗边位置。</p>`,
    en: `<h2>Window fill: where the bounce goes, and how far</h2>
<p>With window light as key, closer is not better. Put the bounce 45° to the subject's side, 0.5–1 meter away. Too close flattens the shadow; too far does nothing.</p>
<ol><li>White is the general choice; silver is harder and useful for an eye light without adding a lamp.</li><li>Keep the board below eye line so it does not light nostrils and chin. For softer fill, use a fabric surface or diffuser.</li><li>Shoot one frame with window light only, then add the board. Compare whether shadow detail appears without milkiness.</li></ol>
<p>Acceptance: shadow detail, highlights not clipped, skin not gray. If the image dies when the board is removed, the key is too weak; move closer to the window first.</p>`
  },
  'handheld-brace': {
    zh: `<h2>手持三个接触点</h2>
<p>手持不稳，通常不是臂力不够，是身体没有形成三角支撑。把双肘夹在肋骨两侧，相机贴住胸口，第三点用肩带或颈部拉紧。</p>
<ol><li>双脚与肩同宽，膝盖微屈；移动时先迈脚，再让身体跟，不要用腰甩。</li><li>呼吸在镜头开始时屏住 3–5 秒，不要全程憋气；长镜头在动作间隙换气。</li><li>广角比长焦更容易稳；没有防抖时，用 35mm 以下、快门 1/50 以上。</li></ol>
<p>验收：拍 10 秒固定主体，回放看边缘是否呼吸；如果画面在跳，先检查第三点，而不是换稳定器。</p>`,
    en: `<h2>Three contact points for handheld</h2>
<p>Handheld instability is usually not arm strength; it is the absence of a triangle. Tuck both elbows against the ribs, rest the camera on the chest, and tension the strap as the third point.</p>
<ol><li>Feet shoulder-width, knees soft. When moving, step first and let the body follow; do not swing from the waist.</li><li>Hold your breath for the first 3–5 seconds, not the whole take; breathe between actions on a long shot.</li><li>Wide is steadier than long. Without stabilization, stay under 35mm and at 1/50 or faster.</li></ol>
<p>Acceptance: shoot a 10-second locked subject and check the edges for breathing. If the frame jumps, check the third contact point before buying a gimbal.</p>`
  },
  'blockout': {
    zh: `<h2>Blockout 只看三件事</h2>
<p>Blockout 不是低模预览，是决定比例、机位和镜头顺序。用灰模或胶囊人，先不做材质和灯光；这三件事定错，后面全部返工。</p>
<ol><li>比例：人物与场景的高度关系用已知尺寸对照，不要凭感觉拉。</li><li>机位：先定焦段和高度，再定运动；一个镜头只解决一个空间关系。</li><li>顺序：按剪接点排镜头，不按制作方便排；先做能看懂故事的版本。</li></ol>
<p>验收：把 blockout 连起来放一遍，关掉所有材质，仍能看懂“谁在哪、要做什么”。看不懂，先改机位，不要进动画。</p>`,
    en: `<h2>Blockout watches only three things</h2>
<p>Blockout is not a low-poly preview; it decides scale, camera and shot order. Use gray boxes or mannequins with no materials or lights. Get these three wrong and everything downstream redoes.</p>
<ol><li>Scale: compare character and set height with a known measurement; do not eyeball it.</li><li>Camera: lock lens and height before motion; one shot solves one spatial relationship.</li><li>Order: cut by edit point, not by production convenience; build the version that tells the story.</li></ol>
<p>Acceptance: play the blockout with all materials off. You should still understand who is where and what they are doing. If not, fix the camera before animation.</p>`
  },
  'animatic-pipeline': {
    zh: `<h2>Animatic 先锁三样，再进动画</h2>
<p>Animatic 的作用不是“好看”，是把时长、配音和镜头顺序锁死。三样没锁，动画一开工就会反复改。</p>
<ol><li>配音：先录 scratch，按真实语速，不要用读稿节奏；台词长度决定镜头长度。</li><li>定时：按 24fps 或项目帧率排，给每个镜头标出入点/出点；不要用“大概 3 秒”。</li><li>音乐：只放 temp，标出需要留白的位置；temp 不能直接交付。</li></ol>
<p>验收：把 animatic 给剪辑以外的人看，问“哪里想快进”。想快进的地方先剪短，再进 layout。</p>`,
    en: `<h2>Lock three things in the animatic before animation</h2>
<p>The animatic is not for beauty; it locks duration, voice and shot order. If those are not locked, animation will be revised forever.</p>
<ol><li>Voice: record a scratch track at real speaking pace, not read-aloud rhythm. Line length sets shot length.</li><li>Timing: lay out at 24fps or the project rate, with in/out points per shot. “About three seconds” is not a timing.</li><li>Music: temp only, with marked pauses. Temp music cannot be delivered.</li></ol>
<p>Acceptance: show the animatic to someone outside the edit and ask where they want to fast-forward. Cut those places before layout.</p>`
  },
  'proxy-create': {
    zh: `<h2>代理规格：能剪、能回套、不丢原片</h2>
<p>代理不是“压小就行”。要在同一时间码、同一帧率、同一文件名下回套原片；否则剪辑一换回原片就错位。</p>
<ol><li>常用：1080p ProRes Proxy 或 H.264 高码率，帧率与源一致，音频保留。</li><li>文件名加 <code>_proxy</code>，不要改卷名和 reel；回套用原始媒体路径。</li><li>原片单独存放，代理单独项目；不要在代理上做最终调色。</li></ol>
<p>验收：随机抽一个剪切点，回套原片后帧位不偏移；音频同步不掉。偏移就检查帧率和时间码。</p>`,
    en: `<h2>Proxy specs: editable, relinkable, never the master</h2>
<p>A proxy is not “just a small file.” It must relink at the same timecode, frame rate and filename, or the cut shifts when you return to the original.</p>
<ol><li>Common: 1080p ProRes Proxy or high-bitrate H.264, same frame rate as source, audio kept.</li><li>Add <code>_proxy</code> to the filename; do not change reel names. Relink against the original media path.</li><li>Keep originals separate from the proxy project. Never grade the proxy as final.</li></ol>
<p>Acceptance: pick a random cut point and relink to the original; the frame should not shift and audio should stay in sync. If it shifts, check frame rate and timecode.</p>`
  },
  'nd-gel': {
    zh: `<h2>色纸与 ND 不要叠超过两片</h2>
<p>CTO/CTB 校色温，ND 降亮度；两片叠加会偏色、降清晰度，还可能产生红外污染。先决定需不需要改色温，再决定 ND。</p>
<ol><li>日光偏蓝：加 1/4 CTO；钨丝灯偏黄：加 1/4 CTB。一次只加 1/4，逐步试。</li><li>ND 优先放在镜头前或窗上，不要和色纸贴在一起；需要大档位时用一片高 ND，不叠三片低 ND。</li><li>LED 灯先调色温和亮度，色纸只做微调；不要用色纸救不准的灯。</li></ol>
<p>验收：白平衡后看白纸和肤色，不要只看灯；出现偏绿或暗角，先减片数。</p>`,
    en: `<h2>Do not stack more than two gels</h2>
<p>CTO/CTB correct color temperature; ND lowers brightness. Stacking both shifts color, reduces sharpness and can add IR pollution. Decide whether you need a color shift before adding ND.</p>
<ol><li>Daylight too blue: 1/4 CTO. Tungsten too warm: 1/4 CTB. Add a quarter at a time.</li><li>Put ND on the lens or window, not against the color gel. For deep cuts, use one strong ND, not three weak ones.</li><li>Set LED color and brightness first; gels are for trim, not for fixing a bad lamp.</li></ol>
<p>Acceptance: white-balance and check white paper and skin, not the lamp. Green cast or vignette means remove a layer.</p>`
  },
  'gimbal-balance': {
    zh: `<h2>调平顺序：先锁轴，再开机</h2>
<p>稳定器调平不是“开机自动校准”。先机械调平，再通电；顺序错了，电机会一直顶，画面会抖。</p>
<ol><li>锁住俯仰、横滚、航向三个轴，先调俯仰前后，再调横滚左右，最后调航向。</li><li>每个轴调好后手动倾斜 45°，看相机是否停在原位；不停就继续移重心。</li><li>开机后再做自动校准；换镜头、换电池后重新调平。</li></ol>
<p>验收：关机状态下，任意角度松手，相机都应基本停住；如果一边倒，不要靠电机硬撑。</p>`,
    en: `<h2>Balance order: lock axes, then power on</h2>
<p>Gimbal balance is not “turn it on and auto-calibrate.” Balance mechanically first, then power. Wrong order makes the motors fight and the image shake.</p>
<ol><li>Lock tilt, roll and pan. Adjust tilt front/back first, then roll left/right, then pan.</li><li>Tilt each axis 45° by hand; the camera should stay. If it falls, move the center of gravity.</li><li>Power on and auto-calibrate. Rebalance after a lens or battery change.</li></ol>
<p>Acceptance: powered off, the camera should hold at any angle you release it. If it falls one way, do not let the motors hold it.</p>`
  },
  'timecode': {
    zh: `<h2>多机同步：开机前 jam 一次，收工前再对一次</h2>
<p>时间码不是“设一次就完”。多机拍摄要在开机前 jam sync，收工前再对一次；中间换电池、休眠都可能漂移。</p>
<ol><li>指定一台主机为 master，其他机 jam；记录 jam 时间。</li><li>每台机拍一个带时间码的 clap 或手拍，作为备份对齐点。</li><li>收工前对比首尾时间码；漂移超过 1 帧，后期按 clap 对齐，不按时间码硬套。</li></ol>
<p>验收：把三机素材放同一时间线，随机抽一个动作，三机帧位差不超过 1 帧；超过就查漂移。</p>`,
    en: `<h2>Multi-camera sync: jam before the shoot, compare after wrap</h2>
<p>Timecode is not “set once.” Jam sync before the first take and compare before wrap; battery changes and sleep can drift.</p>
<ol><li>Choose one master camera and jam the others; log the jam time.</li><li>Each camera films a clap or hand clap with timecode as a backup sync point.</li><li>Before wrap, compare head and tail timecode. If drift exceeds one frame, align by clap in post, not by timecode.</li></ol>
<p>Acceptance: put all cameras on one timeline and pick a random action; frame offset should be one frame or less. More means drift.</p>`
  },
  '3d-pipeline': {
    zh: `<h2>五段管线，每段都有交接物</h2>
<p>3D 管线不是“建模完就动画”。每段要有可检查的交接物，否则问题会滚到渲染才爆。</p>
<ol><li>Blockout：灰模 + 机位 + 镜头时长；确认故事和比例。</li><li>Layout：角色站位、摄影机路径、资产命名表。</li><li>Animation：按镜头交付，带缓存和版本号；不要交“最终版”这种无法回滚的名字。</li><li>Lighting/Render：灯光 rig、渲染层、采样与降噪记录。</li></ol>
<p>验收：任取一个镜头，能说清它现在在哪一段、上一个交接物是什么、谁签过字。说不清，管线就是断的。</p>`,
    en: `<h2>Five stages, each with a handoff</h2>
<p>A 3D pipeline is not “model, then animate.” Each stage needs a checkable handoff or problems explode at render.</p>
<ol><li>Blockout: gray model, camera, shot length; confirm story and scale.</li><li>Layout: blocking, camera path, asset name list.</li><li>Animation: deliver per shot with cache and version number. Never name a file “final” with no rollback.</li><li>Lighting/render: light rig, render passes, sample and denoise record.</li></ol>
<p>Acceptance: pick any shot and state which stage it is in, what the last handoff was and who signed it. If you cannot, the pipeline is broken.</p>`
  },
  'boom-swing': {
    zh: `<h2>吊杆跟着台词走，不跟着人走</h2>
<p>吊杆的目标是让话筒保持在嘴的上方，不是追着演员跑。先排走位，标出每句台词的头部位置，再决定杆的移动路线。</p>
<ol><li>杆头始终在画框外上方，离嘴 30–60cm；太远收不到，太近会入画。</li><li>移动用“跟台词不跟身体”：演员走动时，杆在两句之间换位，不在说话中间甩。</li><li>操作员戴耳机，监听爆音和风声；风大加防风毛套，不要靠后期降噪硬救。</li></ol>
<p>验收：回放时听对白是否忽大忽小、是否有杆影；有，先改走位或杆位，不要先加压缩。</p>`,
    en: `<h2>The boom follows lines, not bodies</h2>
<p>The boom keeps the mic above the mouth; it does not chase the actor. Block the scene, mark the head position for each line, then plan the pole move.</p>
<ol><li>Keep the tip above frame and 30–60cm from the mouth. Too far is thin; too close enters frame.</li><li>Move between lines, not during them. When the actor walks, reposition in the pause.</li><li>Wear headphones and listen for clipping and wind. Use a windshield; do not rely on post denoise.</li></ol>
<p>Acceptance: playback for level jumps and pole shadows. If they appear, fix blocking or pole position before compression.</p>`
  },
  'camera-prompt': {
    zh: `<h2>镜头提示只写四项</h2>
<p>“电影感”“高级感”无法执行。镜头提示只写：景别、角度、焦段、运动。四项写全，生成或拍摄才有可复现的起点。</p>
<ol><li>景别：特写/中景/全景；不要写“中近景”这种模糊词。</li><li>角度：平视/俯拍/仰拍；写清摄影机高度。</li><li>焦段：24/35/50/85mm；写焦段比写“虚化”有用。</li><li>运动：固定/推/拉/横移/跟；写速度和起止点。</li></ol>
<p>验收：把提示给另一个摄影，他能复现构图；复现不了，说明还有一项没写。</p>`,
    en: `<h2>A camera prompt has four fields</h2>
<p>“Cinematic” and “premium” cannot be executed. Write shot size, angle, lens and motion. With all four, a shoot or generation has a repeatable starting point.</p>
<ol><li>Size: close-up, medium, wide. Avoid “medium-close.”</li><li>Angle: level, high, low; state camera height.</li><li>Lens: 24/35/50/85mm. A lens is more useful than “blur.”</li><li>Motion: static, push, pull, track, follow; state speed and start/end.</li></ol>
<p>Acceptance: give the prompt to another shooter; if they cannot reproduce the frame, one field is missing.</p>`
  },
  'audio-description': {
    zh: `<h2>口述影像：先说“谁在哪”，再说“发生了什么”</h2>
<p>口述影像不是逐镜头解说，而是在对白空隙里补足看不到的信息。顺序是：谁、在哪、做什么；不要先描述镜头运动。</p>
<ol><li>每段只补一个信息点，优先补人物关系、空间位置和关键动作。</li><li>避开对白和重要音效；语速比正常慢 10%，留 1 秒余量。</li><li>不评价、不剧透；不要写“他显得很悲伤”，写“他低头，手停在门把上”。</li></ol>
<p>验收：关掉画面只听口述，能复述故事；打开画面，口述不抢对白。两者都成立才算合格。</p>`,
    en: `<h2>Audio description: who and where first, then what happens</h2>
<p>Audio description is not shot-by-shot narration. It fills the gaps between dialogue with what cannot be seen. Order: who, where, doing what. Do not describe camera movement first.</p>
<ol><li>One information point per gap; prioritize relationships, spatial position and key action.</li><li>Avoid dialogue and important sound. Speak 10% slower and leave a one-second margin.</li><li>Do not judge or spoil. Not “he looks sad”; write “he lowers his head, hand stops on the door handle.”</li></ol>
<p>Acceptance: with the picture off, the story is still followable; with it on, the description does not fight the dialogue. Both must pass.</p>`
  },
  'foley': {
    zh: `<h2>Foley 三件套：脚、衣、物</h2>
<p>Foley 不是“加音效”，是把画面里的动作做出可听的重量。先做脚步，再做衣服摩擦，最后做道具接触；三者分开录，后期才能调。</p>
<ol><li>脚步按地面材质分：木、水泥、地毯；每只脚单独录，不要两只一起。</li><li>衣服摩擦只在动作明显时加，不要全程铺；音量比对白低 12–18dB。</li><li>门把手、杯子、纸张用近场话筒，录干声；不要加混响，混响留给混音。</li></ol>
<p>验收：关掉音乐，只听 Foley 和对白，能判断人物体重和空间材质；听不出，先补脚步。</p>`,
    en: `<h2>Foley in three layers: feet, cloth, props</h2>
<p>Foley is not “add sound effects”; it makes on-screen action carry audible weight. Feet first, cloth second, prop contact last. Record them separately so post can adjust.</p>
<ol><li>Feet by surface: wood, concrete, carpet. Record one foot at a time, not both.</li><li>Cloth only on visible movement, never a continuous bed; keep it 12–18dB under dialogue.</li><li>Door handles, cups and paper on a close mic, dry. Leave reverb to the mix.</li></ol>
<p>Acceptance: with music off, Foley and dialogue alone should tell you body weight and surface. If not, add feet first.</p>`
  },
  'nas': {
    zh: `<h2>NAS 是协作盘，不是唯一备份</h2>
<p>NAS 解决共享和版本，不解决火灾、误删和勒索软件。团队用 NAS 时，至少再加一块离线盘和一份异地副本。</p>
<ol><li>权限按项目分：剪辑可读写，客户只读；离职人员当天移除。</li><li>开启快照，保留 7–30 天；删除前先看快照，不要直接清空回收站。</li><li>网络至少 2.5GbE 才适合多轨剪辑；千兆只够代理。</li></ol>
<p>验收：随机抽一个上周版本，能从快照恢复；拔掉 NAS 电源，确认还有离线副本可打开。两项都过，才叫备份。</p>`,
    en: `<h2>A NAS is a collaboration drive, not the only backup</h2>
<p>A NAS solves sharing and versions, not fire, accidental deletion or ransomware. With a team NAS, add at least one offline drive and one offsite copy.</p>
<ol><li>Permissions by project: editors read/write, clients read-only; remove departing staff the same day.</li><li>Enable snapshots for 7–30 days. Check a snapshot before deleting; do not empty the recycle bin first.</li><li>Use at least 2.5GbE for multi-track editing; gigabit is enough for proxies only.</li></ol>
<p>Acceptance: restore last week's version from a snapshot; unplug the NAS and confirm an offline copy opens. Both must pass before you call it a backup.</p>`
  },
  'color-checker': {
    zh: `<h2>色卡不是开机仪式，是对色坐标</h2>
<p>色卡要放在主体位置、和主体同一光线下拍 3–5 秒；拍完灯光一变，这张卡就失效。后期用卡上的中性灰定白平衡，再用肤色参考微调。</p>
<ol><li>先拍灰卡，再拍色卡；灰卡曝光到波形 50–60%，不要过曝。</li><li>每换一个场景或色温，重拍一次；不要一个场景用整场的卡。</li><li>后期先做相机匹配，再做风格；风格 LUT 放在匹配之后。</li></ol>
<p>验收：把色卡帧和成片对比，中性灰不偏色、肤色自然；偏绿或偏品红，先查现场白平衡。</p>`,
    en: `<h2>A color chart is a coordinate, not a ceremony</h2>
<p>Place the chart where the subject stands, in the same light, for 3–5 seconds. If the light changes, the chart is invalid. In post, use the neutral patch for white balance, then trim with skin.</p>
<ol><li>Shoot gray first, then the chart. Expose gray to 50–60% on the waveform, not clipped.</li><li>Reshoot for every scene or color-temperature change; one chart cannot cover the day.</li><li>Match cameras first, then add the look. The style LUT goes after the match.</li></ol>
<p>Acceptance: compare chart frame and final; neutral gray should be neutral and skin natural. Green or magenta cast means check on-set white balance.</p>`
  },
  'exposure-check': {
    zh: `<h2>开机曝光检查：波形、斑马、假色三选二</h2>
<p>不要只看监视器亮度。至少用两种工具交叉：波形看中间调，斑马看高光，假色看肤色范围。两种一致才开机。</p>
<ol><li>波形：肤色落在 60–75%，白墙不超过 95%；不要把整个画面压到 50%。</li><li>斑马：设 95%，出现斑马就收一档或加 ND；不要用斑马当构图工具。</li><li>假色：肤色应在同一色区；出现两种颜色，说明混合光或白平衡有问题。</li></ol>
<p>验收：拍 10 秒，回放看高光是否死白、暗部是否有细节；死白就降曝光，暗部死黑就补光，不要靠后期拉。</p>`,
    en: `<h2>Exposure check at start: waveform, zebra, false color — pick two</h2>
<p>Do not judge by monitor brightness. Cross-check at least two tools: waveform for midtones, zebra for highlights, false color for skin. Only roll when they agree.</p>
<ol><li>Waveform: skin at 60–75%, white wall under 95%. Do not crush the whole frame to 50%.</li><li>Zebra at 95%: if it appears, stop down a stop or add ND. Do not use zebra as a composition tool.</li><li>False color: skin should sit in one color zone. Two colors means mixed light or a white-balance problem.</li></ol>
<p>Acceptance: shoot ten seconds and check highlights for clipping and shadows for detail. Fix on set, not in post.</p>`
  },
  'slider-shot': {
    zh: `<h2>滑轨起停：头尾各留 3 帧缓动</h2>
<p>滑轨看起来“假”，多数是起停太硬。手动推拉时，头尾各留 3 帧加速/减速；电动滑轨把起停设为 10–20% 行程。</p>
<ol><li>先空推一遍，标出起点和终点；不要开机才找位置。</li><li>速度与镜头时长匹配：3 秒走完 1 米，约 0.33m/s；太快会糊，太慢会闷。</li><li>地面不平时，用两块板找平；滑轨不水平，画面会斜。</li></ol>
<p>验收：回放看起停是否“顿”；顿就加缓动，不要靠后期变形稳定。</p>`,
    en: `<h2>Slider start and stop: three frames of ease at each end</h2>
<p>A slider looks fake when it starts and stops abruptly. For a manual move, ease in and out over three frames; for a motor, set start/stop to 10–20% of travel.</p>
<ol><li>Rehearse once and mark start and end. Do not look for the position after rolling.</li><li>Match speed to shot length: one meter in three seconds is about 0.33m/s. Faster blurs, slower drags.</li><li>Level the track with two boards on uneven ground; a tilted track tilts the frame.</li></ol>
<p>Acceptance: playback for a “clunk” at the ends. If it knocks, add ease; do not fix it with warp stabilization.</p>`
  },
  'follow-focus-practice': {
    zh: `<h2>跟焦三步：标点、预演、看边缘</h2>
<p>跟焦不是“凭感觉转”。先在地面标 A/B 两个焦点位置，再让演员走一遍，最后看监视器边缘而不是中心。</p>
<ol><li>用粉笔或胶带标出演员的起点、中点和终点；每个点对应一个镜头刻度。</li><li>预演时用手跟焦，不看刻度看画面；正式拍再按刻度微调。</li><li>看边缘：眼睛和发际线最清楚；中心看起来清楚，边缘可能已经虚。</li></ol>
<p>验收：拍 3 条，回放抽帧放大到 100%；三条里至少两条眼睛实，否则降一档光圈或缩短走位。</p>`,
    en: `<h2>Follow focus in three steps: marks, rehearsal, edges</h2>
<p>Follow focus is not “turn by feel.” Mark A/B focus positions on the floor, rehearse the walk, then judge the edge of the monitor, not the center.</p>
<ol><li>Mark start, middle and end with chalk or tape; each point maps to a lens mark.</li><li>Rehearse by hand, watching the image, not the scale. On the take, trim by the marks.</li><li>Watch edges: eyes and hairline tell the truth. The center can look sharp while the edge is soft.</li></ol>
<p>Acceptance: shoot three takes and inspect a frame at 100%. Two of three should have sharp eyes; if not, stop down a stop or shorten the walk.</p>`
  },
  'light-stand': {
    zh: `<h2>灯架安全：沙袋重量至少是灯的两倍</h2>
<p>灯架倒下比灯不够亮更糟。每个灯架至少压两个沙袋，总重量不低于灯具的两倍；横臂伸出时，支点另一侧必须配重。</p>
<ol><li>沙袋挂在灯架底部三脚处，不要挂在横臂末端；挂在末端会增加倾覆力矩。</li><li>电缆沿灯架绑好，留一个防绊环；不要横穿走道。</li><li>升高灯架前先锁脚轮，升完再锁横臂；收工先降灯，再拆沙袋。</li></ol>
<p>验收：用手轻推灯架，应该能回弹而不是继续倒；不能回弹，加沙袋或降高度。</p>`,
    en: `<h2>Light stand safety: sandbags at least twice the fixture weight</h2>
<p>A falling stand is worse than a dim lamp. Put at least two sandbags on every stand, total weight at least twice the fixture. When a boom arm extends, counterweight the other side.</p>
<ol><li>Hang bags at the base tripod, not at the end of the arm; end weight increases tipping torque.</li><li>Tie cables along the stand and leave a trip loop. Do not cross a walkway.</li><li>Lock casters before raising, lock the arm after. At wrap, lower the lamp before removing bags.</li></ol>
<p>Acceptance: push the stand lightly; it should spring back, not keep falling. If it keeps falling, add weight or lower it.</p>`
  },
  'field-monitor': {
    zh: `<h2>现场监视器只看三样：亮度、波形、LUT</h2>
<p>监视器不是“越亮越好”。先把它调到标准亮度，再看波形和 LUT；否则你调的是监视器，不是画面。</p>
<ol><li>亮度：用内置灰阶或遮光罩，把监视器调到能分清 5% 和 10% 黑；不要用“看起来舒服”。</li><li>波形：打开波形看中间调，不要只信监视器；波形与监视器冲突时信波形。</li><li>LUT：现场 LUT 只看风格，不看曝光；曝光用 log 波形判断。</li></ol>
<p>验收：把同一段素材在监视器和电脑上各看一遍，亮度和肤色不应差一档；差太多，先校监视器。</p>`,
    en: `<h2>On-set monitor: brightness, waveform, LUT — three checks</h2>
<p>A monitor is not “brighter is better.” Set it to standard brightness first, then judge waveform and LUT. Otherwise you are grading the monitor, not the image.</p>
<ol><li>Brightness: use a built-in grayscale or hood; set it so 5% and 10% black are distinct. “Looks comfortable” is not a setting.</li><li>Waveform: use it for midtones. When monitor and waveform disagree, trust the waveform.</li><li>LUT: use the on-set LUT for style, not exposure. Judge exposure on the log waveform.</li></ol>
<p>Acceptance: play the same clip on the monitor and the computer; brightness and skin should not differ a stop. If they do, calibrate the monitor.</p>`
  },
  'lav-hidden': {
    zh: `<h2>领夹藏麦：离嘴 15–20cm，先防衣服</h2>
<p>领夹最怕衣服摩擦和遮挡。别在领口正中，放在锁骨下方 15–20cm，用医用胶带做一个小拱，让线不贴布料。</p>
<ol><li>麦头朝上，不要压在纽扣或拉链下；毛衣、围巾先测试摩擦声。</li><li>线沿衣服内侧走，过腰带时留一个松弯；不要拉直，拉直会把衣服摩擦传进麦。</li><li>再放一个备用录音机在口袋，作为保险；两台设备对一下时间。</li></ol>
<p>验收：让演员左右转头、抬手、坐下，回放听有没有摩擦和遮挡；有，先改位置，不要靠降噪。</p>`,
    en: `<h2>Hide a lav: 15–20cm below the mouth, protect against cloth first</h2>
<p>Lavs fail from cloth rustle and occlusion. Do not center it at the collar; place it 15–20cm below the collarbone, with a small tape arch so the cable does not touch fabric.</p>
<ol><li>Mic head up, not under a button or zipper. Test sweaters and scarves for rustle first.</li><li>Run the cable inside the clothes and leave a loose bend at the waist. A taut cable transmits cloth noise.</li><li>Put a backup recorder in a pocket and sync the two devices.</li></ol>
<p>Acceptance: have the actor turn, raise an arm and sit; listen for rustle and muffling. If present, move the mic before denoise.</p>`
  },
  'practical-bulb': {
    zh: `<h2>实用灯泡：先调光，再调色温</h2>
<p>场景里的台灯、壁灯不是“打开就行”。市电灯泡会闪、色温不准、亮度不可控；拍前换成可调光 LED，或加调光器。</p>
<ol><li>用相机取景器看灯泡是否闪烁；有横纹就换灯泡或调快门到当地电网频率的倍数。</li><li>色温用 2700K 或 3200K，和主光差不超过 1/2 档；差太多会像两个空间。</li><li>亮度用调光器降到不溢出的程度；需要光斑就加遮罩，不要靠后期压。</li></ol>
<p>验收：拍 10 秒，回放看灯泡周围是否频闪、肤色是否偏绿；频闪就换灯，不要靠后期去闪。</p>`,
    en: `<h2>Practical bulbs: dim first, then color</h2>
<p>A table lamp or wall sconce is not “turn it on.” Mains bulbs flicker, drift in color and cannot be dimmed. Replace with dimmable LED or add a dimmer before the shoot.</p>
<ol><li>Look through the viewfinder for flicker; banding means change the bulb or set shutter to a multiple of local mains frequency.</li><li>Use 2700K or 3200K, within half a stop of the key. A big mismatch reads as two rooms.</li><li>Dim it below clipping; shape the pool with a flag, not with post.</li></ol>
<p>Acceptance: shoot ten seconds and check flicker around the bulb and green skin. Flicker means change the lamp, not fix it in post.</p>`
  },
  'sync-multicam': {
    zh: `<h2>多机同步：时间码优先，clap 兜底</h2>
<p>多机位最怕“看起来对齐、实际差 2 帧”。有时间码就 jam，没有就每台机拍一次 clap；后期先对齐波形，再微调帧。</p>
<ol><li>开机前统一帧率和时间码；不同帧率不要混在同一时间线。</li><li>每台机拍手拍 3 次，每次间隔 1 秒；后期用第一次拍手对齐。</li><li>对齐后随机抽一个动作，逐机检查；差 1 帧可以接受，差 2 帧以上要查漂移。</li></ol>
<p>验收：三机同时拍一个秒表，暂停在同一帧，三机读数一致；不一致，回到时间码或帧率。</p>`,
    en: `<h2>Multi-camera sync: timecode first, clap as backup</h2>
<p>The fear is “looks aligned but is two frames off.” Jam timecode if available; if not, clap on every camera. Align waveforms first, then trim frames.</p>
<ol><li>Set one frame rate and timecode before rolling. Do not mix frame rates on one timeline.</li><li>Clap three times, one second apart, on every camera. Align on the first clap in post.</li><li>After sync, pick a random action and check each camera. One frame is acceptable; two or more means drift.</li></ol>
<p>Acceptance: all cameras film a stopwatch, pause on the same frame; readings should match. If not, return to timecode or frame rate.</p>`
  },
  'mg-rhythm': {
    zh: `<h2>动效节奏：先画音乐点，再决定谁动</h2>
<p>MG 不是“每个鼓点都动”。先把音乐拆成 4–8 个小节，标出重音和停顿，再决定哪一个元素动；所有元素一起动，观众什么都看不清。</p>
<ol><li>重音上只动一个主体；弱拍用位移或透明度，不用缩放。</li><li>每个动作至少留 4–6 帧静止，让眼睛休息；连续动超过 2 秒会疲劳。</li><li>转场用形状或位置匹配，不要用炫技插件；插件会抢信息。</li></ol>
<p>验收：关掉声音看一遍，节奏还在；打开声音，动作不抢歌词。两者都成立才算对上。</p>`,
    en: `<h2>Motion rhythm: map the music, then choose what moves</h2>
<p>MG is not “every beat moves.” Split the track into 4–8 bars, mark accents and pauses, then choose one element. If everything moves, nothing reads.</p>
<ol><li>One subject on the accent; weak beats use position or opacity, not scale.</li><li>Leave 4–6 frames of stillness after each move. More than two seconds of constant motion tires the eye.</li><li>Match transitions by shape or position, not a plugin. The plugin steals the message.</li></ol>
<p>Acceptance: watch with sound off; the rhythm should still read. Turn sound on; motion should not fight the lyrics. Both must pass.</p>`
  },
  'restore-test': {
    zh: `<h2>恢复演练：随机抽一个文件，真恢复一次</h2>
<p>备份没恢复过，就等于没有备份。每月做一次 30 分钟演练：随机抽一个项目文件，从备份恢复到干净磁盘，打开并核对哈希。</p>
<ol><li>抽签选文件，不选“最重要的”，避免只演练熟悉路径。</li><li>恢复到一台没有原始文件的机器；不要在原目录覆盖。</li><li>核对大小、哈希和打开状态；记录恢复耗时，超过 2 小时要改方案。</li></ol>
<p>验收：恢复文件能正常打开、时间线无离线媒体、哈希一致；三项缺一，备份方案不算成立。</p>`,
    en: `<h2>Restore drill: pick a random file and actually restore it</h2>
<p>A backup that has never been restored is not a backup. Run a 30-minute drill monthly: pick a random project file, restore to a clean disk, open it and compare the hash.</p>
<ol><li>Pick at random, not “the most important,” so you do not only rehearse the familiar path.</li><li>Restore to a machine without the original; never overwrite in place.</li><li>Check size, hash and that it opens. Log the time; over two hours means change the plan.</li></ol>
<p>Acceptance: the file opens, the timeline has no offline media and the hash matches. Missing one means the backup plan is not proven.</p>`
  },
  'hdr': {
    zh: `<h2>HDR 先有监看，再谈交付</h2>
<p>没有 HDR 监视器就做 HDR，等于闭眼调色。先确认监看链路：摄影机 log → HDR 监视器 → 交付 PQ/HLG；任何一段是 SDR，都只能做“猜”。</p>
<ol><li>监看亮度按交付标准设置，不要用电视默认“鲜艳”模式；环境光保持低。 </li><li>先在 PQ 里调高光，再做 SDR trim；不要用 SDR 版本反推 HDR。</li><li>交付前在普通 SDR 电视上看一遍，确认高光不刺眼、暗部不死黑。</li></ol>
<p>验收：HDR 和 SDR 两版都看，肤色一致、高光有细节；只有一版能看，说明转换不是可逆的。</p>`,
    en: `<h2>HDR needs a monitor before it needs a delivery spec</h2>
<p>Grading HDR without an HDR monitor is grading blind. Confirm the chain: camera log → HDR monitor → PQ/HLG delivery. If any link is SDR, you are guessing.</p>
<ol><li>Set monitor luminance to the delivery standard, not the TV's “vivid” mode; keep room light low.</li><li>Grade highlights in PQ first, then make the SDR trim. Do not reverse-engineer HDR from SDR.</li><li>Watch the SDR version on a normal TV before delivery; highlights should not glare and shadows should not crush.</li></ol>
<p>Acceptance: both HDR and SDR versions, skin consistent and highlights detailed. If only one works, the conversion is not reversible.</p>`
  },
  'lighting-one-light': {
    zh: `<h2>单灯人像：先有方向，再有亮度</h2>
<p>一盏灯也能有层次，关键是方向和距离。灯放在主体侧前方 45°，距离 1–1.5 米；另一侧用白墙或反光板补一点，比例控制在 2:1。</p>
<ol><li>先关掉所有环境光，只开主灯；看鼻子和下巴的阴影是否朝同一方向。</li><li>灯越高，眼窝越深；不要高过发际线，否则会出现“鬼影”。</li><li>需要柔光就加柔光箱或白布，尺寸越接近人脸越柔；不要直接裸灯打脸。</li></ol>
<p>验收：看暗部是否还有皮肤纹理；一片死黑说明补光不够，一片平说明主灯太正。两者之间才有形状。</p>`,
    en: `<h2>One-light portrait: direction first, brightness second</h2>
<p>One lamp can have depth if direction and distance are right. Place it 45° to the subject's side, 1–1.5 meters away; fill the other side with a white wall or bounce, keeping about 2:1.</p>
<ol><li>Turn off ambient light and use only the key. Check that nose and chin shadows fall the same way.</li><li>Higher light deepens the eye sockets; do not go above the hairline or you get a ghost shadow.</li><li>Soften with a box or white cloth; the closer the size to the face, the softer. Do not bare-bulb the face.</li></ol>
<p>Acceptance: shadow should still hold skin texture. Dead black means not enough fill; flat means the key is too frontal. Shape lives between them.</p>`
  }
};
