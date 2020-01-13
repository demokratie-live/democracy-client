/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: VotedProcedures
// ====================================================

export interface VotedProcedures_votedProcedures_voteResults {
  __typename: "VoteResult";
  yes: number | null;
  abstination: number | null;
  no: number | null;
  notVoted: number | null;
  governmentDecision: VoteSelection | null;
}

export interface VotedProcedures_votedProcedures_communityVotes {
  __typename: "CommunityVotes";
  yes: number | null;
  abstination: number | null;
  no: number | null;
  total: number | null;
}

export interface VotedProcedures_votedProcedures {
  __typename: "Procedure";
  _id: string;
  title: string;
  sessionTOPHeading: string | null;
  subjectGroups: string[] | null;
  procedureId: string;
  currentStatus: string | null;
  type: string;
  abstract: string | null;
  voteDate: any | null;
  voteEnd: any | null;
  votedGovernment: boolean | null;
  submissionDate: any | null;
  completed: boolean | null;
  voted: boolean;
  voteResults: VotedProcedures_votedProcedures_voteResults | null;
  communityVotes: VotedProcedures_votedProcedures_communityVotes | null;
}

export interface VotedProcedures {
  votedProcedures: VotedProcedures_votedProcedures[];
}
