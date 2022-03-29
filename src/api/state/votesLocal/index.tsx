import { atom } from 'recoil';
import VotesLocal, { Chain } from '../../../lib/VotesLocal';

export const votesLocalState = atom<Chain>({
  key: 'votesLocalState',
  default: VotesLocal.readKeychain(),
});
