// Main application logic
class CourseCatalogApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initSearch();
        this.initSorting();
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('button.sm\\:hidden');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Level filter dropdown
        const levelFilter = document.getElementById('level-filter');
        if (levelFilter) {
            levelFilter.addEventListener('click', () => {
                this.showLevelFilter();
            });
        }
        
        // Subject filter dropdown
        const subjectFilter = document.getElementById('subject-filter');
        if (subjectFilter) {
            subjectFilter.addEventListener('click', () => {
                this.showSubjectFilter();
            });
        }
        
        // Sort filter
        const sortFilter = document.getElementById('sort-filter');
        if (sortFilter) {
            sortFilter.addEventListener('click', () => {
                this.showSortOptions();
            });
        }
    }

    initSearch() {
        const searchInput = document.querySelector('input[placeholder="Search courses..."]');
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                
                searchTimeout = setTimeout(() => {
                    const searchTerm = e.target.value.trim();
                    if (searchTerm.length > 2) {
                        this.performSearch(searchTerm);
                    } else if (searchTerm.length === 0) {
                        this.clearSearch();
                    }
                }, 300);
            });
        }
    }

    initSorting() {
        // Initialize sorting options
        this.currentSort = 'popular';
    }

    performSearch(searchTerm) {
        console.log(`Searching for: ${searchTerm}`);
        // In a real app, this would filter courses based on search term
        alert(`Search functionality would filter courses for: "${searchTerm}"\n\nThis is a demo - in a real app, courses would be filtered dynamically.`);
    }

    clearSearch() {
        console.log('Clearing search');
        // Reset to show all courses
    }

    toggleMobileMenu() {
        alert('Mobile menu would open here');
        // Implement mobile menu toggle
    }

    showLevelFilter() {
        const levels = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3', 'All Levels'];
        this.showFilterDropdown('level-filter', 'Select Level', levels, (selected) => {
            console.log(`Selected level: ${selected}`);
            // In real app, filter courses by level
        });
    }

    showSubjectFilter() {
        const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'All Subjects'];
        this.showFilterDropdown('subject-filter', 'Select Subject', subjects, (selected) => {
            console.log(`Selected subject: ${selected}`);
            // In real app, filter courses by subject
        });
    }

    showSortOptions() {
        const sortOptions = [
            { value: 'popular', label: 'Popular' },
            { value: 'newest', label: 'Newest' },
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'rating', label: 'Highest Rated' }
        ];
        
        this.showFilterDropdown('sort-filter', 'Sort by', sortOptions.map(opt => opt.label), (selected) => {
            const selectedOption = sortOptions.find(opt => opt.label === selected);
            if (selectedOption) {
                this.currentSort = selectedOption.value;
                const sortText = document.getElementById('sort-text');
                if (sortText) {
                    sortText.textContent = selected;
                }
                this.sortCourses(selectedOption.value);
            }
        });
    }

    showFilterDropdown(buttonId, title, options, callback) {
        // Remove existing dropdown
        const existingDropdown = document.querySelector('.filter-dropdown-menu');
        if (existingDropdown) {
            existingDropdown.remove();
        }
        
        const button = document.getElementById(buttonId);
        if (!button) return;
        
        const rect = button.getBoundingClientRect();
        
        const dropdown = document.createElement('div');
        dropdown.className = 'filter-dropdown-menu fixed z-50 bg-white rounded-lg shadow-lg border border-[#e5e7eb] min-w-[200px]';
        dropdown.style.top = `${rect.bottom + window.scrollY + 4}px`;
        dropdown.style.left = `${rect.left + window.scrollX}px`;
        
        dropdown.innerHTML = `
            <div class="p-2 border-b border-[#f0f2f4]">
                <p class="text-xs text-[#616f89] font-medium">${title}</p>
            </div>
            <div class="py-1">
                ${options.map(option => `
                    <div class="filter-option px-3 py-2 hover:bg-[#f0f2f4] cursor-pointer text-sm text-[#111318]">
                        ${option}
                    </div>
                `).join('')}
            </div>
        `;
        
        document.body.appendChild(dropdown);
        
        // Add click handlers
        dropdown.querySelectorAll('.filter-option').forEach((option, index) => {
            option.addEventListener('click', () => {
                const selected = options[index];
                callback(selected);
                dropdown.remove();
            });
        });
        
        // Close dropdown when clicking outside
        const closeDropdown = (e) => {
            if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeDropdown);
        }, 10);
    }

    sortCourses(sortType) {
        console.log(`Sorting courses by: ${sortType}`);
        // In a real app, this would sort the courses array
        // For now, we'll show a notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 p-3 bg-primary text-white rounded-lg shadow-lg z-50';
        notification.textContent = `Courses sorted by ${this.getSortLabel(sortType)}`;
        notification.style.animation = 'fadeIn 0.3s, fadeOut 0.3s 2s';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2300);
    }

    getSortLabel(sortType) {
        const labels = {
            'popular': 'Popular',
            'newest': 'Newest',
            'price-low': 'Price: Low to High',
            'price-high': 'Price: High to Low',
            'rating': 'Highest Rated'
        };
        return labels[sortType] || 'Popular';
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CourseCatalogApp();
});