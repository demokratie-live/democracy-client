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

export default {
  expo: {
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
        backgroundColor: "#4494d3",
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
  },
};
