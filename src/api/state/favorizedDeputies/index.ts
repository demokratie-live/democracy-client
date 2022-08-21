import AsyncStorage from '@react-native-community/async-storage';
import { atom, atomFamily } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';
import { ParlamentIdentifier } from '../parlament';

const STORAGE_KEY = 'FAVORIZED_DEPUTIES_1_5_5';
const STORAGE_KEY_DEPRECATED = 'FAVORIZED_DEPUTIES';

export const favorizedDeputiesState = atomFamily<string[], ParlamentIdentifier>({
  key: 'favorizedDeputiesState',
  default: async param => {
    const deprecatedFavorized = await AsyncStorage.getItem(STORAGE_KEY_DEPRECATED).then(value => {
      if (value !== null) {
        return JSON.parse(value) as string[];
      }
    });
    if (param === 'BT-19') {
      return deprecatedFavorized ?? ['519324', '523750', '518092', '521640', '524466', '518176'];
    } else if (param === 'BT-20') {
      return deprecatedFavorized ?? [];
    }
    return [];
  },
  effects: [localStorageEffect(STORAGE_KEY)],
});

export const favorizedDeputiesEditModeState = atom<boolean>({
  key: 'favorizedDeputiesEditModeState',
  default: false,
});
