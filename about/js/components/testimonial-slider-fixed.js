// Fixed Testimonial Slider Component
class TestimonialSliderFixed {
    constructor() {
        this.slides = [];
        this.dots = [];
        this.currentIndex = 0;
        this.autoRotateInterval = null;
        this.autoRotateDelay = 5000; // 5 seconds
        
        this.init();
    }

    init() {
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            this.setupSlider();
            this.setupNavigation();
            this.startAutoRotate();
        }, 100);
    }

    setupSlider() {
        this.slides = Array.from(document.querySelectorAll('.testimonial-card'));
        
        if (this.slides.length === 0) {
            console.warn('No testimonial cards found');
            return;
        }
        
        // Set initial state
        this.showSlide(this.currentIndex);
    }

    setupNavigation() {
        // Create navigation buttons if they don't exist
        this.createNavigationButtons();
        
        // Setup dot navigation
        this.setupDots();
        
        // Add keyboard navigation
        this.setupKeyboardNavigation();
        
        // Add swipe support for mobile
        this.setupSwipeSupport();
    }

    createNavigationButtons() {
        const navContainer = document.getElementById('testimonial-nav');
        if (!navContainer) return;
        
        // Clear existing content
        navContainer.innerHTML = '';
        
        // Create navigation structure
        navContainer.innerHTML = `
            <div class="flex items-center justify-center gap-6">
                <button class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300" 
                        id="prev-testimonial" 
                        aria-label="Previous testimonial">
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                
                <div class="flex gap-2" id="testimonial-dots"></div>
                
                <button class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300" 
                        id="next-testimonial" 
                        aria-label="Next testimonial">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        `;
        
        // Add event listeners
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.pauseAutoRotate();
                this.prevSlide();
                this.resumeAutoRotate();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.pauseAutoRotate();
                this.nextSlide();
                this.resumeAutoRotate();
            });
        }
    }

    setupDots() {
        const dotsContainer = document.getElementById('testimonial-dots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        
        this.dots = [];
        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${i === this.currentIndex ? 'bg-primary w-4' : 'bg-gray-300 dark:bg-gray-600'}`;
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            dot.dataset.index = i;
            
            dot.addEventListener('click', () => {
                this.pauseAutoRotate();
                this.goToSlide(i);
                this.resumeAutoRotate();
            });
            
            dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const testimonialsSection = document.getElementById('testimonials-section');
            if (!testimonialsSection) return;
            
            // Check if testimonials section is in viewport
            const rect = testimonialsSection.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isInViewport) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.pauseAutoRotate();
                        this.prevSlide();
                        this.resumeAutoRotate();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.pauseAutoRotate();
                        this.nextSlide();
                        this.resumeAutoRotate();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.pauseAutoRotate();
                        this.goToSlide(0);
                        this.resumeAutoRotate();
                        break;
                    case 'End':
                        e.preventDefault();
                        this.pauseAutoRotate();
                        this.goToSlide(this.slides.length - 1);
                        this.resumeAutoRotate();
                        break;
                }
            }
        });
    }

    setupSwipeSupport() {
        const container = document.getElementById('testimonials-container');
        if (!container) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe(touchStartX, touchEndX, minSwipeDistance);
        }, { passive: true });
        
        // Mouse drag for desktop
        let mouseDownX = 0;
        let mouseUpX = 0;
        let isDragging = false;
        
        container.addEventListener('mousedown', (e) => {
            mouseDownX = e.clientX;
            isDragging = true;
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            // Prevent text selection during drag
            e.preventDefault();
        });
        
        container.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            mouseUpX = e.clientX;
            this.handleSwipe(mouseDownX, mouseUpX, minSwipeDistance);
        });
        
        container.addEventListener('mouseleave', () => {
            isDragging = false;
        });
    }

    handleSwipe(startX, endX, threshold) {
        const distance = startX - endX;
        
        if (Math.abs(distance) < threshold) return;
        
        this.pauseAutoRotate();
        
        if (distance > 0) {
            // Swipe left - next slide
            this.nextSlide();
        } else {
            // Swipe right - previous slide
            this.prevSlide();
        }
        
        this.resumeAutoRotate();
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.add('hidden');
            slide.classList.remove('active');
        });
        
        // Show current slide
        this.slides[index].classList.remove('hidden');
        this.slides[index].classList.add('active');
        
        // Update dots
        this.updateDots(index);
        
        // Update ARIA live region for screen readers
        this.updateLiveRegion(index);
    }

    updateDots(index) {
        this.dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('bg-primary', 'w-4');
                dot.classList.remove('bg-gray-300', 'dark:bg-gray-600');
            } else {
                dot.classList.remove('bg-primary', 'w-4');
                dot.classList.add('bg-gray-300', 'dark:bg-gray-600');
            }
        });
    }

    updateLiveRegion(index) {
        let liveRegion = document.getElementById('testimonial-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'testimonial-live-region';
            liveRole = 'status';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }
        
        const currentSlide = this.slides[index];
        const name = currentSlide.querySelector('h4')?.textContent || 'Testimonial';
        const role = currentSlide.querySelector('span.text-primary')?.textContent || '';
        
        liveRegion.textContent = `Testimonial ${index + 1} of ${this.slides.length}: ${name}, ${role}`;
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length || index === this.currentIndex) return;
        
        // Add transition animation
        this.animateTransition(this.currentIndex, index);
        
        this.currentIndex = index;
        this.showSlide(index);
        
        // Track slide change
        this.trackSlideChange(index);
    }

    animateTransition(oldIndex, newIndex) {
        const oldSlide = this.slides[oldIndex];
        const newSlide = this.slides[newIndex];
        
        // Determine direction
        const direction = newIndex > oldIndex ? 'next' : 'prev';
        
        // Add animation classes
        oldSlide.classList.add(`slide-out-${direction}`);
        newSlide.classList.add(`slide-in-${direction}`);
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            oldSlide.classList.remove(`slide-out-${direction}`);
            newSlide.classList.remove(`slide-in-${direction}`);
        }, 300);
    }

    startAutoRotate() {
        if (this.slides.length <= 1) return;
        
        this.autoRotateInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoRotateDelay);
        
        // Pause auto-rotate on hover/focus
        const container = document.getElementById('testimonials-container');
        if (container) {
            container.addEventListener('mouseenter', () => this.pauseAutoRotate());
            container.addEventListener('mouseleave', () => this.resumeAutoRotate());
            container.addEventListener('focusin', () => this.pauseAutoRotate());
            container.addEventListener('focusout', () => this.resumeAutoRotate());
        }
    }

    pauseAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
    }

    resumeAutoRotate() {
        if (!this.autoRotateInterval && this.slides.length > 1) {
            this.startAutoRotate();
        }
    }

    trackSlideChange(index) {
        // In a real app, send to analytics
        console.log(`Slide changed to ${index + 1}`);
    }

    destroy() {
        this.pauseAutoRotate();
        
        // Remove event listeners
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        
        if (prevBtn) {
            const newPrevBtn = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
        }
        
        if (nextBtn) {
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        }
        
        // Remove dots
        this.dots.forEach(dot => {
            const newDot = dot.cloneNode(true);
            dot.parentNode.replaceChild(newDot, dot);
        });
    }
}

// Add CSS for animations
const addTestimonialStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Testimonial slider styles */
        .testimonial-card {
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .testimonial-card.active {
            opacity: 1;
            transform: translateX(0);
        }
        
        .testimonial-card.hidden {
            display: none;
        }
        
        /* Slide animations */
        .slide-in-next {
            animation: slideInNext 0.3s ease-out forwards;
        }
        
        .slide-out-next {
            animation: slideOutNext 0.3s ease-out forwards;
        }
        
        .slide-in-prev {
            animation: slideInPrev 0.3s ease-out forwards;
        }
        
        .slide-out-prev {
            animation: slideOutPrev 0.3s ease-out forwards;
        }
        
        @keyframes slideInNext {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutNext {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-100%);
            }
        }
        
        @keyframes slideInPrev {
            from {
                opacity: 0;
                transform: translateX(-100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutPrev {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        /* Navigation button hover effects */
        #prev-testimonial:hover, #next-testimonial:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(19, 91, 236, 0.2);
        }
        
        /* Dot hover effects */
        #testimonial-dots button:hover {
            transform: scale(1.3);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .testimonial-card {
                padding: 1.5rem;
            }
            
            #testimonial-nav {
                margin-top: 2rem;
            }
        }
        
        /* Accessibility */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        /* Focus styles for accessibility */
        #prev-testimonial:focus,
        #next-testimonial:focus,
        #testimonial-dots button:focus {
            outline: 2px solid #135bec;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    addTestimonialStyles();
    
    // Check if testimonials section exists
    const testimonialsSection = document.getElementById('testimonials-section');
    if (testimonialsSection) {
        // Wait a bit for content to load
        setTimeout(() => {
            window.testimonialSlider = new TestimonialSliderFixed();
        }, 500);
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialSliderFixed;
}