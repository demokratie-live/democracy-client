import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export type ParlamentIdentifier = 'BT-20' | 'BT-19' | 'BT-18';
type Institutions = 'Bundestag';

interface ParlamentProceduresScreen {
  inVote?: boolean;
  recomended?: boolean;
  top100?: boolean;
  past?: boolean;
  all?: boolean;
}

interface ParlamentWomScreen {
  institution?: boolean;
  fractions?: boolean;
  deputies?: boolean;
}
interface ParlamentScreens {
  procedures: ParlamentProceduresScreen;
  wom?: false | ParlamentWomScreen;
  deputies?: boolean;
}
interface Parlament {
  identifier: ParlamentIdentifier;
  institution: Institutions;
  period: number;
  screens: ParlamentScreens;
}

type Parlaments = {
  [parlament in ParlamentIdentifier]: Parlament;
};

interface ParlamentInterface {
  parlament: Parlament;
  setParlament: (parlament: ParlamentIdentifier) => void;
  parlaments: Parlaments;
}

const parlaments: Parlaments = {
  'BT-20': {
    identifier: 'BT-20',
    institution: 'Bundestag',
    period: 20,
    screens: {
      procedures: {
        inVote: true,
        top100: false,
        past: false,
      },
      deputies: true,
    },
  },
  'BT-19': {
    identifier: 'BT-19',
    institution: 'Bundestag',
    period: 19,
    screens: {
      procedures: {
        recomended: true,
        top100: true,
        all: true,
      },
      wom: {
        institution: true,
        fractions: true,
        deputies: true,
      },
      deputies: true,
    },
  },
  'BT-18': {
    identifier: 'BT-18',
    institution: 'Bundestag',
    period: 18,
    screens: {
      procedures: {
        all: true,
      },
      deputies: true,
    },
  },
};

const defaults: ParlamentInterface = {
  parlament: parlaments['BT-19'],
  setParlament: () => {
    throw new Error('ParlamentContext: setParlament function is not defined');
  },
  parlaments,
};

export const ParlamentContext = createContext<ParlamentInterface>(defaults);

export const STORAGE_KEY_CONSTITUENCY = 'Parlament';

export const ParlamentProvider: React.FC = ({ children }) => {
  const [parlament, setParlamentState] = useState<Parlament>(
    defaults.parlament,
  );

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_CONSTITUENCY).then(parlamentData =>
      parlamentData && parlaments[parlamentData as ParlamentIdentifier]
        ? setParlamentState(parlaments[parlamentData as ParlamentIdentifier])
        : null,
    );
  }, []);

  const setParlament = (newParlament: Parlament | ParlamentIdentifier) => {
    if (typeof newParlament === 'string') {
      if (parlaments[newParlament as ParlamentIdentifier]) {
        AsyncStorage.setItem(STORAGE_KEY_CONSTITUENCY, newParlament).then(() =>
          setParlamentState(parlaments[newParlament as ParlamentIdentifier]),
        );
      }
    } else {
      AsyncStorage.setItem(
        STORAGE_KEY_CONSTITUENCY,
        newParlament.identifier,
      ).then(() => setParlamentState(newParlament));
    }
  };

  return (
    <ParlamentContext.Provider
      value={{
        parlament,
        setParlament,
        parlaments: parlaments,
      }}>
      {children}
    </ParlamentContext.Provider>
  );
};
