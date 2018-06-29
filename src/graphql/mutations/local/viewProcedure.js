import gql from "graphql-tag";

export default gql`
  mutation viewProcedure($procedureId: String!, $selection: ViewSelection!) {
    viewProcedure(procedureId: $procedureId, selection: $selection) @client
  }
`;
