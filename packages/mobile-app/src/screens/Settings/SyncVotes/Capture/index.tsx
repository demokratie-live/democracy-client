import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line import/namespace
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import { Bar as BarCmp } from 'react-native-progress';
import { styled, theme as appTheme } from '../../../../styles';
import { SyncObj } from '..';
import VotesLocal, { Chain } from '../../../../lib/VotesLocal';
import { Alert, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../../../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { LocalVotesContext } from '../../../../context/LocalVotes';

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
  color: ${({ theme }) => theme.textColors.tertiary};
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
  color: ${({ theme }) => theme.textColors.warn};
`;

const Camera = styled(RNCamera)`
  flex: 1;
`;

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SyncVotesCapture'
>;

interface Props {
  navigation: ScreenNavigationProp;
}

const CaptureSyncVotes: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<SyncObj[]>([]);
  const [allCaptured, setAllCaptured] = useState<boolean>(false);
  const [syncComplete, setSyncComplete] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>();
  const { updateLocalVotesStore } = useContext(LocalVotesContext);
  const handleBarcode = (event: BarCodeReadEvent) => {
    try {
      const qrData: SyncObj = JSON.parse(event.data);
      if (data.length === 0 && qrData.meta.identifier) {
        setIdentifier(qrData.meta.identifier);
      } else if (
        identifier !== qrData.meta.identifier ||
        !qrData.meta.identifier
      ) {
        throw new Error('identifier do not matching');
      }
      const current = qrData?.meta?.current;
      const captured = data.some(({ meta }: any) => meta.current === current);
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
            d: [...prev.d, ...dataArray.procedures],
          };
        },
        {
          v: 1,
          d: [],
        },
      );
      VotesLocal.mergeKeychains(votesData)
        .then(updateLocalVotesStore)
        .then(() => setSyncComplete(true));
    }
  }, [allCaptured, data, updateLocalVotesStore]);

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
            Scanne den QR-Code auf Deinem alten Gerät, bis die Übertragung
            abgeschlossen ist
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
              <Spinner size="large" color={appTheme.colors.headerText} />
            </SpinnerContainer>
          )}
        </>
      }
      <DescriptionContainer>
        <TextRed>
          Die Übertragung erfolgt einmalig und kann nicht rückgängig gemacht
          werden
        </TextRed>
      </DescriptionContainer>
    </Container>
  );
};

export default CaptureSyncVotes;
