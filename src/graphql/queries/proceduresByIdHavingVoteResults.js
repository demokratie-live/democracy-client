import gql from 'graphql-tag';

export default gql`
  query proceduresByIdHavingVoteResults($procedureIds: [String!]!) {
    proceduresByIdHavingVoteResults(procedureIds: $procedureIds) {
      procedureId
      voteResults {
        yes
        no
        abstination
        partyVotes {
          party
          main
        }
      }
    }
  }
`;
