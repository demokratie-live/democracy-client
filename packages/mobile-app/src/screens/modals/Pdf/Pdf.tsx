import React from 'react';
import styled from 'styled-components/native';
import Pdf from 'react-native-pdf';
import { RootStackParamList } from '../../../routes';
import { useRoute, RouteProp } from '@react-navigation/core';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const PdfViewer = styled(Pdf)`
  flex: 1;
`;

type PdfScreenRouteProp = RouteProp<RootStackParamList, 'Pdf'>;

export const PdfScreen: React.FC = () => {
  const route = useRoute<PdfScreenRouteProp>();
  const {
    params: { url },
  } = route;
  return (
    <Container>
      <PdfViewer
        maxScale={10}
        source={{
          uri: url.replace('.de:80', '.de'),
        }}
      />
    </Container>
  );
};
