import gql from 'graphql-tag';

import ActivityIndex from '../fragments/ProcedureActivityIndex';
import Viewed from '../fragments/ProcedureViewed';

export default gql`
  query getNotifiedProcedures {
    notifiedProcedures {
      title
      procedureId
      notify
      currentStatus
      voteDate
      ...ActivityIndex
      ...Viewed
    }
  }
  ${ActivityIndex}
  ${Viewed}
`;
