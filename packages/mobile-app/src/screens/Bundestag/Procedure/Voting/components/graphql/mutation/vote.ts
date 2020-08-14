import { gql } from '@apollo/client';

export const VOTE = gql`
  mutation Vote(
    $procedure: ID!
    $selection: VoteSelection!
    $constituency: String
  ) {
    vote(
      procedure: $procedure
      selection: $selection
      constituency: $constituency
    ) {
      voted
    }
  }
`;
