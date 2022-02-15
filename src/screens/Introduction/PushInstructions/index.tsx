import React, { useState, useContext } from 'react';
import { NotificationBox } from './NotificationBox';
import { defaultNotificationData } from './data';
import { useNavigation } from '@react-navigation/core';
import { Dimensions, Switch, View } from 'react-native';
// import { NotificationsContext } from '../../../../context/NotificationPermission';
import styled from 'styled-components/native';
import { Button } from '../../../components/Button';
import SvgIconappios from '../../../components/Icons/IconAppIos';
import SvgNewmarker from '../../../components/Icons/Newmarker';

const DEVICE_WIDTH = Dimensions.get('window').width;

const Wrapper = styled.View`
  width: ${DEVICE_WIDTH}px;
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
  font-size: 22px;
  margin-vertical: 18px;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 15px;
  margin-top: 18px;
  margin-bottom: 18px;
  margin-horizontal: 18px;
  text-align: center;
`;

const SwitchWrapper = styled.View`
  width: ${DEVICE_WIDTH}px;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 18px;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const SwitchText = styled.Text`
  font-size: 17px;
  flex: 1;
  padding-right: 18px;
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

export const PushInstructions: React.FC<Props> = ({ alreadyKnown = false, finishAction }) => {
  const navigation = useNavigation();
  const [pushActive, setPushActive] = useState(true);
  // const { requestToken, update: updateNotificationSettings } = useContext(NotificationsContext);

  const notification = {
    title: defaultNotificationData.outcomePushs.title,
    text: defaultNotificationData.outcomePushs.text,
    description: defaultNotificationData.outcomePushs.description,
  };

  const pressActivate = () => {
    // requestToken();
    if (!alreadyKnown) {
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Sidebar' }],
      // });
    }
    // updateNotificationSettings({
    //   enabled: true,
    //   outcomePushs: true,
    // });
    if (!alreadyKnown) {
      finishAction();
    }
  };

  return (
    <Wrapper>
      <ScrollView>
        {!alreadyKnown && (
          <>
            <SvgNewmarker
              width={58}
              height={35}
              color="#f568c4"
              style={{ position: 'absolute', left: 18 }}
            />
            <SvgIconappios width={73} height={73} />
            <Headline>Ergebnisse erhalten</Headline>
            <Subtitle>
              Werde nach Deiner Abstimmung automatisch über das offizielle Ergebnis des Bundestages
              informiert, sobald dieses vorliegt, um es mit Deinem vergleichen zu können.
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
            Ab sofort informiert DEMOCRACY Dich <Highlight>per Push</Highlight> über das offizielle{' '}
            <Highlight>Ergebnis des Bundestages</Highlight> zu Deiner Abstimmung, sobald dieses
            vorliegt, um es mit Deinem vergleichen zu können.
          </Subtitle>
        )}
        <SwitchWrapper>
          <SwitchText>Bundestagsergebnisse immer automatisch erhalten</SwitchText>
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
