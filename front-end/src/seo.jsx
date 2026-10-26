// src/SEO.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({
  title,
  description,
  image = '/bg.png',
  type = 'website',
  keywords = 'montres de luxe, horlogerie, montres bénin, achat montre cotonou, central luxe'
}) {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = 'Central Luxe';
    
    // 1. Titre de l'onglet
    document.title = title ? `${title} - ${baseTitle}` : 'Central Luxe - Horlogerie d\'Exception au Bénin';

    // Helper pour mettre à jour ou créer une balise meta
    const setMetaTag = (attributeName, attributeValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper pour la balise canonical
    const setCanonical = (href) => {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    const currentUrl = window.location.origin + location.pathname;
    const fullImageUrl = typeof image === 'string' && image.startsWith('http')
      ? image
      : window.location.origin + (image || '/bg.png');
    
    const finalDesc = description || "Découvrez des montres façonnées avec des matériaux d'exception, alliant élégance intemporelle et précision horlogère chez Central Luxe.";

    // 2. SEO Classique Google
    setMetaTag('name', 'description', finalDesc);
    setMetaTag('name', 'keywords', keywords);
    setCanonical(currentUrl);

    // 3. Open Graph (WhatsApp, Facebook, LinkedIn)
    setMetaTag('property', 'og:title', title ? `${title} | ${baseTitle}` : 'Central Luxe');
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Central Luxe');

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title ? `${title} | ${baseTitle}` : 'Central Luxe');
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', fullImageUrl);

  }, [title, description, image, type, keywords, location.pathname]);

  return null;
}