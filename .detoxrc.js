module.exports = {
  devices: {
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_API_28',
      },
    },
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 13 Pro Max',
      },
    },
  },
  apps: {
    'android.internal.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
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
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/DemocracyNative.app',
      build:
        'xcodebuild -project ios/DemocracyNative.xcodeproj -scheme DemocracyNative -sdk iphonesimulator -derivedDataPath ios/build',
    },
  },
  configurations: {
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release',
    },
  },
};
