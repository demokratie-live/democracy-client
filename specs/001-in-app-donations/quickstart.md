# Quickstart & Validierung: In-App-Spenden

Leitfaden, um das Feature Ende-zu-Ende im **Stripe-Testmodus** zu prüfen. Endpunkte:
[contracts/donations-api.md](./contracts/donations-api.md); Datenmodell:
[data-model.md](./data-model.md).

## Voraussetzungen

- Stripe-Testmodus-Schlüssel (Restricted Key mit Rechten für Customers, PaymentIntents,
  Subscriptions, Invoices, Billing Portal, PaymentMethods lesen), Webhook-Secret, Product-ID
  „Monatliche Spende an DEMOCRACY" (Testmodus).
- [Stripe CLI](https://docs.stripe.com/stripe-cli) eingeloggt in das Vereinskonto.
- SMTP-Testpostfach (z. B. Mailpit lokal) für E-Mails.
- `democracy-api` lokal mit MongoDB (`pnpm dev`), `democracy-client` als `internal`-Variante
  (`APP_VARIANT=internal`) im iOS-Simulator bzw. Android-Emulator (Dev-Client, `pnpm ios|android`).

## Setup

```bash
# democracy-api (.env ergänzen)
STRIPE_SECRET_KEY=rk_test_…
STRIPE_PUBLISHABLE_KEY=pk_test_…
STRIPE_WEBHOOK_SECRET=whsec_…        # aus `stripe listen`
STRIPE_DONATION_PRODUCT_ID=prod_…
STRIPE_PORTAL_LOGIN_URL=https://billing.stripe.com/p/login/test_…
DONATIONS_ENABLED=true
SMTP_URL=smtp://localhost:1025
DONATION_MAIL_FROM="DEMOCRACY Spenden <spenden@democracy-deutschland.de>"

pnpm dev
stripe listen --forward-to localhost:3000/donations/v1/stripe-webhook

# democracy-client
GRAPHQL_URL=http://<lokale-IP>:3000 APP_VARIANT=internal pnpm ios   # bzw. pnpm android
```

## Validierungsszenarien

| # | Szenario (Spec-Bezug) | Schritte | Erwartet |
|---|---|---|---|
| V1 | Konfiguration (FR-001, FR-013) | `curl localhost:3000/donations/v1/config` | JSON gemäß Contract, `enabled: true`, nur `pk_test_…` |
| V2 | Einmalig per Karte (US1-1) | 10 € einmalig, Karte `4242 4242 4242 4242` | Danke-Screen „erfolgreich"; PI `succeeded` mit `metadata.source=democracy-app`; Bestätigungs-E-Mail in Mailpit |
| V3 | Apple Pay / Google Pay (US1-1) | iOS-Simulator mit Wallet-Testkarte; Android mit `googlePay.testEnv=true` | wie V2, Wallet-Sheet erscheint als erste Option |
| V4 | 3-D Secure (US1-3) | Karte `4000 0027 6000 3184` | Bankbestätigung in der App, danach „erfolgreich" |
| V5 | Ablehnung + Retry (US1-3, FR-011) | Karte `4000 0000 0000 0002`, dann im selben Sheet erneut mit 4242 | Fehlermeldung; zweiter Versuch klappt (neuer Idempotency-Key); genau **ein** erfolgreicher PI im Dashboard |
| V6 | SEPA (US1-4) | IBAN `DE89 3704 0044 0532 0130 00` | Danke-Screen „wird eingezogen"; nach Webhook `payment_intent.succeeded` E-Mail |
| V7 | SEPA-Fehlschlag | IBAN `DE62 3704 0044 0532 0130 01` | E-Mail „Lastschrift nicht erfolgreich" |
| V8 | Abbruch (US1-2) | Sheet öffnen, schließen | Kein PI angelegt (Deferred Intent), Betrag bleibt gewählt |
| V9 | Mindestbetrag (FR-001a) | 3 € eingeben | Button deaktiviert, Hinweis auf Dauerauftrag + Bankverbindung |
| V10 | Gebührenübernahme (FR-001b) | 5 € monatlich + „Gebühren übernehmen" | Anzeige „5,39 €"; Subscription `unit_amount=539`, `metadata.base_amount=500` |
| V11 | Dauerspende anlegen (US2-1) | 5 € monatlich, Karte | Subscription `active`, Danke-Screen mit nächstem Termin; Keychain-Schlüssel gesetzt; `donation_subscribers` enthält nur Hash + IDs |
| V12 | Folgeabbuchung (US2-1) | Stripe **Test Clock** an Customer, 1 Monat vorspulen | zweites `invoice.paid`, zweite E-Mail |
| V13 | Fehlgeschlagene Folgeabbuchung (US2-2) | Zahlungsart auf `4000 0000 0000 0341` ändern, Test Clock vorspulen | `past_due`, Stripe-Mahnmail; nach letztem Retry `canceled` + E-Mail „beendet" |
| V14 | Verwalten in App (US3-1/2) | Spenden-Bildschirm erneut öffnen → „Dauerspende verwalten": Betrag 10 €, dann kündigen | Status und Termin korrekt; PATCH wirkt ab nächster Periode; Kündigung → `cancel_at_period_end`, E-Mail |
| V15 | Verwalten ohne Gerät (US3-3) | App löschen; Login-Link aus E-Mail öffnen | Stripe-Portal per Magic Link, Kündigung möglich |
| V16 | Doppel-Dauerspende | Bei aktiver Dauerspende erneut „monatlich" wählen | App zeigt Verwaltung statt neuer Zahlung; API liefert `409 subscription_exists` |
| V17 | Kill-Switch (FR-013) | `DONATIONS_ENABLED=false`, App neu laden | Nur Finanzierungsstand + Bankverbindung |
| V18 | Fremde Events (R7) | `stripe trigger payment_intent.succeeded` (ohne Metadaten) | Webhook `200`, keine E-Mail |
| V19 | Privacy (SC-007, FR-006) | Proxy-Mitschnitt der Donation-Requests; Mongo-Inspektion; Ingress- und API-Logs (internal-Cluster) nach Testspenden durchsuchen | keine `x-token`/Device-Header; keine User-/Device-IDs in `donation_*` oder Stripe-Metadaten; **keine** `/donations`-Zeilen im Ingress-Log, keine IPs/E-Mails in API-Logs |
| V20 | Export (US5) | Stripe-Dashboard → Berichte → Saldo-Änderungen, Filter `metadata.source` | Brutto, Gebühr, Netto je Zahlung |
| V21 | Retry Dauerspende (US2-3) | „monatlich" 5 €, Karte `4000 0000 0000 0002`, im selben Sheet dann SEPA-Test-IBAN | genau **eine** Subscription nicht-`canceled`; die erste ist gekündigt, `donation_subscribers` zeigt auf die zweite; keine „beendet"-Mail |
| V22 | Erste Lastschrift läuft (Edge Case, data-model §5) | „monatlich" per SEPA-Test-IBAN, vor Zahlungseingang erneut „monatlich" wählen bzw. kündigen | Dauerspende `active` mit `firstPaymentPending: true`, App zeigt „Deine erste Spende wird gerade eingezogen"; zweite Dauerspende → `409 subscription_exists`; Kündigung zum Periodenende, erste Lastschrift wird trotzdem eingezogen |

## Automatisierte Prüfungen

```bash
# democracy-api
pnpm test               # Vitest Unit (Gebührenformel, Validierung, Webhook-Mapping, Signaturprüfung)
pnpm test:integration   # Router + Mongo (Subscriber-Lebenszyklus, Idempotenz)

# democracy-client
pnpm lint && pnpm lint:ts
pnpm test:e2e -- .maestro/flows/donate.yaml   # UI bis zum Öffnen des Sheets, Mindestbetrag, Kill-Switch
```
