import React, { createContext, Dispatch, useReducer } from 'react';

import { Actions, State, reducer } from './reducer';

type InitialStateType = State;

const initialState: InitialStateType = {
  editMode: false,
};

export const AbgeordneteListContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AbgeordneteListProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AbgeordneteListContext.Provider value={{ state: { ...state }, dispatch }}>
      {children}
    </AbgeordneteListContext.Provider>
  );
};
