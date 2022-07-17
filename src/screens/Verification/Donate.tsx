import React, { useEffect } from 'react';

import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useInitialState } from '../../api/state/initialState';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import SvgIconappios from '../../components/Icons/IconAppIos';
import { Button } from '../../components/Button';

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
`;

const TextCenterNormal = styled.Text``;

const TextCenterBold = styled.Text`
  font-weight: bold;
`;

const TextCenter = styled.Text`
  align-content: center;
  justify-content: space-between;
  flex: 1;
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 17px;
  padding-top: 50px;
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

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'SmsDonate'>;

export const SmsDonate: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { refetchMe } = useInitialState();

  useEffect(() => {
    return () => {
      refetchMe?.();
    };
  }, [refetchMe]);

  const onClose = () => {
    navigation.popToTop();
  };

  const onDonate = () => {
    navigation.navigate('Donate', { done: () => navigation.popToTop() });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Container>
        <SvgIconappios width={100} height={100} />
        <TextHead>{'Deine Verifikation\nwar erfolgreich!'}</TextHead>
        <TextCenter>
          <TextCenterNormal>
            {'Das Versenden Deiner Bestätigungs-\nSMS hat das Projekt DEMOCRACY\nDeutschland '}
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
          <Button onPress={onDonate} textColor="white" backgroundColor="blue" text="SPENDEN" />
        </ButtonContainer>
      </Container>
    </SafeAreaView>
  );
};
