import { gql } from '@apollo/client';

export const DEPUTY_MATCHES_BAR_FRAGMENT = gql`
  fragment DeputyMatchBar on Deputy {
    matchesBar: procedures(procedureIds: $votedProcedureIds) {
      decision
      procedure {
        procedureId
      }
    }
  }
`;
