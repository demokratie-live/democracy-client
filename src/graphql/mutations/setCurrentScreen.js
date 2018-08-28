import gql from 'graphql-tag';

export default gql`
  mutation currentScreen($screen: String!) {
    currentScreen(currentScreen: $screen) @client
  }
`;
