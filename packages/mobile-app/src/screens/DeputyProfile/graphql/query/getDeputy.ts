import { gql } from '@apollo/client';

export const GET_DEPUTY = gql`
  query GetDeputy($id: String!) {
    deputy(id: $id) {
      _id
      name
      imgURL
      party
      job
      biography
      totalProcedures
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
    }
  }
`;
