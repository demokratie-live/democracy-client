import React, { useEffect } from "react";
import styled from "styled-components/native";
import Pdf from "react-native-pdf";
import { useRoute, RouteProp } from "@react-navigation/core";
import { RootStackParamList } from "../../app/_layout";
import { useNavigation } from "expo-router";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const PdfViewer = styled(Pdf)`
  flex: 1;
`;

type PdfScreenRouteProp = RouteProp<RootStackParamList, "Pdf">;

export const PdfScreen: React.FC = () => {
  const route = useRoute<PdfScreenRouteProp>();
  const navigation = useNavigation();
  const {
    params: { url, title },
  } = route;

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  return (
    <Container>
      <PdfViewer
        maxScale={10}
        source={{
          uri: url.replace(".de:80", ".de"),
        }}
      />
    </Container>
  );
};
