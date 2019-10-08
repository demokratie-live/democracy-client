import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes';

const Verification = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView>
      <Text>Verification Screen</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </SafeAreaView>
  );
};

export default Verification;
