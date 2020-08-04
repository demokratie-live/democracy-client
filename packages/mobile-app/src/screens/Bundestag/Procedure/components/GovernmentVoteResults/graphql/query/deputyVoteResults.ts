import { gql } from '@apollo/client';

export const DEPUTY_VOTE_RESULT = gql`
  query DeputyVoteResults($procedureId: ID!, $constituencies: [String!]!) {
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
