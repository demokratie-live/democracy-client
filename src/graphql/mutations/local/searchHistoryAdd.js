import gql from "graphql-tag";

export default gql`
  mutation searchHistoryAdd($term: String!) {
    searchHistoryAdd(term: $term) @client
  }
`;
