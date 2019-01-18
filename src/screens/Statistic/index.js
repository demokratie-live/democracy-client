import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql, Query } from 'react-apollo';
import Chart from './Chart';

import SegmentHeader from '../../components/ListSectionHeader';
import ListItem from '../VoteList/ListItem';

import preventNavStackDuplicate from '../../hocs/preventNavStackDuplicate';

import GET_STATISTIC from '../../graphql/queries/getStatistic';
import GET_VOTED_PROCEDURES from '../../graphql/queries/getVotedProcedures';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const StatisticWrapper = styled.View`
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

  state = {
    pieChartWidth: Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
  };

  onItemClick = ({ item }) => () => {
    this.props.navigateTo({
      screen: 'democracy.Detail',
      title: 'Abstimmung'.toUpperCase(),
      passProps: { ...item },
      backButtonTitle: '',
    });
  };

  onLayout = () => {
    const pieChartWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
    if (this.state.pieChartWidth !== pieChartWidth) {
      this.setState({
        pieChartWidth,
      });
    }
  };

  render() {
    const {
      voteStatistic: { proceduresCount, votedProcedures },
    } = this.props;
    return (
      <ScrollWrapper>
        <StatisticWrapper onLayout={this.onLayout}>
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
          <Chart value={(100 * votedProcedures) / proceduresCount} />
        </StatisticWrapper>
        <Query query={GET_VOTED_PROCEDURES} fetchPolicy="cache-and-network">
          {({ loading, data }) => {
            if (!loading && data.votedProcedures) {
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
