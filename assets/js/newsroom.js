/* Newsroom Page JavaScript */
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
    /* Mobile Location Functionality */
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

