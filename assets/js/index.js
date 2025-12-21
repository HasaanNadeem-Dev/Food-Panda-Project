/* Card Slider Functionality */
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('cardSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const container = document.querySelector('.card-slider-container');
    
    if (!slider || !prevBtn || !nextBtn || !container) return;
    
    let cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;
    
    const originalCards = Array.from(cards);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
    });

    cards = document.querySelectorAll('.card');
    const totalCards = cards.length;
    const visibleCards = originalCards.length;
    
    let currentIndex = 0;
    const gap = 24;
    let autoPlayInterval;
    let isPaused = false;
    let isTransitioning = false;
    
    function getCardWidth() {
        return cards[0].offsetWidth + gap;
    }
    
    function updateSliderPosition(animate = true) {
        if (isTransitioning) return;
        
        const cardWidth = getCardWidth();
        const translateX = -100 - (currentIndex * cardWidth);
        
        if (!animate) {
            slider.style.transition = 'none';
        } else {
            slider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        slider.style.transform = `translateX(${translateX}px)`;
    }
    
    function handleInfiniteLoop() {
        if (currentIndex >= visibleCards) {
            isTransitioning = true;
            setTimeout(() => {
                slider.style.transition = 'none';
                currentIndex = 0;
                slider.style.transform = `translateX(-100px)`;
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            }, 500);
        } else if (currentIndex < 0) {
            isTransitioning = true;
            setTimeout(() => {
                slider.style.transition = 'none';
                currentIndex = visibleCards - 1;
                const cardWidth = getCardWidth();
                slider.style.transform = `translateX(-100px - ${currentIndex * cardWidth}px)`;
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            }, 500);
        }
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        currentIndex++;
        updateSliderPosition();
        handleInfiniteLoop();
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        currentIndex--;
        updateSliderPosition();
        handleInfiniteLoop();
    }
    
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            if (!isPaused && !isTransitioning) {
                nextSlide();
            }
        }, 3000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    nextBtn.addEventListener('click', function() {
        if (isTransitioning) return;
        nextSlide();
        stopAutoPlay();
        setTimeout(() => {
            if (!isPaused) startAutoPlay();
        }, 5000);
    });
    
    prevBtn.addEventListener('click', function() {
        if (isTransitioning) return;
        prevSlide();
        stopAutoPlay();
        setTimeout(() => {
            if (!isPaused) startAutoPlay();
        }, 5000);
    });
    
    const sliderWrapper = document.querySelector('.card-slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', function() {
            isPaused = true;
            stopAutoPlay();
        });
        
        sliderWrapper.addEventListener('mouseleave', function() {
            isPaused = false;
            startAutoPlay();
        });
    }
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        isDragging = true;
        stopAutoPlay();
    }, { passive: true });
    
    slider.addEventListener('touchmove', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    }, { passive: false });
    
    slider.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        isDragging = false;
        setTimeout(() => {
            if (!isPaused) startAutoPlay();
        }, 3000);
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    if (container) {
        container.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                stopAutoPlay();
                const delta = e.deltaY > 0 ? 1 : -1;
                if (delta > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                setTimeout(() => {
                    if (!isPaused) startAutoPlay();
                }, 3000);
            }
        }, { passive: false });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            setTimeout(() => {
                if (!isPaused) startAutoPlay();
            }, 5000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            setTimeout(() => {
                if (!isPaused) startAutoPlay();
            }, 5000);
        }
    });
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        stopAutoPlay();
        resizeTimer = setTimeout(function() {
            updateSliderPosition(false);
            if (!isPaused) startAutoPlay();
        }, 250);
    });
    
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    
    updateSliderPosition(false);
    
    startAutoPlay();
});

/* Location Dropdown Functionality */
document.addEventListener('DOMContentLoaded', function() {
    if (window.__NAV_JS_ACTIVE) return;
    const locationBtn = document.getElementById('locationBtn');
    const locationDropdown = document.querySelector('.location-dropdown');
    const countrySearch = document.getElementById('countrySearch');
    const desktopCountryList = document.querySelectorAll('.country-list li');
    if (locationBtn && locationDropdown) {
        locationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            locationDropdown.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (!locationDropdown.contains(e.target)) {
                locationDropdown.classList.remove('active');
            }
        });
        if (countrySearch && desktopCountryList.length > 0) {
            countrySearch.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase().trim();
                desktopCountryList.forEach(function(item) {
                    const link = item.querySelector('a');
                    if (link) {
                        const countryName = link.textContent.toLowerCase();
                        if (countryName.includes(searchTerm)) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    }
                });
            });
        }
        desktopCountryList.forEach(function(item) {
            const link = item.querySelector('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const countryName = this.getAttribute('data-country');
                    const btnText = locationBtn.querySelector('.button-text');
                    if (btnText) btnText.textContent = countryName;
                    locationDropdown.classList.remove('active');
                    if (countrySearch) {
                        countrySearch.value = '';
                        desktopCountryList.forEach(li => li.classList.remove('hidden'));
                    }
                });
            }
        });
    }
    const mobileLocationLink = document.getElementById('mobileLocationLink');
    const mobileLocationItem = document.querySelector('.mobile-location-item');
    const mobileCountryList = document.querySelectorAll('.mobile-country-list li');
    if (mobileLocationLink && mobileLocationItem) {
        mobileLocationLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            mobileLocationItem.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (mobileLocationItem.classList.contains('active') && !mobileLocationItem.contains(e.target)) {
                mobileLocationItem.classList.remove('active');
            }
        });
        mobileCountryList.forEach(function(item) {
            const link = item.querySelector('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const countryName = this.getAttribute('data-country');
                    const linkText = mobileLocationLink.querySelector('.location-text');
                    if (linkText) linkText.textContent = countryName;
                    mobileLocationItem.classList.remove('active');
                });
            }
        });
    }
});

/* Mobile Menu Functionality */
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenuContent');
    const overlay = document.getElementById('mobileMenuOverlay');
    const closeBtn = document.getElementById('mobileMenuClose');
    
    if (!hamburger || !mobileMenu || !overlay) return;

    let savedScrollY = 0;

    function lockScroll() {
        savedScrollY = window.scrollY || window.pageYOffset || 0;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.width = '100%';
    }

    function unlockScroll() {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, savedScrollY || 0);
    }

    function toggleMenu() {
        hamburger.classList.toggle('clicked');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            lockScroll();
        } else {
            unlockScroll();
            const mli = mobileMenu.querySelector('.mobile-location-item');
            if (mli) mli.classList.remove('active');
        }
    }

    hamburger.addEventListener('click', toggleMenu);
    
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }
    
    overlay.addEventListener('click', toggleMenu);
    // Close on link click
    const menuLinks = mobileMenu.querySelectorAll('a:not(#mobileLocationLink)');
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});

/* Filters Popup Functionality */
document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.getElementById('filterBtn');
    const popup = document.getElementById('filtersPopupContent');
    const overlay = document.getElementById('filtersPopupOverlay');
    const closeBtn = document.getElementById('filtersPopupClose');
    let savedScrollY = 0;

    if (!filterBtn || !popup || !overlay) return;

    function lockScroll() {
        savedScrollY = window.scrollY || window.pageYOffset || 0;
        document.documentElement.classList.add('no-scroll');
        document.body.classList.add('no-scroll');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.width = '100%';
    }

    function unlockScroll() {
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, savedScrollY || 0);
    }

    function openPopup() {
        overlay.classList.add('active');
        popup.classList.add('active');
        lockScroll();
    }

    function closePopup() {
        overlay.classList.remove('active');
        popup.classList.remove('active');
        unlockScroll();
    }

    filterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (popup.classList.contains('active')) {
            closePopup();
        } else {
            openPopup();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closePopup();
        });
    }

    overlay.addEventListener('click', closePopup);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
});