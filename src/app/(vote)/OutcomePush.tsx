import { FC } from "react";
import { RouteProp } from "@react-navigation/native";
import { OutcomePushs } from "../../screens/OutcomePushs";
import { VoteStackParamList } from "./_layout";

export type OutcomePushProps = {
  route: RouteProp<VoteStackParamList, "OutcomePush">;
};

const OutcomePush: FC<OutcomePushProps> = ({ route, ...props }) => {
  return <OutcomePushs />;
};

export default OutcomePush;
