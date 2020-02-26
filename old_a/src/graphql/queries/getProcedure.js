import gql from 'graphql-tag';

import ActivityIndex from '../fragments/ProcedureActivityIndex';
import Voted from '../fragments/ProcedureVoted';
import Viewed from '../fragments/ProcedureViewed';
import Verified from '../fragments/ProcedureVerified';

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
      list
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
        decisionText
        namedVote
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
      ...Viewed
      ...Verified
    }
  }
  ${ActivityIndex}
  ${Voted}
  ${Viewed}
  ${Verified}
`;
