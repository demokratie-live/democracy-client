# Application Architecture

This document provides an overview of the DEMOCRACY client application architecture.

## Overview

The DEMOCRACY client is a cross-platform mobile application built with React Native and Expo. The app follows a component-based architecture with a focus on maintainability, performance, and user experience.

## Technology Stack

- **React Native**: Core framework for building the mobile app
- **Expo**: Development platform for React Native
- **Expo Router**: File-based routing system for navigation
- **Apollo Client**: GraphQL client for data fetching and state management
- **Recoil & Zustand**: State management solutions
- **TypeScript**: Static type checking
- **Styled Components**: Component styling
- **GraphQL**: API communication protocol

## Project Structure

```
src/
├── __generated__/    # Auto-generated TypeScript types for GraphQL
├── api/              # API and state management
│   ├── apollo/       # Apollo Client setup
│   ├── hooks/        # API-related hooks
│   └── state/        # State management
├── app/              # Expo Router app directory
├── components/       # Reusable UI components
├── data/             # Static data files
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── screens/          # Screen components
├── styles/           # Theme and styling
└── types/            # Type definitions
```

## Key Architecture Concepts

### Navigation

The application uses Expo Router for navigation, which provides a file-based routing system. The navigation structure is defined in the `src/app` directory, with each file representing a route.

### Data Flow

1. **GraphQL Operations**: Defined in component files or dedicated query files
2. **Apollo Client**: Executes GraphQL operations against the backend
3. **Component Consumption**: Components use Apollo hooks (useQuery, useMutation) to access data
4. **Local State**: Managed through Apollo Client cache, Recoil, or Zustand

### Component Architecture

Components follow a hierarchical structure:

- **Screen Components**: Top-level components representing entire screens
- **Feature Components**: Components that implement specific features
- **UI Components**: Reusable UI elements like buttons, inputs, etc.

### State Management

The application uses a combination of state management solutions:

- **Apollo Client Cache**: For GraphQL data
- **Recoil**: For shared application state
- **Zustand**: For specific feature state
- **React Context**: For theme, authentication, and other app-wide concerns

### Authentication Flow

1. User enters credentials or verifies phone number
2. Authentication token is stored securely using react-native-keychain
3. Token is attached to GraphQL requests using Apollo Link Context
4. Protected routes check for valid authentication

## App Variants

The application supports different build variants:

- **Production**: Regular user-facing app
- **Internal**: Used for development and testing

These variants are configured through environment variables and the app.config.ts file.

## Testing Strategy

- **End-to-End Testing**: Using Maestro for testing complete user flows
- **Type Checking**: TypeScript for static analysis
- **Visual Regression**: Screenshot comparison with pixelmatch for UI stability

### Push Notification Routing Architecture

Push notifications route through a three-layer pipeline:

1. **Entry Layer**: `src/hooks/useNotificationDeepLink.ts` (production push tap handling), `src/app/notification.tsx` (URL scheme routing), or `src/app/(dev)/pushNotificationTest.tsx` (E2E notification pipeline testing)
2. **Routing Logic**: `src/lib/notificationRouting.ts` — pure function mapping `category` + `procedureId` to navigation targets
3. **Application**: `applyNotificationRoute()` executes navigation via Expo Router

Categories: `top100`, `conferenceWeek`, `conferenceWeekVote`, `outcome`

### E2E Fixture Mode (FixtureLink)

When `E2E_FIXTURES=true` is set at build time, Apollo Client uses a custom `FixtureLink` (`src/api/apollo/FixtureLink.ts`) instead of the production network stack. This provides deterministic GraphQL responses from JSON fixtures in `src/fixtures/e2e/`.

The fixture link chain replaces the production chain:
- **Production**: errorLink → versionLink → appIdLink → authMiddleware → authAfterware → restLink → httpLink
- **E2E Fixtures**: errorLink → fixtureLink

Fixtures are loaded via conditional `require()` guarded by `__DEV__ && E2E_FIXTURES`. Since `__DEV__` is a compile-time constant that is `false` in production, Metro eliminates the entire fixture branch (including all JSON imports) from production bundles.

Dev screens (`src/app/(dev)/`) are gated by `_layout.tsx` which redirects to `/` in production builds, preventing deep-link access to test-only screens.

See [TESTING.md](TESTING.md#push-notification-e2e-fixture-mode) for usage details.

### E2EMarker Verification Pattern

E2E test flows pass an `e2e` query parameter through deep links. Target screens render an invisible `View` with `testID={E2EMarker-${e2e}}`, which Maestro asserts. This proves that the exact production routing logic ran, not just that any screen appeared.

## Performance Considerations

- Apollo Client cache configuration for optimized data fetching
- React memo and useMemo for component optimization
- Proper handling of large lists and data sets
