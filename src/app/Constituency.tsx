import { FC } from "react";
import { ConstituencyScreen } from "../screens/Constituency";
import { useLocalSearchParams } from "expo-router";
import { RootStackParamList } from "./_layout";

const Constituency: FC = () => {
  const searchParams =
    useLocalSearchParams<RootStackParamList["Constituency"]>();
  return <ConstituencyScreen goBack={!!searchParams?.goBack} />;
};

export default Constituency;
