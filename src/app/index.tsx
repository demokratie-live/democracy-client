import { Redirect } from "expo-router";
import { currentLegislaturPeriod } from "../data/legislaturPeriods";

const Index = () => {
  return <Redirect href={`/(sidebar)/${currentLegislaturPeriod}`} />;
};
export default Index;
