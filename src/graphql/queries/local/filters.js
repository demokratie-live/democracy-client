import gql from "graphql-tag";

export default gql`
  query {
    filters @client {
      filters
    }
  }
`;
