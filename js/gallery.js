/**
 * Bertrand Basset Portfolio — gallery.js
 * Généré par Admin V4 — 10/03/2026 15:11:31
 */

const SITE_CONFIG = {
    name:         "Bertrand Basset",
    email:        "bertrand.basset@gmail.com",
    defaultLang:  "en",
    showLanding:  true,
    landingImage: "images/landing/landing-01.jpg",
    social: {
        instagram: "https://www.instagram.com/bassetbertrand/",
        facebook:  "https://www.facebook.com/BertrandBassetPhotographie",
        linkedin:  "https://www.linkedin.com/in/bertrand-basset/"
    }
};

/* ─── UI TRANSLATIONS ──────────────────────────────────── */
const T = {
    en: {
        prev: "prev", next: "next", autoplay_btn: "⟳ auto",
        contact_btn: "Book a session", see_more: "See more",
        form_title: "Book a Session", form_label: "Session type",
        form_send: "Send", form_placeholder: "Your message (optional)…",
        mailto_prefix: "Session request", enter: "Enter",
        subtitle: "Photographer & Filmmaker"
    },
    fr: {
        prev: "préc", next: "suiv", autoplay_btn: "⟳ auto",
        contact_btn: "Prendre contact", see_more: "Voir plus",
        form_title: "Réserver une séance", form_label: "Type de séance",
        form_send: "Envoyer", form_placeholder: "Votre message (facultatif)…",
        mailto_prefix: "Demande de séance", enter: "Entrer",
        subtitle: "Photographe & Réalisateur"
    }
};

/* ─── MENU ──────────────────────────────────────────────────── */
const MENU_CONFIG = [
  {
    "id": "portrait",
    "name": "PORTRAIT",
    "type": "gallery",
    "galleryId": "portrait"
  },
  {
    "id": "conversation",
    "name": "CONVERSATION(S)",
    "type": "gallery",
    "galleryId": "conversation-s-",
    "hidden": true
  },
  {
    "id": "immersion",
    "name": "IMMERSION",
    "type": "gallery",
    "galleryId": "gem"
  },
  {
    "id": "infos",
    "name": "INFOS",
    "type": "page",
    "pageId": "infos"
  }
];

/* ─── PAGES CONFIG ───────────────────────────────────────────── */
const PAGES_CONFIG = {
  "infos": {
    "sections": [
      {
        "titleEn": "About",
        "titleFr": "À propos",
        "bodyEn": "Bertrand Basset\nPhotographer & Filmmaker.\n25 years of experience.\nCarantec. Brittany.",
        "bodyFr": "Bertrand Basset\nPhotographe & Réalisateur.\n25 ans d'expériences.\nCarantec. Bretagne.",
        "image": ""
      },
      {
        "titleEn": "Contact",
        "titleFr": "Contact",
        "bodyEn": "",
        "bodyFr": "",
        "image": "",
        "showContact": true
      }
    ]
  }
};

/* ─── GALLERIES CONFIG ────────────────────────────────────── */
const GALLERIES_CONFIG = {
    "accueil": {
        path: "images/accueil",
        autoplay: false,
        featured: [],
        images: [
            {"filename":"accueil-01.jpg","label":"Portrait","link_gallery":"portrait","caption":{"en":"","fr":""}}
        ]
    },

    "portrait": {
        path:          "images/portrait",
        autoplay:      true,
        autoplayDelay: 4,
        cta: { en: "Artist, artisan, executive, employee, self-employed professional — let's organise a portrait session.", fr: "Acteur, Artisan, Dirigeant, Artiste, profession libérale — organisons une séance portrait." },
        cartons: [
        {
                "cid": "cmmkol4ggo7b",
                "position": 8,
                "titleEn": "",
                "titleFr": "",
                "descEn": "Artist, artisan, executive, employee, self-employed professional — let's organise a portrait session.",
                "descFr": "Acteur, Artisan, Dirigeant, Artiste, profession libérale — organisons une séance portrait.",
                "credits": "",
                "ctaLabel": "",
                "ctaUrl": ""
        }
],
        captions: {"02.jpg":{"en":"","fr":"Jean-Philippe Davodeau\nActeur"}},
    },

    "conversation-s-": {
        path:          "images/conversation",
        autoplay:      true,
        autoplayDelay: 4,
        description: { en: "More than a photo — a conversation between you and me.\n\nIn the form of a documentary series or individual portrait, a conversation can take the shape of a photograph, a recorded interview or a memory film. Multiple approaches are possible depending on the project, the subject, the person.\n\nContact me to find out more.", fr: "Un peu plus qu'une photo, une rencontre, une conversation entre vous et moi.\n\nUne conversation, c'est d'abord une rencontre où on prend le temps, on discute, dans un lieu de votre choix, sans appareil photo. Puis, on reprend la conversation pour la séance photo, on cherche ensemble à capturer le fruit de notre rencontre. C'est une démarche qui rompt avec l'instanéité, une sorte d'éloge de la lenteur, parce que le résultat sera plus intemporelle, fruit d'une maturation.\n\nLe rendu peut-être photographique, sonore ou sous la forme d'entretien mémoire.\n\nContactez moi pour en savoir plus." },
        cartons: [
        {
                "cid": "cmmkol4ggyqr",
                "position": 0,
                "titleEn": "",
                "titleFr": "",
                "descEn": "More than a photo — a conversation between you and me.\n\nIn the form of a documentary series or individual portrait, a conversation can take the shape of a photograph, a recorded interview or a memory film. Multiple approaches are possible depending on the project, the subject, the person.\n\nContact me to find out more.",
                "descFr": "Un peu plus qu'une photo, une rencontre, une conversation entre vous et moi.\n\nUne conversation, c'est d'abord une rencontre où on prend le temps, on discute, dans un lieu de votre choix, sans appareil photo. Puis, on reprend la conversation pour la séance photo, on cherche ensemble à capturer le fruit de notre rencontre. C'est une démarche qui rompt avec l'instanéité, une sorte d'éloge de la lenteur, parce que le résultat sera plus intemporelle, fruit d'une maturation.\n\nLe rendu peut-être photographique, sonore ou sous la forme d'entretien mémoire.\n\nContactez moi pour en savoir plus.",
                "credits": "",
                "ctaLabel": "",
                "ctaUrl": ""
        }
],
        captions: {},
    },

    "studio": {
        path:          "images/immersion",
        autoplay:      false,
        autoplayDelay: 4,
        description: { en: "Immersion in a trade, documentary immersion — I blend into the landscape to tell through portraits a place, a craft, a moment of life.\n\nHere, I took a room for a week at St Melar, a unit of the Ephad de Lanmeur, for a photographic residency.", fr: "J'ai 45 ans, un peu de kilomètre et la maitrise d'un savoir faire, me fondre dans un lieu, un collectif, un évènement, et rendre compte avec une approche humaniste, c'est à dire qui met en avant les humains, leur interactions. Le portrait restant ma spécialité, j'aime raconter par les gueules, les instants, les petits couac.\n\nPar exemple, il y a un an, j'ai pris une chambre dans un Ephad pendant une semaine. St Melar, une unité de l'Ephad de Lanmeur, où j'ai pu bénéficier d'une résidence photographique pour faire de la recherche de forme, voici les 6 planches que j'ai livrée pour l'exposition à l'hopital." },
        cartons: [
        {
                "cid": "cmmkol4ggs5l",
                "position": 0,
                "titleEn": "",
                "titleFr": "",
                "descEn": "Immersion in a trade, documentary immersion — I blend into the landscape to tell through portraits a place, a craft, a moment of life.\n\nHere, I took a room for a week at St Melar, a unit of the Ephad de Lanmeur, for a photographic residency.",
                "descFr": "J'ai 45 ans, un peu de kilomètre et la maitrise d'un savoir faire, me fondre dans un lieu, un collectif, un évènement, et rendre compte avec une approche humaniste, c'est à dire qui met en avant les humains, leur interactions. Le portrait restant ma spécialité, j'aime raconter par les gueules, les instants, les petits couac.\n\nPar exemple, il y a un an, j'ai pris une chambre dans un Ephad pendant une semaine. St Melar, une unité de l'Ephad de Lanmeur, où j'ai pu bénéficier d'une résidence photographique pour faire de la recherche de forme, voici les 6 planches que j'ai livrée pour l'exposition à l'hopital.",
                "credits": "",
                "ctaLabel": "",
                "ctaUrl": ""
        }
],
        captions: {},
    },

    "cinema": {
        path:          "images/cinema",
        autoplay:      false,
        autoplayDelay: 4,
        hidden: true,
        images: [
            {"filename":"1.jpg"},
            {"filename":"2.jpg"},
            {"filename":"3.jpg"},
            {"filename":"4.jpg"},
            {"filename":"5.jpg"},
            {"filename":"6.jpg"},
            {"filename":"7.jpg"},
            {"filename":"8.jpg"},
            {"filename":"9.jpg"}
        ],
        captions: {}
    },

    "television": {
        path:          "images/Television",
        autoplay:      false,
        autoplayDelay: 4,
        hidden: true,
        images: [
            {"filename":"01.jpg"},
            {"filename":"02.jpg"},
            {"filename":"03.jpg"},
            {"filename":"04.jpg"},
            {"filename":"05.jpg"},
            {"filename":"06.jpg"},
            {"filename":"07.jpg"},
            {"filename":"08.jpg"},
            {"filename":"09.jpg"},
            {"filename":"10.jpg"}
        ],
        captions: {}
    },

    "gem": {
        path:          "images/gem",
        autoplay:      false,
        autoplayDelay: 4,
        autoplayAudio: true,
        description: { en: "Portrait series made at the GEM in Morlaix.\nEach portrait comes with an audio testimony.", fr: "Série de portraits réalisée au GEM de Morlaix.\nChaque portrait est accompagné d’un témoignage audio." },
        cartons: [
        {
                "cid": "cmmkol4gg639",
                "position": 0,
                "titleEn": "",
                "titleFr": "",
                "descEn": "Portrait series made at the GEM in Morlaix.\nEach portrait comes with an audio testimony.",
                "descFr": "Série de portraits réalisée au GEM de Morlaix.\nChaque portrait est accompagné d’un témoignage audio.",
                "credits": "",
                "ctaLabel": "",
                "ctaUrl": ""
        }
],
        images: [
            {"filename":"ALain.jpg","audio":"ALain.mp3"},
            {"filename":"Beatrice.jpg","audio":"Beatrice.mp3"},
            {"filename":"Bernard.jpg","audio":"Bernard.mp3"},
            {"filename":"Bruno.jpg"},
            {"filename":"GUY.jpg"},
            {"filename":"Helene.jpg","audio":"Helene.mp3"},
            {"filename":"Jean-Pierre.jpg"},
            {"filename":"JeanFrancois.jpg","audio":"JeanFrancois.mp3"},
            {"filename":"Laurence.jpg"},
            {"filename":"Patricia.jpg","audio":"Patricia.mp3"},
            {"filename":"Theo.jpg","audio":"Theo.mp3"},
            {"filename":"Veronique.jpg"},
            {"filename":"VALERIE.jpg","audio":"VALERIE.mp3"}
        ],
        captions: {}
    },

};

/* ─── AUTO-SCANNED IMAGE LISTS ──────────────────────────────────────── */
/* Défini dans js/gallery-images.js — exporté séparément par l'admin   */

/* ─── SVG ICONS ──────────────────────────────────────── */
const SVG = {
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    facebook:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    linkedin:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a6 6 0 0 1 2-2z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
};

/* ─── PAGE BUILDERS ──────────────────────────────────── */
function buildPage(pageId, lang) {
    const page = (typeof PAGES_CONFIG !== 'undefined') && PAGES_CONFIG[pageId];
    const en   = lang === 'en';
    const s    = SITE_CONFIG.social;
    const email = SITE_CONFIG.email || 'bertrand.basset@gmail.com';
    if (!page || !page.sections?.length) return '';
    const sections = page.sections.map(sec => {
        const title = en ? (sec.titleEn || sec.titleFr || '') : (sec.titleFr || sec.titleEn || '');
        const body  = en ? (sec.bodyEn  || sec.bodyFr  || '') : (sec.bodyFr  || sec.bodyEn  || '');
        let html = '<div class="page-section">';
        if (title) html += `<h2>${title}</h2>`;
        if (sec.image) html += `<img src="${sec.image}" alt="" style="max-width:100%;margin-bottom:1rem;display:block;">`;
        if (body) {
            const paras = body.split(/\n\n+/).map(p => `<p>${p.replace(/\n/g,'<br>')}</p>`).join('');
            html += paras;
        }
        if (sec.showContact) {
            html += `<p><a href="mailto:${email}">${email}</a></p>
                <div class="social-links">
                    <a href="${s.instagram}" target="_blank" class="social-icon" title="Instagram">${SVG.instagram}</a>
                    <a href="${s.facebook}"  target="_blank" class="social-icon" title="Facebook">${SVG.facebook}</a>
                    <a href="${s.linkedin}"  target="_blank" class="social-icon" title="LinkedIn">${SVG.linkedin}</a>
                </div>`;
        }
        html += '</div>';
        return html;
    }).join('');
    return `<div class="page-text">${sections}</div>`;
}
function buildInfosPage(lang) { return buildPage('infos', lang); }

function buildContactPage(lang) {
    const t  = T[lang];
    const en = lang === 'en';
    return `
        <div class="page-text">
            <div class="page-section">
                <h2>${t.form_title}</h2>
                <form class="contact-form" onsubmit="portfolio.submitContact(event)">
                    <div class="form-group">
                        <label class="form-label">${t.form_label}</label>
                        <select id="contactType" class="form-select">
                            <option value="${en ? 'Portrait session' : 'S\u00E9ance portrait'}">Portrait</option>
                            <option value="${en ? 'Conversation session' : 'S\u00E9ance conversation'}">Conversation</option>
                            <option value="${en ? 'Immersion session' : 'S\u00E9ance immersion'}">Immersion</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea id="contactMessage" class="form-textarea" placeholder="${t.form_placeholder}" rows="4"></textarea>
                    </div>
                    <button type="submit" class="form-submit">${t.form_send}</button>
                </form>
            </div>
        </div>`;
}

/* ─── PORTFOLIO CLASS ────────────────────────────────── */
class Portfolio {
    constructor() {
        this.currentLang      = 'en';
        this.galleries        = this.buildGalleries();
        this.currentGallery   = null;
        this.currentGalleryId = null;
        this.currentPageId    = null;
        this.currentIndex     = 0;
        this.slideshowTimer   = null;
        this.autoplaying      = true;
        this.SLIDESHOW_MS     = 3000;
        this.currentAudio     = null;
        this.gridMode         = false;
        this.init();
    }

    buildGalleries() {
        const galleries = {};
        for (const [id, config] of Object.entries(GALLERIES_CONFIG)) {
            const items = [];
            if (config.featured) {
                config.featured.forEach(f => items.push({ type: 'featured', ...f }));
            }

            /* Legacy description carton (front) */
            if (config.description) {
                items.push({ type: 'description', configId: id });
            }

            const imgs = (typeof GALLERY_IMAGES !== 'undefined' && GALLERY_IMAGES[id])
                ? GALLERY_IMAGES[id]
                : (config.images || []);

            /* Cartons sorted by position for interleaving */
            const cartons = (config.cartons || []).slice().sort((a,b) => a.position - b.position);
            let ci = 0;

            /* Insert cartons at position 0 (before all images) */
            while (ci < cartons.length && cartons[ci].position === 0) {
                items.push({ type: 'carton', ...cartons[ci] });
                ci++;
            }

            imgs.forEach((img, imgIdx) => {
                const type    = img.link_gallery ? 'accueil-image' : 'image';
                const caption = img.caption || (config.captions?.[img.filename]) || null;
                const button  = img.button  || (config.buttons?.[img.filename])  || null;
                items.push({ type, src: `${config.path}/${img.filename}`, caption, button, ...img });

                /* Insert cartons positioned after this image (position = imgIdx+1) */
                while (ci < cartons.length && cartons[ci].position === imgIdx + 1) {
                    items.push({ type: 'carton', ...cartons[ci] });
                    ci++;
                }
            });

            /* Any remaining cartons past the last image */
            while (ci < cartons.length) {
                items.push({ type: 'carton', ...cartons[ci] });
                ci++;
            }

            /* Legacy CTA carton (back) */
            if (config.cta) {
                items.push({ type: 'cta', configId: id });
            }

            galleries[id] = { ...config, items, configId: id };
        }
        return galleries;
    }

    t(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[this.currentLang] || obj.en || obj.fr || '';
    }

    init() {
        this.currentLang = SITE_CONFIG.defaultLang || 'en';
        const landingImg = document.querySelector('.landing-image img');
        if (landingImg && SITE_CONFIG.landingImage) landingImg.src = SITE_CONFIG.landingImage;
        if (SITE_CONFIG.showLanding === false) {
            document.getElementById('landing')?.classList.add('hidden');
            document.getElementById('site')?.classList.add('active');
        }
        this.buildMenu();
        this.bindEvents();
        this.initCursor();
        this.applyLangUI(this.currentLang);
        if (SITE_CONFIG.showLanding === false) this.openHomeGallery();
    }

    buildMenu() {
        const nav = document.getElementById('mainNav');
        if (!nav) return;
        const items = MENU_CONFIG.filter(i => !i.hidden);
        let html = '';
        let openGroupId = null;
        const itemHtml = (item) => {
            const cls = item.parent ? 'nav-item nav-sub-item' : 'nav-item';
            if (item.type === 'gallery')  return `<div class="${cls}"><a href="#" class="nav-link" data-gallery="${item.galleryId}">${item.name}</a></div>`;
            if (item.type === 'page')     return `<div class="${cls}"><a href="#" class="nav-link" data-page="${item.pageId}">${item.name}</a></div>`;
            if (item.type === 'external') return `<div class="${cls}"><a href="${item.url}" class="nav-link" target="_blank">${item.name}</a></div>`;
            return '';
        };
        for (const item of items) {
            if (item.type === 'group') {
                if (openGroupId !== null) html += '</div></div>';
                html += `<div class="nav-group"><div class="nav-group-header">${item.name}</div><div class="nav-group-children">`;
                openGroupId = item.id;
            } else {
                if (openGroupId !== null && !item.parent) { html += '</div></div>'; openGroupId = null; }
                html += itemHtml(item);
            }
        }
        if (openGroupId !== null) html += '</div></div>';
        nav.innerHTML = html;
    }

    bindEvents() {
        document.getElementById('enterBtn')?.addEventListener('click', () => this.enterSite());
        document.getElementById('homeLink')?.addEventListener('click', e => {
            e.preventDefault();
            this.openHomeGallery();
            this.setActiveLink(null);
            this.closeMenu();
        });
        document.getElementById('menuToggle')?.addEventListener('click', () => this.toggleMenu());
        document.getElementById('prevBtn')?.addEventListener('click',  e => { e.preventDefault(); this.prev(); });
        document.getElementById('nextBtn')?.addEventListener('click',  e => { e.preventDefault(); this.next(); });
        document.getElementById('autoplayToggle')?.addEventListener('click', () => this.toggleAutoplay());
        document.getElementById('gridToggle')?.addEventListener('click', () => this.toggleGridMode());
        document.querySelectorAll('[data-lang]').forEach(el => {
            el.addEventListener('click', e => { e.preventDefault(); this.setLang(el.dataset.lang); });
        });
        document.querySelectorAll('[data-gallery]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                this.openGallery(link.dataset.gallery);
                this.setActiveLink(link);
                this.closeMenu();
            });
        });
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                this.showPage(link.dataset.page);
                this.setActiveLink(link);
                this.closeMenu();
            });
        });
        document.getElementById('galleryContainer')?.addEventListener('click', e => {
            if (e.target.closest('a,button,select,textarea,form')) return;
            const rect = e.currentTarget.getBoundingClientRect();
            (e.clientX - rect.left) < rect.width / 2 ? this.prev() : this.next();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft')  this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        /* Touch swipe for mobile */
        const gcEl = document.getElementById('galleryContainer');
        if (gcEl) {
            let _tx = 0;
            gcEl.addEventListener('touchstart', e => { _tx = e.touches[0].clientX; }, { passive: true });
            gcEl.addEventListener('touchend', e => {
                const dx = e.changedTouches[0].clientX - _tx;
                if (Math.abs(dx) > 40) { dx < 0 ? this.next() : this.prev(); }
            }, { passive: true });
        }
    }

    setLang(lang) {
        if (!T[lang]) return;
        this.currentLang = lang;
        document.documentElement.lang = lang;
        this.applyLangUI(lang);
        if (this.currentGalleryId) {
            const idx = this.currentIndex;
            this.openGallery(this.currentGalleryId);
            this.currentIndex = Math.min(idx, this.currentGallery.items.length - 1);
            this.showItem(this.currentIndex);
        } else if (this.currentPageId) {
            this.showPage(this.currentPageId);
        }
    }

    applyLangUI(lang) {
        const t = T[lang];
        document.querySelectorAll('[data-lang]').forEach(el => {
            el.classList.toggle('active', el.dataset.lang === lang);
        });
        const ids = { prevBtn: t.prev, nextBtn: t.next, enterBtn: t.enter };
        for (const [id, text] of Object.entries(ids)) {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        }
        const autoBtn = document.getElementById('autoplayToggle');
        if (autoBtn) autoBtn.textContent = t.autoplay_btn;
        const subtitle = document.querySelector('.brand-subtitle');
        if (subtitle) subtitle.textContent = t.subtitle;
    }

    toggleMenu() {
        document.getElementById('menuToggle')?.classList.toggle('open');
        document.getElementById('mainNav')?.classList.toggle('open');
    }
    closeMenu() {
        document.getElementById('menuToggle')?.classList.remove('open');
        document.getElementById('mainNav')?.classList.remove('open');
    }
    setActiveLink(el) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (el) el.classList.add('active');
    }

    enterSite() {
        document.getElementById('landing')?.classList.add('hidden');
        document.getElementById('site')?.classList.add('active');
        this.openHomeGallery();
    }

    openHomeGallery() {
        const acc = this.galleries['accueil'];
        this.openGallery(acc?.items?.length ? 'accueil' : 'portrait');
    }

    toggleAutoplay() {
        this.autoplaying = !this.autoplaying;
        document.getElementById('autoplayToggle')?.classList.toggle('active', this.autoplaying);
        if (this.autoplaying && this.currentGallery?.autoplay) {
            this.startSlideshow();
        } else {
            this.stopSlideshow();
        }
    }

    openGallery(id) {
        const g = this.galleries[id];
        if (!g?.items?.length) return;
        this.currentGallery   = g;
        this.currentGalleryId = id;
        this.currentPageId    = null;
        this.currentIndex     = 0;
        this.stopSlideshow();
        this.stopAudio();
        this.gridMode = false;
        document.getElementById('galleryContainer')?.classList.remove('page-mode', 'grid-mode');
        document.getElementById('gridToggle')?.classList.remove('active');
        document.getElementById('site')?.classList.remove('grid-active');
        this.showItem(0);
        if (g.autoplay && this.autoplaying) this.startSlideshow();
    }

    openGalleryFromAccueil(galleryId) {
        this.openGallery(galleryId);
        const navLink = document.querySelector(`[data-gallery="${galleryId}"]`);
        this.setActiveLink(navLink || null);
    }

    showImageInfo(caption, button) {
        /* Use #footerCaption (new layout) or fall back to #galleryDesc (old layout) */
        const el = document.getElementById('footerCaption') || document.getElementById('galleryDesc');
        if (!el) return;
        let html = '';
        if (caption) {
            const text = typeof caption === 'string'
                ? caption
                : (caption[this.currentLang] || caption.en || caption.fr || '');
            if (text) {
                const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
                const name  = lines[0] || '';
                const desc  = lines.slice(1).join('\n');
                html += `<div class="gallery-caption-block">`;
                if (name) html += `<p class="gallery-caption-name">${name}</p>`;
                if (desc) html += `<p class="gallery-caption-desc">${desc.replace(/\n/g, '<br>')}</p>`;
                html += `</div>`;
            }
        }
        if (button?.url) {
            const label = button.label || 'En savoir plus';
            html += `<a href="${button.url}" target="_blank" class="gallery-desc-btn">${label} \u2192</a>`;
        }
        el.innerHTML = html;
    }

    showCaption(caption) { this.showImageInfo(caption, null); }

    showItem(index) {
        if (!this.currentGallery) return;
        const items = this.currentGallery.items;
        if (index < 0 || index >= items.length) return;

        this.currentIndex = index;
        const item        = items[index];
        const container   = document.getElementById('galleryContainer');
        const galleryDesc = document.getElementById('galleryDesc');
        const footerCap   = document.getElementById('footerCaption');
        const lang        = this.currentLang;

        // Always clear footer caption first (showImageInfo fills it for image types)
        if (footerCap) footerCap.innerHTML = '';

        if (item.type === 'image' || item.type === 'accueil-image') {
            // For images: clear the sidebar desc (caption goes to footerCaption)
            if (galleryDesc) galleryDesc.innerHTML = '';
        } else {
            this.stopSlideshow();
            this.stopAudio();
        }

        if (item.type === 'featured') {
            const text      = this.t(item.text);
            const seeMore   = T[lang].see_more;
            const galleryId = item.link_gallery;
            const eyebrow   = galleryId === 'cinema' ? (lang === 'fr' ? 'Cin\u00E9ma' : 'Cinema') : '';
            if (galleryDesc) {
                galleryDesc.innerHTML = `
                    <div class="sidebar-featured">
                        ${eyebrow ? `<p class="sidebar-featured-eyebrow">${eyebrow}</p>` : ''}
                        <h2 class="sidebar-featured-title">${item.title}</h2>
                        <p class="sidebar-featured-text">${text}</p>
                        ${galleryId ? `<button class="sidebar-featured-btn" onclick="portfolio.openGalleryFromAccueil('${galleryId}')">${seeMore} \u2192</button>` : ''}
                    </div>`;
            }
            const accueilG = this.galleries['accueil'];
            const matchImg = accueilG?.items.find(i => i.type === 'accueil-image' && i.link_gallery === galleryId);
            if (matchImg) {
                const img = new Image();
                img.className = 'gallery-image';
                img.alt = matchImg.label || '';
                img.onload = () => {
                    container.innerHTML = '';
                    const wrapper = document.createElement('div');
                    wrapper.className = 'image-wrapper';
                    wrapper.appendChild(img);
                    container.appendChild(wrapper);
                    requestAnimationFrame(() => img.classList.add('loaded'));
                };
                img.onerror = () => { container.innerHTML = '<div class="img-missing-placeholder">🖼</div>'; };
                container.innerHTML = '';
                img.src = encodeURI(matchImg.src);
            } else {
                container.innerHTML = '<div class="featured-blank loaded"></div>';
            }

        } else if (item.type === 'description') {
            if (galleryDesc) galleryDesc.innerHTML = '';
            const text = this.t(GALLERIES_CONFIG[item.configId].description);
            container.innerHTML = `
                <div class="description-slide loaded">
                    <div class="description-content">
                        <p class="description-text">${text.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>`;

        } else if (item.type === 'cta') {
            if (galleryDesc) galleryDesc.innerHTML = '';
            const text    = this.t(GALLERIES_CONFIG[item.configId].cta);
            const btnText = T[lang].contact_btn;
            container.innerHTML = `
                <div class="cta-slide loaded">
                    <div class="cta-content">
                        <p class="cta-text">${text}</p>
                        <button class="cta-btn" onclick="portfolio.showContactPage()">
                            ${btnText}
                        </button>
                    </div>
                </div>`;

        } else if (item.type === 'carton') {
            const en         = lang === 'en';
            const title      = en ? (item.titleEn    || item.titleFr    || '') : (item.titleFr    || item.titleEn    || '');
            const category   = en ? (item.categoryEn || item.categoryFr || '') : (item.categoryFr || item.categoryEn || '');
            const sidebarTxt = en ? (item.sidebarEn  || item.sidebarFr  || '') : (item.sidebarFr  || item.sidebarEn  || '');
            const desc       = en ? (item.descEn     || item.descFr     || '') : (item.descFr     || item.descEn     || '');
            const credits    = item.credits  || '';
            const ctaUrl     = item.ctaUrl   || '';
            const ctaLbl     = item.ctaLabel || (en ? 'See more' : 'En savoir plus');

            /* ── SIDEBAR: catégorie + titre + texte sidebar dédié + lien ── */
            /* La description longue (desc) n'apparaît PAS ici, seulement dans le carton central */
            if (galleryDesc) {
                const ctaLink = ctaUrl
                    ? `<a href="${ctaUrl}" target="_blank" rel="noopener" class="sidebar-carton-link">${ctaLbl} \u2192</a>`
                    : '';
                galleryDesc.innerHTML = `
                    <div class="sidebar-carton">
                        ${category   ? `<div class="sidebar-carton-category">${category}</div>` : ''}
                        ${title      ? `<h2 class="sidebar-carton-title">${title}</h2>` : ''}
                        ${sidebarTxt ? `<p class="sidebar-carton-desc">${sidebarTxt.replace(/\n/g,'<br>')}</p>` : ''}
                        ${ctaLink}
                    </div>`;
            }

            /* ── CARTON CENTRAL: titre + description complète + crédits ── */
            const ctaBtn = ctaUrl
                ? `<a href="${ctaUrl}" target="_blank" rel="noopener" class="carton-cta-btn">${ctaLbl} \u2192</a>`
                : '';
            container.innerHTML = `
                <div class="carton-slide loaded">
                    <div class="carton-slide-inner">
                        ${title   ? `<h2 class="carton-slide-title">${title}</h2>` : ''}
                        ${desc    ? `<p class="carton-slide-desc">${desc.replace(/\n/g,'<br>')}</p>` : ''}
                        ${credits ? `<div class="carton-slide-credits">${credits}</div>` : ''}
                        ${ctaBtn}
                    </div>
                </div>`;

        } else if (item.type === 'accueil-image') {
            this.showImageInfo(item.caption, item.button);
            const linkGallery = item.link_gallery;
            const img = new Image();
            img.className = 'gallery-image';
            img.alt = item.label || '';
            img.onload = () => {
                container.innerHTML = '';
                const wrapper = document.createElement('div');
                wrapper.className = 'image-wrapper accueil-wrapper';
                wrapper.appendChild(img);
                if (item.label || linkGallery) {
                    const overlay = document.createElement('div');
                    overlay.className = 'accueil-overlay';
                    if (linkGallery) {
                        /* Entire overlay is clickable — label acts as the CTA */
                        overlay.style.cursor = 'pointer';
                        overlay.addEventListener('click', e => {
                            e.stopPropagation();
                            this.openGalleryFromAccueil(linkGallery);
                        });
                    }
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'accueil-gallery-name';
                    nameSpan.textContent = item.label || '';
                    overlay.appendChild(nameSpan);
                    if (linkGallery) {
                        /* Arrow indicator — purely visual, click handled by overlay */
                        const arrow = document.createElement('span');
                        arrow.className = 'accueil-link';
                        arrow.textContent = '\u2192';
                        overlay.appendChild(arrow);
                    }
                    wrapper.appendChild(overlay);
                }
                container.appendChild(wrapper);
                requestAnimationFrame(() => img.classList.add('loaded'));
            };
            img.onerror = () => { container.innerHTML = '<div class="img-missing-placeholder">🖼</div>'; };
            container.innerHTML = '';
            img.src = encodeURI(item.src);

        } else {
            this.stopAudio();
            this.showImageInfo(item.caption, item.button);
            if (item.audio && this.currentGallery?.autoplayAudio) {
                const audioSrc = item.audio.startsWith('images/')
                    ? item.audio
                    : `${this.currentGallery.path}/${item.audio}`;
                this.playAudio(audioSrc);
            }
            const img = new Image();
            img.className = 'gallery-image';
            img.alt = '';
            img.onload = () => {
                container.innerHTML = '';
                const wrapper = document.createElement('div');
                wrapper.className = 'image-wrapper';
                wrapper.appendChild(img);
                container.appendChild(wrapper);
                requestAnimationFrame(() => img.classList.add('loaded'));
            };
            img.onerror = () => { container.innerHTML = '<div class="img-missing-placeholder">🖼</div>'; };
            container.innerHTML = '';
            img.src = encodeURI(item.src);
        }

        const counter = document.querySelector('.gallery-counter');
        if (counter) counter.textContent = `${index + 1} / ${items.length}`;
    }

    prev() {
        if (!this.currentGallery) return;
        const items    = this.currentGallery.items;
        const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : items.length - 1;
        this.stopSlideshow();
        this.showItem(newIndex);
        const isImage = items[newIndex].type === 'image' || items[newIndex].type === 'accueil-image';
        if (isImage && this.currentGallery.autoplay && this.autoplaying) this.startSlideshow();
    }

    next() {
        if (!this.currentGallery) return;
        const items    = this.currentGallery.items;
        const newIndex = this.currentIndex < items.length - 1 ? this.currentIndex + 1 : 0;
        this.stopSlideshow();
        this.showItem(newIndex);
        const isImage = items[newIndex].type === 'image' || items[newIndex].type === 'accueil-image';
        if (isImage && this.currentGallery.autoplay && this.autoplaying) this.startSlideshow();
    }

    startSlideshow() {
        this.stopSlideshow();
        const ms = ((this.currentGallery?.autoplayDelay) || 4) * 1000;
        this.slideshowTimer = setInterval(() => {
            if (!this.currentGallery) return;
            const items = this.currentGallery.items;
            const next  = this.currentIndex < items.length - 1 ? this.currentIndex + 1 : 0;
            this.showItem(next);
        }, ms);
    }

    stopSlideshow() {
        if (this.slideshowTimer) { clearInterval(this.slideshowTimer); this.slideshowTimer = null; }
    }

    /* ── GRID MODE ─────────────────────────────────────── */
    toggleGridMode() {
        this.gridMode = !this.gridMode;
        const container = document.getElementById('galleryContainer');
        const btn  = document.getElementById('gridToggle');
        const site = document.getElementById('site');
        if (this.gridMode) {
            container?.classList.add('grid-mode');
            btn?.classList.add('active');
            site?.classList.add('grid-active');
            this.stopAudio();
            this.renderGrid();
        } else {
            container?.classList.remove('grid-mode');
            btn?.classList.remove('active');
            site?.classList.remove('grid-active');
            this.showItem(this.currentIndex);
        }
    }

    renderGrid() {
        if (!this.currentGallery) return;
        const container = document.getElementById('galleryContainer');
        if (!container) return;
        const allItems = this.currentGallery.items;
        const thumbs = allItems
            .map((item, globalIdx) => ({ item, globalIdx }))
            .filter(({ item }) => item.type === 'image' || item.type === 'accueil-image');
        container.innerHTML = thumbs.map(({ item, globalIdx }) =>
            `<div class="grid-thumb" onclick="portfolio.selectFromGrid(${globalIdx})">
                <img src="${encodeURI(item.src)}" alt="" loading="lazy">
            </div>`).join('');
    }

    selectFromGrid(index) {
        this.gridMode = false;
        document.getElementById('galleryContainer')?.classList.remove('grid-mode');
        document.getElementById('gridToggle')?.classList.remove('active');
        document.getElementById('site')?.classList.remove('grid-active');
        this.showItem(index);
    }

    /* ── AUDIO PLAYER ──────────────────────────────────── */
    stopAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.src = '';
            this.currentAudio = null;
        }
        const zone = document.getElementById('audioPlayerZone');
        if (zone) zone.innerHTML = '';
    }

    playAudio(src) {
        this.stopAudio();
        const audio = new Audio(src);
        this.currentAudio = audio;
        const zone = document.getElementById('audioPlayerZone');
        if (!zone) return;
        const playerDiv = document.createElement('div');
        playerDiv.id = 'audioPlayer';
        playerDiv.className = 'audio-player';
        playerDiv.innerHTML = `
            <button class="audio-play-btn" id="audioPlayBtn" onclick="portfolio.toggleAudio()">&#9654;</button>
            <div class="audio-progress-track" id="audioTrack" onclick="portfolio.seekAudio(event)">
                <div class="audio-progress-fill" id="audioFill"></div>
            </div>
            <span class="audio-time" id="audioTime">0:00</span>`;
        zone.appendChild(playerDiv);
        audio.addEventListener('timeupdate', () => {
            const fill = document.getElementById('audioFill');
            const time = document.getElementById('audioTime');
            if (fill && audio.duration) fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
            if (time) time.textContent = this.fmtTime(audio.currentTime);
        });
        audio.addEventListener('play',  () => { const b = document.getElementById('audioPlayBtn'); if (b) b.innerHTML = '&#9646;&#9646;'; });
        audio.addEventListener('pause', () => { const b = document.getElementById('audioPlayBtn'); if (b) b.innerHTML = '&#9654;'; });
        audio.addEventListener('ended', () => { const b = document.getElementById('audioPlayBtn'); if (b) b.innerHTML = '&#9654;'; });
        audio.play().catch(() => {});
    }

    toggleAudio() {
        if (!this.currentAudio) return;
        if (this.currentAudio.paused) this.currentAudio.play().catch(() => {});
        else this.currentAudio.pause();
    }

    seekAudio(e) {
        if (!this.currentAudio || !this.currentAudio.duration) return;
        const track = document.getElementById('audioTrack');
        if (!track) return;
        const rect = track.getBoundingClientRect();
        this.currentAudio.currentTime = ((e.clientX - rect.left) / rect.width) * this.currentAudio.duration;
    }

    fmtTime(s) {
        return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
    }

    showPage(id) {
        this.currentGallery   = null;
        this.currentGalleryId = null;
        this.currentPageId    = id;
        this.stopSlideshow();
        const container = document.getElementById('galleryContainer');
        container.classList.add('page-mode');
        let html = '';
        if (id === 'infos')   html = buildInfosPage(this.currentLang);
        if (id === 'contact') html = buildContactPage(this.currentLang);
        container.innerHTML = `<div class="page-content">${html}</div>`;
        const counter = document.querySelector('.gallery-counter');
        if (counter) counter.textContent = '';
        const descEl = document.getElementById('galleryDesc');
        if (descEl) descEl.innerHTML = '';
        const footerCap = document.getElementById('footerCaption');
        if (footerCap) footerCap.innerHTML = '';
        this.stopAudio();
    }

    showContactPage() {
        this.showPage('contact');
        this.setActiveLink(null);
    }

    submitContact(e) {
        if (e) e.preventDefault();
        const type    = document.getElementById('contactType')?.value   || 'Portrait';
        const message = document.getElementById('contactMessage')?.value || '';
        const t       = T[this.currentLang];
        window.location.href = `mailto:bertrand.basset@gmail.com?subject=${encodeURIComponent(`${t.mailto_prefix} \u2014 ${type}`)}&body=${encodeURIComponent(message)}`;
    }

    initCursor() {
        const cursor    = document.getElementById('customCursor');
        const container = document.getElementById('galleryContainer');
        if (!cursor || !container) return;
        container.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top  = e.clientY + 'px';
            cursor.classList.add('visible');
            const rect = container.getBoundingClientRect();
            cursor.classList.toggle('left', e.clientX - rect.left < rect.width / 2);
        });
        container.addEventListener('mouseleave', () => cursor.classList.remove('visible'));
    }
}

document.addEventListener('DOMContentLoaded', () => window.portfolio = new Portfolio());
