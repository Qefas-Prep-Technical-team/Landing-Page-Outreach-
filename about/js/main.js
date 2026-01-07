// Main application logic for About Us page
class AboutUsApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindThemeToggle();
        this.bindSmoothScroll();
        this.bindMissionVisionAnimation();
        this.bindProcessStepHover();
        this.initializeAnalytics();
    }

    bindThemeToggle() {
        // Create theme toggle button
        this.createThemeToggle();
    }

    createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'fixed bottom-6 right-6 p-3 bg-white dark:bg-[#161e2c] rounded-full shadow-lg hover:shadow-xl transition-all z-40';
        themeToggle.innerHTML = `
            <span class="material-symbols-outlined text-slate-700 dark:text-slate-300">
                dark_mode
            </span>
        `;
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        themeToggle.id = 'theme-toggle';
        
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('qefas-theme', 'light');
                themeToggle.innerHTML = `
                    <span class="material-symbols-outlined text-slate-700">
                        light_mode
                    </span>
                `;
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('qefas-theme', 'dark');
                themeToggle.innerHTML = `
                    <span class="material-symbols-outlined text-slate-300">
                        dark_mode
                    </span>
                `;
            }
            
            this.trackEvent('theme_toggled', { theme: isDark ? 'light' : 'dark' });
        });
        
        document.body.appendChild(themeToggle);
    }

    bindSmoothScroll() {
        // Smooth scroll for internal links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    this.trackEvent('internal_link_clicked', { target: targetId });
                }
            }
        });
    }

    bindMissionVisionAnimation() {
        const missionCard = document.querySelector('.mission-card');
        const visionCard = document.querySelector('.vision-card');
        
        if (missionCard && visionCard) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('mission-card')) {
                            entry.target.classList.add('slide-in-left');
                        } else {
                            entry.target.classList.add('slide-in-right');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(missionCard);
            observer.observe(visionCard);
        }
    }

    bindProcessStepHover() {
        // Add interactive hover effects for process steps
        const processSteps = document.querySelectorAll('.process-step');
        
        processSteps.forEach(step => {
            step.addEventListener('mouseenter', () => {
                this.animateStepHover(step);
            });
            
            step.addEventListener('click', () => {
                const stepNumber = step.dataset.step;
                this.showStepDetails(stepNumber);
            });
        });
    }

    animateStepHover(step) {
        const circle = step.querySelector('.step-circle');
        const icon = step.querySelector('.step-icon');
        
        // Add pulse animation
        circle.classList.add('pulse-glow');
        
        // Animate icon
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        
        // Reset on mouse leave
        step.addEventListener('mouseleave', () => {
            circle.classList.remove('pulse-glow');
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, { once: true });
    }

    showStepDetails(stepNumber) {
        const stepDetails = {
            1: {
                title: "Choose Your Goal",
                description: "Select from our comprehensive range of courses tailored for JSS 1-3, SSS 1-3, or specific exams like WAEC, JAMB, SAT, and TOEFL.",
                features: [
                    "Age-appropriate curriculum",
                    "Exam-specific preparation",
                    "Progress tracking from day one"
                ]
            },
            2: {
                title: "Watch Lessons",
                description: "Access high-quality video lessons taught by expert tutors who understand the Nigerian curriculum.",
                features: [
                    "HD video quality",
                    "Download for offline viewing",
                    "Interactive quizzes after each lesson"
                ]
            },
            3: {
                title: "Practice Tests",
                description: "Simulate real exam conditions with our Computer-Based Test (CBT) platform.",
                features: [
                    "Timed practice tests",
                    "Instant scoring",
                    "Detailed answer explanations"
                ]
            },
            4: {
                title: "Track Progress",
                description: "Monitor your improvement with detailed analytics and personalized recommendations.",
                features: [
                    "Performance dashboards",
                    "Weak area identification",
                    "Personalized study plans"
                ]
            }
        };
        
        const details = stepDetails[stepNumber];
        if (details) {
            this.showStepModal(details);
            this.trackEvent('step_clicked', { step: stepNumber, title: details.title });
        }
    }

    showStepModal(details) {
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div class="bg-white dark:bg-[#161e2c] rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white">${details.title}</h3>
                            <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" id="close-step-modal">
                                <span class="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 mb-6">${details.description}</p>
                        <div class="mb-6">
                            <h4 class="font-semibold text-slate-900 dark:text-white mb-3">Key Features:</h4>
                            <ul class="space-y-2">
                                ${details.features.map(feature => `
                                    <li class="flex items-start gap-2">
                                        <span class="material-symbols-outlined text-green-500 text-sm mt-0.5">check_circle</span>
                                        <span class="text-sm text-slate-600 dark:text-slate-400">${feature}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="flex justify-end">
                            <button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors" onclick="window.location.href='/courses'">
                                Explore Courses
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.innerHTML = modalHTML;
        document.body.appendChild(modal);
        
        // Add close functionality
        const closeBtn = modal.querySelector('#close-step-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        }
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    initializeAnalytics() {
        // Track page view
        this.trackPageView();
        
        // Track scroll depth
        this.trackScrollDepth();
        
        // Track time on page
        this.trackTimeOnPage();
    }

    trackPageView() {
        console.log('Page viewed: About Us');
        // In real app: analytics.track('page_viewed', { page: 'about' });
    }

    trackScrollDepth() {
        let scrollDepth = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = Math.round((scrollPosition / pageHeight) * 100);
            
            if (percentage > scrollDepth) {
                scrollDepth = percentage;
                
                // Track at 25%, 50%, 75%, 100%
                if ([25, 50, 75, 100].includes(scrollDepth)) {
                    console.log(`Scroll depth: ${scrollDepth}%`);
                    // In real app: analytics.track('scroll_depth', { percentage: scrollDepth, page: 'about' });
                }
            }
        });
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            console.log(`Time spent on About Us page: ${timeSpent} seconds`);
            // In real app: analytics.track('time_on_page', { seconds: timeSpent, page: 'about' });
        });
    }

    trackEvent(eventName, data = {}) {
        console.log(`Event: ${eventName}`, data);
        // In real app: analytics.track(eventName, { ...data, page: 'about' });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.aboutUsApp = new AboutUsApp();
});