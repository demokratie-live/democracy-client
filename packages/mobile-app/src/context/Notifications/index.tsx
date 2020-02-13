import React, { createContext, useState, useEffect } from 'react';
import {
  Notifications,
  Registered,
  RegistrationError,
} from 'react-native-notifications';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { NOTIFICATION_SETTINGS } from './graphql/query/NotificationSettings';
import {
  NotificationSettings_notificationSettings,
  NotificationSettings,
} from './graphql/query/__generated__/NotificationSettings';
import {
  UpdateNotificationSettings,
  UpdateNotificationSettingsVariables,
} from './graphql/mutation/__generated__/UpdateNotificationSettings';
import { UPDATE_NOTIFICATION_SETTINGS } from './graphql/mutation/UpdateNotificationSettings';
import { ExecutionResult } from 'graphql';
import { Platform } from 'react-native';
import {
  AddToken,
  AddTokenVariables,
} from './graphql/mutation/__generated__/AddToken';
import { ADD_TOKEN } from './graphql/mutation/AddToken';
import AsyncStorage from '@react-native-community/async-storage';

interface NotificationsInterface {
  hasPermissions: boolean;
  alreadyDenied: boolean;
  notificationSettings: Pick<
    NotificationSettings_notificationSettings,
    | 'conferenceWeekPushs'
    | 'enabled'
    | 'voteConferenceWeekPushs'
    | 'voteTOP100Pushs'
    | 'outcomePushs'
  >;
  update: (
    options: UpdateNotificationSettingsVariables,
  ) => Promise<ExecutionResult<UpdateNotificationSettings>> | void;
  requestToken: () => void;
}

const defaults: NotificationsInterface = {
  hasPermissions: false,
  alreadyDenied: false,
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
    throw new Error(
      'NotificationsContext: requestToken function is not defined',
    );
  },
};

export const NotificationsContext = createContext<NotificationsInterface>(
  defaults,
);

export const NotificationsProvider: React.FC = ({ children }) => {
  const [hasPermissions, setHasPermissions] = useState(defaults.hasPermissions);
  const [alreadyDenied, setAlreadyDenied] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationsInterface['notificationSettings']
  >(defaults.notificationSettings);
  const { data } = useQuery<NotificationSettings>(NOTIFICATION_SETTINGS);
  const [updateSettings] = useMutation<
    UpdateNotificationSettings,
    UpdateNotificationSettingsVariables
  >(UPDATE_NOTIFICATION_SETTINGS);
  const [sendToken] = useMutation<AddToken, AddTokenVariables>(ADD_TOKEN);

  useEffect(() => {
    if (data && data.notificationSettings) {
      setNotificationSettings(data.notificationSettings);
    }
  }, [data]);

  // register notification events
  useEffect(() => {
    console.log('REGISTER');
    Notifications.isRegisteredForRemoteNotifications().then(value => {
      setHasPermissions(value);
    });

    Notifications.events().registerRemoteNotificationsRegistered(
      (event: Registered) => {
        const token = event.deviceToken || (event as any);
        console.log('token', token);
        AsyncStorage.setItem('push-token', token);
        sendToken({
          variables: {
            os: Platform.OS,
            token,
          },
        });
        setHasPermissions(true);
      },
    );

    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event: RegistrationError) => {
        console.error(event);
        setAlreadyDenied(true);
      },
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
  }, [sendToken]);

  const update = (options: UpdateNotificationSettingsVariables) => {
    if (options) {
      return updateSettings({
        variables: options,
        refetchQueries: [
          {
            query: NOTIFICATION_SETTINGS,
          },
        ],
        update: (proxy, { data: updateData }) => {
          if (updateData && updateData.updateNotificationSettings) {
            const notificationCacheData = proxy.readQuery<NotificationSettings>(
              {
                query: NOTIFICATION_SETTINGS,
              },
            );
            if (notificationCacheData) {
              proxy.writeQuery<NotificationSettings>({
                query: NOTIFICATION_SETTINGS,
                data: {
                  ...notificationCacheData,
                  ...options,
                },
              });
            }
          }
        },
      });
    }
  };

  const requestToken = () => {
    Notifications.registerRemoteNotifications();
  };

  return (
    <NotificationsContext.Provider
      value={{
        hasPermissions,
        alreadyDenied,
        notificationSettings,
        update,
        requestToken,
      }}>
      {children}
    </NotificationsContext.Provider>
  );
};
