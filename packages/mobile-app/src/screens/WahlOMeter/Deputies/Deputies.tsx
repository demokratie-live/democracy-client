import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { styled } from '../../../styles';

const Edit = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.distances.secondary}px;
`;

const EditText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const Deputies: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation.dangerouslyGetParent()?.setOptions({
        headerRight: () => (
          <Edit onPress={() => navigation.navigate('EditDeputyList')}>
            <EditText>Bearbeiten</EditText>
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
