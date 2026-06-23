import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Pdf from "react-native-pdf";
import { useRoute, RouteProp } from "@react-navigation/core";
import { RootStackParamList } from "../../app/_layout";
import { useNavigation } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Button } from "../../components/Button";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const PdfViewer = styled(Pdf)`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoadingText = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  color: #666;
  text-align: center;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: #d0021b;
  text-align: center;
  margin-bottom: 20px;
`;

type PdfScreenRouteProp = RouteProp<RootStackParamList, "Pdf">;

interface PdfState {
  loading: boolean;
  error: string | null;
  progress: number;
  loaded: boolean;
}

export const PdfScreen: React.FC = () => {
  const route = useRoute<PdfScreenRouteProp>();
  const navigation = useNavigation();
  const {
    params: { url, title },
  } = route;

  const [pdfState, setPdfState] = useState<PdfState>({
    loading: true,
    error: null,
    progress: 0,
    loaded: false,
  });

  const cleanUrl = url.replace(".de:80", ".de");

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  const handleLoadProgress = (percent: number) => {
    setPdfState(prev => ({
      ...prev,
      progress: percent,
      loading: percent < 1,
    }));
  };

  const handleLoadComplete = () => {
    setPdfState(prev => ({
      ...prev,
      loading: false,
      loaded: true,
      error: null,
    }));
  };

  const handleError = (error: object) => {
    console.error("PDF Loading Error:", error);
    const errorMessage = error && typeof error === 'object' && 'message' in error 
      ? (error as { message: string }).message 
      : "Fehler beim Laden des PDF-Dokuments";
    
    setPdfState(prev => ({
      ...prev,
      loading: false,
      error: errorMessage,
      loaded: false,
    }));
  };

  const handleRetry = () => {
    setPdfState({
      loading: true,
      error: null,
      progress: 0,
      loaded: false,
    });
  };

  if (pdfState.error) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>
            {pdfState.error}
          </ErrorText>
          <ErrorText>
            URL: {cleanUrl}
          </ErrorText>
          <Button
            onPress={handleRetry}
            text="Erneut versuchen"
            textColor="white"
            backgroundColor="blue"
          />
        </ErrorContainer>
      </Container>
    );
  }

  if (pdfState.loading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#4494d3" />
          <LoadingText>
            Lädt PDF... {Math.round(pdfState.progress * 100)}%
          </LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <PdfViewer
        maxScale={10}
        source={{
          uri: cleanUrl,
        }}
        onLoadProgress={handleLoadProgress}
        onLoadComplete={handleLoadComplete}
        onError={handleError}
      />
    </Container>
  );
};
