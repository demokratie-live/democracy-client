import gql from 'graphql-tag';

export const CURRENT_CONFERENCE_WEEK = gql`
  query CurrentConferenceWeek {
    currentConferenceWeek {
      start
      end
      calendarWeek
    }
  }
`;
