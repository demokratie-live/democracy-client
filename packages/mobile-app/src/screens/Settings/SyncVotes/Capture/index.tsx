import React, { useState } from 'react';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import { styled } from '../../../../styles';
import { SyncObj } from '..';

const Container = styled.View`
  flex: 1;
`;

const DescriptionContainer = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  padding-top: 11px;
  padding-bottom: 11px;
  text-align: center;
  color: ${({ theme }) => theme.textColors.tertiary};
`;

const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const CaptureSyncVotes = () => {
  const [data, setData] = useState<SyncObj[]>([]);
  const handleBarcode = (event: BarCodeReadEvent) => {
    const qrData = JSON.parse(event.data);
    const current = qrData?.meta?.current;
    const captured = data.some(({ meta }: any) => meta.current === current);
    if (!captured) {
      setData([...data, qrData]);
    }
    // console.log('BC event', event);
  };

  const allCaptured = data.length > 0 && data.length === data[0].meta.sum;

  console.log('analyse Data', data);
  if (allCaptured) {
  }

  return (
    <Container>
      {!allCaptured && (
        <Camera captureAudio={false} onBarCodeRead={handleBarcode} />
      )}
      <DescriptionContainer>
        <Text>Hallo</Text>
        {data.length === 0 && <Text>No Data</Text>}
        {data.length !== 0 && (
          <Text>{`${data.length}/${data[0].meta.sum}`}</Text>
        )}
      </DescriptionContainer>
    </Container>
  );
};

export default CaptureSyncVotes;
