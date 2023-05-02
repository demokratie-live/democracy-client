import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';

const STORAGE_KEY_CONSTITUENCY = 'SearchHistory';

export const searchTermState = atom<string>({
  key: 'searchTermState',
  default: '',
});

export const searchHistoryState = atom<Set<string>>({
  key: 'searchHistoryState',
  default: new Set(),
  effects: [
    localStorageEffect(STORAGE_KEY_CONSTITUENCY, {
      save: data => [...Array.from(data)],
      load: data => new Set<string>([...data]),
    }),
  ],
});
