import gql from "graphql-tag";

export default gql`
  query procedures($offset: Int, $pageSize: Int, $type: ProcedureType!) {
    procedures(offset: $offset, pageSize: $pageSize, type: $type) {
      _id
      title
      procedureId
      tags
      abstract
      voteDate
    }
  }
`;
