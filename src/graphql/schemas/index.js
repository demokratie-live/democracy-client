export default `

    enum ViewSelection {
        VIEWED
        NEW
        UPDATE
        PUSH
    }

    type VoteSelection {
        procedure: ID!
        selection: String!
    }

    type ListStatus {
        procedureId: String!
        status: String!
    }

    type SearchTerm {
        term: String!
    }

    type Mutation {
        voteLocal(procedure: ID!, selection: VoteSelection!): VoteSelection
        viewProcedure(procedureId: String!, status: String!): ListStatus
        searchHistoryAdd(term: String!): [SearchTerm]
    }

    type Query {
        votesLocal: [VoteSelection]
        votedLocal(procedure: ID!): VoteSelection
    }
`;
