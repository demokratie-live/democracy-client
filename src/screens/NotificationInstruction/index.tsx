import React, { useState, useContext } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import { Switch, Image, View } from 'react-native';
import { defaultNotificationData } from '../Introduction/PushInstructions/data';
import { NotificationBox } from '../Introduction/PushInstructions/NotificationBox';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../routes';
import { NotificationsContext } from '../../api/state/notificationPermission';
import { useRecoilValue } from 'recoil';
import { initialState } from '../../api/state/initialState';
import SvgNewmarker from '../../components/Icons/Newmarker';
import { Button } from '../../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

const ScrollView = styled.ScrollView.attrs({})``;

const HeaderWrapper = styled.View`
  align-items: center;
`;

const Headline = styled.Text`
  color: #000;
  font-size: 22px;
  margin-vertical: 18px;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 15px;
  padding-top: 14px;
  padding-bottom: 52px;
  margin-horizontal: 18px;
  text-align: center;
`;

const SwitchWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 18px;
  padding-top: 40px;
  padding-bottom: 31px;
`;

const SwitchText = styled.Text`
  font-size: 17px;
  flex: 1;
  padding-right: 18px;
`;

type RouteProps = RouteProp<RootStackParamList, 'NotificationInstruction'>;
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'NotificationInstruction'>;

export interface Notification {
  title: string;
  text: string;
  description: string;
}

export const NotificationInstructionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const [pushActive, setPushActive] = useState(true);
  const { requestToken, update: updateNotificationSettings } = useContext(NotificationsContext);
  const { isVerified } = useRecoilValue(initialState);

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
          <SvgNewmarker
            width={58}
            height={35}
            color="#f568c4"
            style={{ position: 'absolute', left: 18 }}
          />
          <Image source={require('../Introduction/components/assets/icon.beobachte.png')} />
          <Headline>Du hast die Glocke aktiviert</Headline>
          <Subtitle>
            und wirst über das offizielle Ergebnis des Bundestages zu dieser Abstimmung informiert,
            wenn Du uns erlaubst, Dir Mitteilungen zu senden.
          </Subtitle>
        </HeaderWrapper>
        <View style={{ paddingHorizontal: 18 }}>
          <NotificationBox
            icon={require('../Introduction/components/assets/icon.logo.png')}
            owner="DEMOCRACY"
            title={notificationTitle}
            text={notification.text}
          />
        </View>
        <SwitchWrapper>
          <SwitchText>Bundestagsergebnis erhalten</SwitchText>
          <Switch value={pushActive} onValueChange={setPushActive} />
        </SwitchWrapper>
        <Button
          backgroundColor="blue"
          textColor="white"
          text="Aktivieren"
          onPress={pressActivate}
          disabled={!pushActive}
        />
        <Button
          textColor="red"
          text="Später"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </ScrollView>
    </Wrapper>
  );
};
