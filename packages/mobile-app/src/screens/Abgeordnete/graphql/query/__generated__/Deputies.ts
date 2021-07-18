/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Deputies
// ====================================================

export interface Deputies_deputies {
  __typename: "Deputy";
  _id: string;
  name: string;
  party: string | null;
  webId: string;
  imgURL: string;
}

export interface Deputies {
  deputies: Deputies_deputies[];
}

export interface DeputiesVariables {
  limit?: number | null;
  offset?: number | null;
  filterTerm?: string | null;
  excludeIds?: string[] | null;
}
