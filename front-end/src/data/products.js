// src/data/products.js
import watchGold from "../assets/images/02.png";
import watchSilver from "../assets/images/01.png";

export const initialProducts = [
  {
    id: 1,
    name: 'Chronos Élégance',
    price: 12000,
    img: watchGold,
    images: [watchGold, watchSilver, watchGold, watchSilver, watchGold],
    tag: 'Or Rose',
    stock: true,
    isNew: true,
    rating: 5,
    reviews: 120,
    description: "Des montres façonnées avec des matériaux soignés, alliant élégance intemporelle et précision horlogère pour accompagner chaque instant de votre journée.",
    colors: [
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold },
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver }
    ],
    bracelets: [
      { label: 'Acier Doré', img: watchGold },
      { label: 'Acier Argenté', img: watchSilver }
    ],
    tailles: ['36 mm', '40 mm']
  },
  {
    id: 2,
    name: 'Chronos Sport',
    price: 15500,
    img: watchSilver,
    images: [watchSilver, watchGold, watchSilver],
    tag: 'Acier',
    stock: true,
    isNew: false,
    rating: 5,
    reviews: 98,
    description: "Pensée pour les esprits dynamiques, alliant robustesse et raffinement.",
    colors: [
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver },
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold }
    ],
    bracelets: [
      { label: 'Acier Argenté', img: watchSilver },
      { label: 'Acier Doré', img: watchGold }
    ],
    tailles: ['40 mm', '42 mm']
  },
  {
    id: 3,
    name: 'Le Méridien Or',
    price: 18000,
    img: watchGold,
    images: [watchGold, watchSilver, watchGold, watchSilver],
    tag: 'Édition Spéciale',
    stock: true,
    isNew: true,
    rating: 4,
    reviews: 64,
    description: "Édition limitée au boîtier ultra fin et mouvement automatique d'une grande précision.",
    colors: [
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold },
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver }
    ],
    bracelets: [
      { label: 'Acier Doré', img: watchGold },
      { label: 'Acier Argenté', img: watchSilver }
    ],
    tailles: ['38 mm', '40 mm']
  },
  {
    id: 4,
    name: 'Chronos Classic Noir',
    price: 14000,
    img: watchSilver,
    images: [watchSilver, watchGold],
    tag: 'Acier brossé',
    stock: false,
    isNew: false,
    rating: 5,
    reviews: 140,
    description: "L'élégance sobre au poignet avec cadran sombre et finitions brossées.",
    colors: [
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver },
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold }
    ],
    bracelets: [
      { label: 'Acier Argenté', img: watchSilver },
      { label: 'Acier Doré', img: watchGold }
    ],
    tailles: ['40 mm']
  },
  {
    id: 5,
    name: 'Chronos Prestige Gold',
    price: 22000,
    img: watchGold,
    images: [watchGold, watchSilver, watchGold, watchSilver, watchGold],
    tag: 'Luxe',
    stock: true,
    isNew: true,
    rating: 5,
    reviews: 45,
    description: "Modèle de haute horlogerie, finitions satinées et polies à la main.",
    colors: [
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold },
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver }
    ],
    bracelets: [
      { label: 'Acier Doré', img: watchGold },
      { label: 'Acier Argenté', img: watchSilver }
    ],
    tailles: ['40 mm']
  },
  {
    id: 6,
    name: 'Chronos Aviateur',
    price: 16500,
    img: watchSilver,
    images: [watchSilver, watchGold, watchSilver],
    tag: 'Acier brossé',
    stock: true,
    isNew: false,
    rating: 4,
    reviews: 82,
    description: "Inspirée des chronographes de bord d'aviation.",
    colors: [
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver },
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold }
    ],
    bracelets: [
      { label: 'Acier Argenté', img: watchSilver },
      { label: 'Acier Doré', img: watchGold }
    ],
    tailles: ['42 mm']
  },
  {
    id: 7,
    name: 'Le Riviera Bleu Saphir',
    price: 21500,
    img: watchSilver,
    images: [watchSilver, watchGold, watchSilver, watchGold],
    tag: 'Sport Chic',
    stock: true,
    isNew: true,
    rating: 5,
    reviews: 74,
    description: "Un hommage au chic méditerranéen avec cadran texturé et bracelet intégré en acier.",
    colors: [
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver },
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold }
    ],
    bracelets: [
      { label: 'Acier Argenté', img: watchSilver },
      { label: 'Acier Doré', img: watchGold }
    ],
    tailles: ['40 mm', '42 mm']
  },
  {
    id: 8,
    name: 'Chronos Nocturne Full Black',
    price: 19000,
    img: watchSilver,
    images: [watchSilver, watchGold],
    tag: 'Black Édition',
    stock: true,
    isNew: true,
    rating: 5,
    reviews: 58,
    description: "Une silhouette ténébreuse et affirmée. Conçue pour ceux qui cultivent l'audace.",
    colors: [
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver },
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold }
    ],
    bracelets: [
      { label: 'Acier Argenté', img: watchSilver },
      { label: 'Acier Doré', img: watchGold }
    ],
    tailles: ['41 mm']
  },
  {
    id: 9,
    name: 'L’Héritage Automatique',
    price: 25000,
    img: watchGold,
    images: [watchGold, watchSilver, watchGold, watchSilver, watchGold],
    tag: 'Automatique',
    stock: true,
    isNew: false,
    rating: 5,
    reviews: 112,
    description: "Véritable prouesse horlogère avec fond de boîte transparent révélant la mécanique complexe.",
    colors: [
      { id: 'gold', hex: '#F2D16B', label: 'Or Jaune', img: watchGold },
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver }
    ],
    bracelets: [
      { label: 'Acier Doré', img: watchGold },
      { label: 'Acier Argenté', img: watchSilver }
    ],
    tailles: ['39 mm', '41 mm']
  },
  {
    id: 10,
    name: 'Chronos Nautic Diver',
    price: 17500,
    img: watchSilver,
    images: [watchSilver, watchGold, watchSilver],
    tag: 'Plongeur 10 ATM',
    stock: true,
    isNew: false,
    rating: 4,
    reviews: 89,
    description: "Lunette unidirectionnelle crantée, aiguilles photoluminescentes et étanchéité renforcée.",
    colors: [
      { id: 'silver', hex: '#cfd0d2', label: 'Acier', img: watchSilver },
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold }
    ],
    bracelets: [
      { label: 'Acier Argenté', img: watchSilver },
      { label: 'Acier Doré', img: watchGold }
    ],
    tailles: ['42 mm', '44 mm']
  },
  {
    id: 11,
    name: 'Chronos Royal Moonphase',
    price: 28000,
    img: watchGold,
    images: [watchGold, watchSilver, watchGold, watchSilver],
    tag: 'Haute Horlogerie',
    stock: false,
    isNew: true,
    rating: 5,
    reviews: 31,
    description: "Complication phases de lune à 6 heures, chiffres appliqués et finition guillochée.",
    colors: [
      { id: 'gold', hex: '#F2D16B', label: 'Or Rose', img: watchGold },
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver }
    ],
    bracelets: [
      { label: 'Acier Doré', img: watchGold },
      { label: 'Acier Argenté', img: watchSilver }
    ],
    tailles: ['40 mm']
  },
  {
    id: 12,
    name: 'Le Minimaliste Pure Gold',
    price: 13500,
    img: watchGold,
    images: [watchGold, watchSilver],
    tag: 'Minimaliste',
    stock: true,
    isNew: false,
    rating: 4,
    reviews: 105,
    description: "Un boîtier ultra-plat de seulement 7 mm d'épaisseur, épuré à l'extrême.",
    colors: [
      { id: 'gold', hex: '#F2D16B', label: 'Or', img: watchGold },
      { id: 'silver', hex: '#cfd0d2', label: 'Argent', img: watchSilver }
    ],
    bracelets: [
      { label: 'Acier Doré', img: watchGold },
      { label: 'Acier Argenté', img: watchSilver }
    ],
    tailles: ['36 mm', '39 mm']
  }
];