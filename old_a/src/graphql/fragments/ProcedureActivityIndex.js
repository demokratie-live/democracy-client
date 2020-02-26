import gql from 'graphql-tag';

export default gql`
  fragment ActivityIndex on Procedure {
    activityIndex {
      activityIndex
      active
    }
  }
`;
