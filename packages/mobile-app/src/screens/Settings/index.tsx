import React, { useContext } from 'react';
import { Alert, SectionList } from 'react-native';

// GraphQL
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsRootStackParamList } from '../../routes/Sidebar/Settings';
import { ConstituencyContext } from '../../context/Constituency';
import { InitialStateContext } from '../../context/InitialStates';
import { Segment } from '../Bundestag/List/Components/Segment';
import { ListItem } from './components/ListItem';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';

const Text = styled.Text`
  font-size: 17;
  margin-right: auto;
`;

type FilterScreenNavigationProp = StackNavigationProp<
  SettingsRootStackParamList,
  'Settings'
>;

interface ListData {
  title: string;
  text?: string;
  arrow?: boolean;
  onPress: () => void;
}

interface List {
  title: string;
  data: ListData[];
}

type Props = {
  navigation: FilterScreenNavigationProp;
};

export const Settings: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { constituency } = useContext(ConstituencyContext);
  const { isVerified } = useContext(InitialStateContext);
  const navigateTo = (screen: string) => () => {
    switch (screen) {
      case 'constituency':
        // TODO navigate to constituency selection
        navigation.navigate('Constituency');
        break;
      case 'verificate':
        // TODO navigate to constituency selection
        Alert.alert('navigate to verification');
        break;

      default:
        break;
    }
  };

  const listData: List[] = [
    {
      title: 'Identität',
      data: [
        {
          title: 'Status',
          text:
            isVerified === true
              ? 'Verifiziert'
              : isVerified === false
              ? 'Verifizieren'
              : '…',
          arrow: isVerified === false,
          onPress:
            isVerified === false ? navigateTo('verificate') : () => undefined,
        },
        {
          title: 'Wahlkreis',
          text: `WK ${constituency}`,
          onPress: navigateTo('constituency'),
        },
      ],
    },
    {
      title: 'Einstellungen',
      data: [
        {
          title: 'Benachrichtigungen',
          onPress: navigateTo('notifications-settings'),
        },
      ],
    },
  ];
  return (
    <SectionList<ListData>
      renderItem={({ item, index }) => (
        <ListItem
          key={index}
          text={item.text}
          arrow={item.arrow !== false}
          onPress={item.onPress}>
          <Text>{item.title}</Text>
        </ListItem>
      )}
      renderSectionHeader={({ section: { title } }) => <Segment text={title} />}
      sections={listData}
      keyExtractor={item => item.title}
    />
  );
};
