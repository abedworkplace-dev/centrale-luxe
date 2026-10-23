import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { useState } from 'react'
import './App.css'
import watchGold from "./assets/images/02.png"
import watchSilver from "./assets/images/01.png"
import { Link } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import { FiArrowRight } from 'react-icons/fi';

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
                                <h2 className="cl-cart-title">
                                    Panier <sup>{String(cartItems.length).padStart(2, '0')}</sup>
                                </h2>
                                {cartItems.length > 0 && (
                                    <button className="cl-cart-clear" onClick={clearCart} aria-label="Vider le panier">
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
                                    <div className="cl-cart-item" key={item.id}>
                                        <div className="cl-cart-item-img">
                                            <img src={item.img} alt={item.name} />
                                        </div>

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
                                                <button aria-label="Supprimer" onClick={() => removeItem(item.id)}>
                                                    <IoIosClose />
                                                </button>
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
                                ))
                            )}
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
                                    <input type="text" placeholder="Code promo" disabled={cartItems.length === 0} />
                                    <button className="cl-cart-promo-btn" disabled={cartItems.length === 0}>
                                        Appliquer
                                    </button>
                                </div>

                                <Link 
                                    to="#" 
                                    className={`cl-cart-checkout-alt ${cartItems.length === 0 ? 'disabled' : ''}`}
                                    onClick={(e) => cartItems.length === 0 && e.preventDefault()}
                                >
                                    Passer la commande
                                </Link>
                                <Link to="/boutique" className="cl-cart-checkout">Continuer mes achats</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}