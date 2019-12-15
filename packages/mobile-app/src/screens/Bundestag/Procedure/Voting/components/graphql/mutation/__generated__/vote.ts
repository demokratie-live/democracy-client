/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Vote
// ====================================================

export interface Vote_vote {
  __typename: "Vote";
  voted: boolean | null;
}

export interface Vote {
  vote: Vote_vote | null;
}

export interface VoteVariables {
  procedureId: string;
  selection: VoteSelection;
  constituency?: string | null;
}
