/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDeputyProcedures
// ====================================================

export interface GetDeputyProcedures_deputy_procedures_procedure_activityIndex {
  __typename: "ActivityIndex";
  activityIndex: number;
}

export interface GetDeputyProcedures_deputy_procedures_procedure {
  __typename: "Procedure";
  procedureId: string;
  title: string;
  subjectGroups: string[];
  voted: boolean;
  type: string;
  activityIndex: GetDeputyProcedures_deputy_procedures_procedure_activityIndex;
}

export interface GetDeputyProcedures_deputy_procedures {
  __typename: "DeputyProcedure";
  decision: VoteSelection;
  procedure: GetDeputyProcedures_deputy_procedures_procedure;
}

export interface GetDeputyProcedures_deputy {
  __typename: "Deputy";
  _id: string;
  webId: string;
  procedures: GetDeputyProcedures_deputy_procedures[];
}

export interface GetDeputyProcedures {
  deputy: GetDeputyProcedures_deputy | null;
}

export interface GetDeputyProceduresVariables {
  id: string;
  limit?: number | null;
  offset?: number | null;
}
