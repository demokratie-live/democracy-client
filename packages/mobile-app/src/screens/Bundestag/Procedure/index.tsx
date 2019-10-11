import React from 'react';
import { Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';

export const Procedure = () => {
  const navigation = useNavigation<
    StackNavigationProp<BundestagRootStackParamList>
  >();
  return (
    <>
      <Text>Procedure Page</Text>
      <Button
        title="Go to Voting"
        onPress={() => navigation.navigate('Voting')}
      />
    </>
  );
};
