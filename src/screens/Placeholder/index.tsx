import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import * as S from './Placeholder.styles';
import { RootStackParamList } from '../../routes';
import { Text, TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceholderScreen'>;

export const PlaceholderScreen: React.FC<Props> = ({
  route: { params: { title } = { title: 'Placeholder' } },
}) => {
  const [showHello, setShowHello] = useState(false);
  return (
    <S.Wrapper testID="title">
      <S.Title>{title}</S.Title>

      <TouchableOpacity testID="MyUniqueId123" onPress={() => setShowHello(v => !v)}>
        <Text>Some button</Text>
      </TouchableOpacity>
      {showHello ? <Text>Hello!!!</Text> : null}
    </S.Wrapper>
  );
};
