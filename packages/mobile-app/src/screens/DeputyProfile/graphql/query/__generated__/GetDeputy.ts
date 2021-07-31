/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDeputy
// ====================================================

export interface GetDeputy_deputy_procedures_procedure {
  __typename: "Procedure";
  procedureId: string;
}

export interface GetDeputy_deputy_procedures {
  __typename: "DeputyProcedure";
  decision: VoteSelection;
  procedure: GetDeputy_deputy_procedures_procedure;
}

export interface GetDeputy_deputy_contact_links {
  __typename: "DeputyLink";
  name: string;
  URL: string;
  username: string | null;
}

export interface GetDeputy_deputy_contact {
  __typename: "DeputyContact";
  address: string | null;
  email: string | null;
  links: GetDeputy_deputy_contact_links[];
}

export interface GetDeputy_deputy_matchesBar_procedure {
  __typename: "Procedure";
  procedureId: string;
}

export interface GetDeputy_deputy_matchesBar {
  __typename: "DeputyProcedure";
  decision: VoteSelection;
  procedure: GetDeputy_deputy_matchesBar_procedure;
}

export interface GetDeputy_deputy {
  __typename: "Deputy";
  _id: string;
  webId: string;
  name: string;
  imgURL: string;
  party: string | null;
  job: string | null;
  biography: string | null;
  totalProcedures: number | null;
  constituency: string | null;
  procedures: GetDeputy_deputy_procedures[];
  contact: GetDeputy_deputy_contact | null;
  matchesBar: GetDeputy_deputy_matchesBar[];
}

export interface GetDeputy {
  deputy: GetDeputy_deputy | null;
}

export interface GetDeputyVariables {
  id: string;
  votedProcedureIds: string[];
}
