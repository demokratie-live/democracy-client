import { useEffect, useRef } from "react";
import { InteractionManager } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { useLegislaturePeriodStore } from "../../api/state/legislaturePeriod";
import {
  applyNotificationRoute,
  attachNotificationE2EMarker,
  resolveNotificationRoute,
} from "../../lib/notificationRouting";
import type {
  NotificationPayload,
  NotificationRouter,
} from "../../types/pushNotification";

/** Default delay before falling back to URL-param routing (ms). */
const FALLBACK_DELAY_MS = 2000;

/**
 * Dev-only screen for E2E testing push notification deep links.
 *
 * Schedules a LOCAL notification with the exact production data shape,
 * listens for delivery, extracts data from the received notification
 * (proving data integrity through the expo-notifications pipeline),
 * and routes using the same production routing logic.
 *
 * If the notification pipeline is unavailable (e.g. permissions not granted),
 * a fallback routes directly from URL params after a short timeout.
 *
 * The E2EMarker testID includes a suffix indicating which path was taken:
 * - `-via-notification`: notification pipeline delivered the data
 * - `-via-fallback`: fallback timer fired (notification pipeline unavailable)
 *
 * Usage from Maestro:
 *   openLink: democracy:///pushNotificationTest?category=top100&procedureId=327971&e2e=push-top100
 *   openLink: democracy:///pushNotificationTest?category=top100&procedureId=327971&e2e=push-top100&fallbackMs=5000
 */
export default function PushNotificationTestScreen() {
  const params = useLocalSearchParams<{
    category?: NotificationPayload["category"];
    procedureId?: string;
    e2e?: string;
    fallbackMs?: string;
  }>();
  const router = useRouter();
  const { legislaturePeriod } = useLegislaturePeriodStore();
  const hasHandled = useRef(false);

  useEffect(() => {
    if (hasHandled.current) return;

    const lp = legislaturePeriod ?? "";
    const fallbackDelay = params.fallbackMs
      ? parseInt(params.fallbackMs, 10) || FALLBACK_DELAY_MS
      : FALLBACK_DELAY_MS;

    function routeWithData(
      data: NotificationPayload,
      source: "notification" | "fallback",
    ): void {
      if (hasHandled.current) return;

      const resolvedRoute = resolveNotificationRoute(data, lp);
      if (!resolvedRoute) return;

      hasHandled.current = true;

      const markerWithSource = params.e2e
        ? `${params.e2e}-via-${source}`
        : undefined;
      const route = attachNotificationE2EMarker(resolvedRoute, markerWithSource);

      const notificationRouter: NotificationRouter = {
        navigate: (targetRoute) => {
          router.navigate(
            targetRoute as Parameters<typeof router.navigate>[0],
          );
        },
        push: (targetRoute) => {
          router.push(targetRoute as Parameters<typeof router.push>[0]);
        },
        schedule: (task) => {
          InteractionManager.runAfterInteractions(task);
        },
      };

      applyNotificationRoute(notificationRouter, route);
    }

    // Primary path: listen for notification delivery through the pipeline.
    //
    // NOTE: E2E uses addNotificationReceivedListener (delivery) instead of
    // addNotificationResponseReceivedListener (user tap) because Maestro
    // cannot interact with the iOS notification tray. Production uses the
    // response listener in useNotificationDeepLink.ts. This intentionally
    // verifies the data pipeline, not the tap gesture.
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        clearTimeout(fallbackTimeout);
        const data = notification.request.content.data as
          | NotificationPayload
          | undefined;
        if (data?.category) {
          routeWithData(data, "notification");
        }
      },
    );

    // Fallback: route directly from URL params if notification doesn't arrive
    // within the configured delay (e.g. permissions not granted on simulator).
    const fallbackTimeout = setTimeout(() => {
      routeWithData(
        {
          category: params.category,
          procedureId: params.procedureId,
        },
        "fallback",
      );
    }, fallbackDelay);

    // Schedule local notification with production data shape — no permission
    // dialog; if permissions are missing the fallback above handles it.
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Push Test: ${params.category ?? "unknown"}`,
        body: `Testing ${params.category ?? "unknown"} notification routing`,
        data: {
          category: params.category,
          procedureId: params.procedureId,
          type:
            params.category === "conferenceWeek"
              ? "procedureBulk"
              : "procedure",
          action:
            params.category === "conferenceWeek"
              ? "procedureBulk"
              : "procedure",
          title: `Push Test: ${params.category ?? "unknown"}`,
          message: `Testing ${params.category ?? "unknown"} notification routing`,
        } satisfies NotificationPayload,
        sound: "push.aiff",
      },
      trigger: null,
    }).catch((e) => {
      if (__DEV__) console.warn("[PushNotificationTest] Schedule failed:", e);
    });

    return () => {
      Notifications.removeNotificationSubscription(subscription);
      clearTimeout(fallbackTimeout);
    };
  }, [
    params.category,
    params.procedureId,
    params.e2e,
    params.fallbackMs,
    legislaturePeriod,
    router,
  ]);

  return null;
}
