const TON_PRICE_CONFIG = {
    endpoints: [
        'https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd',
        'https://api.coingecko.com/api/v3/coins/the-open-network?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false'
    ],
    timeout: 8000,
    retries: 3,
    retryDelay: 1500,
    updateInterval: 45000,
    storageKey: 'cfb_ton_price_cache'
};

async function fetchTonPriceWithFallback(attempt = 0) {
    if (attempt >= TON_PRICE_CONFIG.endpoints.length) {
        throw new Error('All endpoints failed');
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TON_PRICE_CONFIG.timeout);
    try {
        const url = TON_PRICE_CONFIG.endpoints[attempt];
        const res = await fetch(url, {
            signal: controller.signal,
            cache: 'no-store',
            headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data?.['the-open-network']?.usd) {
            return data['the-open-network'].usd;
        }
        if (data?.market_data?.current_price?.usd) {
            return data.market_data.current_price.usd;
        }
        throw new Error('Invalid data structure');
    } catch (err) {
        console.warn(`Endpoint ${attempt + 1} failed:`, err.message);
        return fetchTonPriceWithFallback(attempt + 1);
    }
}

function formatPrice(price) {
    if (typeof price !== 'number' || isNaN(price)) return null;
    return price < 1 ? price.toFixed(4) : price.toFixed(2);
}

function getCachedPrice() {
    try {
        const cached = localStorage.getItem(TON_PRICE_CONFIG.storageKey);
        if (cached) {
            const { value, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < 2 * 60 * 60 * 1000) {
                return value;
            }
        }
    } catch (e) {
        console.warn('Cache read error:', e);
    }
    return null;
}

function savePriceToCache(price) {
    try {
        localStorage.setItem(TON_PRICE_CONFIG.storageKey, JSON.stringify({
            value: price,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn('Cache write error:', e);
    }
}

function updatePriceDisplay(price, isInitial = false) {
    const el = document.getElementById('tonPrice');
    if (!el || price === null) return;
    const formatted = formatPrice(price);
    if (formatted) {
        if (isInitial) {
            el.textContent = `${formatted} $`;
        } else {
            el.style.opacity = '0.7';
            setTimeout(() => {
                el.textContent = `${formatted} $`;
                el.style.opacity = '1';
            }, 150);
        }
        savePriceToCache(price);
    }
}

async function fetchTonPrice(isInitial = false) {
    const el = document.getElementById('tonPrice');
    if (!el) return;
    const cached = getCachedPrice();
    if (cached && isInitial) {
        updatePriceDisplay(cached, true);
    }
    try {
        const price = await fetchTonPriceWithFallback();
        updatePriceDisplay(price, false);
    } catch (err) {
        console.warn('TON price fetch failed:', err.message);
        if (!cached) {
            updatePriceDisplay(5.42, true);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTonPrice(true);
    setInterval(() => fetchTonPrice(false), TON_PRICE_CONFIG.updateInterval);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            fetchTonPrice(false);
        }
    });
});