import gql from 'graphql-tag';

export default gql`
  query {
    searchHistory @client {
      term
    }
  }
`;
