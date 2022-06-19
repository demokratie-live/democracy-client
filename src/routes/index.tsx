import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Introduction from '../screens/Introduction';
import { useInitialState } from '../api/state/initialState';
import { getVersion } from 'react-native-device-info';
import { SidebarNavigation } from './Sidebar';
import { SyncVotesScreen } from '../screens/SyncVotes';
import { lightTheme } from '@democracy-deutschland/ui';
import { SyncVotesCaptureScreen } from '../screens/SyncVotesCapture';
import { VoteSelection } from '../__generated__/graphql';
import { FilterScreen, ProcedureScreen } from '../screens/Bundestag';
import { PdfScreen } from '../screens/Pdf';
import { VotingScreen } from '../screens/Voting';
import { ConstituencyScreen } from '../screens/Constituency';
import { SearchScreen } from '../screens/Search';
import { VerificationScreen } from '../screens/Verification';
import { PhoneNumberScreen } from '../screens/Verification/PhoneNumber';
import { SmsCodeInput } from '../screens/Verification/Code';
import { SmsDonate } from '../screens/Verification/Donate';
import { DeputyProfilScreen } from '../screens/DeputyProfile';
import { OutcomePushs } from '../screens/OutcomePushs';

export type RootStackParamList = {
  Sidebar: undefined;
  Introduction?: { done?: string; lastStartWithVersion?: string };
  VerificationStart: undefined;
  Constituency?: { goBack?: boolean };
  SyncVotes: undefined;
  SyncVotesCapture: undefined;
  Search: undefined;
  Filter: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: {
    selection: VoteSelection.Yes | VoteSelection.Abstination | VoteSelection.No;
    procedureId: string;
    procedureObjId: string;
    title: string;
  };
  DeputyProfile: { id: string };
  MemberProfil: undefined;
  Pdf: { url: string; title: string };
  PushInstructions: undefined;
  NotificationInstruction: { done: () => void; title?: string };
  OutcomePush: { finishAction: () => void; title: string; procedureId: string };
  SmsCodeInput: { procedureId?: string };
  SmsDonate: undefined;
  Donate: undefined;
  PhoneNumberInput: { procedureId?: string };
  EditDeputyList: { editMode: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes: React.FC = () => {
  const { lastStartWithVersion } = useInitialState();

  if (lastStartWithVersion === undefined) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={lastStartWithVersion !== getVersion() ? 'Introduction' : 'Sidebar'}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: lightTheme.colors.primary,
        },
        headerTintColor: lightTheme.colors.text.secondary,
      }}
    >
      <Stack.Screen name="Sidebar" component={SidebarNavigation} />
      <Stack.Screen
        name="Introduction"
        initialParams={{ lastStartWithVersion: '', done: 'SET_LAST_START_VERSION' }}
        component={Introduction}
      />
      <Stack.Screen
        name="Constituency"
        component={ConstituencyScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="VerificationStart"
        component={VerificationScreen}
        options={{ headerShown: true, title: 'Verifizieren' }}
      />
      <Stack.Screen
        name="PhoneNumberInput"
        component={PhoneNumberScreen}
        options={{ headerShown: true, title: 'Telefonnummer' }}
      />
      <Stack.Screen
        name="SmsCodeInput"
        component={SmsCodeInput}
        options={{ headerShown: true, title: 'Code Eingeben' }}
      />
      <Stack.Screen
        name="SmsDonate"
        component={SmsDonate}
        options={{ title: 'Spenden', headerBackButtonMenuEnabled: false }}
      />
      <Stack.Screen
        name="SyncVotes"
        component={SyncVotesScreen}
        options={{ headerShown: true, title: 'Stimmen übertragen' }}
      />
      <Stack.Screen
        name="SyncVotesCapture"
        component={SyncVotesCaptureScreen}
        options={{ headerShown: true, title: 'Stimmen empfangen' }}
      />
      <Stack.Screen
        name="Search"
        options={{
          title: 'Suche',
          headerShown: true,
        }}
        component={SearchScreen}
      />
      <Stack.Screen name="Filter" component={FilterScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name="Procedure"
        component={ProcedureScreen}
        options={({ route }) => ({ title: route.params.title || '', headerShown: true })}
      />
      <Stack.Screen
        name="Pdf"
        component={PdfScreen}
        options={({ route }) => ({ title: route.params.title, headerShown: true })}
      />
      <Stack.Screen
        name="OutcomePush"
        component={OutcomePushs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Voting"
        component={VotingScreen}
        options={{
          headerShown: true,
          title: 'Wahlurne',
        }}
      />
      <Stack.Screen
        name="DeputyProfile"
        component={DeputyProfilScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
