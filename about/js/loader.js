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
        
        this.currentTestimonial = 0;
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
            this.loadServiceCategories();
            this.loadTestimonials();
            
            // Initialize interactions
            this.initializeInteractions();
            this.initializeScrollAnimations();
            this.initializeTheme();
            
            console.log('About Us page components loaded successfully');
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
                container.classList.add('loaded', 'fade-in-up');
            }
            
            return true;
        } catch (error) {
            console.error(`Error loading ${componentId}:`, error);
            this.showComponentError(componentId);
            return false;
        }
    }

    loadServiceCategories() {
        const container = document.getElementById('service-cards-container');
        if (!container) return;
        
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
    }

    loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;
    
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
        // In a real app, this would show a modal or navigate to story page
        alert('Our Story page would open here. This is a demo.');
    }

    showMeetTeam() {
        this.trackEvent('meet_team_clicked');
        // In a real app, this would show a modal or navigate to team page
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new AboutUsLoader();
    window.aboutUsLoader = loader; // For debugging
    loader.loadAllComponents();
});