/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DeputyMatchBar
// ====================================================

export interface DeputyMatchBar_matchesBar_procedure {
  __typename: "Procedure";
  procedureId: string;
}

export interface DeputyMatchBar_matchesBar {
  __typename: "DeputyProcedure";
  decision: VoteSelection;
  procedure: DeputyMatchBar_matchesBar_procedure;
}

export interface DeputyMatchBar {
  __typename: "Deputy";
  matchesBar: DeputyMatchBar_matchesBar[];
}
