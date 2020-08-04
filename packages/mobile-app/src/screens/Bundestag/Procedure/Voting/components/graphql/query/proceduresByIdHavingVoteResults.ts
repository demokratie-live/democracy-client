import { gql } from '@apollo/client';

export const PARTY_CHART_DATA = gql`
  query PartyChartData($procedureIds: [String!], $pageSize: Int, $offset: Int) {
    partyChartProcedures: proceduresByIdHavingVoteResults(
      procedureIds: $procedureIds
      pageSize: $pageSize
      offset: $offset
    ) {
      total
      procedures {
        _id
        procedureId
        voteResults {
          governmentDecision
          partyVotes {
            party
            main
          }
        }
      }
    }
  }
`;
