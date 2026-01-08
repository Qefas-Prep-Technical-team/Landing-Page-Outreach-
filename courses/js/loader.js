// component-loader.js - Refactored version
class ComponentLoader {
    constructor() {
        this.components = {
            'navbar': 'components/navbar.html',
            'hero': 'components/hero.html',
            'filters': 'components/filters.html',
            'course-grid': 'components/course-grid.html',
            'value-proposition': 'components/value-proposition.html',
            'footer': 'components/footer.html'
        };
        
        // Course data properties
        this.courses = [];
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.coursesPerPage = 8;
        this.allCourses = [];
        
        // Mobile menu instance (will be initialized after navbar loads)
        this.mobileMenu = null;
    }

    async loadAllComponents() {
        try {
            // Load static components
            await Promise.all([
                this.loadComponent('navbar', 'components/navbar.html'),
                this.loadComponent('hero', 'components/hero.html'),
                this.loadComponent('filters', 'components/filters.html'),
                this.loadComponent('course-grid', 'components/course-grid.html'),
                this.loadComponent('value-proposition', 'components/value-proposition.html'),
                this.loadComponent('footer', 'components/footer.html')
            ]);
            
            // Initialize mobile menu AFTER navbar is loaded
            this.initializeMobileMenu();
            
            // Load course data
            await this.loadCourseData();
            
            // Initialize course filtering
            this.initializeFiltering();
            
            console.log('All components loaded successfully');
        } catch (error) {
            console.error('Error loading components:', error);
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
            }
        } catch (error) {
            console.error(`Error loading ${componentId}:`, error);
            this.showError(componentId);
        }
    }

    // Mobile Menu Initialization
    initializeMobileMenu() {
        // Wait for DOM to be ready after navbar load
        setTimeout(() => {
            try {
                this.mobileMenu = new MobileMenu();
                console.log('Mobile menu initialized');
            } catch (error) {
                console.error('Failed to initialize mobile menu:', error);
            }
        }, 100); // Small delay to ensure navbar HTML is fully rendered
    }

    // Course Data Functions
    async loadCourseData() {
        try {
            this.allCourses = [
                {
                    id: 1,
                    title: "SSS1 Course (self-paced class)",
                    category: "senior-secondary",
                    level: "SSS 1",
                    subject: "Mathematics,Government, Economics, Biology, Physics, Chemistry, English, Literature",
                    rating: 4.8,
                    reviewCount: 120,
                    lessons: 24,
                    duration: "24hrs + 12 Weeks",
                    price: 1500,
                    originalPrice: 5000,
                    image: "../../images/Self-paced-SSS1-Course (1).webp",
                    badge: "Senior Secondary",
                    badgeColor: "text-purple-600",
                    description: "This course contains SSS1 courses such as Mathematics, English, Chemistry, etc."
                },
                {
                    id: 2,
                    title: "SSS2 Course (self-paced class)",
                    category: "senior-secondary",
                    level: "SSS 2",
                    subject: "Mathematics,Government, Economics, Biology, Physics, Chemistry, English, Literature",
                    rating: 4.9,
                    reviewCount: 342,
                    lessons: 40,
                    duration: "24hrs + 12 Weeks",
                    price: 1500,
                    originalPrice: 5000,
                    image: "../../images/sss2.webp",
                    badge: "Senior Secondary",
                    badgeColor: "text-purple-600",
                    description: "This course contains SSS2 courses such as Mathematics, English, Chemistry, etc."
                },
                {
                    id: 3,
                    title: "SSS3 Course (self-paced class)",
                    category: "senior-secondary",
                    level: "SSS 3",
                    subject: "Mathematics,Government, Economics, Biology, Physics, Chemistry, English, Literature",
                    rating: 4.7,
                    reviewCount: 85,
                    lessons: 18,
                    duration: "24hrs + 12 Weeks",
                    price: 1500,
                    originalPrice: 5000,
                    image: "../../images/sss3.webp",
                    badge: "Senior Secondary",
                    badgeColor: "text-purple-600",
                    description: "This course contains SSS3 courses such as Mathematics, English, Chemistry, etc."
                },
                {
                    id: 4,
                    title: "GCE Science (self-paced class)",
                    category: "gce",
                    level: "Gce",
                    subject: "Mathematics,Government, Economics, Biology, Physics, Chemistry, English, Literature",
                    rating: 5.0,
                    reviewCount: 50,
                    lessons: 50,
                    duration: "20hrs",
                    price: 5000,
                    originalPrice: 10000,
                    image: "../../images/gce-engineering-self-paced.webp",
                    badge: "Gce",
                    badgeColor: "text-orange-600",
                    description: "Boost your GCE Commercial exam readiness with our dynamic live-online classes, designed for your convenience and flexibility. Our comprehensive curriculum covers vital subjects like English, Mathematics, Physics, Chemistry, Biology and Economics, all accessible from the comfort of your home. Tailor your learning experience to fit your schedule by engaging with the material at your own pace. This blend of interactive education and personalization ensures you can effectively prepare for your exams, no matter where you are or what time suits you best."
                },
                {
                    id: 5,
                    title: "GCE Arts (self-paced class)",
                    category: "gce",
                    level: "Gce",
                    subject: "Mathematics,Government, Economics, Biology, Physics, Chemistry, English, Literature",
                    rating: 4.6,
                    reviewCount: 210,
                    lessons: 15,
                    duration: "8hrs",
                    price: 6000,
                    originalPrice: null,
                    image: "../../images/gce-arts-self-paced.webp",
                    badge: "GCE",
                    badgeColor: "text-cyan-600",
                    description: "Optimize your GCE Arts exam preparation with our self-paced class, covering key subjects like English, Literature, Economics, and CRS. This flexible learning approach allows you to study at your own pace, fitting seamlessly into your schedule. While this course operates without direct instructor supervision, it is meticulously designed to ensure comprehensive coverage and understanding of each subject, empowering you to excel in your GCE exams"
                },
                {
                    id: 6,
                    title: "GCE Commercial (self-paced)",
                    category: "gce",
                    level: "Gce",
                    subject: "Mathematics,Government, Economics, Biology, Physics, Chemistry, English, Literature",
                    rating: 4.5,
                    reviewCount: 90,
                    lessons: 22,
                    duration: "7hrs",
                    price: 5000,
                    originalPrice: 10000,
                    image: "../../images/utme-commercial-self-paced.webp",
                    badge: "GCE",
                    badgeColor: "text-rose-600",
                    description: "Boost your GCE Commercial exam readiness with our dynamic live-online classes, designed for your convenience and flexibility. Our comprehensive curriculum covers vital subjects like English, Mathematics, Economics, and Commerce, all accessible from the comfort of your home. Tailor your learning experience to fit your schedule by engaging with the material at your own pace. This blend of interactive education and personalization ensures you can effectively prepare for your exams, no matter where you are or what time suits you best."
                },
                {
                    id: 7,
                    title: "UTME Engineering (self-paced)",
                    category: "utme",
                    level: "utme",
                    subject: "Mathematics,Government, Economics, Biology, Physics, Chemistry, English, Literature",
                    rating: 4.9,
                    reviewCount: 510,
                    lessons: 10,
                    duration: "4hrs",
                    price: 5000,
                    originalPrice: 10000,
                    image: "../../images/utme-engineering-self-paced.webp",
                    badge: "UTME",
                    badgeColor: "text-violet-600",
                    description: "Boost your UTME Engineering exam readiness with our dynamic live-online classes, designed for your convenience and flexibility. Our comprehensive curriculum covers vital subjects like English, Mathematics, Physics, and Chemistry, all accessible from the comfort of your home. Tailor your learning experience to fit your schedule by engaging with the material at your own pace. This blend of interactive education and personalization ensures you can effectively prepare for your exams, no matter where you are or what time suits you best."
                },
                {
                    id: 8,
                    title: "UTME Art (self-paced)",
                    category: "utme",
                    level: "utme",
                    subject: "Mathematics,Government, Economics, Biology, Physics, Chemistry, English, Literature",
                    rating: 4.9,
                    reviewCount: 510,
                    lessons: 10,
                    duration: "4hrs",
                    price: 5000,
                    originalPrice: 10000,
                    image: "../../images/utme-arts-self-paced.webp",
                    badge: "UTME",
                    badgeColor: "text-violet-600",
                    description: "Boost your UTME Arts exam readiness with our dynamic self-paced classes, designed for your convenience and flexibility. Our comprehensive curriculum covers vital subjects like English, Literature, CRK, and Government, all accessible from the comfort of your home. Tailor your learning experience to fit your schedule by engaging with the material at your own pace. This blend of interactive education and personalization ensures you can effectively prepare for your exams, no matter where you are or what time suits you best."
                },
                {
                    id: 9,
                    title: "UTME Medical (self-paced class)",
                    category: "utme",
                    level: "utme",
                    subject: "Mathematics,Government, Economics, Biology, Physics, Chemistry, English, Literature",
                    rating: 4.9,
                    reviewCount: 510,
                    lessons: 10,
                    duration: "4hrs",
                    price: 5000,
                    originalPrice: 10000,
                    image: "../../images/utme-medical-science-self-paced.webp",
                    badge: "UTME",
                    badgeColor: "text-violet-600",
                    description: "Boost your UTME Medical Science exam readiness with our dynamic self-paced classes, designed for your convenience and flexibility. Our comprehensive curriculum covers vital subjects like English, Physics, Chemistry, and Biology all accessible from the comfort of your home. Tailor your learning experience to fit your schedule by engaging with the material at your own pace. This blend of interactive education and personalization ensures you can effectively prepare for your exams, no matter where you are or what time suits you best."
                },
            ];
            
            // Initial render
            this.renderCourses();
            
        } catch (error) {
            console.error('Error loading course data:', error);
            this.showCourseError();
        }
    }

    initializeFiltering() {
        const categoryButtons = document.querySelectorAll('.category-filter');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.add('bg-[#f0f2f4]', 'text-[#111318]');
                    btn.classList.remove('bg-primary', 'text-white');
                });
                
                button.classList.add('active');
                button.classList.remove('bg-[#f0f2f4]', 'text-[#111318]');
                button.classList.add('bg-primary', 'text-white');
                
                // Update category
                this.currentCategory = button.dataset.category;
                this.currentPage = 1;
                
                // Filter and render courses
                this.renderCourses();
                
                // Show category in console for debugging
                console.log(`Filtered by category: ${this.currentCategory}`);
            });
        });
        
        // Initialize load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.renderCourses(true);
            });
        }
    }

    getFilteredCourses() {
        if (this.currentCategory === 'all') {
            return this.allCourses;
        }
        
        return this.allCourses.filter(course => course.category === this.currentCategory);
    }

    renderCourses(append = false) {
        const container = document.getElementById('courses-container');
        if (!container) return;
        
        const filteredCourses = this.getFilteredCourses();
        const startIndex = 0;
        const endIndex = filteredCourses.length;
        const coursesToShow = filteredCourses.slice(startIndex, endIndex);
        
        if (!append) {
            // Clear container for new filter
            container.innerHTML = '';
        }
        
        if (coursesToShow.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <span class="material-symbols-outlined text-4xl text-gray-400 mb-4">search_off</span>
                    <h3 class="text-lg font-bold text-gray-600 mb-2">No courses found</h3>
                    <p class="text-gray-500">No courses available for this category. Try another filter.</p>
                </div>
            `;
            return;
        }
        
        // Generate course cards
        coursesToShow.forEach((course, index) => {
            const courseCard = this.createCourseCard(course);
            courseCard.style.animationDelay = `${index * 0.05}s`;
            container.appendChild(courseCard);
        });
        
        // Update load more button visibility
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            if (endIndex >= filteredCourses.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'flex';
            }
        }
        
        // Show count
        this.updateCourseCount(filteredCourses.length);
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'group flex flex-col bg-white rounded-xl overflow-hidden border border-[#e5e7eb] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 course-fade-in';
        card.innerHTML = `
            <div class="relative w-full aspect-video bg-gray-200">
                <div class="w-full h-full bg-cover bg-center" 
                     style="background-image: url('${course.image}')"></div>
                <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold ${course.badgeColor} uppercase tracking-wider">
                    ${course.badge}
                </div>
            </div>
            <div class="flex flex-col flex-1 p-4 gap-3">
                <div class="flex items-center gap-1 text-[#F59E0B]">
                    <span class="material-symbols-outlined text-[16px] fill-current">star</span>
                    <span class="text-xs font-bold text-[#111318] mt-0.5">${course.rating.toFixed(1)}</span>
                    <span class="text-xs text-[#616f89] mt-0.5">(${course.reviewCount})</span>
                </div>
                <h3 class="text-[#111318] text-lg font-bold leading-tight line-clamp-2 min-h-[3rem]">
                    ${course.title}
                </h3>
                <div class="flex items-center gap-2 text-xs text-[#616f89] mb-1">
                    <span class="material-symbols-outlined text-[16px]">school</span>
                    <span>${course.lessons} Lessons</span>
                    <span class="w-1 h-1 rounded-full bg-[#616f89]"></span>
                    <span>${course.duration}</span>
                </div>
                <div class="mt-auto pt-3 border-t border-[#f0f2f4] flex items-center justify-between">
                    <div class="flex flex-col">
                        <span class="text-lg font-bold text-[#111318]">₦${course.price.toLocaleString()}</span>
                        ${course.originalPrice ? `<span class="text-xs text-[#9aa2b1] line-through">₦${course.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <a class="text-primary text-sm font-bold hover:underline flex items-center" href="#">
                        View <span class="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
                    </a>
                </div>
            </div>
        `;
        
        // Add click handler for viewing details
        const viewLink = card.querySelector('a');
        viewLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.viewCourseDetails(course);
        });
        
        return card;
    }

  viewCourseDetails(course) {
    const phone = '2347063484232'; // QEFAS WhatsApp number

    const message = `
Hello QEFAS 👋
I’m a parent interested in the *${course.title}*.

Class Level: ${course.level}
Category: ${course.badge}
Price: ₦${course.price.toLocaleString()}

Please share full details and enrollment steps.
    `.trim();

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}


    updateCourseCount(count) {
        // Update any course count display if needed
        console.log(`Showing ${count} courses`);
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

    showCourseError() {
        const container = document.getElementById('courses-container');
        if (container) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <span class="material-symbols-outlined text-4xl text-red-400 mb-4">error</span>
                    <h3 class="text-lg font-bold text-gray-600 mb-2">Failed to load courses</h3>
                    <p class="text-gray-500 mb-4">There was an error loading the course data.</p>
                    <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors" onclick="location.reload()">
                        Try Again
                    </button>
                </div>
            `;
        }
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
    const loader = new ComponentLoader();
    window.courseLoader = loader; // Make accessible for debugging
    window.componentLoader = loader; // Alternative global reference
    loader.loadAllComponents();
});