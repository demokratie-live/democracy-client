import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useMeQuery } from '../../../__generated__/graphql';
import { atom, useSetRecoilState } from 'recoil';

interface InitialStateInterface {
  lastStartWithVersion: string | undefined;
  isVerified: boolean;
  verificationQueryRunning: boolean;
  setLastStartWithVersion: (version: string) => void;
  refetchMe: () => void;
}

const defaults: InitialStateInterface = {
  lastStartWithVersion: undefined,
  isVerified: false,
  verificationQueryRunning: true,
  setLastStartWithVersion: () => {
    throw new Error('initialState: setLastStartVersion function is not defined');
  },
  refetchMe: () => {
    throw new Error('initialState: refetchMe function is not defined');
  },
};

export const initialState = atom<InitialStateInterface>({
  key: 'initialState',
  default: defaults,
});

export const useInitialState = () => {
  const { data: meData, loading: verificationQueryRunning, refetch: refetchMe } = useMeQuery();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [lastStartVersion, setLastStartVersion] =
    useState<InitialStateInterface['lastStartWithVersion']>();
  const setInitialState = useSetRecoilState(initialState);

  useEffect(() => {
    AsyncStorage.getItem('lastStartWithVersion')
      .then(version => (version ? setLastStartVersion(version) : setLastStartVersion('')))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (meData && meData.me) {
      setIsVerified(meData.me.verified);
    }
  }, [meData]);

  const setLastStartWithVersion = (verstion: string) => {
    AsyncStorage.setItem('lastStartWithVersion', verstion)
      .then(() => {
        setLastStartVersion(verstion);
      })
      .catch(console.error);
  };

  useEffect(() => {
    setInitialState({
      verificationQueryRunning,
      lastStartWithVersion: lastStartVersion,
      setLastStartWithVersion,
      isVerified,
      refetchMe,
    });
  });

  return {
    lastStartWithVersion: lastStartVersion,
    isVerified,
    verificationQueryRunning,
  };
};
