/// <reference types="jest" />

(globalThis as any).__DEV__ = false;

// ---------------------------------------------------------------------------
// Mocks — all state MUST live inside the factory (jest.mock hoisting rule)
// ---------------------------------------------------------------------------

jest.mock("expo-notifications", () => ({
  getPermissionsAsync: jest.fn(),
}));

jest.mock("react", () => {
  const _stateSlots: { value: unknown; setter: (v: unknown) => void }[] = [];
  let _stateIndex = 0;
  const _effectCallbacks: (() => void | (() => void))[] = [];

  return {
    useState: (initial: unknown) => {
      if (_stateIndex >= _stateSlots.length) {
        const slot = {
          value: initial,
          setter: (v: unknown) => {
            slot.value = v;
          },
        };
        _stateSlots.push(slot);
      }
      const slot = _stateSlots[_stateIndex];
      _stateIndex++;
      return [slot.value, slot.setter];
    },
    useEffect: (cb: () => void | (() => void)) => {
      _effectCallbacks.push(cb);
    },
    // Internal accessors for test helpers
    __effects: _effectCallbacks,
    __resetStateIndex: () => {
      _stateIndex = 0;
    },
    __resetAll: () => {
      _effectCallbacks.length = 0;
      _stateSlots.length = 0;
      _stateIndex = 0;
    },
  };
});

jest.mock("react-native", () => ({
  AppState: { currentState: "active" },
}));

// eslint-disable-next-line import/first -- must come after jest.mock
import { usePermissionStatus } from "../usePermissionStatus";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Notifications = require("expo-notifications");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const react = require("react");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function runEffects() {
  const cbs = [...react.__effects];
  react.__effects.length = 0;
  for (const cb of cbs) cb();
}

function callHook(appState: string) {
  react.__resetStateIndex();
  react.__effects.length = 0;
  // eslint-disable-next-line react-hooks/rules-of-hooks -- test helper invokes hook outside component
  return usePermissionStatus(appState as any);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("usePermissionStatus", () => {
  beforeEach(() => {
    react.__resetAll();
    Notifications.getPermissionsAsync.mockReset();
  });

  it("returns null initially before any check", () => {
    Notifications.getPermissionsAsync.mockResolvedValue({ status: "granted" });
    expect(callHook("active")).toBeNull();
  });

  it("calls getPermissionsAsync when appState is active", () => {
    Notifications.getPermissionsAsync.mockResolvedValue({ status: "granted" });

    callHook("active");
    runEffects();

    expect(Notifications.getPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it("does NOT call getPermissionsAsync when appState is background", () => {
    Notifications.getPermissionsAsync.mockResolvedValue({ status: "granted" });

    callHook("background");
    runEffects();

    expect(Notifications.getPermissionsAsync).not.toHaveBeenCalled();
  });

  it("does NOT call getPermissionsAsync when appState is inactive", () => {
    Notifications.getPermissionsAsync.mockResolvedValue({ status: "granted" });

    callHook("inactive");
    runEffects();

    expect(Notifications.getPermissionsAsync).not.toHaveBeenCalled();
  });

  it("updates state to granted after permission check resolves", async () => {
    Notifications.getPermissionsAsync.mockResolvedValue({ status: "granted" });

    callHook("active");
    runEffects();
    await Promise.resolve();

    // Re-render: state should now be "granted"
    expect(callHook("active")).toBe("granted");
  });

  it("updates state to denied when permission is denied", async () => {
    Notifications.getPermissionsAsync.mockResolvedValue({ status: "denied" });

    callHook("active");
    runEffects();
    await Promise.resolve();

    expect(callHook("active")).toBe("denied");
  });
});
