import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useAppState } from "../../../screens/Introduction/PushInstructions/useAppState";
import {
  NotificationSettings,
  NotificationSettingsDocument,
  UpdateNotificationSettingsMutationVariables,
  useNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "../../../__generated__/graphql";

interface NotificationsInterface {
  outcomePushsDenied: boolean;
  notificationSettings: Pick<
    NotificationSettings,
    | "conferenceWeekPushs"
    | "enabled"
    | "voteConferenceWeekPushs"
    | "voteTOP100Pushs"
    | "outcomePushs"
  >;
  update: (options: UpdateNotificationSettingsMutationVariables) => void;
  setOutcomePushsDenied: (value: boolean) => void;
}

const defaults: NotificationsInterface = {
  outcomePushsDenied: false,
  notificationSettings: {
    conferenceWeekPushs: false,
    enabled: false,
    voteConferenceWeekPushs: false,
    voteTOP100Pushs: false,
    outcomePushs: false,
  },
  update: () => {
    throw new Error("NotificationsContext: update function is not defined");
  },
  setOutcomePushsDenied: () => {
    throw new Error(
      "NotificationsContext: setOutcomePushsDenied function is not defined"
    );
  },
};

export const NotificationsContext =
  createContext<NotificationsInterface>(defaults);

export const NotificationsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [alreadyDenied, setAlreadyDenied] = useState(false);
  const [outcomePushsDenied, setOutcomePushsDenied] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationsInterface["notificationSettings"]
  >(defaults.notificationSettings);
  const { data } = useNotificationSettingsQuery();

  const [updateSettings] = useUpdateNotificationSettingsMutation();

  const { appState } = useAppState();

  useEffect(() => {
    Notifications.getPermissionsAsync().then(({ status }) => {
      if (!alreadyDenied && status === "denied") {
        setAlreadyDenied(true);
      } else if (alreadyDenied && status === "granted") {
        setAlreadyDenied(false);
      } else if (status === "granted") {
        setAlreadyDenied(false);
      } else if (status === "denied") {
        setAlreadyDenied(true);
      }
    });
  }, [appState, alreadyDenied]);

  useEffect(() => {
    AsyncStorage.getItem("PUSH_OUTCOME_DENIED").then((value) => {
      if (value) {
        setOutcomePushsDenied(true);
      }
    });
  }, []);

  useEffect(() => {
    if (outcomePushsDenied) {
      AsyncStorage.setItem("PUSH_OUTCOME_DENIED", "true");
    }
  }, [outcomePushsDenied]);

  useEffect(() => {
    if (data && data.notificationSettings) {
      setNotificationSettings(data.notificationSettings);
    }
  }, [data]);

  const update = (options: UpdateNotificationSettingsMutationVariables) => {
    console.log("Updating notification settings", options);
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
    })
      .then(() => {
        console.log("Notification settings updated");
      })
      .catch((e) => {
        console.log("Error updating notification settings", e);
      });
  };

  return (
    <NotificationsContext.Provider
      value={{
        notificationSettings,
        update,
        outcomePushsDenied,
        setOutcomePushsDenied,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
