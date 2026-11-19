// Expo-Config-Plugin: macht die Pods mit aktuellen Xcode-Versionen (27) baubar.
//
// 1. Mindestversion: Einige Pods (Stripe-Ressourcenbündel, RNDeviceInfo, AsyncStorage, blob-util)
//    setzen IPHONEOS_DEPLOYMENT_TARGET auf 9.0–13.0. Xcode 27 unterstützt erst iOS 15.0 → anheben auf
//    die Mindestversion der App.
// 2. fmt: React Native 0.76 bringt fmt 11.0 mit; neuere Clang-Versionen (Xcode 26.4+/27) brechen im
//    C++20-Modus mit „call to consteval function … is not a constant expression" ab → fmt mit C++17.
//
// Als Config-Plugin bleiben die Anpassungen bei jedem `expo prebuild` erhalten (CNG, kein Handeingriff
// in ios/). Entfällt, sobald Expo/React Native aktualisiert sind.
const { withPodfile } = require("expo/config-plugins");

const MARKER = "# @democracy/xcode-pods-compatibility";

module.exports = function withXcodePodsCompatibility(config, { deploymentTarget = "15.5" } = {}) {
  return withPodfile(config, (cfg) => {
    const contents = cfg.modResults.contents;
    if (contents.includes(MARKER)) return cfg;

    const snippet = [
      "",
      `    ${MARKER}`,
      "    installer.pods_project.targets.each do |target|",
      "      target.build_configurations.each do |build_configuration|",
      `        if build_configuration.build_settings['IPHONEOS_DEPLOYMENT_TARGET'].to_f < ${deploymentTarget}`,
      `          build_configuration.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${deploymentTarget}'`,
      "        end",
      "        if target.name == 'fmt'",
      "          build_configuration.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++17'",
      "        end",
      "      end",
      "    end",
    ].join("\n");

    // Nach react_native_post_install einfügen – React Native setzt dort CLANG_CXX_LANGUAGE_STANDARD
    // für alle Pods auf c++20 und würde die fmt-Anpassung sonst überschreiben.
    const rnCall = contents.indexOf("react_native_post_install(");
    const rnCallEnd = rnCall >= 0 ? contents.indexOf("\n    )\n", rnCall) : -1;
    if (rnCallEnd < 0) {
      throw new Error("withXcodePodsCompatibility: react_native_post_install(...) im Podfile nicht gefunden");
    }
    const insertAt = rnCallEnd + "\n    )\n".length - 1;
    cfg.modResults.contents = contents.slice(0, insertAt) + snippet + contents.slice(insertAt);
    return cfg;
  });
};
