import React, { useContext } from 'react';
import { Bar, ChartLegend } from '@democracy-deutschland/ui';
import * as S from './MatchesBar.styled';
import { getMatchingProcedures, pieChartData } from './MatchesBar.utils';
import { LocalVotesContext } from '../../../../context/LocalVotes';
import { GetDeputy_deputy_matchesBar } from '../../graphql/query/__generated__/GetDeputy';
import { theme } from '../../../../styles';

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

  return (
    <S.Wrapper>
      <S.BarWrapper width={300} height={30}>
        <Bar
          width={300}
          height={30}
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
      <S.ChartLegendWrapper>
        <ChartLegend data={preparedData} />
      </S.ChartLegendWrapper>
    </S.Wrapper>
  );
};
