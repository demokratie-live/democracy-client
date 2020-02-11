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
import WahlOMeter from '../../../screens/WahlOMeter';
import { Procedure, VoteVerification } from '../../../screens/Bundestag';
import { VoteSelection } from '../../../../__generated__/globalTypes';
import { MemberProfil } from '../../../screens/WahlOMeter/MemberProfil';
import { theme } from '../../../styles';
import { BurgerMenuButton } from '../../../components/MenuButton';

export type WahlOMeterStackParamList = {
  WahlOMeter: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: {
    selection: VoteSelection.YES | VoteSelection.ABSTINATION | VoteSelection.NO;
    procedureId: string;
    procedureObjId: string;
  };
  MemberProfil: undefined;
};

const WahlOMeterStack = createStackNavigator<WahlOMeterStackParamList>();

type WahlOMeterNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'WahlOMeter'>,
  StackNavigationProp<RootStackParamList>
>;

const WahlOMeterNavigation = () => {
  const navigation = useNavigation<WahlOMeterNavigationProps>();
  return (
    <WahlOMeterStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
      }}>
      <WahlOMeterStack.Screen
        name="WahlOMeter"
        component={WahlOMeter}
        options={{
          title: 'Wahl-O-Meter',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BurgerMenuButton onPress={navigation.toggleDrawer}>
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
    </WahlOMeterStack.Navigator>
  );
};

export default WahlOMeterNavigation;
