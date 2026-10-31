import { useState, useEffect, useRef } from 'react'
import './App.css'
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FaQuoteRight } from "react-icons/fa";
import { FiEye, FiFeather, FiShield, FiTruck, FiRefreshCw, FiLock } from 'react-icons/fi';
import { FaCheck } from "react-icons/fa6";
import watchGold from "./assets/images/02.png"
import watchSilver from "./assets/images/01.png"
import titleIcon from "./assets/images/logo/title-icon.png"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link, useNavigate } from 'react-router-dom';
import { BsShieldCheck, BsTruck, BsHeadset, BsGem, BsArrowRight, BsPlayCircle, BsPeople, BsGeoAlt } from "react-icons/bs";
import { FiArrowRight } from 'react-icons/fi';
import { FaHeart } from "react-icons/fa";
import SEO from './seo';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, setSelectedProduct } from './redux/productSlice';
import { addToCart } from './redux/cartSlice';
import { toggleWishlist, selectWishlistItems } from './redux/wishlistSlice';

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
    const [selectedIndex, setSelectedIndex] = useState(1); // 1 = gold par défaut

    const goPrev = () => heroSwiperRef.current?.slidePrev();
    const goNext = () => heroSwiperRef.current?.slideNext();

    const selectedColor = colors[selectedIndex];
    const heroSwiperRef = useRef(null);
    const swiperRef = useRef(null);

    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const wishlistItems = useSelector(selectWishlistItems);
    const isItemInWishlist = (id) => wishlistItems.some(item => item.id === id);

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
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        dispatch(setSelectedProduct(productId));
        navigate('/produit-details');
    };

    // Gestion propre du scroll vers l'ancre #avis
    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <div>
            <SEO
                title="Horlogerie d'Exception & Montres de Luxe"
                description="Central Luxe vous propose des montres façonnées avec des matériaux soignés, alliant élégance intemporelle et précision horlogère. Livraison partout au Bénin."
            />

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
                                        className={`cl-color-dot ${selectedIndex === index ? 'active' : ''}`}
                                        style={{ backgroundColor: c.hex }}
                                        onClick={() => heroSwiperRef.current?.slideToLoop(index)}
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
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            onSwiper={(s) => (heroSwiperRef.current = s)}
                            onRealIndexChange={(s) => setSelectedIndex(s.realIndex)}
                            initialSlide={1}
                            slidesPerView={1}
                            loop
                            speed={800}
                            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            className="cl-hero-swiper"
                        >
                            {colors.map((c) => (
                                <SwiperSlide key={c.id} className="cl-hero-slide">
                                    <img src={c.img} alt="Montre de luxe" className="cl-watch-img" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
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
                        <span className="cl-pillar-icon">
                            <FiEye className='i' />
                        </span>
                        <div>
                            <h3 className="cl-pillar-title">Un style qui vous distingue</h3>
                            <p className="cl-pillar-text">
                                Portez une montre qui attire les regards et affirme votre personnalité, jour après jour.
                            </p>
                        </div>
                    </div>

                    <div className="cl-pillar-item">
                        <FiFeather className="cl-pillar-bg-icon" />
                        <span className="cl-pillar-icon">
                            <FiFeather className='i' />
                        </span>
                        <div>
                            <h3 className="cl-pillar-title">Une qualité qui dure</h3>
                            <p className="cl-pillar-text">
                                Matériaux nobles, finitions soignées , un objet pensé pour vous accompagner des années, pas des mois.
                            </p>
                        </div>
                    </div>

                    <div className="cl-pillar-item">
                        <FiShield className="cl-pillar-bg-icon" />
                        <span className="cl-pillar-icon">
                            <FiShield className='i' />
                        </span>
                        <div>
                            <h3 className="cl-pillar-title">Un choix sans risque</h3>
                            <p className="cl-pillar-text">
                                Authenticité garantie, paiement sécurisé, service client réactif , achetez l'esprit tranquille.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cl-about">
                <div className="container">
                    {/* ===== Rangée 1 : texte à gauche, image à droite ===== */}
                    <div className="cl-ab-row">
                        <div className="cl-ab-text">
                            <h1 className="cl-section-title">Notre maison</h1>
                            <h2 className="cl-section-sub-title">
                                Le style et la qualité,
                                <span>au juste prix</span>
                            </h2>
                            <p className="cl-ab-desc">
                                Central Luxe est née d'une conviction simple : porter une belle montre ne
                                devrait pas être un privilège. Nous choisissons chaque modèle pour son
                                allure, son confort et sa tenue dans le temps, puis nous vous le proposons
                                au juste prix, sans intermédiaire.
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

                    {/* ===== Rangée 2 : image à gauche, texte à droite ===== */}
                    <div className="cl-ab-row">
                        <div className="cl-ab-media cl-ab-media-left">
                            <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200" alt="Notre sélection" />
                            <div className="cl-ab-badge">
                                <BsShieldCheck />
                                <div>
                                    <strong>Pièces authentiques</strong>
                                </div>
                            </div>
                        </div>

                        <div className="cl-ab-text">
                            <h1 className="cl-section-title">Notre sélection</h1>
                            <h2 className="cl-section-sub-title">
                                Une sélection exigeante,
                                <span>en toute transparence</span>
                            </h2>
                            <p className="cl-ab-desc">
                                Nous parcourons le marché pour retenir des modèles qui allient design intemporel,
                                matériaux soignés et fiabilité au quotidien. Plus de 600 clients nous font déjà
                                confiance : la confiance se construit avec de la rigueur, pas avec de belles promesses.
                            </p>

                            <div className="cl-ab-actions">
                                <Link to="/boutique" className="btn-secondary">
                                    Voir la collection
                                    <span><FiArrowRight /></span>
                                </Link>

                                {/* Ancre avec défilement fluide vers #avis */}
                                <a
                                    href="#avis"
                                    onClick={(e) => scrollToSection(e, 'avis')}
                                    className="cl-ab-link"
                                >
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
                        <h2 className="cl-section-sub-title">
                            Trouvez la montre
                            <span>qui vous ressemble</span>
                        </h2>
                    </div>

                    <div className="cl-collection-grid">
                        {products.slice(0, 4).map((p) => (
                            <div
                                className="cl-product-card"
                                key={p.id}
                                onClick={() => handleProductClick(p.id)}
                            >
                                <div className="cl-product-img-wrap">
                                    {p.isNew && <span className="cl-product-badge">New</span>}
                                    <button
                                        type="button"
                                        className="cl-product-heart"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(toggleWishlist(p));
                                        }}
                                        aria-label={isItemInWishlist(p.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                                    >
                                        {isItemInWishlist(p.id) ? (
                                            <FaHeart style={{ fontSize: '18px', color: '#c87d08' }} />
                                        ) : (
                                            <CiHeart className="i" />
                                        )}
                                    </button>
                                    <img src={p.img} alt={p.name} className="cl-product-img" />
                                </div>

                                <div className="cl-product-info">
                                    <h3 className="cl-product-name">{p.name}</h3>
                                    <span className="cl-product-price">{p.price.toLocaleString('fr-FR')} XOF</span>

                                    <div className="cl-product-actions">
                                        <button
                                            type="button"
                                            className="cl-product-discover"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleProductClick(p.id);
                                            }}
                                        >
                                            Découvrir
                                        </button>
                                        <button
                                            type="button"
                                            className="cl-product-cart-btn"
                                            aria-label="Ajouter au panier"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(addToCart(p));
                                            }}
                                        >
                                            <CiShoppingBasket className="i" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cl-actions">
                        <Link to="/boutique" className="btn-secondary">
                            Découvrir toute la collection
                            <span><FiArrowRight /></span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section cible de l'ancre */}
            <section className="cl-testimonials" id="avis">
                <div className="container">
                    <div className="cl-section-head center">
                        <h1 className="cl-section-title">Avis clients</h1>
                        <h2 className="cl-section-sub-title">
                            Vos mots valent mieux
                            <span>que nos promesses</span>
                        </h2>
                    </div>

                    <div className="cl-testimonials-track">
                        <div className="cl-stack-wrap">
                            <article className="cl-testimonial-card cl-testimonial-card--stat">
                                <div className="cl-testimonial-pagination swiper-pagination" aria-hidden="true"></div>
                                <p className="cl-testimonial-score"></p>
                                <div className="cl-testimonial-trust">
                                    <span className="cl-testimonial-avatars">
                                        <img
                                            src="https://images.unsplash.com/photo-1696603865152-74514c198a07?w=72&h=72&fit=crop&crop=faces&q=80"
                                            alt=""
                                            className="cl-testimonial-avatar-img"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1525103691634-22b8f578a199?w=72&h=72&fit=crop&crop=faces&q=80"
                                            alt=""
                                            className="cl-testimonial-avatar-img"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1598956066123-a6f006500ca4?w=72&h=72&fit=crop&crop=faces&q=80"
                                            alt=""
                                            className="cl-testimonial-avatar-img"
                                        />
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
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            pagination={{
                                el: '.cl-testimonial-pagination',
                                clickable: true,
                            }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                1280: { slidesPerView: 2 },
                            }}
                            className="cl-testimonials-swiper"
                        >
                            <SwiperSlide>
                                <article className="cl-testimonial-card">
                                    <span className="cl-testimonial-mark" aria-hidden="true">
                                        <FaQuoteRight />
                                    </span>
                                    <p className="cl-testimonial-quote">
                                        J'étais sceptique au début, mais en trois minutes j'avais déjà de vrais devis
                                        des plus grandes enseignes. J'ai choisi le mien et j'étais couvert le jour même.
                                        Un vrai gain de temps.
                                    </p>
                                    <div className="cl-testimonial-author">
                                        <img
                                            src="https://images.unsplash.com/photo-1696603865152-74514c198a07?w=72&h=72&fit=crop&crop=faces&q=80"
                                            alt=""
                                            className="cl-testimonial-avatar-img cl-testimonial-avatar-img--lg"
                                        />
                                        <div>
                                            <p className="cl-testimonial-name">Malik Ferrand</p>
                                            <p className="cl-testimonial-city">Lyon</p>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>

                            <SwiperSlide>
                                <article className="cl-testimonial-card">
                                    <span className="cl-testimonial-mark" aria-hidden="true">
                                        <FaQuoteRight />
                                    </span>
                                    <p className="cl-testimonial-quote">
                                        Le processus a été rapide, les options claires, et j'ai vraiment compris ce que
                                        j'achetais. Aucune pression, juste une aide honnête. J'ai déjà recommandé le site
                                        à mon frère.
                                    </p>
                                    <div className="cl-testimonial-author">
                                        <img
                                            src="https://images.unsplash.com/photo-1525103691634-22b8f578a199?w=72&h=72&fit=crop&crop=faces&q=80"
                                            alt=""
                                            className="cl-testimonial-avatar-img cl-testimonial-avatar-img--lg"
                                        />
                                        <div>
                                            <p className="cl-testimonial-name">Pamela Diallo</p>
                                            <p className="cl-testimonial-city">Bruxelles</p>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>

                            <SwiperSlide>
                                <article className="cl-testimonial-card">
                                    <span className="cl-testimonial-mark" aria-hidden="true">
                                        <FaQuoteRight />
                                    </span>
                                    <p className="cl-testimonial-quote">
                                        Le coffret est arrivé impeccable, avec le certificat et tout le nécessaire.
                                        On voit tout de suite que le produit a été pensé jusque dans les moindres détails.
                                    </p>
                                    <div className="cl-testimonial-author">
                                        <img
                                            src="https://images.unsplash.com/photo-1598956066123-a6f006500ca4?w=72&h=72&fit=crop&crop=faces&q=80"
                                            alt=""
                                            className="cl-testimonial-avatar-img cl-testimonial-avatar-img--lg"
                                        />
                                        <div>
                                            <p className="cl-testimonial-name">Amara Nkosi</p>
                                            <p className="cl-testimonial-city">Genève</p>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className="cl-testimonials-nav">
                        <button
                            type="button"
                            className="cl-testimonials-nav-btn"
                            aria-label="Avis précédent"
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <HiOutlineChevronLeft />
                        </button>
                        <button
                            type="button"
                            className="cl-testimonials-nav-btn"
                            aria-label="Avis suivant"
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <HiOutlineChevronRight />
                        </button>
                    </div>
                </div>
            </section>

            <section className="cl-promo-section">
                <div className="container">
                    <div className="cl-promo">
                        <div
                            className="cl-promo-bg"
                            style={{ backgroundImage: `url(${watchGold})` }}
                            aria-hidden="true"
                        />

                        <div className="cl-promo-content">
                            <span className="cl-promo-eyebrow">
                                <i /> Offre flash
                            </span>

                            <h2 className="cl-promo-title">
                                Le Méridien,
                                <span> jusqu'à -50%</span>
                            </h2>

                            <p className="cl-promo-desc">
                                Édition limitée, stock restreint. Une fois l'offre terminée,
                                le prix revient à la normale.
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