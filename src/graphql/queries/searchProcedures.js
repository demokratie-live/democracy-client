import gql from "graphql-tag";

export default gql`
  query search($term: String!) {
    searchProcedures(term: $term) {
      _id
      title
      procedureId
      tags
      abstract
      voteDate
      submissionDate
      activityIndex
    }
  }
`;
