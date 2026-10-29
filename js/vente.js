/* Page de vente du concours Flying Car : décompte, choix des cartes (une carte = une chance), formulaire, visionneuse.
   Maquette : rien n'est envoyé. Prix des cartes = ceux de la boutique : 6 € l'unité, 3 pour 15 €. Retrait à Carantec du 15 décembre à fin janvier, sinon frais de port en option au panier. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const calme = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mode réel : la commande part au serveur (fonction « concours-commander »), qui ouvre le paiement Stripe.
  // Sur bertrandbasset.com c'est automatique ; en local on reste en maquette, sauf avec ?reel=1.
  const API = 'https://suecslynruuputmujudg.supabase.co/functions/v1/concours-commander';
  const REEL = location.hostname === 'bertrandbasset.com' || new URLSearchParams(location.search).has('reel');
  const PRIX = 6, PACK = 15;
  const PORT = 4;                                                // envoi par la poste : 4 €, toujours (pas de port offert)
  const TIRAGE = new Date('2026-12-24T16:00:00+01:00');
  // titres connus de la série ; les trois autres cartes sont nommées par leur couleur
  const CARTES = [
    ['01', 'Umbrellas Way', true], ['02', 'Camp Lighters'], ['03', 'Jaune'], ['04', 'Brume rouge'], ['05', "I'm Here"],
    ['06', 'Orange rouge'], ['07', 'After the Storm'], ['08', 'Lost in the Dust'], ['09', 'Flying Car']
  ].map(([n, nom, vertical], k) => ({ k, n, nom, vertical: !!vertical, src: `images/concours/carte-${n}.jpg`, thumb: `images/concours/carte-${n}-t.jpg` }));
  const qte = CARTES.map(() => 0);
  const total = () => qte.reduce((a, b) => a + b, 0);
  const SERIE = 40;                                              // les 9 cartes différentes
const prix = (n, series = 0) => series * SERIE + (n - 9 * series) % 3 * PRIX + Math.floor((n - 9 * series) / 3) * PACK;
const series = () => Math.min(...qte);
const calcul = () => { const s = series(); return prix(total(), s); };

  /* ---------- date du tirage dans la barre ---------- */
  function decompte() {
    const ms = Math.max(0, TIRAGE - new Date()), j = Math.floor(ms / 864e5);
    $('#barre-temps').textContent = ms ? `Tirage dans ${j} j` : 'Tirage effectué';
  }
  decompte(); setInterval(decompte, 60000);

  /* ---------- barre : fond au défilement, barre d'action sur téléphone ---------- */
  const hero = $('.concours');
  new IntersectionObserver(([e]) => { $('#action').hidden = e.isIntersecting || formVisible; }, { rootMargin: '-64px 0px 0px 0px' }).observe(hero);
  let formVisible = false;
  new IntersectionObserver(([e]) => { formVisible = e.isIntersecting; if (formVisible) $('#action').hidden = true; else $('#action').hidden = hero.getBoundingClientRect().bottom > 64; }).observe($('#participer'));

  /* ---------- les cartes ---------- */
  const tuile = c => `
    <figure class="cp" data-k="${c.k}">
      <button class="cp-img" type="button" data-voir="${c.k}" aria-label="Voir la carte ${c.n}, ${esc(c.nom)}, en grand">
        <img src="${c.src}" alt="Carte postale ${c.n} : ${esc(c.nom)}" loading="lazy" width="${c.vertical ? 849 : 1800}" height="${c.vertical ? 1800 : 849}">
        ${c.nom === 'Flying Car' ? '<span class="cp-badge">Le tirage à gagner</span>' : ''}
        <span class="cp-zoom" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="#fff" stroke-width="1.8"/></svg></span>
      </button>
      <figcaption class="cp-bas">
        <span class="cp-nom"><b>${c.n}</b> · ${esc(c.nom)}</span>
        <span class="qte" role="group" aria-label="Quantité, carte ${c.n}">
          <button class="moins" type="button" data-moins="${c.k}" aria-label="Retirer une carte ${c.n}" disabled>−</button>
          <output aria-live="polite">0</output>
          <button class="plus" type="button" data-plus="${c.k}" aria-label="Ajouter une carte ${c.n}">+</button>
        </span>
      </figcaption>
    </figure>`;
  $('#cp-vertical').innerHTML = CARTES.filter(c => c.vertical).map(tuile).join('');
  $('#cp-paysage').innerHTML = CARTES.filter(c => !c.vertical).map(tuile).join('');

  function maj() {
    const n = total(), s = series(), p = calcul(), packs = Math.floor((n - 9 * s) / 3);
    CARTES.forEach(c => {
      const f = $(`.cp[data-k="${c.k}"]`);
      f.classList.toggle('choisie', qte[c.k] > 0);
      $('output', f).textContent = qte[c.k];
      $('.moins', f).disabled = qte[c.k] === 0;
    });
    const lib = n > 1 ? 'chances de gagner' : 'chance de gagner';
    $('#r-n').textContent = n; $('#r-lib').textContent = lib; $('#r-prix').textContent = p + ' €';
    $('#a-n').textContent = n; $('#a-lib').textContent = n > 1 ? 'chances' : 'chance'; $('#a-prix').textContent = p + ' €';
    $('#r-note').textContent = !n ? 'Choisissez au moins une carte postale.'
      : s ? `${s > 1 ? s + ' séries complètes' : 'La série complète'} à 40 €${n > 9 * s ? ', plus ' + (n - 9 * s) + ' carte' + (n - 9 * s > 1 ? 's' : '') : ''}.`
      : packs ? `${packs > 1 ? packs + ' packs de 3' : 'Pack de 3 cartes'} à 15 € : vous économisez ${packs * (3 * PRIX - PACK)} €.`
      : n === 2 ? 'Une carte de plus et les trois coûtent 15 €.' : `${n} carte${n > 1 ? 's' : ''} à 6 € l'unité.`;
    $('#r-liste').innerHTML = CARTES.filter(c => qte[c.k]).map(c => `<li><img src="${c.thumb}" alt="">${c.n}${qte[c.k] > 1 ? ' × ' + qte[c.k] : ''}</li>`).join('');
    // frais de port : affichés dès qu'on choisit l'envoi par la poste
    const envoi = $('#form').elements.remise.value === 'envoi', rp = $('#r-port');
    rp.hidden = !envoi || !n;
    rp.textContent = `+ ${PORT} € de port, soit ${p + PORT} €`;
  }
  $('#form').addEventListener('change', e => { if (e.target.name === 'remise') maj(); });
  document.addEventListener('click', e => {
    const p = e.target.closest('[data-plus]'), m = e.target.closest('[data-moins]'), v = e.target.closest('[data-voir]');
    if (p) { qte[+p.dataset.plus]++; maj(); }
    else if (m) { qte[+m.dataset.moins] = Math.max(0, qte[+m.dataset.moins] - 1); maj(); }
    else if (v) ouvre(+v.dataset.voir);
  });
  $('#b-serie').addEventListener('click', () => { qte.fill(Math.max(1, series())); maj(); $('#participer').scrollIntoView({ behavior: calme ? 'auto' : 'smooth', block: 'start' }); });
  maj();

  /* ---------- formulaire ---------- */
  const f = $('#form');
  const mailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const telOk = v => /^\+?[\d\s.()-]{8,}$/.test(v) && v.replace(/\D/g, '').length >= 8;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f)), err = [], n = total();
    const email = String(d.email || '').trim(), tel = String(d.telephone || '').trim();
    ['prenom', 'nom'].forEach(k => f.elements[k].setAttribute('aria-invalid', String(!String(d[k] || '').trim())));
    f.elements.email.setAttribute('aria-invalid', String(!!email && !mailOk(email)));
    f.elements.telephone.setAttribute('aria-invalid', String(!!tel && !telOk(tel)));
    if (!n) err.push('Choisissez au moins une carte postale : chaque carte achetée est une chance de gagner.');
    if (!String(d.prenom || '').trim() || !String(d.nom || '').trim()) err.push('Indiquez votre prénom et votre nom.');
    if (!email && !tel) { err.push('Indiquez un e-mail ou un numéro de téléphone, au moins l\'un des deux.'); f.elements.email.setAttribute('aria-invalid', 'true'); f.elements.telephone.setAttribute('aria-invalid', 'true'); }
    if (email && !mailOk(email)) err.push('Cet e-mail n\'a pas l\'air complet.');
    if (tel && !telOk(tel)) err.push('Ce numéro de téléphone n\'a pas l\'air complet.');
    if (!d.reglement) err.push('Cochez la case du règlement.');
    const box = $('#erreurs'); box.hidden = !err.length; box.innerHTML = err.map(esc).join('<br>');
    if (err.length) return;
    const det = CARTES.filter(x => qte[x.k]).map(x => `n° ${x.n}${qte[x.k] > 1 ? ' × ' + qte[x.k] : ''}`).join(', ');
    const envoi = d.remise === 'envoi', port = envoi ? PORT : 0;
    const ou = [email, tel].filter(Boolean).join(' ou au ');
    if (REEL) { commander(d, email, tel); return; }
    $('#merci-t').textContent = `Merci ${d.prenom.trim()} : ${n} chance${n > 1 ? 's' : ''} de gagner Flying Car.`;
    $('#merci-p').textContent = `Vos cartes postales : ${det}. Total ${calcul() + port} €${port ? ', port compris' : ''}. ${envoi ? 'Elles vous sont envoyées par la poste.' : 'À retirer à Carantec du 15 décembre à fin janvier.'} Tirage au sort le 24 décembre à 16 h à la Brasserie Graphique ; si vous gagnez, nous vous prévenons au ${ou}.`;
    $('.p-gauche').hidden = true; f.hidden = true; $('#merci').hidden = false; $('#merci').focus({ preventScroll: true });
    $('#participer').scrollIntoView({ behavior: calme ? 'auto' : 'smooth', block: 'start' });
  });
  async function commander(d, email, telephone) {
    const bouton = $('button[type="submit"]', f), texte = bouton.textContent, box = $('#erreurs');
    bouton.disabled = true; bouton.textContent = 'Un instant…';
    try {
      const cartes = Object.fromEntries(CARTES.map(x => [x.n, qte[x.k]]).filter(([, q]) => q > 0));
      const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prenom: d.prenom, nom: d.nom, email, telephone, contact: email || telephone, remise: d.remise, reglement: true, cartes, retour: location.origin + location.pathname }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.url) { location.href = j.url; return; }
      throw new Error(j.error || 'Le paiement n\'a pas pu s\'ouvrir. Réessayez dans un instant.');
    } catch (e) {
      box.hidden = false; box.textContent = e.message || 'Une erreur est survenue. Réessayez.';
      bouton.disabled = false; bouton.textContent = texte;
    }
  }
  // retour de la page de paiement
  const q = new URLSearchParams(location.search);
  if (q.get('merci')) {
    $('#merci-t').textContent = 'Merci ! Votre paiement est reçu.';
    $('#merci-p').textContent = `Commande ${q.get('commande') || ''}. Chaque carte postale achetée est une chance de gagner Flying Car : tirage au sort et remise du lot le 24 décembre à 16 h, à la Brasserie Graphique. Vos cartes sont à retirer à Carantec du 15 décembre à fin janvier, ou vous sont envoyées par la poste.`;
    $('.maquette').hidden = true; $('#b-refaire').hidden = true;
    $('.p-gauche').hidden = true; f.hidden = true; $('#merci').hidden = false;
    setTimeout(() => $('#participer').scrollIntoView({ block: 'start' }), 300);
  } else if (q.get('annule')) {
    $('#erreurs').hidden = false; $('#erreurs').textContent = 'Paiement annulé : rien n\'a été débité. Vos cartes sont toujours là.';
  }
  f.addEventListener('input', e => { if (e.target.getAttribute('aria-invalid') === 'true') e.target.setAttribute('aria-invalid', 'false'); });
  $('#b-refaire').addEventListener('click', () => { $('#merci').hidden = true; $('.p-gauche').hidden = false; f.hidden = false; f.elements.prenom.focus(); });

  /* ---------- visionneuse ---------- */
  const lb = $('#lb'); let i = 0, retour = null, lot = false;
  function montre() { if (lot) { $('#lb-img').src = 'images/concours/flying-car.jpg'; $('#lb-img').alt = 'Flying Car'; $('#lb-leg').textContent = 'Flying Car · 70 × 124 cm'; $('#lb-prec').hidden = $('#lb-suiv').hidden = $('#lb-ajout').hidden = true; return; } $('#lb-prec').hidden = $('#lb-suiv').hidden = $('#lb-ajout').hidden = false; const c = CARTES[i]; $('#lb-img').src = c.src; $('#lb-img').alt = `Carte ${c.n}, ${c.nom}`; $('#lb-leg').textContent = `Carte ${c.n} · ${c.nom} · ${i + 1} / ${CARTES.length}`; }
  function ouvre(k, estLot) { lot = !!estLot; i = k || 0; retour = document.activeElement; montre(); lb.hidden = false; document.body.classList.add('fige'); $('#lb-fermer').focus(); }
  function ferme() { lb.hidden = true; document.body.classList.remove('fige'); if (retour && retour.focus) retour.focus(); }
  const va = d => { if (lot) return; i = (i + d + CARTES.length) % CARTES.length; montre(); };
  $('#lb-fermer').addEventListener('click', ferme);
  lb.addEventListener('click', e => { if (e.target === lb) ferme(); });
  $('#lb-prec').addEventListener('click', () => va(-1));
  $('#lb-suiv').addEventListener('click', () => va(1));
  $('#lb-ajout').addEventListener('click', e => { qte[i]++; maj(); e.currentTarget.textContent = 'Ajoutée ✓'; setTimeout(() => { e.currentTarget.textContent = 'Ajouter cette carte'; }, 1100); });
  $('#img-lot').addEventListener('click', () => ouvre(0, true));
  document.addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') ferme(); else if (e.key === 'ArrowLeft') va(-1); else if (e.key === 'ArrowRight') va(1); });

  /* ---------- apparition douce, une seule fois ---------- */
  if ('IntersectionObserver' in window && !calme) {
    const o = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('vu'); o.unobserve(x.target); } }), { threshold: .12 });
    $$('.reveal').forEach(el => o.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('vu'));
})();
