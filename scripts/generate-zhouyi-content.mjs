import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const source = await readFile(resolve(root, "client/src/lib/zhouyi.ts"), "utf8");
const names = [...source.matchAll(/\["([^"\n]+)",\s*"([^"\n]+)",\s*"([^"\n]+)",\s*"([^"\n]+)"\]/g)].slice(0, 64).map((m) => ({ tw: m[1], cn: m[2], en: m[3], slug: m[4] }));
if (names.length !== 64) throw new Error(`Expected 64 names, found ${names.length}`);

// Each row is intentionally short: the reusable prose frame below expands it into a consistent, editorial-length reading.
const seeds = [
  ["開創與自強", "把主動變成承擔", "先定方向，再做可見的第一步"], ["承載與順勢", "讓支持也有邊界", "整理資源與節奏，再擴大投入"], ["萌芽與阻力", "在混沌中找到支點", "把大願景拆成兩週實驗"], ["學習與啟蒙", "承認未知才能真正理解", "寫下問題並找可靠的請教對象"],
  ["等待與準備", "把焦慮變成觀察", "設定期限並完成準備清單"], ["分歧與協商", "原則與立場需要分開", "列出底線與可交換之處"], ["紀律與共同目標", "減少責任模糊帶來的內耗", "建立角色、節奏與回顧表"], ["結盟與信任", "用履約而非熱鬧累積可靠", "確認合作規則與彼此期待"],
  ["小步累積", "速度慢不代表沒有進展", "每天完成一個微小動作"], ["敬慎前行", "尊重環境也尊重他人", "行動前做一次風險檢查"], ["交流與通泰", "讓資訊、功勞與資源流動", "修復一個卡住的流程"], ["停滯與保全", "暫停也是保存力量", "辨認暫時關閉的門"],
  ["共同體與公共性", "在一致之外容納差異", "召集一次只談目標的對話"], ["資源與影響力", "擴張更需要責任", "集中投入於長期價值"], ["謙遜與高度", "讓成果代替宣告", "把一項功勞還給團隊"], ["熱情與節奏", "為興奮安排燃料", "把願景轉成固定週期"],
  ["跟隨與調整", "順勢不等於失去主體", "試用一個有證據的新方法"], ["修補與清理", "先處理根部積弊", "診斷一件拖延最久的事"], ["靠近與照看", "成長需要時間", "安排一次有準備的回顧"], ["觀看與全局", "退一步才能看見模式", "把問題寫成時間線"],
  ["判斷與界線", "把規則、證據與後果放在一起", "確認一條底線及其行動"], ["表達與真實", "形式要服務於理解", "刪掉一個不必要的裝飾"], ["減少與取捨", "保留不可替代的核心", "刪除一項低價值承諾"], ["回返與修正", "走偏也能重新出發", "完成一次道歉、整理或重做"],
  ["自然與不妄", "回到事實與初心", "做一件不加戲的行動"], ["蓄積與深度", "不急著展示尚未成熟的力量", "建立三個月的儲備計畫"], ["滋養與輸入", "入口之物塑造內在", "整理資訊與語言來源"], ["超載與轉折", "承認結構已到臨界", "重新分配一項過重責任"],
  ["深水與安全", "在恐懼中建立可依靠的流程", "寫一份壓力安全計畫"], ["明辨與照亮", "理解不是用來審判", "把複雜事寫成三個事實"], ["感受與相互影響", "吸引不等於承諾", "記錄一次互動後的身心反應"], ["持續與承諾", "持久也需要更新", "建立每週回顧節奏"],
  ["退守與界線", "退後是保存判斷力", "停止一個無法回應的追逐"], ["力量與節制", "勇敢不能變成冒進", "寫下停止條件與檢查點"], ["進展與被看見", "根基要跟得上舞台", "建立可追蹤的成果證據"], ["低調與修養", "光可以暫藏但不必熄滅", "減少無效辯解"],
  ["家庭與日常秩序", "親近也需要清楚規則", "盤點一次角色與責任"], ["差異與保留距離", "不同不必等於否定", "尋找一個共同小目標"], ["阻塞與求助", "繞行不等於失敗", "列出三條替代路徑"], ["解困與鬆綁", "先解除最緊的結", "完成一次取消、道歉或重分工"],
  ["減負與再分配", "犧牲不是唯一的誠意", "交還一項不該獨扛的負擔"], ["增益與互惠", "得到之後不要忘記回到循環", "提供一次具體而不求回報的幫助"], ["決斷與突破", "底線要轉成可執行選擇", "設定決定期限與判準"], ["相遇與界線", "熱度不必替未來承諾", "為新邀約留一晚思考"],
  ["聚集與共同焦點", "人多時更需要中心", "整理一次共同宣言"], ["上升與累積", "終點要拆成一階一階", "設定一個月的里程碑"], ["受困與重新命名", "準確說出問題才能鬆動", "寫下事實、需求與請求"], ["井源與持續供給", "重要資源需要維護", "修一個長期使用的流程"],
  ["革新與換形", "保留核心，替換失效形式", "列出停止、保留與試驗"], ["轉化與整合", "新想法需要容器", "把散落素材整理成可用版本"], ["震動與覺醒", "突發事件也帶來訊息", "盤點必須保留的事"], ["靜止與安定", "停止輸出才能恢復判斷", "安排一段無輸入時間"],
  ["漸進與成熟", "每個階段都有功課", "拆一個可觀察的里程碑"], ["角色與承諾", "外在期待不等於內在選擇", "寫下真正同意的部分"], ["高峰與可見度", "盛大之後要談維護", "為成功安排休息與交接"], ["旅途與輕裝", "暫居不必背成永久身份", "整理物品、承諾與情緒"],
  ["滲透與柔韌", "溫和也必須清楚", "每天完成一個一致修正"], ["喜悅與真誠", "和諧不能取代真話", "邀請一次不急著解決的對話"], ["疏散與鬆動", "從一個出口讓能量流動", "清理一個堵塞點"], ["節制與界線", "規則要服務生命", "設定一條可執行上限"],
  ["內在誠信", "可靠比漂亮承諾重要", "說出一個尚未說出的感受"], ["小步修正", "不要把小事擴成大戰", "只處理今天最小的問題"], ["完成與守成", "完成之後仍要維護", "寫下完成定義與檢查時間"], ["未完與過渡", "允許試作帶回資料", "進行一個可逆的小實驗"],
];
if (seeds.length !== 64) throw new Error(`Expected 64 seeds, found ${seeds.length}`);

const replacePairs = [["開", "开"], ["創", "创"], ["與", "与"], ["擔", "担"], ["時", "时"], ["讓", "让"], ["領", "领"], ["導", "导"], ["見", "见"], ["參", "参"], ["觀", "观"], ["點", "点"], ["積", "积"], ["續", "续"], ["進", "进"], ["準", "准"], ["備", "备"], ["機", "机"], ["會", "会"], ["關", "关"], ["係", "系"], ["識", "识"], ["責", "责"], ["任", "任"], ["紀", "纪"], ["錄", "录"], ["變", "变"], ["動", "动"], ["題", "题"], ["寫", "写"], ["實", "实"], ["驗", "验"], ["請", "请"], ["選", "选"], ["擇", "择"], ["則", "则"], ["與", "与"], ["對", "对"], ["話", "话"], ["這", "这"], ["個", "个"], ["兩", "两"], ["開", "开"], ["發", "发"], ["現", "现"], ["場", "场"], ["業", "业"], ["組", "组"], ["織", "织"], ["協", "协"], ["議", "议"], ["轉", "转"], ["換", "换"], ["專", "专"], ["業", "业"], ["醫", "医"], ["療", "疗"], ["財", "财"], ["務", "务"], ["風", "风"], ["險", "险"], ["減", "减"], ["少", "少"], ["歸", "归"], ["妹", "妹"], ["豐", "丰"], ["旅", "旅"], ["濟", "济"], ["簡", "简"], ["細", "细"], ["釋", "释"], ["詳", "详"], ["復", "复"], ["體", "体"], ["為", "为"], ["應", "应"], ["該", "该"], ["將", "将"], ["從", "从"], ["於", "于"], ["後", "后"], ["內", "内"], ["外", "外"], ["問", "问"], ["答", "答"], ["總", "总"], ["結", "结"], ["構", "构"], ["導", "导"], ["讀", "读"], ["取", "取"], ["獨", "独"], ["運", "运"], ["識", "识"], ["決", "决"], ["策", "策"], ["負", "负"], ["擴", "扩"], ["張", "张"], ["維", "维"], ["護", "护"], ["獲", "获"], ["網", "网"], ["頁", "页"], ["說", "说"], ["明", "明"], ["產", "产"], ["數", "数"], ["據", "据"], ["庫", "库"], ["儲", "储"], ["類", "类"], ["型", "型"], ["範", "范"], ["圍", "围"], ["執", "执"], ["行", "行"], ["寫", "写"], ["記", "记"], ["錄", "录"], ["發", "发"], ["佈", "布"], ["實", "实"], ["驗", "验"], ["檢", "检"], ["查", "查"], ["預", "预"], ["測", "测"], ["論", "论"], ["證", "证"], ["據", "据"], ["誤", "误"], ["礎", "础"], ["際", "际"], ["標", "标"], ["評", "评"], ["估", "估"], ["專", "专"], ["業", "业"]];
function simplify(text) { return replacePairs.reduce((value, [from, to]) => value.replaceAll(from, to), text); }

function buildReading(name, seed) {
  const [focus, tension, action] = seed;
  return [`【卦象總覽】${name}以「${focus}」為核心。它不是替你預告一個固定結果，而是把當下的問題放回位置、關係、節奏與選擇之中。你可以把這一卦當作一張觀察地圖：先看清楚力量從哪裡來、阻力卡在哪裡，再決定什麼值得繼續、什麼需要調整。此時最重要的不是追問吉凶，而是承認現況的複雜，讓判斷建立在真實資料與親身感受上。`, `【處境閱讀】當你遇到${tension}時，常會在「立刻處理」與「完全放下」之間來回擺盪。這一卦提醒你不要被單一情緒帶走，也不要把外部變化全部解讀成對自己的否定。先把問題縮小：誰在其中？什麼正在改變？哪一件事仍在你的控制範圍？一旦問題被說清楚，原本模糊的壓力就能轉成幾個可以觀察的訊號。`, `【工作與學習】在工作、創業、學業或專案中，這一卦適合用來檢查投入與回報是否匹配。不要只看表面速度，也要看流程能否持續、責任是否清楚、資源是否被正確使用。若正準備改變方向，先保留一個可逆的試驗；若已經走了一段時間，則整理成果、風險與下一個檢查點。好的進展不一定喧鬧，它也可能只是每天多一點秩序、多一份證據與更穩定的判斷。`, `【關係與生活】在人際、感情與家庭裡，這一卦邀請你同時照看自己與他人的位置。真誠不等於毫無界線，包容也不等於長期忍耐。請把期待說成具體的請求，把不舒服說成可以討論的事實，讓對方有回應的空間，也讓自己保留退出或重新協商的權利。若局面暫時無法改變，先把注意力放回睡眠、身體、時間與日常秩序，穩定自己就是改變關係的起點。`, `【行動指引】今天可以從「${action}」開始。把它限制在一個小到能完成、清楚到能驗證的動作，並為自己留下一段回顧時間。完成後問三件事：我實際看見了什麼？哪個假設需要修正？下一步要繼續、暫停，還是換一條路？不要把卦象當成命令，也不要把解讀當成保證；它更像一面鏡子，幫助你把直覺、資料與責任放在同一張桌上。`, `【反思提問】在做決定以前，請寫下：「我真正想保護的是什麼？我願意為哪個選擇承擔代價？如果結果不如預期，我要如何照顧自己與相關的人？」這三個問題能把抽象焦慮轉成可討論的價值排序。周易的閱讀適合陪伴思考，不取代醫療、法律、財務或其他專業意見；若涉及高風險情境，請再尋求合格專業人士的協助。`].join("\n\n");
}

const details = Object.fromEntries(names.map((name, index) => {
  const tw = buildReading(name.tw, seeds[index]);
  const en = `Overview: ${name.en}. This pattern is a reflective map for ${seeds[index][0].toLowerCase()}. It does not promise a fixed outcome. Read it through position, relationship, rhythm, evidence, and the next reversible step.\\n\\nSituation: When the current tension appears, name what is changing and what remains within your control. Do not turn uncertainty into a verdict about your worth. Make the question smaller until it can be observed.\\n\\nPractice: ${seeds[index][2]}. Keep the action specific, visible, and reviewable. Use the reading to frame a decision, not to outsource responsibility.\\n\\nReminder: Treat this as a contemplative tool, not medical, legal, financial, or professional advice.`;
  return [String(index + 1), { detail: { "zh-TW": tw, "zh-CN": simplify(tw), en }, sourceNote: "Original modern reflection text for this project; not a translation of classical line statements." }];
}));

const englishCategories = ["Work direction", "Career change", "Startup", "Learning", "Collaboration", "Relationships", "Communication", "Family", "People", "Moving", "Finances", "Plans", "Choices", "Healthy rhythm", "Habits", "Procrastination", "Boundaries", "Public sharing", "Letting go", "Next move"];
const quickQuestions = [
  ["工作方向", "我現在的工作方向，是否值得繼續投入？", "我现在的工作方向，是否值得继续投入？", "Is my current work direction worth continuing?"],
  ["轉職", "我是否適合在近期轉換工作或職涯方向？", "我是否适合在近期转换工作或职业方向？", "Is it time to change jobs or career direction?"],
  ["創業", "我準備的創業計畫，下一步最該先確認什麼？", "我准备的创业计划，下一步最该先确认什么？", "What should I verify next in my startup plan?"],
  ["學習", "我該如何選擇下一個值得投入的學習方向？", "我该如何选择下一个值得投入的学习方向？", "How should I choose my next learning direction?"],
  ["合作", "這段合作關係是否適合繼續發展？", "这段合作关系是否适合继续发展？", "Is this collaboration ready to develop further?"],
  ["感情", "我該如何理解目前這段感情的變化？", "我该如何理解目前这段感情的变化？", "How should I understand the changes in this relationship?"],
  ["溝通", "我與對方之間，最需要先說清楚的是什麼？", "我与对方之间，最需要先说清楚的是什么？", "What needs to be made clear between us first?"],
  ["家庭", "我該如何改善目前的家庭互動與界線？", "我该如何改善目前的家庭互动与界线？", "How can I improve family interaction and boundaries?"],
  ["人際", "我是否應該主動修復這段人際關係？", "我是否应该主动修复这段人际关系？", "Should I take the first step to repair this relationship?"],
  ["搬遷", "近期搬遷或改變居住環境，適合我嗎？", "近期搬迁或改变居住环境，适合我吗？", "Would moving or changing my living environment help now?"],
  ["財務", "我該如何整理目前的金錢壓力與優先順序？", "我该如何整理目前的金钱压力与优先顺序？", "How can I organize my financial pressure and priorities?"],
  ["計畫", "這個計畫目前最大的阻力與突破口是什麼？", "这个计划目前最大的阻力与突破口是什么？", "What is the biggest obstacle and opening in this plan?"],
  ["選擇", "面對兩個選項，我應該先比較哪些關鍵？", "面对两个选项，我应该先比较哪些关键？", "What should I compare first between these two options?"],
  ["健康節奏", "我該如何調整生活節奏，恢復身心能量？", "我该如何调整生活节奏，恢复身心能量？", "How can I adjust my rhythm and restore energy?"],
  ["習慣", "哪一個小習慣最值得我現在開始建立？", "哪一个小习惯最值得我现在开始建立？", "Which small habit is worth starting now?"],
  ["拖延", "我一直拖延的事情，真正卡住我的原因是什麼？", "我一直拖延的事情，真正卡住我的原因是什么？", "What is really blocking the thing I keep postponing?"],
  ["界線", "我該如何在照顧他人與保護自己之間取得平衡？", "我该如何在照顾他人与保护自己之间取得平衡？", "How can I balance supporting others and protecting myself?"],
  ["公開表達", "我現在是否適合公開分享自己的作品或想法？", "我现在是否适合公开分享自己的作品或想法？", "Is this the right time to share my work publicly?"],
  ["放下", "我是否需要停止追逐一個已經消耗我的目標？", "我是否需要停止追逐一个已经消耗我的目标？", "Do I need to stop pursuing a goal that is draining me?"],
  ["下一步", "在這個階段，我最值得先完成的下一步是什麼？", "在这个阶段，我最值得先完成的下一步是什么？", "What is the most worthwhile next step at this stage?"],
].map(([category, tw, cn, en], index) => ({ id: index + 1, category: { "zh-TW": category, "zh-CN": category, en: englishCategories[index] }, question: { "zh-TW": tw, "zh-CN": cn, en } }));

await writeFile(resolve(root, "client/src/data/zhouyi-content.json"), JSON.stringify({ version: "1.1.0", generatedAt: new Date().toISOString(), details, quickQuestions }, null, 2) + "\n");
console.log(`Generated ${Object.keys(details).length} detailed readings and ${quickQuestions.length} quick questions.`);
