# DEMOCRACY Client Constitution

## Core Principles

### I. Datensparsamkeit & Privacy by Design

- Die App erhebt, überträgt und speichert nur Daten, die für die jeweilige Funktion zwingend
  erforderlich oder gesetzlich vorgeschrieben sind (Art. 5 Abs. 1 lit. c DSGVO).
- Personenbezogene Daten DÜRFEN NICHT mit dem Abstimmungsverhalten von Nutzer:innen verknüpft
  werden. Neue Funktionen MÜSSEN so entworfen sein, dass eine solche Verknüpfung technisch
  ausgeschlossen ist.
- Es werden keine Tracking-, Werbe- oder Analytics-SDKs Dritter eingebunden. Drittanbieter-SDKs
  sind nur zulässig, wenn sie für die Kernfunktion unverzichtbar sind; ihr Datenabfluss ist in
  der Datenschutzerklärung zu dokumentieren.

**Begründung**: Vertrauen in die Anonymität ist die Geschäftsgrundlage von DEMOCRACY.

### II. Unabhängigkeit, Transparenz & Gemeinnützigkeit

- DEMOCRACY bleibt überparteilich, werbefrei und nicht-kommerziell. Funktionen DÜRFEN NICHT
  bezahlte Vorteile beim Abstimmen, Informieren oder in der Sichtbarkeit von Inhalten schaffen.
- Kosten, die von Spenden abgehen (Gebühren, Provisionen), sind zu minimieren und bei
  Architekturentscheidungen explizit auszuweisen.
- Der Code ist Open Source; Entscheidungen werden im Repository nachvollziehbar dokumentiert
  (Specs, Plans, ADR-artige Begründungen in `research.md`).

**Begründung**: Die Glaubwürdigkeit als gemeinnütziger e.V. hängt an Unabhängigkeit und
sparsamem Umgang mit Spendengeldern.

### III. Plattform- & Store-Konformität

- Die App Store Review Guidelines (Apple) und die Google-Play-Richtlinien sind harte
  Randbedingungen. Jede Funktion mit Store-Relevanz (Zahlungen, Links nach außen, Berechtigungen)
  MUSS vor der Umsetzung gegen die jeweils aktuelle Fassung geprüft und die Prüfung in
  `research.md` mit Quelle dokumentiert werden.
- iOS und Android erhalten funktionale Parität. Abweichungen sind nur zulässig, wenn eine
  Store-Regel oder Plattform-API sie erzwingt, und MÜSSEN begründet werden.

**Begründung**: Eine abgelehnte oder entfernte App trifft alle Nutzer:innen.

### IV. Server als Source of Truth, keine Geheimnisse im Client

- Geheime Schlüssel (API-Secret-Keys, Webhook-Secrets, Signaturschlüssel) DÜRFEN NIEMALS im
  App-Bundle oder Client-Code liegen. Der Client erhält höchstens öffentliche/publizierbare
  Schlüssel.
- Privilegierte Operationen (Zahlungen anlegen, Status ändern, Daten verändern) laufen
  ausschließlich über `democracy-api`. Der Client vertraut keinem lokal berechneten Zustand,
  der Geld oder Rechte betrifft.
- Zustandsänderungen von externen Diensten werden serverseitig über signierte Webhooks oder
  serverseitige Abfragen verifiziert, nie über Angaben des Clients.

**Begründung**: Mobile Apps sind dekompilierbar; Geld- und Rechteflüsse müssen serverseitig
abgesichert sein.

### V. Einfachheit & Wartbarkeit für ein kleines Team

- Bevorzugt werden etablierte, gepflegte Bibliotheken und Managed Services gegenüber
  Eigenentwicklungen, sofern Prinzip I und II nicht verletzt werden.
- Native Abhängigkeiten MÜSSEN mit Expo Continuous Native Generation (Config Plugins,
  `expo prebuild`) funktionieren; manuelle Änderungen in `ios/` oder `android/` sind unzulässig.
- YAGNI: Es wird nur gebaut, was die Spec fordert. Zusätzliche Komplexität MUSS im Plan unter
  „Complexity Tracking" begründet werden.

**Begründung**: Das Projekt wird überwiegend ehrenamtlich gepflegt.

### VI. Testbarkeit & Qualitätssicherung

- Client: `pnpm lint` und `pnpm lint:ts` MÜSSEN fehlerfrei sein. Jeder neue kritische
  Nutzer-Flow erhält einen Maestro-E2E-Flow unter `.maestro/flows/`.
- Server (`democracy-api`): Neue Resolver, Endpunkte und Webhook-Handler erhalten Vitest-Unit-
  und, wo die Datenbank beteiligt ist, Integrationstests.
- Zahlungsflüsse MÜSSEN im Testmodus des Zahlungsdienstleisters Ende-zu-Ende verifiziert werden,
  bevor sie in einen Produktions-Build gelangen.

**Begründung**: Fehler in Zahlungs- und Abstimmungsflüssen sind teuer und schwer rückgängig zu
machen.

## Technische Rahmenbedingungen

- **Client**: React Native mit Expo (aktuell SDK 52), Expo Router, Apollo Client (GraphQL),
  TypeScript, Styled Components, pnpm. Build-Varianten `internal` und `production` über
  `APP_VARIANT` in `app.config.ts`. Auslieferung via fastlane (`deploy/`).
- **Server**: `demokratie-live/democracy-api` (Express, Apollo Server, Mongoose/MongoDB,
  Vitest), Deployment als Container auf Kubernetes (`infra/manifests`). Gemeinsame Mongoose-
  Modelle liegen in `@democracy-deutschland/democracy-common`.
- **Sprache**: Die Nutzeroberfläche ist deutsch; Texte werden zentral (z. B. `content.ts`)
  gepflegt.
- **Barrierefreiheit**: Neue interaktive Elemente erhalten Accessibility-Labels und sind mit
  Screenreader (VoiceOver/TalkBack) bedienbar.

## Entwicklungsworkflow

- Features werden spec-getrieben entwickelt: `/speckit-specify` → `/speckit-clarify` →
  `/speckit-plan` → `/speckit-tasks` → `/speckit-analyze` → `/speckit-implement`.
- Ein Feature-Branch pro Spec; Commits folgen Conventional Commits.
- Änderungen, die Client und Server betreffen, werden in beiden Repositories mit gleichem
  Branch-Namen umgesetzt; der Server wird vor dem Client ausgerollt (abwärtskompatible API).
- Jede PR wird von mindestens einer weiteren Person geprüft; Store-relevante Änderungen werden
  vor Einreichung zusätzlich gegen Prinzip III geprüft.

## Governance

- Diese Constitution hat Vorrang vor anderen Konventionen im Repository. Pläne (`plan.md`)
  MÜSSEN einen „Constitution Check" enthalten; Verstöße sind nur mit dokumentierter Begründung
  im Abschnitt „Complexity Tracking" zulässig.
- Änderungen erfolgen per PR mit Begründung und Versionssprung nach SemVer:
  MAJOR = Prinzip entfernt/umdefiniert, MINOR = Prinzip/Abschnitt ergänzt,
  PATCH = Klarstellung.

**Version**: 1.0.0 | **Ratified**: 2026-11-19 | **Last Amended**: 2026-11-19
