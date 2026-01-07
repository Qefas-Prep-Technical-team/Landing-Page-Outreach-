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

    /* ---------------- THEME ---------------- */

    bindThemeToggle() {
        const savedTheme = localStorage.getItem('qefas-theme');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }

        this.createThemeToggle();
    }

    createThemeToggle() {
        if (document.getElementById('theme-toggle')) return;

        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.className =
            'fixed bottom-6 right-6 p-3 bg-white dark:bg-surface-dark rounded-full shadow-lg hover:shadow-xl transition-all z-40';

        themeToggle.innerHTML = `
            <span class="material-symbols-outlined text-slate-700 dark:text-slate-300">
                dark_mode
            </span>
        `;

        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('qefas-theme', isDark ? 'dark' : 'light');

            themeToggle.innerHTML = `
                <span class="material-symbols-outlined ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                }">
                    ${isDark ? 'dark_mode' : 'light_mode'}
                </span>
            `;

            document.dispatchEvent(
                new CustomEvent('themeChanged', {
                    detail: { theme: isDark ? 'dark' : 'light' }
                })
            );
        });

        document.body.appendChild(themeToggle);
    }

    /* ---------------- SCROLL ---------------- */

    bindSmoothScroll() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }

    /* ---------------- FEATURES ---------------- */

    bindFeatureCardInteractions() {
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.feature-card');
            if (!card) return;

            const icon = card.querySelector('.material-symbols-outlined');
            if (icon) icon.style.transform = 'scale(1.1)';
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.feature-card');
            if (!card) return;

            const icon = card.querySelector('.material-symbols-outlined');
            if (icon) icon.style.transform = 'scale(1)';
        });

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.feature-card');
            if (!card) return;

            const title = card.querySelector('h3')?.textContent;
            this.trackFeatureClick(title);
        });
    }

    /* ---------------- NAVIGATION ---------------- */

    bindNavigation() {
        window.addEventListener('scroll', () => this.updateActiveNavLink());

        document.addEventListener('click', (e) => {
            const link = e.target.closest('nav a');
            if (!link) return;

            const href = link.getAttribute('href');
            this.trackNavigation(href.startsWith('#') ? 'internal' : 'external', href);
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');

        let current = '';

        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${current}`
            );
        });
    }

    /* ---------------- ANALYTICS ---------------- */

    initializeAnalytics() {
        this.trackPageView();
        this.trackScrollDepth();
        this.trackTimeOnPage();
    }

    trackPageView() {
        console.log('📄 Page viewed: Trust Page');
    }

    trackScrollDepth() {
        let maxDepth = 0;

        window.addEventListener('scroll', () => {
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const depth = Math.round((window.scrollY / docHeight) * 100);

            if (depth > maxDepth && [25, 50, 75, 100].includes(depth)) {
                maxDepth = depth;
                console.log(`📊 Scroll depth: ${depth}%`);
            }
        });
    }

    trackTimeOnPage() {
        const start = Date.now();

        window.addEventListener('beforeunload', () => {
            const seconds = Math.round((Date.now() - start) / 1000);
            console.log(`⏱ Time on page: ${seconds}s`);
        });
    }

    trackFeatureClick(feature) {
        if (!feature) return;
        console.log(`✨ Feature clicked: ${feature}`);
    }

    trackNavigation(type, destination) {
        console.log(`🔗 Navigation: ${type} → ${destination}`);
    }
}

/* ---------------- INIT ---------------- */

document.addEventListener('DOMContentLoaded', () => {
    window.trustPageApp = new TrustPageApp();
});
