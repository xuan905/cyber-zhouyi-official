/* Style note: Neo-Orientalism with ivory paper, walnut-brown ink, and an obsidian/gold night mode. Keep navigation quiet, editorial, and asymmetric. */
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Moon, Sun, Languages, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useLocale, type Locale } from "../contexts/LocaleContext";
import { useTheme } from "../contexts/ThemeContext";

const labels = {
  "zh-TW": { home: "首頁", divination: "起卦", guide: "使用指南", github: "GitHub", toggle: "切換主題", language: "語言" },
  "zh-CN": { home: "首页", divination: "起卦", guide: "使用指南", github: "GitHub", toggle: "切换主题", language: "语言" },
  en: { home: "Overview", divination: "Cast a reading", guide: "Guide", github: "GitHub", toggle: "Toggle theme", language: "Language" },
} as const;

export default function SiteShell({ children }: { children: ReactNode }) {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = labels[locale];

  const changeLocale = (next: Locale) => {
    setLocale(next);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 lg:px-14">
          <Link href="/" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="relative grid size-10 place-items-center overflow-hidden border border-foreground/20 bg-foreground shadow-[0_8px_24px_rgba(28,25,23,0.14)] transition-transform duration-300 group-hover:-rotate-6">
              <img src={`${import.meta.env.BASE_URL}assets/cyber-zhouyi-mark.svg`} alt="" className="size-full object-cover" />
            </span>
            <span>
              <span className="block font-serif text-lg font-semibold tracking-[0.18em]">賽博周易</span>
              <span className="block text-[9px] uppercase tracking-[0.28em] text-muted-foreground">CYBER ZHOUYI</span>
            </span>
          </Link>

          <button type="button" className="rounded-full p-2 text-muted-foreground hover:bg-accent md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Open menu">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <nav className={`${menuOpen ? "absolute left-0 right-0 top-full flex border-b border-border bg-background px-5 pb-5 pt-3 shadow-lg" : "hidden"} flex-col gap-4 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`} aria-label="Primary">
            <Link href="/" onClick={() => setMenuOpen(false)} className={`text-sm transition-colors ${location === "/" ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{copy.home}</Link>
            <Link href="/divination" onClick={() => setMenuOpen(false)} className={`text-sm transition-colors ${location === "/divination" ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{copy.divination}</Link>
            <Link href="/guide" onClick={() => setMenuOpen(false)} className={`text-sm transition-colors ${location === "/guide" ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{copy.guide}</Link>
            <a href="https://github.com/xuan905/cyber-zhouyi-official" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">{copy.github}<ArrowUpRight className="size-3" /></a>

            <span className="hidden h-5 w-px bg-border md:block" />
            <div className="flex items-center gap-1">
              {(["zh-TW", "zh-CN", "en"] as Locale[]).map((item) => (
                <button key={item} type="button" onClick={() => changeLocale(item)} className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${locale === item ? "bg-foreground text-background" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>{item === "zh-TW" ? "繁" : item === "zh-CN" ? "简" : "EN"}</button>
              ))}
            </div>
            <Button type="button" variant="ghost" size="icon" className="size-9 rounded-full" onClick={toggleTheme} aria-label={copy.toggle} title={copy.toggle}>
              {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4 text-[color:var(--gold)]" />}
            </Button>
            <span className="sr-only">{copy.language}: <Languages className="inline size-3" /></span>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border/70 bg-background">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <p>© 2026 Cyber Zhouyi · A reflective tool for clearer decisions.</p>
          <p className="font-mono uppercase tracking-[0.2em]">Question → Pattern → Direction</p>
        </div>
      </footer>
    </div>
  );
}
