/**
 * Bertrand Basset Portfolio
 * Auto-generated
 */

const MENU_CONFIG = [
  {
    "id": "photographe",
    "name": "Photographe",
    "type": "category",
    "children": [
      {
        "id": "portrait",
        "name": "Portrait",
        "type": "gallery",
        "galleryId": "portrait"
      },
      {
        "id": "serie-portrait",
        "name": "Série Portrait",
        "type": "subcategory",
        "children": [
          {
            "id": "gem-menu",
            "name": "Le GEM s'endimanche",
            "type": "gallery",
            "galleryId": "gem"
          },
          {
            "id": "carre-das-menu",
            "name": "Carré d'As",
            "type": "gallery",
            "galleryId": "carre-das"
          }
        ]
      },
      {
        "id": "immersion",
        "name": "Immersion",
        "type": "subcategory",
        "children": [
          {
            "id": "burning-man-menu",
            "name": "Burning Man",
            "type": "gallery",
            "galleryId": "burning-man"
          },
          {
            "id": "st-melar-menu",
            "name": "St Mélar",
            "type": "gallery",
            "galleryId": "st-melar"
          }
        ]
      }
    ]
  },
  {
    "id": "realisateur",
    "name": "Réalisateur",
    "type": "category",
    "children": [
      {
        "id": "cinema-menu",
        "name": "Cinéma",
        "type": "gallery",
        "galleryId": "cinema"
      },
      {
        "id": "television-menu",
        "name": "Télévision",
        "type": "gallery",
        "galleryId": "television"
      }
    ]
  },
  {
    "id": "galerie-link",
    "name": "Galerie",
    "type": "external",
    "url": "https://bertrandbasset.photodeck.com"
  },
  {
    "id": "prestations",
    "name": "Prestations",
    "type": "category",
    "children": [
      {
        "id": "presta-portrait",
        "name": "Portrait",
        "type": "page",
        "pageId": "presta-portrait"
      },
      {
        "id": "presta-headshot",
        "name": "Headshot Corporate",
        "type": "page",
        "pageId": "presta-headshot"
      },
      {
        "id": "presta-immersion",
        "name": "Immersion Métier",
        "type": "page",
        "pageId": "presta-immersion"
      },
      {
        "id": "presta-empreinte",
        "name": "Empreinte",
        "type": "page",
        "pageId": "presta-empreinte"
      }
    ]
  },
  {
    "id": "about-menu",
    "name": "À propos",
    "type": "page",
    "pageId": "about"
  },
  {
    "id": "contact-menu",
    "name": "Contact",
    "type": "page",
    "pageId": "contact"
  }
];

const GALLERIES_CONFIG = {
    "accueil": {
        title: "Accueil",
        path: "images/accueil",
        images: [
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
            { filename: "prise de vue sans titre-3650BB@SS.jpg" }
        ]
    },
    "portrait": {
        title: "Portrait",
        path: "images/photography/portrait",
        images: [
            { filename: "02.jpg" },
            { filename: "AngeMarine18@bertrandbasset 18.jpg" },
            { filename: "L1020643.jpg" },
            { filename: "Stephanie06@bertrandbasset 6.jpg" },
            { filename: "Imane02@bertrandbasset 2.jpg" },
            { filename: "AngeMarine01@bertrandbasset 1.jpg" },
            { filename: "Timoté01@bertrandbasset 1.jpg" },
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
        images: [
        ]
    },
    "burning-man": {
        title: "Burning Man",
        path: "images/photography/immersion/Burning Man",
        images: [
            { filename: "prise de vue sans titre-1890BB@SS.jpg" },
            { filename: "prise de vue sans titre-4480BB@SS.jpg" },
            { filename: "prise de vue sans titre-2453BB@SS.jpg" },
            { filename: "prise de vue sans titre-2510BB@SS.jpg" },
            { filename: "prise de vue sans titre-4539BB@SS.jpg" },
            { filename: "prise de vue sans titre-2663BB@SS.jpg" },
            { filename: "prise de vue sans titre-2850BB@SS.jpg" },
            { filename: "prise de vue sans titre-2884-ModifierBB@SS.jpg" },
            { filename: "prise de vue sans titre-2980BB@SS.jpg" },
            { filename: "prise de vue sans titre-3187BB@SS.jpg" },
            { filename: "prise de vue sans titre-3229BB@SS.jpg" },
            { filename: "prise de vue sans titre-3421BB@SS.jpg" },
            { filename: "prise de vue sans titre-3578BB@SS.jpg" },
            { filename: "prise de vue sans titre-3593BB@SS.jpg" },
            { filename: "prise de vue sans titre-3600BB@SS.jpg" },
            { filename: "prise de vue sans titre-3610BB@SS.jpg" },
            { filename: "prise de vue sans titre-3614BB@SS.jpg" },
            { filename: "prise de vue sans titre-3616BB@SS.jpg" },
            { filename: "prise de vue sans titre-3629BB@SS.jpg" },
            { filename: "prise de vue sans titre-3637-ModifierBB@SS.jpg" },
            { filename: "prise de vue sans titre-3650BB@SS.jpg" },
            { filename: "prise de vue sans titre-3653BB@SS.jpg" },
            { filename: "prise de vue sans titre-4531BB@SS.jpg" },
            { filename: "prise de vue sans titre-5378BB@SS.jpg" },
            { filename: "prise de vue sans titre-5380BB@SS.jpg" },
            { filename: "prise de vue sans titre-5543BB@SS.jpg" },
            { filename: "prise de vue sans titre-5583BB@SS.jpg" },
            { filename: "prise de vue sans titre-5606BB@SS.jpg" },
            { filename: "prise de vue sans titre-5986BB@SS.jpg" },
            { filename: "prise de vue sans titre-6273BB@SS.jpg" },
            { filename: "prise de vue sans titre-6280BB@SS.jpg" },
            { filename: "prise de vue sans titre-6290BB@SS.jpg" },
            { filename: "prise de vue sans titre-6292BB@SS.jpg" },
            { filename: "prise de vue sans titre-6294BB@SS.jpg" }
        ]
    },
    "st-melar": {
        title: "St Mélar",
        path: "images/photography/immersion/St Mélar",
        images: [
        ]
    },
    "cinema": {
        title: "Cinéma",
        path: "images/filmmaker/cinema",
        images: [
            { filename: "1.jpg" },
            { filename: "2.jpg" },
            { filename: "3.jpg" },
            { filename: "4.jpg" },
            { filename: "5.jpg" },
            { filename: "6.jpg" },
            { filename: "7.jpg" },
            { filename: "8.jpg" },
            { filename: "9.jpg" }
        ]
    },
    "television": {
        title: "Télévision",
        path: "images/filmmaker/Television",
        description: "Portraits d'invités du 20h30 le dimanche à partir d'archives, ainsi que des films documentaire sur l'histoire de la télévision, le commando Kieffer, ou encore Armel Le Cleac'h",
        images: [
            { filename: "01.jpg" },
            { filename: "02.jpg" },
            { filename: "03.jpg" },
            { filename: "04.jpg" },
            { filename: "05.jpg" },
            { filename: "06.jpg" },
            { filename: "07.jpg" },
            { filename: "08.jpg" },
            { filename: "09.jpg" },
            { filename: "10.jpg" }
        ]
    },
};

const PAGES_CONFIG = {
  "about": {
    "title": "À propos",
    "content": "Bertrand Basset\nPhotographe & Réalisateur\n\nBasé en Bretagne..."
  },
  "contact": {
    "title": "Contact",
    "content": "contact@bertrandbasset.com\nCarantec, Finistère"
  },
  "presta-portrait": {
    "title": "Portrait",
    "content": "Séance portrait en studio ou en extérieur.",
    "price": "",
    "link": ""
  },
  "presta-headshot": {
    "title": "Headshot Corporate",
    "content": "Portraits professionnels pour LinkedIn, CV, sites web.",
    "price": "",
    "link": ""
  },
  "presta-immersion": {
    "title": "Immersion Métier",
    "content": "Reportage photo au cœur de votre activité.",
    "price": "",
    "link": ""
  },
  "presta-empreinte": {
    "title": "Empreinte",
    "content": "Entretien filmé pour conserver la mémoire de vos proches.",
    "price": "",
    "link": ""
  }
};

const PROJECT_PAGES = {};


const TRANSLATIONS = {
    en: { "prev": "prev", "next": "next", "show-thumbnails": "thumbnails", "hide-thumbnails": "hide", "play": "play", "pause": "pause", "buy-print": "Buy print" },
    fr: { "prev": "préc", "next": "suiv", "show-thumbnails": "vignettes", "hide-thumbnails": "masquer", "play": "écouter", "pause": "pause", "buy-print": "Acheter" }
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
                    caption: img.caption || '',
                    audio: img.audio ? `${config.path}/${img.audio}` : null,
                    tirage: img.tirage,
                    tirageUrl: img.tirageUrl
                });
            });
            galleries[id] = { ...config, items };
        }
        return galleries;
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.openGallery('accueil');
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
        this.audioControls = document.querySelector('.audio-controls');
        this.audioBtn = document.getElementById('audioBtn');
        this.autoplayToggle = document.getElementById('autoplayToggle');
        this.homeLink = document.getElementById('homeLink');
        this.cursor = document.getElementById('customCursor');
        this.navItems = document.querySelectorAll('.nav-item[data-expandable]');
        this.dropdownLinks = document.querySelectorAll('[data-gallery]');
        this.pageLinks = document.querySelectorAll('[data-page]');
    }

    bindEvents() {
        if (this.enterBtn) this.enterBtn.onclick = () => this.enterSite();
        if (this.homeLink) this.homeLink.onclick = e => { e.preventDefault(); this.openGallery('accueil'); };
        if (this.menuToggle) this.menuToggle.onclick = () => this.toggleMenu();
        
        this.navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) link.onclick = e => { e.preventDefault(); item.classList.toggle('open'); };
        });
        
        this.dropdownLinks.forEach(link => {
            link.onclick = e => { e.preventDefault(); this.openGallery(link.dataset.gallery); this.closeMenu(); };
        });
        
        this.pageLinks.forEach(link => {
            link.onclick = e => { e.preventDefault(); this.showPage(link.dataset.page); this.closeMenu(); };
        });
        
        if (this.galleryContainer) {
            this.galleryContainer.onclick = e => {
                if (e.target.closest('.video-container, .buy-button')) return;
                const rect = this.galleryContainer.getBoundingClientRect();
                (e.clientX - rect.left) < rect.width / 2 ? this.prev() : this.next();
            };
        }
        
        if (this.audioBtn) this.audioBtn.onclick = () => this.toggleAudio();
        if (this.autoplayToggle) this.autoplayToggle.onchange = () => { this.autoplayAudio = this.autoplayToggle.checked; };
        
        document.onkeydown = e => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
            if (e.key === ' ') { e.preventDefault(); this.toggleAudio(); }
        };
        
        this.initSwipe();
    }

    enterSite() { this.landing?.classList.add('hidden'); this.site?.classList.add('active'); }
    toggleMenu() { this.menuToggle?.classList.toggle('open'); this.mainNav?.classList.toggle('open'); }
    closeMenu() { this.menuToggle?.classList.remove('open'); this.mainNav?.classList.remove('open'); }

    openGallery(id) {
        const g = this.galleries[id];
        if (!g?.items.length) return;
        this.currentGallery = g;
        this.currentIndex = 0;
        this.autoplayAudio = g.autoplayAudio || false;
        if (this.autoplayToggle) this.autoplayToggle.checked = this.autoplayAudio;
        this.showItem(0);
    }

    showItem(index) {
        if (!this.currentGallery || this.isTransitioning) return;
        const items = this.currentGallery.items;
        if (index < 0 || index >= items.length) return;
        
        this.stopAudio();
        this.isTransitioning = true;
        this.currentIndex = index;
        const item = items[index];
        
        setTimeout(() => {
            this.galleryContainer.innerHTML = '';
            
            if (item.type === 'description') {
                this.galleryContainer.innerHTML = `<div class="description-slide loaded"><div class="description-content"><h2>${item.title}</h2><p>${item.text}</p></div></div>`;
            } else if (item.type === 'video') {
                const url = item.platform === 'vimeo' ? `https://player.vimeo.com/video/${item.videoId}` : `https://www.youtube.com/embed/${item.videoId}`;
                this.galleryContainer.innerHTML = `<div class="video-container loaded"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
            } else {
                const wrapper = document.createElement('div');
                wrapper.className = 'image-wrapper';
                const img = document.createElement('img');
                img.className = 'gallery-image';
                img.onload = () => { img.classList.add('loaded'); this.isTransitioning = false; };
                img.src = encodeURI(item.src);
                wrapper.appendChild(img);
                
                if (item.tirage && item.tirageUrl) {
                    wrapper.innerHTML += `<a class="buy-button" href="${item.tirageUrl}" target="_blank">🛒 ${TRANSLATIONS[this.currentLang]['buy-print']}</a>`;
                }
                this.galleryContainer.appendChild(wrapper);
                
                if (item.audio && this.autoplayAudio) this.playAudio(item.audio);
            }
            
            this.updateUI(item);
            this.isTransitioning = false;
        }, 200);
    }

    updateUI(item) {
        if (this.galleryCounter) this.galleryCounter.textContent = `${this.currentIndex + 1} / ${this.currentGallery.items.length}`;
        if (this.imageCaption) this.imageCaption.textContent = item.caption || '';
        if (this.audioControls) this.audioControls.classList.toggle('visible', item.type === 'image' && !!item.audio);
    }

    prev() { if (this.currentGallery) this.showItem(this.currentIndex > 0 ? this.currentIndex - 1 : this.currentGallery.items.length - 1); }
    next() { if (this.currentGallery) this.showItem(this.currentIndex < this.currentGallery.items.length - 1 ? this.currentIndex + 1 : 0); }

    playAudio(src) {
        this.stopAudio();
        this.currentAudio = new Audio(encodeURI(src));
        this.currentAudio.play().catch(() => {});
        this.isPlaying = true;
        this.updateAudioBtn();
        this.currentAudio.onended = () => { this.isPlaying = false; this.updateAudioBtn(); };
    }
    stopAudio() { if (this.currentAudio) { this.currentAudio.pause(); this.currentAudio = null; } this.isPlaying = false; this.updateAudioBtn(); }
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
        if (this.galleryCounter) this.galleryCounter.style.display = 'none';
        if (this.audioControls) this.audioControls.classList.remove('visible');
        
        let html = `<div class="page-content"><div class="page-text">${page.content.replace(/\n/g, '<br>')}</div>`;
        if (page.price) html += `<div class="page-price">${page.price}</div>`;
        if (page.link) html += `<a class="page-btn" href="${page.link}" target="_blank">Réserver</a>`;
        html += '</div>';
        this.galleryContainer.innerHTML = html;
    }

    initSwipe() {
        let startX;
        this.galleryContainer?.addEventListener('touchstart', e => startX = e.touches[0].clientX);
        this.galleryContainer?.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new Portfolio());
