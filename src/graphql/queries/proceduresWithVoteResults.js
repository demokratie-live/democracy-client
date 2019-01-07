import gql from 'graphql-tag';

export default gql`
  query proceduresWithVoteResults($procedureIds: [String!]!) {
    proceduresWithVoteResults(procedureIds: $procedureIds) {
      procedureId
      voteResults {
        yes
        no
        abstination
      }
    }
  }
`;
