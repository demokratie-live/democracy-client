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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@democracy-deutschland/ui';
import { Headline } from '../../components/Headline';
import { useNotifee } from '../../api/hooks/useNotifee';
import { getVersion } from 'react-native-device-info';

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

const ScrollView = styled.ScrollView.attrs({
  contentContainer: {
    paddingVertical: 200,
  },
})`
  padding-top: 18px;
`;

const HeaderWrapper = styled.View`
  align-items: center;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
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

const ActionButton = styled(Button)`
  margin-bottom: 18px;
  margin-horizontal: ${({ theme }) => theme.spaces.default};
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
  const { update: updateNotificationSettings } = useContext(NotificationsContext);
  const { isVerified, setLastStartWithVersion } = useRecoilValue(initialState);
  const { requestPermissions } = useNotifee();

  const notification = {
    title: defaultNotificationData.outcomePushs.title,
    text: route.params.title || defaultNotificationData.outcomePushs.text,
    description: defaultNotificationData.outcomePushs.description,
  };

  const pressActivate = () => {
    requestPermissions();
    navigation.goBack();
    setLastStartWithVersion(getVersion());
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
        <ActionButton variant="primary" onPress={pressActivate} disabled={!pushActive}>
          Aktivieren
        </ActionButton>
        <ActionButton
          variant="danger-secondary"
          onPress={() => {
            navigation.goBack();
          }}
        >
          Später
        </ActionButton>
      </ScrollView>
    </Wrapper>
  );
};
