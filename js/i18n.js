// I18N Engine
// Handles loading translations and preserving language selection in links

document.addEventListener('DOMContentLoaded', () => {

    // 1. Get current language from URL
    const params = new URLSearchParams(window.location.search);
    let currentLang = params.get('lang') || 'pl'; // Default to PL

    // Helper: Update all links to include ?lang=xx
    const updateLinks = (lang) => {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('http')) return;

            // Check if link already has query params
            const separator = href.includes('?') ? '&' : '?';

            // Avoid double adding
            if (href.includes('lang=')) {
                // Determine if we need to replace the existing lang param
                // For simplicity in this static site, we just append if missing or rely on base construction
                // But a regex replace is safer:
                link.href = link.href.replace(/lang=[a-z]{2}/, `lang=${lang}`);
            } else {
                link.href = `${href}${separator}lang=${lang}`;
            }
        });
    };

    // Helper: Apply translations to the DOM
    const applyTranslations = (lang) => {
        if (!translations[lang]) return;
        const t = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.innerHTML = t[key];
            }
        });

        // Special dynamic cases (like buttons with arrows added via CSS or JS)
        document.querySelectorAll('.apt-link, .apt-link-arrow').forEach(el => {
            // If the element has a specific key, we might have overwritten the arrow.
            // But if we used innerHTML above, we are good.
        });
    };

    // Run
    applyTranslations(currentLang);
    updateLinks(currentLang);

    // Persist for future dynamic clicks (if any)
    window.currentSiteLang = currentLang;
});
