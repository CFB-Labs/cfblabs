const translations = {
    ru: {
        menu_projects: "Проекты",
        menu_markets: "Маркетплейсы",
        menu_about: "О нас",
        menu_nft: "NFT-коллекция",

        about_title: "О НАС",
        about_text: "«CFB Labs — это гаражный стартап, который формирует будущее интернета.»",

        projects_title: "ПРОЕКТЫ",
        filter_all: "Все",
        filter_telegram: "Telegram",
        filter_notgames: "Not Games",
        filter_nodes: "Ноды",

        project_tap_of: "TAP OF",
        project_lime: "LIME",
        project_open_academy: "Open Academy",
        project_zifretta: "ZIFRETTA",
        project_mr_freeman: "Mr. Freeman",
        project_pixel_world: "Pixel World",
        project_glance: "Glance",
        project_runners_club: "Runners Club",
        project_kokorono_ki: "KokoronoKi",
        project_hitoku: "Hitoku",
        project_void: "Void",
        project_stepmania: "StepMania",
        project_not_pixel: "Not Pixel",
        project_lost_dogs: "Lost Dogs",
        project_notcoin: "Notcoin",
        project_grass: "Grass",

        markets_title: "МАРКЕТПЛЕЙСЫ",

        market_getgems: "GETGEMS",
        market_fragment: "FRAGMENT",
        market_portals: "PORTALS",
        market_mrkt: "MRKT",
        market_tonnel: "TONNEL",
        market_goodies: "GOODIES",
        market_pixel_market: "PIXEL MARKET",
        market_harbor_market: "HARBOR MARKET",
        market_easy_market: "EASY MARKET",

        copyright: "© 2025–2026 CFB Labs. Все права защищены."
    },
    en: {
        menu_projects: "Projects",
        menu_markets: "Marketplaces",
        menu_about: "About us",
        menu_nft: "NFT collection",

        about_title: "ABOUT US",
        about_text: "«CFB Labs is a garage-based startup that is shaping the future of the internet.»",

        projects_title: "PROJECTS",
        filter_all: "All",
        filter_telegram: "Telegram",
        filter_notgames: "Not Games",
        filter_nodes: "Nodes",

        project_tap_of: "TAP OF",
        project_lime: "LIME",
        project_open_academy: "Open Academy",
        project_zifretta: "ZIFRETTA",
        project_mr_freeman: "Mr. Freeman",
        project_pixel_world: "Pixel World",
        project_glance: "Glance",
        project_runners_club: "Runners Club",
        project_kokorono_ki: "KokoronoKi",
        project_hitoku: "Hitoku",
        project_void: "Void",
        project_stepmania: "StepMania",
        project_not_pixel: "Not Pixel",
        project_lost_dogs: "Lost Dogs",
        project_notcoin: "Notcoin",
        project_grass: "Grass",

        markets_title: "MARKETPLACES",

        market_getgems: "GETGEMS",
        market_fragment: "FRAGMENT",
        market_portals: "PORTALS",
        market_mrkt: "MRKT",
        market_tonnel: "TONNEL",
        market_goodies: "GOODIES",
        market_pixel_market: "PIXEL MARKET",
        market_harbor_market: "HARBOR MARKET",
        market_easy_market: "EASY MARKET",

        copyright: "© 2025–2026 CFB Labs. All Rights Reserved."
    }
};

let currentLang = 'ru';

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('cfb_lang');

    if (savedLang && ['ru', 'en'].includes(savedLang)) {
        currentLang = savedLang;
    } else {
        currentLang = detectBrowserLanguage();
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
    if (elements.length === 0) {
        console.warn('No translatable elements found on page.');
    }

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const dict = translations[currentLang];
        let text = dict?.[key];

        if (text == null) {
            text = translations.en?.[key] || key || el.textContent;
            console.warn(`Missing translation for key: "${key}" in language: ${currentLang}`);
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
        metaDesc.setAttribute(
            'content',
            currentLang === 'ru'
                ? 'CFB Labs — крипто-стартап из гаража. Мы создаём будущее интернета: Web3 проект.'
                : 'CFB Labs — garage crypto startup. We are creating the future of the internet: Web3 project.'
        );
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