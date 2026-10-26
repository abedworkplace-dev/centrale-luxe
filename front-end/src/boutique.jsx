// src/boutique.jsx
import React, { useState, useRef, useEffect } from 'react';
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { FiSliders, FiChevronDown } from 'react-icons/fi';
import { TbArrowsSort } from 'react-icons/tb';
import SEO from './seo';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, setSelectedProduct } from './redux/productSlice';
import { addToCart } from './redux/cartSlice';
import { toggleWishlist, selectWishlistItems } from './redux/wishlistSlice';

export default function Boutique() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Récupération des produits et favoris depuis Redux
    const products = useSelector(selectAllProducts);
    const wishlistItems = useSelector(selectWishlistItems);

    const isItemInWishlist = (id) => wishlistItems.some((item) => item.id === id);

    const [activeFilter, setActiveFilter] = useState('tous');
    const [sortBy, setSortBy] = useState('recommandes');

    const filters = [
        { id: 'tous', label: 'Tous' },
        { id: 'nouveautes', label: 'Nouveautés' },
        { id: 'recommandes', label: 'Recommandés' },
    ];

    const getNumericPrice = (p) => {
        if (typeof p.price === 'number') return p.price;
        return parseInt(String(p.price).replace(/\s/g, ''), 10) || 0;
    };

    const displayedProducts = products
        .filter((p) => activeFilter === 'tous' || (activeFilter === 'nouveautes' && p.isNew) || activeFilter === 'recommandes')
        .sort((a, b) => {
            if (sortBy === 'prix-asc') return getNumericPrice(a) - getNumericPrice(b);
            if (sortBy === 'prix-desc') return getNumericPrice(b) - getNumericPrice(a);
            return 0;
        });

    const COLUMNS = 4;
    const ROWS = 2;
    const ITEMS_PER_PAGE = COLUMNS * ROWS;

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

    const handleProductClick = (productId) => {
        dispatch(setSelectedProduct(productId));
        navigate('/produit-details');
    };

    return (
        <div>
            <SEO
                title="Notre Boutique & Collection"
                description="Parcourez notre collection exclusive de montres de prestige : modèles automatiques, sport-chic et chronographes au juste prix."
            />
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
                                    className={`cl-filterbar-pill ${activeFilter === f.id ? 'active' : ''}`}
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
                        {paginatedProducts.map((p) => (
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
                                            e.stopPropagation(); // Évite la redirection au clic sur le cœur
                                            dispatch(toggleWishlist(p));
                                        }}
                                        aria-label={isItemInWishlist(p.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                                    >
                                        {isItemInWishlist(p.id) ? (
                                            <FaHeart className="i" style={{ color: '#c87d08' }} />
                                        ) : (
                                            <CiHeart className="i" />
                                        )}
                                    </button>
                                    <img src={p.img} alt={p.name} className="cl-product-img" />
                                </div>

                                <div className="cl-product-info">
                                    <h3 className="cl-product-name">{p.name}</h3>
                                    <span className="cl-product-price">
                                        {typeof p.price === 'number' ? p.price.toLocaleString('fr-FR') : p.price} XOF
                                    </span>

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
                                                e.stopPropagation(); // Évite la redirection au clic panier
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
                                    className={`cl-pagination-btn ${currentPage === page ? 'active' : ''}`}
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