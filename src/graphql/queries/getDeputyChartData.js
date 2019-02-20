import gql from 'graphql-tag';

// Fragments

export default gql`
  query deputyChartData(
    $constituency: String!
    $directCandidate: Boolean
    $procedureIds: [String!]!
  ) {
    chartData: deputiesOfConstituency(
      constituency: $constituency
      directCandidate: $directCandidate
    ) {
      totalProcedures
      party
      imgURL
      name
      procedures(procedureIds: $procedureIds) {
        decision
        procedure {
          procedureId
        }
      }
    }
  }
`;
