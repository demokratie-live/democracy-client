import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import { RootStackParamList } from "../../../app/_layout";
import { WomPartyProvider } from "./context";
import WomPartyList, { WomPartyListProps } from "./WomPartyList";
import { useRouter } from "expo-router";

const Container = styled.View`
  background-color: #fff;
  flex-grow: 1;
`;

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Sidebar"
>;

interface Props {
  navigation: ScreenNavigationProp;
}

export const WomPartyScreen: React.FC<Props> = ({}) => {
  const router = useRouter();
  const onProcedureListItemClick: WomPartyListProps["onProcedureListItemClick"] =
    ({ item }) => router.push(`procedure/${item.procedureId}`);
  return (
    <Container>
      <WomPartyProvider>
        <WomPartyList onProcedureListItemClick={onProcedureListItemClick} />
      </WomPartyProvider>
    </Container>
  );
};
