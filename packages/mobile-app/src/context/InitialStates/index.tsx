import React, { createContext, useState, FC, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useQuery } from '@apollo/react-hooks';
import { Me } from './graphql/query/__generated__/Me';
import ME from './graphql/query/Me';

interface InitialStateInterface {
  lastStartWithVersion: string | undefined;
  isVerified: boolean;
  verificationQueryRunning: boolean;
  setLastStartWithVersion: (version: string) => void;
  refetchMe: () => void;
}

const defaults: InitialStateInterface = {
  lastStartWithVersion: '',
  isVerified: false,
  verificationQueryRunning: true,
  setLastStartWithVersion: () => {
    throw new Error(
      'InitialStateContext: setLastStartVersion function is not defined',
    );
  },
  refetchMe: () => {
    throw new Error('InitialStateContext: refetchMe function is not defined');
  },
};

export const InitialStateContext = createContext<InitialStateInterface>(
  defaults,
);

export const InitialStateProvider: FC = ({ children }) => {
  // TODO retry if bad connection or something else to avoid an app restart "apollo-link-retry"
  const {
    data: meData,
    loading: verificationQueryRunning,
    refetch: refetchMe,
  } = useQuery<Me>(ME);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [lastStartVersion, setLastStartVersion] = useState<
    InitialStateInterface['lastStartWithVersion']
  >();

  useEffect(() => {
    AsyncStorage.getItem('lastStartWithVersion').then(version =>
      version ? setLastStartVersion(version) : setLastStartVersion(''),
    );
  }, []);

  useEffect(() => {
    if (meData && meData.me) {
      setIsVerified(meData.me.verified);
    }
  }, [meData]);

  const setLastStartWithVersion = (verstion: string) => {
    AsyncStorage.setItem('lastStartWithVersion', verstion).then(() => {
      setLastStartVersion(verstion);
    });
  };

  return (
    <InitialStateContext.Provider
      value={{
        verificationQueryRunning,
        lastStartWithVersion: lastStartVersion,
        setLastStartWithVersion,
        isVerified,
        refetchMe,
      }}>
      {children}
    </InitialStateContext.Provider>
  );
};
