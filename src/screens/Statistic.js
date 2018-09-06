import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql, Query } from 'react-apollo';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';

import SegmentHeader from '../components/ListSectionHeader';
import ListItem from '../screens/VoteList/ListItem';

import preventNavStackDuplicate from '../hocs/preventNavStackDuplicate';

import GET_STATISTIC from '../graphql/queries/getStatistic';
import GET_VOTED_PROCEDURES from '../graphql/queries/getVotedProcedures';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const StatisticWrapper = styled.View`
  height: 500;
  padding-top: 18;
  align-items: center;
`;

const StatisticNumbersWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const StatisticNumberWrapper = styled.View``;

const StatisticNumber = styled.Text`
  font-size: 71
  color: ${({ voted }) => (voted ? '#5794CE' : 'grey')};
  font-weight: 200;
  text-align: center;
`;

const StatisticNumberDescription = styled.Text`
  text-align: center;
  font-size: 13;
  color: #4a4a4a;
`;

const SectionList = styled.SectionList``;

class Statistic extends Component {
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

  onItemClick = ({ item }) => () => {
    this.props.navigateTo({
      screen: 'democracy.Detail',
      title: 'Abstimmung'.toUpperCase(),
      passProps: { ...item },
      backButtonTitle: '',
    });
  };

  render() {
    const { voteStatistic: { proceduresCount, votedProcedures } } = this.props;
    return (
      <ScrollWrapper>
        <StatisticWrapper>
          <StatisticNumbersWrapper>
            <StatisticNumberWrapper>
              <StatisticNumber voted>{votedProcedures}</StatisticNumber>
              <StatisticNumberDescription>Abgestimmte Vorgänge</StatisticNumberDescription>
            </StatisticNumberWrapper>
            <StatisticNumberWrapper>
              <StatisticNumber>{proceduresCount - votedProcedures}</StatisticNumber>
              <StatisticNumberDescription>Unabgestimme Vorgänge</StatisticNumberDescription>
            </StatisticNumberWrapper>
          </StatisticNumbersWrapper>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              data={[
                { x: 1, y: 100 * votedProcedures / proceduresCount },
                { x: 2, y: 100 - 100 * votedProcedures / proceduresCount },
              ]}
              innerRadius={140}
              cornerRadius={30}
              labels={() => null}
              style={{
                data: {
                  fill: d => (d.x === 1 ? '#5794CE' : '#ECECEC'),
                },
              }}
            />
            <VictoryAxis
              style={{
                axis: { stroke: 'none' },
                ticks: { stroke: 'none' },
                grid: { stroke: 'none', strokeOpacity: 0.2 },
              }}
              tickFormat={() => null}
            />

            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 30 }}
              x={200}
              y={170}
              text={`${Math.round(100 * votedProcedures / proceduresCount * 10) / 10}%`}
            />
          </VictoryChart>
        </StatisticWrapper>
        <Query query={GET_VOTED_PROCEDURES} fetchPolicy="cache-and-network">
          {({ loading, data }) => {
            if (!loading) {
              return (
                <SectionList
                  sections={[{ title: 'Abgestimmte', data: data.votedProcedures }]}
                  renderItem={({ item }) => (
                    <ListItem item={item} onClick={() => this.onItemClick({ item })} />
                  )}
                  keyExtractor={({ _id }) => _id}
                  renderSectionHeader={({ section }) => {
                    if (section.data.length > 0) {
                      return <SegmentHeader key={section.title} title={section.title} />;
                    }
                    return null;
                  }}
                />
              );
            }
            return null;
          }}
        </Query>
      </ScrollWrapper>
    );
  }
}

Statistic.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  navigateTo: PropTypes.func.isRequired,
  voteStatistic: PropTypes.shape(),
};

Statistic.defaultProps = {
  voteStatistic: {},
};

export default graphql(GET_STATISTIC, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: ({ data: { voteStatistic } }) => ({
    voteStatistic,
  }),
})(preventNavStackDuplicate(Statistic));
