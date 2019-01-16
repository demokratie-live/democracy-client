import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import { Platform, SegmentedControlIOS, Dimensions } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import Bundestag from './Bundestag';
import Fraktionen from './Fraktionen';
import NoVotesPlaceholder from './NoVotesPlaceholder';

// GraphQL
import VOTES_LOCAL from '../../graphql/queries/votesLocalKeyStore';
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresWithVoteResults';

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const SegmentView = styled.ScrollView`
  background-color: #fff;
  width: ${Dimensions.get('window').width};
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
}))``;

class WahlOMeter extends Component {
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
    selectedIndex: 0,
  };

  onScrollEndDrag = e => {
    if (this.width === Dimensions.get('window').width) {
      const { contentOffset } = e.nativeEvent;
      const viewSize = e.nativeEvent.layoutMeasurement;

      // Divide the horizontal offset by the width of the view to see which page is visible
      const pageNum = Math.floor(contentOffset.x / viewSize.width);
      if (this.state.selectedIndex !== pageNum) {
        this.setState({ selectedIndex: pageNum });
      }
    }
  };

  pieChartData = ({ votedProcedures, data }) => {
    // Pie Chart Data Preparation
    let pieDataRaw = votedProcedures.proceduresWithVoteResults.map(
      ({ voteResults, procedureId }) => ({
        government: voteResults.governmentDecision,
        me: data.votesLocalKeyStore.find(({ procedureId: pid }) => pid === procedureId).selection,
      }),
    );
    const pieData = pieDataRaw.reduce(
      (pre, { government, me }) => {
        if (
          (me === 1 && government === 'YES') ||
          (me === 2 && government === 'ABSTINATION') ||
          (me === 3 && government === 'NO')
        ) {
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
    const chartData = votedProcedures.proceduresWithVoteResults.reduce(
      (prev, { voteResults: { partyVotes }, procedureId }) => {
        const me = data.votesLocalKeyStore.find(({ procedureId: pid }) => pid === procedureId)
          .selection;
        partyVotes.forEach(({ party, main }) => {
          let matched = false;
          if (
            (me === 1 && main === 'YES') ||
            (me === 2 && main === 'ABSTINATION') ||
            (me === 3 && main === 'NO')
          ) {
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
    return (
      <Wrapper>
        <SegmentControlsWrapper>
          <SegmentedControlIOS
            style={{
              alignSelf: 'flex-end',
              width: '100%',
            }}
            values={['Bundestag', 'Fraktionen']}
            tintColor="#ffffff"
            selectedIndex={this.state.selectedIndex}
            onChange={event => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex,
              });
              this.scrollView.scrollTo({
                y: 0,
                x: event.nativeEvent.selectedSegmentIndex * this.width,
              });
            }}
          />
        </SegmentControlsWrapper>
        <Query query={VOTES_LOCAL} fetchPolicy="network-only">
          {({ data }) => {
            if (!data.votesLocalKeyStore || data.votesLocalKeyStore.length === 0) {
              return <NoVotesPlaceholder subline="Bundestag" navigator={this.props.navigator} />;
            }
            return (
              <Query
                query={PROCEDURES_WITH_VOTE_RESULTS}
                variables={{
                  procedureIds: data.votesLocalKeyStore.map(({ procedureId }) => procedureId),
                }}
                fetchPolicy="cache-and-network"
              >
                {({ data: votedProcedures }) => {
                  if (
                    !votedProcedures.proceduresWithVoteResults ||
                    votedProcedures.proceduresWithVoteResults.length === 0
                  ) {
                    return (
                      <NoVotesPlaceholder subline="Bundestag" navigator={this.props.navigator} />
                    );
                  }

                  return (
                    <ScrollView
                      onContentSizeChange={contentWidth => {
                        this.width = contentWidth / 2;
                        this.scrollView.scrollTo({
                          y: 0,
                          x: this.state.selectedIndex * this.width,
                        });
                      }}
                      onMomentumScrollEnd={this.onScrollEndDrag}
                      ref={e => {
                        this.scrollView = e;
                      }}
                    >
                      {[
                        <SegmentView key="bundestag">
                          <Bundestag chartData={this.pieChartData({ votedProcedures, data })} />
                        </SegmentView>,
                        <SegmentView key="fraktionen">
                          <Fraktionen chartData={this.partyChartData({ votedProcedures, data })} />
                        </SegmentView>,
                      ]}
                    </ScrollView>
                  );
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
};

export default WahlOMeter;
