import { gql } from '@apollo/client';
import { procedureVoteResultPartyVoteDeviants } from '../fragments/deviants';
import { ListItemData } from '../../../graphql/fragments/ListItemFragment';

export const VOTED_PARTY_PROCEDURES = gql`
  query VotedPartyProcedures(
    $procedureIds: [String!]
    $pageSize: Int
    $offset: Int
    $period: Int!
  ) {
    procedurecForWomPartyList: proceduresByIdHavingVoteResults(
      procedureIds: $procedureIds
      pageSize: $pageSize
      offset: $offset
      period: $period
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
