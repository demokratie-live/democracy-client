import React, { useContext } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { styled, theme } from '../../styles';
import { SearchBar, PlusIcon } from '@democracy-deutschland/ui';
import { AbgeordneteListContext } from '../../lib/states/Abgeordnete/context';

import { DeputyListController } from './DeputyListController';
import { FavorizedDeputiesContext } from '../../lib/states/FavorizedDeputies';

const Wrapper = styled.View`
  background-color: ${theme.oldColors.background.main};
  flex-grow: 1;
`;

const Edit = styled.TouchableOpacity`
  margin-right: ${theme.distances.secondary}px;
`;

const EditText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const Abgeordnete: React.FC = () => {
  const route = useRoute<RouteProp<any, ''>>();
  const { state, dispatch } = useContext(AbgeordneteListContext);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigation = useNavigation();
  const { favorizedDeputies } = useContext(FavorizedDeputiesContext);
  // const { constituency } = useContext(ConstituencyContext);
  // const { isVerified } = useContext(InitialStateContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Edit
          onPress={() =>
            !route?.params?.editMode
              ? dispatch({
                  type: 'ToggleEditMode',
                })
              : navigation.goBack()
          }>
          {route?.params?.editMode || state.editMode ? (
            <EditText>Fertig</EditText>
          ) : (
            <PlusIcon
              width={20}
              height={20}
              fill={theme.colors.text.secondary}
            />
          )}
        </Edit>
      ),
    });
  }, [dispatch, navigation, route, state.editMode]);

  if (!favorizedDeputies) {
    return null;
  }

  return (
    <Wrapper>
      <SearchBar
        textInput={{
          autoFocus: false,
          placeholder: 'Name, Fraktion, Wahlkreis eingeben',
          onChangeText: setSearchTerm,
        }}
      />
      <DeputyListController
        editMode={state.editMode || route?.params?.editMode}
        searchTerm={searchTerm}
        favorizedDeputies={favorizedDeputies}
      />
    </Wrapper>
  );
};
