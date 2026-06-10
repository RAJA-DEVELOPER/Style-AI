document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-nav a[data-target]');
    const views = document.querySelectorAll('.admin-view');
    const pageTitle = document.querySelector('.page-title h1');
    const pageSubtitle = document.querySelector('.page-title p');

    // View sub-title mappings
    const subtitles = {
        'view-dashboard': "Welcome back, here's what's happening today.",
        'view-analytics': "Deep dive into your AI stylist's performance and conversion metrics.",
        'view-products': "Manage your luxury catalog, inventory, and pricing.",
        'view-orders': "Track fulfillments, returns, and recent transactions.",
        'view-customers': "View your top clients and user demographics.",
        'view-collections': "Curate seasonal lookbooks and curated collections.",
        'view-reviews': "Monitor customer feedback and ratings.",
        'view-settings': "Configure store preferences and AI stylist parameters."
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (!targetId) return;

            // 1. Update Active Nav Link
            document.querySelectorAll('.sidebar-nav a').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // 2. Hide all views and show target
            views.forEach(view => {
                view.classList.remove('active');
            });
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
            }

            // 3. Update Page Title
            const linkText = link.innerText.trim();
            if (pageTitle) pageTitle.innerText = linkText;
            if (pageSubtitle && subtitles[targetId]) {
                pageSubtitle.innerText = subtitles[targetId];
            }
        });
    });
});
