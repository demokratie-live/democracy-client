import gql from 'graphql-tag';

export const procedures = gql`
  query ProceduresList(
    $offset: Int
    $pageSize: Int
    $listTypes: [ListType!]
    $sort: String
    $filter: ProcedureFilter
  ) {
    procedures(
      offset: $offset
      pageSize: $pageSize
      listTypes: $listTypes
      sort: $sort
      filter: $filter
    ) {
      _id
      title
      procedureId
      subjectGroups
      voteDate
      list
      votedGovernment
    }
  }
`;
