import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';

const STORAGE_KEY_CONSTITUENCY = 'Constituency';

export const constituencyState = atom<string | undefined>({
  key: 'constituencyState',
  default: undefined,
  effects: [localStorageEffect(STORAGE_KEY_CONSTITUENCY)],
});
