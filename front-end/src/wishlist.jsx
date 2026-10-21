
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { CiShoppingBasket } from "react-icons/ci";
import watchGold from "./assets/images/02.png"
import watchSilver from "./assets/images/01.png"

export default function Wishlist() {
    const [wishItems, setWishItems] = useState([
        { id: 1, tag: 'Acier', name: 'Acier brossé', img: watchGold, price: 390, stock: true },
        { id: 2, tag: 'Or rose', name: 'Le Méridien', img: watchGold, price: 450, stock: true },
        { id: 3, tag: 'Accessoire', name: 'Bracelet cuir', img: watchSilver, price: 65, stock: false },
    ]);

    const removeItem = (id) => {
        setWishItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearWishlist = () => setWishItems([]);

    const addToCart = (item) => {
        // TODO : brancher sur votre panier (context, redux, etc.)
        console.log('Ajouté au panier :', item);
        removeItem(item.id);
    };

    const addAllToCart = () => {
        wishItems.filter((i) => i.stock).forEach(addToCart);
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
                                    <button className="cl-wish-clear" onClick={clearWishlist} aria-label="Vider mes favoris">
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
                                        <div className="cl-wish-item-img"><img src={item.img} alt={item.name} /></div>

                                        <div className="cl-wish-item-body">
                                            <span className="cl-wish-item-tag">{item.tag}</span>
                                            <p className="cl-wish-item-name">{item.name}</p>
                                            <span className={`cl-wish-stock ${item.stock ? 'in' : 'out'}`}>
                                                {item.stock ? 'En stock' : 'Rupture de stock'}
                                            </span>
                                        </div>

                                        <div className="cl-wish-item-right">
                                            <div className="cl-wish-item-icons">
                                                <button aria-label="Retirer des favoris" onClick={() => removeItem(item.id)}>
                                                    <IoIosClose />
                                                </button>
                                            </div>
                                            <div className="cl-wish-item-bottom">
                                                <span className="cl-wish-item-price">{item.price} €</span>
                                                <button
                                                    className="cl-wish-add"
                                                    disabled={!item.stock}
                                                    onClick={() => addToCart(item)}
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
                                    onClick={addAllToCart}
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
    )
}