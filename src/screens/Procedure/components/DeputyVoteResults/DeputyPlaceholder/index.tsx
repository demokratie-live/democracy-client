import React from "react";
import { useNavigation } from "@react-navigation/core";
import { PlusIcon } from "@democracy-deutschland/ui";
import { RootStackParamList } from "../../../../../app/_layout";
import styled from "styled-components/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DeputyAvatarPlaceholder from "./components/DeputyAvatarPlaceholder";
import { useWindowDimensions } from "react-native";

const Wrapper = styled.TouchableOpacity<{ width: number }>`
  flex: 1;
  width: ${({ width }) => width}px;
  align-items: center;
  min-height: 310px;
`;

const MemberImageWrapper = styled.View`
  width: 200px;
  align-items: center;
`;

const DeputyDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spaces.default};
  margin-bottom: ${({ theme }) => theme.spaces.small};
  bottom: 0;
  position: absolute;
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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();

  return (
    <Wrapper
      width={width}
      onPress={() => {
        navigation.push("Deputies", { editMode: true });
      }}
    >
      <MemberImageWrapper>
        <DeputyAvatarPlaceholder width={210} height={268} />
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
