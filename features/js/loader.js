// Trust page component loader using fetch()
class TrustPageLoader {
    constructor() {
        this.components = {
            'navbar': 'components/navbar.html',
            'hero': 'components/hero.html',
            'features-grid': 'components/features-grid.html',
            'dashboard-section': 'components/dashboard-section.html',
            'stats': 'components/stats.html',
            'cta': 'components/cta.html',
            'footer': 'components/footer.html'
        };

        this.featuresData = [
            { id: 1, title: "Expert Tutors", description: "Lessons delivered by Nigeria's top-rated educators who understand the nuances of local exams.", icon: "school", color: "text-primary" },
            { id: 2, title: "Curriculum Aligned", description: "100% compliant with the NERDC curriculum, ensuring what they learn is exactly what they need.", icon: "menu_book", color: "text-primary" },
            { id: 3, title: "Performance Tracking", description: "Real-time analytics on your child's strengths and weaknesses to focus study time effectively.", icon: "trending_up", color: "text-primary" },
            { id: 4, title: "Exam Simulation", description: "Realistic CBT practice modes for JAMB and SAT to build confidence and speed before exam day.", icon: "laptop_chromebook", color: "text-primary" },
            { id: 5, title: "Study Anywhere", description: "Accessible on any device—laptop, tablet, or phone—from anywhere in Nigeria.", icon: "devices", color: "text-primary" },
            { id: 6, title: "Safe Environment", description: "A distraction-free zone focused purely on learning, free from social media noise.", icon: "shield", color: "text-primary" }
        ];

        this.dashboardFeatures = [
            { id: 1, title: "Instant Feedback", description: "See results immediately after every quiz attempt." },
            { id: 2, title: "Detailed Explanations", description: "Step-by-step solutions for every question they miss." },
            { id: 3, title: "Parent Weekly Reports", description: "Receive summaries of progress directly to your email." }
        ];

        this.loaded = false;
    }

    // Load all components
    async loadAllComponents() {
        try {
            // Load static components
            const promises = Object.entries(this.components).map(([id, path]) => this.loadComponent(id, path));
            await Promise.all(promises);

            // Load dynamic content
            this.renderFeatures();
            this.renderDashboardFeatures();
                // Initialize mobile menu AFTER navbar is loaded
            this.initializeMobileMenu();

            // Initialize interactions
            this.initializeInteractions();
            this.initializeStatsCounter();
            this.initializeScrollAnimations();

            console.log('Trust page components loaded successfully');
            this.loaded = true;
        } catch (err) {
            console.error('Error loading components:', err);
            this.showError();
        }
    }

    // Fetch and insert component
    async loadComponent(id, path) {
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error(`Failed to load ${id}`);
            const html = await res.text();
            const container = document.getElementById(`${id}-container`);
            if (container) {
                container.innerHTML = html;
                container.classList.add('loaded', 'fade-in');
            }
        } catch (err) {
            console.error(`Error loading ${id}:`, err);
            this.showComponentError(id);
        }
    }
   // Mobile Menu Initialization
    initializeMobileMenu() {
        // Wait for DOM to be ready after navbar load
        setTimeout(() => {
            try {
                if (typeof MobileMenu === 'function') {
                    this.mobileMenu = new MobileMenu();
                    console.log('Mobile menu initialized (MobileMenu class)');
                    return;
                }

                // Fallback initializer if MobileMenu class is not present
                const navbarContainer = document.getElementById('navbar-container');
                if (!navbarContainer) {
                    console.warn('Navbar container missing; cannot initialize fallback mobile menu');
                    return;
                }

                const toggle = navbarContainer.querySelector('#mobile-menu-toggle');
                const menu = navbarContainer.querySelector('#mobile-menu');
                if (!toggle || !menu) {
                    console.warn('Mobile menu elements not found for fallback initialization');
                    return;
                }

                // Ensure hidden by default
                menu.classList.add('hidden');

                const openMenu = () => {
                    menu.classList.remove('hidden');
                    // small delay to allow CSS transitions
                    setTimeout(() => menu.classList.add('mobile-menu-open'), 10);
                    const icon = toggle.querySelector('.material-symbols-outlined');
                    if (icon) icon.textContent = 'close';
                    document.body.style.overflow = 'hidden';
                };

                const closeMenu = () => {
                    menu.classList.remove('mobile-menu-open');
                    const icon = toggle.querySelector('.material-symbols-outlined');
                    if (icon) icon.textContent = 'menu';
                    document.body.style.overflow = '';
                    setTimeout(() => menu.classList.add('hidden'), 300);
                };

                let isOpen = false;
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    isOpen = !isOpen;
                    isOpen ? openMenu() : closeMenu();
                });

                // Close when clicking links inside menu
                menu.querySelectorAll('a, button').forEach(el => el.addEventListener('click', () => {
                    isOpen = false; closeMenu();
                }));

                // Close on outside click
                document.addEventListener('click', (e) => {
                    if (!isOpen) return;
                    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                        isOpen = false; closeMenu();
                    }
                });

                // Close on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && isOpen) {
                        isOpen = false; closeMenu();
                    }
                });

                console.log('Mobile menu initialized (fallback)');
            } catch (error) {
                console.error('Failed to initialize mobile menu (fallback):', error);
            }
        }, 100); // Small delay to ensure navbar HTML is fully rendered
    }
    // Render features grid
    renderFeatures() {
        const container = document.getElementById('features-container');
        if (!container) return;
        container.innerHTML = this.featuresData.map(f => `
            <div class="feature-card group relative flex flex-col gap-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark p-8 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 fade-in">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ${f.color} group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span class="material-symbols-outlined">${f.icon}</span>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">${f.title}</h3>
                    <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">${f.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Render dashboard features
    renderDashboardFeatures() {
        const container = document.getElementById('dashboard-features');
        if (!container) return;
        container.innerHTML = this.dashboardFeatures.map(f => `
            <li class="flex items-start gap-3 dashboard-feature-item">
                <span class="mt-1 flex-shrink-0 text-accent">
                    <span class="material-symbols-outlined">check_circle</span>
                </span>
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white">${f.title}</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">${f.description}</p>
                </div>
            </li>
        `).join('');
    }

    // Initialize all buttons/interactions
    initializeInteractions() {
        const btns = [
            { id: 'get-started-btn', event: 'get_started_clicked', action: () => window.location.href = '/signup' },
            { id: 'login-btn', event: 'login_clicked', action: () => window.location.href = '/login' },
            { id: 'view-demo-btn', event: 'view_demo_clicked', action: () => this.showDemoModal() },
            { id: 'create-account-btn', event: 'create_account_clicked', action: () => window.location.href = '/signup?source=trust_page' },
            { id: 'how-it-works-btn', event: 'how_it_works_clicked', action: () => window.location.href = '/features#how-it-works' }
        ];

        btns.forEach(({ id, event, action }) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', () => { this.trackEvent(event); action(); });
        });
    }

    // Animate stats counters
    initializeStatsCounter() {
        const items = document.querySelectorAll('.stat-item');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        items.forEach(item => observer.observe(item));
    }

    animateCounter(statItem) {
        const el = statItem.querySelector('[data-count]');
        if (!el) return;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const steps = 60;
        const increment = target / steps;
        let step = 0;
        const duration = 2000;

        el.textContent = '0' + suffix;
        const timer = setInterval(() => {
            step++;
            current = Math.min(target, Math.floor(increment * step));
            el.textContent = current + suffix;
            if (current >= target) clearInterval(timer);
        }, duration / steps);
        statItem.classList.add('count-up');
    }

    // Scroll animations
    initializeScrollAnimations() {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        sections.forEach(sec => observer.observe(sec));
    }

    // Demo modal
    showDemoModal() {
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div class="bg-white dark:bg-surface-dark rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Parent Dashboard Demo</h3>
                            <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" id="close-demo-modal">
                                <span class="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
                            <div class="text-center">
                                <span class="material-symbols-outlined text-6xl text-gray-400 mb-4">play_circle</span>
                                <p class="text-gray-500">Demo video would play here</p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">Start Free Trial</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const modal = document.createElement('div');
        modal.innerHTML = modalHTML;
        document.body.appendChild(modal);

        // Close modal
        const closeBtn = modal.querySelector('#close-demo-modal');
        if (closeBtn) closeBtn.addEventListener('click', () => document.body.removeChild(modal));
        modal.addEventListener('click', e => { if (e.target === modal) document.body.removeChild(modal); });
    }

    // Analytics tracker stub
    trackEvent(eventName, data = {}) {
        console.log(`Event: ${eventName}`, data);
    }

    showComponentError(componentId) {
        const container = document.getElementById(`${componentId}-container`);
        if (container) container.innerHTML = `
            <div class="p-8 text-center text-gray-500">
                <span class="material-symbols-outlined text-4xl mb-4">error</span>
                <p>Unable to load ${componentId}. Please refresh the page.</p>
            </div>
        `;
    }

    showError() {
        const main = document.querySelector('main');
        if (main) main.innerHTML = `
            <div class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Unable to Load Page</h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-6">There was an error loading the page content.</p>
                    <button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors" onclick="location.reload()">Reload Page</button>
                </div>
            </div>
        `;
    }
     // Optional: Public method to get mobile menu instance
    getMobileMenu() {
        return this.mobileMenu;
    }

    // Optional: Public method to toggle mobile menu
    toggleMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.toggle();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new TrustPageLoader();
    window.trustPageLoader = loader; // For debugging
    loader.loadAllComponents();
});