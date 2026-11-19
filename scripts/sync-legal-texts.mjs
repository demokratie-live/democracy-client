#!/usr/bin/env node
/**
 * Übernimmt Datenschutzerklärung und Nutzungsbedingungen von der Website in die App.
 *
 * Quelle: democracy-deutschland.de/content/legal/{datenschutz,nutzungsbedingungen}.md (Website-Repo,
 * standardmäßig als Nachbarordner ../democracy-deutschland.de). Ziel: src/screens/About/data.ts.
 *
 * Anpassungen für die App (react-native-markdown-display, kein HTML):
 * - erste Überschrift (# Titel) entfällt – die App zeigt den Titel selbst an
 * - `<br>` am Zeilenende → Markdown-Zeilenumbruch
 * - interne Links (/datenschutz/) → absolute Website-URLs
 * - Backticks und `${` für das Template-Literal maskiert
 *
 * Aufruf: node scripts/sync-legal-texts.mjs [Pfad zum Website-Repo]
 */
import fs from "node:fs";
import path from "node:path";

// Kanonische Adresse (www und Pfade ohne Schrägstrich leiten zweimal weiter)
const SITE = "https://democracy-deutschland.de";
const websiteRepo = path.resolve(process.argv[2] ?? path.join(process.cwd(), "..", "democracy-deutschland.de"));
const target = path.join(process.cwd(), "src/screens/About/data.ts");

const ENTRIES = [
  { title: "Datenschutzerklärung", file: "datenschutz.md" },
  { title: "Nutzungsbedingungen", file: "nutzungsbedingungen.md" },
];

const toAppMarkdown = (markdown) =>
  markdown
    .replace(/^# .+\n+/, "")
    .replace(/<br\s*\/?>\n/g, "  \n")
    .replace(/<br\s*\/?>/g, "  \n")
    .replace(/\]\(\/([^)]*)\)/g, (_match, rest) => `](${SITE}/${rest})`)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${")
    .trimEnd();

let source = fs.readFileSync(target, "utf-8");
for (const { title, file } of ENTRIES) {
  const markdown = fs.readFileSync(path.join(websiteRepo, "content/legal", file), "utf-8");
  const start = source.indexOf(`    title: "${title}",\n    text: \``);
  if (start === -1) throw new Error(`Eintrag „${title}" nicht gefunden in ${target}`);
  const textStart = source.indexOf("`", start) + 1;
  // Ende: das erste nicht maskierte Backtick nach dem Textanfang
  let end = textStart;
  while (end < source.length && !(source[end] === "`" && source[end - 1] !== "\\")) end += 1;
  if (end >= source.length) throw new Error(`Textende von „${title}" nicht gefunden`);
  source = source.slice(0, textStart) + toAppMarkdown(markdown) + source.slice(end);
}
fs.writeFileSync(target, source);
console.log(`Rechtstexte übernommen aus ${websiteRepo}`);
