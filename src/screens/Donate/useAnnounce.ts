import { useEffect } from "react";
import { AccessibilityInfo, Platform } from "react-native";

/**
 * Liest neue Status- und Fehlermeldungen mit VoiceOver vor (T063). Android erledigt das über
 * `accessibilityLiveRegion` am Text; iOS kennt Live-Regionen nicht.
 */
export const useAnnounce = (message: string | null | undefined) => {
  useEffect(() => {
    if (message && Platform.OS === "ios") AccessibilityInfo.announceForAccessibility(message);
  }, [message]);
};
