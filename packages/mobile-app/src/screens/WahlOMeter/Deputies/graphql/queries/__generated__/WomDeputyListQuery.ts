/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: WomDeputyListQuery
// ====================================================

export interface WomDeputyListQuery_deputies_data_matchesBar_procedure {
  __typename: "Procedure";
  procedureId: string;
}

export interface WomDeputyListQuery_deputies_data_matchesBar {
  __typename: "DeputyProcedure";
  decision: VoteSelection;
  procedure: WomDeputyListQuery_deputies_data_matchesBar_procedure;
}

export interface WomDeputyListQuery_deputies_data {
  __typename: "Deputy";
  _id: string;
  name: string;
  party: string | null;
  webId: string;
  imgURL: string;
  constituency: string | null;
  matchesBar: WomDeputyListQuery_deputies_data_matchesBar[];
}

export interface WomDeputyListQuery_deputies {
  __typename: "DeputiesResult";
  hasMore: boolean;
  data: WomDeputyListQuery_deputies_data[];
}

export interface WomDeputyListQuery {
  deputies: WomDeputyListQuery_deputies;
}

export interface WomDeputyListQueryVariables {
  limit?: number | null;
  filterTerm?: string | null;
  filterIds?: string[] | null;
  votedProcedureIds: string[];
}
