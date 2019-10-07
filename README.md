# Contribute

## install dependencies

```
git clone https://github.com/demokratie-live/democracy-app
cd democracy-app
yarn install

```

## start developing UI

### Android

```
cd mobile-ui
yarn android
CMD+M and Change Bundle Location to 127.0.0.1:8088
```

### iOS

```
cd mobile-ui
cd ios
pod install
cd ..
yarn ios
CMD+M and Configure Bundler Location to Host: 127.0.0.1 & Port: 8088
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