import React, { useState, useContext } from 'react';
import { styled } from '../../../../styles';
import { NotificationBox } from './NotificationBox';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { defaultNotificationData } from './data';
import { useNavigation } from '@react-navigation/core';
import SvgIconAppIos from '@democracy-deutschland/mobile-ui/src/components/Icons/IconAppIos';
import SvgNewMarker from '@democracy-deutschland/mobile-ui/src/components/Icons/Newmarker';
import { Dimensions, Switch, View } from 'react-native';
import { NotificationsContext } from '../../../../context/NotificationPermission';

const DEVICE_WIDTH = Dimensions.get('window').width;

const Wrapper = styled.View`
  width: ${DEVICE_WIDTH};
  align-items: center;
`;

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    marginBottom: 40,
  },
})``;

const Headline = styled.Text`
  color: #000;
  font-size: 22;
  margin-vertical: 18;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.textColors.secondary};
  font-size: 15;
  margin-top: 18;
  margin-bottom: 18;
  margin-horizontal: 18;
  text-align: center;
`;

const SwitchWrapper = styled.View`
  width: ${DEVICE_WIDTH};
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 18;
  margin-top: 18;
  margin-bottom: 18;
`;

const SwitchText = styled.Text`
  font-size: 17;
  flex: 1;
  padding-right: 18;
`;

const Highlight = styled.Text`
  color: #000;
`;

export interface Notification {
  title: string;
  text: string;
  description: string;
}

interface Props {
  finishAction: () => void;
  alreadyKnown?: boolean;
}

export const PushInstructions: React.FC<Props> = ({
  alreadyKnown = false,
  finishAction,
}) => {
  const navigation = useNavigation();
  const [pushActive, setPushActive] = useState(true);
  const { requestToken, update: updateNotificationSettings } = useContext(
    NotificationsContext,
  );

  const notification = {
    title: defaultNotificationData.outcomePushs.title,
    text: defaultNotificationData.outcomePushs.text,
    description: defaultNotificationData.outcomePushs.description,
  };

  const pressActivate = () => {
    requestToken();
    if (!alreadyKnown) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Sidebar' }],
      });
    }
    updateNotificationSettings({
      enabled: true,
      outcomePushs: true,
    });
    if (!alreadyKnown) {
      finishAction();
    }
  };

  return (
    <Wrapper>
      <ScrollView>
        {!alreadyKnown && (
          <>
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
          </>
        )}
        <View>
          <NotificationBox
            icon={require('@democracy-deutschland/mobile-ui/src/components/Introduction/assets/icon.logo.png')}
            owner="DEMOCRACY"
            title={notification.title}
            text={notification.text}
          />
        </View>
        {!!alreadyKnown && (
          <Subtitle>
            Ab sofort informiert DEMOCRACY Dich <Highlight>per Push</Highlight>{' '}
            über das offizielle <Highlight>Ergebnis des Bundestages</Highlight>{' '}
            zu Deiner Abstimmung, sobald dieses vorliegt, um es mit Deinem
            vergleichen zu können.
          </Subtitle>
        )}
        <SwitchWrapper>
          <SwitchText>
            Bundestagsergebnisse immer automatisch erhalten
          </SwitchText>
          <Switch value={pushActive} onValueChange={setPushActive} />
        </SwitchWrapper>
        <Button
          style={{
            marginHorizontal: 18,
            width: DEVICE_WIDTH - 36,
          }}
          backgroundColor="blue"
          textColor="white"
          text="Aktivieren"
          onPress={pressActivate}
          disabled={!pushActive}
        />
      </ScrollView>
    </Wrapper>
  );
};
