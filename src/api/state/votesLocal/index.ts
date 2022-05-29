import { atom, AtomEffect, selector, selectorFamily } from 'recoil';
import VotesLocal, { Chain, ChainEntry, ChainEntryRaw } from '../../../lib/VotesLocal';

export const localVotesEffect: AtomEffect<Chain> = ({ onSet, setSelf }) => {
  VotesLocal.readKeychain().then(chain => {
    setSelf(chain);
  });
  onSet((newValue, _, isReset) => {
    isReset
      ? VotesLocal.reset()
      : VotesLocal.writeKeychain(newValue).catch(err => {
          console.error('SET KEYSTORE', err);
        });
  });
};

export const votesLocalState = atom<Chain>({
  key: 'votesLocalState',
  effects: [localVotesEffect],
});

export const localVoteState = selectorFamily<LocalVote | undefined, string>({
  key: 'localVoteState',
  get:
    procedureId =>
    ({ get }) => {
      const localVotes = get(votesLocalState);

      const localVote = localVotes.d?.find(({ i }) => i === procedureId);
      return localVote ? transformLocalVote(localVote) : undefined;
    },
  set:
    procedureId =>
    ({ set, get }, localVote) => {
      const localVotes = get(votesLocalState);
      if (localVote && 'procedureId' in localVote && localVote.selection) {
        const newVote = VotesLocal.convertToKeychain({
          procedureId,
          selection: localVote.selection,
          constituency: localVote.constituency || null,
          time: new Date(),
        });
        const dataIndex = localVotes.d?.findIndex(({ i }) => i === procedureId);
        if (!dataIndex || dataIndex === -1) {
          set(votesLocalState, { ...localVotes, d: [...(localVotes.d || []), newVote] });
        } else {
          set(votesLocalState, {
            ...localVotes,
            d: localVotes.d?.map((lv, index) => (index === dataIndex ? newVote : lv)),
          });
        }
      }
    },
});

export const localVotesState = selector<LocalVote[]>({
  key: 'localVotesState',
  get: ({ get }) => {
    const localVotes = get(votesLocalState);
    return localVotes.d?.map(transformLocalVote) || ([] as LocalVote[]);
  },
});

export interface LocalVote {
  procedureId: string;
  selection?: ChainEntry['selection'];
  constituency?: string;
}

const transformLocalVote = (data: ChainEntryRaw): LocalVote => ({
  procedureId: data.i,
  selection: selectionDataToValue(data.s),
  constituency: data.c ?? undefined,
});

const selectionDataToValue = (data?: number | null): ChainEntry['selection'] | undefined => {
  switch (data) {
    case 1:
      return 'YES';
    case 2:
      return 'ABSTINATION';
    case 3:
      return 'NO';
    default:
      return undefined;
  }
};
