import { AsyncStorage } from "react-native";

import GET_NETWORK_STATUS from "../queries/getNetworkStatus";

import VotesLocal from "../../services/VotesLocal";
import ViewedProcedures from "../../services/ViewedProcedures";

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
    isInstructionsShown: async (_, { isInstructionsShown }, { cache }) => {
      await AsyncStorage.setItem(
        "isInstructionsShown",
        JSON.stringify(isInstructionsShown)
      );
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
    },
    viewProcedure: async (_, { procedureId }) => {
      await ViewedProcedures.setViewedProcedure({
        procedureId,
        status: "VIEWED"
      });
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
    isInstructionsShown: async () =>
      JSON.parse(await AsyncStorage.getItem("isInstructionsShown")),
    votesLocalKeyStore: async () => VotesLocal.getVotesLocalList().then(votesLocal =>
        votesLocal.map(vote => ({
          ...vote,
          __typename: "voteLocalKeyStoreItem"
        }))
      ),

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
  },
  Procedure: {
    viewedStatus: async ({ procedureId }) => {
      const { status } = await ViewedProcedures.getViewProcedure(procedureId);
      return status;
    }
  }
};
