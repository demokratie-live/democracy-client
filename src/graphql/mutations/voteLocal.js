import gql from "graphql-tag";

export default gql`
  mutation voteLocal($procedure: ID!, $selection: VoteSelection!) {
    votesLocal(procedure: $procedure, selection: $selection) @client
  }
`;
