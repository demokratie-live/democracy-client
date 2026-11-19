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
const USERNAME = "donor";
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

export const loadDonorKey = async (): Promise<string | null> => {
  const credentials = await Keychain.getGenericPassword({ service: SERVICE });
  return credentials ? credentials.password : null;
};

/** Erst aufrufen, wenn der Server die Dauerspende angelegt hat (`200` auf `POST /monthly`). */
export const saveDonorKey = async (key: string): Promise<void> => {
  await Keychain.setGenericPassword(USERNAME, key, {
    service: SERVICE,
    accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
  });
};

/**
 * Bei `404 not_found` vom Server (Dauerspende beendet und Zuordnung gelöscht) – aber nur, wenn noch
 * derselbe Schlüssel gespeichert ist. Sonst könnte eine langsame Statusabfrage einen Schlüssel löschen,
 * der inzwischen für eine neue Dauerspende gespeichert wurde.
 */
export const deleteDonorKeyIfUnchanged = async (expected: string): Promise<void> => {
  if ((await loadDonorKey()) !== expected) return;
  await Keychain.resetGenericPassword({ service: SERVICE });
};
