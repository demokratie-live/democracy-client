import gql from "graphql-tag";

export default gql`
  mutation isInstructionsShown($isInstructionsShown: String!) {
    isInstructionsShown(isInstructionsShown: $isInstructionsShown) @client
  }
`;
