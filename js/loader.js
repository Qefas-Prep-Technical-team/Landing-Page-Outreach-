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
    }

    async loadAllComponents() {
        const loadPromises = Object.entries(this.components).map(([id, path]) => 
            this.loadComponent(id, path)
        );
        
        await Promise.all(loadPromises);
        console.log('All components loaded successfully');
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
                
                // Dispatch event for component-specific initialization
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
            case 'courses':
                this.initCourseCards(container);
                break;
            case 'testimonials':
                this.initTestimonials(container);
                break;
        }
    }

    initNavbar(container) {
        const mobileMenuBtn = container.querySelector('.mobile-menu-toggle');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                alert('Mobile menu would open here');
                // Implement mobile menu toggle logic
            });
        }
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
    loader.loadAllComponents();
});