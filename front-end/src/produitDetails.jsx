import { useState, useEffect, useRef } from 'react'
import './App.css'
import { CiShoppingBasket, CiHeart } from "react-icons/ci";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FaQuoteRight } from "react-icons/fa";
import { FiEye, FiFeather, FiShield, FiTruck, FiRefreshCw, FiLock, FiSearch } from 'react-icons/fi';
import { FaCheck, FaStar } from "react-icons/fa6";
import watchGold from "./assets/images/02.png"
import watchSilver from "./assets/images/01.png"
import titleIcon from "./assets/images/logo/title-icon.png"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom';

export default function ProduitDetails() {

  const products = [
      { id: 1, name: 'Chronos Élégance', price: '12 000', img: watchGold, isNew: true, rating: 0, reviews: 120 },
      { id: 2, name: 'Chronos Sport', price: '15 500', img: watchSilver, isNew: false, rating: 5, reviews: 98 },
      { id: 3, name: 'Chronos Élégance', price: '12 000', img: watchGold, isNew: true, rating: 4, reviews: 120 },
      { id: 4, name: 'Chronos Sport', price: '15 500', img: watchSilver, isNew: false, rating: 5, reviews: 98 },
  ];


  return (
    <div>
      <section>
        <div className="container cl-pdp">

          <div className="cl-pdp-gallery">
            <div className="cl-pdp-thumbs">
              <button className="cl-pdp-thumb active"><img src={watchGold} alt="" /></button>
              <button className="cl-pdp-thumb"><img src={watchSilver} alt="" /></button>
              <button className="cl-pdp-thumb"><img src={watchGold} alt="" /></button>
              <button className="cl-pdp-thumb"><img src={watchSilver} alt="" /></button>
            </div>

            <div className="cl-pdp-main">
              <span className="cl-pdp-badge">−15%</span>
              <img src={watchGold} alt="Le Méridien" />
              <button className="cl-pdp-zoom" aria-label="Zoomer">
                <FiSearch />
              </button>
            </div>
          </div>

          <div className="cl-pdp-info">
            <h1 className="cl-pdp-title">Le Méridien</h1>

            <div className="cl-pdp-price-row">
              <span className="cl-pdp-price">15 000 <span className='devise'>XFO</span></span>
            </div>


            <p className="cl-pdp-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo veritatis provident ea, distinctio aliquam iure nihil debitis deserunt aperiam architecto recusandae veniam quia voluptatum consequuntur, nisi cupiditate ab ullam quis?
            </p>

            <div className="cl-pdp-reassurance">
              <div className="cl-pdp-reassurance-item">
                <FiTruck />
                <div><p>Livraison offerte</p><p>Dès 200 € d'achat</p></div>
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

            <div className="cl-pdp-option">
              <p className="cl-pdp-option-label">Couleurs disponibles</p>
              <div className="cl-pdp-colors">
                <button className="cl-pdp-color-dot active"><span style={{ background: '#1a3d2e' }}></span></button>
                <button className="cl-pdp-color-dot"><span style={{ background: '#1d3a5f' }}></span></button>
                <button className="cl-pdp-color-dot"><span style={{ background: '#8a6a3d' }}></span></button>
                <button className="cl-pdp-color-dot"><span style={{ background: '#161513' }}></span></button>
                <button className="cl-pdp-color-dot"><span style={{ background: '#e8e3da', border: '1px solid #d8d3c8' }}></span></button>
              </div>
            </div>

            <div className="cl-pdp-option">
              <p className="cl-pdp-option-label">Bracelet</p>
              <div className="cl-pdp-pills">
                <button className="cl-pdp-pill active">Cuir</button>
                <button className="cl-pdp-pill">Acier</button>
              </div>
            </div>

            <div className="cl-pdp-actions">
              <input type="number" name="" id="" min={1} />
              <button className="cl-pdp-btn cl-pdp-btn--outline">
                <CiShoppingBasket />
                Ajouter au panier
              </button>
              <button className="cl-pdp-btn cl-pdp-btn--solid">Acheter maintenant</button>
            </div>

            <button className="cl-pdp-wishlist">
              <CiHeart />
              Ajouter à ma liste d'envies
            </button>

          </div>
        </div>
      </section>


      <section className="cl-collection">
        <div className="container">

          <div className="cl-section-head">
            <span className="cl-section-label"><img src={titleIcon} alt="" />Montres Similaires</span>
          </div>

          <div className="cl-collection-grid">

            {products.map((p) => (
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

                  <Link to="/produit-details" className="cl-product-discover">
                    Découvrir
                  </Link>
                </div>

                <button className="cl-product-cart-btn">
                  <CiShoppingBasket className="i" />
                </button>

              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  )
}
