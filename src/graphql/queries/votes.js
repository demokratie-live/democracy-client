import gql from 'graphql-tag';

export default gql`
  query votes($procedure: ID!) {
    votes(procedure: $procedure) {
      voted
      voteResults {
        yes
        abstination
        no
      }
    }
  }
`;
