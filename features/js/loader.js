// Component loader for Trust page
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
            {
                id: 1,
                title: "Expert Tutors",
                description: "Lessons delivered by Nigeria's top-rated educators who understand the nuances of local exams.",
                icon: "school",
                color: "text-primary"
            },
            {
                id: 2,
                title: "Curriculum Aligned",
                description: "100% compliant with the NERDC curriculum, ensuring what they learn is exactly what they need.",
                icon: "menu_book",
                color: "text-primary"
            },
            {
                id: 3,
                title: "Performance Tracking",
                description: "Real-time analytics on your child's strengths and weaknesses to focus study time effectively.",
                icon: "trending_up",
                color: "text-primary"
            },
            {
                id: 4,
                title: "Exam Simulation",
                description: "Realistic CBT practice modes for JAMB and SAT to build confidence and speed before exam day.",
                icon: "laptop_chromebook",
                color: "text-primary"
            },
            {
                id: 5,
                title: "Study Anywhere",
                description: "Accessible on any device—laptop, tablet, or phone—from anywhere in Nigeria.",
                icon: "devices",
                color: "text-primary"
            },
            {
                id: 6,
                title: "Safe Environment",
                description: "A distraction-free zone focused purely on learning, free from social media noise.",
                icon: "shield",
                color: "text-primary"
            }
        ];
        
        this.dashboardFeatures = [
            {
                id: 1,
                title: "Instant Feedback",
                description: "See results immediately after every quiz attempt."
            },
            {
                id: 2,
                title: "Detailed Explanations",
                description: "Step-by-step solutions for every question they miss."
            },
            {
                id: 3,
                title: "Parent Weekly Reports",
                description: "Receive summaries of progress directly to your email."
            }
        ];
        
        this.loaded = false;
    }

    async loadAllComponents() {
        try {
            // Load all HTML components
            const loadPromises = Object.entries(this.components).map(([id, path]) => 
                this.loadComponent(id, path)
            );
            
            await Promise.all(loadPromises);
            
            // Load dynamic content
            this.loadFeatures();
            this.loadDashboardFeatures();
            
            // Initialize interactions
            this.initializeInteractions();
            this.initializeStatsCounter();
            
            // Add scroll animations
            this.initializeScrollAnimations();
            
            console.log('Trust page components loaded successfully');
            this.loaded = true;
            
        } catch (error) {
            console.error('Error loading components:', error);
            this.showError();
        }
    }

    async loadComponent(componentId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Failed to load ${componentId}`);
            
            const html = await response.text();
            const container = document.getElementById(`${componentId}-container`);
            
            if (container) {
                container.innerHTML = html;
                container.classList.add('loaded', 'fade-in');
            }
            
            return true;
        } catch (error) {
            console.error(`Error loading ${componentId}:`, error);
            this.showComponentError(componentId);
            return false;
        }
    }

    loadFeatures() {
        const container = document.getElementById('features-container');
        if (!container) return;
        
        container.innerHTML = this.featuresData.map(feature => `
            <div class="feature-card group relative flex flex-col gap-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark p-8 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 fade-in">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ${feature.color} group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span class="material-symbols-outlined">${feature.icon}</span>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">${feature.title}</h3>
                    <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        ${feature.description}
                    </p>
                </div>
            </div>
        `).join('');
    }

    loadDashboardFeatures() {
        const container = document.getElementById('dashboard-features');
        if (!container) return;
        
        container.innerHTML = this.dashboardFeatures.map(feature => `
            <li class="flex items-start gap-3 dashboard-feature-item">
                <span class="mt-1 flex-shrink-0 text-accent">
                    <span class="material-symbols-outlined">check_circle</span>
                </span>
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white">${feature.title}</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">${feature.description}</p>
                </div>
            </li>
        `).join('');
    }

    initializeInteractions() {
        // Get Started button
        const getStartedBtn = document.getElementById('get-started-btn');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                this.trackEvent('get_started_clicked');
                window.location.href = '/signup';
            });
        }
        
        // Login button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.trackEvent('login_clicked');
                window.location.href = '/login';
            });
        }
        
        // View Demo button
        const viewDemoBtn = document.getElementById('view-demo-btn');
        if (viewDemoBtn) {
            viewDemoBtn.addEventListener('click', () => {
                this.trackEvent('view_demo_clicked');
                this.showDemoModal();
            });
        }
        
        // CTA buttons
        const createAccountBtn = document.getElementById('create-account-btn');
        if (createAccountBtn) {
            createAccountBtn.addEventListener('click', () => {
                this.trackEvent('create_account_clicked');
                window.location.href = '/signup?source=trust_page';
            });
        }
        
        const howItWorksBtn = document.getElementById('how-it-works-btn');
        if (howItWorksBtn) {
            howItWorksBtn.addEventListener('click', () => {
                this.trackEvent('how_it_works_clicked');
                window.location.href = '/features#how-it-works';
            });
        }
    }

    initializeStatsCounter() {
        const statItems = document.querySelectorAll('.stat-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statItems.forEach(item => observer.observe(item));
    }

    animateCounter(statItem) {
        const numberElement = statItem.querySelector('[data-count]');
        if (!numberElement) return;
        
        const target = parseInt(numberElement.dataset.count);
        const suffix = numberElement.dataset.suffix || '';
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;
        
        numberElement.textContent = '0' + suffix;
        
        const timer = setInterval(() => {
            step++;
            current = Math.min(target, Math.floor(increment * step));
            numberElement.textContent = current + suffix;
            
            if (current >= target) {
                clearInterval(timer);
                numberElement.textContent = target + suffix;
            }
        }, duration / steps);
        
        statItem.classList.add('count-up');
    }

    initializeScrollAnimations() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }

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
                            <button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                                Start Free Trial
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.innerHTML = modalHTML;
        document.body.appendChild(modal);
        
        // Add close functionality
        const closeBtn = modal.querySelector('#close-demo-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        }
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    trackEvent(eventName, data = {}) {
        // In a real app, send to analytics
        console.log(`Event: ${eventName}`, data);
    }

    showComponentError(componentId) {
        const container = document.getElementById(`${componentId}-container`);
        if (container) {
            container.innerHTML = `
                <div class="p-8 text-center text-gray-500">
                    <span class="material-symbols-outlined text-4xl mb-4">error</span>
                    <p>Unable to load ${componentId}. Please refresh the page.</p>
                </div>
            `;
        }
    }

    showError() {
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = `
                <div class="min-h-screen flex items-center justify-center">
                    <div class="text-center">
                        <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Unable to Load Page</h2>
                        <p class="text-slate-600 dark:text-slate-400 mb-6">There was an error loading the page content.</p>
                        <button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors" onclick="location.reload()">
                            Reload Page
                        </button>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new TrustPageLoader();
    window.trustPageLoader = loader; // For debugging
    loader.loadAllComponents();
});