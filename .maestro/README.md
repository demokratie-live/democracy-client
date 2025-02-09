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

## Running Tests

Run all tests:
```bash
yarn test:e2e
```

Run specific test flows:
```bash
yarn test:e2e:smoke      # Run smoke tests
yarn test:e2e:verification   # Run verification flow tests
```

## Test Flows

- `smoke.yaml`: Basic app launch and navigation tests
- `verification.yaml`: Tests the phone verification flow
- `vote.yaml`: Tests the core voting functionality

## Configuration

The `config.yaml` file contains general Maestro configuration settings. Modify device_type and other settings as needed for your testing environment.