/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: VotedPartyProcedures
// ====================================================

export interface VotedPartyProcedures_votedPartyProcedures_procedures_voteResults_partyVotes_deviants {
  __typename: "Deviants";
  yes: number;
  no: number;
  abstination: number;
  notVoted: number | null;
}

export interface VotedPartyProcedures_votedPartyProcedures_procedures_voteResults_partyVotes {
  __typename: "PartyVote";
  party: string;
  main: VoteSelection;
  deviants: VotedPartyProcedures_votedPartyProcedures_procedures_voteResults_partyVotes_deviants;
}

export interface VotedPartyProcedures_votedPartyProcedures_procedures_voteResults {
  __typename: "VoteResult";
  governmentDecision: VoteSelection;
  yes: number;
  abstination: number;
  no: number;
  notVoted: number | null;
  partyVotes: VotedPartyProcedures_votedPartyProcedures_procedures_voteResults_partyVotes[];
}

export interface VotedPartyProcedures_votedPartyProcedures_procedures_communityVotes {
  __typename: "CommunityVotes";
  yes: number;
  abstination: number;
  no: number;
  total: number;
}

export interface VotedPartyProcedures_votedPartyProcedures_procedures {
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
  voteResults: VotedPartyProcedures_votedPartyProcedures_procedures_voteResults | null;
  communityVotes: VotedPartyProcedures_votedPartyProcedures_procedures_communityVotes | null;
}

export interface VotedPartyProcedures_votedPartyProcedures {
  __typename: "ProceduresHavingVoteResults";
  total: number;
  procedures: VotedPartyProcedures_votedPartyProcedures_procedures[];
}

export interface VotedPartyProcedures {
  votedPartyProcedures: VotedPartyProcedures_votedPartyProcedures;
}

export interface VotedPartyProceduresVariables {
  procedureIds?: string[] | null;
  pageSize?: number | null;
  offset?: number | null;
}
