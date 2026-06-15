document.addEventListener('DOMContentLoaded', () => {
    
    // Product Database (40 Realistic Products)
    const images = [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600", // 1. Oversized Wool Coat
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600", // 2. Double-Breasted Blazer
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600", // 3. Cashmere Turtleneck
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600", // 4. Silk Blouse
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600", // 5. Tailored Wool Trousers
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600", // 6. Suede Penny Loafers
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600", // 7. Leather Chelsea Boots
        "https://images.unsplash.com/photo-1574291814206-363acdf2aa79?q=80&w=600", // 8. Chunky Knit Sweater
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600", // 9. Oversized Leather Biker
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600", // 10. Track Sneakers
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600", // 11. Silk Slip Dress
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600", // 12. Ribbed Merino Sweater
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600", // 13. Cotton Poplin Shirt
        "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600", // 14. Wide-Leg Linen Pants
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600", // 15. Linen Button-Down Shirt
        "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?q=80&w=600", // 16. Minimalist Sneakers
        "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=600", // 17. Belted Trench Coat
        "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600", // 18. V-Neck Cashmere Cardigan
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600", // 19. Pleated Midi Skirt
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600", // 20. Pleated Wool Trousers
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600", // 21. Relaxed Fit Suit Jacket
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600", // 22. Cropped Denim Jacket
        "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?q=80&w=600", // 23. Satin Midi Dress
        "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=600", // 24. Woven Leather Mules
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=600", // 25. High-Waisted Trousers
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600", // 26. Cashmere V-Neck Sweater
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600", // 27. Denim Midi Skirt
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600", // 28. Oversized Cotton T-Shirt
        "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?q=80&w=600", // 29. Wool Blend Overcoat
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=600", // 30. Ribbed Cotton Tank
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600", // 31. Flared Corduroy Pants
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600", // 32. Silk Camisole
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600", // 33. Straight-Leg Jeans
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600", // 34. Chelsea Leather Boots
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600", // 35. Ribbed Knit Dress
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600", // 36. Oversized Poplin Shirt
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600", // 37. Tailored Vest
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600", // 38. Classic Loafers
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600", // 39. Quilted Leather Jacket
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600"  // 40. Suede Ankle Boots
    ];

    const brands = ["The Row", "Jil Sander", "Bottega Veneta", "Acne Studios", "Lemaire", "COS", "Massimo Dutti", "Toteme", "Studio Nicholson", "Khaite"];
    
    const names = [
        "Oversized Wool Coat", "Double-Breasted Blazer", "Cashmere Turtleneck", "Silk Blouse",
        "Tailored Wool Trousers", "Suede Penny Loafers", "Leather Chelsea Boots", "Chunky Knit Sweater",
        "Oversized Leather Biker", "Track Sneakers", "Silk Slip Dress", "Ribbed Merino Sweater",
        "Cotton Poplin Shirt", "Wide-Leg Linen Pants", "Linen Button-Down Shirt", "Minimalist Sneakers",
        "Belted Trench Coat", "V-Neck Cashmere Cardigan", "Pleated Midi Skirt", "Pleated Wool Trousers",
        "Relaxed Fit Suit Jacket", "Cropped Denim Jacket", "Satin Midi Dress", "Woven Leather Mules",
        "High-Waisted Trousers", "Cashmere V-Neck Sweater", "Denim Midi Skirt", "Oversized Cotton T-Shirt",
        "Wool Blend Overcoat", "Ribbed Cotton Tank", "Flared Corduroy Pants", "Silk Camisole",
        "Straight-Leg Jeans", "Chelsea Leather Boots", "Ribbed Knit Dress", "Oversized Poplin Shirt",
        "Tailored Vest", "Classic Loafers", "Quilted Leather Jacket", "Suede Ankle Boots"
    ];

    const getCategory = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes("coat") || lower.includes("jacket") || lower.includes("trench") || lower.includes("biker") || lower.includes("overcoat")) return "Coats & Jackets";
        if (lower.includes("sweater") || lower.includes("cardigan") || lower.includes("knit") || lower.includes("turtleneck")) return "Knitwear";
        if (lower.includes("blazer") || lower.includes("suit") || lower.includes("vest") || lower.includes("trousers") || lower.includes("pants") || lower.includes("jeans") || lower.includes("corduroy")) return "Tailoring & Bottoms";
        if (lower.includes("dress") || lower.includes("gown") || lower.includes("slip") || lower.includes("skirt")) return "Dresses & Skirts";
        if (lower.includes("shirt") || lower.includes("top") || lower.includes("t-shirt") || lower.includes("camisole") || lower.includes("poplin") || lower.includes("blouse") || lower.includes("tank")) return "Shirts & Tops";
        if (lower.includes("loafers") || lower.includes("boots") || lower.includes("sneakers") || lower.includes("mules") || lower.includes("penny") || lower.includes("chelsea")) return "Shoes";
        return "Shirts & Tops";
    };

    const colorsList = ["Black", "White", "Beige", "Navy", "Brown", "Grey"];
    const sizesList = ["XS", "S", "M", "L", "XL", "OS"];

    const generateRating = () => {
        const fullStars = Math.floor(Math.random() * 2) + 4; // 4 or 5
        const reviewCount = Math.floor(Math.random() * 150) + 12;
        
        let starsHtml = '';
        for(let i=0; i<5; i++) {
            if(i < fullStars) {
                starsHtml += `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;
            } else {
                starsHtml += `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;
            }
        }
        return `<div class="product-rating">${starsHtml} <span class="count">(${reviewCount})</span></div>`;
    };

    const generateWishlistIcon = (productId) => {
        const wishlistData = JSON.parse(localStorage.getItem('styleai_wishlist')) || { products: [] };
        const isInWishlist = wishlistData.products.some(p => p.id === productId);
        const fillVal = isInWishlist ? 'currentColor' : 'none';
        return `
            <button class="wishlist-btn" title="Add to Wishlist">
                <svg viewBox="0 0 24 24" fill="${fillVal}" style="fill: ${fillVal};" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        `;
    };

    // Build product array
    const products = [];
    for (let i = 0; i < 40; i++) {
        const name = names[i % names.length];
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const priceNum = Math.floor(Math.random() * 2500) + 150;
        const img = images[i % images.length];
        const category = getCategory(name);
        const color = colorsList[i % colorsList.length];
        const size = sizesList[i % sizesList.length];
        const id = `shop-p-${i + 1}`;
        
        products.push({
            id,
            name,
            brand,
            priceNum,
            price: `$${priceNum.toLocaleString()}`,
            image: img,
            category,
            color,
            size
        });
    }

    const renderCard = (product) => {
        return `
            <div class="product-card animate-on-scroll" data-id="${product.id}">
                <div class="product-img-wrapper">
                    ${generateWishlistIcon(product.id)}
                    <button class="quick-view-btn">Quick View</button>
                    <img src="${product.image}" class="product-img" alt="${product.name}">
                    <button class="add-to-cart" aria-label="Add to Cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></button>
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price}</div>
                    ${generateRating()}
                </div>
            </div>
        `;
    };

    const grid = document.getElementById('product-grid');
    const resultsCountEl = document.querySelector('.results-count');

    // Filter and Search Elements
    const searchInput = document.querySelector('.filter-group.search-bar input');
    const categoryCheckboxes = document.querySelectorAll('.category-filter-group input[type="checkbox"]');
    const priceCheckboxes = document.querySelectorAll('.price-filter-group input[type="checkbox"]');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const sizeBtns = document.querySelectorAll('.size-filters .size-btn');
    const sortSelect = document.getElementById('sort');

    // Filter states
    let searchVal = '';
    let selectedCategories = [];
    let selectedPriceRanges = [];
    let selectedColor = '';
    let selectedSize = '';
    let currentSort = 'Recommended';

    // Parse search parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        searchVal = searchParam;
        if (searchInput) {
            searchInput.value = searchParam;
        }
    }

    // Categories array order matches HTML
    const categoryNames = [
        "Coats & Jackets", "Knitwear", "Tailoring & Bottoms", "Dresses & Skirts", "Shirts & Tops", "Shoes"
    ];

    // Price bounds
    const priceRanges = [
        { label: "Under $500", min: 0, max: 499 },
        { label: "$500 - $1,000", min: 500, max: 1000 },
        { label: "$1,000 - $2,500", min: 1001, max: 2500 },
        { label: "Over $2,500", min: 2501, max: Infinity }
    ];

    const applyFiltersAndSort = () => {
        let filtered = [...products];

        // 1. Search filter
        if (searchVal.trim() !== '') {
            const val = searchVal.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(val) || p.brand.toLowerCase().includes(val));
        }

        // 2. Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }

        // 3. Price Range filter
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter(p => {
                return selectedPriceRanges.some(range => p.priceNum >= range.min && p.priceNum <= range.max);
            });
        }

        // 4. Color filter
        if (selectedColor !== '') {
            filtered = filtered.filter(p => p.color === selectedColor);
        }

        // 5. Size filter
        if (selectedSize !== '') {
            filtered = filtered.filter(p => p.size === selectedSize);
        }

        // 6. Sort
        if (currentSort === 'Price: Low to High') {
            filtered.sort((a, b) => a.priceNum - b.priceNum);
        } else if (currentSort === 'Price: High to Low') {
            filtered.sort((a, b) => b.priceNum - a.priceNum);
        } else if (currentSort === 'Newest') {
            // Mock newer by id sorting
            filtered.reverse();
        }

        // Render Results
        if (grid) {
            if (filtered.length === 0) {
                grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem 0; color: var(--muted); font-size: 1.125rem;">No products match your active filters.</div>`;
            } else {
                grid.innerHTML = filtered.map(p => renderCard(p)).join('');
            }
        }

        if (resultsCountEl) {
            resultsCountEl.innerText = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
        }

        // Initialize scroll reveal again for filtered cards
        initScrollReveal();
    };

    // Event Listeners
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchVal = e.target.value;
            applyFiltersAndSort();
        });
    }

    categoryCheckboxes.forEach((cb, index) => {
        cb.addEventListener('change', () => {
            const catName = categoryNames[index];
            if (cb.checked) {
                selectedCategories.push(catName);
            } else {
                selectedCategories = selectedCategories.filter(c => c !== catName);
            }
            applyFiltersAndSort();
        });
    });

    priceCheckboxes.forEach((cb, index) => {
        cb.addEventListener('change', () => {
            const range = priceRanges[index];
            if (cb.checked) {
                selectedPriceRanges.push(range);
            } else {
                selectedPriceRanges = selectedPriceRanges.filter(r => r !== range);
            }
            applyFiltersAndSort();
        });
    });

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const colorTitle = swatch.getAttribute('title');
            if (selectedColor === colorTitle) {
                selectedColor = '';
                swatch.style.transform = '';
                swatch.style.boxShadow = '';
            } else {
                // Clear previous
                colorSwatches.forEach(s => {
                    s.style.transform = '';
                    s.style.boxShadow = '';
                });
                selectedColor = colorTitle;
                swatch.style.transform = 'scale(1.1)';
                swatch.style.boxShadow = '0 0 0 2px var(--background), 0 0 0 3px var(--text)';
            }
            applyFiltersAndSort();
        });
    });

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sizeVal = btn.innerText;
            if (selectedSize === sizeVal) {
                selectedSize = '';
                btn.style.borderColor = '';
                btn.style.background = '';
                btn.style.color = '';
            } else {
                sizeBtns.forEach(b => {
                    b.style.borderColor = '';
                    b.style.background = '';
                    b.style.color = '';
                });
                selectedSize = sizeVal;
                btn.style.borderColor = 'var(--text)';
                btn.style.background = 'var(--text)';
                btn.style.color = 'var(--cards)';
            }
            applyFiltersAndSort();
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFiltersAndSort();
        });
    }

    // Scroll reveal observer
    function initScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Card click routing to product details page
    document.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist-btn') || e.target.closest('.add-to-cart')) {
            return;
        }
        
        // Only redirect if clicking the product image or quick view button
        if (e.target.classList.contains('product-img') || e.target.classList.contains('quick-view-btn')) {
            const card = e.target.closest('.product-card');
            if (card) {
                const id = card.getAttribute('data-id') || '';
                const title = card.querySelector('.product-title') ? card.querySelector('.product-title').innerText : '';
                const price = card.querySelector('.product-price') ? card.querySelector('.product-price').innerText : '';
                const img = card.querySelector('.product-img') ? card.querySelector('.product-img').src : '';
                
                window.location.href = `product.html?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&img=${encodeURIComponent(img)}`;
            }
        }
    });

    // Scroll smoothly to results helper
    const scrollToResults = () => {
        const topbar = document.querySelector('.shop-topbar');
        if (topbar) {
            const navHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 80;
            const topOffset = topbar.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        }
    };

    // Handle Quick Links (Bags, Shoes, Jewelry, Suits)
    const quickLinks = document.querySelectorAll('.category-quick-links > div');
    const quickLinkCategories = ["Knitwear", "Shirts & Tops", "Coats & Jackets", "Tailoring & Bottoms", "Dresses & Skirts"];
    
    quickLinks.forEach((link, idx) => {
        link.addEventListener('click', () => {
            // Find corresponding category checkbox
            const targetCat = quickLinkCategories[idx];
            categoryCheckboxes.forEach((cb, cbIdx) => {
                if (categoryNames[cbIdx] === targetCat) {
                    cb.checked = !cb.checked;
                    // Trigger change logic manually
                    cb.dispatchEvent(new Event('change'));
                }
            });
            // Scroll to results smoothly after a brief delay to allow DOM render
            setTimeout(scrollToResults, 100);
        });
    });

    // Mobile Filter Drawer Toggle and Navigation
    const filterToggleBtn = document.getElementById('mobile-filter-toggle-btn');
    const filterCloseBtn = document.getElementById('filter-close');
    const filterOverlay = document.getElementById('filter-overlay');
    const shopFilters = document.getElementById('shop-filters');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');

    const openFiltersDrawer = () => {
        if (shopFilters) shopFilters.classList.add('active');
        if (filterOverlay) filterOverlay.classList.add('active');
        // Prevent page body from scrolling while filter is open
        document.body.style.overflow = 'hidden';
    };

    const closeFiltersDrawer = () => {
        if (shopFilters) shopFilters.classList.remove('active');
        if (filterOverlay) filterOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (filterToggleBtn) {
        filterToggleBtn.addEventListener('click', openFiltersDrawer);
    }
    if (filterCloseBtn) {
        filterCloseBtn.addEventListener('click', closeFiltersDrawer);
    }
    if (filterOverlay) {
        filterOverlay.addEventListener('click', closeFiltersDrawer);
    }
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            closeFiltersDrawer();
            // Scroll smoothly to results after drawer closes
            setTimeout(scrollToResults, 350);
        });
    }

    // Sync wishlist state globally on custom event without re-rendering grid
    const syncWishlistIcons = () => {
        const wishlistData = JSON.parse(localStorage.getItem('styleai_wishlist')) || { products: [] };
        const wishlistProductIds = new Set(wishlistData.products.map(p => p.id));
        
        document.querySelectorAll('.product-card').forEach(card => {
            const id = card.getAttribute('data-id');
            const btn = card.querySelector('.wishlist-btn');
            if (btn && id) {
                const svg = btn.querySelector('svg');
                if (svg) {
                    const isInWishlist = wishlistProductIds.has(id);
                    const fillVal = isInWishlist ? 'currentColor' : 'none';
                    svg.setAttribute('fill', fillVal);
                    svg.style.fill = fillVal;
                }
            }
        });
    };

    document.addEventListener('wishlistChanged', () => {
        syncWishlistIcons();
    });

    // Recommended Products (4 items)
    const recommendedGrid = document.getElementById('recommended-grid');
    if (recommendedGrid) {
        const recommended = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
        recommendedGrid.innerHTML = recommended.map(p => renderCard(p)).join('');
    }

    // Initial render
    applyFiltersAndSort();

});
