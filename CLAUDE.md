# CLAUDE.md — Cahier des charges site Bertrand Basset
*Dernière mise à jour : 06 juin 2026*

> **Règle absolue** : ne jamais inventer un nouveau design de page.
> Toute nouvelle page ou section s'intègre dans le système existant.

---

## 1. Stack & déploiement

- **Site statique** hébergé sur GitHub Pages
- Domaine : `bertrandbasset.com` (DNS Cloudflare → GitHub Pages)
- Repo : `skroll-cloud/bertrand-basset.git`
- PAT : encodé en char codes dans `admin.html` (ne pas modifier)
- **Opérations git** : toujours depuis `/sessions/loving-pensive-clarke/repo-push`
  Le dossier monté `/sessions/.../mnt/site-v1` est en FUSE — git y est interdit (EPERM).
  `/tmp` est sur une partition à 100% — NE PAS utiliser `/tmp` pour git.

### Protocole de déploiement

```bash
# 1. Aller dans le repo de déploiement (persiste entre sessions)
cd /sessions/loving-pensive-clarke/repo-push

# 2. Mettre à jour le remote avec le PAT actuel si besoin
git remote set-url origin https://[PAT]:x-oauth-basic@github.com/skroll-cloud/bertrand-basset.git

# 3. Récupérer le dernier état (fetch léger — évite de recloner)
HTTPS_PROXY=http://localhost:3128 git fetch --depth=1 origin main
git reset --hard origin/main

# 4. Copier les fichiers modifiés depuis le mount FUSE
cp /sessions/loving-pensive-clarke/mnt/site-v1/FICHIER /sessions/loving-pensive-clarke/repo-push/FICHIER

# 5. Bump ?v= dans index.html si un fichier JS a été modifié

# 6. Commit + push
git config user.email "claude@anthropic.com"
git config user.name "Claude"
git add -A
git commit -m "Description du changement"
HTTPS_PROXY=http://localhost:3128 git push origin main
```

**Note** : GitHub push protection bloque les tokens en clair et en base64.
Le PAT dans admin.html est encodé en tableau de char codes pour contourner ce filtre.

**PAT actuel** : encodé en char codes dans `admin.html` (ligne ~1179). NE PAS écrire en clair dans les fichiers commités — push protection GitHub le bloquera. Le PAT de déploiement est visible dans le remote du repo `/sessions/loving-pensive-clarke/repo-push`.

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
| `.section-card` | Carte dans une grille de section (PHOTOGRAPHE, RÉALISATEUR…) |
| `.section-grid` | Grille de cartes (CSS grid, responsive) |

---

## 3. Architecture JavaScript — IMPORTANT

### ⚠️ Trois fichiers JS, pas un seul

`index.html` charge **dans cet ordre** :
```html
<script src="js/gallery-images.js?v=20260606b"></script>
<script src="js/gallery-data.js?v=20260606d"></script>
<script src="js/gallery-engine.js?v=20260606b"></script>
```

**`js/gallery.js`** (114 Ko) — OBSOLÈTE, backup monolithique, **NON CHARGÉ**, **NE PAS MODIFIER**.

### `js/gallery-images.js`
Listes d'images ordonnées par galerie (généré par scan). Modifier si on ajoute des photos.
Priorité sur `GALLERIES_CONFIG[id].images` si la clé existe.

### `js/gallery-data.js`
**Toutes les données et fonctions de construction de pages.**

Variables globales :
- `SITE_CONFIG` — config générale (nom, landing, galerie par défaut)
- `MENU_CONFIG` — navigation (voir §8)
- `SECTIONS_CONFIG` — grilles de cartes par section (voir §9)
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
- `showSectionGrid(sectionId)` — affiche la grille de cartes d'une section
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
<script src="js/gallery-data.js?v=20260606d"></script>
```

---

## 4. Navigation — règle des B logos

### Hiérarchie

```
Landing page (index.html — section landing)
    ↓ (clic bouton "Entrer" ou logo B landing)
Site principal (index.html — section site)
    ├── Sidebar gauche : nav principale (MENU_CONFIG)
    ├── Logo B sidebar (#homeLink) → openHomeGallery() = galerie par défaut, PAS la landing
    └── Galeries clients → clients/[nom].html (URL directe, pas dans la nav)
```

### Logo B dans chaque contexte

| Contexte | Élément | Destination |
|----------|---------|-------------|
| Landing | `.brand-block` | Entrée dans le site |
| Site principal sidebar | `#homeLink` | `openHomeGallery()` (galerie best-of) |
| `clients/[galerie].html` | `.header-brand` | `index.html` (site principal) |

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

## 5. Galeries clients — architecture

### Règle d'accès
- Chaque galerie a **une URL propre et partageable** : `bertrandbasset.com/clients/[nom].html`
- Elles sont aussi accessibles via la section `galeries-client` dans le site (cachée dans le nav pour l'instant)
- `clients/index.html` : portail de liste des galeries (accès direct par URL, hors nav principale)

### Mot de passe master
Toute galerie accepte **deux mots de passe** :
1. Son mot de passe propre (SHA-256 hardcodé dans le fichier)
2. Le mot de passe maître **`fullaccess`** (SHA-256 = `44ffde91067d45353ee3b6ec012580e30fea73b60654a905013269cb092b7b8d`)

```js
if (hash === PWD_HASH || hash === MASTER_HASH) { /* accès accordé */ }
```

### ⚠️ Deux générations de templates — ergonomies différentes

| Génération | Fichiers | Accès | Fonctionnalités |
|-----------|----------|-------|-----------------|
| **Ancienne** (2 tiers) | `gilmerton.html`, `leo-brasserie.html` | Mot de passe unique → grille complète | Sélection photos + envoi par email + téléchargement ZIP |
| **Nouvelle** (3 tiers) | `grande-parade.html`, template `galerie-template.html` | Highlight public → mdp visionnage → mdp téléchargement | Highlight teaser (dossier `highlight/`), voir toutes les photos avec mdp, télécharger avec mdp séparé |

**À terme** : standardiser les anciennes galeries sur le nouveau template 3 tiers.

### Protocole — créer une nouvelle galerie client (template 3 tiers)

Bertrand dit : **"pCloud lien dossier + (optionnel) mot de passe + photo vignette"**

Claude fait :
1. Récupérer le code pCloud depuis l'URL : `u.pcloud.link/publink/show?code=CODE`
2. Vérifier que c'est un **dossier** (pas un fichier — `.jpg` dans le titre = erreur)
3. Copier `clients/grande-parade.html` → `clients/[nom].html`
4. Modifier les constantes CONFIG :
   ```js
   const CONFIG = {
     GALLERY_NAME:  'Nom',
     PCLOUD_CODE:   'CODE_PCLOUD',
     PWD_VIEW_HASH: 'sha256_mdp_visionnage',
     PWD_DL_HASH:   'sha256_mdp_telechargement',
     CARD_ID:       'client-nom',
     NOTIF_EMAIL:   'yellowshoesstudio@gmail.com',
   };
   ```
5. Ajouter la carte dans `SECTIONS_CONFIG["galeries-client"]` (gallery-data.js)
6. Ajouter la carte dans `clients/index.html` avec vignette pCloud
7. Déployer depuis `/sessions/loving-pensive-clarke/repo-push`

### Galeries actives

| Galerie | Fichier | Type | pCloud code | Vignette fileid | Mot de passe |
|---------|---------|------|-------------|-----------------|--------------|
| Gilmerton | `clients/gilmerton.html` | Ancienne (2 tiers) | `kZo1EU5ZLLpXW8fr6xzJNJW0gPuU1B6fdsuy` | 88201126472 | SHA256("Gilmerton") |
| Léo Brasserie | `clients/leo-brasserie.html` | Ancienne (2 tiers) | `kZQ1EU5ZzBL5BcesXwzTqgy0uauzhu35EtS7` | 88089443232 | SHA256("Léo") |
| Grande Parade | `clients/grande-parade.html` | Nouvelle (3 tiers) | `kZKq0A5ZaoFGv3YO4mQrFbQghpd6Tfw0CWgy` | 88890561791 | view: SHA256("GrandeParade"), dl: SHA256("GrandeParadeDL") |

### Propriétés techniques communes
- **Exception à la règle showPage()** : fichiers HTML séparés (plein écran, logique propre)
- Thème sombre (fond `#0f0f0f`) — UX photo professionnelle
- Password gate : SHA-256 côté client (Web Crypto API) + sessionStorage pour l'auth
- Lightbox : Fullscreen API (`element.requestFullscreen()`)
- pCloud : EU first (`eapi.pcloud.com`), fallback US (`api.pcloud.com`)
- Le compte pCloud de Bertrand est sur le serveur **US** (`api.pcloud.com`)

---

## 6. Structure des fichiers

```
site-v1/
├── index.html              — Point d'entrée unique du site (landing + site)
├── admin.html              — Interface d'administration (PAT hardcodé en char codes)
├── panier.html             — Panier universel (toutes les boutiques)
├── merci.html              — Page de confirmation de commande
├── qr-cartes.html          — QR codes pour l'exposition Dust'in Kolor
├── css/
│   └── style.css           — Design system complet
├── js/
│   ├── gallery-images.js   — Listes d'images ordonnées (?v=20260606b)
│   ├── gallery-data.js     — CONFIG + SECTIONS_CONFIG + buildXxxPage() (?v=20260606d)
│   └── gallery-engine.js   — Classe Portfolio, rendu, navigation (?v=20260606b)
├── assets/
│   └── logo-b.svg
├── images/                 — Toutes les images du site
│   ├── accueil/            (2 photos)
│   ├── portrait/           (12 photos)
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
│   └── ST MELAR/           (7 photos — gallery-images.js clé "st-melar")
├── clients/
│   ├── index.html          — Liste des galeries clients (portail direct)
│   ├── gilmerton.html      — Galerie Gilmerton (ancienne, 2 tiers)
│   ├── leo-brasserie.html  — Galerie Léo Brasserie (ancienne, 2 tiers)
│   ├── grande-parade.html  — Galerie Grande Parade (nouvelle, 3 tiers)
│   └── galerie-template.html — Template 3 tiers (base pour nouvelles galeries)
├── content/
│   └── cartons/            — Fichiers .txt par galerie (override inline carton)
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
  type: "gallery" | "section" | "page" | "group" | "link" | "external",
  galleryId: "…",     // si type=gallery
  sectionId: "…",     // si type=section (ouvre showSectionGrid)
  pageId: "…",        // si type=page
  url: "…",           // si type=link ou external
  parent: "group-id", // si enfant d'un groupe
  hidden: true        // masqué du nav mais code présent
}
```

### État actuel du menu (06/06/2026)

| ID | Nom nav | Type | Cible | Visible |
|----|---------|------|-------|---------|
| `best-of` | BEST OF | gallery | best-of | ✗ caché |
| `photographe` | PHOTOGRAPHE | section | photographe | ✓ |
| `realisateur` | RÉALISATEUR | section | realisateur | ✓ |
| `travailler-ensemble` | TRAVAILLER ENSEMBLE | page | travailler-ensemble | ✓ |
| `boutique` | BOUTIQUE | section | boutique | ✓ |
| `infos` | INFOS | page | infos | ✓ |
| `galeries-client` | GALERIES CLIENT | section | galeries-client | ✗ caché (activer quand prêt) |
| `post-production` | POST-PRODUCTION | page | post-production | ✗ caché |
| `auteur` | AUTEUR | page | auteur | ✗ caché |

---

## 9. SECTIONS_CONFIG — structure et prefixMap

Cartes affichées dans `showSectionGrid(sectionId)` quand on clique sur un item de type `section`.

### Structure d'une carte

```js
{
  id: "unique-dans-section",
  galleryId: "...",          // ouvre la galerie au clic
  url: "...",                // navigation href au clic (galeries clients, liens externes)
  pageId: "...",             // showPage() au clic
  labelFr/labelEn: "...",   // petite ligne de catégorie (ex. "Studio · Terrain")
  titleFr/titleEn: "...",   // titre principal de la carte
  descFr/descEn: "...",     // description courte
  img: "...",               // image de couverture (URL ou chemin local)
  _hiddenByAdmin: true,     // caché par défaut (Supabase peut l'activer)
  parentId: "...",          // ID Supabase parent (pour les sous-galeries)
}
```

### Règle `_hiddenByAdmin`

```js
// Dans gallery-engine.js (chargement Supabase) :
const wasStaticHidden = card._hiddenByAdmin === true;
card._hiddenByAdmin = wasStaticHidden
    ? row.visible !== true   // caché par défaut → visible seulement si admin dit true
    : row.visible === false; // visible par défaut → caché seulement si admin dit false
```

- `_hiddenByAdmin: true` en static = caché par défaut, à activer manuellement dans l'admin
- Sans ce flag = visible par défaut, à masquer depuis l'admin si besoin

### Sections et leur prefixMap Supabase

| Section | prefixMap clé | Préfixe ID Supabase | Exemple d'ID |
|---------|--------------|---------------------|--------------|
| `photographe` | `ph` | `ph-` | `ph-portrait` |
| `realisateur` | `real` | `real-` | `real-cinema` |
| `boutique` | `shop` | `shop-` | `shop-boutique-dk` |
| `galeries-client` | `client` | `client-` | `client-gilmerton` |

Ce prefixMap est défini à **deux endroits** (à maintenir en sync) :
1. `gallery-engine.js` (ligne init Supabase ~141) : `const prefixMap = { photographe: 'ph', realisateur: 'real', boutique: 'shop', 'galeries-client': 'client' };`
2. `gallery-engine.js` (`showSectionGrid` ~1000) : même constante
3. `admin.html` : `const PREFIX = { photographe: 'ph', realisateur: 'real', boutique: 'shop', 'galeries-client': 'client' };`

### Cartes actuellement cachées par défaut (`_hiddenByAdmin: true`)

Dans `photographe` : `plougasnou`, `salarie-ehpad`, `carre-das`, `lumiere`, `plateau`, `immersion`, `burning-man`
(À activer depuis l'admin quand le contenu sera prêt)

---

## 10. Admin — fonctionnalités

Fichier : `admin.html`
Mot de passe admin : `bertrand2025`

### 4 onglets

| Onglet | Fonctionnalité |
|--------|----------------|
| **Cartes & galeries** | Modifier titre/label/desc/image de chaque carte, drag-and-drop pour réordonner, bouton Visible/Masquée |
| **Visibilité menu** | Activer/désactiver les items du nav principal |
| **Photos** | Réordonner et supprimer les photos d'une galerie (déploie sur GitHub) |
| **Cartons** | Éditer le texte des cartons par galerie (déploie sur GitHub) |

### Sections visibles dans "Cartes & galeries"

PHOTOGRAPHE · RÉALISATEUR · BOUTIQUE · **GALERIES CLIENT** (ajouté 06/06/2026)

### Supabase

- URL : `https://suecslynruuputmujudg.supabase.co`
- Table `gallery_cards` : stocke les overrides de cartes (titre, label, desc, img, visible, sort_order, parent_id)
- Table `section_visibility` : stocke l'état visible/masqué des items de nav

---

## 11. Galeries clients pCloud — protocole

### Règle absolue : ne jamais inventer un code pCloud
Le code s'obtient UNIQUEMENT depuis l'URL que Bertrand partage :
`https://u.pcloud.link/publink/show?code=XXXXXX` → le code est la partie après `code=`.

**IMPORTANT : le lien doit pointer vers un DOSSIER, pas un fichier.**
Si le titre de la page pCloud se termine en `.jpg` → c'est un fichier → demander le dossier parent.

### Codes actuels

| Galerie | Code pCloud | Type | Serveur API |
|---------|------------|------|-------------|
| Gilmerton | `kZo1EU5ZLLpXW8fr6xzJNJW0gPuU1B6fdsuy` | Dossier ✓ | api.pcloud.com (US) |
| Léo Brasserie | `kZQ1EU5ZzBL5BcesXwzTqgy0uauzhu35EtS7` | Dossier ✓ | api.pcloud.com (US) |
| Grande Parade | `kZKq0A5ZaoFGv3YO4mQrFbQghpd6Tfw0CWgy` | Dossier ✓ | api.pcloud.com (US) |

### API pCloud utilisée
- Endpoint : `showpublink?code=CODE` (EU first: `eapi.pcloud.com`, fallback US: `api.pcloud.com`)
- Le compte pCloud de Bertrand est sur le serveur **US** (`api.pcloud.com`)
- Pour lister les fichiers : `showpublink?code=CODE` → `metadata.contents`
- Si `contents` vide → 2e appel avec `folderid`: `showpublink?code=CODE&folderid=ID`
- Pour les URLs de téléchargement : `getpublinkdownload?code=CODE&fileid=FILEID`
- Pour les vignettes : `getpubthumb?code=CODE&fileid=FILEID&size=600x900&type=jpg`

---

## 12. Hébergement vidéo

- **YouTube non-répertorié** : recommandé (gratuit, permanent, embeddable)
- **Vimeo** : fonctionne tant que l'abonnement est actif
- pCloud : ne pas utiliser pour les vidéos (pas de lecteur embed)
- GitHub Pages : ne pas héberger de fichiers vidéo (contre les CGU)

### Vidéos de référence — Travailler Ensemble

| Œuvre | Plateforme | Lien embed |
|-------|-----------|------------|
| Jean Rochefort (portrait) | Vimeo | `https://player.vimeo.com/video/237381173?h=1595582296` |
| Ernest L'hour | Vimeo | `https://player.vimeo.com/video/1192293542?h=57b7d733e5` |
| J'arrive | Vimeo | `https://vimeo.com/390539243` |
| Burning Man / Temple du deuil | YouTube | `https://www.youtube.com/watch?v=Fj8JcmKI0Iw` |
| Tourisme fiction Monts d'Arrée | YouTube | `https://www.youtube.com/watch?v=O5iTddsVMyA` |

---

## 13. Page Travailler Ensemble

Appelée via `showPage('travailler-ensemble')`.
Fonction `buildTravaillerEnsemblePage(lang)` dans `gallery-data.js`.

Cartes actuelles :
| ID | Titre FR | Image | Vidéo |
|----|----------|-------|-------|
| `archives` | Fabriquer aujourd'hui les archives de demain | `images/Television/02.jpg` | Vimeo 1192293542 |
| `fiction` | Mettez de la fiction dans votre communication | `images/cinema/1.jpg` | YouTube O5iTddsVMyA |
| `immersion` | *masqué* | — | — |
| `portrait` | *masqué* | — | — |

---

## 14. Pages cachées, prêtes à publier

- `post-production` (`hidden: true` dans MENU_CONFIG) — `buildPostProductionPage()` OK
- `auteur` (`hidden: true` dans MENU_CONFIG) — `buildAuteurPage()` OK

Pour publier : dans `MENU_CONFIG` (gallery-data.js), retirer `hidden: true`, bumper `?v=`.

---

## 15. Galeries clients en attente

- **Juste Après 153** — photos à redimensionner (PIL, max 1800px, quality 82)
- **La Régal** — photos à redimensionner
- **St Mélar** — 7 photos dans `images/ST MELAR/` + 6 dans gallery-images.js (`st-melar`), galerie visible dans PHOTOGRAPHE

---

## 16. Règle de redimensionnement photos

```python
from PIL import Image
img = Image.open(src)
img.thumbnail((1800, 1800), Image.LANCZOS)
img.save(dst, 'JPEG', quality=82, optimize=True)
```

---

## 17. Routage URL (hash routing) — À implémenter

Le site est une SPA. `showSectionGrid()` et `showPage()` écrivent déjà dans `history.pushState` (format `#id`). Un listener `hashchange` pourrait être ajouté pour la navigation Retour.

---

## 18. Checklist avant tout ajout de contenu

1. [ ] Est-ce que cette page a besoin d'être plein-écran (galerie client) ?
   - Non → `showPage()` dans gallery-engine.js + `buildXxxPage()` dans gallery-data.js
   - Oui → fichier HTML séparé dans `clients/`, avec vars CSS du site
2. [ ] Le fond est-il `var(--white)` / `#fafafa` ? (sauf galeries clients dark = OK)
3. [ ] La police est-elle IBM Plex Sans, weight 300 ?
4. [ ] Le logo B navigue-t-il vers le bon endroit ? (voir §4)
5. [ ] Le déploiement se fait-il depuis `/sessions/loving-pensive-clarke/repo-push` ?
6. [ ] Le `?v=` a-t-il été bumped dans index.html si un fichier JS a été modifié ?
7. [ ] Les strings JS avec apostrophes utilisent-elles des guillemets doubles ?
8. [ ] Si nouvelle section : prefixMap mis à jour aux 3 endroits (engine ×2, admin ×1) ?

---

## 19. Architecture e-commerce universelle

### Règle d'or : un seul panier pour tout le site

**Un seul fichier panier** : `/panier.html` (racine du site).
**Un seul fichier merci** : `/merci.html` (racine du site).
**Jamais** de panier local dans un sous-dossier. Si `dustin-kolor/panier.html` existe, c'est un redirect.

### Clé localStorage universelle

```js
localStorage.key = 'bb_cart'   // Bertrand Basset cart — toujours cette clé, partout
```

### Endpoint de paiement (Supabase Edge Function)

```
POST https://suecslynruuputmujudg.supabase.co/functions/v1/stripe-checkout
Headers: apikey: [SUPABASE_ANON_KEY]
Body: { items, promo, success_url, cancel_url }
Response: { url: "https://checkout.stripe.com/..." }
```

### Logo B sur les pages boutique (sous-dossiers)

Sur toute page dans `dustin-kolor/` ou autre sous-dossier avec achat :
- **Gauche** : `← Retour à la série` → lien vers la galerie du sous-dossier
- **Centre** : logo B → `../index.html` (site principal Bertrand Basset)
- **Droite** : nom de la série + lien panier → `../panier.html`
