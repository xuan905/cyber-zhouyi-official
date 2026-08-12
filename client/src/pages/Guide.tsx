/* Style note: The install guide is a calm field manual—editorial type, numbered annotations, ink rules, and gold metadata—so technical onboarding still feels like Cyber Zhouyi. */
import { ArrowDown, ArrowUpRight, Check, Copy, ExternalLink, Github, LockKeyhole, Package, Terminal } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useLocale } from "../contexts/LocaleContext";

const guideCopy = {
  "zh-TW": {
    eyebrow: "SKILL FIELD MANUAL / 01",
    title: "把 Skill 裝進你的工作流。",
    intro: "zhouyi-site-skill 將賽博周易的設計、起卦與分享卡片流程整理成可重複使用的 Skill。從一個空白的前端專案開始，逐步得到一個能提問、觀看變化並帶走方向的網站。",
    badge: "zhouyi-site-skill",
    version: "READY TO INSTALL",
    start: "快速開始",
    steps: [
      { number: "01", title: "從 ClawHub 安裝", body: "在 ClawHub 搜尋 zhouyi-site-skill，開啟 Skill 詳情後選擇安裝。安裝完成後，Manus 會在你提出周易網站、起卦互動或相關前端需求時載入這套工作流。", code: "搜尋：zhouyi-site-skill\n動作：Install / Add to My Skills" },
      { number: "02", title: "從 Skill 套件安裝", body: "如果你已下載 .skill 發布檔，請在 Manus 的 Skills 管理介面選擇加入，預覽 SKILL.md 後確認安裝。這種方式適合離線保存或團隊內部分享。", code: "檔案：zhouyi-site-skill.skill\n入口：Skills → Add to My Skills" },
      { number: "03", title: "複製 GitHub 專案", body: "網站原始碼與 GitHub Pages 部署設定位於公開倉庫。複製專案後即可在本機預覽網站，或以 GitHub Actions 自動發布。", code: "git clone https://github.com/xuan905/cyber-zhouyi-official.git\ncd cyber-zhouyi-official\npnpm install && pnpm dev" },
    ],
    included: "Skill 會處理什麼？",
    includedBody: "它不是單一頁面的模板，而是一套可重複使用的產品工作流：確立新東方視覺、建立繁中／簡中／英文內容、實作三幣六爻、保存本機歷史紀錄，以及產生高畫質 PNG 分享卡片。",
    capabilities: ["白棕墨黑／黑金雙主題", "繁中、簡中、英文內容架構", "三幣六爻與 64 卦資料模型", "localStorage 歷史紀錄", "Canvas PNG 分享卡片"],
    verify: "安裝後驗證",
    verifyBody: "安裝完成後，直接提出一個具體需求，例如「建立一個繁體中文、黑金夜間主題的周易起卦頁，並加入歷史紀錄與分享卡片」。Skill 應該先確認風格與資料模型，再進入實作與驗證。",
    security: "安全提醒",
    securityBody: "網站前端不需要 GitHub Token、ClawHub API Key 或其他私密憑證。請使用 GitHub CLI 登入、SSH 金鑰或 GitHub Actions 的內建權限；不要把 Token 放入 React、Vite 環境變數、README 或公開倉庫。",
    source: "查看 GitHub 原始碼",
    cast: "進入起卦室",
    back: "返回首頁",
    copy: "複製指令",
    copied: "已複製",
  },
  "zh-CN": {
    eyebrow: "SKILL FIELD MANUAL / 01",
    title: "把 Skill 装进你的工作流。",
    intro: "zhouyi-site-skill 将赛博周易的设计、起卦与分享卡片流程整理成可重复使用的 Skill。从一个空白的前端项目开始，逐步得到一个能提问、观看变化并带走方向的网站。",
    badge: "zhouyi-site-skill",
    version: "READY TO INSTALL",
    start: "快速开始",
    steps: [
      { number: "01", title: "从 ClawHub 安装", body: "在 ClawHub 搜索 zhouyi-site-skill，打开 Skill 详情后选择安装。安装完成后，Manus 会在你提出周易网站、起卦互动或相关前端需求时载入这套工作流。", code: "搜索：zhouyi-site-skill\n动作：Install / Add to My Skills" },
      { number: "02", title: "从 Skill 套件安装", body: "如果你已下载 .skill 发布文件，请在 Manus 的 Skills 管理界面选择加入，预览 SKILL.md 后确认安装。这种方式适合离线保存或团队内部分享。", code: "文件：zhouyi-site-skill.skill\n入口：Skills → Add to My Skills" },
      { number: "03", title: "复制 GitHub 项目", body: "网站源代码与 GitHub Pages 部署设置位于公开仓库。复制项目后即可在本机预览网站，或以 GitHub Actions 自动发布。", code: "git clone https://github.com/xuan905/cyber-zhouyi-official.git\ncd cyber-zhouyi-official\npnpm install && pnpm dev" },
    ],
    included: "Skill 会处理什么？",
    includedBody: "它不是单一页面的模板，而是一套可重复使用的产品工作流：确立新东方视觉、建立繁中／简中／英文内容、实现三币六爻、保存本地历史记录，以及生成高画质 PNG 分享卡片。",
    capabilities: ["白棕墨黑／黑金双主题", "繁中、简中、英文内容架构", "三币六爻与 64 卦数据模型", "localStorage 历史记录", "Canvas PNG 分享卡片"],
    verify: "安装后验证",
    verifyBody: "安装完成后，直接提出一个具体需求，例如「建立一个简体中文、黑金夜间主题的周易起卦页，并加入历史记录与分享卡片」。Skill 应该先确认风格与数据模型，再进入实现与验证。",
    security: "安全提醒",
    securityBody: "网站前端不需要 GitHub Token、ClawHub API Key 或其他私密凭证。请使用 GitHub CLI 登录、SSH 密钥或 GitHub Actions 的内置权限；不要把 Token 放入 React、Vite 环境变量、README 或公开仓库。",
    source: "查看 GitHub 源代码",
    cast: "进入起卦室",
    back: "返回首页",
    copy: "复制指令",
    copied: "已复制",
  },
  en: {
    eyebrow: "SKILL FIELD MANUAL / 01",
    title: "Put the Skill in your workflow.",
    intro: "zhouyi-site-skill turns the Cyber Zhouyi design, casting, and share-card process into a reusable Skill. Start from a blank frontend project and arrive at a site that frames questions, watches change, and carries a direction forward.",
    badge: "zhouyi-site-skill",
    version: "READY TO INSTALL",
    start: "Quick start",
    steps: [
      { number: "01", title: "Install from ClawHub", body: "Search for zhouyi-site-skill in ClawHub, open the Skill detail page, and choose install. Manus can then load this workflow when you ask for an I Ching website, casting interaction, or related frontend work.", code: "Search: zhouyi-site-skill\nAction: Install / Add to My Skills" },
      { number: "02", title: "Install the Skill package", body: "If you downloaded the .skill distribution file, add it from Manus Skills management, preview SKILL.md, and confirm installation. This route works well for offline storage or team sharing.", code: "File: zhouyi-site-skill.skill\nPath: Skills → Add to My Skills" },
      { number: "03", title: "Clone the GitHub project", body: "The website source and GitHub Pages workflow live in the public repository. Clone it to preview locally or publish automatically through GitHub Actions.", code: "git clone https://github.com/xuan905/cyber-zhouyi-official.git\ncd cyber-zhouyi-official\npnpm install && pnpm dev" },
    ],
    included: "What does the Skill cover?",
    includedBody: "It is not a single-page template. It is a reusable product workflow covering Neo-Oriental visual direction, Traditional／Simplified Chinese and English content, three-coin casting, local reading history, and high-resolution PNG share cards.",
    capabilities: ["Rice / ink / black and black / gold themes", "Traditional Chinese, Simplified Chinese, and English", "Three-coin casting and 64-hexagram model", "localStorage reading history", "Canvas PNG share cards"],
    verify: "Verify after install",
    verifyBody: "After installation, ask for a concrete task such as “Build an I Ching casting page with a black-and-gold night theme, reading history, and share cards.” The Skill should establish the visual direction and data model before implementation and verification.",
    security: "Security note",
    securityBody: "The frontend does not need a GitHub Token, ClawHub API Key, or private credential. Use GitHub CLI login, SSH keys, or GitHub Actions permissions; never place tokens in React, Vite environment variables, README files, or public repositories.",
    source: "View GitHub source",
    cast: "Enter the casting room",
    back: "Back to overview",
    copy: "Copy command",
    copied: "Copied",
  },
} as const;

function CodeBlock({ code, copyLabel, copiedLabel }: { code: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const copyCode = async () => {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return <div className="relative mt-6 overflow-hidden border border-foreground/15 bg-foreground p-5 text-background dark:border-[color:var(--gold)]/30"><div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-background/45"><span className="flex items-center gap-2"><Terminal className="size-3" />CLI / INSTALL</span><button type="button" onClick={copyCode} className="inline-flex items-center gap-1.5 text-background/65 transition-colors hover:text-[color:var(--gold)]"><Copy className="size-3" />{copied ? copiedLabel : copyLabel}</button></div><pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-7 text-background/90"><code>{code}</code></pre></div>;
}

export default function Guide() {
  const { locale } = useLocale();
  const copy = guideCopy[locale];
  return <div className="relative overflow-hidden"><section className="border-b border-border/70"><div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-5 py-16 md:grid-cols-[0.35fr_0.65fr] md:px-10 md:py-24 lg:px-14"><div><div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--accent)] dark:text-[color:var(--gold)]"><span className="h-px w-8 bg-current" />{copy.eyebrow}</div><h1 className="mt-7 max-w-xl font-serif text-5xl leading-[1.04] tracking-[-0.04em] sm:text-7xl">{copy.title}</h1><p className="mt-7 max-w-md text-base leading-8 text-muted-foreground">{copy.intro}</p><Link href="/" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold hover:text-[color:var(--accent)] dark:hover:text-[color:var(--gold)]"><ArrowDown className="size-4" />{copy.back}</Link></div><div className="relative border border-border bg-card/55 p-6 shadow-[0_24px_70px_rgba(41,31,24,0.06)] backdrop-blur-md dark:border-[color:var(--gold)]/25 dark:bg-card/50 sm:p-10"><div className="absolute right-8 top-8 flex w-16 flex-col gap-1.5 opacity-40">{[1, 0, 1, 1, 0, 1].map((line, index) => <span key={index} className={`h-1 ${line ? "bg-foreground" : "border border-foreground/40"}`} />)}</div><div className="flex items-center justify-between border-b border-border pb-6"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center border border-[color:var(--accent)]/45 text-[color:var(--accent)] dark:border-[color:var(--gold)]/45 dark:text-[color:var(--gold)]"><Package className="size-4" /></span><div><p className="font-serif text-xl">{copy.badge}</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{copy.version}</p></div></div><span className="font-mono text-[10px] text-muted-foreground">SKILL / 01</span></div><div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border"><div className="bg-background p-5"><p className="font-mono text-3xl text-[color:var(--accent)] dark:text-[color:var(--gold)]">3</p><p className="mt-2 text-xs text-muted-foreground">locales</p></div><div className="bg-background p-5"><p className="font-mono text-3xl text-[color:var(--accent)] dark:text-[color:var(--gold)]">64</p><p className="mt-2 text-xs text-muted-foreground">patterns</p></div></div></div></div></section><main className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28 lg:px-14"><section id="quick-start" className="grid grid-cols-1 gap-12 md:grid-cols-[0.28fr_0.72fr]"><div><p className="text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">{copy.start}</p><h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Install once.<br />Build with intention.</h2></div><div className="space-y-5">{copy.steps.map((step) => <article key={step.number} className="border border-border bg-card/55 p-6 backdrop-blur-md transition-colors hover:border-[color:var(--accent)]/55 dark:hover:border-[color:var(--gold)]/55 sm:p-8"><div className="flex items-start gap-5"><span className="font-mono text-xs text-[color:var(--accent)] dark:text-[color:var(--gold)]">{step.number}</span><div className="min-w-0 flex-1"><h3 className="font-serif text-2xl">{step.title}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{step.body}</p><CodeBlock code={step.code} copyLabel={copy.copy} copiedLabel={copy.copied} /></div></div></article>)}</div></section><section className="mt-24 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2"><div className="bg-foreground p-8 text-background sm:p-12"><div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--gold)]"><Check className="size-4" />{copy.included}</div><p className="mt-8 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">{copy.includedBody}</p><div className="mt-10 space-y-4">{copy.capabilities.map((item) => <div key={item} className="flex gap-3 text-sm text-background/75"><Check className="mt-1 size-4 shrink-0 text-[color:var(--gold)]" />{item}</div>)}</div></div><div className="bg-card p-8 sm:p-12"><p className="text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">02 / {copy.verify}</p><h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">Ask for a direction,<br />not a decoration.</h2><p className="mt-7 text-sm leading-8 text-muted-foreground">{copy.verifyBody}</p><a href="https://github.com/xuan905/cyber-zhouyi-official" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:text-[color:var(--accent)] dark:hover:text-[color:var(--gold)]">{copy.source}<Github className="size-4" /><ExternalLink className="size-3" /></a></div></section><section className="mt-6 border border-[color:var(--accent)]/35 bg-[color:var(--accent)]/5 p-6 dark:border-[color:var(--gold)]/30 dark:bg-[color:var(--gold)]/5 sm:p-8"><div className="flex items-start gap-4"><LockKeyhole className="mt-1 size-5 shrink-0 text-[color:var(--accent)] dark:text-[color:var(--gold)]" /><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)] dark:text-[color:var(--gold)]">{copy.security}</p><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{copy.securityBody}</p></div></div></section><div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"><Link href="/divination" className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-foreground/90">{copy.cast}<ArrowUpRight className="size-4" /></Link><a href="https://github.com/xuan905/cyber-zhouyi-official" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">{copy.source}<ArrowUpRight className="size-4" /></a></div></main></div>;
}
