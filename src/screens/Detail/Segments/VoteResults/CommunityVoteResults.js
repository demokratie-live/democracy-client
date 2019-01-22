import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { ActivityIndicator, Dimensions } from 'react-native';

// import PieChart from './VoteResults/PieChart';
import PieChart from '../../../../components/Charts/PieChart';
import Segment from '../../Segment';
import ChartLegend from '../../../../components/Charts/ChartLegend';

import VOTES from '../../../../graphql/queries/votes';
import GermanySvgComponent from '../../../../../assets/svgs/GermanySVG';

export const { width, height } = Dimensions.get('window');

const RepresentativeText = styled.Text`
  color: rgb(142, 142, 147);
  text-align: center;
  font-size: 10;
  padding-top: 18;
`;

const PieChartWrapper = styled.View`
  align-items: center;
`;

const SvgWrapper = styled.View`
  position: absolute;
  right: 0;
`;

class VoteResults extends Component {
  state = {
    chartWidth: Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
  };

  onLayout = () => {
    const chartWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
    if (this.state.chartWidth !== chartWidth) {
      this.setState({
        chartWidth,
      });
    }
  };
  render() {
    const { communityVotes, scrollTo } = this.props;
    const { chartWidth } = this.state;

    const renderCommuntiyResult = () => {
      const { voteResults: comunnityResults } = communityVotes;
      if (
        communityVotes &&
        comunnityResults &&
        communityVotes.voted &&
        (comunnityResults.yes || comunnityResults.no || comunnityResults.abstination)
      ) {
        const votes = comunnityResults.yes + comunnityResults.no + comunnityResults.abstination;
        const data = [
          {
            label: 'Zustimmungen',
            percent: comunnityResults.yes / votes,
            color: '#15C063',
            value: comunnityResults.yes,
          },
          {
            label: 'Enthaltungen',
            percent: comunnityResults.abstination / votes,
            color: '#2C82E4',
            value: comunnityResults.abstination,
          },
          {
            label: 'Ablehnungen',
            percent: comunnityResults.no / votes,
            color: '#EC3E31',
            value: comunnityResults.no,
          },
        ];

        return (
          <PieChartWrapper onLayout={this.onLayout}>
            <SvgWrapper>
              <GermanySvgComponent
                width={60}
                height={36}
                childProps={{ fill: 'none', stroke: '#000', strokeWidth: '1%' }}
              />
            </SvgWrapper>
            <PieChart
              data={data}
              label="Abstimmende"
              subLabel={votes}
              width={chartWidth - 36 * 1.5}
            />
            <ChartLegend data={data} />
          </PieChartWrapper>
        );
      }
      return <ActivityIndicator />;
    };

    if (communityVotes.voted) {
      return (
        <Segment title="Communityergebnis" open scrollTo={scrollTo}>
          {renderCommuntiyResult()}
          <RepresentativeText>
            Dieses Ergebnis wurde nicht auf seine Repräsentativität überprüft.
          </RepresentativeText>
        </Segment>
      );
    }
    return null;
  }
}

VoteResults.propTypes = {
  scrollTo: PropTypes.func.isRequired,
  communityVotes: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
};

VoteResults.defaultProps = {
  communityVotes: null,
};

export default compose(
  graphql(VOTES, {
    options: ({ procedure }) => ({
      variables: { procedure },
      fetchPolicy: 'cache-and-network',
    }),
    props: ({ data }) => ({ communityVotes: data.votes || {} }),
  }),
)(VoteResults);
