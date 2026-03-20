document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const dropdown = document.getElementById('dropdownMenu');
    const lines = document.querySelectorAll('.menu-burger-line');

    if (burger && dropdown) {
        burger.addEventListener('click', () => {
            const isActive = dropdown.classList.toggle('active');
            burger.classList.toggle('active');
            dropdown.setAttribute('aria-hidden', !isActive);

            if (isActive) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });

        dropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                dropdown.classList.remove('active');
                burger.classList.remove('active');
                dropdown.setAttribute('aria-hidden', 'true');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            });
        });

        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                burger.classList.remove('active');
                dropdown.setAttribute('aria-hidden', 'true');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }
});