import gql from 'graphql-tag';

export default gql`
  mutation setFilters($filters: String!) {
    setFilters(filters: $filters) @client
  }
`;
