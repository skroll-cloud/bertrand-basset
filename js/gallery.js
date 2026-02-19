/**
 * Bertrand Basset Portfolio - V7
 * Gallery Navigation System
 * Auto-detection des images dans les dossiers
 */

// ================================
// CONFIGURATION DES GALERIES
// ================================
// Pour changer l'ordre : renomme les fichiers avec des numéros (01.jpg, 02.jpg...)
// Les images sont triées par ordre alphabétique

const GALLERIES_CONFIG = {
    "accueil": {
        title: "Gallery",
        path: "images/accueil",
        images: [
            "26062022- ORIANE-RESIDENCE-PARVIS PISCINE-3Man&Pia.jpg",
            "L1000872Man&Pia.jpg",
            "prise de vue sans titre-1000099Man&Pia.jpg",
            "prise de vue sans titre-1000100Man&Pia.jpg",
            "prise de vue sans titre-1010526Man&Pia.jpg",
            "prise de vue sans titre-1220770Man&Pia.jpg",
            "prise de vue sans titre-1220771Man&Pia.jpg",
            "prise de vue sans titre-1220773Man&Pia.jpg",
            "prise de vue sans titre-1220776Man&Pia.jpg",
            "prise de vue sans titre-1220777Man&Pia.jpg",
            "prise de vue sans titre-1220778Man&Pia.jpg",
            "prise de vue sans titre-1220779Man&Pia.jpg",
            "prise de vue sans titre-1220780Man&Pia.jpg",
            "prise de vue sans titre-1220781Man&Pia.jpg",
            "prise de vue sans titre-1220782Man&Pia.jpg",
            "prise de vue sans titre-1220784Man&Pia.jpg",
            "prise de vue sans titre-1220830Man&Pia.jpg",
            "prise de vue sans titre-1220838Man&Pia.jpg",
            "prise de vue sans titre-1220884Man&Pia.jpg",
            "prise de vue sans titre-1220952Man&Pia.jpg",
            "prise de vue sans titre-1220958Man&Pia.jpg",
            "prise de vue sans titre-3610BB@SS.jpg",
            "prise de vue sans titre-3616BB@SS.jpg",
            "prise de vue sans titre-3629BB@SS.jpg",
            "prise de vue sans titre-3650BB@SS.jpg",
            "prise de vue sans titre-3653BB@SS.jpg",
            "prise de vue sans titre-5583BB@SS.jpg"
        ]
    },
    "portrait": {
        title: "Portrait",
        path: "images/photography/portrait",
        images: [
            "02.jpg",
            "AngeMarine01@bertrandbasset 1.jpg",
            "AngeMarine13@bertrandbasset 13.jpg",
            "AngeMarine18@bertrandbasset 18.jpg",
            "AngeMarine20@bertrandbasset 20.jpg",
            "AngeMarine22@bertrandbasset 22.jpg",
            "Imane02@bertrandbasset 2.jpg",
            "JF.jpg",
            "L1020630.jpg",
            "L1020631.jpg",
            "L1020635.jpg",
            "L1020643.jpg",
            "Mathilde&Louise04@bertrandbasset 4.jpg",
            "Stephanie02@bertrandbasset 2.jpg",
            "Stephanie05@bertrandbasset 5.jpg",
            "Stephanie06@bertrandbasset 6.jpg",
            "Timoté01@bertrandbasset 1.jpg",
            "prise_de_vue_sans_titre-1000589-ModifierMan_Pia.jpg",
            "prise_de_vue_sans_titre-2-385Man_Pia.jpg",
            "prise_de_vue_sans_titre-7208Man_Pia.jpg",
            "prise_de_vue_sans_titre-8640Man_Pia.jpg"
        ]
    },
    "gem": {
        title: "Le GEM s'endimanche",
        path: "images/photography/serie-portrait/gem",
        projectTitle: "Le GEM s'endimanche",
        projectLink: "projects/le-gem.html",
        images: [
            "ALain.jpg",
            "Beatrice.jpg",
            "Bernard.jpg",
            "Bruno.jpg",
            "GUY.jpg",
            "Helene.jpg",
            "Jean-Pierre.jpg",
            "JeanFrancois.jpg",
            "Laurence.jpg",
            "Patricia.jpg",
            "Theo.jpg",
            "VALERIE .jpg",
            "Veronique.jpg"
        ]
    },
    "burning-man": {
        title: "Burning Man",
        path: "images/photography/immersion/Burning Man",
        images: [
            "prise de vue sans titre-1890BB@SS.jpg",
            "prise de vue sans titre-2453BB@SS.jpg",
            "prise de vue sans titre-2510BB@SS.jpg",
            "prise de vue sans titre-2663BB@SS.jpg",
            "prise de vue sans titre-2850BB@SS.jpg",
            "prise de vue sans titre-2884-ModifierBB@SS.jpg",
            "prise de vue sans titre-2980BB@SS.jpg",
            "prise de vue sans titre-3187BB@SS.jpg",
            "prise de vue sans titre-3229BB@SS.jpg",
            "prise de vue sans titre-3421BB@SS.jpg",
            "prise de vue sans titre-3423BB@SS.jpg",
            "prise de vue sans titre-3578BB@SS.jpg",
            "prise de vue sans titre-3593BB@SS.jpg",
            "prise de vue sans titre-3600BB@SS.jpg",
            "prise de vue sans titre-3610BB@SS.jpg",
            "prise de vue sans titre-3614BB@SS.jpg",
            "prise de vue sans titre-3616BB@SS.jpg",
            "prise de vue sans titre-3629BB@SS.jpg",
            "prise de vue sans titre-3637-ModifierBB@SS.jpg",
            "prise de vue sans titre-3650BB@SS.jpg",
            "prise de vue sans titre-3653BB@SS.jpg",
            "prise de vue sans titre-4480BB@SS.jpg",
            "prise de vue sans titre-4531BB@SS.jpg",
            "prise de vue sans titre-4539BB@SS.jpg",
            "prise de vue sans titre-5378BB@SS.jpg",
            "prise de vue sans titre-5380BB@SS.jpg",
            "prise de vue sans titre-5543BB@SS.jpg",
            "prise de vue sans titre-5583BB@SS.jpg",
            "prise de vue sans titre-5606BB@SS.jpg",
            "prise de vue sans titre-5986BB@SS.jpg",
            "prise de vue sans titre-6273BB@SS.jpg",
            "prise de vue sans titre-6280BB@SS.jpg",
            "prise de vue sans titre-6290BB@SS.jpg",
            "prise de vue sans titre-6292BB@SS.jpg",
            "prise de vue sans titre-6294BB@SS.jpg"
        ]
    },
    "cinema": {
        title: "Cinema",
        path: "images/filmmaker/cinema",
        images: [
            "1.jpg",
            "2.jpg",
            "3.jpg",
            "4.jpg",
            "5.jpg",
            "6.jpg",
            "7.jpg",
            "8.jpg",
            "9.jpg"
        ]
    },
    "television": {
        title: "Television",
        path: "images/filmmaker/Television",
        images: [
            "01.jpg",
            "02.jpg",
            "03.jpg",
            "04.jpg",
            "05.jpg",
            "06.jpg",
            "07.jpg",
            "08.jpg",
            "09.jpg",
            "10.jpg"
        ]
    },
    "carre-das": {
        title: "Carré d'As",
        path: "images/photography/serie-portrait/Carré D'as",
        images: []
    },
    "st-melar": {
        title: "St Mélar",
        path: "images/photography/immersion/St Mélar",
        images: []
    }
};

// ================================
// TRANSLATIONS
// ================================
const TRANSLATIONS = {
    en: {
        "photography": "Photography",
        "portrait": "Portrait",
        "serie-portrait": "Serie Portrait",
        "immersion": "Immersion",
        "filmmaker": "Filmmaker",
        "cinema": "Cinema",
        "television": "Television",
        "studio": "Studio",
        "portrait-session": "Portrait Session",
        "work-immersion": "Work Immersion",
        "about": "About",
        "contact": "Contact",
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
        "television": "Télévision",
        "studio": "Studio",
        "portrait-session": "Séance Portrait",
        "work-immersion": "Immersion Travail",
        "about": "À propos",
        "contact": "Contact",
        "learn-more": "en savoir plus",
        "listen": "écouter",
        "pause": "pause",
        "prev": "préc",
        "next": "suiv",
        "show-thumbnails": "voir vignettes",
        "hide-thumbnails": "masquer vignettes"
    }
};

// ================================
// PORTFOLIO CLASS
// ================================
class Portfolio {
    constructor() {
        this.galleries = this.buildGalleries();
        this.currentGallery = null;
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.cursorDirection = 'next';
        this.currentAudio = null;
        this.isPlaying = false;
        this.currentLang = 'fr';
        this.isMobile = window.innerWidth <= 768;

        this.init();
    }

    buildGalleries() {
        const galleries = {};
        for (const [id, config] of Object.entries(GALLERIES_CONFIG)) {
            galleries[id] = {
                title: config.title,
                category: config.category || '',
                projectTitle: config.projectTitle || null,
                projectLink: config.projectLink || null,
                images: config.images.map(img => ({
                    src: `${config.path}/${img}`,
                    caption: config.captions ? config.captions[img] || '' : ''
                }))
            };
        }
        return galleries;
    }

    init() {
        this.cacheElements();
        this.createCustomCursor();
        this.bindEvents();
        this.openGallery('accueil');
        this.handleResize();
    }

    // ================================
    // CACHE DOM ELEMENTS
    // ================================
    cacheElements() {
        // Landing
        this.landing = document.getElementById('landing');
        this.site = document.getElementById('site');
        this.enterBtn = document.getElementById('enterBtn');

        // Mobile menu
        this.menuToggle = document.getElementById('menuToggle');
        this.mainNav = document.getElementById('mainNav');

        // Gallery
        this.galleryContainer = document.getElementById('galleryContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.thumbnailsToggle = document.getElementById('thumbnailsToggle');
        this.thumbnailsPanel = document.getElementById('thumbnailsPanel');
        this.thumbnailsGrid = document.getElementById('thumbnailsGrid');
        this.thumbnailsClose = document.getElementById('thumbnailsClose');
        this.galleryCounter = document.querySelector('.gallery-counter');
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

        // Audio
        this.audioControls = document.querySelector('.audio-controls');
        this.audioBtn = document.getElementById('audioBtn');
        this.audioIcon = document.querySelector('.audio-icon');
        this.audioLabel = document.querySelector('.audio-label');
        this.autoplayToggle = document.getElementById('autoplayToggle');

        // Other
        this.homeLink = document.getElementById('homeLink');
        this.langLinks = document.querySelectorAll('[data-lang]');
        this.i18nElements = document.querySelectorAll('[data-i18n]');
        this.cursor = document.getElementById('customCursor');
    }

    // ================================
    // CUSTOM CURSOR
    // ================================
    createCustomCursor() {
        if (!this.cursor) {
            this.cursor = document.createElement('div');
            this.cursor.className = 'custom-cursor';
            this.cursor.id = 'customCursor';
            this.cursor.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <polyline points="9,6 15,12 9,18"></polyline>
                </svg>
            `;
            document.body.appendChild(this.cursor);
        }
    }

    updateCursorDirection(direction) {
        if (this.cursorDirection === direction || this.isMobile) return;
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

    updateCursor(e) {
        if (this.isMobile) return;
        
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

    // ================================
    // BIND EVENTS
    // ================================
    bindEvents() {
        // Enter button
        if (this.enterBtn) {
            this.enterBtn.addEventListener('click', () => this.enterSite());
        }

        // Home link
        if (this.homeLink) {
            this.homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openGallery('accueil');
                this.clearActiveLinks();
                this.closeMenu();
            });
        }

        // Mobile menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
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
                    this.closeMenu();
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
                    this.closeMenu();
                }
            });
        });

        // Gallery navigation
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

        // Click on gallery - gauche = prev, droite = next (desktop ET mobile)
        if (this.galleryContainer) {
            this.galleryContainer.addEventListener('click', (e) => {
                const rect = this.galleryContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const midpoint = rect.width / 2;

                if (x < midpoint) {
                    this.prevImage();
                } else {
                    this.nextImage();
                }
            });

            // Cursor movement (desktop only)
            this.galleryContainer.addEventListener('mousemove', (e) => {
                if (!this.isMobile) this.updateCursor(e);
            });

            this.galleryContainer.addEventListener('mouseenter', () => {
                if (!this.isMobile) this.cursor.classList.add('visible');
            });

            this.galleryContainer.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('visible');
            });
        }

        // Thumbnails
        if (this.thumbnailsToggle) {
            this.thumbnailsToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleThumbnails();
            });
        }

        if (this.thumbnailsClose) {
            this.thumbnailsClose.addEventListener('click', () => {
                this.hideThumbnails();
            });
        }

        // Keyboard
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Touch/swipe
        this.initSwipe();

        // Audio
        if (this.audioBtn) {
            this.audioBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAudio();
            });
        }

        // Language
        this.langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.dataset.lang;
                this.setLanguage(lang);
            });
        });

        // Resize
        window.addEventListener('resize', () => this.handleResize());
    }

    // ================================
    // MOBILE MENU
    // ================================
    toggleMenu() {
        this.menuToggle.classList.toggle('open');
        this.mainNav.classList.toggle('open');
    }

    closeMenu() {
        if (this.menuToggle) {
            this.menuToggle.classList.remove('open');
            this.mainNav.classList.remove('open');
        }
    }

    handleResize() {
        this.isMobile = window.innerWidth <= 768;
        if (!this.isMobile) {
            this.closeMenu();
        }
    }

    // ================================
    // NAVIGATION
    // ================================
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

    setActiveDropdownLink(activeLink) {
        this.clearActiveLinks();
        activeLink.classList.add('active');
    }

    clearActiveLinks() {
        this.dropdownLinks.forEach(link => link.classList.remove('active'));
        this.dropdownSublinks.forEach(link => link.classList.remove('active'));
    }

    // ================================
    // GALLERY
    // ================================
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

        // Fade out
        const currentImages = this.galleryContainer.querySelectorAll('.gallery-image');
        currentImages.forEach(img => {
            img.classList.add('transitioning');
            img.classList.remove('loaded');
        });

        setTimeout(() => {
            this.galleryContainer.innerHTML = '';
            this.galleryContainer.classList.remove('single', 'pair');
            this.galleryContainer.classList.add('single');

            const imgSrc = typeof imageData === 'string' ? imageData : imageData.src;
            const caption = typeof imageData === 'object' ? imageData.caption : '';
            this.loadSingleImage(imgSrc, caption);

            this.updateCounter();
            this.updateActiveThumbnail(index);

        }, 300);
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
        img.src = encodeURI(src);

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
        if (this.galleryCounter && this.currentGallery) {
            const current = this.currentIndex + 1;
            const total = this.currentGallery.images.length;
            this.galleryCounter.textContent = `${current} / ${total}`;
        }
    }

    // ================================
    // KEYBOARD & SWIPE
    // ================================
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
                this.closeMenu();
                break;
        }
    }

    initSwipe() {
        if (!this.galleryContainer) return;

        let touchStartX = 0;
        let touchStartY = 0;

        this.galleryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        this.galleryContainer.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = Math.abs(touchStartY - touchEndY);
            
            // Only handle horizontal swipes
            if (Math.abs(diffX) > 50 && diffY < 100) {
                if (diffX > 0) {
                    this.nextImage();
                } else {
                    this.prevImage();
                }
            }
        }, { passive: true });
    }

    // ================================
    // THUMBNAILS
    // ================================
    toggleThumbnails() {
        if (this.thumbnailsPanel) {
            this.thumbnailsPanel.classList.toggle('active');
            const isActive = this.thumbnailsPanel.classList.contains('active');
            if (this.thumbnailsToggle) {
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
            const imgSrc = typeof imageData === 'string' ? imageData : imageData.src;

            const thumb = document.createElement('img');
            thumb.src = encodeURI(imgSrc);
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

    // ================================
    // PROJECT INFO
    // ================================
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

    // ================================
    // AUDIO (for future use)
    // ================================
    stopAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
            this.isPlaying = false;
        }
    }

    toggleAudio() {
        // Placeholder for audio functionality
    }

    // ================================
    // LANGUAGE
    // ================================
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

// ================================
// INITIALIZE
// ================================
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});
