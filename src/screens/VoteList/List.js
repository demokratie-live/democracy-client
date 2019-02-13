/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from 'react';
import { Dimensions, Platform, ActivityIndicator, AsyncStorage, Picker } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';
import { Query } from 'react-apollo';
import { unionBy } from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';

import preventNavStackDuplicate from '../../hocs/preventNavStackDuplicate';

import ListSectionHeader from '../../components/ListSectionHeader';
import ListItem from './ListItem';

import GET_PROCEDURES from '../../graphql/queries/getProcedures';
import GET_FILTERS from '../../graphql/queries/local/filters';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  width: ${({ width }) => width};
`;

const Loading = styled.View`
  height: 50;
  align-items: center;
  justify-content: center;
`;

const PickerWrapper = styled.View``;

const PickerHeader = styled.View`
  background-color: #f9f9f9;
  align-items: flex-end;
`;

const SortRow = styled.TouchableOpacity`
  background-color: #e6edf2;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 18;
`;

const SortIcon = styled.Text`
  color: #6d6d72;
`;

const PickerFinishButton = styled.Button``;

const FlatList = styled.FlatList``;

const PAGE_SIZE = 20;
const STORAGE_KEY = 'VoteList.Filters';

const SORTERS = {
  IN_VOTE: [
    {
      key: 'voteDate',
      title: 'nach Restzeit sortieren',
    },
    {
      key: 'activities',
      title: 'nach Aktivitätsindex sortieren',
    },
  ],
  PAST: [
    {
      key: 'lastUpdateDate',
      title: 'nach Aktualisierung sortieren',
    },
    {
      key: 'created',
      title: 'nach Vorgangsdatum sortieren',
    },
    {
      key: 'activities',
      title: 'nach Aktivitätsindex sortieren',
    },
  ],
  PREPARATION: [
    {
      key: 'lastUpdateDate',
      title: 'nach Aktualisierung sortieren',
    },
    {
      key: 'created',
      title: 'nach Vorgangsdatum sortieren',
    },
    {
      key: 'activities',
      title: 'nach Aktivitätsindex sortieren',
    },
  ],
};

class List extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  constructor(props) {
    super(props);
    const menuIcon = Platform.OS === 'ios' ? 'ios-menu' : 'md-menu';
    Ionicons.getImageSource(menuIcon, 24, '#FFFFFF').then(icon => {
      props.navigator.setButtons({
        leftButtons: [
          {
            icon,
            id: 'menu',
          },
        ],
      });
    });
  }

  state = {
    width: Platform.OS === 'ios' ? Dimensions.get('window').width : 'auto',
    filters: false,
    sort: this.props.list === 'IN_VOTE' ? 'voteDate' : 'lastUpdateDate',
    sorterOpened: false,
    fetchedAll: false,
  };

  onChangeFilter = filters => {
    const filterQuery = {};
    if (filters.type) {
      filterQuery.type = filters.type.map(({ title }) => title);
    }
    if (filters.subjectGroups) {
      filterQuery.subjectGroups = filters.subjectGroups.map(({ title }) => title);
    }

    if (filters.activity) {
      filterQuery.activity = filters.activity.map(({ name }) => name);
    }

    if (this.state.fetchedAll) {
      this.setState({ fetchedAll: false });
    }
    return filterQuery;
  };

  onLayout = () => {
    if (Platform.OS === 'ios') {
      const { width } = Dimensions.get('window');
      if (width !== this.state.width) {
        this.setState({ width });
      }
    }
  };

  onItemClick = ({ item }) => () => {
    this.props.navigateTo({
      screen: 'democracy.Detail',
      title: 'Abstimmung'.toUpperCase(),
      passProps: { ...item },
      backButtonTitle: '',
    });
  };

  onChangeSort = sort => {
    this.setState({ sort });
    refetch({
      sort,
    });
  };

  setRightButtons = ({ filterActive }) => {
    const searchIcon = Platform.OS === 'ios' ? 'ios-search' : 'md-search';
    Ionicons.getImageSource(searchIcon, 24, '#FFFFFF').then(iconSearch => {
      this.props.navigator.setButtons({
        rightButtons: [
          {
            icon: iconSearch,
            id: 'search',
          },
          {
            icon: filterActive
              ? require('../../../assets/icons/badge-active-20.png')
              : require('../../../assets/icons/badge-inactive-20.png'),
            id: 'filter',
          },
        ],
      });
    });
  };

  prepareFilter = filterObj => {
    const filters = Object.keys(filterObj).reduce((prev, key) => {
      if (key === 'notifications') {
        if (filterObj.notifications.value) {
          return { ...prev, notifications: filterObj.notifications.value };
        }
        return { ...prev };
      }
      if (!filterObj[key].every(({ value }) => value)) {
        return { ...prev, [key]: filterObj[key].filter(({ value }) => value) };
      }
      return prev;
    }, {});
    this.setRightButtons({
      filterActive: filters && Object.keys(filters).length > 0,
    });
    return filters;
  };

  filterProcedures = ({ type, subjectGroups, voted, viewedStatus, currentStatus }) => {
    const { filters } = this.state;
    if (!filters || filters.length === 0) {
      return true;
    }
    let doFilter = true;
    Object.keys(filters).forEach(key => {
      switch (key) {
        case 'notifications':
          if (filters[key] && viewedStatus !== 'PUSH') {
            doFilter = false;
          }
          break;
        case 'activity':
          if (filters[key][0].name === 'voted' && !voted) {
            doFilter = false;
          } else if (filters[key][0].name === 'notVoted' && voted) {
            doFilter = false;
          }
          break;
        case 'type':
          if (filters[key][0].title !== type) {
            doFilter = false;
          }
          break;
        case 'subjectGroups': {
          const showSubjectGroups = filters[key].map(({ title }) => title);
          doFilter = subjectGroups.some(
            subjectGroup => showSubjectGroups.findIndex(subject => subject === subjectGroup) !== -1,
          );
          break;
        }
        case 'currentStatus': {
          const states = filters[key].map(({ title }) => title);
          doFilter = states.findIndex(state => state === currentStatus) !== -1;
          break;
        }

        default:
          break;
      }
    });

    return doFilter;
  };

  filterJson = null;

  renderItem = onClick => ({ item }) => {
    const { list } = this.props;
    if (item.type === 'sort') {
      if (Platform.OS === 'ios') {
        const curSort = SORTERS[list]
          ? SORTERS[list].find(({ key }) => key === this.state.sort)
          : {};
        return (
          <SortRow onPress={() => this.setState({ sorterOpened: true })}>
            <ListSectionHeader title={curSort.title} />
            <SortIcon>▼</SortIcon>
          </SortRow>
        );
      }
      return (
        <Picker
          selectedValue={this.state.sort}
          style={{ paddingLeft: 18, height: 35, backgroundColor: '#e6edf2' }}
          onValueChange={this.onChangeSort}
        >
          {SORTERS[list].map(({ key, title }) => (
            <Picker.Item key={key} label={title} value={key} />
          ))}
        </Picker>
      );
    }
    return <ListItem item={item} onClick={onClick} />;
  };

  render() {
    const { list } = this.props;
    const { sorterOpened, sort } = this.state;

    return (
      <Wrapper onLayout={this.onLayout} width={this.state.width}>
        <Query query={GET_FILTERS} fetchPolicy="network-only">
          {({
            data: {
              filters: { filters },
            },
          }) => {
            console.log('filterQuery', filters);
            let filterQuery;
            if (this.filterJson !== filters) {
              const jsonObj = JSON.parse(filters);
              filterQuery = this.onChangeFilter(this.prepareFilter(jsonObj));
              this.filterQuery = filterQuery;
            } else {
              filterQuery = this.filterQuery;
            }
            this.filterJson = filters;
            console.log('filterQuery', filterQuery);
            return (
              <Query
                query={GET_PROCEDURES}
                variables={{
                  listTypes: [list],
                  pageSize: PAGE_SIZE,
                  offset: 0,
                  filter: filterQuery,
                }}
                fetchPolicy="cache-and-network"
              >
                {({ data: { procedures }, loading, refetch, networkStatus, fetchMore }) => {
                  let listData = [];
                  if (list !== 'HOT') {
                    listData = procedures
                      ? [{ procedureId: 'soter', type: 'sort' }, ...procedures]
                      : [];
                  } else {
                    listData = procedures ? procedures : [];
                  }
                  return (
                    <FlatList
                      removeClippedSubviews
                      contentOffset={{ y: list !== 'HOT' ? 35 : 0 }}
                      ListFooterComponent={() =>
                        networkStatus === 3 ? (
                          <Loading>
                            <ActivityIndicator />
                          </Loading>
                        ) : null
                      }
                      data={listData}
                      stickySectionHeadersEnabled
                      keyExtractor={({ procedureId }) => procedureId}
                      onRefresh={() => {
                        refetch();
                      }}
                      refreshing={networkStatus === 4}
                      renderItem={this.renderItem(this.onItemClick)}
                      onEndReached={() => {
                        if (!loading && !this.state.fetchedAll) {
                          fetchMore({
                            variables: {
                              offset: procedures ? procedures.length : PAGE_SIZE,
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                              if (!fetchMoreResult || fetchMoreResult.procedures.length === 0) {
                                this.setState({ fetchedAll: true });
                                return previousResult;
                              }
                              return {
                                procedures: unionBy(
                                  previousResult.procedures,
                                  fetchMoreResult.procedures,
                                  '_id',
                                ),
                              };
                            },
                          });
                        }
                      }}
                    />
                  );
                }}
              </Query>
            );
          }}
        </Query>
        {Platform.OS === 'ios' && sorterOpened && (
          <PickerWrapper>
            <PickerHeader>
              <PickerFinishButton
                title="Fertig"
                onPress={() => this.setState({ sorterOpened: false })}
              />
            </PickerHeader>
            <Picker selectedValue={sort} style={{ height: 200 }} onValueChange={this.onChangeSort}>
              {SORTERS[list].map(({ key, title }) => (
                <Picker.Item key={key} label={title} value={key} />
              ))}
            </Picker>
          </PickerWrapper>
        )}
      </Wrapper>
    );
  }
}

List.propTypes = {
  list: PropTypes.string,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  navigateTo: PropTypes.func.isRequired,
};

List.defaultProps = {
  list: 'IN_VOTE',
};

export default preventNavStackDuplicate(List);
