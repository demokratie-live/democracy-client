import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useAddTokenMutation } from "../__generated__/graphql";

/**
 * Registers the native device push token with the backend when
 * notification permission is granted.
 *
 * - Only acts when `permissionStatus` is `'granted'`
 * - Caches the last registered token to skip redundant API calls
 * - Handles Promise rejections on both `getDevicePushTokenAsync`
 *   and `addToken` to prevent unhandled rejection crashes
 * - Works without user authentication (all users can receive push
 *   notifications regardless of login state)
 */
export function useDeviceTokenRegistration(
  permissionStatus: Notifications.PermissionStatus | null,
): void {
  const [addToken] = useAddTokenMutation();
  const lastRegisteredTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (permissionStatus !== "granted") return;

    let cancelled = false;

    Notifications.getDevicePushTokenAsync()
      .then(({ data: token }) => {
        if (cancelled) return;
        if (token === lastRegisteredTokenRef.current) return;

        addToken({ variables: { token, os: Platform.OS } })
          .then(() => {
            lastRegisteredTokenRef.current = token;
          })
          .catch((err) => {
            if (__DEV__) {
              console.warn(
                "[useDeviceTokenRegistration] addToken failed:",
                err,
              );
            }
          });
      })
      .catch((err) => {
        if (__DEV__) {
          console.warn(
            "[useDeviceTokenRegistration] getDevicePushTokenAsync failed:",
            err,
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [permissionStatus, addToken]);
}
