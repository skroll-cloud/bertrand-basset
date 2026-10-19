/* Galerie privée : planche, visionneuse, ma sélection, envoi par mail.
   Aucun texte propre à une personne ici : tout vient de window.GALERIE (écrit par outils/synchroniser.py). */
(() => {
  'use strict';

  const G = window.GALERIE;
  const $ = (id) => document.getElementById(id);
  const parN = new Map(G.photos.map((p) => [p.n, p]));
  const KEY = 'galerie:' + G.slug;

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
  const euros = (x) => x.toLocaleString('fr-FR') + ' €';
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

  // ---------- page ----------
  const accueilTexte = $('accueil-texte');
  accueilTexte.textContent = G.accueil || '';
  if (!G.accueil) {
    const k = G.photos.length;
    accueilTexte.innerHTML =
      k + ' ' + pluriel(k, 'image', 'images') + '. Les ' + G.offertes + ' premières sont <strong>offertes</strong>, ' +
      'chaque image en plus est à <strong>' + euros(G.prix) + '</strong>. ' +
      'Touchez une image pour l’agrandir, puis ajoutez celles que vous aimez à votre sélection.';
  }

  const planche = $('planche');
  const PLUS = '<svg class="plus" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const COCHE = '<svg class="coche" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const vignettes = new Map();

  G.photos.forEach((p, i) => {
    const li = document.createElement('li');
    li.className = 'vignette';
    li.style.setProperty('--r', (p.w / p.h).toFixed(4));
    li.innerHTML =
      '<button type="button" class="vignette__ouvrir" aria-label="Agrandir l’image ' + p.n + '">' +
      '<img src="' + p.mini + '" width="' + p.mw + '" height="' + p.mh + '" alt="Portrait ' + p.n + '"' + (i > 5 ? ' loading="lazy"' : '') + '></button>' +
      '<span class="vignette__num mono"></span>' +
      '<button type="button" class="vignette__choix">' + PLUS + COCHE + '</button>';
    li.querySelector('.vignette__ouvrir').addEventListener('click', () => ouvrirVis(p.n, li.querySelector('.vignette__ouvrir')));
    li.querySelector('.vignette__choix').addEventListener('click', () => basculer(p.n));
    planche.appendChild(li);
    vignettes.set(p.n, li);
  });

  // ---------- barre du bas ----------
  const barre = $('barre');
  $('barre-ouvrir').addEventListener('click', () => ouvrirPanier($('barre-ouvrir')));

  // ---------- visionneuse ----------
  const vis = $('vis'), visImg = $('vis-image'), visScene = $('vis-scene');
  let courant = null, retourVis = null;

  function montrer(n) {
    courant = n;
    const p = parN.get(n);
    visImg.classList.remove('pret');
    visImg.alt = 'Portrait ' + n;
    visImg.onload = () => visImg.classList.add('pret');
    visImg.src = p.src;
    if (visImg.complete && visImg.naturalWidth) visImg.classList.add('pret');
    $('vis-compteur').textContent = num(n) + ' / ' + num(G.photos.length);
    // on prépare les voisines pour que le passage soit instantané
    [-1, 1].forEach((d) => { const v = parN.get(n + d); if (v) new Image().src = v.src; });
    rendreVis();
  }
  function aller(d) {
    const m = G.photos.length;
    montrer(((courant - 1 + d + m) % m) + 1);
  }
  function ouvrirVis(n, retour) {
    retourVis = retour || document.activeElement;
    vis.classList.add('ouverte'); vis.setAttribute('aria-hidden', 'false');
    document.body.classList.add('fige');
    montrer(n);
    $('vis-fermer').focus({ preventScroll: true });
  }
  function fermerVis() {
    vis.classList.remove('ouverte'); vis.setAttribute('aria-hidden', 'true');
    if (!panierOuvert) document.body.classList.remove('fige');
    if (retourVis && retourVis.focus) retourVis.focus({ preventScroll: true });
    // la planche suit l'image où l'on s'est arrêté
    const li = vignettes.get(courant);
    if (li && li.scrollIntoView) li.scrollIntoView({ block: 'center', behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
  }
  function rendreVis() {
    if (courant === null) return;
    const b = $('vis-choisir'), f = $('vis-pref');
    const choisie = dans(courant);
    b.textContent = choisie ? 'Dans ma sélection ✓ · retirer' : 'Ajouter à ma sélection';
    b.classList.toggle('est-choisie', choisie);
    f.hidden = !choisie || etat.panier.length < 2 && etat.pref === courant;
    f.textContent = etat.pref === courant ? '★ Ma préférée' : '☆ En faire ma préférée';
    f.setAttribute('aria-pressed', etat.pref === courant ? 'true' : 'false');
  }
  $('vis-choisir').addEventListener('click', () => basculer(courant));
  $('vis-pref').addEventListener('click', () => choisirPref(courant));
  $('vis-fermer').addEventListener('click', fermerVis);
  $('vis-prec').addEventListener('click', (e) => { e.stopPropagation(); aller(-1); });
  $('vis-suiv').addEventListener('click', (e) => { e.stopPropagation(); aller(1); });

  // clic moitié gauche / moitié droite, glissement du doigt
  let debut = null;
  visScene.addEventListener('pointerdown', (e) => { debut = { x: e.clientX, y: e.clientY, t: e.target }; });
  visScene.addEventListener('pointerup', (e) => {
    if (!debut || e.target.closest('button')) { debut = null; return; }
    const dx = e.clientX - debut.x, dy = e.clientY - debut.y;
    debut = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) { aller(dx < 0 ? 1 : -1); return; }
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      const r = visScene.getBoundingClientRect();
      aller(e.clientX < r.left + r.width / 2 ? -1 : 1);
    }
  });

  // ---------- ma sélection ----------
  const panier = $('panier'), voile = $('voile');
  let panierOuvert = false, retourPanier = null;

  function ouvrirPanier(retour) {
    retourPanier = retour || document.activeElement;
    panierOuvert = true;
    panier.classList.add('ouvert'); voile.classList.add('ouvert');
    panier.setAttribute('aria-hidden', 'false');
    document.body.classList.add('fige');
    rendre();
    $('panier-fermer').focus({ preventScroll: true });
  }
  function fermerPanier() {
    panierOuvert = false;
    panier.classList.remove('ouvert'); voile.classList.remove('ouvert');
    panier.setAttribute('aria-hidden', 'true');
    if (!vis.classList.contains('ouverte')) document.body.classList.remove('fige');
    $('repli').hidden = true; $('panier-alerte').textContent = '';
    if (retourPanier && retourPanier.focus) retourPanier.focus({ preventScroll: true });
  }
  $('panier-fermer').addEventListener('click', fermerPanier);
  voile.addEventListener('click', fermerPanier);

  const zoneLignes = $('lignes');
  function rendrePanier() {
    const L = lignes();
    const k = L.length;
    const manque = Math.max(0, G.offertes - k);

    $('panier-aide').textContent = k === 0
      ? ''
      : 'Votre préférée est marquée ★. Les ' + G.offertes + ' premières images sont offertes, les suivantes sont à ' + euros(G.prix) + '.';

    zoneLignes.innerHTML = '';
    if (k === 0) {
      const v = document.createElement('li');
      v.className = 'vide';
      v.textContent = 'Votre sélection est vide. Touchez le + d’une image pour l’ajouter.';
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
        '<span class="ligne__prix' + (l.offerte ? ' offerte' : '') + '">' + (l.offerte ? 'Offerte' : euros(l.prix)) + '</span></div>' +
        '<div class="ligne__actions">' +
        '<button type="button" class="ligne__pref' + (estPref ? ' est-pref' : '') + '" aria-pressed="' + estPref + '">' + (estPref ? '★ Ma préférée' : '☆ Ma préférée') + '</button>' +
        '<button type="button" class="ligne__retirer">Retirer</button></div>';
      li.querySelector('.ligne__img').addEventListener('click', () => { fermerPanier(); ouvrirVis(l.n, $('barre-ouvrir')); });
      li.querySelector('.ligne__pref').addEventListener('click', () => choisirPref(l.n));
      li.querySelector('.ligne__retirer').addEventListener('click', () => basculer(l.n));
      zoneLignes.appendChild(li);
    });

    const payantes = L.filter((l) => !l.offerte).length;
    $('panier-calcul').textContent = k === 0 ? '' :
      manque > 0
        ? 'Il vous reste ' + manque + ' ' + pluriel(manque, 'image offerte', 'images offertes') + ' à choisir.'
        : (payantes > 0
            ? G.offertes + ' offertes, plus ' + payantes + ' ' + pluriel(payantes, 'image', 'images') + ' à ' + euros(G.prix) + '.'
            : 'Vos ' + G.offertes + ' images offertes sont choisies.');
    $('panier-total').textContent = k === 0 ? '0 €' : (total() === 0 ? 'Offert' : euros(total()));
    const bouton = $('envoyer');
    bouton.setAttribute('aria-disabled', k === 0 ? 'true' : 'false');
  }

  // ---------- le message envoyé à Bertrand ----------
  const designe = (n) => 'n° ' + n + ' (' + parN.get(n).ref + ')';
  function message() {
    const L = lignes();
    const pref = L[0];
    const offertes = L.slice(1).filter((l) => l.offerte);
    const payantes = L.filter((l) => !l.offerte);
    const rows = ['Bonjour Bertrand,', '', 'Voici ma sélection.', '', 'Ma préférée : ' + designe(pref.n)];
    if (offertes.length) rows.push(pluriel(offertes.length, 'Aussi offerte : ', 'Aussi offertes : ') + offertes.map((l) => designe(l.n)).join(', '));
    if (payantes.length) rows.push('', 'En plus, à ' + euros(G.prix) + ' chacune :', ...payantes.map((l) => '- ' + designe(l.n)));
    rows.push('', total() ? 'Total à régler : ' + euros(total()) : 'Rien à régler.', '', G.prenom);
    return rows.join('\n');
  }
  const objet = () => 'Ma sélection, ' + G.prenom;

  $('envoyer').addEventListener('click', () => {
    const alerte = $('panier-alerte');
    if (etat.panier.length === 0) { alerte.textContent = 'Ajoutez d’abord au moins une image.'; return; }
    if (etat.pref === null) { alerte.textContent = 'Choisissez votre préférée avec ☆.'; return; }
    alerte.textContent = '';
    const texte = message();
    $('repli-mail').textContent = G.mail;
    $('repli-texte').value = texte;
    $('repli').hidden = false;
    $('repli').scrollIntoView({ block: 'nearest' });
    window.location.href = 'mailto:' + G.mail + '?subject=' + encodeURIComponent(objet()) + '&body=' + encodeURIComponent(texte.replace(/\n/g, '\r\n'));
  });
  $('copier').addEventListener('click', async () => {
    const t = $('repli-texte');
    try { await navigator.clipboard.writeText(t.value); $('copier').textContent = 'Message copié'; }
    catch (e) { t.select(); document.execCommand && document.execCommand('copy'); $('copier').textContent = 'Message copié'; }
  });

  // ---------- tout remettre à jour ----------
  function rendre() {
    const L = lignes();
    G.photos.forEach((p) => {
      const li = vignettes.get(p.n);
      const choisie = dans(p.n);
      li.classList.toggle('est-choisie', choisie);
      const num_ = li.querySelector('.vignette__num');
      num_.textContent = (etat.pref === p.n ? '★ ' : '') + num(p.n);
      const b = li.querySelector('.vignette__choix');
      b.setAttribute('aria-pressed', choisie ? 'true' : 'false');
      b.setAttribute('aria-label', (choisie ? 'Retirer' : 'Ajouter') + ' l’image ' + p.n + (choisie ? ' de' : ' à') + ' ma sélection');
    });
    const k = L.length;
    barre.hidden = k === 0 || panierOuvert;
    if (k) $('barre-texte').textContent = k + ' ' + pluriel(k, 'image', 'images') + (total() ? ' · ' + euros(total()) : ' · offert');
    rendreVis();
    if (panierOuvert) rendrePanier();
  }

  // ---------- clavier ----------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (panierOuvert) fermerPanier(); else if (vis.classList.contains('ouverte')) fermerVis();
      return;
    }
    if (!vis.classList.contains('ouverte') || panierOuvert) return;
    if (e.key === 'ArrowLeft') { aller(-1); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { aller(1); e.preventDefault(); }
  });

  rendre();
})();
