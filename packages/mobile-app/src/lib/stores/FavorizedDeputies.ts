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

const STORAGE_KEY = 'FAVORIZED_DEPUTIES';
const LP_INITIAL_STATE_STORAGE_KEY = 'LP_INITIAL_STATE';

const checkInitialState = async (period: number) => {
  const lpInitalStates = await AsyncStorage.getItem(
    LP_INITIAL_STATE_STORAGE_KEY,
  ).then(data => (data ? (JSON.parse(data) as number[]) : undefined));
  return !!lpInitalStates?.includes(period);
};

const getInitialStates = async () => {
  const lpInitalStates = await AsyncStorage.getItem(
    LP_INITIAL_STATE_STORAGE_KEY,
  ).then(data => (data ? (JSON.parse(data) as number[]) : undefined));
  return lpInitalStates || [];
};

const addInitialState = async (period: number) => {
  const lpInitialStaqtes = await getInitialStates();
  const data = JSON.stringify([...lpInitialStaqtes, period]);
  await AsyncStorage.setItem(LP_INITIAL_STATE_STORAGE_KEY, data);
};

const saveFavorizedDeputies = (ids: FavorizedDeputiesStore): Promise<void> => {
  const data = JSON.stringify(ids);
  return AsyncStorage.setItem(STORAGE_KEY, data);
};

const getInitialFavorizedDeputies = async ({ period }: { period: number }) => {
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
          period,
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
  const favorizedDeputies = await AsyncStorage.getItem(STORAGE_KEY).then(data =>
    data ? (JSON.parse(data) as string[]) : undefined,
  );

  let initialDeputies: string[] = [];

  if (!favorizedDeputies) {
    initialDeputies = [...(await getInitialFavorizedDeputies({ period: 19 }))];
    await saveFavorizedDeputies(initialDeputies);
  }

  if (!(await checkInitialState(20))) {
    initialDeputies = [
      ...initialDeputies,
      ...(await getInitialFavorizedDeputies({ period: 20 })),
    ];
    await addInitialState(20);
    await saveFavorizedDeputies([
      ...initialDeputies,
      ...(favorizedDeputies || []),
    ]);
  }

  return (favorizedDeputies
    ? [...favorizedDeputies, ...initialDeputies]
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
