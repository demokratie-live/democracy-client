import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  ParlamentIdentifier,
  parlaments,
} from "../../../../api/state/parlament";
import { useTheme } from "styled-components/native";
import BundestagScreen from "../../../../screens/WahlOMeter/Bundestag";
import { WomPartyScreen } from "../../../../screens/WahlOMeter/Fraktionen";
import { DeputiesScreen } from "../../../../screens/WahlOMeter/Deputies";
import { tabNavigationScreenOptions } from "../../../../screens/Bundestag/styles";
import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";

export type TopTabParamList = {
  Bundestag: undefined;
  Fraktionen: undefined;
  Deputies: undefined;
};

const TabNavigation = createMaterialTopTabNavigator<TopTabParamList>();

interface Props {
  noButton?: boolean;
}

export const WahlOMeterNavigation: React.FC<Props> = () => {
  const theme = useTheme();
  const { legislaturePeriod } = useLegislaturePeriodStore();
  const parlamentIdentifier = `BT-${legislaturePeriod}` as ParlamentIdentifier;
  const parlament = parlaments[parlamentIdentifier];
  const wom = parlament.screens.wom ? parlament.screens.wom : undefined;

  return (
    <TabNavigation.Navigator
      screenOptions={tabNavigationScreenOptions(theme)}
      initialRouteName={"Bundestag"}
    >
      {wom?.institution ? (
        <TabNavigation.Screen name="Bundestag" component={BundestagScreen} />
      ) : null}
      {wom?.fractions ? (
        <TabNavigation.Screen name="Fraktionen" component={WomPartyScreen} />
      ) : null}
      {wom?.deputies ? (
        <TabNavigation.Screen
          name="Deputies"
          options={{
            title: "Abgeordnete",
          }}
          component={DeputiesScreen}
        />
      ) : null}
    </TabNavigation.Navigator>
  );
};

export default WahlOMeterNavigation;
