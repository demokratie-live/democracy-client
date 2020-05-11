/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from './../../../../../../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: SearchProcedures
// ====================================================

export interface SearchProcedures_searchProceduresAutocomplete_procedures_voteResults {
  __typename: 'VoteResult';
  yes: number | null;
  abstination: number | null;
  no: number | null;
  governmentDecision: VoteSelection | null;
}

export interface SearchProcedures_searchProceduresAutocomplete_procedures_communityVotes {
  __typename: 'CommunityVotes';
  yes: number | null;
  abstination: number | null;
  no: number | null;
  total: number | null;
}

export interface SearchProcedures_searchProceduresAutocomplete_procedures {
  __typename: 'Procedure';
  _id: string;
  title: string;
  procedureId: string;
  sessionTOPHeading: string | null;
  subjectGroups: string[];
  tags: string[];
  abstract: string | null;
  voteDate: any | null;
  votedGovernment: boolean | null;
  submissionDate: any | null;
  completed: boolean | null;
  voted: boolean;
  type: string;
  voteResults: SearchProcedures_searchProceduresAutocomplete_procedures_voteResults | null;
  communityVotes: SearchProcedures_searchProceduresAutocomplete_procedures_communityVotes | null;
}

export interface SearchProcedures_searchProceduresAutocomplete {
  __typename: 'SearchProcedures';
  procedures: SearchProcedures_searchProceduresAutocomplete_procedures[];
  autocomplete: string[];
}

export interface SearchProcedures {
  searchProceduresAutocomplete: SearchProcedures_searchProceduresAutocomplete;
}

export interface SearchProceduresVariables {
  term: string;
}
