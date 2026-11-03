document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.black-folder');

    cards.forEach(card => {
        const glare = document.createElement('div');
        glare.classList.add('glare');
        card.appendChild(glare);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)`;

            const shadowX = ((x - centerX) / centerX) * -20;
            const shadowY = ((y - centerY) / centerY) * -20;
            card.style.boxShadow = `
                ${shadowX}px ${shadowY}px 30px rgba(255, 255, 255, 0.15),
                ${shadowX * 0.5}px ${shadowY * 0.5}px 15px rgba(0, 0, 0, 0.4),
                ${shadowX * 1.5}px ${shadowY * 1.5}px 40px rgba(0, 0, 0, 0.3)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = `
                0 3px 6px rgba(0, 0, 0, 0.25),
                0 6px 12px rgba(0, 0, 0, 0.2)
            `;
            glare.style.opacity = '0';
        });

        card.addEventListener('mouseenter', () => {
            glare.style.opacity = '1';
        });
    });
});