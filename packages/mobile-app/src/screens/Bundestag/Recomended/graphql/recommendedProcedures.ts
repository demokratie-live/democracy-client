import { gql } from '@apollo/client';

export const RECOMMENDED_PROCEDURES = gql`
  query RecommendedProcedures {
    recommendedProcedures {
      total
      hasMore
      data {
        title
        procedures {
          _id
          title
          procedureId
          sessionTOPHeading
          subjectGroups
          voteDate
          voteEnd
          list
          type
          voteWeek
          voteYear
          activityIndex {
            activityIndex
          }
          votedGovernment
          voted
          voteResults {
            yes
            abstination
            no
            governmentDecision
          }
          communityVotes {
            yes
            abstination
            no
            total
          }
        }
      }
    }
  }
`;
