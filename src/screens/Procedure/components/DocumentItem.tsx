import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { linking } from '../../../lib/linking';
import SvgDocument from '../../../components/Icons/Document';
import SvgDownload from '../../../components/Icons/Download';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '../../../routes/Sidebar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes';

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
  padding-top: 11px;
  margin-left: auto;
`;

type ScreenNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
  NativeStackNavigationProp<RootStackParamList, 'Sidebar'>
>;

interface Props {
  editor: string;
  type: string;
  number: string;
  url: string;
}

export const DocumentItem: React.FC<Props> = ({ editor, type, number, url }) => {
  const navigation = useNavigation<ScreenNavigationProps>();
  return (
    <Container>
      <ViewerButton onPress={() => navigation.navigate('Pdf', { url, title: type })}>
        <SvgDocument width={18} height={18} color="#000" />
        <Text>{`${type} (${editor} ${number})`}</Text>
      </ViewerButton>

      <DownloadButton onPress={linking(url)}>
        <SvgDownload width={18} height={18} color="red" />
      </DownloadButton>
    </Container>
  );
};
