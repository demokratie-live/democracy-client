import gql from "graphql-tag";

export default gql`
  mutation vote($procedure: ID!, $selection: VoteSelection!) {
    vote(procedure: $procedure, selection: $selection) {
      voted
      voteResults {
        yes
        no
        abstination
      }
    }
  }
`;
