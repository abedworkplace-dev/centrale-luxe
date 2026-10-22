import React from 'react'
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp, FaStar, FaHeart, FaUsers, FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import { FiEye, FiFeather, FiShield, FiTruck, FiRefreshCw, FiLock } from 'react-icons/fi';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function Contact() {
    return (
        <div>
            <section className="cl-innerhero">

                <div className="container cl-innerhero-inner">

                    <h1 className="cl-innerhero-title">Nous <span>Contacter</span></h1>

                </div>


            </section>






            <section className="cl-contactus">
                <div className="container">
                    <div className='title-page'>
                        <h2 className="cl-section-title">Échangeons Ensemble</h2>
                        <p className="cl-section-sub-title">L’élégance commence par <span>une relation de confiance</span></p>
                    </div>
                    <div className="cl-contactus-grid">
                        <div className="cl-contactus-info">

                            <div className="cl-contactus-item">
                                <span className="cl-contactus-label">Email </span>
                                <p>centralluxecontact@gmail.com</p>
                            </div>

                            <div className="cl-contactus-item">
                                <span className="cl-contactus-label">TéléPhone </span>
                                <p>+33 1 00 00 00 00</p>
                            </div>

                            <div className="cl-contactus-item">
                                <span className="cl-contactus-label">Localisation </span>
                                <p>
                                    14 rue de la Paix 75002 Paris, France
                                </p>
                            </div>

                            <div>
                                <span className="cl-contactus-label">Follow us</span>
                                <div className="cl-contactus-socials">
                                    <a className="cl-contactus-social" target='__blank' href="https://www.tiktok.com/@central.luxe?_r=1&_t=ZS-990kAxNMaRQ"><FaTiktok /></a>
                                    <a className="cl-contactus-social" target='__blank' href="https://wa.me/message/R4PMXGWSUYASJ1"><FaWhatsapp /></a>
                                    <a className="cl-contactus-social" target='__blank' href="https://www.facebook.com/share/1EVFnjrzhC/?mibextid=wwXIfr"><FaFacebookF /></a>
                                    <a className="cl-contactus-social" target='__blank' href="https://www.instagram.com/centralluxe1?igsi=cjIybnVtNHdzdGtp&utm_source=qr"><FaInstagram /></a>

                                </div>
                            </div>
                        </div>

                        <form className="cl-contactus-form">
                            <div className="cl-contactus-row">
                                <div className="cl-contactus-field">
                                    <label htmlFor="name">Nom & Prénoms</label>
                                    <input id="name" type="text" placeholder="Votre nom complet" />
                                </div>
                                <div className="cl-contactus-field">
                                    <label htmlFor="email">Adresse email</label>
                                    <input id="email" type="email" placeholder="Votre adresse email" />
                                </div>
                            </div>
                            <div className="cl-contactus-field">
                                <label htmlFor="subject">Votre sujet</label>
                                <input id="subject" type="text" placeholder="Le sujet de votre message" />
                            </div>
                            <div className="cl-contactus-field">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" placeholder="Votre message" />
                            </div>

                            <button type="submit" className="cl-contactus-submit">Envoyer le message</button>
                            
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
