import React, { createContext, useState, FC, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface InitialStateInterface {
  lastStartWithVersion: string | undefined;
  setLastStartWithVersion: (version: string) => void;
}

const defaults: InitialStateInterface = {
  lastStartWithVersion: '',
  setLastStartWithVersion: () => {
    throw new Error(
      'InitialStateContext: setLastStartVersion function is not defined',
    );
  },
};

export const InitialStateContext = createContext<InitialStateInterface>(
  defaults,
);

export const InitialStateProvider: FC = ({ children }) => {
  const [lastStartVersion, setLastStartVersion] = useState<
    InitialStateInterface['lastStartWithVersion']
  >();

  useEffect(() => {
    AsyncStorage.getItem('lastStartWithVersion').then(version =>
      version ? setLastStartVersion(version) : setLastStartVersion(''),
    );
  }, []);

  const setLastStartWithVersion = (verstion: string) => {
    AsyncStorage.setItem('lastStartWithVersion', verstion).then(() => {
      setLastStartVersion(verstion);
    });
  };

  return (
    <InitialStateContext.Provider
      value={{
        lastStartWithVersion: lastStartVersion,
        setLastStartWithVersion,
      }}>
      {children}
    </InitialStateContext.Provider>
  );
};
