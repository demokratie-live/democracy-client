import { gql } from '@apollo/client';
import { DEPUTY_MATCHES_BAR_FRAGMENT } from '../../components/MatchBar/graphql/matchesBar.fragment';

export const GET_DEPUTY = gql`
  query GetDeputy($id: String!, $votedProcedureIds: [String!]!) {
    deputy(id: $id) {
      _id
      webId
      name
      imgURL
      party
      job
      biography
      totalProcedures
      constituency
      procedures {
        decision
        procedure {
          procedureId
        }
      }
      contact {
        address
        email
        links {
          name
          URL
          username
        }
      }
      ...DeputyMatchBar
    }
  }
  ${DEPUTY_MATCHES_BAR_FRAGMENT}
`;
