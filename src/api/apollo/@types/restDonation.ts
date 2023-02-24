interface DonationData {
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

interface Result {
  donation_date: string;
  donation_paten: number;
  donation_paten_goal: number;
  donation_value: number;
  donation_value_goal: number;
  donation_percentage: number;
  donation_data: DonationData[];
}

export interface RestDonation {
  querytime: number;
  status: boolean;
  result: Result;
}
