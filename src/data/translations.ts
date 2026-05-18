type TranslationMap = Record<string, string>;

interface Translations {
  PT: TranslationMap;
  EN: TranslationMap;
  ES: TranslationMap;
}

export const translations: Translations = {
  PT: {
    "nav.home": "Início",
    "nav.products": "Produtos",
    "nav.about": "Sobre",
    "nav.videos": "Vídeos",
    "nav.blog": "Blog",
    "nav.contact": "Contato",
    "nav.reps": "Representantes",
    "nav.quote": "Solicitar Orçamento",
    "hero.title": "A Evolução do Manejo Começa Aqui",
    "hero.subtitle": "Cochos e bebedouros de alta resistência que garantem o máximo aproveitamento e saúde para o seu rebanho.",
    "hero.cta": "Conhecer Produtos",
    "brand.name": "Cochos Plásticos",
  },
  EN: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.videos": "Videos",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.reps": "Representatives",
    "nav.quote": "Request a Quote",
    "hero.title": "The Evolution of Management Starts Here",
    "hero.subtitle": "High-resistance troughs and drinkers that ensure maximum utilization and health for your herd.",
    "hero.cta": "View Products",
    "brand.name": "Plastic Feeders",
  },
  ES: {
    "nav.home": "Inicio",
    "nav.products": "Productos",
    "nav.about": "Nosotros",
    "nav.videos": "Videos",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.reps": "Representantes",
    "nav.quote": "Solicitar Presupuesto",
    "hero.title": "La Evolución del Manejo Comienza Aquí",
    "hero.subtitle": "Comederos y bebederos de alta resistência que garantizan el máximo aprovechamiento y salud para su rebaño.",
    "hero.cta": "Conocer Productos",
    "brand.name": "Comederos Plásticos",
  },
};
