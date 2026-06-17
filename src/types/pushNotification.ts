export type PushCategory =
  | "top100"
  | "conferenceWeek"
  | "conferenceWeekVote"
  | "outcome";

export interface NotificationPayload {
  category?: PushCategory;
  type?: "procedure" | "procedureBulk";
  procedureId?: string;
  title?: string;
  message?: string;
  action?: string;
}

/**
 * Resolved navigation target for a push notification.
 *
 * - `list`          → navigate to the list screen only (e.g. conferenceWeek bulk push)
 * - `listAndDetail` → navigate to the list, then push the procedure detail on top
 * - `detail`        → navigate directly to the procedure detail screen
 */
export type NotificationRoute =
  | { kind: "list"; listRoute: string }
  | { kind: "listAndDetail"; listRoute: string; detailRoute: string }
  | { kind: "detail"; detailRoute: string }
  | null;

export interface NotificationRouter {
  navigate: (route: string) => void;
  push: (route: string) => void;
  schedule?: (task: () => void) => void;
}
