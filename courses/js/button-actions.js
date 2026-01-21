console.log('Button Actions JS loaded');

document.addEventListener('click', (e) => {
    // Desktop + Mobile buttons
    if (e.target.closest('[data-start-learning]')) {
        console.log('Start Learning clicked');

        const phone = '2347063484232';
        const message = 'Hello QEFAS 👋 I’m interested in starting my learning journey with QEFAS. Please provide me with more information about the courses and enrollment process.';
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


document.addEventListener('click', (e) => {

    const courseLink = e.target.closest('[data-course-whatsapp]');
    if (!courseLink) return;

    const courseName = courseLink.dataset.course || 'a course';

    const phone = '2347063484232';

    const message =
`Hello QEFAS 👋
I’m a parent interested in this course:

📘 ${courseName}
Class: JSS / SSS

Please share full details.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
});



document.addEventListener('click', (e) => {

    // FREE TRIAL → WhatsApp
    if (e.target.closest('[data-view-Syllabus]')) {
        // console.log('Free Trial clicked');

        const phone = '2347063484232';

        const message = 
`Hello QEFAS 👋
Please share the list of available syllabuses.

Thank you.`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

});
