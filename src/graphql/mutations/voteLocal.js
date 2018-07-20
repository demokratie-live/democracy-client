import gql from "graphql-tag";

export default gql`
  mutation voteLocal($procedureId: String!, $selection: VoteSelection!) {
    votesLocal(procedureId: $procedureId, selection: $selection) @client
  }
`;
