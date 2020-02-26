import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import { Navigator } from 'react-native-navigation';

// Components
import ChartLegend from '../../../../../components/Charts/ChartLegend';
import PieChart from '../../../../../components/Charts/PieChart';
import Segment from '../../../Segment';
import BarChart from './BarChart';
import PartyChart from './PartyChart';
import DeputyVoteData from './Deputy';

// GraphQL
import GET_CONSTITUENCY from '../../../../../graphql/queries/local/constituency';

export const { width, height } = Dimensions.get('window');

const ScrollView = styled.ScrollView.attrs(() => ({
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: true,
}))``;

const PieChartWrapper = styled.View`
  align-self: center;
  padding-top: 9;
  padding-horizontal: 36;
  width: 100%;
  max-width: ${() =>
    Math.min(380, Dimensions.get('window').width, Dimensions.get('window').height)};
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
  color: #9b9b9b;
  text-align: center;
  font-size: 12;
`;

const RepresentativeTextBlack = styled(RepresentativeText)`
  color: #000;
`;

class GovernmentVoteResults extends Component {
  state = {
    pieChartWidth: Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
  };

  shouldComponentUpdate(p, s) {
    const { procedureId, voteResults, currentStatus, constituency } = this.props;
    const { pieChartWidth } = this.state;

    return (
      currentStatus !== p.currentStatus ||
      pieChartWidth !== s.pieChartWidth ||
      procedureId !== p.procedureId ||
      constituency !== p.constituency ||
      JSON.stringify(voteResults) !== JSON.stringify(p.voteResults)
    );
  }

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
      const { constituency, navigator } = this.props;
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
          label: 'Abwesend',
          percent: voteResults.notVoted / votes,
          value: voteResults.notVoted,
          color: '#B1B3B4',
        });
      }
      const dataPartyChart = voteResults.partyVotes.map(({ party, deviants }) => {
        const partyData = {
          party: party === 'fraktionslos' ? 'Andere' : party,
          values: [
            { label: 'Zustimmungen', value: deviants.yes, color: '#99C93E' },
            { label: 'Enthaltungen', value: deviants.abstination, color: '#4CB0D8' },
            { label: 'Ablehnungen', value: deviants.no, color: '#D43194' },
          ],
        };
        if (voteResults.namedVote) {
          partyData.values.push({
            label: 'Abwesend',
            value: deviants.notVoted,
            color: '#B1B3B4',
          });
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
            subLabel={voteResults.namedVote ? 'Abgeordnete' : 'Fraktionen'}
            label={`${voteResults.namedVote ? votes : voteResults.partyVotes.length}`}
          />
          <ChartLegend data={dataPieChart} />
        </PieChartWrapper>,
        <PartyChart
          key="partyChart"
          width={pieChartWidth}
          chartData={dataPartyChart}
          colors={partyColors}
        />,
        <BarChart key="barChart" data={voteResults} legendData={dataPieChart} />,
      ];

      if (voteResults.namedVote && constituency) {
        screens.push(
          <DeputyVoteData
            key="deputy"
            procedureId={this.props.procedureId}
            navigator={navigator}
          />,
        );
      }
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
          style={{ height: Platform.OS === 'ios' ? 'auto' : 400, maxHeight: 400 }}
          paginationStyle={{ bottom: 14 }}
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

          {voteResults.namedVote ? (
            <RepresentativeText>
              Diese Abstimmung wurde <RepresentativeTextBlack>namentlich</RepresentativeTextBlack>{' '}
              durchgeführt
            </RepresentativeText>
          ) : (
            <RepresentativeText>
              Diese Abstimmung wurde{' '}
              <RepresentativeTextBlack>nicht-namentlich</RepresentativeTextBlack> durchgeführt
            </RepresentativeText>
          )}
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
  constituency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  procedureId: PropTypes.string.isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

GovernmentVoteResults.defaultProps = {
  voteResults: null,
  currentStatus: null,
  constituency: false,
};

export default graphql(GET_CONSTITUENCY, {
  props: ({ data }) => ({
    constituency:
      data && data.constituency && data.constituency.constituency
        ? data.constituency.constituency
        : false,
  }),
})(GovernmentVoteResults);
