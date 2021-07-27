import { gql } from '@apollo/client';
import { DEPUTY_MATCHES_BAR_FRAGMENT } from '../../../../DeputyProfile/components/MatchBar/graphql/matchesBar.fragment';

export const WOM_DEPUTY_LIST = gql`
  query WomDeputyListQuery(
    $limit: Int
    $filterTerm: String
    $filterIds: [String!]
    $votedProcedureIds: [String!]!
  ) {
    deputies(limit: $limit, filterTerm: $filterTerm, filterIds: $filterIds) {
      hasMore
      data {
        _id
        name
        party
        webId
        imgURL
        constituency
        ...DeputyMatchBar
      }
    }
  }
  ${DEPUTY_MATCHES_BAR_FRAGMENT}
`;
