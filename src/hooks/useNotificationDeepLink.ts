import { useEffect, useRef } from "react";
import { InteractionManager } from "react-native";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { useLegislaturePeriodStore } from "../api/state/legislaturePeriod";
import {
  applyNotificationRoute,
  resolveNotificationRoute,
} from "../lib/notificationRouting";
import { NotificationPayload, NotificationRouter } from "../types/pushNotification";

const VALID_TYPES = ["procedure", "procedureBulk"] as const;

/**
 * Runtime type guard for DEMOCRACY notification payloads.
 * Checks that the object looks like a DEMOCRACY push — not just any APNs
 * payload that happens to have an `aps.category` field.
 */
export function isNotificationPayload(
  obj: Record<string, unknown>,
): boolean {
  if (obj == null || typeof obj !== "object") return false;

  const hasType =
    typeof obj.type === "string" &&
    VALID_TYPES.includes(obj.type as (typeof VALID_TYPES)[number]);
  const hasCategory = typeof obj.category === "string";
  const hasProcedureId = typeof obj.procedureId === "string";

  // A DEMOCRACY payload always carries `type` alongside category/procedureId.
  // Requiring `type` prevents collision with iOS `aps.category`.
  return hasType && (hasCategory || hasProcedureId);
}

/**
 * Extracts the NotificationPayload from a notification response.
 *
 * For remote APNs notifications, custom payload fields may be in
 * `content.data`, in the root of the notification `request`, or
 * (on iOS) in the raw `userInfo`. This function checks all paths.
 */
export function extractPayload(
  response: Notifications.NotificationResponse,
): NotificationPayload | null {
  const content = response.notification.request.content;

  if (__DEV__) {
    console.log(
      "[NotificationDeepLink] Full response:",
      JSON.stringify(
        {
          data: content.data,
          title: content.title,
          body: content.body,
          trigger: response.notification.request.trigger,
        },
        null,
        2,
      ),
    );
  }

  // Primary path: content.data (works for local + Expo Push Service notifications)
  if (content.data && typeof content.data === "object") {
    const d = content.data as Record<string, unknown>;
    if (isNotificationPayload(d)) {
      if (__DEV__) {
        console.log("[NotificationDeepLink] Payload from content.data:", d);
      }
      return d as unknown as NotificationPayload;
    }
  }

  // Fallback for remote APNs: check the trigger's payload/remoteMessage
  const trigger = response.notification.request.trigger;
  if (trigger && typeof trigger === "object") {
    const t = trigger as Record<string, unknown>;

    // iOS: PushNotificationTrigger has `payload` with the raw APNs userInfo
    if (t.payload && typeof t.payload === "object") {
      const payload = t.payload as Record<string, unknown>;
      if (isNotificationPayload(payload)) {
        if (__DEV__) {
          console.log(
            "[NotificationDeepLink] Payload from trigger.payload:",
            payload,
          );
        }
        return payload as unknown as NotificationPayload;
      }
    }

    // Android: might have remoteMessage
    if (t.remoteMessage && typeof t.remoteMessage === "object") {
      const rm = t.remoteMessage as Record<string, unknown>;
      if (rm.data && typeof rm.data === "object") {
        const data = rm.data as Record<string, unknown>;
        if (isNotificationPayload(data)) {
          if (__DEV__) {
            console.log(
              "[NotificationDeepLink] Payload from trigger.remoteMessage.data:",
              data,
            );
          }
          return data as unknown as NotificationPayload;
        }
      }
    }
  }

  if (__DEV__) {
    console.warn(
      "[NotificationDeepLink] Could not extract payload from notification.",
      "content.data:",
      content.data,
      "trigger:",
      JSON.stringify(trigger),
    );
  }

  return null;
}

function navigateFromNotification(
  router: ReturnType<typeof useRouter>,
  response: Notifications.NotificationResponse,
  legislaturePeriod: string,
): void {
  const data = extractPayload(response);
  if (!data) {
    if (__DEV__) {
      console.warn("[NotificationDeepLink] No actionable payload, skipping navigation.");
    }
    return;
  }

  const route = resolveNotificationRoute(data, legislaturePeriod);
  if (!route) return;

  const notificationRouter: NotificationRouter = {
    navigate: (route) => {
      router.navigate(route as Parameters<typeof router.navigate>[0]);
    },
    push: (route) => {
      router.push(route as Parameters<typeof router.push>[0]);
    },
    schedule: (task) => {
      InteractionManager.runAfterInteractions(task);
    },
  };

  applyNotificationRoute(notificationRouter, route);
}

/**
 * Handles navigation to the appropriate screen when a push notification is tapped.
 *
 * Routing by category:
 * - `top100`             → Top-100 list; procedure detail on top if procedureId present
 * - `conferenceWeek`     → Sitzungswoche list (bulk push, no drill-in)
 * - `conferenceWeekVote` → Sitzungswoche list; procedure detail on top if procedureId present
 * - `outcome`            → procedure detail directly
 * - fallback             → procedure detail directly
 *
 * Covers both foreground/background taps and cold-start (app launched via notification).
 */
export function useNotificationDeepLink(): void {
  const router = useRouter();
  const { legislaturePeriod } = useLegislaturePeriodStore();
  // Dedup: both getLastNotificationResponseAsync and the listener can fire
  // for the same tap on cold-start. Track the handled identifier to prevent
  // double navigation.
  const handledIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const lp = legislaturePeriod ?? "";

    const handleResponse = (response: Notifications.NotificationResponse) => {
      if (!isActive) return;
      const id = response.notification.request.identifier;
      if (handledIdRef.current === id) return;
      handledIdRef.current = id;
      navigateFromNotification(router, response, lp);
    };

    // Cold-start: app opened from a killed state via notification tap
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) handleResponse(response);
    });

    // Foreground / background tap
    const subscription =
      Notifications.addNotificationResponseReceivedListener(handleResponse);

    return () => {
      isActive = false;
      Notifications.removeNotificationSubscription(subscription);
    };
  }, [router, legislaturePeriod]);
}
