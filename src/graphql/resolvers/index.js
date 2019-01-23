import { merge } from 'lodash';

import resolverVotesLocal from './votesLocal';
import resolverOther from './other';

export const resolvers = merge(resolverVotesLocal, resolverOther);

export const defaults = {
  currentScreen: 'democracy.VoteList',
  // votesLocal: [],
  isInstructionsShown: false,
  networkStatus: {
    __typename: 'NetworkStatus',
    isConnected: true,
    requestError: '',
  },
  searchTerm: {
    __typename: 'SearchTerm',
    term: '',
  },
  searchHistory: [],
};
