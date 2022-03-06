import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';

const STORAGE_KEY_CONSTITUENCY = 'Constituency';

interface ConstituencyState {
  constituency?: string;
}

const defaults: ConstituencyState = {};

export const constituencyState = atom<ConstituencyState>({
  key: 'constituencyState',
  default: defaults,
  effects: [localStorageEffect(STORAGE_KEY_CONSTITUENCY)],
});
