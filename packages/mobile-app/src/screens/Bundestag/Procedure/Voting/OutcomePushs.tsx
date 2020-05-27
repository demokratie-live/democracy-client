import React, { useState, useContext } from 'react';
import { styled } from '../../../../styles';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { useRoute, RouteProp } from '@react-navigation/core';
import SvgIconAppIos from '@democracy-deutschland/mobile-ui/src/components/Icons/IconAppIos';
import SvgNewMarker from '@democracy-deutschland/mobile-ui/src/components/Icons/Newmarker';
import { Dimensions, Switch, View } from 'react-native';
import { NotificationsContext } from '../../../../context/NotificationPermission';
import { BundestagRootStackParamList } from '../../../../routes/Sidebar/Bundestag';
import { TOGGLE_NOTIFICATION } from '../../../Bundestag/Procedure/graphql/muatation/toggleNotification';
import { PROCEDURE } from '../../../Bundestag/Procedure/graphql/query/Procedure';
import { useMutation } from '@apollo/react-hooks';
import {
  ToggleNotification,
  ToggleNotificationVariables,
} from '../../../Bundestag/Procedure/graphql/muatation/__generated__/ToggleNotification';
import { defaultNotificationData } from '../../../modals/Introduction/PushInstructions/data';
import { NotificationBox } from '../../../modals/Introduction/PushInstructions/NotificationBox';

const DEVICE_WIDTH = Dimensions.get('window').width;

type RoutePropOP = RouteProp<BundestagRootStackParamList, 'OutcomePush'>;

const Wrapper = styled.View`
  /* width: 100%; */
  align-items: center;
`;

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
  },
})``;

const Headline = styled.Text`
  color: #000;
  font-size: 22;
  margin-vertical: 18;
`;

const Subtitle = styled.Text`
  color: #9b9b9b;
  font-size: 15;
  margin-top: 18;
  margin-bottom: 18;
  margin-horizontal: 18;
  text-align: center;
`;

const SwitchWrapper = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 18;
  margin-top: 18;
`;

const SwitchText = styled.Text`
  font-size: 17;
  flex: 1;
  padding-right: 18;
`;

export interface Notification {
  title: string;
  text: string;
  description: string;
}

interface Props {
  finishAction: () => void;
}

export const OutcomePushs: React.FC<Props> = ({ finishAction }) => {
  const route = useRoute<RoutePropOP>();

  const [toggleNotification] = useMutation<
    ToggleNotification,
    ToggleNotificationVariables
  >(TOGGLE_NOTIFICATION, {
    variables: {
      procedureId: route.params.procedureId,
    },
    refetchQueries: [
      {
        query: PROCEDURE,
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

  const doneAction = route.params.finishAction
    ? route.params.finishAction
    : finishAction;

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
    <Wrapper>
      <ScrollView>
        <View style={{ paddingTop: 18, alignItems: 'center' }}>
          <SvgNewMarker
            width={58}
            height={35}
            color="#f568c4"
            style={{ position: 'absolute', left: 18 }}
          />
          <SvgIconAppIos width={73} height={73} />
          <Headline>Ergebnisse erhalten</Headline>
          <Subtitle>
            Werde nach Deiner Abstimmung automatisch über das offizielle
            Ergebnis des Bundestages informiert, sobald dieses vorliegt, um es
            mit Deinem vergleichen zu können.
          </Subtitle>
        </View>
        <NotificationBox
          icon={require('@democracy-deutschland/mobile-ui/src/components/Introduction/assets/icon.logo.png')}
          owner="DEMOCRACY"
          title={notification.title}
          text={notification.text}
        />
        <SwitchWrapper>
          <SwitchText>
            Bundestagsergebnisse immer automatisch erhalten
          </SwitchText>
          <Switch value={pushActive} onValueChange={setPushActive} />
        </SwitchWrapper>
        {pushActive && (
          <Button
            style={{
              marginHorizontal: 18,
              width: DEVICE_WIDTH - 36,
            }}
            backgroundColor="blue"
            textColor="white"
            text="Aktivieren"
            onPress={pressActivate}
          />
        )}
        {!pushActive && (
          <Button
            style={{
              marginHorizontal: 18,
              width: DEVICE_WIDTH - 36,
            }}
            backgroundColor="red"
            textColor="white"
            text="Nicht mehr anzeigen"
            onPress={pressDenie}
          />
        )}
        <Button textColor="blue" text="Überspringen" onPress={doneAction} />
      </ScrollView>
    </Wrapper>
  );
};
