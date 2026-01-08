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

// document.getElementById('view-demo-btn').addEventListener('click', () => {
//     const phone = '2347063484232';

//     const message = `
// Hello QEFAS 👋
// I’m a parent and I’d like to view the parent demo to understand how your classes work.
// Please share the details.
//     `.trim();

//     window.open(
//         `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
//         '_blank'
//     );
// });



// const phone = '2347063484232';
// // Create Student Account
// document.getElementById('create-account-btn').addEventListener('click', () => {
//     const message = `
// Hello QEFAS 👋
// I’m a parent and I’d like to create a student account for my child.
// Please guide me through the registration process.
//     `.trim();

//     window.open(
//         `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
//         '_blank'
//     );
// });

// // See How It Works
// document.getElementById('how-it-works-btn').addEventListener('click', () => {
//     const message = `
// Hello QEFAS 👋
// I’m a parent and I’d like to understand how QEFAS classes work.
// Please explain the learning process and structure.
//     `.trim();

//     window.open(
//         `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
//         '_blank'
//     );
// });

document.addEventListener('DOMContentLoaded', async () => {
    const pageLoader = new TrustPageLoader();
    await pageLoader.loadAllComponents();

    const phone = '2347063484232';

    const viewDemoBtn = document.getElementById('view-demo-btn');
    if (viewDemoBtn) {
        viewDemoBtn.addEventListener('click', () => {
            const message = `Hello QEFAS 👋
I’d like to view the parent demo to understand how your classes work.
Please share the details.`;

            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    const createAccountBtn = document.getElementById('create-account-btn');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', () => {
            const message = `Hello QEFAS 👋
I want to create a student account for my child.
Please guide me through registration.`;

            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    const howItWorksBtn = document.getElementById('how-it-works-btn');
    if (howItWorksBtn) {
        howItWorksBtn.addEventListener('click', () => {
            const message = `Hello QEFAS 👋
I want to understand how QEFAS classes work.
Please explain the learning process.`;

            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // Repeat similar logic for [data-start-learning], [data-free-trial], [data-course-whatsapp] buttons if needed
});




