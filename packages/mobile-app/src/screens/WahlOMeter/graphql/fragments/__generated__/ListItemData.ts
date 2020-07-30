/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ListItemData
// ====================================================

export interface ListItemData_voteResults_partyVotes {
  __typename: "PartyVote";
  party: string;
  main: VoteSelection;
}

export interface ListItemData_voteResults {
  __typename: "VoteResult";
  governmentDecision: VoteSelection;
  yes: number;
  abstination: number;
  no: number;
  notVoted: number | null;
  partyVotes: ListItemData_voteResults_partyVotes[];
}

export interface ListItemData_communityVotes {
  __typename: "CommunityVotes";
  yes: number;
  abstination: number;
  no: number;
  total: number;
}

export interface ListItemData {
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
  voteResults: ListItemData_voteResults | null;
  communityVotes: ListItemData_communityVotes | null;
}
