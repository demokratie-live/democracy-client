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
 * Texte mit offenen Entwurfsmarkern ([OFFEN: …], [PRÜFEN: …]) werden nicht übernommen, damit sie in
 * keinem Build erscheinen – außer ausdrücklich mit --allow-drafts.
 *
 * Aufruf: node scripts/sync-legal-texts.mjs [--allow-drafts] [Pfad zum Website-Repo]
 */
import fs from "node:fs";
import path from "node:path";

// Kanonische Adresse (www und Pfade ohne Schrägstrich leiten zweimal weiter)
const SITE = "https://democracy-deutschland.de";
const args = process.argv.slice(2);
const allowDrafts = args.includes("--allow-drafts");
const repoArg = args.find((arg) => !arg.startsWith("--"));
const websiteRepo = path.resolve(repoArg ?? path.join(process.cwd(), "..", "democracy-deutschland.de"));
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

const normalize = (text) => text.replace(/\r\n?/g, "\n");

let source = normalize(fs.readFileSync(target, "utf-8"));
for (const { title, file } of ENTRIES) {
  const markdown = normalize(fs.readFileSync(path.join(websiteRepo, "content/legal", file), "utf-8"));
  const drafts = markdown.match(/\[(OFFEN|PRÜFEN):/g) ?? [];
  if (drafts.length > 0 && !allowDrafts) {
    throw new Error(`${file} enthält ${drafts.length} offene Entwurfsmarker – erst klären oder --allow-drafts`);
  }
  const start = source.indexOf(`    title: "${title}",\n    text: \``);
  if (start === -1) throw new Error(`Eintrag „${title}" nicht gefunden in ${target}`);
  const textStart = source.indexOf("`", start) + 1;
  // Ende: das erste nicht maskierte Backtick (gerade Anzahl Backslashes davor) nach dem Textanfang
  let end = textStart;
  const escaped = (index) => {
    let count = 0;
    for (let i = index - 1; i >= textStart && source[i] === "\\"; i -= 1) count += 1;
    return count % 2 === 1;
  };
  while (end < source.length && !(source[end] === "`" && !escaped(end))) end += 1;
  if (end >= source.length) throw new Error(`Textende von „${title}" nicht gefunden`);
  source = source.slice(0, textStart) + toAppMarkdown(markdown) + source.slice(end);
}
fs.writeFileSync(target, source);
console.log(`Rechtstexte übernommen aus ${websiteRepo}`);
