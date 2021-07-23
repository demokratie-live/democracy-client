import { gql } from '@apollo/client';

export const DEPUTY_SEARCH = gql`
  query Deputies(
    $limit: Int
    $offset: Int
    $filterTerm: String
    $excludeIds: [String!]
  ) {
    deputies(
      limit: $limit
      offset: $offset
      filterTerm: $filterTerm
      excludeIds: $excludeIds
    ) {
      hasMore
      data {
        _id
        name
        party
        webId
        imgURL
        constituency
      }
    }
  }
`;

export const DEPUTY_FAVOURITES = gql`
  query FavouriteDeputies(
    $limit: Int
    $filterTerm: String
    $filterIds: [String!]
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
      }
    }
  }
`;
