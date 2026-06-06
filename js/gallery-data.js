/* gallery-data.js — Données du site (config, galeries, textes)
 * Ce fichier contient TOUTE la configuration du site.
 * Il est chargé AVANT gallery-engine.js dans index.html.
 * Modifiable via l'admin ou sur demande.
 * ─────────────────────────────────────────────────────────── */

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
/* type "section" → affiche la grille de vignettes dans le main */
/* type "gallery"  → ouvre directement une galerie              */
/* type "page"     → affiche une page texte                     */
/* type "group"    → groupe avec sous-items dans la sidebar     */
/* type "link"     → lien href direct                           */
const MENU_CONFIG = [
  { "id": "best-of",             "name": "BEST OF",              "type": "gallery", "galleryId": "best-of", "hidden": true },
  { "id": "photographe",         "name": "PHOTOGRAPHE",          "type": "section", "sectionId": "photographe" },
  { "id": "realisateur",         "name": "RÉALISATEUR",          "type": "section", "sectionId": "realisateur" },
  { "id": "auteur",              "name": "AUTEUR",               "type": "page",    "pageId": "auteur",    "hidden": true },
  { "id": "travailler-ensemble", "name": "TRAVAILLER ENSEMBLE",  "type": "page",    "pageId": "travailler-ensemble" },

  /* ── BOUTIQUE ── grille de vignettes (comme PHOTOGRAPHE/RÉALISATEUR) ── */
  { "id": "boutique",            "name": "BOUTIQUE",             "type": "section", "sectionId": "boutique" },
  { "id": "boutique-dk",         "name": "DUST'IN KOLOR",        "type": "link",    "url": "dustin-kolor/index.html", "hidden": true },
  { "id": "boutique-portrait",   "name": "SÉANCE PORTRAIT",      "type": "page",    "pageId": "contact",              "hidden": true },
  { "id": "boutique-projet",     "name": "ME PROPOSER UN PROJET","type": "page",    "pageId": "contact",              "hidden": true },

  { "id": "infos",               "name": "INFOS",                "type": "page",    "pageId": "infos" },

  /* ── Cachés ── */
  { "id": "post-production", "name": "POST-PRODUCTION", "type": "page",    "pageId": "post-production", "hidden": true },
  { "id": "films-player",    "name": "VOIR LES FILMS",  "type": "page",    "pageId": "films-player",    "hidden": true },
  { "id": "archives",        "name": "ARCHIVES",        "type": "gallery", "galleryId": "archives",     "hidden": true }
];

/* ─── SECTIONS CONFIG ────────────────────────────────────────── */
/* Cartes affichées dans la grille quand on clique sur une section */
const SECTIONS_CONFIG = {
    "photographe": {
        titleFr: "Photographe", titleEn: "Photographer",
        cards: [
            {
                id: "portrait", galleryId: "portrait",
                labelFr: "Studio · Terrain", labelEn: "Studio · Location",
                titleFr: "Portrait", titleEn: "Portrait",
                descFr: "Dirigeant, artiste, acteur, particulier",
                descEn: "Executive, artist, actor, individual",
                img: "images/portrait/conversation-02.jpg"
            },
            {
                id: "serie-expo", galleryId: "gem",
                labelFr: "Projet · Recherche", labelEn: "Project · Research",
                titleFr: "Série & Exposition", titleEn: "Series & Exhibition",
                descFr: "Projets photo documentaires et expositions",
                descEn: "Documentary photo projects and exhibitions",
                img: "images/gem/JeanFrancois.jpg"
            },
            {
                id: "gem", galleryId: "gem",
                labelFr: "Santé mentale · Morlaix", labelEn: "Mental health · Morlaix",
                titleFr: "GEM", titleEn: "GEM",
                descFr: "Grande Cause Nationale 2025",
                descEn: "Grande Cause Nationale 2025",
                img: "images/gem/JeanFrancois.jpg"
            },
            {
                id: "dustin-kolor-ph", url: "dustin-kolor/index.html",
                labelFr: "Burning Man · Nevada", labelEn: "Burning Man · Nevada",
                titleFr: "Dust'in Kolor", titleEn: "Dust'in Kolor",
                descFr: "Série chromatique · Tempêtes de sable",
                descEn: "Chromatic series · Sandstorms",
                img: "images/dustin-kolor/01.jpg"
            },
            {
                id: "plougasnou", url: "clients/plougasnou.html",
                labelFr: "Finistère · Bretagne", labelEn: "Finistère · Brittany",
                titleFr: "Plougasnou", titleEn: "Plougasnou",
                descFr: "Série documentaire · territoire",
                descEn: "Documentary series · territory",
                img: "images/ST MELAR/stmelar-1.jpg",
                _hiddenByAdmin: true
            },
            {
                id: "salarie-ehpad", galleryId: null,
                labelFr: "Immersion · Travail", labelEn: "Immersion · Work",
                titleFr: "Salarié EHPAD", titleEn: "Care home worker",
                descFr: "Le quotidien des soignants",
                descEn: "A caregiver's daily life",
                img: null
            },
            {
                id: "carre-das", galleryId: null,
                labelFr: "Projet · Série", labelEn: "Project · Series",
                titleFr: "Carré d'As", titleEn: "Carré d'As",
                descFr: "Série photographique",
                descEn: "Photography series",
                img: null
            },
            {
                id: "lumiere", galleryId: null,
                labelFr: "Recherche artistique", labelEn: "Artistic research",
                titleFr: "Lumière Lente", titleEn: "Slow Light",
                descFr: "Une esthétique en développement",
                descEn: "An aesthetic in development",
                img: null
            },
            {
                id: "plateau", galleryId: null,
                labelFr: "Cinéma · Théâtre", labelEn: "Cinema · Theatre",
                titleFr: "Shooting plateau & scène", titleEn: "On-set & stage",
                descFr: "Acteurs, équipes, making-of",
                descEn: "Actors, crews, making-of",
                img: null
            },
            {
                id: "immersion", galleryId: "studio",
                labelFr: "Documentaire", labelEn: "Documentary",
                titleFr: "Immersion", titleEn: "Immersion",
                descFr: "EHPAD, territoire, métier",
                descEn: "Care homes, territory, craft",
                img: "images/ST MELAR/stmelar-1.jpg"
            },
            {
                id: "st-melar", galleryId: "st-melar",
                labelFr: "Résidence · EHPAD Lanmeur", labelEn: "Residency · EHPAD Lanmeur",
                titleFr: "St Mélar", titleEn: "St Mélar",
                descFr: "Une semaine dans un EHPAD",
                descEn: "A week in a care home",
                img: "images/ST MELAR/stmelar-1.jpg"
            },
            {
                id: "burning-man", galleryId: null,
                labelFr: "Nevada · 2016", labelEn: "Nevada · 2016",
                titleFr: "Burning Man", titleEn: "Burning Man",
                descFr: "Désert du Nevada · Black Rock City",
                descEn: "Nevada desert · Black Rock City",
                img: "images/dustin-kolor/04.jpg"
            },
            {
                id: "gilmerton", url: "clients/gilmerton.html",
                labelFr: "Galerie client", labelEn: "Client gallery",
                titleFr: "Gilmerton", titleEn: "Gilmerton",
                descFr: "Remise de commande · accès protégé",
                descEn: "Order delivery · protected access",
                img: "https://api.pcloud.com/getpubthumb?code=kZo1EU5ZLLpXW8fr6xzJNJW0gPuU1B6fdsuy&fileid=88201126472&size=600x900&type=jpg"
            },
            {
                id: "leo-brasserie", url: "clients/leo-brasserie.html",
                labelFr: "Galerie client", labelEn: "Client gallery",
                titleFr: "Léo Brasserie", titleEn: "Léo Brasserie",
                descFr: "Remise de commande · accès protégé",
                descEn: "Order delivery · protected access",
                img: "https://api.pcloud.com/getpubthumb?code=kZQ1EU5ZzBL5BcesXwzTqgy0uauzhu35EtS7&fileid=88089443232&size=600x900&type=jpg"
            },
            {
                id: "grande-parade", url: "clients/grande-parade.html",
                labelFr: "Galerie client", labelEn: "Client gallery",
                titleFr: "Grande Parade", titleEn: "Grande Parade",
                descFr: "Galerie · accès protégé",
                descEn: "Gallery · protected access",
                img: "https://api.pcloud.com/getpubthumb?code=kZKq0A5ZaoFGv3YO4mQrFbQghpd6Tfw0CWgy&fileid=88890561791&size=600x900&type=jpg"
            }
        ]
    },
    "realisateur": {
        titleFr: "Réalisateur", titleEn: "Filmmaker",
        cards: [
            {
                id: "cinema", galleryId: "cinema",
                labelFr: "Fiction", labelEn: "Fiction",
                titleFr: "Cinéma", titleEn: "Cinema",
                descFr: "J'arrive · 40 festivals · 20 prix",
                descEn: "J'arrive · 40 festivals · 20 awards",
                img: "images/cinema/1.jpg"
            },
            {
                id: "television", galleryId: "television",
                labelFr: "Documentaire", labelEn: "Documentary",
                titleFr: "Télévision", titleEn: "Television",
                descFr: "France 2 · 13H15 · 20H30",
                descEn: "France 2 · 13H15 · 20H30",
                img: "images/Television/05.jpg"
            },
            {
                id: "portrait-invite", galleryId: "archives",
                labelFr: "Documentaire", labelEn: "Documentary",
                titleFr: "Portrait invité 20H30 France 2", titleEn: "Guest portrait France 2",
                descFr: "Jean Rochefort · Woody Allen · José Garcia",
                descEn: "Jean Rochefort · Woody Allen · José Garcia",
                img: "images/Television/06.jpg"
            },
            {
                id: "corporate", galleryId: "corporate",
                labelFr: "Entreprise · Web", labelEn: "Corporate · Web",
                titleFr: "Corporate & Web", titleEn: "Corporate & Web",
                descFr: "Ernest L'Hour · FIA · Monaco",
                descEn: "Ernest L'Hour · FIA · Monaco",
                img: "images/Television/02.jpg"
            }
        ]
    },

    "boutique": {
        titleFr: "Boutique", titleEn: "Shop",
        cards: [
            {
                id: "boutique-dk", url: "dustin-kolor/index.html",
                labelFr: "Tirages d'art numérotés", labelEn: "Limited edition prints",
                titleFr: "Dust'in Kolor", titleEn: "Dust'in Kolor",
                descFr: "7 œuvres · Édition limitée",
                descEn: "7 artworks · Limited edition",
                img: "images/dustin-kolor/01.jpg"
            },
            {
                id: "boutique-portrait", pageId: "contact",
                labelFr: "Sur rendez-vous", labelEn: "By appointment",
                titleFr: "Séance Portrait", titleEn: "Portrait Session",
                descFr: "Studio ou extérieur · Remise numérique",
                descEn: "Studio or outdoor · Digital delivery",
                img: "images/portrait/conversation-02.jpg"
            },
            {
                id: "boutique-studio-mobile", pageId: "contact",
                labelFr: "Sur site · Bretagne & Paris", labelEn: "On location",
                titleFr: "Studio Mobile", titleEn: "Mobile Studio",
                descFr: "Je viens chez vous avec mon équipement",
                descEn: "I come to you with my equipment",
                img: null
            },
            {
                id: "boutique-projet", pageId: "contact",
                labelFr: "Sur mesure", labelEn: "Custom project",
                titleFr: "Projet sur mesure", titleEn: "Custom Project",
                descFr: "Film, podcast, exposition, reportage",
                descEn: "Film, podcast, exhibition, reportage",
                img: null
            }
        ]
    }
};

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
                "titleFr": "Je fabrique des images,<br>je raconte des histoires,<br>parfois en même temps.",
                "titleEn": "I make images,<br>I tell stories,<br>sometimes at the same time.",
                "subtitleFr": "",
                "subtitleEn": "",
                "descFr": "",
                "descEn": "",
                "ctaLabel": "",
                "ctaUrl": "",
                "categoryFr": "Bertrand Basset · Carantec, Bretagne",
                "categoryEn": "Bertrand Basset · Carantec, Brittany",
                "sidebarFr": "",
                "sidebarEn": "",
                "noSidebarTitle": true
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
    function t(fr, en_) { return en ? en_ : fr; }

    /* ── LANDING ── */
    const landing = [
        '<div class="te-main" id="te-landing">',

        /* Manifeste */
        '<div class="te-hero">',
        '<p class="te-hero-line">' + t(
            "Vous avez une histoire \u00e0 raconter, des humains \u00e0 valoriser, des savoirs \u00e0 transmettre.",
            "You have a story to tell, people to highlight, knowledge to pass on."
        ) + '</p>',
        '<p class="te-hero-line">' + t(
            "\u00c7a fait 20 ans que mon m\u00e9tier est de vous aider \u00e0 le faire.",
            "For 20 years, my job has been to help you do that."
        ) + '</p>',
        '<p class="te-hero-line">' + t(
            "Dirigeant, b\u00e9n\u00e9vole, artiste ou grand-parent \u2014 peu importe qui vous \u00eates et ce que vous voulez raconter, je m\'adapte et je cr\u00e9e avec vous ce qui doit exister\u00a0: une photo, un film, un podcast.",
            "Business owner, volunteer, artist or grandparent \u2014 whoever you are and whatever you want to tell, I adapt and I create with you what needs to exist: a photo, a film, a podcast."
        ) + '</p>',
        '<p class="te-hero-regarde">' + t("Regardez.", "Watch.") + '</p>',
        '</div>',

        /* 2 vignettes */
        '<div class="te-grid">',

        /* Vignette 1 — Archiver votre mémoire */
        '<div class="te-card" onclick="window._teShowCarton(\'memoire\')">',
        '<div class="te-card-img-wrap"><img class="te-card-img" src="images/Television/02.jpg" alt="" loading="lazy"></div>',
        '<div class="te-card-body">',
        '<div class="te-card-label">' + t("M\u00e9moire \u00b7 Transmission \u00b7 Archives", "Memory \u00b7 Archives \u00b7 Podcast") + '</div>',
        '<div class="te-card-title">' + t("Archiver votre m\u00e9moire", "Archive your memory") + '</div>',
        '<div class="te-card-desc">' + t("Pour les familles, les entreprises ou les institutions et associations.", "For families, companies, institutions and associations.") + '</div>',
        '</div></div>',

        /* Vignette 2 — Fiction */
        '<div class="te-card" onclick="window._teShowCarton(\'fiction\')">',
        '<div class="te-card-img-wrap"><img class="te-card-img" src="https://img.youtube.com/vi/O5iTddsVMyA/maxresdefault.jpg" alt="" loading="lazy"></div>',
        '<div class="te-card-body">',
        '<div class="te-card-label">' + t("Film \u00b7 Sc\u00e9nario \u00b7 Production", "Film \u00b7 Script \u00b7 Production") + '</div>',
        '<div class="te-card-title">' + t("Mettez de la fiction dans votre communication", "Put fiction in your communication") + '</div>',
        '<div class="te-card-desc">' + t("Pour votre film de communication.", "For your communication film.") + '</div>',
        '</div></div>',

        '</div>',

        /* Sur-mesure — sous les vignettes, même police que le manifeste */
        '<div class="te-hero" style="margin-top:3rem;margin-bottom:2rem">',
        '<p class="te-hero-line">' + t(
            "Pour chaque projet qu\'on me confie, j\'invente une solution nouvelle. Jamais je ne reproduis une recette toute faite. Je co-construis avec vous la solution qui convient \u00e0 votre probl\u00e8me.",
            "For every project I take on, I invent a new solution. I never reproduce a ready-made recipe. I co-build with you the solution that fits your problem."
        ) + '</p>',
        '<p class="te-hero-line">' + t(
            "Si on travaille ensemble, vous n\'achetez pas une solution \u2014 vous achetez une cr\u00e9ation sur mesure.",
            "If we work together, you're not buying a solution \u2014 you're buying a bespoke creation."
        ) + '</p>',
        '<a class="te-hero-cta" href="mailto:bertrand.basset@gmail.com">' + t("Parlons de votre projet \u2192", "Talk about your project \u2192") + '</a>',
        '</div>',

        '</div>'
    ].join('');

    /* ── CARTON 1 : Archiver votre mémoire ── */
    const cartonMemoire = [
        '<div class="te-carton" id="te-carton-memoire">',
        '<div class="te-carton-scroll">',
        '<button class="te-back" onclick="window._teShowMain()">&larr; ' + t("Travailler ensemble", "Back") + '</button>',
        '<div class="te-carton-label">' + t("M\u00e9moire \u00b7 Transmission \u00b7 Archives", "Memory \u00b7 Archives \u00b7 Podcast") + '</div>',
        '<div class="te-carton-title">' + t("Archiver votre m\u00e9moire", "Archive your memory") + '</div>',
        '<div class="te-carton-accroche">' + t("Pour les familles, les entreprises ou les institutions et associations.", "For families, companies, institutions and associations.") + '</div>',
        '<div class="te-carton-keywords">' + t("Grands entretiens \u00b7 films d\'archives \u00b7 pour familles, entreprises, institutions, associations", "Major interviews \u00b7 archive films \u00b7 for families, companies, institutions, associations") + '</div>',
        '<div class="te-video-ratio" style="margin:2rem 0">',
        '<iframe src="https://player.vimeo.com/video/1192293542?h=57b7d733e5&color=fafafa&byline=0&portrait=0&title=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>',
        '</div>',
        '<p class="te-video-caption">Ernest L\'hour, dernier go\u00e9monier \u2014 Mus\u00e9e de la Mer de Carantec</p>',
        '<div class="te-carton-refs">Ernest L\'hour \u00b7 Jean Rochefort, France 2 \u00b7 L\u00e9on Gautier, Commando Kieffer</div>',
        '<a class="te-cta" href="mailto:bertrand.basset@gmail.com">' + t("Vous avez une m\u00e9moire \u00e0 pr\u00e9server, un t\u00e9moignage \u00e0 recueillir avant qu\'il soit trop tard\u00a0? \u2192", "You have a memory to preserve, a testimony to collect before it\'s too late? \u2192") + '</a>',
        '</div></div>'
    ].join('');

    /* ── CARTON 2 : Fiction ── */
    const cartonFiction = [
        '<div class="te-carton" id="te-carton-fiction">',
        '<div class="te-carton-scroll">',
        '<button class="te-back" onclick="window._teShowMain()">&larr; ' + t("Travailler ensemble", "Back") + '</button>',
        '<div class="te-carton-label">' + t("Film \u00b7 Sc\u00e9nario \u00b7 Production", "Film \u00b7 Script \u00b7 Production") + '</div>',
        '<div class="te-carton-title">' + t("Mettez de la fiction dans votre communication", "Put fiction in your communication") + '</div>',
        '<div class="te-carton-accroche">' + t("Pour votre film de communication.", "For your communication film.") + '</div>',
        '<div class="te-carton-keywords">' + t("Production \u00b7 sc\u00e9nario \u00b7 tournage \u00b7 post-production cin\u00e9ma \u00b7 pour votre film de communication", "Production \u00b7 script \u00b7 shooting \u00b7 cinema post-production \u00b7 for your communication film") + '</div>',
        '<div class="te-video-ratio" style="margin:2rem 0;background:#000">',
        '<iframe src="https://www.youtube.com/embed/O5iTddsVMyA?rel=0&modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '</div>',
        '<p class="te-video-caption">Tourisme Western Mont d\'Arr\u00e9e</p>',
        '<div class="te-carton-refs">Tourisme Western Mont d\'Arr\u00e9e \u00b7 J\'arrive (40 festivals, 20 prix) \u00b7 FIA 100 ans</div>',
        '<a class="te-cta" href="mailto:bertrand.basset@gmail.com">' + t("Vous voulez un film de communication qui ne ressemble pas \u00e0 un film de communication\u00a0? \u2192", "You want a film that doesn\'t look like a corporate film? \u2192") + '</a>',
        '</div></div>'
    ].join('');

    window._teShowCarton = function(id) {
        var landing = document.getElementById('te-landing');
        if (landing) landing.style.display = 'none';
        document.querySelectorAll('.te-carton').forEach(function(el) { el.classList.remove('visible'); });
        var carton = document.getElementById('te-carton-' + id);
        if (carton) carton.classList.add('visible');
    };
    window._teShowMain = function() {
        document.querySelectorAll('.te-carton').forEach(function(el) { el.classList.remove('visible'); });
        var landing = document.getElementById('te-landing');
        if (landing) landing.style.display = '';
    };

    return landing + cartonMemoire + cartonFiction;
}
function buildContactPage(lang) {
    const t  = T[lang];
    const en = lang === 'en';
    return `
        <div class="page-text">
            <div class="page-section">
                <h2>${t.form_title}</h2>
                <p>${en
                  ? 'Executive, artist, child or grandparent — give yourself a portrait session of at least one hour, a moment of meeting and conversation that puts you in the spotlight. 5 retouched digital photos and an A4 fine art print included. Taking the time and receiving something tangible has become a luxury you can afford.'
                  : 'Dirigeant, artiste, enfant ou grand-parent — offrez-vous une séance portrait d\'une heure minimum, un temps de rencontre et de conversation qui vous met en valeur. 5 photos numériques retouchées, un tirage A4 sur papier fine art compris. Prendre le temps et recevoir un objet concret, c\'est devenu un luxe que vous pouvez vous offrir.'
                }</p>
                <form class="contact-form" onsubmit="portfolio.submitContact(event)">
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
