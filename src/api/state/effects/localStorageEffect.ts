import AsyncStorage from '@react-native-community/async-storage';
import { AtomEffect } from 'recoil';

export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    AsyncStorage.getItem(key).then(value => {
      if (value !== null) {
        setSelf(JSON.parse(value) as T);
      }
    });

    onSet((newValue, _, isReset) => {
      isReset ? AsyncStorage.removeItem(key) : AsyncStorage.setItem(key, JSON.stringify(newValue));
    });
  };
