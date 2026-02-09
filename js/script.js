// === Получение цены TON в реальном времени ===
async function fetchTonPrice() {
    const priceElement = document.getElementById('tonPrice');
    if (!priceElement) return;

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        const price = data['the-open-network']?.usd;

        if (price !== undefined) {
            // Формат: "5.842 $"
            priceElement.textContent = price.toFixed(3) + ' $';
        } else {
            priceElement.textContent = '— $';
        }
    } catch (error) {
        console.error('Failed to fetch TON price:', error);
        priceElement.textContent = 'Error $';
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    fetchTonPrice();
    setInterval(fetchTonPrice, 30000); // обновление каждые 30 секунд
});