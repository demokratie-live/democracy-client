import { gql } from '@apollo/client';

export const DEPUTY_SEARCH = gql`
  query Deputies(
    $limit: Int
    $offset: Int
    $filterTerm: String
    $filterConstituency: String
    $excludeIds: [String!]
    $period: Int
  ) {
    deputies(
      limit: $limit
      offset: $offset
      filterTerm: $filterTerm
      filterConstituency: $filterConstituency
      excludeIds: $excludeIds
      period: $period
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
    $period: Int
  ) {
    deputies(
      limit: $limit
      filterTerm: $filterTerm
      filterIds: $filterIds
      period: $period
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
