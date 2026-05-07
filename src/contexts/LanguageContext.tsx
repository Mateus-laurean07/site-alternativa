"use client";

import React, { createContext, useContext, useState, useEffect, startTransition } from "react";
import { translations } from "@/data/translations";

type Language = "PT" | "EN" | "ES";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "PT",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Sempre inicia com "PT" tanto no server quanto no client — evita hydration mismatch
  const [language, setLanguageState] = useState<Language>("PT");

  // Depois do mount (client only), lê a preferência salva
  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "EN" || saved === "ES" || saved === "PT") {
      // startTransition evita o aviso de "setState in effect" do lint do React 19
      startTransition(() => {
        setLanguageState(saved as Language);
      });
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] ?? translations["PT"]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
