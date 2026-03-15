/// <reference types="jest" />

(globalThis as any).__DEV__ = false;

// ---------------------------------------------------------------------------
// Mocks — all state MUST live inside the factory (jest.mock hoisting rule)
// ---------------------------------------------------------------------------

jest.mock("expo-notifications", () => ({
  getDevicePushTokenAsync: jest.fn(),
}));

jest.mock("../../__generated__/graphql", () => ({
  useAddTokenMutation: jest.fn(() => [jest.fn()]),
}));

jest.mock("react", () => {
  const _refs: { current: unknown }[] = [];
  let _refIndex = 0;
  const _effectCallbacks: (() => void | (() => void))[] = [];

  return {
    useEffect: (cb: () => void | (() => void)) => {
      _effectCallbacks.push(cb);
    },
    useRef: (initial: unknown) => {
      if (_refIndex >= _refs.length) {
        _refs.push({ current: initial });
      }
      const ref = _refs[_refIndex];
      _refIndex++;
      return ref;
    },
    __effects: _effectCallbacks,
    __resetRefIndex: () => {
      _refIndex = 0;
    },
    __resetRefs: () => {
      _refs.length = 0;
      _refIndex = 0;
    },
  };
});

jest.mock("react-native", () => ({
  Platform: { OS: "ios" },
}));

// eslint-disable-next-line import/first -- must come after jest.mock
import { useDeviceTokenRegistration } from "../useDeviceTokenRegistration";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Notifications = require("expo-notifications");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const graphql = require("../../__generated__/graphql");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const react = require("react");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let mockAddToken: jest.Mock;

function resetHookState() {
  react.__resetRefs();
  react.__effects.length = 0;
  Notifications.getDevicePushTokenAsync.mockReset();

  mockAddToken = jest.fn();
  graphql.useAddTokenMutation.mockReturnValue([mockAddToken]);
}

function runEffects() {
  const cbs = [...react.__effects];
  react.__effects.length = 0;
  for (const cb of cbs) cb();
}

function callHook(permissionStatus: string | null) {
  react.__resetRefIndex();
  react.__effects.length = 0;
  // eslint-disable-next-line react-hooks/rules-of-hooks -- test helper invokes hook outside component
  useDeviceTokenRegistration(permissionStatus as any);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useDeviceTokenRegistration", () => {
  beforeEach(() => {
    resetHookState();
  });

  it("does NOT fetch token when permission is null", () => {
    callHook(null);
    runEffects();

    expect(Notifications.getDevicePushTokenAsync).not.toHaveBeenCalled();
  });

  it("does NOT fetch token when permission is denied", () => {
    callHook("denied");
    runEffects();

    expect(Notifications.getDevicePushTokenAsync).not.toHaveBeenCalled();
  });

  it("does NOT fetch token when permission is undetermined", () => {
    callHook("undetermined");
    runEffects();

    expect(Notifications.getDevicePushTokenAsync).not.toHaveBeenCalled();
  });

  it("fetches device token when permission is granted", () => {
    Notifications.getDevicePushTokenAsync.mockResolvedValue({
      data: "device-token-abc",
    });
    mockAddToken.mockResolvedValue({ data: { addToken: { succeeded: true } } });

    callHook("granted");
    runEffects();

    expect(Notifications.getDevicePushTokenAsync).toHaveBeenCalledTimes(1);
  });

  it("calls addToken with correct variables when token is fetched", async () => {
    Notifications.getDevicePushTokenAsync.mockResolvedValue({
      data: "device-token-abc",
    });
    mockAddToken.mockResolvedValue({ data: { addToken: { succeeded: true } } });

    callHook("granted");
    runEffects();

    await Promise.resolve();
    await Promise.resolve();

    expect(mockAddToken).toHaveBeenCalledWith({
      variables: { token: "device-token-abc", os: "ios" },
    });
  });

  it("skips addToken when token has not changed since last registration", async () => {
    Notifications.getDevicePushTokenAsync.mockResolvedValue({
      data: "device-token-abc",
    });
    mockAddToken.mockResolvedValue({ data: { addToken: { succeeded: true } } });

    // First registration
    callHook("granted");
    runEffects();
    await Promise.resolve();
    await Promise.resolve();

    expect(mockAddToken).toHaveBeenCalledTimes(1);

    // Second registration with same token — should be skipped
    mockAddToken.mockClear();
    callHook("granted");
    runEffects();
    await Promise.resolve();
    await Promise.resolve();

    expect(mockAddToken).not.toHaveBeenCalled();
  });

  it("re-registers when token changes", async () => {
    mockAddToken.mockResolvedValue({ data: { addToken: { succeeded: true } } });

    // First token
    Notifications.getDevicePushTokenAsync.mockResolvedValue({
      data: "device-token-abc",
    });
    callHook("granted");
    runEffects();
    await Promise.resolve();
    await Promise.resolve();

    expect(mockAddToken).toHaveBeenCalledTimes(1);

    // Different token
    mockAddToken.mockClear();
    Notifications.getDevicePushTokenAsync.mockResolvedValue({
      data: "device-token-xyz",
    });
    callHook("granted");
    runEffects();
    await Promise.resolve();
    await Promise.resolve();

    expect(mockAddToken).toHaveBeenCalledWith({
      variables: { token: "device-token-xyz", os: "ios" },
    });
  });

  it("does not crash when addToken rejects (error handling)", async () => {
    Notifications.getDevicePushTokenAsync.mockResolvedValue({
      data: "device-token-abc",
    });
    mockAddToken.mockRejectedValue(new Error("Network error"));

    callHook("granted");
    runEffects();

    await Promise.resolve();
    await Promise.resolve();

    expect(mockAddToken).toHaveBeenCalledTimes(1);
  });

  it("does not crash when getDevicePushTokenAsync rejects", async () => {
    Notifications.getDevicePushTokenAsync.mockRejectedValue(
      new Error("No device token available"),
    );

    callHook("granted");
    runEffects();

    await Promise.resolve();

    expect(mockAddToken).not.toHaveBeenCalled();
  });
});
