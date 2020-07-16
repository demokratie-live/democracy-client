/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Vote
// ====================================================

export interface Vote_vote {
  __typename: "Vote";
  voted: boolean;
}

export interface Vote {
  vote: Vote_vote;
}

export interface VoteVariables {
  procedure: string;
  selection: VoteSelection;
  constituency?: string | null;
}
