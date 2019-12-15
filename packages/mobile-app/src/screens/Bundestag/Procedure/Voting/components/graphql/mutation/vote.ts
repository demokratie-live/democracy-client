import gql from 'graphql-tag';

export const VOTE = gql`
  mutation Vote(
    $procedureId: String!
    $selection: VoteSelection!
    $constituency: String
  ) {
    vote(
      procedureId: $procedureId
      selection: $selection
      constituency: $constituency
    ) {
      voted
    }
  }
`;
