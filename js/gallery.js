/**
 * Bertrand Basset Portfolio — gallery.js
 * Généré par Admin V4 — 22/04/2026 08:26:06
 */

const SITE_CONFIG = {
    name:           "Bertrand Basset",
    email:          "bertrand.basset@gmail.com",
    defaultLang:    "fr",
    showLanding:    true,
    landingImage:   "images/accueil/accueil-01.jpg",
    defaultGallery: "dustin-kolor",
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
    "id": "dustin-kolor-link",
    "name": "DUST'IN KOLOR",
    "type": "gallery",
    "galleryId": "dustin-kolor"
  },
  {
    "id": "item-1773174917949",
    "name": "METIER",
    "type": "gallery",
    "galleryId": "studio",
    "parent": "group-1773174817135",
    "hidden": true
  },
  {
    "id": "item-1773178057178",
    "name": "PORTRAIT",
    "type": "gallery",
    "galleryId": "portrait"
  },
  {
    "id": "item-1773174948772",
    "name": "SERIE",
    "type": "gallery",
    "galleryId": "gem",
    "parent": "group-1773174817135",
    "hidden": true
  },
  {
    "id": "item-1773174901597",
    "name": "STUDIO",
    "type": "gallery",
    "galleryId": "studio",
    "parent": "group-1773174817135",
    "hidden": true
  },
  {
    "id": "portrait",
    "name": "ACTEUR",
    "type": "gallery",
    "galleryId": "portrait",
    "parent": "group-1773174817135",
    "hidden": true
  },
  {
    "id": "immersion",
    "name": "SERIE",
    "type": "group",
    "galleryId": "gem"
  },
  {
    "id": "st-melar",
    "name": "ST MELAR",
    "type": "gallery",
    "galleryId": "st-melar",
    "parent": "immersion"
  },
  {
    "id": "item-1773178125975",
    "name": "LE GEM S'ENDIMANCHE",
    "type": "gallery",
    "galleryId": "gem",
    "parent": "immersion"
  },
  {
    "id": "item-1773158098062",
    "name": "Burning Man",
    "type": "gallery",
    "galleryId": "portrait",
    "parent": "immersion",
    "hidden": true
  },
  {
    "id": "item-1773158051230",
    "name": "Carré d'AS",
    "type": "gallery",
    "galleryId": "portrait",
    "parent": "group-1773157969699",
    "hidden": true
  },
  {
    "id": "group-1773158227466",
    "name": "FILM",
    "type": "group"
  },
  {
    "id": "item-1773158247053",
    "name": "CINEMA",
    "type": "gallery",
    "galleryId": "cinema",
    "parent": "group-1773158227466"
  },
  {
    "id": "item-1773174967818",
    "name": "TELEVISION",
    "type": "gallery",
    "galleryId": "television",
    "parent": "group-1773158227466"
  },
  {
    "id": "item-1773175848292",
    "name": "ARCHIVES",
    "type": "gallery",
    "galleryId": "television",
    "hidden": true
  },
  {
    "id": "infos",
    "name": "INFOS",
    "type": "page",
    "pageId": "infos"
  },
  {
    "id": "archives",
    "name": "ARCHIVES",
    "type": "gallery",
    "galleryId": "archives",
    "hidden": true
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
        cartons: [
        {
                "cid": "cmmkol4ggo7b",
                "position": 8,
                "titleFr": "",
                "titleEn": "",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "Acteur, Artisan, Dirigeant, Artiste, profession libérale, série.",
                "descEn": "Artist, artisan, executive, employee, self-employed professional — let's organise a portrait session.",
                "ctaLabel": "Reserver votre portrait",
                "ctaUrl": "",
                "categoryFr": "",
                "categoryEn": "",
                "sidebarFr": "",
                "sidebarEn": ""
        }
],
        captions: {"02.jpg":{"en":"","fr":"Jean-Philippe Davodeau\nActeur"},"conversation-02.jpg":{"en":"","fr":"Antoine Asnar\nActeur"},"Imane02@bertrandbasset 2.jpg":{"en":"","fr":"Imene\nActrice"},"JF.jpg":{"en":"","fr":"Jean-François\nSerie GEM"},"L1020630.jpg":{"en":"","fr":"Patrick Ewen\nConteur"},"portrait-02.jpg":{"en":"","fr":"Ange-Marine Chénevat\nActrice"},"L1060508.jpg":{"en":"","fr":"Ange-Marine Chénevat\nActrice"},"Atelier_Plougasnou.jpg":{"en":"","fr":"Cuisinier "}},
    },

    "conversation-s-": {
        path:          "images/conversation",
        autoplay:      true,
        autoplayDelay: 4,
        cartons: [
        {
                "cid": "cmmkol4ggyqr",
                "position": 0,
                "titleFr": "",
                "titleEn": "",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "Un peu plus qu'une photo, une rencontre, une conversation entre vous et moi.\n\nUne conversation, c'est d'abord une rencontre où on prend le temps, on discute, dans un lieu de votre choix, sans appareil photo. Puis, on reprend la conversation pour la séance photo, on cherche ensemble à capturer le fruit de notre rencontre. C'est une démarche qui rompt avec l'instanéité, une sorte d'éloge de la lenteur, parce que le résultat sera plus intemporelle, fruit d'une maturation.\n\nLe rendu peut-être photographique, sonore ou sous la forme d'entretien mémoire.\n\nContactez moi pour en savoir plus.",
                "descEn": "More than a photo — a conversation between you and me.\n\nIn the form of a documentary series or individual portrait, a conversation can take the shape of a photograph, a recorded interview or a memory film. Multiple approaches are possible depending on the project, the subject, the person.\n\nContact me to find out more.",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "",
                "categoryEn": "",
                "sidebarFr": "",
                "sidebarEn": ""
        }
],
        captions: {},
    },

    "studio": {
        path:          "images/immersion",
        autoplay:      false,
        autoplayDelay: 4,
        cartons: [
        {
                "cid": "cmmkol4ggs5l",
                "position": 0,
                "titleFr": "",
                "titleEn": "",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "J'ai 45 ans, un peu de kilomètre et la maitrise d'un savoir faire, me fondre dans un lieu, un collectif, un évènement, et rendre compte avec une approche humaniste, c'est à dire qui met en avant les humains, leur interactions. Le portrait restant ma spécialité, j'aime raconter par les gueules, les instants, les petits couac.\n\nPar exemple, il y a un an, j'ai pris une chambre dans un Ephad pendant une semaine. St Melar, une unité de l'Ephad de Lanmeur, où j'ai pu bénéficier d'une résidence photographique pour faire de la recherche de forme, voici les 6 planches que j'ai livrée pour l'exposition à l'hopital.",
                "descEn": "Immersion in a trade, documentary immersion — I blend into the landscape to tell through portraits a place, a craft, a moment of life.\n\nHere, I took a room for a week at St Melar, a unit of the Ephad de Lanmeur, for a photographic residency.",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "",
                "categoryEn": "",
                "sidebarFr": "",
                "sidebarEn": ""
        }
],
        captions: {},
    },

    "cinema": {
        path:          "images/cinema",
        autoplay:      false,
        autoplayDelay: 4,
        hidden: true,
        cartons: [
        {
                "cid": "cmmkspnzpiaa",
                "position": 0,
                "titleFr": "J'arrive",
                "titleEn": "",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "Court métrage de 13 minutes\nProduit par Respiro Production\n+ de 40 selections et 20 prix\nRhodes Island, Los Angeles, Clermont-Ferrand, Arles...",
                "descEn": "",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "",
                "categoryEn": "",
                "sidebarFr": "",
                "sidebarEn": ""
        }
],
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
        cartons: [
        {
                "cid": "cmmkyiyviovc",
                "position": 0,
                "titleFr": "Réalisateur - France 2",
                "titleEn": "",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "Réalisation de portraits d'invités pour 20H30 le dimanche, de portrait reportage pour 13H15 le samedi ou de documentaire historique pour 13H15 le dimanche. ",
                "descEn": "",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "",
                "categoryEn": "",
                "sidebarFr": "",
                "sidebarEn": ""
        }
],
        images: [
            {"filename":"01.jpg","title":"Jean Rochefort","caption":{"en":"","fr":"Jean Rochefort"}},
            {"filename":"02.jpg","caption":{"en":"","fr":"Léon Gautier\nLes hommes du Commando Kieffer\n40 minutes"}},
            {"filename":"03.jpg","caption":{"en":"","fr":"Jean Claude Drouot\nL'arrivée de la télévision\n40 minutes"}},
            {"filename":"04.jpg","caption":{"en":"","fr":"Armel Le Cleac'h\nPortrait 26 minutes"}},
            {"filename":"05.jpg","caption":{"en":"","fr":"Nicolas Huchet\nMy human Kit\n26 minutes"}},
            {"filename":"06.jpg","caption":{"en":"","fr":"Philippe Bouvard\nPortrait invité"}},
            {"filename":"07.jpg","caption":{"en":"","fr":"José Garcia\nPortrait invité"}},
            {"filename":"08.jpg","caption":{"en":"","fr":"Marc Levy\nPortrait invité"}},
            {"filename":"09.jpg","caption":{"en":"","fr":"Aurelie Filipetti\nPortrait invité"}},
            {"filename":"10.jpg","caption":{"en":"","fr":"Woody Allen\nPortrait invité"}}
        ],
        captions: {}
    },

    "dustin-kolor": {
        path:          "images/dustin-kolor",
        autoplay:      false,
        autoplayDelay: 5,
        cartons: [
        {
                "cid": "cmo8dyt3gkpc",
                "position": 0,
                "titleFr": "",
                "titleEn": "",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "En pleine tempête de sable, la visibilité est proche de zéro. On enfile les goggles — ces lunettes de protection aux verres colorés. Le monde devient rouge, bleu, orange, rose…\n\nDust'in Kolor n'est pas une série colorisée. C'est ce que j'ai vu.\n\nDésert du Nevada — Burning Man, août 2016.",
                "descEn": "In the middle of a sandstorm, visibility drops to near zero. You put on goggles — those coloured protective lenses. The world turns red, blue, orange, pink…\n\nDust'in Kolor is not a colorised series. It's what I saw.\n\nNevada Desert — Burning Man, August 2016.",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "",
                "categoryEn": "",
                "sidebarFr": "",
                "sidebarEn": ""
        }
],
        images: [
            {"filename":"01.jpg","caption":{"en":"Sandstorm","fr":"Sandstorm"}},
            {"filename":"02.jpg","caption":{"en":"Flying Car","fr":"Flying Car"}},
            {"filename":"03.jpg","caption":{"en":"After the Storm","fr":"After the Storm"}},
            {"filename":"04.jpg","caption":{"en":"Lost in the Dust","fr":"Lost in the Dust"}},
            {"filename":"05.jpg","caption":{"en":"Camp Lighters","fr":"Camp Lighters"}},
            {"filename":"06.jpg","caption":{"en":"I'm Here","fr":"I'm Here"}},
            {"filename":"08.jpg","caption":{"en":"Umbrellas Way","fr":"Umbrellas Way"}}
        ],
        captions: {}
    },

    "gem": {
        path:          "images/gem",
        autoplay:      false,
        autoplayDelay: 4,
        autoplayAudio: true,
        cartons: [
        {
                "cid": "cmo8dyt3hdp8",
                "position": 0,
                "titleFr": "",
                "titleEn": "",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "Série de portraits réalisée au GEM de Morlaix.\nChaque portrait est accompagné d’un témoignage audio.",
                "descEn": "Portrait series made at the GEM in Morlaix.\nEach portrait comes with an audio testimony.",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "",
                "categoryEn": "",
                "sidebarFr": "",
                "sidebarEn": ""
        }
],
        images: [
            {"filename":"ALain.jpg","audio":"ALain.mp3","caption":{"en":"","fr":"Alain"}},
            {"filename":"Beatrice.jpg","audio":"Beatrice.mp3","caption":{"en":"","fr":"Béatrice"}},
            {"filename":"Bernard.jpg","audio":"Bernard.mp3","title":"Bernard"},
            {"filename":"Bruno.jpg","title":"Bruno"},
            {"filename":"GUY.jpg","title":"Guy"},
            {"filename":"Helene.jpg","audio":"Helene.mp3","title":"Hélène"},
            {"filename":"Jean-Pierre.jpg","title":"Jean-Pierre"},
            {"filename":"JeanFrancois.jpg","audio":"JeanFrancois.mp3","caption":{"en":"","fr":"Jean-François"}},
            {"filename":"Laurence.jpg","title":"Laurence"},
            {"filename":"Patricia.jpg","audio":"Patricia.mp3","title":"Patricia"},
            {"filename":"Theo.jpg","audio":"Theo.mp3","title":"Théo"},
            {"filename":"Veronique.jpg","title":"Véronique"},
            {"filename":"VALERIE.jpg","audio":"VALERIE.mp3","title":"Valerie"}
        ],
        captions: {}
    },

    "st-melar": {
        path:          "images/ST MELAR",
        autoplay:      false,
        autoplayDelay: 4,
        images: [
            {"filename":"stmelar-1.jpg"},
            {"filename":"stmelar-2.jpg"},
            {"filename":"stmelar-3.jpg"},
            {"filename":"stmelar-4.jpg"},
            {"filename":"stmelar-5.jpg"},
            {"filename":"stmelar-6.jpg"}
        ],
        captions: {}
    },

    "archives": {
        path:          "images/archives",
        autoplay:      false,
        autoplayDelay: 4,
        cartons: [
        {
                "cid": "cmml35z29tav",
                "position": 0,
                "titleFr": "PORTRAIT INVITE",
                "titleEn": "",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "Avec l'aide d'un compte INA et d'un fidèle monteur, j'ai réalisé une série de portrait pour la partie magazine du 20H de France 2 du dimanche soir. ",
                "descEn": "",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "",
                "categoryEn": "",
                "sidebarFr": "",
                "sidebarEn": ""
        }
],
        images: [
            {"filename":"01.jpg"},
            {"filename":"06.jpg"},
            {"filename":"07.jpg"},
            {"filename":"08.jpg"},
            {"filename":"09.jpg"},
            {"filename":"10.jpg"}
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
        /* Hidden groups — used to suppress orphan children */
        const hiddenGroups = new Set(MENU_CONFIG.filter(i => i.type === 'group' && i.hidden).map(i => i.id));
        const visible = MENU_CONFIG.filter(i => !i.hidden && !(i.parent && hiddenGroups.has(i.parent)));

        /* Build children map so ordering in config doesn't matter */
        const childrenOf = {};
        visible.filter(i => i.parent).forEach(i => {
            if (!childrenOf[i.parent]) childrenOf[i.parent] = [];
            childrenOf[i.parent].push(i);
        });

        const itemHtml = (item, isSub) => {
            const cls = isSub ? 'nav-item nav-sub-item' : 'nav-item';
            if (item.type === 'gallery')  return `<div class="${cls}"><a href="#" class="nav-link" data-gallery="${item.galleryId}">${item.name}</a></div>`;
            if (item.type === 'page')     return `<div class="${cls}"><a href="#" class="nav-link" data-page="${item.pageId}">${item.name}</a></div>`;
            if (item.type === 'external') return `<div class="${cls}"><a href="${item.url}" class="nav-link" target="_blank">${item.name}</a></div>`;
            return '';
        };

        let html = '';
        for (const item of visible) {
            if (item.parent) continue; /* children rendered inside their group */
            if (item.type === 'group') {
                const children = childrenOf[item.id] || [];
                html += `<div class="nav-group">`;
                html += `<div class="nav-group-header">${item.name}</div>`;
                if (children.length > 0) {
                    html += `<div class="nav-group-children">`;
                    children.forEach(c => { html += itemHtml(c, true); });
                    html += `</div>`;
                }
                html += `</div>`;
            } else {
                html += itemHtml(item, false);
            }
        }
        nav.innerHTML = html;
        /* Re-bind nav click events after rebuild */
        this.bindNavEvents();
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
        this.bindNavEvents();
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

    bindNavEvents() {
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
    }

    toggleMenu() {
        document.getElementById('menuToggle')?.classList.toggle('open');
        document.getElementById('mobileMenuBtn')?.classList.toggle('open');
        document.getElementById('mainNav')?.classList.toggle('open');
    }
    closeMenu() {
        document.getElementById('menuToggle')?.classList.remove('open');
        document.getElementById('mobileMenuBtn')?.classList.remove('open');
        document.getElementById('mainNav')?.classList.remove('open');
    }
    setActiveLink(el) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('has-active-child'));
        if (el) {
            el.classList.add('active');
            const group = el.closest('.nav-group');
            if (group) group.classList.add('has-active-child');
        }
    }

    enterSite() {
        document.getElementById('landing')?.classList.add('hidden');
        document.getElementById('site')?.classList.add('active');
        this.openHomeGallery();
    }

    openHomeGallery() {
        this.openGallery('portrait');
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

        if (item.type !== 'image' && item.type !== 'accueil-image') {
            this.stopSlideshow();
            this.stopAudio();
        }

        if (item.type === 'featured') {
            const text      = this.t(item.text);
            const seeMore   = T[lang].see_more;
            const galleryId = item.link_gallery;
            const eyebrow   = galleryId === 'cinema' ? (lang === 'fr' ? 'Cin\u00E9ma' : 'Cinema') : '';
            if (galleryDesc) {
                galleryDesc.innerHTML = `<div class="gallery-desc-content">
                    <div class="sidebar-featured">
                        ${eyebrow ? `<p class="sidebar-featured-eyebrow">${eyebrow}</p>` : ''}
                        <h2 class="sidebar-featured-title">${item.title}</h2>
                        <p class="sidebar-featured-text">${text}</p>
                        ${galleryId ? `<button class="sidebar-featured-btn" onclick="portfolio.openGalleryFromAccueil('${galleryId}')">${seeMore} \u2192</button>` : ''}
                    </div></div>`;
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
            const subtitle   = en ? (item.subtitleEn || item.subtitleFr || '') : (item.subtitleFr || item.subtitleEn || '');
            const category   = en ? (item.categoryEn || item.categoryFr || '') : (item.categoryFr || item.categoryEn || '');
            const sidebarTxt = en ? (item.sidebarEn  || item.sidebarFr  || '') : (item.sidebarFr  || item.sidebarEn  || '');
            const desc       = en ? (item.descEn     || item.descFr     || '') : (item.descFr     || item.descEn     || '');
            const ctaUrl     = item.ctaUrl   || '';
            const ctaLbl     = item.ctaLabel || (en ? 'See more' : 'En savoir plus');

            /* ── SIDEBAR: sous-titre + titre + texte — bouton dans footerCaption ── */
            if (galleryDesc) {
                let h = '';
                if (category)   h += `<p class="sidebar-item-subtitle">${category}</p>`;
                if (title)      h += `<h2 class="sidebar-item-title">${title}</h2>`;
                if (sidebarTxt) h += `<p class="sidebar-main-desc">${sidebarTxt.replace(/\n/g,'<br>')}</p>`;
                galleryDesc.innerHTML = h ? `<div class="gallery-desc-content">${h}</div>` : '';
            }
            if (footerCap) {
                footerCap.innerHTML = ctaUrl
                    ? `<a class="accueil-sidebar-link" href="${ctaUrl}" target="_blank" rel="noopener">${ctaLbl} \u2192</a>`
                    : '';
            }

            /* ── CARTON CENTRAL: titre + sous-titre + texte + bouton ── */
            const ctaBtn = ctaUrl
                ? `<a href="${ctaUrl}" target="_blank" rel="noopener" class="carton-cta-btn">${ctaLbl} \u2192</a>`
                : '';
            container.innerHTML = `
                <div class="carton-slide loaded">
                    <div class="carton-slide-inner">
                        ${title    ? `<h2 class="carton-slide-title">${title}</h2>` : ''}
                        ${subtitle ? `<p class="carton-slide-subtitle">${subtitle}</p>` : ''}
                        ${desc     ? `<p class="carton-slide-desc">${desc.replace(/\n/g,'<br>')}</p>` : ''}
                        ${ctaBtn}
                    </div>
                </div>`;

        } else if (item.type === 'accueil-image') {
            const linkGallery = item.link_gallery;
            /* ── SIDEBAR: empty galleryDesc; Portrait → link in footerCaption ── */
            if (galleryDesc) galleryDesc.innerHTML = '';
            if (footerCap) {
                if (linkGallery && item.label) {
                    footerCap.innerHTML = `<a class="accueil-sidebar-link" href="#"
                        onclick="portfolio.openGalleryFromAccueil('${linkGallery}');return false;">
                        ${item.label} \u2192</a>`;
                } else {
                    footerCap.innerHTML = '';
                }
            }
            const img = new Image();
            img.className = 'gallery-image';
            img.alt = item.label || '';
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

        } else {
            /* Sidebar galleryDesc:
             * — si title présent : subtitle + title (ex: GEM "Jean-François / SERIE GEM")
             * — si pas de title : caption format Davodeau (nom + métier en bas via margin-top:auto)
             */
            if (galleryDesc) {
                const t = item.title || '';
                const s = item.subtitle || '';
                const d = !t && item.caption
                    ? (typeof item.caption==='string' ? item.caption : (item.caption[lang]||item.caption.fr||item.caption.en||''))
                    : '';
                let h = '';
                if (t) {
                    /* Image nommée (ex: GEM) — subtitle + title */
                    if (s) h += `<p class="sidebar-item-subtitle">${s}</p>`;
                    h += `<h2 class="sidebar-item-title">${t}</h2>`;
                } else if (d) {
                    /* Image avec légende seulement (ex: Portrait Davodeau) */
                    const lines = d.split('\n').map(l => l.trim()).filter(Boolean);
                    const name = lines[0] || '';
                    const rest = lines.slice(1).join('\n');
                    h += `<div class="gallery-caption-block">`;
                    if (name) h += `<p class="gallery-caption-name">${name}</p>`;
                    if (rest)  h += `<p class="gallery-caption-desc">${rest.replace(/\n/g,'<br>')}</p>`;
                    h += `</div>`;
                }
                /* gallery-desc-content : margin-top:auto ancre l'info en bas */
                galleryDesc.innerHTML = h ? `<div class="gallery-desc-content">${h}</div>` : '';
            }
            /* footerCaption: bouton uniquement — pas de caption (déjà dans galleryDesc) */
            if (footerCap) {
                if (item.button?.url) {
                    const lbl = item.button.label || (lang === 'en' ? 'See more' : 'En savoir plus');
                    footerCap.innerHTML = `<a class="accueil-sidebar-link" href="${item.button.url}" target="_blank" rel="noopener">${lbl} \u2192</a>`;
                } else {
                    footerCap.innerHTML = '';
                }
            }
            /* audioAutoplay per-image: true=force on, false=force off, undefined=use gallery setting */
            const shouldAutoplayAudio = item.audio && (
                item.audioAutoplay === true ||
                (item.audioAutoplay !== false && this.currentGallery?.autoplayAudio)
            );
            /* Always show audio player if image has audio; autostart depends on settings */
            if (item.audio) {
                const audioSrc = item.audio.startsWith('images/')
                    ? item.audio
                    : `${this.currentGallery.path}/${item.audio}`;
                this.playAudio(audioSrc, shouldAutoplayAudio);
            } else {
                this.stopAudio();
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

        /* Mobile breadcrumb : GALLERY / ROLE / NOM — au-dessus du liseret */
        const mobileBreadcrumb = document.getElementById('mobileBreadcrumb');
        if (mobileBreadcrumb) {
            let breadcrumb = '';
            if (item.type === 'image') {
                const menuItem = MENU_CONFIG.find(i => i.galleryId === this.currentGalleryId && !i.hidden && i.type !== 'group');
                const galleryName = (menuItem?.name || this.currentGalleryId).toUpperCase();
                const parts = [galleryName];
                if (item.title) {
                    parts.push(item.title.toUpperCase());
                } else if (item.caption) {
                    const cap = typeof item.caption === 'string' ? item.caption : (item.caption[lang] || item.caption.fr || item.caption.en || '');
                    const lines = cap.split('\n').map(l => l.trim()).filter(Boolean);
                    if (lines.length >= 2) {
                        parts.push(lines[1].toUpperCase());
                        parts.push(lines[0].toUpperCase());
                    } else if (lines.length === 1) {
                        parts.push(lines[0].toUpperCase());
                    }
                }
                breadcrumb = parts.join(' / ');
            }
            mobileBreadcrumb.textContent = breadcrumb;
        }

        const counter = document.querySelector('.gallery-counter');
        if (counter) counter.textContent = `${index + 1} / ${items.length}`;
        const footerNav = document.querySelector('.gallery-footer-nav');
        if (footerNav) footerNav.style.visibility = items.length <= 1 ? 'hidden' : '';
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

    playAudio(src, autostart = false) {
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
        if (autostart) audio.play().catch(() => {});
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
