---
description: "Task list for In-App-Spenden (001-in-app-donations)"
---

# Tasks: In-App-Spenden (einmalig & monatlich) für iOS und Android

**Input**: Design documents from `specs/001-in-app-donations/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Enthalten, weil Constitution Prinzip VI Tests für neue Endpunkte/Webhooks und einen
Maestro-Flow je kritischem Nutzer-Flow verlangt.

**Organization**: Nach User Stories gruppiert; jede Story ist einzeln testbar und auslieferbar.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: parallel ausführbar (andere Dateien, keine offenen Abhängigkeiten)
- **[Story]**: US1–US5 gemäß spec.md

## Path Conventions

Zwei Repositories nebeneinander (Branch jeweils `feat/001-in-app-donations`):

- `democracy-api/…` = `demokratie-live/democracy-api` (Server)
- `democracy-client/…` = `demokratie-live/democracy-client` (App, enthält diese Specs)
- `democracy-deutschland.de/…` = Website-Repo (Rechtstexte, PDFs)

Aufgaben ohne Code (Stripe-Dashboard, Apple, Google, PayPal, Vorstand) dokumentieren ihr Ergebnis
im Runbook `democracy-api/docs/DONATIONS.md`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Branches, Abhängigkeiten, externe Konten im Testmodus

- [X] T001 Branch `feat/001-in-app-donations` von `main` in `democracy-api/` anlegen
- [X] T002 [P] Abhängigkeiten `stripe`, `nodemailer`, `express-rate-limit` in `democracy-api/package.json` hinzufügen (exakt gepinnt: stripe 23.1.0 / API `2026-10-28.endive`, nodemailer 10.3.1 inkl. eigener Typen – `@types/nodemailer` entfällt, express-rate-limit 8.7.3)
- [X] T003 [P] `npx expo install @stripe/stripe-react-native expo-web-browser` (ergibt 0.38.6 bzw. SDK-52-Version) in `democracy-client/package.json`
- [X] T004 [P] Neue Variablen in `democracy-api/.env.example` dokumentieren: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_DONATION_PRODUCT_ID`, `STRIPE_PORTAL_LOGIN_URL`, `DONATIONS_ENABLED`, `DONATION_MIN_CENTS`, `DONATION_MAX_CENTS`, `DONATION_PRESETS_ONE_TIME`, `DONATION_PRESETS_MONTHLY`, `STRIPE_PAYMENT_METHOD_CONFIGURATION_ID` (ersetzt die zunächst geplanten `DONATION_METHODS_*`), `SMTP_URL`, `DONATION_MAIL_FROM`, `DONATION_MAIL_REPLY_TO`
- [X] T005 Stripe-Testmodus einrichten und in `democracy-api/docs/DONATIONS.md` festhalten: Product „Monatliche Spende an DEMOCRACY", Restricted Key (Customers, PaymentIntents, Subscriptions, Invoices, PaymentMethods lesen, Billing Portal), Webhook-Endpoint mit Events aus `contracts/stripe-webhooks.md`, Customer Portal (Zahlungsart, Rechnungen, Kündigen an; Tarifwechsel aus; Login-Link an), Billing Smart Retries + Kündigung nach letztem Versuch + Mahnmails an, Stripe-Erfolgsbelege aus, SEPA-Vorabankündigungen an, Radar-Regel „Block if CVC fails", Branding, Zahlungsprofil „Donation Test" als Standardprofil mit Karte/Wallets/SEPA/PayPal an und Klarna/Link aus, PayPal-Konto verknüpfen — **Stand 2026-11-19:** Test-Umgebung = Sandbox „Test-Modus" des Kontos DEMOCRACY (CLI-Profil `democracy`): Product `prod_VelcsPtIRfzAjq`, Zahlungsprofil „Donation Test" `pmc_1LBwvYLGpvKcZpqce4bG1PuO` (Standardprofil, Klarna/Link aus), Restricted Key (Rechte geprüft), Webhook lokal per `stripe listen`, Portal-Konfiguration `bpc_1UdSNXLGpvKcZpqcJ10Y76O7` mit Login-Link. Kontoweite Einstellungen (Billing-Mails/Retries, Branding, Radar) bewusst erst im Live-Setup (T066), da sie auch DonorBox betreffen
- [ ] T006 [P] Apple: Merchant ID `merchant.de.democracy-deutschland.clientapp` anlegen, Apple-Pay-Capability für `de.democracy-deutschland.clientapp` und `.internal`, Apple-Pay-Zertifikat über Stripe-CSR, Profile per fastlane match neu erzeugen; dokumentieren in `democracy-client/docs/deployment/IOS.md`
- [ ] T007 [P] Google Pay: Testumgebung nutzen, Production-Zugang (Integrationstyp „Gateway") in der Google Pay & Wallet Console für `de.democracydeutschland.app` beantragen; dokumentieren in `democracy-client/docs/deployment/ANDROID.md`
- [X] T008 [P] Config-Plugin `["@stripe/stripe-react-native", { merchantIdentifier: "merchant.de.democracy-deutschland.clientapp", enableGooglePay: true }]` in `democracy-client/app.config.ts` ergänzen und `expo prebuild --clean` lokal prüfen
- [ ] T009 Spike O8 im Testmodus: (a) PayPal mit `setupFutureUsage: OffSession` im PaymentSheet 0.38.6, (b) Subscription mit SEPA-Erstzahlung im Status `processing` (Test Clock, kein `incomplete_expired`), (c) `confirmation_secret` der ersten Rechnung im `confirmHandler`; Ergebnis in `democracy-client/specs/001-in-app-donations/research.md` (R2/R3) eintragen — **Stand 2026-11-19:** Serverseite (b), (c) und PayPal mit `off_session` erledigt, siehe research.md R12; offen: App-Seite (a) PaymentSheet/PayPal-Anzeige, Rückleitung und Apple Pay – zusammen mit T031 auf Simulator/Gerät

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Server-Grundgerüst und Client-Plumbing, die alle Stories brauchen

**⚠️ CRITICAL**: Keine Story-Arbeit vor Abschluss dieser Phase

- [X] T010 Env-Parsing und Start-Validierung in `democracy-api/src/donations/config.ts` (Defaults gemäß data-model.md §3; `DONATIONS_ENABLED` Default `false`; fehlende Stripe-Keys bei `enabled` → Startfehler)
- [X] T011 [P] Stripe-Client mit gepinnter API-Version (≥ `2025-03-31.basil`) in `democracy-api/src/donations/stripe.ts`
- [X] T012 [P] Gebührenformel `T = max((A+fixCard)/(1−pctCard−b), (A+fixSepa)/(1−b))`, auf Cent aufrunden, `b = billingPct` nur bei monatlich, in `democracy-api/src/donations/fees.ts`; Tests in `democracy-api/src/donations/__tests__/fees.test.ts` (5 € monatlich → 539, 10 € einmalig → 1041, ohne Übernahme → unverändert)
- [X] T013 [P] Request-Validierung in `democracy-api/src/donations/validation.ts`: Betrag Integer in `[minAmountCents, maxAmountCents]`, E-Mail-Format, `platform ∈ {ios, android}`, `paymentMethodId` beginnt mit `pm_`, `Idempotency-Key` UUID v4; Tests in `democracy-api/src/donations/__tests__/validation.test.ts`
- [X] T014 [P] Modell `DonationWebhookEvent` (`_id` = Stripe-Event-ID, `type`, `processedAt` mit TTL-Index 30 Tage) in `democracy-api/src/donations/models/DonationWebhookEvent.ts`
- [X] T015 Router-Grundgerüst mit Fehlerformat `{ error: { code, message } }`, `express.json()` nur für Donation-Routen, Rate-Limit (10 / 10 min je Client; `keyGenerator` = SHA-256(IP + täglich rotierender Salt), Memory-Store) für `POST /one-time` und `POST /monthly` in `democracy-api/src/donations/index.ts`; Logging im Modul nur mit Stripe-IDs/Event-Typen/Fehlercodes (keine IP, kein User-Agent, keine E-Mail); in `democracy-api/src/index.ts` als `server.use('/donations/v1', …)` **vor** `authMiddleware` einhängen, `trust proxy` für Ingress setzen
- [X] T016 [P] Ingress-Objekt nur für Pfad `/donations` mit Annotation `nginx.ingress.kubernetes.io/enable-access-log: "false"` in `democracy-api/infra/manifests/Ingress-donations.yaml` und entsprechend im Produktions-Overlay des Repos `demokratie-live/infrastructure` (`kustomize/`); Begründung research.md R10 (Prinzip I, FR-006)
- [X] T017 `GET /config` gemäß `contracts/donations-api.md` in `democracy-api/src/donations/routes/config.ts` inkl. `Cache-Control: max-age=300`; Test in `democracy-api/src/donations/__tests__/config.test.ts`
- [X] T018 Webhook-Endpunkt in `democracy-api/src/donations/webhook.ts`: `express.raw`, `constructEvent`, Idempotenz über `DonationWebhookEvent`, Filter `metadata.source = "democracy-app"` (bei Invoices über Subscription), Dispatcher-Tabelle, bei Handler-Fehler Event-Eintrag löschen + `500`; Tests mit `stripe.webhooks.generateTestHeaderString` in `democracy-api/src/donations/__tests__/webhook.test.ts` (gültig, ungültige Signatur, Duplikat, fremdes Objekt)
- [X] T019 [P] nodemailer-Transport aus `SMTP_URL` (ohne URL in Dev: Log-Transport) in `democracy-api/src/donations/mail/mailer.ts`
- [X] T020 [P] Platzhalter für `STRIPE_*`, `DONATION_*`, `SMTP_*` in `democracy-api/infra/manifests/ConfigMap.yaml` und `democracy-api/infra/manifests/Secret.yaml` (echte Werte nur über Secret-Management)
- [X] T021 [P] zod-Schemas gemäß Contract in `democracy-client/src/api/donations/types.ts` und fetch-Client **ohne** Auth-/Device-Header (Basis-URL aus `Constants.expoConfig.extra.graphqlUrl`, `Idempotency-Key`-Header: neuer UUID je Bezahlversuch, Wiederverwendung nur für Netzwerk-Retry desselben Requests; Fehler-Mapping auf deutsche Meldungen) in `democracy-client/src/api/donations/client.ts`
- [X] T022 [P] Hook `useDonationConfig` mit Fallback (Bankdaten aus Bundle, `enabled: false` bei Fehler) in `democracy-client/src/api/donations/useDonationConfig.ts`
- [X] T023 [P] Anzeige-Gebührenformel (identisch zu T012) in `democracy-client/src/lib/donationFees.ts`
- [X] T024 `StripeProvider`-Wrapper nur für Spenden-Routen (Publishable Key aus Config, `merchantIdentifier`, `urlScheme: "democracy"`) und Weiterleitung von `democracy://stripe-redirect` an `handleURLCallback` in `democracy-client/src/screens/Donate/StripeDonationProvider.tsx` (Weiterleitung umgesetzt in `democracy-client/src/app/+native-intent.tsx`: Stripe-URL an `handleURLCallback`, leerer Pfad → keine Navigation; auf Gerät in T009 verifizieren)

**Checkpoint**: `GET /config` liefert Testmodus-Konfiguration (quickstart V1), Webhook verarbeitet nur eigene Events (V18).

---

## Phase 3: User Story 1 – Einmalige Spende direkt in der App (Priority: P1) 🎯 MVP

**Goal**: Einmalig spenden per Apple Pay/Google Pay, Karte, SEPA, PayPal ohne die App zu verlassen.

**Independent Test**: quickstart V2–V9 und V17 auf iOS und Android (internal, Testmodus).

### Tests for User Story 1

- [X] T025 [P] [US1] Test für `POST /one-time` (Stripe gemockt): Erfolg, `400 amount_out_of_range`, `400 payment_method_not_allowed`, `409 idempotency_conflict`, `429`, `503 donations_disabled` in `democracy-api/src/donations/__tests__/oneTime.test.ts` (Unit-Suite, da `.integ.ts` in diesem Repo einen laufenden Server + DB voraussetzt); zusätzlich E2E gegen die Stripe-Test-Sandbox mit Mailpit verifiziert (Karte, SEPA ok, SEPA gescheitert)
- [X] T026 [P] [US1] Maestro-Flow „Drawer → Spenden → Betrag wählen → 3 € zeigt Dauerauftrag-Hinweis → 10 € öffnet Sheet" in `democracy-client/.maestro/flows/donate.yaml`, Script `test:e2e:donate` in `democracy-client/package.json`, Eintrag in `democracy-client/docs/TESTING.md` — Flow geschrieben; erster Lauf auf Simulator steht noch aus (braucht internal-Build gegen API mit aktivem Spendenmodul)

### Implementation for User Story 1

- [X] T027 [US1] `POST /one-time` in `democracy-api/src/donations/routes/oneTime.ts`: Validierung, Betrag per `fees.ts`, Customer per E-Mail finden/anlegen (`metadata.source`), PaymentIntent mit `payment_method_configuration: config.stripe.paymentMethodConfigurationId` und `payment_method` (Stripe-Fehler „Zahlungsart nicht im Profil" → `400 payment_method_not_allowed`), Metadaten (`source`, `interval=one_time`, `base_amount`, `cover_fees`, `platform`, `app_version`), `description`, `statement_descriptor_suffix="SPENDE"`, Idempotency-Key → `{ clientSecret, paymentIntentId, chargedAmountCents }`
- [X] T028 [US1] Mail-Vorlagen „Bestätigung einmalig" (Betrag, Datum, Zahlungsart, Empfänger, steuerbegünstigter Zweck, Freistellungsangaben, „Spende, kein Mitgliedsbeitrag", Link vereinfachter Zuwendungsnachweis, Hinweis formale Bestätigung per Antwort mit Name/Anschrift) und „Lastschrift nicht erfolgreich" in `democracy-api/src/donations/mail/templates.ts`
- [X] T029 [US1] Webhook-Handler `payment_intent.succeeded` und `payment_intent.payment_failed` (nur `interval=one_time`; Empfänger = `customer.email ?? payment_method.billing_details.email`, sonst keine Mail) in `democracy-api/src/donations/webhook.ts`
- [X] T030 [P] [US1] Formular-Komponenten mit Accessibility-Labels in `democracy-client/src/screens/Donate/DonationForm/`: `AmountPicker.tsx` (Presets + eigener Betrag, Min/Max), `IntervalToggle.tsx` (monatlich vorausgewählt), `CoverFeesToggle.tsx` (Standard aus, zeigt Aufschlag in €), `EmailField.tsx` (bei einmalig optional), `DonateButton.tsx` (deaktiviert während eines laufenden Vorgangs, FR-011)
- [X] T031 [US1] PaymentSheet-Hook in `democracy-client/src/screens/Donate/usePaymentSheetDonation.ts`: `initPaymentSheet` mit `intentConfiguration { mode: { amount, currencyCode: "EUR" }, confirmHandler → POST /one-time }` (ohne `paymentMethodTypes` – das SDK nutzt das Standard-Zahlungsprofil), `applePay { merchantCountryCode: "DE" }`, `googlePay { merchantCountryCode: "DE", currencyCode: "EUR", testEnv: appVariant === "internal" }`, `allowsDelayedPaymentMethods: true`, `returnURL: "democracy://stripe-redirect"`, `paymentMethodOrder: ["apple_pay","google_pay","sepa_debit","paypal","card"]`, `billingDetailsCollectionConfiguration` mit `name`/`email`/`address` = `automatic` (nur was die Zahlungsart verlangt, FR-008), `defaultBillingDetails.email` + `attachDefaultsToPaymentMethod: true` wenn in der App angegeben; jeder `confirmHandler`-Aufruf erzeugt einen neuen Idempotency-Key; Ergebnis-Mapping Completed/Canceled/Failed, „processing" für SEPA — Monatlich folgt in T044; Verifikation auf Simulator/Gerät zusammen mit T009 (App-Seite)
- [X] T032 [P] [US1] Danke-Screen (Betrag, Rhythmus, Status „erfolgreich"/„wird eingezogen") in `democracy-client/src/screens/Donate/ThankYou.tsx` und Route `democracy-client/src/app/DonateThanks.tsx`; Stack-Eintrag in `democracy-client/src/app/_layout.tsx`
- [X] T033 [P] [US1] Überweisungsblock für **beide** Plattformen aus bisherigem Android-Zweig extrahieren, Werte aus `config.bankTransfer` mit Bundle-Fallback, in `democracy-client/src/screens/Donate/BankTransfer.tsx`
- [X] T034 [US1] `democracy-client/src/screens/Donate/index.tsx` umbauen: Finanzierungsstand (bestehend) + Formular (nur wenn `enabled`) + `BankTransfer`; vor dem Bezahlen Empfänger, Gemeinnützigkeitshinweis und Datenschutzlink sichtbar (FR-009); Hinweis unter Mindestbetrag (FR-001a) und über Höchstbetrag („größere Spenden bitte per Überweisung"); DonorBox-Button und `democracy-client/src/screens/Donate/assets/DonateButton.png` entfernen
- [ ] T035 [P] [US1] Texte in `democracy-client/src/screens/Donate/content.ts`: 300-€-Grenze statt 200 €, Pat:innen-Text verweist für Kleinbeträge auf Dauerauftrag, Gemeinnützigkeitstext mit aktuellem Bescheid (O2), Link auf aktuellen vereinfachten Zuwendungsnachweis — **Stand 2026-11-19:** 300-€-Grenze und Pat:innen-/Dauerauftrag-Text erledigt, Links kommen aus `/config`; Bescheid-Angaben warten auf O2 (T057)

**Checkpoint**: MVP – einmalige Spenden funktionieren Ende-zu-Ende im Testmodus auf beiden Plattformen.

---

## Phase 4: User Story 2 – Monatliche Dauerspende abschließen (Priority: P1)

**Goal**: Patenschaft per Karte/Wallet/SEPA (PayPal nach Freigabe) mit automatischer Abbuchung.

**Independent Test**: quickstart V10–V13, V21 und V22 (inkl. Test Clock).

### Tests for User Story 2

- [X] T036 [P] [US2] Tests für DonorKey-Parsing (genau 32 Byte base64url, sonst `401`) in `democracy-api/src/donations/__tests__/donorKey.test.ts`
- [X] T037 [P] [US2] Integrationstest `POST /monthly`: Erfolg, `400 email_required`, `409 subscription_exists` bei Status `active|past_due`, **Ersetzen** einer `incomplete`-Subscription beim erneuten Versuch (alte → `incomplete_expired`, `stripeSubscriptionId` überschrieben, genau eine offene Subscription), `409 subscription_exists` auch während die erste SEPA-Zahlung `processing` ist (Subscription dann bereits `active`), Subscriber-Upsert speichert nur Hash + IDs, in `democracy-api/src/donations/__tests__/monthly.integ.ts`

### Implementation for User Story 2

- [X] T038 [P] [US2] Modell `DonationSubscriber` (`keyHash` string SHA-256 hex 64 Zeichen **unique**, `stripeCustomerId`, `stripeSubscriptionId` nullable, Timestamps, `endedAt` nullable, `deleteAt` nullable mit **TTL-Index** = `endedAt + 90 Tage`) in `democracy-api/src/donations/models/DonationSubscriber.ts`
- [X] T039 [US2] DonorKey-Middleware (`Authorization: DonorKey <base64url>`, SHA-256, Subscriber laden) in `democracy-api/src/donations/donorKey.ts`
- [X] T040 [US2] `POST /monthly` in `democracy-api/src/donations/routes/monthly.ts`: E-Mail Pflicht, Duplikatsperre (`409 subscription_exists` bei aktueller Subscription `active|past_due`; `incomplete` kündigen und ersetzen – data-model.md §5), Customer finden/anlegen, Subscription mit `items[0].price_data { currency: "eur", product: STRIPE_DONATION_PRODUCT_ID, unit_amount, recurring: { interval: "month" } }`, `payment_behavior: "default_incomplete"`, `payment_settings { save_default_payment_method: "on_subscription" }` (keine `payment_method_types` – Stripe nutzt das Standard-Zahlungsprofil), Metadaten inkl. `subscriber_id`, `expand: ["latest_invoice.confirmation_secret"]`, Subscriber-Upsert → `{ clientSecret, subscriptionId, chargedAmountCents }`
- [X] T041 [US2] Mail-Vorlagen „Willkommen Dauerspende" (mit Verwaltungslink `portalLoginUrl`) und „monatliche Bestätigung" in `democracy-api/src/donations/mail/templates.ts`; Handler `invoice.paid` (Erstrechnung vs. Folgerechnung) und `invoice.payment_failed` (nur Log) in `democracy-api/src/donations/webhook.ts`
- [X] T042 [US2] Handler `customer.subscription.deleted` und `customer.subscription.updated` (→ `incomplete_expired`) gemäß `contracts/stripe-webhooks.md`: nur den `DonationSubscriber` mit passender `stripeSubscriptionId` ändern (`endedAt`/`deleteAt`); Mail „Dauerspende beendet" nur, wenn die Subscription mindestens eine bezahlte Rechnung hatte; in `democracy-api/src/donations/webhook.ts`; Tests (ersetzte `incomplete`-Subscription ändert nichts) in `democracy-api/src/donations/__tests__/webhook.test.ts`
- [X] T043 [P] [US2] Spender-Schlüssel erzeugen (`expo-crypto.getRandomBytes(32)`, base64url), in `react-native-keychain` (Service `de.democracy.donorKey`) speichern/lesen/löschen – erst nach `200` persistieren – in `democracy-client/src/lib/donorKey.ts`
- [X] T044 [US2] `usePaymentSheetDonation` für monatlich erweitern: `mode { amount, currencyCode: "EUR", setupFutureUsage: "OffSession" }` (ohne `paymentMethodTypes`), `confirmHandler → POST /monthly` mit DonorKey, `applePay.request` = `RecurringPaymentRequest` (monatlich, Beschreibung, `managementUrl` = `portalLoginUrl`), E-Mail Pflicht, in `democracy-client/src/screens/Donate/usePaymentSheetDonation.ts` — *Apple-Pay-Dauerauftrag ungetestet bis T006*
- [X] T045 [US2] Danke-Screen-Variante monatlich mit nächstem Abbuchungstermin in `democracy-client/src/screens/Donate/ThankYou.tsx`
- [X] T046 [US2] Maestro-Flow erweitern: „monatlich ohne E-Mail → Button deaktiviert" in `democracy-client/.maestro/flows/donate.yaml` — *geschrieben, noch nicht ausgeführt (Maestro nicht installiert)*

**Checkpoint**: Dauerspende anlegen + Folgeabbuchung per Test Clock + Fehlschlag/Ende funktionieren.

---

## Phase 5: User Story 3 – Dauerspende verwalten und kündigen (Priority: P2)

**Goal**: Status, Betrag, Zahlungsart, Kündigung in der App; geräteunabhängig per E-Mail-Link.

**Independent Test**: quickstart V14–V16.

### Tests for User Story 3

- [ ] T047 [P] [US3] Integrationstests `GET/PATCH/DELETE /monthly` und `POST /monthly/portal-session` (`404 not_found`, `409 not_active`, Kündigung aktiv vs. `past_due`) in `democracy-api/src/donations/__tests__/manage.integ.ts`

### Implementation for User Story 3

- [ ] T048 [US3] `GET /monthly` (Status-Mapping, `cancelAtPeriodEnd`, `currentPeriodEnd`, PaymentMethod-Label, `firstPaymentPending` = erste Rechnung offen mit PaymentIntent `processing`, `lastPaymentError` aus letzter Rechnung) in `democracy-api/src/donations/routes/monthly.ts`
- [ ] T049 [US3] `PATCH /monthly` (neuer `price_data`, `proration_behavior: "none"`, Metadaten `base_amount`/`cover_fees` aktualisieren) in `democracy-api/src/donations/routes/monthly.ts`
- [ ] T050 [US3] `DELETE /monthly` (`active` → `cancel_at_period_end: true`, auch wenn die erste Lastschrift noch läuft; `past_due` und `incomplete` → sofort kündigen) in `democracy-api/src/donations/routes/monthly.ts`
- [ ] T051 [US3] `POST /monthly/portal-session` (`billingPortal.sessions.create` mit `configuration: STRIPE_PORTAL_CONFIGURATION_ID`, `return_url: "democracy://donate/manage"`) in `democracy-api/src/donations/routes/monthly.ts`
- [ ] T052 [US3] Handler `customer.subscription.updated` (Wechsel auf `cancel_at_period_end: true` → Mail „Kündigung bestätigt") und Vorlage in `democracy-api/src/donations/webhook.ts` / `democracy-api/src/donations/mail/templates.ts`
- [ ] T053 [P] [US3] Hook `useMonthlyDonation` (GET/PATCH/DELETE/Portal, bei `404` lokalen Schlüssel löschen) in `democracy-client/src/api/donations/useMonthlyDonation.ts`
- [ ] T054 [US3] Verwaltungs-Screen (Status, Betrag ändern, „Zahlungsart ändern" via `WebBrowser.openAuthSessionAsync(portalUrl)`, Kündigen mit Bestätigungsdialog, max. 3 Interaktionen; bei `firstPaymentPending` Hinweis „Deine erste Spende wird gerade eingezogen“) in `democracy-client/src/screens/Donate/Manage.tsx` und Route `democracy-client/src/app/DonateManage.tsx`
- [ ] T055 [US3] Karte „Deine Dauerspende" auf dem Spenden-Screen bei vorhandenem Schlüssel; neue Dauerspende gesperrt (Umgang mit `409 subscription_exists`) in `democracy-client/src/screens/Donate/index.tsx`
- [ ] T056 [US3] Maestro-Flow `democracy-client/.maestro/flows/donate-manage.yaml` (Verwalten öffnen, Kündigungsdialog abbrechen/bestätigen im Testmodus)

**Checkpoint**: Kündigung in ≤ 3 Interaktionen; Verwaltung nach Neuinstallation per E-Mail-Link.

---

## Phase 6: User Story 4 – Spendenbestätigung und Zuwendungsnachweis (Priority: P2)

**Goal**: Rechtssichere Bestätigungen für den vereinfachten Nachweis, formale Bestätigungen manuell.

**Independent Test**: Testspende mit E-Mail → Mail enthält alle Pflichtangaben (Abnahme durch Vorstand/Steuerberatung).

- [ ] T057 [US4] Aktuellen Freistellungsbescheid (Finanzamt, Datum, StNr., Zwecke) klären (O2) und in Mail-Konfiguration/Vorlagen `democracy-api/src/donations/mail/templates.ts` sowie App-Texten `democracy-client/src/screens/Donate/content.ts` vereinheitlichen
- [ ] T058 [P] [US4] Vereinfachten Zuwendungsnachweis um Online-Zahlungen (Karte, PayPal, SEPA über Stripe) ergänzen und als aktuelle Datei bereitstellen in `democracy-deutschland.de/public/files/download/` (Link in `/config` → `legal.simplifiedReceiptUrl`)
- [ ] T059 [US4] Mail-Texte (alle Vorlagen) durch Vorstand/Steuerberatung abnehmen lassen und finalisieren in `democracy-api/src/donations/mail/templates.ts`
- [ ] T060 [P] [US4] Ablauf „formale Zuwendungs-/Sammelbestätigung auf Anfrage" (Suche nach E-Mail im Stripe-Dashboard, Export, BMF-Muster, Ablage der Kopie) in `democracy-api/docs/DONATIONS.md`

---

## Phase 7: User Story 5 – Verein behält den Überblick (Priority: P3)

**Goal**: Kassenwart sieht und exportiert alle In-App-Spenden mit Gebühren.

**Independent Test**: quickstart V20.

- [ ] T061 [P] [US5] Monatsexport beschreiben (Stripe-Bericht „Saldo-Änderungen"/„Auszahlungsabgleich", Filter `metadata.source`, Spalten Brutto/Gebühr/Netto, `metadata.interval`, `metadata.cover_fees` für SC-002a, Erfolgsquote für SC-004) in `democracy-api/docs/DONATIONS.md`
- [ ] T062 [P] [US5] Handler `charge.refunded`, `charge.dispute.created`, `mandate.updated` → `logger.warn` (Discord-Alarm an Kassenwart, nur Stripe-IDs); keine Mail an Spender:in, Dauerspende bleibt unverändert; in `democracy-api/src/donations/webhook.ts`

---

## Phase 8: Polish & Release

- [ ] T063 [P] VoiceOver-/TalkBack-Durchgang für alle Spenden-Screens; Befunde in `democracy-client/src/screens/Donate/` beheben
- [ ] T064 [P] Spendenmodul in `democracy-client/docs/ARCHITECTURE.md` beschreiben (REST ohne Auth-Header, Datentrennung, Spender-Schlüssel)
- [ ] T065 Quality Gates (Constitution VI): `pnpm lint` und `pnpm lint:ts` in `democracy-client/`, `pnpm lint` und `pnpm test` in `democracy-api/` fehlerfrei; Validierungsmatrix V1–V22 aus `quickstart.md` auf iOS und Android (internal) durchlaufen, inkl. V19 (keine `/donations`-Zeilen im Ingress-Log); Ergebnisse in `democracy-client/specs/001-in-app-donations/checklists/release.md`
- [ ] T066 Live-Setup gemäß `democracy-api/docs/DONATIONS.md`: Live-Zahlungsprofil als Standardprofil, Live-Portal-Konfiguration, Billing-Mails/Smart Retries, Branding, Radar-Regel (kontoweit, Auswirkung auf DonorBox prüfen), Live-Product, Live-Restricted-Key, Live-Webhook, Portal, Radar, Secrets in Production; Deploy mit `DONATIONS_ENABLED=false`; je Plattform und Zahlungsart eine echte Spende durch den Vorstand
- [ ] T067 Store-Einreichung beider Apps; nach Freigabe `DONATIONS_ENABLED=true`; erste Woche Monitoring (Discord-Alarme, Stripe-Dashboard, fehlgeschlagene Zahlungen)
- [ ] T068 [P] Organisatorisch (O3/O4), Ergebnis in `democracy-api/docs/DONATIONS.md`: Stripe-Nonprofit-Rabatt beantragen (Freistellungsbescheid, Nachweis ≥ 80 % Spendenvolumen); PayPal-Tarif prüfen (10-€-Spende: 0,50 € = Gemeinnützigkeitstarif) und Gültigkeit bei Stripe-Verknüpfung bestätigen lassen; PayPal-Freigabe für wiederkehrende Zahlungen beantragen (Zahlungsarten steuert das Stripe-Zahlungsprofil, siehe research.md R4)

---

## Phase 9: Rechtstexte & Store-Datenschutzangaben

**Purpose**: Datenschutzerklärung und Store-Angaben an die Spendenfunktion anpassen (FR-022, Constitution
Prinzip I). Auf Wunsch des Vereins als eigene Phase am Ende geführt, **muss aber vor der Store-Einreichung
(Phase 8) abgeschlossen sein**.

- [ ] T069 Datenschutzerklärung: neuer Abschnitt „5. Spenden" in `democracy-deutschland.de/content/legal/datenschutz.md` (nachfolgende Abschnitte umnummerieren) – 5.1 Überweisung/Dauerauftrag (Kontoauszugsdaten, Zuwendungsbestätigungen, Aufbewahrung § 147 AO 8/10 Jahre); 5.2 Spenden in der App: Datenkategorien (Betrag, Rhythmus, E-Mail optional/Pflicht bei Dauerspende, bei SEPA Name/IBAN, App-Plattform/-Version), Empfänger Stripe (Auftragsverarbeiter bzw. eigene Verantwortlichkeit für Betrugsprävention, Drittlandübermittlung USA/Data Privacy Framework), PayPal, Apple Pay/Google Pay, Bestätigungsmails (Mailanbieter aus O1), Trennung von Konto/Abstimmungen und keine IP-Protokollierung von Spenden-Anfragen, Gerätekennungs-Hash (Löschung 90 Tage nach Ende), Rechtsgrundlagen Art. 6 Abs. 1 b/c/f DSGVO, Verwaltung/Kündigung; Link in `/config` → `legal.privacyUrl`
- [ ] T070 [P] Nebenbefunde in `democracy-deutschland.de/content/legal/datenschutz.md`: Abschnitt „Server Log Files" um die Logs der App-API ergänzen, Google-Analytics-Abschnitt prüfen (wird GA noch genutzt? „Google Inc." veraltet), Anrede vereinheitlichen (Sie)
- [ ] T071 [P] App-Store-Datenschutzangaben („App Privacy": Kontaktinfo/E-Mail, Zahlungsinformationen über Stripe-SDK, kein Tracking), Play-„Datensicherheit" und Review-Notes (Nonprofit-Freigabe, Testanweisung internal-Build) in `democracy-client/docs/deployment/IOS.md` und `democracy-client/docs/deployment/ANDROID.md` dokumentieren und in den Konsolen umsetzen
- [ ] T072 Juristische Abnahme der Texte aus T069–T071 durch Datenschutzbeauftragte/Rechtsberatung; Veröffentlichung der Datenschutzerklärung vor der Store-Einreichung, Ergebnis in `democracy-api/docs/DONATIONS.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sofort; T005–T007 haben Wartezeiten (Apple/Google) → früh starten
- **Foundational (Phase 2)**: nach T001–T004; blockiert alle Stories
- **US1 (Phase 3)**: nach Phase 2 → **MVP**
- **US2 (Phase 4)**: nach Phase 2; nutzt `usePaymentSheetDonation` aus T031 (sequenziell nach US1 im Client, Server parallel möglich); T009 (Spike) vor T040/T044
- **US3 (Phase 5)**: nach US2 (braucht Dauerspenden und `DonationSubscriber`)
- **US4 (Phase 6)**: Vorlagen-Basis aus T028/T041; T057/T059 blockieren Livegang, nicht die Entwicklung
- **US5 (Phase 7)**: nach Phase 2, unabhängig
- **Release (Phase 8)**: nach den gewünschten Stories; die Store-Einreichung erst nach Abschluss von Phase 9 (Rechtstexte)
- **Rechtstexte (Phase 9)**: unabhängig von der Entwicklung; spätestens vor der Store-Einreichung abschließen

### Within Each User Story

- Tests zuerst schreiben und fehlschlagen lassen, dann implementieren
- Server-Endpunkt vor Client-Integration; Server wird vor dem Client deployt

### Parallel Opportunities

- Phase 1: T002, T003, T004, T006, T007, T008 parallel
- Phase 2: Server (T011–T014, T016, T019, T020) parallel zu Client (T021–T023)
- US1: T025/T026 parallel; T030, T032, T033, T035 parallel zu Server-Arbeit T027–T029
- US2: T036–T038 und T043 parallel
- US5 jederzeit nach Phase 2 parallel zu US2–US4

## Parallel Example: User Story 1

```bash
# Server und Client gleichzeitig:
Task: "T027 POST /one-time in democracy-api/src/donations/routes/oneTime.ts"
Task: "T030 Formular-Komponenten in democracy-client/src/screens/Donate/DonationForm/"
Task: "T033 BankTransfer.tsx in democracy-client/src/screens/Donate/"
Task: "T035 Texte in democracy-client/src/screens/Donate/content.ts"
```

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 + 2 (inkl. Spike T009)
2. Phase 3 (US1) → Testmodus-Validierung V1–V9, V17
3. Optional bereits ausliefern (Kill-Switch, nur `one_time`), DonorBox-Button entfällt

### Incremental Delivery

1. US1 → einmalige Spenden
2. US2 + US3 → Patenschaften inkl. Verwaltung (gemeinsam ausliefern: Kündigung muss ab Tag 1 möglich sein)
3. US4 finalisiert Belege (Pflicht vor Livegang)
4. US5 + Polish → Release

### Grobe Aufwandsschätzung (eine Person, ohne Wartezeiten externer Freigaben)

| Block | Aufwand |
|---|---|
| Setup + Spike (Phase 1) | 1–2 Tage |
| Server (Phasen 2–7) | 5–7 Tage |
| Client (Phasen 2–5) | 5–7 Tage |
| Belege, Rechtstexte, Store, Release (Phasen 6, 8) | 2–3 Tage + Abstimmung Vorstand/Steuerberatung |
