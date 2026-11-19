# Contract: Stripe-Webhooks → `democracy-api`

Endpunkt: `POST /donations/v1/stripe-webhook` (je ein Endpoint im Stripe-Test- und Live-Modus).

Verarbeitungsregeln:

1. Signatur prüfen (`stripe.webhooks.constructEvent`), sonst `400`.
2. Event-ID in `donation_webhook_events` einfügen; Duplikat → sofort `200` (Idempotenz).
3. Objekt ohne `metadata.source = "democracy-app"` (bei Invoices: über die Subscription) →
   ignorieren, `200`.
4. Fehler in der Verarbeitung → Event-Eintrag wieder entfernen, `500` (Stripe wiederholt), Log an
   Discord-Logger.

| Event | Bedingung | Aktion |
|---|---|---|
| `payment_intent.succeeded` | `interval=one_time` | Bestätigungs-E-Mail an `customer.email ?? payment_method.billing_details.email` (falls vorhanden) |
| `payment_intent.payment_failed` | `interval=one_time`, vorher `processing` (SEPA) | E-Mail „Lastschrift nicht erfolgreich" |
| `invoice.paid` | Subscription mit `source` | Bestätigungs-E-Mail inkl. Verwaltungslink (`portalLoginUrl`); erste Rechnung: Willkommenstext |
| `invoice.payment_failed` | Subscription mit `source` | nur Log; Mahn-E-Mail versendet Stripe (Billing-Einstellung) |
| `customer.subscription.updated` | `cancel_at_period_end` wechselt auf `true` | E-Mail „Kündigung bestätigt, letzte Abbuchung war …" |
| `customer.subscription.updated` | Status wechselt auf `incomplete_expired` | `endedAt/deleteAt` setzen, keine E-Mail |
| `customer.subscription.deleted` | Subscription hatte mindestens eine bezahlte Rechnung (`invoices.list({ subscription, status: "paid", limit: 1 })`) | `endedAt/deleteAt` setzen; E-Mail „Dauerspende beendet" |
| `customer.subscription.deleted` | nie bezahlt (ersetzte oder abgebrochene `incomplete`-Subscription) | nur `endedAt/deleteAt`, falls noch aktuelle Subscription des Subscribers; keine E-Mail |
| `charge.refunded` | – | Log (Info an Kassenwart) |
| `charge.dispute.created` | – | Alarm an Kassenwart (SEPA-Rückgabe oder Kartenanfechtung); keine E-Mail an Spender:in, Dauerspende läuft weiter |

Alle Subscription-Events wirken nur auf den `DonationSubscriber`, dessen `stripeSubscriptionId`
der Event-Subscription entspricht (ersetzte `incomplete`-Subscriptions ändern nichts).
Rechnungs-Mails (`invoice.paid`) gehen an `customer.email` (bei Dauerspenden Pflicht).
| `mandate.updated` | Mandat widerrufen | Log |

Stripe-seitige Einstellungen (Dashboard, keine Code-Änderung):

- Zahlungsbestätigungs-Mails von Stripe **aus** (eigene Mails), SEPA-Vorabankündigungen **an**.
- Billing → Smart Retries an (z. B. 4 Versuche in 2 Wochen), danach Subscription **kündigen**;
  E-Mails bei fehlgeschlagener Zahlung und bei nötiger Bestätigung (3DS) **an** mit Link zur
  gehosteten Stripe-Seite.
- Customer Portal: Zahlungsart ändern, Rechnungsverlauf, Kündigen **an**; Tarifwechsel **aus**
  (Betragsänderung läuft über die App); Login-Link aktivieren.
