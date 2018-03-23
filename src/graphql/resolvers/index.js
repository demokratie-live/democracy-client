import VOTES_LOCAL from "../queries/votesLocal";

export const defaults = {
  isInstructionsShown: false,
  currentScreen: "democracy.VoteList",
  votesLocal: []
};

export const resolvers = {
  Mutation: {
    isInstructionsShown: (_, { isInstructionsShown }, { cache }) => {
      cache.writeData({ data: { isInstructionsShown } });
      return null;
    },
    votesLocal: (_, { procedure, selection }, { cache }) => {
      const previous = cache.readQuery({ query: VOTES_LOCAL });
      const newVote = {
        procedure,
        selection,
        __typename: "VoteLocalItem"
      };
      const data = {
        votesLocal: previous.votesLocal.concat([newVote])
      };
      console.log("resolver", { previous, data });
      cache.writeData({ data });
      return newVote;
    },
    currentScreen: (_, { currentScreen }, { cache }) => {
      switch (currentScreen) {
        case "democracy.SideMenu":
        case "democracy.Detail":
        case "democracy.Instructions":
        case "democracy.Search":
          break;

        default:
          cache.writeData({ data: { currentScreen } });
          break;
      }
      return null;
    }
  },
  Query: {
    votedLocal: (_, { procedure }, { cache }) => {
      const previous = cache.readQuery({ query: VOTES_LOCAL });

      console.log("Query votedLocal", procedure, previous.votesLocal);
      return (
        previous.votesLocal.find(vote => vote.procedure === procedure) || null
      );
    }
  }
};
