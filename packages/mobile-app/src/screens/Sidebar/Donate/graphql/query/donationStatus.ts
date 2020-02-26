import gql from 'graphql-tag';

export const DONATION_STATUS = gql`
  query DonationStatus {
    donationStatus @rest(type: "Donation", path: "?call=donation_status") {
      result
    }
  }
`;
