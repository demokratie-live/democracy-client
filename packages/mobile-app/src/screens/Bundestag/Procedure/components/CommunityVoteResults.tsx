import React, { useContext } from 'react';
import { ActivityIndicator, Dimensions, Platform } from 'react-native';
// eslint-disable-next-line import/default
import Swiper from 'react-native-swiper'; // TODO Replace this library (it's not good maintained)
import styled from 'styled-components/native';
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

export const { width, height } = Dimensions.get('window');

const RepresentativeText = styled.Text`
  color: #9b9b9b;
  text-align: center;
  font-size: 12;
  padding-bottom: 18;
  padding-horizontal: 24;
`;

const CommunitySegmentText = styled.Text`
  color: rgb(142, 142, 147);
  font-size: 12;
  padding-top: 8;
  padding-bottom: 16;
`;

const PieChartWrapper = styled.View`
  align-self: center;
  padding-horizontal: 36;
  width: 100%;
  max-width: ${() =>
    Math.min(
      380,
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    )};
`;

const SvgWrapper = styled.View`
  position: absolute;
  top: 8;
  right: 22;
`;

const SwiperStyled = styled(Swiper).attrs({
  paginationStyle: { bottom: 14 },
})`
  height: ${Platform.OS === 'ios' ? 'auto' : 430};
  max-height: 430;
`;

interface Props {
  voteResults: Procedure_procedure_communityVotes;
}

export const CommunityVoteResults: React.FC<Props> = ({ voteResults }) => {
  const { constituency: myConstituency } = useContext(ConstituencyContext);
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
          <PieChart data={data} label={`${votes}`} subLabel="Abstimmende" />
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
  if (myConstituency) {
    screens.push(renderCommuntiyResult(voteResults.constituencies[0]));
  }
  return (
    <Folding title="Communityergebnis" opened>
      <SwiperStyled loop={false}>{screens}</SwiperStyled>
      <RepresentativeText>
        Dieses Ergebnis wurde nicht auf seine Repräsentativität überprüft.
      </RepresentativeText>
    </Folding>
  );
};
