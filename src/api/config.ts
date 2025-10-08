import Constants from "expo-constants";
import { Platform } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const APP_VARIANT = extra.appVariant || "internal";
const GRAPHQL_URL =
  extra.graphqlUrl ||
  (APP_VARIANT === "internal"
    ? "https://internal.api.democracy-app.de"
    : "https://api.democracy-app.de");

const GRAPHQL_SERVER_LOCAL = false;
const ANDROID_SERVER = "192.168.0.166";
const ASSOCIATED_DOMAINS = extra.associatedDomains || [
  "internal.democracy-app.de",
];
const STORE_REVIEW_URL_IOS = extra.storeReviewUrl?.ios || "";
const STORE_REVIEW_URL_ANDROID = extra.storeReviewUrl?.android || "";
const STORE_REVIEW_URL =
  Platform.select({
    ios: STORE_REVIEW_URL_IOS,
    android: STORE_REVIEW_URL_ANDROID,
  }) || "";

export {
  GRAPHQL_URL,
  GRAPHQL_SERVER_LOCAL,
  ANDROID_SERVER,
  ASSOCIATED_DOMAINS,
  STORE_REVIEW_URL_IOS,
  STORE_REVIEW_URL_ANDROID,
  STORE_REVIEW_URL,
};
