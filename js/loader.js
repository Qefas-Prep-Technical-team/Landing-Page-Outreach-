// Component loader using fetch()
class ComponentLoader {
    constructor() {
        this.components = {
            'navbar': 'components/navbar.html',
            'hero': 'components/hero.html',
            'stats': 'components/stats.html',
            'features': 'components/features.html',
            'courses': 'components/courses.html',
            'cta': 'components/cta.html',
            'testimonials': 'components/testimonials.html',
            'footer': 'components/footer.html'
        };
        
        this.isMobileMenuOpen = false;
    }

    async loadAllComponents() {
        const loadPromises = Object.entries(this.components).map(([id, path]) => 
            this.loadComponent(id, path)
        );
        
        await Promise.all(loadPromises);
        console.log('All components loaded successfully');
        
        // Initialize global events after all components are loaded
        this.initializeGlobalEvents();
    }

    async loadComponent(componentId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentId}: ${response.status}`);
            }
            
            const html = await response.text();
            const container = document.getElementById(`${componentId}-container`);
            
            if (container) {
                container.innerHTML = html;
                container.classList.add('fade-in');
                
                // Initialize component-specific functionality
                this.initializeComponent(componentId, container);
            } else {
                console.warn(`Container not found for component: ${componentId}`);
            }
        } catch (error) {
            console.error(`Error loading component ${componentId}:`, error);
            this.showError(componentId);
        }
    }

    initializeComponent(componentId, container) {
        switch(componentId) {
            case 'navbar':
                this.initNavbar(container);
                break;
            case 'hero':
                this.initHero(container);
                break;
            case 'courses':
                this.initCourseCards(container);
                break;
            case 'testimonials':
                this.initTestimonials(container);
                break;
        }
    }

    initNavbar(container) {
        // Find mobile menu elements
        const mobileMenuToggle = container.querySelector('#mobile-menu-toggle');
        const mobileMenu = container.querySelector('#mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            // Toggle mobile menu on button click
            mobileMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu(mobileMenu, mobileMenuToggle);
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isMobileMenuOpen && 
                    !mobileMenu.contains(e.target) && 
                    !mobileMenuToggle.contains(e.target)) {
                    this.closeMobileMenu(mobileMenu, mobileMenuToggle);
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isMobileMenuOpen) {
                    this.closeMobileMenu(mobileMenu, mobileMenuToggle);
                }
            });
            
            // Close menu when clicking on mobile menu links
            const mobileLinks = mobileMenu.querySelectorAll('a, button');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu(mobileMenu, mobileMenuToggle);
                });
            });
        }
        
        // Hide "Start Learning" button in main navbar (show only in mobile menu)
        const startLearningBtn = container.querySelector('.start-learning-btn');
        if (startLearningBtn) {
            startLearningBtn.classList.add('hidden');
        }
        
        console.log('Navbar initialized with mobile menu support');
    }

    toggleMobileMenu(mobileMenu, toggleButton) {
        if (!mobileMenu || !toggleButton) return;
        
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu(mobileMenu, toggleButton);
        } else {
            this.openMobileMenu(mobileMenu, toggleButton);
        }
    }

    openMobileMenu(mobileMenu, toggleButton) {
        // Show menu
        mobileMenu.classList.remove('hidden');
        
        // Add animation class
        setTimeout(() => {
            mobileMenu.classList.add('mobile-menu-open');
        }, 10);
        
        // Update toggle button
        const icon = toggleButton.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = 'close';
        }
        
        // Update state
        this.isMobileMenuOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log('Mobile menu opened');
    }

    closeMobileMenu(mobileMenu, toggleButton) {
        // Remove animation class
        mobileMenu.classList.remove('mobile-menu-open');

         // Reset links for next open
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
        link.style.transitionDelay = '0s';
    });
        
        // Update toggle button
        const icon = toggleButton.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = 'menu';
        }
        
        // Update state
        this.isMobileMenuOpen = false;
        
        // Allow body scroll
        document.body.style.overflow = '';
        
        // Hide menu after animation
        setTimeout(() => {
            if (!this.isMobileMenuOpen) {
                mobileMenu.classList.add('hidden');
            }
        }, 10);
        
        console.log('Mobile menu closed');
    }

    initHero(container) {
        // Check if "Start Learning" button exists in hero section and hide it
        const heroButtons = container.querySelectorAll('button');
        heroButtons.forEach(button => {
            const buttonText = button.textContent.toLowerCase();
            if (buttonText.includes('start learning') || buttonText.includes('get started')) {
                button.classList.add('hidden');
                console.log('Hidden "Start Learning" button in hero section');
            }
        });
    }

    initCourseCards(container) {
        const courseCards = container.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    console.log('Course card clicked');
                    // Add course card click logic
                }
            });
        });
    }

    initTestimonials(container) {
        // Initialize any testimonial-specific functionality
        const testimonialCards = container.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => {
            card.classList.add('hover-lift');
        });
    }

    initializeGlobalEvents() {
        // Add any global event listeners here
        console.log('Global events initialized');
    }

    async initTestimonials(container) {
    const testimonialContainer = container.querySelector('#testimonials-container');
    const navContainer = container.querySelector('#testimonial-nav');

    if (!testimonialContainer) return;

    try {
        // Fetch testimonials JSON
        const response = await fetch('js/data/testimonials.json');
        console.log('Fetching testimonials JSON...', response);
        if (!response.ok) throw new Error('Failed to fetch testimonials');

        const testimonials = await response.json();

        // Clear loading placeholder
        testimonialContainer.innerHTML = '';

        // Create testimonial cards
        testimonials.forEach((t, index) => {
            const card = document.createElement('div');
            card.className = `testimonial-card p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-soft ${index === 0 ? '' : 'hidden'}`;
            card.innerHTML = `
                <p class="text-gray-700 dark:text-gray-200 mb-4">"${t.text}"</p>
                <h4 class="font-bold">${t.author}</h4>
                <span class="text-sm text-gray-500">${t.role}</span>
            `;
            testimonialContainer.appendChild(card);

            // Create nav dots
            if (navContainer) {
                const dot = document.createElement('button');
                dot.className = 'mx-1 w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600';
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                });
                navContainer.appendChild(dot);
            }
        });

        const cards = Array.from(testimonialContainer.querySelectorAll('.testimonial-card'));
        let currentIndex = 0;

        const showTestimonial = (index) => {
            cards.forEach((card, i) => card.classList.toggle('hidden', i !== index));
            currentIndex = index;
        };

        // Auto-slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            showTestimonial(currentIndex);
        }, 5000);

        console.log('Testimonials loaded from JSON successfully');
    } catch (error) {
        console.error('Error loading testimonials:', error);
        testimonialContainer.innerHTML = `
            <div class="col-span-full text-center py-8 text-gray-500">
                <span class="material-symbols-outlined text-4xl mb-4">error</span>
                <p>Failed to load testimonials.</p>
            </div>
        `;
    }
}

    showError(componentId) {
        const container = document.getElementById(`${componentId}-container`);
        if (container) {
            container.innerHTML = `
                <div class="p-8 text-center text-gray-500">
                    <span class="material-symbols-outlined text-4xl mb-4">error</span>
                    <p>Failed to load ${componentId}. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Initialize loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    window.componentLoader = loader; // Make accessible for debugging
    loader.loadAllComponents();
});