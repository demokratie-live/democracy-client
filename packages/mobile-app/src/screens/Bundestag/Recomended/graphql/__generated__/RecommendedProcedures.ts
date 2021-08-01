/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListType, VoteSelection } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: RecommendedProcedures
// ====================================================

export interface RecommendedProcedures_recommendedProcedures_data_procedures_activityIndex {
  __typename: "ActivityIndex";
  activityIndex: number;
}

export interface RecommendedProcedures_recommendedProcedures_data_procedures_voteResults {
  __typename: "VoteResult";
  yes: number;
  abstination: number;
  no: number;
  governmentDecision: VoteSelection;
}

export interface RecommendedProcedures_recommendedProcedures_data_procedures_communityVotes {
  __typename: "CommunityVotes";
  yes: number;
  abstination: number;
  no: number;
  total: number;
}

export interface RecommendedProcedures_recommendedProcedures_data_procedures {
  __typename: "Procedure";
  _id: string;
  title: string;
  procedureId: string;
  sessionTOPHeading: string | null;
  subjectGroups: string[];
  voteDate: any | null;
  voteEnd: any | null;
  list: ListType | null;
  type: string;
  voteWeek: number | null;
  voteYear: number | null;
  activityIndex: RecommendedProcedures_recommendedProcedures_data_procedures_activityIndex;
  votedGovernment: boolean | null;
  voted: boolean;
  voteResults: RecommendedProcedures_recommendedProcedures_data_procedures_voteResults | null;
  communityVotes: RecommendedProcedures_recommendedProcedures_data_procedures_communityVotes | null;
}

export interface RecommendedProcedures_recommendedProcedures_data {
  __typename: "RecommendationGroup";
  title: string;
  procedures: RecommendedProcedures_recommendedProcedures_data_procedures[];
}

export interface RecommendedProcedures_recommendedProcedures {
  __typename: "RecommendedProceduresResult";
  total: number;
  hasMore: boolean;
  data: RecommendedProcedures_recommendedProcedures_data[];
}

export interface RecommendedProcedures {
  recommendedProcedures: RecommendedProcedures_recommendedProcedures;
}
