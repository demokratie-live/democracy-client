import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DevPlaceholder, List } from '../../../screens/Bundestag';
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

export type TopTabParamList = {
  Sitzungswoche: { list: ListType };
  Vergangen: { list: ListType };
  'Top 100': { list: ListType };
  DEV: { list: ListType };
};

const TabNavigation = createMaterialTopTabNavigator<TopTabParamList>();

const HaderRightWrapper = styled.View`
  flex-direction: row;
  padding-right: 11;
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

  navigation.setOptions({
    headerRight: () => (
      <HaderRightWrapper>
        <MenuButton
          onPress={() => navigation.navigate('Filter')}
          // style={{ backgroundColor: 'blue' }}
        >
          {!hasFilters && (
            <FilterEmptyIcon width={18} height={18} color="#fff" />
          )}
          {!!hasFilters && <FilterIcon width={18} height={18} color="#fff" />}
        </MenuButton>
        <MenuButton
          onPress={() => navigation.navigate('Search')}
          // style={{ backgroundColor: 'red' }}
        >
          <SearchIcon width={18} height={18} color="#fff" />
        </MenuButton>
      </HaderRightWrapper>
    ),
  });

  return (
    <TabNavigation.Navigator
      tabBarOptions={{
        scrollEnabled: false,
        indicatorStyle: {
          backgroundColor: '#fff',
        },
        activeTintColor: 'rgb(255,255,255)',
        inactiveTintColor: theme.colors.headerTextSecondary,
        style: {
          backgroundColor: '#4494D3',
        },
      }}
      initialRouteName={'Sitzungswoche'}>
      <TabNavigation.Screen
        name="Sitzungswoche"
        component={List}
        initialParams={{ list: ListType.CONFERENCEWEEKS_PLANNED }}
      />
      <TabNavigation.Screen
        name="Vergangen"
        component={List}
        initialParams={{ list: ListType.PAST }}
      />
      <TabNavigation.Screen
        name="Top 100"
        component={List}
        initialParams={{ list: ListType.TOP100 }}
      />
      {__DEV__ && (
        <TabNavigation.Screen
          name="DEV"
          component={DevPlaceholder}
          initialParams={{ list: ListType.PREPARATION }}
        />
      )}
    </TabNavigation.Navigator>
  );
};

export default TabViewNavigation;
