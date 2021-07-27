import React, { useState, useEffect, createContext } from 'react';
import {
  FavorizedDeputiesStore,
  getFavorizedDeputies,
  addFavorizedDeputy as addFavorizedDeputyToStore,
  removeFavorizedDeputy as removeFavorizedDeputyFromStore,
} from '../../stores/FavorizedDeputies';

// eslint-disable-next-line no-spaced-func
export const FavorizedDeputiesContext = createContext<{
  favorizedDeputies: FavorizedDeputiesStore;
  addFavorizedDeputy: (id: string) => void;
  removeFavorizedDeputy: (id: string) => void;
}>({
  favorizedDeputies: [],
  addFavorizedDeputy: () => {
    console.warn('addFavorizedDeputy not implemented');
  },
  removeFavorizedDeputy: () => {
    console.warn('removeFavorizedDeputy not implemented');
  },
});

const useFavorizedDeputies = () => {
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

export const FavourizedDeputiesProvider: React.FC = ({ children }) => {
  const {
    favorizedDeputies,
    addFavorizedDeputy,
    removeFavorizedDeputy,
  } = useFavorizedDeputies();
  return (
    <FavorizedDeputiesContext.Provider
      value={{ favorizedDeputies, addFavorizedDeputy, removeFavorizedDeputy }}>
      {children}
    </FavorizedDeputiesContext.Provider>
  );
};
