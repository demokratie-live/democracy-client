/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToken
// ====================================================

export interface AddToken_addToken {
  __typename: "TokenResult";
  succeeded: boolean | null;
}

export interface AddToken {
  addToken: AddToken_addToken | null;
}

export interface AddTokenVariables {
  token: string;
  os: string;
}
