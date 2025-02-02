import { FC } from "react";
import { ListType } from "src/__generated__/graphql";
import { List } from "src/screens/Bundestag";

const Sitzungswoche: FC = () => {
  return <List list={ListType.ConferenceweeksPlanned} />;
};

export default Sitzungswoche;
