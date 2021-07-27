import { PlusIcon } from '@democracy-deutschland/ui';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { styled, theme } from '../../../styles';

const Edit = styled.TouchableOpacity`
  margin-right: ${theme.distances.secondary}px;
`;

export const Deputies: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation.dangerouslyGetParent()?.setOptions({
        headerRight: () => (
          <Edit onPress={() => navigation.navigate('EditDeputyList')}>
            <PlusIcon
              width={20}
              height={20}
              fill={theme.colors.text.secondary}
            />
          </Edit>
        ),
      });
    } else {
      navigation.dangerouslyGetParent()?.setOptions({
        headerRight: null,
      });
    }
  }, [isFocused, navigation]);

  return <Text>{isFocused ? 'focused' : 'unfocused'}</Text>;
};