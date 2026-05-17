/**
 * Supabase Edge Function : stripe-checkout
 * Reçoit le panier, vérifie les prix + le stock, crée une session Stripe Checkout.
 *
 * ── Deploy ──────────────────────────────────────────────────────────────────
 * supabase functions deploy stripe-checkout
 *
 * ── Secrets à configurer dans Supabase Dashboard → Settings → Secrets ─────
 * supabase secrets set STRIPE_SECRET_KEY=sk_live_...
 * supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
 * supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
 *
 * ── Variables d'environnement automatiques ───────────────────────────────
 * SUPABASE_URL et SUPABASE_ANON_KEY sont injectées automatiquement.
 */

import { serve }        from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe           from 'https://esm.sh/stripe@13?target=deno';

/* ── Clients ─────────────────────────────────────────────────────────────── */
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

/* ── Table de prix officielle (miroir de boutique.html) ──────────────────── */
const PRICE_TABLE: Record<string, { simple: number; dibond: number; chassis_sur: number; grand: number }> = {
  'sandstorm-feu':          { simple: 145, dibond: 300, chassis_sur: 50, grand: 820  },
  'flying-car-orange':      { simple: 175, dibond: 300, chassis_sur: 50, grand: 1290 },
  'after-the-storm-vert':   { simple: 175, dibond: 300, chassis_sur: 50, grand: 1290 },
  'lost-in-the-dust-rouge': { simple: 140, dibond: 300, chassis_sur: 30, grand: 890  },
  'camp-lighters-jaune':    { simple: 150, dibond: 340, chassis_sur: 45, grand: 790  },
  'im-here-bleu':           { simple: 140, dibond: 300, chassis_sur: 30, grand: 890  },
  'umbrellas-way-rose':     { simple: 140, dibond: 300, chassis_sur: 30, grand: 890  },
};

const EARLY_PETIT = 2;    // premiers acheteurs petit format bénéficiant du -10%
const EARLY_GRAND = 1;    // premier acheteur grand format bénéficiant du -10%
const EARLY_TAUX  = 0.10;
const CARTE_PRIX  = 6;
const CARTE_PACK  = 15;
const PROMO_CODE  = 'Maman';
const PROMO_TAUX  = 0.10;

/* ── CORS ────────────────────────────────────────────────────────────────── */
const CORS = {
  'Access-Control-Allow-Origin':  'https://bertrandbasset.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

/* ── Calcul du prix early-adopter ────────────────────────────────────────── */
function prixEarlyPetit(prix: number, vendus: number): number {
  return vendus < EARLY_PETIT ? Math.round(prix * (1 - EARLY_TAUX)) : prix;
}
function prixEarlyGrand(prix: number, vendus: number): number {
  return vendus < EARLY_GRAND ? Math.round(prix * (1 - EARLY_TAUX)) : prix;
}

/* ── Handler ─────────────────────────────────────────────────────────────── */
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { items, promo, success_url, cancel_url } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return json({ error: 'Panier vide' }, 400);
    }

    const promoOk = promo?.toLowerCase() === PROMO_CODE.toLowerCase();
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const cartMeta: string[] = [];

    for (const item of items) {
      const qty = item.qty || 1;

      /* ── Tirages (simple / dibond / grand) ──────────────────────────────── */
      if (['simple', 'dibond', 'grand'].includes(item.type)) {
        const slug = item.slug;
        if (!slug || !PRICE_TABLE[slug]) {
          return json({ error: `Œuvre inconnue : ${slug}` }, 400);
        }

        // Lire le stock en temps réel dans Supabase
        const { data: ed, error: dbErr } = await supabase
          .from('kolor_editions')
          .select('slug, vendus_petit, vendus_grand, ed_petit, ed_grand')
          .eq('slug', slug)
          .single();

        if (dbErr || !ed) return json({ error: `Œuvre introuvable : ${slug}` }, 404);

        let prixBase: number;
        let prixFinal: number;
        let description: string;

        if (item.type === 'grand') {
          if (ed.vendus_grand >= ed.ed_grand) return json({ error: `Grand format épuisé : ${slug}` }, 409);
          prixBase  = PRICE_TABLE[slug].grand;
          prixFinal = prixEarlyGrand(prixBase, ed.vendus_grand);
          description = `Grand format · Ex. ${ed.vendus_grand + 1}/${ed.ed_grand} · Dibond 2mm`;
        } else {
          if (ed.vendus_petit >= ed.ed_petit) return json({ error: `Tirage épuisé : ${slug}` }, 409);
          prixBase = item.type === 'dibond'
            ? PRICE_TABLE[slug].dibond + (item.chassis ? PRICE_TABLE[slug].chassis_sur : 0)
            : PRICE_TABLE[slug].simple;
          prixFinal = prixEarlyPetit(prixBase, ed.vendus_petit);
          description = item.type === 'dibond'
            ? `Contrecollé Dibond${item.chassis ? ' + Châssis alu' : ''} · Ex. ${ed.vendus_petit + 1}/${ed.ed_petit}`
            : `Tirage Fine Art · Ex. ${ed.vendus_petit + 1}/${ed.ed_petit}`;
        }

        // Validation anti-manipulation : le prix reçu doit correspondre
        if (Number(item.prix) !== prixFinal) {
          console.warn(`Prix invalide pour ${slug}/${item.type} : reçu ${item.prix}, attendu ${prixFinal}`);
          // On utilise le prix calculé côté serveur (ne pas rejeter, juste corriger)
        }

        const prixAvecPromo = promoOk ? Math.round(prixFinal * (1 - PROMO_TAUX)) : prixFinal;

        lineItems.push({
          price_data: {
            currency: 'eur',
            unit_amount: prixAvecPromo * 100,
            product_data: {
              name: `${item.titre}`,
              description,
              images: [`https://bertrandbasset.com/images/dustin-kolor/${ed.slug === 'sandstorm-feu' ? '01' : ed.slug === 'flying-car-orange' ? '02' : '?'}.jpg`],
            },
          },
          quantity: 1,
        });

        cartMeta.push(JSON.stringify({
          type: item.type, slug, chassis: item.chassis || false,
          vendus_petit: ed.vendus_petit, vendus_grand: ed.vendus_grand,
        }));

      /* ── Cartes postales ────────────────────────────────────────────────── */
      } else if (item.type === 'carte') {
        const prixAvecPromo = promoOk ? Math.round(CARTE_PRIX * (1 - PROMO_TAUX)) : CARTE_PRIX;
        lineItems.push({
          price_data: {
            currency: 'eur',
            unit_amount: prixAvecPromo * 100,
            product_data: { name: item.titre, description: 'Carte postale DL · Papier soft touch' },
          },
          quantity: qty,
        });
        cartMeta.push(JSON.stringify({ type: 'carte', id: item.id, qty }));

      } else if (item.type === 'carte-pack') {
        const prixAvecPromo = promoOk ? Math.round(CARTE_PACK * (1 - PROMO_TAUX)) : CARTE_PACK;
        lineItems.push({
          price_data: {
            currency: 'eur',
            unit_amount: prixAvecPromo * 100,
            product_data: { name: item.titre, description: 'Pack 3 cartes DL · Papier soft touch' },
          },
          quantity: qty,
        });
        cartMeta.push(JSON.stringify({ type: 'carte-pack', ids: item.ids, qty }));
      }
    }

    /* ── Créer la session Stripe ─────────────────────────────────────────── */
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: 'fr',
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC', 'DE', 'IT', 'ES', 'PT', 'NL', 'GB', 'US', 'CA'],
      },
      phone_number_collection: { enabled: false },
      metadata: {
        cart_json: cartMeta.join('||'),
        promo: promoOk ? PROMO_CODE : '',
      },
      success_url: (success_url || 'https://bertrandbasset.com/dustin-kolor/merci.html') + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url:  cancel_url  || 'https://bertrandbasset.com/dustin-kolor/panier.html',
    });

    return json({ url: session.url });

  } catch (e) {
    console.error('stripe-checkout error:', e);
    return json({ error: String((e as Error).message) }, 500);
  }
});
