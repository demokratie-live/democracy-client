/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: DeputyVoteResults
// ====================================================

export interface DeputyVoteResults_procedure_voteResults_deputyVotes_deputy {
  __typename: "Deputy";
  imgURL: string;
  name: string;
  party: string | null;
  constituency: string | null;
}

export interface DeputyVoteResults_procedure_voteResults_deputyVotes {
  __typename: "DeputyVote";
  deputy: DeputyVoteResults_procedure_voteResults_deputyVotes_deputy;
  decision: VoteSelection;
}

export interface DeputyVoteResults_procedure_voteResults {
  __typename: "VoteResult";
  deputyVotes: DeputyVoteResults_procedure_voteResults_deputyVotes[];
}

export interface DeputyVoteResults_procedure {
  __typename: "Procedure";
  procedureId: string;
  voteResults: DeputyVoteResults_procedure_voteResults | null;
}

export interface DeputyVoteResults {
  procedure: DeputyVoteResults_procedure;
}

export interface DeputyVoteResultsVariables {
  procedureId: string;
  constituencies: string[];
}
