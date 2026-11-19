# Contract: Stripe-Webhooks → `democracy-api`

Endpunkt: `POST /donations/v1/stripe-webhook` (je ein Endpoint im Stripe-Test- und Live-Modus).

Verarbeitungsregeln:

1. Signatur prüfen (`stripe.webhooks.constructEvent`), sonst `400`.
2. Events ohne Handler und Objekte ohne `metadata.source = "democracy-app"` (bei Invoices:
   `parent.subscription_details.metadata`) → ignorieren, `200`, ohne Eintrag in der DB. Ausnahme:
   konto-weite Alarme (`charge.refunded`, `charge.dispute.created`, `mandate.updated`) werden
   unabhängig von der Herkunft verarbeitet (nur Log, betrifft auch DonorBox-Zahlungen).
3. Event-ID in `donation_webhook_events` als `processing` einfügen. Schon `done` → `200` (Duplikat);
   noch `processing` → `409` (Stripe stellt später erneut zu); eine seit über 5 Minuten hängende
   Verarbeitung (Pod beendet) wird übernommen. Nach Erfolg `done`.
4. Fehler in der Verarbeitung → Event-Eintrag wieder entfernen, `500` (Stripe wiederholt), Log-Eintrag
   (nur Event-ID, Typ, Fehlercode). Abweichende `api_version` → `400` vor jeder Verarbeitung.

| Event | Bedingung | Aktion |
|---|---|---|
| `payment_intent.succeeded` | `interval=one_time` | Bestätigungs-E-Mail an `customer.email ?? payment_method.billing_details.email` (falls vorhanden) |
| `payment_intent.payment_failed` | `interval=one_time`, vorher `processing` (SEPA) | E-Mail „Lastschrift nicht erfolgreich" |
| `invoice.paid` | Subscription mit `source` | Bestätigungs-E-Mail inkl. Verwaltungslink (`portalLoginUrl`); erste Rechnung: Willkommenstext |
| `invoice.payment_failed` | Subscription mit `source` | nur Log; Mahn-E-Mail versendet Stripe (Billing-Einstellung) |
| `customer.subscription.updated` | `cancel_at_period_end` wechselt auf `true` (bzw. `cancel_at` wird gesetzt) – aus der App oder dem Kundenportal | E-Mail „Kündigung bestätigt" mit Enddatum |
| `customer.subscription.updated` | Status wechselt auf `incomplete_expired` | `endedAt/deleteAt` setzen, keine E-Mail |
| `customer.subscription.deleted` | Subscription hatte mindestens eine bezahlte Rechnung (`invoices.list({ subscription, status: "paid", limit: 1 })`) und die Kündigung war **nicht** vorgemerkt (sofort beendet, z. B. `past_due` oder Mahnlauf) | `endedAt/deleteAt` setzen; E-Mail „Dauerspende beendet" |
| `customer.subscription.deleted` | Kündigung war zum Periodenende vorgemerkt (`cancel_at_period_end` bzw. `ended_at - canceled_at > 60 s`) | nur `endedAt/deleteAt`; keine zweite Mail – die Bestätigung mit Enddatum kam schon |
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
