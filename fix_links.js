const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\russe\\Desktop\\dress';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Social Media Links (Footer)
    content = content.replace(/<a href="#" aria-label="Instagram">/g, '<a href="https://instagram.com/styleai" target="_blank" aria-label="Instagram">');
    content = content.replace(/<a href="#" aria-label="Twitter">/g, '<a href="https://twitter.com/styleai" target="_blank" aria-label="Twitter">');
    content = content.replace(/<a href="#" aria-label="TikTok">/g, '<a href="https://tiktok.com/@styleai" target="_blank" aria-label="TikTok">');
    
    // Social Media Text Links (Footer Bottom)
    content = content.replace(/<a href="#">Instagram<\/a>/g, '<a href="https://instagram.com/styleai" target="_blank">Instagram</a>');
    content = content.replace(/<a href="#">Twitter<\/a>/g, '<a href="https://twitter.com/styleai" target="_blank">Twitter</a>');
    content = content.replace(/<a href="#">TikTok<\/a>/g, '<a href="https://tiktok.com/@styleai" target="_blank">TikTok</a>');

    // Nav Icons
    content = content.replace(/<a href="#" class="nav-icon-wrapper" id="theme-toggle"/g, '<a href="javascript:void(0);" class="nav-icon-wrapper" id="theme-toggle"');
    content = content.replace(/<a href="#" class="nav-icon-wrapper" style="color: inherit;" aria-label="Search">/g, '<a href="javascript:void(0);" class="nav-icon-wrapper" style="color: inherit;" aria-label="Search">');
    content = content.replace(/<a href="#" class="nav-icon-wrapper" id="cart-icon"/g, '<a href="javascript:void(0);" class="nav-icon-wrapper" id="cart-icon"');

    // collections.html specific
    if (file === 'collections.html') {
        content = content.replace(/<a href="#" class="btn btn-outline" style="border-color:#fff; color:#fff;">View Collection<\/a>/g, '<a href="shop.html" class="btn btn-outline" style="border-color:#fff; color:#fff;">View Collection</a>');
    }

    // stylist.html specific
    if (file === 'stylist.html') {
        content = content.replace(/<a href="#">View Archive<\/a>/g, '<a href="login.html">View Archive</a>');
        content = content.replace(/<a href="#" class="btn btn-outline" style="width: 100%;">Current Plan<\/a>/g, '<a href="login.html" class="btn btn-outline" style="width: 100%;">Current Plan</a>');
        content = content.replace(/<a href="#" class="btn btn-primary" style="width: 100%; background: var\(--cards\); color: var\(--text\);">Upgrade Now<\/a>/g, '<a href="login.html" class="btn btn-primary" style="width: 100%; background: var(--cards); color: var(--text);">Upgrade Now</a>');
        content = content.replace(/<a href="#" class="btn btn-outline" style="width: 100%;">Apply for Access<\/a>/g, '<a href="contact.html" class="btn btn-outline" style="width: 100%;">Apply for Access</a>');
    }

    // shop.html specific
    if (file === 'shop.html') {
        content = content.replace(/<a href="#" class="btn btn-primary" style="margin-top: 3rem;">Shop Cashmere<\/a>/g, '<a href="collections.html" class="btn btn-primary" style="margin-top: 3rem;">Shop Cashmere</a>');
    }

    // contact.html specific
    if (file === 'contact.html') {
        content = content.replace(/<a href="#" style="color: var\(--text\); text-decoration: underline; font-weight: 500;">Wholesale Portal<\/a>/g, '<a href="login.html" style="color: var(--text); text-decoration: underline; font-weight: 500;">Wholesale Portal</a>');
        content = content.replace(/<a href="#" style="color: var\(--text\); text-decoration: underline; font-weight: 500;">Press Kit<\/a>/g, '<a href="about.html" style="color: var(--text); text-decoration: underline; font-weight: 500;">Press Kit</a>');
    }

    // about.html specific
    if (file === 'about.html') {
        content = content.replace(/<a href="#" class="btn btn-outline" style="border-color: var\(--text\); color: var\(--text\);">View Open Roles<\/a>/g, '<a href="contact.html" class="btn btn-outline" style="border-color: var(--text); color: var(--text);">View Open Roles</a>');
        content = content.replace(/<a href="#" style="color: var\(--text\); text-decoration: underline; font-weight: 500; display: inline-block; margin-top: 1rem;">Read our 2026 Impact Report<\/a>/g, '<a href="javascript:void(0);" style="color: var(--text); text-decoration: underline; font-weight: 500; display: inline-block; margin-top: 1rem;">Read our 2026 Impact Report</a>');
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
});

console.log("All hrefs updated successfully!");
