import React from 'react'
import { FiDroplet, FiTruck, FiRefreshCw, FiShield, FiCreditCard, FiPlus, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';

export default function Faq() {
    const faqs = [
        {
            icon: FiDroplet,
            q: 'Cette montre est-elle étanche ?',
            a: "Oui, elle est étanche à 5 ATM : elle résiste aux éclaboussures, à la pluie et à la douche. Nous déconseillons la natation et la plongée.",
        },
        {
            icon: FiTruck,
            q: 'Quels sont les délais de livraison ?',
            a: "Livraison assurée en 24 à 48h en France, et 3 à 5 jours en Belgique, Suisse et Luxembourg. Un lien de suivi vous est envoyé dès l'expédition.",
        },
        {
            icon: FiRefreshCw,
            q: 'Puis-je retourner ma montre ?',
            a: "Oui, sous 30 jours après réception, si la montre n'a pas été portée et qu'elle est dans son coffret d'origine. Remboursement sous 5 jours après réception du colis.",
        },
        {
            icon: FiShield,
            q: 'Que couvre la garantie de 2 ans ?',
            a: "Elle couvre le mouvement et le boîtier contre tout défaut de fabrication. Elle est distincte du droit de retour de 30 jours.",
        },
        {
            icon: FiCreditCard,
            q: 'Quels moyens de paiement acceptez-vous ?',
            a: "Carte bancaire, Apple Pay et PayPal, avec possibilité de paiement en 3x sans frais. Toutes les transactions sont chiffrées.",
        },
    ];

    const [openFaq, setOpenFaq] = useState(0); // 0 = première question ouverte, null = tout fermé

    const toggleFaq = (index) => {
        setOpenFaq((prev) => (prev === index ? null : index));
    };
    return (
        <div>
            <section className="cl-innerhero">

                <div className="container cl-innerhero-inner">

                    <h1 className="cl-innerhero-title">Questions<span> Fréquentes</span></h1>

                </div>


            </section>




            <section className="cl-faq">
                <div className="container cl-faq-inner">



                    <div className='title-page cl-faq-head'>
                        <h2 className="cl-section-title">Questions fréquentes</h2>
                        <p className="cl-section-sub-title">Tout ce qu'il faut savoir avant de commander</p>
                    </div>

                    <div className="cl-faq-list">
                        {faqs.map((f, index) => {
                            const Icon = f.icon;
                            return (
                                <div className={`cl-faq-item ${openFaq === index ? 'open' : ''}`} key={f.q}>
                                    <button className="cl-faq-question" onClick={() => toggleFaq(index)}>
                                        <span className="cl-faq-icon"><Icon /></span>
                                        <span className="cl-faq-question-text">{f.q}</span>
                                        <span className="cl-faq-toggle"><FiPlus /></span>
                                    </button>
                                    <div className="cl-faq-answer">
                                        <div className="cl-faq-answer-inner">
                                            <p>{f.a}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cl-faq-more">
                        <div>
                            <h3>Une autre question ?</h3>
                            <p>Notre équipe vous répond sous 24h ouvrées.</p>
                        </div>
                        <a href="/boutique" target="_blank" rel="noreferrer" class="btn-secondary">Nous contacter<span>
                            <FiArrowRight />
                        </span></a>
                    </div>

                </div>
            </section>
        </div>
    )
}
