// ...existing code...
// Main application logic
class CourseCatalogApp {
    constructor() {
        this.currentLevel = null;
        this.currentSort = 'popular';
        this.init();
    }

    init() {
        console.log('CourseCatalogApp initialized');
        this.bindEvents();
    }

    bindEvents() {
        // Level filter dropdown
        const levelFilter = document.getElementById('level-filter');
        console.log('bindEvents: levelFilter present?', !!levelFilter);
        if (levelFilter) {
            levelFilter.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showLevelFilter();
            });
        }

        // Sort filter dropdown
        const sortFilter = document.getElementById('sort-filter');
        console.log('bindEvents: sortFilter present?', !!sortFilter);
        if (sortFilter) {
            sortFilter.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showSortOptions();
            });
        }

        // Category filters
        this.initCategoryFilters();
    }

    initCategoryFilters() {
        const categoryButtons = document.querySelectorAll('.category-filter');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-primary');
                    btn.classList.add('bg-[#f0f2f4]');
                    const text = btn.querySelector('p');
                    const icon = btn.querySelector('.material-symbols-outlined');
                    if (text) text.classList.remove('text-black'), text.classList.add('text-[#111318]');
                    if (icon) icon.style.display = 'none';
                });

                const clickedBtn = e.currentTarget;
                clickedBtn.classList.add('active', 'bg-primary');
                clickedBtn.classList.remove('bg-[#f0f2f4]');
                const text = clickedBtn.querySelector('p');
                const icon = clickedBtn.querySelector('.material-symbols-outlined');
                if (text) text.classList.remove('text-[#111318]'), text.classList.add('text-black');
                if (icon) icon.style.display = 'inline-flex';

                this.currentCategory = clickedBtn.dataset.category;
                this.applyFilters();
            });
        });
    }

    showLevelFilter() {
        const button = document.getElementById('level-filter');
        console.log('showLevelFilter called');
        if (!button) return;

        const existingDropdown = document.querySelector('.filter-dropdown-menu[data-type="level"]');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }

        document.querySelectorAll('.filter-dropdown-menu').forEach(drop => drop.remove());

        const levels = ['All Levels', 'JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'];

        const dropdown = document.createElement('div');
        dropdown.className = 'filter-dropdown-menu fixed z-50 bg-white rounded-lg shadow-lg border border-[#e5e7eb] min-w-[160px] max-h-80 overflow-y-auto';
        dropdown.dataset.type = 'level';

        const rect = button.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom + 4}px`; 
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.zIndex = '99999';

        dropdown.innerHTML = `
            <div class="p-2 border-b border-[#f0f2f4]">
                <p class="text-xs text-[#616f89] font-medium">Select Level</p>
            </div>
            <div class="py-1">
                ${levels.map(level => `
                    <div class="filter-option px-3 py-2 hover:bg-[#f0f2f4] cursor-pointer text-sm text-[#111318] transition-colors ${this.currentLevel === level || (level === 'All Levels' && !this.currentLevel) ? 'bg-[#f0f2f4] text-primary' : ''}">
                        ${level}
                    </div>
                `).join('')}
            </div>
        `;

        document.body.appendChild(dropdown);

        dropdown.querySelectorAll('.filter-option').forEach((option, index) => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleLevelSelection(levels[index], button);
                dropdown.remove();
            });
        });

        const closeDropdown = (e) => {
            if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        };
        setTimeout(() => document.addEventListener('click', closeDropdown), 10);
    }

    handleLevelSelection(selected, button) {
        this.currentLevel = selected === 'All Levels' ? null : selected;

        if (button) {
            const text = button.querySelector('p');
            const icon = button.querySelector('.material-symbols-outlined');

            if (text) {
                if (selected === 'All Levels') {
                    text.textContent = 'Level';
                    text.classList.remove('text-primary');
                    text.classList.add('text-[#616f89]');
                } else {
                    text.textContent = selected;
                    text.classList.remove('text-[#616f89]');
                    text.classList.add('text-primary');
                }
            }

            if (icon) {
                if (selected === 'All Levels') {
                    icon.classList.remove('text-primary');
                    icon.classList.add('text-[#616f89]');
                } else {
                    icon.classList.remove('text-[#616f89]');
                    icon.classList.add('text-primary');
                }
            }
        }

        this.applyFilters();
    }

    showSortOptions() {
        const button = document.getElementById('sort-filter');
        if (!button) return;

        const existingDropdown = document.querySelector('.filter-dropdown-menu[data-type="sort"]');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }

        document.querySelectorAll('.filter-dropdown-menu').forEach(drop => drop.remove());

        const sortOptions = [
            { value: 'popular', label: 'Popular' },
            { value: 'newest', label: 'Newest' },
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'rating', label: 'Highest Rated' }
        ];

        const rect = button.getBoundingClientRect();
        const dropdown = document.createElement('div');
        dropdown.className = 'filter-dropdown-menu fixed z-50 bg-white rounded-lg shadow-lg border border-[#e5e7eb] min-w-[180px] max-h-80 overflow-y-auto';
        dropdown.dataset.type = 'sort';
        dropdown.style.top = `${rect.bottom + 4}px`;
        dropdown.style.left = `${rect.left}px`;

        dropdown.innerHTML = `
            <div class="p-2 border-b border-[#f0f2f4]">
                <p class="text-xs text-[#616f89] font-medium">Sort by</p>
            </div>
            <div class="py-1">
                ${sortOptions.map(option => `
                    <div class="filter-option px-3 py-2 hover:bg-[#f0f2f4] cursor-pointer text-sm text-[#111318] transition-colors ${this.currentSort === option.value ? 'bg-[#f0f2f4] text-primary' : ''}">
                        ${option.label}
                    </div>
                `).join('')}
            </div>
        `;

        document.body.appendChild(dropdown);

        dropdown.querySelectorAll('.filter-option').forEach((option, index) => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleSortSelection(sortOptions[index], button);
                dropdown.remove();
            });
        });

        const closeDropdown = (e) => {
            if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        };
        setTimeout(() => document.addEventListener('click', closeDropdown), 10);
    }

    handleSortSelection(selected, button) {
        this.currentSort = selected.value;
        const sortText = document.getElementById('sort-text');
        if (sortText) sortText.textContent = selected.label;
        this.sortCourses(selected.value);
    }

    applyFilters() {
        const filters = {
            category: this.currentCategory || 'all',
            level: this.currentLevel,
            sort: this.currentSort
        };

        console.log('Applying filters:', filters);

        let filterMessage = 'Filters applied:';
        filterMessage += `\n• Category: ${this.formatCategoryName(filters.category)}`;
        filterMessage += `\n• Level: ${filters.level || 'All Levels'}`;
        this.showNotification(filterMessage);
    }

    formatCategoryName(category) {
        const names = {
            'all': 'All',
            'junior-secondary': 'Junior Secondary',
            'senior-secondary': 'Senior Secondary',
            'UTME': 'Utme',
            'GCE': 'Gce'
        };
        return names[category] || category;
    }

    sortCourses(sortType) {
        console.log(`Sorting courses by: ${sortType}`);
        this.showNotification(`Courses sorted by ${this.getSortLabel(sortType)}`);
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

    showNotification(message) {
        const existingNotification = document.querySelector('.filter-notification');
        if (existingNotification) existingNotification.remove();

        const notification = document.createElement('div');
        notification.className = 'filter-notification fixed top-20 right-4 p-4 bg-primary text-white rounded-lg shadow-lg z-50 max-w-xs';
        notification.textContent = message;
        notification.style.animation = 'slideInRight 0.3s ease-out';

        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CourseCatalogApp();
});
