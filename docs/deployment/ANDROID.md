# Android Deployment

This guide outlines the process of building and deploying the Android app to the Google Play Store.

## Prerequisites

- Java Development Kit (JDK)
- Android SDK
- Access to the Google Play Console
- Ruby environment for fastlane

## Setup

1. Install the required Ruby gems:

```bash
cd deploy/android
bundle install
```

2. Configure environment variables:
   - Ensure the keystore file and credentials are properly set up
   - Set up Google Play API access

## Signing Configuration

The app is signed using a keystore file. The signing configuration is defined in the Fastfile.

To access the keystore:
```bash
# Decrypt the keystore file if encrypted
gpg --decrypt deploy/android/democracy2-release-key.keystore.gpg > android/app/democracy2-release-key.keystore
```

## Build and Deploy Process

### Internal Testing Track

To build and deploy to the internal testing track:

```bash
cd deploy/android
bundle exec fastlane android internal
```

This will:
1. Increment the version code
2. Build the Android app
3. Sign the APK/AAB
4. Upload to the internal testing track

### Production Release

To release to production:

1. Verify the app in the internal testing track
2. Update the release notes in `deploy/android/fastlane/metadata`
3. Deploy to production:
   ```bash
   cd deploy/android
   bundle exec fastlane android production
   ```

### Beta Track

To release to the beta track:

```bash
cd deploy/android
bundle exec fastlane android beta
```

## CI/CD Integration

The fastlane setup is integrated with GitHub Actions for automated builds and deployments. See the `.github/workflows` directory for the workflow configurations.

## Troubleshooting

### Common Issues

- **Signing Issues**: Verify that the keystore file is accessible and the password is correct
- **Google Play API Errors**: Check that the service account has the proper permissions
- **Build Errors**: Confirm that all dependencies are properly resolved

### Logs

Fastlane logs are stored in:
- The terminal output when running locally
- GitHub Actions logs when running in CI/CD