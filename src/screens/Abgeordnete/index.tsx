import React, { useState } from "react";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { SearchBar, PlusIcon } from "@democracy-deutschland/ui";
import { DeputyListController } from "./DeputyListController";
import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { favorizedDeputiesState } from "../../api/state/favorizedDeputies";
import { theme } from "../../styles/theme";
import { ParlamentIdentifier } from "../../api/state/parlament";
import { SidebarParamList } from "../../app/(sidebar)/_layout";

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background.primary};
  flex-grow: 1;
`;

const Edit = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spaces.small};
`;

const EditText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

type RouteProps = RouteProp<SidebarParamList, "Abgeordnete">;

interface Props {
  parlamentIdentifier: ParlamentIdentifier;
  initialEditMode?: true;
}

export const AbgeordneteScreen: React.FC<Props> = ({
  parlamentIdentifier,
  initialEditMode,
}) => {
  const route = useRoute<RouteProps>();
  const [editMode, setEditMode] = useState<boolean>(!!initialEditMode);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigation = useNavigation();

  const favorizedDeputies = useRecoilValue(
    favorizedDeputiesState(parlamentIdentifier)
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Edit
          onPress={() =>
            !initialEditMode
              ? setEditMode((curEditMode) => !curEditMode)
              : navigation.goBack()
          }
        >
          {editMode ? (
            <EditText>Fertig</EditText>
          ) : (
            <PlusIcon
              width={17}
              height={17}
              fill={theme.colors.text.secondary}
            />
          )}
        </Edit>
      ),
    });
  }, [navigation, route, editMode, setEditMode]);

  if (!favorizedDeputies) {
    return null;
  }

  return (
    <Wrapper>
      <SearchBar
        textInput={{
          autoFocus: false,
          placeholder: "Name, Fraktion, Wahlkreis eingeben",
          onChangeText: setSearchTerm,
        }}
      />
      <DeputyListController
        editMode={editMode || !!editMode}
        searchTerm={searchTerm}
        favorizedDeputies={favorizedDeputies}
      />
    </Wrapper>
  );
};
