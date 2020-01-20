import React, { createContext, useState, useEffect } from 'react';
import { Notifications } from 'react-native-notifications';
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

interface NotificationsInterface {
  hasPermissions: boolean;
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
}

const defaults: NotificationsInterface = {
  hasPermissions: false,
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
};

export const NotificationsContext = createContext<NotificationsInterface>(
  defaults,
);

export const NotificationsProvider: React.FC = ({ children }) => {
  const [hasPermissions, setHasPermissions] = useState(defaults.hasPermissions);
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationsInterface['notificationSettings']
  >(defaults.notificationSettings);
  const { data } = useQuery<NotificationSettings>(NOTIFICATION_SETTINGS);
  const [updateSettings] = useMutation<
    UpdateNotificationSettings,
    UpdateNotificationSettingsVariables
  >(UPDATE_NOTIFICATION_SETTINGS);

  useEffect(() => {
    if (data && data.notificationSettings) {
      setNotificationSettings(data.notificationSettings);
    }
  }, [data]);

  useEffect(() => {
    Notifications.isRegisteredForRemoteNotifications().then(value => {
      setHasPermissions(value);
    });
  }, []);

  const update = (options: UpdateNotificationSettingsVariables) => {
    if (options) {
      return updateSettings({
        variables: options,
        refetchQueries: [
          {
            query: NOTIFICATION_SETTINGS,
          },
        ],
      });
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        hasPermissions,
        notificationSettings,
        update,
      }}>
      {children}
    </NotificationsContext.Provider>
  );
};
