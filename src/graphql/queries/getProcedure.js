import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";
import Voted from "../fragments/ProcedureVoted";

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
        notVoted
        partyVotes {
          main
          party
          deviants {
            yes
            abstination
            no
            notVoted
          }
        }
      }
      ...ActivityIndex
      ...Voted
    }
  }
  ${ActivityIndex}
  ${Voted}
`;
