// src/panier.jsx
import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import SEO from './seo';
import {
    selectCartItems,
    updateQty,
    updateVariant,
    removeFromCart,
    clearCart,
    selectCartSubtotal
} from './redux/cartSlice';

const API_BASE = import.meta.env.VITE_API_URL;

const VALID_PROMO_CODES = {
    'LUXE10': 0.10,
    'BIENVENUE': 0.15,
    'PROMO20': 0.20
};

// Helper pour extraire le texte qu'il s'agisse d'un string ou d'un objet { label, img }
const getOptionLabel = (option) => {
    if (!option) return '';
    if (typeof option === 'string') return option;
    return option.label || option.name || '';
};

export default function Panier() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);

    // Code promo
    const [promoInput, setPromoInput] = useState('');
    const [appliedCode, setAppliedCode] = useState('');
    const [appliedDiscountRate, setAppliedDiscountRate] = useState(0);
    const [promoMessage, setPromoMessage] = useState(null);

    // Modal commande
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
    });
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);

    const handleApplyPromo = () => {
        const cleanCode = promoInput.trim().toUpperCase();
        if (VALID_PROMO_CODES[cleanCode]) {
            setAppliedDiscountRate(VALID_PROMO_CODES[cleanCode]);
            setAppliedCode(cleanCode);
            setPromoMessage({ type: 'success', text: `Code ${cleanCode} appliqué (-${VALID_PROMO_CODES[cleanCode] * 100}%)` });
        } else {
            setPromoMessage({ type: 'error', text: 'Code promo invalide' });
        }
    };

    const discountAmount = Math.round(subtotal * appliedDiscountRate);
    const total = Math.max(0, subtotal - discountAmount);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setOrderLoading(true);
        setOrderError(null);

        try {
            const res = await fetch(`${API_BASE}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer,
                    items: cartItems,
                    subtotal,
                    discount: discountAmount,
                    promoCode: appliedCode,
                    total
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setIsCheckoutModalOpen(false);
                dispatch(clearCart());
                setOrderLoading(false);

                Swal.fire({
                    icon: 'success',
                    title: '<span class="cl-swal-title">Commande Confirmée !</span>',
                    html: `
                        <div class="cl-swal-content">
                            <p class="cl-swal-lead">
                                Merci pour votre confiance, <strong>${customer.name}</strong>.
                            </p>
                            <p class="cl-swal-info">
                                Notre concierge vous contactera au <strong>${customer.phone}</strong> pour convenir de l'horaire de livraison à <strong>${customer.address}</strong>.
                            </p>
                        </div>
                    `,
                    confirmButtonText: 'Continuer vers la boutique',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'cl-swal-popup',
                        confirmButton: 'cl-swal-btn',
                        icon: 'cl-swal-icon'
                    }
                }).then(() => {
                    navigate('/boutique');
                });

            } else {
                setOrderLoading(false);
                setOrderError(data.message || "Erreur lors de l'enregistrement de votre commande.");
            }
        } catch {
            setOrderLoading(false);
            setOrderError("Serveur momentanément inaccessible. Veuillez réessayer.");
        }
    };

    return (
        <div>
            <SEO
                title="Mon Panier"
                description="Finalisez votre commande de montre en toute sécurité chez Central Luxe. Livraison express et soignée."
            />
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
                                cartItems.map((item) => {
                                    const currentBraceletLabel = getOptionLabel(item.bracelet);

                                    return (
                                        <div className="cl-cart-item" key={item.cartItemId}>
                                            <div className="cl-cart-item-img">
                                                <img src={typeof item.img === 'string' ? item.img : item.img?.src || item.img} alt={item.name} />
                                            </div>

                                            <div className="cl-cart-item-body">
                                                <span className="cl-cart-item-tag">{getOptionLabel(item.tag) || item.tag}</span>
                                                <p className="cl-cart-item-name">{item.name}</p>

                                                <div className="cl-cart-item-variants">
                                                    <label className="cl-cart-select-wrap">
                                                        Couleur :
                                                        <select
                                                            value={currentBraceletLabel}
                                                            onChange={(e) => dispatch(updateVariant({
                                                                cartItemId: item.cartItemId,
                                                                field: 'bracelet',
                                                                value: e.target.value
                                                            }))}
                                                        >
                                                            {item.braceletOptions?.map((opt, idx) => {
                                                                const label = getOptionLabel(opt);
                                                                return (
                                                                    <option key={label || idx} value={label}>
                                                                        {label}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </label>

                                                    {item.tailleOptions?.length > 0 && (
                                                        <label className="cl-cart-select-wrap">
                                                            Taille :
                                                            <select
                                                                value={getOptionLabel(item.taille)}
                                                                onChange={(e) => dispatch(updateVariant({
                                                                    cartItemId: item.cartItemId,
                                                                    field: 'taille',
                                                                    value: e.target.value
                                                                }))}
                                                            >
                                                                {item.tailleOptions.map((opt, idx) => {
                                                                    const label = getOptionLabel(opt);
                                                                    return (
                                                                        <option key={label || idx} value={label}>
                                                                            {label}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </label>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="cl-cart-item-right">
                                                <div className="cl-cart-item-icons">
                                                    <button
                                                        aria-label="Supprimer"
                                                        onClick={() => dispatch(removeFromCart(item.cartItemId))}
                                                    >
                                                        <IoIosClose />
                                                    </button>
                                                </div>
                                                <div className="cl-cart-item-bottom">
                                                    <div className="cl-cart-qty">
                                                        <button onClick={() => dispatch(updateQty({ cartItemId: item.cartItemId, delta: -1 }))}>−</button>
                                                        <span>{item.qty}</span>
                                                        <button onClick={() => dispatch(updateQty({ cartItemId: item.cartItemId, delta: 1 }))}>+</button>
                                                    </div>
                                                    <span className="cl-cart-item-price">{(item.price * item.qty).toLocaleString('fr-FR')} XOF</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <div className="cl-cart-summary">
                            <h2 className="cl-cart-summary-title">Récapitulatif</h2>
                            <div className="cl-cart-summary-box">
                                <div className="cl-cart-summary-row">
                                    <span>Articles sélectionnés</span>
                                    <span>{String(cartItems.length).padStart(2, '0')} articles</span>
                                </div>
                                <div className="cl-cart-summary-row">
                                    <span>Sous-total</span>
                                    <span>{subtotal.toLocaleString('fr-FR')} XOF</span>
                                </div>
                                <div className="cl-cart-summary-row">
                                    <span>Livraison estimée</span>
                                    <span>Offerte</span>
                                </div>
                                <div className="cl-cart-summary-row">
                                    <span>Remise</span>
                                    <span>{discountAmount > 0 ? `−${discountAmount.toLocaleString('fr-FR')} XOF` : '−0 XOF'}</span>
                                </div>

                                <hr className="cl-cart-summary-divider" />

                                <div className="cl-cart-summary-total">
                                    <span>Total à payer</span>
                                    <span>{total.toLocaleString('fr-FR')} XOF</span>
                                </div>

                                <div className="cl-cart-promo">
                                    <input
                                        type="text"
                                        placeholder="Code promo (ex: LUXE10)"
                                        value={promoInput}
                                        onChange={(e) => setPromoInput(e.target.value)}
                                        disabled={cartItems.length === 0}
                                    />
                                    <button
                                        type="button"
                                        className="cl-cart-promo-btn"
                                        disabled={cartItems.length === 0}
                                        onClick={handleApplyPromo}
                                    >
                                        Appliquer
                                    </button>
                                </div>

                                {promoMessage && (
                                    <p className={`cl-cart-promo-msg ${promoMessage.type}`}>
                                        {promoMessage.text}
                                    </p>
                                )}

                                <button
                                    type="button"
                                    className={`cl-cart-checkout-alt ${cartItems.length === 0 ? 'disabled' : ''}`}
                                    disabled={cartItems.length === 0}
                                    onClick={() => setIsCheckoutModalOpen(true)}
                                >
                                    Passer la commande
                                </button>
                                <Link to="/boutique" className="cl-cart-checkout">Continuer mes achats</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MODAL COMMANDE */}
            {isCheckoutModalOpen && (
                <div className="cl-modal-overlay">
                    <div className="cl-modal-card">
                        <button
                            type="button"
                            className="cl-modal-close"
                            onClick={() => {
                                setIsCheckoutModalOpen(false);
                                setOrderError(null);
                            }}
                            aria-label="Fermer la boîte de dialogue"
                        >
                            <IoIosClose />
                        </button>

                        <form className="cl-checkout-form" onSubmit={handleOrderSubmit}>
                            <h3 className="cl-checkout-title">Finaliser votre commande</h3>
                            <p className="cl-checkout-sub">
                                Montant total : <strong>{total.toLocaleString('fr-FR')} XOF</strong>
                            </p>

                            {orderError && (
                                <div className="cl-checkout-error">
                                    {orderError}
                                </div>
                            )}

                            <div className="cl-contactus-field">
                                <label>Nom complet *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: Jean Dupont"
                                    value={customer.name}
                                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                />
                            </div>

                            <div className="cl-contactus-field">
                                <label>Numéro de Téléphone (WhatsApp de préférence) *</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="Ex: +229 97 00 00 00"
                                    value={customer.phone}
                                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                />
                            </div>

                            <div className="cl-contactus-field">
                                <label>Email (pour recevoir le reçu)</label>
                                <input
                                    type="email"
                                    placeholder="Ex: jean.dupont@email.com"
                                    value={customer.email}
                                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                />
                            </div>

                            <div className="cl-contactus-field">
                                <label>Ville & Quartier de livraison *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: Cotonou, Haie Vive"
                                    value={customer.address}
                                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                />
                            </div>

                            <div className="cl-contactus-field">
                                <label>Note additionnelle (optionnelle)</label>
                                <textarea
                                    className="cl-checkout-textarea"
                                    placeholder="Précisions pour la livraison..."
                                    value={customer.notes}
                                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="cl-wish-checkout"
                                disabled={orderLoading}
                            >
                                {orderLoading ? 'Envoi en cours...' : 'Confirmer la commande'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}