import React, { useState, useEffect } from 'react';
import { Bar as BarCmp } from 'react-native-progress';
import { SyncObj } from '../SyncVotes';
import { Alert, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import VotesLocal, { Chain } from '../../lib/VotesLocal';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import { lightTheme } from '@democracy-deutschland/ui';
import { useSetRecoilState } from 'recoil';
import { votesLocalState } from '../../api/state/votesLocal';

const Container = styled.View`
  flex: 1;
`;

const DescriptionContainer = styled.View`
  margin-bottom: 18px;
  margin-horizontal: 18px;
`;

const Bar = styled(BarCmp)`
  margin-top: -18px;
  margin-bottom: 18px;
  align-self: center;
`;

const Text = styled.Text`
  padding-top: 18px;
  padding-bottom: 18px;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const SpinnerContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled(ActivityIndicator)``;

const TextRed = styled(Text)`
  color: ${({ theme }) => theme.colors.text.danger};
`;

const Camera = styled(RNCamera)`
  flex: 1;
`;

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SyncVotesCapture'>;

interface Props {
  navigation: ScreenNavigationProp;
}

export const SyncVotesCaptureScreen: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<SyncObj[]>([]);
  const [allCaptured, setAllCaptured] = useState<boolean>(false);
  const [syncComplete, setSyncComplete] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>();
  const setVotesLocal = useSetRecoilState(votesLocalState);

  const handleBarcode = (event: BarCodeReadEvent) => {
    try {
      const qrData: SyncObj = JSON.parse(event.data);
      if (data.length === 0 && qrData.meta.identifier) {
        setIdentifier(qrData.meta.identifier);
      } else if (identifier !== qrData.meta.identifier || !qrData.meta.identifier) {
        throw new Error('identifier do not matching');
      }
      const current = qrData?.meta?.current;
      const captured = data.some(({ meta }) => meta.current === current);
      if (!captured) {
        setData([...data, qrData]);
      }
    } catch (_e) {
      // Do nothing
    }
  };

  useEffect(() => {
    if (data.length > 0 && data.length === data[0].meta.sum) {
      setAllCaptured(true);
    }
  }, [data]);

  useEffect(() => {
    if (allCaptured) {
      const votesData = data.reduce<Chain>(
        (prev, dataArray) => {
          return {
            ...prev,
            d: [...(prev.d || []), ...dataArray.procedures],
          };
        },
        {
          v: 1,
          d: [],
        },
      );
      VotesLocal.mergeKeychains(votesData)
        .then(setVotesLocal)
        .then(() => setSyncComplete(true));
    }
  }, [allCaptured, data, setVotesLocal]);

  useEffect(() => {
    if (syncComplete) {
      Alert.alert('Fertig', 'Übertragung abgeschlossen 🥳', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [navigation, syncComplete]);

  return (
    <Container>
      {
        <>
          <Text>
            Scanne den QR-Code auf Deinem alten Gerät, bis die Übertragung abgeschlossen ist
          </Text>
          <Camera captureAudio={false} onBarCodeRead={handleBarcode} />
          <Bar
            progress={data[0] ? data.length / data[0].meta.sum : 0}
            indeterminate={data.length === 0}
            width={200}
            animationType="spring"
          />
          {data.length > 0 && (
            <SpinnerContainer>
              <Spinner size="large" color={lightTheme.colors.text.primary} />
            </SpinnerContainer>
          )}
        </>
      }
      <DescriptionContainer>
        <TextRed>Die Übertragung erfolgt einmalig und kann nicht rückgängig gemacht werden</TextRed>
      </DescriptionContainer>
    </Container>
  );
};
