import gql from 'graphql-tag';

export default gql`
  query votesLocalKeyStore {
    votesLocalKeyStore @client {
      selection
      procedureId
    }
  }
`;
