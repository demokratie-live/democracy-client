/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: DeputyChartData
// ====================================================

export interface DeputyChartData_chartData_procedures_procedure {
  __typename: "Procedure";
  procedureId: string;
}

export interface DeputyChartData_chartData_procedures {
  __typename: "DeputyProcedure";
  decision: VoteSelection;
  procedure: DeputyChartData_chartData_procedures_procedure;
}

export interface DeputyChartData_chartData {
  __typename: "Deputy";
  totalProcedures: number | null;
  party: string | null;
  imgURL: string;
  name: string;
  procedures: DeputyChartData_chartData_procedures[];
}

export interface DeputyChartData {
  chartData: DeputyChartData_chartData[];
}

export interface DeputyChartDataVariables {
  constituency: string;
  directCandidate?: boolean | null;
  procedureIds: string[];
}
