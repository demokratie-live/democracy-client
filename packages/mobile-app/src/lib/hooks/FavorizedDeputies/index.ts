import { useState, useEffect } from 'react';
import {
  FavorizedDeputiesStore,
  getFavorizedDeputies,
  addFavorizedDeputy as addFavorizedDeputyToStore,
  removeFavorizedDeputy as removeFavorizedDeputyFromStore,
} from '../../stores/FavorizedDeputies';

export const useFavorizedDeputies = () => {
  const [favorizedDeputies, setFavorizedDeputies] = useState<
    FavorizedDeputiesStore
  >([]);

  useEffect(() => {
    getFavorizedDeputies().then(setFavorizedDeputies);
  }, []);

  const addFavorizedDeputy = (id: string) => {
    addFavorizedDeputyToStore(id).then(setFavorizedDeputies);
  };

  const removeFavorizedDeputy = (id: string) => {
    removeFavorizedDeputyFromStore(id).then(setFavorizedDeputies);
  };

  return { favorizedDeputies, addFavorizedDeputy, removeFavorizedDeputy };
};
