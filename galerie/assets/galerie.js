/* Galerie privée : une image en grand, loupe, galerie en grille, ma sélection, envoi par mail.
   Aucun texte propre à une personne ici : tout vient de window.GALERIE (écrit par outils/synchroniser.py). */
(() => {
  'use strict';

  const G = window.GALERIE;
  const $ = (id) => document.getElementById(id);
  const N = G.photos.length;
  const parN = new Map(G.photos.map((p) => [p.n, p]));
  const KEY = 'galerie:' + G.slug;
  const borne = (x) => Math.min(1, Math.max(0, x));

  // ?fond=noir pour comparer avec un fond sombre
  if (new URLSearchParams(location.search).get('fond') === 'noir') document.documentElement.dataset.fond = 'noir';

  // ---------- état : ce que la personne a choisi (gardé sur son appareil) ----------
  let etat = { panier: [], pref: null };
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.panier)) {
      etat.panier = s.panier.filter((n) => parN.has(n));
      etat.pref = parN.has(s.pref) && etat.panier.includes(s.pref) ? s.pref : (etat.panier[0] || null);
    }
  } catch (e) { /* stockage indisponible : la page marche quand même */ }
  const sauver = () => { try { localStorage.setItem(KEY, JSON.stringify(etat)); } catch (e) {} };

  const dans = (n) => etat.panier.includes(n);
  const euros = (x) => x.toLocaleString('fr-FR') + ' €';
  const num = (n) => String(n).padStart(2, '0');
  const pluriel = (k, un, plusieurs) => (k > 1 ? plusieurs : un);

  function basculer(n) {
    if (dans(n)) {
      etat.panier = etat.panier.filter((x) => x !== n);
      if (etat.pref === n) etat.pref = etat.panier[0] || null;
    } else {
      etat.panier.push(n);
      if (etat.pref === null) etat.pref = n;
    }
    sauver(); rendre();
  }
  function choisirPref(n) {
    if (!dans(n)) etat.panier.push(n);
    etat.pref = n; sauver(); rendre();
  }

  // La préférée en premier, puis les autres dans l'ordre où elles ont été ajoutées.
  // Les « offertes » sont les premières lignes, les suivantes se paient.
  function lignes() {
    const autres = etat.panier.filter((n) => n !== etat.pref);
    const ordre = etat.pref !== null ? [etat.pref, ...autres] : autres;
    return ordre.map((n, i) => ({ n, prix: i < G.offertes ? 0 : G.prix, offerte: i < G.offertes }));
  }
  const total = () => lignes().reduce((s, l) => s + l.prix, 0);
  const nbPayantes = () => lignes().filter((l) => !l.offerte).length;
  const tirageGagne = () => G.tirage > 0 && nbPayantes() >= G.tirage;

  // ---------- premier écran : la consigne ----------
  const bienvenue = $('bienvenue');
  let bienvenueOuverte = true;
  (function consigne() {
    if (G.accueil) { $('bienvenue-texte').textContent = G.accueil; return; }
    const o = G.offertes;
    $('bienvenue-texte').innerHTML =
      'Voici tes images. Choisis-en <strong>' + o + '</strong> ' + (o > 1 ? 'qui te sont offertes' : 'qui t’est offerte') +
      ' : je les retouche et je te les livre en HD. Si tu en veux des supplémentaires, elles sont à <strong>' + euros(G.prix) + '</strong>.' +
      (G.tirage > 0 ? ' Si tu en achètes <strong>' + G.tirage + '</strong>, je t’offre un tirage.' : '');
  })();
  function entrer(vite) {
    bienvenueOuverte = false;
    if (vite) bienvenue.style.transition = 'none';
    bienvenue.classList.add('ferme');
    bienvenue.setAttribute('aria-hidden', 'true');
    if (!vite) $('scene').focus({ preventScroll: true });
  }
  $('entrer').addEventListener('click', () => entrer(false));
  if (etat.panier.length) entrer(true);   // quelqu'un qui revient n'a pas besoin de relire la consigne
  else $('entrer').focus({ preventScroll: true });

  // ---------- l'image en grand ----------
  const scene = $('scene'), cadre = $('cadre'), img = $('image');
  let courant = 1, zoom = null, enGalerie = false;
  const suivant = (d) => ((courant - 1 + d + N) % N) + 1;

  // le cadre prend la plus grande taille possible dans l'écran, au format exact de l'image
  function tailler() {
    const p = parN.get(courant), cs = getComputedStyle(scene);
    const W = scene.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const H = scene.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const r = p.w / p.h;
    let w = W, h = w / r;
    if (h > H) { h = H; w = h * r; }
    cadre.style.width = Math.floor(w) + 'px';
    cadre.style.height = Math.floor(h) + 'px';
  }
  // version moyenne pour les petits écrans, version complète pour les grands et les écrans fins
  const srcPour = (p) => (Math.max(innerWidth, innerHeight) * (window.devicePixelRatio || 1) > 1500 ? p.src : p.med);

  function montrer(n) {
    sortirZoom();
    courant = n;
    const p = parN.get(n);
    tailler();
    img.alt = 'Portrait ' + n;
    img.onload = () => cadre.classList.add('pret');
    img.src = srcPour(p);
    if (img.complete && img.naturalWidth) cadre.classList.add('pret');
    if (!enGalerie) $('compteur').textContent = num(n) + ' / ' + num(N);
    $('num').textContent = num(n);
    [-1, 1].forEach((d) => new Image().src = srcPour(parN.get(suivant(d)))); // les voisines sont prêtes avant qu'on y aille
    rendre();
  }
  const aller = (d) => montrer(suivant(d));
  $('prec').addEventListener('click', (e) => { e.stopPropagation(); aller(-1); });
  $('suiv').addEventListener('click', (e) => { e.stopPropagation(); aller(1); });
  $('choisir').addEventListener('click', () => basculer(courant));
  $('pref').addEventListener('click', () => choisirPref(courant));

  // ---------- loupe : l'image agrandie suit le curseur ou le doigt ----------
  const bLoupe = $('b-loupe');
  function majZoom() {
    if (!zoom) return;
    const w = cadre.clientWidth, h = cadre.clientHeight, z = zoom.z;
    img.style.transform = 'translate(' + (-zoom.fx * w * (z - 1)) + 'px,' + (-zoom.fy * h * (z - 1)) + 'px) scale(' + z + ')';
  }
  function entrerZoom(x, y) {
    if (enGalerie || zoom) return;
    const p = parN.get(courant);
    if (img.getAttribute('src') !== p.src) img.src = p.src;           // la loupe prend toujours la version complète
    const z = Math.min(4, Math.max(1.8, p.w / cadre.clientWidth));
    const r = cadre.getBoundingClientRect();
    zoom = { z, fx: x === undefined ? .5 : borne((x - r.left) / r.width), fy: y === undefined ? .5 : borne((y - r.top) / r.height) };
    cadre.classList.add('zoom'); document.body.classList.add('en-zoom');
    scene.style.touchAction = 'none';
    bLoupe.setAttribute('aria-pressed', 'true');
    majZoom();
  }
  function sortirZoom() {
    if (!zoom) return;
    zoom = null;
    cadre.classList.remove('zoom'); document.body.classList.remove('en-zoom');
    scene.style.touchAction = '';
    img.style.transform = '';
    bLoupe.setAttribute('aria-pressed', 'false');
  }
  bLoupe.addEventListener('click', () => (zoom ? sortirZoom() : entrerZoom()));

  // clic moitié gauche / moitié droite, glissement du doigt, déplacement dans la loupe
  let appui = null;
  scene.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button') || enGalerie || bienvenueOuverte) return;
    appui = { x: e.clientX, y: e.clientY, fx: zoom ? zoom.fx : 0, fy: zoom ? zoom.fy : 0, bouge: false };
  });
  scene.addEventListener('pointermove', (e) => {
    if (!zoom) return;
    if (e.pointerType === 'mouse') {
      const r = cadre.getBoundingClientRect();
      zoom.fx = borne((e.clientX - r.left) / r.width); zoom.fy = borne((e.clientY - r.top) / r.height);
      majZoom();
    } else if (appui) {
      const dx = e.clientX - appui.x, dy = e.clientY - appui.y;
      if (Math.abs(dx) + Math.abs(dy) > 8) appui.bouge = true;
      zoom.fx = borne(appui.fx - dx / (cadre.clientWidth * (zoom.z - 1)));
      zoom.fy = borne(appui.fy - dy / (cadre.clientHeight * (zoom.z - 1)));
      majZoom();
    }
  });
  scene.addEventListener('pointercancel', () => { appui = null; });
  scene.addEventListener('pointerup', (e) => {
    if (!appui) return;
    const a = appui; appui = null;
    const dx = e.clientX - a.x, dy = e.clientY - a.y;
    const immobile = Math.abs(dx) < 8 && Math.abs(dy) < 8;
    if (zoom) { if (!a.bouge && immobile) sortirZoom(); return; }
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) { aller(dx < 0 ? 1 : -1); return; }
    if (immobile) {
      const r = scene.getBoundingClientRect();
      aller(e.clientX < r.left + r.width / 2 ? -1 : 1);
    }
  });

  // ---------- la galerie en grand ----------
  const vue = $('planche-vue'), planche = $('planche'), bGalerie = $('b-galerie');
  const PLUS = '<svg class="plus" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const COCHE = '<svg class="coche" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const vignettes = new Map();

  G.photos.forEach((p, i) => {
    const li = document.createElement('li');
    li.className = 'vignette';
    li.style.setProperty('--r', (p.w / p.h).toFixed(4));
    li.innerHTML =
      '<button type="button" class="vignette__ouvrir" aria-label="Voir l’image ' + p.n + ' en grand">' +
      '<img src="' + p.mini + '" width="' + p.mw + '" height="' + p.mh + '" alt="Portrait ' + p.n + '"' + (i > 5 ? ' loading="lazy"' : '') + '></button>' +
      '<span class="vignette__num mono"></span>' +
      '<button type="button" class="carre">' + PLUS + COCHE + '</button>';
    li.querySelector('.vignette__ouvrir').addEventListener('click', () => fermerGalerie(p.n));
    li.querySelector('.carre').addEventListener('click', () => basculer(p.n));
    planche.appendChild(li);
    vignettes.set(p.n, li);
  });

  function ouvrirGalerie() {
    sortirZoom();
    enGalerie = true;
    vue.classList.add('ouverte'); vue.setAttribute('aria-hidden', 'false');
    bGalerie.setAttribute('aria-pressed', 'true');
    bGalerie.setAttribute('aria-label', 'Revenir à l’image'); bGalerie.title = 'Revenir à l’image';
    bLoupe.hidden = true;
    $('compteur').textContent = 'Toutes les images';
    vignettes.get(courant).scrollIntoView({ block: 'center' });
  }
  function fermerGalerie(n) {
    enGalerie = false;
    vue.classList.remove('ouverte'); vue.setAttribute('aria-hidden', 'true');
    bGalerie.setAttribute('aria-pressed', 'false');
    bGalerie.setAttribute('aria-label', 'Voir toutes les images'); bGalerie.title = 'Toutes les images';
    bLoupe.hidden = false;
    montrer(n || courant);
  }
  bGalerie.addEventListener('click', () => (enGalerie ? fermerGalerie() : ouvrirGalerie()));

  // ---------- ma sélection ----------
  const panier = $('panier'), voile = $('voile'), bPanier = $('b-panier');
  let panierOuvert = false;

  function ouvrirPanier() {
    panierOuvert = true;
    panier.classList.add('ouvert'); voile.classList.add('ouvert');
    panier.setAttribute('aria-hidden', 'false');
    rendre();
    $('panier-fermer').focus({ preventScroll: true });
  }
  function fermerPanier() {
    panierOuvert = false;
    panier.classList.remove('ouvert'); voile.classList.remove('ouvert');
    panier.setAttribute('aria-hidden', 'true');
    $('repli').hidden = true; $('panier-alerte').textContent = '';
    bPanier.focus({ preventScroll: true });
  }
  bPanier.addEventListener('click', ouvrirPanier);
  $('panier-fermer').addEventListener('click', fermerPanier);
  voile.addEventListener('click', fermerPanier);

  const zoneLignes = $('lignes');
  function rendrePanier() {
    const L = lignes();
    const k = L.length;
    const manque = Math.max(0, G.offertes - k);
    const payantes = L.filter((l) => !l.offerte).length;

    $('panier-aide').textContent = k === 0 ? '' :
      'Ta préférée est marquée ★. Les ' + G.offertes + ' premières images sont offertes, les suivantes sont à ' + euros(G.prix) + '.';

    zoneLignes.innerHTML = '';
    if (k === 0) {
      const v = document.createElement('li');
      v.className = 'vide';
      v.textContent = 'Ta sélection est vide. Touche le + sur une image pour l’ajouter.';
      zoneLignes.appendChild(v);
    }
    L.forEach((l) => {
      const p = parN.get(l.n);
      const li = document.createElement('li');
      li.className = 'ligne';
      const estPref = l.n === etat.pref;
      li.innerHTML =
        '<img class="ligne__img" src="' + p.mini + '" alt="Portrait ' + l.n + '">' +
        '<div class="ligne__texte"><span class="ligne__num mono">N° ' + num(l.n) + '</span>' +
        '<span class="ligne__prix">' + (l.offerte ? 'Offerte' : euros(l.prix)) + '</span></div>' +
        '<div class="ligne__actions">' +
        '<button type="button" class="ligne__pref' + (estPref ? ' est-pref' : '') + '" aria-pressed="' + estPref + '">' + (estPref ? '★ Ma préférée' : '☆ Ma préférée') + '</button>' +
        '<button type="button" class="ligne__retirer">Retirer</button></div>';
      li.querySelector('.ligne__img').addEventListener('click', () => { fermerPanier(); if (enGalerie) fermerGalerie(l.n); else montrer(l.n); });
      li.querySelector('.ligne__pref').addEventListener('click', () => choisirPref(l.n));
      li.querySelector('.ligne__retirer').addEventListener('click', () => basculer(l.n));
      zoneLignes.appendChild(li);
    });

    $('panier-calcul').textContent = k === 0 ? '' :
      manque > 0
        ? 'Il te reste ' + manque + ' ' + pluriel(manque, 'image offerte', 'images offertes') + ' à choisir.'
        : (payantes > 0
            ? G.offertes + ' offertes, plus ' + payantes + ' ' + pluriel(payantes, 'image', 'images') + ' à ' + euros(G.prix) + '.'
            : 'Tes ' + G.offertes + ' images offertes sont choisies.');

    const t = $('panier-tirage');
    t.classList.toggle('gagne', tirageGagne());
    t.textContent = G.tirage <= 0 || k === 0 ? '' :
      (tirageGagne() ? 'Un tirage t’est offert.' : 'Avec ' + G.tirage + ' images en plus, un tirage t’est offert.');

    $('panier-total').textContent = k === 0 ? '0 €' : (total() === 0 ? 'Offert' : euros(total()));
    $('envoyer').setAttribute('aria-disabled', k === 0 ? 'true' : 'false');
  }

  // ---------- le message envoyé à Bertrand ----------
  const designe = (n) => 'n° ' + n + ' (' + parN.get(n).ref + ')';
  function message() {
    const L = lignes();
    const offertes = L.slice(1).filter((l) => l.offerte);
    const payantes = L.filter((l) => !l.offerte);
    const rows = ['Bonjour Bertrand,', '', 'Voici ma sélection.', '', 'Ma préférée : ' + designe(L[0].n)];
    if (offertes.length) rows.push(pluriel(offertes.length, 'Aussi offerte : ', 'Aussi offertes : ') + offertes.map((l) => designe(l.n)).join(', '));
    if (payantes.length) rows.push('', 'En plus, à ' + euros(G.prix) + ' chacune :', ...payantes.map((l) => '- ' + designe(l.n)));
    if (tirageGagne()) rows.push('', 'Tirage offert (à partir de ' + G.tirage + ' images en plus).');
    rows.push('', total() ? 'Total à régler : ' + euros(total()) : 'Rien à régler.', '', G.prenom);
    return rows.join('\n');
  }
  $('envoyer').addEventListener('click', () => {
    const alerte = $('panier-alerte');
    if (etat.panier.length === 0) { alerte.textContent = 'Ajoute d’abord au moins une image.'; return; }
    alerte.textContent = '';
    const texte = message();
    $('repli-mail').textContent = G.mail;
    $('repli-texte').value = texte;
    $('repli').hidden = false;
    $('repli').scrollIntoView({ block: 'nearest' });
    window.location.href = 'mailto:' + G.mail + '?subject=' + encodeURIComponent('Ma sélection, ' + G.prenom) +
      '&body=' + encodeURIComponent(texte.replace(/\n/g, '\r\n'));
  });
  $('copier').addEventListener('click', async () => {
    const t = $('repli-texte');
    try { await navigator.clipboard.writeText(t.value); } catch (e) { t.select(); document.execCommand && document.execCommand('copy'); }
    $('copier').textContent = 'Message copié';
  });

  // ---------- tout remettre à jour ----------
  function rendre() {
    const choisie = dans(courant);
    cadre.classList.toggle('est-choisie', choisie);
    const c = $('choisir');
    c.classList.toggle('est-choisi', choisie);
    c.setAttribute('aria-pressed', choisie ? 'true' : 'false');
    c.setAttribute('aria-label', choisie ? 'Retirer de ma sélection' : 'Ajouter à ma sélection');
    c.title = c.getAttribute('aria-label');
    const f = $('pref'), estPref = etat.pref === courant;
    f.hidden = !choisie;
    f.classList.toggle('est-pref', estPref);
    f.setAttribute('aria-pressed', estPref ? 'true' : 'false');
    f.setAttribute('aria-label', estPref ? 'Ma préférée' : 'En faire ma préférée');
    f.title = f.getAttribute('aria-label');

    G.photos.forEach((p) => {
      const li = vignettes.get(p.n), ch = dans(p.n);
      li.classList.toggle('est-choisie', ch);
      li.querySelector('.vignette__num').textContent = (etat.pref === p.n ? '★ ' : '') + num(p.n);
      const b = li.querySelector('.carre');
      b.classList.toggle('est-choisi', ch);
      b.setAttribute('aria-pressed', ch ? 'true' : 'false');
      b.setAttribute('aria-label', (ch ? 'Retirer l’image ' + p.n + ' de' : 'Ajouter l’image ' + p.n + ' à') + ' ma sélection');
    });

    const k = etat.panier.length;
    $('b-panier-n').textContent = k; $('b-panier-n').hidden = k === 0;
    bPanier.setAttribute('aria-label', 'Ma sélection, ' + k + ' ' + pluriel(k, 'image', 'images'));
    if (panierOuvert) rendrePanier();
  }

  // ---------- clavier et taille de l'écran ----------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (panierOuvert) fermerPanier(); else if (zoom) sortirZoom(); else if (enGalerie) fermerGalerie();
      return;
    }
    if (panierOuvert || enGalerie || bienvenueOuverte) return;
    if (e.key === 'ArrowLeft') { aller(-1); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { aller(1); e.preventDefault(); }
  });
  new ResizeObserver(() => { tailler(); majZoom(); }).observe(scene);

  montrer(1);
})();
