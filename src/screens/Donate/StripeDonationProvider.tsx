import React, { type FC, type ReactElement } from "react";
import Constants from "expo-constants";
import { StripeProvider } from "@stripe/stripe-react-native";

/**
 * Stripe nur für die Spenden-Routen initialisieren (nicht app-weit), mit dem Publishable Key aus
 * `GET /donations/v1/config` (Testmodus in der internal-Variante, Live in production).
 *
 * Rückleitungen nach Redirect-Zahlungen (`democracy://stripe-redirect`, z. B. Bank-App, PayPal,
 * 3-D Secure im Browser) verarbeitet `src/app/+native-intent.tsx` über `handleURLCallback`, damit
 * Expo Router dafür nicht navigiert.
 */

export const STRIPE_RETURN_URL = "democracy://stripe-redirect";

const merchantIdentifier: string | undefined = Constants.expoConfig?.extra?.applePayMerchantId || undefined;

interface Props {
  publishableKey: string;
  children: ReactElement | ReactElement[];
}

export const StripeDonationProvider: FC<Props> = ({ publishableKey, children }) => (
  <StripeProvider
    publishableKey={publishableKey}
    merchantIdentifier={merchantIdentifier}
    urlScheme="democracy"
  >
    {children}
  </StripeProvider>
);
