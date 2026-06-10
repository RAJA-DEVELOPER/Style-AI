document.addEventListener('DOMContentLoaded', () => {
    // URL Query Parameter Parsing for Dynamic Content
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    const titleParam = urlParams.get('title');
    const priceParam = urlParams.get('price');
    const imgParam = urlParams.get('img');
    
    if (titleParam) {
        const titleEl = document.querySelector('.product-title');
        if (titleEl) titleEl.innerText = titleParam;
        document.title = `${titleParam} | StyleAI`;
        const breadcrumbSpans = document.querySelectorAll('.breadcrumb span');
        if (breadcrumbSpans.length > 0) breadcrumbSpans[0].innerText = titleParam;
    }
    
    if (priceParam) {
        const priceEl = document.querySelector('.product-price');
        if (priceEl) priceEl.innerText = priceParam;
    }
    
    if (imgParam) {
        const galleryContainers = document.querySelectorAll('.gallery-img-container');
        if (galleryContainers.length > 0) {
            // Update the first image
            const firstImg = galleryContainers[0].querySelector('img');
            if (firstImg) firstImg.src = imgParam;
            galleryContainers[0].dataset.zoom = imgParam;
            
            // Hide the rest since we only have 1 image from the shop
            for (let i = 1; i < galleryContainers.length; i++) {
                galleryContainers[i].style.display = 'none';
            }
        }
        
        const tryonGhost = document.querySelector('.ghost-img');
        if (tryonGhost) tryonGhost.src = imgParam;
        
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.dataset.img = imgParam;
            if (idParam) addToCartBtn.dataset.id = idParam;
            if (titleParam) addToCartBtn.dataset.name = titleParam;
            if (priceParam) addToCartBtn.dataset.price = priceParam.replace(/[^0-9.]/g, '');
        }
    }

    // Initialize and Sync Wishlist Heart State on Product Detail Page
    const initWishlistState = () => {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        const wishlistBtn = document.querySelector('.wishlist-btn');
        if (addToCartBtn && wishlistBtn) {
            const id = addToCartBtn.dataset.id || 'p1';
            const wishlistData = JSON.parse(localStorage.getItem('styleai_wishlist')) || { products: [] };
            const isInWishlist = wishlistData.products.some(p => p.id === id);
            const svg = wishlistBtn.querySelector('svg');
            if (svg) {
                const fillVal = isInWishlist ? 'currentColor' : 'none';
                svg.setAttribute('fill', fillVal);
                svg.style.fill = fillVal;
            }
        }
    };
    
    initWishlistState();
    document.addEventListener('wishlistChanged', initWishlistState);

    // Selectors Logic
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const colorLabel = document.getElementById('selected-color');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            colorLabel.innerText = swatch.dataset.name;
        });
    });

    const sizeBtns = document.querySelectorAll('.size-btn:not(.disabled)');
    const sizeLabel = document.getElementById('selected-size');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            sizeLabel.innerText = btn.innerText;
        });
    });

    // Quantity Logic
    const qtyInput = document.querySelector('.qty-input');
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    
    if (minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
        });
        plusBtn.addEventListener('click', () => {
            if (qtyInput.value < 10) qtyInput.value = parseInt(qtyInput.value) + 1;
        });
    }

    // Image Zoom Logic
    const galleryImgs = document.querySelectorAll('.gallery-img-container');
    const zoomOverlay = document.getElementById('zoom-overlay');
    const zoomImg = document.getElementById('zoom-img');
    const closeZoom = document.getElementById('close-zoom');

    if (zoomOverlay && zoomImg && closeZoom) {
        galleryImgs.forEach(container => {
            // Click to zoom
            container.addEventListener('click', () => {
                zoomImg.src = container.dataset.zoom;
                zoomOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // Hover to mousemove pan (for desktop)
            const img = container.querySelector('img');
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;
                img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                img.style.transform = 'scale(1.5)';
            });
            
            container.addEventListener('mouseleave', () => {
                img.style.transformOrigin = 'center center';
                img.style.transform = 'scale(1)';
            });
        });

        closeZoom.addEventListener('click', () => {
            zoomOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const content = acc.nextElementSibling;
            const icon = acc.querySelector('.icon');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.innerText = '+';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.innerText = '-';
            }
        });
    });
    
    // Virtual Try-On Logic
    const tryonModal = document.getElementById('tryon-modal');
    const openTryon = document.getElementById('open-tryon-modal');
    const closeTryon = document.getElementById('close-tryon');
    
    if (tryonModal && openTryon && closeTryon) {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('photo-upload');
        const uploadPlaceholder = document.getElementById('upload-placeholder');
        const userPhotoPreview = document.getElementById('user-photo-preview');
        const tryonControls = document.getElementById('tryon-controls');
        
        const previewEmpty = document.getElementById('preview-empty');
        const previewLoading = document.getElementById('preview-loading');
        const previewResult = document.getElementById('preview-result');
        const finalResultImg = document.getElementById('final-result-img');
        const baToggle = document.getElementById('ba-toggle');
        const reuploadBtn = document.getElementById('reupload-btn');
        
        let uploadedImageSrc = '';

        // Open/Close Modal
        openTryon.addEventListener('click', () => {
            tryonModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closeTryon.addEventListener('click', () => {
            tryonModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Handle Upload Click
        uploadArea.addEventListener('click', () => {
            if(!uploadedImageSrc) fileInput.click();
        });

        // Drag and Drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            if(e.dataTransfer.files.length) {
                handleFile(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', function() {
            if(this.files.length) handleFile(this.files[0]);
        });

        function handleFile(file) {
            if(!file.type.startsWith('image/')) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImageSrc = e.target.result;
                
                // Show Left Preview
                uploadPlaceholder.style.display = 'none';
                userPhotoPreview.src = uploadedImageSrc;
                userPhotoPreview.style.display = 'block';
                uploadArea.style.cursor = 'default';
                
                // Trigger Right Loading Simulation
                previewEmpty.style.display = 'none';
                previewResult.style.display = 'none';
                previewLoading.style.display = 'flex';
                
                // Simulate AI Processing (3 seconds)
                setTimeout(() => {
                    previewLoading.style.display = 'none';
                    previewResult.style.display = 'flex';
                    finalResultImg.src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"; // Styled Result Mock
                    tryonControls.style.display = 'block';
                    baToggle.checked = true;
                }, 3000);
            };
            reader.readAsDataURL(file);
        }

        // Before/After Toggle Logic
        baToggle.addEventListener('change', (e) => {
            const labels = document.querySelectorAll('.ba-label');
            if(e.target.checked) {
                finalResultImg.src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"; // Styled
                labels[0].classList.remove('active');
                labels[1].classList.add('active');
            } else {
                finalResultImg.src = uploadedImageSrc; // Original
                labels[1].classList.remove('active');
                labels[0].classList.add('active');
            }
        });

        // Re-upload Logic
        reuploadBtn.addEventListener('click', () => {
            uploadedImageSrc = '';
            userPhotoPreview.style.display = 'none';
            uploadPlaceholder.style.display = 'flex';
            uploadArea.style.cursor = 'pointer';
            tryonControls.style.display = 'none';
            previewResult.style.display = 'none';
            previewLoading.style.display = 'none';
            previewEmpty.style.display = 'flex';
            fileInput.value = '';
        });
    }

    // Add to Cart Button Logic
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const size = document.getElementById('selected-size')?.innerText || 'Select Size';
            if (size === 'Select Size') {
                alert('Please select a size first.');
                return;
            }
            const color = document.getElementById('selected-color')?.innerText || 'Camel';
            const qty = parseInt(document.querySelector('.qty-input')?.value || 1);
            const id = addToCartBtn.dataset.id;
            const title = addToCartBtn.dataset.name;
            const price = parseFloat(addToCartBtn.dataset.price);
            const img = addToCartBtn.dataset.img;

            if (window.addToCart) {
                window.addToCart({ id, brand: 'StyleAI', title, price, img, size, color, quantity: qty });
            }
        });
    }

    // Buy Now Button Logic
    const buyNowBtn = document.querySelector('.buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const size = document.getElementById('selected-size')?.innerText || 'Select Size';
            if (size === 'Select Size') {
                alert('Please select a size first.');
                return;
            }
            const color = document.getElementById('selected-color')?.innerText || 'Camel';
            const qty = parseInt(document.querySelector('.qty-input')?.value || 1);
            const productBtn = document.querySelector('.add-to-cart-btn');
            const id = productBtn.dataset.id;
            const title = productBtn.dataset.name;
            const price = parseFloat(productBtn.dataset.price);
            const img = productBtn.dataset.img;

            if (window.addToCart) {
                window.addToCart({ id, brand: 'StyleAI', title, price, img, size, color, quantity: qty });
                window.location.href = 'cart.html';
            }
        });
    }
});
