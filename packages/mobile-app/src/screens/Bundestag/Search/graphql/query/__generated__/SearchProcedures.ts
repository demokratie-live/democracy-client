/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchProcedures
// ====================================================

export interface SearchProcedures_searchProceduresAutocomplete_procedures {
  __typename: "Procedure";
  _id: string;
  title: string;
  procedureId: string;
  tags: (string | null)[] | null;
  abstract: string | null;
  voteDate: any | null;
  votedGovernment: boolean | null;
  submissionDate: any | null;
  completed: boolean | null;
  voted: boolean;
}

export interface SearchProcedures_searchProceduresAutocomplete {
  __typename: "SearchProcedures";
  procedures: SearchProcedures_searchProceduresAutocomplete_procedures[];
  autocomplete: string[];
}

export interface SearchProcedures {
  searchProceduresAutocomplete: SearchProcedures_searchProceduresAutocomplete;
}

export interface SearchProceduresVariables {
  term: string;
}
