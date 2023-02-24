import { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

export const useHideBootsplash = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  });
};
