import gql from "graphql-tag";

export default gql`
  query procedure($id: ID!) {
    procedure(id: $id) {
      title
      tags
      abstract
      voteDate
      subjectGroups
      submissionDate
      importantDocuments {
        editor
        type
        url
        number
      }
    }
  }
`;
