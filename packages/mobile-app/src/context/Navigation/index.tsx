import React, { createContext, useState } from 'react';
import { NavigationState } from '@react-navigation/core';
import { rootNavigationRef } from '../../routes/rootNavigationRef';

interface NavigationInterface {
  savedState?: NavigationState;
  saveState: () => void;
  reset: () => void;
}

const defaults: NavigationInterface = {
  savedState: undefined,
  saveState: () => {
    throw new Error('NavigationContext: saveState function is not defined');
  },
  reset: () => {
    throw new Error('NavigationContext: saveState function is not defined');
  },
};

export const NavigationContext = createContext<NavigationInterface>(defaults);

export const NavigationProvider: React.FC = ({ children }) => {
  const [savedState, setSavedState] = useState<NavigationState>();

  const saveState = () => {
    console.log('run saveState');
    if (rootNavigationRef.current) {
      setSavedState(rootNavigationRef.current.getRootState());
      console.log(rootNavigationRef.current.getRootState());
    }
  };

  const reset = () => {
    console.log('run reset');
    if (savedState && rootNavigationRef.current) {
      rootNavigationRef.current.reset(savedState);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        saveState,
        savedState,
        reset,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};
