import gql from 'graphql-tag';

export default gql`
  mutation toggleNotification($procedureId: String!) {
    toggleNotification(procedureId: $procedureId) {
      notify
    }
  }
`;
