/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DeviantsPartyVote
// ====================================================

export interface DeviantsPartyVote_deviants {
  __typename: "Deviants";
  yes: number;
  no: number;
  abstination: number;
  notVoted: number | null;
}

export interface DeviantsPartyVote {
  __typename: "PartyVote";
  deviants: DeviantsPartyVote_deviants;
}
