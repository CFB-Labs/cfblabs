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
    fetchTonPrice();
    setInterval(fetchTonPrice, 30000);
});