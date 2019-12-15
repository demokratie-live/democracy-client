import React from 'react';
import { Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/core';
import { BundestagRootStackParamList } from '../../../../routes/Sidebar/Bundestag';

type VotingScreenRouteProp = RouteProp<BundestagRootStackParamList, 'Voting'>;

export const Voting = () => {
  const {
    params: { selection },
  } = useRoute<VotingScreenRouteProp>();
  return (
    <>
      <Text>Voting Page</Text>
      <Text>Decision: {selection}</Text>
    </>
  );
};
