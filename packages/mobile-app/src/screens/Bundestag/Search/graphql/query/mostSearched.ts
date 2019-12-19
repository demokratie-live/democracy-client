import gql from 'graphql-tag';

export const MOST_SEARCHED = gql`
  query MostSearched {
    mostSearched {
      term
    }
  }
`;
