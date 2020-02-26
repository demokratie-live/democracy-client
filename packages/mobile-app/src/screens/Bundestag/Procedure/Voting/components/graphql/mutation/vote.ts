import gql from 'graphql-tag';

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
