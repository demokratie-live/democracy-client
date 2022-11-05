import React, { useState, useContext } from 'react';
import { useRoute, RouteProp } from '@react-navigation/core';
import { Switch, View } from 'react-native';
import { RootStackParamList } from '../../routes';
import styled from 'styled-components/native';
import { ProcedureDocument, useToggleNotificationMutation } from '../../__generated__/graphql';
import { NotificationsContext } from '../../api/state/notificationPermission';
import { defaultNotificationData } from '../Introduction/PushInstructions/data';
import { NotificationBox } from '../Introduction/PushInstructions/NotificationBox';
import { Button } from '@democracy-deutschland/ui';
import { Headline } from '../../components/Headline';
import { AppLogo } from '../../components/AppLogo';

type RouteProps = RouteProp<RootStackParamList, 'OutcomePush'>;

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    marginHorizontal: 18,
  },
})``;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 15px;
  margin-top: 18px;
  margin-bottom: 18px;
  text-align: center;
`;

const SwitchWrapper = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 18px;
`;

const SwitchText = styled.Text`
  font-size: 17px;
  flex: 1;
  padding-right: 18px;
`;

const SkipButton = styled(Button)`
  height: 72px;
`;

const ToggleButton = styled(Button)``;

export interface Notification {
  title: string;
  text: string;
  description: string;
}

interface Props {
  finishAction: () => void;
}

export const OutcomePushs: React.FC<Props> = ({ finishAction }) => {
  const route = useRoute<RouteProps>();

  const [toggleNotification] = useToggleNotificationMutation({
    variables: {
      procedureId: route.params.procedureId,
    },
    refetchQueries: [
      {
        query: ProcedureDocument,
        variables: {
          id: route.params.procedureId,
        },
      },
    ],
  });

  const [pushActive, setPushActive] = useState(true);
  const {
    requestToken,
    update: updateNotificationSettings,
    setOutcomePushsDenied,
  } = useContext(NotificationsContext);

  const notification = {
    title: defaultNotificationData.outcomePushs.title,
    text: route.params.title || defaultNotificationData.outcomePushs.text,
    description: defaultNotificationData.outcomePushs.description,
  };

  const doneAction = route.params.finishAction ? route.params.finishAction : finishAction;

  const pressActivate = () => {
    toggleNotification();
    requestToken();
    updateNotificationSettings({
      enabled: true,
      outcomePushs: true,
    });
    doneAction();
  };

  const pressDenie = () => {
    setOutcomePushsDenied(true);
    doneAction();
  };

  return (
    <ScrollView>
      <View style={{ paddingTop: 36, alignItems: 'center' }}>
        <AppLogo />
        <Headline>Ergebnisse erhalten</Headline>
        <Subtitle>
          Werde nach Deiner Abstimmung automatisch über das offizielle Ergebnis des Bundestages
          informiert, sobald dieses vorliegt, um es mit Deinem vergleichen zu können.
        </Subtitle>
      </View>
      <NotificationBox
        icon={require('../Introduction/components/assets/icon.logo.png')}
        owner="DEMOCRACY"
        title={notification.title}
        text={notification.text}
      />
      <SwitchWrapper>
        <SwitchText>Bundestagsergebnisse immer automatisch erhalten</SwitchText>
        <Switch value={pushActive} onValueChange={setPushActive} />
      </SwitchWrapper>
      {pushActive && (
        <ToggleButton variant="primary" onPress={pressActivate}>
          Aktivieren
        </ToggleButton>
      )}
      {!pushActive && (
        <ToggleButton variant="danger" onPress={pressDenie}>
          Nicht mehr anzeigen
        </ToggleButton>
      )}

      {!pushActive && (
        <Subtitle>
          Du kannst die Benachrichtigungen jederzeit in den App-Einstellungen aktivieren
        </Subtitle>
      )}

      {pushActive && (
        <SkipButton variant="secondary" onPress={doneAction}>
          Überspringen
        </SkipButton>
      )}
    </ScrollView>
  );
};
