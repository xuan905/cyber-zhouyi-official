/* Style note: Neo-Orientalism editorial landing page. Use quiet ivory space in light mode, obsidian/gold contrast in dark mode, and asymmetrical composition over generic centered cards. */
import { ArrowRight, ArrowUpRight, BookOpen, GitBranch, Layers3, MoveUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import type { CSSProperties } from "react";
import { useLocale } from "../contexts/LocaleContext";

const heroCopy = {
  "zh-TW": {
    eyebrow: "一個讓古老變化邏輯變得可讀的 Skill",
    title: "把問題放進卦象，\n把方向帶回生活。",
    body: "賽博周易將《易經》的觀察框架轉為一場安靜、可追溯的自我對話。它不替你決定，而是讓下一步更清楚。",
    primary: "開始起卦",
    secondary: "閱讀 Skill 設計",
    note: "本工具用於反思與決策整理，不構成預言、醫療、法律或財務建議。",
    scroll: "向下探索",
    system: "系統狀態",
    ready: "離線可用 · 64 卦資料庫",
    storyLabel: "01 / 為什麼是周易",
    storyTitle: "預測之外，還有觀看變化的方式。",
    storyBody: "周易的價值，不只在於得到一個吉凶答案，而是把混亂的處境拆成位置、關係、轉折與節奏。賽博周易以這套古典結構為底，加入清晰的問題輸入、可視化卦象與可執行的方向整理。",
    capabilityLabel: "02 / Skill 的工作方式",
    capabilityTitle: "從一個問題，走過三個層次。",
    c1: "提問",
    c1b: "先釐清你真正想知道的是什麼。",
    c2: "起卦",
    c2b: "以金錢卦邏輯生成六爻，呈現本卦與變卦。",
    c3: "指引",
    c3b: "把象徵語言翻譯成今天可以採取的微小行動。",
    ctaLabel: "03 / 親自體驗",
    ctaTitle: "下一步，不必一次想完。",
    ctaBody: "輸入一個真實而具體的問題，讓卦象成為你的另一面鏡子。",
    cta: "前往起卦頁",
  },
  "zh-CN": {
    eyebrow: "一个让古老变化逻辑变得可读的 Skill",
    title: "把问题放进卦象，\n把方向带回生活。",
    body: "赛博周易将《易经》的观察框架转为一场安静、可追溯的自我对话。它不替你决定，而是让下一步更清楚。",
    primary: "开始起卦",
    secondary: "阅读 Skill 设计",
    note: "本工具用于反思与决策整理，不构成预言、医疗、法律或财务建议。",
    scroll: "向下探索",
    system: "系统状态",
    ready: "离线可用 · 64 卦数据库",
    storyLabel: "01 / 为什么是周易",
    storyTitle: "预测之外，还有观看变化的方式。",
    storyBody: "周易的价值，不只在于得到一个吉凶答案，而是把混乱的处境拆成位置、关系、转折与节奏。赛博周易以这套古典结构为底，加入清晰的问题输入、可视化卦象与可执行的方向整理。",
    capabilityLabel: "02 / Skill 的工作方式",
    capabilityTitle: "从一个问题，走过三个层次。",
    c1: "提问",
    c1b: "先厘清你真正想知道的是什么。",
    c2: "起卦",
    c2b: "以金钱卦逻辑生成六爻，呈现本卦与变卦。",
    c3: "指引",
    c3b: "把象征语言翻译成今天可以采取的微小行动。",
    ctaLabel: "03 / 亲自体验",
    ctaTitle: "下一步，不必一次想完。",
    ctaBody: "输入一个真实而具体的问题，让卦象成为你的另一面镜子。",
    cta: "前往起卦页",
  },
  en: {
    eyebrow: "A Skill that makes ancient change legible",
    title: "Put the question\ninside the pattern.",
    body: "Cyber Zhouyi turns the I Ching’s way of seeing into a quiet, traceable conversation with yourself. It does not decide for you; it clarifies the next move.",
    primary: "Cast a reading",
    secondary: "Explore the Skill",
    note: "For reflection and decision framing only. Not a prediction or medical, legal, or financial advice.",
    scroll: "Explore below",
    system: "System status",
    ready: "Offline ready · 64 hexagrams",
    storyLabel: "01 / Why the I Ching",
    storyTitle: "Beyond prediction, a way to watch change.",
    storyBody: "The I Ching is valuable not because it gives a fixed verdict, but because it breaks a tangled situation into position, relationship, turning points, and rhythm. Cyber Zhouyi keeps that classical structure and adds a clear question flow, visible hexagrams, and small actions you can carry into the day.",
    capabilityLabel: "02 / How the Skill works",
    capabilityTitle: "One question, three layers.",
    c1: "Ask",
    c1b: "Name what you are actually trying to understand.",
    c2: "Cast",
    c2b: "Generate six lines through the coin method and reveal primary and relating patterns.",
    c3: "Orient",
    c3b: "Translate symbolic language into a small next move you can take today.",
    ctaLabel: "03 / Try it yourself",
    ctaTitle: "You do not have to solve the whole future today.",
    ctaBody: "Enter a real, specific question and let the hexagram become another mirror.",
    cta: "Go to the casting room",
  },
} as const;

export default function Home() {
  const { locale } = useLocale();
  const copy = heroCopy[locale];
  const heroStyle = { "--hero-image": `url("${import.meta.env.BASE_URL}assets/cyber-zhouyi-hero.jpg")` } as CSSProperties;
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border/70">
        <div style={heroStyle} className="absolute inset-0 -z-20 bg-[image:var(--hero-image)] bg-cover bg-right bg-no-repeat opacity-80 dark:opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/95 to-background/10 dark:from-background dark:via-background/80 dark:to-background/10" />
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-[1440px] grid-cols-1 items-center px-5 py-20 md:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.7fr)] md:px-10 md:py-24 lg:px-14">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-[color:var(--accent)]" />
              {copy.eyebrow}
            </div>
            <h1 className="max-w-[780px] whitespace-pre-line font-serif text-5xl font-medium leading-[0.98] tracking-[-0.04em] text-foreground sm:text-7xl lg:text-[7.5rem]">{copy.title}</h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">{copy.body}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/divination" className="group inline-flex items-center justify-center gap-3 bg-foreground px-6 py-4 text-sm font-semibold text-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(31,27,23,0.2)] active:scale-[0.98]">
                {copy.primary}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#about" className="inline-flex items-center justify-center gap-3 border border-foreground/20 px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background">{copy.secondary}<MoveUpRight className="size-4" /></a>
            </div>
            <p className="mt-5 max-w-lg text-xs leading-5 text-muted-foreground/80">{copy.note}</p>
          </div>

          <div className="relative hidden min-h-[540px] md:block">
            <div className="absolute right-0 top-[14%] w-[min(30vw,420px)] border border-foreground/15 bg-background/55 p-5 shadow-[0_30px_80px_rgba(41,31,24,0.13)] backdrop-blur-md dark:border-[color:var(--gold)]/25 dark:bg-black/35">
              <div className="mb-12 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted-foreground"><span>{copy.system}</span><span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-600 dark:bg-[color:var(--gold)]" />{copy.ready}</span></div>
              <div className="mx-auto flex w-44 flex-col gap-2 py-6">
                {["yin", "yang", "yin", "yin", "yang", "yang"].map((line, index) => <span key={index} className={`relative block h-2 ${line === "yin" ? "bg-foreground/80 after:absolute after:left-1/2 after:top-0 after:h-full after:w-3 bg-background" : "bg-foreground/80"}`} />)}
              </div>
              <div className="mt-10 flex items-end justify-between"><div><p className="font-serif text-3xl">易</p><p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">A changing pattern</p></div><span className="font-mono text-[10px] text-muted-foreground">001 / 064</span></div>
            </div>
            <div className="absolute bottom-[10%] left-[16%] size-24 rounded-full border border-[color:var(--accent)]/60 dark:border-[color:var(--gold)]/60" />
            <div className="absolute bottom-[14%] left-[23%] size-10 rounded-full bg-[color:var(--accent)]/20 dark:bg-[color:var(--gold)]/20" />
            <div className="absolute bottom-[6%] right-6 h-px w-36 bg-foreground/25" />
          </div>
        </div>
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 pb-7 text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:px-10 lg:px-14"><span className="h-px w-12 bg-border" />{copy.scroll}</div>
      </section>

      <section id="about" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.35fr_0.65fr] md:gap-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">{copy.storyLabel}</p>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div className="max-w-3xl"><h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-6xl">{copy.storyTitle}</h2><p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">{copy.storyBody}</p><div className="mt-10 h-px w-32 bg-foreground/30" /></div>
            <div className="relative aspect-[4/3] overflow-hidden border border-foreground/15 bg-foreground/[0.035] p-3 shadow-[0_22px_70px_rgba(41,31,24,0.1)] dark:border-[color:var(--gold)]/25 dark:bg-white/[0.035]"><div className="absolute inset-8 rounded-full border border-[color:var(--accent)]/35 dark:border-[color:var(--gold)]/35" /><div className="absolute inset-14 rounded-full border border-dashed border-foreground/15" /><div className="absolute left-12 right-12 top-1/2 flex -translate-y-1/2 flex-col gap-2">{[1, 0, 1, 1, 0, 1].map((line, index) => <span key={index} className={`h-1.5 ${line ? "bg-foreground/70" : "bg-transparent"}`} />)}</div><div className="absolute bottom-7 left-7 border border-background/30 bg-background/75 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground backdrop-blur">64 / PATTERN STUDY</div><span className="absolute right-8 top-8 size-3 rounded-full bg-[color:var(--accent)]/55 dark:bg-[color:var(--gold)]/60" /><span className="absolute bottom-12 right-12 size-6 rounded-full border border-[color:var(--accent)]/45 dark:border-[color:var(--gold)]/45" /></div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-muted/35">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-[1fr_0.24fr] md:items-end"><div><p className="text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">{copy.capabilityLabel}</p><h2 className="mt-5 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">{copy.capabilityTitle}</h2></div><div className="relative hidden overflow-hidden border border-border/80 bg-background/60 p-3 md:block"><div className="flex aspect-[3/4] flex-col justify-center gap-3 border border-dashed border-foreground/15 px-5">{["FORM", "CHANGE", "MOVE"].map((label, index) => <div key={label} className="flex items-center gap-2"><span className="h-px flex-1 bg-foreground/35" /><span className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground">0{index + 1} / {label}</span></div>)}</div></div></div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {[{icon: Sparkles, title: copy.c1, body: copy.c1b}, {icon: Layers3, title: copy.c2, body: copy.c2b}, {icon: GitBranch, title: copy.c3, body: copy.c3b}].map(({icon: Icon, title, body}, index) => <div key={title} className="group bg-background p-8 transition-colors hover:bg-foreground hover:text-background md:p-10"><span className="font-mono text-xs text-muted-foreground group-hover:text-background/60">0{index + 1}</span><Icon className="mt-16 size-7 text-[color:var(--accent)] transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:text-[color:var(--gold)]" /><h3 className="mt-8 font-serif text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground group-hover:text-background/70">{body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_75%_30%,rgba(212,175,55,0.55),transparent_24%),linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.08)_25.2%,transparent_25.5%)]" />
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-5 py-24 md:grid-cols-[0.35fr_0.65fr] md:px-10 md:py-32 lg:px-14"><p className="text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--gold)]">{copy.ctaLabel}</p><div><h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-6xl">{copy.ctaTitle}</h2><p className="mt-6 max-w-xl text-base leading-8 text-background/65">{copy.ctaBody}</p><Link href="/divination" className="group mt-9 inline-flex items-center gap-3 border border-background/35 px-6 py-4 text-sm font-semibold transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]">{copy.cta}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link><div className="mt-16 flex items-center gap-3 text-xs text-background/45"><ShieldCheck className="size-4" />{copy.note}</div></div></div>
      </section>
    </div>
  );
}
