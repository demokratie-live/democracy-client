import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  Filter,
  Search,
  Procedure,
  VoteVerification,
} from '../../../screens/Bundestag';
import TabView from './TabView';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '..';
import { RootStackParamList } from '../..';
import MenuIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Menu';
import SearchIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Lens';
// import FilterIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Funnel';
import FilterEmptyIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/FunnelEmpty';
import styled from 'styled-components/native';
import { VoteSelection } from '../../../../__generated__/globalTypes';
import { SearchProvider } from '../../../context/Search';

export type BundestagRootStackParamList = {
  TabView: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: {
    selection: VoteSelection.YES | VoteSelection.ABSTINATION | VoteSelection.NO;
    procedureId: string;
    procedureObjId: string;
  };
  Filter: undefined;
  Search: undefined;
};

const BundestagRootStack = createStackNavigator<BundestagRootStackParamList>();

type BundestagNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
  StackNavigationProp<RootStackParamList>
>;

const MenuButton = styled.TouchableOpacity`
  padding-left: 11;
`;

const HaderRightWrapper = styled.View`
  flex-direction: row;
  padding-right: 11;
`;

const BundestagRootNavigation = () => {
  const navigation = useNavigation<BundestagNavigationProps>();
  return (
    <SearchProvider>
      <BundestagRootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4494d3',
          },
          headerTintColor: '#fff',
        }}>
        <BundestagRootStack.Screen
          name="TabView"
          component={TabView}
          options={{
            title: 'BUNDESTAG',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#4494D3',
            },
            headerLeft: () => (
              <MenuButton onPress={navigation.toggleDrawer}>
                <MenuIcon width={18} height={18} color="#fff" />
              </MenuButton>
            ),
            headerRight: () => (
              <HaderRightWrapper>
                <MenuButton onPress={() => navigation.navigate('Filter')}>
                  {/* <FilterIcon width={18} height={18} color="#fff" /> */}
                  <FilterEmptyIcon width={18} height={18} color="#fff" />
                </MenuButton>
                <MenuButton onPress={() => navigation.navigate('Search')}>
                  <SearchIcon width={18} height={18} color="#fff" />
                </MenuButton>
              </HaderRightWrapper>
            ),
          }}
        />
        <BundestagRootStack.Screen
          name="Procedure"
          component={Procedure}
          options={({ route }) => ({ title: route.params.title })}
        />
        <BundestagRootStack.Screen
          name="Voting"
          component={VoteVerification}
          options={
            {
              // gestureDirection: 'vertical',
            }
          }
        />
        <BundestagRootStack.Screen name="Filter" component={Filter} />
        <BundestagRootStack.Screen name="Search" component={() => <Search />} />
      </BundestagRootStack.Navigator>
    </SearchProvider>
  );
};

export default BundestagRootNavigation;
