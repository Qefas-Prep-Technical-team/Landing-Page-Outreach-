// Component loader using fetch()
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
        
        this.courses = [];
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.coursesPerPage = 8;
        this.allCourses = [];
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

    async loadCourseData() {
        try {
            // In a real app, this would be an API call
            // For now, we'll use embedded data
            this.allCourses = [
                {
                    id: 1,
                    title: "JSS 1 Mathematics - Full Term 1 Bundle",
                    category: "junior-secondary",
                    level: "JSS 1",
                    subject: "Mathematics",
                    rating: 4.8,
                    reviewCount: 120,
                    lessons: 24,
                    duration: "6hrs 30m",
                    price: 5000,
                    originalPrice: 7000,
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeIXXB2Z3QueVIByiS_jjrFF1wOP0zaMyYgMmjeORoIcu_aueiKRu4cvdOeUekVZZ8JFLrRxf5M2TLGrMq3Ix4cqG9KGetPwGFgxLRnb_9qICGIzyvj48DdL0noqpPKOH_iraS_gTO3HD4VYGWXjHHh8EIMfz1VkHJ1wMLWUyUHJpmXDL97DfUud6x02auzPFH1wli0jZJEUH4DesPZGUFU6fq2drJ0IlAlsioaypkF24KHIU23R7JwJmEkZbZAUkxthp-3pBO-9Y",
                    badge: "Junior Secondary",
                    badgeColor: "text-primary",
                    description: "Complete mathematics curriculum for Junior Secondary School 1"
                },
                {
                    id: 2,
                    title: "Ultimate WAEC Chemistry Comprehensive Prep",
                    category: "entrance-exams",
                    level: "SSS 3",
                    subject: "Chemistry",
                    rating: 4.9,
                    reviewCount: 342,
                    lessons: 40,
                    duration: "12hrs",
                    price: 7500,
                    originalPrice: 10000,
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqT7rPgKo5HzaKve7ej4TCPaxOLv0vCnP9meKTSguDZQlCJ4UGBoYWadjcs3UUnlI4VcUsurzyPBMjiukxjLEdhfiYYb9uz415YdZCi3pGkXDKCm9eZSliv02NupvYoQ1l3EJHBxk0vhwHeze9hfishOPsjUw1JH_KGFQLSgpLo5FIfrOibgPCAdnWJZKG8sATJASaCPXWdorcNX1gaXHrycDi4qJ3RTvY1xca-pcZ_FZHtg9DixloVBU_T8FLcMpgIZmnIwhq5po",
                    badge: "WAEC Prep",
                    badgeColor: "text-green-600",
                    description: "Comprehensive preparation for WAEC Chemistry examination"
                },
                {
                    id: 3,
                    title: "English Language for SSS 2: Oral & Written",
                    category: "senior-secondary",
                    level: "SSS 2",
                    subject: "English",
                    rating: 4.7,
                    reviewCount: 85,
                    lessons: 18,
                    duration: "5hrs",
                    price: 4000,
                    originalPrice: null,
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8jSPJMTOF2HR0xRWLVCjShVx8mHfQ-WFzjuTynOMrq8A5s3RnppFEbck628qD4RIeid7paFmeDll7LJx7yUqo_TvBn15l4TSQ8MAG53vR698_ewz6EEQFWpdLPlaSDlk2DTA5oH_Uyc_olnhzwRJkkM7mKL9A30Pv7v5_7ODItlFkXExpOvkfjoDCGaqqC563CLR2gL-F4tfohbyou6lenvwVBFVQ4P-YDh7jBo0vWND_Pok6YxXiuEN_gjugIQwNTvLfvNpQ3OY",
                    badge: "Senior Secondary",
                    badgeColor: "text-purple-600",
                    description: "Complete oral and written English language course"
                },
                {
                    id: 4,
                    title: "SAT Math Intensive Bootcamp",
                    category: "international",
                    level: "International",
                    subject: "Mathematics",
                    rating: 5.0,
                    reviewCount: 50,
                    lessons: 50,
                    duration: "20hrs",
                    price: 15000,
                    originalPrice: 20000,
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkF8NAoMLulrwTwTLlztRPXny4VIZ3Svle-xdws8Jg1hOgsPzOe4qiDs2Q4FniJm_E-qG_haa84Mq0wv3j4LAq53NeqsYDxnKktsXNo3jrPOlC22C5jrYKu65jtxHAZQ9k1vBfBDL2_fMwvueP0m1pstpgX80ZKz1twYc0yIiHdXJtTpQCzlR-sPOzBbjA6yAkYts9aR-AIluxBqJV4sxRYbIcaLOUWXdnEbWtRcsitZiAMe0cDWuq813xQxvvbcCM5uIW6mBjtHw",
                    badge: "International",
                    badgeColor: "text-orange-600",
                    description: "Intensive SAT Mathematics preparation course"
                },
                {
                    id: 5,
                    title: "JAMB Biology - Crash Course",
                    category: "entrance-exams",
                    level: "SSS 3",
                    subject: "Biology",
                    rating: 4.6,
                    reviewCount: 210,
                    lessons: 15,
                    duration: "8hrs",
                    price: 6000,
                    originalPrice: null,
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDixbPwDqnCvkZ0u-0Cxw7PC7qaVSL0TgGk-jNcLzT1nsSQE7LJJPy5AHJ5aLi_90_2eaZMEE3KIAjXmXxNdwFJfxwI42-njMyIQFp9Mpow5G8wQx3xE_dLQTJQHwRKJW1zsH4ev_RC0HQcUJXjkzMpP0DyOmF_S8Mj6OSMFdt326ZhxEau_tdDYaTAc1l88x-8t_hHo83wB8DOH7r371KG2CMzwQ_FvInuI7WniP8tLqyTLOytF7Ab7kqxgVwuimemY7srtbr6deg",
                    badge: "JAMB Prep",
                    badgeColor: "text-cyan-600",
                    description: "Crash course for JAMB Biology examination"
                },
                {
                    id: 6,
                    title: "SSS 1 Physics: Mechanics & Energy",
                    category: "senior-secondary",
                    level: "SSS 1",
                    subject: "Physics",
                    rating: 4.5,
                    reviewCount: 90,
                    lessons: 22,
                    duration: "7hrs",
                    price: 4200,
                    originalPrice: 5500,
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWZeIaYSuvqs2rqdiTcdRDx37SF9iNcxAX7qsftAyXhZi5XHVjj7O6wZ4SCAyLvv9IIi9ULsQoJW1J6VZKfYZwa_TKXp5LPqhI-eYL2G1FMdpW13bb3HpwUOE9f9P6FeLl7fmqEBO4LPbZlK507gJPfc1yCyzRDWuGaFJc1UIBu0vBDFWhVLiUasKdBiQvR5oLX7jQvgiZ_y329vdA1yHPhi0fLztuCmVvHmHqWTetCbYcZU8JodGCserAgw2Y3nA9DUnFM2nTdw0",
                    badge: "Senior Secondary",
                    badgeColor: "text-rose-600",
                    description: "Physics mechanics and energy concepts for SSS 1"
                },
                {
                    id: 7,
                    title: "IELTS Speaking Masterclass",
                    category: "international",
                    level: "International",
                    subject: "English",
                    rating: 4.9,
                    reviewCount: 510,
                    lessons: 10,
                    duration: "4hrs",
                    price: 10000,
                    originalPrice: null,
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi_Z3icDWFzFJNbExQGabr9fh7G1nl6JtNKyb666lNr1k_SUfV7ewzEII4efS8O5ROkwArouoOKqm3YkZxNWEnsAku5H5PaYcauLukvhO2smJF6Xiq6yKSW5PCnjO6LvwlT_Jw-Tprjg-8wVXQn4UmiYr9Dc5npesYevWSxVdRU_nrcXt7OnwaH6G_QK-gh0Y83u1-_b_wYQc0dvzTDiD9NE00sv9EM5wHb90ykzgssQXj3njb__ZphUU9DllqFEHGE3TM5y4n-T4",
                    badge: "International",
                    badgeColor: "text-violet-600",
                    description: "Masterclass for IELTS Speaking test preparation"
                },
                {
                    id: 8,
                    title: "JSS 3 Basic Science Revision",
                    category: "junior-secondary",
                    level: "JSS 3",
                    subject: "Science",
                    rating: 4.4,
                    reviewCount: 67,
                    lessons: 14,
                    duration: "6hrs",
                    price: 4500,
                    originalPrice: null,
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgRjPoW7FGgpHbo5yaXv1CtbVhTwCCUM0HgQ6C2WqAN1AKcUoVGaoph2TYCAqIovu43Is4mLds6lXUtJq2CmE2pTAX0TVrbuzDQzDF9yZIT_HjX90SHTcWnRsmacc-a9OPcFWZI42TTS7zeYcIo_KlPsRZJUq9USNrYtVzJoKPOHyFBGWZjR5IZwOKrJWdK0lE4CUgH4lIFJ74OvM--ClE4XX7ANIFfDSDBobUDV_UTC_LU59fUZNkuNvsbqUmXbsGX8pzOHcYjrw",
                    badge: "Junior Secondary",
                    badgeColor: "text-cyan-700",
                    description: "Complete Basic Science revision for JSS 3"
                }
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
        const startIndex = 0; // For now, show all filtered courses
        const endIndex = filteredCourses.length; // Show all courses
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
        alert(`Viewing details for: ${course.title}\nCategory: ${course.category}\nPrice: ₦${course.price}`);
        // In a real app, this would navigate to course detail page or show modal
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    window.courseLoader = loader; // Make accessible for debugging
    loader.loadAllComponents();
});