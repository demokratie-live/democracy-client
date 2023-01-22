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

type ScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<BundestagTopTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

const onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  console.log('onMessageReceived', message);
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
  const [permissionStatus, setPermissionStatus] =
    useState<FirebaseMessagingTypes.AuthorizationStatus>();
  const [sendToken] = useAddTokenMutation();

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
    console.log('token', token);
  }, [token, sendToken]);

  // Register the device with FCM
  // Get the token
  useEffect(() => {
    messaging().getToken().then(setToken);
  }, []);

  useEffect(() => {
    messaging().hasPermission().then(setPermissionStatus);
  }, []);

  useEffect(() => {
    // notifee.onBackgroundEvent(async ({ type, detail }) => {
    //   console.log('onBackgroundEvent', { type, detail });
    // });
  }, []);

  useEffect(() => {
    const onMessage = messaging().onMessage(onMessageReceived);
    // messaging().setBackgroundMessageHandler(onMessageReceived);
    return () => {
      onMessage();
    };
  }, []);

  useEffect(() => {
    notifee.onForegroundEvent(({ type, detail }) => {
      console.log('onForegroundEvent', type);
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
  }, []);

  // Save the token
  //   await postToApi('/users/1234/tokens', { token });

  const register = () => {
    messaging().registerDeviceForRemoteMessages();
  };

  const requestPermissions = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  };
  console.log({ permissionStatus });

  useEffect(() => {
    register();
  }, []);
  return {
    token,
    requestPermissions,
  };
};
