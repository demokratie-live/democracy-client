export default `
    type VoteSelection {
        procedure: ID!
        selection: String!
    }

    type Mutation {
        voteLocal(procedure: ID!, selection: VoteSelection!): VoteSelection
    }

    type Query {
        votesLocal: [VoteSelection]
        votedLocal(procedure: ID!): VoteSelection
    }
`;
