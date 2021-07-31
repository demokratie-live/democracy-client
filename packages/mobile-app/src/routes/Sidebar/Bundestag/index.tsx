import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  Filter,
  Search,
  VoteVerification,
  OutcomePushs,
} from '../../../screens/Bundestag';
import TabView from './TabView';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '..';
import MenuIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Menu';
import { VoteSelection } from '../../../../__generated__/globalTypes';
import { SearchProvider } from '../../../context/Search';
import { theme } from '../../../styles';
import { BurgerMenuButton } from '../../../components/MenuButton';
import { RootStackParamList } from '../..';
import { MemberProfil } from '../../../screens/WahlOMeter/MemberProfil';

export type BundestagRootStackParamList = {
  TabView: undefined;
  Voting: {
    selection: VoteSelection.YES | VoteSelection.ABSTINATION | VoteSelection.NO;
    procedureId: string;
    procedureObjId: string;
    title: string;
  };
  Filter: undefined;
  Search: undefined;
  MemberProfil: undefined;
  OutcomePush: { finishAction: () => void; title: string; procedureId: string };
};

const BundestagRootStack = createStackNavigator<BundestagRootStackParamList>();

export type BundestagNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
  StackNavigationProp<RootStackParamList>
>;

const BundestagRootNavigation = () => {
  const navigation = useNavigation<BundestagNavigationProps>();
  return (
    <SearchProvider>
      <BundestagRootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.oldColors.background.header,
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
            title: 'Bundestag',
            headerLeft: () => (
              <BurgerMenuButton
                onPress={navigation.toggleDrawer}
                testID="BurgerMenuButton">
                <MenuIcon width={18} height={18} color="#fff" />
              </BurgerMenuButton>
            ),
          }}
        />
        <BundestagRootStack.Screen
          name="Voting"
          component={VoteVerification}
          options={{
            title: 'Wahlurne',
          }}
        />
        <BundestagRootStack.Screen
          name="OutcomePush"
          component={OutcomePushs}
          options={{
            headerShown: false,
          }}
        />
        <BundestagRootStack.Screen
          name="MemberProfil"
          component={MemberProfil}
          options={{
            title: '',
          }}
        />
        <BundestagRootStack.Screen name="Filter" component={Filter} />
        <BundestagRootStack.Screen
          name="Search"
          options={{
            title: 'Suche',
          }}
          component={Search}
        />
      </BundestagRootStack.Navigator>
    </SearchProvider>
  );
};

export default BundestagRootNavigation;
