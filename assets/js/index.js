/* Card Slider Functionality */
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('cardSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const container = document.querySelector('.card-slider-container');

    if (!slider || !container) return;

    // --- Clone Strategy for Infinite Loop ---
    // [Clone Set End] [Original Set] [Clone Set Start]

    let originalCards = Array.from(document.querySelectorAll('.card'));
    if (originalCards.length === 0) return;

    const gap = 24;
    const cardWidthWithGap = originalCards[0].offsetWidth + gap;
    const totalOriginals = originalCards.length;

    // We clone 2 full sets: one before and one after for simplicity (ensure enough buffer)
    // Or just 4-5 cards if many, but let's clone the whole set once for safety if not too huge.
    // If set is small (e.g. 5 cards), cloning whole set is fine.

    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-end');
        slider.appendChild(clone);
    });

    // To prepend, we must insert before first child
    originalCards.slice().reverse().forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-start');
        slider.insertBefore(clone, slider.firstChild);
    });

    // Now cards structure: [Clones Start (N)] [Originals (N)] [Clones End (N)]
    // Current Index 0 should point to the FIRST ORIGINAL card.
    // Index offset = N

    let currentIndex = totalOriginals; // Point to start of originals
    const totalItems = slider.children.length; // 3N

    let isTransitioning = false;
    let autoPlayInterval;
    let isPaused = false;

    // --- Drag Variables ---
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    // --- Positioning ---

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateSliderPosition(animate = true) {
        // -1 * index * width
        // But wait, we need to center? The original CSS centered `.card-slider` maybe?
        // Assuming slider flows left.

        currentTranslate = -(currentIndex * cardWidthWithGap);
        prevTranslate = currentTranslate;

        if (animate) {
            slider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            slider.style.transition = 'none';
        }

        setSliderPosition();
    }

    // --- Auto Play ---
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

    // --- Movement Logic ---

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

    // --- Loop Check (Transition End) ---
    slider.addEventListener('transitionend', () => {
        isTransitioning = false;

        // Logic:
        // [Clone Start (0..N-1)] [Originals (N..2N-1)] [Clone End (2N..3N-1)]

        // If we drift into Close End (index >= 2N)
        if (currentIndex >= (totalOriginals * 2)) {
            // Jump back to start of originals (+ whatever offset we went past)
            // Actually, if we hit 2N (first clone of end), it's same as N (first original)

            slider.style.transition = 'none';
            currentIndex = currentIndex - totalOriginals;
            updateSliderPosition(false);
        }

        // If we drift into Clone Start (index < N)
        if (currentIndex < totalOriginals) {
            // Jump forward to end of originals
            slider.style.transition = 'none';
            currentIndex = currentIndex + totalOriginals;
            updateSliderPosition(false);
        }
    });

    // --- Drag Implementation ---

    function touchStart(event) {
        if (isTransitioning) return;

        isDragging = true;
        isPaused = true;
        stopAutoPlay();
        startPos = getPositionX(event);

        // Disable transition for live drag
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

        // Snap logic
        // If moved significantly (> 50px), go next/prev
        if (movedBy < -50) {
            currentIndex++;
        } else if (movedBy > 50) {
            currentIndex--;
        }

        // If moved just a little, stay same (which snaps back effectively)

        // Re-enable transition and go to final index
        isTransitioning = true;
        updateSliderPosition(true);
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    // Listeners
    // Touch
    slider.addEventListener('touchstart', touchStart, { passive: true });
    slider.addEventListener('touchmove', touchMove, { passive: true });
    slider.addEventListener('touchend', touchEnd);

    // Mouse
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', () => {
        if (isDragging) touchEnd();
    });

    // Prevent context menu interactions interfering
    slider.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    // Prevent default drag of images
    slider.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', e => e.preventDefault());
    });


    // --- Buttons ---
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

    // --- Hover ---
    container.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoPlay();
    });
    container.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoPlay();
    });

    // --- Init ---
    // Start at valid index (N)
    updateSliderPosition(false);
    startAutoPlay();
});

/* Location Dropdown Functionality */
/* Location Dropdown Functionality moved to nav-footer.js */

/* Mobile Menu Functionality */
/* Mobile Menu Functionality moved to nav-footer.js */

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