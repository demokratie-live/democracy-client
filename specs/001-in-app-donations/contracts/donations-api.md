# Contract: Donations REST API (`democracy-api`)

**Base URL**: `{API_HOST}/donations/v1` (production `https://api.democracy-app.de/donations/v1`,
internal `https://internal.api.democracy-app.de/donations/v1`).

Allgemein:

- JSON, UTF-8, Beträge als Integer in **Cent**, Währung immer EUR.
- **Keine** DEMOCRACY-Auth-Header. Der Client sendet weder `x-token` noch Device-Hash; der Router
  hängt vor der Auth-Middleware und ignoriert solche Header.
- Verwaltungsendpunkte verlangen `Authorization: DonorKey <base64url(32 Byte)>`.
- Schreibende Endpunkte verlangen `Idempotency-Key: <uuid v4>`, der an Stripe durchgereicht wird.
  Der Client erzeugt **für jeden `confirmHandler`-Aufruf** (also jeden Bezahlversuch, auch nach
  einem Fehlschlag mit anderer Zahlungsart) einen **neuen** Key und verwendet denselben Key nur,
  um **denselben** Request nach einem Netzwerkfehler zu wiederholen.
- Der Server protokolliert zu diesen Endpunkten keine IP-Adressen, User-Agents oder
  E-Mail-Adressen; der Ingress-Pfad `/donations` hat kein Access-Log (Prinzip I, FR-006).
- Fehlerformat: `{ "error": { "code": "<code>", "message": "<deutsch, anzeigbar>" } }`.
- Rate-Limit auf `POST /one-time` und `POST /monthly`: 10 Anfragen / 10 min je Client → `429`.
  Schlüssel ist ein SHA-256 aus IP und täglich wechselndem Salt, nur im Arbeitsspeicher.

---

## GET /config

Öffentliche Spendenkonfiguration. Cachebar 5 min.

**200**

```json
{
  "enabled": true,
  "publishableKey": "pk_test_…",
  "merchantDisplayName": "DEMOCRACY Deutschland e.V.",
  "merchantCountryCode": "DE",
  "defaultInterval": "monthly",
  "minAmountCents": 500,
  "maxAmountCents": 100000,
  "presets": { "one_time": [1000, 2500, 5000, 10000], "monthly": [500, 1000, 1500, 2500] },
  "paymentMethodTypes": { "one_time": ["card", "sepa_debit", "paypal"], "monthly": ["card", "sepa_debit"] },
  "fees": { "cardPct": 1.5, "cardFixedCents": 25, "sepaFixedCents": 35, "billingPct": 0.7 },
  "portalLoginUrl": "https://billing.stripe.com/p/login/…",
  "bankTransfer": { "holder": "DEMOCRACY Deutschland e.V.", "iban": "DE83 2605 0001 0056 1290 91", "bic": "NOLADE21GOE" },
  "legal": {
    "privacyUrl": "https://www.democracy-deutschland.de/datenschutz",
    "nonprofitProofUrl": "https://www.democracy-deutschland.de/files/download/Gemeinnutzigkeit_DEMOCRACY.pdf",
    "simplifiedReceiptUrl": "https://www.democracy-deutschland.de/files/download/Vereinfachter_Zuwendungsnachweis.pdf"
  }
}
```

Bei `enabled: false` zeigt die App nur Finanzierungsstand und Bankverbindung (FR-013). Ist der
Endpunkt nicht erreichbar, verhält sich die App ebenso (Fallback-Bankdaten im App-Bundle).

---

## POST /one-time

Legt nach Bestätigung im PaymentSheet (`confirmHandler`) einen PaymentIntent an.

**Request**

```json
{
  "amountCents": 1000,
  "coverFees": true,
  "email": "spender@example.org",
  "paymentMethodId": "pm_…",
  "platform": "ios",
  "appVersion": "1.6.0"
}
```

- `amountCents`: gewählter Betrag ohne Aufschlag, `min ≤ x ≤ max`.
- `email`: optional.
- Server prüft den Typ von `paymentMethodId` gegen `paymentMethodTypes.one_time` und berechnet
  den belasteten Betrag (Gebührenformel, siehe research.md R4) selbst.

**200**

```json
{ "clientSecret": "pi_…_secret_…", "paymentIntentId": "pi_…", "chargedAmountCents": 1041 }
```

**Fehler**: `400 amount_out_of_range`, `400 invalid_email`, `400 payment_method_not_allowed`,
`409 idempotency_conflict`, `429 rate_limited`, `503 donations_disabled`, `502 stripe_error`.

---

## POST /monthly

Legt Customer (bzw. verwendet ihn wieder) und Subscription an und verknüpft sie mit dem
Spender-Schlüssel. Der Client erzeugt den Schlüssel **vor** dem Aufruf und speichert ihn erst nach
`200` dauerhaft in der Keychain.

**Headers**: `Authorization: DonorKey …`, `Idempotency-Key: …`

**Request**

```json
{
  "amountCents": 500,
  "coverFees": true,
  "email": "spender@example.org",
  "paymentMethodId": "pm_…",
  "platform": "android",
  "appVersion": "1.6.0"
}
```

**200**

```json
{ "clientSecret": "pi_…_secret_…", "subscriptionId": "sub_…", "chargedAmountCents": 539 }
```

**Fehler**: wie `/one-time`, zusätzlich `400 email_required`,
`409 subscription_exists` (aktuelle Subscription des Schlüssels ist `active` oder `past_due`),
`409 subscription_pending` (aktuelle Subscription ist `incomplete`, ihre erste Zahlung wird noch
eingezogen – `processing`).

**Retry-Verhalten**: Ist die aktuelle Subscription des Schlüssels `incomplete` und ihre erste
Zahlung nicht `processing` (z. B. erste Karte abgelehnt), kündigt der Server sie und legt eine neue
an (`200`). Der Client verwendet dafür denselben Spender-Schlüssel, aber einen neuen
`Idempotency-Key`.

---

## GET /monthly

**Headers**: `Authorization: DonorKey …`

**200**

```json
{
  "status": "active",
  "cancelAtPeriodEnd": false,
  "amountCents": 539,
  "baseAmountCents": 500,
  "coverFees": true,
  "currentPeriodEnd": "2026-12-19T10:00:00Z",
  "paymentMethod": { "type": "sepa_debit", "label": "SEPA •••• 3000" },
  "lastPaymentError": null
}
```

`status` ∈ `incomplete | active | past_due | canceled | incomplete_expired`.
`lastPaymentError`: `{ "message": "Karte abgelaufen", "at": "…" }` oder `null`.

**404 not_found**: kein Eintrag zum Schlüssel → App löscht den lokalen Schlüssel.

---

## PATCH /monthly

Ändert den Betrag ab der nächsten Abbuchung (`proration_behavior=none`).

**Headers**: `Authorization: DonorKey …`, `Idempotency-Key: …`

**Request**: `{ "amountCents": 1000, "coverFees": false }`

**200**: wie `GET /monthly`. **Fehler**: `400 amount_out_of_range`, `404`, `409 not_active`.

---

## DELETE /monthly

Kündigt: `active` → `cancel_at_period_end=true`; `past_due` und `incomplete` ohne laufende Zahlung
→ sofort. `409 payment_pending`, solange die erste Zahlung `processing` ist.

**Headers**: `Authorization: DonorKey …`

**200**: wie `GET /monthly` (mit `cancelAtPeriodEnd: true` bzw. `status: "canceled"`).

---

## POST /monthly/portal-session

Erzeugt eine kurzlebige Stripe-Customer-Portal-Session (Zahlungsart ändern, Belege einsehen).
Die App öffnet die URL im In-App-Browser (`expo-web-browser`), Rücksprung per
`democracy://donate/manage`.

**Headers**: `Authorization: DonorKey …`

**200**: `{ "url": "https://billing.stripe.com/p/session/…" }`

---

## POST /stripe-webhook

Nur für Stripe. Roh-Body (`express.raw`), Signaturprüfung mit `STRIPE_WEBHOOK_SECRET`, Antwort
`200` nach erfolgreicher (oder bereits erfolgter) Verarbeitung, `400` bei ungültiger Signatur.
Siehe [stripe-webhooks.md](./stripe-webhooks.md).
