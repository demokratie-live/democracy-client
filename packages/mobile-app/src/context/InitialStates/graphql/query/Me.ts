import gql from 'graphql-tag';

export default gql`
  query Me {
    me {
      _id
      verified
    }
  }
`;
