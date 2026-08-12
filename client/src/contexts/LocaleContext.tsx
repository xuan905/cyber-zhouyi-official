import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "zh-TW" | "zh-CN" | "en";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = window.localStorage.getItem("cyber-zhouyi-locale");
    return stored === "zh-CN" || stored === "en" ? stored : "zh-TW";
  });

  useEffect(() => {
    window.localStorage.setItem("cyber-zhouyi-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => setLocaleState(nextLocale),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
