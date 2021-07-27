import React, { useContext } from 'react';
import { Bar } from '@democracy-deutschland/ui';
import * as S from './MatchesBar.styled';
import { getMatchingProcedures, pieChartData } from './MatchesBar.utils';
import { LocalVotesContext } from '../../../../context/LocalVotes';
import { theme } from '../../../../styles';
import { GetDeputy_deputy_matchesBar } from '../../../DeputyProfile/graphql/query/__generated__/GetDeputy';
import { LayoutChangeEvent } from 'react-native';

interface PreparedData {
  label: string;
  percent: number;
  value: number;
  total: number;
  color: string;
}

interface BarData {
  matches: PreparedData;
  missmatches: PreparedData;
}

export interface MatchesBarProps {
  decisions: GetDeputy_deputy_matchesBar[];
}

export const MatchesBar: React.FC<MatchesBarProps> = ({ decisions }) => {
  const { localVotes } = useContext(LocalVotesContext);
  const [width, setWidth] = React.useState(0);
  const votedProcedures = decisions.map(({ procedure, decision }) => ({
    procedureId: procedure.procedureId,
    decision,
  }));

  const chartData = {
    localVotes,
    votedProcedures,
  };

  const matchingProcedures = getMatchingProcedures(chartData);

  const preparedData = pieChartData({
    ...chartData,
    matchingProcedures,
  });

  const barChartData = preparedData.reduce<BarData>((prev, renderer) => {
    prev[
      renderer.label === 'Differenzen' ? 'missmatches' : 'matches'
    ] = renderer;
    return prev;
  }, {} as BarData);

  const handleOnLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setWidth(nativeEvent.layout.width);
  };

  return (
    <S.Wrapper onLayout={handleOnLayout}>
      <S.BarWrapper width="100%" height={20}>
        <Bar
          width={width}
          height={20}
          data={[
            {
              value: barChartData.matches.value,
              color: theme.colors.vote.wom.match,
            },
            {
              value: barChartData.missmatches.value,
              color: theme.colors.vote.wom.missmatch,
            },
          ]}
          active
        />
      </S.BarWrapper>
    </S.Wrapper>
  );
};
