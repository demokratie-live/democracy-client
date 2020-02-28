import gql from 'graphql-tag';

export const PARTY_CHART_DATA = gql`
  query PartyChartData($procedureIds: [String!], $pageSize: Int, $offset: Int) {
    proceduresByIdHavingVoteResults(
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
