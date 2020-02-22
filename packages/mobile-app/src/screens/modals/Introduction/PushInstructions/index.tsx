import React, { useState } from 'react';
import { styled } from '../../../../styles';
import { NewMarker as NewMarkerCmp } from '@democracy-deutschland/mobile-ui/src/components/Introduction';
import { NotificationBox } from './NotificationBox';
import { Settings } from './Settings';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { defaultNotificationData } from './data';
import { useNavigation } from '@react-navigation/core';

const Wrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const BackgroundStars = styled.ImageBackground.attrs({
  source: require('@democracy-deutschland/mobile-ui/src/assets/SidebarBackground.png'),
  imageStyle: {
    resizeMode: 'repeat',
  },
})`
  width: 100%;
  height: 350;
  padding-top: 42;
  padding-bottom: 18;
`;

const Headline = styled.Text`
  color: #fff;
  font-size: 22;
  margin-bottom: 33;
  align-self: center;
`;

const NewMarker = styled(NewMarkerCmp)`
  position: absolute;
  top: 37;
  left: 26;
`;

const NotificationDescription = styled.Text`
  color: #fff;
  padding-top: 14;
  padding-bottom: 52;
  margin-horizontal: 18;
`;

export interface Notification {
  title: string;
  text: string;
  description: string;
}

export const PushInstructions: React.FC = () => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState<Notification>({
    title: defaultNotificationData.outcomePushs.title,
    text: defaultNotificationData.outcomePushs.text,
    description: defaultNotificationData.outcomePushs.description,
  });
  return (
    <Wrapper>
      <BackgroundStars>
        <NewMarker />
        <Headline>Benachrichtigungen</Headline>
        <NotificationBox
          icon={require('@democracy-deutschland/mobile-ui/src/components/Introduction/assets/icon.logo.png')}
          owner="DEMOCRACY"
          title={notification.title}
          text={notification.text}
        />
        <NotificationDescription>
          {notification.description}
        </NotificationDescription>
      </BackgroundStars>
      <Settings onPress={setNotification} />
      <Button
        style={{
          marginHorizontal: 18,
        }}
        backgroundColor="blue"
        textColor="white"
        text="Aktivieren"
        onPress={navigation.goBack}
      />
    </Wrapper>
  );
};
