import { PlusIcon } from "@democracy-deutschland/ui";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { RootStackParamList } from "../../../app/_layout";
import { WomDeputyList } from "./DeputyList";
import { useRouter } from "expo-router";

const Wrapper = styled.View`
  flex-grow: 1;
`;

const Edit = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spaces.small};
`;

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Sidebar"
>;

const Plus = styled(PlusIcon).attrs(({ theme }) => ({
  fill: theme.colors.text.secondary,
  width: 17,
  height: 17,
}))``;

export const DeputiesScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const isFocused = useIsFocused();
  const router = useRouter();

  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        headerRight: () => (
          <Edit onPress={() => router.push(`/DeputiesEdit`)}>
            <Plus />
          </Edit>
        ),
      });
    } else {
      navigation.getParent()?.setOptions({
        headerRight: null,
      });
    }
  }, [isFocused, navigation, router]);

  return (
    <Wrapper>
      <WomDeputyList />
    </Wrapper>
  );
};
