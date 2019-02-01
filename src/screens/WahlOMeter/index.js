import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import { Platform, SegmentedControlIOS, Dimensions, View } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import preventNavStackDuplicate from '../../hocs/preventNavStackDuplicate';

// Components
import Bundestag from './Bundestag';
import Fraktionen from './Fraktionen';
import NoVotesPlaceholder from './NoVotesPlaceholder';

// GraphQL
import VOTES_SELECTION_LOCAL from '../../graphql/queries/local/votesSelection';
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const SegmentControlsWrapper = styled.View`
  background-color: #4494d3;
  height: 50;
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10;
`;

const ScrollView = styled.ScrollView.attrs(() => ({
  horizontal: true,
  pagingEnabled: true,
}))`
  flex: 1;
`;

class WahlOMeter extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  constructor(props) {
    super(props);

    if (!props.noMenu) {
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
  }

  state = {
    width: Dimensions.get('window').width,
    selectedIndex: 0,
    routes: [{ key: 'first', title: 'Bundestag' }, { key: 'second', title: 'Fraktionen' }],
  };

  onProcedureListItemClick = ({ item }) => () => {
    this.props.navigateTo({
      screen: 'democracy.Detail',
      title: 'Abstimmung'.toUpperCase(),
      passProps: { ...item },
      backButtonTitle: '',
    });
  };

  onScrollEndDrag = e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (this.state.selectedIndex !== pageNum) {
      this.setState({ selectedIndex: pageNum });
    }
  };

  onLayout = () => {
    const { width } = Dimensions.get('window');
    if (this.state.width !== width) {
      this.setState({
        width,
      });
    }
  };

  pieChartData = ({ votedProcedures, data }) => {
    // Pie Chart Data Preparation
    let pieDataRaw = votedProcedures.proceduresByIdHavingVoteResults.procedures.map(
      ({ voteResults, procedureId }) => ({
        government: voteResults.governmentDecision,
        me: data.votesSelectionLocal.find(({ procedureId: pid }) => pid === procedureId).selection,
      }),
    );
    const pieData = pieDataRaw.reduce(
      (pre, { government, me }) => {
        if (me === government) {
          return { ...pre, matches: pre.matches + 1, count: pre.count + 1 };
        } else {
          return { ...pre, diffs: pre.diffs + 1, count: pre.count + 1 };
        }
      },
      { matches: 0, diffs: 0, count: 0 },
    );
    return pieData;
  };

  partyChartData = ({ votedProcedures, data }) => {
    const chartData = votedProcedures.proceduresByIdHavingVoteResults.procedures.reduce(
      (prev, { voteResults: { partyVotes }, procedureId }) => {
        const me = data.votesSelectionLocal.find(({ procedureId: pid }) => pid === procedureId)
          .selection;
        partyVotes.forEach(({ party, main }) => {
          let matched = false;
          if (me === main) {
            matched = true;
          }

          if (prev[party] && matched) {
            prev = {
              ...prev,
              [party]: {
                ...prev[party],
                matches: prev[party].matches + 1,
              },
            };
          } else if (prev[party] && !matched) {
            prev = {
              ...prev,
              [party]: {
                ...prev[party],
                diffs: prev[party].diffs + 1,
              },
            };
          } else if (!prev[party] && matched) {
            prev = {
              ...prev,
              [party]: {
                diffs: 0,
                matches: 1,
              },
            };
          } else if (!prev[party] && !matched) {
            prev = {
              ...prev,
              [party]: {
                matches: 0,
                diffs: 1,
              },
            };
          }
        });
        return prev;
      },
      {},
    );
    return Object.keys(chartData)
      .map(key => ({
        party: key,
        values: [
          { label: 'Übereinstimmungen', value: chartData[key].matches },
          { label: 'Differenzen', value: chartData[key].diffs },
        ],
      }))
      .sort((a, b) => b.values[0].value - a.values[0].value);
  };

  width = Dimensions.get('window').width;

  render() {
    const { selectedIndex, routes, width } = this.state;
    return (
      <Wrapper onLayout={this.onLayout}>
        {Platform.OS === 'ios' && (
          <SegmentControlsWrapper>
            <SegmentedControlIOS
              style={{
                alignSelf: 'flex-end',
                width: '100%',
              }}
              values={['Bundestag', 'Fraktionen']}
              tintColor="#ffffff"
              selectedIndex={selectedIndex}
              onChange={event => {
                this.setState({
                  selectedIndex: event.nativeEvent.selectedSegmentIndex,
                });
                this.scrollView.scrollTo({
                  y: 0,
                  x: event.nativeEvent.selectedSegmentIndex * this.state.width,
                });
              }}
            />
          </SegmentControlsWrapper>
        )}
        <Query query={VOTES_SELECTION_LOCAL}>
          {({ data }) => {
            if (!data.votesSelectionLocal || data.votesSelectionLocal.length === 0) {
              return <NoVotesPlaceholder subline="Bundestag" navigator={this.props.navigator} />;
            }

            return (
              <Query
                query={PROCEDURES_WITH_VOTE_RESULTS}
                variables={{
                  procedureIds: data.votesSelectionLocal.map(({ procedureId }) => procedureId),
                  pageSize: 999999,
                }}
                fetchPolicy="cache-and-network"
              >
                {({ data: votedProcedures }) => {
                  let bundestagScreen = null;
                  let fraktionenScreen = null;
                  if (
                    !votedProcedures.proceduresByIdHavingVoteResults ||
                    votedProcedures.proceduresByIdHavingVoteResults.procedures.length === 0
                  ) {
                    bundestagScreen = (
                      <View key="noVotes-bundestag" style={{ flex: 1, width: width }}>
                        <NoVotesPlaceholder subline="Bundestag" navigator={this.props.navigator} />
                      </View>
                    );
                    fraktionenScreen = (
                      <View key="noVotes-fraktionen" style={{ flex: 1, width: width }}>
                        <NoVotesPlaceholder subline="Fraktionen" navigator={this.props.navigator} />
                      </View>
                    );
                  } else {
                    const totalProcedures = votedProcedures.proceduresByIdHavingVoteResults.total;
                    const votedProceduresCount =
                      votedProcedures.proceduresByIdHavingVoteResults.procedures.length;

                    bundestagScreen = (
                      <View key="bundestag" style={{ flex: 1, width: width }}>
                        <Bundestag
                          chartData={this.pieChartData({ votedProcedures, data })}
                          totalProcedures={totalProcedures}
                          votedProceduresCount={votedProceduresCount}
                          onProcedureListItemClick={this.onProcedureListItemClick}
                        />
                      </View>
                    );

                    const partyChartData = this.partyChartData({ votedProcedures, data });

                    fraktionenScreen = (
                      <View key="fraktionen" style={{ flex: 1, width: width }}>
                        <Fraktionen
                          chartData={partyChartData}
                          totalProcedures={totalProcedures}
                          votedProceduresCount={votedProceduresCount}
                          onProcedureListItemClick={this.onProcedureListItemClick}
                        />
                      </View>
                    );
                  }
                  if (Platform.OS === 'ios') {
                    return (
                      <ScrollView
                        onContentSizeChange={() => {
                          this.scrollView.scrollTo({
                            y: 0,
                            x: selectedIndex * this.state.width,
                          });
                        }}
                        onMomentumScrollEnd={this.onScrollEndDrag}
                        ref={e => {
                          this.scrollView = e;
                        }}
                      >
                        {[bundestagScreen, fraktionenScreen]}
                      </ScrollView>
                    );
                  } else {
                    return (
                      <TabView
                        navigationState={{ index: selectedIndex, routes }}
                        renderScene={SceneMap({
                          first: () => bundestagScreen,
                          second: () => fraktionenScreen,
                        })}
                        onIndexChange={selectedIndex => this.setState({ selectedIndex })}
                        initialLayout={{
                          width: Dimensions.get('window').width,
                          height: Dimensions.get('window').height,
                        }}
                        renderTabBar={props => (
                          <TabBar {...props} tabStyle={{ backgroundColor: '#4494D3' }} />
                        )}
                      />
                    );
                  }
                }}
              </Query>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

WahlOMeter.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  navigateTo: PropTypes.func.isRequired,
  noMenu: PropTypes.bool,
};

WahlOMeter.defaultProps = {
  noMenu: false,
};

export default preventNavStackDuplicate(WahlOMeter);
