/* Newsroom Page JavaScript - Filter Logic */

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-tag');
    const newsCards = document.querySelectorAll('.news-card');
    const noResultsMsg = document.getElementById('noResults');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                let visibleCount = 0;

                newsCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'flex';
                        // Add fade-in animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Show/Hide No Results Message
                if (visibleCount === 0) {
                    if (noResultsMsg) noResultsMsg.style.display = 'block';
                } else {
                    if (noResultsMsg) noResultsMsg.style.display = 'none';
                }
            });
        });
    }
});
