// Expo-Config-Plugin: hebt die iOS-Mindestversion aller Pod-Targets auf die der App an.
//
// Hintergrund: Einige Pods (z. B. Stripe-Ressourcenbündel, RNDeviceInfo, AsyncStorage) setzen
// IPHONEOS_DEPLOYMENT_TARGET auf 9.0–13.0. Xcode 27 unterstützt erst ab iOS 15.0 und bricht den Build
// sonst ab. Als Config-Plugin bleibt die Änderung bei jedem `expo prebuild` erhalten (CNG, kein
// Handeingriff in ios/).
const { withPodfile } = require("expo/config-plugins");

const MARKER = "# @democracy/pods-deployment-target";

module.exports = function withPodsDeploymentTarget(config, { deploymentTarget = "15.5" } = {}) {
  return withPodfile(config, (cfg) => {
    const contents = cfg.modResults.contents;
    if (contents.includes(MARKER)) return cfg;

    const hook = "post_install do |installer|";
    if (!contents.includes(hook)) {
      throw new Error("withPodsDeploymentTarget: post_install-Hook im Podfile nicht gefunden");
    }
    const snippet = [
      hook,
      `    ${MARKER}`,
      "    installer.pods_project.targets.each do |target|",
      "      target.build_configurations.each do |build_configuration|",
      `        if build_configuration.build_settings['IPHONEOS_DEPLOYMENT_TARGET'].to_f < ${deploymentTarget}`,
      `          build_configuration.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${deploymentTarget}'`,
      "        end",
      "      end",
      "    end",
    ].join("\n");
    cfg.modResults.contents = contents.replace(hook, snippet);
    return cfg;
  });
};
