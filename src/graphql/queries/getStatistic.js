import gql from 'graphql-tag';

export default gql`
  query voteStatistic {
    voteStatistic {
      proceduresCount
      votedProcedures
    }
  }
`;
