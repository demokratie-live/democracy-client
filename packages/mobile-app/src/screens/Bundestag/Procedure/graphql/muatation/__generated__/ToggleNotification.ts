/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleNotification
// ====================================================

export interface ToggleNotification_toggleNotification {
  __typename: "Procedure";
  notify: boolean | null;
}

export interface ToggleNotification {
  toggleNotification: ToggleNotification_toggleNotification | null;
}

export interface ToggleNotificationVariables {
  procedureId: string;
}
