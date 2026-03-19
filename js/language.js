const translations = {
    ru: {
        menu_projects: "Проекты",
        menu_markets: "Маркетплейсы",
        menu_telegram_updates: "Обновления Telegram",
        menu_nft: "NFT-коллекция",
        menu_about: "О нас",
        copyright: "© 2025–2026 CFB Labs. Все права защищены."
    },
    en: {
        menu_projects: "Projects",
        menu_markets: "Marketplaces",
        menu_telegram_updates: "Telegram Updates",
        menu_nft: "NFT collection",
        menu_about: "About us",
        copyright: "© 2025–2026 CFB Labs. All Rights Reserved."
    }
};

let currentLang = 'ru';

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('cfb_lang');
    if (savedLang && ['ru', 'en'].includes(savedLang)) {
        currentLang = savedLang;
    } else {
        currentLang = (navigator.language || navigator.userLanguage).toLowerCase().startsWith('ru') ? 'ru' : 'en';
        localStorage.setItem('cfb_lang', currentLang);
    }
    updateLanguageUI();
    applyTranslations();
    setupLanguageSwitcher();
    setupKeyboardShortcuts();
    updateCopyrightYear();
});

function detectBrowserLanguage() {
    const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
    return browserLang.startsWith('ru') ? 'ru' : 'en';
}

function setupLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            const newLang = button.getAttribute('data-lang');
            if (newLang && newLang !== currentLang) {
                switchLanguage(newLang);
            }
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('cfb_lang', currentLang);
    updateLanguageUI();
    applyTranslations();
    updateCopyrightYear();
}

function updateLanguageUI() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
    document.documentElement.setAttribute('lang', currentLang);
}

function applyTranslations() {
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.2s ease';
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const dict = translations[currentLang];
        let text = dict?.[key];
        if (text == null) {
            text = translations.en?.[key] || key || el.textContent;
        }
        el.textContent = text;
    });
    updateMetaTags();
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 30);
}

function updateMetaTags() {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', currentLang === 'ru'
            ? 'CFB Labs — крипто-стартап из гаража. Мы создаём будущее интернета: Web3 проект.'
            : 'CFB Labs — garage crypto startup. We are creating the future of the internet: Web3 project.');
    }
    document.title = 'CFB Labs';
}

function updateCopyrightYear() {
    const now = new Date().getFullYear();
    const copyrightEl = document.querySelector('[data-i18n="copyright"]');
    if (!copyrightEl) return;
    let baseText = translations[currentLang]?.copyright;
    if (!baseText) baseText = translations.en.copyright || '© 2025–2026 CFB Labs. All Rights Reserved.';
    const updatedText = baseText.replace(/2026/g, now.toString());
    copyrightEl.textContent = updatedText;
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            switchLanguage('ru');
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            switchLanguage('en');
        }
    });
}