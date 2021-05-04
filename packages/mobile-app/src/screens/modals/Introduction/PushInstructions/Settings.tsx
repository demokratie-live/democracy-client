import React, { ReactNode, useState } from 'react';
import { SectionList, Switch } from 'react-native';

// GraphQL
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsRootStackParamList } from '../../../../routes/Sidebar/Settings';
import { Segment } from '../../../Bundestag/List/Components/Segment';
import { styled } from '../../../../styles';
import { ListItem } from '../../../Settings/components/ListItem';
import { NotificationSettings_notificationSettings } from '../../../../context/NotificationPermission/graphql/query/__generated__/NotificationSettings';
import { Notification } from '.';
import { defaultNotificationData } from './data';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.oldColors.background.secondary};
  flex: 1;
`;

const Text = styled.Text`
  font-size: 17px;
  margin-right: auto;
`;

type FilterScreenNavigationProp = StackNavigationProp<
  SettingsRootStackParamList,
  'Settings'
>;

interface ListData {
  title: string;
  text?: string;
  arrow?: boolean;
  onPress?: () => void;
  component?: ReactNode;
  description?: string;
}

interface List {
  title: string;
  data: ListData[];
}

type Settings = Partial<
  Pick<
    NotificationSettings_notificationSettings,
    | 'conferenceWeekPushs'
    | 'outcomePushs'
    | 'voteConferenceWeekPushs'
    | 'voteTOP100Pushs'
  >
>;

type Props = {
  navigation?: FilterScreenNavigationProp;
  notificationSettings?: Settings;
  onPress?: (data: Notification) => void;
};

export const Settings: React.FC<Props> = ({
  notificationSettings = {
    outcomePushs: true,
  },
  onPress,
}) => {
  const [settings, setNotificationSettings] = useState<Settings>(
    notificationSettings,
  );

  const listData: List[] = [
    {
      title: 'Sitzungswoche',
      data: [
        {
          title: 'Ankündigung',
          component: (
            <Switch
              value={!!settings.conferenceWeekPushs}
              onValueChange={value => {
                setNotificationSettings({
                  ...settings,
                  conferenceWeekPushs: value,
                });
                !!onPress &&
                  onPress({
                    title: defaultNotificationData.conferenceWeekPushs.title,
                    text: defaultNotificationData.conferenceWeekPushs.text,
                    description:
                      defaultNotificationData.conferenceWeekPushs.description,
                  });
              }}
            />
          ),
          onPress: () =>
            !!onPress &&
            onPress({
              title: defaultNotificationData.conferenceWeekPushs.title,
              text: defaultNotificationData.conferenceWeekPushs.text,
              description:
                defaultNotificationData.conferenceWeekPushs.description,
            }),
        },
        {
          title: 'Wichtige Abstimmungen',
          onPress: () =>
            !!onPress &&
            onPress({
              title: defaultNotificationData.voteConferenceWeekPushs.title,
              text: defaultNotificationData.voteConferenceWeekPushs.text,
              description:
                defaultNotificationData.voteConferenceWeekPushs.description,
            }),
          component: (
            <Switch
              value={!!settings.voteConferenceWeekPushs}
              onValueChange={value => {
                setNotificationSettings({
                  ...settings,
                  voteConferenceWeekPushs: value,
                });
                !!onPress &&
                  onPress({
                    title:
                      defaultNotificationData.voteConferenceWeekPushs.title,
                    text: defaultNotificationData.voteConferenceWeekPushs.text,
                    description:
                      defaultNotificationData.voteConferenceWeekPushs
                        .description,
                  });
              }}
            />
          ),
        },
      ],
    },
    {
      title: 'Sitzungsfreie Zeit',
      data: [
        {
          title: 'Populäre Abstimmungen',
          onPress: () => {
            if (onPress) {
              onPress({
                title: defaultNotificationData.voteTOP100Pushs.title,
                text: defaultNotificationData.voteTOP100Pushs.text,
                description:
                  defaultNotificationData.voteTOP100Pushs.description,
              });
            }
          },

          component: (
            <Switch
              value={!!settings.voteTOP100Pushs}
              onValueChange={value => {
                setNotificationSettings({
                  ...settings,
                  voteTOP100Pushs: value,
                });
                !!onPress &&
                  onPress({
                    title: defaultNotificationData.voteTOP100Pushs.title,
                    text: defaultNotificationData.voteTOP100Pushs.text,
                    description:
                      defaultNotificationData.voteTOP100Pushs.description,
                  });
              }}
            />
          ),
        },
      ],
    },
    {
      title: 'Individuelle Benachrichtungen',
      data: [
        {
          title: 'Bundestagsergebnisse',
          onPress: () =>
            !!onPress &&
            onPress({
              title: defaultNotificationData.outcomePushs.title,
              text: defaultNotificationData.outcomePushs.text,
              description: defaultNotificationData.outcomePushs.description,
            }),

          component: (
            <Switch
              value={!!settings.outcomePushs}
              onValueChange={value => {
                setNotificationSettings({
                  ...settings,
                  outcomePushs: value,
                });
                !!onPress &&
                  onPress({
                    title: defaultNotificationData.outcomePushs.title,
                    text: defaultNotificationData.outcomePushs.text,
                    description:
                      defaultNotificationData.outcomePushs.description,
                  });
              }}
            />
          ),
        },
      ],
    },
  ];

  return (
    <Wrapper>
      <SectionList<ListData>
        renderItem={({ item, index }) => (
          <ListItem
            key={index}
            text={item.text}
            description={item.description}
            arrow={item.arrow}
            onPress={item.onPress ? item.onPress : () => undefined}
            component={item.component}>
            <Text>{item.title}</Text>
          </ListItem>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Segment text={title} />
        )}
        sections={listData}
        keyExtractor={item => item.title}
      />
    </Wrapper>
  );
};
