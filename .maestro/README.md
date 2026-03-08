# E2E Tests with Maestro

This directory contains end-to-end tests using Maestro for the DEMOCRACY app.

## Prerequisites

1. Install Maestro:
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

2. Make sure you have either:
   - An iOS Simulator running (for iOS tests)
   - An Android Emulator running (for Android tests)

3. For push notification tests: the app must be built with `E2E_FIXTURES=true`

## Running Tests

Run all tests:
```bash
pnpm test:e2e
```

Run specific test categories:
```bash
pnpm test:e2e:smoke                # Basic app launch
pnpm test:e2e:verification         # Phone verification flow
pnpm test:e2e:rating               # In-app rating
pnpm test:e2e:push-notification    # Push notification deep links (requires fixture build)
```

Real-device APNs smoke tests are separate from this Maestro suite. See `docs/TESTING.md` for `pnpm push:notification:device`.

## Test Architecture

Tests follow a two-tier architecture with core flows and specialized suites:

### Core Flows
| Flow | Description |
|------|-------------|
| `smoke.yaml` | Basic app launch and navigation |
| `verification.yaml` | Phone verification flow |
| `rating.yaml` | In-app rating entry point via sidebar |

### Suite A — Deep Link Routing (no notification pipeline)
Tests that use `openLink` to navigate via `democracy:///notification?...` URL scheme.
Routes through `src/app/notification.tsx` (pure routing, no expo-notifications API).

| Flow | Category | Target |
|------|----------|--------|
| `deeplink.yaml` | — | Procedure detail (direct) |
| `deeplink-cold-start.yaml` | — | Procedure detail (cold start) |
| `notification-top100.yaml` | top100 | Procedure detail via Top100 list |
| `notification-conference-week.yaml` | conferenceWeek | Sitzungswoche list |
| `notification-sitzungswoche-vote.yaml` | conferenceWeekVote | Procedure detail via Sitzungswoche |
| `notification-outcome.yaml` | outcome | Procedure detail (direct) |

### Suite B — Push Notification Pipeline (with expo-notifications)
Tests that use `openLink` to navigate via `democracy:///pushNotificationTest?...`.
Routes through `src/app/(dev)/pushNotificationTest.tsx` which schedules a local notification,
verifies delivery, and routes using production logic.

| Flow | Category | Target | Screenshots |
|------|----------|--------|-------------|
| `push-notification-top100.yaml` | top100 | Procedure detail | 2 |
| `push-notification-conference-week.yaml` | conferenceWeek | Sitzungswoche list | 2 |
| `push-notification-conference-week-vote.yaml` | conferenceWeekVote | Procedure detail | 2 |
| `push-notification-outcome.yaml` | outcome | Procedure detail | 2 |

### Edge Cases
| Flow | Scenario | Expected |
|------|----------|----------|
| `edge-case-missing-procedureid.yaml` | Outcome without procedureId | Stays on home (graceful no-op) |
| `edge-case-unknown-category.yaml` | Unknown category + procedureId | Fallback to procedure detail |
| `edge-case-top100-list-only.yaml` | top100 without procedureId | Top100 list only (no drill-in) |
| `edge-case-conference-week-ignores-procedureid.yaml` | conferenceWeek with procedureId | Sitzungswoche list only (procedureId ignored) |

## E2EMarker Pattern

Each test flow passes an `e2e` parameter in the deep link URL. Target screens render an invisible
`View` with `testID={E2EMarker-${e2e}}`. Maestro asserts visibility of this marker to verify
that the production routing logic executed correctly.

## Configuration

The `config.yaml` in this directory contains general Maestro configuration settings
(`appId`, `max_retries`, `device_type`). Modify as needed for your testing environment.
