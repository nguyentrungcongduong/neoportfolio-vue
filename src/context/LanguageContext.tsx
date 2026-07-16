import { createContext, useContext, useState } from "react";
import vi from "@/i18n/vi";
import en from "@/i18n/en";

type Lang = "vi" | "en";
type Translations = typeof vi;

interface LangCtx {
  lang: Lang;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LangCtx>({
  lang: "vi",
  toggleLang: () => {},
  t: vi,
});

export const useLang = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("lang") as Lang) ?? "vi";
  });

  const toggleLang = () => {
    setLang((l) => {
      const next = l === "vi" ? "en" : "vi";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  const t = lang === "vi" ? vi : en;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
