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

E2E tests are integrated into the GitHub Actions workflow to ensure automated testing on each push to main branch and can be manually triggered on any branch.

### Manual E2E Test Execution

You can manually trigger E2E tests on any branch using GitHub Actions:

1. Go to the **Actions** tab in the GitHub repository
2. Select the **🧪 E2E Tests** workflow
3. Click **Run workflow**
4. Choose your options:
   - **Test type**: `smoke`, `verification`, or `all`
   - **Platform**: `ios`, `android`, or `both` (currently only iOS is fully supported)
5. Click **Run workflow** to start the tests

This allows for testing feature branches and specific scenarios without waiting for merge to main.