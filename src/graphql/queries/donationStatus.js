import gql from 'graphql-tag';

export default gql`
  query donationStatus {
    donationStatus @rest(type: "Donation", path: "?call=donation_status") {
      result
    }
  }
`;
