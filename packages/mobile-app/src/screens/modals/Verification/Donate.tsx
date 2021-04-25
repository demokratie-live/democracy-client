import React, { useContext, useEffect } from 'react';

import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import SvgIconappios from '@democracy-deutschland/mobile-ui/src/components/Icons/IconAppIos';
import { useNavigation } from '@react-navigation/core';
import { InitialStateContext } from '../../../context/InitialStates';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '../../../context/Navigation';
import { styled } from '../../../styles';

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))`
  flex: 1;
  background: #fff;
  padding-top: ${() => {
    if (DeviceInfo.getModel() === 'iPhone X') {
      return 36;
    }
    return Platform.OS === 'ios' ? 24 : 8;
  }}px;
  padding-horizontal: 18px;
`;

const TextHead = styled.Text`
  color: #000;
  font-size: 22px;
  padding-top: 25px;
  text-align: center;
  font-family: ${Platform.OS === 'ios'
    ? 'HelveticaNeue-Light'
    : 'sans-serif-light'};
`;

const TextCenterNormal = styled.Text``;

const TextCenterBold = styled.Text`
  font-weight: bold;
`;

const TextCenter = styled.Text`
  align-content: center;
  justify-content: space-between;
  flex: 1;
  color: ${({ theme }) => theme.textColors.secondary};
  font-size: 17px;
  padding-top: 50px;
  font-family: ${Platform.OS === 'ios'
    ? 'HelveticaNeue-Light'
    : 'sans-serif-light'};
  text-align: center;
  padding-bottom: 18px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-right: 25px;
  padding-left: 25px;
  padding-bottom: 25px;
`;

export const SmsDonate: React.FC = () => {
  const navigation = useNavigation();
  const { reset } = useContext(NavigationContext);
  const { refetchMe } = useContext(InitialStateContext);

  useEffect(() => {
    return () => {
      refetchMe();
    };
  });

  const onClose = () => {
    refetchMe();
    reset();
  };

  const onDonate = async () => {
    navigation.navigate('Donate');
    refetchMe();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Container>
        <SvgIconappios width={75} height={75} />
        <TextHead>{'Deine Verifikation\nwar erfolgreich!'}</TextHead>
        <TextCenter>
          <TextCenterNormal>
            {
              'Das Versenden Deiner Bestätigungs-\nSMS hat das Projekt DEMOCRACY\nDeutschland '
            }
          </TextCenterNormal>
          <TextCenterBold>7,2 Cent</TextCenterBold>
          <TextCenterNormal>
            {
              ' gekostet.\n\nJede Spende hilft dem DEMOCRACY\nDeutschland e.V. erfolgreich seine\nunabhängige, überparteiliche und\nallgemeinnützige demokratische\nArbeit voranzubringen.'
            }
          </TextCenterNormal>
        </TextCenter>
        <ButtonContainer>
          <Button onPress={onClose} textColor="red" text="Später" />
          <Button
            onPress={onDonate}
            textColor="white"
            backgroundColor="blue"
            text="SPENDEN"
            style={{
              width: '100%',
            }}
          />
        </ButtonContainer>
      </Container>
    </SafeAreaView>
  );
};
