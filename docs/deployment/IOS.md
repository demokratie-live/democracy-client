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

## In-App Donations (Apple Pay)

Required for `specs/001-in-app-donations` (Stripe PaymentSheet with Apple Pay). DEMOCRACY Deutschland e.V.
is approved by Apple as a nonprofit (App Review Guideline 3.2.1(vi)); offering Apple Pay is mandatory.

1. **Merchant ID** – Apple Developer → Certificates, Identifiers & Profiles → Identifiers → Merchant IDs:
   create `merchant.de.democracy-deutschland.clientapp` (description "DEMOCRACY Donations").
   The ID is configured in `app.config.ts` (`APPLE_PAY_MERCHANT_ID`) and used by both variants.
2. **App IDs** – enable the *Apple Pay Payment Processing* capability for
   `de.democracy-deutschland.clientapp` **and** `de.democracy-deutschland.clientapp.internal`
   and assign the merchant ID.
3. **Payment Processing Certificate** – Stripe Dashboard → Settings → Payment methods → Apple Pay →
   *iOS certificates* → *Add new application* → download Stripe's CSR → upload it in the Apple
   Developer portal for the merchant ID → upload the resulting `.cer` back to Stripe.
   Repeat once for test mode and once for live mode if Stripe asks for it.
4. **Profiles** – regenerate the provisioning profiles so they contain the new entitlement
   (`com.apple.developer.in-app-payments`):

   ```bash
   cd deploy/ios
   bundle exec fastlane ios generate_new_certificates
   ```

5. **Verify** – `npx expo config --type introspect` must list the merchant ID under
   `com.apple.developer.in-app-payments`; a development build must show Apple Pay in the donation sheet.
6. **App Review** – mention the nonprofit approval in the review notes and explain how to test donations
   (internal build uses Stripe test mode). Update the App Privacy section (email address, payment info
   processed by Stripe).

## Troubleshooting

### Common Issues

- **Certificate Errors**: Run `bundle exec fastlane ios certificates` to refresh certificates
- **Build Failures**: Check Xcode logs and ensure dependencies are up to date
- **Upload Failures**: Verify Apple Developer account permissions and internet connectivity

### Logs

Fastlane logs are stored in:
- `~/Library/Logs/fastlane/` on your local machine
- CI/CD platform logs when running in continuous integration