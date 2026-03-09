// Localization Engine
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;

    let currentLang = 'en'; // Default English

    const updateContent = (lang) => {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const keyPath = el.getAttribute('data-i18n');
            const keys = keyPath.split('.');
            let text = translations[lang];
            
            for (const key of keys) {
                if (text && text[key]) {
                    text = text[key];
                } else {
                    text = null;
                    break;
                }
            }
            
            if (text) {
                if (el.tagName === 'INPUT' && el.getAttribute('placeholder') !== null) {
                    // Update placeholders for inputs
                    el.placeholder = text;
                } else {
                    el.innerHTML = text; // allow HTML tags like strong, a
                }
            }
        });
        
        // Update document layout language
        document.documentElement.lang = lang;
        // Update toggle text
        langToggle.textContent = lang === 'en' ? 'FR' : 'EN';
    };

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'fr' : 'en';
        localStorage.setItem('kabodLang', currentLang);
        updateContent(currentLang);
    });

    // Check if user has a preference set in local storage
    const savedLang = localStorage.getItem('kabodLang');
    if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
        currentLang = savedLang;
        updateContent(currentLang);
    } else {
        localStorage.setItem('kabodLang', currentLang);
    }
});
