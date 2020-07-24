import { gql } from '@apollo/client';

export const CURRENT_CONFERENCE_WEEK = gql`
  query CurrentConferenceWeek {
    currentConferenceWeek {
      start
      end
      calendarWeek
    }
  }
`;
