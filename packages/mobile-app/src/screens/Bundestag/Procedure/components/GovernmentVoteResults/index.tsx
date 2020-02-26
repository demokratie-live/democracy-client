import React, { useState, useContext } from 'react';
import { Dimensions, Platform } from 'react-native';
// eslint-disable-next-line import/default
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';

// Components
import BarChart from './BarChart';
import PartyChart from './PartyChart';
import DeputyVoteData from './Deputy';

// GraphQL
import ChartLegend from '../Charts/ChartLegend';

import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import PieChart from '../Charts/PieChart';
import { Procedure_procedure_voteResults } from '../../graphql/query/__generated__/Procedure';
import { PartyChartChartData } from './PartyChart/Component';
import { ConstituencyContext } from '../../../../../context/Constituency';

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
    Math.min(
      380,
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    )};
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

const SwiperStyled = styled(Swiper).attrs({
  paginationStyle: { bottom: 14 },
})`
  height: ${Platform.OS === 'ios' ? 'auto' : 400};
  max-height: 400;
`;

interface Props {
  voteResults: Procedure_procedure_voteResults;
  currentStatus: string | null;
  procedureId: string;
}

export const GovernmentVoteResults: React.FC<Props> = ({
  voteResults,
  currentStatus,
  procedureId,
}) => {
  const [pieChartWidth, setPieChartWidth] = useState(
    Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
  );
  const { constituency } = useContext(ConstituencyContext);

  const onLayout = () => {
    const newPieChartWidth = Math.min(
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    );
    if (newPieChartWidth !== pieChartWidth) {
      setPieChartWidth(newPieChartWidth);
    }
  };

  // FIXME Sollte nur im falle von Fehlerhaften Daten vom server ausgelöst werden.
  // https://github.com/demokratie-live/democracy-client/issues/714
  if (voteResults.partyVotes.length === 0) {
    return null;
  }

  if (currentStatus === 'Zurückgezogen') {
    return (
      <Folding title="Bundestagsergebnis" opened>
        <ScrollView>
          <PieChart
            data={[{ label: 'Zurückgezogen', percent: 1, color: '#B1B3B4' }]}
            label="Zurückgezogen"
          />
        </ScrollView>
      </Folding>
    );
  }

  const renderGovernmentVoteDetails = () => {
    const votes = // TODO improve server typesafety
      (voteResults.yes || 0) +
      (voteResults.no || 0) +
      (voteResults.notVoted || 0) +
      (voteResults.abstination || 0);
    const dataPieChart = [
      {
        label: 'Zustimmungen',
        percent: (voteResults.yes || 0) / votes,
        value: voteResults.yes,
        color: '#99C93E',
      },
      {
        label: 'Enthaltungen',
        percent: (voteResults.abstination || 0) / votes,
        value: voteResults.abstination,
        color: '#4CB0D8',
      },
      {
        label: 'Ablehnungen',
        percent: (voteResults.no || 0) / votes,
        value: voteResults.no,
        color: '#D43194',
      },
    ];

    if (voteResults.namedVote) {
      dataPieChart.push({
        label: 'Abwesend',
        percent: (voteResults.notVoted || 0) / votes,
        value: voteResults.notVoted,
        color: '#B1B3B4',
      });
    }
    const dataPartyChart: PartyChartChartData[] = voteResults.partyVotes.map(
      ({ party, deviants }) => {
        const partyData: PartyChartChartData = {
          party: party === 'fraktionslos' ? 'Andere' : party,
          values: [
            {
              label: 'Zustimmungen',
              value: deviants.yes || 0,
              color: '#99C93E',
            },
            {
              label: 'Enthaltungen',
              value: deviants.abstination || 0,
              color: '#4CB0D8',
            },
            { label: 'Ablehnungen', value: deviants.no || 0, color: '#D43194' },
          ],
        };
        if (voteResults.namedVote) {
          partyData.values.push({
            label: 'Abwesend',
            value: deviants.notVoted || 0,
            color: '#B1B3B4',
          });
        }
        return partyData;
      },
    );
    const partyColors = ['#D43194', '#4CB0D8', '#99C93E'];
    if (voteResults.namedVote) {
      partyColors.unshift('#B1B3B4');
    }

    const screens = [
      <PieChartWrapper key="pieChart" onLayout={onLayout}>
        <PieChart
          data={dataPieChart}
          subLabel={voteResults.namedVote ? 'Abgeordnete' : 'Fraktionen'}
          label={`${
            voteResults.namedVote ? votes : voteResults.partyVotes.length
          }`}
        />
        <ChartLegend data={dataPieChart} />
      </PieChartWrapper>,
      <PartyChart
        key="partyChart"
        width={pieChartWidth}
        chartData={dataPartyChart}
        colors={partyColors}
        showPercentage={true}
      />,
      <BarChart key="barChart" data={voteResults} legendData={dataPieChart} />,
    ];

    if (voteResults.namedVote && constituency) {
      screens.push(<DeputyVoteData key="deputy" procedureId={procedureId} />);
    }
    if (voteResults.decisionText) {
      screens.push(
        <DecisionTextView key="decisionText">
          <DecisionTextHeadline>Beschlusstext</DecisionTextHeadline>
          <DecisionText>{voteResults.decisionText}</DecisionText>
        </DecisionTextView>,
      );
    }
    return <SwiperStyled loop={false}>{screens}</SwiperStyled>;
  };

  if (
    voteResults &&
    (voteResults.yes ||
      voteResults.no ||
      voteResults.notVoted ||
      voteResults.abstination)
  ) {
    return (
      <Folding title="Bundestagsergebnis" opened>
        {renderGovernmentVoteDetails()}

        {voteResults.namedVote ? (
          <RepresentativeText>
            Diese Abstimmung wurde{' '}
            <RepresentativeTextBlack>namentlich</RepresentativeTextBlack>{' '}
            durchgeführt
          </RepresentativeText>
        ) : (
          <RepresentativeText>
            Diese Abstimmung wurde{' '}
            <RepresentativeTextBlack>nicht-namentlich</RepresentativeTextBlack>{' '}
            durchgeführt
          </RepresentativeText>
        )}
      </Folding>
    );
  }
  return null;
};
