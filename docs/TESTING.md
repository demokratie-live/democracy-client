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
yarn test:e2e
```

Run specific test flows:
```bash
yarn test:e2e:smoke      # Run smoke tests
yarn test:e2e:verification   # Run verification flow tests
```

### Test Flows

- `smoke.yaml`: Basic app launch and navigation tests
- `verification.yaml`: Tests the phone verification flow

### Test Structure

Tests are located in the `.maestro/flows/` directory and are organized by feature or flow. Each test file is a YAML configuration defining the test steps and assertions.

### Writing Tests

When writing new tests:
1. Create a new `.yaml` file in the `.maestro/flows/` directory
2. Define test steps using Maestro's YAML syntax
3. Add appropriate assertions to verify the functionality
4. Add a script to `package.json` to run your specific test

## CI/CD Integration

E2E tests are integrated into the GitHub Actions workflow to ensure automated testing on each pull request and deploy.