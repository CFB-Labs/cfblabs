const TelegramAuth = {
    clientId: '8336482196', 
    
    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found');
            return;
        }

        if (this.clientId === 'YOUR_BOT_ID' || !this.clientId) {
            console.error('Error: clientId not configured');
            container.innerHTML = '<span style="color:red;font-size:10px;">Err: No ID</span>';
            return;
        }

        container.innerHTML = '';
        container.innerHTML = '<span class="tg-loading" style="font-size:10px;color:#888;">⏳</span>';

        const script = document.createElement('script');
        script.async = true;
        script.src = "https://oauth.telegram.org/js/telegram-login.js";
        script.setAttribute('data-client-id', this.clientId);
        script.setAttribute('data-onauth', 'TelegramAuth.onAuthSuccess');
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-lang', 'ru');
        script.setAttribute('data-radius', '20');
        script.setAttribute('data-size', 'medium');
        
        script.onerror = () => {
            container.innerHTML = '<span style="color:#ff6b6b;font-size:10px;">❌ Load err</span>';
            console.error('Failed to load Telegram widget script');
        };
        
        container.appendChild(script);
        
        setTimeout(() => {
            if (container.querySelector('.tg-loading')) {
                console.warn('Telegram widget may not have rendered');
                container.innerHTML = '';
                container.appendChild(script.cloneNode(true));
            }
        }, 2000);
    },

    async onAuthSuccess(user) {
        console.log('Telegram auth:', user);
        
        try {
            const response = await fetch('/api/auth/telegram/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    id_token: user.id_token,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    photo_url: user.photo_url
                })
            });

            const result = await response.json();
            
            if (result.success) {
                localStorage.setItem('cfb_user', JSON.stringify({
                    id: user.id,
                    name: user.first_name,
                    username: user.username,
                    avatar: user.photo_url
                }));
                
                TelegramAuth.updateUI(user);
                
                if (typeof ym !== 'undefined') {
                    ym(106820933, 'reachGoal', 'telegram_login_success');
                }
            }
        } catch (error) {
            console.error('Auth verification failed:', error);
        }
    },

    updateUI(user) {
        const container = document.getElementById('telegram-login-container');
        if (container) {
            container.innerHTML = `<span class="user-greeting">👋 ${user.first_name}${user.username ? ' @' + user.username : ''}</span>`;
        }
    },

    logout() {
        localStorage.removeItem('cfb_user');
        this.init('telegram-login-container');
    }
};

async function fetchTonPrice() {
    const el = document.getElementById('tonPrice');
    if (!el) return;

    const prev = el.textContent;
    el.classList.add('loading');

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd',
            { signal: controller.signal, cache: 'no-store' }
        );
        clearTimeout(timeout);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const price = data?.['the-open-network']?.usd;

        if (typeof price === 'number' && !isNaN(price)) {
            const fmt = price < 1 ? price.toFixed(4) : price.toFixed(2);
            el.textContent = `${fmt} $`;
            el.classList.remove('error');
        } else {
            throw new Error('Invalid data');
        }
    } catch (err) {
        console.warn('TON price error:', err.message);
        if (!prev || prev === 'Загрузка...') {
            el.textContent = '— $';
            el.classList.add('error');
        }
    } finally {
        el.classList.remove('loading');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        TelegramAuth.init('telegram-login-container');
    }, 100);
    
    const saved = localStorage.getItem('cfb_user');
    if (saved) {
        TelegramAuth.updateUI(JSON.parse(saved));
    }

    fetchTonPrice();
    setInterval(fetchTonPrice, 30000);
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        TelegramAuth.init('telegram-login-container');
    }, 100);
}