import gql from 'graphql-tag';

export default gql`
  query votes($procedure: ID!, $constituencies: [String!]) {
    votes(procedure: $procedure, constituencies: $constituencies) {
      voted
      voteResults {
        yes
        abstination
        no
        constituencies {
          constituency
          yes
          no
          abstination
        }
      }
    }
  }
`;
