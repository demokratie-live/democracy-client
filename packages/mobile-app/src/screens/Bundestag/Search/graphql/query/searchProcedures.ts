import gql from 'graphql-tag';

export const SEARCH_PROCEDURES = gql`
  query SearchProcedures($term: String!) {
    searchProceduresAutocomplete(term: $term) {
      procedures {
        _id
        title
        procedureId
        tags
        abstract
        voteDate
        votedGovernment
        submissionDate
        completed
        voted
        type
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
      autocomplete
    }
  }
`;
