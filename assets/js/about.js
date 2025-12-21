/* Text Slider Functionality */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(currentSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            showSlide(currentSlide);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    var mobileMenu = document.getElementById('mobileMenuContent');
    var mobileLocationItem = mobileMenu ? mobileMenu.querySelector('.mobile-location-item') : null;
    var mobileLocationLink = document.getElementById('mobileLocationLink');
    if (mobileLocationItem && mobileLocationLink) {
        mobileLocationLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileLocationItem.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (mobileLocationItem.classList.contains('active') && !mobileLocationItem.contains(e.target)) {
                mobileLocationItem.classList.remove('active');
            }
        });
        var countryLinks = mobileLocationItem.querySelectorAll('.mobile-country-list a');
        countryLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var name = this.getAttribute('data-country') || this.textContent;
                var txt = mobileLocationLink.querySelector('.location-text');
                if (txt) txt.textContent = name;
                mobileLocationItem.classList.remove('active');
            });
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
        hamburger.classList.toggle('active');
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

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}