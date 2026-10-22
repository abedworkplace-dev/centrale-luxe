import React from 'react'
import { FiEye, FiFeather, FiShield, FiTruck, FiRefreshCw, FiLock } from 'react-icons/fi';
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FaQuoteRight } from "react-icons/fa";
import titleIcon from "./assets/images/logo/title-icon.png"
import { FaCheck } from "react-icons/fa6";
import watchGold from "./assets/images/02.png"
import watchSilver from "./assets/images/01.png"
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSliders, FiChevronDown } from 'react-icons/fi';
import { TbArrowsSort } from 'react-icons/tb';
import { FiArrowRight } from 'react-icons/fi';

export default function Boutique() {
    const products = [
        { id: 1, name: 'Chronos Élégance', price: '12 000', img: watchGold, isNew: true, rating: 0, reviews: 120 },
        { id: 2, name: 'Chronos Sport', price: '15 500', img: watchSilver, isNew: false, rating: 5, reviews: 98 },
        { id: 3, name: 'Chronos Élégance', price: '12 000', img: watchGold, isNew: true, rating: 4, reviews: 120 },
        { id: 4, name: 'Chronos Sport', price: '15 500', img: watchSilver, isNew: false, rating: 5, reviews: 98 },
        { id: 5, name: 'Chronos Élégance', price: '12 000', img: watchGold, isNew: true, rating: 0, reviews: 120 },
        { id: 6, name: 'Chronos Sport', price: '15 500', img: watchSilver, isNew: false, rating: 5, reviews: 98 },
        { id: 7, name: 'Chronos Élégance', price: '12 000', img: watchGold, isNew: true, rating: 4, reviews: 120 },
        { id: 8, name: 'Chronos Sport', price: '15 500', img: watchSilver, isNew: false, rating: 5, reviews: 98 },
        { id: 9, name: 'Chronos Sport', price: '15 500', img: watchSilver, isNew: false, rating: 5, reviews: 98 },
    ];


    const [activeFilter, setActiveFilter] = useState('tous');
    const [sortBy, setSortBy] = useState('recommandes');

    const filters = [
        { id: 'tous', label: 'Tous' },
        { id: 'nouveautes', label: 'Nouveautés' },
        { id: 'recommandes', label: 'Recommandés' },
    ];


    const displayedProducts = products
        .filter((p) => activeFilter === 'tous' || (activeFilter === 'nouveautes' && p.isNew) || activeFilter === 'recommandes')
        .sort((a, b) => {
            if (sortBy === 'prix-asc') return parseInt(a.price.replace(/\s/g, '')) - parseInt(b.price.replace(/\s/g, ''));
            if (sortBy === 'prix-desc') return parseInt(b.price.replace(/\s/g, '')) - parseInt(a.price.replace(/\s/g, ''));
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
                            <div className="cl-product-card" key={p.id}>

                                <div className="cl-product-img-wrap">
                                    {p.isNew && <span className="cl-product-badge">New</span>}
                                    <button className="cl-product-heart">
                                        <CiHeart className="i" />
                                    </button>
                                    <img src={p.img} alt={p.name} className="cl-product-img" />
                                </div>

                                <div className="cl-product-info">
                                    <h3 className="cl-product-name">{p.name}</h3>
                                    <span className="cl-product-price">{p.price} XOF</span>

                                    <div className="cl-product-actions">
                                        <Link to="/produit-details" className="cl-product-discover">
                                            Découvrir
                                        </Link>
                                        <button className="cl-product-cart-btn" aria-label="Ajouter au panier">
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

            {/*
            <section className="cl-reassurance">
                <div className="container cl-reassurance-inner">

                    <div className="cl-reassurance-item">
                        <span className="cl-reassurance-icon">
                            <FiTruck className="i" />
                        </span>
                        <div>
                            <p className="cl-reassurance-title">Livraison assurée 48h</p>
                            <p className="cl-reassurance-text">Expédition rapide et suivie</p>
                        </div>
                    </div>

                    <div className="cl-reassurance-item">
                        <span className="cl-reassurance-icon">
                            <FiRefreshCw className="i" />
                        </span>
                        <div>
                            <p className="cl-reassurance-title">Retours sous 30 jours</p>
                            <p className="cl-reassurance-text">Gratuits, sans justification</p>
                        </div>
                    </div>

                    <div className="cl-reassurance-item">
                        <span className="cl-reassurance-icon">
                            <FiShield className="i" />
                        </span>
                        <div>
                            <p className="cl-reassurance-title">Garantie 2 ans</p>
                            <p className="cl-reassurance-text">Mouvement et boîtier couverts</p>
                        </div>
                    </div>

                    <div className="cl-reassurance-item">
                        <span className="cl-reassurance-icon">
                            <FiLock className="i" />
                        </span>
                        <div>
                            <p className="cl-reassurance-title">Paiement sécurisé</p>
                            <p className="cl-reassurance-text">CB, Apple Pay, 3x sans frais</p>
                        </div>
                    </div>

                </div>
            </section>
           */}



        </div>
    )
}
