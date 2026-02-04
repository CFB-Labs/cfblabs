const translations = {
    ru: {
        menu_projects: "Проекты",
        menu_markets: "Маркеты",  
        menu_about: "О нас",
        

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
        
  
        markets_title: "МАРКЕТЫ",
        

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
        menu_markets: "Markets",
        menu_about: "About us",
        
    
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
        

        markets_title: "MARKETS",
        

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
});

function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    
    console.log('Язык браузера:', browserLang);
    
    if (browserLang.toLowerCase().startsWith('ru')) {
        console.log('Автоматически выбран: Русский');
        return 'ru';
    } else {
        console.log('Автоматически выбран: English');
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
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        if (currentLang === 'ru') {
            metaDesc.setAttribute('content', 'CFB Labs — крипто-стартап из гаража. Мы создаём будущее интернета: Web3 проект.');
        } else {
            metaDesc.setAttribute('content', 'CFB Labs — garage crypto startup. We are creating the future of the internet: Web3 project.');
        }
    }
    
    document.title = currentLang === 'ru' ? 'CFB Labs' : 'CFB Labs';
}