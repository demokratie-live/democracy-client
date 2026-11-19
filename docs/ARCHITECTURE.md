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

### In-App Donations (specs/001-in-app-donations)

Donations are a deliberately separate module so that payment data never touches accounts or votes.

- **Transport:** plain REST against `democracy-api` under `/donations/v1` (`src/api/donations/client.ts`),
  **not** GraphQL and **without** the app's auth headers (no device hash, no phone hash, no JWT). The
  server mounts the router before its auth middleware and logs no IPs for these paths.
- **Payment UI:** Stripe PaymentSheet in deferred-intent mode (`src/screens/Donate/usePaymentSheetDonation.ts`).
  The sheet collects the payment method; only after confirmation does the server create the
  PaymentIntent (one-time) or the Billing subscription (monthly). Card data never reaches our servers.
  Available payment methods come from the account's default Stripe payment method configuration.
- **Donor key (monthly):** 32 random bytes (`expo-crypto`), base64url, stored in the keychain
  (`react-native-keychain`, service `de.democracy.donorKey`, `THIS_DEVICE_ONLY`) only after the server
  created the subscription (`src/lib/donorKey.ts`). Sent as `Authorization: DonorKey …` to the
  management endpoints; the server stores only its SHA-256 hash. No link to the DEMOCRACY account.
  On another device, donors manage their subscription via the Stripe customer portal (email login link).
- **Screens/routes:** `Donate` (form, funding status, bank transfer, "Deine Dauerspende" card),
  `DonateThanks`, `DonateManage` (status, amount, payment method via portal in the in-app browser, cancel).
  Deep links `democracy://stripe-redirect…` and `democracy://donate/manage` are consumed in
  `src/app/+native-intent.tsx` without navigation.
- **Config & kill switch:** `GET /donations/v1/config` (publishable key, presets, fees, legal URLs). If it is
  unreachable or `enabled: false`, the app shows only funding status and bank details
  (`useDonationConfig` fallback). Fee preview uses the same integer formula as the server
  (`src/lib/donationFees.ts`); the server's amount is authoritative.
- **Docs:** server runbook in `democracy-api/docs/DONATIONS.md`; build notes in `docs/deployment/IOS.md`
  and `docs/deployment/ANDROID.md`.

## App Variants

The application supports different build variants:

- **Production**: Regular user-facing app
- **Internal**: Used for development and testing

These variants are configured through environment variables and the app.config.ts file.

## Testing Strategy

- **End-to-End Testing**: Using Maestro for testing complete user flows (donations: `.maestro/flows/donate.yaml`, `donate-manage.yaml`)
- **Type Checking**: TypeScript for static analysis

## Performance Considerations

- Apollo Client cache configuration for optimized data fetching
- React memo and useMemo for component optimization
- Proper handling of large lists and data sets
