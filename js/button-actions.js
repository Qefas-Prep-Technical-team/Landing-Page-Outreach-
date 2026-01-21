// console.log('Button Actions JS loaded');

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


// console.log('Button Actions JS loaded');

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


// document.addEventListener('click', (e) => {

//     const courseLink = e.target.closest('[data-course-whatsapp]');
//     if (!courseLink) return;

//     const courseName = courseLink.dataset.course || 'a course';

//     const phone = '2347063484232';

//     const message = `Hello QEFAS 👋 

// I'd like to get more information about:
// 📚 *Course:* ${courseName}
// ⏳ *Duration:* 12 Weeks (Recorded)
// 💰 *Price:* ₦1,500

// Please share the full details on how to get started.`;

//     const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
// });
