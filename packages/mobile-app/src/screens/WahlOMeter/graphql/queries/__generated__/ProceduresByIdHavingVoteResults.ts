/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ProceduresByIdHavingVoteResults
// ====================================================

export interface ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures_voteResults_partyVotes_deviants {
  __typename: "Deviants";
  yes: number;
  no: number;
  abstination: number;
  notVoted: number | null;
}

export interface ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures_voteResults_partyVotes {
  __typename: "PartyVote";
  party: string;
  main: VoteSelection;
  deviants: ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures_voteResults_partyVotes_deviants;
}

export interface ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures_voteResults {
  __typename: "VoteResult";
  governmentDecision: VoteSelection;
  yes: number;
  abstination: number;
  no: number;
  notVoted: number | null;
  partyVotes: ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures_voteResults_partyVotes[];
}

export interface ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures_communityVotes {
  __typename: "CommunityVotes";
  yes: number;
  abstination: number;
  no: number;
  total: number;
}

export interface ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures {
  __typename: "Procedure";
  _id: string;
  procedureId: string;
  sessionTOPHeading: string | null;
  title: string;
  tags: string[];
  voteDate: any | null;
  votedGovernment: boolean | null;
  submissionDate: any | null;
  completed: boolean | null;
  subjectGroups: string[];
  voted: boolean;
  type: string;
  voteResults: ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures_voteResults | null;
  communityVotes: ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures_communityVotes | null;
}

export interface ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3 {
  __typename: "ProceduresHavingVoteResults";
  total: number;
  procedures: ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures[];
}

export interface ProceduresByIdHavingVoteResults {
  proceduresByIdHavingVoteResults3: ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3;
}

export interface ProceduresByIdHavingVoteResultsVariables {
  procedureIds?: string[] | null;
  pageSize?: number | null;
  offset?: number | null;
}
