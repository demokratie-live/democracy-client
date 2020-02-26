import gql from 'graphql-tag';

export default gql`
  query voted($procedure: ID!) {
    votes(procedure: $procedure) {
      voted
    }
  }
`;
