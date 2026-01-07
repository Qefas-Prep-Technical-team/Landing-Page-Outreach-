// Main application logic for Trust page
class TrustPageApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindThemeToggle();
        this.bindSmoothScroll();
        this.bindFeatureCardInteractions();
        this.bindNavigation();
        this.initializeAnalytics();
    }

    /* ---------------- THEME ---------------- */

    bindThemeToggle() {
        const savedTheme = localStorage.getItem('qefas-theme');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }

        this.createThemeToggle();
    }

    createThemeToggle() {
        if (document.getElementById('theme-toggle')) return;

        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.className =
            'fixed bottom-6 right-6 p-3 bg-white dark:bg-surface-dark rounded-full shadow-lg hover:shadow-xl transition-all z-40';

        themeToggle.innerHTML = `
            <span class="material-symbols-outlined text-slate-700 dark:text-slate-300">
                dark_mode
            </span>
        `;

        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('qefas-theme', isDark ? 'dark' : 'light');

            themeToggle.innerHTML = `
                <span class="material-symbols-outlined ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                }">
                    ${isDark ? 'dark_mode' : 'light_mode'}
                </span>
            `;

            document.dispatchEvent(
                new CustomEvent('themeChanged', {
                    detail: { theme: isDark ? 'dark' : 'light' }
                })
            );
        });

        document.body.appendChild(themeToggle);
    }

    /* ---------------- SCROLL ---------------- */

    bindSmoothScroll() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }

    /* ---------------- FEATURES ---------------- */

    bindFeatureCardInteractions() {
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.feature-card');
            if (!card) return;

            const icon = card.querySelector('.material-symbols-outlined');
            if (icon) icon.style.transform = 'scale(1.1)';
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.feature-card');
            if (!card) return;

            const icon = card.querySelector('.material-symbols-outlined');
            if (icon) icon.style.transform = 'scale(1)';
        });

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.feature-card');
            if (!card) return;

            const title = card.querySelector('h3')?.textContent;
            this.trackFeatureClick(title);
        });
    }

    /* ---------------- NAVIGATION ---------------- */

    bindNavigation() {
        window.addEventListener('scroll', () => this.updateActiveNavLink());

        document.addEventListener('click', (e) => {
            const link = e.target.closest('nav a');
            if (!link) return;

            const href = link.getAttribute('href');
            this.trackNavigation(href.startsWith('#') ? 'internal' : 'external', href);
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');

        let current = '';

        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${current}`
            );
        });
    }

    /* ---------------- ANALYTICS ---------------- */

    initializeAnalytics() {
        this.trackPageView();
        this.trackScrollDepth();
        this.trackTimeOnPage();
    }

    trackPageView() {
        console.log('📄 Page viewed: Trust Page');
    }

    trackScrollDepth() {
        let maxDepth = 0;

        window.addEventListener('scroll', () => {
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const depth = Math.round((window.scrollY / docHeight) * 100);

            if (depth > maxDepth && [25, 50, 75, 100].includes(depth)) {
                maxDepth = depth;
                console.log(`📊 Scroll depth: ${depth}%`);
            }
        });
    }

    trackTimeOnPage() {
        const start = Date.now();

        window.addEventListener('beforeunload', () => {
            const seconds = Math.round((Date.now() - start) / 1000);
            console.log(`⏱ Time on page: ${seconds}s`);
        });
    }

    trackFeatureClick(feature) {
        if (!feature) return;
        console.log(`✨ Feature clicked: ${feature}`);
    }

    trackNavigation(type, destination) {
        console.log(`🔗 Navigation: ${type} → ${destination}`);
    }
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

/* ---------------- INIT ---------------- */

document.addEventListener('DOMContentLoaded', () => {
    window.trustPageApp = new TrustPageApp();
});
