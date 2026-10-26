// backend/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const LOGO_URL = 'https://centrale-luxe.vercel.app/assets/01-jvYCcJ0R.png';
const SITE_URL = 'https://centrale-luxe.vercel.app';
const WHATSAPP_URL = 'https://wa.me/message/R4PMXGWSUYASJ1';

/* ------------------------------------------------------------------
 * Design tokens (une seule source de vérité pour les couleurs)
 * ------------------------------------------------------------------ */
const C = {
    pageBg: '#0b0b0c',      // fond de l'e-mail
    cardBg: '#131312',      // carte principale
    headerBg: '#0f0f0e',    // en-tête
    footerBg: '#0b0b0c',    // pied de page
    panelBg: '#1a1916',     // encadrés (détails, WhatsApp)
    line: '#2a2720',        // séparateurs
    lineSoft: '#232019',    // séparateurs légers dans les encadrés
    dash: '#4a4130',        // bordure pointillée des encadrés
    gold: '#c9a24a',        // accent principal
    goldDark: '#a98430',    // dégradé bouton
    white: '#ffffff',
    text: '#e6e2d8',        // texte courant (blanc chaud)
    muted: '#a09a8c',       // texte secondaire (contraste AA sur #131312)
    faint: '#7d786c',       // mentions légales
};

const FONT = "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif";

/* Force le fond même quand Gmail / Apple Mail tentent l'inversion en mode sombre */
const solid = (hex) => `background-color: ${hex}; background-image: linear-gradient(${hex}, ${hex});`;

/**
 * Bloc "Détails de la commande"
 * Accepte soit un objet, soit du HTML brut (string).
 */
function renderOrderDetails(data) {
    if (!data) return '';

    const box = (inner) => `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${C.panelBg}" style="${solid(C.panelBg)} ; border-radius: 10px; margin: 22px 0 6px 0;">
        <tr>
            <td class="box-pad" style="padding: 22px 24px; font-family: ${FONT};">
                ${inner}
            </td>
        </tr>
    </table>`;

    if (typeof data === 'string') return box(data);

    const { orderNumber, customerName, phone, email, deliveryLocation } = data;

    const rows = [
        orderNumber && { label: 'N° de commande', value: orderNumber, color: C.gold, weight: 700 },
        customerName && { label: 'Client', value: customerName, color: C.white, weight: 600 },
        phone && { label: 'Téléphone', value: phone, color: C.white, weight: 500 },
        email && { label: 'Email', value: email, color: C.white, weight: 500 },
        deliveryLocation && { label: 'Lieu de livraison', value: deliveryLocation, color: C.white, weight: 700 },
    ].filter(Boolean);

    const rowsHtml = rows
        .map((r, i) => {
            const border = i < rows.length - 1 ? `border-bottom: 1px solid ${C.lineSoft};` : '';
            return `
            <tr>
                <td width="42%" valign="top" style="padding: 10px 12px 10px 0; font-family: ${FONT}; font-size: 13px; line-height: 1.5; color: ${C.muted}; ${border}">
                    ${r.label}
                </td>
                <td width="58%" align="right" valign="top" style="padding: 10px 0; font-family: ${FONT}; font-size: 13.5px; line-height: 1.5; font-weight: ${r.weight}; color: ${r.color}; word-break: break-word; ${border}">
                    ${r.value}
                </td>
            </tr>`;
        })
        .join('');

    return box(`
        <p style="margin: 0 0 8px 0; font-family: ${FONT}; font-size: 15px; font-weight: 700; color: ${C.white};">
            Détails de la commande
        </p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            ${rowsHtml}
        </table>
    `);
}

/**
 * Bouton CTA "bulletproof" (rendu correct dans Outlook, Gmail, Apple Mail)
 */
function renderButton(text, link) {
    const href = link || SITE_URL;
    return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="btn-table" style="margin: 0 auto;">
        <tr>
            <td align="center" bgcolor="${C.gold}" style="border-radius: 6px; ${solid(C.gold)} background-image: linear-gradient(${C.gold}, ${C.goldDark});">
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${href}" style="height:48px;v-text-anchor:middle;width:260px;" arcsize="12%" stroke="f" fillcolor="${C.gold}">
                    <w:anchorlock/>
                    <center style="color:#0b0b0c;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:1px;">${text}</center>
                </v:roundrect>
                <![endif]-->
                <!--[if !mso]><!-->
                <a class="btn" href="${href}" target="_blank" style="display: inline-block; padding: 15px 40px; font-family: ${FONT}; font-size: 13px; line-height: 18px; font-weight: 700; color: #0b0b0c !important; text-decoration: none; text-transform: uppercase; letter-spacing: 1.2px; border-radius: 6px;">
                    ${text}
                </a>
                <!--<![endif]-->
            </td>
        </tr>
    </table>`;
}

/**
 * Gabarit principal (Dark Luxury E-commerce)
 */
function renderEmailTemplate({ eyebrow, title, subtitle, mainContent, orderDetails, ctaText, ctaLink, preheader }) {
    const orderDetailsBlock = orderDetails ? renderOrderDetails(orderDetails) : '';
    const preview = preheader || subtitle || title || '';
    const year = new Date().getFullYear();

    return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>${title || 'Central Luxe'}</title>
    <!--[if mso]>
    <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }

        /* Empêche Gmail d'écraser les fonds */
        u + .body .email-bg { background-color: ${C.pageBg} !important; background-image: linear-gradient(${C.pageBg}, ${C.pageBg}) !important; }
        u + .body .card-bg  { background-color: ${C.cardBg} !important; background-image: linear-gradient(${C.cardBg}, ${C.cardBg}) !important; }

        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
        a { text-decoration: none; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }

        .body-copy p { margin: 0 0 14px 0; }
        .body-copy strong { color: ${C.white}; }
        .body-copy a { color: ${C.gold}; text-decoration: underline; }

        /* ---------- MOBILE ---------- */
        @media only screen and (max-width: 620px) {
            .outer-pad { padding: 14px 8px !important; }
            .email-container { width: 100% !important; max-width: 100% !important; border-radius: 8px !important; }

            .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
            .header-pad { padding-top: 20px !important; padding-bottom: 20px !important; }
            .box-pad { padding: 18px 16px !important; }

            .mobile-center { text-align: center !important; }
            .mobile-hide { display: none !important; }
            .logo-cell { text-align: center !important; }
            .logo-cell img { margin: 0 auto !important; }

            .mobile-title { font-size: 23px !important; line-height: 1.3 !important; }
            .body-copy { font-size: 15.5px !important; line-height: 1.7 !important; }

            /* Réassurance : 3 colonnes -> 3 lignes empilées */
            .mobile-stack {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
                border-left: none !important;
                border-right: none !important;
                border-bottom: 1px solid ${C.line} !important;
                padding: 16px 0 !important;
            }
            .mobile-stack-last { border-bottom: none !important; }

            /* CTA pleine largeur, zone tactile >= 48px */
            .btn-table { width: 100% !important; }
            .btn { display: block !important; padding: 16px 12px !important; font-size: 13.5px !important; }

            /* Pied de page : tout centré et empilé */
            .footer-col { display: block !important; width: 100% !important; text-align: center !important; padding: 4px 0 !important; }
            .social-link { display: inline-block !important; margin: 0 8px 8px 8px !important; }
        }
    </style>
</head>
<body class="body email-bg" bgcolor="${C.pageBg}" style="margin: 0; padding: 0; ${solid(C.pageBg)} font-family: ${FONT}; -webkit-font-smoothing: antialiased; color: ${C.text};">

    <!-- Preheader (aperçu dans la boîte de réception) -->
    <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all;">
        ${preview}&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;
    </div>

    <!-- Wrapper plein écran -->
    <table class="email-bg outer-pad" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${C.pageBg}" style="${solid(C.pageBg)} padding: 32px 12px;">
        <tr>
            <td class="email-bg" align="center" bgcolor="${C.pageBg}" style="${solid(C.pageBg)}">

                <!--[if mso]><table role="presentation" width="620" align="center" cellspacing="0" cellpadding="0" border="0"><tr><td><![endif]-->

                <!-- Carte centrale -->
                <table class="email-container card-bg" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${C.cardBg}" style="max-width: 620px; ${solid(C.cardBg)} border: 1px solid ${C.line}; border-radius: 12px; overflow: hidden;">

                    <!-- Filet doré -->
                    <tr>
                        <td height="3" style="height: 3px; line-height: 3px; font-size: 0; background-color: ${C.gold}; background-image: linear-gradient(90deg, ${C.goldDark}, ${C.gold}, ${C.goldDark});">&nbsp;</td>
                    </tr>

                    <!-- 1. HEADER -->
                    <tr>
                        <td class="mobile-padding header-pad" bgcolor="${C.headerBg}" style="padding: 22px 36px; ${solid(C.headerBg)} border-bottom: 1px solid ${C.line};">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td class="logo-cell" align="left" valign="middle">
                                        <a href="${SITE_URL}" target="_blank">
                                            <img src="${LOGO_URL}" alt="Central Luxe" width="130" style="display: block; border: 0; width: 130px; max-width: 130px; height: auto;" />
                                        </a>
                                    </td>
                                    <td class="mobile-hide" align="right" valign="middle" style="font-family: ${FONT}; font-size: 12px; font-weight: 600; letter-spacing: 0.8px; white-space: nowrap;">
                                        <a href="${SITE_URL}" style="color: ${C.text}; text-decoration: none;">Accueil</a>
                                        <span style="color: ${C.dash}; padding: 0 8px;">|</span>
                                        <a href="${SITE_URL}/boutique" style="color: ${C.gold}; text-decoration: none;">Boutique</a>
                                        <span style="color: ${C.dash}; padding: 0 8px;">|</span>
                                        <a href="${SITE_URL}/contact" style="color: ${C.text}; text-decoration: none;">Contact</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- 2. EYEBROW -->
                    ${eyebrow ? `
                    <tr>
                        <td class="mobile-padding" align="center" style="padding: 34px 36px 0 36px;">
                            <span style="display: inline-block; font-family: ${FONT}; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${C.gold};">
                                ${eyebrow}
                            </span>
                        </td>
                    </tr>` : ''}

                    <!-- 3. TITRE & SOUS-TITRE -->
                    <tr>
                        <td class="mobile-padding" align="center" style="padding: ${eyebrow ? '14px' : '34px'} 36px 6px 36px;">
                            <h1 class="mobile-title" style="margin: 0; font-family: ${FONT}; font-size: 27px; line-height: 1.3; font-weight: 700; color: ${C.white};">
                                ${title}
                            </h1>
                            ${subtitle ? `
                            <p style="margin: 14px 0 0 0; font-family: ${FONT}; font-size: 15px; line-height: 1.65; color: ${C.muted};">
                                ${subtitle}
                            </p>` : ''}
                        </td>
                    </tr>

                    <!-- 4. CONTENU + DÉTAILS COMMANDE -->
                    <tr>
                        <td class="mobile-padding body-copy" style="padding: 22px 36px 8px 36px; font-family: ${FONT}; font-size: 15px; line-height: 1.75; color: ${C.text};">
                            ${mainContent || ''}
                            ${orderDetailsBlock}
                        </td>
                    </tr>

                    <!-- 5. CTA -->
                    ${ctaText ? `
                    <tr>
                        <td class="mobile-padding" align="center" style="padding: 26px 36px 38px 36px;">
                            ${renderButton(ctaText, ctaLink)}
                        </td>
                    </tr>` : `
                    <tr><td height="20" style="height: 20px; line-height: 20px; font-size: 0;">&nbsp;</td></tr>`}

                    <!-- SÉPARATEUR -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 36px;">
                            <hr style="border: 0; border-top: 1px solid ${C.line}; margin: 0;" />
                        </td>
                    </tr>

                    <!-- 6. RÉASSURANCE -->
                    <tr>
                        <td class="mobile-padding" style="padding: 28px 28px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td class="mobile-stack" align="center" width="33.33%" valign="top" style="padding: 0 8px;">
                                        <div style="font-size: 22px; line-height: 28px; margin-bottom: 6px;">🚚</div>
                                        <p style="margin: 0; font-family: ${FONT}; font-size: 13px; font-weight: 700; color: ${C.white};">Livraison offerte</p>
                                        <p style="margin: 4px 0 0 0; font-family: ${FONT}; font-size: 12px; color: ${C.muted};">Partout au Bénin</p>
                                    </td>
                                    <td class="mobile-stack" align="center" width="33.33%" valign="top" style="padding: 0 8px; border-left: 1px solid ${C.line}; border-right: 1px solid ${C.line};">
                                        <div style="font-size: 22px; line-height: 28px; margin-bottom: 6px;">🛡️</div>
                                        <p style="margin: 0; font-family: ${FONT}; font-size: 13px; font-weight: 700; color: ${C.white};">Garantie 2 ans</p>
                                        <p style="margin: 4px 0 0 0; font-family: ${FONT}; font-size: 12px; color: ${C.muted};">Qualité certifiée</p>
                                    </td>
                                    <td class="mobile-stack mobile-stack-last" align="center" width="33.33%" valign="top" style="padding: 0 8px;">
                                        <div style="font-size: 22px; line-height: 28px; margin-bottom: 6px;">✨</div>
                                        <p style="margin: 0; font-family: ${FONT}; font-size: 13px; font-weight: 700; color: ${C.white};">100% authentique</p>
                                        <p style="margin: 4px 0 0 0; font-family: ${FONT}; font-size: 12px; color: ${C.muted};">Finitions premium</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- 7. ENCADRÉ WHATSAPP -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 36px 34px 36px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${C.panelBg}" style="${solid(C.panelBg)} ; border-radius: 10px;">
                                <tr>
                                    <td class="box-pad" align="center" style="padding: 22px 24px;">
                                        <p style="margin: 0 0 6px 0; font-family: ${FONT}; font-size: 15px; font-weight: 700; color: ${C.white};">
                                            Une question sur votre commande ?
                                        </p>
                                        <p style="margin: 0; font-family: ${FONT}; font-size: 13px; line-height: 1.6; color: ${C.muted};">
                                            Notre équipe est disponible 7j/7 pour vous accompagner.
                                        </p>
                                        <a href="${WHATSAPP_URL}" target="_blank" style="display: inline-block; margin-top: 12px; padding: 6px 0; font-family: ${FONT}; font-size: 13px; font-weight: 700; color: ${C.gold}; text-decoration: none;">
                                            Contacter sur WhatsApp &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- 8. FOOTER -->
                    <tr>
                        <td class="mobile-padding mobile-center" bgcolor="${C.footerBg}" style="${solid(C.footerBg)} padding: 32px 36px; border-top: 1px solid ${C.line};">
                            <h3 style="margin: 0 0 8px 0; font-family: ${FONT}; font-size: 16px; font-weight: 700; color: ${C.white};">
                                Central Luxe ✨
                            </h3>
                            <p style="margin: 0 0 18px 0; font-family: ${FONT}; font-size: 12.5px; line-height: 1.6; color: ${C.muted};">
                                L'excellence horlogère et le raffinement au quotidien.
                            </p>

                            <div style="margin-bottom: 18px;">
                                <a class="social-link" href="${WHATSAPP_URL}" target="_blank" style="display: inline-block; margin-right: 16px; font-family: ${FONT}; color: ${C.gold}; font-size: 12.5px; text-decoration: none; font-weight: 600;">WhatsApp</a>
                                <a class="social-link" href="https://www.instagram.com/centralluxe1" target="_blank" style="display: inline-block; margin-right: 16px; font-family: ${FONT}; color: ${C.gold}; font-size: 12.5px; text-decoration: none; font-weight: 600;">Instagram</a>
                                <a class="social-link" href="https://www.tiktok.com/@central.luxe" target="_blank" style="display: inline-block; margin-right: 16px; font-family: ${FONT}; color: ${C.gold}; font-size: 12.5px; text-decoration: none; font-weight: 600;">TikTok</a>
                                <a class="social-link" href="https://www.facebook.com/share/1EVFnjrzhC/" target="_blank" style="display: inline-block; font-family: ${FONT}; color: ${C.gold}; font-size: 12.5px; text-decoration: none; font-weight: 600;">Facebook</a>
                            </div>

                            <hr style="border: 0; border-top: 1px solid ${C.line}; margin: 0 0 16px 0;" />

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td class="footer-col" align="left" style="font-family: ${FONT}; font-size: 11.5px; color: ${C.faint};">
                                        © ${year} Central Luxe. Tous droits réservés.
                                    </td>
                                    <td class="footer-col" align="right" style="font-family: ${FONT}; font-size: 11.5px; color: ${C.faint};">
                                        <a href="${SITE_URL}/faq" style="color: ${C.muted}; text-decoration: none;">FAQ</a>
                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <a href="${SITE_URL}/contact" style="color: ${C.muted}; text-decoration: none;">Contact</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>

                <!--[if mso]></td></tr></table><![endif]-->

            </td>
        </tr>
    </table>

</body>
</html>`;
}

module.exports = { transporter, renderEmailTemplate, renderOrderDetails, SITE_URL };