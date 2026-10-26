// src/footer.jsx
import { useState } from 'react';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
import Swal from 'sweetalert2';

const API_BASE = import.meta.env.VITE_API_URL;

export default function Footer() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/newsletter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            setLoading(false);

            if (res.ok && data.success) {
                const subscribedEmail = email;
                setEmail('');

                Swal.fire({
                    icon: 'success',
                    title: '<span class="cl-swal-title">Bienvenue dans le Cercle</span>',
                    html: `
                        <div class="cl-swal-content">
                            <p class="cl-swal-lead">
                                Votre abonnement à notre newsletter est validé avec succès.
                            </p>
                            <p class="cl-swal-info">
                                Vous recevrez en exclusivité nos nouvelles éditions et offres privées sur <strong>${subscribedEmail}</strong>.
                            </p>
                        </div>
                    `,
                    confirmButtonText: 'Parfait',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'cl-swal-popup',
                        confirmButton: 'cl-swal-btn',
                        icon: 'cl-swal-icon'
                    }
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '<span class="cl-swal-title">Attention</span>',
                    text: data.message || "Cet email est déjà inscrit ou invalide.",
                    confirmButtonText: 'Compris',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'cl-swal-popup',
                        confirmButton: 'cl-swal-btn'
                    }
                });
            }
        } catch {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: '<span class="cl-swal-title">Erreur réseau</span>',
                text: "Impossible de vous inscrire pour le moment. Veuillez réessayer plus tard.",
                confirmButtonText: 'Fermer',
                buttonsStyling: false,
                customClass: {
                    popup: 'cl-swal-popup',
                    confirmButton: 'cl-swal-btn'
                }
            });
        }
    };

    return (
        <div>
            <footer className="cl-footer">
                <div className="container cl-footer-inner">
                    <div className="cl-footer-grid">
                        <div>
                            <div className="cl-footer-logo">
                                <img alt="Central Luxe" src="/src/assets/images/logo/01.png" />
                            </div>
                            <p className="cl-footer-tagline">
                                Des montres pensées pour durer, vendues sans intermédiaire.
                            </p>
                            <div className="cl-footer-social">
                                <a target='_blank' rel="noreferrer" href="https://www.tiktok.com/@central.luxe"><FaTiktok /></a>
                                <a target='_blank' rel="noreferrer" href="https://wa.me/message/R4PMXGWSUYASJ1"><FaWhatsapp /></a>
                                <a target='_blank' rel="noreferrer" href="https://www.facebook.com/share/1EVFnjrzhC/"><FaFacebookF /></a>
                                <a target='_blank' rel="noreferrer" href="https://www.instagram.com/centralluxe1"><FaInstagram /></a>
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
                            <form className="cl-footer-news-form" onSubmit={handleSubscribe}>
                                <input 
                                    type="email" 
                                    placeholder="Votre email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                                <button className="cl-footer-news-btn" type="submit" disabled={loading} aria-label="S'abonner">
                                    <HiOutlineChevronRight />
                                </button>
                            </form>
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
    );
}