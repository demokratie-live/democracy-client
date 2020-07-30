import { gql } from '@apollo/client';
import { ListItemData } from '../fragments/ListItemFragment';
import { procedureVoteResultPartyVoteDeviants } from '../../Fraktionen/graphql/fragments/deviants';

export const PROCEDURES_BY_HAVING_VOTE_RESULTS = gql`
  query ProceduresByIdHavingVoteResults(
    $procedureIds: [String!]
    $pageSize: Int
    $offset: Int
  ) {
    proceduresByIdHavingVoteResults3: proceduresByIdHavingVoteResults(
      procedureIds: $procedureIds
      pageSize: $pageSize
      offset: $offset
    ) {
      total
      procedures {
        ...ListItemData
        voteResults {
          partyVotes {
            ...DeviantsPartyVote
          }
        }
      }
    }
  }
  ${procedureVoteResultPartyVoteDeviants}
  ${ListItemData}
`;
