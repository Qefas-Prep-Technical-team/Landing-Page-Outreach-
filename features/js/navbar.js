// mobile-menu.js
class MobileMenu {
    constructor() {
        this.isMobileMenuOpen = false;
        this.mobileMenu = null;
        this.mobileMenuToggle = null;
        
        this.init();
    }
    
    init() {
        this.findElements();
        this.setupEventListeners();
    }
    
    findElements() {
        // Find mobile menu elements in the navbar
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            this.mobileMenuToggle = navbarContainer.querySelector('#mobile-menu-toggle');
            this.mobileMenu = navbarContainer.querySelector('#mobile-menu');
        }
    }
    
    setupEventListeners() {
        if (!this.mobileMenuToggle || !this.mobileMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }
        
        // Toggle mobile menu on button click
        this.mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !this.mobileMenu.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.close();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.close();
            }
        });
        
        // Close menu when clicking on mobile menu links
        const mobileLinks = this.mobileMenu.querySelectorAll('a, button');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
        
        console.log('Mobile menu initialized');
    }
    
    toggle() {
        if (!this.mobileMenu || !this.mobileMenuToggle) return;
        
        if (this.isMobileMenuOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        if (!this.mobileMenu || !this.mobileMenuToggle) return;
        
        // Show menu
        this.mobileMenu.classList.remove('hidden');
        
        // Add animation class
        setTimeout(() => {
            this.mobileMenu.classList.add('mobile-menu-open');
        }, 10);
        
        // Update toggle button
        const icon = this.mobileMenuToggle.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = 'close';
        }
        
        // Update state
        this.isMobileMenuOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log('Mobile menu opened');
    }
    
    close() {
        if (!this.mobileMenu || !this.mobileMenuToggle) return;
        
        // Remove animation class
        this.mobileMenu.classList.remove('mobile-menu-open');
        
        // Update toggle button
        const icon = this.mobileMenuToggle.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = 'menu';
        }
        
        // Update state
        this.isMobileMenuOpen = false;
        
        // Allow body scroll
        document.body.style.overflow = '';
        
        // Hide menu after animation
        setTimeout(() => {
            if (!this.isMobileMenuOpen) {
                this.mobileMenu.classList.add('hidden');
            }
        }, 300);
        
        console.log('Mobile menu closed');
    }
    
    // Public API methods
    isOpen() {
        return this.isMobileMenuOpen;
    }
    
    destroy() {
        // Clean up event listeners if needed
        document.removeEventListener('click', this.handleOutsideClick);
        document.removeEventListener('keydown', this.handleEscapeKey);
        
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.removeEventListener('click', this.handleToggleClick);
        }
    }
}