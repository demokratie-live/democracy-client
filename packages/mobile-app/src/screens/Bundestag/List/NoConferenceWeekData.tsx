import React from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 15;
  text-align: center;
  padding-horizontal: 18;
  padding-bottom: 11;
`;

const TextGrey = styled(Text)`
  color: #9b9b9b;
`;

export const NoConferenceWeekData = () => (
  <Container>
    <Text>Es liegen derzeit noch keine Abstimmungsdaten vor.</Text>
    <TextGrey>
      Die nächste Sitzungswoche findet gemäß Sitzungswochenkalener in KW 48
      (??.??. – ??.??.???) statt.
    </TextGrey>
    {/* TODO show button only if notifications not requested (show explanation for push) */}
    <Button
      text="Benachrichtigen"
      textColor="blue"
      onPress={() => Alert.alert('navigate to notifications')}
    />
  </Container>
);
