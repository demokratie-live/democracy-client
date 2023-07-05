import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Alert, Button } from 'react-native';
import { useNotifee } from '../api/hooks/useNotifee';
import VotesLocal from '../lib/VotesLocal';
import { NotifeeButton } from '../routes/Sidebar/DevScreen/NotifeeButton';
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
          Alert.alert('Are you sure?', 'This will delete all auth data', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                AsyncStorage.removeItem('auth_refreshToken');
                AsyncStorage.removeItem('auth_token');
                AsyncStorage.removeItem('auth_phoneHash');
                AsyncStorage.removeItem('verification_code_resend_time');
                AsyncStorage.removeItem('verification_code_expire_time');
                AsyncStorage.removeItem('verification_tmp_phone_number');
                Alert.alert('auth deleted');
              },
            },
          ]);
        }}
      />
      <Button
        title="Delete local votes"
        onPress={() => {
          // alert to confirm deletion
          Alert.alert('Are you sure?', 'This will delete all local votes', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                VotesLocal.reset();
                Alert.alert('local votes deleted');
              },
            },
          ]);
        }}
      />
      <Button
        title="Reset Token"
        onPress={() => {
          Alert.alert('Are you sure?', 'This will delete the token', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                deleteToken();
                Alert.alert('token deleted');
              },
            },
          ]);
        }}
      />
      <Button
        title="Delete all AsyncStorage data"
        onPress={() => {
          Alert.alert('Are you sure?', 'This will delete the token', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                AsyncStorage.clear();
                Alert.alert('AsyncStorage cleared');
              },
            },
          ]);
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
