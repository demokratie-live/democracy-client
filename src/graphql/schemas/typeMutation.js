export default `
type Mutation {
  voteLocal(procedureId: ID!, selection: VoteSelection!): Boolean
  viewProcedure(procedureId: String!, status: String!): ListStatus
  searchHistoryAdd(term: String!): [SearchTerm]
}`;
