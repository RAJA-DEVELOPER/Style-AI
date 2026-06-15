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
        const overlayProductImg = document.getElementById('overlay-product-img');
        const resultViewport = document.getElementById('result-viewport');
        const baToggle = document.getElementById('ba-toggle');
        const reuploadBtn = document.getElementById('reupload-btn');
        const scaleSlider = document.getElementById('overlay-scale');
        const opacitySlider = document.getElementById('overlay-opacity');
        
        let uploadedImageSrc = '';
        let overlayActive = false;
        let overlayState = { x: 50, y: 35, scale: 0.5, opacity: 0.88 };

        // Get product image URL from current page
        const productImgUrl = imgParam || document.querySelector('.ghost-img')?.src || '';

        // Preload product image
        const prodImgPreload = new Image();
        prodImgPreload.src = productImgUrl;

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
                
                // Trigger Right Loading
                previewEmpty.style.display = 'none';
                previewResult.style.display = 'none';
                previewLoading.style.display = 'flex';
                
                // Load both images, then position overlay
                overlayActive = false;
                overlayState.x = 50;
                overlayState.y = 35;
                overlayState.scale = parseInt(scaleSlider?.value || 50) / 100;
                overlayState.opacity = parseInt(opacitySlider?.value || 88) / 100;
                
                const userTemp = new Image();
                userTemp.onload = async () => {
                    finalResultImg.src = uploadedImageSrc;
                    
                    // Try pose detection for auto-positioning
                    try {
                        const torso = await detectTorso(userTemp);
                        if (torso) {
                            overlayState.x = torso.x;
                            overlayState.y = torso.y;
                            overlayState.scale = Math.max(0.2, Math.min(0.8, torso.scale * 1.8));
                        } else {
                            overlayState.x = 50;
                            overlayState.y = 35;
                        }
                    } catch (e) {
                        overlayState.x = 50;
                        overlayState.y = 35;
                    }
                    
                    overlayProductImg.onload = () => {
                        overlayActive = true;
                        setTimeout(() => {
                            previewLoading.style.display = 'none';
                            previewResult.style.display = 'flex';
                            tryonControls.style.display = 'block';
                            overlayProductImg.style.display = 'block';
                            baToggle.checked = true;
                            requestAnimationFrame(() => positionOverlay());
                        }, 500);
                    };
                    if (overlayProductImg.complete && overlayProductImg.naturalWidth) {
                        overlayProductImg.onload();
                    } else {
                        overlayProductImg.src = productImgUrl;
                    }
                };
                userTemp.src = uploadedImageSrc;
            };
            reader.readAsDataURL(file);
        }

        // Pose detection with TensorFlow.js MoveNet
        let poseDetector = null;
        let poseDetectorPromise = null;

        async function getPoseDetector() {
            if (poseDetector) return poseDetector;
            if (poseDetectorPromise) return poseDetectorPromise;
            
            poseDetectorPromise = (async () => {
                try {
                    if (typeof poseDetection === 'undefined' || typeof tf === 'undefined') {
                        return null;
                    }
                    await tf.setBackend('webgl');
                    poseDetector = await poseDetection.createDetector(
                        poseDetection.SupportedModels.MoveNet,
                        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
                    );
                    return poseDetector;
                } catch (e) {
                    return null;
                }
            })();
            
            return poseDetectorPromise;
        }

        async function detectTorso(imgEl) {
            try {
                const detector = await getPoseDetector();
                if (!detector) return null;
                
                const poses = await detector.estimatePoses(imgEl);
                if (!poses || !poses[0] || !poses[0].keypoints) return null;
                
                const kp = poses[0].keypoints;
                const ls = kp.find(k => k.name === 'left_shoulder' && k.score > 0.3);
                const rs = kp.find(k => k.name === 'right_shoulder' && k.score > 0.3);
                const lh = kp.find(k => k.name === 'left_hip' && k.score > 0.3);
                const rh = kp.find(k => k.name === 'right_hip' && k.score > 0.3);
                
                if (!ls || !rs || !lh || !rh) return null;
                
                const shoulderMidX = (ls.x + rs.x) / 2;
                const shoulderMidY = (ls.y + rs.y) / 2;
                const hipMidX = (lh.x + rh.x) / 2;
                const hipMidY = (lh.y + rh.y) / 2;
                
                const cx = (shoulderMidX + hipMidX) / 2;
                const cy = (shoulderMidY + hipMidY) / 2;
                const torsoW = Math.abs(rs.x - ls.x);
                
                const imgW = imgEl.naturalWidth;
                const imgH = imgEl.naturalHeight;
                
                return {
                    x: (cx / imgW) * 100,
                    y: (cy / imgH) * 100,
                    scale: (torsoW / imgW) * 2
                };
            } catch (e) {
                return null;
            }
        }

        function positionOverlay() {
            if (!resultViewport) return;
            const vw = resultViewport.clientWidth;
            const vh = resultViewport.clientHeight;
            const s = overlayState.scale;
            const ox = overlayState.x;
            const oy = overlayState.y;
            const op = overlayState.opacity;
            
            // Size overlay relative to viewport width, preserve aspect ratio
            overlayProductImg.style.width = (s * 100) + '%';
            overlayProductImg.style.height = 'auto';
            overlayProductImg.style.left = ox + '%';
            overlayProductImg.style.top = oy + '%';
            overlayProductImg.style.transform = 'translate(-50%, -50%)';
            overlayProductImg.style.opacity = op;
        }

        // Scale slider
        if (scaleSlider) {
            scaleSlider.addEventListener('input', () => {
                overlayState.scale = parseInt(scaleSlider.value) / 100;
                if (overlayActive) positionOverlay();
            });
        }

        // Opacity slider
        if (opacitySlider) {
            opacitySlider.addEventListener('input', () => {
                overlayState.opacity = parseInt(opacitySlider.value) / 100;
                if (overlayActive) positionOverlay();
            });
        }

        // Drag to reposition overlay
        let dragData = null;
        function startDrag(e) {
            if (!overlayActive) return;
            const pt = e.type.startsWith('touch') ? e.touches[0] : e;
            dragData = {
                startX: pt.clientX,
                startY: pt.clientY,
                origX: overlayState.x,
                origY: overlayState.y
            };
            overlayProductImg.style.cursor = 'grabbing';
            e.preventDefault();
        }
        function moveDrag(e) {
            if (!dragData) return;
            const pt = e.type.startsWith('touch') ? e.touches[0] : e;
            const dx = pt.clientX - dragData.startX;
            const dy = pt.clientY - dragData.startY;
            const vw = resultViewport.clientWidth;
            const vh = resultViewport.clientHeight;
            overlayState.x = dragData.origX + (dx / vw) * 100;
            overlayState.y = dragData.origY + (dy / vh) * 100;
            positionOverlay();
            e.preventDefault();
        }
        function endDrag() {
            if (dragData) {
                dragData = null;
                overlayProductImg.style.cursor = 'move';
            }
        }
        if (overlayProductImg) {
            overlayProductImg.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', moveDrag);
            document.addEventListener('mouseup', endDrag);
            overlayProductImg.addEventListener('touchstart', startDrag, { passive: false });
            document.addEventListener('touchmove', moveDrag, { passive: false });
            document.addEventListener('touchend', endDrag);
        }

        // Before/After Toggle Logic
        baToggle.addEventListener('change', (e) => {
            const labels = document.querySelectorAll('.ba-label');
            if(e.target.checked) {
                overlayProductImg.style.display = overlayActive ? 'block' : 'none';
                labels[0].classList.remove('active');
                labels[1].classList.add('active');
            } else {
                overlayProductImg.style.display = 'none';
                labels[1].classList.remove('active');
                labels[0].classList.add('active');
            }
        });

        // Re-upload Logic
        reuploadBtn.addEventListener('click', () => {
            uploadedImageSrc = '';
            overlayActive = false;
            userPhotoPreview.style.display = 'none';
            uploadPlaceholder.style.display = 'flex';
            uploadArea.style.cursor = 'pointer';
            tryonControls.style.display = 'none';
            previewResult.style.display = 'none';
            previewLoading.style.display = 'none';
            previewEmpty.style.display = 'flex';
            overlayProductImg.style.display = 'none';
            overlayProductImg.style.left = '50%';
            overlayProductImg.style.top = '35%';
            fileInput.value = '';
        });

        // Share Button Logic
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                const url = window.location.href;
                if (navigator.share) {
                    navigator.share({ title: document.title, url: url });
                } else {
                    navigator.clipboard.writeText(url).then(() => {
                        const orig = shareBtn.innerHTML;
                        shareBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied';
                        setTimeout(() => { shareBtn.innerHTML = orig; }, 2000);
                    });
                }
            });
        }
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
