import { gql } from '@apollo/client';

export const SHOW_RECOMMENDED = gql`
  query ShowRecommendations {
    showRecommendations
  }
`;
