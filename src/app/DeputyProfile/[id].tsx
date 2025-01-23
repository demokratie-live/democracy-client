import { FC } from "react";
import { DeputyProfilScreen } from "../../screens/DeputyProfile";
import { useGlobalSearchParams } from "expo-router";
import { RootStackParamList } from "../_layout";

const DeputyProfile: FC = (props) => {
  const { id } =
    useGlobalSearchParams<RootStackParamList["DeputyProfile/[id]"]>();
  return <DeputyProfilScreen id={id} />;
};

export default DeputyProfile;
