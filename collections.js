document.addEventListener('DOMContentLoaded', () => {

    const fashionImages = [
        { id: 'pexels-994523', url: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-1021693', url: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-1130626', url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-1183266', url: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-1485805', url: 'https://images.pexels.com/photos/1485805/pexels-photo-1485805.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-1536619', url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2026775', url: 'https://images.pexels.com/photos/2026775/pexels-photo-2026775.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2194246', url: 'https://images.pexels.com/photos/2194246/pexels-photo-2194246.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325755', url: 'https://images.pexels.com/photos/2325755/pexels-photo-2325755.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325757', url: 'https://images.pexels.com/photos/2325757/pexels-photo-2325757.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325759', url: 'https://images.pexels.com/photos/2325759/pexels-photo-2325759.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325760', url: 'https://images.pexels.com/photos/2325760/pexels-photo-2325760.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325761', url: 'https://images.pexels.com/photos/2325761/pexels-photo-2325761.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325762', url: 'https://images.pexels.com/photos/2325762/pexels-photo-2325762.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325763', url: 'https://images.pexels.com/photos/2325763/pexels-photo-2325763.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325765', url: 'https://images.pexels.com/photos/2325765/pexels-photo-2325765.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325769', url: 'https://images.pexels.com/photos/2325769/pexels-photo-2325769.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325770', url: 'https://images.pexels.com/photos/2325770/pexels-photo-2325770.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325771', url: 'https://images.pexels.com/photos/2325771/pexels-photo-2325771.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2325773', url: 'https://images.pexels.com/photos/2325773/pexels-photo-2325773.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2385058', url: 'https://images.pexels.com/photos/2385058/pexels-photo-2385058.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2387873', url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2387875', url: 'https://images.pexels.com/photos/2387875/pexels-photo-2387875.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2387876', url: 'https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2480424', url: 'https://images.pexels.com/photos/2480424/pexels-photo-2480424.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2529146', url: 'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2529147', url: 'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2529148', url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2854164', url: 'https://images.pexels.com/photos/2854164/pexels-photo-2854164.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-2983464', url: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-3214659', url: 'https://images.pexels.com/photos/3214659/pexels-photo-3214659.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-3492558', url: 'https://images.pexels.com/photos/3492558/pexels-photo-3492558.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-3755463', url: 'https://images.pexels.com/photos/3755463/pexels-photo-3755463.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-3755706', url: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-4195342', url: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-4210863', url: 'https://images.pexels.com/photos/4210863/pexels-photo-4210863.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-4210864', url: 'https://images.pexels.com/photos/4210864/pexels-photo-4210864.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-4210865', url: 'https://images.pexels.com/photos/4210865/pexels-photo-4210865.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-4210866', url: 'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-4210868', url: 'https://images.pexels.com/photos/4210868/pexels-photo-4210868.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-4210870', url: 'https://images.pexels.com/photos/4210870/pexels-photo-4210870.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'pexels-4210871', url: 'https://images.pexels.com/photos/4210871/pexels-photo-4210871.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ];

    const allFashion = fashionImages;

    const collectionsData = [
        {
            id: 'men',
            title: 'Menswear',
            desc: 'The Foundation of Modern Tailoring',
            banner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&h=800&fit=crop',
            story: [
                "This season, menswear shifts its focus towards unstructured elegance. We are stepping away from rigid formality and embracing a softer, more fluid silhouette that allows for breathability and movement without sacrificing sophistication.",
                "The color palette draws heavily from brutalist architecture—concrete grays, deep slate, and muted navy tones, providing a versatile foundation that seamlessly transitions from boardroom to evening gallery viewings."
            ],
            gallery: [
                'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&h=1000&fit=crop',
                'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&h=800&fit=crop',
                'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=600&h=800&fit=crop'
            ],
            products: [
                { name: 'Unstructured Wool Blazer', price: '$1,250', img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&h=800&fit=crop' },
                { name: 'Cashmere Turtleneck', price: '$850', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&h=800&fit=crop' },
                { name: 'Suede Loafers', price: '$650', img: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=600&h=800&fit=crop' }
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
            banner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&h=800&fit=crop',
            story: [
                "The womenswear collection explores the tension between masculine tailoring and feminine draping. We focus on pieces that empower the wearer through bold cuts while maintaining an effortless elegance through the use of premium, lightweight silks and wools.",
                "Expect to see exaggerated shoulders paired with bias-cut skirts, challenging traditional proportions. The narrative is one of quiet luxury—where the quality of the fabric speaks louder than logos."
            ],
            gallery: [
                'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&h=1000&fit=crop',
                'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=600&h=800&fit=crop',
                'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=600&h=800&fit=crop'
            ],
            products: [
                { name: 'Bias Cut Silk Slip', price: '$950', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&h=800&fit=crop' },
                { name: 'Oversized Wool Coat', price: '$2,100', img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600&h=800&fit=crop' },
                { name: 'Sculptural Tote Bag', price: '$1,400', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&h=800&fit=crop' }
            ],
            tips: [
                "Use a structured belt to define the waist over oversized silhouettes.",
                "Mix textures: pair heavy wool coats with delicate silk slips.",
                "Minimalist jewelry provides the perfect accent to complex draping.",
                "A strong shoulder line instantly elevates casual denim."
            ]
        },
    ];

    const poolImages = allFashion.slice(0, 40);

    const formalImages = [
        { id: 'formal-suit-1', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600' },
        { id: 'formal-suit-2', url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600' },
        { id: 'formal-suit-3', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600' },
        { id: 'formal-suit-4', url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600' },
        { id: 'formal-suit-5', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600' },
        { id: 'formal-suit-6', url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600' },
        { id: 'formal-suit-7', url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=600' }
    ];

    const additionalCategories = [
        { id: 'casual', title: 'The Casual Edit', desc: 'Elevated Off-Duty', banner: allFashion[38].url },
        { id: 'formal', title: 'Formal Attire', desc: 'Sartorial Excellence', banner: formalImages[0].url }
    ];

    function getUniqueImagesForCategory(banner, count, categoryIndex) {
        const source = categoryIndex === 1 ? formalImages : poolImages;
        const selected = [];
        let poolIndex = (categoryIndex * 6) % source.length;

        while (selected.length < count) {
            const candidate = source[poolIndex];
            if (candidate.url !== banner && !selected.some(s => s.id === candidate.id)) {
                selected.push(candidate);
            }
            poolIndex = (poolIndex + 1) % source.length;
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
                uniqueImgs[0].url,
                uniqueImgs[1].url,
                uniqueImgs[2].url
            ],
            products: [
                { name: 'Signature Piece 01', price: '$1,100', img: uniqueImgs[3].url },
                { name: 'Essential Knit', price: '$650', img: uniqueImgs[4].url },
                { name: 'Premium Footwear', price: '$890', img: uniqueImgs[5].url }
            ],
            tips: [
                "Focus on building a strong foundation of basics.",
                "Let one statement piece anchor your entire outfit.",
                "Invest in high-quality accessories to elevate simple looks.",
                "Tailoring is non-negotiable; ensure every piece fits perfectly."
            ]
        });
    });

    const container = document.getElementById('collections-container');

    collectionsData.forEach((col, index) => {
        const sectionHTML = `
            <section class="collection-section" id="${col.id}">
                <div class="col-banner">
                    <img src="${col.banner}" alt="${col.title}">
                    <div class="col-banner-overlay">
                        <div class="col-number">VOL ${(index + 1).toString().padStart(2, '0')}</div>
                        <h2 class="col-title">${col.title}</h2>
                    </div>
                </div>

                <div class="col-story">
                    <div>
                        <h3>${col.desc}</h3>
                    </div>
                    <div>
                        <p>${col.story[0]}</p>
                        <p>${col.story[1]}</p>
                    </div>
                </div>

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

                <div class="col-products-header">
                    <h4>Shop The Edit</h4>
                    <a href="shop.html" class="link-action-button">View All</a>
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

    const aestheticCards = document.querySelectorAll('.collection-aesthetic');
    aestheticCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            window.location.href = `shop.html?search=${encodeURIComponent(title)}`;
        });
    });

    document.addEventListener('click', (e) => {
        const miniProd = e.target.closest('.mini-product');
        if (miniProd) {
            window.location.href = 'product.html';
        }
    });
});
