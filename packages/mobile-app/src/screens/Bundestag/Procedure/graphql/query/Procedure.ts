import { gql } from '@apollo/client';

export const PROCEDURE = gql`
  query Procedure($id: ID!, $constituencies: [String!]) {
    procedure(id: $id) {
      _id
      procedureId
      title
      sessionTOPHeading
      tags
      abstract
      voteDate
      voteEnd
      notify
      list
      type
      subjectGroups
      submissionDate
      currentStatus
      currentStatusHistory
      voted
      votedGovernment
      notify
      importantDocuments {
        editor
        type
        url
        number
      }
      communityVotes(constituencies: $constituencies) {
        yes
        abstination
        no
        total
        constituencies {
          yes
          abstination
          no
          constituency
          total
        }
      }
      voteResults {
        yes
        abstination
        no
        notVoted
        decisionText
        namedVote
        governmentDecision
        partyVotes {
          main
          party
          deviants {
            yes
            abstination
            no
            notVoted
          }
        }
      }
    }
  }
`;
