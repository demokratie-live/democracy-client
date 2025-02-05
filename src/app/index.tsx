import { Redirect } from "expo-router";
import { currentLegislaturPeriod } from "../data/legislaturPeriods";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const Index = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return (
    <Redirect
      href={`/(sidebar)/${currentLegislaturPeriod}/Procedures/Sitzungswoche`}
    />
  );
};
export default Index;
