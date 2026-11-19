import { handleURLCallback } from "@stripe/stripe-react-native";

/**
 * Expo-Router-Hook für eingehende Deep Links.
 *
 * In-App-Spenden (specs/001-in-app-donations): Nach Redirect-Zahlungen (Bank-App, PayPal,
 * 3-D Secure im Browser) kehrt Stripe über `democracy://stripe-redirect…` zurück. Diese URL gehört
 * dem Stripe-SDK: Wir reichen sie an `handleURLCallback` weiter und geben einen leeren Pfad zurück,
 * damit nicht navigiert wird (React Navigation ignoriert leere URLs) – der Spenden-Bildschirm mit dem
 * offenen Zahlungsdialog bleibt erhalten. Alle anderen Links bleiben unverändert.
 */
export async function redirectSystemPath({
  path,
}: {
  path: string;
  initial: boolean;
}): Promise<string> {
  if (path.includes("stripe-redirect")) {
    try {
      await handleURLCallback(path);
    } catch {
      // Stripe noch nicht initialisiert (z. B. Kaltstart über den Link) – nichts zu tun.
    }
    return "";
  }
  return path;
}
