import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { PlusIcon } from '@democracy-deutschland/ui';
import { RootStackParamList } from '../../../../../routes';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DeputyAvatarPlaceholder from './components/DeputyAvatarPlaceholder';

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
`;

const MemberImageWrapper = styled.View`
  width: 200px;
  align-items: center;
`;

const DeputyDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spaces.default};
  margin-bottom: ${({ theme }) => theme.spaces.default};
`;

const PlusWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.vote.community.yes};
  padding: 4px;
  border-radius: 50px;
  margin-right: 4px;
`;

const Plus = styled(PlusIcon).attrs(({ theme }) => ({
  fill: theme.colors.text.secondary,
  width: 10,
  height: 10,
}))``;

const AddText = styled.Text``;

interface Props {
  label: string;
}

export const DeputyVoteResultPlaceholder: React.FC<Props> = ({ label }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Wrapper
      onPress={() => {
        navigation.push('AbgeordneteEdit', { editMode: true });
      }}
    >
      <MemberImageWrapper>
        <DeputyAvatarPlaceholder />
      </MemberImageWrapper>
      <DeputyDetailsWrapper>
        <PlusWrapper>
          <Plus />
        </PlusWrapper>
        <AddText>{label}</AddText>
      </DeputyDetailsWrapper>
    </Wrapper>
  );
};
