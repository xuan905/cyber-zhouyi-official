/* Style note: Treat the casting room as a quiet ritual interface: offset content, thin ink-like lines, gold change markers in dark mode, and no sensational claims. */
import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Download, Info, RotateCcw, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "../contexts/LocaleContext";
import { castCoins, getHexagramName, getHexagramProfile, type DivinationResult } from "../lib/zhouyi";

const copy = {
  "zh-TW": {
    eyebrow: "起卦室 / 04",
    title: "問一個真正的問題。",
    intro: "把問題寫得具體、寫成你願意面對的樣子。起卦不替你預言，它讓你看見正在發生的結構。",
    placeholder: "例如：我是否應該在這季轉換工作方向？",
    prompt: "輸入你的問題",
    cast: "開始起卦",
    casting: "六爻正在成形…",
    result: "你的卦象",
    primary: "本卦",
    relating: "變卦",
    changes: "變爻",
    none: "無",
    reading: "卦象解讀",
    keywords: "觀察關鍵",
    direction: "今日指引",
    download: "下載 JSON",
    again: "重新起卦",
    back: "返回首頁",
    disclaimer: "這是反思與決策整理工具，不是預言，也不取代醫療、法律、財務或其他專業意見。",
    note: "每次起卦都在瀏覽器本機生成；不會把你的問題送到伺服器。",
    coin: "三幣法",
    line: "第",
    lineAfter: "爻",
    changeNote: "金色標記代表變爻，提醒你留意局勢中正在移動的部分。",
  },
  "zh-CN": {
    eyebrow: "起卦室 / 04",
    title: "问一个真正的问题。",
    intro: "把问题写得具体、写成你愿意面对的样子。起卦不替你预言，它让你看见正在发生的结构。",
    placeholder: "例如：我是否应该在这一季转换工作方向？",
    prompt: "输入你的问题",
    cast: "开始起卦",
    casting: "六爻正在成形…",
    result: "你的卦象",
    primary: "本卦",
    relating: "变卦",
    changes: "变爻",
    none: "无",
    reading: "卦象解读",
    keywords: "观察关键词",
    direction: "今日指引",
    download: "下载 JSON",
    again: "重新起卦",
    back: "返回首页",
    disclaimer: "这是反思与决策整理工具，不是预言，也不取代医疗、法律、财务或其他专业意见。",
    note: "每次起卦都在浏览器本机生成；不会把你的问题送到服务器。",
    coin: "三币法",
    line: "第",
    lineAfter: "爻",
    changeNote: "金色标记代表变爻，提醒你留意局势中正在移动的部分。",
  },
  en: {
    eyebrow: "CASTING ROOM / 04",
    title: "Ask a real question.",
    intro: "Make it specific. Make it honest enough to meet. A cast does not predict for you; it reveals the structure already in motion.",
    placeholder: "For example: Should I change the direction of my work this season?",
    prompt: "Your question",
    cast: "Cast a reading",
    casting: "Six lines are taking shape…",
    result: "Your pattern",
    primary: "Primary",
    relating: "Relating",
    changes: "Changing lines",
    none: "None",
    reading: "Reading",
    keywords: "Watch for",
    direction: "A direction for today",
    download: "Download JSON",
    again: "Cast again",
    back: "Back to overview",
    disclaimer: "A reflective decision-framing tool, not a prediction and not a substitute for medical, legal, financial, or other professional advice.",
    note: "Each cast is generated locally in your browser; your question is not sent to a server.",
    coin: "Three-coin method",
    line: "Line",
    lineAfter: "",
    changeNote: "Gold marks indicate changing lines—the parts of the situation currently in motion.",
  },
} as const;

function LineGlyph({ yin, changing, index, locale }: { yin: boolean; changing: boolean; index: number; locale: "zh-TW" | "zh-CN" | "en" }) {
  return <div className="flex items-center gap-3" title={`${copy[locale].line} ${index + 1}`}><span className="w-10 text-right font-mono text-[10px] text-muted-foreground">{copy[locale].line} {index + 1}{copy[locale].lineAfter}</span><span className="relative flex flex-1 items-center gap-2">{yin ? <><span className="h-2 flex-1 bg-foreground/80" /><span className="h-2 w-8 bg-background" /><span className="h-2 flex-1 bg-foreground/80" /></> : <span className="h-2 w-full bg-foreground/80" />}{changing && <span className="absolute -right-2 size-3 rounded-full border-2 border-background bg-[color:var(--gold)] shadow-[0_0_0_2px_var(--gold)]" />}</span></div>;
}

function HexagramCard({ label, id, lines, locale, count }: { label: string; id: number; lines: DivinationResult["lines"]; locale: "zh-TW" | "zh-CN" | "en"; count?: number }) {
  return <div className="border border-border bg-card p-5 shadow-[0_16px_50px_rgba(41,31,24,0.06)] dark:border-[color:var(--gold)]/25 dark:bg-card/75 md:p-7"><div className="flex items-start justify-between"><div><p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">{label}</p><h3 className="mt-2 font-serif text-2xl">{getHexagramName(id, locale)}</h3></div><span className="font-mono text-xs text-muted-foreground">{String(id).padStart(2, "0")} / 64</span></div><div className="mt-8 space-y-3">{lines.slice().reverse().map((line, index) => <LineGlyph key={`${label}-${index}`} yin={line.yin} changing={Boolean(count && line.changing)} index={5 - index} locale={locale} />)}</div></div>;
}

export default function Divination() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [question, setQuestion] = useState("");
  const [isCasting, setIsCasting] = useState(false);
  const [result, setResult] = useState<DivinationResult | null>(null);

  const primary = useMemo(() => result ? getHexagramProfile(result.primaryId) : null, [result]);
  const relating = useMemo(() => result ? getHexagramProfile(result.relatingId) : null, [result]);

  const startCast = () => {
    if (!question.trim()) return;
    setIsCasting(true);
    window.setTimeout(() => {
      setResult({ ...castCoins(), question: question.trim() });
      setIsCasting(false);
    }, 1100);
  };

  const reset = () => {
    setResult(null);
    setQuestion("");
  };

  const download = () => {
    if (!result) return;
    const payload = { ...result, language: locale, primary: primary?.names[locale], relating: relating?.names[locale] };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `cyber-zhouyi-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <div className="relative overflow-hidden"><div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24 lg:px-14"><div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20"><aside className="lg:sticky lg:top-28 lg:h-fit"><div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--accent)] dark:text-[color:var(--gold)]"><span className="h-px w-8 bg-current" />{t.eyebrow}</div><h1 className="mt-6 max-w-lg font-serif text-5xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">{t.title}</h1><p className="mt-7 max-w-md text-base leading-8 text-muted-foreground">{t.intro}</p><div className="mt-10 border-l border-[color:var(--accent)]/50 pl-4 text-xs leading-6 text-muted-foreground dark:border-[color:var(--gold)]/50"><div className="flex items-center gap-2 font-medium text-foreground"><Info className="size-4" />{t.coin}</div><p className="mt-2">{t.note}</p><div className="mt-5 flex max-w-[220px] items-center gap-2 opacity-65">{[0, 1, 0, 1, 1, 0].map((line, index) => <span key={index} className={`h-1 flex-1 ${line ? "bg-foreground" : "border border-foreground/50"}`} />)}</div></div><Link href="/" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[color:var(--accent)] dark:hover:text-[color:var(--gold)]"><ArrowDown className="size-4" />{t.back}</Link></aside>

<div className="min-w-0">{!result ? <section className="relative overflow-hidden border border-border bg-card/70 p-6 shadow-[0_24px_70px_rgba(41,31,24,0.07)] backdrop-blur-md dark:border-[color:var(--gold)]/25 dark:bg-card/65 sm:p-10"><div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-[color:var(--accent)]/20 dark:border-[color:var(--gold)]/25" /><div className="pointer-events-none absolute right-7 top-9 flex w-20 flex-col gap-1.5 opacity-40">{[1, 0, 1, 1, 0, 1].map((line, index) => <span key={index} className={`h-1 ${line ? "bg-foreground" : "bg-transparent"}`} />)}</div><div className="relative mb-12 flex items-center justify-between border-b border-border pb-5"><div><span className="font-serif text-xl">{t.prompt}</span><span className="ml-3 font-mono text-[10px] text-muted-foreground">64 / 06</span></div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">LOCAL / REFLECT</span></div><Textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t.placeholder} className="min-h-44 resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-xl leading-9 shadow-none focus-visible:ring-0 sm:text-2xl" maxLength={240} /><div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><p className="max-w-sm text-xs leading-5 text-muted-foreground">{t.disclaimer}</p><Button onClick={startCast} disabled={!question.trim() || isCasting} className="group h-12 rounded-none bg-foreground px-6 text-background hover:bg-foreground/90">{isCasting ? <><Sparkles className="mr-2 size-4 animate-pulse" />{t.casting}</> : <>{t.cast}<ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" /></>}</Button></div></section> : <section className="animate-in fade-in slide-in-from-bottom-4 duration-500"><div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end"><div><p className="text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">{t.result}</p><h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-5xl">{result.question}</h2></div><span className="font-mono text-[10px] text-muted-foreground">{new Date(result.createdAt).toLocaleString(locale)}</span></div><div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center"><HexagramCard label={t.primary} id={result.primaryId} lines={result.lines} locale={locale} count={result.changingLines.length} /><div className="mx-auto grid size-11 place-items-center rounded-full border border-border bg-background text-muted-foreground"><ArrowRight className="size-4 md:block" /><ArrowDown className="size-4 md:hidden" /></div><HexagramCard label={t.relating} id={result.relatingId} lines={result.lines.map((line) => ({ ...line, yin: line.changing ? !line.yin : line.yin, changing: false }))} locale={locale} /></div><p className="mt-4 text-xs leading-6 text-muted-foreground">{t.changeNote}</p>
<div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2"><div className="bg-card p-7 sm:p-9"><p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">{t.reading}</p><h3 className="mt-3 font-serif text-3xl">{primary?.theme[locale]}</h3><p className="mt-5 text-sm leading-8 text-muted-foreground">{primary?.reading[locale]}</p><p className="mt-6 border-l-2 border-[color:var(--accent)]/60 pl-4 text-sm leading-7 text-foreground dark:border-[color:var(--gold)]/60">{primary?.advice[locale]}</p></div><div className="bg-card p-7 sm:p-9"><p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">{t.keywords}</p><div className="mt-5 flex flex-wrap gap-2">{primary?.keywords[locale].map((keyword) => <span key={keyword} className="border border-border px-3 py-1.5 text-xs text-muted-foreground">{keyword}</span>)}</div><p className="mt-10 text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">{t.direction}</p><div className="mt-5 space-y-4">{primary?.action[locale].map((item, index) => <div key={item} className="flex gap-3 text-sm leading-7"><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span><p>{item}</p></div>)}</div></div></div><div className="mt-7 flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center"><p className="max-w-xl text-xs leading-6 text-muted-foreground">{t.disclaimer}</p><div className="flex gap-2"><Button type="button" variant="outline" className="h-11 rounded-none" onClick={download}><Download className="mr-2 size-4" />{t.download}</Button><Button type="button" variant="outline" className="h-11 rounded-none" onClick={reset}><RotateCcw className="mr-2 size-4" />{t.again}</Button></div></div></section>}</div></div></div><div className="absolute -right-28 top-20 -z-10 size-72 rounded-full border border-[color:var(--accent)]/15 dark:border-[color:var(--gold)]/15" /></div>;
}
