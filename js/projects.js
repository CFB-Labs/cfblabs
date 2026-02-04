document.addEventListener('DOMContentLoaded', () => {
    const filterItems = document.querySelectorAll('.filter-item');
    const projectLinks = document.querySelectorAll('.vivod > a');

    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            filterItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const filter = item.dataset.filter;

            projectLinks.forEach(link => {
                const categories = link.dataset.category.split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    link.style.display = ''; 
                } else {
                    link.style.display = 'none';
                }
            });
        });
    });
});