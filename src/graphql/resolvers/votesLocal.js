import { AsyncStorage } from 'react-native';
import VotesLocal from '../../services/VotesLocal';

export default {
  Mutation: {
    voteLocal: async (_, { procedureId, selection }) => {
      return await VotesLocal.setVote({
        procedureId,
        selection,
        constituency: await AsyncStorage.getItem('Constituency'),
      });
    },
  },
  Query: {
    voteSelectionLocal: async (_, { procedureId }) => {
      const vote = await VotesLocal.getVote(procedureId);
      if (vote && vote.selection) {
        return {
          ...vote,
          __typename: 'VoteSelectionLocal',
        };
      }
      return null;
    },

    votesSelectionLocal: async () =>
      VotesLocal.getVotes().then(votesLocal =>
        votesLocal.map(vote => ({
          ...vote,
          __typename: 'VoteSelectionLocal',
        })),
      ),
  },
};
