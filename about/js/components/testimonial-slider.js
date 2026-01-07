// Testimonial slider component
class TestimonialSlider {
    constructor() {
        this.slider = null;
        this.slides = [];
        this.dots = [];
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoRotate = true;
        this.rotationSpeed = 5000; // 5 seconds
        this.transitionSpeed = 500; // 0.5 seconds
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        setTimeout(() => {
            this.setupSlider();
            this.setupControls();
            this.startAutoRotate();
            this.setupKeyboardControls();
            this.setupSwipeSupport();
        }, 100);
    }

    setupSlider() {
        this.slider = document.getElementById('testimonials-container');
        if (!this.slider) {
            console.error('Testimonials container not found');
            return;
        }
        
        this.slides = Array.from(this.slider.querySelectorAll('.testimonial-card'));
        if (this.slides.length === 0) {
            console.error('No testimonial slides found');
            return;
        }
        
        // Initialize slides
        this.slides.forEach((slide, index) => {
            slide.style.transition = `opacity ${this.transitionSpeed}ms ease, transform ${this.transitionSpeed}ms ease`;
            slide.dataset.index = index;
            
            // Set initial positions
            if (index === 0) {
                slide.classList.add('active');
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0) scale(1)';
                slide.style.zIndex = '1';
            } else {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(100%) scale(0.9)';
                slide.style.zIndex = '0';
                slide.style.position = 'absolute';
                slide.style.top = '0';
                slide.style.left = '0';
                slide.style.right = '0';
            }
        });
        
        // Setup slider container
        this.slider.style.position = 'relative';
        this.slider.style.minHeight = `${this.slides[0].offsetHeight}px`;
    }

    setupControls() {
        // Setup navigation buttons
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.pauseAutoRotate();
                this.prevSlide();
                this.resumeAutoRotate();
            });
            
            // Add hover effect
            prevBtn.addEventListener('mouseenter', () => {
                prevBtn.classList.add('bg-primary', 'text-white');
                prevBtn.classList.remove('bg-gray-100', 'text-gray-600', 'dark:bg-gray-800', 'dark:text-gray-400');
            });
            
            prevBtn.addEventListener('mouseleave', () => {
                prevBtn.classList.remove('bg-primary', 'text-white');
                prevBtn.classList.add('bg-gray-100', 'text-gray-600', 'dark:bg-gray-800', 'dark:text-gray-400');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.pauseAutoRotate();
                this.nextSlide();
                this.resumeAutoRotate();
            });
            
            // Add hover effect
            nextBtn.addEventListener('mouseenter', () => {
                nextBtn.classList.add('bg-primary', 'text-white');
                nextBtn.classList.remove('bg-gray-100', 'text-gray-600', 'dark:bg-gray-800', 'dark:text-gray-400');
            });
            
            nextBtn.addEventListener('mouseleave', () => {
                nextBtn.classList.remove('bg-primary', 'text-white');
                nextBtn.classList.add('bg-gray-100', 'text-gray-600', 'dark:bg-gray-800', 'dark:text-gray-400');
            });
        }
        
        // Setup dots
        this.setupDots();
    }

    setupDots() {
        const dotsContainer = document.getElementById('testimonial-dots');
        if (!dotsContainer) return;
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // Create dots
        this.dots = [];
        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement('button');
            dot.className = `testimonial-dot w-3 h-3 rounded-full transition-all duration-300 ${i === 0 ? 'bg-primary scale-125' : 'bg-gray-300 dark:bg-gray-700'}`;
            dot.dataset.index = i;
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            
            dot.addEventListener('click', () => {
                this.pauseAutoRotate();
                this.goToSlide(i);
                this.resumeAutoRotate();
            });
            
            // Add hover effect
            dot.addEventListener('mouseenter', () => {
                if (i !== this.currentSlide) {
                    dot.classList.add('scale-110', 'bg-primary/50');
                }
            });
            
            dot.addEventListener('mouseleave', () => {
                if (i !== this.currentSlide) {
                    dot.classList.remove('scale-110', 'bg-primary/50');
                }
            });
            
            dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('#testimonials-section')) {
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
        if (!this.slider) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50; // Minimum swipe distance
        
        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX, swipeThreshold);
        }, { passive: true });
        
        // Also support mouse drag for desktop
        let mouseDownX = 0;
        let mouseUpX = 0;
        let isMouseDown = false;
        
        this.slider.addEventListener('mousedown', (e) => {
            mouseDownX = e.clientX;
            isMouseDown = true;
        });
        
        this.slider.addEventListener('mouseup', (e) => {
            if (!isMouseDown) return;
            
            mouseUpX = e.clientX;
            isMouseDown = false;
            this.handleSwipe(mouseDownX, mouseUpX, swipeThreshold);
        });
        
        this.slider.addEventListener('mouseleave', () => {
            isMouseDown = false;
        });
    }

    handleSwipe(startX, endX, threshold) {
        const difference = startX - endX;
        
        if (Math.abs(difference) < threshold) {
            return; // Not a significant swipe
        }
        
        this.pauseAutoRotate();
        
        if (difference > 0) {
            // Swipe left - next slide
            this.nextSlide();
        } else {
            // Swipe right - previous slide
            this.prevSlide();
        }
        
        this.resumeAutoRotate();
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length || index === this.currentSlide) {
            return;
        }
        
        // Track slide change for analytics
        this.trackSlideChange(this.currentSlide, index);
        
        const currentSlide = this.slides[this.currentSlide];
        const nextSlide = this.slides[index];
        
        // Animate transition
        this.animateTransition(currentSlide, nextSlide, index > this.currentSlide ? 'next' : 'prev');
        
        // Update current slide
        this.currentSlide = index;
        
        // Update dots
        this.updateDots();
        
        // Update ARIA live region for screen readers
        this.updateARIALiveRegion();
    }

    animateTransition(currentSlide, nextSlide, direction) {
        // Remove active class from current slide
        currentSlide.classList.remove('active');
        
        // Set initial positions for animation
        const fromLeft = direction === 'next' ? '100%' : '-100%';
        const toLeft = direction === 'next' ? '-100%' : '100%';
        
        nextSlide.style.opacity = '1';
        nextSlide.style.transform = `translateX(${fromLeft}) scale(0.9)`;
        nextSlide.style.zIndex = '2';
        nextSlide.style.position = 'absolute';
        nextSlide.style.top = '0';
        nextSlide.style.left = '0';
        nextSlide.style.right = '0';
        
        // Trigger reflow
        nextSlide.offsetHeight;
        
        // Animate both slides
        currentSlide.style.transform = `translateX(${toLeft}) scale(0.9)`;
        currentSlide.style.opacity = '0.5';
        
        nextSlide.style.transform = 'translateX(0) scale(1)';
        nextSlide.style.opacity = '1';
        
        // After transition completes
        setTimeout(() => {
            currentSlide.style.zIndex = '0';
            currentSlide.style.position = 'absolute';
            nextSlide.classList.add('active');
            nextSlide.style.zIndex = '1';
            nextSlide.style.position = 'relative';
            
            // Reset current slide transform
            currentSlide.style.transform = 'translateX(0) scale(0.9)';
        }, this.transitionSpeed);
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('bg-primary', 'scale-125');
                dot.classList.remove('bg-gray-300', 'dark:bg-gray-700', 'scale-110');
            } else {
                dot.classList.remove('bg-primary', 'scale-125');
                dot.classList.add('bg-gray-300', 'dark:bg-gray-700');
            }
        });
    }

    updateARIALiveRegion() {
        let liveRegion = document.getElementById('testimonial-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'testimonial-live-region';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }
        
        const currentTestimonial = this.slides[this.currentSlide];
        const name = currentTestimonial.querySelector('h4')?.textContent || 'Testimonial';
        const role = currentTestimonial.querySelector('span.text-primary')?.textContent || '';
        
        liveRegion.textContent = `Now viewing testimonial ${this.currentSlide + 1} of ${this.slides.length}: ${name}, ${role}`;
    }

    startAutoRotate() {
        if (!this.autoRotate || this.slides.length <= 1) return;
        
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.rotationSpeed);
        
        // Add pause on hover
        if (this.slider) {
            this.slider.addEventListener('mouseenter', () => this.pauseAutoRotate());
            this.slider.addEventListener('mouseleave', () => this.resumeAutoRotate());
            
            // Also pause when slider is focused (for keyboard users)
            this.slider.addEventListener('focusin', () => this.pauseAutoRotate());
            this.slider.addEventListener('focusout', () => this.resumeAutoRotate());
        }
    }

    pauseAutoRotate() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    resumeAutoRotate() {
        if (this.autoRotate && !this.slideInterval && this.slides.length > 1) {
            this.startAutoRotate();
        }
    }

    trackSlideChange(fromIndex, toIndex) {
        console.log(`Testimonial slide changed: ${fromIndex + 1} → ${toIndex + 1}`);
        // In a real app, send to analytics
        // analytics.track('testimonial_slide_changed', {
        //     from_slide: fromIndex + 1,
        //     to_slide: toIndex + 1,
        //     total_slides: this.slides.length
        // });
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
        
        // Reset slider styles
        if (this.slider) {
            this.slider.style.position = '';
            this.slider.style.minHeight = '';
            
            this.slides.forEach(slide => {
                slide.style.transition = '';
                slide.style.opacity = '';
                slide.style.transform = '';
                slide.style.zIndex = '';
                slide.style.position = '';
                slide.style.top = '';
                slide.style.left = '';
                slide.style.right = '';
                
                if (slide.dataset.index === '0') {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }
    }
}

// CSS styles for slider animations
const addSliderStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Testimonial slider animations */
        .testimonial-card {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .testimonial-card.active {
            opacity: 1;
            transform: translateX(0) scale(1);
            z-index: 1;
        }
        
        .testimonial-card:not(.active) {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
            z-index: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        
        /* Dot animations */
        .testimonial-dot {
            transition: all 0.3s ease;
        }
        
        .testimonial-dot:hover {
            transform: scale(1.1);
        }
        
        /* Fade transition effect */
        .testimonial-slider.fade-transition .testimonial-card {
            transition: opacity 0.5s ease;
        }
        
        .testimonial-slider.fade-transition .testimonial-card.active {
            opacity: 1;
        }
        
        .testimonial-slider.fade-transition .testimonial-card:not(.active) {
            opacity: 0;
        }
        
        /* Slide transition effect */
        .testimonial-slider.slide-transition .testimonial-card {
            transition: transform 0.5s ease, opacity 0.5s ease;
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
        
        /* Mobile touch feedback */
        .testimonial-card:active {
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(style);
};

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    addSliderStyles();
    
    // Check if testimonials section exists
    const testimonialsSection = document.getElementById('testimonials-section');
    if (testimonialsSection) {
        // Initialize slider after a short delay to ensure DOM is ready
        setTimeout(() => {
            window.testimonialSlider = new TestimonialSlider();
            
            // Add keyboard navigation instructions for accessibility
            const instructions = document.createElement('div');
            instructions.className = 'sr-only';
            instructions.innerHTML = `
                <p>Testimonial slider: Use left and right arrow keys to navigate between testimonials.</p>
                <p>Press Home to go to the first testimonial, or End to go to the last testimonial.</p>
            `;
            testimonialsSection.prepend(instructions);
        }, 500);
    }
});

// Export for module usage (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialSlider;
}