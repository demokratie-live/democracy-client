import { gql } from '@apollo/client';

export const MOST_SEARCHED = gql`
  query MostSearched {
    mostSearched {
      term
    }
  }
`;
