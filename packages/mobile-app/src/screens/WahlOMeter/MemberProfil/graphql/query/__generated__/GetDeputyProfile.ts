/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from './../../../../../../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: GetDeputyProfile
// ====================================================

export interface GetDeputyProfile_deputiesOfConstituency_procedures_procedure {
  __typename: 'Procedure';
  procedureId: string;
}

export interface GetDeputyProfile_deputiesOfConstituency_procedures {
  __typename: 'DeputyProcedure';
  decision: VoteSelection;
  procedure: GetDeputyProfile_deputiesOfConstituency_procedures_procedure;
}

export interface GetDeputyProfile_deputiesOfConstituency_contact_links {
  __typename: 'DeputyLink';
  name: string;
  URL: string;
}

export interface GetDeputyProfile_deputiesOfConstituency_contact {
  __typename: 'DeputyContact';
  address: string | null;
  email: string | null;
  links: GetDeputyProfile_deputiesOfConstituency_contact_links[];
}

export interface GetDeputyProfile_deputiesOfConstituency {
  __typename: 'Deputy';
  name: string;
  imgURL: string;
  party: string | null;
  job: string | null;
  biography: string | null;
  totalProcedures: number | null;
  procedures: GetDeputyProfile_deputiesOfConstituency_procedures[];
  contact: GetDeputyProfile_deputiesOfConstituency_contact | null;
}

export interface GetDeputyProfile {
  deputiesOfConstituency: GetDeputyProfile_deputiesOfConstituency[];
}

export interface GetDeputyProfileVariables {
  constituency: string;
  directCandidate?: boolean | null;
}
