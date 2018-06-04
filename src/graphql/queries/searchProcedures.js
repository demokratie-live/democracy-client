import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";
import Voted from "../fragments/ProcedureVoted";

export default gql`
  query search($term: String!) {
    searchProcedures(term: $term) {
      _id
      title
      procedureId
      tags
      abstract
      voteDate
      votedGovernment
      submissionDate
      completed
      ...ActivityIndex
      ...Voted
    }
  }
  ${ActivityIndex}
  ${Voted}
`;
