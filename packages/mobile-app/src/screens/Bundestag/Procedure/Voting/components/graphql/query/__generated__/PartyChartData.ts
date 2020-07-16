/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: PartyChartData
// ====================================================

export interface PartyChartData_proceduresByIdHavingVoteResults_procedures_voteResults_partyVotes {
  __typename: "PartyVote";
  party: string;
  main: VoteSelection;
}

export interface PartyChartData_proceduresByIdHavingVoteResults_procedures_voteResults {
  __typename: "VoteResult";
  governmentDecision: VoteSelection;
  partyVotes: PartyChartData_proceduresByIdHavingVoteResults_procedures_voteResults_partyVotes[];
}

export interface PartyChartData_proceduresByIdHavingVoteResults_procedures {
  __typename: "Procedure";
  _id: string;
  procedureId: string;
  voteResults: PartyChartData_proceduresByIdHavingVoteResults_procedures_voteResults | null;
}

export interface PartyChartData_proceduresByIdHavingVoteResults {
  __typename: "ProceduresHavingVoteResults";
  total: number;
  procedures: PartyChartData_proceduresByIdHavingVoteResults_procedures[];
}

export interface PartyChartData {
  proceduresByIdHavingVoteResults: PartyChartData_proceduresByIdHavingVoteResults;
}

export interface PartyChartDataVariables {
  procedureIds?: string[] | null;
  pageSize?: number | null;
  offset?: number | null;
}
