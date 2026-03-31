const CRYPTO_CONFIG = {
    ton: {
        id: 'the-open-network',
        elementId: 'tonPrice',
        storageKey: 'cfb_ton_price_cache',
        defaultPrice: 5.42
    },
    not: {
        id: 'notcoin',
        elementId: 'notPrice',
        storageKey: 'cfb_not_price_cache',
        defaultPrice: 0.0055
    }
};

const FETCH_SETTINGS = {
    endpoints: [
        'https://api.coingecko.com/api/v3/simple/price?ids={IDS}&vs_currencies=usd',
        'https://api.coingecko.com/api/v3/coins/{ID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false'
    ],
    timeout: 8000,
    updateInterval: 45000,
    cacheDuration: 2 * 60 * 60 * 1000
};

async function fetchCryptoPrice(tokenKey, attempt = 0) {
    const config = CRYPTO_CONFIG[tokenKey];
    const coinId = config.id;

    if (attempt >= FETCH_SETTINGS.endpoints.length) {
        throw new Error(`All endpoints failed for ${coinId}`);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_SETTINGS.timeout);

    try {
        let url = FETCH_SETTINGS.endpoints[attempt];
        if (url.includes('{IDS}')) {
            url = url.replace('{IDS}', coinId);
        } else if (url.includes('{ID}')) {
            url = url.replace('{ID}', coinId);
        }

        const res = await fetch(url, {
            signal: controller.signal,
            cache: 'no-store',
            headers: { 'Accept': 'application/json' }
        });

        clearTimeout(timeout);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        if (data && data[coinId] && data[coinId].usd) {
            return data[coinId].usd;
        }

        if (data && data.market_data && data.market_data.current_price && data.market_data.current_price.usd) {
            return data.market_data.current_price.usd;
        }

        throw new Error('Invalid data structure');
    } catch (err) {
        console.warn(`[${coinId}] Endpoint ${attempt + 1} failed:`, err.message);
        return fetchCryptoPrice(tokenKey, attempt + 1);
    }
}

function formatPrice(price) {
    if (typeof price !== 'number' || isNaN(price)) return null;
    return price < 1 ? price.toFixed(4) : price.toFixed(2);
}

function getCachedPrice(storageKey) {
    try {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
            const { value, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < FETCH_SETTINGS.cacheDuration) {
                return value;
            }
        }
    } catch (e) {
        console.warn('Cache read error:', e);
    }
    return null;
}

function savePriceToCache(storageKey, price) {
    try {
        localStorage.setItem(storageKey, JSON.stringify({
            value: price,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn('Cache write error:', e);
    }
}

function updatePriceDisplay(elementId, price, isInitial = false) {
    const el = document.getElementById(elementId);
    if (!el || price === null) return;

    const formatted = formatPrice(price);
    if (formatted) {
        if (isInitial) {
            el.textContent = `${formatted} $`;
            el.style.opacity = '1';
        } else {
            el.style.transition = 'opacity 0.2s';
            el.style.opacity = '0.6';
            setTimeout(() => {
                el.textContent = `${formatted} $`;
                el.style.opacity = '1';
            }, 200);
        }
    }
}

async function updateToken(tokenKey, isInitial = false) {
    const config = CRYPTO_CONFIG[tokenKey];
    const el = document.getElementById(config.elementId);
    if (!el) return;

    const cached = getCachedPrice(config.storageKey);
    if (cached && isInitial) {
        updatePriceDisplay(config.elementId, cached, true);
    }

    try {
        const price = await fetchCryptoPrice(tokenKey);
        updatePriceDisplay(config.elementId, price, false);
        savePriceToCache(config.storageKey, price);
    } catch (err) {
        console.warn(`[${config.id}] Fetch failed:`, err.message);
        if (!cached && isInitial) {
            updatePriceDisplay(config.elementId, config.defaultPrice, true);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateToken('ton', true);
    updateToken('not', true);

    setInterval(() => {
        updateToken('ton', false);
        updateToken('not', false);
    }, FETCH_SETTINGS.updateInterval);

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateToken('ton', false);
            updateToken('not', false);
        }
    });
});