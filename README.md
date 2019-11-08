# Contribute

## install dependencies

```
git clone https://github.com/demokratie-live/democracy-app
cd democracy-app
yarn install
```

### Android Workaround https://github.com/facebook/react-native/issues/25822

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
cd mobile-ui
yarn android
(ignore metro bundler errors)
CMD+M and Change Bundle Location to 127.0.0.1:8088
(error should be solved)
```

### iOS

```
cd mobile-ui
cd ios
pod install
cd ..
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
detox build -c ios.sim.debug
detox test -c ios.sim.debug
```

### e2e Detox Android

```
cd packages/mobile-app
detox build -c android.emu.debug
yarn start
detox test -c android.emu.debug
```
