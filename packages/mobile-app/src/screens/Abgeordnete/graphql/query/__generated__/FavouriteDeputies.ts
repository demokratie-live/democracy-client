/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FavouriteDeputies
// ====================================================

export interface FavouriteDeputies_deputies_data {
  __typename: "Deputy";
  _id: string;
  name: string;
  party: string | null;
  webId: string;
  imgURL: string;
  constituency: string | null;
}

export interface FavouriteDeputies_deputies {
  __typename: "DeputiesResult";
  hasMore: boolean;
  data: FavouriteDeputies_deputies_data[];
}

export interface FavouriteDeputies {
  deputies: FavouriteDeputies_deputies;
}

export interface FavouriteDeputiesVariables {
  limit?: number | null;
  filterTerm?: string | null;
  filterIds?: string[] | null;
}
