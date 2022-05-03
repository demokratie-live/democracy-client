import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Button } from 'react-native';

export const DevScreen: React.FC = () => {
  return (
    <Button
      title="Delete auth"
      onPress={() => {
        AsyncStorage.removeItem('auth_refreshToken');
        AsyncStorage.removeItem('auth_token');
        AsyncStorage.removeItem('auth_phoneHash');
        AsyncStorage.removeItem('verification_code_resend_time');
        AsyncStorage.removeItem('verification_code_expire_time');
        AsyncStorage.removeItem('verification_tmp_phone_number');
        console.log('auth deleted');
      }}
    />
  );
};
