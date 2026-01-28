// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.card, .section-header, .cta-content');
    elements.forEach(el => {
        observer.observe(el);
    });
});

// Card Hover Effects with 3D Tilt
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Logo Scroll Animation
const trustedLogos = document.querySelector('.trusted-logos');
if (trustedLogos) {
    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    function autoScroll() {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= trustedLogos.scrollWidth / 2) {
            scrollAmount = 0;
        }
        trustedLogos.scrollLeft = scrollAmount;
    }

    // Uncomment to enable auto-scroll
    // setInterval(autoScroll, 50);
}

// Add loading class removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        const parallaxElements = hero.querySelectorAll('.hero-content');
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Button Click Ripple Effect
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Dropdown Menu Tab Switching
document.addEventListener('DOMContentLoaded', () => {
    const dropdownTabs = document.querySelectorAll('.dropdown-tab');

    dropdownTabs.forEach(tab => {
        tab.addEventListener('mouseenter', function () {
            const tabId = this.getAttribute('data-tab');
            const dropdown = this.closest('.nav-dropdown');

            // Remove active class from all tabs
            dropdown.querySelectorAll('.dropdown-tab').forEach(t => t.classList.remove('active'));

            // Add active class to hovered tab
            this.classList.add('active');

            // Hide all tab content
            dropdown.querySelectorAll('.dropdown-tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Show the corresponding content
            const targetContent = dropdown.querySelector(`#tab-${tabId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// Accordion Toggle Functionality (for FAQ section - non-exclusive)
document.addEventListener('DOMContentLoaded', () => {
    // Only select accordion items that DON'T have data-accordion attribute
    // Items with data-accordion are handled by the exclusive accordion script
    const accordionItems = document.querySelectorAll('.accordion-item:not([data-accordion])');

    accordionItems.forEach(accordionItem => {
        const header = accordionItem.querySelector('.accordion-header');

        header.addEventListener('click', function () {
            const content = accordionItem.querySelector('.accordion-content');
            const toggle = accordionItem.querySelector('.accordion-toggle');
            const icon = accordionItem.querySelector('.accordion-icon');
            const isActive = accordionItem.classList.contains('active');

            if (isActive) {
                // Close this accordion
                accordionItem.classList.remove('active');
                content.style.display = 'none';
                icon.textContent = '+';
                icon.style.color = '#0c0c0c';
                if (toggle) {
                    toggle.style.background = 'transparent';
                    toggle.style.border = '1px solid #e5e7eb';
                }
            } else {
                // Open this accordion
                accordionItem.classList.add('active');
                content.style.display = 'block';
                icon.textContent = '−';
                icon.style.color = 'white';
                if (toggle) {
                    toggle.style.background = '#0c0c0c';
                    toggle.style.border = 'none';
                }
            }
        });
    });
});

// Industry Tabs Switching
document.addEventListener('DOMContentLoaded', () => {
    const industryTabs = document.querySelectorAll('.industry-tab');
    const industryContents = document.querySelectorAll('.industry-tab-content');

    industryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Remove active from all tabs
            industryTabs.forEach(t => t.classList.remove('active'));

            // Add active to clicked tab
            this.classList.add('active');

            // Hide all content panels
            industryContents.forEach(content => content.classList.remove('active'));

            // Show the target content panel
            const targetContent = document.getElementById(`tab-${tabId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// Triangle Arrow Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    const triangleContainer = document.getElementById('triangle-accents');

    if (triangleContainer) {
        const triangles = triangleContainer.querySelectorAll('.triangle-arrow');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    triangles.forEach(triangle => {
                        triangle.classList.add('animate');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(triangleContainer);
    }
});

// Testimonial Triangle Arrow Scroll Animation (for case-studies.html)
document.addEventListener('DOMContentLoaded', () => {
    const testimonialTriangleContainer = document.getElementById('testimonial-triangle-accents');

    if (testimonialTriangleContainer) {
        const triangles = testimonialTriangleContainer.querySelectorAll('.triangle-arrow');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animate class when section comes into view
                    triangles.forEach(triangle => {
                        triangle.classList.add('animate');
                    });
                } else {
                    // Remove animate class when section leaves view
                    triangles.forEach(triangle => {
                        triangle.classList.remove('animate');
                    });
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(testimonialTriangleContainer);
    }
});

// ===== Case Study Slider =====
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('case-study-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slider-slide');
    const prevBtn = slider.querySelector('#slider-prev');
    const nextBtn = slider.querySelector('#slider-next');
    const progressBar = slider.querySelector('#slider-progress-bar');

    let currentSlide = 0;
    const totalSlides = slides.length;
    const autoAdvanceInterval = 5000; // 5 seconds
    let autoAdvanceTimer;

    // Update progress bar
    function updateProgressBar() {
        const progressWidth = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = progressWidth + '%';
    }

    // Go to specific slide
    function goToSlide(index, direction = 'next') {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        const currentSlideEl = slides[currentSlide];
        const nextSlideEl = slides[index];

        // Remove all transition classes
        slides.forEach(slide => {
            slide.classList.remove('active', 'slide-out-left', 'slide-in-right');
        });

        // Apply transition based on direction
        if (direction === 'next') {
            currentSlideEl.style.transform = 'translateX(-100%)';
            nextSlideEl.style.transform = 'translateX(100%)';
        } else {
            currentSlideEl.style.transform = 'translateX(100%)';
            nextSlideEl.style.transform = 'translateX(-100%)';
        }

        // Force reflow
        nextSlideEl.offsetHeight;

        // Apply active state
        nextSlideEl.classList.add('active');
        nextSlideEl.style.transform = 'translateX(0)';

        currentSlide = index;
        updateProgressBar();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1, 'next');
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1, 'prev');
    }

    // Reset auto-advance timer
    function resetAutoAdvance() {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = setInterval(nextSlide, autoAdvanceInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoAdvance();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoAdvance();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoAdvance();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoAdvance();
        }
    });

    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoAdvanceTimer);
    });

    slider.addEventListener('mouseleave', () => {
        resetAutoAdvance();
    });

    // Initialize
    updateProgressBar();
    autoAdvanceTimer = setInterval(nextSlide, autoAdvanceInterval);
});

console.log('ANEGIS 2026 Website - Scripts Loaded');
