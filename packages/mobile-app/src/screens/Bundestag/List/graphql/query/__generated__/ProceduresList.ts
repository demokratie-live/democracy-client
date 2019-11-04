/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ListType, ProcedureFilter } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ProceduresList
// ====================================================

export interface ProceduresList_procedures {
  __typename: "Procedure";
  _id: string;
  title: string;
  procedureId: string;
  subjectGroups: (string | null)[] | null;
  voteDate: any | null;
  list: ListType | null;
  votedGovernment: boolean | null;
}

export interface ProceduresList {
  procedures: (ProceduresList_procedures | null)[] | null;
}

export interface ProceduresListVariables {
  offset?: number | null;
  pageSize?: number | null;
  listTypes?: ListType[] | null;
  sort?: string | null;
  filter?: ProcedureFilter | null;
}
