/**
 * Bertrand Basset Portfolio - V6
 * Gallery Navigation System with Mobile Support
 */

// Traductions
const TRANSLATIONS = {
    en: {
        "photography": "Photography",
        "portrait": "Portrait",
        "serie-portrait": "Serie Portrait",
        "immersion": "Immersion",
        "filmmaker": "Filmmaker",
        "cinema": "Cinema",
        "post-producer": "Post-producer",
        "portrait-session": "Portrait Session",
        "work-immersion": "Work Immersion",
        "about": "About",
        "learn-more": "learn more",
        "listen": "listen",
        "pause": "pause",
        "prev": "prev",
        "next": "next",
        "show-thumbnails": "show thumbnails",
        "hide-thumbnails": "hide thumbnails"
    },
    fr: {
        "photography": "Photographie",
        "portrait": "Portrait",
        "serie-portrait": "Série Portrait",
        "immersion": "Immersion",
        "filmmaker": "Réalisateur",
        "cinema": "Cinéma",
        "post-producer": "Post-production",
        "portrait-session": "Séance Portrait",
        "work-immersion": "Immersion Travail",
        "about": "À propos",
        "learn-more": "en savoir plus",
        "listen": "écouter",
        "pause": "pause",
        "prev": "préc",
        "next": "suiv",
        "show-thumbnails": "voir vignettes",
        "hide-thumbnails": "masquer vignettes"
    }
};

// Données des galeries
const GALLERIES_DATA = {
  "accueil": {
    "title": "Gallery",
    "category": "home",
    "images": [
      { "src": "images/accueil/accueil-01.jpg", "caption": "" },
      { "src": ["images/accueil/accueil-02A.jpg", "images/accueil/accueil-02B.jpg"], "caption": "" },
      { "src": "images/accueil/accueil-03.jpg", "caption": "" },
      { "src": ["images/accueil/accueil-04A.jpg", "images/accueil/accueil-04B.jpg"], "caption": "" },
      { "src": "images/accueil/accueil-05.jpg", "caption": "" },
      { "src": "images/accueil/accueil-06.jpg", "caption": "" },
      { "src": ["images/accueil/accueil-07A.jpg", "images/accueil/accueil-07B.jpg"], "caption": "" },
      { "src": "images/accueil/accueil-08.jpg", "caption": "" },
      { "src": "images/accueil/accueil-09.jpg", "caption": "" },
      { "src": ["images/accueil/accueil-10A.jpg", "images/accueil/accueil-10B.jpg"], "caption": "" },
      { "src": "images/accueil/accueil-11.jpg", "caption": "" },
      { "src": "images/accueil/accueil-12.jpg", "caption": "" }
    ]
  },
  "portrait": {
    "title": "Portrait",
    "category": "photography",
    "images": [
      { "src": "images/photography/portrait/portrait-01.jpg", "caption": "" },
      { "src": "images/photography/portrait/portrait-02.jpg", "caption": "" },
      { "src": "images/photography/portrait/portrait-03.jpg", "caption": "" },
      { "src": "images/photography/portrait/portrait-04.jpg", "caption": "" },
      { "src": "images/photography/portrait/portrait-05.jpg", "caption": "" },
      { "src": "images/photography/portrait/portrait-06.jpg", "caption": "" },
      { "src": "images/photography/portrait/portrait-07.jpg", "caption": "" },
      { "src": "images/photography/portrait/portrait-08.jpg", "caption": "" },
      { "src": "images/photography/portrait/portrait-09.jpg", "caption": "" },
      { "src": "images/photography/portrait/portrait-10.jpg", "caption": "" }
    ]
  },
  "le-gem": {
    "title": "Le GEM s'endimanche",
    "category": "photography",
    "projectTitle": "Le GEM s'endimanche",
    "projectLink": "projects/le-gem.html",
    "images": [
      { "src": "images/photography/serie-portrait/gem/gem-01.jpg", "audio": "images/photography/serie-portrait/gem/gem-01.mp3", "caption": "" },
      { "src": "images/photography/serie-portrait/gem/gem-02.jpg", "audio": "images/photography/serie-portrait/gem/gem-02.mp3", "caption": "" },
      { "src": "images/photography/serie-portrait/gem/gem-03.jpg", "audio": "images/photography/serie-portrait/gem/gem-03.mp3", "caption": "" },
      { "src": "images/photography/serie-portrait/gem/gem-04.jpg", "audio": "images/photography/serie-portrait/gem/gem-04.mp3", "caption": "" },
      { "src": "images/photography/serie-portrait/gem/gem-05.jpg", "audio": "images/photography/serie-portrait/gem/gem-05.mp3", "caption": "" },
      { "src": "images/photography/serie-portrait/gem/gem-06.jpg", "audio": "images/photography/serie-portrait/gem/gem-06.mp3", "caption": "" }
    ]
  },
  "immersion": {
    "title": "Immersion",
    "category": "photography",
    "images": [
      { "src": "images/photography/immersion/immersion-01.jpg", "caption": "" },
      { "src": "images/photography/immersion/immersion-02.jpg", "caption": "" },
      { "src": "images/photography/immersion/immersion-03.jpg", "caption": "" },
      { "src": "images/photography/immersion/immersion-04.jpg", "caption": "" },
      { "src": "images/photography/immersion/immersion-05.jpg", "caption": "" }
    ]
  },
  "cinema": {
    "title": "Cinema",
    "category": "filmmaker",
    "images": [
      { "src": "images/filmmaker/cinema/cinema-01.jpg", "caption": "" },
      { "src": "images/filmmaker/cinema/cinema-02.jpg", "caption": "" },
      { "src": "images/filmmaker/cinema/cinema-03.jpg", "caption": "" }
    ]
  },
  "filmmaker-portrait": {
    "title": "Portrait",
    "category": "filmmaker",
    "images": []
  },
  "post-producer": {
    "title": "Post Producer",
    "category": "filmmaker",
    "images": []
  },
  "portrait-session": {
    "title": "Portrait Session",
    "category": "studio",
    "images": []
  },
  "work-immersion": {
    "title": "Work Immersion",
    "category": "studio",
    "images": []
  },
  "empreinte": {
    "title": "Empreinte",
    "category": "studio",
    "images": []
  }
};

class Portfolio {
    constructor() {
        this.galleries = GALLERIES_DATA;
        this.currentGallery = null;
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.cursorDirection = 'next';
        this.currentAudio = null;
        this.isPlaying = false;
        this.currentLang = 'en';
        this.isMobile = window.innerWidth <= 900;

        this.init();
    }

    init() {
        this.cacheElements();
        this.createCustomCursor();
        this.bindEvents();
        this.openGallery('accueil');
        
        // Check for mobile on resize
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 900;
        });
    }

    cacheElements() {
        // Landing
        this.landing = document.getElementById('landing');
        this.site = document.getElementById('site');
        this.enterBtn = document.getElementById('enterBtn');

        // Gallery elements
        this.galleryContainer = document.querySelector('.gallery-container');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.thumbnailsToggle = document.querySelector('.show-thumbnails');
        this.thumbnailsPanel = document.querySelector('.thumbnails-panel');
        this.thumbnailsGrid = document.querySelector('.thumbnails-grid');
        this.galleryCounter = document.querySelector('.sidebar-footer .gallery-counter');
        this.imageCaption = document.querySelector('.image-caption');

        // Navigation
        this.navItems = document.querySelectorAll('.nav-item[data-expandable]');
        this.dropdownLinks = document.querySelectorAll('.dropdown-link:not(.has-submenu)');
        this.submenuLinks = document.querySelectorAll('.dropdown-link.has-submenu');
        this.dropdownSublinks = document.querySelectorAll('.dropdown-sublink');

        // Project info
        this.projectInfo = document.querySelector('.project-info');
        this.projectTitle = document.querySelector('.project-title');
        this.projectLink = document.querySelector('.project-link');

        // Audio controls
        this.audioControls = document.querySelector('.audio-controls');
        this.audioBtn = document.getElementById('audioBtn');
        this.audioIcon = document.querySelector('.audio-icon');
        this.audioLabel = document.querySelector('.audio-label');
        this.autoplayToggle = document.getElementById('autoplayToggle');

        // Home links
        this.homeLink = document.getElementById('homeLink');
        this.mobileBrandLink = document.getElementById('mobileBrandLink');

        // Language links
        this.langLinks = document.querySelectorAll('[data-lang]');

        // Translatable elements
        this.i18nElements = document.querySelectorAll('[data-i18n]');
        
        // Mobile elements
        this.hamburgerBtn = document.getElementById('hamburgerBtn');
        this.mobileNavOverlay = document.getElementById('mobileNavOverlay');
        this.mobileCounter = document.getElementById('mobileCounter');
        this.mobilePrevBtn = document.getElementById('mobilePrevBtn');
        this.mobileNextBtn = document.getElementById('mobileNextBtn');
    }

    createCustomCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.innerHTML = `
            <svg viewBox="0 0 24 24" class="cursor-next">
                <polyline points="9,6 15,12 9,18"></polyline>
            </svg>
        `;
        document.body.appendChild(this.cursor);
    }

    updateCursorDirection(direction) {
        if (this.cursorDirection === direction) return;
        this.cursorDirection = direction;

        if (direction === 'prev') {
            this.cursor.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <polyline points="15,6 9,12 15,18"></polyline>
                </svg>
            `;
        } else {
            this.cursor.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <polyline points="9,6 15,12 9,18"></polyline>
                </svg>
            `;
        }
    }

    bindEvents() {
        // Enter button
        if (this.enterBtn) {
            this.enterBtn.addEventListener('click', () => this.enterSite());
        }

        // Home links
        if (this.homeLink) {
            this.homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openGallery('accueil');
                this.clearActiveLinks();
            });
        }
        
        if (this.mobileBrandLink) {
            this.mobileBrandLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openGallery('accueil');
                this.clearActiveLinks();
                this.closeMobileNav();
            });
        }

        // Hamburger menu
        if (this.hamburgerBtn) {
            this.hamburgerBtn.addEventListener('click', () => this.toggleMobileNav());
        }

        // Expandable nav items
        this.navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleNavItem(item);
                });
            }
        });

        // Dropdown links
        this.dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const galleryId = link.dataset.gallery;
                if (galleryId) {
                    this.openGallery(galleryId);
                    this.setActiveDropdownLink(link);
                    this.closeMobileNav();
                }
            });
        });

        // Submenu toggle
        this.submenuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                link.classList.toggle('open');
            });
        });

        // Dropdown sublinks
        this.dropdownSublinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const galleryId = link.dataset.gallery;
                if (galleryId) {
                    this.openGallery(galleryId);
                    this.setActiveDropdownLink(link);
                    this.closeMobileNav();
                }
            });
        });

        // Gallery navigation - Desktop
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevImage();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextImage();
            });
        }
        
        // Gallery navigation - Mobile
        if (this.mobilePrevBtn) {
            this.mobilePrevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevImage();
            });
        }

        if (this.mobileNextBtn) {
            this.mobileNextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextImage();
            });
        }

        // Click on gallery to navigate
        if (this.galleryContainer) {
            this.galleryContainer.addEventListener('click', (e) => {
                // Don't navigate if clicking on mobile (use buttons instead for clarity)
                if (this.isMobile) return;
                
                const rect = this.galleryContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const midpoint = rect.width / 2;

                if (x < midpoint) {
                    this.prevImage();
                } else {
                    this.nextImage();
                }
            });

            // Custom cursor - desktop only
            this.galleryContainer.addEventListener('mousemove', (e) => {
                if (this.isMobile) return;
                this.updateCursor(e);
            });

            this.galleryContainer.addEventListener('mouseenter', () => {
                if (!this.isMobile) {
                    this.cursor.classList.add('visible');
                }
            });

            this.galleryContainer.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('visible');
            });
        }

        // Thumbnails toggle
        if (this.thumbnailsToggle) {
            this.thumbnailsToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleThumbnails();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Touch/swipe support
        this.initSwipe();

        // Audio button
        if (this.audioBtn) {
            this.audioBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAudio();
            });
        }

        // Language switching
        this.langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    // Mobile navigation
    toggleMobileNav() {
        if (this.hamburgerBtn && this.mobileNavOverlay) {
            this.hamburgerBtn.classList.toggle('active');
            this.mobileNavOverlay.classList.toggle('active');
        }
    }
    
    closeMobileNav() {
        if (this.hamburgerBtn && this.mobileNavOverlay) {
            this.hamburgerBtn.classList.remove('active');
            this.mobileNavOverlay.classList.remove('active');
        }
    }

    updateCursor(e) {
        const rect = this.galleryContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const midpoint = rect.width / 2;

        this.cursor.style.left = e.clientX + 'px';
        this.cursor.style.top = e.clientY + 'px';

        if (x < midpoint) {
            this.updateCursorDirection('prev');
        } else {
            this.updateCursorDirection('next');
        }
    }

    enterSite() {
        if (this.landing && this.site) {
            this.landing.classList.add('hidden');
            this.site.classList.add('active');
        }
    }

    toggleNavItem(item) {
        const wasOpen = item.classList.contains('open');

        this.navItems.forEach(navItem => {
            if (navItem !== item) {
                navItem.classList.remove('open');
            }
        });

        item.classList.toggle('open', !wasOpen);
    }

    clearActiveLinks() {
        this.dropdownLinks.forEach(link => link.classList.remove('active'));
        this.dropdownSublinks.forEach(link => link.classList.remove('active'));
    }

    setActiveDropdownLink(activeLink) {
        this.clearActiveLinks();
        activeLink.classList.add('active');
    }

    openGallery(galleryId) {
        const gallery = this.galleries[galleryId];
        if (!gallery || !gallery.images || gallery.images.length === 0) {
            console.warn(`Gallery "${galleryId}" not found or empty`);
            return;
        }

        this.currentGallery = gallery;
        this.currentGalleryId = galleryId;
        this.currentIndex = 0;

        this.updateCounter();
        this.showImage(0);
        this.generateThumbnails();
        this.updateProjectInfo();
    }

    showImage(index) {
        if (!this.currentGallery || this.isTransitioning) return;

        const images = this.currentGallery.images;
        if (index < 0 || index >= images.length) return;

        this.stopAudio();
        this.isTransitioning = true;
        this.currentIndex = index;

        const imageData = images[index];
        const isPair = Array.isArray(imageData.src);

        const currentImages = this.galleryContainer.querySelectorAll('.gallery-image');
        currentImages.forEach(img => {
            img.classList.add('transitioning');
            img.classList.remove('loaded');
        });

        setTimeout(() => {
            this.galleryContainer.innerHTML = '';
            this.galleryContainer.classList.remove('single', 'pair');
            this.galleryContainer.classList.add(isPair ? 'pair' : 'single');

            if (isPair) {
                this.loadImagePair(imageData.src, imageData.caption);
            } else {
                const imgSrc = typeof imageData === 'string' ? imageData : imageData.src;
                const caption = typeof imageData === 'object' ? imageData.caption : '';
                this.loadSingleImage(imgSrc, caption);
            }

            this.updateCounter();
            this.updateActiveThumbnail(index);
            this.updateAudioPlayer();

        }, 300);
    }

    encodeImagePath(path) {
        return path.split('/').map(part => encodeURIComponent(part)).join('/');
    }

    loadSingleImage(src, caption) {
        const img = document.createElement('img');
        img.className = 'gallery-image';
        img.alt = caption || this.currentGallery.title || '';

        img.onload = () => {
            img.classList.add('loaded');
            this.isTransitioning = false;
        };

        img.onerror = () => {
            console.error('Error loading image:', src);
            this.isTransitioning = false;
        };

        this.galleryContainer.appendChild(img);
        img.src = this.encodeImagePath(src);

        if (this.imageCaption) {
            this.imageCaption.textContent = caption || '';
        }
    }

    loadImagePair(sources, caption) {
        let loadedCount = 0;
        const totalImages = sources.length;

        sources.forEach((src, i) => {
            const img = document.createElement('img');
            img.className = 'gallery-image';
            img.alt = `${caption || this.currentGallery.title || ''} - ${i + 1}`;

            img.onload = () => {
                loadedCount++;
                img.classList.add('loaded');
                if (loadedCount === totalImages) {
                    this.isTransitioning = false;
                }
            };

            img.onerror = () => {
                console.error('Error loading image:', src);
                loadedCount++;
                if (loadedCount === totalImages) {
                    this.isTransitioning = false;
                }
            };

            this.galleryContainer.appendChild(img);
            img.src = this.encodeImagePath(src);
        });

        if (this.imageCaption) {
            this.imageCaption.textContent = caption || '';
        }
    }

    prevImage() {
        if (!this.currentGallery) return;
        const newIndex = this.currentIndex > 0
            ? this.currentIndex - 1
            : this.currentGallery.images.length - 1;
        this.showImage(newIndex);
    }

    nextImage() {
        if (!this.currentGallery) return;
        const newIndex = this.currentIndex < this.currentGallery.images.length - 1
            ? this.currentIndex + 1
            : 0;
        this.showImage(newIndex);
    }

    updateCounter() {
        if (this.currentGallery) {
            const current = this.currentIndex + 1;
            const total = this.currentGallery.images.length;
            const text = `${current} / ${total}`;
            
            if (this.galleryCounter) {
                this.galleryCounter.textContent = text;
            }
            if (this.mobileCounter) {
                this.mobileCounter.textContent = text;
            }
        }
    }

    handleKeyboard(e) {
        if (!this.site || !this.site.classList.contains('active')) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextImage();
                break;
            case 'Escape':
                this.hideThumbnails();
                this.closeMobileNav();
                break;
        }
    }

    initSwipe() {
        if (!this.galleryContainer) return;

        let touchStartX = 0;
        let touchEndX = 0;

        this.galleryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.cursor.classList.remove('visible');
        }, { passive: true });

        this.galleryContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextImage();
            } else {
                this.prevImage();
            }
        }
    }

    toggleThumbnails() {
        if (this.thumbnailsPanel) {
            this.thumbnailsPanel.classList.toggle('active');

            if (this.thumbnailsToggle) {
                const isActive = this.thumbnailsPanel.classList.contains('active');
                this.thumbnailsToggle.textContent = isActive ? this.t('hide-thumbnails') : this.t('show-thumbnails');
            }
        }
    }

    hideThumbnails() {
        if (this.thumbnailsPanel) {
            this.thumbnailsPanel.classList.remove('active');
            if (this.thumbnailsToggle) {
                this.thumbnailsToggle.textContent = this.t('show-thumbnails');
            }
        }
    }

    generateThumbnails() {
        if (!this.thumbnailsGrid || !this.currentGallery) return;

        this.thumbnailsGrid.innerHTML = '';

        this.currentGallery.images.forEach((imageData, index) => {
            let imgSrc;
            if (Array.isArray(imageData.src)) {
                imgSrc = imageData.src[0];
            } else {
                imgSrc = typeof imageData === 'string' ? imageData : imageData.src;
            }

            const thumb = document.createElement('img');
            thumb.src = this.encodeImagePath(imgSrc);
            thumb.alt = `Thumbnail ${index + 1}`;
            thumb.dataset.index = index;

            if (index === this.currentIndex) {
                thumb.classList.add('active');
            }

            thumb.addEventListener('click', () => {
                this.showImage(index);
            });

            this.thumbnailsGrid.appendChild(thumb);
        });
    }

    updateActiveThumbnail(index) {
        if (!this.thumbnailsGrid) return;

        const thumbs = this.thumbnailsGrid.querySelectorAll('img');
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    updateProjectInfo() {
        if (!this.projectInfo || !this.currentGallery) return;

        if (this.currentGallery.projectTitle) {
            this.projectTitle.textContent = this.currentGallery.projectTitle;
            this.projectLink.href = this.currentGallery.projectLink || '#';
            this.projectInfo.classList.add('visible');
        } else {
            this.projectInfo.classList.remove('visible');
        }
    }

    updateAudioPlayer() {
        if (!this.audioControls || !this.currentGallery) return;

        const images = this.currentGallery.images;
        const imageData = images[this.currentIndex];
        const hasAudio = imageData && imageData.audio;

        if (hasAudio) {
            this.audioControls.classList.add('visible');
            if (this.autoplayToggle && this.autoplayToggle.checked) {
                this.playAudio(imageData.audio);
            }
        } else {
            this.audioControls.classList.remove('visible');
        }
    }

    playAudio(audioSrc) {
        this.currentAudio = new Audio(this.encodeImagePath(audioSrc));
        this.currentAudio.play().catch(e => {
            console.log('Autoplay blocked, waiting for user interaction');
        });
        this.isPlaying = true;

        if (this.audioIcon) this.audioIcon.innerHTML = '&#9724;';
        if (this.audioLabel) this.audioLabel.textContent = this.t('pause');
        if (this.audioBtn) this.audioBtn.classList.add('playing');

        this.currentAudio.addEventListener('ended', () => {
            this.isPlaying = false;
            if (this.audioIcon) this.audioIcon.innerHTML = '&#9654;';
            if (this.audioLabel) this.audioLabel.textContent = this.t('listen');
            if (this.audioBtn) this.audioBtn.classList.remove('playing');
        });
    }

    stopAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
            this.isPlaying = false;
            if (this.audioIcon) this.audioIcon.innerHTML = '&#9654;';
            if (this.audioLabel) this.audioLabel.textContent = this.t('listen');
            if (this.audioBtn) this.audioBtn.classList.remove('playing');
        }
    }

    toggleAudio() {
        if (!this.currentGallery) return;

        const images = this.currentGallery.images;
        const imageData = images[this.currentIndex];

        if (!imageData || !imageData.audio) return;

        if (this.isPlaying && this.currentAudio) {
            this.stopAudio();
        } else {
            this.playAudio(imageData.audio);
        }
    }

    setLanguage(lang) {
        if (!TRANSLATIONS[lang]) return;

        this.currentLang = lang;

        this.langLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.lang === lang);
        });

        this.i18nElements.forEach(el => {
            const key = el.dataset.i18n;
            if (TRANSLATIONS[lang][key]) {
                el.textContent = TRANSLATIONS[lang][key];
            }
        });
    }

    t(key) {
        return TRANSLATIONS[this.currentLang][key] || key;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});
