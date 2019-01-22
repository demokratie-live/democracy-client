import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Swiper from 'react-native-swiper';
import { Platform, Dimensions } from 'react-native';

// import PieChart from './VoteResults/PieChart';
import PieChart from '../../../../../components/Charts/PieChart';
import ChartLegend from '../../../../../components/Charts/ChartLegend';
import BarChart from './BarChart';
import PartyChart from './PartyChart';
// import BarChart from '../BarChart';
import Segment from '../../../Segment';

import VOTES from '../../../../../graphql/queries/votes';

export const { width, height } = Dimensions.get('window');

const ScrollView = styled.ScrollView.attrs(() => ({
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: true,
}))``;

const PieChartWrapper = styled.View`
  align-items: center;
`;

const DecisionTextView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 25;
  padding-bottom: 20;
`;

const DecisionTextHeadline = styled.Text`
  font-size: 17;
`;

const DecisionText = styled.Text`
  color: rgb(142, 142, 147);
  padding-top: 18;
`;

const RepresentativeText = styled.Text`
  color: rgb(142, 142, 147);
  text-align: center;
  font-size: 10;
  padding-bottom: 10;
  font-style: italic;
`;

class GovernmentVoteResults extends Component {
  state = {
    pieChartWidth: Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
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
    const { voteResults, scrollTo, currentStatus } = this.props;
    const { pieChartWidth } = this.state;

    // FIXME Sollte nur im falle von Fehlerhaften Daten vom server ausgelöst werden.
    // https://github.com/demokratie-live/democracy-client/issues/714
    if (voteResults.partyVotes.length === 0) {
      return null;
    }

    if (currentStatus === 'Zurückgezogen') {
      return (
        <Segment title="Bundestagsergebnis" open scrollTo={scrollTo} fullWidth>
          <ScrollView>
            <PieChart
              data={[{ label: 'Zurückgezogen', percent: 1, color: '#B1B3B4' }]}
              label="Zurückgezogen"
            />
          </ScrollView>
        </Segment>
      );
    }

    const renderGovernmentVoteDetails = () => {
      const votes =
        voteResults.yes + voteResults.no + voteResults.notVoted + voteResults.abstination;
      const dataPieChart = [
        {
          label: 'Zustimmungen',
          percent: voteResults.yes / votes,
          value: voteResults.yes,
          color: '#99C93E',
        },
        {
          label: 'Enthaltungen',
          percent: voteResults.abstination / votes,
          value: voteResults.abstination,
          color: '#4CB0D8',
        },
        {
          label: 'Ablehnungen',
          percent: voteResults.no / votes,
          value: voteResults.no,
          color: '#D43194',
        },
      ];

      if (voteResults.namedVote) {
        dataPieChart.push({
          label: 'Nicht Abgestimmt',
          percent: voteResults.notVoted / votes,
          value: voteResults.notVoted,
          color: '#B1B3B4',
        });
      }
      const dataPartyChart = voteResults.partyVotes.map(({ party, deviants }) => {
        const partyData = {
          party,
          values: [
            { label: 'Zustimmungen', value: deviants.yes, color: '#99C93E' },
            { label: 'Enthaltungen', value: deviants.abstination, color: '#4CB0D8' },
            { label: 'Ablehnungen', value: deviants.no, color: '#D43194' },
          ],
        };
        if (voteResults.namedVote) {
          partyData.values.push({ label: 'notVoted', value: deviants.notVoted, color: '#B1B3B4' });
        }
        return partyData;
      });
      const partyColors = ['#D43194', '#4CB0D8', '#99C93E'];
      if (voteResults.namedVote) {
        partyColors.unshift('#B1B3B4');
      }

      const screens = [
        <PieChartWrapper key="pieChart" onLayout={this.onLayout}>
          <PieChart
            data={dataPieChart}
            label={voteResults.namedVote ? 'Abgeordnete' : 'Fraktionen'}
            subLabel={voteResults.namedVote ? votes : voteResults.partyVotes.length}
            width={pieChartWidth - 36}
          />
          <ChartLegend data={dataPieChart} />
        </PieChartWrapper>,
        <BarChart key="barChart" data={voteResults} legendData={dataPieChart} />,
        <PartyChart
          key="partyChart"
          width={pieChartWidth}
          chartData={dataPartyChart}
          colors={partyColors}
        />,
      ];

      // FIXME: Für iOS mit SVG nachbauen
      /**
       * Ursache: Mit der react-native-svg@9.0.0 library schmiert iOS beim
       *  BarChart ab.
       */
      // if (Platform.OS === 'android') {
      //   screens.push(
      //     <BarChart
      //       key="barChart"
      //       data={_.map(voteResults.partyVotes, partyVotes => ({
      //         value: partyVotes.deviants,
      //         label: partyVotes.party,
      //       }))}
      //       colorScale={['#99C93E', '#4CB0D8', '#D43194', '#B1B3B4']}
      //       label="Abgeordnete"
      //       voteResults={voteResults}
      //     />,
      //   );
      // }
      if (voteResults.decisionText) {
        screens.push(
          <DecisionTextView key="decisionText">
            <DecisionTextHeadline>Beschlusstext</DecisionTextHeadline>
            <DecisionText>{voteResults.decisionText}</DecisionText>
          </DecisionTextView>,
        );
      }
      return (
        <Swiper
          loop={false}
          style={{ height: Platform.OS === 'ios' ? 'auto' : 440, maxHeight: 440 }}
          paginationStyle={{ bottom: 0 }}
        >
          {screens}
        </Swiper>
      );
    };

    if (
      voteResults &&
      (voteResults.yes || voteResults.no || voteResults.notVoted || voteResults.abstination)
    ) {
      return (
        <Segment title="Bundestagsergebnis" open scrollTo={scrollTo} fullWidth>
          {renderGovernmentVoteDetails()}
          <RepresentativeText style={{ marginTop: -35 }}>
            {voteResults.namedVote ? 'Namentliche Abstimmung' : 'Nicht-Namentliche Abstimmung'}
          </RepresentativeText>
        </Segment>
      );
    }
    return null;
  }
}

GovernmentVoteResults.propTypes = {
  voteResults: PropTypes.shape({
    yes: PropTypes.number,
    no: PropTypes.number,
    abstination: PropTypes.number,
    notVoted: PropTypes.number,
  }),
  scrollTo: PropTypes.func.isRequired,
  currentStatus: PropTypes.string,
};

GovernmentVoteResults.defaultProps = {
  voteResults: null,
  currentStatus: null,
};

export default compose(
  graphql(VOTES, {
    options: ({ procedure }) => ({
      variables: { procedure },
      fetchPolicy: 'cache-and-network',
    }),
    props: ({ data }) => ({ communityVotes: data.votes || {} }),
  }),
)(GovernmentVoteResults);
