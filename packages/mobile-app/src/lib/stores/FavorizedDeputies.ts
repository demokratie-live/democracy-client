/**
 *
 * Favorized Deputies
 * Async Storage
 *
 * */

import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_KEY_CONSTITUENCY } from '../../context/Constituency';
import { DEPUTY_SEARCH } from '../../screens/Abgeordnete/graphql/query/deputies';
import {
  Deputies,
  DeputiesVariables,
} from '../../screens/Abgeordnete/graphql/query/__generated__/Deputies';
import { client } from '../Apollo';

export type FavorizedDeputiesStore = string[];

const STORAGEE_KEY = 'FAVORIZED_DEPUTIES';

const saveFavorizedDeputies = (ids: FavorizedDeputiesStore): Promise<void> => {
  const data = JSON.stringify(ids);
  return AsyncStorage.setItem(STORAGEE_KEY, data);
};

const getInitialFavorizedDeputies = async () => {
  let initialDeputies = [
    '519324',
    '523750',
    '518092',
    '521640',
    '524466',
    '518176',
  ];
  const constituency = await AsyncStorage.getItem(STORAGE_KEY_CONSTITUENCY);
  if (constituency) {
    const constituencyDeputies = await client
      .query<Deputies, DeputiesVariables>({
        query: DEPUTY_SEARCH,
        variables: {
          limit: 100,
          offset: 0,
          filterConstituency: constituency,
        },
      })
      .then(({ data }) => {
        return data.deputies.data.length > 0
          ? data.deputies.data.map(deputy => deputy.webId)
          : [];
      });
    initialDeputies = [...constituencyDeputies, ...initialDeputies].filter(
      (v, i, a) => a.indexOf(v) === i,
    );
  }
  return initialDeputies;
};

export const getFavorizedDeputies = async () => {
  const favorizedDeputies = await AsyncStorage.getItem(
    STORAGEE_KEY,
  ).then(data => (data ? (JSON.parse(data) as string[]) : undefined));

  let initialDeputies: string[] = [];

  if (!favorizedDeputies) {
    initialDeputies = await getInitialFavorizedDeputies();
    saveFavorizedDeputies(initialDeputies);
  }

  return (favorizedDeputies
    ? favorizedDeputies
    : initialDeputies) as FavorizedDeputiesStore;
};

export const addFavorizedDeputy = async (id: string) => {
  const favorizedDeputies = await getFavorizedDeputies();
  const newFavorizedDeputies = [...favorizedDeputies, id];
  await saveFavorizedDeputies(newFavorizedDeputies);
  return newFavorizedDeputies;
};

export const removeFavorizedDeputy = async (id: string) => {
  const favorizedDeputies = await getFavorizedDeputies();
  const newFavorizedDeputies = favorizedDeputies.filter(
    deputyId => id !== deputyId,
  );
  await saveFavorizedDeputies(newFavorizedDeputies);
  return newFavorizedDeputies;
};
