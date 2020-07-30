import { gql } from '@apollo/client';

export const TOGGLE_NOTIFICATION = gql`
  mutation ToggleNotification($procedureId: String!) {
    toggleNotification(procedureId: $procedureId) {
      notify
    }
  }
`;
