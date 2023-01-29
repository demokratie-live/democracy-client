import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, Button, Text } from 'react-native';
import { useNotifee } from '../../api/hooks/useNotifee';
import VotesLocal from '../../lib/VotesLocal';

export const DevScreen: React.FC = () => {
  const { token } = useNotifee();
  return (
    <>
      <Button
        title="Delete auth"
        onPress={() => {
          AsyncStorage.removeItem('auth_refreshToken');
          AsyncStorage.removeItem('auth_token');
          AsyncStorage.removeItem('auth_phoneHash');
          AsyncStorage.removeItem('verification_code_resend_time');
          AsyncStorage.removeItem('verification_code_expire_time');
          AsyncStorage.removeItem('verification_tmp_phone_number');
          Alert.alert('auth deleted');
        }}
      />
      <Button
        title="Delete local votes"
        onPress={() => {
          VotesLocal.reset();
          Alert.alert('local votes deleted');
        }}
      />
      <Text selectable>{token}</Text>
    </>
  );
};
