import { useEffect, useState } from "react";
import VotesLocal from "../lib/VotesLocal";

export const useLocalVotes = () => {
  const [localVotes, setLocalVotes] = useState<VotesLocal | null>(null);

  useEffect(() => {
    VotesLocal.getVotes().then((votes) => {
      setLocalVotes(votes);
    });
  }, []);

  return { localVotes };
};
