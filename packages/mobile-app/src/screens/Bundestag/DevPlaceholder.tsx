/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import React, { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text, Button, Clipboard, Alert, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { BundestagRootStackParamList } from '../../routes/Sidebar/Bundestag';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import Document from '@democracy-deutschland/mobile-ui/src/components/Icons/Document';
import { RootStackParamList } from '../../routes';
import { SidebarParamList } from '../../routes/Sidebar';
import { TopTabParamList } from '../../routes/Sidebar/Bundestag/TabView';
import { InitialStateContext } from '../../context/InitialStates';
import VotesLocal from '../../lib/VotesLocal';
import {
  Notifications,
  NotificationAction,
  NotificationTextInput,
  NotificationCategory,
  Notification,
  Registered,
  RegistrationError,
} from 'react-native-notifications';

const Container = styled.ScrollView`
  flex: 1;
  /* align-items: center; */
  /* justify-content: center; */
`;

type DevPlaceholderNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TopTabParamList, 'DEV'>,
  CompositeNavigationProp<
    StackNavigationProp<BundestagRootStackParamList, 'TabView'>,
    CompositeNavigationProp<
      DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
      StackNavigationProp<RootStackParamList>
    >
  >
>;

interface State {
  notifications: any[];
  openedNotifications: any[];
  pushToken?: string | null;
  hasPermissions: boolean;
}

const NotificationWrapper = styled.View`
  background-color: lightblue;
`;

const NotificationDev = () => {
  return (
    <NotificationWrapper>
      <Button
        title="Notification in 10 seconds"
        onPress={() => console.log('Notification in 10 seconds')}
      />
      <Button
        title="Notification now"
        onPress={() => console.log('Notification now')}
      />
    </NotificationWrapper>
  );
};

class NotificationsExampleApp extends React.Component<any, State> {
  state = {
    notifications: [],
    openedNotifications: [],
    pushToken: '',
    hasPermissions: false,
  };

  constructor(props: any) {
    super(props);

    this.registerNotificationEvents();
    this.setCategories();
    AsyncStorage.getItem('push-token').then(token => {
      this.setState({ pushToken: token });
      console.log('PUSH TOKEN', token);
    });
    Notifications.isRegisteredForRemoteNotifications().then(hasPermissions => {
      this.setState({ hasPermissions });
    });
  }

  registerNotificationEvents() {
    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        this.setState({
          notifications: [...this.state.notifications, notification],
        });
        completion({
          alert: notification.payload.showAlert,
          sound: false,
          badge: false,
        });
      },
    );

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        this.setState({
          notifications: [...this.state.notifications, notification],
        });
        completion({
          alert: notification.payload.showAlert,
          sound: false,
          badge: false,
        });
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        this.setState({
          openedNotifications: [
            ...this.state.openedNotifications,
            notification,
          ],
        });

        completion();
      },
    );

    Notifications.events().registerRemoteNotificationsRegistered(
      (event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event, event.deviceToken);
      },
    );
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event: RegistrationError) => {
        console.error(event);
      },
    );
  }

  requestPermissions() {
    Notifications.registerRemoteNotifications();
  }

  setCategories() {
    // const notificationInputDummy: NotificationTextInput = {
    //   buttonTitle: 'the Button title',
    //   placeholder: 'PLU holder',
    // };
    // const upvoteAction = new NotificationAction(
    //   'background',
    //   'foreground',
    //   String.fromCodePoint(0x1f44d),
    //   true,
    //   notificationInputDummy,
    // );

    const notificationInputReply: NotificationTextInput = {
      buttonTitle: 'Reply now',
      placeholder: 'Insert message',
    };

    const replyAction = new NotificationAction(
      'REPLY_ACTION',
      'destructive',
      'Reply',
      true,
      notificationInputReply,
    );

    const category = new NotificationCategory('SOME_CATEGORY', [replyAction]);

    Notifications.setCategories([category]);
  }

  sendLocalNotification() {
    Notifications.postLocalNotification(
      {
        body: 'Local notificiation!',
        title: 'Local Notification Title',
        sound: 'chime.aiff',
        badge: 3,
        identifier: 'the_identifier',
        payload: {
          title: 'payload title',
          link: 'a link',
        },
        // aps: {
        //   alert: {
        //     title: 'the alert title',
        //     body: 'the alert body',
        //   },
        // },
        thread: 'SOME_CATEGORY',
        type: 'the type',
        // category: 'SOME_CATEGORY',
        // link: 'localNotificationLink',
      },
      Math.floor(Math.random() * 10),
    );
  }

  removeAllDeliveredNotifications() {
    Notifications.removeAllDeliveredNotifications();
  }

  async componentDidMount() {
    const initialNotification = await Notifications.getInitialNotification();
    if (initialNotification) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        notifications: [initialNotification, ...this.state.notifications],
      });
    }
  }

  renderNotification(notification: Notification) {
    console.log(notification);
    return (
      <View style={{ backgroundColor: 'lightgray', margin: 10 }}>
        <Text>{`Title: ${notification.title}`}</Text>
        <Text>{`Body: ${notification.body}`}</Text>
        <Text>{`Extra Link Param: ${notification.payload.link}`}</Text>
      </View>
    );
  }

  renderOpenedNotification(notification: Notification) {
    return (
      <View style={{ backgroundColor: 'lightgray', margin: 10 }}>
        <Text>{`Title: ${notification.title}`}</Text>
        <Text>{`Body: ${notification.body}`}</Text>
        <Text>{`Notification Clicked: ${notification.payload.link}`}</Text>
      </View>
    );
  }

  render() {
    const notifications = this.state.notifications.map((notification, idx) => (
      <View key={`notification_${idx}`}>
        {this.renderNotification(notification)}
      </View>
    ));
    const openedNotifications = this.state.openedNotifications.map(
      (notification, idx) => (
        <View key={`notification_${idx}`}>
          {this.renderOpenedNotification(notification)}
        </View>
      ),
    );
    return (
      <View style={styles.container}>
        <Text>
          Has Push permissions: {this.state.hasPermissions ? 'true' : 'false'}
        </Text>
        <Button
          title={'Request permissions'}
          onPress={this.requestPermissions}
          testID={'requestPermissions'}
        />
        <Button
          title={'Send local notification'}
          onPress={this.sendLocalNotification}
          testID={'sendLocalNotification'}
        />
        <Button
          title={'Remove all delivered notifications'}
          onPress={this.removeAllDeliveredNotifications}
        />
        {notifications}
        {openedNotifications}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
});

const LocalVotes = () => {
  const [localVotes, setLocalVotes] = useState('');
  useEffect(() => {
    VotesLocal.readKeychain().then(data => setLocalVotes(JSON.stringify(data)));
  }, []);

  return (
    <>
      <Text>LocalVotes: {localVotes}</Text>
      <Button
        title="Copy Local Votes"
        onPress={() => {
          Clipboard.setString(localVotes);
          Alert.alert('local votes copied');
        }}
      />
    </>
  );
};

export const DevPlaceholder: FC = () => {
  const { isVerified } = useContext(InitialStateContext);
  const navigation = useNavigation<DevPlaceholderNavigationProps>();
  return (
    <Container>
      <Text>Bundestag Screen</Text>
      <Button
        title="Go to Procedure"
        onPress={() =>
          navigation.navigate('Procedure', {
            procedureId: '1',
            title: 'Sitzungswoche',
          })
        }
      />
      <Button title="Voting" onPress={() => navigation.navigate('Voting')} />
      <Button
        title="Go to Introduction"
        onPress={() => navigation.navigate('Introduction')}
      />
      <Button
        title="Go to Verification"
        onPress={() => navigation.navigate('Verification')}
      />
      {__DEV__ && <Text>is verified {JSON.stringify(isVerified)}</Text>}
      <Button
        title="Clear Async Storage"
        onPress={() => AsyncStorage.clear()}
      />
      <Button
        title="Clear Local Votes Storage"
        onPress={() => VotesLocal.reset()}
      />
      <Document width="32px" height="32px" color="black" />
      <LocalVotes />
      <NotificationDev />
      <NotificationsExampleApp />
    </Container>
  );
};
