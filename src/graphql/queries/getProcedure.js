import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";
import Voted from "../fragments/ProcedureVoted";
import Viewed from "../fragments/ProcedureViewed";

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
      listType
      type
      subjectGroups
      submissionDate
      currentStatus
      currentStatusHistory
      importantDocuments {
        editor
        type
        url
        number
      }
      voteResults {
        yes
        abstination
        no
        notVote
      }
      ...ActivityIndex
      ...Voted
      ...Viewed
    }
  }
  ${ActivityIndex}
  ${Voted}
  ${Viewed}
`;
