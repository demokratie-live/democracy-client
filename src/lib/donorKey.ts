import * as Crypto from "expo-crypto";
import * as Keychain from "react-native-keychain";

/**
 * Spender-Schlüssel für Dauerspenden (research.md R8, data-model.md §7): 32 Zufallsbytes, base64url,
 * nur auf diesem Gerät gespeichert. Der Server kennt nur den SHA-256-Hash. Keine Verbindung zu
 * DEMOCRACY-Konto oder Abstimmungen.
 *
 * `THIS_DEVICE_ONLY`: Der Schlüssel wandert nicht über Backups auf andere Geräte (Signal-Prinzip);
 * geräteunabhängig verwaltet man die Dauerspende über den Stripe-Login-Link per E-Mail.
 */

const SERVICE = "de.democracy.donorKey";
/** Benutzername-Feld: Präfix + Speicherzeitpunkt (ms), siehe `deleteDonorKeyIfUnchanged`. */
const USERNAME_PREFIX = "donor:";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/** base64url ohne Padding (RFC 4648 §5) – unabhängig davon, ob die JS-Engine `btoa` kennt. */
export const toBase64Url = (bytes: Uint8Array): string => {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const chunk = (bytes[i] << 16) | ((bytes[i + 1] ?? 0) << 8) | (bytes[i + 2] ?? 0);
    const chars = Math.min(4, Math.ceil(((bytes.length - i) * 8) / 6));
    for (let c = 0; c < chars; c += 1) {
      out += ALPHABET[(chunk >> (18 - 6 * c)) & 63];
    }
  }
  return out;
};

export const generateDonorKey = (): string => toBase64Url(Crypto.getRandomBytes(32));

interface StoredKey {
  key: string;
  /** Zeitpunkt des Speicherns (ms); 0 bei Einträgen ohne Zeitstempel. */
  savedAt: number;
}

const readEntry = async (): Promise<StoredKey | null> => {
  const credentials = await Keychain.getGenericPassword({ service: SERVICE });
  if (!credentials) return null;
  const savedAt = Number(credentials.username.startsWith(USERNAME_PREFIX) ? credentials.username.slice(USERNAME_PREFIX.length) : 0);
  return { key: credentials.password, savedAt: Number.isFinite(savedAt) ? savedAt : 0 };
};

/**
 * Liest den Eintrag; ein Lesefehler wird einmal wiederholt. Bleibt er unlesbar – etwa auf Android nach
 * einer Backup-Wiederherstellung ohne den zugehörigen Keystore-Schlüssel –, wird er zurückgesetzt:
 * Das Gerät verhält sich dann wie ein neues (Verwaltung weiter über den Login-Link per E-Mail), statt
 * Spenden und Verwaltung dauerhaft zu blockieren.
 */
const loadEntry = async (): Promise<StoredKey | null> => {
  try {
    return await readEntry();
  } catch {
    try {
      return await readEntry();
    } catch (error) {
      if (__DEV__) console.warn("[donations] Spender-Schlüssel unlesbar, wird zurückgesetzt", String(error));
      await Keychain.resetGenericPassword({ service: SERVICE });
      return null;
    }
  }
};

export const loadDonorKey = async (): Promise<string | null> => (await loadEntry())?.key ?? null;

/** Erst aufrufen, wenn der Server die Dauerspende angelegt hat (`200` auf `POST /monthly`). */
export const saveDonorKey = async (key: string): Promise<void> => {
  await Keychain.setGenericPassword(`${USERNAME_PREFIX}${Date.now()}`, key, {
    service: SERVICE,
    accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
  });
};

/**
 * Bei `404 not_found` vom Server (Dauerspende beendet und Zuordnung gelöscht) – aber nur, wenn noch
 * derselbe Schlüssel gespeichert ist **und** er vor Beginn der Anfrage gespeichert wurde. Sonst könnte
 * eine langsame Statusabfrage einen Schlüssel löschen, der inzwischen (auch derselbe, wiederverwendete)
 * für eine neue Dauerspende gespeichert wurde.
 */
export const deleteDonorKeyIfUnchanged = async (expected: string, requestStartedAt: number): Promise<void> => {
  const entry = await loadEntry();
  if (!entry || entry.key !== expected || entry.savedAt > requestStartedAt) return;
  await Keychain.resetGenericPassword({ service: SERVICE });
};
