/**
 * Custom Apollo Link that intercepts GraphQL operations and returns
 * fixture JSON data for E2E testing. Activated when E2E_FIXTURES=true
 * is set at build time via app.config.ts → Constants.expoConfig.extra.
 *
 * This link replaces the entire network stack (auth, version, http) in
 * E2E mode, providing deterministic data for stable screenshots and
 * visual regression testing.
 */
import { ApolloLink, Observable } from "@apollo/client";
import type { FetchResult, Operation, NextLink } from "@apollo/client";

import ProcedureFixture from "../../fixtures/e2e/Procedure.json";
import ProceduresListFixture from "../../fixtures/e2e/ProceduresList.json";
import CurrentConferenceWeekFixture from "../../fixtures/e2e/CurrentConferenceWeek.json";

const fixtures: Record<string, unknown> = {
  Procedure: ProcedureFixture,
  ProceduresList: ProceduresListFixture,
  CurrentConferenceWeek: CurrentConferenceWeekFixture,
};

export const fixtureLink = new ApolloLink(
  (operation: Operation, _forward: NextLink) => {
    const operationName = operation.operationName;
    const fixtureData = fixtures[operationName];

    if (fixtureData && typeof fixtureData === "object") {
      return new Observable<FetchResult>((observer) => {
        // Small delay to simulate realistic async behavior
        const handle = setTimeout(() => {
          observer.next({ data: fixtureData } as FetchResult);
          observer.complete();
        }, 50);
        return () => clearTimeout(handle);
      });
    }

    // No fixture for this operation — return an explicit error so gaps are obvious
    return new Observable<FetchResult>((observer) => {
      setTimeout(() => {
        console.warn(
          `[FixtureLink] No fixture for operation: ${operationName}`,
        );
        observer.next({
          data: null,
          errors: [
            {
              message: `[FixtureLink] No fixture for operation "${operationName}". Add it to FIXTURES map.`,
            } as any,
          ],
        });
        observer.complete();
      }, 50);
    });
  },
);
