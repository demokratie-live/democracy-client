import React, { createContext, useState, FC, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface InitialStateInterface {
  lastStartWithVersion: string | undefined;
  registered: boolean;
  setLastStartWithVersion: (version: string) => void;
  setRegistered: (registered: boolean) => void;
}

const defaults: InitialStateInterface = {
  lastStartWithVersion: '',
  registered: false,
  setLastStartWithVersion: () => {
    throw new Error(
      'InitialStateContext: setLastStartVersion function is not defined',
    );
  },
  setRegistered: () => {
    throw new Error(
      'InitialStateContext: setRegistered function is not defined',
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
  const [registered, setRegistered] = useState<
    InitialStateInterface['registered']
  >(false);

  useEffect(() => {
    AsyncStorage.getItem('lastStartWithVersion').then(version =>
      version ? setLastStartVersion(version) : setLastStartVersion(''),
    );

    AsyncStorage.getItem('auth_phoneHash').then(phoneNumberHash =>
      setRegistered(!!phoneNumberHash || false),
    );
  }, []);

  const setLastStartWithVersion = (verstion: string) => {
    AsyncStorage.setItem('lastStartWithVersion', verstion).then(() => {
      setLastStartVersion(verstion);
    });
  };

  const setIsRegistered = (isRegistered: boolean) => {
    setRegistered(isRegistered);
  };

  return (
    <InitialStateContext.Provider
      value={{
        lastStartWithVersion: lastStartVersion,
        registered,
        setLastStartWithVersion,
        setRegistered: setIsRegistered,
      }}>
      {children}
    </InitialStateContext.Provider>
  );
};
