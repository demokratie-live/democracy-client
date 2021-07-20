import React, { useContext } from 'react';

import { useNavigation } from '@react-navigation/core';
import { styled } from '../../styles';
import { SearchBar } from '@democracy-deutschland/ui';
import { AbgeordneteListContext } from '../../lib/states/Abgeordnete/context';

import { DeputyListController } from './DeputyListController';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.oldColors.background.main};
  flex: 1;
`;

const Edit = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.distances.secondary}px;
`;

const EditText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const Abgeordnete: React.FC = () => {
  const { state, dispatch } = useContext(AbgeordneteListContext);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigation = useNavigation();
  // const { constituency } = useContext(ConstituencyContext);
  // const { isVerified } = useContext(InitialStateContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Edit
          onPress={() =>
            dispatch({
              type: 'ToggleEditMode',
            })
          }>
          <EditText>{state.editMode ? 'Fertig' : 'Bearbeiten'}</EditText>
        </Edit>
      ),
    });
  }, [dispatch, navigation, state.editMode]);

  return (
    <Wrapper>
      <SearchBar
        textInput={{
          autoFocus: false,
          placeholder: 'Name, Partei, Wahlkreis, PLZ, Ort eingeben',
          onChangeText: setSearchTerm,
        }}
      />
      <DeputyListController editMode={state.editMode} searchTerm={searchTerm} />
    </Wrapper>
  );
};
