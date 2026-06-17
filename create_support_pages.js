const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\russe\\Desktop\\dress';

const header = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} | StyleAI</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="container nav-container">
            <div class="nav-logo"><a href="index.html" style="text-decoration:none; color:inherit;">StyleAI.</a></div>
            <div class="nav-links">
                <a href="index.html">Home</a>
                <a href="shop.html">Shop</a>
                <a href="stylist.html">AI Stylist</a>
                <a href="collections.html">Collections</a>
                <a href="about.html">About</a>
                <a href="contact.html">Contact</a>
            </div>
            <div class="nav-icons">
                <a href="#" class="nav-icon-wrapper" id="theme-toggle" style="color: inherit;" aria-label="Toggle Theme">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </a>
                <a href="#" class="nav-icon-wrapper" style="color: inherit;" aria-label="Search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </a>
                <a href="login.html" class="nav-icon-wrapper" style="color: inherit;" aria-label="User Account">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </a>
                <a href="wishlist.html" class="nav-icon-wrapper" id="wishlist-icon" style="color: inherit;" aria-label="Wishlist">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span class="wishlist-counter-icon" style="display: none;">0</span>
                </a>
                <a href="cart.html" class="nav-icon-wrapper" id="cart-icon" style="color: inherit;" aria-label="Cart">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    <span class="cart-counter" style="display: none;">0</span>
                </a>
                <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Menu">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>
        </div>
    </nav>

    <!-- Page Content -->
    <main style="padding: 8rem 0 4rem 0; background: var(--background); min-height: 60vh;">
        <div class="container" style="max-width: 800px;">
            <h1 style="font-family: var(--font-heading); font-size: 3rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">{{TITLE}}</h1>
            <div style="color: var(--text); line-height: 1.8; font-size: 1.125rem;">
                <p>Welcome to the StyleAI {{TITLE}} documentation. This document outlines our commitments and policies.</p>
                <p style="margin-top: 1.5rem;">For immediate assistance or detailed inquiries, please direct your correspondence to <a href="mailto:support@styleai.com" style="text-decoration: underline; color: var(--text);">support@styleai.com</a> or visit our <a href="contact.html" style="text-decoration: underline; color: var(--text);">Contact Page</a> for 24/7 global client services.</p>
            </div>
        </div>
    </main>
`;

const footerScriptStr = fs.readFileSync(path.join(dir, 'update_footer.js'), 'utf8');
const footerHtmlMatches = footerScriptStr.match(/<footer class="footer" id="footer">[\s\S]*?<\/footer>/);
const footerHtml = footerHtmlMatches ? footerHtmlMatches[0] : '';

const bottom = `
${footerHtml}
    <script src="script.js"></script>
    <script src="cart.js"></script>
</body>
</html>`;

const pages = [
    { file: 'faq.html', title: 'Frequently Asked Questions' },
    { file: 'shipping.html', title: 'Shipping Policy' },
    { file: 'returns.html', title: 'Returns & Exchanges' },
    { file: 'privacy.html', title: 'Privacy Policy' },
    { file: 'terms.html', title: 'Terms & Conditions' }
];

pages.forEach(p => {
    let fullHtml = header.replace(/{{TITLE}}/g, p.title) + bottom;
    fs.writeFileSync(path.join(dir, p.file), fullHtml, 'utf8');
    console.log('Created ' + p.file);
});
