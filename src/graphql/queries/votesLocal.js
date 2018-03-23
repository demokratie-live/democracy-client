import gql from "graphql-tag";

export default gql`
  query votesLocal {
    votesLocal @client {
      procedure
      selection
    }
  }
`;
