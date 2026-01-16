document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a, [role="button"]');
    
    if (target) {
        // We extract the custom "dedication" labels here
        const trackAction = target.getAttribute('data-track') || "general_click";
        const trackName = target.getAttribute('data-name') || target.innerText.trim();

        const clickData = {
            category: trackAction, // e.g., "course_view"
            label: trackName,      // e.g., "SSS1 Course"
            url: target.href || "N/A",
            path: window.location.pathname
        };

        fetch('http://localhost:3000/api/inquiries/track-click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clickData),
            keepalive: true 
        });
    }
});