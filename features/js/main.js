// Main application logic for Trust page
class TrustPageApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindThemeToggle();
        this.bindSmoothScroll();
        this.bindFeatureCardInteractions();
        this.bindNavigation();
        this.initializeAnalytics();
    }

    bindThemeToggle() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('qefas-theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }

        // Create theme toggle button if not exists
        this.createThemeToggle();
    }

    createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'fixed bottom-6 right-6 p-3 bg-white dark:bg-surface-dark rounded-full shadow-lg hover:shadow-xl transition-all z-40';
        themeToggle.innerHTML = `
            <span class="material-symbols-outlined text-slate-700 dark:text-slate-300">
                dark_mode
            </span>
        `;
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('qefas-theme', 'light');
                themeToggle.innerHTML = `
                    <span class="material-symbols-outlined text-slate-700">
                        light_mode
                    </span>
                `;
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('qefas-theme', 'dark');
                themeToggle.innerHTML = `
                    <span class="material-symbols-outlined text-slate-300">
                        dark_mode
                    </span>
                `;
            }
            
            // Dispatch event for other components
            document.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: isDark ? 'light' : 'dark' }
            }));
        });
        
        document.body.appendChild(themeToggle);
    }

    bindSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    bindFeatureCardInteractions() {
        // Feature card hover effects
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.feature-card');
            if (card) {
                this.animateFeatureCard(card);
            }
        }, true);
        
        // Feature card click tracking
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.feature-card');
            if (card) {
                const title = card.querySelector('h3')?.textContent;
                this.trackFeatureClick(title);
            }
        });
    }

    animateFeatureCard(card) {
        // Add visual feedback for hover
        const icon = card.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.style.transition = 'transform 0.3s ease';
        }
    }

    bindNavigation() {
        // Update active nav link based on scroll position
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
        });
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('nav a')) {
                this.handleNavClick(e.target.closest('nav a'));
            }
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleNavClick(link) {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            // Internal link - smooth scroll
            this.trackNavigation('internal', href);
        } else {
            // External link
            this.trackNavigation('external', href);
        }
    }

    initializeAnalytics() {
        // Initialize any analytics tracking
        this.trackPageView();
        
        // Track scroll depth
        this.trackScrollDepth();
        
        // Track time on page
        this.trackTimeOnPage();
    }

    trackPageView() {
        console.log('Page viewed: Trust Page');
        // In real app: analytics.track('page_viewed', { page: 'trust' });
    }

    trackScrollDepth() {
        let scrollDepth = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = Math.round((scrollPosition / pageHeight) * 100);
            
            if (percentage > scrollDepth) {
                scrollDepth = percentage;
                
                // Track at 25%, 50%, 75%, 100%
                if ([25, 50, 75, 100].includes(scrollDepth)) {
                    console.log(`Scroll depth: ${scrollDepth}%`);
                    // In real app: analytics.track('scroll_depth', { percentage: scrollDepth });
                }
            }
        });
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            console.log(`Time spent on page: ${timeSpent} seconds`);
            // In real app: analytics.track('time_on_page', { seconds: timeSpent });
        });
    }

    trackFeatureClick(featureName) {
        console.log(`Feature clicked: ${featureName}`);
        // In real app: analytics.track('feature_clicked', { feature: featureName });
    }

    trackNavigation(type, destination) {
        console.log(`Navigation: ${type} to ${destination}`);
        // In real app: analytics.track('navigation', { type, destination });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.trustPageApp = new TrustPageApp();
});