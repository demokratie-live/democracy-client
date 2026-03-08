import { Redirect, Slot } from "expo-router";

/**
 * Layout guard for dev-only screens.
 *
 * In production builds, `__DEV__` is `false` (compile-time constant eliminated
 * by Metro), so this layout redirects all traffic to the home screen. This
 * prevents deep link access to dev utilities like pushNotificationTest,
 * localData, and pushNotifications in release builds.
 */
export default function DevLayout() {
  if (!__DEV__) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}
