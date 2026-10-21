import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp, FaStar, FaHeart, FaUsers, FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import { FiEye, FiFeather, FiShield, FiTruck, FiRefreshCw, FiLock } from 'react-icons/fi';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function Footer() {
    return (
        <div>
            <footer className="cl-footer">
                <div className="container cl-footer-inner">

                    <div className="cl-footer-grid">

                        <div>
                            <div className="cl-footer-logo">
                                <img alt="" src="/src/assets/images/logo/01.png"></img>
                            </div>
                            <p className="cl-footer-tagline">
                                Des montres pensées pour durer, vendues sans intermédiaire.
                            </p>
                            <div className="cl-footer-social">
                                <a target='__blank' href="https://www.tiktok.com/@central.luxe?_r=1&_t=ZS-990kAxNMaRQ"><FaTiktok /></a>
                                <a target='__blank' href="https://wa.me/message/R4PMXGWSUYASJ1"><FaWhatsapp /></a>
                                <a target='__blank' href="https://www.facebook.com/share/1EVFnjrzhC/?mibextid=wwXIfr"><FaFacebookF /></a>
                                <a target='__blank' href="https://www.instagram.com/centralluxe1?igsi=cjIybnVtNHdzdGtp&utm_source=qr"><FaInstagram /></a>

                            </div>
                        </div>

                        <div>
                            <p className="cl-footer-heading">Nous contacter</p>
                            <div className="cl-footer-contact">
                                <p><a href="mailto:centralluxecontact@gmail.com">centralluxecontact@gmail.com</a></p>
                                <p>14 rue de la Paix 75002 Paris, France</p>
                                <p><a href="tel:+33100000000">+33 1 00 00 00 00</a></p>
                            </div>
                        </div>

                        <div>
                            <p className="cl-footer-heading">Newsletter</p>
                            <p className="cl-footer-news-text">
                                Recevez nos nouveautés et offres réservées à nos abonnés.
                            </p>
                            <div className="cl-footer-news-form">
                                <input type="email" placeholder="Votre email" />
                                <button className="cl-footer-news-btn" aria-label="S'abonner">
                                    <HiOutlineChevronRight />
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="cl-footer-bottom">
                        <div className="cl-footer-legal">
                            <p className="cl-footer-copyright">Designed & developed by <a href="#">AbedDev</a></p>
                        </div>
                        <p className="cl-footer-copyright">© 2026 Central Luxe. Tous droits réservés.</p>
                    </div>

                </div>
            </footer>
        </div>
    )
}
