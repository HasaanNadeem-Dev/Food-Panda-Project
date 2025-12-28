document.addEventListener('DOMContentLoaded', () => {
    /* Growing Partners Slider Functionality */
    const gpSlides = document.querySelectorAll('.gp-slide');
    const gpDots = document.querySelectorAll('.slider-dots .dot');
    const gpPrevBtn = document.querySelector('.nav-arrow.prev');
    const gpNextBtn = document.querySelector('.nav-arrow.next');

    let gpCurrentIndex = 0;
    const gpTotalSlides = gpSlides.length;
    let gpAutoPlayInterval;

    gpSlides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
            slide.style.transform = 'translateX(0)';
        } else {
            slide.classList.remove('active');
            slide.style.transform = 'translateX(100%)';
        }
    });

    function updateGpDots(index) {
        gpDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function slideGpNext() {
        const currentSlide = gpSlides[gpCurrentIndex];
        currentSlide.style.transition = 'transform 0.5s ease-in-out';
        currentSlide.style.transform = 'translateX(-100%)';
        currentSlide.classList.remove('active');

        let nextIndex = gpCurrentIndex + 1;
        if (nextIndex >= gpTotalSlides) nextIndex = 0;

        const nextSlide = gpSlides[nextIndex];
        nextSlide.style.transition = 'none';
        nextSlide.style.transform = 'translateX(100%)';

        void nextSlide.offsetWidth;

        nextSlide.style.transition = 'transform 0.5s ease-in-out';
        nextSlide.style.transform = 'translateX(0)';
        nextSlide.classList.add('active');

        gpCurrentIndex = nextIndex;
        updateGpDots(gpCurrentIndex);
    }

    function slideGpPrev() {
        const currentSlide = gpSlides[gpCurrentIndex];
        currentSlide.style.transition = 'transform 0.5s ease-in-out';
        currentSlide.style.transform = 'translateX(100%)';
        currentSlide.classList.remove('active');

        let prevIndex = gpCurrentIndex - 1;
        if (prevIndex < 0) prevIndex = gpTotalSlides - 1;

        const prevSlide = gpSlides[prevIndex];
        prevSlide.style.transition = 'none';
        prevSlide.style.transform = 'translateX(-100%)';

        void prevSlide.offsetWidth;

        prevSlide.style.transition = 'transform 0.5s ease-in-out';
        prevSlide.style.transform = 'translateX(0)';
        prevSlide.classList.add('active');

        gpCurrentIndex = prevIndex;
        updateGpDots(gpCurrentIndex);
    }

    function startGpAutoPlay() {
        if (gpAutoPlayInterval) clearInterval(gpAutoPlayInterval);
        gpAutoPlayInterval = setInterval(() => {
            slideGpNext();
        }, 5000);
    }

    function resetGpAutoPlay() {
        clearInterval(gpAutoPlayInterval);
        startGpAutoPlay();
    }

    if (gpNextBtn) {
        gpNextBtn.addEventListener('click', () => {
            slideGpNext();
            resetGpAutoPlay();
        });
    }

    if (gpPrevBtn) {
        gpPrevBtn.addEventListener('click', () => {
            slideGpPrev();
            resetGpAutoPlay();
        });
    }

    gpDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index > gpCurrentIndex) {
                const currentSlide = gpSlides[gpCurrentIndex];
                const targetSlide = gpSlides[index];

                currentSlide.style.transition = 'transform 0.5s ease-in-out';
                currentSlide.style.transform = 'translateX(-100%)';
                currentSlide.classList.remove('active');

                targetSlide.style.transition = 'none';
                targetSlide.style.transform = 'translateX(100%)';
                void targetSlide.offsetWidth;
                targetSlide.style.transition = 'transform 0.5s ease-in-out';
                targetSlide.style.transform = 'translateX(0)';
                targetSlide.classList.add('active');

                gpCurrentIndex = index;
                updateGpDots(index);
            } else if (index < gpCurrentIndex) {
                const currentSlide = gpSlides[gpCurrentIndex];
                const targetSlide = gpSlides[index];

                currentSlide.style.transition = 'transform 0.5s ease-in-out';
                currentSlide.style.transform = 'translateX(100%)';
                currentSlide.classList.remove('active');

                targetSlide.style.transition = 'none';
                targetSlide.style.transform = 'translateX(-100%)';
                void targetSlide.offsetWidth;
                targetSlide.style.transition = 'transform 0.5s ease-in-out';
                targetSlide.style.transform = 'translateX(0)';
                targetSlide.classList.add('active');

                gpCurrentIndex = index;
                updateGpDots(index);
            }
            resetGpAutoPlay();
        });
    });

    if (gpSlides.length > 0) {
        startGpAutoPlay();
    }

    /* Feature Value Slider Functionality */
    const fvSlider = document.querySelector('.fv-slider');
    const fvSlides = document.querySelectorAll('.fv-slide');
    let fvCurrentIndex = 0;
    const fvTotalSlides = fvSlides.length;
    let fvAutoPlayInterval;

    fvSlides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
            slide.style.transform = 'translateX(0)';
        } else {
            slide.classList.remove('active');
            slide.style.transform = 'translateX(100%)';
        }
    });

    function startFvAutoPlay() {
        if (fvAutoPlayInterval) clearInterval(fvAutoPlayInterval);
        fvAutoPlayInterval = setInterval(() => {
            slideFvNext();
        }, 5000);
    }

    function resetFvAutoPlay() {
        clearInterval(fvAutoPlayInterval);
        startFvAutoPlay();
    }

    function slideFvNext() {
        const currentSlide = fvSlides[fvCurrentIndex];

        let nextIndex = fvCurrentIndex + 1;
        if (nextIndex >= fvTotalSlides) nextIndex = 0;
        const nextSlide = fvSlides[nextIndex];

        currentSlide.style.transition = 'transform 0.5s ease-in-out';
        currentSlide.style.transform = 'translateX(-100%)';
        currentSlide.classList.remove('active');

        nextSlide.style.transition = 'none';
        nextSlide.style.transform = 'translateX(100%)';
        void nextSlide.offsetWidth;

        nextSlide.style.transition = 'transform 0.5s ease-in-out';
        nextSlide.style.transform = 'translateX(0)';
        nextSlide.classList.add('active');

        fvCurrentIndex = nextIndex;
    }

    function slideFvPrev() {
        const currentSlide = fvSlides[fvCurrentIndex];

        let prevIndex = fvCurrentIndex - 1;
        if (prevIndex < 0) prevIndex = fvTotalSlides - 1;
        const prevSlide = fvSlides[prevIndex];

        currentSlide.style.transition = 'transform 0.5s ease-in-out';
        currentSlide.style.transform = 'translateX(100%)';
        currentSlide.classList.remove('active');

        prevSlide.style.transition = 'none';
        prevSlide.style.transform = 'translateX(-100%)';
        void prevSlide.offsetWidth;

        prevSlide.style.transition = 'transform 0.5s ease-in-out';
        prevSlide.style.transform = 'translateX(0)';
        prevSlide.classList.add('active');

        fvCurrentIndex = prevIndex;
    }

    if (fvSlides.length > 0) {
        startFvAutoPlay();
    }

    /* Drag / Swipe Logic for FV Slider */
    let isDragging = false;
    let startPos = 0;
    let movedBy = 0;

    if (fvSlider) {
        fvSlider.addEventListener('touchstart', touchStart);
        fvSlider.addEventListener('touchend', touchEnd);
        fvSlider.addEventListener('touchmove', touchMove);

        fvSlider.addEventListener('mousedown', touchStart);
        fvSlider.addEventListener('mouseup', touchEnd);
        fvSlider.addEventListener('mousemove', touchMove);
        fvSlider.addEventListener('mouseleave', () => {
            if (isDragging) isDragging = false;
        });
    }

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        resetFvAutoPlay();
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        movedBy = currentPosition - startPos;
    }

    function touchEnd() {
        isDragging = false;
        if (movedBy < -50) {
            slideFvNext();
        } else if (movedBy > 50) {
            slideFvPrev();
        }
        movedBy = 0;
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
});