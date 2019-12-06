import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { VerificationStart } from '../../screens/modals/Verification/Start';
import { PhoneNumber } from '../../screens/modals/Verification/PhoneNumber';
import { Code } from '../../screens/modals/Verification/Code';
import { Button } from 'react-native';
import { RootStackParamList } from '..';
import { useNavigation } from '@react-navigation/core';

export type VerificationRootStackParamList = {
  Start: undefined;
  PhoneNumberInput: undefined;
  SmsCodeInput: undefined;
};

const VerificationRootStack = createStackNavigator<
  VerificationRootStackParamList
>();

type VerificationNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Verification'
>;

const VerificationRootNavigation = () => {
  const navigation = useNavigation<VerificationNavigationProps>();
  return (
    <VerificationRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4494d3',
        },
        headerTintColor: '#fff',
      }}>
      <VerificationRootStack.Screen
        name="Start"
        component={VerificationStart}
        options={{
          headerLeft: () => {
            return (
              <Button
                onPress={navigation.goBack}
                title="Abbrechen"
                color="#fff"
              />
            );
          },
        }}
      />
      <VerificationRootStack.Screen
        name="PhoneNumberInput"
        component={PhoneNumber}
        options={{}}
      />
      <VerificationRootStack.Screen
        name="SmsCodeInput"
        component={Code}
        options={{}}
      />
    </VerificationRootStack.Navigator>
  );
};

export default VerificationRootNavigation;
