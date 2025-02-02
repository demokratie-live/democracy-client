import { FC } from "react";
import { ListType } from "src/__generated__/graphql";
import { List } from "src/screens/Bundestag";

const Top100: FC = () => {
  return <List list={ListType.Top100} />;
};

export default Top100;
