import gql from 'graphql-tag';

export default gql`
  mutation voteLocal($procedureId: String!, $selection: VoteSelection!) {
    voteLocal(procedureId: $procedureId, selection: $selection) @client
  }
`;
