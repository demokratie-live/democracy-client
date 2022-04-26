import { atom } from 'recoil';
import { FilterData, filterData } from '../../hooks/useListFilter/initData';

export const filterState = atom<FilterData[]>({
  key: 'filterState',
  default: filterData,
  effects: [],
});
