/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Deputies
// ====================================================

export interface Deputies_deputies_data {
  __typename: "Deputy";
  _id: string;
  name: string;
  party: string | null;
  webId: string;
  imgURL: string;
  constituency: string | null;
}

export interface Deputies_deputies {
  __typename: "DeputiesResult";
  hasMore: boolean;
  data: Deputies_deputies_data[];
}

export interface Deputies {
  deputies: Deputies_deputies;
}

export interface DeputiesVariables {
  limit?: number | null;
  offset?: number | null;
  filterTerm?: string | null;
  excludeIds?: string[] | null;
}
