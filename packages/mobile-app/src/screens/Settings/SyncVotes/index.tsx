import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import VotesLocal from '../../../lib/VotesLocal';
import { styled } from '../../../styles';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';

const Container = styled.View`
  align-items: center;
  padding-horizontal: 18px;
`;

const Text = styled.Text`
  padding-top: 11px;
  padding-bottom: 11px;
  text-align: center;
  color: ${({ theme }) => theme.textColors.tertiary};
`;

const ListContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const ListText = styled.Text`
  padding-top: 11px;
  padding-bottom: 11px;
  color: ${({ theme }) => theme.textColors.tertiary};
`;

const ListElement = ({ label, text }: { label: string; text: string }) => {
  return (
    <ListContainer>
      <ListText>{label}</ListText>
      <ListText style={{ paddingLeft: 18 }}>{text}</ListText>
    </ListContainer>
  );
};

const SyncVotes = () => {
  const [localVotes, setLocalVotes] = useState<string[]>([]);
  const [iterator, setIterator] = useState<number>(0);
  const qrSize =
    (Dimensions.get('window').width < Dimensions.get('window').height
      ? Dimensions.get('window').width
      : Dimensions.get('window').height) - 36;
  useEffect(() => {
    VotesLocal.readKeychain().then(data => {
      setLocalVotes(
        data.d.reduce<string[]>((prev, { i, s, t, c }, index) => {
          const arrayIndey = Math.floor(index / 25);

          if (prev[arrayIndey]) {
            prev[arrayIndey] = `${prev[arrayIndey]}:${i}.${s}.${new Date(
              t,
            ).getTime()}.${c}`;
          } else {
            prev[arrayIndey - 1] = `${prev[arrayIndey - 1]}:MORE`;
            prev[arrayIndey] = `${i}.${s}.${t}.${c}`;
          }
          return prev;
        }, [] as string[]),
      );
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let next = iterator + 1;
      if (next === localVotes.length) {
        next = 0;
      }

      setIterator(next);
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [localVotes, iterator]);

  return (
    <Container>
      <Text>
        So synchronisiert Du Deine lokalen Stimmen mit einem neuen Gerät:
      </Text>
      {!!localVotes && <QRCode size={qrSize} value={localVotes[iterator]} />}
      <ListElement label="1." text="Öffne DEMOCRACY auf deinem neuen Gerät" />
      <ListElement
        label="2."
        text="Tippe auf Menu > Settings und wähle Stimmen übertragen"
      />
      <ListElement
        label="3."
        text="Tippe auf dem neuen Gerät den Button Stimmen synchronisieren und richte es auf diesen Bildschirm, um den QR-Code zu scannen"
      />
      <Button
        text="Stimmen übertragen"
        textColor="white"
        backgroundColor="blue"
        style={{ width: '100%' }}
        onPress={() => {
          console.log('TODO');
        }}
      />
    </Container>
  );
};

export default SyncVotes;
