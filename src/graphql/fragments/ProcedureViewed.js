import gql from "graphql-tag";

export default gql`
  fragment Viewed on Procedure {
    viewedStatus @client
  }
`;
