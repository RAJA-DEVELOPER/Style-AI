// Theme Initialization
const currentTheme = localStorage.getItem('styleai_theme') || 'light';
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const updateThemeIcon = (theme) => {
        if (!themeToggle) return;
        if (theme === 'dark') {
            // Sun Icon for Dark Mode (to switch to light)
            themeToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        } else {
            // Moon Icon for Light Mode (to switch to dark)
            themeToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        }
    };

    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('styleai_theme', 'light');
                updateThemeIcon('light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('styleai_theme', 'dark');
                updateThemeIcon('dark');
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle Logic
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navLinksContainer.classList.toggle('active');
            // Toggle icon (hamburger to close)
            if (navLinksContainer.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
                document.body.style.overflow = '';
            }
        });
    }

    // Active Nav Link Logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Form Submission (Prevent Default for Demo)
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            if (!input) return;
            input.value = 'Subscribed successfully!';
            input.style.color = 'var(--primary)';
            setTimeout(() => {
                input.value = '';
                input.style.color = '';
            }, 3000);
        });
    });

    // Global Wishlist Count and Icon State Sync
    const syncWishlistGlobal = () => {
        const wishlistData = JSON.parse(localStorage.getItem('styleai_wishlist')) || { products: [] };
        const wishlistProductIds = new Set((wishlistData.products || []).map(p => p.id));
        
        // Update Navbar Wishlist badge count
        const count = wishlistProductIds.size;
        const wishlistIcon = document.getElementById('wishlist-icon');
        const wishlistBadge = wishlistIcon ? wishlistIcon.querySelector('.wishlist-counter-icon') : null;
        if (wishlistBadge) {
            if (count > 0) {
                wishlistBadge.textContent = count;
                wishlistBadge.style.display = 'flex';
            } else {
                wishlistBadge.style.display = 'none';
            }
        }

        // Update all product cards and product details heart icons on the page
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

        // Update product details page button if present
        const productBtn = document.querySelector('.add-to-cart-btn');
        const detailWishlistBtn = document.querySelector('.product-actions-wrapper .wishlist-btn');
        if (productBtn && detailWishlistBtn) {
            const id = productBtn.dataset.id || 'p1';
            const svg = detailWishlistBtn.querySelector('svg');
            if (svg) {
                const isInWishlist = wishlistProductIds.has(id);
                const fillVal = isInWishlist ? 'currentColor' : 'none';
                svg.setAttribute('fill', fillVal);
                svg.style.fill = fillVal;
            }
        }
    };

    // Initialize state on page load
    syncWishlistGlobal();

    // Listen for custom state changes
    document.addEventListener('wishlistChanged', syncWishlistGlobal);

    // Global Wishlist Toggle and LocalStorage Sync
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.wishlist-btn');
        if (btn) {
            e.preventDefault();
            const svg = btn.querySelector('svg');
            if (!svg) return;
            
            const isAdded = svg.getAttribute('fill') === 'currentColor' || svg.style.fill === 'currentColor';
            
            // Extract product details
            const card = btn.closest('.product-card');
            let product = null;
            
            if (card) {
                const img = card.querySelector('img')?.src;
                const brand = card.querySelector('.product-brand')?.innerText || 'StyleAI';
                const title = card.querySelector('.product-title')?.innerText;
                const price = card.querySelector('.product-price')?.innerText;
                const id = card.getAttribute('data-id') || title?.replace(/\s+/g, '-').toLowerCase();
                
                if (title && price && img) {
                    product = { id, type: 'clothing', brand, title, price, img };
                }
            } else {
                // Check if on product details page
                const productBtn = document.querySelector('.add-to-cart-btn');
                if (productBtn) {
                    const id = productBtn.dataset.id;
                    const title = productBtn.dataset.name;
                    const price = '$' + productBtn.dataset.price;
                    const img = productBtn.dataset.img;
                    product = { id, type: 'clothing', brand: 'StyleAI', title, price, img };
                }
            }
            
            let wishlistData = JSON.parse(localStorage.getItem('styleai_wishlist')) || { products: [], looks: [], recent: [] };
            
            if (isAdded) {
                // Remove from wishlist
                if (product) {
                    wishlistData.products = (wishlistData.products || []).filter(p => p.id !== product.id);
                }
            } else {
                // Add to wishlist
                if (product && !(wishlistData.products || []).some(p => p.id === product.id)) {
                    wishlistData.products.push(product);
                }
            }
            
            localStorage.setItem('styleai_wishlist', JSON.stringify(wishlistData));
            
            // Dispatch custom event to let wishlist page know it changed
            document.dispatchEvent(new CustomEvent('wishlistChanged'));
        }
    });

    // Search Icon Click Handler
    const searchIcons = document.querySelectorAll('a[aria-label="Search"]');
    searchIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            if (currentPath === 'shop.html') {
                const input = document.querySelector('.filter-group.search-bar input');
                if (input) {
                    input.focus();
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                window.location.href = 'shop.html';
            }
        });
    });

    // Profile Dropdown Handler
    const profileIcon = document.querySelector('a[aria-label="User Account"]');
    if (profileIcon) {
        // Create dropdown element
        const dropdown = document.createElement('div');
        dropdown.className = 'profile-dropdown';
        dropdown.innerHTML = `
            <a href="login.html">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                Login / Signup
            </a>
            <a href="admin.html">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                Admin Dashboard
            </a>
        `;

        // Create wrapper and wrap the profile icon
        const wrapper = document.createElement('div');
        wrapper.className = 'profile-dropdown-wrapper';
        
        // Wrap profileIcon inside the wrapper
        profileIcon.parentNode.insertBefore(wrapper, profileIcon);
        wrapper.appendChild(profileIcon);
        wrapper.appendChild(dropdown);

        // Click handler to toggle dropdown
        profileIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
        
        // Close dropdown on pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdown.classList.remove('show');
            }
        });
    }

    // Product Card Click Logic
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Ignore clicks on 'add-to-cart' buttons inside the card
            if (e.target.closest('.add-to-cart') || e.target.closest('.add-to-cart-btn')) return;

            const title = card.querySelector('.product-title')?.innerText;
            const price = card.querySelector('.product-price')?.innerText;
            const img = card.querySelector('.product-img')?.src;
            
            if (title && price && img) {
                window.location.href = `product.html?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&img=${encodeURIComponent(img)}`;
            }
        });
    });
});
