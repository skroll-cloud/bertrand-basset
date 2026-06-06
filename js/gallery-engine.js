/* gallery-engine.js — Moteur du site (Portfolio class, rendu, slideshow)
 * Chargé APRÈS gallery-data.js dans index.html.
 * Ce fichier est géré par Claude — ne pas modifier manuellement.
 * ─────────────────────────────────────────────────────────── */
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
        this.bindEvents();
        this.initCursor();
        this.applyLangUI(this.currentLang);
        this.updateCartBadge();
        /* Charger la visibilité depuis Supabase, puis construire le menu */
        this._loadVisibility().then(() => {
            this.buildMenu();
            const initHash = window.location.hash.slice(1);
            if (SITE_CONFIG.showLanding === false) {
                this.openHomeGallery();
            } else if (initHash) {
                /* Hash dans l'URL → entrer directement dans le site sur la bonne vue */
                document.getElementById('landing')?.classList.add('hidden');
                document.getElementById('site')?.classList.add('active');
                this._navigateToHash(initHash);
            }
        });
    }

    async _loadVisibility() {
        const SUPA_URL = 'https://suecslynruuputmujudg.supabase.co';
        const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1ZWNzbHlucnV1cHV0bXVqdWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MTYyODcsImV4cCI6MjA5MjA5MjI4N30.c9Pa_x6MEcJdqVekBodSYpu3it-riVU1hYhC-m5iCsU';
        const hdrs = { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` };

        try {
            /* ── 1. section_visibility → masquage des items du menu ── */
            const visRes = await fetch(`${SUPA_URL}/rest/v1/section_visibility?select=id,visible`, { headers: hdrs });
            if (visRes.ok) {
                const rows = await visRes.json();
                const map  = {};
                rows.forEach(r => { map[r.id] = r.visible; });
                MENU_CONFIG.forEach(item => {
                    if (Object.prototype.hasOwnProperty.call(map, item.id)) {
                        item._hiddenByAdmin = map[item.id] === false;
                    } else {
                        delete item._hiddenByAdmin;
                    }
                });
            }

            /* ── 2. gallery_cards → métadonnées, ordre, sous-galeries ── */
            const cardsRes = await fetch(
                `${SUPA_URL}/rest/v1/gallery_cards?select=*&order=sort_order.asc`, { headers: hdrs }
            );
            if (cardsRes.ok) {
                const dbCards = await cardsRes.json();
                const dbMap   = {};
                dbCards.forEach(r => { dbMap[r.id] = r; });

                const prefixMap = { photographe: 'ph', realisateur: 'real', boutique: 'shop', 'galeries-client': 'client' };

                for (const secId in SECTIONS_CONFIG) {
                    const sec    = SECTIONS_CONFIG[secId];
                    const prefix = prefixMap[secId] || secId;

                    /* Appliquer les overrides Supabase aux cartes existantes */
                    sec.cards.forEach(card => {
                        const key = `${prefix}-${card.id}`;
                        const row = dbMap[key];
                        if (!row) return;
                        if (row.title_fr)   card.titleFr   = row.title_fr;
                        if (row.title_en)   card.titleEn   = row.title_en;
                        if (row.label_fr)   card.labelFr   = row.label_fr;
                        if (row.label_en)   card.labelEn   = row.label_en;
                        if (row.desc_fr)    card.descFr    = row.desc_fr;
                        if (row.desc_en)    card.descEn    = row.desc_en;
                        if (row.cover_img)  card.img       = row.cover_img;
                        if (row.gallery_id) card.galleryId = row.gallery_id;
                        if (row.link_url)   card.url       = row.link_url;
                        if (row.parent_id)  card.parentId  = row.parent_id;
                        card._dbId          = key;
                        card._sortOrder     = row.sort_order ?? 999;
                        /* Les cartes marquées "cachées par défaut" dans gallery-data.js
                           nécessitent visible=true explicite pour être publiées.
                           Les cartes normales sont masquées seulement si visible=false. */
                        const wasStaticHidden = card._hiddenByAdmin === true;
                        card._hiddenByAdmin = wasStaticHidden
                            ? row.visible !== true   // caché par défaut → visible seulement si admin dit true
                            : row.visible === false; // visible par défaut → caché seulement si admin dit false
                    });

                    /* Injecter les cartes Supabase qui n'existent pas dans gallery-data.js */
                    dbCards
                        .filter(r => r.section === secId && !sec.cards.find(c => `${prefix}-${c.id}` === r.id))
                        .forEach(r => {
                            sec.cards.push({
                                id:        r.id.replace(new RegExp(`^${prefix}-`), ''),
                                titleFr:   r.title_fr   || '',
                                titleEn:   r.title_en   || '',
                                labelFr:   r.label_fr   || '',
                                labelEn:   r.label_en   || '',
                                descFr:    r.desc_fr    || '',
                                descEn:    r.desc_en    || '',
                                img:       r.cover_img  || null,
                                galleryId: r.gallery_id || null,
                                url:       r.link_url   || null,
                                parentId:  r.parent_id  || null,
                                _dbId:         r.id,
                                _sortOrder:    r.sort_order ?? 999,
                                _hiddenByAdmin: r.visible === false,
                                _fromSupabase: true
                            });
                        });

                    /* Trier par sort_order */
                    sec.cards.sort((a, b) => (a._sortOrder ?? 999) - (b._sortOrder ?? 999));
                }

                /* Stocker dbCards globalement pour showSectionGrid (sous-galeries) */
                this._dbCards = dbMap;
            }
        } catch(e) { /* Silencieux — site fonctionnel même si Supabase inaccessible */ }
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
        const hiddenGroups = new Set(MENU_CONFIG.filter(i => i.type === 'group' && (i.hidden || i._hiddenByAdmin)).map(i => i.id));
        const visible = MENU_CONFIG.filter(i => !i.hidden && !i._hiddenByAdmin && !(i.parent && hiddenGroups.has(i.parent)));

        /* Build children map so ordering in config doesn't matter */
        const childrenOf = {};
        visible.filter(i => i.parent).forEach(i => {
            if (!childrenOf[i.parent]) childrenOf[i.parent] = [];
            childrenOf[i.parent].push(i);
        });

        const itemHtml = (item, isSub) => {
            const cls = isSub ? 'nav-item nav-sub-item' : 'nav-item';
            if (item.type === 'section')  return `<div class="${cls}"><a href="#" class="nav-link" data-section="${item.sectionId}">${item.name}</a></div>`;
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

        /* Hash routing — bouton Retour navigateur */
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.slice(1);
            if (!hash) {
                this._navigateToHash(SITE_CONFIG.defaultGallery || 'portrait');
                this.setActiveLink(null);
            } else {
                this._navigateToHash(hash);
            }
        });
    }

    /* Navigue vers la vue correspondant au hash (galerie, section ou page) */
    _navigateToHash(hash) {
        if (this.galleries[hash]) {
            this.openGallery(hash);
            const navLink = document.querySelector(`[data-gallery="${hash}"]`);
            this.setActiveLink(navLink || null);
            return;
        }
        if (typeof SECTIONS_CONFIG !== 'undefined' && SECTIONS_CONFIG[hash]) {
            this.showSectionGrid(hash);
            const navLink = document.querySelector(`[data-section="${hash}"]`);
            this.setActiveLink(navLink || null);
            return;
        }
        const menuPage = MENU_CONFIG.find(i => i.pageId === hash || i.id === hash);
        if (menuPage?.pageId || menuPage?.type === 'page') {
            const pageId = menuPage.pageId || hash;
            this.showPage(pageId);
            const navLink = document.querySelector(`[data-page="${pageId}"]`);
            this.setActiveLink(navLink || null);
            return;
        }
        /* Hash inconnu — galerie par défaut */
        this.openHomeGallery();
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
        } else if (this.currentPageId && SECTIONS_CONFIG[this.currentPageId]) {
            this.showSectionGrid(this.currentPageId);
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
        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                this.showSectionGrid(link.dataset.section);
                this.setActiveLink(link);
                this.closeMenu();
            });
        });
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
        history.pushState({ view: 'gallery', id }, '', '#' + id);
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
        const siblings = MENU_CONFIG.filter(i => i.parent === group.id && !i.hidden && !i._hiddenByAdmin);
        const uNav     = document.getElementById('universeNav');
        const mNav     = document.getElementById('mainNav');
        if (!uNav) return;

        const items = siblings.map(s => {
            const isActive = s.galleryId && s.galleryId === activeGalleryId;
            if (s.type === 'gallery') {
                const count = this.galleries[s.galleryId]?.items?.filter(i => i.type === 'image').length || '';
                return `<div class="universe-item${isActive ? ' active' : ''}" data-gallery="${s.galleryId}">
                    <span class="universe-item-title">${s.name}</span>
                    ${count ? `<span class="universe-item-num">${String(count).padStart(2,'0')}</span>` : ''}
                </div>`;
            } else if (s.type === 'link') {
                return `<div class="universe-item" data-href="${s.url}">
                    <span class="universe-item-title">${s.name}</span>
                </div>`;
            } else if (s.type === 'page') {
                return `<div class="universe-item${isActive ? ' active' : ''}" data-page="${s.pageId}">
                    <span class="universe-item-title">${s.name}</span>
                </div>`;
            }
            return '';
        }).join('');

        uNav.innerHTML = `
            <button class="universe-back" id="universeBackBtn">‹ Menu</button>
            <div class="universe-group-title">${group.name}</div>
            <div class="universe-items">${items}</div>`;

        /* bind clicks */
        uNav.querySelector('#universeBackBtn').addEventListener('click', () => this.exitUniverseMode());
        uNav.querySelectorAll('.universe-item[data-gallery]').forEach(el => {
            el.addEventListener('click', () => { this.openGallery(el.dataset.gallery); });
        });
        uNav.querySelectorAll('.universe-item[data-href]').forEach(el => {
            el.addEventListener('click', () => { window.location.href = el.dataset.href; });
        });
        uNav.querySelectorAll('.universe-item[data-page]').forEach(el => {
            el.addEventListener('click', () => { this.showPage(el.dataset.page); });
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
                if (title && !item.noSidebarTitle) h += `<h2 class="sidebar-item-title">${title}</h2>`;
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
        history.pushState({ view: 'page', id }, '', '#' + id);
        const container = document.getElementById('galleryContainer');
        const siteEl    = document.getElementById('site');
        if (id === 'films-player') {
            /* Stocker l'état précédent pour le bouton retour */
            window._filmsPrevState = { gallery: this.currentGalleryId, page: this.currentPageId };
            container.classList.remove('page-mode');
            siteEl?.classList.add('films-mode');
            container.innerHTML = buildFilmsPlayerPage(this.currentLang);
        } else if (id === 'travailler-ensemble') {
            siteEl?.classList.remove('films-mode');
            container.classList.remove('page-mode');
            container.innerHTML = buildTravaillerEnsemblePage(this.currentLang);
        } else {
            siteEl?.classList.remove('films-mode');
            container.classList.add('page-mode');
            let html = '';
            if (id === 'infos')                 html = buildInfosPage(this.currentLang);
            if (id === 'contact')               html = buildContactPage(this.currentLang);
            if (id === 'post-production')       html = buildPostProductionPage(this.currentLang);
            if (id === 'auteur')                html = buildAuteurPage(this.currentLang);
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

    showSectionGrid(sectionId) {
        const sec = SECTIONS_CONFIG[sectionId];
        if (!sec) return;
        this.currentGallery   = null;
        this.currentGalleryId = null;
        this.currentPageId    = sectionId;
        this.stopSlideshow();
        this.stopAudio();
        this.exitUniverseMode();
        history.pushState({ view: 'section', id: sectionId }, '', '#' + sectionId);

        const container = document.getElementById('galleryContainer');
        const siteEl    = document.getElementById('site');
        siteEl?.classList.remove('films-mode');
        container.classList.add('page-mode');
        container.classList.remove('grid-mode');

        const lang  = this.currentLang;
        const title = lang === 'en' ? sec.titleEn : sec.titleFr;

        /* Préfixe de section pour dériver les clés sans Supabase */
        const prefixMap = { photographe: 'ph', realisateur: 'real', boutique: 'shop', 'galeries-client': 'client' };
        const secPrefix = prefixMap[sectionId] || sectionId;

        /* Construire la map des enfants : parentDbId → [cartes enfants] */
        const childrenOf = {};
        sec.cards.forEach(card => {
            if (card.parentId && !card._hiddenByAdmin) {
                if (!childrenOf[card.parentId]) childrenOf[card.parentId] = [];
                childrenOf[card.parentId].push(card);
            }
        });

        /* Seules les cartes de premier niveau (sans parentId) sont affichées */
        const topCards = sec.cards.filter(card => !card._hiddenByAdmin && !card.parentId);

        const cardsHtml = topCards.map(card => {
            const label  = lang === 'en' ? card.labelEn : card.labelFr;
            const ctitle = lang === 'en' ? card.titleEn : card.titleFr;
            const desc   = lang === 'en' ? card.descEn  : card.descFr;
            const enter  = lang === 'en' ? 'Enter' : 'Entrer';
            /* Clé stable même sans row Supabase */
            const cardKey = card._dbId || `${secPrefix}-${card.id}`;
            const hasChildren = childrenOf[cardKey]?.length > 0;

            /* Action au clic */
            let action = '';
            if (hasChildren) {
                action = `onclick="window.portfolio.showSubGrid('${cardKey}','${sectionId}')"`;
            } else if (card.galleryId) {
                action = `onclick="window.portfolio.openGalleryFromSection('${card.galleryId}')"`;
            } else if (card.url) {
                action = `onclick="window.location.href='${card.url}'"`;
            } else if (card.pageId) {
                action = `onclick="window.portfolio.showPage('${card.pageId}')"`;
            } else {
                action = `onclick="void(0)"`;
            }

            const imgHtml = card.img
                ? `<div class="section-card-img-wrap">
                       <img class="section-card-img" src="${encodeURI(card.img)}" alt="${ctitle}" loading="lazy">
                       <div class="section-card-overlay"><span class="section-card-overlay-text">${enter}</span></div>
                   </div>`
                : `<div class="section-card-placeholder">${ctitle}</div>`;

            return `
                <div class="section-card" ${action}>
                    ${imgHtml}
                    <div class="section-card-body">
                        <div class="section-card-label">${label}${hasChildren ? ' ›' : ''}</div>
                        <div class="section-card-title">${ctitle}</div>
                        <div class="section-card-desc">${desc}</div>
                    </div>
                </div>`;
        }).join('');

        container.innerHTML = `
            <div class="section-grid-wrap">
                <div class="section-grid-header">
                    <span class="section-grid-title">${title.toUpperCase()}</span>
                    <button class="section-grid-back" onclick="window.portfolio.openHomeGallery();window.portfolio.setActiveLink(null)">← ${lang === 'en' ? 'Back' : 'Retour'}</button>
                </div>
                <div class="section-grid">${cardsHtml}</div>
            </div>`;

        const counter = document.querySelector('.gallery-counter');
        if (counter) counter.textContent = '';
        const descEl = document.getElementById('galleryDesc');
        if (descEl) descEl.innerHTML = '';
        const footerCap = document.getElementById('footerCaption');
        if (footerCap) footerCap.innerHTML = '';
    }

    showSubGrid(parentDbId, sectionId) {
        const sec = SECTIONS_CONFIG[sectionId];
        if (!sec) return;
        this.currentGallery   = null;
        this.currentGalleryId = null;
        this.currentPageId    = sectionId + ':' + parentDbId;
        this.stopSlideshow();
        this.stopAudio();

        const container = document.getElementById('galleryContainer');
        container.classList.add('page-mode');
        container.classList.remove('grid-mode');

        const lang = this.currentLang;
        const prefixMap2 = { photographe: 'ph', realisateur: 'real', boutique: 'shop' };
        const secPrefix2 = prefixMap2[sectionId] || sectionId;
        const parentCard = sec.cards.find(c => c._dbId === parentDbId || `${secPrefix2}-${c.id}` === parentDbId);
        const parentTitle = parentCard ? (lang === 'en' ? parentCard.titleEn : parentCard.titleFr) : '';

        /* Enfants : cartes dont parentId === parentDbId, non masquées */
        const children = sec.cards.filter(c => c.parentId === parentDbId && !c._hiddenByAdmin);
        const enter = lang === 'en' ? 'Enter' : 'Entrer';
        const back  = lang === 'en' ? 'Back'  : 'Retour';

        const cardsHtml = children.map(card => {
            const label  = lang === 'en' ? card.labelEn : card.labelFr;
            const ctitle = lang === 'en' ? card.titleEn : card.titleFr;
            const desc   = lang === 'en' ? card.descEn  : card.descFr;

            let action = '';
            if (card.galleryId) {
                action = `onclick="window.portfolio.openGalleryFromSection('${card.galleryId}')"`;
            } else if (card.url) {
                action = `onclick="window.location.href='${card.url}'"`;
            } else if (card.pageId) {
                action = `onclick="window.portfolio.showPage('${card.pageId}')"`;
            } else {
                action = `onclick="void(0)"`;
            }

            const imgHtml = card.img
                ? `<div class="section-card-img-wrap">
                       <img class="section-card-img" src="${encodeURI(card.img)}" alt="${ctitle}" loading="lazy">
                       <div class="section-card-overlay"><span class="section-card-overlay-text">${enter}</span></div>
                   </div>`
                : `<div class="section-card-placeholder">${ctitle}</div>`;

            return `
                <div class="section-card" ${action}>
                    ${imgHtml}
                    <div class="section-card-body">
                        <div class="section-card-label">${label}</div>
                        <div class="section-card-title">${ctitle}</div>
                        <div class="section-card-desc">${desc}</div>
                    </div>
                </div>`;
        }).join('');

        container.innerHTML = `
            <div class="section-grid-wrap">
                <div class="section-grid-header">
                    <span class="section-grid-title">${parentTitle.toUpperCase()}</span>
                    <button class="section-grid-back" onclick="window.portfolio.showSectionGrid('${sectionId}')">← ${back}</button>
                </div>
                <div class="section-grid">${cardsHtml || `<div style="padding:2rem;font-size:0.75rem;color:#999">Aucune sous-galerie visible.</div>`}</div>
            </div>`;

        const counter = document.querySelector('.gallery-counter');
        if (counter) counter.textContent = '';
        const descEl = document.getElementById('galleryDesc');
        if (descEl) descEl.innerHTML = '';
        const footerCap = document.getElementById('footerCaption');
        if (footerCap) footerCap.innerHTML = '';
    }

    openGalleryFromSection(galleryId) {
        this.openGallery(galleryId);
        const navLink = document.querySelector(`[data-gallery="${galleryId}"]`);
        /* Ne pas changer l'item actif dans la sidebar — on reste dans la section */
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

document.addEventListener('DOMContentLoaded', () => {
    // Guard : ne pas initialiser le Portfolio sur admin.html (pas de #galleryContainer)
    if (!document.getElementById('galleryContainer')) return;
    window.portfolio = new Portfolio();
});
