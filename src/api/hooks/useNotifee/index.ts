import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native';
import { useCallback, useEffect } from 'react';
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

export const useInitNotifee = () => {
  const { navigate } = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    const onMessage = messaging().onMessage(onMessageReceived);
    return () => {
      onMessage();
    };
  }, []);

  const onNotificationPress = useCallback(
    (data: { procedureId: string; action: string }) => {
      switch (data?.action) {
        case 'procedure':
          navigate('Procedure', {
            procedureId: data?.procedureId,
            title: '',
          });
          break;
        case 'procedureBulk':
          navigate('Sitzungswoche', { list: ListType.ConferenceweeksPlanned });
          break;
        default:
          break;
      }
    },
    [navigate],
  );

  // Android only
  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      onNotificationPress({
        procedureId: remoteMessage?.data?.procedureId as string,
        action: remoteMessage?.data?.action as string,
      });
    });
  }, [navigate, onNotificationPress]);

  // iOS only
  useEffect(() => {
    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        onNotificationPress({
          procedureId: detail?.notification?.data?.procedureId as string,
          action: detail?.notification?.data?.action as string,
        });
      }
    });
  }, [onNotificationPress]);
};
