import gql from "graphql-tag";

export default gql`
  fragment Verified on Procedure {
    verified
  }
`;
