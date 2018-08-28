import gql from 'graphql-tag';

export default gql`
  mutation addToken($token: String!, $os: String!) {
    addToken(token: $token, os: $os) {
      succeeded
    }
  }
`;
