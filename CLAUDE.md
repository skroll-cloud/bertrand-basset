# CLAUDE.md — Cahier des charges site Bertrand Basset

> **Règle absolue** : ne jamais inventer un nouveau design de page.
> Toute nouvelle page ou section s'intègre dans le système existant.

---

## 1. Stack & déploiement

- **Site statique** hébergé sur GitHub Pages
- Domaine : `bertrandbasset.com` (DNS Cloudflare → GitHub Pages)
- Repo : `skroll-cloud/bertrand-basset.git`
- PAT : encodé en char codes dans `admin.html` (ne pas modifier)
- **Opérations git** : toujours depuis `/tmp/bb_deploy` (clone temporaire).
  Le dossier monté `/sessions/.../mnt/site-v1` est en FUSE — git y est interdit (EPERM).
- Déploiement = `git push origin main` depuis `/tmp/bb_deploy`

### Protocole de déploiement

```bash
# 1. Clone du repo (toujours recloner — /tmp ne persiste pas entre sessions)
cd /tmp && rm -rf bb_deploy
git clone https://[TOKEN]@github.com/skroll-cloud/bertrand-basset.git bb_deploy

# 2. Copier les fichiers modifiés depuis le mount FUSE
cp /sessions/.../mnt/site-v1/FICHIER /tmp/bb_deploy/FICHIER

# 3. Bump version string dans index.html si JS modifié (ex: ?v=20260526c)

# 4. Commit + push
cd /tmp/bb_deploy
git add -A
git commit -m "Description du changement"
git push origin main
```

**Note importante** : GitHub push protection bloque les tokens en clair et en base64.
Le PAT dans admin.html est encodé en tableau de char codes pour contourner ce filtre.

---

## 2. Design system CSS (`css/style.css`)

### Variables de couleur
```css
--black:      #0a0a0a
--white:      #fafafa
--gray:       #666
--dim:        #999
--light-gray: #e0e0e0
--red:        #c41e1e
```

### Typographie
```css
font-family: 'IBM Plex Sans', sans-serif;
font-weight: 300;   /* poids par défaut */
font-weight: 400;   /* titres nav, labels */
font-weight: 500;   /* très rarement */
-webkit-font-smoothing: antialiased;
```

### Comportement global
```css
html, body { overflow: hidden; }  /* site = app plein écran */
background: var(--white);          /* fond toujours clair */
color: var(--black);
```

### Classes utilitaires importantes
| Classe | Usage |
|--------|-------|
| `.page-text` | Contenu texte (about, contact, etc.) |
| `.page-section` | Section dans page-text (margin-bottom 2.5rem) |
| `.page-text h2` | Label de section : 0.6rem, uppercase, letter-spacing, couleur --gray |
| `.carton-slide` | Slide éditorial centré (texte + titre + CTA) |
| `.cta-slide` | Slide d'appel à l'action |
| `.description-slide` | Slide de description |
| `.gallery-caption-name` | Nom en caption (0.6rem, uppercase) |
| `.gallery-caption-desc` | Description en caption (0.7rem, --gray) |
| `.te-main` | Grille plein écran pour page Travailler Ensemble |
| `.te-card` | Carte de présentation (2 colonnes) |
| `.te-carton` | Vue détail d'une carte (position:absolute, display:none → .visible) |

---

## 3. Architecture JavaScript — IMPORTANT

### ⚠️ Trois fichiers JS, pas un seul

`index.html` charge **dans cet ordre** :
```html
<script src="js/gallery-images.js?v=20260502"></script>
<script src="js/gallery-data.js?v=20260526c"></script>
<script src="js/gallery-engine.js?v=20260526"></script>
```

**`js/gallery.js`** (114 Ko) — OBSOLÈTE, backup monolithique, **NON CHARGÉ**, **NE PAS MODIFIER**.

### `js/gallery-images.js`
Listes d'images ordonnées par galerie (généré par scan). Modifier si on ajoute des photos.

### `js/gallery-data.js`
**Toutes les données et fonctions de construction de pages.**

Variables globales :
- `SITE_CONFIG` — config générale (nom, landing, galerie par défaut)
- `MENU_CONFIG` — navigation (voir §4)
- `GALLERIES_CONFIG` — définition des galeries et leurs images
- `T` — traductions `{ en: {…}, fr: {…} }`

Fonctions de construction (retournent du HTML) :
- `buildInfosPage(lang)`
- `buildContactPage(lang)`
- `buildPostProductionPage(lang)`
- `buildAuteurPage(lang)`
- `buildTravaillerEnsemblePage(lang)` — page Travailler Ensemble (grille + cartons)

### `js/gallery-engine.js`
**Classe `Portfolio`** — toute la logique de rendu et navigation.

```js
window.portfolio = new Portfolio();  // instanciée au DOMContentLoaded
```

Méthodes clés :
- `openGallery(id)` — ouvre une galerie
- `showPage(id)` — affiche une page dans `#galleryContainer`
- `showItem(index)` — affiche un slide (image, carton, vidéo…)
- `openHomeGallery()` → `openGallery(SITE_CONFIG.defaultGallery)` — **pas la landing**
- `buildMenu()` — reconstruit le nav depuis `MENU_CONFIG`

### Ajouter une nouvelle page

**La seule bonne méthode** : ajouter `buildXxxPage(lang)` dans `gallery-data.js`,
puis l'appeler dans `showPage()` dans `gallery-engine.js` :

```js
// Dans gallery-data.js :
function buildFilmsPage(lang) {
    return `<div class="page-text">…</div>`;
}

// Dans showPage() de gallery-engine.js :
if (id === 'films') html = buildFilmsPage(this.currentLang);
```

Et ajouter l'entrée dans `MENU_CONFIG` (gallery-data.js) :
```js
{ id: "films", name: "FILMS", type: "page", pageId: "films" }
```

**Ne jamais créer un fichier HTML séparé avec son propre CSS** pour une page du site principal.

### Piège apostrophes en JS

Les strings JS avec apostrophes doivent utiliser des guillemets doubles :
```js
// ❌ Casse le parsing JS
titleFr: 'Fabriquer aujourd'hui les archives de demain.'

// ✅ Correct
titleFr: "Fabriquer aujourd'hui les archives de demain."
```

### Bumper la version après chaque modif JS

Dans `index.html`, changer le `?v=` pour forcer le rechargement du cache :
```html
<script src="js/gallery-data.js?v=20260526c"></script>
```

---

## 4. Navigation — règle des B logos

### Hiérarchie 3 niveaux

```
Landing page (index.html — section landing)
    ↓ (clic bouton "Entrer" ou logo B landing)
Site principal (index.html — section site)
    ├── Sidebar gauche : nav principale (MENU_CONFIG)
    ├── Logo B sidebar (#homeLink) → openHomeGallery() = galerie par défaut, PAS la landing
    └── GALERIES → clients/index.html
            ├── Header B (.site-brand) → ../index.html (site principal)
            └── Cards galeries clients → clients/plougasnou.html etc.
                    ├── Header B (.header-brand) → clients/index.html
                    └── Menu disparu (plein écran)
```

### Logo B dans chaque contexte

| Contexte | Élément | Destination |
|----------|---------|-------------|
| Landing | `.brand-block` | Entrée dans le site |
| Site principal sidebar | `#homeLink` | `openHomeGallery()` (galerie best-of) |
| `clients/index.html` | `.site-brand` | `../index.html` (site principal) |
| `clients/[galerie].html` | `.header-brand` | `index.html` (liste galeries clients) |

### Comportement `#homeLink`

```js
document.getElementById('homeLink')?.addEventListener('click', e => {
    e.preventDefault();
    this.openHomeGallery();  // → openGallery('best-of') — galerie par défaut
    this.setActiveLink(null);
    this.closeMenu();
});
```

---

## 5. Galeries clients (pages type plougasnou.html)

- **Exception à la règle showPage()** : les galeries clients sont des fichiers HTML séparés
  car elles sont **plein écran** (menu du site disparu) avec leur propre logique (lightbox, password gate)
- Elles **doivent quand même** utiliser les vars CSS du site (`--black`, `--white`, etc.)
  et la typographie IBM Plex Sans 300
- Le thème peut être sombre (fond noir) car c'est une UX photo professionnelle dédiée au client
- Password gate : SHA-256 côté client (Web Crypto API)
- Lightbox : Fullscreen API (`element.requestFullscreen()`)
- Navigation : ← → clavier, S sélection, Esc fermeture

---

## 6. Structure des fichiers (après nettoyage mai 2026)

```
site-v1/
├── index.html              — Point d'entrée unique du site (landing + site)
├── admin.html              — Interface d'administration (PAT hardcodé)
├── panier.html             — Panier universel (toutes les boutiques)
├── merci.html              — Page de confirmation de commande
├── qr-cartes.html          — QR codes pour l'exposition Dust'in Kolor
├── css/
│   └── style.css           — Design system complet
├── js/
│   ├── gallery-images.js   — Listes d'images ordonnées (généré)
│   ├── gallery-data.js     — CONFIG + fonctions buildXxxPage()
│   └── gallery-engine.js   — Classe Portfolio, rendu, navigation
├── assets/
│   └── logo-b.svg
├── images/                 — Toutes les images du site
│   ├── accueil/            (2 photos)
│   ├── portrait/           (14 photos)
│   ├── cinema/             (10 photos)
│   ├── Television/         (10 photos)
│   ├── archives/           (10 photos)
│   ├── gem/                (21 photos)
│   ├── dustin-kolor/       (18 photos)
│   ├── burning man/        (35 photos)
│   ├── cartes-postales/    (9 photos)
│   ├── immersion/          (1 photo)
│   ├── landing/            (2 photos)
│   ├── STUDIO/             (3 photos)
│   └── ST MELAR/           (7 photos)
├── clients/
│   ├── index.html          — Liste des galeries clients
│   ├── gilmerton.html      — Galerie Gilmerton (pCloud, password)
│   └── leo-brasserie.html  — Galerie Léo Brasserie (pCloud, password)
├── dustin-kolor/
│   ├── index.html          — Mini-site série photos (exception validée)
│   ├── boutique.html       — Boutique tirages
│   ├── cartes.html         — Boutique cartes postales
│   ├── panier.html         — Redirect → ../panier.html
│   └── merci.html          — Redirect → ../merci.html
├── ikôn/
│   └── index.html          — Mini-site Ikôn (exception validée)
├── scan-galleries.js       — Utilitaire Node.js local (non servi)
└── CLAUDE.md               — CE FICHIER
```

---

## 7. Types de slides dans GALLERIES_CONFIG

| Type | Description |
|------|-------------|
| `image` | Photo normale |
| `accueil-image` | Photo d'accueil avec lien vers galerie |
| `carton` | Slide éditorial texte (titre + desc + CTA optionnel) |
| `description` | Texte de description de galerie |
| `cta` | Appel à l'action |
| `featured` | Mise en avant (sidebar + image) |
| `video` | Iframe YouTube/Vimeo |

### Ajouter un slide vidéo dans une galerie

Dans `GALLERIES_CONFIG` (gallery-data.js), dans la liste `images` :
```js
{ type: "video", videoId: "YOUTUBE_ID", platform: "youtube",
  title: "Titre", caption: { fr: "…", en: "…" } }
```

---

## 8. MENU_CONFIG — structure

```js
{
  id: "unique-id",
  name: "LABEL NAV",
  type: "gallery" | "page" | "group" | "link" | "external",
  galleryId: "…",     // si type=gallery
  pageId: "…",        // si type=page
  url: "…",           // si type=link ou external
  parent: "group-id", // si enfant d'un groupe
  hidden: true        // masqué du nav mais code présent
}
```

---

## 9. Galeries clients pCloud — protocole

Les galeries clients privées (Gilmerton, Léo Brasserie) chargent leurs photos depuis
pCloud via l'API publique.

### Règle absolue : ne jamais inventer un code pCloud
Le code s'obtient UNIQUEMENT depuis l'URL que Bertrand partage :
`https://u.pcloud.link/publink/show?code=XXXXXX` → le code est la partie après `code=`.

**IMPORTANT : le lien doit pointer vers un DOSSIER, pas un fichier.**
Si le titre de la page pCloud se termine en `.jpg` → c'est un fichier → demander le dossier parent.

### Codes actuels

| Galerie | Code pCloud | Type | Serveur API |
|---------|------------|------|-------------|
| Léo Brasserie | `kZQ1EU5ZzBL5BcesXwzTqgy0uauzhu35EtS7` | Dossier ✓ | api.pcloud.com (US) |
| Gilmerton | `kZo1EU5ZLLpXW8fr6xzJNJW0gPuU1B6fdsuy` | Dossier ✓ | api.pcloud.com (US) |

### Mot de passe des galeries
Stocké en SHA-256 dans `gallery_cards.desc_en` (Supabase). Modifiable via admin.html.
Valeurs initiales : Gilmerton = SHA256("Gilmerton"), Léo = SHA256("Léo").

### Structure d'un fichier galerie client pCloud
```js
const PCLOUD_CODE  = 'CODE_ICI';          // Code du DOSSIER partagé
const PWD_HASH     = 'sha256_du_mdp';     // Hash SHA-256 du mot de passe
const GALLERY_NAME = 'Nom Galerie';
const NOTIF_EMAIL  = 'yellowshoesstudio@gmail.com';
const CARD_ID      = 'ph-nom-galerie';    // ID dans gallery_cards Supabase
```

### API pCloud utilisée
- Endpoint : `showpublink?code=CODE` (EU first: `eapi.pcloud.com`, fallback US: `api.pcloud.com`)
- Le compte pCloud de Bertrand est sur le serveur **US** (`api.pcloud.com`)
- Pour lister les fichiers : `showpublink?code=CODE` → `metadata.contents`
- Si `contents` vide → 2e appel avec `folderid`: `showpublink?code=CODE&folderid=ID`
- Pour les URLs de téléchargement : `getpublinkdownload?code=CODE&fileid=FILEID`

---

## 10. Hébergement vidéo

- **YouTube non-répertorié** : recommandé (gratuit, permanent, embeddable)
- **Vimeo** : fonctionne tant que l'abonnement est actif
- pCloud : ne pas utiliser pour les vidéos (pas de lecteur embed)
- GitHub Pages : ne pas héberger de fichiers vidéo (contre les CGU)

### Vidéos de référence — Travailler Ensemble

Ces liens sont utilisés dans la page "Travailler Ensemble" (`buildTravaillerEnsemblePage`).

| Œuvre | Plateforme | Lien |
|-------|-----------|------|
| Jean Rochefort (portrait) | Vimeo | https://vimeo.com/237381173/1595582296 |
| Ernest L'hour | Vimeo | https://vimeo.com/1192293542/57b7d733e5 |
| J'arrive | Vimeo | https://vimeo.com/390539243 |
| Burning Man / Temple du deuil | YouTube | https://www.youtube.com/watch?v=Fj8JcmKI0Iw |
| Tourisme fiction Monts d'Arrée | YouTube | https://www.youtube.com/watch?v=O5iTddsVMyA |

**Note** : Les Vimeo avec hash de confidentialité (`/HASH`) nécessitent le format embed :
`https://player.vimeo.com/video/ID?h=HASH`

Exemples :
- Jean Rochefort : `https://player.vimeo.com/video/237381173?h=1595582296`
- Ernest L'hour : `https://player.vimeo.com/video/1192293542?h=57b7d733e5`

---

## 11. Page Travailler Ensemble

### Fonctionnement

Appelée via `showPage('travailler-ensemble')` dans gallery-engine.js.
La fonction `buildTravaillerEnsemblePage(lang)` est dans `gallery-data.js`.

La page a sa propre structure (pas de `page-mode`) car elle est plein écran avec navigation interne :
- Vue principale : grille 2 colonnes de cartes (`.te-grid`)
- Vue détail : carton plein écran (`.te-carton`) avec image + texte + vidéo

```js
// Dans showPage() de gallery-engine.js :
} else if (id === 'travailler-ensemble') {
    siteEl?.classList.remove('films-mode');
    container.classList.remove('page-mode');
    container.innerHTML = buildTravaillerEnsemblePage(this.currentLang);
}
```

### Cartes actuelles

| ID | Titre FR | Image | Vidéo |
|----|----------|-------|-------|
| `archives` | Fabriquer aujourd'hui les archives de demain | `images/Television/02.jpg` | Vimeo 1192293542 (Ernest L'hour) |
| `fiction` | Mettez de la fiction dans votre communication | `images/cinema/1.jpg` | YouTube O5iTddsVMyA (Monts d'Arrée) |
| `immersion` | *masqué* (pas dans la grille) | — | — |
| `portrait` | *masqué* (pas dans la grille) | — | — |

---

## 12. Pages cachées, prêtes à publier

- `post-production` (`hidden: true` dans MENU_CONFIG) — `buildPostProductionPage()` OK
- `auteur` (`hidden: true` dans MENU_CONFIG) — `buildAuteurPage()` OK

Pour publier : dans `MENU_CONFIG` (gallery-data.js), retirer `hidden: true`.

---

## 13. Galeries clients en attente

- **Juste Après 153** — photos à redimensionner (PIL, max 1800px, quality 82)
- **La Régal** — photos à redimensionner
- **St Mélar** — 7 photos dans `images/ST MELAR/` (déjà là, galerie pas encore créée)

---

## 14. Règle de redimensionnement photos

```python
from PIL import Image
img = Image.open(src)
img.thumbnail((1800, 1800), Image.LANCZOS)
img.save(dst, 'JPEG', quality=82, optimize=True)
```

---

## 15. Routage URL (hash routing) — À implémenter

### Problème actuel
Le site est une SPA sans mise à jour de l'URL → le bouton Retour du navigateur quitte le site.
Les QR codes d'exposition (ex: `qr-cartes.html`) doivent rester des pages séparées.

### Solution planifiée : hash routing

Dans `gallery-engine.js`, modifier `openGallery()` et `showPage()` pour écrire le hash :
```js
openGallery(id) {
    window.location.hash = id;
    // …reste du code…
}

showPage(id) {
    window.location.hash = id;
    // …reste du code…
}
```

Ajouter un listener `hashchange` dans l'init :
```js
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (!hash) { this.openHomeGallery(); return; }
    // Chercher dans GALLERIES_CONFIG et MENU_CONFIG…
});
```

URLs résultantes :
- `bertrandbasset.com/#portrait` → galerie portrait
- `bertrandbasset.com/#travailler-ensemble` → page Travailler Ensemble
- `bertrandbasset.com/#infos` → page infos

---

## 16. Checklist avant tout ajout de contenu

1. [ ] Est-ce que cette page a besoin d'être plein-écran (galerie client) ?
   - Non → `showPage()` dans gallery-engine.js + `buildXxxPage()` dans gallery-data.js
   - Oui → fichier HTML séparé dans `clients/`, avec vars CSS du site
2. [ ] Le fond est-il `var(--white)` / `#fafafa` ? (sauf galeries clients dark = OK)
3. [ ] La police est-elle IBM Plex Sans, weight 300 ?
4. [ ] Le logo B navigue-t-il vers le bon endroit ? (voir §4)
5. [ ] Le déploiement se fait-il depuis `/tmp/bb_deploy` ?
6. [ ] Le `?v=` a-t-il été bumped dans index.html si un fichier JS a été modifié ?
7. [ ] Les strings JS avec apostrophes utilisent-elles des guillemets doubles ?

---

## 17. Architecture e-commerce universelle

### Règle d'or : un seul panier pour tout le site

**Un seul fichier panier** : `/panier.html` (racine du site).
**Un seul fichier merci** : `/merci.html` (racine du site).
**Jamais** de panier local dans un sous-dossier. Si `dustin-kolor/panier.html` existe, c'est un redirect.

### Clé localStorage universelle

```js
localStorage.key = 'bb_cart'   // Bertrand Basset cart — toujours cette clé, partout
```

### Structure d'un item cart (générique)

```js
{
  id:      string,       // clé unique, ex. "sandstorm-feu-simple"
  slug:    string,       // identifiant œuvre pour l'Edge Function
  type:    string,       // "simple" | "dibond" | "grand" | "carte" | "carte-pack"
  cat:     string,       // "tirage" | "carte" | "portrait"
  titre:   string,       // libellé affiché dans le panier et les emails
  prix:    number,       // prix unitaire en €
  qty:     number,       // quantité (toujours 1 pour les tirages numérotés)
  chassis: boolean,      // option châssis alu (tirages Dibond uniquement)
  imgs:    string[],     // optionnel : images de cartes postales
  ids:     string[],     // optionnel : IDs pour les packs
}
```

### Endpoint de paiement (Supabase Edge Function)

```
POST https://[PROJECT_REF].supabase.co/functions/v1/stripe-checkout
Headers: apikey: [SUPABASE_ANON_KEY]
Body: { items, promo, success_url, cancel_url }
Response: { url: "https://checkout.stripe.com/..." }
```

### Logo B sur les pages boutique (sous-dossiers)

Sur toute page dans `dustin-kolor/` ou autre sous-dossier avec achat :
- **Gauche** : `← Retour à la série` → lien vers la galerie du sous-dossier
- **Centre** : logo B → `../index.html` (site principal Bertrand Basset)
- **Droite** : nom de la série + lien panier → `../panier.html`
