// Theme switcher component
class ThemeSwitcher {
    constructor() {
        this.themeToggle = null;
        this.init();
    }

    init() {
        this.createThemeToggle();
        this.loadThemePreference();
        this.bindEvents();
    }

    createThemeToggle() {
        // Create theme toggle button
        const toggleHTML = `
            <button id="theme-toggle" class="fixed bottom-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all z-50">
                <span class="material-symbols-outlined text-gray-800 dark:text-white">
                    dark_mode
                </span>
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', toggleHTML);
        this.themeToggle = document.getElementById('theme-toggle');
    }

    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    loadThemePreference() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('qefas-theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        this.setTheme(isDark ? 'light' : 'dark');
    }

    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            this.themeToggle.querySelector('span').textContent = 'light_mode';
        } else {
            document.documentElement.classList.remove('dark');
            this.themeToggle.querySelector('span').textContent = 'dark_mode';
        }
        
        localStorage.setItem('qefas-theme', theme);
        
        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
}

// Initialize theme switcher
new ThemeSwitcher();