import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { List } from '../../../screens/Bundestag';
import { ListType } from '../../../../__generated__/globalTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '.';
import styled from 'styled-components/native';
import SearchIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Lens';
import FilterEmptyIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/FunnelEmpty';
import FilterIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Funnel';
import { ListFilterContext } from '../../../context/ListFilter';
import { theme } from '../../../styles';
import { MenuButton } from '../../../components/MenuButton';
import Svg, { Circle } from 'react-native-svg';
import { Recommended } from '../../../screens/Bundestag/Recomended';
import { useQuery } from '@apollo/client';
import { ShowRecommendations } from './graphql/__generated__/ShowRecommendations';
import { SHOW_RECOMMENDED } from './graphql/showRecommendations';

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

type ScreenNavigationProp = StackNavigationProp<
  BundestagRootStackParamList,
  'TabView'
>;

interface Props {
  noButton?: boolean;
  navigation: ScreenNavigationProp;
}

const TabViewNavigation: React.FC<Props> = ({ navigation }) => {
  const { active: hasFilters } = useContext(ListFilterContext);
  const { data: showRecommendations } = useQuery<ShowRecommendations>(
    SHOW_RECOMMENDED,
  );
  navigation.setOptions({
    headerRight: () => (
      <HaderRightWrapper>
        <MenuButton onPress={() => navigation.navigate('Filter')}>
          {!hasFilters && (
            <FilterEmptyIcon width={18} height={18} color="#fff" />
          )}
          {!!hasFilters && (
            <>
              <FilterIcon width={18} height={18} color="#fff" />
              <Svg
                width="8"
                height="8"
                viewBox="0 0 10 10"
                style={{ position: 'absolute', top: 8, right: 7 }}>
                <Circle cx="5" cy="5" r="5" fill="#d0021b" />
              </Svg>
            </>
          )}
        </MenuButton>
        <MenuButton onPress={() => navigation.navigate('Search')}>
          <SearchIcon width={18} height={18} color="#fff" />
        </MenuButton>
      </HaderRightWrapper>
    ),
  });

  return (
    <TabNavigation.Navigator
      lazy={true}
      tabBarOptions={{
        scrollEnabled: false,
        indicatorStyle: {
          backgroundColor: '#fff',
        },
        activeTintColor: 'rgb(255,255,255)',
        inactiveTintColor: theme.oldColors.headerTextSecondary,
        style: {
          backgroundColor: '#4494D3',
        },
      }}
      initialRouteName={'Sitzungswoche'}>
      {showRecommendations ? (
        <TabNavigation.Screen
          name="Empfohlen"
          component={Recommended}
          options={{
            title: 'Empfohlen',
          }}
        />
      ) : (
        <TabNavigation.Screen
          name="Sitzungswoche"
          component={List}
          initialParams={{ list: ListType.CONFERENCEWEEKS_PLANNED }}
          options={{
            title: 'Sitzungs\u200Bwoche',
          }}
        />
      )}
      <TabNavigation.Screen
        name="Vergangen"
        component={List}
        initialParams={{ list: ListType.PAST }}
        options={{ tabBarTestID: 'tabBarPastItem' }}
      />
      <TabNavigation.Screen
        name="Top 100"
        component={List}
        initialParams={{ list: ListType.TOP100 }}
      />
      {/* {__DEV__ && (
        <TabNavigation.Screen
          name="DEV"
          component={DevPlaceholder}
          initialParams={{ list: ListType.PREPARATION }}
        />
      )} */}
    </TabNavigation.Navigator>
  );
};

export default TabViewNavigation;
