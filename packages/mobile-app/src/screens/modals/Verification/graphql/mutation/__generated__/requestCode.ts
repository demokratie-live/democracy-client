/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestCode
// ====================================================

export interface requestCode_requestCode {
  __typename: "CodeResult";
  reason: string | null;
  allowNewUser: boolean | null;
  succeeded: boolean;
  resendTime: any | null;
  expireTime: any | null;
}

export interface requestCode {
  requestCode: requestCode_requestCode | null;
}

export interface requestCodeVariables {
  newPhone: string;
  oldPhoneHash?: string | null;
}
