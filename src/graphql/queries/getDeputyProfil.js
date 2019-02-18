import gql from 'graphql-tag';

export default gql`
  query deputyProfil($constituency: String!, $directCandidate: Boolean) {
    deputiesOfConstituency(constituency: $constituency, directCandidate: $directCandidate) {
      name
      imgURL
      party
      job
      biography
      totalProcedures
      procedures {
        decision
        procedure {
          procedureId
        }
      }
      contact {
        address
        email
        links {
          name
          URL
        }
      }
    }
  }
`;
