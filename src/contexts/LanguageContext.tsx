"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "PT" | "EN";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  PT: {
    "nav.home": "Início",
    "nav.products": "Produtos",
    "nav.about": "Sobre",
    "nav.videos": "Vídeos",
    "nav.blog": "Blog",
    "nav.contact": "Contato",
    "nav.quote": "Solicitar Orçamento",
    "hero.title": "A Evolução do Manejo Começa Aqui",
    "hero.subtitle": "Cochos e bebedouros de alta resistência que garantem o máximo aproveitamento e saúde para o seu rebanho.",
    "hero.cta": "Conhecer Produtos"
  },
  EN: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.videos": "Videos",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.quote": "Request a Quote",
    "hero.title": "The Evolution of Management Starts Here",
    "hero.subtitle": "High-resistance troughs and drinkers that ensure maximum utilization and health for your herd.",
    "hero.cta": "View Products"
  }
};

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
  const [language, setLanguageState] = useState<Language>("PT");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "PT" || savedLang === "EN")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    // Default to PT on server to match initial HTML and avoid hydration errors
    if (!mounted) return translations["PT"][key] || key; 
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
