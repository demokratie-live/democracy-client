import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";
import Voted from "../fragments/ProcedureVoted";
// import Viewed from "../fragments/ProcedureViewed";

export default gql`
  query search($term: String!) {
    searchProceduresAutocomplete(term: $term) {
      procedures {
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
        # ...Viewed
      }
      autocomplete
    }
  }
  ${ActivityIndex}
  ${Voted}
`;
