import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, atomFamily } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';
import { ParlamentIdentifier } from '../parlament';

const STORAGE_KEY = 'FAVORIZED_DEPUTIES';

export const favorizedDeputiesState = atomFamily<string[], ParlamentIdentifier>({
  key: 'favorizedDeputiesState',
  default: async param => {
    const favorizedDeputies = await AsyncStorage.getItem(STORAGE_KEY).then(data =>
      data ? (JSON.parse(data) as string[]) : undefined,
    );
    if (param === 'BT-19') {
      return favorizedDeputies ?? ['519324', '523750', '518092', '521640', '524466', '518176'];
    } else if (param === 'BT-20') {
      return favorizedDeputies ?? [];
    }
    return [];
  },
  effects: [localStorageEffect(STORAGE_KEY)],
});

export const favorizedDeputiesEditModeState = atom<boolean>({
  key: 'favorizedDeputiesEditModeState',
  default: false,
});
