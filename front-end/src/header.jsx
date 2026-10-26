// src/header.jsx
import { useState, useEffect } from 'react'
import logo from "./assets/images/logo/01.png"
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { BsHeadset } from "react-icons/bs";
import { Link, useLocation, NavLink } from 'react-router-dom';
import { HiBars3CenterLeft, HiXMark } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { selectCartCount } from './redux/cartSlice';
import { selectWishlistCount } from './redux/wishlistSlice';

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

    // Routes associées à la boutique (Panier, Favoris, Détails produit)
    const isBoutiqueActive = ['/boutique', '/panier', '/wishlist', '/produit-details'].includes(location.pathname);

    // Compteurs Redux
    const cartCount = useSelector(selectCartCount);
    const wishlistCount = useSelector(selectWishlistCount);

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

    // Fonction helper pour déterminer si le lien doit être actif
    const getLinkClass = (to, isActive) => {
        if (to === '/boutique' && isBoutiqueActive) {
            return 'active';
        }
        return isActive ? 'active' : '';
    };

    return (
        <div className={isOpen ? 'cl-open' : ''}>
            <header className={`${isScrolled ? 'scrolled' : ''} ${isOpen ? 'cl-header-open' : ''}`}>
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
                            <Link to="/"><img src={logo} alt="" /></Link>
                        </div>

                        {/* Menu Desktop */}
                        <div className="cl-menu">
                            {links.map((l) => (
                                <NavLink 
                                    key={l.to} 
                                    to={l.to} 
                                    end={l.end}
                                    className={({ isActive }) => getLinkClass(l.to, isActive)}
                                >
                                    {l.label}
                                </NavLink>
                            ))}
                        </div>

                        <div className="cl-icons">
                            <div className="cl-icon-wrap">
                                <Link to="/wishlist">
                                    <CiHeart className='i' />
                                    <span className="cl-badge">{wishlistCount}</span>
                                </Link>
                            </div>
                            <div className="cl-icon-wrap">
                                <Link to="/panier">
                                    <CiShoppingBasket className='i' />
                                    <span className="cl-badge">{cartCount}</span>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Menu Mobile */}
            <div className={`cl-mobile ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
                <nav className="cl-mobile-links">
                    {links.map((l, i) => (
                        <NavLink 
                            key={l.to} 
                            to={l.to} 
                            end={l.end} 
                            className={({ isActive }) => getLinkClass(l.to, isActive)}
                            style={{ transitionDelay: `${0.08 * i + 0.1}s` }}
                        >
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