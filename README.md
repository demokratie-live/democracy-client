![Screenshot](https://github.com/demokratie-live/democracy-assets/blob/master/images/forfb2.png)

# Democracy-Client &nbsp; <a href="https://github.com/kriasoft/nodejs-api-starter/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/demokratie-live/democracy-client.svg?style=social&label=Star&maxAge=3600" height="20"/></a> <a href="https://twitter.com/democracy_de" target="_blank"><img src="https://img.shields.io/twitter/follow/democracy_de.svg?style=social&label=Follow&maxAge=3600" height="20"/></a> <a href="https://www.facebook.com/democracygermany/" target="_blank"><img src="https://github.com/demokratie-live/democracy-assets/blob/master/docu/facebook.png" height="20"/></a> <a href="https://discord.gg/Pdu3ZEV" target="_blank"><img src="https://github.com/demokratie-live/democracy-assets/blob/master/docu/discord.png" height="20"/></a>

[![Build Status](https://travis-ci.org/demokratie-live/democracy-client.svg?branch=master)](https://travis-ci.org/demokratie-live/democracy-client)

The Client for the DEMOCRACY App. This includes iOS and Android generated from the same Codebase.

:movie_camera: <a href="https://www.youtube.com/watch?v=H6oJA4MUVW0">Video des Entwicklungsstandes 26.02.2018</a><br>
:movie_camera: <a href="https://www.youtube.com/watch?v=oTX59JhDmXU">Video des Entwicklungsstandes 15.12.2017</a><br>
<br>
<a href="https://www.youtube.com/watch?v=H6oJA4MUVW0"><img src="https://github.com/demokratie-live/democracy-assets/blob/master/screenshots/Developer%20Demo%20Video%20-%20480p-spring4-optimized.gif" width="100%"></a>

[Entwicklertagebuch](https://github.com/demokratie-live/democracy-client/wiki/Entwicklertagebuch)

## Systemmap

![Systemmap](https://github.com/demokratie-live/democracy-docu/blob/master/app/Systemmap.png)

## Tech Stack

- [Node.js][node], [Yarn][yarn], [JavaScript][js], [Babel][babel], [Jest][jest]
- [ReactNative][reactnative], [Wix ReactNativeNavigation][wix], [StyledComponents][styledcomponents]

[More Dependecies](https://github.com/demokratie-live/democracy-client/network/dependencies)

![Projekt Struktur](https://github.com/demokratie-live/democracy-assets/blob/master/docu/api_structure_client.png)

## Prerequisites

- [Node.js][node]
- [Android Studio or Android SDK][android] follow the installation Instructions [here](http://facebook.github.io/react-native/docs/getting-started.html)
- [optional][windows] install windows-build-tools for node
  ```
  npm install --global --production windows-build-tools
  (installs python) (requireds administrator rights)
  ```

# Contribute

## install dependencies

```
git clone https://github.com/demokratie-live/democracy-client
cd democracy-client
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
cd packages/mobile-app
yarn android
```

### iOS

```
cd packages/mobile-app
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

## Deployment

Deployment is done with Travis CI

## Contributing

Anyone and everyone is welcome to [contribute](CONTRIBUTING.md). Start by checking out the list of
[open issues](https://github.com/demokratie-live/democracy-client/issues).

## License

Copyright © 2017-present DEMOCRACY Deutschland e.V.. This source code is licensed under the Apache 2.0 license found in the
[LICENSE](https://github.com/demokratie-live/democracy-client/blob/master/LICENSE) file.

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/ManAnRuck">
          <img width="150" height="150" src="https://github.com/ManAnRuck.png?v=3&s=150">
          </br>
          <strong>Manuel Ruck</strong>
        </a>
        <br>
        Maintainer
      </td>
      <td align="center">
        <a href="https://github.com/ulfgebhardt">
          <img width="150" height="150" src="https://github.com/ulfgebhardt.png?v=3&s=150">
          </br>
          <strong>Ulf Gebhardt</strong>
        </a>
        <br>
        Maintainer
      </td>
    </tr>
  <tbody>
</table>

---

Made with ♥ by Team DEMOCRACY ([democracy-deutschland.de](https://www.democracy-deutschland.de)), [startnext contributors](https://www.startnext.com/democracy/unterstuetzer/) and [contributors](https://github.com/demokratie-live/democracy-client/graphs/contributors)

[node]: https://nodejs.org
[yarn]: https://yarnpkg.com
[js]: https://developer.mozilla.org/docs/Web/JavaScript
[babel]: http://babeljs.io/
[reactnative]: http://www.reactnative.com/
[android]: https://developer.android.com/studio/index.html
[jest]: http://facebook.github.io/jest/
[wix]: https://github.com/wix/react-native-navigation
[styledcomponents]: https://github.com/styled-components/styled-components
