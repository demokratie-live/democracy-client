import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";

function navigateToProcedure(
  router: ReturnType<typeof useRouter>,
  data: Record<string, unknown>,
): void {
  const procedureId = data?.procedureId;
  if (typeof procedureId === "string" && procedureId) {
    router.push(`/procedure/${procedureId}`);
  }
}

/**
 * Handles navigation to a procedure screen when a push notification is tapped.
 * Covers both foreground/background taps and cold-start (app launched via notification).
 *
 * Assumes the notification payload contains `data.procedureId`.
 */
export function useNotificationDeepLink(): void {
  const router = useRouter();

  useEffect(() => {
    // Cold-start: app opened from a killed state via notification tap
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        navigateToProcedure(
          router,
          response.notification.request.content.data as Record<
            string,
            unknown
          >,
        );
      }
    });

    // Foreground / background tap
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        navigateToProcedure(
          router,
          response.notification.request.content.data as Record<
            string,
            unknown
          >,
        );
      },
    );

    return () => {
      Notifications.removeNotificationSubscription(subscription);
    };
  }, [router]);
}
