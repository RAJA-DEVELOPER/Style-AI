document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Cart Data in LocalStorage
    const seedCart = [
        {
            id: 'c1',
            brand: 'The Row',
            title: 'Crespi Wool-Blend Blazer',
            price: 2890,
            img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974',
            quantity: 1,
            size: 'M',
            color: 'Navy'
        }
    ];

    if (!localStorage.getItem('styleai_cart')) {
        localStorage.setItem('styleai_cart', JSON.stringify(seedCart));
    }

    let cartData = JSON.parse(localStorage.getItem('styleai_cart')) || [];

    // 2. Inject Sidebar HTML into Body
    const sidebarHTML = `
        <div class="cart-overlay" id="cart-overlay"></div>
        <div class="cart-sidebar" id="cart-sidebar">
            <div class="cart-header">
                <h2>Your Bag</h2>
                <button class="cart-close" id="cart-close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            
            <div class="cart-items" id="cart-items-container">
                <!-- Items injected here -->
            </div>

            <div class="cart-footer">
                <div class="cart-summary-row">
                    <span>Subtotal</span>
                    <span id="cart-subtotal">$0.00</span>
                </div>
                <div class="cart-summary-row">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                </div>
                <div class="cart-summary-row total">
                    <span>Total (USD)</span>
                    <span id="cart-total">$0.00</span>
                </div>
                <a href="cart.html" class="btn btn-primary" style="width: 100%; text-align: center; margin-top: 1.5rem;">Review & Checkout</a>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', sidebarHTML);

    // 3. DOM Elements
    const overlay = document.getElementById('cart-overlay');
    const sidebar = document.getElementById('cart-sidebar');
    const closeBtn = document.getElementById('cart-close');
    const itemsContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const cartIcon = document.getElementById('cart-icon'); // Will be added to navbars

    // Helper: format currency
    const formatMoney = (amount) => {
        return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // 4. Render Sidebar Function
    const renderCart = () => {
        // Read latest data from LocalStorage
        cartData = JSON.parse(localStorage.getItem('styleai_cart')) || [];

        // Update Counter
        const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
        
        // Find all cart counters (in case there are multiple, e.g. mobile nav)
        const counters = document.querySelectorAll('.cart-counter');
        counters.forEach(counter => {
            counter.innerText = totalItems;
            if (totalItems > 0) {
                counter.style.display = 'flex';
            } else {
                counter.style.display = 'none';
            }
        });

        // Calculate Totals
        const subtotal = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        subtotalEl.innerText = formatMoney(subtotal);
        totalEl.innerText = formatMoney(subtotal); // Taxes/shipping handled on full page

        // Render Items
        if (cartData.length === 0) {
            itemsContainer.innerHTML = `
                <div class="cart-empty-state">
                    <p>Your bag is currently empty.</p>
                    <a href="shop.html" class="btn btn-outline" style="margin-top: 1rem;">Continue Shopping</a>
                </div>
            `;
        } else {
            itemsContainer.innerHTML = cartData.map(item => `
                <div class="sidebar-item" data-id="${item.id}">
                    <div class="sidebar-item-img">
                        <img src="${item.img}" alt="${item.title}">
                    </div>
                    <div class="sidebar-item-details">
                        <div class="sidebar-item-brand">${item.brand}</div>
                        <h4 class="sidebar-item-title">${item.title}</h4>
                        <div class="sidebar-item-meta">Size: ${item.size || 'OS'} | ${item.color || 'Default'}</div>
                        <div class="sidebar-item-price">${formatMoney(item.price)}</div>
                        
                        <div class="sidebar-item-actions">
                            <div class="qty-control">
                                <button class="qty-btn minus">-</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn plus">+</button>
                            </div>
                            <button class="remove-btn-text">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    };

    // 5. Global Actions
    window.renderCart = renderCart;

    window.openCart = () => {
        renderCart();
        overlay.classList.add('active');
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    window.closeCart = () => {
        overlay.classList.remove('active');
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    };
    window.addToCart = (product) => {
        // Read latest data from LocalStorage
        cartData = JSON.parse(localStorage.getItem('styleai_cart')) || [];

        // Ensure price is numeric
        let numPrice = typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.-]+/g,"")) : product.price;
        
        const existing = cartData.find(i => i.id === product.id);
        if (existing) {
            existing.quantity += (product.quantity || 1);
        } else {
            cartData.push({
                id: product.id,
                brand: product.brand || 'StyleAI',
                title: product.title,
                price: numPrice,
                img: product.img,
                quantity: product.quantity || 1,
                size: product.size || 'M',
                color: product.color || 'Standard'
            });
        }
        
        // Save back to LocalStorage
        localStorage.setItem('styleai_cart', JSON.stringify(cartData));
        
        renderCart();
        window.openCart();
    };

    // 6. Event Listeners
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            window.openCart();
        });
    }

    closeBtn.addEventListener('click', window.closeCart);
    overlay.addEventListener('click', window.closeCart);

    // Event Delegation for Qty & Remove
    itemsContainer.addEventListener('click', (e) => {
        const itemEl = e.target.closest('.sidebar-item');
        if (!itemEl) return;
        
        // Read latest data from LocalStorage
        cartData = JSON.parse(localStorage.getItem('styleai_cart')) || [];

        const id = itemEl.getAttribute('data-id');
        const itemIndex = cartData.findIndex(i => i.id === id);
        
        if (itemIndex > -1) {
            if (e.target.classList.contains('plus')) {
                cartData[itemIndex].quantity += 1;
            }
            if (e.target.classList.contains('minus')) {
                if (cartData[itemIndex].quantity > 1) {
                    cartData[itemIndex].quantity -= 1;
                } else {
                    cartData.splice(itemIndex, 1);
                }
            }
            if (e.target.classList.contains('remove-btn-text')) {
                cartData.splice(itemIndex, 1);
            }
            
            // Save to LocalStorage
            localStorage.setItem('styleai_cart', JSON.stringify(cartData));
            
            renderCart();
        }
    });

    // Delegate "Add to Cart" globally if classes match
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart') || e.target.classList.contains('move-to-cart-btn')) {
            // Find parent card to extract info
            const card = e.target.closest('.product-card, .wishlist-card');
            if (card) {
                const img = card.querySelector('img').src;
                const brand = card.querySelector('.product-brand, .wishlist-brand')?.innerText || 'Brand';
                const title = card.querySelector('.product-title, .wishlist-title').innerText;
                const priceText = card.querySelector('.product-price, .wishlist-price').innerText;
                const id = card.getAttribute('data-id') || title.replace(/\s+/g, '-').toLowerCase();

                window.addToCart({ id, brand, title, price: priceText, img });
            }
        }
    });

    // Initial render
    renderCart();

});
