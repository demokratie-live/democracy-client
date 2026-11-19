# Implementation Plan: In-App-Spenden (einmalig & monatlich) für iOS und Android

**Branch**: `feat/001-in-app-donations` (Client und API, gleicher Name) | **Date**: 2026-11-19 |
**Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-in-app-donations/spec.md`

## Summary

DonorBox-Link (iOS) und reine IBAN-Anzeige (Android) werden durch ein natives Spendenformular in
der App ersetzt: einmalig oder monatlich, ab 5 €, mit optionaler Gebührenübernahme, bezahlt über
**Stripe PaymentSheet** (Apple Pay, Google Pay, Karte, SEPA-Lastschrift, PayPal). Der Server
(`democracy-api`) legt im **Deferred-Intent-Verfahren** PaymentIntents bzw. **Stripe-Billing**-
Subscriptions an, verarbeitet signierte Webhooks und verschickt eigene Spendenbestätigungen für den
vereinfachten Zuwendungsnachweis. Dauerspenden werden in der App über einen anonymen,
gerätegebundenen Spender-Schlüssel (Signal-Prinzip) und geräteunabhängig über das Stripe-
Kundenportal verwaltet. Keine Verknüpfung mit DEMOCRACY-Konten oder Abstimmungen.
Kostenwirkung: DonorBox-Plattformgebühr (2,95 %) entfällt; es bleiben Stripe-Gebühren (z. B. 10 €
einmalig: 0,35–0,40 €) plus 0,7 % Billing auf Dauerspenden (Details: [research.md](./research.md) R4).

## Technical Context

**Language/Version**: TypeScript; Client React Native 0.76.9 / Expo SDK 52 (Old Architecture);
Server Node.js ≥ 22.23 (ESM, tsup)

**Primary Dependencies**:
- Client: `@stripe/stripe-react-native@0.38.6` (neu, Expo-Config-Plugin), `expo-web-browser`
  (neu, für Kundenportal), vorhanden: `react-native-keychain`, `expo-crypto`, `expo-router`,
  `styled-components`, `zod`
- Server: `stripe@23.1.0` (API-Version `2026-10-28.endive`, ≥ „basil" wie benötigt),
  `nodemailer@10.3.1`, `express-rate-limit@8.7.3` (alle neu, exakt gepinnt); vorhanden: `express`,
  `mongoose`, `winston`

**Storage**: Stripe (Source of Truth); MongoDB-Collections `donation_subscribers`,
`donation_webhook_events` (lokal in `democracy-api`, TTL-Indizes)

**Testing**: Server Vitest (unit + integration), Stripe CLI (`listen`, `trigger`), Stripe Test
Clocks; Client ESLint + `tsc`, Maestro-Flow `donate.yaml`; manuelle Matrix gemäß
[quickstart.md](./quickstart.md)

**Target Platform**: iOS ≥ 15.5 (Apple Pay; Recurring-Request ab iOS 16), Android minSdk 24 /
targetSdk 35; Server: Container auf Kubernetes

**Project Type**: Mobile App + API (zwei Repositories)

**Performance Goals**: Spendenvorgang per Wallet < 60 s (SC-001); Konfigurationsabruf < 1 s,
Intent-Erzeugung < 2 s (p95, inkl. Stripe-Roundtrip)

**Constraints**: kein Secret im Client; keine Nutzer-/Device-Verknüpfung; CNG ohne manuelle
Native-Änderungen; Mindestbetrag 5 €; nur EUR; Kill-Switch ohne App-Update

**Scale/Scope**: Größenordnung Hunderte Spender:innen, < 2.000 Zahlungen/Monat; 3 neue Screens
(Formular-Umbau, Danke, Verwalten), 7 REST-Endpunkte + 1 Webhook

## Constitution Check

*GATE: vor Phase 0 und nach Phase 1 geprüft.*

| Prinzip | Prüfung | Ergebnis |
|---|---|---|
| I. Datensparsamkeit | Donation-Router vor Auth-Middleware, Client sendet keine Auth-/Device-Header; lokal nur Schlüssel-Hash + Stripe-IDs; keine Anschrift; E-Mail nur in Stripe; Löschung 90 Tage nach Ende. Keine Korrelation über Logs: eigener Ingress für `/donations` ohne Access-Log, keine IP/E-Mail in App-Logs, Rate-Limit nur mit gesalzenem IP-Hash im Speicher (research.md R10). Stripe-SDK ist für die Kernfunktion unverzichtbar; Datenabfluss (inkl. SDK-Diagnose) wird in Datenschutzerklärung und Store-Angaben dokumentiert | ✅ |
| II. Unabhängigkeit/Gebühren | Gebühren je Weg in research.md R4 ausgewiesen; keine Plattformgebühr Dritter; Gebührenübernahme optional (Standard aus); keine Gegenleistung/Badges | ✅ |
| III. Store-Konformität | Apple 3.2.1(vi) (Nonprofit freigeschaltet, Apple Pay angeboten, Belege verfügbar); Google Play: „tax exempt donations" ohne Play Billing; Parität iOS/Android (Wallet jeweils plattformeigen) | ✅ |
| IV. Server als Source of Truth | Nur Publishable Key im Client (über `/config`); Intents/Subscriptions ausschließlich serverseitig; Beträge serverseitig neu berechnet; Webhook-Signatur geprüft; Restricted Key | ✅ |
| V. Einfachheit | PaymentSheet + Billing + Kundenportal statt Eigenbau; Expo-Config-Plugin; Stripe als Datenhaltung | ✅ (s. Complexity Tracking) |
| VI. Tests | Vitest unit/integration für Gebühren, Validierung, Webhooks, Subscriber-Lebenszyklus; Maestro-Flow; Testmodus-E2E inkl. Test Clocks vor Production | ✅ |

**Post-Design Re-Check (nach Phase 1)**: unverändert ✅. Abweichung von Projektkonvention (REST statt
GraphQL) ist begründet in research.md R7 und keine Constitution-Verletzung.

## Architektur

```text
 App (Expo)                         democracy-api (/donations/v1)                 Stripe
 ───────────                        ──────────────────────────────               ──────
 Spenden-Screen ── GET /config ───▶ Config (Env/ConfigMap) ─────────────────────▶ (pk_… nur lesen)
   │ Betrag, Rhythmus, Gebühren, E-Mail
   ▼
 PaymentSheet (intentConfiguration)
   │ Nutzer:in bestätigt → confirmHandler(pm)
   ├─ einmalig ── POST /one-time ──▶ validieren, Betrag rechnen ──── create PI ─▶ PaymentIntent
   └─ monatlich ─ POST /monthly ───▶ + Customer finden/anlegen ─ create Sub ────▶ Subscription/Invoice/PI
                  (DonorKey)          + donation_subscribers(hash)
   ◀──────── clientSecret ─────────
 PaymentSheet bestätigt (3DS/SEPA-Mandat/PayPal-Redirect via democracy://) ───────▶
 Danke-Screen (Status aus Sheet-Ergebnis)
                                    POST /stripe-webhook ◀──────────── Events (signiert)
                                      ├─ Idempotenz (donation_webhook_events)
                                      ├─ nur metadata.source=democracy-app
                                      └─ Bestätigungs-/Kündigungs-Mails (SMTP)
 Verwalten ── GET/PATCH/DELETE /monthly, POST /monthly/portal-session (DonorKey) ─▶ Subscription / Portal
 E-Mail-Link ──────────────────────────────────────────────────────────────────▶ Kundenportal (Magic Link)
```

## Project Structure

### Documentation (this feature)

```text
specs/001-in-app-donations/
├── spec.md              # Spezifikation inkl. Clarifications
├── plan.md              # dieser Plan
├── research.md          # Entscheidungen, Gebühren, Store-/Steuerrecht, offene Punkte
├── data-model.md        # lokale Collections, Stripe-Metadaten, Zustände
├── quickstart.md        # Testmodus-Validierung V1–V22
├── contracts/
│   ├── donations-api.md # REST-Contract /donations/v1
│   └── stripe-webhooks.md
├── checklists/requirements.md
└── tasks.md             # folgt mit /speckit-tasks
```

### Source Code

**Server – `demokratie-live/democracy-api`** (Branch `feat/001-in-app-donations`):

```text
src/donations/
├── index.ts                 # createDonationsRouter(); mountet Routen + Webhook
├── config.ts                # Env-Parsing (STRIPE_*, DONATIONS_*, SMTP_*), Validierung beim Start
├── stripe.ts                # Stripe-Client (gepinnte API-Version, Restricted Key)
├── fees.ts / fees.test.ts   # Brutto-Hochrechnung Gebührenübernahme
├── validation.ts            # Request-Schemas, Betrags-/E-Mail-Prüfung
├── donorKey.ts              # DonorKey-Header parsen, SHA-256, Lookup-Middleware
├── routes/
│   ├── config.ts            # GET /config
│   ├── oneTime.ts           # POST /one-time
│   └── monthly.ts           # POST|GET|PATCH|DELETE /monthly, POST /monthly/portal-session
├── webhook.ts               # POST /stripe-webhook (express.raw, constructEvent, Dispatcher)
├── mail/
│   ├── mailer.ts            # nodemailer-Transport
│   └── templates.ts         # Bestätigung einmalig/monatlich, Kündigung, Ende, SEPA-Fehler (de)
├── models/
│   ├── DonationSubscriber.ts
│   └── DonationWebhookEvent.ts
└── __tests__/               # *.test.ts (unit), *.integ.ts (integration)
src/index.ts                 # server.use('/donations/v1', donationsRouter) VOR authMiddleware
infra/manifests/             # ConfigMap/Secret: STRIPE_*, DONATIONS_*, SMTP_*
infra/manifests/Ingress-donations.yaml  # Pfad /donations ohne Access-Log (Prod: Repo infrastructure)
docs/DONATIONS.md            # Runbook: Stripe-/Apple-/Google-/PayPal-Setup, Export, formale Belege
.env.example                 # neue Variablen dokumentiert
```

**Client – `demokratie-live/democracy-client`** (dieser Branch):

```text
app.config.ts                         # Plugin @stripe/stripe-react-native {merchantIdentifier, enableGooglePay}
src/api/donations/
├── client.ts                         # fetch-Wrapper ohne Auth-Header, Basis-URL aus graphqlUrl
├── types.ts                          # zod-Schemas gemäß Contract
├── useDonationConfig.ts
└── useMonthlyDonation.ts             # GET/PATCH/DELETE/portal
src/lib/donorKey.ts                   # Schlüssel erzeugen (expo-crypto), Keychain lesen/schreiben/löschen
src/lib/donationFees.ts               # Anzeige-Berechnung (gleiche Formel wie Server)
src/screens/Donate/
├── index.tsx                         # Umbau: Finanzierungsstand + Formular + Überweisung
├── StripeDonationProvider.tsx        # StripeProvider nur für Spenden-Routen, Redirect-Handling
├── DonationForm/                     # AmountPicker, IntervalToggle, CoverFeesToggle, EmailField, DonateButton
├── usePaymentSheetDonation.ts        # initPaymentSheet(intentConfiguration) + present
├── BankTransfer.tsx                  # bisherige IBAN-Darstellung, beide Plattformen
├── ThankYou.tsx
├── Manage.tsx
└── content.ts                        # Texte (u. a. 300-€-Grenze, Pat:innen-Text, Bescheid)
src/app/Donate.tsx, src/app/DonateThanks.tsx, src/app/DonateManage.tsx  # Routen (expo-router)
.maestro/flows/donate.yaml, .maestro/flows/donate-manage.yaml
specs/001-in-app-donations/checklists/release.md                       # Ergebnis Validierungsmatrix
```

**Structure Decision**: Zwei bestehende Repositories, gleicher Branch-Name; Spec-Artefakte leben
im Client-Repo. Der Server wird zuerst ausgerollt (Constitution, Entwicklungsworkflow).

## Umsetzungsphasen (Inkremente)

| Phase | Inhalt | Ergebnis / Abnahme |
|---|---|---|
| 0 Vorbereitung | Stripe-Testsetup (Product, Restricted Key, Webhook, Portal, Billing-Settings), Apple Merchant ID + Zertifikat, Google-Pay-Testumgebung, SMTP; **Spike O8** (PayPal wiederkehrend, SEPA-Erstzahlung) | Spike-Ergebnis in research.md |
| 1 Server-Basis | config, stripe, fees, validation, `/config`, `/one-time`, Webhook + Mails, Modelle, Tests; Deploy `internal` | V1, V18, Vitest grün |
| 2 US1 Client | Plugin, Formular, PaymentSheet einmalig, Danke-Screen, Überweisung beidseitig, Kill-Switch | V2–V9, V17 (MVP) |
| 3 US2 | `/monthly` (POST), DonorKey, Gebührenübernahme monatlich, Recurring-Apple-Pay | V10–V13, V21, V22 |
| 4 US3 | GET/PATCH/DELETE/portal, Manage-Screen, Mail-Link | V14–V16 |
| 5 US4/US5 | Mailtexte final (Steuerberatung), Bescheid-Daten, Export-Doku für Kassenwart | V6/V7-Mails, V20 |
| 6 Release | Datenschutzerklärung, Store-Labels, Review-Notes, Google-Pay-Production, Live-Keys, DonorBox-Button entfernen | SC-006, Monitoring |

MVP = Phasen 0–2 (einmalige Spenden). Dauerspenden (3–4) folgen im selben Release, da
Patenschaften das Hauptziel sind; Phasen sind einzeln auslieferbar (Kill-Switch, Zahlungsarten im
Stripe-Zahlungsprofil).

## Rollout

1. `democracy-api` mit `DONATIONS_ENABLED=false` nach production deployen (abwärtskompatibel).
2. `internal`-App gegen `internal`-API mit Stripe-Testmodus verteilen (TestFlight / interner
   Play-Track), Matrix V1–V22 durchlaufen.
3. Live-Keys + Live-Webhook setzen, eine echte Spende je Plattform/Zahlungsart durch den Vorstand.
4. Store-Einreichung; nach Freigabe `DONATIONS_ENABLED=true`.
5. DonorBox: In-App-Button entfällt mit dem Release; Konto bleibt für laufende DonorBox-
   Dauerspenden bestehen (Migration außerhalb des Scopes).

## Risiken

| Risiko | Gegenmaßnahme |
|---|---|
| Stripe-RN 0.38.6 (Ende 2024) – Lücken bei PayPal wiederkehrend | Spike O8; PayPal monatlich per Config aus; SDK-Update mit nächstem Expo-Upgrade |
| Card Testing über unauthentifizierte Endpunkte | Rate-Limit, Mindestbetrag, Deferred Intents, Radar-Regeln, Alarm (research.md R9) |
| Rücklastschriften SEPA (8 Wochen) | Dispute-Webhook → Alarm; Höchstbetrag 1.000 € |
| Veralteter Freistellungsbescheid in Texten | O2 vor Livegang klären |
| Google-Pay-Production-Freigabe verzögert sich | Android kann ohne Google Pay live gehen (Karte/SEPA/PayPal), Google Pay per Config nachschalten |
| Doppelte E-Mails / verpasste Events | Event-Idempotenz-Collection, `500` bei Fehler → Stripe-Retry |
| Erneuter Bezahlversuch scheitert an Idempotenz/Duplikatsperre | Neuer Idempotency-Key je `confirmHandler`-Aufruf; `incomplete`-Subscription wird ersetzt statt `409` (contracts, data-model §5) |
| Korrelation Spende ↔ Abstimmung über IP-Logs | Ingress ohne Access-Log für `/donations`, keine IPs in App-Logs (research.md R10) |

## Complexity Tracking

| Abweichung | Warum nötig | Einfachere Alternative verworfen, weil |
|---|---|---|
| Neuer E-Mail-Versand in `democracy-api` (nodemailer/SMTP) | Bestätigungen mit Pflichtangaben für den vereinfachten Zuwendungsnachweis (FR-018/019) | Stripe-Belege erlauben keine eigenen Pflichttexte; Stripe-Rechnungen kosten bei Einzelzahlungen 0,4 % extra |
| REST-Endpunkte statt GraphQL | Webhook braucht Express-Route; Endpunkte müssen ohne Nutzer-Kontext laufen (Prinzip I) | GraphQL-Kontext enthält Auth/Device; Codegen-Kopplung ohne Nutzen |
