async function fetchTonPrice() {
    const priceElement = document.getElementById('tonPrice');
    if (!priceElement) return;

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        const price = data['the-open-network']?.usd;

        if (price !== undefined) {
            priceElement.textContent = price.toFixed(3) + ' $';
        } else {
            priceElement.textContent = '— $';
        }
    } catch (error) {
        console.error('Failed to fetch TON price:', error);
        priceElement.textContent = 'Error $';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTonPrice();
    setInterval(fetchTonPrice, 30000);
});