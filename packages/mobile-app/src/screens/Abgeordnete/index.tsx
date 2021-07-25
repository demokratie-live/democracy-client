import React, { useContext } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { styled } from '../../styles';
import { SearchBar } from '@democracy-deutschland/ui';
import { AbgeordneteListContext } from '../../lib/states/Abgeordnete/context';

import { DeputyListController } from './DeputyListController';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.oldColors.background.main};
  flex-grow: 1;
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
  const route = useRoute<RouteProp<any, ''>>();
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
            !route?.params?.editMode
              ? dispatch({
                  type: 'ToggleEditMode',
                })
              : navigation.goBack()
          }>
          <EditText>
            {route?.params?.editMode || state.editMode
              ? 'Fertig'
              : 'Bearbeiten'}
          </EditText>
        </Edit>
      ),
    });
  }, [dispatch, navigation, route, state.editMode]);

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
      />
    </Wrapper>
  );
};
