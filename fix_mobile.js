const fs = require('fs');
const path = require('path');

const cssBlock = `

/* ==========================================================================
   GLOBAL MOBILE RESPONSIVENESS OVERRIDES
   ========================================================================== */
@media (max-width: 767px) {
    /* Prevent horizontal scrolling universally */
    html, body {
        overflow-x: hidden !important;
        width: 100% !important;
        max-width: 100vw !important;
    }

    /* Ensure containers don't overflow */
    .container {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
        width: 100% !important;
        max-width: 100vw !important;
        overflow-x: hidden !important;
        box-sizing: border-box !important;
    }

    /* Make images, videos, and objects responsive */
    img, video, canvas, svg, iframe {
        max-width: 100% !important;
        height: auto;
    }

    /* Force all grid layouts to collapse to single column unless explicitly overridden */
    .grid-2, .grid-3, .grid-4,
    .editorial-grid, .stats-grid, .footer-grid,
    .dashboard-grid, .outfit-grid, .occasion-grid, 
    .gallery-grid, .saved-grid, .trending-carousel,
    .product-details-container, .split-layout,
    .contact-grid, .auth-container, .admin-grid,
    .color-palette {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        gap: 1.5rem !important;
    }

    /* Force row flex layouts to stack vertically */
    .flex-row, .row, .ai-stylist-wrapper, .cart-item, .cart-summary {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
    }

    /* Typography adjustments to prevent overflow */
    h1, .hero-title, .section-title {
        font-size: clamp(2rem, 8vw, 3rem) !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        hyphens: auto !important;
    }

    /* Ensure form inputs and buttons don't overflow */
    input, select, textarea, button, .btn {
        max-width: 100% !important;
        box-sizing: border-box !important;
    }

    /* Fix navigation */
    .nav-links {
        display: none; /* Will be toggled by JS */
    }
    .nav-links.active {
        display: flex !important;
        flex-direction: column !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: var(--background) !important;
        z-index: 9999 !important;
        padding: 2rem !important;
        align-items: center !important;
        justify-content: center !important;
    }
    .mobile-menu-toggle {
        display: block !important;
        z-index: 10000 !important;
    }
}

@media (max-width: 480px) {
    /* Additional tweaks for very small screens */
    .section-padding {
        padding: 3rem 0 !important;
    }
    .btn {
        width: 100% !important;
        text-align: center !important;
    }
}
`;

const dir = 'c:\\Users\\russe\\Desktop\\dress';

// Append to styles.css as the central file
const stylesFile = path.join(dir, 'styles.css');
if (fs.existsSync(stylesFile)) {
    fs.appendFileSync(stylesFile, cssBlock, 'utf8');
    console.log('Appended global responsive CSS to styles.css');
}

// Ensure all HTML files have the viewport meta tag
const files = fs.readdirSync(dir);
files.forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        if (!content.includes('viewport')) {
            content = content.replace('<head>', '<head>\\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">');
            fs.writeFileSync(path.join(dir, file), content, 'utf8');
            console.log('Added viewport meta tag to ' + file);
        }
    }
});

console.log('Done!');
