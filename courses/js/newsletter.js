class NewsletterManager {
    constructor() {
        // We use event delegation so it works even if the footer loads late
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'newsletterSubscribeBtn') {
                this.handleSubscribe(e.target);
            }
        });
    }

    async handleSubscribe(button) {
        // Find the input relative to the button or via ID
        const emailInput = document.getElementById('newsletterEmail');
        const messageText = document.getElementById('newsletterMessage');
        const email = emailInput ? emailInput.value.trim() : '';

        if (!email || !email.includes('@')) {
            this.showMessage(messageText, 'Please enter a valid email.', 'text-red-400');
            return;
        }

        try {
            // Disable button and show loading state
            button.disabled = true;
            const originalText = button.innerText;
            button.innerText = 'Subscribing...';

            const res = await fetch('https://selfpaced-tracker.vercel.app/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                this.showMessage(messageText, 'Thanks for subscribing!', 'text-green-400');
                if (emailInput) emailInput.value = '';
            } else {
                this.showMessage(messageText, data.error || 'Something went wrong.', 'text-yellow-400');
            }
        } catch (err) {
            console.error('Newsletter Error:', err);
            this.showMessage(messageText, 'Server error. Try again later.', 'text-red-400');
        } finally {
            button.disabled = false;
            button.innerText = 'Subscribe';
        }
    }

    showMessage(element, text, colorClass) {
        if (!element) return;
        element.innerText = text;
        element.className = `text-xs mt-1 ${colorClass}`;
        element.classList.remove('hidden');
        
        setTimeout(() => {
            element.classList.add('hidden');
        }, 5000);
    }
}

// Initialize immediately
const newsletter = new NewsletterManager();