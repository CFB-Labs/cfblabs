async function fetchTonPrice() {
    const priceElement = document.getElementById('tonPrice');
    if (!priceElement) {
        return;
    }

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const price = data['the-open-network']?.usd;

        if (typeof price === 'number') {
            priceElement.textContent = price.toFixed(3) + ' $';
        } else {
            priceElement.textContent = '— $';
        }
    } catch (error) {
        console.error('Failed to fetch TON price:', error);
        const currentElement = document.getElementById('tonPrice');
        if (currentElement) {
            currentElement.textContent = 'Error $';
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        fetchTonPrice();
        setInterval(fetchTonPrice, 30000);
    });
} else {
    fetchTonPrice();
    setInterval(fetchTonPrice, 30000);
}