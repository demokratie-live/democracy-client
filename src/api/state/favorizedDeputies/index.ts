import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';

const STORAGE_KEY = 'FAVORIZED_DEPUTIES';

export const favorizedDeputiesState = atom<Set<string>>({
  key: 'favorizedDeputiesState',
  default: new Set(),
  effects: [localStorageEffect(STORAGE_KEY)],
});
