import { ConfigContext, ExpoConfig } from "expo/config";
import { IOSIcons } from "@expo/config-types";
const APP_VARIANT = process.env.APP_VARIANT;

const getBundleIdentifier = () => {
  if (APP_VARIANT === "internal") {
    return "de.democracy-deutschland.clientapp.internal";
  }
  return "de.democracy-deutschland.clientapp";
};

const getPackage = () => {
  if (APP_VARIANT === "internal") {
    return "de.democracydeutschland.app.internal";
  }
  return "de.democracydeutschland.app";
};

const getAppName = () => {
  if (APP_VARIANT === "internal") {
    return "DEMOCRACY (Internal)";
  }
  return "DEMOCRACY";
};

const getAppIcon = () => {
  if (APP_VARIANT === "internal") {
    return "./assets/icons/icon-internal.png";
  }
  return "./assets/icons/icon.png";
};

const getIosAppIcons = (): IOSIcons => {
  if (APP_VARIANT === "internal") {
    return {
      dark: "./assets/icons/internal/ios-dark.png",
      light: "./assets/icons/internal/ios-light.png",
      tinted: "./assets/icons/internal/ios-tinted.png",
    };
  }
  return {
    dark: "./assets/icons/production/ios-dark.png",
    light: "./assets/icons/production/ios-light.png",
    tinted: "./assets/icons/production/ios-tinted.png",
  };
};

const getGraphqlUrl = () => {
  if (APP_VARIANT === "internal") {
    return process.env.GRAPHQL_URL || "https://internal.api.democracy-app.de";
  }
  return process.env.GRAPHQL_URL || "https://api.democracy-app.de";
};

const getAssociatedDomains = () => {
  const domains = process.env.ASSOCIATED_DOMAINS;
  if (domains) {
    return domains.split(",");
  }
  return ["internal.democracy-app.de"];
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "DEMOCRACY",
  scheme: "democracy",
  version: "1.5.11",
  orientation: "portrait",
  icon: getAppIcon(),
  userInterfaceStyle: "light",
  newArchEnabled: false,
  splash: {
    image: "./assets/bootsplash_logo.png",
    resizeMode: "contain",
    backgroundColor: "#4494d3",
    imageWidth: 200,
    dark: {
      image: "./assets/bootsplash_logo.png",
      resizeMode: "re",
      backgroundColor: "#4494d3",
      imageWidth: 200,
    },
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getBundleIdentifier(),
    entitlements: {
      "aps-environment": process.env.CI ? "production" : "development",
    },
    icon: getIosAppIcons(),
    infoPlist: process.env.CI
      ? {}
      : {
          NSAppTransportSecurity: {
            NSAllowsArbitraryLoads: false,
            NSExceptionDomains: {
              localhost: {
                NSExceptionAllowsInsecureHTTPLoads: true,
              },
              "democracy-api.local.democracy-app.de": {
                NSIncludesSubdomains: true,
                NSExceptionAllowsInsecureHTTPLoads: true,
              },
            },
          },
        },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundImage: "./assets/adaptive-icon-background.png",
    },
    package: getPackage(),
    googleServicesFile: "./google-services.json",
  },
  plugins: [
    "expo-router",
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "15.5",
        },
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          minSdkVersion: 24,
        },
      },
    ],
    [
      "expo-notifications",
      {
        enableBackgroundRemoteNotifications: true,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    graphqlUrl: getGraphqlUrl(),
    appVariant: APP_VARIANT || "internal",
    associatedDomains: getAssociatedDomains(),
  },
});
