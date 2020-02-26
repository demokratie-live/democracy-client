import gql from 'graphql-tag';

export default gql`
  query deputiesOfConstituency($constituency: String!, $directCandidate: Boolean) {
    deputiesOfConstituency(constituency: $constituency, directCandidate: $directCandidate) {
      name
      imgURL
      party
      job
      biography
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
