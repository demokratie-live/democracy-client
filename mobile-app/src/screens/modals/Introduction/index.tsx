import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes';

const Introduction = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView>
      <Text>Introduction Screen</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </SafeAreaView>
  );
};

export default Introduction;
