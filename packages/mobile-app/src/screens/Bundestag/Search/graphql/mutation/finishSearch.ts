import { gql } from '@apollo/client';

export const FINISH_SEARCH = gql`
  mutation FinishSearch($term: String!) {
    finishSearch(term: $term) {
      term
    }
  }
`;
