import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// Components
import BarChart from './BarChart';
import PartyChart from './PartyChart';
import DeputyVoteData from './Deputy';

// GraphQL
import ChartLegend from '../Charts/ChartLegend';

import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import PieChart from '../Charts/PieChart';
import { Procedure_procedure_voteResults } from '../../graphql/query/__generated__/Procedure';
import { ConstituencyContext } from '../../../../../context/Constituency';
import { InitialStateContext } from '../../../../../context/InitialStates';
import { styled } from '../../../../../styles';
import { CarouselPagination } from '../../../../../components/misc/Pagination';

const ScrollView = styled.ScrollView.attrs(() => ({
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: true,
}))``;

const PieChartWrapper = styled.View`
  align-self: center;
  padding-top: 9px;
  padding-horizontal: 36px;
  width: 100%;
  max-width: ${() =>
    Math.min(
      380,
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    )}px;
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
  color: ${({ theme }) => theme.textColors.secondary};
  text-align: center;
  font-size: 12px;
`;

const RepresentativeTextBlack = styled(RepresentativeText)`
  color: #000;
`;

const SwiperStyled = styled(Carousel).attrs({
  paginationStyle: { bottom: 14 },
})`
  max-height: 400px;
`;

interface Props {
  voteResults: Procedure_procedure_voteResults;
  currentStatus: string | null;
  procedureId: string;
  voted: boolean;
}

export const GovernmentVoteResults: React.FC<Props> = ({
  voteResults,
  currentStatus,
  procedureId,
  voted,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { isVerified } = useContext(InitialStateContext);
  const { constituency } = useContext(ConstituencyContext);

  const [width, setWidth] = useState<number>(380);

  const onChange = ({ screen }: { window: ScaledSize; screen: ScaledSize }) => {
    setWidth(screen.width);
  };

  useEffect(() => {
    setWidth(Dimensions.get('screen').width);
  }, []);

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  // FIXME Sollte nur im falle von Fehlerhaften Daten vom server ausgelöst werden.
  // https://github.com/demokratie-live/democracy-client/issues/714
  if (voteResults.partyVotes.length === 0) {
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
      <PieChartWrapper key="pieChart">
        <PieChart
          data={dataPieChart}
          subLabel={voteResults.namedVote ? 'Abgeordnete' : 'Fraktionen'}
          label={`${
            voteResults.namedVote ? votes : voteResults.partyVotes.length
          }`}
          showPercentage
        />
        <ChartLegend data={dataPieChart} />
      </PieChartWrapper>,
      <PartyChart
        key="partyChart"
        width={width}
        chartData={dataPartyChart}
        colors={partyColors}
        showPercentage
      />,
      <BarChart key="barChart" data={voteResults} legendData={dataPieChart} />,
    ];

    if (voteResults.decisionText) {
      screens.push(
        <DecisionTextView key="decisionText">
          <DecisionTextHeadline>Beschlusstext</DecisionTextHeadline>
          <DecisionText>{voteResults.decisionText}</DecisionText>
        </DecisionTextView>,
      );
    }
    const renderItem = ({ item }: any) => item;

    return (
      <>
        <SwiperStyled
          data={screens}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={Math.min(width, 380)}
          onSnapToItem={setActiveSlide}
        />
        <CarouselPagination length={screens.length} active={activeSlide} />
      </>
    );
  };

  if (
    voteResults &&
    (voteResults.yes ||
      voteResults.no ||
      voteResults.notVoted ||
      voteResults.abstination)
  ) {
    return (
      <Folding
        title="Bundestagsergebnis"
        opened={!isVerified || voted}
        paddingHorizontal={0}>
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
