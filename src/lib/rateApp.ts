import DeviceInfo from 'react-native-device-info';
import Rate, { AndroidMarket } from 'react-native-rate';

export const rateApp = () => {
  const options = {
    AppleAppID: '1341311162',
    GooglePackageName: DeviceInfo.getBundleId(),
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
  };
  Rate.rate(options, success => {
    if (success) {
      // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
    }
  });
};
