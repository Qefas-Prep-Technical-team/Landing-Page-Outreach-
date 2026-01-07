// Process steps animation component
class ProcessStepsAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.initializeStepCompletion();
        this.initializeStepProgress();
        this.initializeStepInteractions();
    }

    initializeStepCompletion() {
        // Simulate step completion based on scroll progress
        window.addEventListener('scroll', () => {
            this.updateStepCompletion();
        });
    }

    updateStepCompletion() {
        const steps = document.querySelectorAll('.process-step');
        const section = document.getElementById('how-it-works-section');
        
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Calculate how far into the section we are (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, 
            (scrollPosition - sectionTop) / sectionHeight
        ));
        
        // Complete steps based on scroll progress
        steps.forEach((step, index) => {
            const stepThreshold = (index + 1) * 0.25; // Each step at 25%, 50%, 75%, 100%
            
            if (scrollProgress >= stepThreshold) {
                step.classList.add('completed');
                this.animateStepCompletion(step);
            } else {
                step.classList.remove('completed');
            }
        });
    }

    animateStepCompletion(step) {
        const circle = step.querySelector('.step-circle');
        const icon = step.querySelector('.step-icon');
        
        // Only animate once
        if (step.classList.contains('animated')) return;
        
        step.classList.add('animated');
        
        // Add completion animation
        circle.style.animation = 'scaleIn 0.5s ease-out';
        
        // Animate icon
        icon.style.transition = 'all 0.5s ease-out';
        icon.style.transform = 'scale(1.2)';
        
        // Reset animation after completion
        setTimeout(() => {
            circle.style.animation = '';
            icon.style.transform = '';
        }, 500);
    }

    initializeStepProgress() {
        // Create progress indicator for steps
        const stepsContainer = document.querySelector('.process-steps');
        if (!stepsContainer) return;
        
        // Add progress line animation
        this.createProgressLine();
    }

    createProgressLine() {
        const line = document.createElement('div');
        line.className = 'progress-line absolute top-12 left-0 w-0 h-0.5 bg-primary -z-10 transition-all duration-1000';
        line.style.transform = 'translateY(50%)';
        
        const stepsContainer = document.querySelector('.process-steps');
        if (stepsContainer) {
            stepsContainer.appendChild(line);
            
            // Animate line based on scroll
            window.addEventListener('scroll', () => {
                this.updateProgressLine(line);
            });
        }
    }

    updateProgressLine(line) {
        const steps = document.querySelectorAll('.process-step');
        const section = document.getElementById('how-it-works-section');
        
        if (!section || steps.length === 0) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Calculate scroll progress
        const scrollProgress = Math.max(0, Math.min(1, 
            (scrollPosition - sectionTop) / sectionHeight
        ));
        
        // Update line width
        const lineWidth = Math.min(100, scrollProgress * 100);
        line.style.width = `${lineWidth}%`;
        
        // Add glow effect when progressing
        if (scrollProgress > 0) {
            line.style.boxShadow = '0 0 10px rgba(19, 91, 236, 0.5)';
        }
    }

    initializeStepInteractions() {
        // Add click-to-expand functionality for mobile
        if (window.innerWidth < 768) {
            this.initializeMobileStepInteractions();
        }
        
        // Update on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                this.initializeMobileStepInteractions();
            } else {
                this.removeMobileStepInteractions();
            }
        });
    }

    initializeMobileStepInteractions() {
        const steps = document.querySelectorAll('.process-step');
        
        steps.forEach(step => {
            // Remove any existing listeners
            const newStep = step.cloneNode(true);
            step.parentNode.replaceChild(newStep, step);
            
            // Add click handler
            newStep.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    this.toggleStepDetails(newStep);
                }
            });
            
            // Add cursor pointer
            newStep.style.cursor = 'pointer';
        });
    }

    removeMobileStepInteractions() {
        const steps = document.querySelectorAll('.process-step');
        
        steps.forEach(step => {
            step.style.cursor = '';
            step.onclick = null;
        });
    }

    toggleStepDetails(step) {
        const isExpanded = step.classList.contains('expanded');
        
        // Close all other steps
        document.querySelectorAll('.process-step.expanded').forEach(s => {
            if (s !== step) {
                s.classList.remove('expanded');
                this.collapseStep(s);
            }
        });
        
        // Toggle current step
        if (isExpanded) {
            step.classList.remove('expanded');
            this.collapseStep(step);
        } else {
            step.classList.add('expanded');
            this.expandStep(step);
        }
    }

    expandStep(step) {
        const description = step.querySelector('.step-description');
        const circle = step.querySelector('.step-circle');
        
        // Store original height
        const originalHeight = step.offsetHeight;
        
        // Expand
        description.style.maxHeight = '200px';
        description.style.opacity = '1';
        description.style.transform = 'translateY(0)';
        
        // Animate circle
        circle.style.transform = 'scale(1.1)';
        circle.style.boxShadow = '0 0 20px rgba(19, 91, 236, 0.3)';
        
        // Track expansion
        this.trackStepExpansion(step.dataset.step);
    }

    collapseStep(step) {
        const description = step.querySelector('.step-description');
        const circle = step.querySelector('.step-circle');
        
        // Collapse
        description.style.maxHeight = '0';
        description.style.opacity = '0';
        description.style.transform = 'translateY(10px)';
        
        // Reset circle
        circle.style.transform = '';
        circle.style.boxShadow = '';
    }

    trackStepExpansion(stepNumber) {
        console.log(`Step ${stepNumber} expanded on mobile`);
        // In real app: analytics.track('step_expanded', { step: stepNumber, device: 'mobile' });
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const stepsAnimation = new ProcessStepsAnimation();
    window.stepsAnimation = stepsAnimation; // For debugging
});