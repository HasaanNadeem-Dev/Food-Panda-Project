/* Partners Page JavaScript */
document.addEventListener('DOMContentLoaded', function () {
    if (window.__NAV_JS_ACTIVE) return;
    const locationBtn = document.getElementById('locationBtn');
    const locationDropdown = document.querySelector('.location-dropdown');
    const countrySearch = document.getElementById('countrySearch');
    const desktopCountryList = document.querySelectorAll('.country-list li');

    if (locationBtn && locationDropdown) {
        locationBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            locationDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!locationDropdown.contains(e.target)) {
                locationDropdown.classList.remove('active');
            }
        });

        if (countrySearch && desktopCountryList.length > 0) {
            countrySearch.addEventListener('input', function (e) {
                const searchTerm = e.target.value.toLowerCase().trim();
                desktopCountryList.forEach(function (item) {
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

        desktopCountryList.forEach(function (item) {
            const link = item.querySelector('a');
            if (link) {
                link.addEventListener('click', function (e) {
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
        mobileLocationLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            mobileLocationItem.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (mobileLocationItem.classList.contains('active') && !mobileLocationItem.contains(e.target)) {
                mobileLocationItem.classList.remove('active');
            }
        });

        mobileCountryList.forEach(function (item) {
            const link = item.querySelector('a');
            if (link) {
                link.addEventListener('click', function (e) {
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



/* FAQ Functionality */
document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            /* Close all FAQ items */
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            /* Open clicked item if it wasn't active */
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});
