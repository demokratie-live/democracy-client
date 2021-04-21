/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CountryMapConstituencies
// ====================================================

export interface CountryMapConstituencies_procedure_communityVotes_constituencies {
  __typename: "CommunityConstituencyVotes";
  yes: number;
  no: number;
  abstination: number;
  total: number;
  constituency: string;
}

export interface CountryMapConstituencies_procedure_communityVotes {
  __typename: "CommunityVotes";
  constituencies: CountryMapConstituencies_procedure_communityVotes_constituencies[];
}

export interface CountryMapConstituencies_procedure {
  __typename: "Procedure";
  procedureId: string;
  voted: boolean;
  communityVotes: CountryMapConstituencies_procedure_communityVotes | null;
}

export interface CountryMapConstituencies {
  procedure: CountryMapConstituencies_procedure;
}

export interface CountryMapConstituenciesVariables {
  procedureId: string;
}
