import gql from 'graphql-tag';

export default gql`
  mutation vote($procedure: ID!, $selection: VoteSelection!, $constituency: String) {
    vote(procedure: $procedure, selection: $selection, constituency: $constituency) {
      voted
    }
  }
`;
