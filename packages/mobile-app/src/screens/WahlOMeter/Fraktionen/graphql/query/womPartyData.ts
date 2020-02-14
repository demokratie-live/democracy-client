import gql from 'graphql-tag';

export const WOM_PARTY_DATA = gql`
  query WomPartyData($procedureIds: [String!], $pageSize: Int, $offset: Int) {
    proceduresByIdHavingVoteResults(
      procedureIds: $procedureIds
      pageSize: $pageSize
      offset: $offset
    ) {
      total
      procedures {
        _id
        procedureId
        title
        tags
        voteDate
        votedGovernment
        submissionDate
        completed
        subjectGroups
        votedGovernment
        voted
        type
        voteResults {
          governmentDecision
          yes
          abstination
          no
          notVoted
          partyVotes {
            party
            main
            deviants {
              yes
              abstination
              no
              notVoted
            }
          }
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
`;
