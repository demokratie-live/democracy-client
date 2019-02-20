import gql from 'graphql-tag';

export default gql`
  query getDeputyVoteResultsByProcedure($procedureId: ID!, $constituencies: [String!]) {
    procedure(id: $procedureId) {
      procedureId
      voteResults {
        deputyVotes(constituencies: $constituencies, directCandidate: true) {
          deputy {
            imgURL
            name
            party
            constituency
          }
          decision
        }
      }
    }
  }
`;
