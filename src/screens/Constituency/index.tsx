import React, { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { SearchBar } from '@democracy-deutschland/ui';
import constituenciesList from './constituencies-list.json';
import { Constituency } from './constituencyData';
import { RouteProp, useNavigation } from '@react-navigation/core';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../routes';
import { useRecoilState } from 'recoil';
import { constituencyState } from '../../api/state/constituency';
import { getConstituencySvgs } from '../../components/svgs/constituencies';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const FlatListWrapper = styled.View``;

const Title = styled.Text`
  font-size: 17px;
`;

const Plz = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  border-bottom-color: #bcbbc1;
  border-bottom-width: 0.5px;
  align-items: center;
`;

// const SelectedConstituencyIcon = styled(Ionicons).attrs(() => ({
//   color: '#16c063',
//   size: 23,
//   name: 'ios-checkmark-circle',
// }))`
//   position: absolute;
//   left: 50px;
//   bottom: 10px;
// `;

const RowTextWrapper = styled.View`
  flex: 1;
  padding-left: 12px;
`;

const Checkmark = styled.Text`
  color: #16c063;
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`;

type ConstituencScreenRouteProp = RouteProp<RootStackParamList, 'Constituency'>;

interface Props {
  route: ConstituencScreenRouteProp;
}

export const ConstituencyScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [constituency, setConstituency] = useRecoilState(constituencyState);
  const [term, setTerm] = useState('');

  const onChangePlz = (newTerm: string) => {
    setTerm(newTerm);
  };

  const getConstituency = (wk: string) => {
    const DynComp = getConstituencySvgs(wk);
    return (
      <DynComp.default
        width={60}
        height={36}
        childProps={{ fill: 'none', stroke: '#000', strokeWidth: '2%' }}
      />
    );
  };

  const getPlz = (item: Constituency) => {
    const areacodes = item.areacodes.map(({ code }) => code.padStart(5, '0'));
    areacodes.sort((x, y) => {
      return x.indexOf(term) !== -1 ? -1 : y.indexOf(term) !== -1 ? 1 : 0;
    });
    return areacodes.join(', ');
  };

  const selectConstituency = (item: Constituency) => () => {
    Alert.alert(
      'Bestätigung des Wahlkreises',
      `WK: ${item.number}: ${item.name}\n Ist diese Auswahl korrekt?`,
      [
        { text: 'Nein', onPress: () => undefined },
        {
          text: 'Ja',
          onPress: () => {
            setConstituency(item.number);
            route.params && route.params.goBack ? navigation.goBack() : undefined;
          },
        },
      ],
      { cancelable: false },
    );
  };

  const constituenciesArray = [...constituenciesList.constituencies];
  let constituenciesData = constituenciesArray.map(constituencyData => {
    let selected = false;
    if (constituencyData.number === constituency) {
      selected = true;
    }
    return { ...constituencyData, selected };
  });

  const selectedConstituency = constituenciesData.find(data => {
    return data.selected;
  });

  constituenciesData =
    term.length > 0
      ? constituenciesData.filter(({ areacodes, name, selected, number }) => {
          // remove starting zeros from search term
          const termCode = `${parseInt(term, 10)}`;
          return (
            (areacodes.some(({ code }) => code.indexOf(termCode) === 0) ||
              name.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
              number === term) &&
            !selected
          );
        })
      : constituenciesData.filter(({ selected }) => !selected);

  if (selectedConstituency) {
    constituenciesData = [selectedConstituency, ...constituenciesData];
  }

  return (
    <Wrapper>
      <SearchBar textInput={{ placeholder: 'PLZ eingeben', onChangeText: onChangePlz }} />
      <FlatListWrapper>
        <FlatList
          data={constituenciesData}
          renderItem={({ item }) => {
            return (
              <Row onPress={selectConstituency(item)}>
                <>
                  {getConstituency(item.number)}
                  <RowTextWrapper>
                    <Title>{item.name}</Title>
                    <Plz>
                      {`Wahlkreis ${item.number}: `}
                      {getPlz(item)}
                    </Plz>
                  </RowTextWrapper>
                  {item.selected && <Checkmark>{'\u2713'}</Checkmark>}
                </>
              </Row>
            );
          }}
          keyExtractor={item => item.number}
        />
      </FlatListWrapper>
    </Wrapper>
  );
};
