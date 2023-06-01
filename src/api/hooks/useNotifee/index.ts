import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native';
import { useEffect } from 'react';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BundestagTopTabParamList } from '../../../routes/Bundestag';
import { RootStackParamList } from '../../../routes';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ListType, useAddTokenMutation } from '../../../__generated__/graphql';
import { Platform } from 'react-native';
import { usePushNotificatoinStore } from '../../state/pushNotification';

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
  const { token, setToken, authorized, setAuthorized, alreadyDenied, setAlreadyDenied, setSent } =
    usePushNotificatoinStore();
  const [sendToken] = useAddTokenMutation();

  useEffect(() => {
    if (token) {
      sendToken({
        variables: {
          os: Platform.OS,
          token,
        },
      });
      setSent(true);
    }
  }, [token, sendToken, setSent]);

  useEffect(() => {
    notifee.getNotificationSettings().then(settings => {
      setAuthorized(settings.authorizationStatus === AuthorizationStatus.AUTHORIZED);
      setAlreadyDenied(settings.authorizationStatus === AuthorizationStatus.DENIED);
    });
  }, [setAlreadyDenied, setAuthorized, token]);

  const requestPermissions = async () => {
    const status = await notifee.requestPermission();

    if (status.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      setAuthorized(status.authorizationStatus === AuthorizationStatus.AUTHORIZED);
      getToken();
    }
    setAlreadyDenied(status.authorizationStatus === AuthorizationStatus.DENIED);
  };

  const getFirebaseToken = async () => {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const generatedToken = await messaging().getToken();

    return generatedToken;
  };

  useEffect(() => {
    async function fetchData() {
      const generatedToken = await getFirebaseToken();
      setToken(generatedToken);
    }
    fetchData();
  }, [setToken]);

  const deleteToken = async () => {
    await messaging()
      .deleteToken()
      .then(() => setToken(undefined));
  };

  const getToken = async () => {
    const generatedToken = await messaging().getToken();
    setToken(generatedToken);
  };

  useEffect(() => {
    getFirebaseToken().then(newToken => setToken(newToken));
  }, [setToken]);

  return {
    token,
    deleteToken,
    getToken,
    requestPermissions,
    authorized,
    alreadyDenied,
  };
};

export const notifeeBootstrap = async () => {
  const initialNotification = await notifee.getInitialNotification();
  console.log({ initialNotification });
  if (initialNotification) {
    console.log('Notification caused application to open', initialNotification.notification);
    console.log('Press action used to open the app', initialNotification.pressAction);
  }
};

export const useInitNotifee = () => {
  const { navigate } = useNavigation<ScreenNavigationProp>();

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
          console.warn('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
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
          break;
      }
    });
  }, [navigate]);
};
