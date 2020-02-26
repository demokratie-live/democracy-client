import gql from 'graphql-tag';

export default gql`
  mutation setConstituency($constituency: String!) {
    setConstituency(constituency: $constituency) @client
  }
`;
