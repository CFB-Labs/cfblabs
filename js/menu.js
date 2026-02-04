document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const dropdown = document.getElementById('dropdownMenu');

    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});