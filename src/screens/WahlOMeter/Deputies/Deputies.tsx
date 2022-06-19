import { PlusIcon } from '@democracy-deutschland/ui';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../routes';
import { WomDeputyList } from './DeputyList';

const Wrapper = styled.View`
  flex-grow: 1;
`;

const Edit = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spaces.small};
`;

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sidebar'>;

const Plus = styled(PlusIcon)`
  width: 17px;
  height: 17px;
  fill: ${({ theme }) => theme.colors.text.tertiary};
`;

export const DeputiesScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        headerRight: () => (
          <Edit onPress={() => navigation.navigate('EditDeputyList', { editMode: true })}>
            <Plus />
          </Edit>
        ),
      });
    } else {
      navigation.getParent()?.setOptions({
        headerRight: null,
      });
    }
  }, [isFocused, navigation]);

  return (
    <Wrapper>
      <WomDeputyList />
    </Wrapper>
  );
};
