/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { VoteSelection } from './../../../../../../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: WomPartyData
// ====================================================

export interface WomPartyData_proceduresByIdHavingVoteResults_procedures_voteResults_partyVotes_deviants {
  __typename: 'Deviants';
  yes: number | null;
  abstination: number | null;
  no: number | null;
  notVoted: number | null;
}

export interface WomPartyData_proceduresByIdHavingVoteResults_procedures_voteResults_partyVotes {
  __typename: 'PartyVote';
  party: string;
  main: VoteSelection | null;
  deviants: WomPartyData_proceduresByIdHavingVoteResults_procedures_voteResults_partyVotes_deviants;
}

export interface WomPartyData_proceduresByIdHavingVoteResults_procedures_voteResults {
  __typename: 'VoteResult';
  governmentDecision: VoteSelection | null;
  yes: number | null;
  abstination: number | null;
  no: number | null;
  notVoted: number | null;
  partyVotes: WomPartyData_proceduresByIdHavingVoteResults_procedures_voteResults_partyVotes[];
}

export interface WomPartyData_proceduresByIdHavingVoteResults_procedures_communityVotes {
  __typename: 'CommunityVotes';
  yes: number | null;
  abstination: number | null;
  no: number | null;
  total: number | null;
}

export interface WomPartyData_proceduresByIdHavingVoteResults_procedures {
  __typename: 'Procedure';
  _id: string;
  procedureId: string;
  title: string;
  tags: (string | null)[] | null;
  voteDate: any | null;
  votedGovernment: boolean | null;
  submissionDate: any | null;
  completed: boolean | null;
  subjectGroups: string[] | null;
  voted: boolean;
  type: string;
  voteResults: WomPartyData_proceduresByIdHavingVoteResults_procedures_voteResults | null;
  communityVotes: WomPartyData_proceduresByIdHavingVoteResults_procedures_communityVotes | null;
}

export interface WomPartyData_proceduresByIdHavingVoteResults {
  __typename: 'ProceduresHavingVoteResults';
  total: number | null;
  procedures: WomPartyData_proceduresByIdHavingVoteResults_procedures[];
}

export interface WomPartyData {
  proceduresByIdHavingVoteResults: WomPartyData_proceduresByIdHavingVoteResults;
}

export interface WomPartyDataVariables {
  procedureIds?: string[] | null;
  pageSize?: number | null;
  offset?: number | null;
}
