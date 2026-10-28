// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { transporter, renderEmailTemplate, SITE_URL } = require('./mailer');

const app = express();

// ==========================================
// CONFIGURATION CORS MULTI-ORIGINES
// ==========================================
const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map(url => url.trim()).filter(Boolean)
    : ['*'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes('*')) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`Bloqué par CORS : ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Helper pour inclure la copie uniquement si ADMIN_CC_EMAIL est défini
const getCcOption = () => {
    return process.env.ADMIN_CC_EMAIL ? { cc: process.env.ADMIN_CC_EMAIL } : {};
};

// ==========================================
// ANTI-SPAM HELPER : GÉNÉRATEUR DE TEXTE BRUT
// ==========================================
// Les serveurs exigent du texte brut en plus du HTML pour certifier le message
function htmlToPlainText(html) {
    if (!html) return '';
    return html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<br\s*[\/]?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<\/tr>/gi, '\n')
        .replace(/<\/td>/gi, ' | ')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&bull;/g, '•')
        .replace(/&rarr;/g, '->')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

// Expéditeur officiel uniforme
const FROM_EMAIL = `"Central Luxe" <${process.env.SMTP_USER}>`;
const CONTACT_EMAIL = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

// ==========================================
// 1. ROUTE CONTACT
// ==========================================
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Champs requis manquants.' });
    }

    try {
        // Mail pour l'ADMINISTRATEUR
        const adminBody = `
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#1a1916" style="background-color: #1a1916; border-left: 4px solid #c9a24a; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                <tr>
                    <td>
                        <p style="margin: 0 0 8px 0; font-size: 13.5px; color: #a09a8c;"><strong>Expéditeur :</strong> <span style="color: #ffffff;">${name}</span></p>
                        <p style="margin: 0 0 8px 0; font-size: 13.5px; color: #a09a8c;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #c9a24a; text-decoration: none;">${email}</a></p>
                        <p style="margin: 0; font-size: 13.5px; color: #a09a8c;"><strong>Sujet :</strong> <span style="color: #ffffff;">${subject || 'Non spécifié'}</span></p>
                    </td>
                </tr>
            </table>

            <p style="font-size: 13.5px; font-weight: 700; margin-bottom: 8px; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">Message du client :</p>
            <div style="background-color: #161616; border: 1px solid #282520; padding: 18px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #e6e2d8;">
                ${message.replace(/\n/g, '<br>')}
            </div>
        `;

        const adminHtml = renderEmailTemplate({
            eyebrow: 'MESSAGE REÇU',
            title: 'Nouvelle demande de contact',
            subtitle: `Message transmis par ${name} depuis le site.`,
            mainContent: adminBody,
            ctaText: 'Répondre par Email',
            ctaLink: `mailto:${email}`,
        });

        await transporter.sendMail({
            from: FROM_EMAIL,
            to: process.env.ADMIN_EMAIL,
            ...getCcOption(),
            replyTo: email,
            subject: `[Contact] ${subject || 'Nouveau message'} — ${name}`,
            text: htmlToPlainText(adminHtml),
            html: adminHtml,
        });

        // Accusé de réception pour le CLIENT
        const clientBody = `
            <p style="font-size: 14.5px; color: #e6e2d8; line-height: 1.6;">
                Bonjour <strong>${name}</strong>,<br><br>
                Nous vous confirmons la bonne réception de votre message concernant « <strong>${subject || 'votre demande'}</strong> ».
            </p>
            <p style="font-size: 14px; color: #a09a8c; line-height: 1.6;">
                Un conseiller horloger examine votre message et vous apportera une réponse personnalisée sous <strong>24 heures ouvrées</strong>.
            </p>
        `;

        const clientHtml = renderEmailTemplate({
            eyebrow: 'CONFIRMATION DE RÉCEPTION',
            title: 'Votre message a bien été reçu',
            subtitle: 'Notre équipe prend en charge votre demande.',
            mainContent: clientBody,
            ctaText: 'Visiter la boutique',
            ctaLink: `${SITE_URL}/boutique`,
        });

        await transporter.sendMail({
            from: FROM_EMAIL,
            to: email,
            replyTo: CONTACT_EMAIL,
            subject: 'Nous avons bien reçu votre message — Central Luxe',
            text: htmlToPlainText(clientHtml),
            html: clientHtml,
        });

        res.json({ success: true, message: 'Message envoyé avec succès.' });
    } catch (err) {
        console.error('Erreur Contact:', err);
        res.status(500).json({ success: false, message: "Erreur lors de l'envoi." });
    }
});

// ==========================================
// 2. ROUTE NEWSLETTER
// ==========================================
app.post('/api/newsletter', async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Email invalide.' });
    }

    try {
        // Notification ADMIN
        const adminHtml = renderEmailTemplate({
            eyebrow: 'NOUVEL ABONNÉ',
            title: 'Inscription Newsletter',
            subtitle: `Nouvel abonné : ${email}`,
            mainContent: `<p style="font-size: 14px; color: #a09a8c;">L'adresse ${email} a été enregistrée avec succès.</p>`,
        });

        await transporter.sendMail({
            from: FROM_EMAIL,
            to: process.env.ADMIN_EMAIL,
            ...getCcOption(),
            subject: `[Newsletter] Nouvel abonné : ${email}`,
            text: htmlToPlainText(adminHtml),
            html: adminHtml,
        });

        // Email de BIENVENUE CLIENT
        const welcomeBody = `
            <p style="font-size: 14.5px; color: #e6e2d8; line-height: 1.6; text-align: center;">
                Bienvenue dans le cercle privilégié de <strong>Central Luxe</strong>.
            </p>
            <p style="font-size: 13.5px; color: #a09a8c; line-height: 1.6; text-align: center;">
                Vous recevrez en avant-première nos collections exclusives, pièces horlogères et actualités privées.
            </p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#1a1916" style="background-color: #1a1916; border: 1px dashed #4a4130; border-radius: 8px; margin: 24px 0;">
                <tr>
                    <td align="center" style="padding: 20px;">
                        <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #a09a8c; letter-spacing: 1px;">VOTRE AVANTAGE DE BIENVENUE :</p>
                        <p style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 3px; color: #c9a24a;">LUXE10</p>
                    </td>
                </tr>
            </table>
        `;

        const welcomeHtml = renderEmailTemplate({
            eyebrow: 'BIENVENUE',
            title: 'L’élégance commence ici',
            subtitle: 'Votre code de bienvenue est prêt.',
            mainContent: welcomeBody,
            ctaText: 'Découvrir la collection',
            ctaLink: `${SITE_URL}/boutique`,
        });

        await transporter.sendMail({
            from: FROM_EMAIL,
            to: email,
            replyTo: CONTACT_EMAIL,
            subject: 'Bienvenue chez Central Luxe — Votre code de bienvenue',
            text: htmlToPlainText(welcomeHtml),
            html: welcomeHtml,
        });

        res.json({ success: true, message: 'Inscription réussie.' });
    } catch (err) {
        console.error('Erreur Newsletter:', err);
        res.status(500).json({ success: false, message: "Erreur lors de l'abonnement." });
    }
});

// ==========================================
// 3. ROUTE COMMANDE
// ==========================================
app.post('/api/orders', async (req, res) => {
    const { customer, items, subtotal, discount, total, promoCode } = req.body;

    if (!customer || !customer.name || !customer.phone || !items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Informations de commande incomplètes.' });
    }

    const orderNumber = 'CL-' + Math.floor(100000 + Math.random() * 900000);

    // Lignes d'articles
    const itemsHtml = items.map(item => `
        <tr style="border-bottom: 1px solid #24221d;">
            <td style="padding: 12px 6px;">
                <strong style="color: #ffffff; font-size: 13.5px;">${item.name}</strong><br>
                <small style="color: #c9a24a; font-size: 11.5px;">Bracelet : ${item.bracelet || 'Standard'} ${item.taille ? `| Taille : ${item.taille}` : ''}</small>
            </td>
            <td align="center" style="padding: 12px 6px; font-size: 13.5px; color: #a09a8c;">x${item.qty}</td>
            <td align="right" style="padding: 12px 6px; font-size: 13.5px; font-weight: 600; color: #ffffff;">${(item.price * item.qty).toLocaleString('fr-FR')} XOF</td>
        </tr>
    `).join('');

    const orderBody = `
        <!-- Bloc Détails Commande -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#1a1916" style="background-color: #1a1916; border: 1px dashed #4a4130; border-radius: 8px; margin-bottom: 24px;">
            <tr>
                <td style="padding: 20px;">
                    <p style="margin: 0 0 14px 0; font-size: 13.5px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">
                        Récapitulatif de votre commande
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td style="padding: 7px 0; font-size: 12.5px; color: #a09a8c; border-bottom: 1px solid #28241d;">N° de Commande :</td>
                            <td align="right" style="padding: 7px 0; font-size: 12.5px; font-weight: 700; color: #c9a24a; border-bottom: 1px solid #28241d;">${orderNumber}</td>
                        </tr>
                        <tr>
                            <td style="padding: 7px 0; font-size: 12.5px; color: #a09a8c; border-bottom: 1px solid #28241d;">Client :</td>
                            <td align="right" style="padding: 7px 0; font-size: 12.5px; font-weight: 600; color: #ffffff; border-bottom: 1px solid #28241d;">${customer.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 7px 0; font-size: 12.5px; color: #a09a8c; border-bottom: 1px solid #28241d;">Téléphone :</td>
                            <td align="right" style="padding: 7px 0; font-size: 12.5px; font-weight: 500; color: #ffffff; border-bottom: 1px solid #28241d;">
                                <a href="tel:${customer.phone}" style="color: #ffffff; text-decoration: none;">${customer.phone}</a>
                            </td>
                        </tr>
                        ${customer.email ? `
                        <tr>
                            <td style="padding: 7px 0; font-size: 12.5px; color: #a09a8c; border-bottom: 1px solid #28241d;">Email :</td>
                            <td align="right" style="padding: 7px 0; font-size: 12.5px; font-weight: 500; color: #ffffff; border-bottom: 1px solid #28241d;">${customer.email}</td>
                        </tr>` : ''}
                        <tr>
                            <td style="padding: 7px 0 ${customer.notes ? '; border-bottom: 1px solid #28241d;' : ''}; font-size: 12.5px; color: #a09a8c;">Lieu de livraison :</td>
                            <td align="right" style="padding: 7px 0 ${customer.notes ? '; border-bottom: 1px solid #28241d;' : ''}; font-size: 12.5px; font-weight: 700; color: #ffffff;">${customer.address || 'Calavi'}</td>
                        </tr>
                        ${customer.notes ? `
                        <tr>
                            <td style="padding: 7px 0 0 0; font-size: 12.5px; color: #a09a8c;">Note :</td>
                            <td align="right" style="padding: 7px 0 0 0; font-size: 12.5px; font-weight: 500; color: #dddddd;">${customer.notes}</td>
                        </tr>` : ''}
                    </table>
                </td>
            </tr>
        </table>

        <!-- Tableau Articles -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr style="border-bottom: 1px solid #3a3428; color: #c9a24a; font-size: 11.5px; text-transform: uppercase; letter-spacing: 1px;">
                    <th align="left" style="padding: 8px 6px;">Article</th>
                    <th align="center" style="padding: 8px 6px;">Qté</th>
                    <th align="right" style="padding: 8px 6px;">Sous-total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
        </table>

        <!-- Totaux -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
                <td align="right" style="padding: 4px 0; font-size: 13px; color: #888888;">Sous-total :</td>
                <td align="right" width="130" style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #ffffff;">${Number(subtotal).toLocaleString('fr-FR')} XOF</td>
            </tr>
            ${discount > 0 ? `
            <tr>
                <td align="right" style="padding: 4px 0; font-size: 13px; color: #4caf50;">Remise (${promoCode || ''}) :</td>
                <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #4caf50;">-${Number(discount).toLocaleString('fr-FR')} XOF</td>
            </tr>
            ` : ''}
            <tr>
                <td align="right" style="padding: 4px 0; font-size: 13px; color: #888888;">Livraison :</td>
                <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 700; color: #c9a24a;">Offerte</td>
            </tr>
            <tr>
                <td align="right" style="padding: 12px 0 0 0; font-size: 14px; font-weight: 700; color: #ffffff;">Total à régler :</td>
                <td align="right" style="padding: 12px 0 0 0; font-size: 18px; font-weight: 800; color: #c9a24a;">${Number(total).toLocaleString('fr-FR')} XOF</td>
            </tr>
        </table>
    `;

    try {
        // 1. Envoi à l'ADMINISTRATEUR (Sans emojis agressifs)
        const adminHtml = renderEmailTemplate({
            eyebrow: 'NOUVELLE COMMANDE',
            title: `Commande ${orderNumber}`,
            subtitle: `Montant : ${Number(total).toLocaleString('fr-FR')} XOF`,
            mainContent: orderBody,
            ctaText: 'Voir le site',
            ctaLink: SITE_URL,
        });

        await transporter.sendMail({
            from: FROM_EMAIL,
            to: process.env.ADMIN_EMAIL,
            ...getCcOption(),
            subject: `[Nouvelle commande] ${orderNumber} — ${customer.name} (${Number(total).toLocaleString('fr-FR')} XOF)`,
            text: htmlToPlainText(adminHtml),
            html: adminHtml,
        });

        // 2. Envoi au CLIENT
        if (customer.email) {
            const clientHtml = renderEmailTemplate({
                eyebrow: 'COMMANDE CONFIRMÉE',
                title: 'Merci pour votre commande',
                subtitle: 'Votre commande a bien été enregistrée et est en cours de préparation.',
                mainContent: orderBody,
                ctaText: 'Découvrir la collection',
                ctaLink: `${SITE_URL}/boutique`,
            });

            await transporter.sendMail({
                from: FROM_EMAIL,
                to: customer.email,
                replyTo: CONTACT_EMAIL,
                subject: `Confirmation de votre commande ${orderNumber} — Central Luxe`,
                text: htmlToPlainText(clientHtml),
                html: clientHtml,
            });
        }

        res.json({ success: true, orderNumber, message: 'Commande transmise avec succès !' });
    } catch (err) {
        console.error('Erreur Commande:', err);
        res.status(500).json({ success: false, message: 'Erreur lors de la commande.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend Central Luxe prêt sur le port ${PORT}`);
});