// Main application logic
class QEFASApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initTheme();
        this.initSmoothScroll();
    }

    bindEvents() {
        // Button click handlers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-primary')) {
                this.handlePrimaryButton(e.target.closest('.btn-primary'));
            }
            
            if (e.target.closest('.course-filter')) {
                this.filterCourses(e.target.closest('.course-filter'));
            }
        });

        // Newsletter form
        const newsletterForm = document.querySelector('footer form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(newsletterForm);
            });
        }
    }

    initTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('qefas-theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }

    initSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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

    handlePrimaryButton(button) {
        const buttonText = button.textContent.trim();
        console.log(`Primary button clicked: ${buttonText}`);
        
        // Track button clicks (in a real app, this would be analytics)
        this.trackEvent('button_click', {
            button_text: buttonText,
            location: button.closest('section')?.id || 'unknown'
        });
    }

    filterCourses(filterButton) {
        const filterValue = filterButton.textContent.trim();
        console.log(`Filtering courses by: ${filterValue}`);
        
        // Update active filter
        document.querySelectorAll('.course-filter').forEach(btn => {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300');
        });
        
        filterButton.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300');
        filterButton.classList.add('bg-primary', 'text-white');
        
        // In a real app, this would filter course cards
        // For now, just show a loading state
        const coursesSection = document.querySelector('#courses-container');
        if (coursesSection) {
            coursesSection.classList.add('opacity-50');
            setTimeout(() => {
                coursesSection.classList.remove('opacity-50');
            }, 300);
        }
    }

    handleNewsletterSubmit(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate API call
        this.showNotification('Subscribing...', 'info');
        
        setTimeout(() => {
            this.showNotification('Thank you for subscribing!', 'success');
            form.reset();
            
            // Track newsletter signup
            this.trackEvent('newsletter_signup', { email: email });
        }, 1000);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined">
                    ${type === 'success' ? 'check_circle' : 
                      type === 'error' ? 'error' : 'info'}
                </span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    trackEvent(eventName, data = {}) {
        // In a real app, this would send to analytics service
        console.log(`Tracking: ${eventName}`, data);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.qefasApp = new QEFASApp();
});


// Replace with your YouTube video ID (the part after "v=" in the URL)
const youtubeVideoId = '_g-dj3Fe8Ng';

function playVideo() {
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const videoContainer = document.getElementById('videoContainer');
    const youtubePlayer = document.getElementById('youtubePlayer');
    
    // Hide thumbnail and show video
    thumbnailContainer.classList.add('hidden');
    videoContainer.classList.remove('hidden');
    
    // Set the YouTube video URL with autoplay
    youtubePlayer.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`;
    
    // Optional: Add a close button functionality
    addCloseButton();
}

function addCloseButton() {
    // Remove any existing close button
    const existingCloseBtn = document.getElementById('closeVideoBtn');
    if (existingCloseBtn) existingCloseBtn.remove();
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.id = 'closeVideoBtn';
    closeBtn.innerHTML = '✕';
    closeBtn.className = 'absolute top-4 right-4 z-50 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center text-xl font-bold transition-colors backdrop-blur-sm';
    closeBtn.onclick = function(e) {
        e.stopPropagation();
        
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        const videoContainer = document.getElementById('videoContainer');
        const youtubePlayer = document.getElementById('youtubePlayer');
        
        // Show thumbnail and hide video
        thumbnailContainer.classList.remove('hidden');
        videoContainer.classList.add('hidden');
        
        // Stop the video
        youtubePlayer.src = '';
        
        // Remove close button
        this.remove();
    };
    
    document.getElementById('videoContainer').appendChild(closeBtn);
}



// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.sm\\:hidden button');
    const mobileMenu = document.createElement('div');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            if (!document.getElementById('mobileMenu')) {
                mobileMenu.id = 'mobileMenu';
                mobileMenu.className = 'fixed top-16 left-0 right-0 bg-white shadow-lg border-t z-50 p-4';
                mobileMenu.innerHTML = `
                    <div class="flex flex-col gap-4">
                        <a class="text-[#111318] text-sm font-medium hover:text-primary transition-colors py-2 border-b border-gray-100" href="/">Home</a>
                        <a class="text-primary text-sm font-bold hover:text-primary transition-colors py-2 border-b border-gray-100" href="/courses.html">Courses</a>
                        <a class="text-[#111318] text-sm font-medium hover:text-primary transition-colors py-2 border-b border-gray-100" href="/exams.html">Exams</a>
                        <a class="text-[#111318] text-sm font-medium hover:text-primary transition-colors py-2 border-b border-gray-100" href="/pricing.html">Pricing</a>
                        <a class="text-[#111318] text-sm font-medium hover:text-primary transition-colors py-2" href="/about.html">About</a>
                        <div class="pt-4 border-t border-gray-200">
                            <button class="w-full py-2 rounded-lg bg-[#f0f2f4] text-[#111318] text-sm font-bold hover:bg-[#e0e2e5] transition-colors mb-2">
                                Log In
                            </button>
                            <button class="w-full py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                                Sign Up
                            </button>
                        </div>
                    </div>
                `;
                document.body.appendChild(mobileMenu);
                
                // Close menu when clicking outside
                document.addEventListener('click', function closeMenu(e) {
                    if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
                        mobileMenu.remove();
                        document.removeEventListener('click', closeMenu);
                    }
                });
            } else {
                // Toggle menu visibility
                if (mobileMenu.style.display === 'none') {
                    mobileMenu.style.display = 'block';
                } else {
                    mobileMenu.style.display = 'none';
                }
            }
        });
    }
    
    // Filter category chips functionality
    const filterChips = document.querySelectorAll('.flex.hide-scrollbar button:not(.group)');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active state from all chips
            filterChips.forEach(c => {
                c.classList.remove('bg-primary', 'text-white');
                c.classList.add('bg-[#f0f2f4]', 'text-[#111318]', 'hover:bg-[#e2e4e8]');
                const icon = c.querySelector('.material-symbols-outlined');
                if (icon) icon.classList.add('hidden');
            });
            
            // Add active state to clicked chip
            this.classList.remove('bg-[#f0f2f4]', 'text-[#111318]', 'hover:bg-[#e2e4e8]');
            this.classList.add('bg-primary', 'text-white');
            const icon = this.querySelector('.material-symbols-outlined');
            if (icon) icon.classList.remove('hidden');
        });
    });
    
    // Sort button functionality
    const sortButton = document.querySelector('.group button:has(.material-symbols-outlined:text-\\[20px\\])');
    if (sortButton) {
        sortButton.addEventListener('click', function() {
            // Create sort dropdown
            const dropdown = document.createElement('div');
            dropdown.className = 'absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 p-2';
            dropdown.innerHTML = `
                <div class="flex flex-col">
                    <button class="text-left px-3 py-2 text-sm hover:bg-gray-100 rounded" data-sort="popular">Popular</button>
                    <button class="text-left px-3 py-2 text-sm hover:bg-gray-100 rounded" data-sort="newest">Newest</button>
                    <button class="text-left px-3 py-2 text-sm hover:bg-gray-100 rounded" data-sort="price-low">Price: Low to High</button>
                    <button class="text-left px-3 py-2 text-sm hover:bg-gray-100 rounded" data-sort="price-high">Price: High to Low</button>
                    <button class="text-left px-3 py-2 text-sm hover:bg-gray-100 rounded" data-sort="rating">Highest Rated</button>
                </div>
            `;
            
            // Position dropdown
            const rect = sortButton.getBoundingClientRect();
            dropdown.style.position = 'absolute';
            dropdown.style.top = `${rect.bottom + window.scrollY}px`;
            dropdown.style.left = `${rect.right - 192}px`;
            
            document.body.appendChild(dropdown);
            
            // Handle sort selection
            dropdown.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', function() {
                    const sortText = this.textContent;
                    sortButton.querySelector('p').innerHTML = `Sort by: <span class="font-bold">${sortText}</span>`;
                    dropdown.remove();
                });
            });
            
            // Close dropdown when clicking outside
            setTimeout(() => {
                document.addEventListener('click', function closeDropdown(e) {
                    if (!dropdown.contains(e.target) && e.target !== sortButton) {
                        dropdown.remove();
                        document.removeEventListener('click', closeDropdown);
                    }
                });
            }, 100);
        });
    }
});
