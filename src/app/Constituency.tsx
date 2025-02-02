import { FC } from "react";
import { ConstituencyScreen } from "../screens/Constituency";
import { useGlobalSearchParams } from "expo-router";
import { RootStackParamList } from "./_layout";

const Constituency: FC = () => {
  const searchParams =
    useGlobalSearchParams<RootStackParamList["Constituency"]>();
  return <ConstituencyScreen goBack={!!searchParams?.goBack} />;
};

export default Constituency;
