import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { useEffect, useState } from 'react';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BundestagTopTabParamList } from '../../../routes/Bundestag';
import { RootStackParamList } from '../../../routes';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ListType, useAddTokenMutation } from '../../../__generated__/graphql';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

type ScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<BundestagTopTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

const onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  await notifee.displayNotification({
    title: message.data?.title,
    body: message.data?.message,
    data: message.data,
  });
};

messaging().setBackgroundMessageHandler(onMessageReceived);

export const useNotifee = () => {
  const { navigate } = useNavigation<ScreenNavigationProp>();
  const [token, setToken] = useState<string>();
  const [authorized, setAuthorized] = useState<boolean>();
  const [sendToken] = useAddTokenMutation();
  const [alreadyDenied, setAlreadyDenied] = useState<boolean>();

  // save token to database
  useEffect(() => {
    if (token) {
      sendToken({
        variables: {
          os: Platform.OS,
          token,
        },
      });
    }
  }, [token, sendToken]);

  // Register the device with FCM
  // Get the token
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    messaging()
      .hasPermission()
      .then(status => {
        console.log('Permission status:', status);
        setAuthorized(status === messaging.AuthorizationStatus.AUTHORIZED);
        setAlreadyDenied(status === messaging.AuthorizationStatus.DENIED);
      });
  }, [token]);

  useEffect(() => {
    const onMessage = messaging().onMessage(onMessageReceived);
    return () => {
      onMessage();
    };
  }, []);

  useEffect(() => {
    notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          switch (detail.notification?.data?.action) {
            case 'procedure':
              navigate('Procedure', {
                procedureId: detail.notification?.data?.procedureId as string,
                title: '',
              });
              break;
            case 'procedureBulk':
              navigate('Sitzungswoche', { list: ListType.ConferenceweeksPlanned });
              break;

            default:
              break;
          }
          break;
        case EventType.DELIVERED:
          console.log('Notification delivered', detail.notification);
          break;
      }
    });
  }, [navigate]);

  const register = () => {
    messaging().registerDeviceForRemoteMessages();
  };

  const requestPermissions = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (Platform.OS === 'android') {
      PermissionsAndroid.request('android.permission.RECEIVE_WAP_PUSH');
    }
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('Permission status:', authorizationStatus);
      getToken();
    }
  };

  const deleteToken = async () => {
    await messaging()
      .deleteToken()
      .then(() => setToken(undefined));
  };

  const getToken = async () => {
    console.log('GET_TOKEN!');
    await messaging()
      .getToken()
      .then(token => {
        console.log('GET_TOKEN!', token);
        setToken(token);
      });
  };

  useEffect(() => {
    register();
  }, []);

  return {
    token,
    deleteToken,
    getToken,
    requestPermissions,
    authorized,
    alreadyDenied,
  };
};
