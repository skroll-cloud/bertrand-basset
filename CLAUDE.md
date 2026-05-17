# CLAUDE.md — Cahier des charges site Bertrand Basset

> **Règle absolue** : ne jamais inventer un nouveau design de page.
> Toute nouvelle page ou section s'intègre dans le système existant.

---

## 1. Stack & déploiement

- **Site statique** hébergé sur GitHub Pages
- Repo : `skroll-cloud/bertrand-basset.git`
- PAT : `[PAT_DISPONIBLE_DANS_LES_SECRETS]`
- **Opérations git** : toujours depuis `/tmp/site_deploy` (clone temporaire).
  Le dossier monté `/sessions/.../mnt/site-v1` est en FUSE — git y est interdit (EPERM).
- Déploiement = `git push origin main` depuis `/tmp/site_deploy`

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

---

## 3. Architecture JavaScript (`js/gallery.js`)

### Fichier central — toute la logique du site est ici

**Variables globales** :
- `SITE_CONFIG` — config générale (nom, landing, galerie par défaut)
- `MENU_CONFIG` — navigation (voir §4)
- `GALLERIES_CONFIG` — définition des galeries et leurs images
- `PAGES_CONFIG` — pages texte (infos, etc.)
- `T` — traductions `{ en: {…}, fr: {…} }`

**Classe `Portfolio`** — instanciée au DOMContentLoaded :
```js
window.portfolio = new Portfolio();
```

**Méthodes clés** :
- `openGallery(id)` — ouvre une galerie
- `showPage(id)` — affiche une page texte dans `#galleryContainer`
- `showItem(index)` — affiche un slide (image, carton, vidéo…)
- `openHomeGallery()` → `openGallery(SITE_CONFIG.defaultGallery || 'portrait')` — **pas la landing**
- `buildMenu()` — reconstruit le nav depuis `MENU_CONFIG`
- `buildPage(pageId, lang)` — génère le HTML d'une page depuis `PAGES_CONFIG`

### Ajouter une nouvelle page

**La seule bonne méthode** : ajouter une fonction `buildXxxPage(lang)` dans `gallery.js`,
puis l'appeler dans `showPage()` :

```js
function buildFilmsPage(lang) {
    // Retourne du HTML utilisant les classes du design system
    return `<div class="page-text">…</div>`;
}

// Dans showPage() :
if (id === 'films') html = buildFilmsPage(this.currentLang);
```

Et ajouter l'entrée dans `MENU_CONFIG` :
```js
{ "id": "films", "name": "FILMS", "type": "page", "pageId": "films" }
```

**Ne jamais créer un fichier HTML séparé avec son propre CSS** pour une page du site principal.

---

## 4. Navigation — règle des B logos

### Hiérarchie 3 niveaux

```
Landing page
    ↓ (clic bouton "Entrer" ou logo B landing)
Site principal (index.html)
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

- **Exception au règle showPage()** : les galeries clients sont des fichiers HTML séparés
  car elles sont **plein écran** (menu du site disparu) avec leur propre logique (lightbox, password gate)
- Elles **doivent quand même** utiliser les vars CSS du site (`--black`, `--white`, etc.)
  et la typographie IBM Plex Sans 300
- Le thème peut être sombre (fond noir) car c'est une UX photo professionnelle dédiée au client
- Password gate : SHA-256 côté client (Web Crypto API)
- Lightbox : Fullscreen API (`element.requestFullscreen()`)
- Navigation : ← → clavier, S sélection, Esc fermeture

---

## 6. Structure des fichiers

```
site-v1/
├── index.html          — Point d'entrée unique du site
├── css/
│   └── style.css       — Design system complet
├── js/
│   ├── gallery.js      — CERVEAU du site (config + logique)
│   └── gallery-images.js — Listes d'images auto-scannées (optionnel)
├── images/             — Toutes les images du site
│   ├── accueil/
│   ├── portrait/
│   ├── cinema/
│   ├── Television/
│   ├── gem/
│   ├── dustin-kolor/
│   └── …
├── clients/
│   ├── index.html      — Liste des galeries clients
│   └── plougasnou.html — Galerie client (plein écran, password)
├── dustin-kolor/
│   └── index.html      — Mini-site Dust'in Kolor (exception validée)
└── CLAUDE.md           — CE FICHIER
```

---

## 7. Types de slides dans gallery.js

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

Dans `GALLERIES_CONFIG`, dans la liste `images` :
```js
{ "type": "video", "videoId": "YOUTUBE_ID", "platform": "youtube",
  "title": "Titre", "caption": {"fr": "…", "en": "…"} }
```

---

## 8. MENU_CONFIG — structure

```js
{
  id: "unique-id",
  name: "LABEL NAV",
  type: "gallery" | "page" | "group" | "link" | "external",
  galleryId: "…",    // si type=gallery
  pageId: "…",       // si type=page
  url: "…",          // si type=link ou external
  parent: "group-id", // si enfant d'un groupe
  hidden: true        // masqué du nav mais code présent
}
```

---

## 9. Hébergement vidéo

- **YouTube non-répertorié** : recommandé (gratuit, permanent, embeddable)
- Vimeo (ID 240574987) : fonctionne tant que l'abonnement est actif
- pCloud : ne pas utiliser pour les vidéos (pas de lecteur embed)
- GitHub Pages : ne pas héberger de fichiers vidéo (contre les CGU)

---

## 10. Pages à traiter

### À supprimer / refactoriser
- `films.html` — page standalone créée par erreur avec son propre CSS dark.
  Doit être remplacé par une entrée `showPage('films')` dans gallery.js.

### Cachées, prêtes à publier
- `post-production` (hidden: true dans MENU_CONFIG) — fonction `buildPostProductionPage()` OK
- `auteur` (hidden: true dans MENU_CONFIG) — fonction `buildAuteurPage()` OK

### En attente (galeries clients)
- Juste Après 153, La Régal, St Mélar — 452 photos à redimensionner (PIL, max 1800px, quality 82)

---

## 11. Règle de redimensionnement photos

```python
from PIL import Image
img = Image.open(src)
img.thumbnail((1800, 1800), Image.LANCZOS)
img.save(dst, 'JPEG', quality=82, optimize=True)
```

---

## 12. Checklist avant tout ajout de contenu

1. [ ] Est-ce que cette page a besoin d'être plein-écran (galerie client) ?
   - Non → `showPage()` dans gallery.js, pas de fichier HTML séparé
   - Oui → fichier HTML séparé dans `clients/`, avec vars CSS du site
2. [ ] Le fond est-il `var(--white)` / `#fafafa` ? (sauf galeries clients dark = OK)
3. [ ] La police est-elle IBM Plex Sans, weight 300 ?
4. [ ] Le logo B navigue-t-il vers le bon endroit ? (voir §4)
5. [ ] Le déploiement se fait-il depuis `/tmp/site_deploy` ?

---

## 13. Architecture e-commerce universelle

### Règle d'or : un seul panier pour tout le site

**Un seul fichier panier** : `/panier.html` (racine du site).
**Un seul fichier merci** : `/merci.html` (racine du site).
**Jamais** de panier local dans un sous-dossier. Si `dustin-kolor/panier.html` existe, c'est un redirect.

### Clé localStorage universelle

```js
localStorage.key = 'bb_cart'   // Bertrand Basset cart — toujours cette clé, partout
```

Toutes les pages qui ajoutent au panier (boutique.html, cartes.html, etc.) écrivent dans `bb_cart`.
Le fichier `/panier.html` lit et écrit dans `bb_cart`.
Le fichier `/merci.html` lit puis efface `bb_cart`.

### Structure d'un item cart (générique)

```js
{
  id:      string,       // clé unique, ex. "sandstorm-feu-simple"
  slug:    string,       // identifiant œuvre pour l'Edge Function
  type:    string,       // "simple" | "dibond" | "grand" | "carte" | "carte-pack" | futur: "portrait-seance"
  cat:     string,       // catégorie pour l'affichage et la livraison : "tirage" | "carte" | "portrait"
  titre:   string,       // libellé affiché dans le panier et les emails
  prix:    number,       // prix unitaire en €
  qty:     number,       // quantité (toujours 1 pour les tirages numérotés)
  chassis: boolean,      // option châssis alu (tirages Dibond uniquement)
  // optionnels selon le type :
  imgs:    string[],     // images de cartes postales
  ids:     string[],     // IDs pour les packs
}
```

### Endpoint de paiement (Supabase Edge Function)

```
POST https://[PROJECT_REF].supabase.co/functions/v1/stripe-checkout
Headers: apikey: [SUPABASE_ANON_KEY]
Body: { items, promo, success_url, cancel_url }
Response: { url: "https://checkout.stripe.com/..." }
```

Les constantes à configurer dans `/panier.html` :
```js
const SUPABASE_URL      = 'https://[PROJECT_REF].supabase.co';
const SUPABASE_ANON_KEY = '[SUPABASE_ANON_KEY]';
```

### Logo B sur les pages boutique (sous-dossiers)

Sur toute page dans `dustin-kolor/` ou autre sous-dossier avec achat :
- **Gauche** : `← Retour à la série` → lien vers la galerie du sous-dossier
- **Centre** : logo B → `../index.html` (site principal Bertrand Basset)
- **Droite** : nom de la série + lien panier → `../panier.html`

Exemple (boutique.html, cartes.html, merci.html dans dustin-kolor/) :
```html
<header class="site-header">
  <a class="header-back" href="index.html">← Retour à la série</a>
  <a href="../index.html"><img src="../assets/logo-b.svg" class="header-logo" alt="B"></a>
  <div class="header-right">
    <span class="header-series">Dust'in Kolor</span>
    <a class="header-cart" href="../panier.html">Panier</a>
  </div>
</header>
```

### Ajouter un nouveau produit vendable

1. Créer la page de présentation (ex. `portrait/index.html`) avec bouton "Ajouter au panier"
2. L'item ajouté au panier suit la structure générique ci-dessus (avec `cat: 'portrait'`)
3. Ajouter le traitement du nouveau type dans l'Edge Function `stripe-checkout/index.ts`
4. Aucune modification de `/panier.html` ni de `/merci.html` requise — ils sont génériques
