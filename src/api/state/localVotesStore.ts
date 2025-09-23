import { create } from "zustand";
import VotesLocal, {
  ChainEntry,
  ChainEntryRaw,
  Chain,
} from "src/lib/VotesLocal";
import { useEffect } from "react";

export interface LocalVote {
  procedureId: string;
  selection?: ChainEntry["selection"];
  constituency?: string | null;
  time?: Date;
}

interface LocalVotesState {
  // flat list like old localVotesState selector
  localVotes: LocalVote[];
  // raw chain for internal modifications
  _chain?: Chain;
  // initialize from keychain (idempotent)
  hydrate: () => Promise<void>;
  setLocalVote: (vote: {
    procedureId: string;
    selection: ChainEntry["selection"];
    constituency?: string | null;
  }) => Promise<void>;
  getLocalVote: (procedureId: string) => LocalVote | undefined;
}

const transformLocalVote = (data: ChainEntryRaw): LocalVote => {
  let selection: LocalVote["selection"];
  switch (data.s) {
    case 1:
      selection = "YES";
      break;
    case 2:
      selection = "ABSTINATION";
      break;
    case 3:
      selection = "NO";
      break;
    default:
      selection = undefined;
  }
  return {
    procedureId: data.i,
    selection,
    constituency: data.c ?? null,
    time: new Date(data.t),
  };
};

export const useLocalVotesStore = create<LocalVotesState>()((set, get) => ({
  localVotes: [],
  hydrate: async () => {
    // avoid double hydration
    if (get()._chain) return;
    const chain = await VotesLocal.readKeychain();
    set({
      _chain: chain,
      localVotes: chain.d?.map(transformLocalVote) || [],
    });
  },
  setLocalVote: async ({ procedureId, selection, constituency }) => {
    // ensure hydrated
    if (!get()._chain) {
      await get().hydrate();
    }
    await VotesLocal.setVote({
      procedureId,
      selection,
      constituency: constituency ?? null,
    });
    // re-read (could be optimized, but keeps logic simple and consistent with keychain split logic)
    const chain = await VotesLocal.readKeychain();
    set({
      _chain: chain,
      localVotes: chain.d?.map(transformLocalVote) || [],
    });
  },
  getLocalVote: (procedureId: string) =>
    get().localVotes.find((v) => v.procedureId === procedureId),
}));

export const useLocalVotes = () => {
  const { localVotes, hydrate } = useLocalVotesStore();
  // ensure hydration runs once on component mount
  useEffect(() => {
    if (!useLocalVotesStore.getState()._chain) {
      // fire-and-forget; hydrate is idempotent
      void hydrate();
    }
  }, [hydrate]);
  return localVotes;
};
