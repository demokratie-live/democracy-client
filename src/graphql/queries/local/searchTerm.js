import gql from "graphql-tag";

export default gql`
  query {
    searchTerm @client {
      term
    }
  }
`;
