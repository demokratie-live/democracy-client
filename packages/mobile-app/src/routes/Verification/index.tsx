import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { VerificationStart } from '../../screens/modals/Verification/Start';
import { PhoneNumber } from '../../screens/modals/Verification/PhoneNumber';
import { Code } from '../../screens/modals/Verification/Code';
import { useNavigation, RouteProp } from '@react-navigation/core';
import { VerificationProvider } from '../../context/Verification';
import { theme, styled } from '../../styles';
import { RootStackParamList } from '..';
import { SmsDonate } from '../../screens/modals/Verification/Donate';

export type VerificationRootStackParamList = {
  Start: undefined;
  PhoneNumberInput: undefined;
  SmsCodeInput: { procedureId?: string };
  SmsDonate: undefined;
};

const VerificationRootStack = createStackNavigator<
  VerificationRootStackParamList
>();

type VerificationNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Verification'
>;

const HeaderButton = styled.TouchableOpacity`
  margin-left: ${({ theme: t }) => t.distances.secondary};
`;

const HeaderButtonText = styled.Text`
  color: #fff;
  font-size: 16;
  font-weight: 500;
`;

interface VerificationRootNavigationProps {
  procedureId?: string;
}

const VerificationRootNavigation: React.FC<VerificationRootNavigationProps> = ({
  procedureId,
}) => {
  const navigation = useNavigation<VerificationNavigationProps>();
  return (
    <VerificationRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
      }}>
      <VerificationRootStack.Screen
        name="Start"
        component={VerificationStart}
        options={{
          headerTitle: 'Verifizieren',
          headerLeft: () => {
            return (
              <HeaderButton onPress={navigation.goBack}>
                <HeaderButtonText>Später</HeaderButtonText>
              </HeaderButton>
            );
          },
        }}
      />
      <VerificationRootStack.Screen
        name="PhoneNumberInput"
        component={PhoneNumber}
        options={{
          headerTitle: 'Verifizieren',
          headerBackTitle: 'Zurück',
        }}
      />
      <VerificationRootStack.Screen
        name="SmsCodeInput"
        component={Code}
        options={{
          headerTitle: 'Verifizieren',
          headerBackTitle: 'Zurück',
        }}
        initialParams={{
          procedureId,
        }}
      />
      <VerificationRootStack.Screen
        name="SmsDonate"
        component={SmsDonate}
        options={{
          headerTitle: 'Spenden',
          headerShown: false,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            color: 'red',
          },
        }}
      />
    </VerificationRootStack.Navigator>
  );
};

type RouteProps = RouteProp<RootStackParamList, 'Verification'>;

interface Props {
  route: RouteProps;
}

export const VerificationScreen: React.FC<Props> = ({ route }) => {
  const procedureId = route.params ? route.params.procedureId : undefined;
  return (
    <VerificationProvider>
      <VerificationRootNavigation procedureId={procedureId} />
    </VerificationProvider>
  );
};
