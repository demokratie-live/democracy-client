# Testing Documentation

This document covers the testing approach and methodologies used in the DEMOCRACY client application.

## E2E Testing with Maestro

End-to-end tests are implemented using Maestro, a mobile UI testing framework.

### Setup

1. Install Maestro:

   ```bash
   curl -Ls "https://get.maestro.mobile.dev" | bash
   ```

2. Make sure you have either:
   - An iOS Simulator running (for iOS tests)
   - An Android Emulator running (for Android tests)

### Running Tests

Run all tests:

```bash
pnpm test:e2e
```

> **Note:** `pnpm test:e2e` runs ALL flows including push notification tests. Push flows require an `E2E_FIXTURES` build. For a clean full run: `rm -rf ios && E2E_FIXTURES=true pnpm test:e2e`

Run specific test flows:

```bash
pnpm test:e2e:smoke                # Run smoke tests
pnpm test:e2e:verification         # Run verification flow tests
pnpm test:e2e:rating               # Run rating flow tests
pnpm test:e2e:push-notification    # Run push notification E2E tests (requires E2E fixture build)
```

### Test Flow Inventory

Tests are located in `.maestro/flows/` and follow a two-tier architecture:

#### Core Flows
- `smoke.yaml`: Basic app launch and navigation
- `verification.yaml`: Phone verification flow
- `rating.yaml`: In-app rating entry point via sidebar

#### Deep Link Routing Tests (Suite A)
Pure routing tests that verify URL schemes navigate to the correct screen. No notification pipeline involved — uses `src/app/notification.tsx` directly.

- `deeplink.yaml`: Direct procedure deep link (`democracy:///procedure/{id}`)
- `deeplink-cold-start.yaml`: Cold-start deep link (app stopped → openLink → assert)
- `notification-top100.yaml`: TOP100 notification route
- `notification-conference-week.yaml`: Sitzungswoche bulk notification route
- `notification-sitzungswoche-vote.yaml`: Sitzungswoche vote notification route
- `notification-outcome.yaml`: Outcome notification route

#### Push Notification Pipeline Tests (Suite B)
Tests that exercise the `expo-notifications` pipeline via `src/app/(dev)/pushNotificationTest.tsx`. Schedules a local notification, verifies data integrity through the pipeline, and routes using production logic.

- `push-notification-top100.yaml`: TOP100 with procedureId → procedure detail
- `push-notification-conference-week.yaml`: Conference week → Sitzungswoche list
- `push-notification-conference-week-vote.yaml`: Conference week vote → procedure detail
- `push-notification-outcome.yaml`: Outcome → procedure detail

Each push-notification flow captures **2 screenshots** (home screen + destination) into `artifacts/maestro/push-notification/`.

#### Edge Case Tests
- `edge-case-missing-procedureid.yaml`: Outcome without procedureId (graceful no-op)
- `edge-case-unknown-category.yaml`: Unknown category with procedureId (fallback to detail)
- `edge-case-top100-list-only.yaml`: top100 without procedureId (list only, no drill-in)
- `edge-case-conference-week-ignores-procedureid.yaml`: conferenceWeek with procedureId (ignored — list only)

### E2EMarker Pattern

Flows pass an `e2e` query parameter through deep links. Target screens render an invisible 1×1 `View` with `testID={E2EMarker-${params.e2e}}`. This proves that the exact production routing logic was executed, not just that a screen appeared.

Push notification flows include a diagnostic suffix:
- `E2EMarker-push-top100-via-notification` — notification pipeline delivered the data
- `E2EMarker-push-top100-via-fallback` — fallback timer fired (notification unavailable)

> **Note:** The Maestro push notification flows assert only the `-via-notification` suffix. The `-via-fallback` path exists for resilience (e.g. when permissions are denied) but is not separately tested in CI.

### Push Notification E2E: Fixture Mode

Push notification tests require deterministic GraphQL data. The `E2E_FIXTURES` build flag enables a custom Apollo `FixtureLink` that returns fixture JSON instead of making network requests.

**Running push notification E2E tests:**

> ⚠️ `pnpm test:e2e:push-notification` sets `E2E_FIXTURES=true` automatically.
> However, the flag is baked in during `expo prebuild`. If the `ios/` directory
> already exists from a non-fixture build, delete it first:
> ```bash
> rm -rf ios && pnpm test:e2e:push-notification
> ```

```bash
# This sets E2E_FIXTURES=true automatically and runs all push notification flows
pnpm test:e2e:push-notification
```

**How it works:**
1. `E2E_FIXTURES=true` is set at prebuild time via `app.config.ts`
2. Apollo Client swaps the production network chain for `FixtureLink`
3. `FixtureLink` matches GraphQL operation names to JSON files in `src/fixtures/e2e/`
4. The conditional `require()` is guarded by `__DEV__ && E2E_FIXTURES` — Metro eliminates the entire FixtureLink branch (including fixture JSON) in production builds since `__DEV__` is a compile-time constant

**Rebuilding after fixture changes:**
```bash
rm -rf ios && E2E_FIXTURES=true npx expo prebuild --platform ios --no-install
cd ios && pod install && cd ..
```

See `src/fixtures/e2e/README.md` for fixture data management and [ARCHITECTURE.md](ARCHITECTURE.md#e2e-fixture-mode-fixturelink) for technical details on the fixture link chain.

### Real Device Push Smoke Testing

Use `pnpm push:notification:device` for manual smoke tests on a physical iOS device. This sends a real APNs HTTP/2 push using the same payload structure as the production cron job.

This is separate from `pnpm test:e2e:push-notification`: the Maestro suite runs local/simulator notification flows, while this script validates the real device delivery + tap path.

```bash
pnpm push:notification:device <device-token>
pnpm push:notification:device <device-token> outcome 327971
pnpm push:notification:device <device-token> top100 327971 "Procedure title"
pnpm push:notification:device <device-token> --all
```

- If `<device-token>` is omitted, the script prompts for it interactively.
- Categories: `top100`, `conferenceWeek`, `conferenceWeekVote`, `outcome`
- `--all` sends all categories with a short delay between pushes
- Optional env vars: `APNS_KEY_PATH`, `APNS_KEY_ID`, `APNS_TEAM_ID`, `APNS_BUNDLE_ID`, `APNS_ENV`
- Optional copy overrides: `PUSH_TEST_PROCEDURE_TITLE`, `PUSH_TEST_TOP100_RANK`, `PUSH_TEST_CONFERENCE_WEEK_COUNT`, `PUSH_TEST_OUTCOME_VOTED`
- Defaults currently target the internal iOS bundle and development APNs

After sending, tap the notification on the device and inspect Metro logs for `[NotificationDeepLink]` output.

## Known Limitations

- **Notification tap path**: E2E uses `addNotificationReceivedListener` (delivery) not `addNotificationResponseReceivedListener` (tap), because Maestro cannot interact with the iOS notification tray. Production uses the tap listener in `useNotificationDeepLink.ts`.
- **Background state testing**: No automated test sends the app to background and taps a notification from the tray. This requires manual testing or real device CI.
- **HTTPS Universal Links**: Not tested via E2E on simulator (requires signed builds + associated domains verification).
- **Real device pushes**: Push notifications on physical devices (via APNs/FCM) are not part of the local Maestro suite. Use `pnpm push:notification:device` for manual smoke testing on a real device.

## CI/CD Integration

E2E tests are integrated into the GitHub Actions workflow. The lint pipeline (`.github/workflows/lint.yaml`) runs `pnpm lint` and `pnpm lint:ts`. E2E tests run via `.github/workflows/e2e-tests.yaml` (Maestro execution is currently commented out — pending CI enablement).

## Writing Tests

When writing new tests:

1. Create a new `.yaml` file in `.maestro/flows/`
2. Use `extendedWaitUntil` with `testID` and `timeout` for app-ready checks (not text-based `assertVisible`)
3. Add the `E2EMarker` pattern for routing verification
4. Add a script to `package.json` if it's a new test category
5. For push notification tests, add corresponding `takeScreenshot` commands for visual verification
