import gql from 'graphql-tag';

export default gql`
  query proceduresByIdHavingVoteResults($procedureIds: [String!]!) {
    proceduresByIdHavingVoteResults(procedureIds: $procedureIds) {
      procedureId
      voteResults {
        governmentDecision
        partyVotes {
          party
          main
        }
      }
    }
  }
`;
