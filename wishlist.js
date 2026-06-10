document.addEventListener('DOMContentLoaded', () => {

    // Initial Data Seeding for Demonstration Purposes
    const seedData = {
        products: [
            { id: 'p1', type: 'clothing', brand: 'The Row', title: 'Crespi Wool-Blend Blazer', price: '$2,890', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974' },
            { id: 'p2', type: 'shoes', brand: 'Saint Laurent', title: 'Wyatt Leather Boots', price: '$1,150', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012' },
            { id: 'p3', type: 'accessories', brand: 'Bottega Veneta', title: 'Intrecciato Tote', price: '$3,400', img: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1974' },
            { id: 'p4', type: 'clothing', brand: 'Jil Sander', title: 'Chunky Knit Sweater', price: '$1,100', img: 'https://images.unsplash.com/photo-1574291814206-363acdf2aa79?q=80&w=1974' },
            { id: 'p5', type: 'accessories', brand: 'Cartier', title: 'Tank Must Watch', price: '$3,150', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070' }
        ],
        looks: [
            { id: 'l1', type: 'look', brand: 'Curated Look', title: 'The Minimalist Executive', price: '4 Items', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071' },
            { id: 'l2', type: 'look', brand: 'Curated Look', title: 'Summer Evening', price: '3 Items', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920' },
            { id: 'l3', type: 'look', brand: 'Curated Look', title: 'Weekend Architect', price: '5 Items', img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974' }
        ],
        recent: [
            { id: 'r1', type: 'shoes', brand: 'Balenciaga', title: 'Track 2.0 Sneakers', price: '$1,050', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974' },
            { id: 'r2', type: 'clothing', brand: 'Maison Margiela', title: 'Silk Evening Dress', price: '$1,850', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983' }
        ]
    };

    // Initialize LocalStorage if empty
    if (!localStorage.getItem('styleai_wishlist')) {
        localStorage.setItem('styleai_wishlist', JSON.stringify(seedData));
    }

    // State Variables
    let wishlistData = JSON.parse(localStorage.getItem('styleai_wishlist'));
    let currentTab = 'products';
    let searchQuery = '';
    let categoryFilter = 'all';

    const container = document.getElementById('wishlist-container');
    const emptyState = document.getElementById('empty-state');
    const tabs = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('wishlist-search');
    const filterSelect = document.getElementById('wishlist-filter');
    const toast = document.getElementById('toast');

    // Render Function
    function render() {
        let items = wishlistData[currentTab] || [];

        // Apply Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            items = items.filter(item => 
                item.title.toLowerCase().includes(q) || 
                item.brand.toLowerCase().includes(q)
            );
        }

        // Apply Filter
        if (categoryFilter !== 'all' && currentTab !== 'looks') {
            items = items.filter(item => item.type === categoryFilter);
        }

        // Display Logic
        if (items.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            const html = items.map(item => `
                <div class="wishlist-card ${currentTab === 'looks' ? 'look-card' : ''}" data-id="${item.id}">
                    <div class="wishlist-img-wrapper">
                        <button class="remove-btn" title="Remove">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <img src="${item.img}" alt="${item.title}">
                        <button class="move-to-cart-btn">${currentTab === 'looks' ? 'Shop This Look' : 'Move to Cart'}</button>
                    </div>
                    <div class="wishlist-info">
                        <div class="wishlist-brand">${item.brand}</div>
                        <h3 class="wishlist-title">${item.title}</h3>
                        <div class="wishlist-price">${item.price}</div>
                    </div>
                </div>
            `).join('');
            
            container.innerHTML = `<div class="wishlist-grid">${html}</div>`;
        }
    }

    // Show Toast
    function showToast(message) {
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Event Listeners: Tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentTab = e.target.getAttribute('data-tab');
            
            // Hide filter for looks/recent if desired, or keep it.
            if(currentTab === 'looks') {
                filterSelect.style.opacity = '0.5';
                filterSelect.disabled = true;
            } else {
                filterSelect.style.opacity = '1';
                filterSelect.disabled = false;
            }

            render();
        });
    });

    // Event Listeners: Search & Filter
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
    });

    filterSelect.addEventListener('change', (e) => {
        categoryFilter = e.target.value;
        render();
    });

    // Event Listeners: Card Actions (Event Delegation)
    container.addEventListener('click', (e) => {
        const card = e.target.closest('.wishlist-card');
        if (!card) return;
        const id = card.getAttribute('data-id');

        // Remove Item
        if (e.target.closest('.remove-btn')) {
            wishlistData[currentTab] = wishlistData[currentTab].filter(item => item.id !== id);
            localStorage.setItem('styleai_wishlist', JSON.stringify(wishlistData));
            render();
            showToast('Item removed from archives.');
        }

        // Move to Cart
        if (e.target.closest('.move-to-cart-btn')) {
            const item = wishlistData[currentTab].find(i => i.id === id);
            if (item && window.addToCart) {
                window.addToCart({
                    id: item.id,
                    brand: item.brand,
                    title: item.title,
                    price: item.price,
                    img: item.img,
                    quantity: 1
                });
            }
            // Simulate moving to cart (removing from wishlist)
            wishlistData[currentTab] = wishlistData[currentTab].filter(item => item.id !== id);
            localStorage.setItem('styleai_wishlist', JSON.stringify(wishlistData));
            render();
            showToast('Added to your shopping bag.');
        }
    });

    // Render Recommendations
    const recs = [
        { brand: 'Acne Studios', title: 'Oversized Leather Biker', price: '$2,100', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935' },
        { brand: 'Tiffany & Co.', title: 'HardWear Link Necklace', price: '$2,500', img: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=2080' },
        { brand: 'Loro Piana', title: 'Summer Walk Loafers', price: '$980', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974' },
        { brand: 'Tom Ford', title: 'Shelton Wool Suit', price: '$4,250', img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974' }
    ];

    document.getElementById('recommendation-grid').innerHTML = recs.map(item => `
        <div class="wishlist-card">
            <div class="wishlist-img-wrapper">
                <img src="${item.img}" alt="${item.title}">
                <button class="move-to-cart-btn">Quick Add</button>
            </div>
            <div class="wishlist-info">
                <div class="wishlist-brand">${item.brand}</div>
                <h3 class="wishlist-title">${item.title}</h3>
                <div class="wishlist-price">${item.price}</div>
            </div>
        </div>
    `).join('');

    // Initial Render
    render();

    // Alert settings button listener
    const alertBtn = Array.from(document.querySelectorAll('.btn-outline')).find(el => el.textContent.includes('Alert Settings'));
    if (alertBtn) {
        alertBtn.addEventListener('click', () => {
            showToast('AI Price alerts are now active for your archive items.');
        });
    }

    // Query click listener to search in shop.html
    const querySpans = document.querySelectorAll('.section-padding span');
    querySpans.forEach(span => {
        if (span.style.cursor === 'pointer' || span.offsetHeight > 0) {
            span.addEventListener('click', () => {
                window.location.href = `shop.html?search=${encodeURIComponent(span.innerText)}`;
            });
        }
    });

    // Handle custom event from global script
    document.addEventListener('wishlistChanged', () => {
        wishlistData = JSON.parse(localStorage.getItem('styleai_wishlist'));
        render();
    });

});
