document.addEventListener('DOMContentLoaded', function () {
    /* Mobile Menu Logic */
    const hamburger = document.getElementById('careersHamburger');
    const mobileMenu = document.getElementById('mobileMenuContent');
    const overlay = document.getElementById('mobileMenuOverlay');
    let savedScrollY = 0;

    function lockScroll() {
        savedScrollY = window.scrollY || window.pageYOffset || 0;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflowY = 'scroll';
    }

    function unlockScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, savedScrollY);
    }

    function toggleMenu() {
        const isActive = mobileMenu.classList.contains('active');

        if (!isActive) {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            hamburger.classList.add('open');
            lockScroll();
        } else {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('open');
            unlockScroll();
        }
    }

    if (hamburger && mobileMenu && overlay) {
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    /* Stats Animation */
    const statsSection = document.querySelector('.stats-bg-section');
    const statsNumbers = document.querySelectorAll('.stat-box .num');
    let started = false;

    if (statsSection && statsNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    statsNumbers.forEach(num => startCount(num));
                }
            });
        }, { threshold: 0.1 });

        observer.observe(statsSection);
    }

    function startCount(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const start = 1;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            el.innerText = current.toLocaleString() + ' +';

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.innerText = target.toLocaleString() + ' +';
            }
        }
        requestAnimationFrame(update);
    }

    /* Language Dropdown (Desktop Only) */
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown) {
        langDropdown.addEventListener('click', function (e) {
            if (window.getComputedStyle(this).display !== 'none') {
                e.stopPropagation();
                this.classList.toggle('expanded');
            }
        });

        document.addEventListener('click', function (e) {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('expanded');
            }
        });
    }
});
