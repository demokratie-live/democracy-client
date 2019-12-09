/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ListType {
  CONFERENCEWEEKS_PLANNED = "CONFERENCEWEEKS_PLANNED",
  HOT = "HOT",
  IN_VOTE = "IN_VOTE",
  PAST = "PAST",
  PREPARATION = "PREPARATION",
  TOP100 = "TOP100",
}

export enum VoteSelection {
  ABSTINATION = "ABSTINATION",
  NO = "NO",
  NOTVOTED = "NOTVOTED",
  YES = "YES",
}

export interface ProcedureFilter {
  subjectGroups?: (string | null)[] | null;
  status?: (string | null)[] | null;
  type?: (string | null)[] | null;
  activity?: (string | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
