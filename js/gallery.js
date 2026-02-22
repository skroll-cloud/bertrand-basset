/**
 * Bertrand Basset Portfolio
 * Menu généré dynamiquement depuis MENU_CONFIG
 */

const MENU_CONFIG = [
  { "id": "portrait", "name": "Portrait", "type": "gallery", "galleryId": "portrait" },
  { "id": "headshot", "name": "Headshot", "type": "gallery", "galleryId": "headshot" },
  { "id": "series", "name": "Séries", "type": "category", "children": [
      { "id": "burning-man-m", "name": "Burning Man", "type": "gallery", "galleryId": "burning-man" },
      { "id": "gem-m", "name": "Le GEM s'endimanche", "type": "gallery", "galleryId": "gem" },
      { "id": "carre-das-m", "name": "Carré d'As", "type": "gallery", "galleryId": "carre-das" },
      { "id": "st-melar-m", "name": "St Mélar", "type": "gallery", "galleryId": "st-melar" }
  ]},
  { "id": "other", "name": "Autres Travaux", "type": "category", "children": [
      { "id": "cinema-m", "name": "Cinéma", "type": "gallery", "galleryId": "cinema" },
      { "id": "tv-m", "name": "Télévision", "type": "gallery", "galleryId": "television" }
  ]},
  { "id": "boutique", "name": "Boutique", "type": "external", "url": "https://galerie.bertrandbasset.com" },
  { "id": "about-m", "name": "À propos", "type": "page", "pageId": "about" },
  { "id": "contact-m", "name": "Contact", "type": "page", "pageId": "contact" }
];

const GALLERIES_CONFIG = {
    "accueil": {
        title: "Accueil",
        path: "images/accueil",
        images: [
            { filename: "02.jpg" },
            { filename: "prise de vue sans titre-3616BB@SS.jpg" },
            { filename: "prise de vue sans titre-1220776Man&Pia.jpg" },
            { filename: "prise de vue sans titre-3610BB@SS.jpg" },
            { filename: "prise de vue sans titre-3653BB@SS.jpg", tirage: true },
            { filename: "prise de vue sans titre-5583BB@SS.jpg", tirage: true },
            { filename: "prise de vue sans titre-1010526Man&Pia.jpg" },
            { filename: "26062022- ORIANE-RESIDENCE-PARVIS PISCINE-3Man&Pia.jpg" },
            { filename: "prise de vue sans titre-1220771Man&Pia.jpg" },
            { filename: "prise de vue sans titre-1220777Man&Pia.jpg" },
            { filename: "prise de vue sans titre-1220784Man&Pia.jpg" },
            { filename: "prise de vue sans titre-1220830Man&Pia.jpg" },
            { filename: "prise de vue sans titre-3629BB@SS.jpg" },
            { filename: "prise de vue sans titre-3650BB@SS.jpg" },
            { filename: "AngeMarine18@bertrandbasset 18.jpg" }
        ]
    },
    "portrait": {
        title: "Portrait",
        path: "images/photography/portrait",
        images: [
            { filename: "02.jpg", caption: "Headshot Acteur" },
            { filename: "AngeMarine18@bertrandbasset 18.jpg" },
            { filename: "L1020643.jpg" },
            { filename: "Stephanie06@bertrandbasset 6.jpg" },
            { filename: "Imane02@bertrandbasset 2.jpg" },
            { filename: "AngeMarine01@bertrandbasset 1.jpg" },
            { filename: "prise_de_vue_sans_titre-1000589-ModifierMan_Pia.jpg" },
            { filename: "AngeMarine13@bertrandbasset 13.jpg" },
            { filename: "Mathilde&Louise04@bertrandbasset 4.jpg" },
            { filename: "AngeMarine22@bertrandbasset 22.jpg" },
            { filename: "L1020630.jpg" },
            { filename: "prise_de_vue_sans_titre-8640Man_Pia.jpg" },
            { filename: "Stephanie05@bertrandbasset 5.jpg" },
            { filename: "AngeMarine20@bertrandbasset 20.jpg" },
            { filename: "prise_de_vue_sans_titre-2-385Man_Pia.jpg" },
            { filename: "prise_de_vue_sans_titre-7208Man_Pia.jpg" }
        ]
    },
    "headshot": {
        title: "Headshot",
        path: "images/photography/headshot",
        images: []
    },
    "gem": {
        title: "Le GEM s'endimanche",
        path: "images/photography/serie-portrait/gem",
        description: "Série de portraits réalisée au GEM de Morlaix. Chaque portrait est accompagné d'un témoignage audio.",
        projectTitle: "Le GEM s'endimanche",
        autoplayAudio: true,
        images: [
            { filename: "ALain.jpg", audio: "ALain.mp3" },
            { filename: "Beatrice.jpg", audio: "Beatrice.mp3" },
            { filename: "Bernard.jpg", audio: "Bernard.mp3" },
            { filename: "Bruno.jpg" },
            { filename: "GUY.jpg" },
            { filename: "Helene.jpg", audio: "Helene.mp3" },
            { filename: "Jean-Pierre.jpg" },
            { filename: "JeanFrancois.jpg", audio: "JeanFrancois.mp3" },
            { filename: "Laurence.jpg" },
            { filename: "Patricia.jpg", audio: "Patricia.mp3" },
            { filename: "Theo.jpg", audio: "Theo.mp3" },
            { filename: "Veronique.jpg" },
            { filename: "VALERIE.jpg", audio: "VALERIE.mp3" }
        ]
    },
    "carre-das": {
        title: "Carré d'As",
        path: "images/photography/serie-portrait/Carré D'as",
        images: []
    },
    "burning-man": {
        title: "Burning Man",
        path: "images/photography/immersion/Burning Man",
        images: [
            { filename: "prise de vue sans titre-1890BB@SS.jpg" },
            { filename: "prise de vue sans titre-4480BB@SS.jpg" },
            { filename: "prise de vue sans titre-3616BB@SS.jpg" },
            { filename: "prise de vue sans titre-3610BB@SS.jpg" },
            { filename: "prise de vue sans titre-3629BB@SS.jpg" },
            { filename: "prise de vue sans titre-3650BB@SS.jpg" },
            { filename: "prise de vue sans titre-3653BB@SS.jpg" },
            { filename: "prise de vue sans titre-4182BB@SS.jpg" },
            { filename: "prise de vue sans titre-4184BB@SS.jpg" },
            { filename: "prise de vue sans titre-4264BB@SS.jpg" },
            { filename: "prise de vue sans titre-4318BB@SS.jpg" },
            { filename: "prise de vue sans titre-4378BB@SS.jpg" },
            { filename: "prise de vue sans titre-4403BB@SS.jpg" },
            { filename: "prise de vue sans titre-4405BB@SS.jpg" },
            { filename: "prise de vue sans titre-4423BB@SS.jpg" },
            { filename: "prise de vue sans titre-4449BB@SS.jpg" },
            { filename: "prise de vue sans titre-4463BB@SS.jpg" },
            { filename: "prise de vue sans titre-4473BB@SS.jpg" },
            { filename: "prise de vue sans titre-4511BB@SS.jpg" },
            { filename: "prise de vue sans titre-4565BB@SS.jpg" },
            { filename: "prise de vue sans titre-4645BB@SS.jpg" },
            { filename: "prise de vue sans titre-4753BB@SS.jpg" },
            { filename: "prise de vue sans titre-4757BB@SS.jpg" },
            { filename: "prise de vue sans titre-4769BB@SS.jpg" },
            { filename: "prise de vue sans titre-4788BB@SS.jpg" },
            { filename: "prise de vue sans titre-4931BB@SS.jpg" },
            { filename: "prise de vue sans titre-5150BB@SS.jpg" },
            { filename: "prise de vue sans titre-5356BB@SS.jpg" },
            { filename: "prise de vue sans titre-5432BB@SS.jpg" },
            { filename: "prise de vue sans titre-5583BB@SS.jpg" },
            { filename: "prise de vue sans titre-5768BB@SS.jpg" },
            { filename: "prise de vue sans titre-5896BB@SS.jpg" },
            { filename: "prise de vue sans titre-5903BB@SS.jpg" },
            { filename: "prise de vue sans titre-5912BB@SS.jpg" }
        ]
    },
    "st-melar": {
        title: "St Mélar",
        path: "images/photography/immersion/St Mélar",
        images: []
    },
    "cinema": {
        title: "Cinéma",
        path: "images/filmmaker/cinema",
        images: [
            { filename: "AFFICHE FILM J'ARRIVE.jpg" },
            { filename: "AFFICHE L'UN POUR L'AUTRE.jpg" },
            { filename: "AFFICHE KAPO.jpg" },
            { filename: "10-la famille-8.jpg" },
            { filename: "11-le-general-2.jpg" },
            { filename: "AFFICHE VISAGES.jpg" },
            { filename: "jarrive-making-of-85.jpg" },
            { filename: "jarrive-making-of-163.jpg" },
            { filename: "jarrive-making-of-127.jpg" }
        ]
    },
    "television": {
        title: "Télévision",
        path: "images/filmmaker/Television",
        images: [
            { filename: "01.jpg" },
            { filename: "02.jpg" },
            { filename: "03.jpg" },
            { filename: "04.jpg" },
            { filename: "07.jpg" },
            { filename: "08.jpg" },
            { filename: "09.jpg" },
            { filename: "06.jpg" },
            { filename: "05.jpg" },
            { filename: "10.jpg" }
        ]
    }
};

const PAGES_CONFIG = {
    "about": { "title": "À propos", "content": "Bertrand Basset\nPhotographe & Réalisateur\n\nBasé en Bretagne, je réalise des portraits, des séries documentaires et des films.\n\nAprès 20 ans comme journaliste reporter d'images pour France 2, j'ai choisi de me consacrer à des projets plus personnels et artistiques." },
    "contact": { "title": "Contact", "content": "contact@bertrandbasset.com\n\nCarantec, Finistère\nBretagne, France" }
};

const TRANSLATIONS = {
    en: { "prev": "prev", "next": "next", "show-thumbnails": "thumbnails", "hide-thumbnails": "hide", "play": "play", "pause": "pause", "buy-print": "Buy", "see-series": "See series", "learn-more": "Learn more" },
    fr: { "prev": "préc", "next": "suiv", "show-thumbnails": "vignettes", "hide-thumbnails": "masquer", "play": "écouter", "pause": "pause", "buy-print": "Acheter", "see-series": "Voir la série", "learn-more": "En savoir plus" }
};

class Portfolio {
    constructor() {
        this.galleries = this.buildGalleries();
        this.currentGallery = null;
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.currentAudio = null;
        this.isPlaying = false;
        this.currentLang = 'fr';
        this.isMobile = window.innerWidth <= 768;
        this.autoplayAudio = false;
        this.init();
    }

    buildGalleries() {
        const galleries = {};
        for (const [id, config] of Object.entries(GALLERIES_CONFIG)) {
            const items = [];
            if (config.description) items.push({ type: 'description', title: config.title, text: config.description });
            if (config.videos) config.videos.forEach(v => items.push({ type: 'video', platform: v.type, videoId: v.id, title: v.title }));
            config.images.forEach(img => {
                items.push({
                    type: 'image',
                    src: `${config.path}/${img.filename}`,
                    title: img.title || '',
                    subtitle: img.subtitle || '',
                    description: img.description || '',
                    caption: img.caption || '',
                    audio: img.audio ? `${config.path}/${img.audio}` : null,
                    tirage: img.tirage,
                    tirageUrl: img.tirageUrl,
                    linkSerie: img.linkSerie,
                    linkSerieTarget: img.linkSerieTarget,
                    linkSavoir: img.linkSavoir,
                    linkSavoirUrl: img.linkSavoirUrl
                });
            });
            galleries[id] = { ...config, items };
        }
        return galleries;
    }

    init() {
        this.buildMenu();
        this.cacheElements();
        this.bindEvents();
        this.openGallery('accueil');
    }

    // Génère le menu dynamiquement depuis MENU_CONFIG
    buildMenu() {
        const nav = document.getElementById('mainNav');
        if (!nav) return;
        
        nav.innerHTML = MENU_CONFIG.map(item => this.renderMenuItem(item)).join('');
    }

    renderMenuItem(item) {
        if (item.type === 'category') {
            return `
                <div class="nav-item" data-expandable>
                    <a href="#" class="nav-link">${item.name}</a>
                    <div class="nav-dropdown">
                        ${item.children.map(child => this.renderSubMenuItem(child)).join('')}
                    </div>
                </div>
            `;
        } else if (item.type === 'gallery') {
            return `
                <div class="nav-item">
                    <a href="#" class="nav-link" data-gallery="${item.galleryId}">${item.name}</a>
                </div>
            `;
        } else if (item.type === 'page') {
            return `
                <div class="nav-item">
                    <a href="#" class="nav-link" data-page="${item.pageId}">${item.name}</a>
                </div>
            `;
        } else if (item.type === 'external') {
            return `
                <div class="nav-item">
                    <a href="${item.url}" class="nav-link" target="_blank">${item.name}</a>
                </div>
            `;
        }
        return '';
    }

    renderSubMenuItem(item) {
        if (item.type === 'gallery') {
            return `<a href="#" class="dropdown-link" data-gallery="${item.galleryId}">${item.name}</a>`;
        } else if (item.type === 'page') {
            return `<a href="#" class="dropdown-link" data-page="${item.pageId}">${item.name}</a>`;
        } else if (item.type === 'external') {
            return `<a href="${item.url}" class="dropdown-link" target="_blank">${item.name}</a>`;
        } else if (item.type === 'subcategory' && item.children) {
            return `
                <a href="#" class="dropdown-link has-submenu">${item.name}</a>
                <div class="nav-sub-dropdown">
                    ${item.children.map(child => `<a href="#" class="dropdown-sublink" data-gallery="${child.galleryId}">${child.name}</a>`).join('')}
                </div>
            `;
        }
        return '';
    }

    cacheElements() {
        this.landing = document.getElementById('landing');
        this.site = document.getElementById('site');
        this.enterBtn = document.getElementById('enterBtn');
        this.menuToggle = document.getElementById('menuToggle');
        this.mainNav = document.getElementById('mainNav');
        this.galleryContainer = document.getElementById('galleryContainer');
        this.galleryCounter = document.querySelector('.gallery-counter');
        this.imageCaption = document.querySelector('.image-caption');
        this.imageInfo = document.querySelector('.image-info');
        this.audioControls = document.querySelector('.audio-controls');
        this.audioBtn = document.getElementById('audioBtn');
        this.projectInfo = document.querySelector('.project-info');
        this.projectTitle = document.querySelector('.project-title');
        this.projectLink = document.querySelector('.project-link');
        this.homeLink = document.getElementById('homeLink');
        this.cursor = document.getElementById('customCursor');
    }

    bindEvents() {
        if (this.enterBtn) this.enterBtn.onclick = () => this.enterSite();
        if (this.homeLink) this.homeLink.onclick = e => { e.preventDefault(); this.openGallery('accueil'); this.closeMenu(); };
        if (this.menuToggle) this.menuToggle.onclick = () => this.toggleMenu();
        
        // Bind nav items (après buildMenu)
        document.querySelectorAll('.nav-item[data-expandable]').forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) link.onclick = e => { e.preventDefault(); item.classList.toggle('open'); };
        });
        
        // Bind gallery links
        document.querySelectorAll('[data-gallery]').forEach(link => {
            link.onclick = e => { 
                e.preventDefault(); 
                const galleryId = link.dataset.gallery;
                if (galleryId && this.galleries[galleryId]) {
                    this.openGallery(galleryId); 
                    this.closeMenu(); 
                }
            };
        });
        
        // Bind page links
        document.querySelectorAll('[data-page]').forEach(link => {
            link.onclick = e => { e.preventDefault(); this.showPage(link.dataset.page); this.closeMenu(); };
        });

        // Bind submenu toggles
        document.querySelectorAll('.dropdown-link.has-submenu').forEach(link => {
            link.onclick = e => { e.preventDefault(); link.classList.toggle('open'); };
        });
        
        // Gallery container click navigation
        if (this.galleryContainer) {
            this.galleryContainer.onclick = e => {
                if (e.target.closest('.video-container, .buy-button, .image-link, a')) return;
                const rect = this.galleryContainer.getBoundingClientRect();
                (e.clientX - rect.left) < rect.width / 2 ? this.prev() : this.next();
            };
            
            // Custom cursor
            this.galleryContainer.onmousemove = e => {
                if (!this.isMobile && this.cursor) {
                    this.cursor.style.left = e.clientX + 'px';
                    this.cursor.style.top = e.clientY + 'px';
                    const rect = this.galleryContainer.getBoundingClientRect();
                    const isLeft = (e.clientX - rect.left) < rect.width / 2;
                    this.cursor.innerHTML = isLeft 
                        ? '<svg viewBox="0 0 24 24"><polyline points="15,6 9,12 15,18"></polyline></svg>'
                        : '<svg viewBox="0 0 24 24"><polyline points="9,6 15,12 9,18"></polyline></svg>';
                }
            };
            this.galleryContainer.onmouseenter = () => { if (!this.isMobile && this.cursor) this.cursor.classList.add('visible'); };
            this.galleryContainer.onmouseleave = () => { if (this.cursor) this.cursor.classList.remove('visible'); };
        }
        
        // Audio button
        if (this.audioBtn) this.audioBtn.onclick = () => this.toggleAudio();
        
        // Keyboard navigation
        document.onkeydown = e => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
            if (e.key === ' ') { e.preventDefault(); this.toggleAudio(); }
            if (e.key === 'Escape') this.closeMenu();
        };
        
        // Touch swipe
        this.initSwipe();
        
        // Window resize
        window.onresize = () => {
            this.isMobile = window.innerWidth <= 768;
            if (!this.isMobile) this.closeMenu();
        };
    }

    enterSite() { 
        this.landing?.classList.add('hidden'); 
        this.site?.classList.add('active'); 
    }
    
    toggleMenu() { 
        this.menuToggle?.classList.toggle('open'); 
        this.mainNav?.classList.toggle('open'); 
    }
    
    closeMenu() { 
        this.menuToggle?.classList.remove('open'); 
        this.mainNav?.classList.remove('open'); 
    }

    openGallery(id) {
        const g = this.galleries[id];
        if (!g?.items?.length) return;
        this.currentGallery = g;
        this.currentGalleryId = id;
        this.currentIndex = 0;
        this.autoplayAudio = g.autoplayAudio || false;
        if (this.galleryCounter) this.galleryCounter.style.display = '';
        this.showItem(0);
        this.updateProjectInfo();
    }

    showItem(index) {
        if (!this.currentGallery || this.isTransitioning) return;
        const items = this.currentGallery.items;
        if (index < 0 || index >= items.length) return;
        
        this.stopAudio();
        this.isTransitioning = true;
        this.currentIndex = index;
        const item = items[index];
        
        // Fade out current
        const current = this.galleryContainer.querySelector('.gallery-image, .description-slide, .video-container');
        if (current) current.classList.add('transitioning');
        
        setTimeout(() => {
            this.galleryContainer.innerHTML = '';
            
            if (item.type === 'description') {
                const div = document.createElement('div');
                div.className = 'description-slide';
                div.innerHTML = `<div class="description-content"><h2 class="description-title">${item.title}</h2><p class="description-text">${item.text}</p></div>`;
                this.galleryContainer.appendChild(div);
                setTimeout(() => { div.classList.add('loaded'); this.isTransitioning = false; }, 50);
            } else if (item.type === 'video') {
                const div = document.createElement('div');
                div.className = 'video-container';
                const url = item.platform === 'vimeo' 
                    ? `https://player.vimeo.com/video/${item.videoId}?title=0&byline=0&portrait=0` 
                    : `https://www.youtube.com/embed/${item.videoId}?rel=0`;
                div.innerHTML = `<iframe src="${url}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                this.galleryContainer.appendChild(div);
                setTimeout(() => { div.classList.add('loaded'); this.isTransitioning = false; }, 50);
            } else {
                const wrapper = document.createElement('div');
                wrapper.className = 'image-wrapper';
                
                const img = document.createElement('img');
                img.className = 'gallery-image';
                img.alt = item.caption || item.title || '';
                img.onload = () => { img.classList.add('loaded'); this.isTransitioning = false; };
                img.onerror = () => { this.isTransitioning = false; };
                img.src = encodeURI(item.src);
                wrapper.appendChild(img);
                
                // Buy button
                if (item.tirage && item.tirageUrl) {
                    const btn = document.createElement('a');
                    btn.className = 'buy-button';
                    btn.href = item.tirageUrl;
                    btn.target = '_blank';
                    btn.textContent = '🛒 ' + TRANSLATIONS[this.currentLang]['buy-print'];
                    wrapper.appendChild(btn);
                }
                
                this.galleryContainer.appendChild(wrapper);
                
                // Autoplay audio
                if (item.audio && this.autoplayAudio) {
                    this.playAudio(item.audio);
                }
            }
            
            this.updateUI(item);
        }, 200);
    }

    updateUI(item) {
        // Counter
        if (this.galleryCounter) {
            this.galleryCounter.textContent = `${this.currentIndex + 1} / ${this.currentGallery.items.length}`;
        }
        
        // Caption
        if (this.imageCaption) {
            this.imageCaption.textContent = item.caption || '';
        }
        
        // Image info (title, subtitle, description, links)
        if (this.imageInfo) {
            let html = '';
            if (item.title) html += `<h3 class="image-title">${item.title}</h3>`;
            if (item.subtitle) html += `<p class="image-subtitle">${item.subtitle}</p>`;
            if (item.description) html += `<p class="image-description">${item.description}</p>`;
            if (item.linkSerie && item.linkSerieTarget) {
                html += `<a href="#" class="image-link" onclick="event.preventDefault();portfolio.openGallery('${item.linkSerieTarget}')">${TRANSLATIONS[this.currentLang]['see-series']} →</a>`;
            }
            if (item.linkSavoir && item.linkSavoirUrl) {
                html += `<a href="${item.linkSavoirUrl}" target="_blank" class="image-link">${TRANSLATIONS[this.currentLang]['learn-more']} →</a>`;
            }
            this.imageInfo.innerHTML = html;
        }
        
        // Audio controls
        if (this.audioControls) {
            this.audioControls.classList.toggle('visible', item.type === 'image' && !!item.audio);
        }
    }

    updateProjectInfo() {
        if (!this.projectInfo || !this.currentGallery) return;
        if (this.currentGallery.projectTitle) {
            if (this.projectTitle) this.projectTitle.textContent = this.currentGallery.projectTitle;
            if (this.projectLink) this.projectLink.href = this.currentGallery.projectLink || '#';
            this.projectInfo.classList.add('visible');
        } else {
            this.projectInfo.classList.remove('visible');
        }
    }

    prev() { 
        if (this.currentGallery) {
            const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.currentGallery.items.length - 1;
            this.showItem(newIndex); 
        }
    }
    
    next() { 
        if (this.currentGallery) {
            const newIndex = this.currentIndex < this.currentGallery.items.length - 1 ? this.currentIndex + 1 : 0;
            this.showItem(newIndex); 
        }
    }

    playAudio(src) {
        this.stopAudio();
        this.currentAudio = new Audio(encodeURI(src));
        this.currentAudio.play().catch(() => {});
        this.isPlaying = true;
        this.updateAudioBtn();
        this.currentAudio.onended = () => { 
            this.isPlaying = false; 
            this.updateAudioBtn(); 
        };
    }
    
    stopAudio() { 
        if (this.currentAudio) { 
            this.currentAudio.pause(); 
            this.currentAudio = null; 
        } 
        this.isPlaying = false; 
        this.updateAudioBtn(); 
    }
    
    toggleAudio() {
        const item = this.currentGallery?.items[this.currentIndex];
        if (!item?.audio) return;
        this.isPlaying ? this.stopAudio() : this.playAudio(item.audio);
    }
    
    updateAudioBtn() {
        if (!this.audioBtn) return;
        this.audioBtn.innerHTML = this.isPlaying ? '⏸' : '▶';
        this.audioBtn.classList.toggle('playing', this.isPlaying);
    }

    showPage(id) {
        const page = PAGES_CONFIG[id];
        if (!page) return;
        this.currentGallery = null;
        this.stopAudio();
        
        if (this.galleryCounter) this.galleryCounter.style.display = 'none';
        if (this.audioControls) this.audioControls.classList.remove('visible');
        if (this.projectInfo) this.projectInfo.classList.remove('visible');
        if (this.imageInfo) this.imageInfo.innerHTML = '';
        if (this.imageCaption) this.imageCaption.textContent = '';
        
        let html = `<div class="page-content"><div class="page-text">${page.content.replace(/\n/g, '<br>')}</div>`;
        if (page.price) html += `<div class="page-price">${page.price}</div>`;
        if (page.link) html += `<a class="page-btn" href="${page.link}" target="_blank">Réserver</a>`;
        html += '</div>';
        this.galleryContainer.innerHTML = html;
    }

    initSwipe() {
        if (!this.galleryContainer) return;
        let startX = 0, startY = 0;
        
        this.galleryContainer.addEventListener('touchstart', e => {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        this.galleryContainer.addEventListener('touchend', e => {
            const diffX = startX - e.changedTouches[0].screenX;
            const diffY = Math.abs(startY - e.changedTouches[0].screenY);
            if (Math.abs(diffX) > 50 && diffY < 100) {
                if (diffX > 0) this.next();
                else this.prev();
            }
        }, { passive: true });
    }

    setLanguage(lang) {
        if (!TRANSLATIONS[lang]) return;
        this.currentLang = lang;
        document.querySelectorAll('[data-lang]').forEach(el => {
            el.classList.toggle('active', el.dataset.lang === lang);
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});
