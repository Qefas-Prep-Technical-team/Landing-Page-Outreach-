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
