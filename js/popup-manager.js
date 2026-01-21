class PopupManager {
    constructor() {
        this.popup = null;
        this.init();
    }

    async init() {
        // Load popup HTML
        await this.loadPopupHTML();
        // Fetch and populate channels
    await this.loadChannels();
        
        // Initialize popup
        this.initializePopup();
        // Add trigger button & form event listeners
        this.addEventListeners();

        // Schedule auto-show (single, consolidated)
        this.setupAutoShow();
    }

    async loadChannels() {
    try {
        const res = await fetch('https://selfpaced-tracker.vercel.app/api/channels/source');
        console.log(res)
        const result = await res.json();
        
        if (result.success) {
            const select = document.getElementById('referralChannel');
            result.data.forEach(channel => {
                const option = document.createElement('option');
                option.value = channel._id; // Store ID as the value
                option.textContent = channel.name; // User sees the Name
                select.appendChild(option);
            });
        }
    } catch (err) { console.error(err); }
}

    async loadPopupHTML() {
        try {
            // Create popup HTML structure
            const popupHTML = `
            <div id="parentInquiryPopup" class="popup-backdrop">
                <div class="popup-container">
                    <div class="popup-header"></div>
                    <button class="popup-close" id="popupClose" aria-label="Close popup">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                    <div class="popup-content">
                        <div class="popup-icon">
                            <span class="material-symbols-outlined" style="font-size: 32px; font-variation-settings: 'FILL' 1">school</span>
                        </div>
                        <div class="popup-text">
                            <h2 class="popup-title">Let's Connect About Your Child.</h2>
                            <p class="popup-description">
                                We are here to guide their path to success. Fill in your details, and we'll contact you via WhatsApp.
                            </p>
                        </div>
                        <form class="popup-form" id="inquiryForm">
                            <div class="form-group">
                                <label for="parentName" class="form-label">Parent Name</label>
                                <div class="form-input-wrapper">
                                    <input type="text" id="parentName" class="form-input " placeholder="Enter your full name" required>
                                    <span class="material-symbols-outlined form-icon">person</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="childClass" class="form-label">Child's Current Class</label>
                                <div class="form-input-wrapper">
                                    <select id="childClass" class="form-select" required>
                                        <option value="" disabled selected>Select Class (e.g. JSS, SSS)</option>
                                        <optgroup label="Junior Secondary">
                                            <option value="jss1">JSS 1</option>
                                            <option value="jss2">JSS 2</option>
                                            <option value="jss3">JSS 3</option>
                                        </optgroup>
                                        <optgroup label="Senior Secondary">
                                            <option value="sss1">SSS 1</option>
                                            <option value="sss2">SSS 2</option>
                                            <option value="sss3">SSS 3</option>
                                        </optgroup>
                                    </select>
                                    <span class="material-symbols-outlined form-icon">expand_more</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="whatsapp" class="form-label">
                                    Phone Number <span class="popup-phone-note">(WhatsApp)</span>
                                </label>
                                <div class="form-input-wrapper">
                                    <span class="phone-prefix">+234</span>
                                    <input type="tel" id="whatsapp" class="form-input phone-input pl-20" placeholder="800 000 0000" pattern="[0-9]{10}" required>
                                    <span class="material-symbols-outlined form-icon">chat</span>
                                </div>
                                <div class="form-group">
    <label for="referralChannel" class="form-label">How did you hear about us?</label>
    <div class="form-input-wrapper">
        <select id="referralChannel" class="form-select" required>
            <option value="" disabled selected>Select an option</option>
            </select>
        <span class="material-symbols-outlined form-icon">campaign</span>
    </div>
</div>
   </div>
      <button type="submit" class="popup-submit">
             <span>Send Inquiry</span>
            <span class="material-symbols-outlined">send</span>
                            </button>
                            <p class="popup-privacy">
                                We respect your privacy. No spam, ever.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            `;
            
            // Insert into popup container
            document.getElementById('popup-container').innerHTML = popupHTML;
            
        } catch (error) {
            console.error('Error loading popup:', error);
        }
    }

    initializePopup() {
        this.popup = document.getElementById('parentInquiryPopup');
        this.form = document.getElementById('inquiryForm');
        
        if (!this.popup) {
            console.error('Popup element not found');
            return;
        }
    }

    // Consolidated auto-show behavior. Respects localStorage and allows
    // forcing via `?showPopup=1` query param for testing.
    setupAutoShow(options = {}) {
        const delay = options.delay ?? 3000;
        const localStorageKey = options.localStorageKey ?? 'popup_autoshown_v1';
        const showOnce = options.showOnce ?? true;

        // allow forcing via URL param for testing
        const params = new URLSearchParams(window.location.search);
        const forceShow = params.get('showPopup') === '1';

        setTimeout(() => {
            try {
                if (showOnce && !forceShow && localStorage.getItem(localStorageKey)) {
                    console.log('[popup-manager] auto-show skipped (already shown)');
                    return;
                }

                if (!this.popup) {
                    console.warn('[popup-manager] popup element not ready');
                    return;
                }

                this.openPopup();

                if (showOnce) localStorage.setItem(localStorageKey, '1');

                // Auto-close after 8 seconds if user hasn't interacted
                const autoCloseTimer = setTimeout(() => {
                    if (this.isOpen() && !document.activeElement.closest('#inquiryForm')) {
                        this.closePopup();
                    }
                }, 8000);

                // Cancel auto-close if user interacts with the form
                this.form?.addEventListener('focusin', () => {
                    clearTimeout(autoCloseTimer);
                }, { once: true });
            } catch (err) {
                console.error('[popup-manager] setupAutoShow error', err);
            }
        }, delay);
    }


    addEventListeners() {
        // Close button
        document.getElementById('popupClose')?.addEventListener('click', () => this.closePopup());
        
        // Close on backdrop click
        this.popup?.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.closePopup();
            }
        });
        
        // Form submission
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.closePopup();
            }
        });
        
        // Trigger button
        const triggerBtn = document.getElementById('popup-trigger');
        if (triggerBtn) {
            triggerBtn.classList.remove('hidden');
            triggerBtn.addEventListener('click', () => this.openPopup());
        }
        
        // Add CTA button in hero section (optional)
        // this.addHeroCTA();
    }


    

    openPopup() {
        if (!this.popup) return;
        
        this.popup.classList.add('active');
        this.popup.querySelector('.popup-container').classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('parentName')?.focus();
        }, 300);
    }

    closePopup() {
        if (!this.popup) return;
        
        this.popup.classList.remove('active');
        this.popup.querySelector('.popup-container').classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        this.form?.reset();
    }

    isOpen() {
        return this.popup?.classList.contains('active');
    }

// async submitForm() {
//     const submitBtn = this.form.querySelector('.popup-submit');
//     const originalBtnText = submitBtn.innerHTML;
//     // --- ADD THESE LINES TO FIX THE ERROR ---
//     const channelSelect = document.getElementById('referralChannel');
//     const selectedOption = channelSelect.options[channelSelect.selectedIndex];
// // Inside submitForm()
// console.log(channelSelect.value, selectedOption.textContent);
// const formData = {
//     parentName: document.getElementById('parentName').value.trim(),
//     childClass: document.getElementById('childClass').value,
//     whatsapp: document.getElementById('whatsapp').value.trim(),
//     channelId: channelSelect.value,        // Grabs the _id from <option value="...">
//     channelName: selectedOption.textContent // Grabs the "Facebook" text
// };



//     if (!this.validateForm(formData)) return;

//     try {
//         // Disable button to prevent double-submission
//         submitBtn.disabled = true;
//         submitBtn.innerText = 'Sending...';

//         const res = await fetch('https://selfpaced-tracker.vercel.app/api/inquiries', {
//             method: 'POST',
//             mode: 'cors', // Explicitly set cors mode
//             headers: { 
//                 'Content-Type': 'application/json' 
//             },
//             body: JSON.stringify(formData),
//         });

//         const data = await res.json();

//         if (res.ok && data.success) {
//             this.showNotification('Success! Inquiry saved.');
//             this.closePopup();
//         } else {
//             // Handle specific status codes (like 409 Conflict)
//             this.showNotification(`Error: ${data.error || 'Failed to save'}`);
//         }
//     } catch (err) {
//         console.error('Fetch error:', err);
//         this.showNotification('Connection error. Please check your internet.');
//     } finally {
//         // Re-enable button
//         submitBtn.disabled = false;
//         submitBtn.innerHTML = originalBtnText;
//     }
// }

async submitForm() {
    const submitBtn = this.form.querySelector('.popup-submit');
    const originalBtnText = submitBtn.innerHTML;
    
    const channelSelect = document.getElementById('referralChannel');
    const selectedOption = channelSelect.options[channelSelect.selectedIndex];
const rawPhone = document.getElementById('whatsapp').value.trim();

const formData = {
    parentName: document.getElementById('parentName').value.trim(),
    childClass: document.getElementById('childClass').value,
    rawPhone, // 👈 keep raw
    whatsapp: `+234${rawPhone}`,
    channelId: channelSelect.value,
    channelName: selectedOption.textContent
};

    // 1. Basic Client-Side Validation (Regex)
    if (!this.validateForm(formData)) return;

    try {
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Verifying WhatsApp...';
this.showNotification('Verifying WhatsApp number…', 'success');


        /* --- 2. START TWILIO VERIFICATION CHECK --- */
        const verifyRes = await fetch('https://selfpaced-tracker.vercel.app/api/whatsapp/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber: formData.whatsapp }),
        });

        const verifyData = await verifyRes.json();
        this.showNotification('WhatsApp number verified ✔️', 'success');

        console.log(verifyData)

       if (!verifyRes.ok || !verifyData.success) {
    this.showNotification('Could not verify phone number. Try again.', 'error');
    return;
}

if (!verifyData.isValid) {
    this.showNotification('Invalid phone number format.', 'error');
    return;
}

if (!verifyData.isWhatsAppLikely) {
    this.showNotification('This number is not likely on WhatsApp.', 'error');
    return;
}

        /* --- END VERIFICATION CHECK --- */

        submitBtn.innerHTML = 'Saving Inquiry...';

        // 3. Final submission to your tracker
        const res = await fetch('https://selfpaced-tracker.vercel.app/api/inquiries', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            this.showNotification('Message sent successfully 🎉', 'success');

            this.closePopup();
        } else {
            this.showNotification(`Error: ${data.error || 'Failed to save'}`);
        }
    } catch (err) {
        console.error('Submission error:', err);
        this.showNotification('Connection error. Please try again.');
        this.showNotification('This number is not on WhatsApp', 'error');
this.showNotification('Invalid phone number', 'error');
this.showNotification('Verification failed', 'error');

    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

validateForm(data) {
    const errors = [];

    if (!data.parentName) {
        errors.push('Please enter your name');
    }

    if (!data.childClass) {
        errors.push("Please select your child's class");
    }

    // ✅ Validate RAW phone, not +234
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.rawPhone)) {
        errors.push('Enter a valid 10-digit WhatsApp number');
    }

    if (!data.channelId) {
        errors.push('Please tell us how you heard about us');
    }

    if (errors.length > 0) {
        this.showNotification(errors[0], 'error');
        return false;
    }

    return true;
}



showNotification(message, type = 'success') {
    // Remove existing notification (avoid stacking)
    const existing = document.querySelector('.popup-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `
        popup-notification
        ${type === 'error' ? 'error' : 'success'}
    `;

    notification.innerHTML = message;

    // 👇 attach INSIDE popup container
    const container = this.popup?.querySelector('.popup-container');
    if (!container) {
        alert(message); // hard fallback
        return;
    }

    container.prepend(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3500);
}
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.popupManager = new PopupManager();
});

// Global function to open popup (can be called from anywhere)
window.showParentInquiryPopup = function() {
    if (window.popupManager) {
        window.popupManager.openPopup();
    }
};


