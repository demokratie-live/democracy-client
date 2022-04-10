import React, { useState, useEffect } from 'react';
import { Dimensions, ScaledSize, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DeputyVoteResult } from './Deputy';
import styled from 'styled-components/native';
import { ProcedureQuery, useDeputyVoteResultsQuery } from '../../../../../__generated__/graphql';
import { useInitialState } from '../../../../../api/state/initialState';
import { useRecoilValue } from 'recoil';
import { favorizedDeputiesState } from '../../../../../api/state/favorizedDeputies';
import { CarouselPagination } from '../../../../../components/Pagination';
import Folding from '../../../../../components/Folding';

const SwiperStyled = styled(Carousel as new () => Carousel<JSX.Element>).attrs({
  paginationStyle: { bottom: 14 },
})`
  max-height: 400px;
` as React.ComponentType as new <T>() => Carousel<T>;

interface Props {
  voteResults: Exclude<ProcedureQuery['procedure']['voteResults'], null | undefined>;
  procedureId: string;
  voted: boolean;
}

export const DeputyVoteResultSlider: React.FC<Props> = ({ voteResults, voted, procedureId }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { isVerified } = useInitialState();
  const favorizedDeputies = useRecoilValue(favorizedDeputiesState);
  const { data } = useDeputyVoteResultsQuery({
    variables: {
      webIds: [...favorizedDeputies],
      procedureId: procedureId,
    },
  });

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

    const partyColors = ['#D43194', '#4CB0D8', '#99C93E'];
    if (voteResults.namedVote) {
      partyColors.unshift('#B1B3B4');
    }

    const renderItem = ({ item }: { item: JSX.Element; index: number }) => item;

    const screens =
      data?.procedure?.voteResults?.deputyVotes.map(deputy => (
        <DeputyVoteResult key="deputy" {...deputy} />
      )) || [];

    return (
      <View style={{ marginBottom: -18, marginTop: 10 }}>
        <SwiperStyled
          data={screens}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={Math.min(width, 380)}
          onSnapToItem={setActiveSlide}
        />
        <CarouselPagination length={screens.length} active={activeSlide} />
      </View>
    );
  };

  if (data?.procedure?.voteResults?.deputyVotes) {
    return (
      <Folding title="Abgeordnetenergebnis" opened={!isVerified || voted} paddingHorizontal={0}>
        {renderGovernmentVoteDetails()}
      </Folding>
    );
  }
  return null;
};
