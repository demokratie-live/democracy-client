import gql from 'graphql-tag';

export const VOTE_STATISTIC = gql`
  query VoteStatistic {
    voteStatistic {
      proceduresCount
      votedProcedures
    }
  }
`;
