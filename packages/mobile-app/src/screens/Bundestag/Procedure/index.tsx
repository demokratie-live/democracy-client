import React from 'react';
import { Text, Button } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import { FC } from 'react';

type ProcedureScreenRouteProp = RouteProp<
  BundestagRootStackParamList,
  'Procedure'
>;

type Props = {
  route: ProcedureScreenRouteProp;
};

export const Procedure: FC<Props> = ({ route }) => {
  const navigation = useNavigation<
    StackNavigationProp<BundestagRootStackParamList>
  >();
  return (
    <>
      <Text>Procedure Page</Text>
      <Text>ID: {route.params.procedureId}</Text>
      <Button
        title="Go to Voting"
        onPress={() => navigation.navigate('Voting')}
      />
    </>
  );
};
