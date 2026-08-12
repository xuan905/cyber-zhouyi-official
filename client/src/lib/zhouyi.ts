export type HexagramId = number;
import content from "../data/zhouyi-content.json";

export type LineValue = 6 | 7 | 8 | 9;

type LocalizedText = { "zh-TW": string; "zh-CN": string; en: string };

export type HexagramProfile = {
  id: HexagramId;
  pinyin: string;
  names: { "zh-TW": string; "zh-CN": string; en: string };
  theme: { "zh-TW": string; "zh-CN": string; en: string };
  reading: { "zh-TW": string; "zh-CN": string; en: string };
  advice: { "zh-TW": string; "zh-CN": string; en: string };
  detail: LocalizedText;
  keywords: { "zh-TW": string[]; "zh-CN": string[]; en: string[] };
  action: { "zh-TW": string[]; "zh-CN": string[]; en: string[] };
};

export type CastLine = {
  value: LineValue;
  name: { "zh-TW": string; "zh-CN": string; en: string };
  yin: boolean;
  changing: boolean;
};

export type DivinationResult = {
  question: string;
  lines: CastLine[];
  primaryId: HexagramId;
  relatingId: HexagramId;
  changingLines: number[];
  createdAt: string;
};

const nameTriples: Array<[string, string, string, string]> = [
  ["乾為天", "乾为天", "The Creative", "qian"],
  ["坤為地", "坤为地", "The Receptive", "kun"],
  ["水雷屯", "水雷屯", "Difficulty at the Beginning", "zhun"],
  ["山水蒙", "山水蒙", "Youthful Folly", "meng"],
  ["水天需", "水天需", "Waiting", "xu"],
  ["天水訟", "天水讼", "Conflict", "song"],
  ["地水師", "地水师", "The Army", "shi"],
  ["水地比", "水地比", "Holding Together", "bi"],
  ["風天小畜", "风天小畜", "The Taming Power of the Small", "xiao-xu"],
  ["天澤履", "天泽履", "Treading", "lu"],
  ["地天泰", "地天泰", "Peace", "tai"],
  ["天地否", "天地否", "Standstill", "pi"],
  ["天火同人", "天火同人", "Fellowship with Others", "tong-ren"],
  ["火天大有", "火天大有", "Possession in Great Measure", "da-you"],
  ["地山謙", "地山谦", "Modesty", "qian-modesty"],
  ["雷地豫", "雷地豫", "Enthusiasm", "yu"],
  ["澤雷隨", "泽雷随", "Following", "sui"],
  ["山風蠱", "山风蛊", "Work on What Has Been Spoiled", "gu"],
  ["地澤臨", "地泽临", "Approach", "lin"],
  ["風地觀", "风地观", "Contemplation", "guan"],
  ["火雷噬嗑", "火雷噬嗑", "Biting Through", "shi-he"],
  ["山火賁", "山火贲", "Grace", "bi-grace"],
  ["山地剝", "山地剥", "Splitting Apart", "bo"],
  ["地雷復", "地雷复", "Return", "fu"],
  ["天雷无妄", "天雷无妄", "Innocence", "wu-wang"],
  ["山天大畜", "山天大畜", "The Taming Power of the Great", "da-xu"],
  ["山雷頤", "山雷颐", "The Corners of the Mouth", "yi"],
  ["澤風大過", "泽风大过", "Preponderance of the Great", "da-guo"],
  ["坎為水", "坎为水", "The Abysmal", "kan"],
  ["離為火", "离为火", "The Clinging", "li"],
  ["澤山咸", "泽山咸", "Influence", "xian"],
  ["雷風恆", "雷风恒", "Duration", "heng"],
  ["天山遯", "天山遁", "Retreat", "dun"],
  ["雷天大壯", "雷天大壮", "The Power of the Great", "da-zhuang"],
  ["火地晉", "火地晋", "Progress", "jin"],
  ["地火明夷", "地火明夷", "Darkening of the Light", "ming-yi"],
  ["風火家人", "风火家人", "The Family", "jia-ren"],
  ["火澤睽", "火泽睽", "Opposition", "kui"],
  ["水山蹇", "水山蹇", "Obstruction", "jian"],
  ["雷水解", "雷水解", "Deliverance", "jie"],
  ["山澤損", "山泽损", "Decrease", "sun"],
  ["風雷益", "风雷益", "Increase", "yi-increase"],
  ["澤天夬", "泽天夬", "Breakthrough", "guai"],
  ["天風姤", "天风姤", "Coming to Meet", "gou"],
  ["澤地萃", "泽地萃", "Gathering Together", "cui"],
  ["地風升", "地风升", "Pushing Upward", "sheng"],
  ["澤水困", "泽水困", "Oppression", "kun-oppression"],
  ["水風井", "水风井", "The Well", "jing"],
  ["澤火革", "泽火革", "Revolution", "ge"],
  ["火風鼎", "火风鼎", "The Cauldron", "ding"],
  ["震為雷", "震为雷", "The Arousing", "zhen"],
  ["艮為山", "艮为山", "Keeping Still", "gen"],
  ["風山漸", "风山渐", "Development", "jian-development"],
  ["雷澤歸妹", "雷泽归妹", "The Marrying Maiden", "gui-mei"],
  ["雷火豐", "雷火丰", "Abundance", "feng"],
  ["火山旅", "火山旅", "The Wanderer", "lu-travel"],
  ["巽為風", "巽为风", "The Gentle", "xun"],
  ["兌為澤", "兑为泽", "The Joyous", "dui"],
  ["風水渙", "风水涣", "Dispersion", "huan"],
  ["水澤節", "水泽节", "Limitation", "jie-limitation"],
  ["風澤中孚", "风泽中孚", "Inner Truth", "zhong-fu"],
  ["雷山小過", "雷山小过", "Preponderance of the Small", "xiao-guo"],
  ["水火既濟", "水火既济", "After Completion", "ji-ji"],
  ["火水未濟", "火水未济", "Before Completion", "wei-ji"],
];

const themes: Record<number, [string, string, string]> = {
  1: ["開創與自強", "开创与自强", "Initiative and creative force"],
  2: ["承載與順勢", "承载与顺势", "Receptivity and grounded support"],
  3: ["在混沌中扎根", "在混沌中扎根", "Rooting through uncertainty"],
  4: ["學習與啟蒙", "学习与启蒙", "Learning before certainty"],
  5: ["等待成熟時機", "等待成熟时机", "Patient preparation"],
  6: ["把衝突化為對話", "把冲突化为对话", "Turning conflict into dialogue"],
  7: ["紀律與共同目標", "纪律与共同目标", "Discipline and shared purpose"],
  8: ["結盟與信任", "结盟与信任", "Alliance and trust"],
  9: ["小步累積力量", "小步积累力量", "Small forces accumulating"],
  10: ["帶著敬意前行", "带着敬意前行", "Walking with care"],
  11: ["讓上下流通", "让上下流通", "Flow and mutual exchange"],
  12: ["辨識停滯訊號", "辨识停滞信号", "Recognizing standstill"],
  13: ["尋找共同語言", "寻找共同语言", "Shared language"],
  14: ["善用資源與影響力", "善用资源与影响力", "Responsible abundance"],
  15: ["以謙遜建立高度", "以谦逊建立高度", "Elevation through humility"],
  16: ["讓熱情有節奏", "让热情有节奏", "Rhythmic enthusiasm"],
};

const defaultKeywords: Record<number, [string[], string[], string[]]> = {
  1: [["創造", "領導", "承擔"], ["创造", "领导", "承担"], ["creation", "leadership", "responsibility"]],
  2: [["包容", "耐心", "培育"], ["包容", "耐心", "培育"], ["receptivity", "patience", "nurture"]],
  3: [["萌芽", "阻力", "求助"], ["萌芽", "阻力", "求助"], ["beginnings", "friction", "support"]],
  4: [["學習", "提問", "紀律"], ["学习", "提问", "纪律"], ["learning", "questions", "discipline"]],
  5: [["等待", "準備", "信任"], ["等待", "准备", "信任"], ["waiting", "preparation", "trust"]],
  6: [["分歧", "界線", "協商"], ["分歧", "界线", "协商"], ["friction", "boundaries", "negotiation"]],
};

const actionTemplates: Record<number, [string[], string[], string[]]> = {
  1: [["選一個最重要的方向，今天完成第一個可見動作。", "保留回顧機制，避免把堅持變成固執。"], ["选一个最重要的方向，今天完成第一个可见动作。", "保留复盘机制，避免把坚持变成固执。"], ["Choose one priority and make a visible first move today.", "Keep a review loop so persistence does not become rigidity."]],
  2: [["先整理資源與節奏，再決定是否擴大投入。", "把支持他人的能力轉化為可持續的邊界。"], ["先整理资源与节奏，再决定是否扩大投入。", "把支持他人的能力转化为可持续的边界。"], ["Organize resources and rhythm before expanding effort.", "Turn your ability to support others into sustainable boundaries."]],
  3: [["把大問題拆成一個兩週內可驗證的小步驟。", "找一位可信任的同行者，讓困難被看見。"], ["把大问题拆成一个两周内可验证的小步骤。", "找一位可信任的同行者，让困难被看见。"], ["Break the big question into a two-week experiment.", "Find a trusted peer so the difficulty can be seen and shared."]],
  4: [["先寫下三個真正不懂的地方，再安排一次高品質請教。", "用練習與紀錄取代焦慮式反覆搜尋。"], ["先写下三个真正不懂的地方，再安排一次高质量请教。", "用练习与记录取代焦虑式反复搜索。"], ["Write down three genuine unknowns, then seek one high-quality conversation.", "Replace anxious searching with practice and notes."]],
  5: [["設定觀察期限，期間只做準備，不急著下結論。", "把等待變成資料收集與體力整理。"], ["设定观察期限，期间只做准备，不急着下结论。", "把等待变成资料收集与体力整理。"], ["Set an observation window; prepare without rushing a verdict.", "Turn waiting into information gathering and energy renewal."]],
  6: [["先列出不可退讓的原則，再找出可以交換的部分。", "以書面共識取代情緒化的猜測。"], ["先列出不可退让的原则，再找出可以交换的部分。", "以书面共识取代情绪化的猜测。"], ["Name non-negotiables, then identify what can be exchanged.", "Use written agreements instead of emotional assumptions."]],
};

const patternNames: Record<string, [string, string, string]> = {
  "111111": ["乾為天", "乾为天", "The Creative"],
  "000000": ["坤為地", "坤为地", "The Receptive"],
  "010001": ["山水蒙", "山水蒙", "Youthful Folly"],
  "100010": ["水雷屯", "水雷屯", "Difficulty at the Beginning"],
};

const detailedContent = content.details as Record<string, { detail: LocalizedText }>;

export type QuickQuestion = {
  id: number;
  category: LocalizedText;
  question: LocalizedText;
};

export const quickQuestions = content.quickQuestions as QuickQuestion[];

export const hexagrams: Record<number, HexagramProfile> = Object.fromEntries(
  nameTriples.map(([traditional, simplified, english], index) => {
    const id = index + 1;
    const theme = themes[id] ?? ["變化中的觀察", "变化中的观察", "A pattern in motion"];
    const keyword = defaultKeywords[id] ?? [["觀察", "調整", "行動"], ["观察", "调整", "行动"], ["observe", "adjust", "act"]];
    const actions = actionTemplates[id] ?? [["寫下現況與可控的一件事。", "讓下一步小到能在今天完成。"], ["写下现状与可控的一件事。", "让下一步小到能在今天完成。"], ["Write the current reality and one controllable factor.", "Make the next step small enough to finish today."]];
    return [id, {
      id,
      pinyin: index === 0 ? "Qián" : index === 1 ? "Kūn" : english.split(" ")[0],
      names: { "zh-TW": traditional, "zh-CN": simplified, en: english },
      theme: { "zh-TW": theme[0], "zh-CN": theme[1], en: theme[2] },
      reading: {
        "zh-TW": `${theme[0]}。這一卦提醒你，把注意力放回眼前的結構與節奏。答案不在預言某個固定結果，而在看見自己此刻能如何回應變化。`,
        "zh-CN": `${theme[1]}。这一卦提醒你，把注意力放回眼前的结构与节奏。答案不在预言某个固定结果，而在看见自己此刻能如何回应变化。`,
        en: `${theme[2]}. This pattern asks you to return attention to the structure and rhythm in front of you. The point is not a fixed prediction, but seeing how you can respond to change now.`,
      },
      advice: {
        "zh-TW": "以清楚的問題換來清楚的下一步；保持彈性，也保留原則。",
        "zh-CN": "以清楚的问题换来清楚的下一步；保持弹性，也保留原则。",
        en: "Let a clear question reveal a clear next move. Stay flexible without abandoning your principles.",
      },
      detail: detailedContent[String(id)]?.detail ?? {
        "zh-TW": "這一卦提供一個觀察變化的入口。請把問題拆成現況、關係、可控行動與回顧時間，再決定下一步。",
        "zh-CN": "这一卦提供一个观察变化的入口。请把问题拆成现况、关系、可控行动与回顾时间，再决定下一步。",
        en: "This pattern offers a way to observe change. Break the question into reality, relationships, controllable action, and a review window before choosing the next move.",
      },
      keywords: { "zh-TW": keyword[0], "zh-CN": keyword[1], en: keyword[2] },
      action: { "zh-TW": actions[0], "zh-CN": actions[1], en: actions[2] },
    }];
  }),
);

export const hexagramPatterns: Record<number, string> = {
  1: "111111", 2: "000000", 3: "100010", 4: "010001", 5: "111010", 6: "010111", 7: "010000", 8: "000010",
  9: "111011", 10: "110111", 11: "111000", 12: "000111", 13: "111101", 14: "101111", 15: "001000", 16: "000100",
  17: "100110", 18: "011001", 19: "110000", 20: "000011", 21: "100101", 22: "101001", 23: "000001", 24: "100000",
  25: "100111", 26: "111001", 27: "100001", 28: "011110", 29: "010010", 30: "101101", 31: "001110", 32: "011100",
  33: "001111", 34: "111100", 35: "000101", 36: "101000", 37: "101011", 38: "110101", 39: "001010", 40: "010100",
  41: "110001", 42: "100011", 43: "111110", 44: "011111", 45: "000110", 46: "011000", 47: "010110", 48: "011010",
  49: "101110", 50: "011101", 51: "100100", 52: "001001", 53: "001011", 54: "110100", 55: "101100", 56: "001101",
  57: "011011", 58: "110110", 59: "010011", 60: "110010", 61: "110011", 62: "001100", 63: "101010", 64: "010101",
};

// Pattern lookup uses the traditional lower trigram -> upper trigram order, matching the browser drawing order.
export function patternToId(pattern: string): number {
  const normalized = pattern.slice(0, 6);
  const direct = Object.entries(hexagramPatterns).find(([, value]) => value === normalized)?.[0];
  if (direct) return Number(direct);
  const fallback = Object.entries(patternNames).find(([value]) => value === normalized);
  return fallback ? Object.keys(hexagramPatterns).find((key) => hexagramPatterns[Number(key)] === fallback[0]) ? Number(Object.keys(hexagramPatterns).find((key) => hexagramPatterns[Number(key)] === fallback[0])) : 1 : 1;
}

export function castCoins(): DivinationResult {
  const lines: CastLine[] = Array.from({ length: 6 }, () => {
    const value = (Array.from({ length: 3 }, () => (Math.random() < 0.5 ? 2 : 3)).reduce<number>((sum, coin) => sum + coin, 0)) as LineValue;
    const yin = value === 6 || value === 8;
    const changing = value === 6 || value === 9;
    return {
      value,
      yin,
      changing,
      name: {
        "zh-TW": value === 6 ? "老陰" : value === 7 ? "少陽" : value === 8 ? "少陰" : "老陽",
        "zh-CN": value === 6 ? "老阴" : value === 7 ? "少阳" : value === 8 ? "少阴" : "老阳",
        en: value === 6 ? "Old yin" : value === 7 ? "Young yang" : value === 8 ? "Young yin" : "Old yang",
      },
    };
  });
  const primaryPattern = lines.map((line) => (line.yin ? "0" : "1")).join("");
  const relatingPattern = lines.map((line) => ((line.changing ? !line.yin : line.yin) ? "1" : "0")).join("");
  const changingLines = lines.map((line, index) => line.changing ? index + 1 : 0).filter(Boolean);
  const primaryId = patternToId(primaryPattern);
  const relatingId = patternToId(relatingPattern);
  return { question: "", lines, primaryId, relatingId, changingLines, createdAt: new Date().toISOString() };
}

export function getHexagramName(id: number, locale: "zh-TW" | "zh-CN" | "en") {
  return hexagrams[id]?.names[locale] ?? nameTriples[id - 1]?.[locale === "zh-TW" ? 0 : locale === "zh-CN" ? 1 : 2] ?? "—";
}

export function getHexagramProfile(id: number): HexagramProfile {
  return hexagrams[id] ?? hexagrams[1];
}
