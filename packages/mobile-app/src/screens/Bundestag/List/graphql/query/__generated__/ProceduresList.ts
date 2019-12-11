/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ListType, ProcedureFilter, VoteSelection } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ProceduresList
// ====================================================

export interface ProceduresList_procedures_activityIndex {
  __typename: "ActivityIndex";
  activityIndex: number;
}

export interface ProceduresList_procedures_voteResults {
  __typename: "VoteResult";
  yes: number | null;
  abstination: number | null;
  no: number | null;
  governmentDecision: VoteSelection | null;
}

export interface ProceduresList_procedures_communityVotes {
  __typename: "CommunityVotes";
  yes: number | null;
  abstination: number | null;
  no: number | null;
  total: number | null;
}

export interface ProceduresList_procedures {
  __typename: "Procedure";
  _id: string;
  title: string;
  procedureId: string;
  sessionTOPHeading: string | null;
  subjectGroups: string[] | null;
  voteDate: any | null;
  list: ListType | null;
  type: string | null;
  activityIndex: ProceduresList_procedures_activityIndex;
  votedGovernment: boolean | null;
  voted: boolean;
  voteResults: ProceduresList_procedures_voteResults | null;
  communityVotes: ProceduresList_procedures_communityVotes | null;
}

export interface ProceduresList {
  procedures: ProceduresList_procedures[];
}

export interface ProceduresListVariables {
  offset?: number | null;
  pageSize?: number | null;
  listTypes?: ListType[] | null;
  sort?: string | null;
  filter?: ProcedureFilter | null;
}
