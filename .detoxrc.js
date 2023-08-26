/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14 Pro',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_2_API_28',
      },
    },
  },
  apps: {
    'android.internal.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/internal/debug/app-internal-debug.apk',
      build:
        'cd android && ./gradlew assembleInternal assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
    'android.internal.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build:
        'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
    },
    'ios.release': {
      name: 'DemocracyNative',
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Internal.Debug-iphonesimulator/DemocracyNative.app',
      build:
        'xcodebuild -workspace ios/DemocracyNative.xcworkspace -scheme Internal -sdk iphonesimulator -derivedDataPath ios/build',
    },
  },
  configurations: {
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.internal.debug',
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.internal.release',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release',
    },
  },
};
