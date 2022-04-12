import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styled from 'styled-components/native';
import Svg, { Circle } from 'react-native-svg';
import { ListType } from '../../__generated__/graphql';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '../Sidebar';
import { RootStackParamList } from '..';
import { useRecoilValue } from 'recoil';
import { parlamentState } from '../../api/state/parlament';
import { useListFilter } from '../../api/hooks/useListFilter';
import { MenuButton } from '../../components/MenuButton';
import SvgFunnelEmpty from '../../components/Icons/FunnelEmpty';
import SvgFunnel from '../../components/Icons/Funnel';
import SvgLens from '../../components/Icons/Lens';
import { parlaments } from '../../api/state/parlament';
import { Recommended } from '../../screens/Bundestag/Recomended';
import { List } from '../../screens/Bundestag';

export type BundestagTopTabParamList = {
  Empfohlen: undefined;
  Sitzungswoche: { list: ListType };
  Vergangen: { list: ListType };
  'Top 100': { list: ListType };
  DEV: { list: ListType };
};

const TabNavigation = createMaterialTopTabNavigator<BundestagTopTabParamList>();

const HaderRightWrapper = styled.View`
  flex-direction: row;
  padding-right: 11px;
`;

type ScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  noButton?: boolean;
  navigation: ScreenNavigationProp;
}

export const BundestagTabViewNavigation: React.FC<Props> = ({ navigation }) => {
  const { active: hasFilters } = useListFilter();
  const parlamentIdentifier = useRecoilValue(parlamentState);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HaderRightWrapper>
          <MenuButton onPress={() => navigation.navigate('Filter')}>
            {!hasFilters && <SvgFunnelEmpty width={18} height={18} color="#fff" />}
            {!!hasFilters && (
              <>
                <SvgFunnel width={18} height={18} color="#fff" />
                <Svg
                  width="8"
                  height="8"
                  viewBox="0 0 10 10"
                  style={{ position: 'absolute', top: 8, right: 7 }}
                >
                  <Circle cx="5" cy="5" r="5" fill="#d0021b" />
                </Svg>
              </>
            )}
          </MenuButton>
          <MenuButton onPress={() => navigation.navigate('Search')}>
            <SvgLens width={18} height={18} color="#fff" />
          </MenuButton>
        </HaderRightWrapper>
      ),
    });
  });

  if (!parlamentIdentifier) {
    return null;
  }

  const parlament = parlaments[parlamentIdentifier];

  return (
    <TabNavigation.Navigator
      // tabBarOptions={{
      //   scrollEnabled: false,
      //   indicatorStyle: {
      //     backgroundColor: '#fff',
      //   },
      //   activeTintColor: 'rgb(255,255,255)',
      //   inactiveTintColor: theme.colors.text.primary,
      //   style: {
      //     backgroundColor: '#4494D3',
      //   },
      // }}
      initialRouteName={'Sitzungswoche'}
    >
      {parlament.screens.procedures.recomended ? (
        <TabNavigation.Screen
          name="Empfohlen"
          component={Recommended}
          options={{
            title: 'Empfohlen',
          }}
        />
      ) : null}

      {parlament.screens.procedures.inVote ? (
        <TabNavigation.Screen
          name="Sitzungswoche"
          component={List}
          initialParams={{ list: ListType.ConferenceweeksPlanned }}
          options={{
            title: 'Sitzungs\u200Bwoche',
          }}
        />
      ) : null}
      {parlament.screens.procedures.past ? (
        <TabNavigation.Screen
          name="Vergangen"
          component={List}
          initialParams={{ list: ListType.Past }}
          options={{
            tabBarTestID: 'tabBarPastItem',
            title: 'Vergangen',
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
            tabBarTestID: 'tabBarPastItem',
            title: 'Alle',
          }}
        />
      ) : null}
    </TabNavigation.Navigator>
  );
};
