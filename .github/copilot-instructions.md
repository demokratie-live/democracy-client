# DEMOCRACY Client - GitHub Copilot Instructions

**ALWAYS FOLLOW THESE INSTRUCTIONS FIRST.** Only use additional search and context gathering if the information here is incomplete or found to be in error.

## Project Overview

DEMOCRACY Client is a React Native mobile application built with Expo that allows German citizens to browse and vote on Bundestag procedures. The app uses GraphQL for data fetching, Expo Router for navigation, and supports both iOS and Android platforms with internal and production build variants.

## Working Effectively

### Prerequisites and Environment Setup
- Node.js (v20+ recommended)
- Yarn package manager (v1.22.19+)
- For iOS development: Xcode and CocoaPods
- For Android development: Android Studio and Android SDK

### Bootstrap the Repository
Always run these commands in order for a fresh setup:

```bash
# Install dependencies - takes ~1 minute
yarn install --frozen-lockfile

# Generate GraphQL types (may fail if external API is unreachable)
yarn codegen
```

**IMPORTANT**: `yarn codegen` requires internet access to `https://internal.api.democracy-app.de`. In restricted environments, this will fail but the app can still be built using existing generated files in `src/__generated__/`.

### Build Commands

**iOS Prebuild** (works without external dependencies):
```bash
# Takes ~2-4 seconds, NEVER CANCEL, timeout: 30 seconds
npx expo prebuild --platform ios --no-install
```

**Android Prebuild** (requires google-services.json):
```bash
# Fails without decrypted google-services.json file
npx expo prebuild --platform android --no-install
```

**Note**: Android builds require `google-services.json` which is encrypted as `google-services.json.gpg`. In CI, this is decrypted using GPG and secrets. For local development, you need to decrypt this file or provide your own Firebase configuration.

### Development Server
```bash
# Start Expo development server - NEVER CANCEL, timeout: 2+ minutes for initial start
yarn start

# Start with localhost only (for testing)
yarn start --localhost

# Platform-specific development - NEVER CANCEL, takes 2-5 minutes initial build
yarn ios      # iOS simulator  
yarn android  # Android emulator
```

**Metro Bundler**: Runs on http://localhost:8081. In CI environments (CI=true), runs in CI mode with reloads disabled. Set CI=false to enable watch mode for development.

## Linting and Code Quality

**NEVER CANCEL THESE COMMANDS** - they complete quickly:

```bash
# ESLint - takes ~6 seconds, NEVER CANCEL, timeout: 30 seconds
yarn lint

# TypeScript type checking - takes ~6 seconds, NEVER CANCEL, timeout: 30 seconds  
yarn lint:ts

# Combined linting workflow - takes ~13 seconds total
yarn lint && yarn lint:ts

# Expo environment check (may fail with network restrictions)
yarn doctor
```

**CRITICAL**: Always run both `yarn lint` and `yarn lint:ts` before committing. The CI pipeline (`.github/workflows/lint.yaml`) will fail if these don't pass.

## Technical Debt Reduction & Best Practices

**PRIORITY**: When making changes, always prioritize reducing technical debt and implementing software design best practices. This is essential for long-term maintainability and code quality.

### Code Quality Standards

**TypeScript Best Practices**:
- Maintain strict TypeScript configuration (`"strict": true` in tsconfig.json)
- Use proper type definitions instead of `any`
- Leverage type inference where possible, explicit types where needed
- Keep auto-generated types in `src/__generated__/` up-to-date with `yarn codegen`

**Component Architecture**:
- **Prefer composition over inheritance** for React components
- **Single Responsibility Principle**: Each component should have one clear purpose
- **Extract reusable logic** into custom hooks in `src/hooks/`
- **Use TypeScript interfaces** for component props and data structures

### Migration Priorities (Technical Debt Reduction)

**ONGOING MIGRATION - Expo Router Implementation**:
- **PREFER**: New screens in `src/app/` directory (Expo Router)
- **AVOID**: Adding new screens to `src/screens/` (legacy structure)
- **WHEN MODIFYING**: Consider migrating legacy screens from `src/screens/` to `src/app/`
- **FILE-BASED ROUTING**: Follow Expo Router conventions for new navigation structure

**State Management Consolidation**:
- **PRIORITY**: Reduce complexity by consolidating state management patterns
- **PREFER**: Apollo Client cache for server state, Zustand for client state
- **AVOID**: Adding new Recoil atoms unless absolutely necessary
- **WHEN MODIFYING**: Consider migrating Recoil state to Zustand or Apollo cache

### Architecture Guidelines

**Component Organization**:
```
src/components/
├── Button/           # Feature-specific components
├── Icons/           # Reusable UI components  
├── ListItem/        # Complex components with sub-components
└── [ComponentName]/  # One directory per major component
```

**API Layer Structure**:
```
src/api/
├── apollo/          # Apollo Client configuration
├── hooks/           # Custom API hooks (useQuery, useMutation wrappers)
└── state/           # Client-side state management
```

**Best Practices for New Code**:
1. **GraphQL Integration**: Use typed hooks from `src/__generated__/graphql.tsx`
2. **Error Handling**: Implement proper error boundaries and loading states
3. **Performance**: Use React.memo, useMemo, useCallback for optimization
4. **Accessibility**: Include proper accessibility props (accessibilityLabel, etc.)
5. **Testing**: Write E2E tests for new user flows in `.maestro/flows/`

### Code Review Checklist

When implementing changes, ensure:
- [ ] TypeScript strict mode compliance (no `any` types)
- [ ] Proper error handling for async operations
- [ ] Consistent naming conventions (camelCase for variables, PascalCase for components)
- [ ] GraphQL queries use generated types from codegen
- [ ] New screens use Expo Router (`src/app/`) instead of legacy structure
- [ ] State management follows established patterns (Apollo for server, Zustand for client)
- [ ] Components are properly typed with TypeScript interfaces
- [ ] Accessibility considerations are implemented
- [ ] Performance optimizations are applied where appropriate

### Legacy Code Improvement

**When modifying existing code**:
1. **Upgrade patterns**: Convert class components to functional components with hooks
2. **Improve types**: Replace `any` types with proper TypeScript definitions
3. **Extract logic**: Move business logic from components to custom hooks
4. **Update imports**: Use proper module resolution with TypeScript paths
5. **Migrate routing**: Convert React Navigation screens to Expo Router when possible

## Testing

### End-to-End Testing with Maestro

**Setup Maestro** (requires internet access):
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH":"$HOME/.maestro/bin"
```

**Run E2E Tests**:
```bash
# All E2E tests - NEVER CANCEL, timeout: 15+ minutes
yarn test:e2e

# Specific test flows - NEVER CANCEL, timeout: 5+ minutes each
yarn test:e2e:smoke        # Basic app functionality
yarn test:e2e:verification # Phone verification flow
```

**Test Files Location**: `.maestro/flows/`
- `smoke.yaml`: Basic app launch and navigation
- `verification.yaml`: Phone verification flow

**Requirements for E2E Tests**:
- iOS Simulator or Android Emulator must be running
- App must be built and installed on the device/emulator
- External API access may be required for full functionality

## Deployment

### iOS Deployment
```bash
cd deploy/ios
# NEVER CANCEL - iOS builds take 10-45 minutes, timeout: 60+ minutes
fastlane ios deploy --env [internal|production]
```

### Android Deployment  
```bash
cd deploy/android
bundle install
# NEVER CANCEL - Android builds take 10-30 minutes, timeout: 45+ minutes
bundle exec fastlane android internal --env [internal|production]
```

**Build Variants**:
- `internal`: Development/testing builds (default)
- `production`: Release builds for app stores

## Common Tasks

The following are outputs from frequently run commands. Reference them instead of viewing, searching, or running bash commands to save time.

### Repository Root Structure
```
/home/runner/work/democracy-client/democracy-client/
├── .github/              # CI/CD workflows and GitHub configuration
│   └── workflows/        # GitHub Actions: lint.yaml, e2e-tests.yaml, deploy.yaml
├── .maestro/            # E2E test configurations
│   ├── flows/           # Test scenarios: smoke.yaml, verification.yaml
│   └── config.yaml      # Maestro configuration
├── assets/              # Static assets (icons, images)
├── deploy/              # Deployment configurations
│   ├── android/         # Android fastlane setup
│   └── ios/             # iOS fastlane setup  
├── docs/                # Documentation
│   ├── ARCHITECTURE.md  # Technical architecture
│   ├── TESTING.md      # Testing guide
│   └── deployment/     # Platform-specific deployment docs
├── src/                 # Source code
│   ├── __generated__/   # Auto-generated GraphQL types
│   ├── api/            # GraphQL and state management
│   ├── app/            # Expo Router navigation structure
│   ├── components/     # Reusable UI components
│   ├── screens/        # Legacy screen components
│   └── ...
├── app.config.ts        # Expo configuration
├── package.json         # Dependencies and scripts
└── yarn.lock           # Lockfile for dependencies
```

### Key Package.json Scripts
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android", 
    "ios": "expo run:ios",
    "web": "expo start --web",
    "codegen": "graphql-codegen --config codegen.yaml",
    "lint": "eslint .",
    "lint:ts": "tsc --noEmit",
    "doctor": "yarn expo-doctor",
    "test:e2e": "maestro test .maestro/flows/",
    "test:e2e:smoke": "maestro test .maestro/flows/smoke.yaml",
    "test:e2e:verification": "maestro test .maestro/flows/verification.yaml"
  }
}
```

### Build Outputs
After running `npx expo prebuild --platform ios`:
- Creates `ios/` directory with Xcode project
- Generates `DEMOCRACY.xcodeproj` and workspace files
- Takes ~2-4 seconds to complete

After running `yarn install`:
- Installs ~2000+ packages in `node_modules/`
- Takes ~60 seconds on first install
- May show peer dependency warnings (expected)

## Key File Locations

### Core Application Code
- `src/app/`: Expo Router navigation structure
- `src/components/`: Reusable UI components  
- `src/screens/`: Screen components (legacy, being migrated to app/)
- `src/api/`: GraphQL queries, mutations, Apollo setup
- `src/__generated__/`: Auto-generated GraphQL TypeScript types

### Configuration Files
- `app.config.ts`: Expo app configuration for different variants
- `package.json`: Dependencies and scripts
- `codegen.yaml`: GraphQL code generation configuration
- `.eslintrc.js`: ESLint configuration

### Build and Deployment
- `.github/workflows/`: CI/CD pipelines
  - `lint.yaml`: Code quality checks
  - `e2e-tests.yaml`: End-to-end testing
  - `deploy.yaml`: App deployment
- `deploy/`: Fastlane configuration for iOS and Android
- `.maestro/`: E2E test configurations

## Validation Scenarios

**CRITICAL**: Always run these validation steps after making changes:

### Essential Validation (Always Required)
1. **Linting and Type Checking**:
   ```bash
   yarn lint && yarn lint:ts
   ```
   NEVER CANCEL - completes in ~12 seconds total

2. **Development Server Test**:
   ```bash
   # Test that Metro bundler starts properly
   timeout 15s yarn start --localhost
   ```
   Look for "Waiting on http://localhost:8081" message

3. **iOS Build Test**:
   ```bash
   # Clean and rebuild iOS project
   rm -rf ios && npx expo prebuild --platform ios --no-install
   ```
   Takes ~2-4 seconds, ensures iOS project can be generated

### Extended Validation (When Possible)
4. **GraphQL Code Generation** (requires external API):
   ```bash
   yarn codegen
   ```
   May fail in restricted environments - use existing generated files

5. **End-to-End Testing** (requires emulator/simulator):
   ```bash
   yarn test:e2e:smoke
   ```
   NEVER CANCEL - takes 5+ minutes, requires device setup

### Manual Testing Scenarios
After making changes, manually test these core workflows:

**Basic App Launch**:
- Run `yarn start` and verify Metro bundler starts
- If testing on device: verify app launches without crashes
- Check for JavaScript errors in Metro logs

**Navigation Testing**:
- Test screen transitions using Expo Router
- Verify deep linking works if modified routing
- Check drawer navigation and tab navigation

**GraphQL Integration**:
- If modifying API calls: verify queries/mutations work
- Check Apollo Client cache behavior
- Test offline scenarios if applicable

**Authentication Flow** (if backend accessible):
- Test phone number verification flow
- Verify token storage and retrieval
- Test protected route access

## Common Issues and Workarounds

### Network Connectivity
- `yarn codegen` fails: External API unreachable - use existing generated files
- `yarn doctor` fails: Expo API unreachable - expected in restricted environments
- Maestro installation fails: Network restrictions - document in instructions

### Build Issues
- Android prebuild fails: Missing `google-services.json` - decrypt GPG file first
- iOS deployment fails: Certificate/provisioning issues - check fastlane match setup
- Metro bundler hangs: Set CI=false to enable watch mode

### Development Environment
- Node.js version: Use v20+ (tested with v20.19.5)
- Yarn version: Use v1.22.19+ (tested with v1.22.22)
- Platform-specific: Install Xcode for iOS, Android Studio for Android

## Architecture Notes

- **Framework**: React Native + Expo (managed workflow)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Apollo Client cache + Recoil + Zustand
- **Styling**: Styled Components
- **API**: GraphQL with Apollo Client
- **Authentication**: JWT tokens stored with react-native-keychain
- **Notifications**: Expo Notifications

The app supports German parliamentary procedure browsing and voting, with features for user verification, data synchronization, and deployment to both iOS App Store and Google Play Store.