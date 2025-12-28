document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-tag');
    const newsCards = document.querySelectorAll('.news-card');
    const noResultsMsg = document.getElementById('noResults');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                let visibleCount = 0;

                newsCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (visibleCount === 0) {
                    if (noResultsMsg) noResultsMsg.style.display = 'block';
                } else {
                    if (noResultsMsg) noResultsMsg.style.display = 'none';
                }
            });
        });
    }
});
