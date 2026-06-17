import {
  NotificationPayload,
  NotificationRoute,
  NotificationRouter,
  PushCategory,
} from "../types/pushNotification";

const LIST_ROUTES: Record<
  Exclude<PushCategory, "outcome">,
  (legislaturePeriod: string) => string
> = {
  top100: (lp) => `/(sidebar)/${lp}/Procedures/Top100`,
  conferenceWeek: (lp) => `/(sidebar)/${lp}/Procedures/Sitzungswoche`,
  conferenceWeekVote: (lp) => `/(sidebar)/${lp}/Procedures/Sitzungswoche`,
};

/**
 * Resolves the navigation target for a push notification payload.
 *
 * Rules:
 * - `top100`              → Top-100 list; if procedureId present: procedure detail on top
 * - `conferenceWeek`      → Sitzungswoche list only (bulk push, procedureId is irrelevant)
 * - `conferenceWeekVote`  → Sitzungswoche list; if procedureId present: procedure detail on top
 * - `outcome`             → procedure detail only (no list context)
 * - unknown + procedureId → procedure detail (fallback)
 * - no actionable data    → null (no navigation)
 */
export function resolveNotificationRoute(
  data: NotificationPayload,
  legislaturePeriod: string,
): NotificationRoute {
  const { category, procedureId } = data;
  const detailRoute = procedureId ? `/procedure/${procedureId}` : undefined;

  switch (category) {
    case "top100": {
      const listRoute = LIST_ROUTES.top100(legislaturePeriod);
      if (detailRoute) {
        return { kind: "listAndDetail", listRoute, detailRoute };
      }
      return { kind: "list", listRoute };
    }

    case "conferenceWeek":
      // Bulk push – procedureId is just the first of many; open the list only
      return {
        kind: "list",
        listRoute: LIST_ROUTES.conferenceWeek(legislaturePeriod),
      };

    case "conferenceWeekVote": {
      const listRoute = LIST_ROUTES.conferenceWeekVote(legislaturePeriod);
      if (detailRoute) {
        return { kind: "listAndDetail", listRoute, detailRoute };
      }
      return { kind: "list", listRoute };
    }

    case "outcome":
      if (detailRoute) {
        return { kind: "detail", detailRoute };
      }
      return null;

    default:
      if (detailRoute) {
        return { kind: "detail", detailRoute };
      }
      return null;
  }
}

function withE2EMarker(route: string, marker?: string): string {
  if (!marker) {
    return route;
  }

  const separator = route.includes("?") ? "&" : "?";
  return `${route}${separator}e2e=${encodeURIComponent(marker)}`;
}

export function attachNotificationE2EMarker(
  route: NonNullable<NotificationRoute>,
  marker?: string,
): NonNullable<NotificationRoute> {
  switch (route.kind) {
    case "list":
      return {
        ...route,
        listRoute: withE2EMarker(route.listRoute, marker),
      };
    case "listAndDetail":
      return {
        ...route,
        detailRoute: withE2EMarker(route.detailRoute, marker),
      };
    case "detail":
      return {
        ...route,
        detailRoute: withE2EMarker(route.detailRoute, marker),
      };
  }
}

export function applyNotificationRoute(
  router: NotificationRouter,
  route: NonNullable<NotificationRoute>,
): void {
  switch (route.kind) {
    case "list":
      router.navigate(route.listRoute);
      break;
    case "listAndDetail":
      router.navigate(route.listRoute);
      if (router.schedule) {
        router.schedule(() => {
          router.push(route.detailRoute);
        });
      } else {
        router.push(route.detailRoute);
      }
      break;
    case "detail":
      router.push(route.detailRoute);
      break;
  }
}
