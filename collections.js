document.addEventListener('DOMContentLoaded', () => {
    
    // Core Collections Data
    const collectionsData = [
        {
            id: 'men',
            title: 'Menswear',
            desc: 'The Foundation of Modern Tailoring',
            banner: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974',
            story: [
                "This season, menswear shifts its focus towards unstructured elegance. We are stepping away from rigid formality and embracing a softer, more fluid silhouette that allows for breathability and movement without sacrificing sophistication.",
                "The color palette draws heavily from brutalist architecture—concrete grays, deep slate, and muted navy tones, providing a versatile foundation that seamlessly transitions from boardroom to evening gallery viewings."
            ],
            gallery: [
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1974",
                "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071",
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935"
            ],
            products: [
                { name: 'Unstructured Wool Blazer', price: '$1,250', img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974' },
                { name: 'Cashmere Turtleneck', price: '$850', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976' },
                { name: 'Suede Loafers', price: '$650', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974' }
            ],
            tips: [
                "Proportion is key: pair oversized blazers with slim, straight trousers.",
                "Invest in knitwear. A fine-gauge cashmere acts as the perfect transitional layer.",
                "Swap traditional oxfords for suede loafers to instantly relax a formal look.",
                "Embrace tonal dressing. Layering shades of navy creates immediate visual depth."
            ]
        },
        {
            id: 'women',
            title: 'Womenswear',
            desc: 'Architectural Fluidity',
            banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070',
            story: [
                "The womenswear collection explores the tension between masculine tailoring and feminine draping. We focus on pieces that empower the wearer through bold cuts while maintaining an effortless elegance through the use of premium, lightweight silks and wools.",
                "Expect to see exaggerated shoulders paired with bias-cut skirts, challenging traditional proportions. The narrative is one of quiet luxury—where the quality of the fabric speaks louder than logos."
            ],
            gallery: [
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920",
                "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964",
                "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915"
            ],
            products: [
                { name: 'Bias Cut Silk Slip', price: '$950', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983' },
                { name: 'Oversized Wool Coat', price: '$2,100', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974' },
                { name: 'Sculptural Tote Bag', price: '$1,400', img: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1974' }
            ],
            tips: [
                "Use a structured belt to define the waist over oversized silhouettes.",
                "Mix textures: pair heavy wool coats with delicate silk slips.",
                "Minimalist jewelry provides the perfect accent to complex draping.",
                "A strong shoulder line instantly elevates casual denim."
            ]
        },
        // Using a loop to generate the remaining 10 to simulate the full page experience 
        // while maintaining high performance and realistic mock data
    ];

    const additionalCategories = [
        { id: 'casual', title: 'The Casual Edit', desc: 'Elevated Off-Duty', banner: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935' },
        { id: 'formal', title: 'Formal Attire', desc: 'Sartorial Excellence', banner: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974' },
        { id: 'business', title: 'Business Class', desc: 'The Modern Executive', banner: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974' },
        { id: 'streetwear', title: 'Streetwear', desc: 'Urban Aesthetics', banner: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974' },
        { id: 'party', title: 'Evening & Party', desc: 'Nocturnal Glamour', banner: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983' },
        { id: 'luxury', title: 'High Luxury', desc: 'The Atelier Collection', banner: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070' },
        { id: 'summer', title: 'Summer Resort', desc: 'Sun-Drenched Silhouettes', banner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920' },
        { id: 'winter', title: 'Winter Alpine', desc: 'Cold Weather Protection', banner: 'https://images.unsplash.com/photo-1574291814206-363acdf2aa79?q=80&w=1974' },
        { id: 'new', title: 'New Arrivals', desc: 'The Latest Drops', banner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071' },
        { id: 'trending', title: 'Trending Now', desc: 'The Current Zeitgeist', banner: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1974' }
    ];

    // Image pool for dynamic categories to ensure they do not repeat images
    const poolImages = [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600",
        "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=600",
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600",
        "https://images.unsplash.com/photo-1574291814206-363acdf2aa79?q=80&w=600",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600",
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600",
        "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600",
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=600",
        "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600",
        "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?q=80&w=600",
        "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=600",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600",
        "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600",
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600",
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600",
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600",
        "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?q=80&w=600",
        "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=600",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600",
        "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=600",
        "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600",
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=600"
    ];

    function getUniqueImagesForCategory(banner, count, categoryIndex) {
        const selected = [];
        let poolIndex = (categoryIndex * 6) % poolImages.length;
        
        while (selected.length < count) {
            const candidate = poolImages[poolIndex];
            // Ensure the candidate doesn't match the banner, nor already selected
            if (candidate !== banner && !selected.includes(candidate)) {
                selected.push(candidate);
            }
            poolIndex = (poolIndex + 1) % poolImages.length;
        }
        return selected;
    }

    additionalCategories.forEach((cat, index) => {
        const uniqueImgs = getUniqueImagesForCategory(cat.banner, 6, index);
        collectionsData.push({
            id: cat.id,
            title: cat.title,
            desc: cat.desc,
            banner: cat.banner,
            story: [
                `The ${cat.title} collection represents our interpretation of contemporary luxury within this specific paradigm. We have focused on curating pieces that offer maximum versatility without compromising on the uncompromising quality our house is known for.`,
                `Sourced from the finest mills across Italy and Japan, the textiles used in this volume are designed to age gracefully, developing a unique patina that tells the story of the wearer over time.`
            ],
            gallery: [
                uniqueImgs[0],
                uniqueImgs[1],
                uniqueImgs[2]
            ],
            products: [
                { name: 'Signature Piece 01', price: '$1,100', img: uniqueImgs[3] },
                { name: 'Essential Knit', price: '$650', img: uniqueImgs[4] },
                { name: 'Premium Footwear', price: '$890', img: uniqueImgs[5] }
            ],
            tips: [
                "Focus on building a strong foundation of basics.",
                "Let one statement piece anchor your entire outfit.",
                "Invest in high-quality accessories to elevate simple looks.",
                "Tailoring is non-negotiable; ensure every piece fits perfectly."
            ]
        });
    });

    const tocList = document.getElementById('toc-list');
    const container = document.getElementById('collections-container');

    collectionsData.forEach((col, index) => {
        // 1. Generate TOC Link
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${col.id}">${(index + 1).toString().padStart(2, '0')}. ${col.title}</a>`;
        tocList.appendChild(li);

        // 2. Generate Section HTML
        const sectionHTML = `
            <section class="collection-section" id="${col.id}">
                <!-- Banner -->
                <div class="col-banner">
                    <img src="${col.banner}" alt="${col.title}">
                    <div class="col-banner-overlay">
                        <div class="col-number">VOL ${(index + 1).toString().padStart(2, '0')}</div>
                        <h2 class="col-title">${col.title}</h2>
                    </div>
                </div>

                <!-- Story -->
                <div class="col-story">
                    <div>
                        <h3>${col.desc}</h3>
                    </div>
                    <div>
                        <p>${col.story[0]}</p>
                        <p>${col.story[1]}</p>
                    </div>
                </div>

                <!-- Gallery -->
                <div class="col-gallery">
                    <div class="col-gallery-img large">
                        <img src="${col.gallery[0]}" alt="Editorial Large">
                    </div>
                    <div class="col-gallery-img">
                        <img src="${col.gallery[1]}" alt="Editorial Small 1">
                    </div>
                    <div class="col-gallery-img">
                        <img src="${col.gallery[2]}" alt="Editorial Small 2">
                    </div>
                </div>

                <!-- Products -->
                <div class="col-products-header">
                    <h4>Shop The Edit</h4>
                    <a href="shop.html" style="font-family: var(--font-accent); text-transform: uppercase; font-size: 0.875rem; color: var(--primary);">View All →</a>
                </div>
                <div class="col-products-grid">
                    ${col.products.map(p => `
                        <div class="mini-product">
                            <div class="mini-product-img"><img src="${p.img}" alt="${p.name}"></div>
                            <h5>${p.name}</h5>
                            <p>${p.price}</p>
                        </div>
                    `).join('')}
                </div>

                <!-- Style Tips -->
                <div class="col-tips">
                    <h4>Style Directives</h4>
                    <ul>
                        ${col.tips.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            </section>
        `;
        
        container.insertAdjacentHTML('beforeend', sectionHTML);
    });

    // Active State for TOC on Scroll
    const sections = document.querySelectorAll('.collection-section');
    const navLinks = document.querySelectorAll('.toc-list a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // Aesthetic Card Click Routing
    const aestheticCards = document.querySelectorAll('.collection-aesthetic');
    aestheticCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            window.location.href = `shop.html?search=${encodeURIComponent(title)}`;
        });
    });

    // Mini Product Click Routing to Product Details Page
    document.addEventListener('click', (e) => {
        const miniProd = e.target.closest('.mini-product');
        if (miniProd) {
            window.location.href = 'product.html';
        }
    });
});
