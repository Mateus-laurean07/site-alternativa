"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "PT" | "EN" | "ES";

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
  },
  ES: {
    "nav.home": "Inicio",
    "nav.products": "Productos",
    "nav.about": "Nosotros",
    "nav.videos": "Videos",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.quote": "Solicitar Presupuesto",
    "hero.title": "La Evolución del Manejo Comienza Aquí",
    "hero.subtitle": "Comederos y bebederos de alta resistencia que garantizan el máximo aprovechamiento y salud para su rebaño.",
    "hero.cta": "Conocer Productos"
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
  // Sempre inicia com "PT" tanto no server quanto no client — evita hydration mismatch
  const [language, setLanguageState] = useState<Language>("PT");

  // Depois do mount (client only), lê a preferência salva
  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "EN" || saved === "ES") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    return translations[language]?.[key] || translations["PT"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
