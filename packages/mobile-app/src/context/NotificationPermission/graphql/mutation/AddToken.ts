import gql from 'graphql-tag';

export const ADD_TOKEN = gql`
  mutation AddToken($token: String!, $os: String!) {
    addToken(token: $token, os: $os) {
      succeeded
    }
  }
`;
