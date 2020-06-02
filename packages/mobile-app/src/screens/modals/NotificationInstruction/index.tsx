import React, { useState, useContext } from 'react';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import SvgNewMarker from '@democracy-deutschland/mobile-ui/src/components/Icons/Newmarker';
import { Switch, Image } from 'react-native';
import { styled } from '../../../styles';
import { NotificationsContext } from '../../../context/NotificationPermission';
import { defaultNotificationData } from '../Introduction/PushInstructions/data';
import { NotificationBox } from '../Introduction/PushInstructions/NotificationBox';
import { RootStackParamList } from '../../../routes';
import { InitialStateContext } from '../../../context/InitialStates';

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

const ScrollView = styled.ScrollView.attrs({})``;

const HeaderWrapper = styled.View`
  align-items: center;
`;

const Headline = styled.Text`
  color: #000;
  font-size: 22;
  margin-vertical: 18;
`;

const Subtitle = styled.Text`
  color: #9b9b9b;
  font-size: 15;
  padding-top: 14;
  padding-bottom: 52;
  margin-horizontal: 18;
  text-align: center;
`;

const SwitchWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 18;
  padding-top: 40;
  padding-bottom: 31;
`;

const SwitchText = styled.Text`
  font-size: 17;
  flex: 1;
  padding-right: 18;
`;

type RouteProps = RouteProp<RootStackParamList, 'NotificationInstruction'>;

export interface Notification {
  title: string;
  text: string;
  description: string;
}

export const NotificationInstructionScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const [pushActive, setPushActive] = useState(true);
  const { requestToken, update: updateNotificationSettings } = useContext(
    NotificationsContext,
  );
  const { isVerified } = useContext(InitialStateContext);

  const notification = {
    title: defaultNotificationData.outcomePushs.title,
    text: route.params.title || defaultNotificationData.outcomePushs.text,
    description: defaultNotificationData.outcomePushs.description,
  };

  const pressActivate = () => {
    requestToken();
    navigation.goBack();
    route.params.done();
    updateNotificationSettings({
      enabled: true,
      outcomePushs: true,
    });
  };

  const notificationTitle = isVerified
    ? defaultNotificationData.outcomePushs.title
    : 'Offizielles Ergebnis zur Abstimmung';

  return (
    <Wrapper>
      <ScrollView>
        <HeaderWrapper>
          <SvgNewMarker
            width={58}
            height={35}
            color="#f568c4"
            style={{ position: 'absolute', left: 18 }}
          />
          <Image
            source={require('@democracy-deutschland/mobile-ui/src/components/Introduction/assets/icon.beobachte.png')}
          />
          <Headline>Du hast die Glocke aktiviert</Headline>
          <Subtitle>
            und wirst über das offizielle Ergebnis des Bundestages zu dieser
            Abstimmung informiert, wenn Du uns erlaubst, Dir Mitteilungen zu
            senden.
          </Subtitle>
        </HeaderWrapper>
        <NotificationBox
          icon={require('@democracy-deutschland/mobile-ui/src/components/Introduction/assets/icon.logo.png')}
          owner="DEMOCRACY"
          title={notificationTitle}
          text={notification.text}
        />
        <SwitchWrapper>
          <SwitchText>Bundestagsergebnis erhalten</SwitchText>
          <Switch value={pushActive} onValueChange={setPushActive} />
        </SwitchWrapper>
        <Button
          style={{
            marginHorizontal: 18,
          }}
          backgroundColor="blue"
          textColor="white"
          text="Aktivieren"
          onPress={pressActivate}
          disabled={!pushActive}
        />
        <Button
          style={{
            marginHorizontal: 18,
          }}
          textColor="red"
          text="Später"
          onPress={navigation.goBack}
        />
      </ScrollView>
    </Wrapper>
  );
};
