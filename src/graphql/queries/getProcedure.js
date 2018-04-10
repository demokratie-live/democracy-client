import gql from "graphql-tag";

export default gql`
  query procedure($id: ID!) {
    procedure(id: $id) {
      _id
      procedureId
      title
      tags
      abstract
      voteDate
      notify
      type
      subjectGroups
      submissionDate
      currentStatus
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
