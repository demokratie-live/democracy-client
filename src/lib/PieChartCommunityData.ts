import { Slice } from '../components/PieChart';
import { CommunityVotes } from '../__generated__/graphql';

interface Props {
  communityVotes?: Pick<CommunityVotes, 'yes' | 'total' | 'abstination' | 'no'> | null;
  voted: boolean;
  localSelection?: 'YES' | 'ABSTINATION' | 'NO';
}

export const communityVoteData = ({ communityVotes, voted, localSelection }: Props): Slice[] =>
  communityVotes
    ? [
        {
          percent: (communityVotes.yes || 0) / (communityVotes.total || 0),
          color: voted ? '#16C063' : '#C7C7CC',
          large: localSelection === 'YES',
        },
        {
          percent: (communityVotes.abstination || 0) / (communityVotes.total || 0),
          color: voted ? '#2882E4' : '#D8D8D8',
          large: localSelection === 'ABSTINATION',
        },
        {
          percent: (communityVotes.no || 0) / (communityVotes.total || 0),
          color: voted ? '#EC3E31' : '#B0AFB7',
          large: localSelection === 'NO',
        },
      ]
    : [{ percent: 1, color: '#d8d8d8', large: true }];
