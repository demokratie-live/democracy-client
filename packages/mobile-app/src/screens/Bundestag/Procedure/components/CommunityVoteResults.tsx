import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScaledSize } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// Components
import getConstituencySvgs from './svgs/constituencies';
import GermanySvgComponent from './svgs/GermanySVG';
// // GraphQL
// import GET_CONSTITUENCY from '../../../../graphql/queries/local/constituency';
// import Segment from '../../Segment';
import PieChart from './Charts/PieChart';
import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import ChartLegend from './Charts/ChartLegend';
import {
  Procedure_procedure_communityVotes,
  Procedure_procedure_communityVotes_constituencies,
} from '../graphql/query/__generated__/Procedure';
import { ConstituencyContext } from '../../../../context/Constituency';
import { InitialStateContext } from '../../../../context/InitialStates';
import { styled } from '../../../../styles';
import { CarouselPagination } from '../../../../components/misc/Pagination';

export const { width: initWidth } = Dimensions.get('window');

const MAX_WIDTH = Math.min(
  380,
  Dimensions.get('window').width,
  Dimensions.get('window').height,
);

const RepresentativeText = styled.Text`
  color: ${({ theme }) => theme.textColors.secondary};
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

const SwiperStyled = styled(Carousel).attrs({
  paddingTop: 10,
  paginationStyle: { bottom: 14 },
})`
  max-height: 430px;
`;

interface Props {
  voteResults: Procedure_procedure_communityVotes;
  voted: boolean;
  countryMap: React.ReactElement;
}

export const CommunityVoteResults: React.FC<Props> = ({
  voteResults,
  voted,
  countryMap,
}) => {
  const { constituency: myConstituency } = useContext(ConstituencyContext);
  const { isVerified } = useContext(InitialStateContext);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [width, setWidth] = useState<number>(initWidth);

  const onChange = ({ screen }: { window: ScaledSize; screen: ScaledSize }) => {
    setWidth(screen.width);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  const renderCommuntiyResult = (
    comunnityResults:
      | Procedure_procedure_communityVotes
      | Procedure_procedure_communityVotes_constituencies,
  ) => {
    if (
      comunnityResults &&
      (comunnityResults.yes ||
        comunnityResults.no ||
        comunnityResults.abstination)
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
        : getConstituencySvgs(myConstituency).default;

      return (
        <PieChartWrapper key={myConstituency ? 'goverment' : 'constituency'}>
          <CommunitySegmentText>
            {!isConstituencyChart
              ? 'Deutschland'
              : `Wahlkreis ${myConstituency}`}
          </CommunitySegmentText>
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
          <PieChart
            data={data}
            label={`${votes}`}
            subLabel="Abstimmende"
            showPercentage
          />
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

  const renderItem = ({ item }: any) => item;

  return (
    <Folding
      title="Communityergebnis"
      opened={!isVerified || voted}
      paddingHorizontal={0}>
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
