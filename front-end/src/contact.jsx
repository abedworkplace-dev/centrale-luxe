// src/contact.jsx
import React, { useState } from 'react';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";
import Swal from 'sweetalert2';
import SEO from './seo';

const API_BASE = import.meta.env.VITE_API_URL;

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setLoading(false);
                const clientName = formData.name;
                const clientEmail = formData.email;
                setFormData({ name: '', email: '', subject: '', message: '' });

                Swal.fire({
                    icon: 'success',
                    title: '<span class="cl-swal-title">Message Envoyé !</span>',
                    html: `
                        <div class="cl-swal-content">
                            <p class="cl-swal-lead">
                                Merci <strong>${clientName}</strong>, votre message a bien été transmis à notre service conciergerie.
                            </p>
                            <p class="cl-swal-info">
                                Un conseiller vous répondra sur <strong>${clientEmail}</strong> sous 24h ouvrées.
                            </p>
                        </div>
                    `,
                    confirmButtonText: 'D’accord',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'cl-swal-popup',
                        confirmButton: 'cl-swal-btn',
                        icon: 'cl-swal-icon'
                    }
                });
            } else {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: '<span class="cl-swal-title">Une erreur est survenue</span>',
                    text: data.message || "Impossible d'envoyer votre message pour le moment.",
                    confirmButtonText: 'Réessayer',
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
                title: '<span class="cl-swal-title">Erreur de connexion</span>',
                text: "Impossible de joindre le serveur. Veuillez vérifier votre connexion.",
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
            <SEO
                title="Contact & Conciergerie"
                description="Contactez notre service client et conciergerie Central Luxe par message, email ou WhatsApp pour tout conseil horloger ou suivi de commande."
            />

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
                                <span className="cl-contactus-label">Téléphone </span>
                                <p>+33 1 00 00 00 00</p>
                            </div>

                            <div className="cl-contactus-item">
                                <span className="cl-contactus-label">Localisation </span>
                                <p>14 rue de la Paix 75002 Paris, France</p>
                            </div>

                            <div>
                                <span className="cl-contactus-label">Follow us</span>
                                <div className="cl-contactus-socials">
                                    <a className="cl-contactus-social" target='_blank' rel="noreferrer" href="https://www.tiktok.com/@central.luxe"><FaTiktok /></a>
                                    <a className="cl-contactus-social" target='_blank' rel="noreferrer" href="https://wa.me/message/R4PMXGWSUYASJ1"><FaWhatsapp /></a>
                                    <a className="cl-contactus-social" target='_blank' rel="noreferrer" href="https://www.facebook.com/share/1EVFnjrzhC/"><FaFacebookF /></a>
                                    <a className="cl-contactus-social" target='_blank' rel="noreferrer" href="https://www.instagram.com/centralluxe1"><FaInstagram /></a>
                                </div>
                            </div>
                        </div>

                        <form className="cl-contactus-form" onSubmit={handleSubmit}>
                            <div className="cl-contactus-row">
                                <div className="cl-contactus-field">
                                    <label htmlFor="name">Nom & Prénoms</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Votre nom complet"
                                    />
                                </div>
                                <div className="cl-contactus-field">
                                    <label htmlFor="email">Adresse email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Votre adresse email"
                                    />
                                </div>
                            </div>

                            <div className="cl-contactus-field">
                                <label htmlFor="subject">Votre sujet</label>
                                <input
                                    id="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Le sujet de votre message"
                                />
                            </div>

                            <div className="cl-contactus-field">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Votre message"
                                />
                            </div>

                            <button type="submit" className="cl-contactus-submit" disabled={loading}>
                                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}