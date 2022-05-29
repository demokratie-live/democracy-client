import { atom } from 'recoil';
import { localStorageToStringEffect } from '../effects/localStorageEffect';

const STORAGE_KEY_CONSTITUENCY = 'Constituency';

export const constituencyState = atom<string | undefined>({
  key: 'constituencyState',
  default: undefined,
  effects: [localStorageToStringEffect(STORAGE_KEY_CONSTITUENCY)],
});
