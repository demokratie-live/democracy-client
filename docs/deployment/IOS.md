# iOS Deployment

This guide outlines the process of building and deploying the iOS app to TestFlight and the App Store.

## Prerequisites

- Mac with Xcode installed
- Apple Developer account with access to the app
- Required certificates and provisioning profiles
- Ruby environment for fastlane

## Setup

1. Install the required Ruby gems:

```bash
cd deploy/ios
bundle install
```

2. Configure fastlane environment variables:
   - Ensure that the proper environment variables are set for signing and deployment

## Certificates and Profiles

The project uses fastlane match for managing certificates and provisioning profiles.

To fetch certificates:

```bash
cd deploy/ios
bundle exec fastlane ios certificates
```

To generate new certificates:

```bash
cd deploy/ios
bundle exec fastlane ios generate_new_certificates
```

## Build and Deploy Process

### TestFlight Deployment

To deploy a new build to TestFlight:

```bash
cd deploy/ios
bundle exec fastlane ios deploy
```

This will:
1. Increment the build number
2. Build the iOS app
3. Upload to TestFlight
4. Notify team members

### App Store Release

After testing in TestFlight:

1. Prepare release notes in the `deploy/ios/fastlane/metadata` directory
2. Validate the build with:
   ```bash
   cd deploy/ios
   bundle exec fastlane ios validate_build
   ```
3. Submit the build for review via App Store Connect or use:
   ```bash
   cd deploy/ios
   bundle exec fastlane ios release
   ```

## Troubleshooting

### Common Issues

- **Certificate Errors**: Run `bundle exec fastlane ios certificates` to refresh certificates
- **Build Failures**: Check Xcode logs and ensure dependencies are up to date
- **Upload Failures**: Verify Apple Developer account permissions and internet connectivity

### Logs

Fastlane logs are stored in:
- `~/Library/Logs/fastlane/` on your local machine
- CI/CD platform logs when running in continuous integration