// 2026-11-24 content expansion: business-side pages. These add operating
// detail that the existing method cards did not cover: price floor, first
// client, revision limits, budget reserve, schedule back-planning, on-set
// decision rights, portfolio without clients, and zero-budget boundaries.
export const EXPANSION_BUSINESS_20261124 = {
  'method-quote-low': {
    zh: `<h2>报价不是数字，是三档风险</h2>
<p>同一支 60 秒片，报 ¥3,000 和 ¥30,000 的差别不在“贵不贵”，而在谁承担改动、谁承担延期、谁承担版权。把报价拆成三档，客户才知道钱买的是什么。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>档位</th><th>适合</th><th>包含</th><th>不包含</th></tr></thead><tbody>
<tr><td>基础执行</td><td>脚本已定、1 个场景、1 次拍摄</td><td>1 天拍摄、1 轮剪辑、基础字幕</td><td>改脚本、补拍、配音、音乐版权</td></tr>
<tr><td>标准制作</td><td>需要提案、2 个场景、2 轮修改</td><td>前期提案、分镜、2 天拍摄、2 轮修改</td><td>演员、场地、特殊器材</td></tr>
<tr><td>全包</td><td>品牌要一次交付多平台版本</td><td>策划到交付、版权清理、3 个比例</td><td>投流、达人、平台佣金</td></tr>
</tbody></table></div>
<h3>先算保本线，再谈折扣</h3>
<p>把拍摄天数、后期天数、器材租赁、差旅、税费和 10% 意外金相加，除以可交付天数，得到“每天必须收回多少”。低于这条线时，不是让利，是借未来的钱做现在的事。折扣只能打利润，不能打成本。</p>
<h3>付款节点写进报价单</h3>
<ol><li>确认脚本或分镜后收 50%，拍摄前到账；没有这笔钱不开机。</li><li>粗剪确认后收 30%，终交付前收 20%；终稿只在水印版确认后去水印。</li><li>延期由客户造成的，按新增拍摄日计费；天气等不可抗力另计，不混在“修改”里。</li></ul>
<p>报价单最后留一行：<strong>“本报价基于 1 个脚本、2 个场景、2 轮修改；超出部分按新增项报价。”</strong> 这句话比任何口头承诺都管用。</p>`,
    en: `<h2>A quote is not a number; it is three levels of risk</h2>
<p>The difference between ¥3,000 and ¥30,000 for the same 60-second film is not “expensive or cheap.” It is who absorbs changes, delays and rights. Split the quote into three tiers so the client knows what the money buys.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Tier</th><th>Fits</th><th>Includes</th><th>Excludes</th></tr></thead><tbody>
<tr><td>Execution</td><td>Locked script, one location, one shoot</td><td>One shoot day, one edit, basic subtitles</td><td>Script changes, pickups, voice-over, music rights</td></tr>
<tr><td>Standard</td><td>Needs a proposal, two locations, two revisions</td><td>Treatment, storyboard, two shoot days, two revisions</td><td>Talent, location fees, specialty gear</td></tr>
<tr><td>Full package</td><td>Brand needs multi-platform delivery in one go</td><td>Concept to delivery, rights clearance, three aspect ratios</td><td>Media spend, creators, platform fees</td></tr>
</tbody></table></div>
<h3>Find the break-even line before any discount</h3>
<p>Add shoot days, post days, gear rental, travel, tax and a 10% contingency, then divide by deliverable days. That is the minimum you must recover per day. Below it, a discount is not generosity; it is borrowing from a future job. A discount can come out of profit, never out of cost.</p>
<h3>Put payment milestones in the quote</h3>
<ol><li>50% after script or storyboard approval, before the shoot. No money, no camera.</li><li>30% after rough-cut approval, 20% before final delivery. Final files leave only after the watermarked cut is approved.</li><li>Client-caused delays bill as extra shoot days; weather and force majeure are separate, not hidden inside “revisions.”</li></ul>
<p>End the quote with one line: <strong>“Based on one script, two locations and two revisions; additional work is quoted separately.”</strong> That sentence does more than any verbal promise.</p>`
  },
  'method-first-client': {
    zh: `<h2>第一单不靠人脉，靠一个可验证的小交付</h2>
<p>没有客户时，最有效的做法不是发“我可以拍片”的私信，而是做一个 30–60 秒的样本，直接对应某类人的一个具体问题。样本要能被对方在 10 秒内看懂，且能指出“这就是我们”。</p>
<h3>三个来源，按成功率排序</h3>
<ol><li>你已经在的社群：行业群、校友、前同事。先帮一个人解决一个 1 小时内能完成的小问题，不收费，留下可复用的文件。</li><li>本地小商家：咖啡馆、理发店、宠物店。带一个 30 秒样片上门，问“你现在的照片/视频最缺什么”，不要先讲设备。</li><li>公开招募：品牌共创、平台任务。用它练报价和交付，不指望第一单赚钱。</li></ol>
<h3>首单范围要小到能关门</h3>
<p>只接一个场景、一个成片、两轮修改，周期不超过 7 天。首单的目标不是利润，是拿到三样东西：一次完整流程、一个可公开的案例、一个愿意写两句反馈的客户。把“后续合作”写进邮件，但不写进报价。</p>
<h3>第一次会面问四个问题</h3>
<ul><li>这条片子给谁看？</li><li>你希望他们看完做什么？</li><li>现在没有这条片子，会损失什么？</li><li>预算和上线时间哪个更紧？</li></ul>
<p>四个问题答不全，说明项目还没准备好；先卖一个 1 页方案或 1 天咨询，不要直接承诺成片。</p>`,
    en: `<h2>The first client comes from a testable small delivery, not a contact list</h2>
<p>Without clients, the useful move is not a DM saying “I can shoot.” It is a 30–60 second sample aimed at one specific problem for one type of buyer. The sample must be understood in ten seconds and must make them say, “that's us.”</p>
<h3>Three sources, ranked by conversion</h3>
<ol><li>Communities you already belong to: industry groups, alumni, former colleagues. Solve one small problem for one person in under an hour, free, and leave a reusable file behind.</li><li>Local small businesses: cafés, barbers, pet shops. Bring one 30-second sample and ask what their current photos or videos lack; do not start with gear.</li><li>Open calls: brand collaborations and platform briefs. Use them to practice quoting and delivery, not to fund your month.</li></ol>
<h3>Make the first scope small enough to close</h3>
<p>Take one location, one finished piece and two revisions, under seven days. The first job is not for profit. It is for three assets: one complete process, one publishable case and one client willing to write two sentences. Mention future work in the email, not in the quote.</p>
<h3>Ask four questions at the first meeting</h3>
<ul><li>Who watches this?</li><li>What should they do after watching?</li><li>What do you lose without this film?</li><li>Which is tighter, budget or launch date?</li></ul>
<p>If the four answers do not exist, the project is not ready. Sell a one-page treatment or a one-day consultation first; do not promise a finished film.</p>`
  },
  'method-client-revision': {
    zh: `<h2>把“修改”写成可执行条款，而不是情绪</h2>
<p>客户说“感觉不对”，通常不是审美问题，而是没有共同的判断标准。修改条款要解决三件事：改什么、改几轮、改到什么时候算完。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>阶段</th><th>可改</th><th>不可改</th><th>确认方式</th></tr></thead><tbody>
<tr><td>脚本/分镜</td><td>结构、台词、镜头顺序</td><td>已确认的场景和预算</td><td>邮件回复“确认”</td></tr>
<tr><td>粗剪</td><td>节奏、镜头取舍、字幕位置</td><td>补拍、换演员、改脚本</td><td>带时间码的批注</td></tr>
<tr><td>终剪</td><td>错字、音量、片尾信息</td><td>结构调整、音乐更换</td><td>水印版书面确认</td></tr>
</tbody></table></div>
<h3>三轮之后，按新增项报价</h3>
<p>合同写“包含 2 轮修改”，第 3 轮起按小时或按新增剪辑日计费。不是惩罚客户，是让双方看见成本。若客户在第 3 轮提出结构变化，先停，重做一版脚本，再决定是否继续。</p>
<h3>批注要带时间码和“要什么”</h3>
<p>不接受“整体再高级一点”。要求客户写成“00:12 字幕太快，改成停留 2 秒”或“00:20 音乐太满，降到 -18 LUFS”。一条批注只解决一个点，避免来回猜。</p>
<h3>范围蔓延的三个信号</h3>
<ul><li>开始加“顺便”：“顺便加一个产品特写”“顺便换成英文版”。</li><li>决策人换了：原来对接的人不拍板，新领导重新提意见。</li><li>交付物变了：从 1 条片变成 3 个比例、2 个语言、1 个花絮。</li></ul>
<p>出现任意一个，先发一页变更单：新增内容、新增工期、新增费用。客户确认后再动工。</p>`,
    en: `<h2>Write revisions as enforceable terms, not feelings</h2>
<p>When a client says “it doesn't feel right,” it is usually not taste. It is the absence of a shared test. Revision terms must answer three things: what changes, how many rounds, and when it is done.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Stage</th><th>Can change</th><th>Cannot change</th><th>Approval</th></tr></thead><tbody>
<tr><td>Script / storyboard</td><td>Structure, lines, shot order</td><td>Approved locations and budget</td><td>Email reply “approved”</td></tr>
<tr><td>Rough cut</td><td>Pace, shot selection, subtitle position</td><td>Pickups, recasting, script rewrite</td><td>Timecoded notes</td></tr>
<tr><td>Final cut</td><td>Typos, levels, end-card details</td><td>Structural change, new music</td><td>Written approval on watermarked cut</td></tr>
</tbody></table></div>
<h3>After two rounds, quote new work</h3>
<p>The contract includes two revision rounds; round three bills by hour or extra edit day. This is not punishment; it makes cost visible. If round three introduces a structural change, stop, rewrite the script, then decide whether to continue.</p>
<h3>Notes need a timecode and an action</h3>
<p>Do not accept “make it more premium.” Ask for “00:12 subtitle is too fast, hold two seconds” or “00:20 music is too full, bring it to -18 LUFS.” One note solves one point, so nobody guesses.</p>
<h3>Three signals of scope creep</h3>
<ul><li>“By the way” requests: an extra product close-up, an English version, a BTS cut.</li><li>The decision-maker changes: the original contact no longer approves; a new leader restarts notes.</li><li>Deliverables multiply: one film becomes three ratios, two languages and a social cut.</li></ul>
<p>When any appears, send a one-page change order: new scope, new schedule, new cost. Start only after written approval.</p>`
  },
  'method-budget-overrun': {
    zh: `<h2>预算超支，先从三张表找原因</h2>
<p>超支很少是“某项很贵”，多数是漏项、变更和现金时间差。把预算拆成三张表：成本表、现金流表、变更表。三张表对不上，说明还有一个没写出来的假设。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>表</th><th>写什么</th><th>常见漏项</th></tr></thead><tbody>
<tr><td>成本表</td><td>拍摄天数、后期天数、器材、场地、差旅、税费</td><td>运输、保险、加班、素材备份、平台手续费</td></tr>
<tr><td>现金流表</td><td>哪天收钱、哪天付钱</td><td>客户审批周期、发票邮寄、押金退还</td></tr>
<tr><td>变更表</td><td>每次新增的范围、工期、费用</td><td>口头承诺、免费补拍、临时改脚本</td></tr>
</tbody></table></div>
<h3>预备金不是利润</h3>
<p>在总成本上留 10–15% 意外金，单独一行，不进入报价利润。用途只有三个：补拍、延期、器材替换。花掉要记录，没花掉也不能当奖金提前分掉，否则下一次超支没有缓冲。</p>
<h3>超支后的处理顺序</h3>
<ol><li>先停新增采购，确认已发生的应付。</li><li>把变更表按“客户原因 / 己方原因 / 不可抗力”分类。</li><li>客户原因的，发变更单；己方原因的，从预备金出；不可抗力的，按合同条款协商。</li><li>不要用“下一个项目补回来”掩盖，下一单有下一单的成本。</li></ol>
<p>项目结束做一次 30 分钟复盘：哪一项超了 10% 以上、为什么、下次写进哪张表。只写“控制预算”没有用，要写具体动作。</p>`,
    en: `<h2>When the budget overruns, start with three sheets</h2>
<p>Overruns are rarely one expensive item. They are missing line items, changes and cash timing. Split the budget into cost, cash flow and change sheets. If the three do not reconcile, an unwritten assumption is still hiding.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Sheet</th><th>What goes in</th><th>Common omissions</th></tr></thead><tbody>
<tr><td>Cost</td><td>Shoot days, post days, gear, locations, travel, tax</td><td>Transport, insurance, overtime, backups, platform fees</td></tr>
<tr><td>Cash flow</td><td>When money arrives, when it leaves</td><td>Client approval cycles, invoice mail, deposit returns</td></tr>
<tr><td>Change</td><td>Scope, schedule and cost of each addition</td><td>Verbal promises, free pickups, late script changes</td></tr>
</tbody></table></div>
<h3>Contingency is not profit</h3>
<p>Keep 10–15% contingency on total cost, on its own line, outside margin. It has three uses: pickups, delays and gear replacement. Record every spend. If unused, do not distribute it early as a bonus; the next overrun will have no buffer.</p>
<h3>The order of response after an overrun</h3>
<ol><li>Stop new purchases and confirm what is already owed.</li><li>Classify change-sheet items as client-caused, self-caused or force majeure.</li><li>Client-caused gets a change order; self-caused comes from contingency; force majeure follows the contract.</li><li>Do not hide it as “the next job will make it up.” The next job has its own costs.</li></ol>
<p>Run a 30-minute close-out: which line exceeded 10%, why, and which sheet it enters next time. “Control the budget” is not an action; write the specific move.</p>`
  },
  'method-deadline': {
    zh: `<h2>倒排不是把工期压短，是先找关键路径</h2>
<p>“下周要”通常不是日期，是焦虑。先问三个时间：客户内部评审什么时候、平台上线什么时候、最晚交片什么时候。三个时间定下来，再倒排，不要从今天开始数天数。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>倒排节点</th><th>最短留量</th><th>被压缩后的代价</th></tr></thead><tbody>
<tr><td>终交付</td><td>上线前 2 天</td><td>没有修改和转码缓冲</td></tr>
<tr><td>客户终审</td><td>终交付前 1 天</td><td>批注来不及改，只能带错上线</td></tr>
<tr><td>粗剪</td><td>终审前 2 天</td><td>结构问题拖到终剪</td></tr>
<tr><td>拍摄</td><td>粗剪前 1 天</td><td>素材没备份，剪辑带病工作</td></tr>
<tr><td>脚本/分镜确认</td><td>拍摄前 2 天</td><td>现场改脚本，演员和场地空转</td></tr>
</tbody></table></div>
<h3>关键路径只有一条</h3>
<p>把每个任务的前置条件写出来，最长的那条链就是关键路径。压缩非关键任务不会让项目提前，只会让等待更久。若关键路径上的拍摄只有 1 天，就不要把预算花在增加第二个机位，先保证这一天不掉链子。</p>
<h3>给三类 buffer 起名字</h3>
<ul><li>拍摄 buffer：天气、场地、演员迟到，留 2 小时。</li><li>后期 buffer：软件崩溃、素材重转，留 1 天。</li><li>客户 buffer：审批延迟，留 1 天。</li></ul>
<p>buffer 不是“有空再说”，要写进日程并告诉客户“这几天是保护期，不安排新任务”。没有命名的 buffer 一定会被别的会占掉。</p>`,
    en: `<h2>Back-planning is not squeezing the schedule; it is finding the critical path</h2>
<p>“Next week” is usually not a date; it is anxiety. Ask for three dates: internal review, platform launch and the latest acceptable delivery. Once those exist, plan backwards; do not count days from today.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Back-planned milestone</th><th>Minimum reserve</th><th>Cost of compressing it</th></tr></thead><tbody>
<tr><td>Final delivery</td><td>2 days before launch</td><td>No revision or transcode buffer</td></tr>
<tr><td>Client final review</td><td>1 day before delivery</td><td>Notes cannot be fixed; errors ship</td></tr>
<tr><td>Rough cut</td><td>2 days before final review</td><td>Structural problems surface at the end</td></tr>
<tr><td>Shoot</td><td>1 day before rough cut</td><td>No backup; edit starts with damaged media</td></tr>
<tr><td>Script / storyboard lock</td><td>2 days before shoot</td><td>On-set rewrites; crew and location idle</td></tr>
</tbody></table></div>
<h3>There is only one critical path</h3>
<p>Write the prerequisites for every task; the longest chain is the critical path. Compressing a non-critical task does not finish the project earlier; it only creates a longer wait. If the shoot on the critical path is one day, do not spend the budget on a second camera; protect that day first.</p>
<h3>Name three buffers</h3>
<ul><li>Shoot buffer: weather, location, late talent, two hours.</li><li>Post buffer: software crash, media re-transcode, one day.</li><li>Client buffer: approval delay, one day.</li></ul>
<p>A buffer is not “if there is time.” Put it on the calendar and tell the client, “these days are protected; no new tasks.” An unnamed buffer will always be eaten by another meeting.</p>`
  },
  'method-crew-conflict': {
    zh: `<h2>现场冲突，先定“谁说了算”</h2>
<p>拍摄现场的冲突很少是脾气，多数是决策权不清楚：导演要镜头、客户要产品、摄影要光、制片要时间，四个人都在做决定。开机前用一张 A4 写清楚决策链，比事后劝架有用。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>事项</th><th>最终决定</th><th>必须被咨询</th></tr></thead><tbody>
<tr><td>脚本与镜头</td><td>导演</td><td>客户、摄影</td></tr>
<tr><td>产品呈现</td><td>客户</td><td>导演、后期</td></tr>
<tr><td>灯光与机位</td><td>摄影</td><td>导演</td></tr>
<tr><td>时间与预算</td><td>制片</td><td>导演、客户</td></tr>
<tr><td>安全</td><td>任何人可叫停</td><td>全员</td></tr>
</tbody></table></div>
<h3>三条现场规则</h3>
<ol><li>一个问题只找一个人拍板；找两个人，等于没有决定。</li><li>客户有新想法，先写在“变更单”，不当场改机位；除非安全或法律问题。</li><li>导演和摄影意见不一致时，先拍两条，回放再定；不要在现场争理论。</li></ol>
<h3>冲突升级的处理</h3>
<p>先停 5 分钟，把事实写成三行：发生了什么、影响什么、需要谁决定。不要在组员面前指责个人。若客户和导演僵住，制片按“时间/预算/安全”三条排序给方案，让客户选，不替客户选。</p>
<p>收工后 10 分钟复盘：今天有没有一次决定被推翻、为什么、下次写进哪条规则。只写“沟通不畅”没有用，要写“产品特写由客户拍板，导演不现场改”。</p>`,
    en: `<h2>On-set conflict starts with unclear decision rights</h2>
<p>Most set conflicts are not temperament. They are unclear authority: the director wants a shot, the client wants the product, the DP wants light, the producer wants time, and all four are deciding. A one-page decision chain before the shoot beats mediation after.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Item</th><th>Final say</th><th>Must be consulted</th></tr></thead><tbody>
<tr><td>Script and shots</td><td>Director</td><td>Client, DP</td></tr>
<tr><td>Product presentation</td><td>Client</td><td>Director, editor</td></tr>
<tr><td>Lighting and camera</td><td>DP</td><td>Director</td></tr>
<tr><td>Time and budget</td><td>Producer</td><td>Director, client</td></tr>
<tr><td>Safety</td><td>Anyone can stop</td><td>Everyone</td></tr>
</tbody></table></div>
<h3>Three set rules</h3>
<ol><li>One question goes to one decision-maker. Two approvers means no decision.</li><li>A new client idea goes on a change sheet, not into the shot, unless it is safety or legal.</li><li>When director and DP disagree, shoot both, play back, then decide. Do not argue theory on set.</li></ol>
<h3>Escalating a conflict</h3>
<p>Stop for five minutes and write three lines: what happened, what it affects, who decides. Do not blame a person in front of the crew. If client and director are stuck, the producer ranks options by time, budget and safety, then lets the client choose; do not choose for them.</p>
<p>Ten minutes after wrap, review: which decision was overturned, why, and which rule it becomes. “Poor communication” is not a lesson; “product close-ups are the client's call; the director does not change them on set” is.</p>`
  },
  'method-portfolio-empty': {
    zh: `<h2>没有客户，也能做出可被信任的作品集</h2>
<p>作品集不是“客户名单”，是“你能解决什么问题”的证据。没有商业项目时，用三类作品补：自命题、拆片复刻、流程记录。每一类都能证明不同的能力。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>类型</th><th>证明什么</th><th>最小交付</th></tr></thead><tbody>
<tr><td>自命题短片</td><td>叙事、导演、剪辑</td><td>1 个 60 秒成片 + 1 页意图</td></tr>
<tr><td>拆片复刻</td><td>镜头、灯光、调色的执行精度</td><td>原片截图 + 复刻帧 + 差异说明</td></tr>
<tr><td>流程记录</td><td>可靠性、沟通、交付</td><td>1 页时间线 + 风险表 + 成片</td></tr>
</tbody></table></div>
<h3>每个项目只写四块</h3>
<ol><li>问题：谁遇到什么具体问题，一句话。</li><li>约束：预算、时间、场地、人力，至少写两个。</li><li>动作：你做了什么取舍，不只写“拍了”。</li><li>结果：可验证的变化，或诚实写“未上线/未测试”。</li></ol>
<h3>不要放什么</h3>
<ul><li>没有授权的客户片、路人清晰正脸、未清理的音乐。</li><li>只写“负责拍摄剪辑”的职责列表，没有判断。</li><li>把团队作品写成个人作品；注明角色，反而更可信。</li></ul>
<p>作品集首页放 3 个最强项目，不要放 20 个。每个项目给一个“看片理由”：30 秒版本、技术拆解、或一页复盘。没有客户时，自命题项目要标注“自命题”，不要暗示是商业委托。</p>`,
    en: `<h2>A credible portfolio without clients</h2>
<p>A portfolio is not a client list; it is evidence of the problems you can solve. Without commercial work, fill it with three types: self-initiated films, shot reconstructions and process records. Each proves a different capability.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Type</th><th>Proves</th><th>Minimum delivery</th></tr></thead><tbody>
<tr><td>Self-initiated short</td><td>Story, directing, editing</td><td>One 60-second film + one-page intent</td></tr>
<tr><td>Shot reconstruction</td><td>Precision in camera, light, grade</td><td>Original frame + rebuilt frame + difference notes</td></tr>
<tr><td>Process record</td><td>Reliability, communication, delivery</td><td>One-page timeline + risk sheet + finished film</td></tr>
</tbody></table></div>
<h3>Four blocks per project</h3>
<ol><li>Problem: who hit what specific problem, in one sentence.</li><li>Constraint: budget, time, location, crew; at least two.</li><li>Action: the trade-off you made, not “I shot it.”</li><li>Result: a verifiable change, or an honest “not launched / not tested.”</li></ol>
<h3>What not to include</h3>
<ul><li>Client films without permission, clear faces of passersby, uncleared music.</li><li>A duty list that says “shot and edited” with no judgment.</li><li>Team work presented as solo; naming your role is more credible, not less.</li></ul>
<p>Put three strongest projects on the first page, not twenty. Give each a reason to watch: a 30-second cut, a technical breakdown or a one-page review. Label self-initiated work as self-initiated; never imply a commercial commission.</p>`
  },
  'method-no-budget': {
    zh: `<h2>零预算项目，先定“不能做什么”</h2>
<p>零预算不是“免费拍片”，是用现有资源换一个可展示的结果。开始前先写三条边界：不租器材、不请演员、不出外景；或只保留一条。边界越清楚，项目越可能完成。</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>资源</th><th>能换什么</th><th>代价</th></tr></thead><tbody>
<tr><td>你的技能</td><td>为对方拍一条 30 秒片</td><td>时间，不是现金</td></tr>
<tr><td>对方的场地/产品</td><td>免费拍摄场景与道具</td><td>要给对方可用成片</td></tr>
<tr><td>平台/社群</td><td>曝光、互推、反馈</td><td>不一定带来客户</td></tr>
</tbody></table></div>
<h3>零预算的正确目标</h3>
<p>不是“做一个大片”，是“完成一次完整流程”。把范围压到 1 个场景、1 个机位、1 个成片、1 轮修改。用手机或现有相机，不追求参数；把时间花在脚本、现场声和剪辑节奏上。</p>
<h3>三种不要接的零预算</h3>
<ul><li>要求“先看效果再谈钱”的商业品牌；这是比稿，不是合作。</li><li>需要垫付场地、器材、演员的项目；零预算不等于零成本。</li><li>版权归客户、还要你承担无限修改的项目；没有预算，更要把范围写死。</li></ul>
<p>若决定做，签一页备忘录：双方各自出什么、成片用在哪、署名怎么写、什么时候结束。零预算项目也要有交付日，否则它会无限延长。</p>`,
    en: `<h2>Zero-budget projects start with what you will not do</h2>
<p>Zero budget is not “free filming.” It is trading existing resources for a presentable result. Before starting, write three boundaries: no gear rental, no paid talent, no exterior; or keep only one. Clear boundaries make completion possible.</p>
<div class="table-scroll"><table class="data-table"><thead><tr><th>Resource</th><th>What it trades for</th><th>Cost</th></tr></thead><tbody>
<tr><td>Your skill</td><td>A 30-second film for the other side</td><td>Time, not cash</td></tr>
<tr><td>Their location or product</td><td>A free set and props</td><td>A usable film in return</td></tr>
<tr><td>Platform or community</td><td>Reach, cross-promotion, feedback</td><td>Not guaranteed clients</td></tr>
</tbody></table></div>
<h3>The right goal for zero budget</h3>
<p>Not “a big film,” but “one complete process.” Cut scope to one location, one camera, one finished piece, one revision. Use a phone or the camera you own; do not chase specs. Spend the time on script, location sound and edit rhythm.</p>
<h3>Three zero-budget jobs to refuse</h3>
<ul><li>A commercial brand that says “show us the result, then we'll talk money.” That is a spec pitch, not a collaboration.</li><li>A project that asks you to front location, gear or talent costs. Zero budget is not zero cost.</li><li>Client owns all rights and asks for unlimited revisions. With no budget, lock scope even harder.</li></ul>
<p>If you do it, sign a one-page memo: who contributes what, where the film can be used, how credit reads, and when it ends. A zero-budget project still needs a delivery date, or it never ends.</p>`
  }
};
