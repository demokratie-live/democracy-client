import React, { useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRecoilValue } from "recoil";
import { parlamentState, parlaments } from "../../../api/state/parlament";
import { useListFilter } from "../../../api/hooks/useListFilter";
import { MenuButton } from "../../../components/MenuButton";
import SvgFunnelEmpty from "../../../components/Icons/FunnelEmpty";
import SvgFunnel from "../../../components/Icons/Funnel";
import SvgLens from "../../../components/Icons/Lens";
import Svg, { Circle } from "react-native-svg";
import { Recommended } from "../../../screens/Bundestag/Recomended";
import { List } from "../../../screens/Bundestag";
import { ListType } from "../../../__generated__/graphql";
import { tabNavigationScreenOptions } from "../../../screens/Bundestag/styles";
import { useRouter, useNavigation } from "expo-router";
import { RootStackParamList } from "src/app/_layout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/core";

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

const TabNavigation = createMaterialTopTabNavigator<BundestagTopTabParamList>();

const HaderRightWrapper = styled.View`
  flex-direction: row;
  margin-right: ${({ theme }) => theme.spaces.default};
`;

export default function BundestagTabViewNavigation() {
  const navigation = useNavigation<SidebarNavigationProps>();

  const { active: hasFilters } = useListFilter();
  const theme = useContext(ThemeContext);
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HaderRightWrapper>
          <MenuButton onPress={() => navigation.navigate("Filter")}>
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
                  style={{ position: "absolute", top: 8, right: 7 }}
                >
                  <Circle cx="5" cy="5" r="5" fill="#d0021b" />
                </Svg>
              </>
            )}
          </MenuButton>
          <MenuButton onPress={() => navigation.navigate("Search")}>
            <SvgLens width={18} height={18} color="#fff" />
          </MenuButton>
        </HaderRightWrapper>
      ),
    });
  }, [hasFilters, navigation, router]);

  if (!parlamentIdentifier) {
    return null;
  }
  const parlament = parlaments[parlamentIdentifier];

  return (
    <TabNavigation.Navigator
      screenOptions={tabNavigationScreenOptions(theme)}
      initialRouteName="Sitzungswoche"
    >
      {parlament.screens.procedures.recomended ? (
        <TabNavigation.Screen
          name="Empfohlen"
          component={Recommended}
          options={{ title: "Empfohlen" }}
        />
      ) : null}
      {parlament.screens.procedures.inVote ? (
        <TabNavigation.Screen
          name="Sitzungswoche"
          component={List}
          initialParams={{ list: ListType.ConferenceweeksPlanned }}
          options={{ title: "Sitzungs\u200Bwoche" }}
        />
      ) : null}
      {parlament.screens.procedures.past ? (
        <TabNavigation.Screen
          name="Vergangen"
          component={List}
          initialParams={{ list: ListType.Past }}
          options={{
            title: "Vergangen",
          }}
        />
      ) : null}
      {parlament.screens.procedures.top100 ? (
        <TabNavigation.Screen
          name="Top 100"
          component={List}
          initialParams={{ list: ListType.Top100 }}
        />
      ) : null}
      {parlament.screens.procedures.all ? (
        <TabNavigation.Screen
          name="Vergangen"
          component={List}
          initialParams={{ list: ListType.Past }}
          options={{
            title: "Alle",
          }}
        />
      ) : null}
    </TabNavigation.Navigator>
  );
}
