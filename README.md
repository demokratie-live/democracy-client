# DEMOCRACY Client

A mobile application that brings the German Bundestag to citizens' smartphones, allowing them to vote on parliamentary procedures and compare their choices with official results.

## Features

- Browse and search official German Bundestag procedures
- Vote on procedures as if you were a member of parliament
- Compare your voting behavior with the community and the Bundestag
- Analyze your agreement with different parties and candidates
- Receive notifications about important parliamentary activities

## Technology Stack

- React Native with Expo Router
- Apollo GraphQL client
- Styled Components
- TypeScript
- Recoil and Zustand for state management
- E2E testing with Maestro
- CI/CD with GitHub Actions

## Getting Started

### Prerequisites

- Node.js
- Yarn package manager (v1.22.19+)
- iOS development environment (for iOS)
  - Xcode
  - CocoaPods
- Android development environment (for Android)
  - Android Studio
  - Android SDK

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/democracy-deutschland/democracy-client.git
   cd democracy-client
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Generate GraphQL types:

   ```bash
   yarn codegen
   ```

4. Start the development server:

   ```bash
   yarn start
   ```

5. Run on specific platforms:
   ```bash
   yarn ios     # Run on iOS simulator
   yarn android # Run on Android emulator
   ```

## Development

- Run type checking: `yarn lint:ts`
- Run linter: `yarn lint`
- Run doctor for Expo issues: `yarn doctor`

## Testing

The project uses Maestro for end-to-end testing. See [Testing Documentation](./docs/TESTING.md) for more information.

Run tests with:

```bash
yarn test:e2e          # Run all E2E tests
yarn test:e2e:smoke    # Run smoke tests only
yarn test:e2e:verification  # Run verification flow tests only
```

## Deployment

This project uses fastlane for both iOS and Android deployments.

- For iOS deployment details, see [iOS Deployment](./docs/deployment/IOS.md)
- For Android deployment details, see [Android Deployment](./docs/deployment/ANDROID.md)

## Project Structure

- `src/`
  - `app/` - Expo Router app directory
  - `components/` - Reusable components
  - `screens/` - Screen components
  - `api/` - API and state management
  - `__generated__/` - Generated GraphQL types
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `data/` - Static data files
  - `types/` - Type definitions
  - `styles/` - Theme and styling configurations
- `.github/` - GitHub workflows and CI configuration
- `.maestro/` - E2E tests
- `deploy/` - Deployment configurations
  - `android/` - Android deployment settings and fastlane setup
  - `ios/` - iOS deployment settings and fastlane setup
- `assets/` - Static assets

## Architecture

For a detailed explanation of the application architecture, see [Architecture Documentation](./docs/ARCHITECTURE.md).

## License

Apache License 2.0

## Contact

[democracy-deutschland.de](https://democracy-deutschland.de)
[contact@democracy-deutschland.de](mailto:contact@democracy-deutschland.de)
