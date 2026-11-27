// Short-form depth for animation, AI and motion-design pages.
export const EDITORIAL_SHORT_C = {
  'armature': {
    zh: `<h2>骨架先保“能站稳”，再保“能表演”</h2><p>定格骨架先测三个动作：站立不晃、抬手不软、坐下不塌。关节用金属骨架加硅胶垫，脚底加大接触面；不要先做手指，先把重心和膝盖做稳。</p><p>每一帧都用手碰模型前，先想“它会不会倒”；拍一条测试，逐帧看支点有没有滑。</p><h2>边界</h2><p>骨架不是越硬越好。太硬动作会像机器人；需要弯曲的位置留一点软，承受重量的位置加硬。</p>`,
    en: `<h2>The armature must stand before it performs</h2><p>Test three moves: standing without wobble, raising an arm without sag, sitting without collapse. Use a metal armature with silicone pads and enlarge the feet; do not start with fingers before the center of gravity and knees are stable.</p><p>Before touching the puppet each frame, ask whether it will fall; shoot a test and check the pivot frame by frame.</p><h2>Limits</h2><p>Harder is not better. Too rigid looks robotic; leave softness where it bends and stiffness where it carries weight.</p>`
  },
  'lighting-3d': {
    zh: `<h2>3D 灯光先定“主光方向”，再谈材质</h2><p>三维灯光不是把场景照亮。先定一个主光方向，让影子说明空间；再用环境光和补光控制反差。材质再真，光位错了也会像贴图。</p><p>每加一盏灯，问它替代了现实里的什么光源；答不出，就删。灯光层要能单独关闭，方便对比。</p><h2>边界</h2><p>HDRI 不是万能。室内、夜景和强方向光需要手动补灯；只靠环境贴图，画面会平、影子会散。</p>`,
    en: `<h2>3D lighting starts with key direction, then materials</h2><p>3D lighting is not filling a scene with light. Set one key direction so shadows explain space; use ambient and fill to control contrast. Even a realistic material looks like a texture map when the key is wrong.</p><p>For every added light, name the real source it replaces; if none, delete it. Keep light layers separable for comparison.</p><h2>Limits</h2><p>HDRI is not universal. Interiors, night and hard directional light need manual lamps; an environment map alone goes flat and shadows scatter.</p>`
  },
  'loop-cycle': {
    zh: `<h2>循环先保“接点”，再保“变化”</h2><p>走路、跑步、呼吸的循环，第一帧和最后一帧必须能无缝接上。先做关键姿势，再补中间帧；接点处多留一帧重叠，循环才不跳。</p><p>循环不是完全重复。每循环一次加一个小变化：手抬高一点、脚步慢一点；完全一样，观众三秒就看腻。</p><h2>边界</h2><p>循环长度由动作决定，不由音乐决定。步子没走完就硬切，脚会滑；先让动作完整，再对节拍。</p>`,
    en: `<h2>Loops live or die at the seam</h2><p>Walk, run and breathing cycles must connect first and last frame invisibly. Build key poses, then in-betweens; overlap one frame at the seam so the loop does not pop.</p><p>A loop is not identical repetition. Add one small variation per cycle—a hand higher, a step slower. Perfect sameness bores in three seconds.</p><h2>Limits</h2><p>Loop length comes from the action, not the music. Cutting before a step completes makes the foot slide; finish the action, then match the beat.</p>`
  },
  'mg-transition': {
    zh: `<h2>转场要“带信息”，不是遮丑</h2><p>动态图形转场不是加一个花哨划像。它要把上一段的信息带到下一段：一个圆变成图表、一条线变成时间轴、一个词拆成新词。转场结束，观众应该多知道一件事。</p><p>先写“从什么变到什么”，再做动画；不要让软件预设决定内容。</p><h2>边界</h2><p>转场不能掩盖结构问题。两段内容没有关系，再顺的转场也只是拖延；先删一段，再谈过渡。</p>`,
    en: `<h2>A transition must carry information, not hide a cut</h2><p>Motion-graphics transitions are not decorative wipes. They carry meaning: a circle becomes a chart, a line becomes a timeline, a word splits into a new word. After the transition, the viewer knows one more thing.</p><p>Write “from what to what” before animating; do not let a preset decide the content.</p><h2>Limits</h2><p>A transition cannot hide a structural problem. If two sections are unrelated, a smooth transition only delays; cut one first.</p>`
  },
  'weight': {
    zh: `<h2>重量靠“支撑”和“延迟”</h2><p>动画里的重量不是把角色画胖。看三处：脚是否压住地面、膝盖是否弯曲、动作启动和停止是否有延迟。重物起步慢、停下也慢；轻物起步快、停得急。</p><p>做搬箱测试：同一个人搬空箱和满箱，身体前倾、呼吸、脚步频率都要不同；只改箱子颜色，观众不会信。</p><h2>边界</h2><p>重量不是慢动作。所有动作都放慢，只会像水下；重的是加速和减速的曲线。</p>`,
    en: `<h2>Weight is support and delay</h2><p>Weight in animation is not a fatter character. Watch three things: feet pressing the ground, knees bending, delay at start and stop. Heavy objects start slow and stop slow; light objects start fast and stop abruptly.</p><p>Test with a box: empty versus full changes lean, breath and step rate. Changing only box color does not convince.</p><h2>Limits</h2><p>Weight is not slow motion. Slowing everything looks underwater; weight lives in the acceleration and deceleration curves.</p>`
  },
  'materials': {
    zh: `<h2>材质先问“表面在干什么”</h2><p>不要从“金属/木头”开始，从表面行为开始：反光是否清晰、粗糙度多高、边缘是否透光、有没有凹痕。同一个“金属”可以是镜面、拉丝、锈蚀，差别在行为，不在名字。</p><p>用一张灰球和一张方格图测试：看反射、粗糙度和法线；先调这三项，再贴颜色。</p><h2>边界</h2><p>材质不能救模型。模型没有厚度、接缝和倒角，再好的贴图也像纸片；先修形状。</p>`,
    en: `<h2>Ask what the surface does before naming it</h2><p>Do not start with “metal” or “wood”; start with behavior: reflection sharpness, roughness, edge translucency, dents. The same “metal” can be mirror, brushed or rusted. The difference is behavior, not the label.</p><p>Test with a gray ball and a grid: check reflection, roughness and normal; set those three before color.</p><h2>Limits</h2><p>Materials cannot save a model. Without thickness, seams and bevels, the best texture still looks like paper. Fix shape first.</p>`
  },
  'anticipation': {
    zh: `<h2>先反向，再正向</h2><p>动作开始前，先做一个相反的小动作：跳之前先蹲，打之前先收手，跑之前先后仰。这个反向帧让观众预判力量方向，动作才不突然。</p><p>反向不要过长。一般 2–4 帧；太长会像犹豫，太短看不见。</p><h2>边界</h2><p>预判不是每个动作都要加。连续快速动作里加反向，会显得拖；只在关键动作前用。</p>`,
    en: `<h2>Go opposite before going forward</h2><p>Before an action, play a small opposite move: crouch before a jump, pull the hand back before a punch, lean back before a run. The reverse frame lets the audience anticipate force.</p><p>Keep it short, usually two to four frames; too long reads as hesitation, too short is invisible.</p><h2>Limits</h2><p>Not every action needs anticipation. In fast consecutive action it drags; use it before key moves only.</p>`
  },
  'audio-description': {
    zh: `<h2>描述“看不见但必须知道”的信息</h2><p>音频描述不是把画面全念一遍。只写三类：谁在做什么、空间关系、屏幕上出现的文字。人物已经说出的内容，不要重复。</p><p>描述要留在对白空隙里，不盖台词；先测时间，写太长就删形容词，保留动作和方向。</p><h2>边界</h2><p>描述不是评论。不要写“她很悲伤”，写“她低头，把照片翻过去”；让听众自己判断情绪。</p>`,
    en: `<h2>Describe what is unseen but necessary</h2><p>Audio description is not narrating every image. Write three kinds: who does what, spatial relations, on-screen text. Do not repeat what characters already say.</p><p>Fit description into dialogue gaps and never cover a line. Time it first; if too long, cut adjectives, keep action and direction.</p><h2>Limits</h2><p>Description is not commentary. Do not write “she is sad”; write “she looks down and turns the photo over.” Let the listener judge.</p>`
  },
  '2d-camera': {
    zh: `<h2>2D 摄影机是“舞台”，不是 3D 场景</h2><p>二维动画的摄影机移动，先想多层景片怎么排：前景、中景、背景各在一层，移动时速度不同，才有空间。所有层一起平移，观众只看到一张画在滑。</p><p>推近时先决定是移动摄影机还是放大图层；放大图层会软，移动摄影机才能保持清晰。</p><h2>边界</h2><p>2D 摄影机不能替代透视。层与层的比例不对，再复杂的移动也像纸片；先画对空间。</p>`,
    en: `<h2>A 2D camera is a stage, not a 3D scene</h2><p>Camera moves in 2D start with layer layout: foreground, middle and background on separate planes, moving at different speeds to create space. Move them together and the audience sees a sliding drawing.</p><p>For a push-in, decide whether to move the camera or scale the layer; scaling softens, camera movement stays sharp.</p><h2>Limits</h2><p>A 2D camera cannot replace perspective. If layer scale is wrong, complex moves still look like paper; draw the space first.</p>`
  },
  '2d-compositing': {
    zh: `<h2>合成先对齐“线”和“色”</h2><p>二维合成最容易露馅的是线宽和颜色不一致。先统一线稿粗细、抗锯齿和色阶，再谈光影；每个图层单独调，不要全局加滤镜。</p><p>用一张对比图检查：前景和背景的黑色是否一样黑、白色是否一样白；不一样，观众会觉得贴上去。</p><h2>边界</h2><p>合成不是加特效。特效再多，线和对不齐仍然假；先把基础层对齐。</p>`,
    en: `<h2>2D compositing aligns line and color first</h2><p>The giveaway is inconsistent line weight and color. Unify stroke width, anti-aliasing and value range before lighting; adjust each layer separately, not with a global filter.</p><p>Check with a comparison frame: foreground and background blacks and whites must match; if not, it looks pasted on.</p><h2>Limits</h2><p>Compositing is not adding effects. No amount of effects fixes misaligned lines; align the base layers first.</p>`
  },
  'modeling': {
    zh: `<h2>建模先保“剪影”和“厚度”</h2><p>先看剪影：把模型填成纯黑，还能认出角色吗？再看厚度：边缘有没有倒角、关节有没有体积。剪影不对，细节再多也认不出。</p><p>从大块面开始，逐步加边；不要一上来做毛孔。每加一次细节，退回剪影检查。</p><h2>边界</h2><p>面数不是精度。该圆的地方圆、该硬的地方硬；面数堆在看不见的地方，只会拖慢渲染。</p>`,
    en: `<h2>Modeling protects silhouette and thickness</h2><p>Check the silhouette: fill the model black—can you still recognize the character? Then thickness: bevels at edges, volume at joints. If the silhouette fails, detail will not identify it.</p><p>Start with big planes, add edges gradually; do not begin with pores. Every detail pass returns to the silhouette check.</p><h2>Limits</h2><p>Polygon count is not precision. Round what should be round, hard what should be hard; polygons in unseen places only slow render.</p>`
  },
  'stop-motion-motion-blur': {
    zh: `<h2>定格的运动模糊要“每帧决定”</h2><p>定格不是真实快门连续曝光，运动模糊要靠后期或多次曝光模拟。先决定哪些帧需要模糊：快速挥手、转头、掉落；静态帧不要加，否则会糊。</p><p>后期模糊要沿运动方向，长度匹配速度；全画面统一加模糊，看起来像雾。</p><h2>边界</h2><p>不是所有定格都需要模糊。逐帧清晰的“定格感”也是一种风格；先定风格，再决定加不加。</p>`,
    en: `<h2>Stop-motion blur is decided per frame</h2><p>Stop motion does not capture continuous shutter exposure; blur is simulated in post or multiple exposure. Decide which frames need it: fast hand, turn, fall. Do not blur static frames.</p><p>Post blur follows motion direction and length; a uniform blur over everything looks like fog.</p><h2>Limits</h2><p>Not every stop-motion shot needs blur. Frame-by-frame sharpness is also a style; choose the style before adding it.</p>`
  },
  'stop-motion-set': {
    zh: `<h2>布景先保“手能进去”</h2><p>定格布景不是微缩景观。每个需要调整的位置都要留出至少两指宽的操作口；墙、家具和地面要能单独拆装，否则一碰就全倒。</p><p>用 1:6 或 1:12 的比例先做纸模，确认摄影机、灯和手的空间；不要先做细节。</p><h2>边界</h2><p>布景不是越满越好。前景留遮挡，后景留空，手才有地方；塞满道具，连对焦都进不去。</p>`,
    en: `<h2>A stop-motion set must fit a hand</h2><p>It is not a miniature landscape. Every adjustable position needs two fingers of access; walls, furniture and floor must come apart separately or one touch collapses the set.</p><p>Build a paper maquette at 1:6 or 1:12 first, checking camera, lamp and hand space; do not start with detail.</p><h2>Limits</h2><p>More set is not better. Keep foreground for blocking and background empty so a hand fits; a packed set leaves no room even to focus.</p>`
  },
  'run-cycle': {
    zh: `<h2>跑步循环先定“接触帧”</h2><p>跑步循环的关键不是腿抬多高，而是脚什么时候落地、身体什么时候最低。先标接触帧和腾空帧，再做中间；接触帧错了，整段会滑。</p><p>用侧视图检查：头是否上下跳、胯是否左右摆、手臂是否和腿反向。三项有一项不对，循环就不稳。</p><h2>边界</h2><p>跑步不是走路加速。走路总有一只脚着地，跑步有腾空；把走路循环加快，会像竞走。</p>`,
    en: `<h2>Run cycles start at the contact frame</h2><p>The key is not how high the leg lifts but when the foot lands and when the body is lowest. Mark contact and airborne frames, then in-between; a wrong contact makes the whole cycle slide.</p><p>Check in side view: head bounce, hip sway, arms opposing legs. If one is wrong, the cycle is unstable.</p><h2>Limits</h2><p>Running is not fast walking. Walking always has a foot down; running has flight. Speed up a walk cycle and it becomes race-walking.</p>`
  },
  'camera-prompt': {
    zh: `<h2>镜头提示先写“位置”，再写“运动”</h2><p>“电影感运镜”没有信息。写成：摄影机在人物左前方 1.5 米、腰高、50mm、缓慢向右平移 30 厘米。位置和运动都可见，生成才知道怎么动。</p><p>一条提示只写一个运动：推、拉、摇、移、跟，不要同时写“环绕再加推近”。</p><h2>边界</h2><p>镜头运动不能代替场景调度。人物不动、空间不清，摄影机转一圈也只是空镜。</p>`,
    en: `<h2>Camera prompts name position before motion</h2><p>“Cinematic camera move” carries no information. Write: camera 1.5 m left-front of the subject, waist height, 50mm, slow 30 cm rightward pan. Position and motion are visible, so the model knows how to move.</p><p>One prompt, one move: push, pull, pan, track, follow. Do not combine orbit and push-in.</p><h2>Limits</h2><p>Camera motion cannot replace staging. If the subject does not act and the space is unclear, an orbiting camera is only scenery.</p>`
  },
  'negative-prompt': {
    zh: `<h2>负面词只写“必须避免的可见项”</h2><p>负面提示不是许愿池。写“多余手指、文字、水印、塑料皮肤、过度锐化”，不要写“难看、廉价、不真实”；后者模型无法执行。</p><p>每轮只加 2–3 个负面词，生成后对比；加太多会把正常细节也压掉，画面变干净但变空。</p><h2>边界</h2><p>负面词不能修结构错误。人物比例错了，先改正面描述和参考图；负面词只能减少，不能重建。</p>`,
    en: `<h2>Negative prompts list visible things to avoid</h2><p>A negative prompt is not a wish list. Write “extra fingers, text, watermark, plastic skin, over-sharpening,” not “ugly, cheap, unrealistic”; the model cannot execute the latter.</p><p>Add two or three negatives per pass and compare; too many suppress legitimate detail, leaving a clean but empty image.</p><h2>Limits</h2><p>Negatives cannot fix structure. If proportions are wrong, change the positive description and reference; negatives subtract, not rebuild.</p>`
  },
  'ai-music': {
    zh: `<h2>先写“段落功能”，再写“风格”</h2><p>AI 音乐不是输入“史诗感”就完事。先写段落：前 10 秒建立空间、20 秒抬升、40 秒留白；再写风格和乐器。段落功能清楚，音乐才能服务剪辑。</p><p>生成后检查三件事：有没有突然的音量跳变、循环段是否自然、低频是否盖住对白。三项不过，重生成或换段。</p><h2>边界</h2><p>AI 音乐不能替代授权。生成工具的商用条款要读清；没有授权链的音乐，不进客户交付。</p>`,
    en: `<h2>Write section function before style</h2><p>AI music is not “epic” and done. Write the sections: first ten seconds establish space, twenty lift, forty breathe; then style and instruments. Clear function lets music serve the cut.</p><p>Check three things after generation: sudden volume jumps, natural loops, low end masking dialogue. Fail one and regenerate or swap sections.</p><h2>Limits</h2><p>AI music does not replace licensing. Read the tool's commercial terms; music without a rights chain does not go into client delivery.</p>`
  },
  'ai-edit-assist': {
    zh: `<h2>先让它做“粗活”，不做“判断”</h2><p>AI 剪辑助手适合做：转写、按关键词找片段、去静音、生成粗剪序列。不要让模型决定故事结构、表演好坏和最终节奏；它没有你的上下文。</p><p>每一条 AI 建议都要回到原素材核对：它可能把“笑声”识别成“掌声”，也可能漏掉低声对白。</p><h2>边界</h2><p>AI 粗剪不是交付。它只能减少找素材的时间，不能替代剪辑师的判断；直接导出会留下机械节奏。</p>`,
    en: `<h2>Let it do the labor, not the judgment</h2><p>AI editing assistants are good at transcription, keyword search, silence removal and rough sequences. Do not let them decide story structure, performance or final pacing; they lack your context.</p><p>Check every suggestion against the source: it may hear laughter as applause or miss a quiet line.</p><h2>Limits</h2><p>An AI rough cut is not delivery. It saves search time, not editorial judgment; exporting directly leaves mechanical pacing.</p>`
  },
  'ai-replacement': {
    zh: `<h2>替换先保“光影和运动”</h2><p>AI 替换人物、背景或道具，最容易崩的是光影方向和运动惯性。先拍好原素材的光、影、运动，再让生成只替换材质或局部；不要整帧重生成。</p><p>替换后用差分看边缘：头发、手指、透明物体和运动模糊处最容易露。</p><h2>边界</h2><p>替换不能改变事实。新闻、纪录片和证据素材不做生成替换；广告和虚构可以，但必须披露。</p>`,
    en: `<h2>Replacement preserves light and motion</h2><p>AI replacement of a person, background or prop fails at light direction and inertia. Shoot the original light, shadow and motion first, then generate only the material or region; do not regenerate the whole frame.</p><p>Use a difference check on edges: hair, fingers, transparent objects and motion blur show first.</p><h2>Limits</h2><p>Replacement cannot change facts. No generative replacement in news, documentary or evidence; ads and fiction may use it with disclosure.</p>`
  },
  'ai-rotoscope': {
    zh: `<h2>先给“干净边缘”，再让 AI 跟踪</h2><p>AI 抠像不是一键完成。先拍清楚边缘：主体和背景有颜色差、运动不过快、光线均匀；再让模型跟踪。透明、毛发和快速遮挡仍需手动修。</p><p>每 10–20 帧检查一次边缘，漂移就加关键帧；不要整段跑完才看。</p><h2>边界</h2><p>AI 抠像不能替代 rotoscope 的判断。边缘是否该软、是否该保留运动模糊，仍要人决定；全硬边会让合成假。</p>`,
    en: `<h2>Give AI a clean edge before tracking</h2><p>AI keying is not one click. Shoot a clear edge first: color separation, moderate motion, even light; then track. Transparency, hair and fast occlusion still need manual work.</p><p>Check edges every ten to twenty frames and add keys on drift; do not run the whole shot blind.</p><h2>Limits</h2><p>AI keying does not replace rotoscope judgment. Whether an edge should be soft or keep motion blur is still a human call; hard edges look pasted.</p>`
  },
  'ai-subtitle': {
    zh: `<h2>自动字幕先校对“名字、数字、否定”</h2><p>AI 转写对常见词准确，对专有名词、数字、否定句和口音最容易错。先让它出初稿，再逐句对照原声；不要直接上线。</p><p>校对时重点看：人名、品牌、金额、日期、“不”和“没”。这些错一处，观众会怀疑整条片。</p><h2>边界</h2><p>自动字幕不能替代翻译。跨语言时，机器翻译的语序和术语仍需人工；字幕错，比没有字幕更伤信任。</p>`,
    en: `<h2>Proofread names, numbers and negation first</h2><p>AI transcription is good on common words and weak on names, numbers, negation and accents. Let it draft, then check every line against the audio; do not publish directly.</p><p>Focus on people, brands, amounts, dates, “not” and “no.” One error makes the audience doubt the whole film.</p><h2>Limits</h2><p>Auto captions do not replace translation. Across languages, machine word order and terminology still need a human; wrong captions hurt more than none.</p>`
  },
  'ai-tts': {
    zh: `<h2>先写“给谁听”，再选声音</h2><p>TTS 不是选一个好听的声音。先定听众和场景：教程要清楚、广告要节奏、纪录要克制。再用标点和分段控制停顿；一句话太长，任何声音都会平。</p><p>生成后检查专有名词、数字和情绪转折；机器最容易在句尾上扬，把陈述读成疑问。</p><h2>边界</p><p>TTS 不能替代真人表演。需要呼吸、犹豫和现场感时，真人录音仍然更好；TTS 适合信息和草稿。</p>`,
    en: `<h2>Decide who listens before choosing a voice</h2><p>TTS is not picking a pleasant voice. Define audience and context: tutorial clear, ad rhythmic, documentary restrained. Control pauses with punctuation and paragraphing; a long sentence flattens any voice.</p><p>Check names, numbers and emotional turns; machines often lift the ending and turn statements into questions.</p><h2>Limits</h2><p>TTS cannot replace a performance. When breath, hesitation and presence matter, record a human; TTS suits information and drafts.</p>`
  },
  'voice-clone': {
    zh: `<h2>先拿授权，再谈像不像</h2><p>声音克隆的第一道门槛不是技术，是同意。必须拿到本人明确授权：用途、期限、平台、是否可二次修改；去世的人、未成年人和公众人物要额外谨慎。</p><p>训练素材要干净、同一麦克风、同一空间；噪声和背景音乐会让克隆学到错误特征。</p><h2>边界</p><p>像不等于可以用。即使听起来一模一样，没有授权就是侵权；不要用“只是测试”当借口发布。</p>`,
    en: `<h2>Get consent before asking whether it sounds right</h2><p>The first gate is not technology but permission: purpose, term, platforms and whether the voice can be altered. Extra care for deceased people, minors and public figures.</p><p>Training audio must be clean, same mic and same room; noise and music teach the clone the wrong features.</p><h2>Limits</h2><p>Similarity is not permission. Even a perfect clone without consent is infringement; “just a test” is not a license to publish.</p>`
  },
  'digital-human-voice': {
    zh: `<h2>口型之前，先让“呼吸”对</h2><p>数字人最假的地方常不是嘴型，而是呼吸和停顿。先让配音有自然换气，再让口型对齐；每一句结尾留一点余气，不要一句话完立刻切下一句。</p><p>检查爆破音（p、b、m）和齿音（s、sh）；这两类最容易穿帮。</p><h2>边界</h2><p>数字人不能替代真实采访。需要证据、情绪和现场关系时，用真人；数字人适合信息播报和虚构角色。</p>`,
    en: `<h2>Match breath before lip sync</h2><p>The uncanny part is often breath and pause, not the mouth. Give the voice natural breaths, then align lips; leave residual air at the end of a line instead of cutting immediately.</p><p>Check plosives (p, b, m) and sibilance (s, sh); they break first.</p><h2>Limits</h2><p>A digital human cannot replace a real interview. Use a person when evidence, emotion and presence matter; digital humans suit announcements and fictional roles.</p>`
  },
  'digital-human-lipsync': {
    zh: `<h2>先对齐“重音”，再对齐每个音素</h2><p>口型不必逐帧对每个音素，但重音、停顿和句尾必须对。先让配音定稿，再生成口型；配音一改，口型全废。</p><p>近景看嘴，中景看下巴和脖子；脖子不动，嘴再准也假。</p><h2>边界</h2><p>口型不是越密越好。人说话时嘴不会每秒开合十次；过度对齐会像木偶。</p>`,
    en: `<h2>Align stress before phonemes</h2><p>Lip sync does not need every phoneme, but stress, pause and sentence ending must land. Lock the voice first, then generate lips; a voice change wastes the sync.</p><p>Close-ups read the mouth, medium shots read jaw and neck; a frozen neck makes accurate lips fake.</p><h2>Limits</h2><p>Denser sync is not better. Real mouths do not open ten times a second; over-alignment looks like a puppet.</p>`
  },
  'digital-human-gesture': {
    zh: `<h2>手势要有“对象”，不要循环播放</h2><p>数字人手势最假的是无对象摆动。每个手势都要指向一个东西：这里、你、屏幕、门外。先写动作目的，再让系统生成；没有对象，手只会来回画圈。</p><p>同一手势不要连续出现两次；观众会立刻看出循环。</p><h2>边界</h2><p>手势不能替代语言。说不清的内容，加手势也不会清楚；先把句子写短。</p>`,
    en: `<h2>Gestures need an object, not a loop</h2><p>The fake part is objectless waving. Every gesture points at something: here, you, the screen, the door. Write the purpose first, then generate; without an object, hands circle.</p><p>Never repeat the same gesture twice in a row; the loop is immediately visible.</p><h2>Limits</h2><p>Gesture cannot replace language. If the sentence is unclear, hands will not fix it; shorten the sentence first.</p>`
  },
  'ai-failure-cases': {
    zh: `<h2>失败通常不在模型，在“输入没锁”</h2><p>常见失败：人物服装每镜变、手指数变化、背景文字乱码、运动方向反、光线不接。逐条回看，八成是参考图不统一、提示写太满或镜头之间没有共享锚点。</p><p>建一张失败表：镜号、问题、可能原因、下一次改哪个变量。不要只写“AI 不行”。</p><h2>边界</h2><p>失败案例不是劝退。它是边界清单：哪些镜头必须实拍，哪些可以用生成；先分类，再谈效率。</p>`,
    en: `<h2>Failures usually start with unlocked input</h2><p>Common failures: wardrobe changes per shot, finger count, garbled background text, reversed motion, mismatched light. Most trace to inconsistent references, overloaded prompts or no shared anchor between shots.</p><p>Keep a failure sheet: shot, problem, likely cause, next variable to change. Do not just write “AI is bad.”</p><h2>Limits</h2><p>Failure cases are not a rejection. They map the boundary: which shots must be live, which can be generated. Classify before discussing efficiency.</p>`
  },
  'ai-delivery-check': {
    zh: `<h2>AI 交付前查“来源、授权、披露”</h2><p>每个生成镜头登记：工具、提示、版本、参考图、授权状态。交付前逐项确认：能不能商用、有没有模仿真实人物、是否披露、素材能否追溯。</p><p>把生成素材和实拍素材分目录；客户问“这一秒怎么来的”，能在五分钟内回答。</p><h2>边界</h2><p>技术检查通过不等于权利干净。画面没有瑕疵，但音乐、字体、肖像或模型条款有问题，仍然不能交付。</p>`,
    en: `<h2>Check source, rights and disclosure before AI delivery</h2><p>Log every generated shot: tool, prompt, version, references, rights status. Before delivery confirm commercial use, no real-person imitation, disclosure and traceability.</p><p>Keep generated and live media in separate folders; when the client asks how a second was made, answer in five minutes.</p><h2>Limits</h2><p>Technical QC is not rights clearance. A clean frame with bad music, font, likeness or model terms is still undeliverable.</p>`
  },
  'cg-integration': {
    zh: `<h2>先共享“光”和“镜头”，再共享“颜色”</h2><p>CG 与实拍合成，最容易露馅的是光线方向和镜头畸变。先记录实拍的光位、色温、镜头焦距和光圈，再让 CG 用同一套参数渲染；颜色可以后期，光位不行。</p><p>合成前做一张灰球和色卡对比；CG 的反射、阴影和颗粒要匹配实拍。</p><h2>边界</h2><p>CG 不能救没有拍好的 plate。实拍没有运动模糊、没有正确透视，后期加特效只会更假；先拍对。</p>`,
    en: `<h2>Share light and lens before color</h2><p>CG-live integration fails at light direction and lens distortion. Record the live key position, color temperature, focal length and aperture, then render CG with the same set. Color can be graded; light position cannot.</p><p>Compare a gray ball and chart before comp; match CG reflection, shadow and grain to the plate.</p><h2>Limits</h2><p>CG cannot save a bad plate. Wrong motion blur or perspective makes effects look worse; shoot it right first.</p>`
  },
  'rotoscoping': {
    zh: `<h2>先画“关节”，再画轮廓</h2><p>转描不是描边。先标关节位置和运动方向，再画外轮廓；关节对了，轮廓才有体积。每 5–10 帧检查一次，漂移就修关键帧。</p><p>边缘要根据画面决定软硬：实拍有运动模糊，转描也要保留一点；全硬边会像剪纸。</p><h2>边界</h2><p>转描不能替代表演。演员动作不清楚，描得再准也只是复制模糊；先拍清楚动作。</p>`,
    en: `<h2>Mark joints before outlines</h2><p>Rotoscoping is not tracing. Mark joints and motion direction first, then the outline; correct joints give the shape volume. Check every five to ten frames and fix keys on drift.</p><p>Edge hardness follows the plate: live action has motion blur, so keep some; hard edges look like cut paper.</p><h2>Limits</h2><p>Rotoscoping cannot replace performance. If the action is unclear, accurate tracing copies the confusion; shoot it clearly first.</p>`
  },
  'motion-control': {
    zh: `<h2>先锁“路径”，再锁“速度”</h2><p>运动控制要分两层：物体沿哪条路径走、在每个位置停多久。路径决定空间关系，速度决定重量。先画路径，再调曲线；不要只拉关键帧。</p><p>用一辆车或一个球测试：路径对了，再加缓入缓出；速度曲线不对，物体像在冰上滑。</p><h2>边界</h2><p>运动控制不是关键帧越多越好。关键帧太密，动作会顿；先定大姿势，再补中间。</p>`,
    en: `<h2>Lock the path, then the speed</h2><p>Motion control has two layers: the path an object takes and how long it stays at each point. Path sets space; speed sets weight. Draw the path, then the curve; do not just pile keyframes.</p><p>Test with a car or ball: fix the path, add ease-in/out; a wrong speed curve looks like sliding on ice.</p><h2>Limits</h2><p>More keys is not better. Too many keys stutter; set big poses, then in-betweens.</p>`
  },
  'layout': {
    zh: `<h2>Layout 先定“摄影机与地面”</h2><p>三维 Layout 不是摆好看。先画地面线、摄影机高度和焦距，再放角色；三者一定，空间才成立。角色比例错了，后面动画再顺也像贴纸。</p><p>用简单方块做一版 playblast，检查遮挡和剪影；不要先做细节。</p><h2>边界</h2><p>Layout 不是最终镜头。它允许粗糙，但摄影机、比例和时间必须已经定下；这三项后面改，成本最高。</p>`,
    en: `<h2>Layout starts with camera and ground</h2><p>3D layout is not pretty placement. Draw the ground line, camera height and focal length first, then the character. With those three, space exists. Wrong scale makes later animation look pasted on.</p><p>Block a playblast with simple boxes, check occlusion and silhouette; do not add detail.</p><h2>Limits</h2><p>Layout is not the final shot. It can be rough, but camera, scale and timing must be locked; changing them later is the most expensive fix.</p>`
  },
  'wardrobe-consistency': {
    zh: `<h2>服装连续性靠“编号”和“照片”</h2><p>每套服装编号，拍正面、背面、细节三张照片；换场前对照。领口、袖口、纽扣、污渍位置都要记录，不要只记颜色。</p><p>同一场戏有弄脏、淋湿、换装，按剧本顺序拍，不要跳着拍；状态一旦变了，倒回去很贵。</p><h2>边界</h2><p>连续性不是每帧都一样。观众不会数纽扣，但会看出“刚才不是这件”；只保明显的状态。</p>`,
    en: `<h2>Wardrobe continuity uses numbers and photos</h2><p>Number each costume and photograph front, back and detail; check before each scene. Record collar, cuffs, buttons and stain positions, not just color.</p><p>Shoot dirt, rain and changes in script order; once the state changes, going back is expensive.</p><h2>Limits</h2><p>Continuity is not identical every frame. The audience will not count buttons but will notice “that is a different jacket.” Protect visible state.</p>`
  },
  'animatic-boarding': {
    zh: `<h2>Animatic 先定“镜头长度”</h2><p> animatic 的第一任务是时间，不是画面。每个镜头标秒数，配音先录，按声音长度定镜头；不要先画满再配音，节奏一定不对。</p><p>用简单线条和临时音效，检查动作能否接上；接不上，回分镜，不要加特效救。</p><h2>边界</h2><p>Animatic 不是成品。它允许粗糙，但镜头顺序、时长和动作方向必须定；这三项后面改，等于重做。</p>`,
    en: `<h2>Animatic sets shot length first</h2><p>The first job is timing, not drawing. Mark seconds per shot and record voice first; let sound length set the shot. Do not draw everything then add voice; pacing will be wrong.</p><p>Use simple lines and temp sound to test whether actions connect; if not, return to the board, not effects.</p><h2>Limits</h2><p>An animatic is not a final. It can be rough, but order, duration and action direction must be locked; changing them later is a rebuild.</p>`
  },
  'mg-rhythm': {
    zh: `<h2>节奏靠“分组”，不靠每帧动</h2><p>动态图形不是所有元素同时动。先分组：主信息、辅助线、背景；每组有各自的入场和停顿。观众先读主信息，再读辅助，最后看背景。</p><p>用 2 秒、4 秒、6 秒三个节拍测试；所有元素都在同一拍入场，会像爆炸。</p><h2>边界</h2><p>节奏不是越快越好。信息密度高时，停一拍比加十个动画有用；观众需要时间读字。</p>`,
    en: `<h2>Rhythm comes from grouping, not constant motion</h2><p>Motion graphics is not every element moving at once. Group main information, support lines and background; each gets its own entrance and rest. The viewer reads main, then support, then background.</p><p>Test at two, four and six seconds; if everything enters on one beat, it looks like an explosion.</p><h2>Limits</h2><p>Faster is not better. With dense information, one beat of rest beats ten animations; the viewer needs time to read.</p>`
  },
  'mg-infographic': {
    zh: `<h2>图表动画先画“关系”，再画“装饰”</h2><p>信息图不是把数字放大再加箭头。先确定关系：比较、趋势、占比、流程；每种关系对应一种图形。关系错了，动画再顺也读不懂。</p><p>先做静态版，让同事在 5 秒内说出结论；说不出来，改图形，不要加动效。</p><h2>边界</h2><p>装饰不能替代数据。没有样本、时间和来源的图表，再好看也只是插画；先把三样写清。</p>`,
    en: `<h2>Draw the relationship before decoration</h2><p>An infographic is not big numbers plus arrows. Decide the relationship: comparison, trend, proportion, process; each maps to a chart form. Wrong relationship cannot be fixed by animation.</p><p>Make a static version and ask a colleague to state the conclusion in five seconds; if not, change the chart, not the motion.</p><h2>Limits</h2><p>Decoration cannot replace data. A chart without sample, period and source is illustration; write those three first.</p>`
  },
  'mg-typography': {
    zh: `<h2>字体动画先保“可读”，再保“好看”</h2><p>文字动画最容易犯的错，是每个字飞入、旋转、变形，观众读不完。先保一行字停留足够时间，再做入场；入场不超过 0.3 秒，停留至少 1.5 秒。</p><p>一行只用一个动作：淡入、上移或遮罩，不要同时加三种。</p><h2>边界</h2><p>字体不是装饰画。可读性优先：对比、字号、行距；风格化字体用在标题，不要用在长句。</p>`,
    en: `<h2>Type animation is readable before beautiful</h2><p>The usual mistake is every letter flying, spinning and morphing while nobody finishes reading. Give the line enough hold time, then animate the entrance: under 0.3 seconds in, at least 1.5 seconds hold.</p><p>One move per line: fade, rise or mask, not three at once.</p><h2>Limits</h2><p>Type is not decoration. Readability first: contrast, size, leading. Use display faces for titles, not long sentences.</p>`
  }
};
