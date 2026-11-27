// 2026-11-24 content expansion: craft modules for animation, AI, history and
// the six new format pages. Each section adds production-level checks rather
// than restating the article's existing definition.
export const EXPANSION_CRAFT_20261124 = {
  '2d-camera': {
    zh: `<h2>2D 摄影机不是“放大”，是分层视差</h2>
<p>二维镜头运动的核心不是把画面整体推近，而是让前景、中景、背景以不同速度移动。速度差决定空间感；没有分层，再大的运动也像一张图在缩放。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>层</th><th>速度</th><th>常见错误</th></tr></thead><tbody>
<tr><td>前景</td><td>最快，可出画</td><td>和背景一起缩放，失去遮挡</td></tr>
<tr><td>中景</td><td>中等，承载主体</td><td>运动模糊方向反了</td></tr>
<tr><td>背景</td><td>最慢，留余量</td><td>放大后边缘穿帮</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>先做一张 2 倍于成片尺寸的背景，给摄影机留移动余量；不要用成片尺寸硬推。</li><li>摄影机路径只设 2–3 个关键帧，用缓入缓出；线性关键帧会让画面像传送带。</li><li>运动模糊按帧率与速度单独调，前景和背景不要共用一套参数。</li><li>输出前逐层开关，确认没有空白边缘、接缝和重复纹理。</li></ol>
<p>验收时把成片缩到 50% 再看一遍：如果空间感还在，说明分层成立；如果只剩“整体变大”，回到层速度重做。</p>`,
    en: `<h2>A 2D camera is not a zoom; it is layered parallax</h2>
<p>The point of a 2D camera move is not to push the whole image closer, but to move foreground, midground and background at different speeds. The speed difference creates space. Without layers, even a large move looks like a flat image scaling.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Layer</th><th>Speed</th><th>Common error</th></tr></thead><tbody>
<tr><td>Foreground</td><td>Fastest; may leave frame</td><td>Scales with background, loses occlusion</td></tr>
<tr><td>Midground</td><td>Medium; carries subject</td><td>Motion blur points the wrong way</td></tr>
<tr><td>Background</td><td>Slowest; needs overscan</td><td>Edges show after scaling</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Build the background at twice final size to give the camera room. Do not push a final-size plate.</li><li>Use two or three camera keyframes with ease in/out. Linear keys feel like a conveyor belt.</li><li>Tune motion blur per layer and speed; foreground and background should not share one setting.</li><li>Toggle each layer before output; check blank edges, seams and repeated texture.</li></ol>
<p>For acceptance, watch the film at 50%. If space remains, the layers work. If it only “gets bigger,” return to layer speed.</p>`
  },
  '2d-compositing': {
    zh: `<h2>二维合成：先修边，再调色，最后加光</h2>
<p>合成的问题通常不是“效果不够”，而是顺序错了。先调色再修边，会把边缘的颜色差一起放大；先加光再修边，光会盖住接缝。正确顺序是：清理素材 → 修边 → 色彩统一 → 光效 → 输出。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>步骤</th><th>检查</th><th>失败信号</th></tr></thead><tbody>
<tr><td>修边</td><td>1:1 像素看边缘</td><td>白边、黑边、锯齿</td></tr>
<tr><td>色彩</td><td>同一场景的皮肤/天空</td><td>前景比背景偏暖或偏绿</td></tr>
<tr><td>光效</td><td>光源方向一致</td><td>光晕穿过遮挡物</td></tr>
<tr><td>输出</td><td>不同尺寸各看一遍</td><td>小尺寸边缘消失，大尺寸接缝明显</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>把每个元素单独开关，做一张“元素清单”；缺一个影子或接触阴影，画面就浮。</li><li>修边用最小参数，多次轻修，不要一次拉满；拉满会把细节吃掉。</li><li>色彩统一先看中性灰，再看肤色；只靠眼睛在彩色背景上判断会偏。</li><li>光效层放在最上，但要用遮罩挡住前景物体；否则光会穿墙。</li></ol>
<p>交付前让另一个人看 10 秒，只问“哪里浮”。自己盯久了会看不见接缝。</p>`,
    en: `<h2>2D compositing: fix edges, then color, then light</h2>
<p>Compositing problems are usually order problems, not “not enough effect.” Color before edge work magnifies edge fringes. Light before edge work covers seams. The order is: clean plate → edge → color match → light → output.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Step</th><th>Check</th><th>Failure signal</th></tr></thead><tbody>
<tr><td>Edge</td><td>Inspect at 1:1 pixels</td><td>White/black fringe, jaggies</td></tr>
<tr><td>Color</td><td>Skin and sky within one scene</td><td>Foreground warmer or greener than background</td></tr>
<tr><td>Light</td><td>Light direction matches</td><td>Glow passes through an occluder</td></tr>
<tr><td>Output</td><td>Review at each delivery size</td><td>Edge vanishes small, seam shows large</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Toggle every element and make a list. One missing shadow or contact shadow makes the layer float.</li><li>Use the smallest edge setting, several light passes. One maxed-out pass eats detail.</li><li>Match color on neutral gray first, then skin. Eyes alone drift on a colored background.</li><li>Put the light pass on top but mask it behind foreground objects; otherwise light goes through walls.</li></ol>
<p>Before delivery, ask someone else to watch ten seconds and answer only “what floats?” After staring for hours, you stop seeing seams.</p>`
  },
  'armature': {
    zh: `<h2>骨架绑定：先做“极限测试”，再开始动画</h2>
<p>绑定不是把骨骼连上就结束。动画师一拉，问题才出现：肘部塌陷、膝盖反转、肩膀穿模。绑定交付前必须做一组极限姿势测试，不合格不进入动画。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>测试</th><th>动作</th><th>通过标准</th></tr></thead><tbody>
<tr><td>肩</td><td>手臂上举 180°</td><td>腋下不塌，衣服不穿</td></tr>
<tr><td>肘</td><td>弯曲 140°</td><td>体积保持，无糖纸扭曲</td></tr>
<tr><td>膝</td><td>深蹲 + 反向</td><td>膝盖不反折，脚不滑</td></tr>
<tr><td>脊柱</td><td>扭转 + 侧弯</td><td>胸腔和骨盆过渡自然</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>控制器命名统一：左/右、FK/IK、镜像规则写在一页纸上，动画师不猜。</li><li>锁定不该动的轴，隐藏不用的控制器；能误触的绑定一定会被误触。</li><li>每个极限姿势存一张截图，作为绑定验收附件；口头说“能用”不算。</li><li>蒙皮权重先做关节，再做肌肉；一次刷全身，问题会互相掩盖。</li></ol>
<p>如果项目周期少于 3 天，不要做电影级面部绑定；用简化面部控制器，把时间留给表演和渲染。</p>`,
    en: `<h2>Rigging: run extreme-pose tests before animation</h2>
<p>A rig is not done when bones are connected. Problems appear when an animator pulls: elbow collapse, knee inversion, shoulder intersections. Before handoff, run extreme-pose tests; do not start animation until they pass.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Test</th><th>Pose</th><th>Pass condition</th></tr></thead><tbody>
<tr><td>Shoulder</td><td>Arm raised 180°</td><td>No armpit collapse, no cloth intersection</td></tr>
<tr><td>Elbow</td><td>Bend 140°</td><td>Volume holds, no candy-wrapper twist</td></tr>
<tr><td>Knee</td><td>Deep squat + reverse</td><td>No inversion, feet do not slide</td></tr>
<tr><td>Spine</td><td>Twist + side bend</td><td>Chest and pelvis transition smoothly</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Standardize controller names: left/right, FK/IK, mirror rules on one page. Animators should not guess.</li><li>Lock axes that should not move and hide unused controls. A rig that can be bumped will be bumped.</li><li>Save a screenshot of every extreme pose as the rig acceptance record. “It works” is not evidence.</li><li>Weight joints before muscles; a full-body weight pass hides problems inside other problems.</li></ol>
<p>If the schedule is under three days, do not build film-level facial rigging. Use simplified facial controls and spend the time on performance and rendering.</p>`
  },
  'layout': {
    zh: `<h2>Layout：把“镜头”变成可交接的空间</h2>
<p>Layout 不是摆好看，而是确定摄影机、角色站位、比例和运动路线，让后面的人不用猜。一个合格的 layout 镜头，换一个动画师也能接上。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>交付</th><th>必须写清</th><th>常见缺失</th></tr></thead><tbody>
<tr><td>摄影机</td><td>焦距、机位、运动路径、帧数</td><td>只有一张构图，没有运动</td></tr>
<tr><td>角色</td><td>站位、朝向、视线、比例</td><td>和场景比例不一致</td></tr>
<tr><td>环境</td><td>可动道具、遮挡关系</td><td>前景挡住主体</td></tr>
<tr><td>时间</td><td>镜头时长、关键动作节拍</td><td>动画师自己猜节奏</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>每个镜头先做灰度 blockout，确认剪影和空间关系，再进细节。</li><li>摄影机运动用 3 个关键帧标出起点、中段、终点；不要只给“推近”。</li><li>角色脚底与地面接触要标出来；悬空是 layout 最常见的穿帮。</li><li>把镜头号和资产名对应表交给动画、灯光、合成，避免同名资产覆盖。</li></ol>
<p>验收时按成片帧率播放，不看单帧。单帧好看但运动不顺，说明 layout 的路径有问题。</p>`,
    en: `<h2>Layout: turn a shot into a handoffable space</h2>
<p>Layout is not pretty composition. It fixes camera, blocking, scale and motion path so the next person does not guess. A usable layout shot can be picked up by another animator.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Delivery</th><th>Must state</th><th>Common gap</th></tr></thead><tbody>
<tr><td>Camera</td><td>Lens, position, path, frame count</td><td>A still composition with no move</td></tr>
<tr><td>Character</td><td>Blocking, facing, eye line, scale</td><td>Scale does not match set</td></tr>
<tr><td>Set</td><td>Movable props, occlusion</td><td>Foreground hides subject</td></tr>
<tr><td>Time</td><td>Shot length, key action beats</td><td>Animator invents the rhythm</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Start with a grayscale blockout. Confirm silhouette and space before detail.</li><li>Mark camera move with three keys: start, middle, end. “Push in” is not a path.</li><li>Mark foot contact with the ground; floating feet are the most common layout failure.</li><li>Give animation, lighting and comp a shot-to-asset map so same-name assets do not overwrite each other.</li></ol>
<p>Review at final frame rate, not on stills. A beautiful still with bad motion means the layout path is wrong.</p>`
  },
  'lighting-3d': {
    zh: `<h2>三维灯光：先定主光，再谈氛围</h2>
<p>三维灯光最常见的错误是“先加 atmosphere，再补主光”。体积雾、辉光和景深会把方向感吃掉。顺序应该是：主光 → 补光 → 轮廓 → 环境 → 氛围。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>层</th><th>作用</th><th>检查</th></tr></thead><tbody>
<tr><td>主光</td><td>决定时间与方向</td><td>阴影是否朝同一方向</td></tr>
<tr><td>补光</td><td>控制反差</td><td>暗部是否有细节但不发灰</td></tr>
<tr><td>轮廓</td><td>分离主体与背景</td><td>边缘是否过曝</td></tr>
<tr><td>环境</td><td>提供反射与天光</td><td>HDRI 是否与场景匹配</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>先关掉所有氛围层，只留主光看剪影；剪影不成立，氛围救不了。</li><li>用同一套灯光 rig 覆盖所有镜头，单镜头特殊灯要记录原因。</li><li>反射和折射单独渲一层，后期可调；全部烘进 beauty 会锁死。</li><li>输出前看10% 灰和肤色，不看“亮不亮”；曝光以中间调为准。</li></ol>
<p>如果渲染时间不够，先减氛围层，不要减主光采样；主光噪声会毁掉整个镜头。</p>`,
    en: `<h2>3D lighting: key light first, atmosphere later</h2>
<p>The most common 3D lighting mistake is adding atmosphere before the key. Volumetrics, glow and depth of field erase direction. The order is key → fill → rim → environment → atmosphere.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Layer</th><th>Role</th><th>Check</th></tr></thead><tbody>
<tr><td>Key</td><td>Sets time and direction</td><td>Do shadows fall one way?</td></tr>
<tr><td>Fill</td><td>Controls contrast</td><td>Shadow detail without milkiness</td></tr>
<tr><td>Rim</td><td>Separates subject from background</td><td>Edges not blown</td></tr>
<tr><td>Environment</td><td>Reflection and sky</td><td>HDRI matches the set</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Turn off all atmosphere and judge the silhouette on key light alone. If the silhouette fails, atmosphere cannot save it.</li><li>Use one lighting rig across shots; record why a shot needs a special light.</li><li>Render reflection and refraction as a separate pass so post can adjust. Baking them into beauty locks them.</li><li>Check 10% gray and skin, not “brightness”; expose for the midtones.</li></ol>
<p>If render time runs short, cut atmosphere passes before key-light samples. Key noise ruins the whole shot.</p>`
  },
  'materials': {
    zh: `<h2>材质：先定尺度，再调粗糙度</h2>
<p>材质看起来假，通常不是贴图不够大，而是纹理尺度错了。一块木头的纹理在 1 米和 10 厘米下不是同一张图；没有尺度参考，粗糙度也会调错。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>材质</th><th>先定</th><th>常见错误</th></tr></thead><tbody>
<tr><td>木材</td><td>纹理方向、板宽</td><td>一张图铺满整面墙</td></tr>
<tr><td>金属</td><td>拉丝方向、粗糙度</td><td>全部镜面，像塑料</td></tr>
<tr><td>布料</td><td>经纬密度、褶皱尺度</td><td>纹理比褶皱还大</td></tr>
<tr><td>皮肤</td><td>毛孔尺度、油光区</td><td>全脸同一粗糙度</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>放一个已知尺寸的参考物（硬币、A4 纸）在场景里，先校准纹理重复次数。</li><li>粗糙度用 0–1 的灰阶图，不用单一数值；油光、干燥、磨损分开画。</li><li>法线强度先 0.3 起步，逐级加；拉满会让边缘发黑。</li><li>在最终灯光下看材质，不在默认 HDRI 下看；光变了，材质观感全变。</li></ol>
<p>交付前做一张“材质球接触表”：同一材质在强光、逆光、暗部各看一次，确保不是只在一种光下成立。</p>`,
    en: `<h2>Materials: scale first, roughness second</h2>
<p>A material looks fake not because the texture is low resolution, but because its scale is wrong. Wood grain at one meter and at ten centimeters is not the same image. Without a scale reference, roughness is also wrong.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Material</th><th>Define first</th><th>Common error</th></tr></thead><tbody>
<tr><td>Wood</td><td>Grain direction, board width</td><td>One tile stretched across a wall</td></tr>
<tr><td>Metal</td><td>Brush direction, roughness</td><td>All mirror, reads as plastic</td></tr>
<tr><td>Cloth</td><td>Weave density, fold scale</td><td>Texture larger than folds</td></tr>
<tr><td>Skin</td><td>Pore scale, oily zones</td><td>One roughness for the whole face</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Place a known-size reference (coin, A4 sheet) in the scene and calibrate texture repeats first.</li><li>Use a grayscale roughness map, not one value. Paint oil, dry and worn areas separately.</li><li>Start normal strength at 0.3 and add gradually; maxed-out normals darken edges.</li><li>Judge materials under final lighting, not default HDRI. Change the light and the material reads differently.</li></ol>
<p>Before delivery, make a material contact sheet: one material under hard light, backlight and shadow, to prove it is not only working in one setup.</p>`
  },
  'modeling': {
    zh: `<h2>建模：先剪影，再拓扑，最后 UV</h2>
<p>模型的第一验收标准不是“面数”，是剪影。把模型放进纯黑背景，如果轮廓不能说明它是什么，拓扑再干净也没用。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>阶段</th><th>检查</th><th>返工代价</th></tr></thead><tbody>
<tr><td>剪影</td><td>正面/侧面/背面各看一次</td><td>低，改大型</td></tr>
<tr><td>拓扑</td><td>关节环线、弯曲测试</td><td>中，重布线</td></tr>
<tr><td>UV</td><td>接缝位置、纹理密度</td><td>高，重展 UV</td></tr>
<tr><td>细节</td><td>倒角、磨损、凹凸</td><td>最高，烘培后才发现</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>先做 blockout，确认比例和镜头关系，再进拓扑；不要在错误比例上雕细节。</li><li>关节处至少 3 圈环线，肘、膝、肩单独测试弯曲，不靠平滑修改器硬撑。</li><li>UV 接缝藏在不显眼的位置，纹理密度用棋盘格统一；一个模型多个 UV 集要命名。</li><li>倒角放在最后，但不要晚于烘培；烘培后再加倒角，法线会对不上。</li></ol>
<p>如果模型只出现 2 秒且不特写，不要做全流程高模；用中模 + 法线贴图，把时间给镜头。</p>`,
    en: `<h2>Modeling: silhouette, topology, UV — in that order</h2>
<p>The first acceptance test for a model is not polygon count; it is silhouette. Put it on a black background. If the outline does not tell you what it is, clean topology will not save it.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Stage</th><th>Check</th><th>Cost to redo</th></tr></thead><tbody>
<tr><td>Silhouette</td><td>Front, side, back</td><td>Low; adjust the big forms</td></tr>
<tr><td>Topology</td><td>Joint loops, bend test</td><td>Medium; rewire</td></tr>
<tr><td>UV</td><td>Seam placement, texel density</td><td>High; re-unwrap</td></tr>
<tr><td>Detail</td><td>Bevels, wear, bumps</td><td>Highest; found after baking</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Block out proportions and camera relationship before topology. Do not sculpt detail on wrong proportions.</li><li>Use at least three edge loops at joints; test elbow, knee and shoulder separately instead of relying on a smooth modifier.</li><li>Hide UV seams in less visible places; unify texel density with a checker; name multiple UV sets.</li><li>Bevel late, but before baking. Bevel after baking and the normals no longer match.</li></ol>
<p>If a model appears for two seconds and is not in close-up, skip the full high-poly pipeline. Use a mid-poly model plus normal maps and give the time to the shot.</p>`
  },
  'render': {
    zh: `<h2>渲染：先锁采样，再谈降噪</h2>
<p>渲染噪声不是靠降噪“抹”掉的。采样不够，降噪会把细节一起抹平；采样够，降噪只是最后 10%。先把采样和光线反弹调到稳定，再用降噪收尾。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>参数</th><th>先调</th><th>症状</th></tr></thead><tbody>
<tr><td>采样</td><td>从 64 起，逐级加倍</td><td>暗部噪点、边缘闪烁</td></tr>
<tr><td>反弹</td><td>3–4 次，按场景复杂度</td><td>暗部死黑或过亮</td></tr>
<tr><td>降噪</td><td>最后开，保留细节</td><td>皮肤像塑料、纹理消失</td></tr>
<tr><td>输出</td><td>EXR 多通道</td><td>后期无法单独调光</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>先渲一张 50% 分辨率测试，确认构图、材质和灯；不要直接等 4K。</li><li>把采样翻倍，噪点应明显下降；如果没变，问题在灯光或材质，不在采样。</li><li>降噪前后各存一版，比较毛孔、布料纹理和头发；降噪吃细节就降强度。</li><li>输出 EXR 带 Beauty、Light、Reflection、Depth；交付 MP4 之外，保留可调版本。</li></ol>
<p>渲染农场排队时，先提交低采样预览占位，确认镜头再接高采样；不要用最终参数试错。</p>`,
    en: `<h2>Rendering: lock samples before denoising</h2>
<p>Render noise is not something denoise “wipes away.” With too few samples, denoise flattens detail. With enough samples, denoise is the last 10%. Stabilize samples and light bounces first, then denoise.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Setting</th><th>Tune first</th><th>Symptom</th></tr></thead><tbody>
<tr><td>Samples</td><td>Start at 64, double up</td><td>Shadow noise, edge flicker</td></tr>
<tr><td>Bounces</td><td>3–4, by scene complexity</td><td>Crushed or washed shadows</td></tr>
<tr><td>Denoise</td><td>Last, preserve detail</td><td>Plastic skin, lost texture</td></tr>
<tr><td>Output</td><td>Multi-channel EXR</td><td>No separate light control in post</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Render a 50% test first to confirm composition, materials and light. Do not wait for 4K to discover a problem.</li><li>Double samples; noise should drop clearly. If it does not, the problem is lighting or materials, not samples.</li><li>Save before/after denoise and compare pores, cloth and hair. If detail disappears, lower the strength.</li><li>Output EXR with Beauty, Light, Reflection and Depth. Keep an adjustable version, not only the MP4.</li></ol>
<p>When the farm is queued, submit a low-sample preview to hold the shot, then render final. Do not use final settings as a test.</p>`
  },
  'mg-typography': {
    zh: `<h2>MG 字体：先定网格，再做动画</h2>
<p>字体动画看起来乱，通常不是动画问题，是排版没有网格。先定基线、字距和安全区，再让字动；没有网格，动得越多越乱。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>先定</th><th>数值</th><th>作用</th></tr></thead><tbody>
<tr><td>基线网格</td><td>按画面高度 8–12 等分</td><td>多行字对齐</td></tr>
<tr><td>字距</td><td>中文 0，英文 -2% 至 +2%</td><td>避免过松或挤</td></tr>
<tr><td>安全区</td><td>竖屏上下各留 12%</td><td>平台 UI 不挡字</td></tr>
<tr><td>字重</td><td>最多 2 种</td><td>层级清楚</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>字体授权先查商用范围；标题字和正文字分开授权，不要默认“下载就能用”。</li><li>动画只做 2–3 种运动：位移、遮罩、字重变化；不要每个字都飞。</li><li>中英混排时，英文用中文基线的 80%–90% 字号，视觉才齐。</li><li>输出前在手机尺寸看一遍，最小字号不小于 24px（按 1080 宽）。</li></ol>
<p>如果客户要求“所有字都动”，先给一条 5 秒样片；动效过多时，信息会被动画吃掉。</p>`,
    en: `<h2>MG typography: grid first, animation second</h2>
<p>Type animation looks messy not because of the animation, but because there is no grid. Set baseline, tracking and safe area first, then move the type. Without a grid, more motion means more mess.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Define first</th><th>Value</th><th>Purpose</th></tr></thead><tbody>
<tr><td>Baseline grid</td><td>Divide frame height into 8–12 rows</td><td>Align multiple lines</td></tr>
<tr><td>Tracking</td><td>Chinese 0, English -2% to +2%</td><td>Avoid loose or cramped lines</td></tr>
<tr><td>Safe area</td><td>12% top and bottom on vertical</td><td>Platform UI does not cover text</td></tr>
<tr><td>Weights</td><td>Two maximum</td><td>Clear hierarchy</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Check the font license for commercial use. Display and body fonts are licensed separately; “downloadable” is not “usable.”</li><li>Use two or three motions only: position, mask, weight change. Do not fly every letter.</li><li>In mixed Chinese/English, set English at 80–90% of the Chinese size on the same baseline.</li><li>Review at phone size; minimum type is 24px at 1080 width.</li></ol>
<p>If the client asks for “all the type to move,” cut a five-second sample first. Too much motion eats the message.</p>`
  },
  'stop-motion-set': {
    zh: `<h2>定格场景：先定比例，再定光</h2>
<p>定格片的场景不是“缩小版真实世界”，而是一个需要被手伸进去的工作台。比例、景深和灯光稳定性，比精致程度更早决定成片质量。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>项目</th><th>现场做法</th><th>失败信号</th></tr></thead><tbody>
<tr><td>比例</td><td>先定 1:6 或 1:12，所有道具同一比例</td><td>手和道具比例不对</td></tr>
<tr><td>景深</td><td>小光圈 + 足够光，避免前景虚</td><td>只有主体清楚，场景糊</td></tr>
<tr><td>灯光</td><td>锁定灯位、用遮光板，不用自动曝光</td><td>帧与帧之间亮度跳</td></tr>
<tr><td>替换件</td><td>每个动作备 2–3 个口型/手势</td><td>拍到一半手不够用</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>先拍 10 帧测试，检查手伸进去会不会挡光、碰景。</li><li>所有灯用夹具固定并标记位置；移动后要能回到同一刻度。</li><li>用定格软件锁曝光和白平衡，关掉相机自动功能。</li><li>拍完一个镜头立刻备份，定格素材丢一帧就要重拍整段。</li></ol>
<p>如果场景需要演员手入镜，先排练走位；手是最容易穿帮的“道具”。</p>`,
    en: `<h2>Stop-motion sets: scale first, light second</h2>
<p>A stop-motion set is not a miniature real world. It is a workbench a hand must fit into. Scale, depth of field and light stability decide quality earlier than fine detail.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Item</th><th>On-set practice</th><th>Failure signal</th></tr></thead><tbody>
<tr><td>Scale</td><td>Choose 1:6 or 1:12; all props share it</td><td>Hand and prop scale disagree</td></tr>
<tr><td>Depth</td><td>Small aperture + enough light</td><td>Subject sharp, set mush</td></tr>
<tr><td>Light</td><td>Lock positions, use flags, no auto exposure</td><td>Brightness jumps between frames</td></tr>
<tr><td>Replacements</td><td>Two or three mouths/hands per action</td><td>Run out mid-shot</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Shoot a ten-frame test: does the hand block light or hit the set?</li><li>Clamp every light and mark its position; after a move you must return to the same mark.</li><li>Lock exposure and white balance in the capture software; disable camera automation.</li><li>Back up after every shot. One lost frame means reshooting the whole section.</li></ol>
<p>If a hand enters frame, rehearse the move. The hand is the prop most likely to break the illusion.</p>`
  },
  'model-comparison': {
    zh: `<h2>模型对比：先写测试协议，再看画面</h2>
<p>“哪个模型更好”没有统一答案。有效的对比必须先固定输入、时长、分辨率和评审问题；否则只是两支不同风格的样片。2026 年 11 月的模型版本变化很快，任何分数都要带日期和版本号。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>固定项</th><th>写法</th><th>不固定会怎样</th></tr></thead><tbody>
<tr><td>提示词</td><td>同一段，逐字一致</td><td>比的是写提示词能力</td></tr>
<tr><td>时长/分辨率</td><td>同一时长、同一比例</td><td>长片自然更容易露馅</td></tr>
<tr><td>评审问题</td><td>只问“手/文字/运动”三项</td><td>变成主观喜好</td></tr>
<tr><td>版本</td><td>记录模型名、日期、额度</td><td>下个月无法复现</td></tr>
</tbody></table></div>
<h3>四镜头测试集</h3>
<ol><li>人物转身：看脸、手、衣服连续性。</li><li>手持产品：看文字、logo、手指数量。</li><li>快速运动：看运动模糊、背景撕裂。</li><li>固定镜头静物：看材质、光线、细节稳定。</li></ol>
<p>每个镜头只回答一个通过/不通过，不写“更好看”。没有通过项，就不要把样片放进客户提案。对比结论要写“在本测试集、本版本、本日期下”，不外推。</p>`,
    en: `<h2>Model comparison: write the protocol before watching the footage</h2>
<p>“Which model is better” has no universal answer. A useful comparison fixes input, duration, resolution and review question; otherwise it is two different style reels. Model versions change fast in November 2026, so any score needs a date and version.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Fixed item</th><th>How</th><th>If not fixed</th></tr></thead><tbody>
<tr><td>Prompt</td><td>Same text, word for word</td><td>Tests prompt-writing, not the model</td></tr>
<tr><td>Duration / resolution</td><td>Same length and ratio</td><td>Longer clips reveal more artifacts</td></tr>
<tr><td>Review question</td><td>Only hands, text, motion</td><td>Turns into taste</td></tr>
<tr><td>Version</td><td>Model name, date, quota</td><td>Not reproducible next month</td></tr>
</tbody></table></div>
<h3>A four-shot test set</h3>
<ol><li>Character turns: face, hands, wardrobe continuity.</li><li>Handheld product: text, logo, finger count.</li><li>Fast motion: blur, background tearing.</li><li>Locked still life: material, light, detail stability.</li></ol>
<p>Each shot gets pass/fail, not “looks better.” If it fails, do not put the sample in a client pitch. State the conclusion as “under this test set, this version, this date,” and do not generalize.</p>`
  },
  'wardrobe-consistency': {
    zh: `<h2>服装一致性：先做“角色表”，再生成镜头</h2>
<p>AI 服装不一致，通常不是模型不行，是参考不够具体。只写“白衬衫、牛仔裤”会得到一百种白衬衫。角色表要写到领型、扣子、面料、磨损和颜色值。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>项目</th><th>写什么</th><th>用途</th></tr></thead><tbody>
<tr><td>轮廓</td><td>宽松/修身、肩线、衣长</td><td>保持剪影</td></tr>
<tr><td>细节</td><td>领型、口袋、扣子数量</td><td>防止每次生成变款</td></tr>
<tr><td>面料</td><td>织法、厚度、光泽</td><td>控制质感</td></tr>
<tr><td>颜色</td><td>HEX 或色卡号</td><td>跨镜头统一</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>先做正面/侧面/背面三视图，确认同一套衣服；不要只做一张正面。</li><li>每个镜头带同一张角色表和 reference image；换镜头不换参考。</li><li>检查领口、袖口、腰线和鞋；这四个位置最容易漂移。</li><li>如果模型支持 seed，固定 seed 只解决一部分；服装结构仍要靠参考图。</li></ol>
<p>交付前把每个镜头截一帧，拼成接触表；一眼能看出哪一帧换了衣服，就重做那一帧。</p>`,
    en: `<h2>Wardrobe consistency: build a character sheet before generating shots</h2>
<p>AI wardrobe drift is usually not a model failure; the reference is not specific enough. “White shirt, jeans” produces a hundred white shirts. A character sheet must specify collar, buttons, fabric, wear and color values.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Item</th><th>Specify</th><th>Purpose</th></tr></thead><tbody>
<tr><td>Silhouette</td><td>Loose/fitted, shoulder, length</td><td>Hold the outline</td></tr>
<tr><td>Detail</td><td>Collar, pockets, button count</td><td>Prevent a new design each generation</td></tr>
<tr><td>Fabric</td><td>Weave, weight, sheen</td><td>Control texture</td></tr>
<tr><td>Color</td><td>HEX or swatch number</td><td>Match across shots</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Make front, side and back views of the same outfit. One front view is not enough.</li><li>Every shot carries the same character sheet and reference image. Do not change reference between shots.</li><li>Check collar, cuff, waistline and shoes; these drift first.</li><li>If the model supports a seed, a fixed seed only solves part. Garment structure still needs references.</li></ol>
<p>Before delivery, grab one frame from each shot and build a contact sheet. If you can see a wardrobe change at a glance, redo that frame.</p>`
  },
  'text-to-video': {
    zh: `<h2>文生视频：一个镜头一个动作</h2>
<p>文生视频最常见的失败是“一句话写三个动作”。模型会把三个动作平均分配，结果每个都不成立。把提示词拆成镜头，每个镜头只写一个动作、一个机位、一个光线方向。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>提示词层</th><th>写什么</th><th>不要写</th></tr></thead><tbody>
<tr><td>主体</td><td>年龄、服装、状态</td><td>抽象性格</td></tr>
<tr><td>动作</td><td>一个可完成的动作</td><td>三个连续动作</td></tr>
<tr><td>机位</td><td>景别、角度、运动</td><td>“电影感”</td></tr>
<tr><td>光</td><td>方向、色温、软硬</td><td>“高级”</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>先跑 3–5 秒测试，不直接生成 20 秒；短镜头通过后再接。</li><li>每个镜头只保留一个动词；动作超过 2 秒就拆成两个镜头。</li><li>检查手、文字、镜面反射和背景人物；这四项是主要穿帮点。</li><li>生成结果按镜头号存档，记录提示词与 seed，方便补拍。</li></ol>
<p>如果客户要求“一镜到底”，先用分镜证明必要；多数一镜到底只是没有剪辑计划。</p>`,
    en: `<h2>Text-to-video: one shot, one action</h2>
<p>The most common text-to-video failure is three actions in one sentence. The model spreads them evenly and none land. Split the prompt into shots; each shot gets one action, one camera, one light direction.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Prompt layer</th><th>Write</th><th>Avoid</th></tr></thead><tbody>
<tr><td>Subject</td><td>Age, wardrobe, state</td><td>Abstract personality</td></tr>
<tr><td>Action</td><td>One completable action</td><td>Three actions in sequence</td></tr>
<tr><td>Camera</td><td>Shot size, angle, move</td><td>“Cinematic”</td></tr>
<tr><td>Light</td><td>Direction, temperature, hardness</td><td>“Premium”</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Test at 3–5 seconds; do not generate 20 seconds first. Connect short shots after they pass.</li><li>Keep one verb per shot. If an action runs over two seconds, split it into two shots.</li><li>Check hands, text, reflections and background people; these break first.</li><li>Archive results by shot number with prompt and seed, so pickups are repeatable.</li></ol>
<p>If the client asks for a one-take film, prove it with a storyboard. Most one-takes are a missing edit plan.</p>`
  },
  'motion-control': {
    zh: `<h2>首尾帧与运镜控制：先定“不能动”的东西</h2>
<p>图生视频的控制点不是“让画面动起来”，而是保持哪些东西不动。人物身份、产品 logo、背景结构，至少锁定两项；全部放开，模型就会自由发挥。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>控制</th><th>做法</th><th>风险</th></tr></thead><tbody>
<tr><td>首帧</td><td>构图、光、服装一次定死</td><td>首帧不清晰，后面全漂</td></tr>
<tr><td>尾帧</td><td>只给终点位置，不给细节</td><td>尾帧太具体，运动被锁死</td></tr>
<tr><td>运镜</td><td>写“推/拉/横移+速度”</td><td>写“炫酷运镜”无法执行</td></tr>
<tr><td>主体</td><td>用遮罩保护脸和 logo</td><td>遮罩太紧，边缘抖动</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>首帧用最终画质，不要用模糊截图；模型会把模糊当风格。</li><li>运镜速度写成“3 秒推近 10%”，不写“缓慢推近”。</li><li>检查运动中的边缘、手指和文字；出现撕裂就降运动幅度。</li><li>首尾帧之间加一个中段参考，长镜头才不容易跑偏。</li></ol>
<p>如果客户给了一张低分辨率产品图，先重拍或重做首帧；不要在坏输入上反复抽卡。</p>`,
    en: `<h2>First/last frame and camera control: decide what must not move</h2>
<p>The control point in image-to-video is not “make it move,” but what stays fixed. Lock at least two of: identity, product logo, background structure. Release everything and the model improvises.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Control</th><th>How</th><th>Risk</th></tr></thead><tbody>
<tr><td>First frame</td><td>Lock composition, light, wardrobe</td><td>A soft first frame drifts throughout</td></tr>
<tr><td>Last frame</td><td>Give end position, not detail</td><td>Too specific and motion locks</td></tr>
<tr><td>Camera</td><td>“Push/pull/track + speed”</td><td>“Cool camera move” cannot execute</td></tr>
<tr><td>Subject</td><td>Mask face and logo</td><td>Too tight a mask jitters edges</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Use a final-quality first frame, not a blurry screenshot; the model treats blur as style.</li><li>Write speed as “push in 10% over three seconds,” not “slow push.”</li><li>Check edges, fingers and text in motion; if they tear, reduce the move.</li><li>Add a mid-reference between first and last frame; long shots drift less.</li></ol>
<p>If the client sends a low-resolution product image, reshoot or rebuild the first frame. Do not gamble on bad input.</p>`
  },
  'digital-human-lipsync': {
    zh: `<h2>数字人口型：先解决“像谁”，再解决“像在说”</h2>
<p>数字人看起来假，通常不是口型不准，而是脸、牙、舌头和呼吸不对。口型只对齐元音，辅音和齿音会露馅。先确认肖像授权，再做 10 秒测试。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>检查</th><th>看什么</th><th>失败信号</th></tr></thead><tbody>
<tr><td>牙</td><td>闭合时的齿列</td><td>牙齿糊成一片</td></tr>
<tr><td>舌</td><td>t/d/l 音</td><td>舌头不动</td></tr>
<tr><td>呼吸</td><td>句间停顿</td><td>一口气说完，胸口不动</td></tr>
<tr><td>眼神</td><td>看向镜头/侧方</td><td>瞳孔不移动</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>先拿到本人书面授权，明确使用范围、期限和撤回方式；没有授权不做。</li><li>录 10 秒参考，包含爆破音、齿音和一次笑；不要只录平铺直叙。</li><li>口型对齐后，单独检查牙齿和舌头；这两处最容易穿帮。</li><li>输出前加 0.5 秒头部静止，让观众有呼吸感；全程微动反而假。</li></ol>
<p>如果用于新闻、医疗、金融等高风险场景，必须加“AI 生成”标识，并保留人工审核记录。</p>`,
    en: `<h2>Digital-human lip sync: solve “who it is” before “what it says”</h2>
<p>A digital human looks fake not because lip sync is off, but because face, teeth, tongue and breath are wrong. Lip sync aligns vowels; consonants and sibilants expose it. Clear likeness rights first, then run a ten-second test.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Check</th><th>Watch</th><th>Failure</th></tr></thead><tbody>
<tr><td>Teeth</td><td>Dentition when closed</td><td>Teeth blur into one mass</td></tr>
<tr><td>Tongue</td><td>t/d/l sounds</td><td>Tongue never moves</td></tr>
<tr><td>Breath</td><td>Pauses between sentences</td><td>One breath, chest still</td></tr>
<tr><td>Eyes</td><td>Look to camera/side</td><td>Pupils fixed</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Get written likeness consent with scope, term and withdrawal. No consent, no job.</li><li>Record ten seconds with plosives, sibilants and one laugh. Do not record only flat narration.</li><li>After lip sync, check teeth and tongue separately; they break first.</li><li>Add 0.5 seconds of head stillness before output so the viewer can breathe. Constant micro-motion reads fake.</li></ol>
<p>For news, medical or financial use, add an “AI-generated” label and keep a human review record.</p>`
  },
  'ai-disclosure': {
    zh: `<h2>AI 标识：先问“观众会不会误认”，再问平台</h2>
<p>AI 标识不是加一行小字就完成。判断标准是：一个普通观众会不会把合成内容当成真实记录。会，就必须在画面内、发布文案和元数据三处同时说明。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>位置</th><th>做法</th><th>常见错误</th></tr></thead><tbody>
<tr><td>画面</td><td>前 3 秒可见的“AI 生成”角标</td><td>只放片尾，观众已看完</td></tr>
<tr><td>文案</td><td>首句写清哪些部分为 AI</td><td>只写“含 AI 元素”</td></tr>
<tr><td>元数据</td><td>C2PA 或平台 AI 标记</td><td>上传时被平台裁掉</td></tr>
<tr><td>人物</td><td>本人/家属授权</td><td>用公开照片默认授权</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>列出所有合成镜头，标“全 AI / 局部 AI / AI 辅助”；不要笼统写“AI 制作”。</li><li>若模拟真实人物、新闻现场或历史影像，必须更醒目；不能只靠角落小字。</li><li>保留生成记录、提示词、模型版本和人工修改，方便更正。</li><li>发布前让一个没参与的人看 10 秒，问“这是真的吗”；答错就加强标识。</li></ol>
<p>平台规则会变，标识方案要按当前平台要求复查；不要拿旧规则当免责。</p>`,
    en: `<h2>AI disclosure: ask “could viewers mistake it for real,” then ask the platform</h2>
<p>AI disclosure is not a small line at the end. The test is whether an ordinary viewer could take synthetic content as a real record. If yes, disclose in the frame, the caption and the metadata.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Place</th><th>Do</th><th>Common error</th></tr></thead><tbody>
<tr><td>Frame</td><td>Visible “AI-generated” mark in first three seconds</td><td>Only in end card, after viewing</td></tr>
<tr><td>Caption</td><td>First sentence names which parts are AI</td><td>“Contains AI elements”</td></tr>
<tr><td>Metadata</td><td>C2PA or platform AI label</td><td>Stripped on upload</td></tr>
<tr><td>Person</td><td>Subject/family consent</td><td>Public photo treated as consent</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>List every synthetic shot as full AI, partial AI or AI-assisted. Do not write a blanket “made with AI.”</li><li>If it depicts a real person, news event or historical footage, make the label more prominent; a corner footnote is not enough.</li><li>Keep prompts, model versions and human edits for correction.</li><li>Before publishing, ask someone uninvolved to watch ten seconds and answer “is this real?” If they get it wrong, strengthen the label.</li></ol>
<p>Platform rules change. Recheck the current requirement; old rules are not a defense.</p>`
  },
  'ai-music': {
    zh: `<h2>AI 音乐：先定“版权链”，再定风格</h2>
<p>AI 音乐的风险不在“像不像”，而在“能不能用”。生成平台、模型、提示词、后期修改和人声克隆，每一环都可能产生新的权利问题。先写版权链，再生成。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>环节</th><th>要确认</th><th>风险</th></tr></thead><tbody>
<tr><td>平台条款</td><td>商用许可、归属、限制</td><td>免费档不能商用</td></tr>
<tr><td>风格提示</td><td>不模仿在世音乐人</td><td>“某歌手风格”可能侵权</td></tr>
<tr><td>人声</td><td>本人授权或合成标识</td><td>克隆真人声音</td></tr>
<tr><td>后期</td><td>保留工程和生成记录</td><td>平台下架无法申诉</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>确认当前账号/套餐允许商用，截图保存条款与日期。</li><li>提示词不写具体歌手、乐队或受版权保护的歌曲名；写“70 年代放克鼓组”这类风格描述。</li><li>人声克隆必须本人书面授权；死者声音不因“纪念”自动可用。</li><li>交付时给客户一份“音乐来源与许可”一页纸，别只交 MP3。</li></ol>
<p>如果平台条款不允许再许可，客户就不能把音乐用于投流；这一点在报价前说清。</p>`,
    en: `<h2>AI music: define the rights chain before the style</h2>
<p>The risk in AI music is not “does it sound real,” but “can it be used.” Platform, model, prompt, post edits and voice cloning can each create a new rights issue. Write the rights chain before generating.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Link</th><th>Confirm</th><th>Risk</th></tr></thead><tbody>
<tr><td>Platform terms</td><td>Commercial use, attribution, limits</td><td>Free tier may forbid commercial use</td></tr>
<tr><td>Style prompt</td><td>Do not imitate a living artist</td><td>“In the style of X” can infringe</td></tr>
<tr><td>Voice</td><td>Consent or synthetic label</td><td>Cloning a real voice</td></tr>
<tr><td>Post</td><td>Keep project and generation record</td><td>No appeal after a takedown</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>Confirm the current account or plan allows commercial use; save the terms and date.</li><li>Do not name a specific artist, band or copyrighted song in the prompt. Describe style, e.g. “1970s funk drum kit.”</li><li>Voice cloning needs written consent. A deceased person's voice is not automatically available for “tribute.”</li><li>Deliver a one-page music source and license note, not only an MP3.</li></ol>
<p>If the platform terms forbid sublicensing, the client cannot use the track in paid media. Say that before quoting.</p>`
  },
  'ai-replacement': {
    zh: `<h2>AI 换脸/换声：先过授权，再谈效果</h2>
<p>换脸和换声的底线不是“像不像”，是“本人是否同意、观众是否知道”。没有授权的真实人物、逝者、未成年人，不做；做了也不能发。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>对象</th><th>要求</th><th>禁止</th></tr></thead><tbody>
<tr><td>本人</td><td>书面授权、范围、期限</td><td>用公开剧照默认同意</td></tr>
<tr><td>未成年人</td><td>监护人授权 + 保护措施</td><td>任何性感化/羞辱性换脸</td></tr>
<tr><td>逝者</td><td>家属/遗产方授权</td><td>“纪念”名义默认可用</td></tr>
<tr><td>公众人物</td><td>本人授权 + 明确标识</td><td>政治、广告背书暗示</td></tr>
</tbody></table></div>
<h3>项目级检查</h3>
<ol><li>授权书写明媒介、地域、期限、是否可再许可、撤回方式。</li><li>成片前 3 秒加“合成影像”标识；发布文案同样说明。</li><li>保留原素材、生成记录和人工审核；出现争议能立即下架。</li><li>客户若要求“看不出是 AI”，拒绝；隐蔽化本身就是风险。</li></ol>
<p>涉及新闻、政治、金融、医疗的换脸，不做；这类内容的误认成本远高于制作费。</p>`,
    en: `<h2>AI face/voice replacement: consent before quality</h2>
<p>The floor for face and voice replacement is not likeness; it is whether the person agreed and whether the viewer knows. No real person without consent, no deceased person, no minor. If you do it, you cannot publish it.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Subject</th><th>Requirement</th><th>Prohibited</th></tr></thead><tbody>
<tr><td>The person</td><td>Written consent, scope, term</td><td>Public stills treated as consent</td></tr>
<tr><td>Minor</td><td>Guardian consent + safeguards</td><td>Any sexualized or humiliating swap</td></tr>
<tr><td>Deceased</td><td>Family/estate consent</td><td>“Tribute” as automatic permission</td></tr>
<tr><td>Public figure</td><td>Consent + clear label</td><td>Political or ad endorsement implication</td></tr>
</tbody></table></div>
<h3>Project-level checks</h3>
<ol><li>The release states media, territory, term, sublicensing and withdrawal.</li><li>Put a “synthetic image” label in the first three seconds and in the caption.</li><li>Keep source, generation record and human review; if disputed, pull it down fast.</li><li>If the client asks for “undetectable AI,” refuse. Concealment is the risk.</li></ol>
<p>Do not do face swaps for news, politics, finance or medical content. The cost of mistaken identity is far above the production fee.</p>`
  },
  'camera-obscura': {
    zh: `<h2>暗箱不是“古代相机”，是投影几何</h2>
<p>暗箱的关键不是镜头，是小孔成像：光线穿过小孔，在暗面形成倒像。它证明“影像可以被投射”，但还不能被固定。理解这一点，才能理解后来摄影为什么先解决“定影”，而不是先解决“清晰”。</p>
<h3>常见误读</h3>
<p>把暗箱说成“第一台相机”不准确。它是光学装置，没有感光材料；达盖尔等人的贡献是把影像固定下来。另一个误读是“小孔越小越清晰”——孔太小会衍射，反而变软。</p>
<h3>对今天的一个用处</h3>
<p>拍室内强逆光时，暗箱思维提醒你：画面里的亮部会投射到暗部，遮光比加灯更重要。先挡住不需要的光，再决定哪里需要补。</p>`,
    en: `<h2>The camera obscura is not an ancient camera; it is projection geometry</h2>
<p>The key is not a lens but a small aperture: light passes through a hole and forms an inverted image on a dark surface. It proves an image can be projected, not fixed. That explains why photography first solved fixation, not sharpness.</p>
<h3>Common misreading</h3>
<p>Calling it “the first camera” is inaccurate. It is an optical device with no sensitive material. Daguerre and others fixed the image. Another misreading: “smaller hole, sharper image.” Too small a hole diffracts and softens.</p>
<h3>One use today</h3>
<p>In a bright interior with strong backlight, the camera-obscura mindset says light from bright areas lands in dark areas. Blocking unwanted light matters more than adding a lamp. Block first, then decide where to fill.</p>`
  },
  'lumiere': {
    zh: `<h2>卢米埃尔的价值不是“第一次放映”，是“把摄影机搬到街上”</h2>
<p>1895 年的放映常被记成“电影诞生”，但更关键的是他们把机器从棚里带出去，拍火车、工厂、街道。真实场景 + 单镜头 + 固定机位，构成了最早的可复制生产模式。</p>
<h3>常见误读</h3>
<p>“卢米埃尔只拍纪实”不准确。他们也拍安排好的喜剧短片。另一个误读是“观众第一次看到火车进站就逃跑”——这是后来被夸大的传说，不能当史实引用。</p>
<h3>对今天的一个用处</h3>
<p>当你只有一台机器时，先找一个真实发生、可重复的动作，把机位摆好，等它发生。不要先写复杂调度。</p>`,
    en: `<h2>The Lumières' value is not “the first screening” but taking the camera into the street</h2>
<p>The 1895 screening is often called the birth of cinema. More important: they moved the machine out of the studio and filmed trains, factories and streets. Real scene, single shot, fixed camera: the first repeatable production model.</p>
<h3>Common misreading</h3>
<p>“The Lumières only shot documentary” is inaccurate; they also made staged comic shorts. Another myth: “audiences ran from the arriving train.” It was exaggerated later and should not be cited as fact.</p>
<h3>One use today</h3>
<p>With one camera, find a real, repeatable action, place the camera and wait. Do not start with complex blocking.</p>`
  },
  'montage': {
    zh: `<h2>蒙太奇不是“快速剪”，是“两个镜头生出第三个意思”</h2>
<p>库里肖夫实验的核心是：同一张脸，接不同镜头，观众读出不同情绪。意义不在单个镜头里，在镜头之间的关系里。把蒙太奇等同于快切，是把它降级成节奏技巧。</p>
<h3>常见误读</h3>
<p>“蒙太奇等于联想”不完整。它也包括叙事省略、平行、交叉和冲突。另一个误读是把“苏联蒙太奇”当成唯一来源；格里菲斯等人也在并行发展剪辑语法。</p>
<h3>对今天的一个用处</h3>
<p>当一场戏情绪不对，先别加音乐。换一个反应镜头，或把两个镜头顺序对调，意义可能就变了。</p>`,
    en: `<h2>Montage is not fast cutting; it is a third meaning born between two shots</h2>
<p>The Kuleshov experiment: the same face, different following shots, different emotions read by viewers. Meaning is not inside one shot; it is between shots. Reducing montage to fast cutting turns it into a rhythm trick.</p>
<h3>Common misreading</h3>
<p>“Montage equals association” is incomplete. It also covers narrative ellipsis, parallel action, cross-cutting and conflict. Another misreading treats Soviet montage as the only origin; Griffith and others developed editing grammar in parallel.</p>
<h3>One use today</h3>
<p>When a scene feels wrong, do not add music first. Change one reaction shot or swap two shots; the meaning may change.</p>`
  },
  'sound-era': {
    zh: `<h2>有声片不是“给默片加声音”，是重写拍摄方式</h2>
<p>1927 年之后，摄影机因为同步录音变得笨重，机位减少，演员开始按走位说台词。声音不是后期附加，它改变了现场调度、布景和表演。</p>
<h3>常见误读</h3>
<p>“有声片一出现，默片立刻消失”不准确。过渡期持续了几年，许多影院仍放默片；也有“部分有声”混合版本。另一个误读是“早期有声片都很舞台化”——有些导演很快用移动和景别破了舞台感。</p>
<h3>对今天的一个用处</h3>
<p>先决定现场要不要同期声。要，就按声音设计机位和走位；不要，就别让演员假装在说台词。</p>`,
    en: `<h2>Sound film did not add sound to silent film; it rewrote how films were shot</h2>
<p>After 1927, synchronized sound made cameras heavy, reduced setups, and made actors speak on blocking. Sound was not a post add-on; it changed staging, sets and performance.</p>
<h3>Common misreading</h3>
<p>“Silent film vanished the moment sound arrived” is inaccurate. The transition took years; many cinemas still showed silents, and some films were part-sound. Another misreading says early sound films were all stagey; some directors broke the stage with movement and framing quickly.</p>
<h3>One use today</h3>
<p>Decide before the shoot whether you need sync sound. If yes, design camera and blocking around sound. If no, do not ask actors to pretend they are speaking.</p>`
  },
  'technicolor': {
    zh: `<h2>特艺彩色不是“滤镜”，是三卷胶片的分光</h2>
<p>三色特艺把红、绿、蓝分别记录在三卷黑白底片上，再通过染色和套印合成彩色。它的高饱和不是后期调出来的，是工艺和打光共同的结果。</p>
<h3>常见误读</h3>
<p>“特艺彩色就是高饱和”不准确。早期二色特艺偏红绿，三色才完整；不同年代的显影和拷贝也会改变观感。另一个误读是“所有经典彩色片都是特艺”——米高梅等也用其他工艺。</p>
<h3>对今天的一个用处</h3>
<p>想模仿特艺，不要只拉饱和度。先控制服装和美术的色相，再用硬光制造高对比；后期只做轻微曲线。</p>`,
    en: `<h2>Technicolor is not a filter; it is three-strip separation</h2>
<p>Three-strip Technicolor recorded red, green and blue on separate black-and-white negatives, then dyed and printed them together. Its saturation is not a post look; it is process plus lighting.</p>
<h3>Common misreading</h3>
<p>“Technicolor means high saturation” is inaccurate. Early two-color leaned red-green; three-color was fuller. Processing and prints of different eras changed the look. Another misreading assumes every classic color film was Technicolor; MGM and others used other processes.</p>
<h3>One use today</h3>
<p>To evoke Technicolor, do not just raise saturation. Control costume and art-department hues first, use hard light for contrast, and keep the grade to a small curve.</p>`
  },
  '16mm': {
    zh: `<h2>16mm 不是“廉价 35mm”，是另一套工作方式</h2>
<p>16mm 的胶片面积小，宽容度和细节少，但机器轻、可以手持、可以进真实场景。它带来的不是“低画质”，是更近的身体和更快的拍摄。</p>
<h3>常见误读</h3>
<p>“16mm 只用于业余”不准确。新闻、纪录片、实验电影和部分广告都用过。另一个误读是“颗粒就是 16mm 的全部”——镜头、曝光和冲洗同样决定质感。</p>
<h3>对今天的一个用处</h3>
<p>用数码模仿 16mm，不要只加颗粒。先接受低动态范围：保护高光，允许暗部有噪点；再用轻便机位靠近人物。</p>`,
    en: `<h2>16mm is not “cheap 35mm”; it is another way of working</h2>
<p>16mm has a smaller negative, less latitude and less detail, but light cameras, handheld work and real locations. It did not bring “low quality”; it brought closer bodies and faster shooting.</p>
<h3>Common misreading</h3>
<p>“16mm is amateur only” is inaccurate. News, documentary, experimental film and some ads used it. Another misreading reduces 16mm to grain; lenses, exposure and processing also create the texture.</p>
<h3>One use today</h3>
<p>To imitate 16mm digitally, do not just add grain. Accept lower dynamic range: protect highlights, allow shadow noise, and move the camera closer with a lighter rig.</p>`
  },
  'video-tape': {
    zh: `<h2>录像带不是“低清”，是即时回放和可覆盖</h2>
<p>磁带把拍摄从“冲洗后才知道”变成“现场能看”。它带来即时回放、可重录和多机位直播，也带来代际损失和存档难题。技术改变的不只是画质，是生产流程。</p>
<h3>常见误读</h3>
<p>“录像带一定比胶片差”不完整。广播级磁带在当时可以很清晰；差别在分辨率、动态范围和介质寿命。另一个误读是“磁带会永久保存”——磁粉脱落和机器停产后，存档会失效。</p>
<h3>对今天的一个用处</h3>
<p>现场回放能救一场戏，但不要依赖它做最终判断；监视器的色彩和压缩不等于成片。重要素材当天备份两份。</p>`,
    en: `<h2>Video tape is not “low definition”; it is instant playback and overwrite</h2>
<p>Tape changed production from “wait for processing” to “watch on set.” It brought instant playback, re-record and multi-camera live work, plus generation loss and archive problems. The technology changed workflow, not only image quality.</p>
<h3>Common misreading</h3>
<p>“Tape is always worse than film” is incomplete. Broadcast tape was sharp for its era; the difference was resolution, latitude and media life. Another misreading says tape lasts forever; binder shedding and dead machines kill archives.</p>
<h3>One use today</h3>
<p>On-set playback can save a scene, but do not use it as the final judge; monitor color and compression are not the film. Back up important media twice the same day.</p>`
  },
  'digital-cinema': {
    zh: `<h2>数字电影不是“把胶片换成传感器”，是交付标准变了</h2>
<p>DCI 规范把分辨率、色彩、声音和加密打包成一套可互操作的影院交付。它让电影从“每个影院自己调”变成“全国/全球同一版”。</p>
<h3>常见误读</h3>
<p>“数字电影就是 4K”不准确。2K 和 4K 都在 DCI 范围内，关键是色彩空间、亮度、帧率和打包格式。另一个误读是“数字没有成本”——母版、加密、密钥和影院服务器维护都是成本。</h3>
<h3>对今天的一个用处</h3>
<p>做投屏或影院放映，先问交付标准，不要只问分辨率。亮度、色彩和声音格式不匹配，4K 也会难看。</p>`,
    en: `<h2>Digital cinema is not “film replaced by a sensor”; delivery standards changed</h2>
<p>DCI packaged resolution, color, sound and encryption into an interoperable cinema delivery. It moved cinema from “each theater adjusts” to “one version worldwide.”</p>
<h3>Common misreading</h3>
<p>“Digital cinema means 4K” is inaccurate. 2K and 4K are both DCI; color space, luminance, frame rate and package format matter. Another misreading says digital has no cost; masters, encryption, keys and server maintenance all cost.</p>
<h3>One use today</h3>
<p>For a screening, ask for the delivery standard, not only resolution. Mismatched brightness, color and sound make 4K look bad.</p>`
  },
  'smartphone-video': {
    zh: `<h2>手机视频不是“小相机”，是连着平台和观众的制作系统</h2>
<p>手机的优势不只是轻，而是拍完就能剪、能发、能看反馈。它把“拍摄—后期—发布”压成一个循环，也让画面比例、字幕和安全区从一开始就必须考虑。</p>
<h3>常见误读</h3>
<p>“手机画质不如相机，所以不重要”忽略了观看场景。多数观众在手机上、开声音之前先看字幕；清晰度之外，构图和声音更决定完播。另一个误读是“手机不需要稳定”——轻机器更容易抖。</p>
<h3>对今天的一个用处</h3>
<p>先用手机拍一条 30 秒测试，按最终平台的比例和字幕位置；通过后再上大机器。不要拿相机参数替代观众测试。</p>`,
    en: `<h2>Smartphone video is not a small camera; it is a production system wired to platforms and viewers</h2>
<p>The advantage is not only weight. You can shoot, edit, publish and get feedback in one loop. That forces aspect ratio, subtitles and safe area into the shoot from the start.</p>
<h3>Common misreading</h3>
<p>“Phone image quality is worse, so it does not matter” ignores viewing context. Most viewers are on phones and read subtitles before sound; composition and audio decide completion more than resolution. Another misreading says phones need no stabilization; light cameras shake more.</p>
<h3>One use today</h3>
<p>Shoot a 30-second test on the phone at final platform ratio and subtitle position. Only move to a larger camera after it passes. Do not replace an audience test with camera specs.</p>`
  },
  'streaming': {
    zh: `<h2>流媒体不是“把片子上传”，是码率、缓存和版权的重新分配</h2>
<p>流媒体把交付从“一张母版”变成“多档码率 + 多终端 + 多地区”。观众看到的是自适应码率，不是你的原片；网络、设备和版权规则共同决定最终画面。</p>
<h3>常见误读</h3>
<p>“上传 4K 就等于观众看到 4K”不准确。平台会按带宽和设备转码；很多观众实际看到的是 1080p 或更低。另一个误读是“流媒体没有排期”——审核、字幕、地区版权都会影响上线。</h3>
<h3>对今天的一个用处</h3>
<p>交付前用平台的实际播放器看一遍，不要只在本地监视器看。检查暗部、字幕和片头 5 秒；转码最先把这三处弄坏。</p>`,
    en: `<h2>Streaming is not “upload the film”; it redistributes bitrate, caching and rights</h2>
<p>Streaming turns delivery from one master into multiple bitrates, devices and regions. Viewers see adaptive bitrate, not your master; network, device and rights decide the final image.</p>
<h3>Common misreading</h3>
<p>“Upload 4K and viewers see 4K” is inaccurate. Platforms transcode by bandwidth and device; many viewers see 1080p or less. Another misreading says streaming has no schedule; review, subtitles and regional rights all affect launch.</p>
<h3>One use today</h3>
<p>Before delivery, watch on the platform's actual player, not only a local monitor. Check shadows, subtitles and the first five seconds; transcode breaks those first.</p>`
  },
  'corporate-video-structure': {
    zh: `<h2>这类项目最常见的三个失败</h2>
<ol><li><strong>把六拍写成六个部门。</strong>每一拍都变成“我们有什么”，没有一个人、一个动作或一个代价。修法是每一拍只留一个能被拍到的证据。</li><li><strong>把“结果”写成形容词。</strong>“高效、专业、领先”无法验证；换成一次质检、一次交付或一个前后对比。</li><li><strong>老板讲话占掉三分之一。</strong>除非讲话本身有信息，否则用字幕和现场声替代；把时间给做事的人。</li></ol>
<p>验收时问三个问题：看完知道这家公司做什么吗？相信吗？记得住一个人吗？三个都答不出，六拍只是换了顺序的简介。</p>`,
    en: `<h2>The three most common failures in this format</h2>
<ol><li><strong>Six beats become six departments.</strong> Every beat says “what we have,” with no person, action or cost. Fix: one filmable proof per beat.</li><li><strong>“Result” becomes adjectives.</strong> “Efficient, professional, leading” cannot be verified. Replace with one inspection, one delivery or one before/after.</li><li><strong>The executive speech takes a third of the film.</strong> Unless the speech carries information, use captions and location sound; give the time to people doing the work.</li></ol>
<p>At acceptance, ask: do you know what the company does, do you believe it, and do you remember one person? If all three fail, the six beats are only a reordered profile.</p>`
  },
  'sports-video-structure': {
    zh: `<h2>这类项目最常见的三个失败</h2>
<ol><li><strong>只有高光，没有代价。</strong>全是冲刺和慢动作，观众不知道难在哪。加一次失败、一次呼吸或一次犹豫。</li><li><strong>把成绩当故事。</strong>名次只给结论，不给过程；先拍目标，再拍阻碍，最后拍变化。</li><li><strong>音乐盖住现场。</strong>呼吸、脚步、教练指令比燃向音乐更有力；音乐只在转折处进。</li></ol>
<p>验收时关掉声音看一遍：如果身体和空间还能讲故事，画面成立；如果全靠音乐，回去补拍动作。</p>`,
    en: `<h2>The three most common failures in this format</h2>
<ol><li><strong>Highlights without cost.</strong> All sprinting and slow motion; viewers do not know what is hard. Add one failure, one breath or one hesitation.</li><li><strong>Results instead of story.</strong> A placing gives a conclusion, not a process. Shoot goal, obstacle, change.</li><li><strong>Music covers the location.</strong> Breath, feet and a coach's instruction are stronger than hype. Let music enter only at the turn.</li></ol>
<p>Watch once with sound off. If body and space still tell the story, the images work. If music carries everything, go back for action.</p>`
  },
  'food-video-structure': {
    zh: `<h2>这类项目最常见的三个失败</h2>
<ol><li><strong>只拍成品。</strong>没有过程，观众不知道时间花在哪。至少拍一个从生到熟的变化。</li><li><strong>声音全用音乐。</strong>切、煮、倒、咀嚼是美食片的一半信息；现场声至少保留两处。</li><li><strong>灯太亮，食物发平。</strong>正面柔光会抹掉质地；用侧逆光拍蒸汽和油光，暗部留一点。</li></ol>
<p>验收时看 10 秒：饿不饿、想不想知道怎么做。两个都没有，说明只拍了菜单，没有拍食物。</p>`,
    en: `<h2>The three most common failures in this format</h2>
<ol><li><strong>Only finished dishes.</strong> Without process, viewers cannot see where time went. Shoot at least one raw-to-cooked change.</li><li><strong>All music, no sound.</strong> Chopping, boiling, pouring and chewing are half the information. Keep at least two location sounds.</li><li><strong>Too bright, flat food.</strong> Frontal soft light erases texture. Use side-back light for steam and oil, and keep some shadow.</li></ol>
<p>Watch ten seconds: are you hungry, do you want to know how? If neither, you shot a menu, not food.</p>`
  },
  'real-estate-video-structure': {
    zh: `<h2>这类项目最常见的三个失败</h2>
<ol><li><strong>广角大全景。</strong>空间看起来大，但不知道住起来怎样。用一个居住问题带出每个空间。</li><li><strong>没有动线。</strong>镜头在房间里跳，观众不知道从哪到哪。跟一条真实路线走。</li><li><strong>灯全开。</strong>顶灯把材质和层次抹平；关掉顶灯，用窗光和反光板，保留暗部。</li></ol>
<p>验收时问：哪个空间解决哪个问题？答不出，说明只是房产资料，不是空间片。</p>`,
    en: `<h2>The three most common failures in this format</h2>
<ol><li><strong>Ultra-wide establishing shots.</strong> The space looks big but not livable. Lead each room with one living problem.</li><li><strong>No route.</strong> The camera jumps around; viewers do not know how rooms connect. Follow one real path.</li><li><strong>All lights on.</strong> Ceiling light flattens material and depth. Turn it off, use window light and a bounce, keep shadow.</li></ol>
<p>Ask: which room solves which problem? If you cannot answer, it is property data, not a spatial film.</p>`
  },
  'fashion-beauty-video-structure': {
    zh: `<h2>这类项目最常见的三个失败</h2>
<ol><li><strong>滤镜先于皮肤。</strong>磨皮和美白把质地抹掉，产品也没有证据。先关滤镜，再打光。</li><li><strong>只拍脸，不拍动作。</strong>挤出、推开、按压的手感比表情更有信息；一个产品一个动作。</li><li><strong>承诺效果。</strong>“立刻变白、三天祛痘”既不可验证，也可能违规；改成使用感和质地。</li></ol>
<p>验收时看侧光下的皮肤：还有毛孔和纹理吗？没有，说明光或后期已经把真实感拿走了。</p>`,
    en: `<h2>The three most common failures in this format</h2>
<ol><li><strong>Filter before skin.</strong> Smoothing and whitening erase texture and leave no product proof. Turn the filter off, then light.</li><li><strong>Face only, no action.</strong> Squeeze, spread and press carry more than expression. One product, one action.</li><li><strong>Efficacy promises.</strong> “Instant whitening, three-day acne cure” is unverifiable and may be illegal. Use sensory language and texture.</li></ol>
<p>At acceptance, look at skin in side light: are pores and texture still there? If not, light or post has taken the realism away.</p>`
  },
  'live-podcast-structure': {
    zh: `<h2>这类项目最常见的三个失败</h2>
<ol><li><strong>开头念履历。</strong>观众不知道今天听什么。前 30 秒先给一个问题或一个冲突。</li><li><strong>每 10 分钟才收一次。</strong>晚进来的人跟不上。每 3–5 分钟给一个完整问题和一个小结论。</li><li><strong>没有备份方案。</strong>掉线、麦克风故障、嘉宾冷场都会发生；备用麦、延时和垫片要提前准备。</li></ol>
<p>验收时从第 20 分钟开始看：还能听懂吗？能，说明分段成立；不能，回去重排问题。</p>`,
    en: `<h2>The three most common failures in this format</h2>
<ol><li><strong>Opening with a CV.</strong> Viewers do not know what today is about. Give a question or conflict in the first 30 seconds.</li><li><strong>Closing every ten minutes.</strong> Late joiners are lost. Give a complete question and small conclusion every 3–5 minutes.</li><li><strong>No backup plan.</strong> Drops, mic failure and dead air happen. Prepare a backup mic, delay and filler.</li></ol>
<p>Start watching at minute 20: can you still follow? If yes, the segments work. If not, reorder the questions.</p>`
  }
};
