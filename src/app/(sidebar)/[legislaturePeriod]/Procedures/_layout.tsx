import React, { useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import {
  ParlamentIdentifier,
  parlaments,
} from "../../../../api/state/parlament";
import { useListFilter } from "../../../../api/hooks/useListFilter";
import { MenuButton } from "../../../../components/MenuButton";
import SvgFunnelEmpty from "../../../../components/Icons/FunnelEmpty";
import SvgFunnel from "../../../../components/Icons/Funnel";
import SvgLens from "../../../../components/Icons/Lens";
import Svg, { Circle } from "react-native-svg";
import { ListType } from "../../../../__generated__/graphql";
import { tabNavigationScreenOptions } from "../../../../screens/Bundestag/styles";
import { useRouter, useNavigation, withLayoutContext } from "expo-router";
import { RootStackParamList } from "../../../_layout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabNavigationState, ParamListBase } from "@react-navigation/routers";
import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";

export type BundestagTopTabParamList = {
  Empfohlen: undefined;
  Sitzungswoche: { list: ListType };
  Vergangen: { list: ListType };
  "Top 100": { list: ListType };
};

type SidebarNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "legislaturPeriod"
>;

const { Navigator } = createMaterialTopTabNavigator<BundestagTopTabParamList>();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const HaderRightWrapper = styled.View`
  flex-direction: row;
  margin-right: ${({ theme }) => theme.spaces.default};
`;

export default function BundestagTabViewNavigation() {
  const navigation = useNavigation<SidebarNavigationProps>();
  const { legislaturePeriod } = useLegislaturePeriodStore();
  const parlamentIdentifier = `BT-${legislaturePeriod}` as ParlamentIdentifier;

  const { active: hasFilters } = useListFilter();
  const theme = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HaderRightWrapper>
          <MenuButton onPress={() => router.push("/Filter")}>
            {!hasFilters && (
              <SvgFunnelEmpty width={18} height={18} color="#fff" />
            )}
            {!!hasFilters && (
              <>
                <SvgFunnel width={18} height={18} color="#fff" />
                <Svg
                  width="8"
                  height="8"
                  viewBox="0 0 10 10"
                  style={{ position: "absolute", top: -2, right: -3 }}
                >
                  <Circle cx="5" cy="5" r="5" fill="#d0021b" />
                </Svg>
              </>
            )}
          </MenuButton>
          <MenuButton onPress={() => router.push("/Search")}>
            <SvgLens width={18} height={18} color="#fff" />
          </MenuButton>
        </HaderRightWrapper>
      ),
    });
  }, [hasFilters, navigation, router]);

  const parlament = parlaments[parlamentIdentifier];

  return (
    <MaterialTopTabs
      key={legislaturePeriod}
      screenOptions={{ ...tabNavigationScreenOptions(theme) }}
    >
      <MaterialTopTabs.Screen
        name="Empfohlen"
        options={{ title: "Empfohlen" }}
        // if redirect is true, the tab will be hidden
        redirect={!parlament.screens.procedures.recomended}
      />
      <MaterialTopTabs.Screen
        name="Sitzungswoche"
        initialParams={{ list: ListType.ConferenceweeksPlanned }}
        options={{ title: "Sitzungs\u200Bwoche" }}
        redirect={!parlament.screens.procedures.inVote}
      />
      <MaterialTopTabs.Screen
        name="Vergangen"
        initialParams={{ list: ListType.Past }}
        options={{
          title: "Vergangen",
        }}
        redirect={!parlament.screens.procedures.past}
      />
      <MaterialTopTabs.Screen
        name="Top100"
        initialParams={{ list: ListType.Top100 }}
        options={{
          title: "Top 100",
        }}
        redirect={!parlament.screens.procedures.top100}
      />
    </MaterialTopTabs>
  );
}
