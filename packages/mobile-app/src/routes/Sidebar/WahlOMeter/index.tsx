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
import TabView from './TabView';
import { Procedure, VoteVerification } from '../../../screens/Bundestag';
import { VoteSelection } from '../../../../__generated__/globalTypes';
import { MemberProfil } from '../../../screens/WahlOMeter/MemberProfil';
import { theme } from '../../../styles';
import { BurgerMenuButton } from '../../../components/MenuButton';
import { DeputyProfil } from '../../../screens/DeputyProfile';
import { Abgeordnete } from '../../../screens/Abgeordnete';

export type WahlOMeterStackParamList = {
  TabView: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: {
    selection: VoteSelection.YES | VoteSelection.ABSTINATION | VoteSelection.NO;
    procedureId: string;
    procedureObjId: string;
  };
  MemberProfil: undefined;
  DeputyProfile: { id: string };
  EditDeputyList: { editMode: boolean };
};

const WahlOMeterStack = createStackNavigator<WahlOMeterStackParamList>();

export type WahlOMeterNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'WahlOMeter'>,
  StackNavigationProp<RootStackParamList>
>;

const WahlOMeterNavigation = () => {
  const navigation = useNavigation<WahlOMeterNavigationProps>();
  return (
    <WahlOMeterStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.oldColors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
      }}>
      <WahlOMeterStack.Screen
        name="TabView"
        component={TabView}
        options={{
          title: 'Wahl-O-Meter',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BurgerMenuButton
              onPress={navigation.toggleDrawer}
              testID="BurgerMenuButton">
              <MenuIcon width={18} height={18} color="#fff" />
            </BurgerMenuButton>
          ),
        }}
      />
      <WahlOMeterStack.Screen
        name="Procedure"
        component={Procedure}
        options={({ route }) => ({ title: route.params.title })}
      />
      <WahlOMeterStack.Screen
        name="Voting"
        component={VoteVerification}
        options={{
          title: 'Wahlurne',
        }}
      />
      <WahlOMeterStack.Screen
        name="MemberProfil"
        component={MemberProfil}
        options={{
          title: '',
        }}
      />
      <WahlOMeterStack.Screen
        name="DeputyProfile"
        component={DeputyProfil}
        options={{
          title: '',
        }}
      />
      <WahlOMeterStack.Screen
        name="EditDeputyList"
        component={Abgeordnete}
        options={{
          title: 'Abgeordnete',
        }}
        initialParams={{
          editMode: true,
        }}
      />
    </WahlOMeterStack.Navigator>
  );
};

export default WahlOMeterNavigation;
