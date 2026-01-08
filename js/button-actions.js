// button-actions.js

// Start Learning WhatsApp link
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-learning');
    console.log('Button Actions JS loaded');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const phone = '2348012345678'; // your WhatsApp number
            const message = 'Hi, I want to start learning!'; // message to send
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank'); // opens in WhatsApp
        });
    }

    // Example: You can handle more buttons here
    const demoBtn = document.getElementById('demo-button');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            alert('Demo button clicked!');
        });
    }
});
