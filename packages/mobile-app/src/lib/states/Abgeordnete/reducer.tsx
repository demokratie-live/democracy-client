import { ActionMap } from '../ActionMap';

export const Action = {
  ToggleEditMode: 'ToggleEditMode',
} as const;

export type State = {
  editMode: boolean;
};

export type Payload = {
  [Action.ToggleEditMode]: never;
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case Action.ToggleEditMode: {
      return {
        ...state,
        editMode: !state.editMode,
      };
    }

    default:
      console.error('missing action for StateHandler');
      return state;
  }
};
