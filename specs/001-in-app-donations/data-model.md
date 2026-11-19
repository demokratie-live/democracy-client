# Data Model: In-App-Spenden

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Grundsatz: **Stripe ist Source of Truth** für Zahlungen, Dauerspenden, E-Mail-Adressen und
Gebühren. `democracy-api` speichert lokal nur, was Stripe nicht abbilden kann. Keine Daten im
DEMOCRACY-Nutzer-/Device-/Vote-Modell, keine Referenz dorthin (Prinzip I).

## 1. Lokale Collections (`democracy-api`, MongoDB, Modul `src/donations/models`)

### DonationSubscriber (`donation_subscribers`)

Zuordnung „Spender-Schlüssel auf diesem Gerät" → Stripe-Customer/Subscription.

| Feld | Typ | Regeln |
|---|---|---|
| `_id` | ObjectId | wird als `metadata.subscriber_id` an der Stripe-Subscription gespeichert |
| `keyHash` | string | SHA-256 (hex, 64 Zeichen) des 32-Byte-Spender-Schlüssels; **unique index** |
| `stripeCustomerId` | string | `cus_…` |
| `stripeSubscriptionId` | string \| null | `sub_…` der **aktuellen** Subscription des Schlüssels; wird beim Ersetzen einer `incomplete`-Subscription überschrieben (siehe §5) |
| `createdAt` / `updatedAt` | Date | Mongoose-Timestamps |
| `endedAt` | Date \| null | gesetzt bei `customer.subscription.deleted` oder `incomplete_expired` |
| `deleteAt` | Date \| null | `endedAt + 90 Tage`; **TTL-Index** → automatische Löschung (FR-021) |

Nicht gespeichert: E-Mail, Name, IP, Gerätedaten, DEMOCRACY-User-/Device-IDs.

### DonationWebhookEvent (`donation_webhook_events`)

Idempotenz für Stripe-Webhooks (Zustellung „at least once" → keine doppelten E-Mails).

| Feld | Typ | Regeln |
|---|---|---|
| `_id` | string | Stripe-Event-ID `evt_…` |
| `type` | string | z. B. `invoice.paid` |
| `processedAt` | Date | **TTL-Index 30 Tage** |

## 2. Stripe-Objekte und Metadaten-Konvention

Alle von der App erzeugten Objekte tragen `metadata.source = "democracy-app"`. Der Webhook-Handler
ignoriert Objekte ohne diese Markierung (z. B. bestehende DonorBox-Zahlungen im selben Konto).

| Objekt | Wesentliche Felder | Metadaten |
|---|---|---|
| **Customer** | `email`, `preferred_locales=["de"]`; Wiederverwendung bei gleicher E-Mail (`customers.list({email})`, gefiltert auf `source`) | `source` |
| **PaymentIntent** (einmalig) | `amount` (Cent, inkl. Aufschlag), `currency=eur`, `customer` (falls E-Mail), `payment_method_configuration` = Zahlungsprofil-ID, `description="Spende an DEMOCRACY Deutschland e.V."`, `statement_descriptor_suffix="SPENDE"` | `source`, `interval=one_time`, `base_amount`, `cover_fees`, `platform`, `app_version` |
| **Subscription** (monatlich) | `items[0].price_data{currency=eur, product=STRIPE_DONATION_PRODUCT_ID, unit_amount, recurring.interval=month}`, `payment_behavior=default_incomplete`, `payment_settings.save_default_payment_method=on_subscription`; keine `payment_method_types` → Stripe nutzt das Standardprofil | `source`, `interval=monthly`, `base_amount`, `cover_fees`, `platform`, `app_version`, `subscriber_id` |
| **Invoice** | von Billing erzeugt; Footer-Text „Spende ohne Gegenleistung" | erbt Subscription-Bezug |

Beträge immer als Integer in Cent. `base_amount` = gewählter Spendenbetrag, `amount`/`unit_amount`
= tatsächlich belasteter Betrag (mit Gebührenübernahme ggf. höher).

**Empfänger der Bestätigungs-E-Mail**: `customer.email` (in der App angegeben), sonst
`payment_method.billing_details.email` (vom PaymentSheet erhoben, z. B. Pflicht bei SEPA), sonst
keine E-Mail. In der App angegebene E-Mails werden per `defaultBillingDetails` +
`attachDefaultsToPaymentMethod` auch an die PaymentMethod gehängt.

**Protokollierung**: Weder `democracy-api` noch der Ingress speichern zu `/donations/*` IP-Adressen,
User-Agents oder E-Mail-Adressen. Logs zu Spenden enthalten nur Stripe-IDs und Event-Typen.

## 3. Konfiguration (`DonationConfig`)

Aus Umgebungsvariablen/ConfigMap des API-Deployments, nicht aus der DB. Ausgeliefert über
`GET /donations/v1/config` (siehe [contracts](./contracts/donations-api.md)).

| Feld | Initialwert | Zweck |
|---|---|---|
| `enabled` | `true` | Kill-Switch (FR-013) |
| `publishableKey` | `pk_test_…` (internal) / `pk_live_…` (production) | Stage-abhängig, nie Secret Key |
| `presets.one_time` / `presets.monthly` | `[1000, 2500, 5000, 10000]` / `[500, 1000, 1500, 2500]` (Cent) | FR-001 |
| `defaultInterval` | `monthly` | Annahme der Spec |
| `minAmountCents` / `maxAmountCents` | `500` / `100000` | FR-001, Edge Cases |
| `stripe.paymentMethodConfigurationId` (nur Server, nicht in `/config`) | `pmc_…` (Test: „Donation Test") | FR-003; Zahlungsarten im Stripe-Dashboard steuern; Profil muss Standardprofil sein |
| `fees` | `{cardPct: 1.5, cardFixedCents: 25, sepaFixedCents: 35, billingPct: 0.7}` | Gebührenübernahme (FR-001b) |
| `portalLoginUrl` | `https://billing.stripe.com/p/login/…` | Verwaltung ohne Gerät (FR-017) |
| `bankTransfer` | Kontoinhaber, IBAN, BIC | Alternative (FR-012); App hat Fallback-Werte |
| `legal` | Links Datenschutz, Gemeinnützigkeit, vereinfachter Zuwendungsnachweis | FR-009 |

## 4. Client-seitiger Zustand (`democracy-client`)

| Daten | Speicherort | Lebensdauer |
|---|---|---|
| Spender-Schlüssel (32 Byte, base64url) | `react-native-keychain`, Service `de.democracy.donorKey` | bis Kündigung + Ende; bei `404` vom Server lokal löschen |
| Letzte Dauerspende-Statusantwort | Speicher (React Query/State), nicht persistent | Bildschirmdauer |
| Zuletzt verwendete E-Mail | **nicht** gespeichert (Datensparsamkeit); Stripe-Sheet kann Wallet-E-Mail vorbefüllen | – |

## 5. Zustände und Übergänge

### Spende (PaymentIntent → Anzeige)

```text
requires_payment_method / requires_action ──▶ (Sheet offen, „in Bearbeitung")
processing (SEPA, PayPal-Prüfung) ──────────▶ „wird eingezogen"
succeeded ──────────────────────────────────▶ „erfolgreich"  → Bestätigungs-E-Mail
payment_failed / canceled ─────────────────▶ „fehlgeschlagen"
succeeded → charge.refunded ───────────────▶ „erstattet"
succeeded → charge.dispute.created (SEPA-Rückgabe) ▶ „zurückgebucht" → Log/Alarm an Kassenwart
```

### Dauerspende (Subscription → Anzeige)

```text
incomplete ──(erste Rechnung bezahlt)──▶ active                    „aktiv"
incomplete ──(23 h ohne Zahlung)───────▶ incomplete_expired        „beendet"   → DonationSubscriber.endedAt
incomplete ──(neuer Versuch, gleicher Schlüssel)▶ gekündigt, ersetzt durch neue Subscription (keine Mail)
active ──(Folgeabbuchung fehlgeschlagen)▶ past_due                 „Zahlung überfällig" (Stripe-Mahnmail)
past_due ──(Retry erfolgreich)─────────▶ active
past_due ──(alle Retries erfolglos)────▶ canceled                  „beendet"   → E-Mail
active ──(Kündigung)───────────────────▶ active + cancel_at_period_end  „gekündigt, läuft bis …"
active + cancel_at_period_end ─(Periodenende)▶ canceled            „beendet"   → E-Mail
past_due ──(Kündigung)─────────────────▶ canceled (sofort)
```

Validierungsregeln:

- Neue Dauerspende für einen Schlüssel, dessen aktuelle Subscription `active` oder `past_due` ist →
  `409 subscription_exists` (App zeigt „Dauerspende verwalten").
- Ist die aktuelle Subscription `incomplete` und die PaymentIntent ihrer ersten Rechnung **nicht**
  `processing` (erste Zahlung gescheitert, abgebrochen oder unbestätigt), wird sie gekündigt und
  durch die neue ersetzt (`stripeSubscriptionId` überschrieben). So bleibt ein erneuter Versuch im
  selben Zahlungsdialog möglich, ohne doppelte Dauerspende.
- Ist die erste Zahlung `processing` (SEPA/PayPal wird eingezogen), sind neue Dauerspende und
  Kündigung gesperrt (`409 subscription_pending` bzw. `409 payment_pending`); die App zeigt
  „Deine erste Spende wird gerade eingezogen". So wird eine laufende Lastschrift nie verwaist
  oder doppelt.
- Webhooks zu einer Subscription wirken nur auf den `DonationSubscriber`, dessen
  `stripeSubscriptionId` mit ihr übereinstimmt (ersetzte Subscriptions ändern nichts mehr).
- Betrag in `[minAmountCents, maxAmountCents]`; E-Mail Pflicht bei monatlich, Format-Prüfung
  serverseitig.
