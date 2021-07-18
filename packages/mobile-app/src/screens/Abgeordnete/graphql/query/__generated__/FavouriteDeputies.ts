/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FavouriteDeputies
// ====================================================

export interface FavouriteDeputies_deputies {
  __typename: "Deputy";
  _id: string;
  name: string;
  party: string | null;
  webId: string;
  imgURL: string;
}

export interface FavouriteDeputies {
  deputies: FavouriteDeputies_deputies[];
}

export interface FavouriteDeputiesVariables {
  limit?: number | null;
  filterTerm?: string | null;
  filterIds?: string[] | null;
}
