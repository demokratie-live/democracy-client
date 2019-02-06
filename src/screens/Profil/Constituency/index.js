import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Alert, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql, compose } from 'react-apollo';

// Components
import constituencies from '../../../../assets/constituencies';

// constituencies plz list
import constituenciesList from '../../../../assets/constituencies-list.json';

// GraphQL
import GET_CONSTITUENCY from '../../../graphql/queries/local/constituency';
import SET_CONSTITUENCY from '../../../graphql/mutations/local/setConstituency';

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fff;
`;

const SearchBox = styled.View`
  height: 44;
  background-color: #4494d3;
`;

const SearchInputWrapper = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5.5;
  flex-direction: row;
  align-items: center;
  padding-left: 6;
  height: 15;
  margin-horizontal: 8;
  margin-vertical: 8;
`;

const SearchInputIcon = styled(Ionicons).attrs(() => ({
  color: '#7a797b',
  size: 16,
  backgroundColor: 'transparent',
  name: 'ios-search',
}))``;

const SearchInput = styled.TextInput.attrs(() => ({
  clearButtonMode: 'always',
  autoFocus: true,
  placeholderTextColor: '#7a797b',
  underlineColorAndroid: 'transparent',
  selectionColor: '#000',
  returnKeyType: 'search',
  autoCorrect: false,
}))`
  flex: 1;
  font-size: 14;
  height: ${Platform.OS === 'ios' ? 28 : 50};
  padding-horizontal: 6;
  color: #000;
`;

const FlatList = styled.FlatList``;

const Title = styled.Text`
  font-size: 17;
`;

const Plz = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15;
  color: #8e8e93;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 12;
  padding-horizontal: 12;
  border-bottom-color: #bcbbc1;
  border-bottom-width: 0.5;
  align-items: center;
`;

const SelectedConstituencyIcon = styled(Ionicons).attrs(() => ({
  color: '#16c063',
  size: 23,
  name: 'ios-checkmark-circle',
}))`
  position: absolute;
  left: 50;
  bottom: 10;
`;

const RowTextWrapper = styled.View`
  flex: 1;
  padding-left: 12;
`;

class Constituency extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  state = {
    term: '',
  };

  onChangePlz = term => {
    this.setState({ term });
  };

  getConstituency = wk => {
    const DynComp = constituencies[`${wk}`];
    return (
      <DynComp.default
        width={60}
        height={36}
        childProps={{ fill: 'none', stroke: '#000', strokeWidth: '2%' }}
      />
    );
  };

  getPlz = item => {
    const areacodes = item.areacodes.map(({ code }) => code);
    areacodes.sort((x, y) => {
      return x.indexOf(this.state.term) !== -1 ? -1 : y.indexOf(this.state.term) !== -1 ? 1 : 0;
    });
    return areacodes.join(', ');
  };

  selectConstituency = item => () => {
    Alert.alert(
      'Bestätigung des Wahlkreises',
      `WK: ${item.number}: ${item.name}\n Ist diese Auswahl korrekt?`,
      [
        { text: 'Nein', onPress: () => {} },
        {
          text: 'Ja',
          onPress: () => {
            // AsyncStorage.setItem('selected-constituency', item.number);
            this.props.mutate({
              refetchQueries: [{ query: GET_CONSTITUENCY }],
              variables: {
                constituency: item.number,
              },
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const data = [...constituenciesList.constituencies];
    let constituenciesData = data.map(constituency => {
      let selected = false;
      if (
        !this.props.data.loading &&
        constituency.number === this.props.data.constituency.constituency
      ) {
        selected = true;
      }
      return { ...constituency, selected };
    });

    const selectedConstituency = constituenciesData.find(data => {
      return data.selected;
    });

    constituenciesData =
      this.state.term.length > 0
        ? constituenciesData.filter(
            ({ areacodes, name, selected }) =>
              (areacodes.some(({ code }) => code.indexOf(this.state.term) === 0) ||
                name.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1) &&
              !selected,
          )
        : constituenciesData.filter(({ selected }) => !selected);

    if (selectedConstituency) {
      constituenciesData = [selectedConstituency, ...constituenciesData];
    }

    return (
      <Wrapper behavior="padding" enabled>
        <SearchBox>
          <SearchInputWrapper>
            <SearchInputIcon />
            <SearchInput placeholder="PLZ eingeben" onChangeText={this.onChangePlz} />
          </SearchInputWrapper>
        </SearchBox>
        <FlatList
          data={constituenciesData}
          renderItem={({ item }) => {
            return (
              <Row onPress={this.selectConstituency(item)}>
                <>
                  {this.getConstituency(item.number)}
                  {item.selected && <SelectedConstituencyIcon />}
                  <RowTextWrapper>
                    <Title>{item.name}</Title>
                    <Plz>
                      {`Wahlkreis ${item.number}: `}
                      {this.getPlz(item)}
                    </Plz>
                  </RowTextWrapper>
                </>
              </Row>
            );
          }}
          keyExtractor={item => item.number}
        />
      </Wrapper>
    );
  }
}

Constituency.propTypes = {
  data: PropTypes.string.isRequired,
  mutate: PropTypes.func.isRequired,
};

Constituency.defaultProps = {};

export default compose(
  graphql(SET_CONSTITUENCY, {
    refetchQueries: [GET_CONSTITUENCY],
  }),
  graphql(GET_CONSTITUENCY),
)(Constituency);
