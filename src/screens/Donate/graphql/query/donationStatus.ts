import { gql } from '@apollo/client';

export const DONATION_STATUS = gql`
  query DonationStatus {
    donationStatus @rest(type: "Donation", path: "?call=donation_status") {
      result
    }
  }
`;

export interface DonationStatus {
  querytime: number;
  status: boolean;
  result: DonationStatusResult;
}

export interface DonationStatusResult {
  donation_date: string;
  donation_paten: number;
  donation_paten_goal: number;
  donation_value: number;
  donation_value_goal: number;
  donation_percentage: number;
  donation_data: DonationDatum[];
}

export interface DonationDatum {
  id: number;
  order: number;
  type: number;
  value: number;
  max: number;
  text_cost: string;
  text_description: string;
  text_description_subtext: string;
  text_date: string;
  percentage: number;
}
