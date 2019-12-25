import gql from 'graphql-tag';

export const TOGGLE_NOTIFICATION = gql`
  mutation ToggleNotification($procedureId: String!) {
    toggleNotification(procedureId: $procedureId) {
      notify
    }
  }
`;
