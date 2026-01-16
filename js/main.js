// Main JavaScript - Kierunek Wschód 2

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Page Fade In
    // Small timeout to ensure CSS is ready
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // 2. Header Scroll Effect
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Scroll Animations (Text Reveal)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target generic elements (h1, h2, p, cards) automatically or allow manual class
    const animatedElements = document.querySelectorAll('.animate-on-scroll, h1, h2, .hero-subtitle, .apartment-card, .price-card, .gallery-item, .detail-content p, .btn-cta');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll'); // Ensure class is present
        observer.observe(el);
    });

    // 4. Smooth Page Transitions (Link Interception)
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');

            // Ignore hash links (internal anchors) or external links
            if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;

            e.preventDefault();
            document.body.classList.remove('loaded'); // Fade out

            // Fade audio out if manager exists
            if (window.audioManager) {
                window.audioManager.fadeOut(600);
            }

            setTimeout(() => {
                window.location.href = href;
            }, 600); // Match CSS transition time
        });
    });

    // 5. Hero Slideshow Logic (Detail Pages)
    const initSlideshow = () => {
        const container = document.getElementById('hero-slideshow');
        if (!container) return; // Not a page with a dynamic slideshow

        let images = [];
        const path = window.location.pathname;

        // Determine images based on page
        if (path.includes('modern')) {
            images = [
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.35.jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.35 (1).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.35 (2).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.35 (3).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.35 (4).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.35 (5).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36.jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (1).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (2).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (3).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (4).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (5).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (6).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (7).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (8).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (9).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (10).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.36 (11).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.37.jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.37 (1).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.37 (2).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 07.48.37 (3).jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 08.04.58.jpeg',
                'assets/modern-boutique/WhatsApp Image 2026-01-16 at 08.07.21.jpeg'
            ];
        } else if (path.includes('retro')) {
            images = [
                'assets/retro-boutique/WhatsApp Image 2026-01-16 at 07.47.57.jpeg',
                'assets/retro-boutique/WhatsApp Image 2026-01-16 at 07.47.57 (1).jpeg',
                'assets/retro-boutique/WhatsApp Image 2026-01-16 at 07.47.57 (2).jpeg',
                'assets/retro-boutique/WhatsApp Image 2026-01-16 at 07.47.57 (3).jpeg',
                'assets/retro-boutique/WhatsApp Image 2026-01-15 at 20.36.09.jpeg',
                'assets/retro-boutique/WhatsApp Image 2026-01-15 at 20.36.09 (1).jpeg',
                'assets/retro-boutique/WhatsApp Image 2026-01-15 at 20.36.09 (2).jpeg',
                'assets/retro-boutique/WhatsApp Image 2026-01-15 at 20.36.09 (3).jpeg',
                'assets/retro-boutique/WhatsApp Image 2026-01-15 at 20.36.09 (4).jpeg'
            ];
        } else if (path.includes('relax')) {
            images = [
                'assets/relax-boutique/WhatsApp Image 2026-01-16 at 08.05.30.jpeg',
                'assets/relax-boutique/WhatsApp Image 2026-01-16 at 08.05.33.jpeg',
                'assets/relax-boutique/WhatsApp Image 2026-01-16 at 08.05.33 (1).jpeg',
                'assets/relax-boutique/WhatsApp Image 2026-01-16 at 08.05.33 (2).jpeg',
                'assets/relax-boutique/WhatsApp Image 2026-01-16 at 08.05.33 (3).jpeg',
                'assets/relax-boutique/WhatsApp Image 2026-01-16 at 08.05.33 (4).jpeg',
                'assets/relax-boutique/WhatsApp Image 2026-01-16 at 08.05.33 (5).jpeg',
                'assets/relax-boutique/WhatsApp Image 2026-01-16 at qwasd.jpeg',
                'assets/relax-boutique/WhatsApp Image 2026-01-16 at qwe.jpeg',
                'assets/relax-boutique/1.jpeg'
            ];
        } else if (path.includes('about')) {
            images = [
                'assets/about us/2.jpeg',
                'assets/about us/3.jpeg',
                'assets/about us/4.jpeg',
                'assets/about us/5.jpeg',
                'assets/about us/6.jpeg',
                'assets/about us/7.jpeg',
                'assets/about us/WhatsApp Image 2026-01-16 at 07.47.56.jpeg',
                'assets/about us/WhatsApp Image 2026-01-16 at 07.48.37 (4).jpeg',
                'assets/about us/WhatsApp Image 2026-01-16 at 07.49.55.jpeg',
                'assets/about us/WhatsApp Image 2026-01-16 at 08.05.41.jpeg',
                'assets/about us/WhatsApp Image 2026-01-16 at 08.07.31.jpeg'
            ];
        } else {
            return;
        }

        // Shuffle images (Fisher-Yates)
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }

        // Create Slides
        images.forEach((src, index) => {
            const div = document.createElement('div');
            div.className = `hero-bg ${index === 0 ? 'active' : ''}`;
            div.style.backgroundImage = `url('${src}')`;
            container.appendChild(div);
        });

        // Start Rotation
        const slides = container.querySelectorAll('.hero-bg');
        let currentSlide = 0;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // 5 seconds per slide
    };



    initSlideshow();

    // 6. Smooth Lightbox Logic (FLIP-like)
    const initLightbox = () => {
        const galleryItems = document.querySelectorAll('.gallery-item img, .gallery-item video');
        if (galleryItems.length === 0) return;

        // Create overlay once
        let overlay = document.querySelector('.lightbox-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            document.body.appendChild(overlay);
        }

        let activeClone = null;
        let originalEl = null;

        const closeLightbox = () => {
            if (!activeClone || !originalEl) return;

            // Pause if video
            if (activeClone.tagName.toLowerCase() === 'video') {
                activeClone.pause();
            }

            // Animate back to original position
            const rect = originalEl.getBoundingClientRect();
            activeClone.style.top = `${rect.top}px`;
            activeClone.style.left = `${rect.left}px`;
            activeClone.style.width = `${rect.width}px`;
            activeClone.style.height = `${rect.height}px`;

            overlay.classList.remove('active');

            // Remove after transition
            setTimeout(() => {
                if (activeClone) activeClone.remove();
                activeClone = null;
                originalEl = null;
            }, 600); // Match CSS transition time
        };

        const openLightbox = (el) => {
            originalEl = el;
            const rect = el.getBoundingClientRect();
            const isVideo = el.tagName.toLowerCase() === 'video';

            // Clone
            activeClone = el.cloneNode(true);
            activeClone.className = 'lightbox-image'; // Keep same class for animation styles
            activeClone.style.objectFit = 'contain'; // Ensure full content is visible

            if (isVideo) {
                activeClone.controls = true;
                activeClone.muted = false;
                activeClone.autoplay = true;
                activeClone.loop = false; // Usually don't loop in lightbox unless desired

                // Remove mouseover/out events from clone to prevent issues
                activeClone.onmouseover = null;
                activeClone.onmouseout = null;
            }

            // Set initial position (exact match)
            activeClone.style.top = `${rect.top}px`;
            activeClone.style.left = `${rect.left}px`;
            activeClone.style.width = `${rect.width}px`;
            activeClone.style.height = `${rect.height}px`;

            document.body.appendChild(activeClone);

            // Force reflow
            void activeClone.offsetWidth;

            // Calculate Target (Center, max 90%)
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const padding = 40; // 20px each side

            const maxW = vw - padding;
            const maxH = vh - padding;

            let ratio = 1;
            if (isVideo) {
                // Use videoWidth/Height if available, else fallback to rect or wait for metadata
                // Since it's a clone of an already loaded video, it should be fine mostly
                if (el.videoWidth) {
                    ratio = el.videoWidth / el.videoHeight;
                } else {
                    ratio = rect.width / rect.height;
                }
            } else {
                ratio = el.naturalWidth / el.naturalHeight;
            }

            let targetW = maxW;
            let targetH = targetW / ratio;

            if (targetH > maxH) {
                targetH = maxH;
                targetW = targetH * ratio;
            }

            const targetTop = (vh - targetH) / 2;
            const targetLeft = (vw - targetW) / 2;

            // Animate to target
            activeClone.style.top = `${targetTop}px`;
            activeClone.style.left = `${targetLeft}px`;
            activeClone.style.width = `${targetW}px`;
            activeClone.style.height = `${targetH}px`;

            overlay.classList.add('active'); // Fade in background

            // Close on click (if it's video, maybe only close on overlay click? User might click video to pause)
            // But user asked for "like photo", usually photo closes on click.
            // For video, clicking usually toggles play/pause if controls are hidden, or does nothing if controls are shown.
            // Let's make overlay close it, but maybe not the video itself if controls are engaged.

            overlay.onclick = closeLightbox;

            if (!isVideo) {
                activeClone.onclick = closeLightbox;
            }
        };

        galleryItems.forEach(el => {
            el.onclick = (e) => {
                e.preventDefault(); // Prevent default if it's inside a link (though here key is avoiding other handlers)
                openLightbox(el);
            };
        });
    };

    initLightbox();

    console.log('Kierunek Wschód 2 - Enhanced Animations Loaded');
});
