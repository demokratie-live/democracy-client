# Research: In-App-Spenden

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Stand**: 2026-11-19

Format je Thema: **Decision** – **Rationale** – **Alternatives considered**. Quellen am Ende jedes
Abschnitts. „unverifiziert" markiert Punkte ohne Primärquelle.

---

## R1. Vorbild Signal – was übernehmen, was nicht

Signal (Server `cbbfc39`, Android `aa38b25`, iOS `4537228`, Stand 2026-11) nutzt **kein Stripe-SDK**:
Beide Apps sprechen die Stripe-REST-API direkt mit dem Publishable Key an (eigenes Kartenformular,
Apple-Pay-Token, SEPA/iDEAL-PaymentMethods). Der Server legt mit dem Secret Key Customer,
SetupIntent, Subscription bzw. PaymentIntent an. Monatsspenden sind Stripe-Billing-Subscriptions
(Price je Stufe × Währung), Einmalspenden nackte PaymentIntents. Anonymität über eine zufällige
32-Byte-Subscriber-ID (nicht mit dem Account verknüpft) plus zk-Receipt-Credentials für Badges.
Status per Client-Polling (Keep-alive alle 3 Tage) statt Webhooks. PayPal über Braintree.

- **Decision**: Übernehmen: (a) Server-Konfigurationsendpunkt (Beträge, Mindestbetrag,
  Zahlungsarten je Rhythmus), (b) Server legt alle Intents an, Client bestätigt nur,
  (c) zufälliger, gerätegebundener Spender-Schlüssel statt Konto-Verknüpfung, (d) Idempotenz-Keys,
  (e) „ausstehend"-Zustand für SEPA und Sperre neuer Dauerspenden während einer aussteht,
  (f) Kündigung zum Periodenende, sofort bei `past_due`, (g) Betragsänderung ohne Proration,
  (h) `RecurringPaymentRequest` für monatliches Apple Pay.
- **Nicht übernehmen**: zk-Credentials/Badges (Gegenleistung, Konflikt mit Prinzip II), eigenes
  Kartenformular und handgeschriebene Stripe-REST-Aufrufe (PCI-Last, Wartung), Braintree,
  Client-Polling, Regions-Gating.
- **Anders machen**: Webhooks statt Polling; E-Mail-Adresse für Belege (deutsches Steuerrecht);
  gehostetes Stripe-Kundenportal für geräteunabhängige Verwaltung.
- **Rationale**: Signal optimiert auf maximale Anonymität und Unabhängigkeit vom SDK – beides
  rechtfertigt den Aufwand für ein kleines Team nicht (Prinzip V). Der Kern (Server-Intents,
  native Wallets, anonymer Schlüssel) ist übertragbar.
- **Quellen**: `signalapp/Signal-Server` `controllers/SubscriptionController.java`,
  `purchases/StripeManager.java`, `storage/SubscriberCredentials.java`;
  `signalapp/Signal-Android` `lib/donations/.../StripeApi.kt`, `InAppPaymentKeepAliveJob.kt`;
  `signalapp/Signal-iOS` `SignalServiceKit/Subscriptions/Donations/Stripe.swift`,
  `DonationUtilities.swift`.

## R2. Client-Integration: Stripe PaymentSheet (nativ) mit Deferred Intents

- **Decision**: `@stripe/stripe-react-native` **0.38.6** (die zu Expo SDK 52 gebündelte Version) mit
  **PaymentSheet** im **Deferred-Intent-Modus** (`intentConfiguration` + `confirmHandler`): Die App
  zeigt das Sheet mit Betrag, erst beim Bestätigen legt der Server PaymentIntent bzw. Subscription
  an und gibt das `clientSecret` zurück. Gleicher Codepfad für einmalig und monatlich.
  Einbindung über das mitgelieferte Expo-Config-Plugin (`merchantIdentifier`, `enableGooglePay`).
- **Rationale**:
  - Nativ, Signal-ähnliche UX ohne eigenes Kartenformular; Apple Pay, Google Pay, Karte,
    SEPA (`allowsDelayedPaymentMethods`), PayPal und 3-D Secure (`returnURL`) sind enthalten.
  - Deferred Intents: keine verwaisten Intents bei Abbruch, Betrag im Sheet sichtbar, Server
    kennt die gewählte PaymentMethod vor dem Anlegen (Validierung, Missbrauchsschutz).
  - Geprüft im Paket 0.38.6: `IntentConfiguration`/`confirmHandler`, PayPal-Typen,
    `ApplePayParams.request: RecurringPaymentRequest`, `allowsDelayedPaymentMethods`,
    `returnURL`, Config-Plugin `withStripe` (Apple-Pay-Entitlement, Google-Pay-Meta-Data).
  - CNG-kompatibel (Prinzip V): keine Handarbeit in `ios/`/`android/`.
- **Alternatives considered**:
  - *Stripe Checkout (gehostet) im In-App-Browser*: kein natives SDK, minimaler Client-Code, aber
    Browser-UX wie heute bei DonorBox; mit Apple-Freigabe unnötig. **Bleibt als Fallback-Option**
    (z. B. für die Website), nicht für v1 der App.
  - *Signal-Ansatz (REST ohne SDK)*: maximale Kontrolle, aber eigenes Kartenformular → PCI SAQ A-EP
    statt SAQ A, 3DS/Redirects selbst bauen. Verworfen.
  - *Neueste SDK-Version*: verlangt neueres Expo/RN. Expo-Upgrade ist nicht Teil dieses Features;
    SDK-Update erfolgt mit dem nächsten Expo-Upgrade.
- **Risiko**: 0.38.6 ist von Ende 2024. PayPal-Unterstützung im PaymentSheet für
  *wiederkehrende* Zahlungen (`setup_future_usage`) in dieser Version ist **unverifiziert** →
  Spike-Task; PayPal monatlich bleibt per Konfiguration abschaltbar (FR-003).

## R3. Wiederkehrende Spenden: Stripe Billing mit Inline-Preisen

- **Decision**: Stripe-Billing-Subscriptions (Entscheidung Clarification 2026-11-19). Ein Product
  „Monatliche Spende an DEMOCRACY", Preis je Subscription **inline** über `items[].price_data`
  (`unit_amount` = Spendenbetrag inkl. Gebührenübernahme, `recurring.interval=month`).
  Anlage mit `payment_behavior=default_incomplete`,
  `payment_settings.save_default_payment_method=on_subscription`; das `clientSecret` der ersten
  Rechnung (`latest_invoice.confirmation_secret`, API-Version ≥ 2025-03-31 „basil") geht an den
  `confirmHandler`. Betragsänderung: Item auf neuen `price_data` umstellen,
  `proration_behavior=none` (gilt ab nächster Abbuchung). Kündigung:
  `cancel_at_period_end=true`, bei `past_due`/`unpaid` sofort.
- **Rationale**: Smart Retries, Mahn-E-Mails mit Link zur Aktualisierung der Zahlungsart,
  automatische Kündigung nach letztem Fehlversuch und Kundenportal sind enthalten (FR-014/015/017)
  – das ersetzt Scheduler, Retry-Logik und Verwaltungsseite. Inline-Preise erlauben freie Beträge
  ohne Price-Objekt-Wildwuchs.
- **Kosten**: 0,7 % des Billing-Volumens. Heute ~1.560 €/Monat Patenvolumen (fast alles
  Dauerauftrag); selbst bei 100 % über Stripe ≈ 11 €/Monat. Neu bewerten ab ~5.000 €/Monat
  In-App-Dauerspendenvolumen (≈ 420 €/Jahr Billing-Gebühr).
- **Alternatives considered**: Selbst geplante Off-Session-Abbuchungen (spart 0,7 %, aber
  Scheduler, Retries, SCA-Fallbacks, Mails, Verwaltungsseite selbst bauen) – vom Verein
  abgelehnt. Price-Objekte je Stufe (Signal) – verworfen wegen freier Beträge.
- **Zu verifizieren im Spike**: Verhalten einer Subscription, deren erste Zahlung per SEPA
  `processing` ist (Status `incomplete` bis Zahlungseingang; kein `incomplete_expired` bei
  `processing` erwartet) – mit Test-Clock prüfen.

## R4. Zahlungsarten und Gebühren

Stripe-Preise Deutschland (stripe.com/de/pricing, abgerufen 2026-11-19): EWR-Standardkarten
**1,5 % + 0,25 €**, EWR-Premiumkarten **2,8 % + 0,25 €**, UK 2,5 % + 0,25 €, international
3,15 % + 0,25 € (+2 % bei Währungsumrechnung); Apple Pay/Google Pay = Kartentarif;
**SEPA-Lastschrift 0,35 €** (fehlgeschlagene Lastschrift 3,50 €, Rücklastschrift/Dispute 15 €);
**Billing 0,7 %** (pay as you go, Kundenportal/Smart Retries/Mahnmails inklusive);
PayPal über Stripe: 0,2 % + 0,10 € Stripe-Gebühr **plus** PayPal-Gebühr, die PayPal direkt über das
verknüpfte PayPal-Konto abrechnet (docs.stripe.com/payments/paypal).

Kosten je Abbuchung (€, Standardkarte, PayPal unter Annahme Gemeinnützigkeitstarif 1,5 % + 0,35 €):

| Betrag | Karte/Wallet | SEPA | PayPal via Stripe | DonorBox (bisher, Karte) |
|---|---|---|---|---|
| 5 € einmalig | 0,33 | 0,35 | 0,54 | 0,47 |
| 10 € einmalig | 0,40 | 0,35 | 0,62 | 0,70 |
| 25 € einmalig | 0,63 | 0,35 | 0,88 | 1,36 |
| 5 € monatlich (+0,7 %) | 0,36 | 0,39 | 0,57 | – |
| 10 € monatlich | 0,47 | 0,42 | 0,69 | – |
| 25 € monatlich | 0,80 | 0,53 | 1,05 | – |

- **Decision**: Zahlungsarten v1 = Apple Pay (iOS), Google Pay (Android), Karte, SEPA-Lastschrift,
  PayPal (einmalig; monatlich nach PayPal-Freigabe). Gesteuert über die Server-Konfiguration:
  explizite Listen `payment_method_types` je Rhythmus (`card`, `sepa_debit`, `paypal`; Apple Pay/
  Google Pay laufen als `card`), die Client (`intentConfiguration.paymentMethodTypes`) und Server
  (Intent-/Subscription-Anlage) identisch verwenden – so passen Sheet und Intent immer zusammen.
  Reihenfolge im Sheet: Wallet → SEPA → PayPal → Karte. Stripe Link aus (unnötige Komplexität).
  **Mindestbetrag 5 €** (Clarification), Höchstbetrag 1.000 € (Missbrauchs-/Rücklastschriftrisiko;
  größere Spenden per Überweisung).
- **Gebührenübernahme (FR-001b)**: Aufschlag = Brutto-Hochrechnung auf Basis des teureren aus
  Standardkarte und SEPA, inkl. 0,7 % Billing bei monatlich, auf Cent aufgerundet:
  `T = max( (A + 0,25) / (1 − 0,015 − b), (A + 0,35) / (1 − b) )`, `b = 0,007` bei monatlich sonst
  0 – Beispiel 5 € monatlich → 5,39 €; 10 € einmalig → 10,41 €. Parameter kommen aus der
  Server-Konfiguration; der Server rechnet verbindlich nach. Mehrkosten bei Premium-/Auslandskarten
  oder PayPal trägt der Verein (Edge Case der Spec).
- **Rationale**: Wallets konvertieren am besten; SEPA ist ab ~6,70 € die günstigste Methode und
  für Dauerspenden Standard in DE; PayPal ist in DE verbreitet und kostet bei geringem Volumen
  nur wenig mehr als eine Direktanbindung (Clarification).
- **Begleitende Maßnahmen (organisatorisch)**: Stripe-Nonprofit-Rabatt beantragen (DE ist
  berechtigt; Bedingung ≥ 80 % steuerbegünstigte Spenden im Stripe-Volumen; Rate unveröffentlicht,
  **unverifiziert** für DE e.V.; explizit nach SEPA/Wallets fragen). PayPal-Tarif prüfen
  (10-€-Spende: 0,50 € Gebühr = Gemeinnützigkeitstarif, 0,60 € = Standard-Spendentarif) und
  bestätigen lassen, dass er bei Verknüpfung mit Stripe gilt; PayPal-Freigabe für wiederkehrende
  Zahlungen beantragen.
- **Alternatives considered**: DonorBox (2,95 % Plattformgebühr zusätzlich, donorbox.org/pricing);
  Twingle (5 % all-in < 10 k€/Jahr), FundraisingBox (4 % + USt + Zahlungsgebühr), betterplace
  (2,8 % all-in, aber fremde Plattform hält die Spenderbeziehung); PayPal direkt (zweite
  Integration, verworfen); Pay-by-Bank (0,5 % + 0,25 €, nicht günstiger als SEPA).
- **Quellen**: stripe.com/de/pricing; stripe.com/de/pricing/local-payment-methods;
  stripe.com/de/billing/pricing; docs.stripe.com/payments/sepa-debit;
  docs.stripe.com/payments/paypal;
  support.stripe.com/questions/fee-discount-for-nonprofit-organizations; donorbox.org/pricing;
  PayPal-Händlergebühren DE (PDF vom 04.11.2026).

## R5. Store-Konformität

- **Apple**: App Review Guideline **3.2.1(vi)** (Stand 16.10.2026): „Approved nonprofits may
  fundraise directly within their own apps … provided those fundraising campaigns adhere to all App
  Review Guidelines and offer Apple Pay support. These apps must disclose how the funds will be
  used, abide by all required local and federal laws, and ensure appropriate tax receipts are
  available to donors." Der Verein ist freigeschaltet (Clarification).
  - **Decision**: Apple Pay ist auf iOS Pflicht und wird zuerst angezeigt. Mittelverwendung wird
    über den bestehenden Finanzierungsstand (Kostenaufstellung) offengelegt. Steuerbelege über
    Bestätigungs-E-Mail + vereinfachten Zuwendungsnachweis + formale Bestätigung auf Anfrage.
    Review-Notes nennen die Nonprofit-Freigabe und enthalten Testanweisungen (Stripe-Testmodus
    in der `internal`-Variante).
  - Keine In-App-Purchases/StoreKit; keine Gegenleistung (sonst wäre es keine Spende).
- **Google Play**: Payments Policy, Abschnitt 3: Google Play Billing „must not be used in cases
  where: … payment involves … **tax exempt donations**". → Stripe in der App zulässig.
  - **Decision**: Google Pay über Stripe (Integrationstyp „Gateway"); Production-Zugang in der
    Google Pay & Wallet Console beantragen; Freistellungsbescheid für Rückfragen bereithalten.
- **Datenschutz-Angaben**: App-Store-„Privacy Nutrition Labels" und Play-„Datensicherheit"
  ergänzen (E-Mail-Adresse, Zahlungsinformationen über Stripe, ggf. SDK-Diagnosedaten von Stripe).
- **Quellen**: developer.apple.com/app-store/review/guidelines/ (3.2.1(vi), 3.2.2(iv));
  developer.apple.com/apple-pay/nonprofits/;
  support.google.com/googleplay/android-developer/answer/9858738;
  docs.stripe.com/google-pay?platform=android.

## R6. Steuerliche Belege und Aufbewahrung

- **Decision**: Nach jeder erfolgreichen Abbuchung sendet `democracy-api` eine eigene
  Bestätigungs-E-Mail mit den Angaben, die der Verein zum **vereinfachten Zuwendungsnachweis**
  (§ 50 Abs. 4 Nr. 2 b EStDV, bis 300 € je Zuwendung) beisteuern muss: steuerbegünstigter Zweck,
  Angaben zur Freistellung (Finanzamt, Datum, Steuernummer), Kennzeichnung als Spende (kein
  Mitgliedsbeitrag), plus Link zum bestehenden PDF „Vereinfachter Zuwendungsnachweis" und Hinweis
  auf formale Bestätigung per Antwort-Mail (Name + Anschrift). Stripe-Zahlungsbelege werden
  deaktiviert (Doppelmails vermeiden); Stripe-Mahnmails und SEPA-Vorabankündigungen bleiben aktiv.
- **Wichtig – Freistellungsbescheid prüfen**: Die App nennt heute einen Feststellungsbescheid des
  Finanzamts Göttingen vom **23.08.2017**. Zuwendungsbestätigungen dürfen nur ausgestellt werden,
  solange der maßgebliche Bescheid nicht zu alt ist (§ 63 Abs. 5 AO). Vor Livegang den aktuellen
  Freistellungsbescheid (Anlage zum KSt-Bescheid) einsetzen – in App-Text, E-Mail und PDF.
- **Aufbewahrung**: Buchungsbelege 8 Jahre (§ 147 Abs. 3 AO i. d. F. BEG IV), Bücher/
  Jahresabschlüsse 10 Jahre; Kopien ausgestellter Zuwendungsbestätigungen aufbewahren
  (§ 50 Abs. 7 EStDV). Zahlungsdaten liegen in Stripe; lokal speichert `democracy-api` nur
  Zuordnungsdaten (siehe data-model.md) und löscht sie 90 Tage nach Ende einer Dauerspende.
- **SCA/PSD2**: Erste Kartenzahlung mit 3DS bzw. Wallet-Biometrie und
  `setup_future_usage=off_session`; Folgeabbuchungen sind Merchant-Initiated (außerhalb SCA).
  SEPA ist lastschriftbasiert (Mandat wird im PaymentSheet angezeigt und von Stripe gespeichert).
  Fallback, falls die Bank dennoch Authentifizierung verlangt: Stripe-Mail mit Link zur gehosteten
  Bestätigungsseite (Billing-Einstellung).
- **Alternatives considered**: Automatische Sammel-/Einzelbestätigungen als PDF – vom Verein für
  v1 abgelehnt (Clarification); später möglich, erfordert Anzeige maschineller Bestätigungen
  beim Finanzamt.
- **Quellen**: gesetze-im-internet.de/estdv_1955/__50.html; gesetze-im-internet.de/ao_1977/__63.html;
  gesetze-im-internet.de/ao_1977/__147.html; BMF-Schreiben vom 07.11.2013 (Muster); Steuerberater:in
  zur Endabnahme des E-Mail-Texts (empfohlen).

## R7. Server-Architektur in `democracy-api`

- **Decision**: Neues, in sich geschlossenes Modul `src/donations/` in `demokratie-live/democracy-api`
  mit **REST-Endpunkten unter `/donations/v1`** (Express-Router), eingehängt **vor** der
  Auth-Middleware. Stripe-Node-SDK mit fest gepinnter API-Version. Webhook-Endpunkt mit
  `express.raw()` und Signaturprüfung. Zwei kleine Mongoose-Collections lokal im Repo (nicht in
  `democracy-common`). E-Mail-Versand per `nodemailer` über das bestehende SMTP-Postfach des
  Vereins. Rate-Limiting (`express-rate-limit`) auf den schreibenden Endpunkten.
- **Rationale**:
  - REST statt GraphQL: Webhooks brauchen ohnehin Express-Routen; die Donation-Endpunkte sollen
    **ohne** Nutzer-Kontext laufen (Prinzip I) – vor der Auth-Middleware gibt es keinen
    JWT-/Device-Bezug, auch nicht versehentlich in Logs. Das Modul bleibt später für die Website
    oder einen eigenen Service wiederverwendbar.
  - Lokale Modelle statt `democracy-common`: kein Release des Shared-Pakets nötig, Spendendaten
    bleiben von Abstimmungsdaten getrennt.
  - Stripe ist Source of Truth für Zahlungen (Prinzip IV/V); lokal nur, was Stripe nicht kann
    (Zuordnung Spender-Schlüssel → Customer/Subscription, Webhook-Idempotenz).
- **Alternatives considered**: GraphQL-Mutationen (verworfen: Auth-Kontext, Codegen-Kopplung);
  eigener Microservice in `democracy-development/services` (verworfen: zusätzlicher Deploy-Pfad,
  Monorepo-Migration noch offen); Stripe-Customer-Search statt lokaler Collection (verworfen:
  Search ist eventual consistent, ~1 min Verzögerung).
- **DonorBox-Koexistenz**: DonorBox nutzt dasselbe Stripe-Konto. Alle von der App erzeugten Objekte
  tragen `metadata.source = "democracy-app"`; der Webhook-Handler ignoriert alles andere.

## R8. Spender-Identität ohne Konto

- **Decision**: Beim ersten Abschluss einer Dauerspende erzeugt die App 32 Zufallsbytes
  (`expo-crypto`), speichert sie in `react-native-keychain` (bereits Abhängigkeit) und sendet sie
  einmalig an den Server, der nur `SHA-256(key)` speichert. Verwaltungsaufrufe authentisieren sich
  mit `Authorization: DonorKey <base64url>`. Geräteunabhängige Verwaltung über den **Stripe
  Customer Portal Login-Link** (Magic Link an die E-Mail-Adresse), der in jeder Bestätigungs-Mail
  steht.
- **Rationale**: Kein Konto, keine Verknüpfung mit Abstimmungen (FR-005/006, SC-007), minimaler
  Server-Zustand. Verlust des Schlüssels (Neuinstallation) ist unkritisch dank E-Mail-Link.
- **Alternatives considered**: Verknüpfung mit DEMOCRACY-User (verstößt gegen Prinzip I);
  E-Mail-Login in der App (zusätzliche Verifikationsflüsse); Signals HMAC-Schema (unnötig komplex).

## R9. Missbrauchsschutz (Card Testing)

- **Decision**: Rate-Limit je Client auf Intent-Erzeugung (z. B. 10/10 min; Schlüssel =
  SHA-256(IP + täglicher Salt), nur im Arbeitsspeicher, siehe R10), Mindestbetrag 5 €,
  Deferred Intents (Intent erst bei Bestätigung), Stripe-Radar-Standardregeln plus Regel „Block if
  CVC check fails", Monitoring fehlgeschlagener Zahlungen über den bestehenden Discord-Logger.
- **Bekannte Grenze**: Das Rate-Limit zählt pro Pod im Speicher; Produktion läuft mit 10 Replicas
  (Repo `infrastructure`), im ungünstigsten Fall also bis zu 10× so viele Versuche. Bewusst kein
  gemeinsamer Speicher (sonst müssten IP-Hashes persistiert werden); Radar und Mindestbetrag sind
  der Hauptschutz.
- **Rationale**: Unauthentifizierte Zahlungsendpunkte sind ein bekanntes Ziel; Signal hat dafür
  2026 eigene „Donation Permits" eingeführt (für uns zu aufwendig). App Attest/Play Integrity erst,
  falls Missbrauch auftritt.

## R10. Keine Korrelation über Betriebsprotokolle (Prinzip I)

Befund (`/speckit-analyze`, C1): Spenden- und GraphQL-Anfragen laufen über denselben Host. Der
nginx-Ingress protokolliert standardmäßig jede Anfrage mit IP, Pfad und Zeit; `democracy-api` loggt
in der Auth-Middleware zusätzlich die Client-IP (`src/express/auth/index.ts:129`, Level `debug`).
Über IP + Zeit wäre eine Spende einer abstimmenden IP zuordenbar.

- **Decision**:
  1. Eigenes Ingress-Objekt nur für den Pfad `/donations` mit
     `nginx.ingress.kubernetes.io/enable-access-log: "false"` (Dev: `infra/manifests`, Produktion:
     kustomize-Overlay in `demokratie-live/infrastructure`). Pfad-spezifische Ingress-Objekte
     haben Vorrang vor dem `/`-Prefix des bestehenden Ingress.
  2. Donation-Router hängt vor der Auth-Middleware (kein IP-Debug-Log) und loggt nur Stripe-IDs,
     Event-Typen und Fehlercodes – keine IP, keinen User-Agent, keine E-Mail.
  3. Rate-Limiter-Schlüssel = SHA-256(IP + täglich rotierender Salt), Speicher nur im Prozess.
  4. Verifikation in quickstart V19: Ingress-Log enthält keine `/donations`-Zeilen.
- **Rationale**: Prinzip I verlangt, dass eine Verknüpfung technisch ausgeschlossen ist, nicht
  nur organisatorisch. Die Maßnahmen kosten fast nichts.
- **Alternatives considered**: Eigene Subdomain `donations.democracy-app.de` (gleiche Wirkung, aber
  zusätzlicher DNS-/TLS-Aufwand; bei Bedarf später); IP-Anonymisierung im nginx-Logformat
  (wirkt global, größerer Eingriff in bestehendes Logging).

## R11. Offene Punkte (nicht blockierend für Tasks)

| # | Punkt | Verantwortlich | Blockiert |
|---|---|---|---|
| O1 | SMTP-Zugang (Absender z. B. `spenden@democracy-deutschland.de`) | Verein | E-Mails (US4) |
| O2 | Aktueller Freistellungsbescheid (Datum, Finanzamt, StNr., Zweck) | Vorstand | Livegang |
| O3 | Stripe-Nonprofit-Rabatt beantragen | Vorstand | – (nur Kosten) |
| O4 | PayPal: Tarif prüfen, Stripe-Verknüpfung, Freigabe wiederkehrender Zahlungen | Vorstand | PayPal monatlich |
| O5 | Google-Pay-Production-Zugang | Dev | Android-Release |
| O6 | Apple Merchant ID + Apple-Pay-Zertifikat (über Stripe-CSR) | Dev | iOS-Build |
| O7 | Datenschutzerklärung + Store-Datenschutzangaben aktualisieren | Verein | Release |
| O8 | Spike: PayPal-Wiederkehrend im PaymentSheet 0.38.6; SEPA-Erstzahlung + Subscription-Status | Dev | US2 PayPal/SEPA |
