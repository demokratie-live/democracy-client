import { gql } from '@apollo/client';

export const GET_DEPUTY_PROCEDURES = gql`
  query GetDeputyProcedures($id: String!, $limit: Int, $offset: Int) {
    deputy(id: $id) {
      _id
      webId
      procedures(pageSize: $limit, offset: $offset) {
        decision
        procedure {
          procedureId
          title
          subjectGroups
          voted
          type
          activityIndex {
            activityIndex
          }
        }
      }
    }
  }
`;
