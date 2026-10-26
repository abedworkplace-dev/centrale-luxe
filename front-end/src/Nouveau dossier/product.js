// src/data/products.js
import watchGold from "../assets/images/02.png";
import watchSilver from "../assets/images/01.png";

export const PRODUCTS = [
  {
    id: 1,
    name: "Chronos Élégance Or",
    tag: "Or Jaune",
    price: 12000,
    oldPrice: 16000,
    img: watchGold,
    images: [watchGold, watchSilver, watchGold, watchSilver],
    isNew: true,
    rating: 5,
    reviews: 120,
    stock: true,
    colors: [
      { id: "gold", name: "Or Jaune", hex: "#F2D16B" },
      { id: "silver", name: "Argent", hex: "#cfd0d2" },
      { id: "black", name: "Noir Onyx", hex: "#111111" },
    ],
    bracelets: ["Cuir marron", "Acier inoxydable", "Maille milanaise"],
    tailles: ["36 mm", "40 mm"],
    description:
      "Alliant le raffinement de l'horlogerie moderne et la robustesse des matériaux nobles. Son cadran soleillé capte la lumière pour un éclat unique au poignet.",
  },
  {
    id: 2,
    name: "Chronos Sport Acier",
    tag: "Acier",
    price: 15500,
    oldPrice: 19000,
    img: watchSilver,
    images: [watchSilver, watchGold, watchSilver, watchGold],
    isNew: false,
    rating: 5,
    reviews: 98,
    stock: true,
    colors: [
      { id: "silver", name: "Argent", hex: "#cfd0d2" },
      { id: "black", name: "Noir", hex: "#111111" },
    ],
    bracelets: ["Acier inoxydable", "Silicone sport"],
    tailles: ["40 mm", "42 mm"],
    description:
      "Conçue pour un mode de vie dynamique sans compromis sur l'élégance. Boîtier ultra-résistant et étanchéité optimisée.",
  },
  {
    id: 3,
    name: "Le Méridien Prestige",
    tag: "Or Rose",
    price: 22000,
    oldPrice: 28000,
    img: watchGold,
    images: [watchGold, watchSilver, watchGold],
    isNew: true,
    rating: 5,
    reviews: 84,
    stock: true,
    colors: [
      { id: "rose-gold", name: "Or Rose", hex: "#b76e79" },
      { id: "gold", name: "Or Jaune", hex: "#F2D16B" },
    ],
    bracelets: ["Maille milanaise", "Cuir noir"],
    tailles: ["36 mm", "40 mm"],
    description:
      "Le chef-d'œuvre de la maison Central Luxe. Finitions brossées et détails polis à la main pour une présence affirmée.",
  },
  {
    id: 4,
    name: "Chronos Classic Silver",
    tag: "Classique",
    price: 13500,
    oldPrice: null,
    img: watchSilver,
    images: [watchSilver, watchGold],
    isNew: false,
    rating: 4,
    reviews: 42,
    stock: false, // Exemple de produit en rupture
    colors: [
      { id: "silver", name: "Argent", hex: "#cfd0d2" },
    ],
    bracelets: ["Cuir noir", "Cuir marron"],
    tailles: ["38 mm", "40 mm"],
    description:
      "L'essentiel du style intemporel. Une montre discrète et polyvalente pensée pour le quotidien.",
  },
  {
    id: 5,
    name: "Chronos Black Edition",
    tag: "Édition Limitée",
    price: 18000,
    oldPrice: 22000,
    img: watchSilver,
    images: [watchSilver, watchGold],
    isNew: true,
    rating: 5,
    reviews: 67,
    stock: true,
    colors: [
      { id: "black", name: "Noir Mat", hex: "#111111" },
    ],
    bracelets: ["Acier noir mat", "Cuir surpiqué"],
    tailles: ["40 mm", "42 mm"],
    description:
      "Une allure furtive et affirmée. Verre saphir inrayable et fond de boîte gravé en édition numérotée.",
  },
  {
    id: 6,
    name: "Chronos Royal Gold",
    tag: "Prestige",
    price: 25000,
    oldPrice: 30000,
    img: watchGold,
    images: [watchGold, watchSilver],
    isNew: false,
    rating: 5,
    reviews: 110,
    stock: true,
    colors: [
      { id: "gold", name: "Or", hex: "#F2D16B" },
    ],
    bracelets: ["Acier or jaune", "Cuir crocodile véritable"],
    tailles: ["40 mm"],
    description:
      "L'expression suprême du luxe horloger accessible. Précision mécanique au millième de seconde.",
  },
];

// Helper pour formater les prix
export const formatPrice = (val) => {
  return new Intl.NumberFormat("fr-FR").format(val) + " XOF";
};