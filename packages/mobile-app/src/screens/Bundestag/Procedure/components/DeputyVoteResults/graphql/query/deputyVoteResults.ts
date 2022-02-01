import { gql } from '@apollo/client';

export const DEPUTY_VOTE_RESULT = gql`
  query DeputyVoteResults($procedureId: ID!, $webIds: [String!]!) {
    procedure(id: $procedureId) {
      procedureId
      voteResults {
        deputyVotes(webIds: $webIds) {
          deputy {
            webId
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
