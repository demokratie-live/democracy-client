import gql from "graphql-tag";

export default gql`
  query procedure($id: ID!) {
    procedure(id: $id) {
      _id
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
      voteResults {
        yes
        no
        abstination
        notVote
      }
    }
  }
`;
