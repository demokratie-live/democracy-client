import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkNotifications } from 'react-native-permissions';
import { useAppState } from '../../../screens/Introduction/PushInstructions/useAppState';
import {
  NotificationSettings,
  NotificationSettingsDocument,
  UpdateNotificationSettingsMutationVariables,
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

  const requestToken = () => {
    // Notifications.registerRemoteNotifications();
  };

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
