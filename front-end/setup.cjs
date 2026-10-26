const fs = require('fs');
const path = require('path');

const files = {
  // 1. DATA PRODUCTS
  'src/data/products.js': `import watchGold from "../assets/images/02.png";
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
    stock: false,
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
    bracelets: ["Acier or jaune", "Cuir véritable"],
    tailles: ["40 mm"],
    description:
      "L'expression suprême du luxe accessible. Précision mécanique exceptionnelle et présence charismatique.",
  },
  {
    id: 7,
    name: "Chronos Urban Steel",
    tag: "Sport Chic",
    price: 14000,
    oldPrice: 17500,
    img: watchSilver,
    images: [watchSilver, watchGold],
    isNew: true,
    rating: 4,
    reviews: 35,
    stock: true,
    colors: [
      { id: "silver", name: "Argent", hex: "#cfd0d2" },
    ],
    bracelets: ["Acier inoxydable", "Cuir noir"],
    tailles: ["38 mm", "40 mm"],
    description:
      "Le parfait équilibre entre élégance décontractée et précision horlogère.",
  },
  {
    id: 8,
    name: "Chronos Heritage Gold",
    tag: "Vintage",
    price: 19500,
    oldPrice: 24000,
    img: watchGold,
    images: [watchGold, watchSilver],
    isNew: false,
    rating: 5,
    reviews: 90,
    stock: true,
    colors: [
      { id: "gold", name: "Or Jaune", hex: "#F2D16B" },
    ],
    bracelets: ["Cuir marron patiné", "Acier or"],
    tailles: ["36 mm", "40 mm"],
    description:
      "Inspirée des modèles d'époque avec le savoir-faire technologique moderne.",
  },
];

export const formatPrice = (val) => {
  return new Intl.NumberFormat("fr-FR").format(val || 0) + " XOF";
};
`,

  // 2. STORE CART
  'src/store/cartSlice.js': `import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const data = localStorage.getItem("cl_cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  try {
    localStorage.setItem("cl_cart", JSON.stringify(items));
  } catch (err) {
    console.error("Erreur sauvegarde panier", err);
  }
};

const initialState = {
  items: loadCart(),
  discount: 0,
  promoCode: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const bracelet = product.selectedBracelet || product.bracelets?.[0] || "Standard";
      const taille = product.selectedTaille || product.tailles?.[0] || "";
      const color = product.selectedColor || product.colors?.[0]?.name || "";
      const qty = product.quantity || 1;

      const itemKey = \`\${product.id}-\${bracelet}-\${taille}-\${color}\`;
      const existing = state.items.find((item) => item.itemKey === itemKey);

      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({
          itemKey,
          id: product.id,
          name: product.name,
          tag: product.tag || "Montre",
          price: product.price,
          img: product.img,
          qty,
          bracelet,
          braceletOptions: product.bracelets || [],
          taille,
          tailleOptions: product.tailles || [],
          color,
        });
      }
      saveCart(state.items);
    },

    updateQty: (state, action) => {
      const { itemKey, delta } = action.payload;
      const item = state.items.find((i) => i.itemKey === itemKey);
      if (item) {
        item.qty = Math.max(1, item.qty + delta);
      }
      saveCart(state.items);
    },

    updateVariant: (state, action) => {
      const { itemKey, field, value } = action.payload;
      const item = state.items.find((i) => i.itemKey === itemKey);
      if (item) {
        item[field] = value;
        item.itemKey = \`\${item.id}-\${item.bracelet}-\${item.taille}-\${item.color}\`;
      }
      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      const itemKey = action.payload;
      state.items = state.items.filter((i) => i.itemKey !== itemKey);
      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.discount = 0;
      state.promoCode = "";
      saveCart([]);
    },

    applyPromo: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      if (code === "CENTRAL10") {
        state.promoCode = code;
        state.discount = 2000;
      } else {
        state.promoCode = "";
        state.discount = 0;
      }
    },
  },
});

export const {
  addToCart,
  updateQty,
  updateVariant,
  removeFromCart,
  clearCart,
  applyPromo,
} = cartSlice.actions;

export default cartSlice.reducer;
`,

  // 3. STORE WISHLIST
  'src/store/wishlistSlice.js': `import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  try {
    const data = localStorage.getItem("cl_wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveWishlist = (items) => {
  try {
    localStorage.setItem("cl_wishlist", JSON.stringify(items));
  } catch (err) {
    console.error("Erreur sauvegarde wishlist", err);
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((i) => i.id === product.id);
      if (exists) {
        state.items = state.items.filter((i) => i.id !== product.id);
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          tag: product.tag || "Montre",
          price: product.price,
          img: product.img,
          stock: product.stock !== undefined ? product.stock : true,
          bracelets: product.bracelets || [],
          tailles: product.tailles || [],
          colors: product.colors || [],
        });
      }
      saveWishlist(state.items);
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      saveWishlist(state.items);
    },

    clearWishlist: (state) => {
      state.items = [];
      saveWishlist([]);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
`,

  // 4. STORE INDEX
  'src/store/index.js': `import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
`,

  // 5. MAIN.JSX
  'src/main.jsx': `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
)
`,

  // 6. HEADER.JSX
  'src/header.jsx': `import { useState, useEffect } from 'react'
import logo from "./assets/images/logo/01.png"
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { BsHeadset } from "react-icons/bs";
import { Link, useLocation, NavLink } from 'react-router-dom';
import { HiBars3CenterLeft, HiXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";

const links = [
    { to: '/', label: 'Notre Maison', end: true },
    { to: '/boutique', label: 'Boutique' },
    { to: '/faq', label: 'Faq' },
    { to: '/contact', label: 'Contact' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();
    const isHome = location.pathname === '/';

    const cartItems = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const wishCount = wishlistItems.length;

    useEffect(() => {
        if (!isHome) {
            setIsScrolled(true);
            return;
        }
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
        const onResize = () => window.innerWidth > 991 && setIsOpen(false);
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className={isOpen ? 'cl-open' : ''}>
            <header className={\`\${isScrolled ? 'scrolled' : ''} \${isOpen ? 'cl-header-open' : ''}\`}>
                <div className="container">
                    <nav className="cl-nav">
                        <button
                            type="button"
                            className="cl-burger"
                            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <HiXMark /> : <HiBars3CenterLeft />}
                        </button>

                        <div className="cl-logo">
                            <Link to="/"><img src={logo} alt="Central Luxe" /></Link>
                        </div>

                        <div className="cl-menu">
                            {links.map((l) => (
                                <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>
                            ))}
                        </div>

                        <div className="cl-icons">
                            <div className="cl-icon-wrap">
                                <Link to="/wishlist" aria-label="Favoris">
                                    <CiHeart className='i' />
                                    {wishCount > 0 && <span className="cl-badge">{wishCount}</span>}
                                </Link>
                            </div>
                            <div className="cl-icon-wrap">
                                <Link to="/panier" aria-label="Panier">
                                    <CiShoppingBasket className='i' />
                                    {cartCount > 0 && <span className="cl-badge">{cartCount}</span>}
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <div className={\`cl-mobile \${isOpen ? 'open' : ''}\`} aria-hidden={!isOpen}>
                <nav className="cl-mobile-links">
                    {links.map((l, i) => (
                        <NavLink key={l.to} to={l.to} end={l.end} style={{ transitionDelay: \`\${0.08 * i + 0.1}s\` }}>
                            <span className="cl-mobile-num">0{i + 1}</span>
                            <span className="cl-mobile-label">{l.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <a href="https://wa.me/message/R4PMXGWSUYASJ1" target="_blank" rel="noreferrer" className="cl-mobile-cta">
                    <BsHeadset />
                    <span>Nous contacter</span>
                </a>
            </div>

            <a href="https://wa.me/message/R4PMXGWSUYASJ1" target="_blank" rel="noreferrer" className="cl-contact-float">
                <BsHeadset className="cl-contact-icon" />
                <span>Nous contacter</span>
            </a>
        </div>
    )
}
`,

  // 7. HOME.JSX
  'src/home.jsx': `import { useState, useEffect, useRef } from 'react'
import './App.css'
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { FaHeart, FaQuoteRight } from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FiEye, FiFeather, FiShield, FiArrowRight } from 'react-icons/fi';
import { FaCheck } from "react-icons/fa6";
import { BsShieldCheck, BsTruck, BsHeadset, BsGem, BsPlayCircle, BsPeople, BsGeoAlt } from "react-icons/bs";
import watchGold from "./assets/images/02.png"
import watchSilver from "./assets/images/01.png"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCTS, formatPrice } from './data/products';
import { addToCart } from './store/cartSlice';
import { toggleWishlist } from './store/wishlistSlice';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const colors = [
    { id: 'silver', hex: '#cfd0d2', img: watchSilver },
    { id: 'gold', hex: '#F2D16B', img: watchGold },
    { id: 'black', hex: '#111111', img: watchSilver },
];

const features = [
    'Livraison gratuite',
    'Authenticité garantie',
    'Paiement 100% sécurisé',
    'Support client réactif'
];

function Home() {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const swiperRef = useRef(null);

    const [selectedIndex, setSelectedIndex] = useState(1);
    const selectedColor = colors[selectedIndex];

    const goPrev = () => setSelectedIndex((prev) => (prev === 0 ? colors.length - 1 : prev - 1));
    const goNext = () => setSelectedIndex((prev) => (prev === colors.length - 1 ? 0 : prev + 1));

    const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 12, mins: 45, secs: 30 });

    useEffect(() => {
        const target = new Date();
        target.setDate(target.getDate() + timeLeft.days);
        target.setHours(target.getHours() + timeLeft.hours, target.getMinutes() + timeLeft.mins, target.getSeconds() + timeLeft.secs);

        const interval = setInterval(() => {
            const diff = Math.max(0, target - new Date());
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                mins: Math.floor((diff % 3600000) / 60000),
                secs: Math.floor((diff % 60000) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const pad = (n) => String(n).padStart(2, '0');
    const isFav = (id) => wishlistItems.some((i) => i.id === id);

    return (
        <div>
            <div className="cl-hero">
                <div className="container cl-hero-inner">
                    <div className="cl-hero-text">
                        <h1 className="cl-hero-title">Chronos <span>Élégance</span></h1>
                        <p className="cl-hero-sub">
                            Des montres façonnées avec des matériaux soignés, alliant élégance intemporelle et précision horlogère pour accompagner chaque instant de votre journée.
                        </p>

                        <div className="cl-hero-colors">
                            <span className="cl-colors-label">Couleurs Disponibles</span>
                            <div className="cl-colors-row">
                                {colors.map((c, index) => (
                                    <button
                                        key={c.id}
                                        className={\`cl-color-dot \${selectedIndex === index ? 'active' : ''}\`}
                                        style={{ backgroundColor: c.hex }}
                                        onClick={() => setSelectedIndex(index)}
                                        aria-label={c.id}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="cl-hero-actions">
                            <Link to="/boutique" className="btn-primary">
                                Découvrir la collection
                                <span><FiArrowRight /></span>
                            </Link>
                            <div className="cl-hero-price">
                                <span>À partir de</span>
                                <strong>12 000 XOF</strong>
                            </div>
                        </div>
                    </div>

                    <div className="cl-hero-watch">
                        <img src={selectedColor.img} alt="Montre de luxe" className="cl-watch-img" />
                    </div>

                    <div className="cl-hero-features">
                        {features.map((f) => (
                            <div className="cl-feature-item" key={f}>
                                <span className="cl-feature-dot">
                                    <FaCheck className='i' />
                                </span>
                                {f}
                            </div>
                        ))}
                    </div>

                    <div className="cl-hero-arrows">
                        <button className="cl-arrow-btn" onClick={goPrev}><HiOutlineChevronLeft /></button>
                        <button className="cl-arrow-btn" onClick={goNext}><HiOutlineChevronRight /></button>
                    </div>
                </div>
            </div>

            <section className="cl-pillars">
                <div className="container cl-pillars-inner">
                    <div className="cl-pillar-item">
                        <FiEye className="cl-pillar-bg-icon" />
                        <span className="cl-pillar-icon"><FiEye className='i' /></span>
                        <div>
                            <h3 className="cl-pillar-title">Un style qui vous distingue</h3>
                            <p className="cl-pillar-text">
                                Portez une montre qui attire les regards et affirme votre personnalité, jour après jour.
                            </p>
                        </div>
                    </div>

                    <div className="cl-pillar-item">
                        <FiFeather className="cl-pillar-bg-icon" />
                        <span className="cl-pillar-icon"><FiFeather className='i' /></span>
                        <div>
                            <h3 className="cl-pillar-title">Une qualité qui dure</h3>
                            <p className="cl-pillar-text">
                                Matériaux nobles, finitions soignées, un objet pensé pour vous accompagner des années.
                            </p>
                        </div>
                    </div>

                    <div className="cl-pillar-item">
                        <FiShield className="cl-pillar-bg-icon" />
                        <span className="cl-pillar-icon"><FiShield className='i' /></span>
                        <div>
                            <h3 className="cl-pillar-title">Un choix sans risque</h3>
                            <p className="cl-pillar-text">
                                Authenticité garantie, paiement sécurisé, service client réactif, achetez l'esprit tranquille.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cl-about">
                <div className="container">
                    <div className="cl-ab-row">
                        <div className="cl-ab-text">
                            <h1 className="cl-section-title">Notre maison</h1>
                            <h2 className="cl-section-sub-title">
                                Le style et la qualité, <span>au juste prix</span>
                            </h2>
                            <p className="cl-ab-desc">
                                Central Luxe est née d'une conviction simple : porter une belle montre ne devrait pas être un privilège. Nous choisissons chaque modèle pour son allure, son confort et sa tenue dans le temps, sans intermédiaire.
                            </p>

                            <ul className="cl-ab-features">
                                <li><span className="cl-ab-icon"><BsGem /></span><span>Design<br />soigné</span></li>
                                <li><span className="cl-ab-icon"><BsTruck /></span><span>Livraison<br />gratuite</span></li>
                                <li><span className="cl-ab-icon"><BsHeadset /></span><span>Service<br />client</span></li>
                                <li><span className="cl-ab-icon"><BsShieldCheck /></span><span>Qualité<br />garantie</span></li>
                            </ul>
                        </div>

                        <div className="cl-ab-media cl-ab-media-right">
                            <img src="https://debbijoux.com/wp-content/uploads/image_webpf28mGs.webp" alt="Central Luxe" />
                            <Link to="/boutique" className="btn-primary cl-ab-pill">
                                Collection Premium
                                <span><FiArrowRight /></span>
                            </Link>
                        </div>
                    </div>

                    <hr className="cl-ab-divider" />

                    <div className="cl-ab-row">
                        <div className="cl-ab-media cl-ab-media-left">
                            <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200" alt="Notre sélection" />
                            <div className="cl-ab-badge">
                                <BsShieldCheck />
                                <div><strong>Pièces authentiques</strong></div>
                            </div>
                        </div>

                        <div className="cl-ab-text">
                            <h1 className="cl-section-title">Notre sélection</h1>
                            <h2 className="cl-section-sub-title">
                                Une sélection exigeante, <span>en toute transparence</span>
                            </h2>
                            <p className="cl-ab-desc">
                                Nous parcourons le marché pour retenir des modèles qui allient design intemporel, matériaux soignés et fiabilité au quotidien. Plus de 600 clients nous font déjà confiance.
                            </p>

                            <div className="cl-ab-actions">
                                <Link to="/boutique" className="btn-secondary">
                                    Voir la collection
                                    <span><FiArrowRight /></span>
                                </Link>
                                <a href="#avis" className="cl-ab-link">
                                    <BsPlayCircle /> Découvrir notre univers
                                </a>
                            </div>

                            <div className="cl-ab-stats">
                                <div className="cl-ab-stat">
                                    <BsPeople />
                                    <div><strong>+600</strong><small>Clients satisfaits</small></div>
                                </div>
                                <div className="cl-ab-stat">
                                    <BsShieldCheck />
                                    <div><strong>100%</strong><small>Pièces authentiques</small></div>
                                </div>
                                <div className="cl-ab-stat">
                                    <BsGeoAlt />
                                    <div><strong>Partout</strong><small>au Bénin</small></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cl-collection">
                <div className="container">
                    <div className="cl-section-head">
                        <h1 className="cl-section-title">Notre collection</h1>
                        <h2 className="cl-section-sub-title">Trouvez la montre <span>qui vous ressemble</span></h2>
                    </div>

                    <div className="cl-collection-grid">
                        {PRODUCTS.slice(0, 8).map((p) => {
                            const favorite = isFav(p.id);
                            return (
                                <div className="cl-product-card" key={p.id}>
                                    <div className="cl-product-img-wrap">
                                        {p.isNew && <span className="cl-product-badge">New</span>}
                                        <button 
                                            className="cl-product-heart"
                                            onClick={() => dispatch(toggleWishlist(p))}
                                            aria-label="Ajouter aux favoris"
                                        >
                                            {favorite ? <FaHeart className="i" style={{ color: '#c87d08' }} /> : <CiHeart className="i" />}
                                        </button>
                                        <img src={p.img} alt={p.name} className="cl-product-img" />
                                    </div>

                                    <div className="cl-product-info">
                                        <h3 className="cl-product-name">{p.name}</h3>
                                        <span className="cl-product-price">{formatPrice(p.price)}</span>

                                        <div className="cl-product-actions">
                                            <Link to={\`/produit-details?id=\${p.id}\`} className="cl-product-discover">
                                                Découvrir
                                            </Link>
                                            <button 
                                                className="cl-product-cart-btn" 
                                                aria-label="Ajouter au panier"
                                                onClick={() => dispatch(addToCart(p))}
                                            >
                                                <CiShoppingBasket className="i" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cl-actions">
                        <Link to="/boutique" className="btn-secondary">
                            Découvrir toute la collection
                            <span><FiArrowRight /></span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="cl-testimonials" id='avis'>
                <div className="container">
                    <div className="cl-section-head center">
                        <h1 className="cl-section-title">Avis clients</h1>
                        <h2 className="cl-section-sub-title">Vos mots valent mieux <span>que nos promesses</span></h2>
                    </div>
                    <div className="cl-testimonials-track">
                        <div className="cl-stack-wrap">
                            <article className="cl-testimonial-card cl-testimonial-card--stat">
                                <div className="cl-testimonial-pagination swiper-pagination" aria-hidden="true"></div>
                                <p className="cl-testimonial-score"></p>
                                <div className="cl-testimonial-trust">
                                    <span className="cl-testimonial-avatars">
                                        <img src="https://images.unsplash.com/photo-1696603865152-74514c198a07?w=72&h=72&fit=crop&crop=faces&q=80" alt="" className="cl-testimonial-avatar-img" />
                                        <img src="https://images.unsplash.com/photo-1525103691634-22b8f578a199?w=72&h=72&fit=crop&crop=faces&q=80" alt="" className="cl-testimonial-avatar-img" />
                                        <img src="https://images.unsplash.com/photo-1598956066123-a6f006500ca4?w=72&h=72&fit=crop&crop=faces&q=80" alt="" className="cl-testimonial-avatar-img" />
                                    </span>
                                    <div className="cl-testimonial-trust-text">
                                        <p className="cl-testimonial-trust-count">1k+</p>
                                        <p className="cl-testimonial-trust-label">Clients de confiance</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            spaceBetween={20}
                            slidesPerView={2}
                            loop={true}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            onSwiper={(swiper) => { swiperRef.current = swiper; }}
                            pagination={{ el: '.cl-testimonial-pagination', clickable: true }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                1280: { slidesPerView: 2 },
                            }}
                            className="cl-testimonials-swiper"
                        >
                            <SwiperSlide>
                                <article className="cl-testimonial-card">
                                    <span className="cl-testimonial-mark" aria-hidden="true"><FaQuoteRight /></span>
                                    <p className="cl-testimonial-quote">
                                        J'étais sceptique au début mais la montre reçue à Cotonou est juste sublime. Matériaux lourds, finitions parfaites. Un vrai rapport qualité-prix.
                                    </p>
                                    <div className="cl-testimonial-author">
                                        <img src="https://images.unsplash.com/photo-1696603865152-74514c198a07?w=72&h=72&fit=crop&crop=faces&q=80" alt="" className="cl-testimonial-avatar-img cl-testimonial-avatar-img--lg" />
                                        <div><p className="cl-testimonial-name">Malik F.</p><p className="cl-testimonial-city">Cotonou</p></div>
                                    </div>
                                </article>
                            </SwiperSlide>

                            <SwiperSlide>
                                <article className="cl-testimonial-card">
                                    <span className="cl-testimonial-mark" aria-hidden="true"><FaQuoteRight /></span>
                                    <p className="cl-testimonial-quote">
                                        Livraison ultra-rapide et paiement à la livraison sans stress. J'ai pris le modèle Or Rose, tout le monde me demande où je l'ai achetée !
                                    </p>
                                    <div className="cl-testimonial-author">
                                        <img src="https://images.unsplash.com/photo-1525103691634-22b8f578a199?w=72&h=72&fit=crop&crop=faces&q=80" alt="" className="cl-testimonial-avatar-img cl-testimonial-avatar-img--lg" />
                                        <div><p className="cl-testimonial-name">Pamela D.</p><p className="cl-testimonial-city">Porto-Novo</p></div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className="cl-testimonials-nav">
                        <button type="button" className="cl-testimonials-nav-btn" aria-label="Avis précédent" onClick={() => swiperRef.current?.slidePrev()}>
                            <HiOutlineChevronLeft />
                        </button>
                        <button type="button" className="cl-testimonials-nav-btn" aria-label="Avis suivant" onClick={() => swiperRef.current?.slideNext()}>
                            <HiOutlineChevronRight />
                        </button>
                    </div>
                </div>
            </section>

            <section className="cl-promo-section">
                <div className="container">
                    <div className="cl-promo">
                        <div className="cl-promo-bg" style={{ backgroundImage: \`url(\${watchGold})\` }} aria-hidden="true" />
                        <div className="cl-promo-content">
                            <span className="cl-promo-eyebrow"><i /> Offre flash</span>
                            <h2 className="cl-promo-title">Le Méridien, <span> jusqu'à -50%</span></h2>
                            <p className="cl-promo-desc">
                                Édition limitée, stock restreint. Une fois l'offre terminée, le prix revient à la normale.
                            </p>

                            <div className="cl-promo-timer">
                                <div className="cl-promo-timer-item">
                                    <p className="cl-promo-timer-value">{pad(timeLeft.days)}</p>
                                    <p className="cl-promo-timer-label">Jours</p>
                                </div>
                                <div className="cl-promo-timer-item">
                                    <p className="cl-promo-timer-value">{pad(timeLeft.hours)}</p>
                                    <p className="cl-promo-timer-label">Heures</p>
                                </div>
                                <div className="cl-promo-timer-item">
                                    <p className="cl-promo-timer-value">{pad(timeLeft.mins)}</p>
                                    <p className="cl-promo-timer-label">Min</p>
                                </div>
                                <div className="cl-promo-timer-item">
                                    <p className="cl-promo-timer-value">{pad(timeLeft.secs)}</p>
                                    <p className="cl-promo-timer-label">Sec</p>
                                </div>
                            </div>

                            <Link to="/boutique" className="btn-primary">
                                Profiter de l'offre
                                <span><FiArrowRight /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
`,

  // 8. BOUTIQUE.JSX
  'src/boutique.jsx': `import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FiSliders, FiChevronDown } from 'react-icons/fi';
import { TbArrowsSort } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCTS, formatPrice } from './data/products';
import { addToCart } from './store/cartSlice';
import { toggleWishlist } from './store/wishlistSlice';

export default function Boutique() {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const [activeFilter, setActiveFilter] = useState('tous');
    const [sortBy, setSortBy] = useState('recommandes');

    const filters = [
        { id: 'tous', label: 'Tous' },
        { id: 'nouveautes', label: 'Nouveautés' },
        { id: 'recommandes', label: 'Recommandés' },
    ];

    const displayedProducts = PRODUCTS
        .filter((p) => {
            if (activeFilter === 'nouveautes') return p.isNew;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'prix-asc') return a.price - b.price;
            if (sortBy === 'prix-desc') return b.price - a.price;
            return 0;
        });

    const ITEMS_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const collectionRef = useRef(null);

    const totalPages = Math.ceil(displayedProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = displayedProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, sortBy]);

    const goToPage = (page) => {
        setCurrentPage(page);
        collectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const isFav = (id) => wishlistItems.some((item) => item.id === id);

    return (
        <div>
            <section className="cl-innerhero">
                <div className="container cl-innerhero-inner">
                    <h1 className="cl-innerhero-title">Notre<span> Boutique</span></h1>
                </div>
            </section>

            <section className="cl-filterbar">
                <div className="container cl-filterbar-inner">
                    <div className="cl-filterbar-left">
                        <button className="cl-filterbar-trigger" type="button">
                            <FiSliders className="cl-filterbar-icon" />
                            <span>Filtrer</span>
                        </button>
                        <span className="cl-filterbar-divider" aria-hidden="true"></span>
                        <div className="cl-filterbar-pills">
                            {filters.map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    className={\`cl-filterbar-pill \${activeFilter === f.id ? 'active' : ''}\`}
                                    onClick={() => setActiveFilter(f.id)}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="cl-filterbar-right">
                        <span className="cl-filterbar-sortlabel">
                            <TbArrowsSort className="cl-filterbar-icon" />
                            Trier par
                        </span>
                        <div className="cl-filterbar-select">
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="recommandes">Recommandés</option>
                                <option value="nouveautes">Nouveautés</option>
                                <option value="prix-asc">Prix croissant</option>
                                <option value="prix-desc">Prix décroissant</option>
                            </select>
                            <FiChevronDown />
                        </div>
                    </div>
                </div>
            </section>

            <section className="cl-collection" ref={collectionRef}>
                <div className="container">
                    <div className="cl-collection-grid">
                        {paginatedProducts.map((p) => {
                            const favorite = isFav(p.id);
                            return (
                                <div className="cl-product-card" key={p.id}>
                                    <div className="cl-product-img-wrap">
                                        {p.isNew && <span className="cl-product-badge">New</span>}
                                        <button 
                                            className="cl-product-heart"
                                            onClick={() => dispatch(toggleWishlist(p))}
                                            aria-label="Ajouter aux favoris"
                                        >
                                            {favorite ? <FaHeart className="i" style={{ color: '#c87d08' }} /> : <CiHeart className="i" />}
                                        </button>
                                        <img src={p.img} alt={p.name} className="cl-product-img" />
                                    </div>

                                    <div className="cl-product-info">
                                        <h3 className="cl-product-name">{p.name}</h3>
                                        <span className="cl-product-price">{formatPrice(p.price)}</span>

                                        <div className="cl-product-actions">
                                            <Link to={\`/produit-details?id=\${p.id}\`} className="cl-product-discover">
                                                Découvrir
                                            </Link>
                                            <button 
                                                className="cl-product-cart-btn" 
                                                aria-label="Ajouter au panier"
                                                onClick={() => dispatch(addToCart(p))}
                                            >
                                                <CiShoppingBasket className="i" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {totalPages > 1 && (
                        <nav className="cl-pagination" aria-label="Pagination">
                            <button
                                type="button"
                                className="cl-pagination-btn"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label="Page précédente"
                            >
                                <HiOutlineChevronLeft />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    className={\`cl-pagination-btn \${currentPage === page ? 'active' : ''}\`}
                                    onClick={() => goToPage(page)}
                                    aria-current={currentPage === page ? 'page' : undefined}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                type="button"
                                className="cl-pagination-btn"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                aria-label="Page suivante"
                            >
                                <HiOutlineChevronRight />
                            </button>
                        </nav>
                    )}
                </div>
            </section>
        </div>
    );
}
`,

  // 9. PRODUIT DETAILS
  'src/produitDetails.jsx': `import { useState } from 'react';
import './App.css';
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiShield, FiTruck, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCTS, formatPrice } from './data/products';
import { addToCart } from './store/cartSlice';
import { toggleWishlist } from './store/wishlistSlice';

export default function ProduitDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productId = parseInt(searchParams.get("id")) || PRODUCTS[0].id;
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isFav = wishlistItems.some((i) => i.id === product.id);

  const [activeImg, setActiveImg] = useState(product.images?.[0] || product.img);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedBracelet, setSelectedBracelet] = useState(product.bracelets?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: Number(quantity),
        selectedBracelet,
        selectedColor: selectedColor?.name,
      })
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/panier');
  };

  const similarProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div>
      <section>
        <div className="container cl-pdp">
          <div className="cl-pdp-gallery">
            <div className="cl-pdp-thumbs">
              {(product.images || [product.img]).map((imgSrc, index) => (
                <button
                  key={index}
                  className={\`cl-pdp-thumb \${activeImg === imgSrc ? 'active' : ''}\`}
                  onClick={() => setActiveImg(imgSrc)}
                >
                  <img src={imgSrc} alt="" />
                </button>
              ))}
            </div>

            <div className="cl-pdp-main">
              {product.isNew && <span className="cl-pdp-badge">Nouveau</span>}
              <img src={activeImg} alt={product.name} />
              <button className="cl-pdp-zoom" aria-label="Zoomer">
                <FiSearch />
              </button>
            </div>
          </div>

          <div className="cl-pdp-info">
            <h1 className="cl-pdp-title">{product.name}</h1>

            <div className="cl-pdp-price-row">
              <span className="cl-pdp-price">{formatPrice(product.price)}</span>
            </div>

            <p className="cl-pdp-desc">{product.description}</p>

            <div className="cl-pdp-reassurance">
              <div className="cl-pdp-reassurance-item">
                <FiTruck />
                <div><p>Livraison offerte</p><p>Partout au Bénin</p></div>
              </div>
              <div className="cl-pdp-reassurance-item">
                <FiRefreshCw />
                <div><p>Retour 30 jours</p><p>Simple et rapide</p></div>
              </div>
              <div className="cl-pdp-reassurance-item">
                <FiShield />
                <div><p>Garantie 2 ans</p><p>Qualité assurée</p></div>
              </div>
            </div>

            {product.colors?.length > 0 && (
              <div className="cl-pdp-option">
                <p className="cl-pdp-option-label">Couleurs disponibles : {selectedColor?.name}</p>
                <div className="cl-pdp-colors">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      className={\`cl-pdp-color-dot \${selectedColor?.id === c.id ? 'active' : ''}\`}
                      onClick={() => setSelectedColor(c)}
                      title={c.name}
                    >
                      <span style={{ background: c.hex }}></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.bracelets?.length > 0 && (
              <div className="cl-pdp-option">
                <p className="cl-pdp-option-label">Bracelet</p>
                <div className="cl-pdp-pills">
                  {product.bracelets.map((b) => (
                    <button
                      key={b}
                      className={\`cl-pdp-pill \${selectedBracelet === b ? 'active' : ''}\`}
                      onClick={() => setSelectedBracelet(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="cl-pdp-actions">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button className="cl-pdp-btn cl-pdp-btn--outline" onClick={handleAddToCart}>
                <CiShoppingBasket />
                Ajouter au panier
              </button>
              <button className="cl-pdp-btn cl-pdp-btn--solid" onClick={handleBuyNow}>
                Acheter maintenant
              </button>
            </div>

            <button
              className="cl-pdp-wishlist"
              onClick={() => dispatch(toggleWishlist(product))}
            >
              {isFav ? <FaHeart style={{ color: "#c87d08" }} /> : <CiHeart />}
              {isFav ? "Retirer de ma liste d'envies" : "Ajouter à ma liste d'envies"}
            </button>
          </div>
        </div>
      </section>

      <section className="cl-collection">
        <div className="container">
          <div className="title-page">
            <h2 className="cl-section-title">Montres Similaires</h2>
            <p className="cl-section-sub-title">Prolongez l’élégance avec des modèles qui vous ressemblent</p>
          </div>

          <div className="cl-collection-grid">
            {similarProducts.map((p) => (
              <div className="cl-product-card" key={p.id}>
                <div className="cl-product-img-wrap">
                  {p.isNew && <span className="cl-product-badge">New</span>}
                  <button className="cl-product-heart" onClick={() => dispatch(toggleWishlist(p))}>
                    <CiHeart className="i" />
                  </button>
                  <img src={p.img} alt={p.name} className="cl-product-img" />
                </div>

                <div className="cl-product-info">
                  <h3 className="cl-product-name">{p.name}</h3>
                  <span className="cl-product-price">{formatPrice(p.price)}</span>

                  <div className="cl-product-actions">
                    <Link to={\`/produit-details?id=\${p.id}\`} className="cl-product-discover">
                      Découvrir
                    </Link>
                    <button className="cl-product-cart-btn" onClick={() => dispatch(addToCart(p))}>
                      <CiShoppingBasket className="i" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
`,

  // 10. PANIER.JSX
  'src/panier.jsx': `import { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import './App.css';
import { Link } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { updateQty, updateVariant, removeFromCart, clearCart, applyPromo } from './store/cartSlice';
import { formatPrice } from './data/products';

export default function Panier() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const discount = useSelector((state) => state.cart.discount);
    const promoCode = useSelector((state) => state.cart.promoCode);

    const [promoInput, setPromoInput] = useState('');

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const total = Math.max(0, subtotal - discount);

    const handleApplyPromo = () => {
        dispatch(applyPromo(promoInput));
    };

    const handleWhatsAppCheckout = () => {
        if (cartItems.length === 0) return;
        let msg = "Bonjour Central Luxe, je souhaite valider ma commande :\\n\\n";
        cartItems.forEach((i, idx) => {
            msg += \`\${idx + 1}. \${i.name} (\${i.bracelet || 'Standard'} / \${i.taille || 'Taille standard'}) x\${i.qty} = \${formatPrice(i.price * i.qty)}\\n\`;
        });
        msg += \`\\nTotal : \${formatPrice(total)}\`;
        window.open(\`https://wa.me/message/R4PMXGWSUYASJ1?text=\${encodeURIComponent(msg)}\`, '_blank');
    };

    return (
        <div>
            <section className="cl-innerhero">
                <div className="container cl-innerhero-inner">
                    <h1 className="cl-innerhero-title">Mon<span> Panier</span></h1>
                </div>
            </section>

            <section className="cart">
                <div className="container">
                    <div className="cl-cart">
                        <div className="cl-cart-items">
                            <div className="cl-cart-head">
                                <h2 className="cl-cart-title">
                                    Panier <sup>{String(cartItems.length).padStart(2, '0')}</sup>
                                </h2>
                                {cartItems.length > 0 && (
                                    <button 
                                        className="cl-cart-clear" 
                                        onClick={() => dispatch(clearCart())} 
                                        aria-label="Vider le panier"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                )}
                            </div>

                            {cartItems.length === 0 ? (
                                <div className="cl-cart-empty">
                                    <p>Votre panier est actuellement vide.</p>
                                    <Link to="/boutique" className="cl-cart-checkout">
                                        Découvrir la boutique
                                    </Link>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div className="cl-cart-item" key={item.itemKey}>
                                        <div className="cl-cart-item-img">
                                            <img src={item.img} alt={item.name} />
                                        </div>

                                        <div className="cl-cart-item-body">
                                            <span className="cl-cart-item-tag">{item.tag}</span>
                                            <p className="cl-cart-item-name">{item.name}</p>

                                            <div className="cl-cart-item-variants">
                                                {item.braceletOptions?.length > 0 && (
                                                    <label className="cl-cart-select-wrap">
                                                        Bracelet :
                                                        <select
                                                            value={item.bracelet}
                                                            onChange={(e) => dispatch(updateVariant({ itemKey: item.itemKey, field: 'bracelet', value: e.target.value }))}
                                                        >
                                                            {item.braceletOptions.map((opt) => (
                                                                <option key={opt} value={opt}>{opt}</option>
                                                            ))}
                                                        </select>
                                                    </label>
                                                )}

                                                {item.tailleOptions?.length > 0 && (
                                                    <label className="cl-cart-select-wrap">
                                                        Taille :
                                                        <select
                                                            value={item.taille}
                                                            onChange={(e) => dispatch(updateVariant({ itemKey: item.itemKey, field: 'taille', value: e.target.value }))}
                                                        >
                                                            {item.tailleOptions.map((opt) => (
                                                                <option key={opt} value={opt}>{opt}</option>
                                                            ))}
                                                        </select>
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        <div className="cl-cart-item-right">
                                            <div className="cl-cart-item-icons">
                                                <button 
                                                    aria-label="Supprimer" 
                                                    onClick={() => dispatch(removeFromCart(item.itemKey))}
                                                >
                                                    <IoIosClose />
                                                </button>
                                            </div>
                                            <div className="cl-cart-item-bottom">
                                                <div className="cl-cart-qty">
                                                    <button onClick={() => dispatch(updateQty({ itemKey: item.itemKey, delta: -1 }))}>−</button>
                                                    <span>{item.qty}</span>
                                                    <button onClick={() => dispatch(updateQty({ itemKey: item.itemKey, delta: 1 }))}>+</button>
                                                </div>
                                                <span className="cl-cart-item-price">{formatPrice(item.price * item.qty)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="cl-cart-summary">
                            <h2 className="cl-cart-summary-title">Récapitulatif</h2>
                            <div className="cl-cart-summary-box">
                                <div className="cl-cart-summary-row">
                                    <span>Articles sélectionnés</span>
                                    <span>{String(cartItems.length).padStart(2, '0')} article(s)</span>
                                </div>
                                <div className="cl-cart-summary-row">
                                    <span>Sous-total</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="cl-cart-summary-row">
                                    <span>Livraison estimée</span>
                                    <span>Offerte</span>
                                </div>
                                {discount > 0 && (
                                    <div className="cl-cart-summary-row" style={{ color: '#c87d08' }}>
                                        <span>Remise ({promoCode})</span>
                                        <span>− {formatPrice(discount)}</span>
                                    </div>
                                )}

                                <hr className="cl-cart-summary-divider" />

                                <div className="cl-cart-summary-total">
                                    <span>Total à payer</span>
                                    <span>{formatPrice(total)}</span>
                                </div>

                                <div className="cl-cart-promo">
                                    <input 
                                        type="text" 
                                        placeholder="Code promo (ex: CENTRAL10)" 
                                        value={promoInput}
                                        onChange={(e) => setPromoInput(e.target.value)}
                                        disabled={cartItems.length === 0} 
                                    />
                                    <button 
                                        className="cl-cart-promo-btn" 
                                        onClick={handleApplyPromo}
                                        disabled={cartItems.length === 0}
                                    >
                                        Appliquer
                                    </button>
                                </div>

                                <button 
                                    type="button"
                                    className={\`cl-cart-checkout-alt \${cartItems.length === 0 ? 'disabled' : ''}\`}
                                    onClick={handleWhatsAppCheckout}
                                    disabled={cartItems.length === 0}
                                >
                                    Passer la commande via WhatsApp
                                </button>
                                <Link to="/boutique" className="cl-cart-checkout">Continuer mes achats</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
`,

  // 11. WISHLIST.JSX
  'src/wishlist.jsx': `import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { CiShoppingBasket } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from './store/wishlistSlice';
import { addToCart } from './store/cartSlice';
import { formatPrice } from './data/products';

export default function Wishlist() {
    const dispatch = useDispatch();
    const wishItems = useSelector((state) => state.wishlist.items);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        dispatch(removeFromWishlist(item.id));
    };

    const handleAddAllToCart = () => {
        wishItems
            .filter((i) => i.stock)
            .forEach((item) => {
                dispatch(addToCart(item));
                dispatch(removeFromWishlist(item.id));
            });
    };

    const availableCount = wishItems.filter((i) => i.stock).length;

    return (
        <div>
            <section className="cl-innerhero">
                <div className="container cl-innerhero-inner">
                    <h1 className="cl-innerhero-title">Mes<span> Favoris</span></h1>
                </div>
            </section>

            <section className="wishlist">
                <div className="container">
                    <div className="cl-wish">
                        <div className="cl-wish-items">
                            <div className="cl-wish-head">
                                <h2 className="cl-wish-title">
                                    Mes favoris <sup>{String(wishItems.length).padStart(2, '0')}</sup>
                                </h2>
                                {wishItems.length > 0 && (
                                    <button 
                                        className="cl-wish-clear" 
                                        onClick={() => dispatch(clearWishlist())} 
                                        aria-label="Vider mes favoris"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                )}
                            </div>

                            {wishItems.length === 0 ? (
                                <div className="cl-wish-empty">
                                    <p>Vous n'avez aucun favori pour le moment.</p>
                                    <Link to="/boutique" className="cl-wish-checkout">Découvrir la boutique</Link>
                                </div>
                            ) : (
                                wishItems.map((item) => (
                                    <div className="cl-wish-item" key={item.id}>
                                        <div className="cl-wish-item-img">
                                            <img src={item.img} alt={item.name} />
                                        </div>

                                        <div className="cl-wish-item-body">
                                            <span className="cl-wish-item-tag">{item.tag}</span>
                                            <p className="cl-wish-item-name">{item.name}</p>
                                            <span className={\`cl-wish-stock \${item.stock ? 'in' : 'out'}\`}>
                                                {item.stock ? 'En stock' : 'Rupture de stock'}
                                            </span>
                                        </div>

                                        <div className="cl-wish-item-right">
                                            <div className="cl-wish-item-icons">
                                                <button 
                                                    aria-label="Retirer des favoris" 
                                                    onClick={() => dispatch(removeFromWishlist(item.id))}
                                                >
                                                    <IoIosClose />
                                                </button>
                                            </div>
                                            <div className="cl-wish-item-bottom">
                                                <span className="cl-wish-item-price">{formatPrice(item.price)}</span>
                                                <button
                                                    className="cl-wish-add"
                                                    disabled={!item.stock}
                                                    onClick={() => handleAddToCart(item)}
                                                >
                                                    <CiShoppingBasket />
                                                    Ajouter au panier
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="cl-wish-summary">
                            <h2 className="cl-wish-summary-title">Ma sélection</h2>
                            <div className="cl-wish-summary-box">
                                <div className="cl-wish-summary-row">
                                    <span>Articles favoris</span>
                                    <span>{String(wishItems.length).padStart(2, '0')} articles</span>
                                </div>
                                <div className="cl-wish-summary-row">
                                    <span>Disponibles</span>
                                    <span>{String(availableCount).padStart(2, '0')} articles</span>
                                </div>

                                <hr className="cl-wish-summary-divider" />

                                <button
                                    className="cl-wish-checkout"
                                    disabled={availableCount === 0}
                                    onClick={handleAddAllToCart}
                                >
                                    Tout ajouter au panier
                                </button>
                                <Link to="/boutique" className="cl-wish-checkout-alt">Continuer mes achats</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
`
};

console.log("🚀 Mise à jour automatique du dossier src en cours...");

Object.entries(files).forEach(([filePath, content]) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`✅ Créé / mis à jour : ${filePath}`);
});

console.log("\n✨ Terminé avec succès ! Tout votre store Redux et vos données sont prêts.");
console.log("👉 Lancez maintenant 'npm run dev' pour voir le résultat.");