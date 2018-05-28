import IS_INSTRUCTIONS_SHOWN from "../queries/isInstructionShown";
import GET_NETWORK_STATUS from "../queries/getNetworkStatus";

import VotesLocal from "../../services/VotesLocal";

export const defaults = {
  currentScreen: "democracy.VoteList",
  votesLocal: [],
  isInstructionsShown: false,
  networkStatus: {
    __typename: "NetworkStatus",
    isConnected: true,
    requestError: ""
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
    votesLocal: async (_, { procedureId, selection }) => {
      await VotesLocal.setVoteLocal({ procedureId, selection });
      return null;
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
    isInstructionsShown: (_, args, { cache }) => {
      const previous = cache.readQuery({ query: IS_INSTRUCTIONS_SHOWN });
      return previous.isInstructionsShown;
    },

    votesLocalKeyStore: async () => {
      console.log("resolver votesLocal", await VotesLocal.getVotesLocalList());
      return VotesLocal.getVotesLocalList().then(votesLocal =>
        votesLocal.map(vote => ({
          ...vote,
          __typename: "voteLocalKeyStoreItem"
        }))
      );
    },

    votedLocal: async (_, { procedureId }) => {
      const vote = await VotesLocal.getVoteLocal(procedureId);
      if (vote && vote.selection) {
        return {
          selection: vote.selection,
          __typename: "VotedLocal"
        };
      }
      return null;
    }
  }
};
