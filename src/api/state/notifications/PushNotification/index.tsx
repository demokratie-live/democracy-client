import { createContext, useEffect } from 'react';
import { Notifications } from 'react-native-notifications';
import { EmitterSubscription, Platform } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../routes';
import { BundestagTopTabParamList } from '../../../../routes/Bundestag';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { ListType } from '../../../../__generated__/graphql';

interface PushNotificationInterface {
  initialNotification: any;
}

const defaults: PushNotificationInterface = {
  initialNotification: undefined,
};

type ScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<BundestagTopTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const PushNotificationContext = createContext<PushNotificationInterface>(defaults);

export const useRoutePushNotifications = () => {
  const { navigate } = useNavigation<ScreenNavigationProp>();

  // Register initial app open push data
  useEffect(() => {
    Notifications.getInitialNotification().then(notification => {
      if (notification) {
        const payload = (Platform.OS === 'ios' ? notification.payload : notification.payload) as {
          action: string;
          procedureId: string;
        };
        if (payload.action === 'procedureBulk') {
          navigate('Sitzungswoche', { list: ListType.ConferenceweeksPlanned });
        } else if (payload.procedureId) {
          navigate('Procedure', { procedureId: payload.procedureId, title: '' });
        }
      }
    });
  }, [navigate]);

  // Register Events
  useEffect(() => {
    const subscriptions: EmitterSubscription[] = [];
    subscriptions.push(
      Notifications.events().registerNotificationReceivedForeground((_notification, completion) => {
        completion({ alert: true, sound: true, badge: false });
      }),
    );
    subscriptions.push(
      Notifications.events().registerNotificationReceivedBackground((_notification, completion) => {
        completion({ alert: true, sound: true, badge: false });
      }),
    );

    subscriptions.push(
      Notifications.events().registerNotificationOpened(
        (notification: { payload: { action: string; procedureId: string } }, completion) => {
          const payload = notification.payload;

          if (payload.action === 'procedureBulk') {
            navigate('Sitzungswoche', { list: ListType.ConferenceweeksPlanned });
          } else if (payload.procedureId) {
            navigate('Procedure', { procedureId: payload.procedureId, title: '' });
          }
          completion();
        },
      ),
    );

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [navigate]);
};
