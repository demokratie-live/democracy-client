import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScaledSize } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PieChart from './Charts/PieChart';
import ChartLegend from './Charts/ChartLegend';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { constituencyState } from '../../../api/state/constituency';
import { useInitialState } from '../../../api/state/initialState';
import Folding from '../../../components/Folding';
import { CarouselPagination } from '../../../components/Pagination';
import { CommunityConstituencyVotes, CommunityVotes } from '../../../__generated__/graphql';
import GermanySvgComponent from '../../../components/svgs/GermanySVG';
import { getConstituencySvgs } from '../../../components/svgs/constituencies';

const MAX_WIDTH = Math.min(380, Dimensions.get('window').width, Dimensions.get('window').height);

const RepresentativeText = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
  font-size: 12px;
  padding-bottom: 18px;
  padding-horizontal: 24px;
`;

const CommunitySegmentText = styled.Text`
  color: rgb(142, 142, 147);
  font-size: 12px;
  padding-top: 8px;
  padding-bottom: 16px;
`;

const PieChartWrapper = styled.View`
  align-self: center;
  padding-horizontal: 36px;
  width: 100%;
  max-width: ${MAX_WIDTH}px;
`;

const SvgWrapper = styled.View`
  position: absolute;
  top: 8px;
  right: 22px;
`;

const SwiperStyled = styled(Carousel as new () => Carousel<JSX.Element>).attrs({
  paddingTop: 10,
  paginationStyle: { bottom: 14 },
})`
  max-height: 430px;
` as React.ComponentType as new <T>() => Carousel<T>;

interface Props {
  voteResults: CommunityVotes;
  voted: boolean;
  countryMap: React.ReactElement;
}

export const CommunityVoteResults: React.FC<Props> = ({ voteResults, voted, countryMap }) => {
  const myConstituency = useRecoilValue(constituencyState);
  const { isVerified } = useInitialState();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [width, setWidth] = useState<number>(380);

  useEffect(() => {
    setWidth(Dimensions.get('screen').width);
  }, []);

  const onChange = ({ screen }: { window: ScaledSize; screen: ScaledSize }) => {
    setWidth(screen.width);
  };

  useEffect(() => {
    const listener = Dimensions.addEventListener('change', onChange);
    return () => {
      listener.remove();
    };
  });

  const renderCommuntiyResult = (comunnityResults: CommunityVotes | CommunityConstituencyVotes) => {
    if (
      comunnityResults &&
      (comunnityResults.yes || comunnityResults.no || comunnityResults.abstination)
    ) {
      const votes = comunnityResults.total || 0;
      const data = [
        {
          label: 'Zustimmungen',
          percent: (comunnityResults.yes || 0) / votes,
          color: '#15C063',
          value: comunnityResults.yes,
        },
        {
          label: 'Enthaltungen',
          percent: (comunnityResults.abstination || 0) / votes,
          color: '#2C82E4',
          value: comunnityResults.abstination,
        },
        {
          label: 'Ablehnungen',
          percent: (comunnityResults.no || 0) / votes,
          color: '#EC3E31',
          value: comunnityResults.no,
        },
      ];

      const isConstituencyChart = 'constituency' in comunnityResults;

      const DynSvgComp = !isConstituencyChart
        ? GermanySvgComponent
        : myConstituency
        ? getConstituencySvgs(myConstituency).default
        : null;

      return (
        <PieChartWrapper key={myConstituency ? 'goverment' : 'constituency'}>
          <CommunitySegmentText>
            {!isConstituencyChart ? 'Deutschland' : `Wahlkreis ${myConstituency || ''}`}
          </CommunitySegmentText>
          {DynSvgComp ? (
            <SvgWrapper>
              <DynSvgComp
                width={60}
                height={36}
                childProps={{
                  fill: 'lightgrey',
                  stroke: 'none',
                  strokeWidth: !myConstituency ? '1%' : '2%',
                }}
              />
            </SvgWrapper>
          ) : null}
          <PieChart data={data} label={`${votes}`} subLabel="Abstimmende" showPercentage />
          <ChartLegend data={data} />
        </PieChartWrapper>
      );
    }
    return <ActivityIndicator />;
  };

  if (!voteResults || !voteResults.constituencies) {
    return null;
  }

  const screens = [renderCommuntiyResult(voteResults)];
  if (myConstituency && voteResults.constituencies[0]) {
    screens.push(renderCommuntiyResult(voteResults.constituencies[0]));
  }
  screens.push(countryMap);

  const renderItem = ({ item }: { item: JSX.Element; index: number }) => item;

  return (
    <Folding title="Communityergebnis" opened={!isVerified || voted} paddingHorizontal={0}>
      <SwiperStyled
        data={screens}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={MAX_WIDTH}
        onSnapToItem={setActiveSlide}
      />
      <CarouselPagination length={screens.length} active={activeSlide} />
      <RepresentativeText>
        Dieses Ergebnis wurde nicht auf seine Repräsentativität überprüft.
      </RepresentativeText>
    </Folding>
  );
};
