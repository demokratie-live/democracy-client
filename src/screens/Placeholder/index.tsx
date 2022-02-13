import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import * as S from './Placeholder.styles';
import {RootStackParamList} from '../../routes';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const PlaceholderScreen: React.FC<Props> = ({
  route: {
    params: {title},
  },
}) => {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
    </S.Wrapper>
  );
};
