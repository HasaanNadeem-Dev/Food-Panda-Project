/* Card Slider Functionality */
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('cardSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const container = document.querySelector('.card-slider-container');

    if (!slider || !container) return;

    let originalCards = Array.from(document.querySelectorAll('.card'));
    if (originalCards.length === 0) return;

    const gap = 24;
    const cardWidthWithGap = originalCards[0].offsetWidth + gap;
    const totalOriginals = originalCards.length;

    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-end');
        slider.appendChild(clone);
    });

    originalCards.slice().reverse().forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-start');
        slider.insertBefore(clone, slider.firstChild);
    });

    let currentIndex = totalOriginals;
    let isTransitioning = false;
    let autoPlayInterval;
    let isPaused = false;

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateSliderPosition(animate = true) {
        currentTranslate = -(currentIndex * cardWidthWithGap);
        prevTranslate = currentTranslate;

        if (animate) {
            slider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            slider.style.transition = 'none';
        }

        setSliderPosition();
    }

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            if (!isPaused && !isDragging) {
                moveToNext();
            }
        }, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    function moveToNext() {
        if (isTransitioning) return;
        currentIndex++;
        isTransitioning = true;
        updateSliderPosition(true);
    }

    function moveToPrev() {
        if (isTransitioning) return;
        currentIndex--;
        isTransitioning = true;
        updateSliderPosition(true);
    }

    slider.addEventListener('transitionend', () => {
        isTransitioning = false;

        if (currentIndex >= (totalOriginals * 2)) {
            slider.style.transition = 'none';
            currentIndex = currentIndex - totalOriginals;
            updateSliderPosition(false);
        }

        if (currentIndex < totalOriginals) {
            slider.style.transition = 'none';
            currentIndex = currentIndex + totalOriginals;
            updateSliderPosition(false);
        }
    });

    function touchStart(event) {
        if (isTransitioning) return;

        isDragging = true;
        isPaused = true;
        stopAutoPlay();
        startPos = getPositionX(event);

        slider.style.transition = 'none';

        animationID = requestAnimationFrame(animation);
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const currentDiff = currentPosition - startPos;
            currentTranslate = prevTranslate + currentDiff;
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        isPaused = false;
        startAutoPlay();

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50) {
            currentIndex++;
        } else if (movedBy > 50) {
            currentIndex--;
        }

        isTransitioning = true;
        updateSliderPosition(true);
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    slider.addEventListener('touchstart', touchStart, { passive: true });
    slider.addEventListener('touchmove', touchMove, { passive: true });
    slider.addEventListener('touchend', touchEnd);

    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', () => {
        if (isDragging) touchEnd();
    });

    slider.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    slider.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', e => e.preventDefault());
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            moveToNext();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            moveToPrev();
            startAutoPlay();
        });
    }

    container.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoPlay();
    });
    container.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoPlay();
    });

    updateSliderPosition(false);
    startAutoPlay();
});

/* Filters Popup Functionality */
document.addEventListener('DOMContentLoaded', function () {
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

    filterBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (popup.classList.contains('active')) {
            closePopup();
        } else {
            openPopup();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            closePopup();
        });
    }

    overlay.addEventListener('click', closePopup);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
});