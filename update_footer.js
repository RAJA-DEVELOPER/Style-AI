const fs = require('fs');
const path = require('path');

const footerHtml = `    <!-- Footer -->
    <footer class="footer" id="footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Column 1 -->
                <div class="footer-brand">
                    <h3>StyleAI.</h3>
                    <p>Where artificial intelligence meets haute couture. Elevating your wardrobe with data-driven styling.</p>
                    <div class="social-icons" style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                        <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg></a>
                    </div>
                </div>
                <!-- Column 2 -->
                <div>
                    <div class="footer-title">Quick Links</div>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="shop.html">Shop</a></li>
                        <li><a href="stylist.html">AI Stylist</a></li>
                        <li><a href="collections.html">Collections</a></li>
                        <li><a href="wishlist.html">Wishlist</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <!-- Column 3 -->
                <div>
                    <div class="footer-title">Customer Support</div>
                    <ul class="footer-links">
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="shipping.html">Shipping Policy</a></li>
                        <li><a href="returns.html">Returns</a></li>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="terms.html">Terms & Conditions</a></li>
                    </ul>
                </div>
                <!-- Column 4 -->
                <div>
                    <div class="footer-title">Newsletter</div>
                    <p style="color: var(--muted); font-size: 0.875rem; margin-bottom: 1rem;">Subscribe to receive updates, access to exclusive deals, and more.</p>
                    <form class="newsletter-form" style="display: flex; flex-direction: column; gap: 0.5rem;" onsubmit="event.preventDefault();">
                        <input type="email" placeholder="Enter your email address" required style="padding: 0.75rem 1rem; border: 1px solid rgba(0,0,0,0.2); background: transparent; border-radius: 4px; color: var(--text); font-family: var(--font-body); width: 100%; box-sizing: border-box;">
                        <button type="submit" class="btn btn-primary" style="padding: 0.75rem 1rem; width: 100%; border-radius: 4px;">Subscribe</button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 StyleAI. All rights reserved.</p>
                <div class="footer-bottom-links">
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                    <a href="#">TikTok</a>
                </div>
            </div>
        </div>
    </footer>`;

const dir = 'c:\\Users\\russe\\Desktop\\dress';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !['admin.html', 'login.html', 'register.html'].includes(f));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace existing footer
    const regex = /<footer class="footer" id="footer">[\s\S]*?<\/footer>/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, footerHtml);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + file);
    }
});
