import Constants from "expo-constants";

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

export {
  GRAPHQL_URL,
  GRAPHQL_SERVER_LOCAL,
  ANDROID_SERVER,
  ASSOCIATED_DOMAINS,
};
