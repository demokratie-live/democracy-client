import { init, setTag } from '@sentry/react-native';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

// Run sentry not in developer mode

let stage: string;
const bundleId = DeviceInfo.getBundleId();
switch (true) {
  case bundleId.includes('alpha'):
    stage = 'Alpha';
    break;
  case bundleId.includes('internal'):
    stage = 'Internal';
    break;
  default:
    stage = `#${bundleId}#`;
    break;
}

if (!__DEV__) {
  init({
    dsn: 'https://1f5c046a7b0c4e7b84ebc0adc62c00ad@sentry.io/1867209',
    attachStacktrace: true,
    release: `${
      Platform.OS
    }${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()}) ${stage}`,
  });

  setTag('buildNumber', DeviceInfo.getBuildNumber());
  setTag('bundleId', DeviceInfo.getBundleId());
}
