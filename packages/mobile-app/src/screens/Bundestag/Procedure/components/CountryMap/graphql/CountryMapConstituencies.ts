import { gql } from '@apollo/client';

export const CountryMapConstituenciesQuery = gql`
  query CountryMapConstituencies($procedureId: ID!) {
    procedure(id: $procedureId) {
      procedureId
      voted
      communityVotes {
        constituencies {
          yes
          no
          abstination
          total
          constituency
        }
      }
    }
  }
`;
