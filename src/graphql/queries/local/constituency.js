import gql from 'graphql-tag';

export default gql`
  query {
    constituency @client {
      constituency
    }
  }
`;
