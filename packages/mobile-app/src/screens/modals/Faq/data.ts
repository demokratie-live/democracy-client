interface Faq {
  title: string;
  text: string;
}

export const faqData: Faq[] = [
  {
    title: 'Was ist der Wahl-O-Meter?',
    text: `Der Wahl-O-Meter ist ein Analysetool zur persönlichen Repräsentationsmessung innerhalb der DEMOCRACY App.

Im Unterschied zum zukunftsorientierten Wahl-O-Mat von der Bundeszentrale für politische Bildung, der in Vorbereitung auf eine anstehende Wahl die eigenen Stellungnahmen zu vordefinierten Fragen mit den Wahlversprechen der verschiedenen Parteien abgleicht, vergleicht der Wahl-O-Meter retrospektiv das tatsächliche Abstimmungsverhalten der Parteien und Politiker in den Parlamenten mit Deinen Präferenzen. In Anlehnung an die bekannte Bezeichnung des Wahl-O-Mats ("Wahl-Automat"), werden vom Wahl-O-Meter (meter = messen) also die tatsächlichen Handlungen der Poltiker in den Fokus genommen, sodass Du Deine du deine Wahlentscheidung nicht nur auf Wahlversprechen, sondern auf das gesicherte Handeln von Politikern und Parteien stützen kannst.

Mathematisch bildet der Wahl-O-Meter dafür die Mittelwerte der eigenen Zustimmungen, Ablehnungen und neutralen Antworten innerhalb der DEMOCRACY App mit den Zustimmungen, Ablehnungen und neutralen Antworten jeder Partei / jedes Abgeordneten und sortiert diese Mittelwerte absteigend. 

Mehr Informationen dazu findest Du auf unserer Website [https://democracy-deutschland.de/#!wahlometer](https://democracy-deutschland.de/#!wahlometer).`,
  },
  {
    title: 'Warum fehlt bei den Details eines Vorgangs der Antragsteller?',
    text: `Immer wieder kam und kommt die Frage auf, warum wir den Antragsteller eines Papiers nicht ebenfalls unter den Detailinformationen eines Vorgangs anzeigen.

Dies hat einen ganz einfachen Grund: 
Eines der Kernanliegen von DEMOCRACY ist es, den Wandel von einer personen- bzw.  durch politische Farben dominierten und mit Versprechen und Emotionen geführten Politik hin zu einer an konkreten Entscheidungen erfahrbaren Sachpolitik mitzugestalten. Das Abstimmungsverhalten vorab mit politischen Farben zu beeinflussen, ist insofern nicht Teil dieses Kernkonzepts.

Nimm es als Chance, Deine (politischen) Einstellungen anhand der konkret vertretenen Inhalte nochmal zu überprüfen.`,
  },
  {
    title: 'Worüber wird abgestimmt?',
    text: `DEMOCRACY ermöglicht seinen Nutzern über die offiziellen Gesetze & Anträge des Bundestages abzustimmen, so als wären sie Bundestagsabgeordnete.

Die (Nutzer-)Abstimmung in der App findet dabei immer über das Gesetz/den Antrag an sich (und nicht über die Beschlussempfehlung) statt. Im Plenarsaal des Bundestages wird allerdings oft über die Beschlussempfehlung abgestimmt. Eine Zustimmung zu einer Beschlussempfehlung, die eines Ablehnung des Vorgangs vorschlägt, ist insofern invers zu zählen.
Innerhalb unserer Software haben wir einen Mechanismus implementiert, der die ggfs. notwendigen Umrechnungen vornimmt. 

Solltest Du Diskrepanzen zwischen dem Beschlusstext und unserer Ergebnisaufzeichnung feststellen, bitten wir Dich, diese an [prototyping@democracy-deutschland.de](mailto:prototyping@democracy-deutschland.de) zu reporten. `,
  },
  {
    title: 'Wie finde ich Gesetze der vergangenen 19. Legislaturperiode ?',
    text: `Sämtliche Vorgänge der vergangen 19. Legislaturperiode findest Du unter LP 19 Vorgänge im Side-Menu. 
      Falls Dein Side-Menu die 19. Legislaturperiode nicht anzeigt, kannst Du sie in den App-Einstellungen unter Legislaturperioden aktivieren. `,
  },
  {
    title: 'Gebt ihr meine Abstimmungsdaten an Dritte weiter?',
    text: `Nein. Die Betreiber der App DEMOCRACY nehmen den Schutz Deiner persönlichen Daten sehr ernst.
Unserer Meinung nach sind Nutzerdaten gerade keine handelbaren Wirtschaftsgüter, sondern im Sinne des Grundgesetzes zu schützen. Deshalb behandeln wir Deine personenbezogenen wie Abstimmungsdaten vertraulich entsprechend den gesetzlichen Datenschutzrichtlinien und geben sie selbstverständlich nicht an Dritte weiter. Damit Du Dich bei der Nutzung unserer App sicher fühlst, informieren wir Dich in unserer Datenschutzrichtlinie ausführlich darüber, welche Daten wir warum erheben und wie wir diese verarbeiten und nutzen, vgl.
[https://www.democracy-deutschland.de/#!datenschutz](https://www.democracy-deutschland.de/#!datenschutz)`,
  },
  {
    title: 'Wie stellt ihr meine Stimmanonymität sicher?',
    text: `Wahlgeheimnis bedeutet, dass während und nach einer Wahl keine Information bekannt werden darf, die darauf schließen lässt, was ein Wähler gewählt hat. Im Konkreten geht es also um die Trennung von Person und Stimme in Urnenbuch und Auszählung. Die Aufrechterhaltung dieses Abstimmungs- bzw. Wahlgeheimnis ist zentraler Bestandteil der DNA der DEMOCRACY App.
Unser Konzept sieht daher vor, jede Deiner Abstimmungsentscheidungen (Ja, Enthaltung, Nein als Stimme) von Deinen personenbezogenen Identifikationsdaten ( – dem Urnenbuch) zu trennen. DEMOCRACY speichert insofern lediglich eine Quittung Deiner Abstimmungsentscheidung lokal auf Deinem Handy, an den Server werden ausschließlich anonymisierte und nicht kommerziell nutzbare Daten übersendet. 

Das vollständige Konzept zur Stimmanonymisierung kannst du hier nachlesen:
[https://github.com/demokratie-live/democracy-docu/wiki/Stimmanonymität](https://github.com/demokratie-live/democracy-docu/wiki/Stimmanonymität)`,
  },
  {
    title: 'Sensible Daten und Open Source – geht das?',
    text:
      'Ja. Open Source bedeutet, dass der Quellcode frei und offen ist. Die Daten der Nutzer sind kein Bestandteil des Quellcodes, sondern der entsprechenden Installation des freien Programms auf einem Server. Insofern ist der unberechtigte Zugriff auf Nutzerdaten durch Dritte durch unsere Open-Source-Eigenschaft nicht angetastet. Überdies wird jede Änderung im Code, bevor sie in den Betrieb übergeht, von uns geprüft. Somit wird der hohe Anspruch an guter Programmierung gewahrt und auch verhindert, dass dubioser Code einfließen kann.',
  },
  {
    title: 'Wie wird DEMOCRACY finanziert?',
    text: `DEMOCRACY ist eine gemeinnützige App, das heißt von Menschen für Menschen, um unsere Politik transparenter und demokratischer zu machen. Da wir DEMOCRACY als eine werbefreie Plattform ohne Datenverkauf realisiert haben, kann unser Joker nur die gemeinschaftliche Finanzierung sein. Insofern wird DEMOCRACY, um die laufenden Kosten zu decken, auch nach dem [initialen Crowdfunding](https://www.startnext.com/democracy) durch Spenden finanziert.
Finanziell unterstützen kannst Du via [https://www.democracy-deutschland.de/#!donate](https://www.democracy-deutschland.de/#!donate).`,
  },
  {
    title: 'Wie kann ich Mithelfen?',
    text: `[Spenden und Daueraufträge](https://www.democracy-deutschland.de/#!donate) sind nur eine Möglichkeit, uns zu unterstützen. Hier haben wir eine Liste von Tätigkeiten aufgeführt, die Du sofort angehen kannst, wenn Du bei DEMOCRACY mithelfen möchtest.

**LEVEL 1 – Für Einsteiger**
- Benutze DEMOCRACY, stimme regelmäßig app und zeig Deinen Vertretern, was Du willst
- Sprich mit Deinen Freunden über uns
- Teile unseren [Erklärfilm](https://www.youtube.com/watch?v=DFXcnRdXA7k) mit Deinen Freunden im Sozialen Netzwerk Deiner Wahl
- Kommentiere, like und teile DEMOCRACY-Beiträge in Social Media
- Bewerte DEMOCRACY im App- bzw. PlayStore mit bis zu 5 Sternen
- Entwickler-Special: Gib uns einen [Stern auf Github](https://github.com/demokratie-live/democracy-client)

**LEVEL 2 – Für Profis**
- Schreibe über DEMOCRACY auf Deiner eigenen Seite/Blog/Timeline
- Überlege Dir, zu welchen strategischen Partnern oder Multiplikatoren Du als Scharniernetzwerker für DEMOCRACY botschaften könntest, um die Reichweite von DEMOCRACY zu erhöhen
- Sprich diese Netzwerke auf eigene Initiative an – für fachliche Rückfragen stehen wir jederzeit zur Verfügung. Tritt dafür gerne mit uns in in direkte Kommunikation z.B. über [Discord](https://discordapp.com/invite/Pdu3ZEV) oder [per Mail](mailto:contact@democracy-deutschland.de)
- Schlage selbst ein Feature vor, dass Du in einer künftigen Version von DEMOCRACY umgesetzt sehen willst
- Entwickler-Special: Prüfe unseren [Code](https://github.com/demokratie-live) und/oder entwickle mit.

Außerdem suchen wir ständig motivierte Menschen für die aktive Mitarbeit in unserem Projekt! Du hast Interesse Deine Fähigkeiten einzubringen – wir freuen uns über Anregungen, Fragen und Kritik. Hier kannst Du Dich [als Freiwilliger melden](https://www.democracy-deutschland.de/#!engineering#help)
`,
  },
];
