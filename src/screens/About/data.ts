interface Credentials {
  title: string;
  text: string;
  opened?: boolean;
}

/**
 * Datenschutzerklärung und Nutzungsbedingungen: Quelle ist das Website-Repo
 * (democracy-deutschland.de, content/legal/*.md). Nicht hier bearbeiten, sondern dort ändern und
 * `node scripts/sync-legal-texts.mjs` ausführen.
 */
export const credentialsData: Credentials[] = [
  {
    opened: true,
    title: "Impressum",
    text: `**Angaben gemäß § 5 TMG**
DEMOCRACY Deutschland e.V. (gemeinnützig)
Am Klausberge 12
37075 Göttingen

**Vertreten durch**
Marius Krüger
Andreas Krüger

**Kontakt**
Telefon: +49 176 470 40 213
E-Mail: [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de)

**Registereintrag**
Eintragung im Vereinsregister.
Registergericht: Amtsgericht Göttingen
Registernummer: VR 201924`,
  },
  {
    title: "Datenschutzerklärung",
    text: `_Stand: November 2026_

---

> **Präambel:**
> Der gemeinnützige Verein DEMOCRACY Deutschland e.V. entwickelt mit der App „DEMOCRACY" eine öffentliche Beteiligungsinfrastruktur: Die App informiert Dich über die Vorgänge und Abstimmungen im Deutschen Bundestag und lässt Dich selbst darüber abstimmen. Deine Daten sind für uns kein Wirtschaftsgut, sondern im Sinne des Grundgesetzes zu schützen. Das Abstimmungsgeheimnis ist Kern unserer Arbeit: Wie Du abstimmst, speichern wir nicht so, dass es Dir zugeordnet werden kann.
>
> Wir verarbeiten Deine Daten nach der Datenschutz-Grundverordnung (DS-GVO), dem Bundesdatenschutzgesetz (BDSG) und dem Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG) und folgen dabei dem Grundsatz der Datensparsamkeit. Mit dieser Datenschutzerklärung informieren wir Dich, welche Daten wir bei der Nutzung der App, unserer Website und unserer Spendenangebote verarbeiten und welche Rechte Du hast.
>
> Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen – etwa Name, E-Mail-Adresse, Telefonnummer, IP-Adresse oder eine Gerätekennung. Pseudonymisierte Daten (z. B. ein Hashwert Deiner Telefonnummer) bleiben personenbezogen. Anonyme Daten liegen vor, wenn kein Personenbezug mehr hergestellt werden kann.

## 1. Verantwortliche Stelle und Datenschutz-Kontakt

**DEMOCRACY Deutschland e.V.**  
Am Klausberge 12  
37075 Göttingen

Vertreten durch den Vorstand: Marius Krüger, Andreas Krüger  
Vereinsregister: Amtsgericht Göttingen, VR 201924

Kontakt: [www.democracy-deutschland.de](https://democracy-deutschland.de/) | Telefon: +49 176 470 40 213 | E-Mail: [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de)

Datenschutz-Kontakt: [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de)

**[OFFEN: Ist ein Datenschutzbeauftragter benannt? Falls ja, Name/Kontakt ergänzen; falls nein (keine Pflicht nach § 38 BDSG), diesen Satz streichen.]**

---

## 2. Deine Rechte als betroffene Person

Dir stehen nach Art. 15–22 DS-GVO folgende Rechte zu:

- das Recht auf **Auskunft** (Art. 15 DS-GVO)
- das Recht auf **Berichtigung** (Art. 16 DS-GVO)
- das Recht auf **Löschung** (Art. 17 DS-GVO)
- das Recht auf **Einschränkung der Verarbeitung** (Art. 18 DS-GVO)
- das Recht auf **Datenübertragbarkeit** (Art. 20 DS-GVO)
- das **Widerspruchsrecht** gegen die Verarbeitung (Art. 21 DS-GVO)
- das Recht, eine erteilte **Einwilligung jederzeit zu widerrufen** (Art. 7 Abs. 3 DS-GVO), ohne dass die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung berührt wird

Um diese Rechte geltend zu machen, schreib uns an [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de). Weil wir in der App keine Namen oder E-Mail-Adressen speichern, können wir Dich dort nur über Dein Gerät bzw. Deine Telefonnummer zuordnen. Wir bitten Dich deshalb gegebenenfalls um Angaben, mit denen wir Deine Anfrage den gespeicherten Daten sicher zuordnen können. Daneben hast Du ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde (siehe Ziffer 19).

### 2.1 Widerspruchsrecht

Verarbeiten wir Deine Daten zur Wahrung berechtigter Interessen (Art. 6 Abs. 1 lit. f DS-GVO), kannst Du dieser Verarbeitung aus Gründen, die sich aus Deiner besonderen Situation ergeben, jederzeit widersprechen. Wir verarbeiten Deine Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Deine Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.

---

## 3. Zwecke und Rechtsgrundlagen der Datenverarbeitung

Wir verarbeiten personenbezogene Daten nur, soweit eine Rechtsgrundlage nach Art. 6 DS-GVO besteht:

- **Bereitstellung der App und der Website** einschließlich Informations- und Abstimmungsfunktionen auf Grundlage des Nutzungsvertrags (Art. 6 Abs. 1 lit. b DS-GVO; siehe [Nutzungsbedingungen](https://democracy-deutschland.de/nutzungsbedingungen/)).
- **Verifizierung per SMS**, damit jede Person nur einmal abstimmen kann und die Abstimmungsergebnisse aussagekräftig bleiben (Art. 6 Abs. 1 lit. b und f DS-GVO).
- **Abwicklung von Spenden** und Erfüllung steuer- und handelsrechtlicher Pflichten, z. B. Aufbewahrung nach § 147 AO (Art. 6 Abs. 1 lit. b und c DS-GVO).
- **Sicherheit und Stabilität** unserer Systeme, Abwehr von Angriffen und Missbrauch sowie Fehleranalyse (Art. 6 Abs. 1 lit. f DS-GVO).
- **Einwilligungen**, etwa für den Newsletter oder für Systemberechtigungen Deines Geräts (Art. 6 Abs. 1 lit. a DS-GVO, § 25 Abs. 1 TDDDG). Vor einer Einwilligung informieren wir Dich über den Zweck und Dein Widerrufsrecht.

**Politische Meinungen (Art. 9 DS-GVO):** Deine Abstimmungsentscheidung („stimme zu", „enthalte mich", „lehne ab") kann eine politische Meinung erkennen lassen und gehört damit zu den besonderen Kategorien personenbezogener Daten. Wir sind technisch so aufgebaut, dass wir Deine Entscheidung serverseitig nicht Dir zugeordnet speichern (siehe Ziffer 8.3). Soweit sie bei der Stimmabgabe kurzzeitig verarbeitet wird, geschieht das, weil Du die Abstimmung ausdrücklich selbst auslöst (Art. 9 Abs. 2 lit. a DS-GVO). **[PRÜFEN: Rechtsgrundlage nach Art. 9 Abs. 2 DS-GVO und Form der ausdrücklichen Einwilligung durch Rechtsberatung bestätigen lassen.]**

---

## 4. Weitergabe an Dritte

Wir geben Deine Daten nur weiter, wenn es gesetzlich erlaubt ist, Du eingewilligt hast oder wir rechtlich dazu verpflichtet sind (z. B. gegenüber Behörden). Wir verkaufen keine Daten und nutzen sie nicht für Werbung.

### 4.1 Empfänger der Daten / Kategorien von Empfängern

Innerhalb des Vereins erhalten nur die Personen Zugriff auf Deine Daten, die ihn für Betrieb, Support oder die Erfüllung gesetzlicher Pflichten benötigen.

Für den Betrieb setzen wir Dienstleister ein – insbesondere für Hosting, SMS-Versand, E-Mail-Versand und Zahlungsabwicklung (siehe Ziffer 16). Soweit sie Daten in unserem Auftrag verarbeiten, haben wir mit ihnen Verträge zur Auftragsverarbeitung nach Art. 28 DS-GVO geschlossen. **[OFFEN: Abschluss der Auftragsverarbeitungsverträge (DigitalOcean, SMS-Anbieter, E-Mail-Anbieter, Website-Hosting) bestätigen.]** Einige Anbieter – z. B. Stripe, PayPal, Apple und Google – handeln teilweise als eigene Verantwortliche; darauf weisen wir jeweils hin.

### 4.2 Drittlandübermittlung

Eine Übermittlung in Staaten außerhalb der Europäischen Union bzw. des Europäischen Wirtschaftsraums findet nur statt, soweit dies für die jeweilige Leistung erforderlich ist, gesetzlich vorgeschrieben ist oder Du eingewilligt hast.

Einige unserer Dienstleister haben ihren Sitz in den USA oder können Daten dort verarbeiten (insbesondere DigitalOcean, Stripe, Apple, Google, GitHub und – für die Spenden über DonorBox – Rebel Idealist Inc.). Das europäische Datenschutzniveau wird durch einen Angemessenheitsbeschluss der EU-Kommission für nach dem **EU-US Data Privacy Framework** zertifizierte Unternehmen (Art. 45 DS-GVO) bzw. durch **EU-Standardvertragsklauseln** (Art. 46 DS-GVO) abgesichert. Bei einer Verarbeitung in den USA besteht dennoch das Risiko, dass US-Behörden auf Daten zugreifen, ohne dass Dir dagegen wirksame Rechtsbehelfe zustehen.

---

## 5. Speicherdauer der Daten

Wir speichern Deine Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Im Einzelnen:

- **Gerätekennung, verifizierte Telefonnummer (als Hashwert) und Nutzerkonto:** bis Du die Löschung verlangst (siehe Ziffer 10). **[OFFEN: Automatische Löschung inaktiver Konten festlegen, z. B. nach 24 Monaten ohne Nutzung.]**
- **Verifizierungsvorgänge** (SMS-Code, Zeitpunkte): **[OFFEN: Derzeit ohne automatische Löschung. Empfehlung: Löschung spätestens 30 Tage nach Abschluss bzw. Ablauf des Codes – vor Veröffentlichung technisch umsetzen.]**
- **Abstimmungsergebnisse:** dauerhaft, aber nur als anonyme Summen je Vorgang und Wahlkreis. Der Vermerk, _dass_ Du an einer Abstimmung teilgenommen hast, wird mit Deinem Konto gelöscht.
- **Server-Protokolle mit IP-Adresse:** **[OFFEN: Aufbewahrungsdauer der Ingress-/Server-Logs bei DigitalOcean und des Website-Hostings angeben, Empfehlung höchstens 14 Tage.]**
- **Fehlerprotokolle des Servers** (ohne Telefonnummern, Stimmen oder Spenderdaten): **[OFFEN: Löschfrist festlegen; derzeit ohne automatische Löschung.]**
- **Spenden:** Zahlungs- und Buchungsdaten bewahren wir gemäß den steuer- und handelsrechtlichen Fristen auf (je nach Unterlage 6, 8 oder 10 Jahre nach § 147 AO und § 257 HGB). Die Zuordnung zwischen Deinem Gerät und einer Dauerspende löschen wir automatisch 90 Tage nach deren Ende, technische Webhook-Protokolle nach 30 Tagen.
- **Newsletter:** bis zur Abmeldung.
- **E-Mail-Anfragen:** bis zur abschließenden Bearbeitung, danach im Rahmen gesetzlicher Aufbewahrungspflichten.

Darüber hinaus können wir Daten aufbewahren, wenn es zu rechtlichen Auseinandersetzungen kommt und wir sie als Beweismittel innerhalb der gesetzlichen Verjährungsfristen benötigen; die regelmäßige Verjährungsfrist beträgt drei Jahre.

---

## 6. Sichere Übertragung Deiner Daten

Wir setzen technische und organisatorische Maßnahmen ein, um Deine Daten gegen Manipulation, Verlust, Zerstörung und unbefugten Zugriff zu schützen, und passen sie an den Stand der Technik an.

Die Kommunikation zwischen App bzw. Browser und unseren Servern erfolgt ausschließlich verschlüsselt über HTTPS (TLS). Telefonnummer und Gerätekennung speichern wir nur als Hashwerte; Zugangs-Token und Deine lokalen Abstimmungsquittungen liegen auf Deinem Gerät (teilweise im geschützten Schlüsselbund, iOS Keychain bzw. Android Keystore).

---

## 7. Verpflichtung zur Bereitstellung der Daten

Die Informationsfunktionen der App und die Website kannst Du ohne Angabe von Kontaktdaten nutzen. Um selbst abzustimmen, musst Du Dich mit einer deutschen Mobilfunknummer verifizieren; ohne diese Angabe ist die Abstimmungsfunktion nicht nutzbar. Für eine monatliche Spende benötigen wir Deine E-Mail-Adresse; Einzelspenden sind auch ohne E-Mail möglich. Darüber hinaus bist Du nicht verpflichtet, uns Daten bereitzustellen.

---

## 8. Kategorien, Quellen und Herkunft der Daten

Welche Daten wir verarbeiten, hängt davon ab, ob Du nur unsere Website besuchst, die App ohne Verifizierung nutzt, Dich verifizierst und abstimmst oder spendest. Wir erheben die Daten grundsätzlich direkt bei Dir bzw. von Deinem Gerät.

### 8.1 Bei der Nutzung der App

Beim Start der App und bei jeder Anfrage an unseren Server verarbeiten wir:

- eine **Gerätekennung**: Die App bildet aus der Geräte-ID Deines Smartphones einen nicht umkehrbaren Hashwert (SHA-256); nur dieser wird übertragen und bei uns ein weiteres Mal gehasht gespeichert
- App-Version und Plattform (iOS/Android)
- die **IP-Adresse** Deines Geräts und den Zeitpunkt der Anfrage (technisch notwendig, in Server-Protokollen)
- von Dir gewählte Einstellungen, z. B. Benachrichtigungswünsche
- **Suchbegriffe**, die Du in der App eingibst – gespeichert nur als Begriff mit Zeitpunkt, ohne Bezug zu Deinem Gerät oder Konto

Beim ersten Kontakt legen wir auf Basis der Gerätekennung ein Nutzerkonto an, damit die App Dich wiedererkennt (Zugangs-Token auf Deinem Gerät). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DS-GVO, für die Server-Protokolle Art. 6 Abs. 1 lit. f DS-GVO (Betriebssicherheit).

Bilder von Abgeordneten und Bundestagsdokumente (PDF) lädt die App direkt von Servern des Deutschen Bundestages; dabei wird Deine IP-Adresse an den Bundestag übermittelt (siehe Ziffer 16.9).

### 8.2 Bei der Verifizierung

Zur Verifizierung gibst Du Deine Mobilfunknummer ein. Wir verarbeiten:

- die **Telefonnummer**: Sie wird zusammen mit dem Bestätigungscode an unseren SMS-Dienstleister übermittelt (siehe Ziffer 16.3) und bei uns nur als Hashwert gespeichert
- den **Bestätigungscode** und die Zeitpunkte des Verifizierungsvorgangs
- die Verknüpfung zwischen Gerätekennung und Telefonnummer (Hashwerte), damit jede Telefonnummer nur einmal abstimmen kann

Bitte beachte: Weil es nur begrenzt viele Telefonnummern gibt, lässt sich ein Hashwert einer Telefonnummer mit erheblichem Rechenaufwand zurückrechnen. Wir behandeln ihn deshalb als **pseudonymisiertes** personenbezogenes Datum, nicht als anonym.

### 8.3 Bei Abstimmungen und im Wahl-O-Meter

Wenn Du abstimmst, trennen wir Deine Identität und Deine Entscheidung (Konzept „Urnenbuch"):

- Auf dem Server wird Deine Entscheidung nur zu den **Summen** des jeweiligen Vorgangs addiert – gesamt und, falls Du einen Wahlkreis gewählt hast, für diesen Wahlkreis. Welche Entscheidung von welchem Konto stammt, wird nicht gespeichert.
- Getrennt davon speichern wir den Vermerk, **dass** Dein Konto an diesem Vorgang teilgenommen hat, damit niemand mehrfach abstimmt.
- Eine **Quittung Deiner Entscheidung** speichern wir nur lokal auf Deinem Gerät. Das Wahl-O-Meter, das Dein Abstimmungsverhalten mit dem des Bundestages vergleicht, wertet ausschließlich diese lokalen Daten aus.

Beim Löschen der App oder beim Gerätewechsel gehen die lokalen Quittungen verloren; wir können sie nicht wiederherstellen. Wie die Trennung technisch umgesetzt ist, kannst Du im öffentlichen Quellcode nachvollziehen: [github.com/demokratie-live](https://github.com/demokratie-live).

Zur Weiterentwicklung der App werten wir nur anonyme, aggregierte Zahlen aus (z. B. Anzahl der Abstimmungen und Aktivität je Vorgang).

### 8.4 Beim Besuch unserer Website

Beim Aufruf von www.democracy-deutschland.de verarbeitet unser Hosting-Anbieter automatisch:

- IP-Adresse
- Datum und Uhrzeit des Zugriffs
- aufgerufene Seite bzw. Datei, HTTP-Statuscode und übertragene Datenmenge
- Referrer-URL
- Browsertyp und -version, Betriebssystem

Diese Daten dienen der Auslieferung der Website, der Sicherheit (insbesondere Abwehr von Angriffen) und der Fehleranalyse (Art. 6 Abs. 1 lit. f DS-GVO). Eine Zusammenführung mit anderen Datenquellen findet nicht statt. Auf der Website setzen wir **keine Analyse- oder Tracking-Werkzeuge** und keine Cookies ein (siehe Ziffer 15).

---

## 9. Kontaktaufnahme per E-Mail (Art. 6 Abs. 1 lit. a, b DS-GVO)

Wenn Du uns per E-Mail schreibst – auch über die Kontakt- und Mithelfen-Links unserer Website, die Dein E-Mail-Programm öffnen –, verarbeiten wir die mitgeteilten Daten nur zur Bearbeitung Deiner Anfrage und für Anschlussfragen. **[OFFEN: Falls auf der Website Formular-Endpunkte (\`NEXT_PUBLIC_*_ENDPOINT\`) aktiviert werden: Empfänger und Speicherort ergänzen.]**

---

## 10. Nutzerkonto, Verifizierung und Löschung (Art. 6 Abs. 1 lit. b DS-GVO)

Für die Nutzung der App brauchst Du weder Namen noch E-Mail-Adresse noch Passwort. Dein Nutzerkonto ist an Deine Gerätekennung und – nach der Verifizierung – an Deine Telefonnummer (als Hashwert) gebunden. Die App erhält ein Zugangs-Token (gültig einen Tag, erneuerbar für sieben Tage), das auf Deinem Gerät gespeichert wird.

**Löschung:** Eine Löschfunktion in der App gibt es derzeit nicht. Schreib uns an [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de) mit dem Betreff „Konto löschen" und der Telefonnummer, mit der Du Dich verifiziert hast. Wir löschen dann Konto, Gerätekennung, Telefonnummer (Hashwert), Verifizierungsdaten und Teilnahmevermerke. Die anonymen Abstimmungssummen bleiben bestehen, da sie Dir nicht zugeordnet werden können. Daten, die wir aus gesetzlichen Gründen aufbewahren müssen (z. B. zu Spenden), sperren wir bis zum Fristablauf. **[OFFEN: Löschfunktion in der App oder dokumentierter interner Löschprozess.]**

---

## 11. Spenden und Bezahlsysteme (Art. 6 Abs. 1 lit. b, c DS-GVO)

Du kannst DEMOCRACY freiwillig mit einer Spende unterstützen. Spenden sind technisch und organisatorisch **vollständig von Deinem Nutzerkonto und Deinen Abstimmungen getrennt**: Anfragen zu Spenden senden keine Gerätekennung, keine Telefonnummer und kein Zugangs-Token, und wir speichern zu Spendenanfragen keine IP-Adressen.

### 11.1 Spenden in der App

Spenden in der App wickeln wir über **Stripe** ab (Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Dublin 2, Irland). Je nach Deiner Auswahl kommen Kreditkarte, SEPA-Lastschrift, Apple Pay, Google Pay oder PayPal zum Einsatz. Das Zahlungsfenster stammt von Stripe; Kartendaten und Bankverbindung gibst Du direkt bei Stripe ein, sie gelangen nicht auf unsere Server.

Wir bzw. Stripe verarbeiten dabei: Betrag, Rhythmus (einmalig/monatlich), ob Du die Zahlungsgebühr übernimmst, App-Plattform und -Version, Zahlungsdaten (z. B. Kartentyp und letzte vier Ziffern, bei SEPA Name, IBAN und Mandat), bei einer Dauerspende und wenn Du sie angibst Deine **E-Mail-Adresse** sowie die Transaktionshistorie. Stripe verarbeitet zur Betrugsprävention zusätzlich Geräte- und Verbindungsdaten (Stripe Radar) und handelt dabei als eigener Verantwortlicher.

**Dauerspenden:** Für die Verwaltung einer monatlichen Spende erzeugt die App einen zufälligen **Spender-Schlüssel**, der nur auf Deinem Gerät im Schlüsselbund liegt. Wir speichern lediglich einen Hashwert dieses Schlüssels und die Zuordnung zu Deiner Dauerspende bei Stripe – ohne Bezug zu Deinem DEMOCRACY-Konto. Diese Zuordnung löschen wir automatisch 90 Tage nach Ende der Dauerspende. Auf anderen Geräten verwaltest Du Deine Dauerspende über das Kundenportal von Stripe (Anmeldung per E-Mail-Link).

**Bestätigungen per E-Mail:** Hast Du eine E-Mail-Adresse angegeben, senden wir Dir eine Spendenbestätigung sowie bei Dauerspenden Bestätigungen zu jeder Abbuchung und zur Kündigung (siehe Ziffer 16.5). Eine formale Zuwendungsbestätigung erstellen wir auf Anfrage; dafür benötigen wir Deinen Namen und Deine Anschrift.

### 11.2 Spenden über die Website und per Überweisung

Auf unserer Website verlinken wir auf **DonorBox** (Rebel Idealist Inc., d/b/a Donorbox, 1520 Belle View Blvd #4106, Alexandria, VA 22307, USA) und auf einen **PayPal**-Spendenbutton (PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxemburg). Beide verarbeiten die dort eingegebenen Daten in eigener Verantwortung; DonorBox nutzt für die Zahlung ebenfalls Stripe. Es gelten die Datenschutzbestimmungen von [Donorbox](https://donorbox.org/privacy) bzw. [PayPal](https://www.paypal.com/de/legalhub/privacy-full).

Bei einer **Überweisung oder einem Dauerauftrag** erhalten wir von unserer Bank Deinen Namen, Deine IBAN, den Betrag und den Verwendungszweck.

Zahlungsdaten sind nach dem US-EU Data Privacy Framework (Stripe, PayPal) bzw. durch Standardvertragsklauseln abgesichert, wenn sie in den USA verarbeitet werden. Weitere Informationen: [stripe.com/de/privacy](https://stripe.com/de/privacy).

---

## 12. Newsletter (Art. 6 Abs. 1 lit. a DS-GVO)

Über unsere Website kannst Du einen kostenlosen Newsletter abonnieren. Dafür verarbeiten wir Deine E-Mail-Adresse sowie die Zeitpunkte von Anmeldung und Bestätigung. Den Newsletter versenden wir mit der Open-Source-Software **listmonk**, die wir selbst auf unserer Infrastruktur bei DigitalOcean betreiben (siehe Ziffer 16.1). **[OFFEN: Double-Opt-in aktiv? SMTP-Anbieter für den Versand?]**

Du kannst den Newsletter jederzeit über den Abmeldelink in jeder E-Mail abbestellen und damit Deine Einwilligung widerrufen.

---

## 13. Push-Benachrichtigungen

Derzeit versenden wir **keine Push-Benachrichtigungen**, und die App überträgt keine Push-Token an unsere Server. Falls Du in den Einstellungen Benachrichtigungen erlaubst, betrifft das nur die Berechtigung auf Deinem Gerät. Sollten wir Push-Benachrichtigungen wieder einführen, informieren wir Dich vorher und holen Deine Einwilligung ein.

---

## 14. Automatisierte Einzelfallentscheidungen

Wir treffen keine Entscheidungen, die ausschließlich auf einer automatisierten Verarbeitung beruhen und Dir gegenüber rechtliche Wirkung entfalten (Art. 22 DS-GVO). Technische Schutzmaßnahmen wie Begrenzungen der Anzahl von Anfragen (z. B. beim SMS-Versand oder bei Zahlungsversuchen) sind vorübergehend und fallen nicht darunter.

---

## 15. Cookies und andere Technologien (Art. 6 Abs. 1 lit. b, f DS-GVO, § 25 TDDDG)

**Website:** Wir setzen keine Cookies, keine Analyse- oder Tracking-Werkzeuge und keine Schriftarten von Drittanbietern ein. Videos (YouTube) und das Discord-Widget werden erst geladen, wenn Du sie anklickst (siehe Ziffer 16.10 und 16.11).

**App:** Die App speichert auf Deinem Gerät nur, was für ihre Funktion unbedingt erforderlich ist (§ 25 Abs. 2 Nr. 2 TDDDG): Zugangs-Token, den Hashwert Deiner Telefonnummer, Einstellungen (z. B. gewählter Wahlkreis), Deine lokalen Abstimmungsquittungen und – bei einer Dauerspende – den Spender-Schlüssel. Für die Gerätekennung greift die App auf die Geräte-ID Deines Smartphones zu und überträgt nur deren Hashwert. Dies ist **keine Werbe-ID**; ein geräte- oder app-übergreifendes Tracking findet nicht statt.

In der App setzen wir **keine** Analyse-, Tracking- oder Absturzberichts-SDKs ein. Absturz- und Diagnosedaten entstehen gegebenenfalls nur plattformseitig bei Apple bzw. Google (siehe Ziffer 16.12). Während einer Spende verarbeitet das Stripe-SDK Geräte- und Verbindungsdaten zur Betrugsprävention (siehe Ziffer 11.1).

---

## 16. Eingesetzte Dienstleister und Drittanbieter

### 16.1 DigitalOcean (Hosting der App-Infrastruktur)

Server, Datenbank und Schnittstellen der App sowie der Newsletter-Dienst laufen in einem Kubernetes-Cluster der **DigitalOcean, LLC** (USA) im Rechenzentrum Frankfurt am Main. **[OFFEN: Region FRA1 und Anschrift laut Auftragsverarbeitungsvertrag bestätigen.]**

Verarbeitet werden alle in Ziffer 8.1–8.3, 11.1 und 12 genannten serverseitigen Daten sowie Server-Protokolle mit IP-Adressen. DigitalOcean ist nach dem EU-US Data Privacy Framework zertifiziert und verwendet zusätzlich Standardvertragsklauseln. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DS-GVO. Weitere Informationen: [digitalocean.com/legal/privacy-policy](https://www.digitalocean.com/legal/privacy-policy).

### 16.2 Hosting der Website

Unsere Website wird auf einem Server bei der **IONOS SE**, Elgendorfer Str. 57, 56410 Montabaur, bereitgestellt. Dabei werden die in Ziffer 8.4 genannten Daten verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DS-GVO. **[OFFEN: Wer betreibt den Server (eigener Vertrag mit IONOS oder Dienstleister, z. B. Atmanspacher)? Anbieter und Auftragsverarbeitungsvertrag bestätigen; ebenso Mail-Hosting für @democracy-deutschland.de.]**

### 16.3 SMS-Versand zur Verifizierung

Für den Versand der Bestätigungscodes nutzen wir den Dienst **SMSflatrate** (smsflatrate.net, Kloppe Media, Ansbacher Str. 85, 91541 Rothenburg ob der Tauber). Übermittelt werden Deine Mobilfunknummer und der Bestätigungscode. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DS-GVO. **[OFFEN: Ist SMSflatrate noch aktueller Anbieter? Anschrift, Auftragsverarbeitungsvertrag und Speicherdauer beim Anbieter bestätigen.]**

### 16.4 Stripe (Zahlungsabwicklung)

Spenden in der App wickelt die **Stripe Payments Europe, Ltd.**, 1 Grand Canal Street Lower, Dublin 2, Irland, ab – einschließlich Kundenportal für Dauerspenden und Betrugsprävention (Stripe Radar). Die verarbeiteten Daten sind in Ziffer 11.1 beschrieben. Die Verarbeitung erfolgt teilweise in den USA; Stripe ist nach dem EU-US Data Privacy Framework zertifiziert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DS-GVO. Wählst Du PayPal, Apple Pay oder Google Pay, verarbeiten auch PayPal, Apple bzw. Google Daten in eigener Verantwortung. Weitere Informationen: [stripe.com/de/privacy](https://stripe.com/de/privacy).

### 16.5 E-Mail-Versand der Spendenbestätigungen

Spendenbestätigungen versenden wir über das Postfach spenden@democracy-deutschland.de. Verarbeitet werden Deine E-Mail-Adresse und der Inhalt der Bestätigung (Betrag, Datum, Zahlungsart). Die E-Mails enthalten keine Tracking-Pixel. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und c DS-GVO. **[OFFEN: E-Mail-Anbieter (SMTP) benennen.]**

### 16.6 DonorBox und PayPal (Spenden über die Website)

Siehe Ziffer 11.2.

### 16.7 GitHub

Unser Quellcode ist auf **GitHub** (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA) öffentlich. Lädst Du die Android-App als APK-Datei über GitHub herunter, verarbeitet GitHub dabei Deine IP-Adresse in eigener Verantwortung. Weitere Informationen: [docs.github.com/de/site-policy/privacy-policies](https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement).

### 16.8 KI-gestützte Auswertung von Parlamentsdokumenten

Ergebnisse nicht-namentlicher Abstimmungen werten wir teilweise KI-gestützt aus öffentlichen Plenarprotokollen des Bundestages aus; dafür nutzen wir die Claude API der Anthropic, PBC (USA). Dabei werden **ausschließlich öffentliche Bundestagsdokumente** verarbeitet, keine Daten unserer Nutzer:innen.

### 16.9 Deutscher Bundestag

Abgeordnetenfotos und Dokumente (PDF) lädt die App direkt von www.bundestag.de bzw. dserver.bundestag.de. Dabei erhält der **Deutsche Bundestag** (Platz der Republik 1, 11011 Berlin) Deine IP-Adresse. Weitere Informationen: [bundestag.de/datenschutz](https://www.bundestag.de/datenschutz).

### 16.10 YouTube

Auf unserer Website binden wir Videos von **YouTube** (Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland) im erweiterten Datenschutzmodus (youtube-nocookie.com) ein. Das Video wird erst geladen, wenn Du darauf klickst; vorher zeigen wir nur ein lokal gespeichertes Vorschaubild. Mit dem Klick willigst Du ein, dass Google Daten (u. a. Deine IP-Adresse) verarbeitet, gegebenenfalls auch in den USA (Art. 6 Abs. 1 lit. a DS-GVO, § 25 Abs. 1 TDDDG). Weitere Informationen: [policies.google.com/privacy](https://policies.google.com/privacy).

### 16.11 Discord

Auf unserer Website kannst Du per Klick ein Widget unserer **Discord**-Community laden (Discord Netherlands BV, Schiphol Boulevard 195, 1118 BG Schiphol, Niederlande). Erst nach dem Klick werden Daten (u. a. Deine IP-Adresse) an Discord übertragen, gegebenenfalls auch in die USA (Art. 6 Abs. 1 lit. a DS-GVO). **[OFFEN: Vertragspartner von Discord für EU-Nutzer:innen bestätigen.]** Weitere Informationen: [discord.com/privacy](https://discord.com/privacy).

### 16.12 App-Stores (Apple App Store, Google Play)

Bezug und Aktualisierung der App erfolgen über den Apple App Store bzw. Google Play. Die Betreiber – Apple Distribution International Ltd., Hollyhill Industrial Estate, Hollyhill, Cork, Irland, bzw. Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland – verarbeiten dabei in eigener Verantwortung Daten (z. B. Download- und Nutzungsstatistiken sowie plattformseitige Absturz- und Diagnoseberichte). Darauf haben wir keinen Einfluss; es gelten die Datenschutzbestimmungen von [Apple](https://www.apple.com/legal/privacy/) bzw. [Google](https://policies.google.com/privacy).

**[OFFEN: Apollo GraphOS – wird \`ENGINE_API_KEY\` in Produktion genutzt? Falls ja, Abschnitt zu Apollo Graph Inc. (USA, Leistungsmetriken ohne Nutzerdaten) ergänzen.]**

---

## 17. Kinder und Jugendliche

Die Informationsfunktionen der App stehen allen offen. Personen unter 16 Jahren sollen sich nur mit Zustimmung ihrer Erziehungsberechtigten verifizieren, abstimmen oder spenden. Wir bitten Eltern und Erziehungsberechtigte, die Online-Aktivitäten ihrer Kinder zu begleiten. **[PRÜFEN: Abgleich mit dem Mindestalter in den Nutzungsbedingungen (bisher 7 Jahre).]**

---

## 18. Links zu anderen Anbietern

App und Website enthalten Links zu anderen Angeboten, insbesondere des Deutschen Bundestages. Auf deren Inhalte und Datenverarbeitung haben wir keinen Einfluss; verantwortlich ist der jeweilige Anbieter. Bei Bekanntwerden von Rechtsverletzungen entfernen wir solche Links umgehend.

---

## 19. Beschwerderecht

Du hast das Recht, Dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns zuständig ist:

**Die Landesbeauftragte für den Datenschutz Niedersachsen**  
Prinzenstraße 5, 30159 Hannover  
[poststelle@lfd.niedersachsen.de](mailto:poststelle@lfd.niedersachsen.de)

Du kannst Dich auch an die Aufsichtsbehörde Deines gewöhnlichen Aufenthaltsorts oder Arbeitsplatzes wenden.

---

## 20. Änderungen dieser Datenschutzerklärung

Wir passen diese Datenschutzerklärung an, wenn sich unsere Dienste oder die Rechtslage ändern. Über wesentliche Änderungen informieren wir Dich in der App bzw. auf der Website. Die jeweils aktuelle Fassung findest Du unter [democracy-deutschland.de/datenschutz](https://democracy-deutschland.de/datenschutz/) und in der App unter „Über DEMOCRACY". Das Datum der letzten Änderung steht oben.`,
  },
  {
    title: "Nutzungsbedingungen",
    text: `_Stand: November 2026_

---

> **Hinweis:**
> DEMOCRACY bildet Vorgänge und Abstimmungen des Deutschen Bundestages auf Grundlage öffentlicher Parlamentsinformationen ab und ermöglicht Dir, selbst darüber abzustimmen. Abstimmungen in der App sind **keine amtlichen Wahlen oder Abstimmungen** und rechtlich unverbindlich. Die Ergebnisse der DEMOCRACY-Community sind nicht repräsentativ für die Bevölkerung.
>
> Wir bereiten die Parlamentsinformationen sorgfältig auf, können aber Fehler und Verzögerungen nicht ausschließen – insbesondere bei automatisiert oder KI-gestützt ausgewerteten Daten (siehe Ziffer 2.3). Maßgeblich sind stets die amtlichen Dokumente des Deutschen Bundestages. Wenn Dir ein Fehler auffällt, freuen wir uns über eine [Rückmeldung](mailto:contact@democracy-deutschland.de).

---

## 1. Geltungsbereich und Vertragspartner

Diese Nutzungsbedingungen regeln die Nutzung der App **DEMOCRACY** (nachfolgend „App") und der damit verbundenen Dienste. Sie bilden die Grundlage des Nutzungsverhältnisses zwischen Dir und:

**DEMOCRACY Deutschland e.V.**  
Am Klausberge 12  
37075 Göttingen

Vertreten durch den Vorstand: Marius Krüger, Andreas Krüger  
Vereinsregister: Amtsgericht Göttingen, VR 201924  
E-Mail: [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de)

Die Verarbeitung Deiner Daten regelt unsere [Datenschutzerklärung](https://democracy-deutschland.de/datenschutz/).

Die App wird über den Apple App Store und Google Play vertrieben. Für Bezug und Nutzung gelten zusätzlich die Bedingungen des jeweiligen Store-Betreibers, insbesondere die Standard-Lizenzvereinbarung von Apple für lizenzierte Anwendungen (Licensed Application End User License Agreement) bzw. die Google-Play-Nutzungsbedingungen. Bei Widersprüchen gehen zwingende Vorgaben des jeweiligen Stores diesen Nutzungsbedingungen vor.

Abweichende Bedingungen der Nutzer:innen gelten nicht, es sei denn, wir stimmen ihnen ausdrücklich zu.

---

## 2. Leistungsbeschreibung

### 2.1 Funktionen

Die App bietet:

- **Informieren:** vergangene, aktuelle und kommende Vorgänge, Anträge und Gesetzgebungsverfahren des Deutschen Bundestages mit den zugehörigen Dokumenten und den offiziellen Abstimmungsergebnissen, Informationen zu Abgeordneten und Wahlkreisen
- **Abstimmen:** Verifizierte Nutzer:innen können als „virtuelle Abgeordnete" selbst über Vorgänge abstimmen – mit „stimme zu", „enthalte mich" oder „lehne ab". Die App zeigt die Ergebnisse der Community insgesamt und, falls Du einen Wahlkreis wählst, für Deinen Wahlkreis.
- **Wahl-O-Meter:** ein Vergleich Deines Abstimmungsverhaltens mit dem der Fraktionen und Abgeordneten des Bundestages, ausschließlich auf Deinem Gerät berechnet
- **Spenden:** die Möglichkeit, den Verein freiwillig zu unterstützen (siehe Ziffer 5)

### 2.2 Datenquellen

Die Inhalte stammen aus öffentlichen Quellen, insbesondere dem Dokumentations- und Informationssystem für Parlamentsmaterialien (DIP) und der Website des Deutschen Bundestages. Wir übernehmen sie automatisiert und bereiten sie redaktionell auf.

### 2.3 KI-gestützte Auswertung

Ergebnisse nicht-namentlicher Abstimmungen (z. B. per Handzeichen) veröffentlicht der Bundestag nur im Fließtext der Plenarprotokolle. Wir werten diese Protokolle teilweise KI-gestützt aus. Solche automatisiert ermittelten Ergebnisse können Fehler oder Fehlinterpretationen enthalten; maßgeblich ist das amtliche Plenarprotokoll.

### 2.4 Unentgeltlichkeit

Die Nutzung der App ist kostenlos und werbefrei. Ein Anspruch auf bestimmte Funktionen oder Inhalte besteht nicht; wir entwickeln die App laufend weiter und können Funktionen ändern, ergänzen oder einstellen.

---

## 3. Nutzerkonto und Verifizierung

### 3.1 Voraussetzungen

Die Informationsfunktionen stehen allen offen. Zum Abstimmen musst Du Dich verifizieren. Personen unter 16 Jahren benötigen dafür die Zustimmung ihrer Erziehungsberechtigten. **[PRÜFEN: Mindestalter – bisher „7. Lebensjahr vollendet"; mit Ziffer 17 der Datenschutzerklärung abstimmen.]**

### 3.2 Nutzerkonto

Beim ersten Start legt die App auf Basis einer verschlüsselten (gehashten) Gerätekennung ein Nutzerkonto an. Name, E-Mail-Adresse oder Passwort brauchst Du nicht.

### 3.3 Verifizierung per SMS

Für die Verifizierung gibst Du eine deutsche Mobilfunknummer an, an die wir einen Bestätigungscode per SMS senden. Damit stellen wir sicher, dass jede Person nur einmal abstimmt. Mit der erfolgreichen Verifizierung kommt der Nutzungsvertrag über die Abstimmungsfunktion zustande.

Wir können die Identität verifizierter Nutzer:innen nicht überprüfen und übernehmen keine Gewähr dafür, dass hinter jeder Telefonnummer eine andere Person steht.

### 3.4 Kontosicherheit

Dein Konto ist an Dein Gerät und Deine Telefonnummer gebunden. Informiere uns unverzüglich unter [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de), wenn Du einen Missbrauch vermutest. Bei einem Gerätewechsel oder einer Neuinstallation gehen Deine lokal gespeicherten Abstimmungsquittungen und Wahl-O-Meter-Daten verloren.

---

## 4. Abstimmungsgeheimnis

Deine Abstimmungsentscheidung speichern wir serverseitig nicht so, dass sie Dir zugeordnet werden kann: Wir addieren sie nur zu den Summen des Vorgangs und vermerken getrennt davon, dass Dein Konto teilgenommen hat. Eine Quittung bleibt ausschließlich auf Deinem Gerät. Einzelheiten beschreibt unsere [Datenschutzerklärung](https://democracy-deutschland.de/datenschutz/).

---

## 5. Spenden

### 5.1 Freiwilligkeit

Spenden sind freiwillig und ohne Gegenleistung; sie sind kein Mitgliedsbeitrag und kein Entgelt für die Nutzung der App. Die App bleibt auch ohne Spende vollständig nutzbar.

### 5.2 Zahlungsabwicklung

Spenden in der App wickelt der Zahlungsdienstleister **Stripe** ab (Stripe Payments Europe, Ltd., Dublin, Irland), je nach Auswahl per Kreditkarte, SEPA-Lastschrift, Apple Pay, Google Pay oder PayPal. Es gelten ergänzend die Bedingungen des jeweiligen Zahlungsanbieters. Spenden in der App sind keine In-App-Käufe über Apple oder Google.

Die Zahlungsgebühr kannst Du freiwillig übernehmen; der Aufschlag wird Dir vor der Zahlung angezeigt. Maßgeblich ist der im Zahlungsfenster angezeigte Betrag.

### 5.3 Dauerspende und Kündigung

Eine monatliche Spende wird jeden Monat am selben Tag wie die erste Abbuchung eingezogen. Du kannst sie jederzeit **mit Wirkung zum Ende des laufenden Monats** kündigen und ihren Betrag für künftige Abbuchungen ändern – in der App unter „Spenden → Dauerspende verwalten" oder auf jedem Gerät über den Link in Deiner Willkommens-E-Mail (Kundenportal von Stripe). Scheitern Abbuchungen wiederholt, beenden wir die Dauerspende und informieren Dich per E-Mail.

### 5.4 Rückerstattung

Eine Spende ist eine Schenkung; ein gesetzliches Widerrufsrecht besteht nicht. Hast Du versehentlich gespendet, melde Dich innerhalb von 14 Tagen unter [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de); wir erstatten den Betrag dann in der Regel. Eine bereits ausgestellte Zuwendungsbestätigung verliert damit ihre Gültigkeit. **[PRÜFEN: Kulanzregel und Frist mit dem Vorstand abstimmen.]**

### 5.5 Zuwendungsbestätigung

Der DEMOCRACY Deutschland e.V. ist als gemeinnützig anerkannt. Für Spenden bis 300 € genügt dem Finanzamt Dein Zahlungsnachweis zusammen mit unserer Bestätigungs-E-Mail und unserem vereinfachten Zuwendungsnachweis (§ 50 Abs. 4 EStDV). Eine formale Zuwendungs- oder Sammelbestätigung erstellen wir auf Anfrage; dafür benötigen wir Deinen vollständigen Namen und Deine Anschrift.

### 5.6 Kommunikation

Bestätigungen und Informationen zu Spenden erhältst Du per E-Mail, sofern Du eine E-Mail-Adresse angegeben hast.

---

## 6. Verbotene Handlungen

Du verpflichtest Dich, die App nur im Rahmen dieser Nutzungsbedingungen und des geltenden Rechts zu nutzen. Untersagt sind insbesondere:

- **Manipulation von Abstimmungen:** mehrfache Verifizierung, Nutzung fremder Telefonnummern, automatisierte oder gekaufte Stimmen
- **Angriffe und Überlastung:** Hacking-Versuche, Brute-Force-Angriffe, Denial-of-Service, Schadsoftware sowie Versuche, Sicherheitsmaßnahmen oder Begrenzungen zu umgehen
- **Automatisierte Massenabfragen** unserer Schnittstellen über das für die App übliche Maß hinaus ohne vorherige Absprache
- **Missbrauch der Spendenfunktion,** z. B. das Testen fremder oder gestohlener Zahlungsdaten

Bei Verstößen können wir Dich verwarnen, Dein Konto vorübergehend sperren oder Dich in schweren Fällen dauerhaft ausschließen.

---

## 7. Automatisierte Maßnahmen und Rechtsbehelfe

Zum Schutz der App und aller Nutzer:innen setzen wir automatisierte Schutzmaßnahmen ein:

- **Begrenzung von SMS-Codes:** Neue Bestätigungscodes können erst nach einer Wartezeit angefordert werden.
- **Begrenzung von Zahlungsversuchen:** Zu viele Spendenversuche in kurzer Zeit werden vorübergehend abgelehnt.
- **Sperrung:** Bei schwerwiegenden oder wiederholten Verstößen kann ein Konto manuell gesperrt werden.

Diese Maßnahmen sind vorübergehend und stellen keine automatisierten Einzelentscheidungen im Sinne von Art. 22 DS-GVO dar. Wenn Du meinst, dass eine Sperre irrtümlich erfolgt ist, wende Dich an [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de); wir prüfen den Fall.

---

## 8. Inhalte und Rechte

### 8.1 Parlamentsinformationen

Amtliche Dokumente des Bundestages sind gemeinfrei (§ 5 UrhG). Fotos von Abgeordneten und weitere Medien des Deutschen Bundestages unterliegen dessen Nutzungsbedingungen; die Rechte verbleiben bei den jeweiligen Inhaber:innen.

### 8.2 Open Source

DEMOCRACY ist ein Open-Source-Projekt. Der Quellcode ist auf [GitHub](https://github.com/demokratie-live) veröffentlicht; für ihn gelten die dort angegebenen Lizenzen (z. B. Apache License 2.0). **[PRÜFEN: Lizenz der App (democracy-client) – im Repository ist keine Lizenzdatei hinterlegt.]** Name, Logo und Marke „DEMOCRACY" sind von diesen Lizenzen nicht umfasst.

### 8.3 Ergebnisse der Community

Die aggregierten, anonymen Abstimmungsergebnisse der Community dürfen wir veröffentlichen und für die Arbeit des Vereins nutzen, z. B. in Auswertungen oder gegenüber Medien und Politik.

---

## 9. Haftung und Gewährleistung

### 9.1 Verfügbarkeit

Wir bemühen uns um eine durchgehende Verfügbarkeit und fehlerfreie Funktion. Ein Anspruch darauf besteht nicht: Die Verfügbarkeit kann durch äußere Einflüsse (z. B. Störungen von Netzen, Verfügbarkeit der Daten des Bundestages, Ausfälle von Dienstleistern) beeinträchtigt sein. Wartung, Fehlerbehebung und Weiterentwicklung können vorübergehende Einschränkungen erfordern.

### 9.2 Haftungsbeschränkung

Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit, für Schäden aus der Verletzung von Leben, Körper oder Gesundheit sowie nach dem Produkthaftungsgesetz. Bei leichter Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht), deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung Du regelmäßig vertrauen darfst; in diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Im Übrigen ist die Haftung ausgeschlossen. Da wir unsere Leistungen unentgeltlich erbringen, gelten ergänzend die gesetzlichen Haftungserleichterungen (§§ 521, 599 BGB entsprechend). **[PRÜFEN: Haftungsklausel juristisch prüfen lassen.]**

### 9.3 Richtigkeit der Inhalte

Für die Richtigkeit, Vollständigkeit und Aktualität der Parlamentsinformationen, insbesondere automatisiert oder KI-gestützt ermittelter Ergebnisse, übernehmen wir keine Gewähr (siehe Ziffer 2.3). Die App ersetzt keine amtlichen Dokumente.

### 9.4 Datenverlust

Wir haften nicht für den Verlust von Daten, die ausschließlich auf Deinem Gerät gespeichert sind (z. B. Abstimmungsquittungen, Wahl-O-Meter-Daten, Spender-Schlüssel), etwa nach einer Neuinstallation oder einem Gerätewechsel.

---

## 10. Laufzeit und Kündigung

### 10.1 Kündigung durch Dich

Das Nutzungsverhältnis läuft auf unbestimmte Zeit. Du kannst es jederzeit ohne Frist beenden, indem Du die App löschst und uns an [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de) mit dem Betreff „Konto löschen" bittest, Dein Konto zu löschen. Eine Dauerspende beendest Du gesondert (siehe Ziffer 5.3).

### 10.2 Kündigung durch uns

Wir können das Nutzungsverhältnis mit einer Frist von zwei Wochen kündigen. Das Recht zur außerordentlichen Kündigung bei schwerwiegenden Verstößen (siehe Ziffer 6) bleibt unberührt.

### 10.3 Folgen der Kündigung

Nach der Löschung Deines Kontos löschen wir Deine personenbezogenen Daten nach Maßgabe der [Datenschutzerklärung](https://democracy-deutschland.de/datenschutz/). Die anonymen Abstimmungssummen bleiben bestehen, weil sie Dir nicht zugeordnet werden können. Daten zu Spenden bewahren wir im Rahmen der gesetzlichen Fristen auf.

---

## 11. Änderungen der Nutzungsbedingungen

Wir können diese Nutzungsbedingungen für die Zukunft ändern, etwa wenn sich Funktionen der App oder die Rechtslage ändern. Über Änderungen informieren wir Dich mindestens **einen Monat** vor ihrem Inkrafttreten in der App. Widersprichst Du nicht bis zum Inkrafttreten, gelten die geänderten Bedingungen als angenommen; auf diese Folge, Dein Widerspruchsrecht und die Frist weisen wir Dich in der Mitteilung gesondert hin. Im Fall des Widerspruchs können beide Seiten das Nutzungsverhältnis beenden. Änderungen der Hauptleistungen bedürfen Deiner ausdrücklichen Zustimmung.

Die jeweils aktuelle Fassung findest Du unter [democracy-deutschland.de/nutzungsbedingungen](https://democracy-deutschland.de/nutzungsbedingungen/) und in der App unter „Über DEMOCRACY".

---

## 12. Anwendbares Recht und Gerichtsstand

Es gilt das Recht der **Bundesrepublik Deutschland** unter Ausschluss des UN-Kaufrechts. Bist Du Verbraucher:in, gilt diese Rechtswahl nur, soweit Dir dadurch nicht der Schutz zwingender Bestimmungen des Staates entzogen wird, in dem Du Deinen gewöhnlichen Aufenthalt hast.

Hast Du keinen allgemeinen Gerichtsstand in Deutschland oder einem anderen EU-Mitgliedstaat, ist Gerichtsstand für alle Streitigkeiten aus diesem Vertrag der Sitz des Vereins (**Göttingen**).

Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.

---

## 13. Salvatorische Klausel

Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung treten die gesetzlichen Vorschriften.

---

Fragen zu diesen Nutzungsbedingungen: [contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de)`,
  },
];
