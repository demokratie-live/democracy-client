/**
 *
 * Favorized Deputies
 * Async Storage
 *
 * */

import AsyncStorage from '@react-native-community/async-storage';

export type FavorizedDeputiesStore = string[];

const STORAGEE_KEY = 'FAVORIZED_DEPUTIES';

export const getFavorizedDeputies = async () => {
  const data = await AsyncStorage.getItem(STORAGEE_KEY);
  return (data ? JSON.parse(data) : []) as FavorizedDeputiesStore;
};

const saveFavorizedDeputies = (ids: FavorizedDeputiesStore): Promise<void> => {
  const data = JSON.stringify(ids);
  return AsyncStorage.setItem(STORAGEE_KEY, data);
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
