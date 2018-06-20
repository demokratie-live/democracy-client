import VOTES_LOCAL from "../queries/votesLocal";
import IS_INSTRUCTIONS_SHOWN from "../queries/isInstructionShown";
import GET_NETWORK_STATUS from "../queries/getNetworkStatus";

export const defaults = {
  currentScreen: "democracy.VoteList",
  votesLocal: [],
  isInstructionsShown: false,
  networkStatus: {
    __typename: "NetworkStatus",
    isConnected: true,
    requestError: ""
  },
  searchTerm: {
    __typename: "SearchTerm",
    term: ""
  }
};

export const resolvers = {
  Mutation: {
    updateNetworkStatus: (
      _,
      { isConnected = true, requestError = "" },
      { cache }
    ) => {
      const data = cache.readQuery({ query: GET_NETWORK_STATUS });

      data.networkStatus = { ...data.networkStatus, isConnected, requestError };
      cache.writeData({ data: { networkStatus: data.networkStatus } });
      return null;
    },
    isInstructionsShown: (_, { isInstructionsShown }, { cache }) => {
      cache.writeData({ data: { isInstructionsShown } });
      return null;
    },
    votesLocal: (_, { procedure, selection }, { cache }) => {
      let previous;

      try {
        previous = cache.readQuery({ query: VOTES_LOCAL });
      } catch (error) {
        previous = { votesLocal: [] };
      }

      const newVote = {
        procedure,
        selection,
        __typename: "VoteLocalItem"
      };
      const data = {
        votesLocal: [
          ...previous.votesLocal.filter(v => v.procedure !== procedure),
          newVote
        ]
      };

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
    },
    changeSearchTerm: (_, { term }, { cache }) => {
      const data = {
        searchTerm: {
          __typename: "SearchTerm",
          term
        }
      };
      cache.writeData({ data });
      return null;
    }
  },
  Query: {
    isInstructionsShown: (_, args, { cache }) => {
      const previous = cache.readQuery({ query: IS_INSTRUCTIONS_SHOWN });
      return previous.isInstructionsShown;
    },

    votedLocal: (_, { procedure }, { cache }) => {
      let previous;
      try {
        previous = cache.readQuery({ query: VOTES_LOCAL });
      } catch (error) {
        previous = { votesLocal: [] };
      }
      return (
        previous.votesLocal.find(vote => vote.procedure === procedure) || null
      );
    }
  }
};
