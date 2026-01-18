(function () {
    'use strict';

    let currentSlideIndex = 1; // Start with middle card
    let totalSlides = 0;
    let isAnimating = false;
    let slideOrder = [0, 1, 2]; // Keep track of current order

    let upArrow, downArrow;
    let solutionTitle, solutionIcons, benefitsTitle, benefitsVisualization;
    let slides = [];
    let sliderTrack;

    function initProblemsSlider() {
        console.log('🎬 Initializing Problems Slider...');

        upArrow = document.querySelector('.slider-nav-arrow.arrow-up');
        downArrow = document.querySelector('.slider-nav-arrow.arrow-down');
        sliderTrack = document.querySelector('.problems-slider-track');

        solutionTitle = document.querySelector('.solution-circle-content .circle-title');
        solutionIcons = document.querySelector('.solution-icons');
        benefitsTitle = document.querySelector('.benefits-circle-content .circle-title');
        benefitsVisualization = document.querySelector('.benefits-visualization');

        slides = Array.from(document.querySelectorAll('.problem-slide'));
        totalSlides = slides.length;

        console.log(`📊 Found ${totalSlides} slides`);

        if (!window.problemsSolutionsData) {
            console.error('❌ problemsSolutionsData not found!');
            return;
        }

        if (upArrow) upArrow.addEventListener('click', () => navigateSlide('up'));
        if (downArrow) downArrow.addEventListener('click', () => navigateSlide('down'));

        updateSolutionCircles(currentSlideIndex);
        console.log('✅ Slider initialized!');
    }

    function navigateSlide(direction) {
        if (isAnimating || !sliderTrack) return;

        console.log(`🔄 ${direction}: Rotating slides`);

        isAnimating = true;

        if (direction === 'up') {
            // UP arrow: Move last card (bottom) to first position
            const lastCard = slideOrder.pop();
            slideOrder.unshift(lastCard);
        } else {
            // DOWN arrow: Move first card (top) to last position
            const firstCard = slideOrder.shift();
            slideOrder.push(firstCard);
        }

        // Reorder DOM elements
        slideOrder.forEach((slideIndex) => {
            sliderTrack.appendChild(slides[slideIndex]);
        });

        // Remove active from ALL cards (DON'T remove connectors)
        slides.forEach(slide => {
            const card = slide.querySelector('.problem-card');
            if (card) {
                card.classList.remove('active');
            }
        });

        // Get the middle visual position (2nd child in DOM)
        const middleSlide = sliderTrack.children[1];
        const middleCard = middleSlide ? middleSlide.querySelector('.problem-card') : null;

        if (middleCard) {
            // Add active class to middle position
            middleCard.classList.add('active');

            // Get the data-slide index for updating circles
            const dataSlideIndex = parseInt(middleSlide.getAttribute('data-slide'));
            currentSlideIndex = dataSlideIndex;

            setTimeout(() => {
                updateSolutionCircles(dataSlideIndex);
            }, 150);
        }

        setTimeout(() => {
            isAnimating = false;
        }, 400);
    }

    function updateSolutionCircles(index) {
        const data = window.problemsSolutionsData[index];
        if (!data) return;

        console.log(`🔄 Updating circles for slide ${index}`);

        fadeOutCircleContent();

        setTimeout(() => {
            if (solutionTitle) {
                solutionTitle.innerHTML = `${data.solution.title} <span>${data.solution.highlight}</span>`;
            }

            if (solutionIcons && data.solution.icons) {
                solutionIcons.innerHTML = '';
                data.solution.icons.forEach(iconSrc => {
                    const img = document.createElement('img');
                    img.src = iconSrc;
                    img.alt = 'Product Icon';
                    solutionIcons.appendChild(img);
                });
            }

            if (benefitsTitle) {
                benefitsTitle.textContent = data.benefits.title;
            }

            if (benefitsVisualization && data.benefits.visualization) {
                const img = benefitsVisualization.querySelector('img');
                if (img) img.src = data.benefits.visualization;
            }

            setTimeout(() => {
                fadeInCircleContent();
            }, 50);
        }, 300);
    }

    function fadeOutCircleContent() {
        const solutionCircle = document.querySelector('.solution-circle-content');
        const benefitsCircle = document.querySelector('.benefits-circle-content');

        if (solutionCircle) {
            solutionCircle.classList.add('content-fade-out');
            solutionCircle.classList.remove('content-fade-in');
        }

        if (benefitsCircle) {
            benefitsCircle.classList.add('content-fade-out');
            benefitsCircle.classList.remove('content-fade-in');
        }
    }

    function fadeInCircleContent() {
        const solutionCircle = document.querySelector('.solution-circle-content');
        const benefitsCircle = document.querySelector('.benefits-circle-content');

        if (solutionCircle) {
            solutionCircle.classList.remove('content-fade-out');
            solutionCircle.classList.add('content-fade-in');
        }

        if (benefitsCircle) {
            benefitsCircle.classList.remove('content-fade-out');
            benefitsCircle.classList.add('content-fade-in');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProblemsSlider);
    } else {
        initProblemsSlider();
    }

})();
