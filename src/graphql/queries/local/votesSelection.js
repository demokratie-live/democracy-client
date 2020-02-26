import gql from 'graphql-tag';

export default gql`
  query votesSelectionLocal {
    votesSelectionLocal @client {
      selection
      procedureId
    }
  }
`;
