import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Alert, Button } from 'react-native';
import { useNotifee } from '../../api/hooks/useNotifee';
import VotesLocal from '../../lib/VotesLocal';
import { NotifeeButton } from './DevScreen/NotifeeButton';
import messaging from '@react-native-firebase/messaging';
import styled from 'styled-components/native';

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DevScreen: React.FC = () => {
  const { token, deleteToken, getToken } = useNotifee();
  const [apnToken, setApnToken] = React.useState<string | null>(null);

  useEffect(() => {
    messaging()
      .getAPNSToken()
      .then(token => setApnToken(token));
  }, []);

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
      <Button
        title="Reset Token"
        onPress={() => {
          deleteToken().then(getToken);
          Alert.alert('local votes deleted');
        }}
      />
      <Text>Token:</Text>
      <Text selectable>{token}</Text>
      <Text>APN Token:</Text>
      <Text selectable>{apnToken}</Text>
      <NotifeeButton />
    </>
  );
};
