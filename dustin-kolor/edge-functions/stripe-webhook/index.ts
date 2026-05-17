/**
 * Supabase Edge Function : stripe-webhook
 * Traite les événements Stripe :
 *   - checkout.session.completed : met à jour le stock + envoie les emails
 *
 * ── Deploy ──────────────────────────────────────────────────────────────────
 * supabase functions deploy stripe-webhook
 *
 * ── Secrets à configurer ─────────────────────────────────────────────────
 * supabase secrets set STRIPE_SECRET_KEY=sk_live_...
 * supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
 * supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
 * supabase secrets set RESEND_API_KEY=re_...
 *
 * ── Dans Stripe Dashboard → Webhooks ─────────────────────────────────────
 * URL : https://[PROJECT_REF].supabase.co/functions/v1/stripe-webhook
 * Événements : checkout.session.completed
 */

import { serve }        from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe           from 'https://esm.sh/stripe@13?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const BERTRAND_EMAIL = 'bertrand.basset@gmail.com';
const FROM_EMAIL     = 'Dust\'in Kolor <boutique@bertrandbasset.com>'; // domaine à vérifier dans Resend

/* ── Envoyer un email via Resend ─────────────────────────────────────────── */
async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) { console.warn('RESEND_API_KEY manquant — email non envoyé'); return; }

  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`Resend error [${res.status}]:`, err);
  } else {
    console.log(`Email envoyé à ${to} — "${subject}"`);
  }
}

/* ── Email de confirmation client ────────────────────────────────────────── */
function buildEmailClient(session: Stripe.Checkout.Session, lignes: string[]): string {
  const nom     = session.shipping_details?.name || session.customer_details?.name || 'Client';
  const adresse = session.shipping_details?.address;
  const adrTxt  = adresse
    ? `${adresse.line1}${adresse.line2 ? ', ' + adresse.line2 : ''}, ${adresse.postal_code} ${adresse.city}, ${adresse.country}`
    : '';
  const total   = ((session.amount_total || 0) / 100).toLocaleString('fr-FR');

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body { margin:0; padding:0; background:#fafafa; font-family:'Helvetica Neue',Arial,sans-serif; color:#111; }
  .wrap { max-width:560px; margin:40px auto; background:#fff; border:1px solid #e0e0e0; }
  .header { padding:32px 40px 24px; border-bottom:1px solid #e0e0e0; }
  .header img { width:28px; opacity:0.8; }
  .header-title { font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#999; margin-top:12px; }
  .body { padding:32px 40px; }
  h1 { font-size:24px; font-weight:300; letter-spacing:-0.02em; margin:0 0 8px; }
  .intro { font-size:14px; color:#555; line-height:1.7; margin:0 0 28px; }
  .section-title { font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:#999; margin-bottom:12px; }
  .item-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f0f0f0; font-size:13px; }
  .item-label { color:#555; }
  .total-row { display:flex; justify-content:space-between; padding:14px 0 0; font-size:16px; font-weight:300; }
  .addr-block { background:#f7f7f7; padding:14px 16px; font-size:13px; color:#555; line-height:1.7; margin:20px 0; }
  .delay-note { font-size:13px; color:#555; line-height:1.7; padding:16px 0; border-top:1px solid #f0f0f0; }
  .footer { padding:20px 40px; border-top:1px solid #e0e0e0; font-size:11px; color:#aaa; line-height:1.7; }
  .footer a { color:#555; }
</style>
</head><body><div class="wrap">
<div class="header">
  <div style="font-size:18px;font-weight:300;letter-spacing:0.1em">B</div>
  <div class="header-title">Dust'in Kolor — Bertrand Basset</div>
</div>
<div class="body">
  <h1>Merci, ${nom} !</h1>
  <p class="intro">Votre commande a bien été reçue et votre paiement confirmé. Vos tirages sont fabriqués à la commande par <strong>Pix in the City</strong>, Auray — comptez <strong>2 à 3 semaines</strong>.</p>

  <p class="section-title">Votre commande</p>
  ${lignes.map(l => `<div class="item-row"><span class="item-label">${l.split('|')[0]}</span><span>${l.split('|')[1]}</span></div>`).join('')}
  <div class="total-row"><span>Total payé</span><span><strong>${total} €</strong></span></div>

  ${adrTxt ? `<div class="addr-block"><strong style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#999;">Expédié à</strong><br>${adrTxt}</div>` : ''}

  <p class="delay-note">Vous recevrez un email de Pix in the City avec le numéro de suivi lorsque votre commande sera expédiée.<br>Des questions ? <a href="mailto:${BERTRAND_EMAIL}">${BERTRAND_EMAIL}</a></p>
</div>
<div class="footer">
  Bertrand Basset — SIREN 820 257 962 — Carantec, Finistère<br>
  <a href="https://bertrandbasset.com">bertrandbasset.com</a>
</div>
</div></body></html>`;
}

/* ── Email de notification Bertrand ──────────────────────────────────────── */
function buildEmailBertrand(session: Stripe.Checkout.Session, lignes: string[]): string {
  const clientNom   = session.shipping_details?.name || session.customer_details?.name || '—';
  const clientEmail = session.customer_details?.email || '—';
  const adresse     = session.shipping_details?.address;
  const adrTxt      = adresse
    ? `${adresse.line1}${adresse.line2 ? ', ' + adresse.line2 : ''} · ${adresse.postal_code} ${adresse.city} · ${adresse.country}`
    : '—';
  const total = ((session.amount_total || 0) / 100).toLocaleString('fr-FR');
  const dt    = new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Paris' });

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">
<style>
  body { font-family:'Helvetica Neue',Arial,sans-serif; color:#111; background:#fff; padding:32px; max-width:560px; margin:auto; }
  h1 { font-size:20px; font-weight:400; margin:0 0 4px; }
  .meta { font-size:12px; color:#999; margin-bottom:24px; }
  table { width:100%; border-collapse:collapse; margin-bottom:20px; }
  th { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:#999; text-align:left; padding:6px 0; border-bottom:1px solid #eee; }
  td { font-size:13px; padding:8px 0; border-bottom:1px solid #f5f5f5; vertical-align:top; }
  td:last-child { text-align:right; }
  .total { font-size:16px; font-weight:400; }
  .info-block { background:#f7f7f7; padding:14px; font-size:13px; line-height:1.7; margin-bottom:20px; }
  .label { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:#999; }
</style></head><body>
<h1>🛒 Nouvelle commande</h1>
<p class="meta">${dt} · Session Stripe : ${session.id}</p>

<div class="info-block">
  <div class="label">Client</div>
  ${clientNom} · <a href="mailto:${clientEmail}">${clientEmail}</a><br>
  <div class="label" style="margin-top:8px">Adresse</div>
  ${adrTxt}
</div>

<table>
  <tr><th>Article</th><th>Montant</th></tr>
  ${lignes.map(l => `<tr><td>${l.split('|')[0]}</td><td>${l.split('|')[1]}</td></tr>`).join('')}
  <tr><td class="total">Total</td><td class="total">${total} €</td></tr>
</table>

<p style="font-size:12px;color:#999">Stripe session: ${session.id}<br>Payment intent: ${session.payment_intent}</p>
</body></html>`;
}

/* ── Handler principal ───────────────────────────────────────────────────── */
serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body      = await req.text();

  // Vérifier la signature Stripe
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body, signature!, Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    );
  } catch (err) {
    console.error('Signature Stripe invalide:', (err as Error).message);
    return new Response('Signature invalide', { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return new Response('Event ignoré', { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const cartJson = session.metadata?.cart_json || '';
  const clientEmail = session.customer_details?.email;

  // Récupérer les line_items depuis Stripe pour les emails
  const lineItemsStripe = await stripe.checkout.sessions.listLineItems(session.id, { limit: 20 });
  const lignes: string[] = lineItemsStripe.data.map(li => {
    const montant = ((li.amount_total || 0) / 100).toLocaleString('fr-FR');
    return `${li.description || li.price?.product as string || 'Article'}|${montant} €`;
  });

  // Parser le cart_json pour mettre à jour le stock
  if (cartJson) {
    const cartItems = cartJson.split('||').map((s: string) => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean);

    for (const item of cartItems) {
      try {
        if (item.type === 'simple' || item.type === 'dibond') {
          const { error } = await supabase.rpc('increment_vendus_petit', { p_slug: item.slug });
          if (error) console.error(`increment_vendus_petit(${item.slug}):`, error);
          else console.log(`✅ vendus_petit++ pour ${item.slug}`);
        } else if (item.type === 'grand') {
          const { error } = await supabase.rpc('increment_vendus_grand', { p_slug: item.slug });
          if (error) console.error(`increment_vendus_grand(${item.slug}):`, error);
          else console.log(`✅ vendus_grand++ pour ${item.slug}`);
        }
        // Les cartes n'ont pas de compteur de stock
      } catch (e) {
        console.error('Stock update error:', e);
      }
    }
  }

  // Enregistrer la vente dans Supabase
  await supabase.from('kolor_ventes').insert({
    stripe_session_id:     session.id,
    stripe_payment_intent: session.payment_intent,
    montant_eur:           (session.amount_total || 0) / 100,
    customer_email:        clientEmail || null,
    customer_name:         session.shipping_details?.name || session.customer_details?.name || null,
    shipping_address:      session.shipping_details?.address ? JSON.stringify(session.shipping_details.address) : null,
    cart_json:             cartJson,
    created_at:            new Date().toISOString(),
  });

  // Envoyer les emails
  if (clientEmail) {
    await sendEmail(
      clientEmail,
      'Votre commande Dust\'in Kolor est confirmée ✓',
      buildEmailClient(session, lignes)
    );
  }

  await sendEmail(
    BERTRAND_EMAIL,
    `🛒 Nouvelle commande DK — ${((session.amount_total || 0) / 100).toLocaleString('fr-FR')} €`,
    buildEmailBertrand(session, lignes)
  );

  return new Response('OK', { status: 200 });
});
