import React, { useState } from 'react';
import { ScrollViewProps, useWindowDimensions } from 'react-native';
import BarChart from './BarChart';
import PartyChart from './PartyChart';
import ChartLegend from '../Charts/ChartLegend';
import PieChart from '../Charts/PieChart';
import styled from 'styled-components/native';
import { ProcedureQuery } from '../../../../__generated__/graphql';
import { useInitialState } from '../../../../api/state/initialState';
import Folding from '../../../../components/Folding';
import { Pagination } from '@democracy-deutschland/ui';

const ScrollView = styled.ScrollView.attrs(
  (): ScrollViewProps => ({
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
      alignContent: 'center',
    },
  }),
)``;

const PieChartWrapper = styled.View<{ width: number }>`
  align-self: center;
  padding-top: 9px;
  padding-horizontal: 36px;
`;

const DecisionTextView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 25px;
  padding-bottom: 20px;
`;

const DecisionTextHeadline = styled.Text`
  font-size: 17px;
`;

const DecisionText = styled.Text`
  color: rgb(142, 142, 147);
  padding-top: 18px;
`;

const RepresentativeText = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
  padding-top: ${({ theme }) => theme.spaces.small};
  text-align: center;
  font-size: 12px;
`;

const RepresentativeTextBlack = styled(RepresentativeText)`
  color: #000;
`;

interface Props {
  voteResults: ProcedureQuery['procedure']['voteResults'];
  currentStatus: ProcedureQuery['procedure']['currentStatus'];
  voted: boolean;
}

export const GovernmentVoteResults: React.FC<Props> = ({ voteResults, currentStatus, voted }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { isVerified } = useInitialState();
  const { width } = useWindowDimensions();

  // FIXME Sollte nur im falle von Fehlerhaften Daten vom server ausgelöst werden.
  // https://github.com/demokratie-live/democracy-client/issues/714
  if (!voteResults || voteResults.partyVotes.length === 0) {
    return null;
  }

  if (currentStatus === 'Zurückgezogen') {
    return (
      <Folding title="Bundestagsergebnis" opened={!isVerified || voted}>
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
        value: voteResults.notVoted || 0,
        color: '#B1B3B4',
      });
    }
    const dataPartyChart = voteResults.partyVotes.map(({ party, deviants }) => {
      const partyData = {
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
    });
    const partyColors = ['#D43194', '#4CB0D8', '#99C93E'];
    if (voteResults.namedVote) {
      partyColors.unshift('#B1B3B4');
    }

    const screens = [
      <PieChartWrapper width={width} key="pieChart">
        <PieChart
          data={dataPieChart}
          subLabel={voteResults.namedVote ? 'Abgeordnete' : 'Fraktionen'}
          label={`${voteResults.namedVote ? votes : voteResults.partyVotes.length}`}
          showPercentage
        />
        <ChartLegend data={dataPieChart} />
      </PieChartWrapper>,
      <PieChartWrapper width={width} key="partyChart">
        <PartyChart
          key="partyChart"
          width={width - 38}
          chartData={dataPartyChart}
          colors={partyColors}
          showPercentage
        />
      </PieChartWrapper>,
      <PieChartWrapper width={width} key="barChart">
        <BarChart key="barChart" data={voteResults} legendData={dataPieChart} />
      </PieChartWrapper>,
    ];

    if (voteResults.decisionText) {
      screens.push(
        <DecisionTextView key="decisionText">
          <DecisionTextHeadline>Beschlusstext</DecisionTextHeadline>
          <DecisionText>{voteResults.decisionText}</DecisionText>
        </DecisionTextView>,
      );
    }

    const onMomentumScrollEnd: ScrollViewProps['onMomentumScrollEnd'] = ({ nativeEvent }) => {
      const index = Math.round(nativeEvent.contentOffset.x / width);
      if (index !== activeSlide) {
        setActiveSlide(index);
      }
    };

    return (
      <>
        <ScrollView onMomentumScrollEnd={onMomentumScrollEnd}>{screens}</ScrollView>
        <Pagination active={activeSlide} length={screens.length} />
      </>
    );
  };

  if (
    voteResults &&
    (voteResults.yes || voteResults.no || voteResults.notVoted || voteResults.abstination)
  ) {
    return (
      <Folding title="Bundestagsergebnis" opened={!isVerified || voted} paddingHorizontal={0}>
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
      </Folding>
    );
  }
  return null;
};
