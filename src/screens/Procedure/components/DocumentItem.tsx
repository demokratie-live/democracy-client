import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/core";
import { linking } from "../../../lib/linking";
import SvgDocument from "../../../components/Icons/Document";
import SvgDownload from "../../../components/Icons/Download";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../app/_layout";
import { SidebarParamList } from "../../../app/(sidebar)/_layout";

const Container = styled.View`
  flex-direction: row;
`;

const ViewerButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 18px;
`;

const Text = styled.Text`
  padding-left: 14px;
  font-size: 13px;
  color: rgb(0, 118, 255);
`;

const DownloadButton = styled.TouchableOpacity`
  margin-left: auto;
  align-self: flex-end;
  padding bottom: 2px
`;

type ScreenNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, "Bundestag">,
  NativeStackNavigationProp<RootStackParamList, "Sidebar">
>;

interface Props {
  editor: string;
  type: string;
  number: string;
  url: string;
}

export const DocumentItem: React.FC<Props> = ({
  editor,
  type,
  number,
  url,
}) => {
  const navigation = useNavigation<ScreenNavigationProps>();
  return (
    <Container>
      <ViewerButton
        onPress={() => navigation.navigate("Pdf", { url, title: type })}
      >
        <SvgDocument width={18} height={18} color="#000" />
        <Text>{`${type} (${editor} ${number})`}</Text>
      </ViewerButton>

      <DownloadButton onPress={linking(url)}>
        <SvgDownload width={14} height={14} color="#848484" />
      </DownloadButton>
    </Container>
  );
};
