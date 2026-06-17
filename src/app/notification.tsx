import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { InteractionManager } from "react-native";
import { useLegislaturePeriodStore } from "../api/state/legislaturePeriod";
import {
  attachNotificationE2EMarker,
  applyNotificationRoute,
  resolveNotificationRoute,
} from "../lib/notificationRouting";
import type { NotificationPayload, NotificationRouter } from "../types/pushNotification";

/**
 * Reserved route for democracy://notification links.
 *
 * This keeps custom-scheme notification routing deterministic for E2E and reuses
 * the same pure resolveNotificationRoute() logic as the production push handler.
 */
export default function NotificationDeepLinkScreen() {
  const params = useLocalSearchParams<{
    category?: NotificationPayload["category"];
    procedureId?: string;
    e2e?: string;
  }>();
  const router = useRouter();
  const { legislaturePeriod } = useLegislaturePeriodStore();

  useEffect(() => {
    const lp = legislaturePeriod ?? "";
    const resolvedRoute = resolveNotificationRoute(
      { category: params.category, procedureId: params.procedureId },
      lp,
    );

    if (!resolvedRoute) {
      return;
    }

    const route = attachNotificationE2EMarker(resolvedRoute, params.e2e);

    const notificationRouter: NotificationRouter = {
      navigate: (targetRoute) => {
        router.navigate(targetRoute as Parameters<typeof router.navigate>[0]);
      },
      push: (targetRoute) => {
        router.push(targetRoute as Parameters<typeof router.push>[0]);
      },
      schedule: (task) => {
        InteractionManager.runAfterInteractions(task);
      },
    };

    applyNotificationRoute(notificationRouter, route);
  }, [params.category, params.procedureId, params.e2e, legislaturePeriod, router]);

  return null;
}
