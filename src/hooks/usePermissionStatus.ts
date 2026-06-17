import { useState, useEffect } from "react";
import { AppStateStatus } from "react-native";
import * as Notifications from "expo-notifications";

type PermissionStatus = Notifications.PermissionStatus | null;

/**
 * Checks notification permission status once per foreground event.
 *
 * Only queries the OS when `appState` transitions to `'active'`,
 * avoiding unnecessary work during background/inactive states.
 * Returns `null` until the first check completes.
 */
export function usePermissionStatus(
  appState: AppStateStatus,
): PermissionStatus {
  const [status, setStatus] = useState<PermissionStatus>(null);

  useEffect(() => {
    if (appState !== "active") return;

    let cancelled = false;
    Notifications.getPermissionsAsync().then(({ status: s }) => {
      if (!cancelled) setStatus(s);
    });
    return () => {
      cancelled = true;
    };
  }, [appState]);

  return status;
}
