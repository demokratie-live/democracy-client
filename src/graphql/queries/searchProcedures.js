import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";
import Voted from "../fragments/ProcedureVoted";

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
      }
      autocomplete
    }
  }
  ${ActivityIndex}
  ${Voted}
`;
