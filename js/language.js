const translations = {
    en: {
        menu_projects: 'Projects',
        menu_markets: 'Markets',
        menu_products: 'Our Products',
        menu_telegram_updates: 'Telegram Updates',
        menu_about: 'About Us',
        copyright: '© 2025–2026 CFB Labs. All rights reserved.',
        about_title: 'ABOUT US',
        about_text: '«CFB Labs is a garage-based startup that is shaping the future of the internet.»',
        markets_title: 'MARKETS',
        market_getgems: 'GETGEMS',
        market_fragment: 'FRAGMENT',
        market_portals: 'PORTALS',
        market_mrkt: 'MRKT',
        market_tonnel: 'TONNEL',
        market_goodies: 'GOODIES',
        market_pixel_market: 'PIXEL MARKET',
        market_harbor_market: 'HARBOR MARKET',
        market_easy_market: 'EASY MARKET',
        projects_title: 'PROJECTS',
        products_title: 'OUR PRODUCTS',
        product_cfb_bot: 'CFB Labs Bot',
        product_cfb_nft: 'NFT Collection',
        filter_all: 'All',
        filter_telegram: 'Telegram',
        filter_notgames: 'Not Games',
        filter_nodes: 'Nodes',
        project_tap_of: 'TAP OFF',
        project_lime: 'LIME',
        project_open_academy: 'Open Academy',
        project_zifretta: 'ZIFRETTA',
        project_mr_freeman: 'Mr. Freeman',
        project_pixel_world: 'Pixel World',
        project_glance: 'Glance',
        project_runners_club: 'Runners',
        project_kokorono_ki: 'KokoronoKi',
        project_hitoku: 'Hitoku',
        project_void: 'Void',
        project_stepmania: 'StepMania',
        project_not_pixel: 'Not Pixel',
        project_lost_dogs: 'Lost Dogs',
        project_notcoin: 'Notcoin',
        project_grass: 'Grass'
    },
    ru: {
        menu_projects: 'Проекты',
        menu_markets: 'Маркеты',
        menu_products: 'Наши продукты',
        menu_telegram_updates: 'Обновления Telegram',
        menu_about: 'О нас',
        copyright: '© 2025–2026 CFB Labs. Все права защищены.',
        about_title: 'О НАС',
        about_text: '«CFB Labs — это стартап из гаража, который формирует будущее интернета.»',
        markets_title: 'МАРКЕТЫ',
        market_getgems: 'GETGEMS',
        market_fragment: 'FRAGMENT',
        market_portals: 'PORTALS',
        market_mrkt: 'MRKT',
        market_tonnel: 'TONNEL',
        market_goodies: 'GOODIES',
        market_pixel_market: 'PIXEL MARKET',
        market_harbor_market: 'HARBOR MARKET',
        market_easy_market: 'EASY MARKET',
        projects_title: 'ПРОЕКТЫ',
        products_title: 'НАШИ ПРОДУКТЫ',
        product_cfb_bot: 'CFB Labs Bot',
        product_cfb_nft: 'NFT-коллекция',
        filter_all: 'Все',
        filter_telegram: 'Telegram',
        filter_notgames: 'Not Games',
        filter_nodes: 'Ноды',
        project_tap_of: 'TAP OFF',
        project_lime: 'LIME',
        project_open_academy: 'Open Academy',
        project_zifretta: 'ZIFRETTA',
        project_mr_freeman: 'Mr. Freeman',
        project_pixel_world: 'Pixel World',
        project_glance: 'Glance',
        project_runners_club: 'Runners',
        project_kokorono_ki: 'KokoronoKi',
        project_hitoku: 'Hitoku',
        project_void: 'Void',
        project_stepmania: 'StepMania',
        project_not_pixel: 'Not Pixel',
        project_lost_dogs: 'Lost Dogs',
        project_notcoin: 'Notcoin',
        project_grass: 'Grass'
    }
};

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const cleanKey = key ? key.trim() : '';
        if (translations[lang] && translations[lang][cleanKey]) {
            el.textContent = translations[lang][cleanKey];
        }
    });
    document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
    const langSwitcher = document.getElementById('languageSwitcher');
    const langButtons = langSwitcher?.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('cfb_lang') || 'ru';

    if (langButtons?.length) {
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = btn.dataset.lang;
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                localStorage.setItem('cfb_lang', newLang);
                applyLanguage(newLang);
            });
            if (btn.dataset.lang === savedLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    applyLanguage(savedLang);
});