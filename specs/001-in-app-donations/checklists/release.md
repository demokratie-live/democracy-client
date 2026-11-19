# Release-Checkliste: In-App-Spenden (T065)

Stand: 2026-11-19 · Testumgebung: Stripe-Testmodus („Donation Test"-Profil), lokaler Testserver
(nur Spendenmodul) + `stripe listen --latest` + Mailpit, iPhone (internal-Dev-Build). **Android wurde
noch nicht gebaut und nicht getestet.**

## Quality Gates (Constitution VI)

| Gate | Ergebnis |
|---|---|
| `democracy-client`: `pnpm lint` | ✅ 0 Fehler (nur bestehende Warnungen; `/ios` und `/android` sind jetzt von ESLint ausgenommen – dort lagen lokale Build-Artefakte) |
| `democracy-client`: `pnpm lint:ts` | ✅ |
| `democracy-api`: `lint:es`, `lint:ts`, `lint:knip` | ✅ (`pnpm lint` ruft `pnpm …` auf – lokal ohne globales pnpm einzeln ausgeführt) |
| `democracy-api`: `pnpm test` (Unit) | ✅ 17 Dateien, 131 Tests |
| `democracy-api`: Integrationstests (`vitest.config.integration.ts`) | ✅ 10 Dateien, 39 Tests – gegen gebaute API in Node 22 + MongoDB 7 (Docker), `SMS_VERIFICATION=true`, `SMS_SIMULATE=true` |
| `democracy-api`: `pnpm build` | ✅ |

## Validierungsmatrix (quickstart.md V1–V22)

Legende: ✅ geprüft · 🟡 teilweise (nur Server/E2E-Skript oder nur iOS) · ⬜ offen

| # | Szenario | iOS | Android | Server/E2E | Anmerkung |
|---|---|---|---|---|---|
| V1 | Konfiguration | – | – | ✅ | `enabled: true`, nur `pk_test_…` |
| V2 | Einmalig per Karte | ✅ | ⬜ | ✅ | iPhone: 25,64 €, Abrechnungstext „DEMOCRACY* SPENDE"; Mail ✅ |
| V3 | Apple Pay / Google Pay | ⬜ | ⬜ | – | Apple Pay erst nach T006 (Merchant ID); Google Pay ungetestet |
| V4 | 3-D Secure | ⬜ | ⬜ | – | |
| V5 | Ablehnung + Retry | ⬜ | ⬜ | – | |
| V6 | SEPA | ⬜ | ⬜ | ✅ | E2E-Skript: `processing` → `succeeded`, Mail |
| V7 | SEPA-Fehlschlag | – | – | ✅ | Mail „Lastschrift nicht erfolgreich" |
| V8 | Abbruch | ⬜ | ⬜ | – | Deferred Intent: ohne Bestätigung kein PI (Design) |
| V9 | Mindestbetrag | ⬜ | ⬜ | ✅ | Server `400 amount_out_of_range`; Hinweis in der App vorhanden |
| V10 | Gebührenübernahme | – | – | ✅ | 5 € → 5,39 €, `unit_amount=539`, `base_amount=500` |
| V11 | Dauerspende anlegen | ✅ | ⬜ | ✅ | Danke-Screen mit nächstem Termin; Zuordnung nur als Hash (Unit-Tests) |
| V12 | Folgeabbuchung (Test Clock) | – | – | ⬜ | |
| V13 | Fehlgeschlagene Folgeabbuchung | – | – | ⬜ | Mail „beendet" bei `payment_failed` per Unit-Test |
| V14 | Verwalten in der App | 🟡 | ⬜ | ✅ | E2E: GET/PATCH/Portal/DELETE + Kündigungsmail; Geräte-Durchgang offen |
| V15 | Verwalten ohne Gerät (Portal-Login) | ⬜ | ⬜ | – | |
| V16 | Doppel-Dauerspende | ⬜ | ⬜ | ✅ | API `409 subscription_exists`; App sperrt „monatlich" |
| V17 | Kill-Switch | ⬜ | ⬜ | ✅ | `503 donations_disabled`; Verwalten bleibt erreichbar |
| V18 | Fremde Events | – | – | ✅ | `stripe trigger payment_intent.succeeded` → `200`, keine Mail |
| V19 | Privacy (Logs/Ingress/Mongo) | – | – | ⬜ | Braucht Deploy auf internal; Log-Typ erlaubt nur Stripe-IDs (Code) |
| V20 | Export | – | – | 🟡 | Anleitung in `docs/DONATIONS.md`; Spalten beim ersten Monatsexport prüfen |
| V21 | Retry Dauerspende | ⬜ | ⬜ | ✅ | unbezahlte Subscription → `incomplete_expired`, keine Mail |
| V22 | Erste Lastschrift läuft | ⬜ | ⬜ | ⬜ | Spike D: Subscription sofort `active`; `firstPaymentPending` per Unit-Test |

Zusätzlich geprüft (nicht in der Matrix): Erstattung und Rückbuchung → Hinweis im Log mit Herkunft
`app` (T062); Markierung der Rechnungs-PaymentIntents mit `source` (T061); Webhooks mit falscher
API-Version → `400`.

## Barrierefreiheit (T063)

Code-Durchgang erledigt: Rollen und Zustände für Rhythmus, Beträge, Schalter, Buttons und Links; Fehler-
und Statusmeldungen werden unter iOS vorgelesen (`useAnnounce`), unter Android über Live-Regionen;
Buttons wachsen mit großer Schrift. **Offen:** echter Durchgang mit VoiceOver (iPhone) und TalkBack
(Android) über Spenden-Screen, Zahlungsfenster, Danke-Screen und Verwaltung.

## Vor dem Release offen

- Android: Build und Durchgang V2–V22 (braucht entschlüsselte `google-services.json` bzw. CI-Build)
- iOS-Gerät: V3–V5, V8, V9, V14–V17, V21, V22; VoiceOver-Durchgang
- Deploy auf internal mit `DONATIONS_ENABLED=false`, Webhook-Endpoint (API-Version `2026-10-28.endive`), dann V19
- Phase 6 und 9 (Steuer- und Rechtstexte), T066–T068 (Live-Setup, Store, Organisatorisches)
