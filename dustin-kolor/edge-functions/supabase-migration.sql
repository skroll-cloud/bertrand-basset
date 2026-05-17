-- ══════════════════════════════════════════════════════════════════
--  Dust'in Kolor — Migration Supabase v2
--  À exécuter dans : Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- 1. Mise à jour de la table kolor_editions
--    (remplace l'ancienne structure vendus_dibond / vendus_a4)
-- ──────────────────────────────────────────────────────────────────
ALTER TABLE kolor_editions
  ADD COLUMN IF NOT EXISTS vendus_petit integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS vendus_grand integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ed_petit     integer NOT NULL DEFAULT 30,
  ADD COLUMN IF NOT EXISTS ed_grand     integer NOT NULL DEFAULT 10;

-- Remettre tout à zéro (early adopter)
UPDATE kolor_editions SET vendus_petit = 0, vendus_grand = 0;

-- 2. Fonctions atomiques (sans race condition)
-- ──────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION increment_vendus_petit(p_slug text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE kolor_editions SET vendus_petit = vendus_petit + 1 WHERE slug = p_slug;
END;
$$;

CREATE OR REPLACE FUNCTION increment_vendus_grand(p_slug text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE kolor_editions SET vendus_grand = vendus_grand + 1 WHERE slug = p_slug;
END;
$$;

-- 3. Table des ventes (log complet)
-- ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS kolor_ventes (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id     text UNIQUE,
  stripe_payment_intent text,
  montant_eur           numeric(10,2),
  customer_email        text,
  customer_name         text,
  shipping_address      jsonb,
  cart_json             text,
  created_at            timestamptz DEFAULT now()
);

-- 4. Row Level Security
-- ──────────────────────────────────────────────────────────────────
ALTER TABLE kolor_editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kolor_ventes   ENABLE ROW LEVEL SECURITY;

-- Lecture publique des éditions (stock)
CREATE POLICY IF NOT EXISTS "editions_public_read"
  ON kolor_editions FOR SELECT USING (true);

-- Écriture réservée au service role (Edge Functions)
CREATE POLICY IF NOT EXISTS "editions_service_write"
  ON kolor_editions FOR UPDATE USING (auth.role() = 'service_role');

-- Ventes lisibles uniquement par le service role
CREATE POLICY IF NOT EXISTS "ventes_service_only"
  ON kolor_ventes FOR ALL USING (auth.role() = 'service_role');
