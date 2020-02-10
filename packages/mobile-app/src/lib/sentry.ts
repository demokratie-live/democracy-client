import { init, setTag } from '@sentry/react-native';
import DeviceInfo from 'react-native-device-info';

init({
  dsn: 'https://1f5c046a7b0c4e7b84ebc0adc62c00ad@sentry.io/1867209',
});

setTag('buildNumber', DeviceInfo.getBuildNumber());
setTag('bundleId', DeviceInfo.getBundleId());
