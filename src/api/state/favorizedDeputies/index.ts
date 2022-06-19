import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';

const STORAGE_KEY = 'FAVORIZED_DEPUTIES';

export const favorizedDeputiesState = atom<string[]>({
  key: 'favorizedDeputiesState',
  default: ['519324', '523750', '518092', '521640', '524466', '518176'],
  effects: [localStorageEffect(STORAGE_KEY)],
});

export const favorizedDeputiesEditModeState = atom<boolean>({
  key: 'favorizedDeputiesEditModeState',
  default: false,
});
