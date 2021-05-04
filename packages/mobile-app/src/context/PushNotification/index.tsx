import React, { createContext, useEffect, useState } from 'react';
import { Notifications } from 'react-native-notifications';
import { EmitterSubscription, Platform } from 'react-native';
import { rootNavigationRef } from '../../routes/rootNavigationRef';
import {
  getNavStateForProcedure,
  getNavStateForConferenceWeek,
} from '../../lib/getNavStateForProcedure';

interface PushNotificationInterface {
  initialNotification: any;
}

const defaults: PushNotificationInterface = {
  initialNotification: undefined,
};

export const PushNotificationContext = createContext<PushNotificationInterface>(
  defaults,
);

export const PushNotificationProvider: React.FC = ({ children }) => {
  const [initialNotification, setInitialNotification] = useState<any>();

  // Register initial app open push data
  useEffect(() => {
    Notifications.getInitialNotification().then((notification: any) => {
      if (notification) {
        const payload =
          Platform.OS === 'ios'
            ? notification.payload
            : JSON.parse(notification.payload.payload);
        setInitialNotification(payload);
      } else {
        setInitialNotification(null);
      }
    });
  }, []);

  // Register Events
  useEffect(() => {
    const subscriptions: EmitterSubscription[] = [];

    // subscriptions.push(
    //   Notifications.events().registerNotificationReceivedBackground(
    //     (notification, completion) => {
    //       completion({
    //         alert: true,
    //         sound: true,
    //         badge: false,
    //       });
    //     },
    //   ),
    // );

    subscriptions.push(
      Notifications.events().registerNotificationReceivedForeground(
        (notification, completion) => {
          completion({
            alert: true,
            sound: true,
            badge: false,
          });
        },
      ),
    );

    subscriptions.push(
      Notifications.events().registerNotificationOpened(
        (notification: any, completion) => {
          if (rootNavigationRef.current) {
            const payload =
              Platform.OS === 'ios'
                ? notification.payload
                : JSON.parse(notification.payload.payload);
            if (payload.action === 'procedureBulk') {
              rootNavigationRef.current.resetRoot(
                getNavStateForConferenceWeek(),
              );
            } else {
              rootNavigationRef.current.resetRoot(
                getNavStateForProcedure({
                  procedureId: payload.procedureId,
                }),
              );
            }
          }

          completion();
        },
      ),
    );

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, []);
  return (
    <PushNotificationContext.Provider
      value={{
        initialNotification,
      }}>
      {children}
    </PushNotificationContext.Provider>
  );
};
