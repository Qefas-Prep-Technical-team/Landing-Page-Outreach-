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
        this.isMobileMenuOpen = false;
        this.mobileMenuToggle = null;
        this.mobileMenu = null;
    }

    // Load all components
    async loadAllComponents() {
        try {
            console.log('Loading components...');
            
            // Load static components
            const promises = Object.entries(this.components).map(([id, path]) => this.loadComponent(id, path));
            await Promise.all(promises);

            // Load dynamic content
            this.renderFeatures();
            this.renderDashboardFeatures();

            // Initialize mobile navigation
            this.initializeMobileNav();

            // Initialize interactions
            this.initializeInteractions();
            this.initializeStatsCounter();

            console.log('All components loaded successfully');
            this.loaded = true;
            
            // Ensure all sections are visible
            this.ensureSectionsVisible();
            
        } catch (err) {
            console.error('Error loading components:', err);
            this.showError();
        }
    }

    // Ensure all sections are visible
    ensureSectionsVisible() {
        // Force all sections to be visible
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
            section.style.display = 'block';
        });
        
        // Also ensure process steps are visible
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach(step => {
            step.style.opacity = '1';
            step.style.transform = 'none';
        });
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
                // Don't add fade-in class to avoid animation issues
                container.classList.add('loaded');
            }
        } catch (err) {
            console.error(`Error loading ${id}:`, err);
            this.showComponentError(id);
        }
    }

    // Initialize mobile navigation
    initializeMobileNav() {
        console.log('Initializing mobile navigation...');
        
        // Try to find elements
        this.findMobileElements();
        
        if (!this.mobileMenuToggle || !this.mobileMenu) {
            console.log('Mobile nav elements not found, retrying...');
            setTimeout(() => {
                this.findMobileElements();
                if (this.mobileMenuToggle && this.mobileMenu) {
                    this.setupMobileNav();
                } else {
                    console.log('Creating fallback mobile nav');
                    this.createFallbackMobileNav();
                }
            }, 300);
        } else {
            this.setupMobileNav();
        }
    }

    findMobileElements() {
        // Look for mobile elements
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        
        // Alternative selectors if not found by ID
        if (!this.mobileMenuToggle) {
            this.mobileMenuToggle = document.querySelector('[data-mobile-toggle]') || 
                                   document.querySelector('button.md\\:hidden');
        }
        
        if (!this.mobileMenu) {
            this.mobileMenu = document.querySelector('[data-mobile-menu]') || 
                             document.querySelector('.mobile-menu');
        }
    }

    setupMobileNav() {
        if (!this.mobileMenuToggle || !this.mobileMenu) {
            console.error('Cannot setup mobile nav: elements missing');
            return;
        }
        
        console.log('Setting up mobile navigation...');
        
        // Clear any existing event listeners
        const newToggle = this.mobileMenuToggle.cloneNode(true);
        this.mobileMenuToggle.parentNode.replaceChild(newToggle, this.mobileMenuToggle);
        this.mobileMenuToggle = newToggle;
        
        // Add click event
        this.mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        // Setup close handlers
        this.setupCloseHandlers();
        
        console.log('Mobile navigation setup complete');
    }

    setupCloseHandlers() {
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                this.mobileMenu && 
                !this.mobileMenu.contains(e.target) && 
                this.mobileMenuToggle && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Close when clicking mobile menu links
        if (this.mobileMenu) {
            const links = this.mobileMenu.querySelectorAll('a, button:not(#mobile-menu-toggle)');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }

    toggleMobileMenu() {
        if (!this.mobileMenu || !this.mobileMenuToggle) {
            console.error('Mobile nav elements not available');
            return;
        }
        
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        // Remove hidden class
        this.mobileMenu.classList.remove('hidden');
        
        // Force reflow
        this.mobileMenu.offsetHeight;
        
        // Add open class
        setTimeout(() => {
            this.mobileMenu.classList.add('mobile-menu-open');
        }, 10);
        
        // Update toggle button icon
        const icon = this.mobileMenuToggle.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = 'close';
        }
        
        // Update state
        this.isMobileMenuOpen = true;
        
        // Prevent body scroll
        document.body.classList.add('menu-open');
    }

    closeMobileMenu() {
        // Remove open class
        this.mobileMenu.classList.remove('mobile-menu-open');
        
        // Update toggle button icon
        const icon = this.mobileMenuToggle.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = 'menu';
        }
        
        // Update state
        this.isMobileMenuOpen = false;
        
        // Allow body scroll
        document.body.classList.remove('menu-open');
        
        // Hide menu after animation
        setTimeout(() => {
            if (!this.isMobileMenuOpen && this.mobileMenu) {
                this.mobileMenu.classList.add('hidden');
            }
        }, 400);
    }

    createFallbackMobileNav() {
        console.log('Creating fallback mobile navigation...');
        
        const navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) {
            console.error('Cannot create fallback: navbar container not found');
            return;
        }
        
        // Find the nav element
        const navElement = navbarContainer.querySelector('nav');
        if (!navElement) {
            console.error('Cannot create fallback: nav element not found');
            return;
        }
        
        // Create toggle button
        const toggle = document.createElement('button');
        toggle.id = 'mobile-menu-toggle';
        toggle.className = 'md:hidden flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
        toggle.innerHTML = '<span class="material-symbols-outlined text-xl">menu</span>';
        
        // Find the actions container to insert toggle
        const actionsContainer = navElement.querySelector('.flex.items-center.gap-3');
        if (actionsContainer) {
            actionsContainer.appendChild(toggle);
        }
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'md:hidden hidden absolute left-0 right-0 top-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg';
        mobileMenu.innerHTML = `
            <div class="px-4 py-3 space-y-1">
                <a class="block py-3 px-4 text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg" href="/courses/">
                    Courses
                </a>
                <a class="block py-3 px-4 text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg" href="/features/">
                    Features
                </a>
                <a class="block py-3 px-4 text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg" href="/about/">
                    About
                </a>
                
                <div class="pt-3 mt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                    <button class="w-full flex items-center justify-center h-10 px-4 text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        Student Login
                    </button>
                    <button class="w-full flex items-center justify-center h-10 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg">
                        Start Learning
                    </button>
                </div>
            </div>
        `;
        
        // Insert after the nav content
        const navContent = navElement.querySelector('div > div');
        if (navContent) {
            navContent.insertAdjacentElement('afterend', mobileMenu);
        }
        
        // Update references and setup
        this.mobileMenuToggle = toggle;
        this.mobileMenu = mobileMenu;
        
        // Setup the navigation
        this.setupMobileNav();
    }

    // Render features grid
    renderFeatures() {
        const container = document.getElementById('features-container');
        if (!container) return;
        
        container.innerHTML = this.featuresData.map(feature => `
            <div class="feature-card group relative flex flex-col gap-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span class="material-symbols-outlined">${feature.icon}</span>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">${feature.title}</h3>
                    <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">${feature.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Render dashboard features
    renderDashboardFeatures() {
        const container = document.getElementById('dashboard-features');
        if (!container) return;
        
        container.innerHTML = this.dashboardFeatures.map(feature => `
            <li class="flex items-start gap-3">
                <span class="mt-1 flex-shrink-0 text-green-500">
                    <span class="material-symbols-outlined">check_circle</span>
                </span>
                <div>
                    <h4 class="font-bold text-gray-900 dark:text-white">${feature.title}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${feature.description}</p>
                </div>
            </li>
        `).join('');
    }

    // Initialize all buttons/interactions
    initializeInteractions() {
        const buttons = [
            // { id: 'get-started-btn', action: () => window.location.href = '/signup' },
            // { id: 'login-btn', action: () => window.location.href = '/login' },
            // { id: 'view-demo-btn', action: () => this.showDemoModal() },
            // { id: 'create-account-btn', action: () => window.location.href = '/signup?source=trust_page' },
            // { id: 'how-it-works-btn', action: () => window.location.href = '/features#how-it-works' }
        ];

        buttons.forEach(({ id, action }) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', action);
            }
        });
    }

    // Animate stats counters
    initializeStatsCounter() {
        const statItems = document.querySelectorAll('.stat-item');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statItems.forEach(item => observer.observe(item));
    }

    animateCounter(statItem) {
        const counterElement = statItem.querySelector('[data-count]');
        if (!counterElement) return;
        
        const target = parseInt(counterElement.dataset.count);
        const suffix = counterElement.dataset.suffix || '';
        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        
        const timer = setInterval(() => {
            current = Math.min(target, Math.floor(current + increment));
            counterElement.textContent = current + suffix;
            
            if (current >= target) {
                clearInterval(timer);
            }
        }, duration / steps);
        
        statItem.classList.add('counting');
    }

    // Demo modal
    // showDemoModal() {
    //     const modalHTML = `
    //         <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    //             <div class="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
    //                 <div class="p-6">
    //                     <div class="flex justify-between items-center mb-6">
    //                         <h3 class="text-xl font-bold text-gray-900 dark:text-white">Parent Dashboard Demo</h3>
    //                         <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 close-demo-modal">
    //                             <span class="material-symbols-outlined">close</span>
    //                         </button>
    //                     </div>
    //                     <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
    //                         <div class="text-center">
    //                             <span class="material-symbols-outlined text-6xl text-gray-400 mb-4">play_circle</span>
    //                             <p class="text-gray-500">Demo video would play here</p>
    //                         </div>
    //                     </div>
    //                     <div class="flex justify-end">
    //                         <button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">Start Free Trial</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     `;
        
    //     const modalContainer = document.createElement('div');
    //     modalContainer.innerHTML = modalHTML;
    //     document.body.appendChild(modalContainer);
        
    //     // Close modal handlers
    //     const closeModal = () => document.body.removeChild(modalContainer);
        
    //     const closeBtn = modalContainer.querySelector('.close-demo-modal');
    //     if (closeBtn) closeBtn.addEventListener('click', closeModal);
        
    //     modalContainer.addEventListener('click', (e) => {
    //         if (e.target === modalContainer) closeModal();
    //     });
    // }

    // Error handling
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
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.innerHTML = `
                <div class="min-h-screen flex items-center justify-center">
                    <div class="text-center">
                        <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unable to Load Page</h2>
                        <p class="text-gray-600 dark:text-gray-400 mb-6">There was an error loading the page content.</p>
                        <button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors" onclick="location.reload()">Reload Page</button>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const pageLoader = new TrustPageLoader();
    window.pageLoader = pageLoader; // For debugging if needed
    pageLoader.loadAllComponents();
});