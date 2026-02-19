# MODE D'EMPLOI - Mise en ligne bertrandbasset.com

## 1. FICHIERS MIS À JOUR

Les fichiers suivants ont été corrigés pour le mobile :

- `index.html` - Ajout du header mobile + menu hamburger
- `css/style.css` - Support mobile complet (responsive)
- `js/gallery.js` - Navigation mobile + swipe

**Remplace les fichiers dans ton dossier `bertrand-basset` par ceux-ci.**

---

## 2. STRUCTURE ATTENDUE DES IMAGES

```
bertrand-basset/
├── images/
│   ├── landing/
│   │   └── landing-01.jpg       ← Image landing page
│   ├── accueil/
│   │   ├── accueil-01.jpg       ← Images galerie accueil
│   │   ├── accueil-02A.jpg      ← Pour les paires
│   │   ├── accueil-02B.jpg
│   │   └── ...
│   ├── photography/
│   │   ├── portrait/
│   │   │   ├── portrait-01.jpg
│   │   │   └── ...
│   │   ├── serie-portrait/
│   │   │   └── gem/
│   │   │       ├── gem-01.jpg
│   │   │       ├── gem-01.mp3   ← Audio optionnel
│   │   │       └── ...
│   │   └── immersion/
│   │       └── ...
│   └── filmmaker/
│       └── cinema/
│           └── ...
├── assets/
│   └── logo-b.svg
├── css/
│   └── style.css
├── js/
│   └── gallery.js
└── index.html
```

---

## 3. OPTIMISER LES IMAGES

### Option A : Script automatique (Mac/Linux)

```bash
cd ~/bertrand-basset
chmod +x optimize-images.sh
./optimize-images.sh
```

### Option B : Avec ImageMagick manuellement

```bash
# Installer ImageMagick (si pas déjà fait)
brew install imagemagick  # Mac
# ou
sudo apt install imagemagick  # Linux

# Convertir une image
convert input.tiff -resize 2000x2000> -quality 85 output.jpg

# Convertir tout un dossier
for f in *.tiff; do convert "$f" -resize 2000x2000> -quality 85 "${f%.*}.jpg"; done
```

### Option C : Avec un service en ligne

- https://squoosh.app/ (Google, gratuit)
- https://tinypng.com/ (simple)

### Recommandations images :

| Usage | Largeur max | Qualité | Format |
|-------|-------------|---------|--------|
| Landing | 2000px | 85% | JPEG |
| Galerie | 2000px | 85% | JPEG |
| Thumbnails | 150px hauteur | 80% | JPEG |

**Poids cible par image : 200-500 Ko max**

---

## 4. METTRE EN LIGNE SUR GITHUB PAGES

### Étape 1 : Créer le repository

```bash
cd ~/bertrand-basset

# Initialiser git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Portfolio Bertrand Basset v1"

# Créer le repo sur GitHub (via le site ou gh cli)
# Puis lier le repo local au remote :
git remote add origin https://github.com/TON-USERNAME/bertrand-basset.git

# Pousser
git push -u origin main
```

### Étape 2 : Activer GitHub Pages

1. Va sur https://github.com/TON-USERNAME/bertrand-basset
2. Settings → Pages
3. Source : "Deploy from a branch"
4. Branch : main, dossier / (root)
5. Save

**Ton site sera sur : https://TON-USERNAME.github.io/bertrand-basset/**

### Étape 3 : Configurer le domaine Gandi

1. Sur Gandi, va dans DNS Records
2. Ajoute ces enregistrements :

```
Type    Nom     Valeur
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     TON-USERNAME.github.io.
```

3. Sur GitHub Pages, dans "Custom domain" : `bertrandbasset.com`
4. Coche "Enforce HTTPS"

**Attends 24-48h pour la propagation DNS.**

---

## 5. TESTER

### Local

```bash
cd ~/bertrand-basset

# Avec Python (simple)
python3 -m http.server 8000
# Puis ouvre http://localhost:8000

# Ou avec Node (si installé)
npx serve
```

### Mobile

- Ouvre Chrome DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Teste iPhone SE, iPhone 12, Galaxy S20

---

## 6. CHECKLIST AVANT MISE EN LIGNE

- [ ] Image landing-01.jpg présente
- [ ] Logo-b.svg présent dans assets/
- [ ] Au moins quelques images dans chaque galerie
- [ ] Images optimisées (< 500Ko chacune)
- [ ] Test mobile OK
- [ ] Test desktop OK
- [ ] Navigation fonctionne
- [ ] Swipe fonctionne sur mobile

---

## 7. PROCHAINES AMÉLIORATIONS

- [ ] Page About avec texte
- [ ] Page Contact avec email
- [ ] Sections Filmmaker avec vidéos
- [ ] Sections Studio avec infos services
- [ ] SEO (meta descriptions)
- [ ] Analytics
