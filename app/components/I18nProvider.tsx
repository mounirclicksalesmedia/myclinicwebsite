"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { I18N, type I18nKey, type Lang } from "@/app/lib/i18n";

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: I18nKey) => string;
  pick: (en: string, ar: string) => string;
  toggle: () => void;
};

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("mc_lang")) as Lang | null;
    if (saved === "en" || saved === "ar") {
      const frame = requestAnimationFrame(() => setLang(saved));
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("mc_lang", lang);
    } catch {}
  }, [lang]);

  const t = useCallback((k: I18nKey) => I18N[lang][k] ?? (k as string), [lang]);
  const pick = useCallback((en: string, ar: string) => (lang === "ar" ? ar : en), [lang]);
  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ar" : "en")), []);

  return <Ctx.Provider value={{ lang, setLang, t, pick, toggle }}>{children}</Ctx.Provider>;
}

export function useT() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useT must be used within <I18nProvider>");
  return ctx;
}
