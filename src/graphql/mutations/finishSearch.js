import gql from "graphql-tag";

export default gql`
  mutation finishSearch($term: String!) {
    finishSearch(term: $term) {
      term
    }
  }
`;
