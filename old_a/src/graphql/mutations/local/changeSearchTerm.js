import gql from 'graphql-tag';

export default gql`
  mutation changeSearchTerm($term: String!) {
    changeSearchTerm(term: $term) @client
  }
`;
