import React, { useContext } from 'react';

// GraphQL
// import { ConstituencyContext } from '../../context/Constituency';
// import { InitialStateContext } from '../../context/InitialStates';
import { useNavigation } from '@react-navigation/core';
import { styled } from '../../styles';
import { DeputyList, SearchBar } from '@democracy-deutschland/ui';
import { AbgeordneteListContext } from '../../lib/states/Abgeordnete/context';
import { Button, View } from 'react-native';
import { deputies } from './deputies.data';
import { useFavorizedDeputies } from '../../lib/hooks/FavorizedDeputies';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.oldColors.background.main};
  flex: 1;
`;

export const Abgeordnete: React.FC = () => {
  const { state, dispatch } = useContext(AbgeordneteListContext);
  const {
    favorizedDeputies,
    addFavorizedDeputy,
    removeFavorizedDeputy,
  } = useFavorizedDeputies();
  const navigation = useNavigation();
  // const { constituency } = useContext(ConstituencyContext);
  // const { isVerified } = useContext(InitialStateContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: 11 }}>
          <Button
            onPress={() =>
              dispatch({
                type: 'ToggleEditMode',
              })
            }
            title={state.editMode ? 'Fertig' : 'Bearbeiten'}
            color="#FFF"
          />
        </View>
      ),
    });
  }, [dispatch, navigation, state.editMode]);

  const deputiesData = deputies.map(d => ({
    ...d,
    onPress: () => navigation.navigate('MemberProfil'),
    onStatePress: () =>
      favorizedDeputies.includes(d.id)
        ? removeFavorizedDeputy(d.id)
        : addFavorizedDeputy(d.id),
  }));

  console.log('favorizedDeputies', favorizedDeputies);

  return (
    <Wrapper>
      <SearchBar
        textInput={{
          autoFocus: false,
          placeholder: 'Name, Partei, Wahlkreis, PLZ, Ort eingeben',
        }}
      />
      <DeputyList
        editMode={state.editMode}
        deputies={deputiesData}
        favorizedDeputies={[...favorizedDeputies]}
      />
    </Wrapper>
  );
};
