/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: DeputyProcedures
// ====================================================

export interface DeputyProcedures_deputyProcedures_procedures_procedure_voteResults_partyVotes_deviants {
  __typename: "Deviants";
  yes: number;
  no: number;
  abstination: number;
  notVoted: number | null;
}

export interface DeputyProcedures_deputyProcedures_procedures_procedure_voteResults_partyVotes {
  __typename: "PartyVote";
  party: string;
  main: VoteSelection;
  deviants: DeputyProcedures_deputyProcedures_procedures_procedure_voteResults_partyVotes_deviants;
}

export interface DeputyProcedures_deputyProcedures_procedures_procedure_voteResults {
  __typename: "VoteResult";
  governmentDecision: VoteSelection;
  yes: number;
  abstination: number;
  no: number;
  notVoted: number | null;
  partyVotes: DeputyProcedures_deputyProcedures_procedures_procedure_voteResults_partyVotes[];
}

export interface DeputyProcedures_deputyProcedures_procedures_procedure_communityVotes {
  __typename: "CommunityVotes";
  yes: number;
  abstination: number;
  no: number;
  total: number;
}

export interface DeputyProcedures_deputyProcedures_procedures_procedure {
  __typename: "Procedure";
  _id: string;
  procedureId: string;
  sessionTOPHeading: string | null;
  title: string;
  subjectGroups: string[];
  voteDate: any | null;
  votedGovernment: boolean | null;
  submissionDate: any | null;
  completed: boolean | null;
  voted: boolean;
  type: string;
  voteResults: DeputyProcedures_deputyProcedures_procedures_procedure_voteResults | null;
  communityVotes: DeputyProcedures_deputyProcedures_procedures_procedure_communityVotes | null;
}

export interface DeputyProcedures_deputyProcedures_procedures {
  __typename: "DeputyProcedure";
  decision: VoteSelection;
  procedure: DeputyProcedures_deputyProcedures_procedures_procedure;
}

export interface DeputyProcedures_deputyProcedures {
  __typename: "Deputy";
  _id: string;
  totalProcedures: number | null;
  procedures: DeputyProcedures_deputyProcedures_procedures[];
}

export interface DeputyProcedures {
  deputyProcedures: DeputyProcedures_deputyProcedures[];
}

export interface DeputyProceduresVariables {
  constituency: string;
  directCandidate?: boolean | null;
  offset?: number | null;
  pageSize?: number | null;
}
