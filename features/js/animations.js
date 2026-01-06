// Animation components for Trust page
class TrustPageAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initializeParallax();
        this.initializeFeatureCardAnimations();
        this.initializeStatsAnimation();
        this.initializeCTAHoverEffects();
    }

    initializeParallax() {
        // Simple parallax for dashboard section
        const dashboardSection = document.getElementById('dashboard-section');
        if (!dashboardSection) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            const dashboardImage = dashboardSection.querySelector('.dashboard-image');
            
            if (dashboardImage) {
                dashboardImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    initializeFeatureCardAnimations() {
        // Stagger animation for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            observer.observe(card);
        });
    }

    initializeStatsAnimation() {
        // Animate stats when they come into view
        const statsSection = document.getElementById('stats-section');
        if (!statsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(statsSection);
    }

    animateStats() {
        const stats = [
            { element: document.querySelector('[data-count="50000"]'), value: 50000, suffix: '+' },
            { element: document.querySelector('[data-count="98"]'), value: 98, suffix: '%' },
            { element: document.querySelector('[data-count="5000"]'), value: 5000, suffix: '+' }
        ];

        stats.forEach(stat => {
            if (stat.element) {
                this.animateNumber(stat.element, stat.value, stat.suffix);
            }
        });
    }

    animateNumber(element, target, suffix = '') {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(target, Math.floor(increment * step));
            element.textContent = current.toLocaleString() + suffix;

            if (current >= target) {
                clearInterval(timer);
            }
        }, duration / steps);
    }

    initializeCTAHoverEffects() {
        const ctaButtons = document.querySelectorAll('#cta-section button');
        
        ctaButtons.forEach(button => {
            // Ripple effect
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                `;
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Particle effect for CTA section (optional)
    createParticleEffect() {
        const ctaSection = document.getElementById('cta-section');
        if (!ctaSection) return;

        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-white/20';
            
            // Random position and size
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                top: ${top}%;
                animation: float ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            ctaSection.appendChild(particle);
        }

        // Add float animation
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
        `;
        document.head.appendChild(floatStyle);
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const animations = new TrustPageAnimations();
    
    // Optional: Create particle effect after page load
    setTimeout(() => {
        animations.createParticleEffect();
    }, 1000);
});