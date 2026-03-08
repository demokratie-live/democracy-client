/// <reference types="jest" />

// `__DEV__` is a React-Native global that babel-preset-expo does not define
// when running under plain babel-jest with testEnvironment: node.
(globalThis as any).__DEV__ = false;

// Mock external dependencies so the module can be loaded in a Node test environment.
jest.mock("react", () => ({
  useEffect: jest.fn(),
  useRef: jest.fn(() => ({ current: null })),
}));
jest.mock("react-native", () => ({
  InteractionManager: { runAfterInteractions: jest.fn() },
}));
jest.mock("expo-router", () => ({ useRouter: jest.fn() }));
jest.mock("expo-notifications", () => ({}));
jest.mock("../../api/state/legislaturePeriod", () => ({
  useLegislaturePeriodStore: jest.fn(() => ({ legislaturePeriod: "21" })),
}));

import {
  extractPayload,
  isNotificationPayload,
} from "../useNotificationDeepLink";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Builds a minimal mock NotificationResponse with the given content data and trigger. */
function makeResponse(opts: {
  data?: Record<string, unknown> | null;
  trigger?: Record<string, unknown> | null;
}): Parameters<typeof extractPayload>[0] {
  return {
    notification: {
      request: {
        identifier: "test-id",
        content: {
          title: null,
          subtitle: null,
          body: null,
          data: opts.data ?? null,
          sound: null,
          badge: null,
          attachments: [],
          categoryIdentifier: "",
          launchImageName: "",
        },
        trigger: opts.trigger ?? null,
      },
      date: Date.now(),
    },
    actionIdentifier: "expo.modules.notifications.actions.DEFAULT",
  } as unknown as Parameters<typeof extractPayload>[0];
}

/** A valid DEMOCRACY push payload with all three key fields. */
const VALID_PAYLOAD = {
  type: "procedure",
  category: "top100",
  procedureId: "21-12345",
} as const;

// ---------------------------------------------------------------------------
// isNotificationPayload
// ---------------------------------------------------------------------------

describe("isNotificationPayload", () => {
  it("returns true for a valid payload with type, category and procedureId", () => {
    expect(isNotificationPayload(VALID_PAYLOAD)).toBe(true);
  });

  it("returns true for type + category without procedureId", () => {
    expect(
      isNotificationPayload({ type: "procedure", category: "outcome" }),
    ).toBe(true);
  });

  it("returns true for type + procedureId without category", () => {
    expect(
      isNotificationPayload({ type: "procedureBulk", procedureId: "21-999" }),
    ).toBe(true);
  });

  it("returns false when type is missing", () => {
    expect(
      isNotificationPayload({ category: "top100", procedureId: "21-12345" }),
    ).toBe(false);
  });

  it("returns false when type is not a recognised VALID_TYPES value", () => {
    expect(
      isNotificationPayload({
        type: "unknown",
        category: "top100",
        procedureId: "21-12345",
      }),
    ).toBe(false);
  });

  it("returns false when type is present but neither category nor procedureId is", () => {
    expect(isNotificationPayload({ type: "procedure" })).toBe(false);
  });

  it("returns false for null input", () => {
    expect(isNotificationPayload(null as any)).toBe(false);
  });

  it("returns false for undefined input", () => {
    expect(isNotificationPayload(undefined as any)).toBe(false);
  });

  it("returns false for a string input", () => {
    expect(isNotificationPayload("hello" as any)).toBe(false);
  });

  it("returns false for a number input", () => {
    expect(isNotificationPayload(42 as any)).toBe(false);
  });

  it("returns true even when optional fields (title, message, action) are missing", () => {
    expect(
      isNotificationPayload({ type: "procedure", category: "conferenceWeek" }),
    ).toBe(true);
  });

  it("accepts procedureBulk as a valid type", () => {
    expect(
      isNotificationPayload({
        type: "procedureBulk",
        category: "conferenceWeek",
      }),
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// extractPayload
// ---------------------------------------------------------------------------

describe("extractPayload", () => {
  describe("content.data path (primary)", () => {
    it("extracts payload from content.data", () => {
      const response = makeResponse({ data: { ...VALID_PAYLOAD } });
      expect(extractPayload(response)).toEqual(VALID_PAYLOAD);
    });

    it("returns null when content.data exists but lacks a valid type", () => {
      const response = makeResponse({
        data: { category: "top100", procedureId: "21-12345" },
      });
      expect(extractPayload(response)).toBeNull();
    });
  });

  describe("trigger.payload path (iOS APNs remote)", () => {
    it("extracts payload from trigger.payload when content.data is empty", () => {
      const response = makeResponse({
        data: null,
        trigger: {
          type: "push",
          payload: { ...VALID_PAYLOAD },
        },
      });
      expect(extractPayload(response)).toEqual(VALID_PAYLOAD);
    });

    it("extracts payload from trigger.payload when content.data has no valid fields", () => {
      const response = makeResponse({
        data: { irrelevant: true },
        trigger: {
          type: "push",
          payload: { ...VALID_PAYLOAD },
        },
      });
      expect(extractPayload(response)).toEqual(VALID_PAYLOAD);
    });
  });

  describe("trigger.remoteMessage.data path (Android FCM)", () => {
    it("extracts payload from trigger.remoteMessage.data when other paths are empty", () => {
      const response = makeResponse({
        data: null,
        trigger: {
          type: "push",
          remoteMessage: {
            data: { ...VALID_PAYLOAD },
          },
        },
      });
      expect(extractPayload(response)).toEqual(VALID_PAYLOAD);
    });

    it("extracts from remoteMessage.data when content.data and trigger.payload are both invalid", () => {
      const response = makeResponse({
        data: { unrelated: "value" },
        trigger: {
          type: "push",
          payload: { noType: true },
          remoteMessage: {
            data: { ...VALID_PAYLOAD },
          },
        },
      });
      expect(extractPayload(response)).toEqual(VALID_PAYLOAD);
    });
  });

  describe("returns null for unextractable notifications", () => {
    it("returns null when notification has no payload data at all", () => {
      const response = makeResponse({ data: null, trigger: null });
      expect(extractPayload(response)).toBeNull();
    });

    it("returns null when content.data is a non-object", () => {
      const response = makeResponse({ data: "string" as any });
      expect(extractPayload(response)).toBeNull();
    });

    it("returns null when payload exists but is missing type field everywhere", () => {
      const response = makeResponse({
        data: { category: "top100" },
        trigger: {
          payload: { category: "top100" },
          remoteMessage: { data: { category: "top100" } },
        },
      });
      expect(extractPayload(response)).toBeNull();
    });

    it("returns null when trigger.remoteMessage.data is not an object", () => {
      const response = makeResponse({
        data: null,
        trigger: {
          remoteMessage: { data: "not-an-object" },
        },
      });
      expect(extractPayload(response)).toBeNull();
    });

    it("returns null when trigger.remoteMessage itself is not an object", () => {
      const response = makeResponse({
        data: null,
        trigger: {
          remoteMessage: "bad",
        },
      });
      expect(extractPayload(response)).toBeNull();
    });

    it("returns null when trigger.payload is not an object", () => {
      const response = makeResponse({
        data: null,
        trigger: { payload: "string" },
      });
      expect(extractPayload(response)).toBeNull();
    });
  });

  describe("prioritisation", () => {
    it("content.data takes precedence over trigger.payload", () => {
      const contentPayload = {
        type: "procedure" as const,
        category: "top100",
        procedureId: "21-content",
      };
      const triggerPayload = {
        type: "procedure" as const,
        category: "outcome",
        procedureId: "21-trigger",
      };

      const response = makeResponse({
        data: contentPayload,
        trigger: { payload: triggerPayload },
      });

      expect(extractPayload(response)).toEqual(contentPayload);
    });

    it("content.data takes precedence over trigger.remoteMessage.data", () => {
      const contentPayload = {
        type: "procedureBulk" as const,
        category: "conferenceWeek",
        procedureId: "21-content",
      };
      const androidPayload = {
        type: "procedure" as const,
        category: "outcome",
        procedureId: "21-android",
      };

      const response = makeResponse({
        data: contentPayload,
        trigger: { remoteMessage: { data: androidPayload } },
      });

      expect(extractPayload(response)).toEqual(contentPayload);
    });

    it("trigger.payload takes precedence over trigger.remoteMessage.data", () => {
      const iosPayload = {
        type: "procedure" as const,
        category: "top100",
        procedureId: "21-ios",
      };
      const androidPayload = {
        type: "procedure" as const,
        category: "outcome",
        procedureId: "21-android",
      };

      const response = makeResponse({
        data: null,
        trigger: {
          payload: iosPayload,
          remoteMessage: { data: androidPayload },
        },
      });

      expect(extractPayload(response)).toEqual(iosPayload);
    });
  });
});
