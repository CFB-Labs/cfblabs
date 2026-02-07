const translations = {
    ru: {
        menu_projects: "Проекты",
        menu_markets: "Маркетплейсы",
        menu_about: "О нас",
        menu_nft: "NFT коллекция",

        about_title: "О НАС",
        about_text: "«CFB Labs — это гаражный стартап, который формирует будущее интернета.»",

        projects_title: "ПРОЕКТЫ",
        filter_all: "Все",
        filter_telegram: "Telegram",
        filter_notgames: "Not Games",
        filter_nodes: "Ноды",

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
        menu_nft: "NFT Collection",

        about_title: "ABOUT US",
        about_text: "«CFB Labs is a garage-based startup that is shaping the future of the internet.»",

        projects_title: "PROJECTS",
        filter_all: "All",
        filter_telegram: "Telegram",
        filter_notgames: "Not Games",
        filter_nodes: "Nodes",

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

    if (savedLang) {
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
    const browserLang = navigator.language || navigator.userLanguage;

    console.log('Browser language:', browserLang);

    if (browserLang.toLowerCase().startsWith('ru')) {
        console.log('Auto-selected: Russian');
        return 'ru';
    } else {
        console.log('Auto-selected: English');
        return 'en';
    }
}

function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    if (langButtons.length === 0) {
        return;
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newLang = button.getAttribute('data-lang');

            if (newLang !== currentLang) {
                currentLang = newLang;
                localStorage.setItem('cfb_lang', currentLang);
                updateLanguageUI();
                applyTranslations();
                updateCopyrightYear();
            }
        });
    });
}

function updateLanguageUI() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    document.documentElement.setAttribute('lang', currentLang);
}

function applyTranslations() {
    // Smooth transition
    document.body.style.opacity = '0.8';
    document.body.style.transition = 'opacity 0.3s ease';

    // Apply translations with validation
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[currentLang][key];

        if (translation) {
            element.textContent = translation;
        } else {
            console.warn(`Translation not found for key: ${key} (${currentLang})`);
            // Fallback to English
            if (currentLang !== 'en' && translations.en[key]) {
                element.textContent = translations.en[key];
            }
        }
    });

    // Update meta tags
    updateMetaTags();

    // Smooth fade in
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
}

function updateMetaTags() {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        if (currentLang === 'ru') {
            metaDesc.setAttribute('content', 'CFB Labs — крипто-стартап из гаража. Мы создаём будущее интернета: Web3 проект.');
        } else {
            metaDesc.setAttribute('content', 'CFB Labs — garage crypto startup. We are creating the future of the internet: Web3 project.');
        }
    }

    document.title = 'CFB Labs';
}

function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('[data-i18n="copyright"]');

    copyrightElements.forEach(element => {
        const baseText = translations[currentLang].copyright;
        const updatedText = baseText.replace('2026', currentYear.toString());
        element.textContent = updatedText;
    });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'r') {
            switchLanguage('ru');
        } else if (e.ctrlKey && e.key === 'e') {
            switchLanguage('en');
        }
    });
}

function switchLanguage(lang) {
    if (lang !== currentLang) {
        currentLang = lang;
        localStorage.setItem('cfb_lang', currentLang);
        updateLanguageUI();
        applyTranslations();
        updateCopyrightYear();
    }
}