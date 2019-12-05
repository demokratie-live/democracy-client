import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationNativeContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import { sidebarToggle } from '../Sidebar';
import { VerificationStart } from '../../screens/modals/Verification/Start';
import { PhoneNumber } from '../../screens/modals/Verification/PhoneNumber';
import { Code } from '../../screens/modals/Verification/Code';

export type VerificationRootStackParamList = {
  Start: undefined;
  PhoneNumberInput: undefined;
  SmsCodeInput: undefined;
};

const VerificationRootStack = createStackNavigator<
  VerificationRootStackParamList
>();

const VerificationRootNavigation = () => {
  return (
    <NavigationNativeContainer independent>
      <VerificationRootStack.Navigator>
        <VerificationRootStack.Screen
          name="Start"
          component={VerificationStart}
          options={{
            headerLeft: () => <Button onPress={sidebarToggle} title="🍔" />,
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
    </NavigationNativeContainer>
  );
};

export default VerificationRootNavigation;
