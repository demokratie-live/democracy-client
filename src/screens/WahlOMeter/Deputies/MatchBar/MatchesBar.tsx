import React from "react";
import { Bar } from "@democracy-deutschland/ui";
import * as S from "./MatchesBar.styled";
import { getMatchingProcedures, pieChartData } from "./MatchesBar.utils";
import { LayoutChangeEvent } from "react-native";
import { useLocalVotes } from "../../../../api/state/localVotesStore";
import { GetDeputyQuery } from "../../../../__generated__/graphql";
import { useTheme } from "styled-components/native";

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
  decisions: Exclude<GetDeputyQuery["deputy"], undefined | null>["matchesBar"];
}

export const MatchesBar: React.FC<MatchesBarProps> = ({ decisions }) => {
  const localVotes = useLocalVotes();
  const [width, setWidth] = React.useState(0);
  const theme = useTheme();
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
    prev[renderer.label === "Differenzen" ? "missmatches" : "matches"] =
      renderer;
    return prev;
  }, {} as BarData);

  const handleOnLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setWidth(nativeEvent.layout.width);
  };

  return barChartData.matches.value + barChartData.missmatches.value > 0 ? (
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
  ) : null;
};
