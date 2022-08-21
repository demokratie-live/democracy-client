import React, { createContext, useState, useEffect } from 'react';
import { Notifications, Registered, RegistrationError } from 'react-native-notifications';
import { Platform, EmitterSubscription } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { checkNotifications } from 'react-native-permissions';
import { useAppState } from '../../../screens/Introduction/PushInstructions/useAppState';
import {
  NotificationSettings,
  NotificationSettingsDocument,
  UpdateNotificationSettingsMutationVariables,
  useAddTokenMutation,
  useNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from '../../../__generated__/graphql';

interface NotificationsInterface {
  hasPermissions: boolean;
  alreadyDenied: boolean;
  outcomePushsDenied: boolean;
  notificationSettings: Pick<
    NotificationSettings,
    | 'conferenceWeekPushs'
    | 'enabled'
    | 'voteConferenceWeekPushs'
    | 'voteTOP100Pushs'
    | 'outcomePushs'
  >;
  update: (options: UpdateNotificationSettingsMutationVariables) => void;
  requestToken: () => void;
  setOutcomePushsDenied: (value: boolean) => void;
}

const defaults: NotificationsInterface = {
  hasPermissions: false,
  alreadyDenied: false,
  outcomePushsDenied: false,
  notificationSettings: {
    conferenceWeekPushs: false,
    enabled: false,
    voteConferenceWeekPushs: false,
    voteTOP100Pushs: false,
    outcomePushs: false,
  },
  update: () => {
    throw new Error('NotificationsContext: update function is not defined');
  },
  requestToken: () => {
    throw new Error('NotificationsContext: requestToken function is not defined');
  },
  setOutcomePushsDenied: () => {
    throw new Error('NotificationsContext: setOutcomePushsDenied function is not defined');
  },
};

export const NotificationsContext = createContext<NotificationsInterface>(defaults);

export const NotificationsProvider: React.FC = ({ children }) => {
  const [hasPermissions, setHasPermissions] = useState(defaults.hasPermissions);
  const [alreadyDenied, setAlreadyDenied] = useState(false);
  const [outcomePushsDenied, setOutcomePushsDenied] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationsInterface['notificationSettings']
  >(defaults.notificationSettings);
  const { data } = useNotificationSettingsQuery();

  const [updateSettings] = useUpdateNotificationSettingsMutation();
  const [sendToken] = useAddTokenMutation();

  const { appState } = useAppState();

  useEffect(() => {
    checkNotifications?.().then(({ status }) => {
      if (!alreadyDenied && status === 'blocked') {
        setAlreadyDenied(true);
        setHasPermissions(false);
      } else if (alreadyDenied && status === 'granted') {
        setAlreadyDenied(false);
        setHasPermissions(true);
      } else if (status === 'granted') {
        setAlreadyDenied(false);
        setHasPermissions(true);
      } else if (status === 'blocked') {
        setAlreadyDenied(true);
        setHasPermissions(false);
      }
    });
  }, [appState, alreadyDenied]);

  useEffect(() => {
    AsyncStorage.getItem('PUSH_OUTCOME_DENIED').then(value => {
      if (value) {
        setOutcomePushsDenied(true);
      }
    });
  }, []);

  useEffect(() => {
    if (outcomePushsDenied) {
      AsyncStorage.setItem('PUSH_OUTCOME_DENIED', 'true');
    }
  }, [outcomePushsDenied]);

  useEffect(() => {
    if (data && data.notificationSettings) {
      setNotificationSettings(data.notificationSettings);
    }
  }, [data]);

  // register notification events
  useEffect(() => {
    const subscriptions: EmitterSubscription[] = [];
    Notifications.isRegisteredForRemoteNotifications().then(value => {
      setHasPermissions(value);
    });

    subscriptions.push(
      Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
        const token = event.deviceToken || (event as unknown as string);
        AsyncStorage.setItem('push-token', token);
        sendToken({
          variables: {
            os: Platform.OS,
            token,
          },
        });
        setHasPermissions(true);
      }),
    );

    subscriptions.push(
      Notifications.events().registerRemoteNotificationsRegistrationFailed(
        (event: RegistrationError) => {
          console.error(event);
        },
      ),
    );

    // request code for android on app start
    if (Platform.OS === 'android') {
      Notifications.registerRemoteNotifications();
    } else {
      // if token already send send again
      AsyncStorage.getItem('push-token').then(
        token => !!token && Notifications.registerRemoteNotifications(),
      );
    }
    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [sendToken]);

  const requestToken = () => {
    Notifications.registerRemoteNotifications();
  };

  // resend token when neccessary
  useEffect(() => {
    if (Platform.OS === 'ios' && hasPermissions) {
      AsyncStorage.getItem('push-token').then(token => !token && requestToken());
    }
  }, [hasPermissions]);

  const update = (options: UpdateNotificationSettingsMutationVariables) => {
    updateSettings({
      variables: options,
      refetchQueries: [
        {
          query: NotificationSettingsDocument,
        },
      ],
      update: (proxy, { data: updateData }) => {
        if (updateData && updateData.updateNotificationSettings) {
          const notificationCacheData = proxy.readQuery<NotificationSettings>({
            query: NotificationSettingsDocument,
          });
          if (notificationCacheData) {
            proxy.writeQuery<NotificationSettings>({
              query: NotificationSettingsDocument,
              data: {
                ...notificationCacheData,
                ...options,
              },
            });
          }
        }
      },
    });
  };

  return (
    <NotificationsContext.Provider
      value={{
        hasPermissions,
        alreadyDenied,
        notificationSettings,
        update,
        requestToken,
        outcomePushsDenied,
        setOutcomePushsDenied,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
