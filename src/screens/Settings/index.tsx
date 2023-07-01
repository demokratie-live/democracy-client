import React, { useContext, ReactNode } from 'react';
import { SectionList, Switch, Button, Alert, Platform } from 'react-native';

// GraphQL
import { ListItem } from './components/ListItem';
import { useNavigation } from '@react-navigation/core';
import { getBundleId } from 'react-native-device-info';
import styled from 'styled-components/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { SidebarParamList } from '../../routes/Sidebar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { useRecoilValue } from 'recoil';
import { constituencyState } from '../../api/state/constituency';
import { initialState } from '../../api/state/initialState';
import { NotificationsContext } from '../../api/state/notificationPermission';
import { Segment } from '../../components/Segment/index';
import { linking } from '../../lib/linking';
import { useNotifee } from '../../api/hooks/useNotifee';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  flex: 1;
`;

const Text = styled.Text`
  font-size: 17px;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.text.primary};
`;

type ScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Settings'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ListData {
  title: string;
  text?: string;
  arrow?: boolean;
  onPress: () => void;
  component?: ReactNode;
  description?: string;
  testID?: string;
}

interface List {
  title: string;
  data: ListData[];
}

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const constituency = useRecoilValue(constituencyState);
  const { isVerified } = useRecoilValue(initialState);
  const { notificationSettings, update: updateNotificationSettings } =
    useContext(NotificationsContext);
  const { requestPermissions, alreadyDenied, authorized } = useNotifee();

  const navigateTo = (screen: string) => () => {
    switch (screen) {
      case 'constituency':
        navigation.navigate('Constituency');
        break;
      case 'verificate':
        navigation.navigate('VerificationStart');
        break;
      case 'SyncVotes':
        navigation.navigate('SyncVotes');
        break;

      default:
        break;
    }
  };

  const handleActivate = () => {
    if (!alreadyDenied || Platform.OS === 'android') {
      requestPermissions();
    } else {
      Alert.alert(
        'Benachrichtigungen',
        'Bitte Mitteilungen in den Einstellungen aktivieren.',
        [
          {
            text: 'Aktivieren',
            onPress: linking(`app-settings://notification/${getBundleId()}`),
          },
          {
            text: 'Später',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const listData: List[] = [
    {
      title: '',
      data: [
        {
          title: 'Status',
          text: isVerified === true ? 'Verifiziert' : isVerified === false ? 'Verifizieren' : '…',
          arrow: isVerified === false,
          onPress: isVerified === false ? navigateTo('verificate') : () => undefined,
          testID: isVerified === false ? 'Verifizieren' : 'Verifiziert',
        },
        {
          title: 'Wahlkreis',
          text: constituency ? `WK ${constituency}` : 'nicht ausgewählt',
          onPress: navigateTo('constituency'),
          arrow: true,
        },
        {
          title: 'Stimmen übertragen',
          onPress: navigateTo('SyncVotes'),
          arrow: true,
        },
      ],
    },
  ];

  listData[0].data.push({
    title: 'Benachrichtigungen',
    onPress: navigateTo('notifications-settings'),
    component: authorized ? (
      <Switch
        value={!!notificationSettings.enabled}
        onValueChange={value => {
          updateNotificationSettings({
            enabled: value,
          });
        }}
      />
    ) : (
      <Button title="Aktivieren" onPress={handleActivate} />
    ),
  });

  if (authorized && notificationSettings.enabled) {
    listData.push(
      {
        title: 'Individuelle Benachrichtungen',
        data: [
          {
            title: 'Bundestagsergebnisse',
            onPress: navigateTo('notifications-settings'),
            component: (
              <Switch
                testID="outcomePushsSwitch"
                value={!!notificationSettings.outcomePushs}
                onValueChange={value => {
                  updateNotificationSettings({
                    outcomePushs: value,
                  });
                }}
              />
            ),
            description: isVerified
              ? 'Werde nach Deiner Abstimmung standardmäßig über das offizielle Ergebnis des Bundestages informiert, sobald dieses vorliegt.'
              : 'Werde über das offizielle Ergebnis des Bundestages informiert, sobald dieses vorliegt.',
          },
        ],
      },
      {
        title: 'Sitzungswoche',
        data: [
          {
            title: 'Ankündigung',
            onPress: navigateTo('notifications-settings'),
            component: (
              <Switch
                value={!!notificationSettings.conferenceWeekPushs}
                onValueChange={value => {
                  updateNotificationSettings({
                    conferenceWeekPushs: value,
                  });
                }}
              />
            ),
            description:
              'Werde Sonntags vor einer Sitzungswoche über die kommenden Abstimmungen informiert.',
          },
        ],
      },
    );
  }

  if (isVerified && notificationSettings.enabled) {
    const tmp = listData.find(({ title }) => title === 'Sitzungswoche');
    if (tmp) {
      tmp.data.push({
        title: 'Wichtige Abstimmungen',
        onPress: navigateTo('notifications-settings'),
        component: (
          <Switch
            value={!!notificationSettings.voteConferenceWeekPushs}
            onValueChange={value => {
              updateNotificationSettings({
                voteConferenceWeekPushs: value,
              });
            }}
          />
        ),
        description:
          'Werde täglich während einer laufenden Sitzungswoche, über eine populäre Abstimmung informiert.',
      });
    }
    listData.push({
      title: 'Sitzungsfreie Zeit',
      data: [
        {
          title: 'Populäre Abstimmungen',
          onPress: navigateTo('notifications-settings'),
          component: (
            <Switch
              value={!!notificationSettings.voteTOP100Pushs}
              onValueChange={value => {
                updateNotificationSettings({
                  voteTOP100Pushs: value,
                });
              }}
            />
          ),
          description:
            'Challenge? Werde auch in der sitzungsfreien Zeit täglich über eine Abstimmung informiert, bei der Du noch nicht mitgemacht hast.',
        },
      ],
    });
  }

  return (
    <Wrapper>
      <SectionList<ListData>
        renderItem={({ item, index }) => (
          <ListItem
            key={index}
            text={item.text}
            description={item.description}
            arrow={item.arrow}
            onPress={item.onPress}
            component={item.component}
            testID={item.testID}
          >
            <Text>{item.title}</Text>
          </ListItem>
        )}
        renderSectionHeader={({ section: { title } }) => <Segment text={title} />}
        sections={listData}
        keyExtractor={item => item.title}
      />
    </Wrapper>
  );
};
