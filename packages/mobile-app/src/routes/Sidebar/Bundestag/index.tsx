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

export const MenuButton = styled.TouchableOpacity`
  padding-left: 11;
`;

const BundestagRootNavigation = () => {
  const navigation = useNavigation<BundestagNavigationProps>();
  return (
    <SearchProvider>
      <BundestagRootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4494d3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
        }}>
        <BundestagRootStack.Screen
          name="TabView"
          component={TabView}
          options={{
            title: 'BUNDESTAG',
            headerLeft: () => (
              <MenuButton onPress={navigation.toggleDrawer}>
                <MenuIcon width={18} height={18} color="#fff" />
              </MenuButton>
            ),
          }}
        />
        <BundestagRootStack.Screen
          name="Procedure"
          component={Procedure}
          options={({ route }) => ({ title: route.params.title })}
        />
        <BundestagRootStack.Screen name="Voting" component={VoteVerification} />
        <BundestagRootStack.Screen name="Filter" component={Filter} />
        <BundestagRootStack.Screen name="Search" component={() => <Search />} />
      </BundestagRootStack.Navigator>
    </SearchProvider>
  );
};

export default BundestagRootNavigation;
