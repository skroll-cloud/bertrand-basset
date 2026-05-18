/**
 * Bertrand Basset Portfolio — gallery.js
 * Généré par Admin V4 — 01/05/2026 20:44:31
 */

const SITE_CONFIG = {
    name:           "Bertrand Basset",
    email:          "bertrand.basset@gmail.com",
    defaultLang:    "fr",
    showLanding:    true,
    landingImage:   "images/accueil/accueil-01.jpg?v=20260501",
    defaultGallery: "best-of",
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

  /* ── PHOTOGRAPHE ─────────────────────────────────── */
  { "id": "photographe",    "name": "PHOTOGRAPHE",        "type": "group" },
  { "id": "ph-portrait",   "name": "PORTRAIT",            "type": "gallery", "galleryId": "portrait",   "parent": "photographe" },
  { "id": "ph-gem",        "name": "LE GEM S'ENDIMANCHE", "type": "gallery", "galleryId": "gem",        "parent": "photographe" },
  { "id": "ph-stmelar",    "name": "ST MÉLAR",            "type": "gallery", "galleryId": "st-melar",   "parent": "photographe" },
  { "id": "ph-immersion",  "name": "IMMERSION",           "type": "gallery", "galleryId": "studio",     "parent": "photographe" },
  { "id": "ph-galeries",   "name": "GALERIES",            "type": "link",    "url": "clients/index.html","parent": "photographe" },

  /* ── RÉALISATEUR ─────────────────────────────────── */
  { "id": "realisateur",      "name": "RÉALISATEUR",   "type": "group" },
  { "id": "real-cinema",      "name": "CINÉMA",        "type": "gallery", "galleryId": "cinema",    "parent": "realisateur" },
  { "id": "real-television",  "name": "TÉLÉVISION",    "type": "gallery", "galleryId": "television","parent": "realisateur" },
  { "id": "real-corporate",   "name": "CORPORATE & WEB","type": "gallery", "galleryId": "corporate","parent": "realisateur" },

  /* ── AUTEUR ──────────────────────────────────────── */
  { "id": "auteur",               "name": "AUTEUR",               "type": "page", "pageId": "auteur" },

  /* ── TRAVAILLER ENSEMBLE ─────────────────────────── */
  { "id": "travailler-ensemble",  "name": "TRAVAILLER ENSEMBLE",  "type": "page", "pageId": "travailler-ensemble" },

  /* ── BOUTIQUE ────────────────────────────────────── */
  { "id": "boutique",         "name": "BOUTIQUE",                 "type": "group" },
  { "id": "boutique-dk",      "name": "DUST'IN KOLOR",            "type": "link", "url": "dustin-kolor/index.html", "parent": "boutique" },
  { "id": "boutique-portrait","name": "SÉANCE PORTRAIT",          "type": "page", "pageId": "contact", "parent": "boutique" },
  { "id": "boutique-projet",  "name": "ME PROPOSER UN PROJET",    "type": "page", "pageId": "contact", "parent": "boutique" },

  /* ── INFOS ───────────────────────────────────────── */
  { "id": "infos", "name": "INFOS", "type": "page", "pageId": "infos" },

  /* ── Cachés (conservés) ──────────────────────────── */
  { "id": "post-production", "name": "POST-PRODUCTION", "type": "page", "pageId": "post-production", "hidden": true },
  { "id": "films-player",    "name": "VOIR LES FILMS",  "type": "page", "pageId": "films-player",    "hidden": true },
  { "id": "archives",        "name": "ARCHIVES",        "type": "gallery", "galleryId": "archives",  "hidden": true }
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
        captions: {"02.jpg":{"en":"","fr":"Jean-Philippe Davodeau\nActeur"},"conversation-02.jpg":{"en":"","fr":"Antoine Asnar\nActeur"},"Imane02@bertrandbasset 2.jpg":{"en":"","fr":"Imene\nActrice"},"JF.jpg":{"en":"","fr":"Jean-François\nSerie GEM"},"L1020630.jpg":{"en":"","fr":"Patrick Ewen\nConteur"},"portrait-02.jpg":{"en":"","fr":"Ange-Marine Chénevat\nActrice"},"L1060508.jpg":{"en":"","fr":"Ange-Marine Chénevat\nActrice"}},
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
                "descFr": "Désert du Nevada — Burning Man, août 2016.\n\nSans vraiment prévenir, le vent se met à souffler, le sable très fin du désert qu'on appelle la Dust se soulève et en quelques minutes on ne distingue plus que des formes grises dans le brouillard.\n\nOn enfile alors ses Goggles, ces grosses lunettes de protection aux verres colorés et le monde devient rouge, bleu, orange, rose…\n\nC'est cette vision pendant les tempêtes de sable que j'ai voulu retranscrire avec ce travail chormatique.\n\n",
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
            {"filename":"08.jpg","caption":{"en":"Umbrella's Way","fr":"Umbrella's Way"}}
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
                "descFr": "J’ai rencontré l’association par hasard. Très vite, une envie commune : mettre en avant leurs adhérents — des personnes aux parcours souvent difficiles, qui avaient réussi à reprendre une vie presque normale.\n\nLa confiance construite dans le temps m’a permis de réaliser des photos qui ont une vraie puissance, une âme, un regard.\n\nRésultat : Exposition permanente au GEM de Morlaix · Label Ministère de la Santé « Grande Cause Nationale 2025 — Parlons Santé Mentale »",
                "descEn": "I met the association by chance. Very quickly, a shared idea emerged: to highlight their members — people with often difficult backgrounds who had managed to rebuild a near-normal life.\n\nThe trust built over time allowed me to create photographs with real power, a soul, a gaze.\n\nResult: Permanent exhibition at the GEM in Morlaix · Ministry of Health label \"Grande Cause Nationale 2025 — Parlons Santé Mentale\"",
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
        cartons: [
            {
                "cid": "stmelar-intro",
                "position": 0,
                "titleFr": "",
                "titleEn": "",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "Une semaine avec mon appareil dans un EHPAD. J'ai pris une chambre. J'ai dormi sur place, à Lanmeur. Pour montrer les soignants — leur quotidien, leurs gestes, leur façon d'être là. Ce travail qu'on ne voit jamais parce qu'il se passe derrière des portes fermées.\n\nPour que quelqu'un te laisse vraiment entrer dans son monde, il faut y être. Pas passer. Être.",
                "descEn": "A week with my camera in a care home. I rented a room. I slept on site, in Lanmeur. To show the caregivers — their daily routine, their gestures, the way they show up. The work no one ever sees because it happens behind closed doors.\n\nFor someone to truly let you into their world, you have to be there. Not pass through. Be there.",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "Immersion · EHPAD de Lanmeur",
                "categoryEn": "Immersion · Lanmeur care home",
                "sidebarFr": "Résidence photographique · 6 planches · Exposition à l'hôpital",
                "sidebarEn": "Photography residency · 6 plates · Hospital exhibition"
            }
        ],
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

    "corporate": {
        path:          "images/corporate",
        autoplay:      false,
        autoplayDelay: 4,
        cartons: [
            {
                "cid": "corporate-intro",
                "position": 0,
                "titleFr": "Ernest L'Hour, dernier goémonier",
                "titleEn": "Ernest L'Hour, last seaweed harvester",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "Le Musée de la Mer de Carantec ouvre ses portes et veut créer un contenu sur la pêche au goémon sur l'Île Callot. J'ai rencontré Ernest L'Hour, dernier goémonier vivant. Après plusieurs rencontres et des semaines de recherche documentaire, je l'ai invité en studio pour recueillir sa parole, lui montrer des images de la Cinémathèque.\n\nEt pour le surprendre — des photos de famille que ses enfants m'avaient confiées en secret.\n\nCe qui s'est passé dans cette pièce ne se commande pas.",
                "descEn": "The Musée de la Mer in Carantec commissioned a film about seaweed harvesting on Île Callot. I met Ernest L'Hour, the last living seaweed harvester. After several meetings and weeks of documentary research, I invited him into the studio to record his testimony and show him archival footage.\n\nAnd to surprise him — family photos his children had secretly given me.\n\nWhat happened in that room cannot be directed.",
                "ctaLabel": "Voir le film",
                "ctaUrl": "https://u.pcloud.link/publink/show?code=XZp3uEVZjUbUhjJXBJ59YjYjyOoee0fsmXGX",
                "categoryFr": "Corporate & Web · Musée de la Mer de Carantec",
                "categoryEn": "Corporate & Web · Musée de la Mer de Carantec",
                "sidebarFr": "Film historique · Visible en permanence au Musée de la Mer",
                "sidebarEn": "Historical film · On permanent display at the Musée de la Mer"
            }
        ],
        images: [],
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

    "best-of": {
        path:          ".",
        autoplay:      false,
        autoplayDelay: 4,
        cartons: [
            {
                "cid": "best-of-phrase",
                "position": 1,
                "titleFr": "Je fabrique des images, je raconte des histoires, parfois en même temps.",
                "titleEn": "I make images, I tell stories, sometimes at the same time.",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "",
                "descEn": "",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "Bertrand Basset · Carantec, Bretagne",
                "categoryEn": "Bertrand Basset · Carantec, Brittany",
                "sidebarFr": "",
                "sidebarEn": ""
            }
        ],
        images: [
            {"filename":"images/portrait/conversation-02.jpg","title":"Antoine Asnar","subtitle":"Portrait Studio"},
            {"filename":"images/dustin-kolor/04.jpg","title":"Lost in the dust","subtitle":"Exposition"},
            {"filename":"images/portrait/L1060508.jpg","title":"Ange-Marine","subtitle":"Portrait nature"},
            {"filename":"images/cinema/1.jpg","title":"J'arrive","subtitle":"Réalisateur cinéma"}
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

/* ─── FILMS VIDEOS DATA ─────────────────────────────── */
/* Pour ajouter une vidéo : videoId = ID YouTube (non répertorié) ou Vimeo  */
/* platform: "youtube" | "vimeo"                                            */
/* ─── FILMS NOTE ─────────────────────────────────────── */
/* Texte affiché/masqué via le bouton "+" en haut de la liste */
const FILMS_NOTE = {
    fr: "Réalisateur indépendant depuis 2001, j'ai réalisé des portraits documentaires pour France 2 — 20H30 le dimanche, 13H15 le samedi, 13H15 le dimanche — ainsi qu'un court métrage de fiction, J'arrive, sélectionné dans plus de 40 festivals et primé à Clermont-Ferrand, Los Angeles, Rhodes Island.",
    en: "Independent filmmaker since 2001. I have directed documentary portraits for France 2 — Sunday 8:30pm, Saturday 1:15pm — as well as the short film J'arrive, selected in over 40 festivals and awarded in Clermont-Ferrand, Los Angeles, Rhodes Island."
};

const FILMS_VIDEOS = [
    {
        group: { fr: "CINÉMA", en: "CINEMA" },
        videos: [
            {
                id: "v-jarrive",
                titleFr: "J'arrive",
                titleEn: "J'arrive",
                metaFr: "Court métrage · 13 min · Respiro Production\n40 sélections · 20 prix dont Clermont-Ferrand, Los Angeles",
                metaEn: "Short film · 13 min · Respiro Production\n40 selections · 20 awards incl. Clermont-Ferrand, LA",
                platform: "vimeo",
                videoId: "240574987",
                thumb: ""
            }
        ]
    },
    {
        group: { fr: "FRANCE 2 — 20H30 LE DIMANCHE", en: "FRANCE 2 — 20H30 ON SUNDAYS" },
        videos: [
            {
                id: "v-rochefort",
                titleFr: "Jean Rochefort",
                titleEn: "Jean Rochefort",
                metaFr: "Portrait invité · France 2",
                metaEn: "Guest portrait · France 2",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/01.jpg"
            },
            {
                id: "v-gautier",
                titleFr: "Léon Gautier",
                titleEn: "Léon Gautier",
                metaFr: "Les hommes du Commando Kieffer · 40 min",
                metaEn: "The men of Commando Kieffer · 40 min",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/02.jpg"
            },
            {
                id: "v-drouot",
                titleFr: "Jean Claude Drouot",
                titleEn: "Jean Claude Drouot",
                metaFr: "L'arrivée de la télévision · 40 min",
                metaEn: "The arrival of television · 40 min",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/03.jpg"
            },
            {
                id: "v-lecleach",
                titleFr: "Armel Le Cleac'h",
                titleEn: "Armel Le Cleac'h",
                metaFr: "Portrait · 26 min",
                metaEn: "Portrait · 26 min",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/04.jpg"
            },
            {
                id: "v-huchet",
                titleFr: "Nicolas Huchet",
                titleEn: "Nicolas Huchet",
                metaFr: "My Human Kit · 26 min",
                metaEn: "My Human Kit · 26 min",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/05.jpg"
            },
            {
                id: "v-bouvard",
                titleFr: "Philippe Bouvard",
                titleEn: "Philippe Bouvard",
                metaFr: "Portrait invité",
                metaEn: "Guest portrait",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/06.jpg"
            },
            {
                id: "v-garcia",
                titleFr: "José Garcia",
                titleEn: "José Garcia",
                metaFr: "Portrait invité",
                metaEn: "Guest portrait",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/07.jpg"
            },
            {
                id: "v-levy",
                titleFr: "Marc Levy",
                titleEn: "Marc Levy",
                metaFr: "Portrait invité",
                metaEn: "Guest portrait",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/08.jpg"
            },
            {
                id: "v-filipetti",
                titleFr: "Aurélie Filipetti",
                titleEn: "Aurélie Filipetti",
                metaFr: "Portrait invité",
                metaEn: "Guest portrait",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/09.jpg"
            },
            {
                id: "v-allen",
                titleFr: "Woody Allen",
                titleEn: "Woody Allen",
                metaFr: "Portrait invité",
                metaEn: "Guest portrait",
                platform: "youtube",
                videoId: "",
                thumb: "images/Television/10.jpg"
            }
        ]
    }
];

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

function buildPostProductionPage(lang) {
    const en = lang === 'en';
    return `<div class="page-text">
      <div class="page-section">
        <h2>${en ? 'Post-production' : 'Post-production'}</h2>
        <p>${en
          ? 'I founded Yellow Shoes Studio, through which I worked as a service provider for cinema and television as post-production director, editor and colorist.'
          : "J'ai fondé la société Yellow Shoes Studio, avec laquelle j'ai été prestataire pour le cinéma et la télévision en tant que directeur de post-production, monteur et étalonneur."
        }</p>
        <p class="pp-clients">France Télévisions &nbsp;·&nbsp; Respiro Productions &nbsp;·&nbsp; Stank Films &nbsp;·&nbsp; Hutong Production &nbsp;·&nbsp; 1001 Films &nbsp;·&nbsp; Le Petit Remorqueur &nbsp;·&nbsp; Vidémo&hellip;</p>
      </div>
    </div>`;
}

function buildAuteurPage(lang) {
    const en = lang === 'en';
    const films = [
        {
            titre: "J'arrive",
            meta: en ? 'Short film' : 'Court métrage',
            desc: en ? '40 festival selections &nbsp;·&nbsp; 20 awards including Clermont-Ferrand and Los Angeles' : '40 sélections festival &nbsp;·&nbsp; 20 prix dont Clermont-Ferrand et Los Angeles'
        }
    ];
    const projets = [
        {
            titre: 'Skroll',
            meta: en ? 'Web series &nbsp;·&nbsp; found-footage archives &nbsp;·&nbsp; In production &nbsp;·&nbsp; Stank Films' : 'Série web &nbsp;·&nbsp; détournement d\'archives &nbsp;·&nbsp; En production &nbsp;·&nbsp; Stank Films'
        },
        {
            titre: 'Madelenou Plouk',
            meta: en ? 'Short series in Breton &nbsp;·&nbsp; cinematheque archives &nbsp;·&nbsp; Stank &amp; Kalanna' : 'Série courte en breton &nbsp;·&nbsp; archives cinémathèque &nbsp;·&nbsp; Stank &amp; Kalanna'
        },
        {
            titre: 'Des grumeaux dans la pâte à crêpe',
            meta: en ? 'TV film 52 min &nbsp;·&nbsp; co-written with Christophe Lemoine' : 'Unitaire télé 52 min &nbsp;·&nbsp; co-écrit avec Christophe Lemoine'
        },
        {
            titre: 'Canal 88',
            meta: en ? 'Series 12×56 &nbsp;·&nbsp; co-written with Anthony Santoro &nbsp;·&nbsp; Option Trajectoire Givrée' : 'Série 12×56 &nbsp;·&nbsp; co-écrit avec Anthony Santoro &nbsp;·&nbsp; option Trajectoire Givrée'
        },
        {
            titre: 'Kapo',
            meta: en ? 'Feature film &nbsp;·&nbsp; in development' : 'Long métrage &nbsp;·&nbsp; en écriture'
        },
        {
            titre: 'Ordures',
            meta: en ? 'Feature film &nbsp;·&nbsp; in development' : 'Long métrage &nbsp;·&nbsp; en écriture'
        }
    ];
    const filmHtml = films.map(f => `
        <div class="auteur-item">
          <div class="auteur-title">${f.titre}</div>
          <div class="auteur-meta">${f.meta}</div>
          ${f.desc ? `<div class="auteur-desc">${f.desc}</div>` : ''}
        </div>`).join('');
    const projetHtml = projets.map(p => `
        <div class="auteur-item">
          <div class="auteur-title">${p.titre}</div>
          <div class="auteur-meta">${p.meta}</div>
        </div>`).join('');
    return `<div class="page-text">
      <div class="page-section">
        <h2>${en ? 'Films' : 'Films'}</h2>
        ${filmHtml}
      </div>
      <div class="page-section">
        <h2>${en ? 'Projects' : 'Projets'}</h2>
        ${projetHtml}
      </div>
    </div>`;
}

function buildTravaillerEnsemblePage(lang) {
    const en = lang === 'en';
    return `<div class="page-text">
      <div class="page-section">
        <h2>${en ? 'Working together' : 'Travailler ensemble'}</h2>
        <p>${en
          ? 'You have a story to tell, people to highlight, knowledge to pass on.'
          : 'Vous avez une histoire à raconter, des humains à valoriser, des savoirs à transmettre.'
        }</p>
        <p>${en
          ? "It's been 20 years that my job is to help you do that."
          : "Ça fait 20 ans que mon métier est de vous aider à le faire."
        }</p>
        <p>${en
          ? 'Business owner, volunteer, artist or grandparent — whatever you want to tell, I adapt and co-create with you what needs to exist: a photo, a film, a podcast.'
          : "Dirigeant, bénévole, artiste ou grand-parent — peu importe qui vous êtes et ce que vous voulez raconter, je m'adapte et je crée avec vous ce qui doit exister : une photo, un film, un podcast."
        }</p>
      </div>
      <div class="page-section">
        <h2>${en ? 'Made to measure' : 'Sur mesure'}</h2>
        <p>${en
          ? "For every project I'm entrusted with, I invent a new solution. I never reproduce a ready-made recipe. I co-build with you the solution that fits your problem."
          : "Pour chaque projet qu'on me confie, j'invente une solution nouvelle. Jamais je ne reproduis une recette toute faite. Je co-construis avec vous la solution qui convient à votre problème."
        }</p>
        <p>${en
          ? "If we work together, you're not buying a service — you're buying a custom creation."
          : "Si on travaille ensemble, vous n'achetez pas une solution — vous achetez une création sur mesure."
        }</p>
      </div>
      <div class="page-section">
        <h2>${en ? 'And you?' : 'Et vous ?'}</h2>
        <p style="font-style:italic">${en
          ? '\"Do you have a story to tell, people to highlight, knowledge to pass on?\"'
          : '« Et vous, vous avez une histoire à raconter, des humains à valoriser, des savoirs à transmettre ?»'
        }</p>
      </div>
    </div>`;
}

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

function buildFilmsPlayerPage(lang) {
    const en = lang === 'en';

    /* Flatten videos */
    const allVideos = [];
    FILMS_VIDEOS.forEach(g => g.videos.forEach(v => allVideos.push(v)));

    /* Playlist items — no thumbnails, readable title */
    let playlistHtml = '';
    FILMS_VIDEOS.forEach(g => {
        playlistHtml += `<div class="films-group-header">${en ? g.group.en : g.group.fr}</div>`;
        g.videos.forEach(v => {
            const title = en ? v.titleEn : v.titleFr;
            const meta  = (en ? v.metaEn : v.metaFr).split('\n')[0];
            const idx   = allVideos.indexOf(v);
            playlistHtml += `
                <div class="films-playlist-item${idx === 0 ? ' active' : ''}" onclick="window._filmsPlay(${idx})">
                    <div class="films-playlist-title">${title}</div>
                    ${meta ? `<div class="films-playlist-meta">${meta}</div>` : ''}
                </div>`;
        });
    });

    /* First video */
    const first      = allVideos[0];
    const firstTitle = first ? (en ? first.titleEn : first.titleFr) : '';
    const firstMeta  = first ? (en ? first.metaEn  : first.metaFr)  : '';
    const firstSrc   = first ? _filmsEmbedSrc(first) : 'about:blank';

    /* Note text */
    const noteText    = en ? FILMS_NOTE.en : FILMS_NOTE.fr;
    const noteLabel   = en ? 'Note' : 'Note';

    /* Register globals */
    window._filmsAllVideos = allVideos;
    window._filmsLang      = lang;

    window._filmsPlay = function(idx) {
        const v   = window._filmsAllVideos[idx];
        const lg  = window._filmsLang;
        if (!v) return;
        const iframe = document.getElementById('filmsStageIframe');
        const tEl    = document.getElementById('filmsInfoTitle');
        const mEl    = document.getElementById('filmsInfoMeta');
        if (iframe) iframe.src = _filmsEmbedSrc(v);
        if (tEl) tEl.textContent = lg === 'en' ? v.titleEn : v.titleFr;
        if (mEl) mEl.innerHTML  = (lg === 'en' ? v.metaEn : v.metaFr).replace(/\n/g,'<br>');
        document.querySelectorAll('.films-playlist-item').forEach((el, i) => el.classList.toggle('active', i === idx));
    };

    window._filmsToggleNote = function() {
        const btn   = document.getElementById('filmsNoteToggle');
        const panel = document.getElementById('filmsNotePanel');
        if (!btn || !panel) return;
        const open = panel.classList.toggle('open');
        btn.classList.toggle('open', open);
    };

    window._filmsBack = function() {
        document.getElementById('site')?.classList.remove('films-mode');
        const prev = window._filmsPrevState;
        if (prev?.gallery) {
            window.portfolio?.openGallery(prev.gallery);
        } else {
            window.portfolio?.openHomeGallery();
        }
        window.portfolio?.setActiveLink(null);
    };

    return `
        <div class="films-player">
            <!-- Colonne gauche -->
            <div class="films-left">
                <div class="films-header">
                    <button class="films-back-btn" onclick="window._filmsBack()">
                        <img src="assets/logo-b.svg" alt="B" class="films-back-logo">
                    </button>
                </div>
                <div class="films-note-section">
                    <button class="films-note-toggle" id="filmsNoteToggle" onclick="window._filmsToggleNote()">
                        <span class="films-note-toggle-label">${noteLabel}</span>
                        <span class="films-note-plus">+</span>
                    </button>
                    <div class="films-note-panel" id="filmsNotePanel">
                        <div class="films-note-text">${noteText}</div>
                    </div>
                </div>
                <div class="films-playlist">${playlistHtml}</div>
            </div>
            <!-- Colonne droite -->
            <div class="films-stage">
                <div class="films-player-wrap">
                    <iframe id="filmsStageIframe"
                        src="${firstSrc}"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="films-info">
                    <div class="films-info-title" id="filmsInfoTitle">${firstTitle}</div>
                    <div class="films-info-meta" id="filmsInfoMeta">${firstMeta.replace(/\n/g,'<br>')}</div>
                </div>
            </div>
        </div>`;
}

function _filmsEmbedSrc(v) {
    if (!v || !v.videoId) return 'about:blank';
    if (v.platform === 'vimeo') {
        return `https://player.vimeo.com/video/${v.videoId}?title=0&byline=0&portrait=0`;
    }
    /* youtube */
    return `https://www.youtube-nocookie.com/embed/${v.videoId}?rel=0`;
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
        this.updateCartBadge();
    }

    updateCartBadge() {
        const badge = document.getElementById('mobileCartBadge');
        if (!badge) return;
        try {
            const cart = JSON.parse(localStorage.getItem('bb_cart') || '[]');
            const count = cart.reduce((s, i) => s + (i.qty || 1), 0);
            badge.textContent = count > 0 ? count : '';
            badge.classList.toggle('has-items', count > 0);
        } catch (e) {}
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
            if (item.type === 'link')     return `<div class="${cls}"><a href="${item.url}" class="nav-link">${item.name}</a></div>`;
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
        /* Logo [b] sur la landing → entre dans le site */
        document.querySelector('.landing .logo-b')?.addEventListener('click', () => this.enterSite());
        document.querySelector('.landing .brand-block')?.addEventListener('click', () => this.enterSite());
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
            if (e.key === 'Escape')     this.closeBoutiquePanel();
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
        this.openGallery(SITE_CONFIG.defaultGallery || 'portrait');
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
        document.getElementById('site')?.classList.remove('films-mode');
        document.getElementById('galleryContainer')?.classList.remove('page-mode', 'grid-mode');
        document.getElementById('gridToggle')?.classList.remove('active');
        document.getElementById('site')?.classList.remove('grid-active');

        /* Universe-nav: if gallery belongs to a group, switch sidebar to sub-menu */
        const menuItem  = MENU_CONFIG.find(i => i.galleryId === id && i.type === 'gallery');
        const parentId  = menuItem?.parent;
        const parentGrp = parentId ? MENU_CONFIG.find(i => i.id === parentId && i.type === 'group') : null;
        if (parentGrp) {
            this.enterUniverseMode(parentGrp, id);
        } else {
            this.exitUniverseMode();
        }

        this.showItem(0);
        if (g.autoplay && this.autoplaying) this.startSlideshow();
    }

    enterUniverseMode(group, activeGalleryId) {
        const lang     = this.currentLang;
        const siblings = MENU_CONFIG.filter(i => i.parent === group.id && i.type === 'gallery' && !i.hidden);
        const uNav     = document.getElementById('universeNav');
        const mNav     = document.getElementById('mainNav');
        if (!uNav) return;

        const items = siblings.map((s, idx) => {
            const isActive = s.galleryId === activeGalleryId;
            const count    = this.galleries[s.galleryId]?.items?.filter(i => i.type === 'image').length || '';
            return `<div class="universe-item${isActive ? ' active' : ''}" data-gallery="${s.galleryId}">
                <span class="universe-item-title">${s.name}</span>
                ${count ? `<span class="universe-item-num">${String(count).padStart(2,'0')}</span>` : ''}
            </div>`;
        }).join('');

        uNav.innerHTML = `
            <button class="universe-back" id="universeBackBtn">‹ Menu</button>
            <div class="universe-group-title">${group.name}</div>
            <div class="universe-items">${items}</div>`;

        /* bind clicks */
        uNav.querySelector('#universeBackBtn').addEventListener('click', () => this.exitUniverseMode());
        uNav.querySelectorAll('.universe-item[data-gallery]').forEach(el => {
            el.addEventListener('click', () => {
                this.openGallery(el.dataset.gallery);
            });
        });

        if (mNav) mNav.style.display = 'none';
        uNav.style.display = '';
    }

    exitUniverseMode() {
        const uNav = document.getElementById('universeNav');
        const mNav = document.getElementById('mainNav');
        if (uNav) uNav.style.display = 'none';
        if (mNav) mNav.style.display = '';
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
                if (this.currentGalleryId === 'dustin-kolor') {
                    const fname = (item.filename || '').split('/').pop();
                    const lbl = lang === 'en' ? 'Buy this print \u2014 from 160 \u20ac' : 'Acheter un tirage \u2014 \u00e0 partir de 160\u00a0\u20ac';
                    footerCap.innerHTML = `<button class="dk-buy-btn" onclick="window.portfolio.openBoutiquePanel('${fname}')">${lbl} \u2192</button>`;
                } else if (item.button?.url) {
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
        const siteEl    = document.getElementById('site');
        if (id === 'films-player') {
            /* Stocker l'état précédent pour le bouton retour */
            window._filmsPrevState = { gallery: this.currentGalleryId, page: this.currentPageId };
            container.classList.remove('page-mode');
            siteEl?.classList.add('films-mode');
            container.innerHTML = buildFilmsPlayerPage(this.currentLang);
        } else {
            siteEl?.classList.remove('films-mode');
            container.classList.add('page-mode');
            let html = '';
            if (id === 'infos')                 html = buildInfosPage(this.currentLang);
            if (id === 'contact')               html = buildContactPage(this.currentLang);
            if (id === 'post-production')       html = buildPostProductionPage(this.currentLang);
            if (id === 'auteur')                html = buildAuteurPage(this.currentLang);
            if (id === 'travailler-ensemble')   html = buildTravaillerEnsemblePage(this.currentLang);
            container.innerHTML = `<div class="page-content">${html}</div>`;
        }
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

    // ─── BOUTIQUE PANEL ──────────────────────────────────────────────────────
    openBoutiquePanel(filename) {
        const DK_EDITIONS = {
            '01.jpg': { titre: 'Sandstorm',       couleur: 'Feu',
                formats: [
                    { size: '20 × 30 cm',  prix: [160,  200,  240]  },
                    { size: '60 × 90 cm',  prix: [820,  1050, 1230] }
                ]},
            '02.jpg': { titre: 'Flying Car',       couleur: 'Orange',
                formats: [
                    { size: '17 × 30 cm',  prix: [160,  200,  240]  },
                    { size: '70 × 124 cm', prix: [1290, 1550, 1800] }
                ]},
            '03.jpg': { titre: 'After the Storm',  couleur: 'Vert',
                formats: [
                    { size: '17 × 30 cm',  prix: [160,  200,  240]  },
                    { size: '70 × 124 cm', prix: [1290, 1550, 1800] }
                ]},
            '04.jpg': { titre: 'Lost in the Dust', couleur: 'Rouge',
                formats: [
                    { size: '22 × 30 cm',  prix: [160,  200,  240]  },
                    { size: '60 × 80 cm',  prix: [890,  1100, 1300] }
                ]},
            '05.jpg': { titre: 'Camp Lighters',    couleur: 'Jaune',
                formats: [
                    { size: '12 × 30 cm',  prix: [160,  200,  240]  },
                    { size: '40 × 100 cm', prix: [790,  980,  1180] }
                ]},
            '06.jpg': { titre: "I'm Here",         couleur: 'Bleu',
                formats: [
                    { size: '22 × 30 cm',  prix: [160,  200,  240]  },
                    { size: '60 × 80 cm',  prix: [890,  1100, 1300] }
                ]},
            '08.jpg': { titre: "Umbrellas Way",    couleur: 'Rose',
                formats: [
                    { size: '22 × 30 cm',  prix: [160,  200,  240]  },
                    { size: '60 × 80 cm',  prix: [890,  1100, 1300] }
                ]},
        };
        const SUPPORT = 'Museum Etching 350g\ncollé sur Dibond 2mm';
        const panel   = document.getElementById('boutiquePanel');
        const content = document.getElementById('boutiquePanelContent');
        const overlay = document.getElementById('boutiqueOverlay');
        if (!panel || !content) return;

        const lang = this.currentLang;
        const ed   = filename ? DK_EDITIONS[filename] : null;

        // Store state for dynamic format switching
        window._dkEd       = ed;
        window._dkFilename = filename;
        window._dkLang     = lang;
        window._dkFmtIdx   = 0;

        window._dkSetFmt = function(idx) {
            window._dkFmtIdx = idx;
            const ed2   = window._dkEd;
            if (!ed2) return;
            const fmt2  = ed2.formats[idx];
            const prix2 = fmt2.prix;
            const lg    = window._dkLang;
            // Update format buttons
            document.querySelectorAll('.bq-fmt-btn').forEach((b, i) => {
                b.classList.toggle('active', i === idx);
            });
            // Update price grid
            const grid = document.getElementById('bqPrixGrid');
            if (grid) {
                grid.innerHTML =
                    '<span class="bq-px-range">' + (lg==='en'?'ex. 1–3':'ex. 1–3') + '</span><span class="bq-px-val">' + prix2[0].toLocaleString('fr-FR') + ' €</span>' +
                    '<span class="bq-px-range">' + (lg==='en'?'ex. 4–7':'ex. 4–7') + '</span><span class="bq-px-val">' + prix2[1].toLocaleString('fr-FR') + ' €</span>' +
                    '<span class="bq-px-range">' + (lg==='en'?'ex. 8–10':'ex. 8–10') + '</span><span class="bq-px-val">' + prix2[2].toLocaleString('fr-FR') + ' €</span>';
            }
            // Update add button
            const addBtn = document.getElementById('bqAddBtn');
            if (addBtn) {
                addBtn.onclick = function() { window.portfolio.addToCart(window._dkFilename, ed2.titre, fmt2.size, prix2[0]); };
                addBtn.innerHTML = (lg==='en'?'Add to cart':'Ajouter au panier') + ' — ' + prix2[0].toLocaleString('fr-FR') + ' €';
            }
        };

        if (ed) {
            const fmt0      = ed.formats[0];
            const prix0     = fmt0.prix;
            const imgPath   = `images/dustin-kolor/${filename}`;
            const suppLines = SUPPORT.split('\n');
            const fmtBtns   = ed.formats.map((f, i) =>
                `<button class="bq-fmt-btn${i===0?' active':''}" onclick="window._dkSetFmt(${i})">${f.size}</button>`
            ).join('');

            content.innerHTML = `
                <div class="bq-header">
                    <div class="bq-img-wrap">
                        <img src="${imgPath}" alt="${ed.titre}" class="bq-thumb">
                    </div>
                    <div class="bq-meta">
                        <p class="bq-serie">Dust'in Kolor &mdash; Édition ${ed.couleur}</p>
                        <h2 class="bq-title">${ed.titre}</h2>
                    </div>
                </div>
                <div class="bq-format-selector">
                    ${fmtBtns}
                </div>
                <div class="bq-support">
                    ${suppLines.map(l => `<span>${l}</span>`).join('')}
                </div>
                <div class="bq-editions">
                    <p class="bq-editions-label">${lang === 'en' ? 'Edition of 10 — price by exemplar' : 'Édition 10 ex. — prix par numéro'}</p>
                    <div class="bq-prix-grid" id="bqPrixGrid">
                        <span class="bq-px-range">${lang === 'en' ? 'ex. 1–3' : 'ex. 1–3'}</span><span class="bq-px-val">${prix0[0].toLocaleString('fr-FR')} €</span>
                        <span class="bq-px-range">${lang === 'en' ? 'ex. 4–7' : 'ex. 4–7'}</span><span class="bq-px-val">${prix0[1].toLocaleString('fr-FR')} €</span>
                        <span class="bq-px-range">${lang === 'en' ? 'ex. 8–10' : 'ex. 8–10'}</span><span class="bq-px-val">${prix0[2].toLocaleString('fr-FR')} €</span>
                    </div>
                </div>
                <div class="bq-actions">
                    <button class="bq-btn-add" id="bqAddBtn" onclick="window.portfolio.addToCart('${filename}', '${ed.titre}', '${fmt0.size}', ${prix0[0]})">
                        ${lang === 'en' ? 'Add to cart' : 'Ajouter au panier'} — ${prix0[0].toLocaleString('fr-FR')} €
                    </button>
                    <p class="bq-note">${lang === 'en' ? 'Numbered & signed. Certificate of authenticity included.' : 'Numéroté & signé. Certificat d’authenticité inclus.'}</p>
                    <p class="bq-contact"><a href="mailto:yellowshoesstudio@gmail.com">${lang === 'en' ? 'Contact for another size' : 'Demander un autre format'}</a></p>
                </div>`;
        } else {
            // Generic panel — list all works
            content.innerHTML = `
                <h2 class="bq-title">${lang === 'en' ? "Dust'in Kolor — Editions" : "Dust'in Kolor — Éditions"}</h2>
                <p class="bq-note" style="margin-bottom:1.5rem">${lang === 'en' ? 'Navigate to a photo and click the buy button to order a specific print.' : 'Naviguez jusqu’à une photo puis cliquez sur Acheter un tirage.'}</p>`;
        }

        panel.classList.add('open');
        if (overlay) overlay.classList.add('visible');
    }

    closeBoutiquePanel() {
        const panel   = document.getElementById('boutiquePanel');
        const overlay = document.getElementById('boutiqueOverlay');
        if (panel)   panel.classList.remove('open');
        if (overlay) overlay.classList.remove('visible');
    }

    addToCart(filename, titre, format, prix) {
        let cart = JSON.parse(localStorage.getItem('bb_cart') || '[]');
        const existing = cart.find(i => i.filename === filename && i.format === format);
        if (existing) {
            existing.qty = (existing.qty || 1) + 1;
        } else {
            cart.push({ filename, titre, format, prix, qty: 1 });
        }
        localStorage.setItem('bb_cart', JSON.stringify(cart));
        this.updateCartBadge();
        // Visual feedback
        const btn = document.querySelector('.bq-btn-add');
        if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = this.currentLang === 'en' ? '\u2714 Added!' : '\u2714 Ajout\u00E9\u00A0!';
            btn.style.background = '#2a2a2a';
            setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 1800);
        }
    }

    updateCartBadge() {
        const cart  = JSON.parse(localStorage.getItem('bb_cart') || '[]');
        const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
        const badge = document.getElementById('cartBadge');
        if (badge) {
            badge.textContent = total > 0 ? total : '';
            badge.style.display = total > 0 ? 'inline-block' : 'none';
        }
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
