import AsyncStorage from '@react-native-async-storage/async-storage';
import { AtomEffect } from 'recoil';

export const localStorageEffect =
  <T>(
    key: string,
    objectHandler?: { save?: (data: T) => any; load: <T>(data: any) => any },
  ): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    AsyncStorage.getItem(key).then(value => {
      if (value !== null) {
        const paredData = JSON.parse(value);
        const loadedData = objectHandler?.load?.(paredData) ?? paredData;
        setSelf(loadedData as T);
      }
    });

    onSet((newValue, _, isReset) => {
      const dataToSave = objectHandler?.save?.(newValue) ?? newValue;
      isReset
        ? AsyncStorage.removeItem(key)
        : AsyncStorage.setItem(key, JSON.stringify(dataToSave));
    });
  };

export const localStorageToStringEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    AsyncStorage.getItem(key).then(value => {
      if (value !== null) {
        setSelf(String(JSON.parse(value)) as unknown as T);
      }
    });

    onSet((newValue, _, isReset) => {
      isReset ? AsyncStorage.removeItem(key) : AsyncStorage.setItem(key, JSON.stringify(newValue));
    });
  };
