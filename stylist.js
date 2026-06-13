document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const overlay = document.getElementById('processing-overlay');
    const progressFill = document.getElementById('progress-fill');
    const uploadSection = document.getElementById('upload-area');
    const dashboard = document.getElementById('results-dashboard');
    const previewImage = document.getElementById('preview-image');

    // Handle Upload
    fileInput.addEventListener('change', function(e) {
        if(this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                simulateProcessing();
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Drag and drop support
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'rgba(0,0,0,0.15)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'rgba(0,0,0,0.15)';
        if(e.dataTransfer.files && e.dataTransfer.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                simulateProcessing();
            }
            reader.readAsDataURL(e.dataTransfer.files[0]);
        }
    });

    function simulateProcessing() {
        overlay.classList.add('active');
        let width = 0;
        const interval = setInterval(() => {
            width += Math.random() * 15;
            if(width >= 100) {
                width = 100;
                clearInterval(interval);
                progressFill.style.width = width + '%';
                setTimeout(showDashboard, 500);
            } else {
                progressFill.style.width = width + '%';
            }
        }, 300);
    }

    function showDashboard() {
        uploadSection.style.display = 'none';
        dashboard.style.display = 'block';
        populateData();
        
        // Scroll to dashboard
        window.scrollTo({
            top: dashboard.offsetTop - 100,
            behavior: 'smooth'
        });
    }

    function populateData() {
        // 4. Skin Tone (Hardcoded in HTML but can be dynamic)
        document.getElementById('skintone-color').style.background = '#e8c39e';

        // 5. Color Palette
        const colors = [
            { name: 'Emerald', hex: '#2E8B57' },
            { name: 'Terracotta', hex: '#E2725B' },
            { name: 'Navy', hex: '#1E3A5F' },
            { name: 'Cream', hex: '#F5F5DC' }
        ];
        document.getElementById('color-palette').innerHTML = colors.map(c => 
            `<div class="palette-swatch" style="background: ${c.hex}">${c.name}</div>`
        ).join('');

        // 12. Fashion Tips
        const tips = [
            "Embrace structured shoulders to balance your natural silhouette.",
            "Opt for monochromatic inner layers to elongate your frame visually.",
            "Incorporate silver or white-gold hardware based on your cool undertones.",
            "Your high contrast level allows you to wear bold, geometric patterns."
        ];
        document.getElementById('fashion-tips').innerHTML = tips.map(t => `<li>${t}</li>`).join('');

        // 8. Outfit Suggestions
        const outfits = [
            { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920", title: "The Architectural Minimalist", desc: "Clean lines and draped silk." },
            { img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071", title: "Urban tailoring", desc: "Structured wool with relaxed fits." }
        ];
        document.getElementById('outfit-suggestions').innerHTML = outfits.map(o => `
            <div class="img-card" style="aspect-ratio: 3/4">
                <img src="${o.img}" style="width: 100%; height: 100%; object-fit: cover;">
                <div class="img-card-overlay">
                    <h4>${o.title}</h4>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.875rem;">${o.desc}</p>
                </div>
            </div>
        `).join('');

        // 9. Occasion Styling
        const occasions = [
            { img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974", title: "Boardroom" },
            { img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983", title: "Gala Evening" },
            { img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935", title: "Weekend Casual" }
        ];
        document.getElementById('occasion-styling').innerHTML = occasions.map(o => `
            <div class="img-card" style="aspect-ratio: 4/5">
                <img src="${o.img}" style="width: 100%; height: 100%; object-fit: cover;">
                <div class="img-card-overlay"><h4>${o.title}</h4></div>
            </div>
        `).join('');

        // 11. Trending Looks
        const trends = [
            { img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974", title: "Oversized Blazers" },
            { img: "https://images.unsplash.com/photo-1574291814206-363acdf2aa79?q=80&w=1974", title: "Chunky Knitwear" },
            { img: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1974", title: "Woven Accessories" }
        ];
        document.getElementById('trending-looks').innerHTML = trends.map(t => `
            <div class="img-card" style="aspect-ratio: 1">
                <img src="${t.img}" style="width: 100%; height: 100%; object-fit: cover;">
                <div class="img-card-overlay"><h4>${t.title}</h4></div>
            </div>
        `).join('');

        // 13. Recommendation Gallery
        const recs = [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976"
        ];
        document.getElementById('recommendation-gallery').innerHTML = recs.map(r => `
            <div class="img-card" style="aspect-ratio: 3/4; background: #f0f0f0;">
                <img src="${r}" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; top: 1rem; right: 1rem; background: #fff; padding: 0.25rem 0.5rem; font-size: 0.75rem; border-radius: 2px;">98% Match</div>
            </div>
        `).join('');

        // 14. Saved Looks Preview
        const saved = [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1974",
            "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
            "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974"
        ];
        document.getElementById('saved-looks').innerHTML = saved.map(s => `
            <div class="saved-item">
                <img src="${s}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
        `).join('');
    }
});
