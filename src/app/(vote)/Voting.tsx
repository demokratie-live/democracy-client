import { FC } from "react";
import { VotingScreen } from "../../screens/Voting";
import { RootStackParamList } from "../_layout";
import { useGlobalSearchParams } from "expo-router";

const Voting: FC = () => {
  const searchParams = useGlobalSearchParams<RootStackParamList["(vote)"]>();
  return <VotingScreen {...searchParams} />;
};

export default Voting;
