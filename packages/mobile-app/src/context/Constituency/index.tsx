import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface ConstituencyInterface {
  constituency: string;
  setConstituency: (constituency: string) => void;
}

const defaults: ConstituencyInterface = {
  constituency: '',
  setConstituency: () => {
    throw new Error(
      'ConstituencyContext: setConstituency function is not defined',
    );
  },
};

export const ConstituencyContext = createContext<ConstituencyInterface>(
  defaults,
);

const STORAGE_KEY_CONSTITUENCY = 'constituency';

export const ConstituencyProvider: React.FC = ({ children }) => {
  const [constituency, setConstituency] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_CONSTITUENCY).then(constituencyData =>
      constituencyData ? setConstituency(constituencyData) : null,
    );
  }, []);

  return (
    <ConstituencyContext.Provider
      value={{
        constituency,
        setConstituency,
      }}>
      {children}
    </ConstituencyContext.Provider>
  );
};
