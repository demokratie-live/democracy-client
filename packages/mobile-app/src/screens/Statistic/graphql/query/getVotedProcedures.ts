import gql from 'graphql-tag';

export const VOTED_PROCEDURE = gql`
  query VotedProcedures {
    votedProcedures {
      _id
      title
      sessionTOPHeading
      subjectGroups
      procedureId
      currentStatus
      type
      subjectGroups
      abstract
      voteDate
      voteEnd
      votedGovernment
      submissionDate
      completed
      voted
      votedGovernment
      voteResults {
        yes
        abstination
        no
        notVoted
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
`;
