console.log('Button Actions JS loaded');

document.addEventListener('click', (e) => {
    // Desktop + Mobile buttons
    if (e.target.closest('[data-start-learning]')) {
        console.log('Start Learning clicked');

        const phone = '2347063484232';
        const message = 'Hi, I want to start learning!';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');
    }
});


console.log('Button Actions JS loaded');

document.addEventListener('click', (e) => {

    // FREE TRIAL → WhatsApp
    if (e.target.closest('[data-free-trial]')) {
        console.log('Free Trial clicked');

        const phone = '2347063484232';

        const message = 
`Hello QEFAS 👋
I’m a parent interested in a FREE trial lesson.
My child is in JSS / SSS.
Please share details.`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

});
