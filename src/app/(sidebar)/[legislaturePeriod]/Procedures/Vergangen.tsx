import { FC } from "react";
import { ListType } from "src/__generated__/graphql";
import { List } from "src/screens/Bundestag";

const Past: FC = () => {
  return <List list={ListType.Past} />;
};

export default Past;
