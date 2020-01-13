/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FinishSearch
// ====================================================

export interface FinishSearch_finishSearch {
  __typename: "SearchTerm";
  term: string;
}

export interface FinishSearch {
  finishSearch: FinishSearch_finishSearch | null;
}

export interface FinishSearchVariables {
  term: string;
}
