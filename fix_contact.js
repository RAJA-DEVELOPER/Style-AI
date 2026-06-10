const fs = require('fs');

const contactHtmlPath = 'c:\\Users\\russe\\Desktop\\dress\\contact.html';
const contactCssPath = 'c:\\Users\\russe\\Desktop\\dress\\contact.css';

// Fix contact.html by reading up to "<!-- 3. FAQ -->" and appending the rest fixed.
let html = fs.readFileSync(contactHtmlPath, 'utf8');
const faqStart = html.indexOf('<!-- 3. FAQ -->');
if (faqStart !== -1) {
    html = html.substring(0, faqStart) + `<!-- 3. FAQ -->
    <section class="section-padding">
        <div class="container">
            <div class="text-center">
                <p class="section-subtitle animate-on-scroll">Knowledge Base</p>
                <h2 class="section-title animate-on-scroll">Frequently Asked Questions</h2>
            </div>
            
            <div class="faq-container animate-on-scroll" style="margin-top: 3rem;">
                <div class="faq-item">
                    <button class="faq-question">How does the AI Stylist determine my size?</button>
                    <div class="faq-answer">
                        <p>Our proprietary Biometric Mapping engine analyzes over 120 points from your uploaded photograph, cross-referencing them against the precise garment measurements provided by our 400+ luxury brand partners to guarantee a 98% fit accuracy.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">What is your global return policy?</button>
                    <div class="faq-answer">
                        <p>We offer complimentary global returns within 28 days of delivery. Items must be returned in their original, unworn condition with all StyleAI and designer tags still attached. A courier will be dispatched to your location to collect the item.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">Do you offer expedited international shipping?</button>
                    <div class="faq-answer">
                        <p>Yes. All orders are shipped via express premium logistics partners. Delivery typically occurs within 2-4 business days globally. Delivery times may vary slightly based on customs clearance in your specific region.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">Can I speak to a human stylist?</button>
                    <div class="faq-answer">
                        <p>Absolutely. While our AI engine provides the foundational curation, our tier-one clients have direct access to our Paris and New York based editorial stylists for final refinements and bespoke sourcing requests.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. Business Enquiries -->
    <section class="section-padding" style="background: var(--cards); border-top: 1px solid var(--border);">
        <div class="container">
            <div class="business-layout animate-on-scroll">
                <div>
                    <h2 style="color: var(--text); margin-bottom: 1rem;">Partnerships & Press</h2>
                    <p style="color: var(--muted); font-size: 1.125rem;">For brand collaborations, wholesale inquiries, or media relations, please connect with our corporate division.</p>
                </div>
                <div class="business-links">
                    <div class="biz-card">
                        <h4>Brand Partnerships</h4>
                        <a href="mailto:partners@styleai.com">partners@styleai.com</a>
                    </div>
                    <div class="biz-card">
                        <h4>Press & Media</h4>
                        <a href="mailto:press@styleai.com">press@styleai.com</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. Social Links -->
    <section class="section-padding text-center">
        <div class="container animate-on-scroll">
            <p class="section-subtitle">Join The Community</p>
            <div class="social-links">
                <a href="#">Instagram</a>
                <a href="#">TikTok</a>
                <a href="#">LinkedIn</a>
                <a href="#">Pinterest</a>
            </div>
        </div>
    </section>

    <!-- 6. Newsletter -->
    <section class="section-padding newsletter" id="newsletter">
        <div class="container animate-on-scroll">
            <p class="section-subtitle" style="color: rgba(255,255,255,0.7);">The Inner Circle</p>
            <h2 class="section-title">Join The Vanguard</h2>
            <p>Subscribe for exclusive access to private sales, editorial previews, and personalized style intelligence drops.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Email Address" required>
                <button type="submit" class="btn">Subscribe</button>
            </form>
        </div>
    </section>
` + html.substring(html.lastIndexOf('    <!-- Footer -->'));
    fs.writeFileSync(contactHtmlPath, html, 'utf8');
}

let css = fs.readFileSync(contactCssPath, 'utf8');
css = css.replace('background: rgba(255,255,255,0.05);', 'background: var(--background);')
         .replace('border: 1px solid rgba(255,255,255,0.1);', 'border: 1px solid var(--border);')
         .replace('color: rgba(255,255,255,0.7);', 'color: var(--muted);')
         .replace('color: #fff;', 'color: var(--text);')
         .replace('border-bottom: 1px solid rgba(255,255,255,0.3);', 'border-bottom: 1px solid var(--border);')
         .replace('border-bottom-color: #fff;', 'border-bottom-color: var(--primary);');
fs.writeFileSync(contactCssPath, css, 'utf8');
