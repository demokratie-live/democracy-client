import React from 'react';
import styled from 'styled-components/native';
import DocumentIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Document';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { TopTabParamList } from '../../../../routes/Sidebar/Bundestag/TabView';
import { BundestagRootStackParamList } from '../../../../routes/Sidebar/Bundestag';
import { SidebarParamList } from '../../../../routes/Sidebar';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../../../../routes';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 13;
`;

const Text = styled.Text`
  padding-left: 14;
  font-size: 13;
  color: rgb(0, 118, 255);
`;

type DevPlaceholderNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<
    TopTabParamList,
    'DEV' | 'Sitzungswoche' | 'Top 100' | 'Vergangen'
  >,
  CompositeNavigationProp<
    StackNavigationProp<BundestagRootStackParamList, 'TabView'>,
    CompositeNavigationProp<
      DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
      StackNavigationProp<RootStackParamList>
    >
  >
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
  const navigation = useNavigation<DevPlaceholderNavigationProps>();
  return (
    <Wrapper onPress={() => navigation.navigate('Pdf', { url })}>
      <DocumentIcon width={18} height={18} color="#000" />
      <Text>{`${type} (${editor} ${number})`}</Text>
    </Wrapper>
  );
};
