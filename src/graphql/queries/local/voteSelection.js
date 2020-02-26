import gql from 'graphql-tag';

export default gql`
  query voteSelectionLocal($procedureId: String) {
    voteSelectionLocal(procedureId: $procedureId) @client {
      selection
    }
  }
`;
