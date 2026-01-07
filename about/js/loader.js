// Component loader for About Us page
class AboutUsLoader {
    constructor() {
        this.components = {
            'navbar': 'components/navbar.html',
            'hero': 'components/hero.html',
            'mission-vision': 'components/mission-vision.html',
            'how-it-works': 'components/how-it-works.html',
            'who-we-serve': 'components/who-we-serve.html',
            'testimonials': 'components/testimonials.html',
            'cta': 'components/cta.html',
            'footer': 'components/footer.html'
        };
        
        // Service categories data
        this.serviceCategories = [
            {
                id: 1,
                title: "Junior Secondary",
                description: "Building a strong academic foundation for JSS 1-3 students with engaging, interactive content.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7YyM2ZLOdiE_-rWfwlaVxMARBGdKI_XUf9VbOhFNhWfSbBAfEJeSCRUSr7ytAHmexWnddGijFHMhDJNujRQQ_3JYqMjX8GeuYY2bAdUqCPR0s-0VQk0_vdDRjhL6wVSr_OF1QdYj6M3xGz8R9q7pXEekUE1iFBxKqgq5d8-VVE18gwpC3x6_UhSI--LpwhzBD21XRF5o9jIrDtak4Od_lhsfz0AKajzqviwmtbrGVlWqFJaL6cgEMwN0UiPlIb8McKAU4vP18dWM",
                category: "Students"
            },
            {
                id: 2,
                title: "Senior Secondary",
                description: "Advanced subject mastery for SSS 1-3 students preparing for their final years.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXv9Q0jCMpixCoaIE9YpvdxDgkU_y6Gwu2LcAekd1U_UkWhfApYKcmMOTQFCh-bPXJduiPfI3fKAlgrlEwhPJ4GSwGOt49f3W9EBj6FnJFUbAwSMti5Pvup_2VlmO6XAI7BhNz0J4A-_qbm5Q7-0kJfTDzQVH8vBfrczA5-5GemQlKuU5jCC7PNYajeE_LOq2XxUn6jiEjtnovxz2ANfbH6uRyxQWBh2m--M1_5RqxHcuQO85x3Oqygnl0Ug0rJtn7bGzeeH4Di2Y",
                category: "Students"
            },
            {
                id: 3,
                title: "Exam Candidates",
                description: "Intensive preparation for WAEC, NECO, JAMB, SAT, and TOEFL with past questions.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcp3eE_WiPpA1HSPpTUrCAaJIe0qHzvg-lYvcghY4YoCJrxgVDb6Rx5FBIbkEQE5ZOWSjTcIMXrJlWejlQXqi4rI6iti8Q9Wgit0_CAVbqQFWk2AxEGb2SXA2v2n6ADRF6lGM0f3WJms-We7z5PEOQqGhj_W3NnivMxEBp5uczGFG2dugONFtus4xLF3ldCGTCC_gdv4rOa7L1SIeaPQj9oDfNZ8ic1SfW13R73H7Q8X39KCDsabXo-eWBTdK1KYtX4_iDrEtAliI",
                category: "Students"
            },
            {
                id: 4,
                title: "Parents & Guardians",
                description: "Tools to monitor your child's attendance, test scores, and overall academic progress.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRwpumRQvJY45p5IBlEAWTNL9jff7knINHNJO5FeX-7d1emq_W7_eI3Eats78JicfNap2fCHesChcY8ulC-3LAPi3n4D2XZDW2lNEsL4nQ599NnNYzvewAqpSt0AIkRJDN_AuYOI98XQeTmYEJFadEcbhYHkEx24lt9kRr7yUDBgVGNzG611d2LxJSvrwABHp2wYBO6auF2rHQKD8OFygkwy4EOd_08D0oklXtKBHOqpR00-5lwTxOtqUFYBB3CNM7eWHaMBBqOK8",
                category: "Parents"
            }
        ];
        
        // Testimonials data
        this.testimonials = [
            {
                id: 1,
                quote: "QEFAS has been a lifesaver for my son's JAMB preparation. The practice tests are exactly like the real thing, and his scores have improved drastically.",
                name: "Mrs. Adebayo",
                role: "Parent",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtakPhwZUpzOyTCmuXozp9QhdW9VOkFYhrQpgGQPmfCoaQwHOff2qJXtdmpRHExmXmrpF-Vp3GY5vw8DDbNrW0mHDsPnTM42P-3USzabMfEGvxWxgpEZvfyXSO39ffL0ozbRr2vbiMI_f0U7TArVAOwiLetZS_2ufv6v4RaQ8TdDrtmC4BqjD84GAGxbE9dWCCHUBOEV5ebjwhjX2pYjqzriW1xl5DETJYugA6DFqaXAGNtf6CC5LlrtVrMilPbTgBXhLDmsVljbc"
            },
            {
                id: 2,
                quote: "The video lessons make difficult topics in Physics and Chemistry so easy to understand. I feel much more confident for my WAEC exams now.",
                name: "Chinedu O.",
                role: "SSS 3 Student",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA8VdN6U2O8e15hqZblykvAGCkqDOH0Vd2tztyXT6qUFGefe8cPxsEH3_XgmJW4-LINrfrWNaJ_-mKNBe7nEWMnxFZePF0iIV2frMd3KY2TtnC79XKw2uCtl65HoDPudK3N_NwvRimcdxbumxy6X9yoRITKpdSxbC3Voqv01a5xZuwi7FJWikBAGugxol409wj9VT4X2cJFySIA2qgJVTFTQDLV2memq9ISOA3p1NzDPJ2h5u7ranVdtVNj03-En9CBhd7Cw1WGGk"
            },
            {
                id: 3,
                quote: "As a working dad, I love that I can track my daughter's progress from my phone. It's affordable and effective. Highly recommended.",
                name: "Mr. Okon",
                role: "Parent",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmCqLo4CMPIjCPDURbIQbzLHVGcyaIg60_bFOmM-MssoTlkSytlMR-u_M6WLyry2yv1XFBn6rnQZTbylSTqa-afwjwnTTFn-RrFTbDBDI0msN_SjwDWgv1HN5QJD3jqHX5zBH4B-rJt-jdZijXsB2EF3rmn6sTIKfVjlNZ0vraPrB7sIOaSZ6lx8OFXdTfW7DVcmrfsmOUjCBl7x0-VAzN1phNKfi3vNWHVURlZVNfxQ4HD5Z6MHvsBqwMAObwwfCqcvyBWvyX8KA"
            }
        ];
        
        // Mobile navigation properties
        this.isMobileMenuOpen = false;
        this.mobileMenu = null;
        this.mobileMenuToggle = null;
        
        // Other properties
        this.currentTestimonial = 0;
        this.loaded = false;
    }

    async loadAllComponents() {
        try {
            console.log('Starting to load components...');
            
            // Load navbar first (this is crucial for mobile nav)
            await this.loadComponent('navbar', 'components/navbar.html');
            
            // Wait for navbar to be fully parsed and in DOM
            setTimeout(() => {
                this.initializeMobileNav();
            }, 300);
            
            // Load other components
            const otherComponents = Object.entries(this.components).filter(([id]) => id !== 'navbar');
            const otherPromises = otherComponents.map(([id, path]) => 
                this.loadComponent(id, path)
            );
            
            await Promise.all(otherPromises);
            
            // Load dynamic content
            this.loadServiceCategories();
            this.loadTestimonials();
            
            // Initialize interactions
            this.initializeInteractions();
            this.initializeScrollAnimations();
            this.initializeTheme();
            
            console.log('All About Us page components loaded successfully');
            this.loaded = true;
            
        } catch (error) {
            console.error('Error loading components:', error);
            this.showError();
        }
    }

    async loadComponent(componentId, componentPath) {
        try {
            console.log(`Loading component: ${componentId} from ${componentPath}`);
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Failed to load ${componentId}: ${response.status}`);
            
            const html = await response.text();
            const container = document.getElementById(`${componentId}-container`);
            
            if (container) {
                container.innerHTML = html;
                container.classList.add('loaded', 'fade-in-up');
                console.log(`Component ${componentId} loaded successfully`);
                
                // Special handling for navbar
                if (componentId === 'navbar') {
                    console.log('Navbar loaded, waiting for DOM to update...');
                    // Add debug to check what was loaded
                    setTimeout(() => {
                        this.debugNavbarElements();
                    }, 100);
                }
            } else {
                console.warn(`Container not found for component: ${componentId}`);
            }
            
            return true;
        } catch (error) {
            console.error(`Error loading ${componentId}:`, error);
            this.showComponentError(componentId);
            return false;
        }
    }

    // Debug method to check navbar elements
    debugNavbarElements() {
        console.log('=== DEBUG: Checking navbar elements ===');
        const navbarContainer = document.getElementById('navbar-container');
        
        if (navbarContainer) {
            console.log('Navbar container HTML:', navbarContainer.innerHTML);
            
            // Check for toggle button with various selectors
            const toggleSelectors = [
                '#mobile-menu-toggle',
                '[data-mobile-toggle]',
                'button.md\\:hidden',
                'button:has(.material-symbols-outlined)'
            ];
            
            toggleSelectors.forEach(selector => {
                const element = navbarContainer.querySelector(selector);
                if (element) {
                    console.log(`Found with selector "${selector}":`, element);
                }
            });
            
            // Check for mobile menu with various selectors
            const menuSelectors = [
                '#mobile-menu',
                '[data-mobile-menu]',
                '.mobile-menu',
                'div.md\\:hidden'
            ];
            
            menuSelectors.forEach(selector => {
                const element = navbarContainer.querySelector(selector);
                if (element) {
                    console.log(`Found with selector "${selector}":`, element);
                }
            });
        } else {
            console.error('Navbar container not found!');
        }
    }

    // Mobile Navigation Functions - FIXED VERSION
    initializeMobileNav() {
        console.log('Initializing mobile navigation...');
        
        // Try to find elements with multiple attempts
        this.findMobileElements();
        
        if (!this.mobileMenuToggle || !this.mobileMenu) {
            console.log('Mobile nav elements not found, retrying in 200ms...');
            setTimeout(() => {
                this.findMobileElements();
                if (this.mobileMenuToggle && this.mobileMenu) {
                    this.setupMobileNav();
                } else {
                    console.error('Mobile nav elements not found after retry');
                    this.createFallbackMobileNav();
                }
            }, 200);
        } else {
            this.setupMobileNav();
        }
    }

    findMobileElements() {
        // First, look in the entire document
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        
        console.log('Found mobile toggle:', this.mobileMenuToggle);
        console.log('Found mobile menu:', this.mobileMenu);
        
        // If not found by ID, try other selectors
        if (!this.mobileMenuToggle) {
            this.mobileMenuToggle = document.querySelector('[data-mobile-toggle]') || 
                                   document.querySelector('button.md\\:hidden') ||
                                   document.querySelector('button:has(.material-symbols-outlined)');
        }
        
        if (!this.mobileMenu) {
            this.mobileMenu = document.querySelector('[data-mobile-menu]') || 
                             document.querySelector('.mobile-menu') ||
                             document.querySelector('div.md\\:hidden.hidden');
        }
    }

    setupMobileNav() {
        if (!this.mobileMenuToggle || !this.mobileMenu) {
            console.error('Cannot setup mobile nav: elements missing');
            return;
        }
        
        console.log('Setting up mobile navigation...');
        
        // Ensure mobile menu has proper styling
        this.ensureMobileMenuCSS();
        
        // Clear any existing event listeners
        const newToggle = this.mobileMenuToggle.cloneNode(true);
        this.mobileMenuToggle.parentNode.replaceChild(newToggle, this.mobileMenuToggle);
        this.mobileMenuToggle = newToggle;
        
        // Add click event
        this.mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu toggle clicked');
            this.toggleMobileMenu();
        });
        
        // Setup close handlers
        this.setupCloseHandlers();
        
        console.log('✅ Mobile navigation setup complete');
    }

    ensureMobileMenuCSS() {
        // Add inline styles if not already present
        if (!document.getElementById('mobile-nav-styles')) {
            const style = document.createElement('style');
            style.id = 'mobile-nav-styles';
            style.textContent = `
                /* Mobile Menu Animation Styles */
                #mobile-menu {
                    max-height: 0;
                    opacity: 0;
                    overflow: hidden;
                    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                                opacity 0.3s ease-out;
                }
                
                #mobile-menu.mobile-menu-open {
                    max-height: 500px !important;
                    opacity: 1 !important;
                }
                
                /* Override Tailwind's hidden class for animation */
                #mobile-menu:not(.hidden) {
                    display: block !important;
                }
                
                /* Body scroll lock */
                body.menu-open {
                    overflow: hidden !important;
                }
                
                /* Menu item animations */
                #mobile-menu a,
                #mobile-menu button {
                    transform: translateY(-10px);
                    opacity: 0;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }
                
                #mobile-menu.mobile-menu-open a,
                #mobile-menu.mobile-menu-open button {
                    transform: translateY(0);
                    opacity: 1;
                }
                
                /* Stagger animations */
                #mobile-menu.mobile-menu-open a:nth-child(1),
                #mobile-menu.mobile-menu-open button:nth-child(1) { transition-delay: 0.1s; }
                #mobile-menu.mobile-menu-open a:nth-child(2),
                #mobile-menu.mobile-menu-open button:nth-child(2) { transition-delay: 0.15s; }
                #mobile-menu.mobile-menu-open a:nth-child(3),
                #mobile-menu.mobile-menu-open button:nth-child(3) { transition-delay: 0.2s; }
                #mobile-menu.mobile-menu-open a:nth-child(4),
                #mobile-menu.mobile-menu-open button:nth-child(4) { transition-delay: 0.25s; }
                #mobile-menu.mobile-menu-open a:nth-child(5),
                #mobile-menu.mobile-menu-open button:nth-child(5) { transition-delay: 0.3s; }
            `;
            document.head.appendChild(style);
            console.log('Added mobile nav CSS styles');
        }
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
        console.log('toggleMobileMenu called, current state:', this.isMobileMenuOpen);
        
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
        console.log('Opening mobile menu...');
        
        // Remove hidden class
        this.mobileMenu.classList.remove('hidden');
        
        // Force reflow to ensure transition works
        this.mobileMenu.offsetHeight;
        
        // Add open class after slight delay
        setTimeout(() => {
            this.mobileMenu.classList.add('mobile-menu-open');
        }, 10);
        
        // Update toggle button icon
        const icon = this.mobileMenuToggle.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = 'close';
            icon.style.transition = 'transform 0.3s ease';
            icon.style.transform = 'rotate(90deg)';
        }
        
        // Update state
        this.isMobileMenuOpen = true;
        
        // Prevent body scroll
        document.body.classList.add('menu-open');
        
        console.log('✅ Mobile menu opened');
    }

    closeMobileMenu() {
        console.log('Closing mobile menu...');
        
        // Remove open class
        this.mobileMenu.classList.remove('mobile-menu-open');
        
        // Update toggle button icon
        const icon = this.mobileMenuToggle.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = 'menu';
            icon.style.transform = 'rotate(0deg)';
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
        
        console.log('✅ Mobile menu closed');
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
        
        // Check if mobile toggle already exists
        let toggle = navElement.querySelector('#mobile-menu-toggle');
        if (!toggle) {
            // Create toggle button
            toggle = document.createElement('button');
            toggle.id = 'mobile-menu-toggle';
            toggle.className = 'md:hidden flex items-center justify-center h-10 w-10 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 text-[#111318] dark:text-gray-300';
            toggle.innerHTML = '<span class="material-symbols-outlined text-xl">menu</span>';
            
            // Find the actions container to insert toggle
            const actionsContainer = navElement.querySelector('.flex.items-center.gap-3');
            if (actionsContainer) {
                actionsContainer.appendChild(toggle);
            }
        }
        
        // Check if mobile menu already exists
        let mobileMenu = navElement.querySelector('#mobile-menu');
        if (!mobileMenu) {
            // Create mobile menu
            mobileMenu = document.createElement('div');
            mobileMenu.id = 'mobile-menu';
            mobileMenu.className = 'md:hidden hidden absolute left-0 right-0 top-16 bg-white dark:bg-[#101622] border-b border-[#f0f2f4] dark:border-gray-800 shadow-lg';
            mobileMenu.innerHTML = `
                <div class="px-4 py-3 space-y-1">
                    <a class="block py-3 px-4 text-[#111318] dark:text-gray-200 text-sm font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" href="/courses/">
                        Courses
                    </a>
                    <a class="block py-3 px-4 text-[#111318] dark:text-gray-200 text-sm font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" href="/features/">
                        Features
                    </a>
                    <a class="block py-3 px-4 text-[#111318] dark:text-gray-200 text-sm font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" href="/about/">
                        About
                    </a>
                    
                    <div class="pt-3 mt-3 border-t border-[#f0f2f4] dark:border-gray-800 space-y-2">
                        <button class="w-full flex items-center justify-center h-10 px-4 text-sm font-bold text-[#111318] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                            Student Login
                        </button>
                        <button class="w-full flex items-center justify-center h-10 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg shadow-sm shadow-primary/30 transition-all">
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
        }
        
        // Update references and setup
        this.mobileMenuToggle = toggle;
        this.mobileMenu = mobileMenu;
        
        // Setup the navigation
        this.setupMobileNav();
        
        console.log('✅ Fallback mobile navigation created');
    }

    // Service Categories Functions
    loadServiceCategories() {
        const container = document.getElementById('service-cards-container');
        if (!container) {
            console.warn('Service cards container not found');
            return;
        }
        
        container.innerHTML = this.serviceCategories.map(category => `
            <div class="service-card group bg-white dark:bg-[#161e2c] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="service-image h-48 overflow-hidden bg-gray-200">
                    <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                         style="background-image: url('${category.image}')">
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="font-bold text-lg mb-2 dark:text-white">${category.title}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${category.description}</p>
                </div>
            </div>
        `).join('');
        
        console.log('Service categories loaded');
    }

    // Testimonials Functions
    loadTestimonials() {
        const container = document.getElementById('testimonials-container');
        if (!container) {
            console.warn('Testimonials container not found');
            return;
        }
        
        container.innerHTML = this.testimonials.map((testimonial, index) => `
            <div class="testimonial-card bg-background-light dark:bg-[#161e2c] p-8 rounded-2xl relative ${index === 0 ? 'active' : 'hidden'}" data-index="${index}">
                <span class="material-symbols-outlined text-4xl text-primary/20 absolute top-6 left-6">format_quote</span>
                <p class="text-gray-700 dark:text-gray-300 mb-6 mt-6 italic relative z-10">
                    ${testimonial.quote}
                </p>
                <div class="flex items-center gap-4">
                    <div class="size-12 rounded-full bg-gray-300 overflow-hidden">
                        <div class="w-full h-full bg-cover bg-center" style="background-image: url('${testimonial.image}')"></div>
                    </div>
                    <div>
                        <h4 class="font-bold text-[#111318] dark:text-white text-sm">${testimonial.name}</h4>
                        <span class="text-xs text-primary font-medium">${testimonial.role}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Initialize dots
        this.initializeTestimonialDots();
        
        console.log('Testimonials loaded');
    }

    initializeTestimonialDots() {
        const dotsContainer = document.getElementById('testimonial-dots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = this.testimonials.map((_, index) => `
            <button class="testimonial-dot w-2 h-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}" data-index="${index}"></button>
        `).join('');
        
        this.initializeTestimonialNavigation();
    }

    initializeTestimonialNavigation() {
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        const dots = document.querySelectorAll('.testimonial-dot');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.showTestimonial(this.currentTestimonial - 1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.showTestimonial(this.currentTestimonial + 1));
        }
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                this.showTestimonial(index);
            });
        });
        
        // Auto-rotate testimonials
        this.startTestimonialAutoRotate();
    }

    showTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dot');
        
        // Handle wrap-around
        if (index < 0) index = this.testimonials.length - 1;
        if (index >= this.testimonials.length) index = 0;
        
        // Update current testimonial
        this.currentTestimonial = index;
        
        // Update visibility
        testimonials.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
                card.classList.remove('hidden');
            } else {
                card.classList.remove('active');
                card.classList.add('hidden');
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-primary', i === index);
            dot.classList.toggle('bg-gray-300', i !== index);
            dot.classList.toggle('dark:bg-gray-700', i !== index);
        });
    }

    startTestimonialAutoRotate() {
        setInterval(() => {
            this.showTestimonial(this.currentTestimonial + 1);
        }, 5000); // Rotate every 5 seconds
    }

    initializeInteractions() {
        // Navigation buttons
        const loginBtn = document.getElementById('login-btn');
        const getStartedBtn = document.getElementById('get-started-btn');
        const ourStoryBtn = document.getElementById('our-story-btn');
        const meetTeamBtn = document.getElementById('meet-team-btn');
        const startTrialBtn = document.getElementById('start-trial-btn');
        const browseCoursesBtn = document.getElementById('browse-courses-btn');
        
        // Add event listeners
        if (loginBtn) loginBtn.addEventListener('click', () => this.handleLogin());
        if (getStartedBtn) getStartedBtn.addEventListener('click', () => this.handleGetStarted());
        if (ourStoryBtn) ourStoryBtn.addEventListener('click', () => this.showOurStory());
        if (meetTeamBtn) meetTeamBtn.addEventListener('click', () => this.showMeetTeam());
        if (startTrialBtn) startTrialBtn.addEventListener('click', () => this.startTrial());
        if (browseCoursesBtn) browseCoursesBtn.addEventListener('click', () => this.browseCourses());
        
        // Service card clicks
        document.addEventListener('click', (e) => {
            const serviceCard = e.target.closest('.service-card');
            if (serviceCard) {
                const title = serviceCard.querySelector('h3')?.textContent;
                this.trackServiceClick(title);
            }
        });
        
        console.log('Interactions initialized');
    }

    initializeScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate process steps sequentially
                    if (entry.target.id === 'how-it-works-section') {
                        this.animateProcessSteps();
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all sections
        document.querySelectorAll('section').forEach(section => observer.observe(section));
        
        // Observe process steps
        document.querySelectorAll('.process-step').forEach(step => observer.observe(step));
        
        // Observe service cards
        document.querySelectorAll('.service-card').forEach(card => observer.observe(card));
        
        console.log('Scroll animations initialized');
    }

    animateProcessSteps() {
        const steps = document.querySelectorAll('.process-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('visible');
            }, index * 200); // Stagger animation
        });
    }

    initializeTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('qefas-theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        
        console.log('Theme initialized');
    }

    handleLogin() {
        this.trackEvent('login_clicked', { page: 'about' });
        window.location.href = '/login';
    }

    handleGetStarted() {
        this.trackEvent('get_started_clicked', { page: 'about' });
        window.location.href = '/signup';
    }

    showOurStory() {
        this.trackEvent('our_story_clicked');
        alert('Our Story page would open here. This is a demo.');
    }

    showMeetTeam() {
        this.trackEvent('meet_team_clicked');
        alert('Meet the Team page would open here. This is a demo.');
    }

    startTrial() {
        this.trackEvent('start_trial_clicked', { page: 'about_cta' });
        window.location.href = '/signup?source=about_page_trial';
    }

    browseCourses() {
        this.trackEvent('browse_courses_clicked', { page: 'about_cta' });
        window.location.href = '/courses';
    }

    trackServiceClick(serviceName) {
        this.trackEvent('service_card_clicked', { service: serviceName });
        // Navigate to relevant page based on service
        if (serviceName.includes('Junior') || serviceName.includes('Senior')) {
            window.location.href = `/courses?category=${serviceName.toLowerCase().replace(' ', '-')}`;
        } else if (serviceName.includes('Exam')) {
            window.location.href = '/exams';
        } else if (serviceName.includes('Parents')) {
            window.location.href = '/parents';
        }
    }

    trackEvent(eventName, data = {}) {
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
                <div class="min-h-[50vh] flex items-center justify-center">
                    <div class="text-center">
                        <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Unable to Load Page</h2>
                        <p class="text-slate-600 dark:text-slate-400 mb-6">There was an error loading the About Us page.</p>
                        <button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors" onclick="location.reload()">
                            Reload Page
                        </button>
                    </div>
                </div>
            `;
        }
    }

    init() {
        this.bindThemeToggle();
        this.bindSmoothScroll();
        this.bindMissionVisionAnimation();
        this.bindProcessStepHover();
        this.initializeAnalytics();
    }

    bindThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                const isDark = document.documentElement.classList.contains('dark');
                localStorage.setItem('qefas-theme', isDark ? 'dark' : 'light');
            });
        }
    }

    bindSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    bindMissionVisionAnimation() {
        const cards = document.querySelectorAll('.mission-vision-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-effect');
            });
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-effect');
            });
        });
    }

    bindProcessStepHover() {
        const steps = document.querySelectorAll('.process-step');
        steps.forEach(step => {
            step.addEventListener('mouseenter', () => {
                step.classList.add('hover-scale');
            });
            step.addEventListener('mouseleave', () => {
                step.classList.remove('hover-scale');
            });
        });
    }

    initializeAnalytics() {
        console.log('Analytics initialized for About Us page');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing AboutUsLoader...');
    const loader = new AboutUsLoader();
    window.aboutUsLoader = loader; // For debugging
    
    // Add a global debug function
    window.debugMobileNav = function() {
        console.log('=== DEBUG MOBILE NAV ===');
        console.log('Toggle:', document.getElementById('mobile-menu-toggle'));
        console.log('Menu:', document.getElementById('mobile-menu'));
        console.log('Loader state:', loader.isMobileMenuOpen);
        console.log('Loader toggle ref:', loader.mobileMenuToggle);
        console.log('Loader menu ref:', loader.mobileMenu);
        
        // Test toggle manually
        const toggle = document.getElementById('mobile-menu-toggle');
        if (toggle) {
            console.log('Clicking toggle...');
            toggle.click();
        }
    };
    
    loader.loadAllComponents();
});