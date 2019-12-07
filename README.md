# Contribute

## install dependencies

```
git clone https://github.com/demokratie-live/democracy-app
cd democracy-app
yarn install
yarn pods (macOS only)
```

## Setup React-Native Environment

[ReactNative Setup](https://facebook.github.io/react-native/docs/getting-started)

### Android Workaround (currently handled by postinstall script) https://github.com/facebook/react-native/issues/25822

```
open node_modules/@react-native-community/cli-platform-android/native_modules.gradle
replace:
def command = "node ./node_modules/react-native/cli.js config"
with
def command = "node ../../node_modules/react-native/cli.js config"
```

## start developing UI

### Android

```
cd packages/mobile-ui
yarn android
(if that gets stuck use two terminals. One for `yarn start` and one for `yarn android`)
(also make sure to use the correct java8 version: `export JAVA_HOME=/usr/lib/jvm/java-8-openjdk/`)
(also make sure to use the correct android sdk root: `export ANDROID_SDK_ROOT=/home/{username}/Android/Sdk`)
(ignore metro bundler errors)
CMD+M and Change Bundle Location to 127.0.0.1:8088
(error should be solved)
```

Start virtual Android Device:

```
open Android Studio
create Device with API 29 or higher(?)
start device
```

Connect real Android Device:

```
adb start-server
enable usb debugging on the device
authorize host on device
verify with `adb devices`
```

### iOS

```
cd packages/mobile-ui
yarn ios
(ignore metro bundler errors)
CMD+M and Configure Bundler Location to Host: 127.0.0.1 & Port: 8088
(error should be solved)
```

## start developing App

### Android

```
cd mobile-ui
yarn android
```

### iOS

```
cd mobile-ui
cd ios
pod install
cd ..
yarn ios
```

## Testing

### Unit tests

```
cd packages/mobile-app
yarn test
```

or with watch mode

```
cd packages/mobile-app
yarn test:watch
```

### e2e Detox iOS

```
cd packages/mobile-app
yarn detox build -c ios.sim.debug
yarn detox test -c ios.sim.debug
```

### e2e Detox Android

```
cd packages/mobile-app
yarn detox build -c android.emu.debug
yarn start
yarn detox test -c android.emu.debug
```
