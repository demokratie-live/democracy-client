import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '..';
import { RootStackParamList } from '../..';
import MenuIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Menu';
import styled from 'styled-components/native';
import { Statistic } from '../../../screens/Statistic';
import { Procedure, VoteVerification } from '../../../screens/Bundestag';
import { VoteSelection } from '../../../../__generated__/globalTypes';

export type StatisticRootStackParamList = {
  Statistic: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: {
    selection: VoteSelection.YES | VoteSelection.ABSTINATION | VoteSelection.NO;
    procedureId: string;
    procedureObjId: string;
  };
};

const StatisticRootStack = createStackNavigator<StatisticRootStackParamList>();

type StatisticNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Statistic'>,
  StackNavigationProp<RootStackParamList>
>;

const MenuButton = styled.TouchableOpacity`
  padding-left: 11;
`;

const StatisticRootNavigation = () => {
  const navigation = useNavigation<StatisticNavigationProps>();
  return (
    <StatisticRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4494d3',
        },
        headerTintColor: '#fff',
      }}>
      <StatisticRootStack.Screen
        name="Statistic"
        component={Statistic}
        options={{
          title: 'Statistic',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
          },
          headerLeft: () => (
            <MenuButton onPress={navigation.toggleDrawer}>
              <MenuIcon width={18} height={18} color="#fff" />
            </MenuButton>
          ),
        }}
      />
      <StatisticRootStack.Screen
        name="Procedure"
        component={Procedure}
        options={({ route }) => ({ title: route.params.title })}
      />
      <StatisticRootStack.Screen name="Voting" component={VoteVerification} />
    </StatisticRootStack.Navigator>
  );
};

export default StatisticRootNavigation;
