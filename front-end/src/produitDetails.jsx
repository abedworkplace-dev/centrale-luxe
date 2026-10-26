// src/produitDetails.jsx
import { useState, useEffect } from 'react';
import './App.css';
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; // <--- Ajout de l'icône de cœur plein
import { FiShield, FiTruck, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentProduct, selectAllProducts, setSelectedProduct } from './redux/productSlice';
import { addToCart } from './redux/cartSlice';
import { toggleWishlist, selectIsInWishlist, selectWishlistItems } from './redux/wishlistSlice';
import SEO from './seo';

export default function ProduitDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(selectCurrentProduct);
  const allProducts = useSelector(selectAllProducts);
  const wishlistItems = useSelector(selectWishlistItems);
  
  // Vérifie si un produit donné est dans les favoris
  const isInWishlist = useSelector(selectIsInWishlist(product.id));
  const isItemInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.img];

  // État de la grande image affichée
  const [currentDisplayImg, setCurrentDisplayImg] = useState(product.img);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  // Valeurs sélectionnées
  const initialBraceletLabel = product.bracelets ? (product.bracelets[0]?.label || product.bracelets[0]) : 'Acier Doré';
  const [selectedBracelet, setSelectedBracelet] = useState(initialBraceletLabel);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0]?.id : '');
  const [quantity, setQuantity] = useState(1);

  // Synchronisation lors du changement de produit
  useEffect(() => {
    setCurrentDisplayImg(product.img);
    setActiveThumbIndex(0);
    const firstB = product.bracelets ? (product.bracelets[0]?.label || product.bracelets[0]) : 'Acier Doré';
    setSelectedBracelet(firstB);
    setSelectedColor(product.colors ? product.colors[0]?.id : '');
    setQuantity(1);
  }, [product.id, product.img]);

  // Clic sur une COULEUR -> Change la grande image + synchronise le bracelet
  const handleColorClick = (colorObj) => {
    setSelectedColor(colorObj.id);
    if (colorObj.img) {
      setCurrentDisplayImg(colorObj.img);
      const foundIdx = imagesList.findIndex((img) => img === colorObj.img);
      if (foundIdx !== -1) setActiveThumbIndex(foundIdx);

      const matchingBracelet = product.bracelets?.find((b) => (b.img || b) === colorObj.img);
      if (matchingBracelet) {
        setSelectedBracelet(matchingBracelet.label || matchingBracelet);
      }
    }
  };

  // Clic sur un BRACELET -> Change la grande image + synchronise la couleur
  const handleBraceletClick = (braceletObj) => {
    const label = braceletObj.label || braceletObj;
    const img = braceletObj.img || (label.toLowerCase().includes('doré') || label.toLowerCase().includes('or') ? product.img : imagesList[1] || product.img);

    setSelectedBracelet(label);
    if (img) {
      setCurrentDisplayImg(img);
      const foundIdx = imagesList.findIndex((i) => i === img);
      if (foundIdx !== -1) setActiveThumbIndex(foundIdx);

      const matchingColor = product.colors?.find((c) => c.img === img);
      if (matchingColor) {
        setSelectedColor(matchingColor.id);
      }
    }
  };

  // Clic sur une MINIATURE -> Change la grande image + synchronise couleur & bracelet
  const handleThumbClick = (imgSrc, index) => {
    setActiveThumbIndex(index);
    setCurrentDisplayImg(imgSrc);

    const matchedColor = product.colors?.find((c) => c.img === imgSrc);
    if (matchedColor) setSelectedColor(matchedColor.id);

    const matchedBracelet = product.bracelets?.find((b) => (b.img || b) === imgSrc);
    if (matchedBracelet) setSelectedBracelet(matchedBracelet.label || matchedBracelet);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      img: currentDisplayImg,
      qty: Number(quantity),
      bracelet: selectedBracelet,
      color: selectedColor,
      braceletOptions: product.bracelets?.map((b) => b.label || b) || []
    }));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/panier');
  };

  const similarProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div>
      <SEO 
      title={`${product.name} - ${typeof product.price === 'number' ? product.price.toLocaleString('fr-FR') : product.price} XOF`}
      description={product.description || `Découvrez la montre de luxe ${product.name} chez Central Luxe. Finition soignée, garantie 2 ans et livraison offerte partout au Bénin.`}
      image={currentDisplayImg || product.img}
      type="product"
    />
      <section>
        <div className="container cl-pdp">
          <div className="cl-pdp-gallery">
            {imagesList.length > 1 && (
              <div className="cl-pdp-thumbs">
                {imagesList.map((imgSrc, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`cl-pdp-thumb ${activeThumbIndex === index ? 'active' : ''}`}
                    onClick={() => handleThumbClick(imgSrc, index)}
                    aria-label={`Afficher la photo ${index + 1}`}
                  >
                    <img src={imgSrc} alt="" />
                  </button>
                ))}
              </div>
            )}

            <div className="cl-pdp-main">
              <span className="cl-pdp-badge">−15%</span>
              <img src={currentDisplayImg} alt={product.name} />
              <button className="cl-pdp-zoom" aria-label="Zoomer">
                <FiSearch />
              </button>
            </div>
          </div>

          <div className="cl-pdp-info">
            <h1 className="cl-pdp-title">{product.name}</h1>

            <div className="cl-pdp-price-row">
              <span className="cl-pdp-price">{product.price.toLocaleString('fr-FR')} <span className='devise'>XOF</span></span>
            </div>

            <p className="cl-pdp-desc">
              {product.description || "Des montres pensées pour allier précision horlogère et élégance moderne."}
            </p>

            <div className="cl-pdp-reassurance">
              <div className="cl-pdp-reassurance-item">
                <FiTruck />
                <div><p>Livraison offerte</p><p>Partout au Bénin</p></div>
              </div>
              <div className="cl-pdp-reassurance-item">
                <FiRefreshCw />
                <div><p>Retour 30 jours</p><p>Simple et gratuit</p></div>
              </div>
              <div className="cl-pdp-reassurance-item">
                <FiShield />
                <div><p>Garantie 2 ans</p><p>Qualité assurée</p></div>
              </div>
            </div>

            {/* Pastilles de couleur */}
            {product.colors && product.colors.length > 0 && (
              <div className="cl-pdp-option">
                <p className="cl-pdp-option-label">Couleurs disponibles</p>
                <div className="cl-pdp-colors">
                  {product.colors.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      className={`cl-pdp-color-dot ${selectedColor === c.id ? 'active' : ''}`}
                      onClick={() => handleColorClick(c)}
                      title={c.label}
                      aria-label={c.label}
                    >
                      <span style={{ background: c.hex }}></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Boutons Bracelet */}
            {product.bracelets && product.bracelets.length > 0 && (
              <div className="cl-pdp-option">
                <p className="cl-pdp-option-label">Bracelet</p>
                <div className="cl-pdp-pills">
                  {product.bracelets.map((b, i) => {
                    const label = b.label || b;
                    return (
                      <button
                        key={i}
                        type="button"
                        className={`cl-pdp-pill ${selectedBracelet === label ? 'active' : ''}`}
                        onClick={() => handleBraceletClick(b)}
                      >
                        {label}
                      </button>
                    );
                  })}
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
              <button
                type="button"
                className="cl-pdp-btn cl-pdp-btn--outline"
                onClick={handleAddToCart}
              >
                <CiShoppingBasket />
                Ajouter au panier
              </button>
              <button
                type="button"
                className="cl-pdp-btn cl-pdp-btn--solid"
                onClick={handleBuyNow}
              >
                Acheter maintenant
              </button>
            </div>

            {/* Bouton Favoris avec bascule d'icône exacte comme sur Home */}
            <button
              type="button"
              className="cl-pdp-wishlist"
              onClick={() => dispatch(toggleWishlist(product))}
              style={{ color: isInWishlist ? '#c87d08' : 'inherit' }}
            >
              {isInWishlist ? (
                <FaHeart style={{ color: '#c87d08', fontSize: '18px' }} />
              ) : (
                <CiHeart style={{ fontSize: '20px' }} />
              )}
              <span>{isInWishlist ? 'Retirer de ma liste d\'envies' : 'Ajouter à ma liste d\'envies'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Montres similaires avec bascule d'icône également */}
      <section className="cl-collection">
        <div className="container">
          <div className='title-page'>
            <h2 className="cl-section-title">Montres Similaires</h2>
            <p className="cl-section-sub-title">Prolongez l’élégance avec des modèles qui vous ressemblent</p>
          </div>

          <div className="cl-collection-grid">
            {similarProducts.map((p) => (
              <div
                className="cl-product-card"
                key={p.id}
                onClick={() => {
                  dispatch(setSelectedProduct(p.id));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
                      <FaHeart className="i" style={{ color: '#c87d08' }} />
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
                        dispatch(setSelectedProduct(p.id));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        </div>
      </section>
    </div>
  )
}