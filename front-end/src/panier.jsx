import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react'
import './App.css'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FaQuoteRight } from "react-icons/fa";
import { FiEye, FiFeather, FiShield, FiTruck, FiRefreshCw, FiLock } from 'react-icons/fi';
import { FaCheck } from "react-icons/fa6";
import watchGold from "./assets/images/02.png"
import watchSilver from "./assets/images/01.png"
import titleIcon from "./assets/images/logo/title-icon.png"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom';
import { CiShoppingBasket, CiHeart, CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { BsHeadset } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

export default function Panier() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            tag: 'Acier',
            name: 'Acier brossé',
            img: watchGold,
            price: 390,
            qty: 1,
            bracelet: 'Cuir marron',
            braceletOptions: ['Cuir marron', 'Cuir noir', 'Acier'],
            taille: '40 mm',
            tailleOptions: ['36 mm', '40 mm'],
        },
        {
            id: 2,
            tag: 'Or rose',
            name: 'Le Méridien',
            img: watchGold,
            price: 450,
            qty: 1,
            bracelet: 'Maille milanaise',
            braceletOptions: ['Maille milanaise', 'Cuir marron', 'Acier'],
            taille: '36 mm',
            tailleOptions: ['36 mm', '40 mm'],
        },
        {
            id: 3,
            tag: 'Accessoire',
            name: 'Bracelet cuir',
            img: watchSilver,
            price: 65,
            qty: 1,
            bracelet: '20 mm',
            braceletOptions: ['20 mm', '22 mm'],
            taille: null,
            tailleOptions: [],
        },
    ]);

    const updateQty = (id, delta) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
            )
        );
    };

    const updateVariant = (id, field, value) => {
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };



    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCartItems([]);


    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = Math.round(subtotal * 0.2);
    const total = subtotal + tax;

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
                                <h2 className="cl-cart-title">Panier <sup>{String(cartItems.length).padStart(2, '0')}</sup></h2>
                                <button className="cl-cart-clear" onClick={clearCart}>
                                    <FaTrashAlt />
                                </button>
                            </div>

                            {cartItems.map((item) => (
                                <div className="cl-cart-item" key={item.id}>


                                    <div className="cl-cart-item-img"><img src={item.img} alt="" /></div>

                                    <div className="cl-cart-item-body">
                                        <span className="cl-cart-item-tag">{item.tag}</span>
                                        <p className="cl-cart-item-name">{item.name}</p>

                                        <div className="cl-cart-item-variants">
                                            <label className="cl-cart-select-wrap">
                                                Couleur :
                                                <select
                                                    value={item.bracelet}
                                                    onChange={(e) => updateVariant(item.id, 'bracelet', e.target.value)}
                                                >
                                                    {item.braceletOptions.map((opt) => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </label>

                                            {item.tailleOptions.length > 0 && (
                                                <label className="cl-cart-select-wrap">
                                                    Taille :
                                                    <select
                                                        value={item.taille}
                                                        onChange={(e) => updateVariant(item.id, 'taille', e.target.value)}
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
                                            <button aria-label="Supprimer" onClick={() => removeItem(item.id)}><IoIosClose /></button>
                                        </div>
                                        <div className="cl-cart-item-bottom">
                                            <div className="cl-cart-qty">
                                                <button onClick={() => updateQty(item.id, -1)}>−</button>
                                                <span>{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, 1)}>+</button>
                                            </div>
                                            <span className="cl-cart-item-price">{item.price * item.qty} €</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cl-cart-summary">
                            <h2 className="cl-cart-summary-title">Récapitulatif</h2>
                            <div className="cl-cart-summary-box">
                                <div className="cl-cart-summary-row">
                                    <span>Articles sélectionnés</span>
                                    <span>{String(cartItems.length).padStart(2, '0')} articles</span>
                                </div>
                                <div className="cl-cart-summary-row"><span>Sous-total</span><span>{subtotal} €</span></div>
                                <div className="cl-cart-summary-row"><span>Livraison estimée</span><span>Offerte</span></div>
                                <div className="cl-cart-summary-row"><span>TVA (20%)</span><span>{tax} €</span></div>
                                <div className="cl-cart-summary-row"><span>Remise</span><span>−0 €</span></div>

                                <hr className="cl-cart-summary-divider" />

                                <div className="cl-cart-summary-total">
                                    <span>Total à payer</span>
                                    <span>{total} €</span>
                                </div>

                                <div className="cl-cart-promo">
                                    <input type="text" placeholder="Code promo" />
                                    <button>Appliquer</button>
                                </div>

                                <a href="#" className="cl-cart-checkout">Passer la commande</a>
                                <a href="#" className="cl-cart-checkout-alt">Continuer mes achats</a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
