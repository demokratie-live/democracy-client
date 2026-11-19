# Feature Specification: In-App-Spenden (einmalig & monatlich) für iOS und Android

**Feature Branch**: `feat/001-in-app-donations`

**Created**: 2026-11-19

**Status**: Draft

**Input**: User description: "Spendenformular in die iOS- und Android-App einbauen, analog zu Signal.
Wir sind als gemeinnützige Organisation verifiziert und haben bereits ein Stripe-Konto. Günstigster
Weg, architektonisch und finanziell (möglichst wenig Abgaben). Aktuell regeln wir es in der iOS-App
via DonorBox-Button. Das nervt. Wir wollen die Spenden und alles selbst verwalten."

## Ausgangslage

- **iOS**: Der Spenden-Bildschirm zeigt den Finanzierungsstand und einen Button, der ein externes
  DonorBox-Formular im Browser öffnet. DonorBox erhebt eine Plattformgebühr zusätzlich zu den
  Zahlungsgebühren; Spender:innen verlassen die App.
- **Android**: Der Spenden-Bildschirm zeigt Finanzierungsstand und Bankverbindung (IBAN/BIC) für
  Überweisung oder Dauerauftrag. Eine Online-Zahlung ist nicht möglich.
- Ziel des Vereins ist eine nachhaltige Crowd-Finanzierung über monatliche „Patenschaften".
  Stand 06/2026: 354 Pat:innen mit zusammen ca. 1.560 €/Monat (Ø ≈ 4,40 €), überwiegend per
  gebührenfreiem Dauerauftrag.

## Clarifications

### Session 2026-11-19

- Q: Ist der Verein bei Apple als „approved nonprofit" (App Review Guideline 3.2.1(vi))
  freigeschaltet? → A: Ja. iOS nimmt Spenden nativ in der App entgegen, Apple Pay wird angeboten.
- Q: Wie laufen monatliche Dauerspenden? → A: Über die Abo-Verwaltung des bestehenden
  Zahlungsdienstleisters (inkl. automatischer Wiederholungsversuche, Benachrichtigungen und
  gehosteter Verwaltungsseite); Mehrkosten von 0,7 % auf wiederkehrende Spenden werden zugunsten
  geringeren Entwicklungs- und Wartungsaufwands akzeptiert.
- Q: Welcher Mindestbetrag gilt? → A: 5 € (konfigurierbar), plus optionale Möglichkeit für
  Spender:innen, die Zahlungsgebühr zu übernehmen. Für kleinere Beträge verweist die App auf den
  gebührenfreien Dauerauftrag.
- Q: Wie weit wird die Belegerstellung automatisiert? → A: Jede erfolgreiche Spende erzeugt
  automatisch eine Bestätigung mit allen Angaben des vereinfachten Zuwendungsnachweises. Formale
  Zuwendungs- und Sammelbestätigungen erstellt der Verein weiterhin manuell auf Anfrage; die App
  erfasst keine Anschrift.
- Q: Soll PayPal in v1 angeboten werden, und wie? → A: Ja, als weitere Zahlungsart über den
  bestehenden Zahlungsdienstleister (keine eigene PayPal-Integration). Monatliche PayPal-Spenden
  werden freigeschaltet, sobald PayPal wiederkehrende Zahlungen genehmigt hat; bis dahin nur
  einmalig. Parallel klärt der Verein, ob der PayPal-Gemeinnützigkeitstarif auf diesem Weg gilt.

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Einmalige Spende direkt in der App (Priority: P1)

Eine Nutzer:in öffnet „Spenden", wählt einen vorgeschlagenen oder eigenen Betrag, wählt eine
Zahlungsart (Apple Pay bzw. Google Pay, Karte, SEPA-Lastschrift, PayPal), bestätigt und sieht einen
Danke-Bildschirm, ohne die App zu verlassen und ohne ein DEMOCRACY-Konto zu benötigen.

**Why this priority**: Kernnutzen des Features; ersetzt DonorBox und schließt die Lücke auf
Android. Allein lieferbar und sofort wertstiftend.

**Independent Test**: Im Testmodus eine Spende über 10 € per Wallet und per Karte durchführen;
die Zahlung erscheint als erfolgreich in der Spendenübersicht des Vereins, die App zeigt den
Danke-Bildschirm.

**Acceptance Scenarios**:

1. **Given** der Spenden-Bildschirm ist geöffnet, **When** die Nutzer:in „einmalig", 10 € und
   Apple Pay (iOS) bzw. Google Pay (Android) wählt und bestätigt, **Then** wird die Zahlung
   ausgeführt, der Danke-Bildschirm zeigt Betrag und Status „erfolgreich" und die Spende ist in der
   Spendenübersicht des Vereins erfasst.
2. **Given** der Zahlungsdialog ist geöffnet, **When** die Nutzer:in abbricht, **Then** erfolgt
   keine Belastung und die Nutzer:in kehrt mit dem gewählten Betrag zur Auswahl zurück.
3. **Given** die Karte wird abgelehnt oder erfordert eine Bankbestätigung (3-D Secure), **When**
   die Nutzer:in bezahlt, **Then** wird die Bestätigung innerhalb der App abgewickelt bzw. eine
   verständliche Fehlermeldung angezeigt, und ein erneuter Versuch führt nie zu einer
   Doppelbelastung.
4. **Given** die Nutzer:in wählt SEPA-Lastschrift, **When** sie IBAN und Mandat bestätigt,
   **Then** zeigt der Danke-Bildschirm den Status „wird eingezogen" mit dem Hinweis, dass die
   Abbuchung einige Werktage dauern kann.

---

### User Story 2 – Monatliche Dauerspende („Patenschaft") abschließen (Priority: P1)

Eine Nutzer:in wählt „monatlich", einen Betrag und eine Zahlungsart. Die erste Abbuchung erfolgt
sofort, danach monatlich automatisch, bis sie kündigt.

**Why this priority**: Wiederkehrende Spenden sind das erklärte Finanzierungsziel des Vereins
(„Pate/in ab … monatlich") und heute nur per manuellem Dauerauftrag möglich.

**Independent Test**: Im Testmodus eine Dauerspende über 5 € abschließen und mit simuliertem
Zeitfortschritt prüfen, dass die zweite Abbuchung einen Monat später automatisch erfolgt.

**Acceptance Scenarios**:

1. **Given** „monatlich" ist gewählt, **When** die Nutzer:in 5 € per Karte bestätigt, **Then** ist
   die Dauerspende aktiv, die erste Abbuchung erfolgt sofort und der Danke-Bildschirm nennt Betrag,
   Rhythmus und nächsten Abbuchungstermin.
2. **Given** eine aktive Dauerspende, **When** eine Folgeabbuchung fehlschlägt (z. B. Karte
   abgelaufen), **Then** wird die Abbuchung automatisch erneut versucht und die Spender:in per
   E-Mail mit einem Link zum Aktualisieren der Zahlungsart informiert; nach dem letzten
   erfolglosen Versuch endet die Dauerspende und die Spender:in wird darüber informiert.
3. **Given** die erste Zahlung einer neuen Dauerspende ist gescheitert (z. B. Karte abgelehnt),
   **When** die Spender:in es im selben Zahlungsdialog mit einer anderen Zahlungsart erneut
   versucht, **Then** entsteht genau eine aktive Dauerspende und es wird nur einmal abgebucht.

---

### User Story 3 – Dauerspende verwalten und kündigen (Priority: P2)

Eine Spender:in sieht in der App ihre aktive Dauerspende (Betrag, nächster Termin, Zahlungsart),
kann Betrag oder Zahlungsart ändern und jederzeit kündigen. Nach Gerätewechsel oder
Neuinstallation geht das über einen Link aus der Spendenbestätigungs-E-Mail.

**Why this priority**: Faire, einfache Kündigung ist Voraussetzung für Vertrauen (und
rechtlich/Store-seitig erwartet), aber erst relevant, sobald Dauerspenden existieren.

**Independent Test**: Dauerspende anlegen, in der App kündigen, prüfen dass keine weitere
Abbuchung erfolgt; separat: App löschen, über E-Mail-Link kündigen.

**Acceptance Scenarios**:

1. **Given** eine aktive Dauerspende auf diesem Gerät, **When** die Spender:in „Dauerspende
   verwalten" → „Kündigen" bestätigt, **Then** erfolgen keine weiteren Abbuchungen und die App
   sowie eine E-Mail bestätigen die Kündigung.
2. **Given** eine aktive Dauerspende, **When** die Spender:in den Betrag von 5 € auf 10 € ändert,
   **Then** gilt der neue Betrag ab der nächsten Abbuchung.
3. **Given** die App wurde neu installiert, **When** die Spender:in den Verwaltungslink aus der
   E-Mail öffnet und sich mit ihrer E-Mail-Adresse anmeldet (Einmal-Link per E-Mail), **Then**
   kann sie die Dauerspende einsehen, die Zahlungsart ändern und kündigen.

---

### User Story 4 – Spendenbestätigung und Zuwendungsnachweis (Priority: P2)

Nach jeder erfolgreichen Abbuchung erhält die Spender:in eine Bestätigung per E-Mail (Betrag,
Datum, Verein, Steuerhinweis). Für die Steuererklärung genügt bis zur gesetzlichen Grenze der
vereinfachte Zuwendungsnachweis; darüber hinaus kann eine Zuwendungsbestätigung angefordert
werden.

**Why this priority**: Steuerliche Absetzbarkeit ist ein wichtiges Spendenmotiv; die
Verwaltung „selbst übernehmen" schließt die Belegerstellung ein.

**Independent Test**: Testspende mit E-Mail-Adresse durchführen; Bestätigung enthält alle
Pflichtangaben und den Link zum vereinfachten Zuwendungsnachweis.

**Acceptance Scenarios**:

1. **Given** eine Spende mit angegebener E-Mail-Adresse, **When** die Zahlung erfolgreich ist,
   **Then** erhält die Spender:in innerhalb von 5 Minuten eine Bestätigung mit Betrag, Datum,
   Name des Vereins, Hinweis auf die Gemeinnützigkeit und Link zum vereinfachten
   Zuwendungsnachweis.
2. **Given** eine Spender:in benötigt eine formale Zuwendungsbestätigung (z. B. über 300 € oder
   als Jahres-Sammelbestätigung), **When** sie dem Hinweis in der Bestätigung folgt und den Verein
   per E-Mail mit Name und Anschrift kontaktiert, **Then** kann der Verein anhand der
   Spendenübersicht alle zugehörigen Zahlungen eindeutig finden und die Bestätigung manuell
   ausstellen.

---

### User Story 5 – Verein behält den Überblick (Priority: P3)

Vorstand bzw. Kassenwart sehen alle In-App-Spenden mit Datum, Betrag, Rhythmus, Zahlungsart,
angefallenen Gebühren und Status und können sie für die Buchhaltung exportieren.

**Why this priority**: Notwendig für Buchhaltung und Transparenz, kann aber anfangs über die
Bordmittel des Zahlungsdienstleisters erfüllt werden.

**Independent Test**: Nach mehreren Testspenden einen Export für einen Monat erzeugen und mit
den Einzelzahlungen abgleichen.

**Acceptance Scenarios**:

1. **Given** mehrere Spenden in einem Monat, **When** der Kassenwart einen Monatsexport erstellt,
   **Then** enthält er jede Zahlung mit Bruttobetrag, Gebühr, Nettobetrag, Rhythmus und Status.

---

### Edge Cases

- App wird während der Zahlung beendet oder verliert die Verbindung: Die Zahlung wird
  serverseitig korrekt abgeschlossen oder verworfen, nie doppelt. Bei Einmalspenden erfährt die
  Spender:in das Ergebnis über die Bestätigungs-E-Mail (die App merkt sich keine laufenden
  Einzelzahlungen); bei Dauerspenden zeigt die App beim nächsten Öffnen den aktuellen Status.
- Mehrfaches Tippen auf „Spenden": genau eine Zahlung.
- Erneuter Versuch nach gescheiterter Zahlung (andere Karte/Zahlungsart): möglich, ohne
  Doppelbuchung und ohne doppelte Dauerspende.
- Die erste Abbuchung einer Dauerspende wird noch eingezogen (z. B. SEPA, einige Werktage): Die
  Dauerspende ist bereits aktiv; die App zeigt zusätzlich „Deine erste Spende wird gerade
  eingezogen". Eine zweite Dauerspende ist nicht möglich (es gibt schon eine); eine Kündigung wirkt
  zum Periodenende, die erste Lastschrift läuft regulär durch.
- SEPA-Lastschrift wird nachträglich zurückgegeben (bis 8 Wochen, von der Spender:in
  veranlasst): Die Spende wird in der Spendenübersicht als zurückgebucht sichtbar und der Verein
  benachrichtigt; eine Dauerspende läuft weiter, bis sie gekündigt wird.
- Bei einer Einmalspende ohne E-Mail-Angabe in der App verlangt die gewählte Zahlungsart eine
  E-Mail-Adresse (z. B. SEPA): Die Bestätigung geht an diese Adresse.
- Betrag unter dem Mindestbetrag: Zahlung ist nicht möglich, die App verweist auf den
  gebührenfreien Dauerauftrag (FR-001a). Betrag über dem Höchstbetrag: Hinweis, größere Spenden
  per Überweisung zu senden.
- Gebührenübernahme bei Zahlungsart mit unbekanntem Kartentyp: Der Aufschlag wird auf Basis des
  Standardtarifs berechnet; Abweichungen (z. B. Premium-Karten) trägt der Verein.
- Wallet (Apple Pay/Google Pay) auf dem Gerät nicht eingerichtet: Die Wallet-Option wird nicht
  angeboten, Karte und SEPA bleiben verfügbar.
- Zahlungsdienst nicht erreichbar oder Spendenfunktion vom Verein deaktiviert: Die App zeigt
  stattdessen die Bankverbindung für Überweisungen.
- Dieselbe Person schließt auf zwei Geräten Dauerspenden ab: zwei unabhängige Dauerspenden,
  beide über E-Mail verwaltbar.
- Bestehende DonorBox-Dauerspenden: laufen unverändert weiter (siehe Annahmen).

## Requirements *(mandatory)*

### Functional Requirements

**Spendenformular**

- **FR-001**: Der Spenden-Bildschirm MUSS Betragsvorschläge und die Eingabe eines eigenen Betrags
  in Euro anbieten; Vorschläge, Mindest- und Höchstbetrag MÜSSEN ohne App-Update änderbar sein.
  Der Mindestbetrag ist initial 5 €.
- **FR-001a**: Bei Eingabe eines Betrags unter dem Mindestbetrag MUSS die App erklären, dass
  kleinere Beträge per gebührenfreiem Dauerauftrag/Überweisung möglich sind, und die
  Bankverbindung anzeigen.
- **FR-001b**: Spender:innen MÜSSEN optional wählen können, die voraussichtliche Zahlungsgebühr
  zusätzlich zu übernehmen. Die Option ist standardmäßig nicht gewählt und zeigt den
  Aufschlag in Euro vor dem Bezahlen an; der Aufschlag ist Teil der Spende.
- **FR-002**: Nutzer:innen MÜSSEN zwischen „einmalig" und „monatlich" wählen können.
- **FR-003**: Das System MUSS folgende Zahlungsarten anbieten: Apple Pay (iOS), Google Pay
  (Android), Kredit-/Debitkarte, SEPA-Lastschrift und PayPal, jeweils für einmalige und
  monatliche Spenden. Welche Zahlungsarten aktiv sind, MUSS der Verein ohne App-Update und ohne
  Deployment im Dashboard des Zahlungsdienstleisters steuern können.
- **FR-004**: Die Zahlung MUSS auf iOS und Android innerhalb der App abgeschlossen werden können,
  einschließlich Bankbestätigungen (3-D Secure) und SEPA-Mandat. Auf iOS MUSS Apple Pay angeboten
  werden (Voraussetzung der Apple-Freigabe als gemeinnützige Organisation).
- **FR-005**: Für eine Spende DARF KEIN DEMOCRACY-Konto und keine SMS-Verifizierung nötig sein.
- **FR-006**: Spenden DÜRFEN NICHT mit dem DEMOCRACY-Nutzerkonto, der Geräte-Kennung für
  Abstimmungen oder dem Abstimmungsverhalten verknüpft werden (Constitution, Prinzip I). Das gilt
  auch für Betriebsdaten: Protokolle des Vereins DÜRFEN Spendenvorgänge nicht mit IP-Adressen
  speichern, über die sie mit Abstimmungsanfragen korrelierbar wären.
- **FR-007**: Die E-Mail-Adresse MUSS für monatliche Spenden angegeben werden (Belege,
  Benachrichtigung bei Fehlschlägen, Verwaltungslink) und ist für einmalige Spenden optional.
- **FR-008**: Die App DARF Name und Anschrift nur erheben, wenn die gewählte Zahlungsart sie
  zwingend erfordert (z. B. Kontoinhaber:in bei SEPA-Lastschrift); darüber hinaus werden keine
  Personendaten erfragt.
- **FR-009**: Vor dem Bezahlen MÜSSEN Betrag, Rhythmus, Empfänger (DEMOCRACY Deutschland e.V.),
  Hinweis zur Gemeinnützigkeit und ein Link zur Datenschutzerklärung sichtbar sein; bei
  SEPA-Lastschrift zusätzlich der Mandatstext.
- **FR-010**: Nach Abschluss MUSS ein Danke-Bildschirm Betrag, Rhythmus und Status („erfolgreich"
  oder „wird eingezogen") anzeigen; bei monatlichen Spenden zusätzlich den nächsten Termin.
- **FR-011**: Das System MUSS Doppelbelastungen durch Mehrfachtippen, Wiederholungen oder
  Verbindungsabbrüche ausschließen.
- **FR-012**: Die Bankverbindung für Überweisungen MUSS auf beiden Plattformen als Alternative
  sichtbar bleiben, ebenso die bestehende Anzeige des Finanzierungsstands.
- **FR-013**: Der Verein MUSS die In-App-Zahlung ohne App-Update deaktivieren können; die App
  zeigt dann nur Finanzierungsstand und Bankverbindung.

**Dauerspenden**

- **FR-014**: Monatliche Spenden MÜSSEN ab der ersten Zahlung automatisch monatlich abgebucht
  werden, bis sie gekündigt werden oder endgültig fehlschlagen.
- **FR-015**: Fehlgeschlagene Folgeabbuchungen MÜSSEN automatisch erneut versucht werden; die
  Spender:in MUSS per E-Mail informiert werden und ihre Zahlungsart über einen Link
  aktualisieren können.
- **FR-016**: Auf dem Gerät, auf dem die Dauerspende abgeschlossen wurde, MÜSSEN Status, Betrag,
  nächster Termin und Zahlungsart sichtbar sein; Betrag und Zahlungsart MÜSSEN änderbar sein und
  die Dauerspende MUSS mit höchstens drei Interaktionen kündbar sein.
- **FR-017**: Jede Dauerspende MUSS zusätzlich geräteunabhängig verwaltet und gekündigt werden
  können: über einen Link in der Bestätigungs-E-Mail, mit Anmeldung per Einmal-Link an die
  hinterlegte E-Mail-Adresse.

**Belege & Verwaltung**

- **FR-018**: Nach jeder erfolgreichen Abbuchung (auch monatlich) MUSS eine Bestätigung an die
  E-Mail-Adresse der Spender:in gehen (in der App angegeben oder von der Zahlungsart erhoben).
  Sie MUSS Betrag, Datum, Zahlungsart, Empfänger sowie alle Angaben enthalten, die der Verein für
  den vereinfachten Zuwendungsnachweis nach § 50 Abs. 4 EStDV beisteuern muss
  (steuerbegünstigter Zweck, Angaben zur Freistellung, Kennzeichnung als Spende), und auf den
  vereinfachten Zuwendungsnachweis verlinken.
- **FR-019**: Formale Zuwendungs- und Sammelbestätigungen werden nicht automatisch erzeugt; die
  Bestätigung aus FR-018 MUSS erklären, wie sie beim Verein angefordert werden.
- **FR-020**: Der Verein MUSS alle Spenden mit Bruttobetrag, Gebühr, Nettobetrag, Zahlungsart,
  Rhythmus und Status einsehen und monatlich exportieren können.
- **FR-021**: Zahlungs- und Spendendaten MÜSSEN entsprechend den steuerlichen
  Aufbewahrungsfristen aufbewahrt werden; darüber hinausgehende personenbezogene Daten (z. B.
  gerätebezogene Zuordnung einer gekündigten Dauerspende) MÜSSEN gelöscht werden, sobald sie
  nicht mehr benötigt werden.

**Qualität & Konformität**

- **FR-022**: Das Feature MUSS den aktuellen Zahlungsrichtlinien von App Store und Google Play
  entsprechen; die Prüfung wird im Plan mit Quellen dokumentiert.
- **FR-023**: Alle Bedienelemente MÜSSEN mit VoiceOver/TalkBack bedienbar und beschriftet sein.

### Key Entities

- **Spende**: eine einzelne Zahlung; Betrag, Datum, Zahlungsart, Status (ausstehend, erfolgreich,
  fehlgeschlagen, zurückgebucht, erstattet), Gebühr, Bezug zu einer Dauerspende (optional).
- **Dauerspende**: wiederkehrende monatliche Zuwendung; Betrag, Status (aktiv, Zahlung
  überfällig, gekündigt, beendet), nächster Termin, hinterlegte Zahlungsart.
- **Spender:in**: pseudonym; E-Mail-Adresse (Pflicht bei Dauerspende, optional bei
  Einzelspende), Name nur falls von der Zahlungsart verlangt, keine Anschrift. Keine Verbindung
  zu DEMOCRACY-Nutzerkonten.
- **Spender-Schlüssel**: zufälliges, nur auf dem Gerät gespeichertes Geheimnis, mit dem die App
  „ihre" Dauerspende wiederfindet und verwalten darf (vergleichbar mit Signals Subscriber-ID).
- **Spendenkonfiguration**: Betragsvorschläge, Mindest-/Höchstbetrag, aktivierte Zahlungsarten,
  Ein/Aus-Schalter; vom Verein ohne App-Update änderbar.
- **Spendenbeleg**: Bestätigung bzw. Zuwendungsbestätigung zu einer oder mehreren Spenden.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Eine einmalige Spende per Wallet ist in unter 60 Sekunden ab Öffnen des
  Spenden-Bildschirms abgeschlossen, per Karte oder SEPA in unter 2 Minuten.
- **SC-002**: Für In-App-Spenden fallen außer den Gebühren des Zahlungsdienstleisters keine
  Plattformgebühren Dritter an; die Kosten je Spende sinken gegenüber DonorBox mindestens um
  dessen Plattformgebühr (2,95 % des Betrags) und sind je Spende in der Übersicht ausgewiesen.
- **SC-002a**: Mindestens 25 % der In-App-Spender:innen wählen die Gebührenübernahme (Zielwert,
  nach 3 Monaten überprüfen).
- **SC-003**: 0 Doppelbelastungen; jede Zahlung ist spätestens 5 Minuten nach Abschluss mit
  korrektem Status in der Spendenübersicht des Vereins sichtbar.
- **SC-004**: Mindestens 90 % der von Spender:innen bestätigten Zahlungen werden erfolgreich
  abgeschlossen (ohne App-Tracking messbar über die Spendenübersicht des Vereins).
- **SC-005**: Eine Dauerspende lässt sich in höchstens drei Interaktionen und unter 30 Sekunden
  kündigen.
- **SC-006**: Beide Apps passieren das Store-Review ohne Ablehnung wegen Zahlungsrichtlinien.
- **SC-007**: Eine Datenschutzprüfung bestätigt, dass keine Spende einem DEMOCRACY-Nutzerkonto
  oder Abstimmungsverhalten zugeordnet werden kann.

## Assumptions

- Zahlungsdienstleister ist das bestehende Stripe-Konto des Vereins; eine eigene Admin-Oberfläche
  ist nicht vorgesehen, Übersicht und Export erfolgen über das Stripe-Dashboard.
- Währung ist ausschließlich Euro; Zielgruppe sind Spender:innen in Deutschland bzw. im
  SEPA-Raum.
- Bestehende Pat:innen mit Dauerauftrag werden nicht aktiv zu In-App-Spenden umgelenkt, da der
  Dauerauftrag für den Verein gebührenfrei ist. Der Text „Pate/in ab 1 € monatlich" wird so
  angepasst, dass er auf den Dauerauftrag verweist.
- Die Option „monatlich" ist auf dem Spenden-Bildschirm vorausgewählt (Finanzierungsziel des
  Vereins); „einmalig" ist mit einem Tipp erreichbar.
- Es gibt keine Gegenleistungen für Spenden (keine Badges o. Ä. wie bei Signal), um die
  Gemeinnützigkeit und Prinzip II nicht zu berühren.
- Bestehende DonorBox-Dauerspenden laufen weiter; ihre Migration ist nicht Teil dieses Features.
  DonorBox wird in der App ersetzt, nicht sofort gekündigt.
- Der Finanzierungsstand (Fortschrittsbalken) wird weiterhin manuell gepflegt; eine automatische
  Befüllung aus den Spendendaten ist ein mögliches Folge-Feature.
- Spenden über die Website sind nicht Teil dieses Features; die serverseitige Lösung soll aber
  später wiederverwendbar sein.
- Der veraltete Hinweis „Spenden unter 200 €" in der App wird auf die aktuelle Grenze des
  vereinfachten Zuwendungsnachweises (300 €, § 50 Abs. 4 EStDV) korrigiert.
