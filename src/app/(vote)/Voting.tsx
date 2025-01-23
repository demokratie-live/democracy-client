import { FC } from "react";
import { VotingScreen } from "../../screens/Voting";
import { RootStackParamList } from "../_layout";
import { useLocalSearchParams } from "expo-router";

const Voting: FC = () => {
  const searchParams = useLocalSearchParams<RootStackParamList["(vote)"]>();
  return <VotingScreen {...searchParams} />;
};

export default Voting;
