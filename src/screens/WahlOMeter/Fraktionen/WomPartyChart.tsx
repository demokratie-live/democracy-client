import React, { useContext, useState } from "react";
import { Dimensions } from "react-native";
import Header from "../Header";
import ChartNote from "../ChartNote";
import { ChartData } from "../Bundestag/VotedProceduresWrapper";
import { Segment } from "../../Bundestag/List/Components/Segment";
import { WomPartyContext } from "./context";
import {
  BarChart,
  BarChartProps,
  ChartLegend,
  ChartLegendData,
  WomPartyChartData,
} from "@democracy-deutschland/ui";
import styled from "styled-components/native";
import { ParlamentIdentifier, parlaments } from "../../../api/state/parlament";
import { useLocalVotes } from "../../../api/state/localVotesStore";
import { usePartyChartDataQuery } from "../../../__generated__/graphql";
import { ListLoading } from "../../../components/ListLoading";
import NoVotesPlaceholder from "../NoVotesPlaceholder";
import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";

const MAX_WIDTH = Math.min(
  380,
  Dimensions.get("window").width,
  Dimensions.get("window").height
);

const Wrapper = styled.View`
  padding-top: 18px;
  align-self: stretch;
`;

const ChartWrapper = styled.View`
  padding-top: 18px;
  width: 100%;
  align-items: center;
`;

// interface Props {}

export const WomPartyChart: React.FC = () => {
  const { legislaturePeriod } = useLegislaturePeriodStore();
  const parlamentIdentifier = `BT-${legislaturePeriod}` as ParlamentIdentifier;
  const parlament = parlaments[parlamentIdentifier];
  const localVotes = useLocalVotes();
  const [selectedPartyIndex, setSelectedPartyIndex] = useState(0);
  const { setWomParty, party: womParty } = useContext(WomPartyContext);
  const { data: proceduresData } = usePartyChartDataQuery({
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
      period: parlament.period,
    },
  });

  let totalProcedures = 0;
  if (proceduresData && proceduresData.partyChartProcedures) {
    totalProcedures = proceduresData.partyChartProcedures.total || 0;
  }
  if (!proceduresData) {
    return <ListLoading />;
  }

  // Filtered Array of procedures voted local
  const getMatchingProcedures = ({
    votedProcedures,
    localVotes,
  }: ChartData) => {
    return votedProcedures.partyChartProcedures.procedures.filter(
      ({ procedureId }) =>
        localVotes.find(({ procedureId: pid }) => pid === procedureId)
    );
  };

  const matchingProcedures = getMatchingProcedures({
    votedProcedures: proceduresData,
    localVotes,
  });

  const partyChartData = (): BarChartProps["data"] => {
    const chartData = matchingProcedures.reduce<{
      [party: string]: { diffs: number; matches: number };
    }>((prev, { voteResults, procedureId: itemProcedureId }) => {
      if (!voteResults) {
        return prev;
      }
      const { partyVotes } = voteResults;
      const userVote = localVotes.find(
        ({ procedureId: pid }) => pid === itemProcedureId
      );
      const me = userVote ? userVote.selection : undefined;
      partyVotes.forEach(({ party, main }) => {
        if (party === "fraktionslos") {
          return prev;
        }
        let matched = false;
        if (me === main) {
          matched = true;
        }

        if (prev[party] && matched) {
          prev = {
            ...prev,
            [party]: {
              ...prev[party],
              matches: prev[party].matches + 1,
            },
          };
        } else if (prev[party] && !matched) {
          prev = {
            ...prev,
            [party]: {
              ...prev[party],
              diffs: prev[party].diffs + 1,
            },
          };
        } else if (!prev[party] && matched) {
          prev = {
            ...prev,
            [party]: {
              diffs: 0,
              matches: 1,
            },
          };
        } else if (!prev[party] && !matched) {
          prev = {
            ...prev,
            [party]: {
              matches: 0,
              diffs: 1,
            },
          };
        }
      });
      return prev;
    }, {});
    return Object.keys(chartData)
      .map((key) => ({
        party: key,
        deviants: [
          {
            label: "Übereinstimmungen",
            value: chartData[key].matches,
            color: "#f5a623",
          },
          {
            label: "Differenzen",
            value: chartData[key].diffs,
            color: "#b1b3b4",
          },
        ],
      }))
      .sort((a, b) => b.deviants[0].value - a.deviants[0].value);
  };

  const prepareCharLegendData = (
    preparedData: WomPartyChartData[]
  ): ChartLegendData[] => {
    return [
      {
        label: "Übereinstimmungen",
        value: preparedData[selectedPartyIndex].deviants[0].value,
        color: "#f5a623",
      },
      {
        label: "Differenzen",
        value: preparedData[selectedPartyIndex].deviants[1].value,
        color: "#b1b3b4",
      },
    ];
  };

  const preparedData = partyChartData();
  if (!preparedData[selectedPartyIndex]) {
    return (
      <>
        <NoVotesPlaceholder subline="Fraktionen" />
        <Segment text="Abstimmungen" />
      </>
    );
  }
  if (!womParty) {
    setWomParty(preparedData[selectedPartyIndex].party);
  }

  const onClick = (index: number) => {
    setSelectedPartyIndex(index);
    setWomParty(preparedData[index].party);
  };

  return (
    <Wrapper>
      <Header
        totalProcedures={totalProcedures}
        votedProceduresCount={matchingProcedures.length}
      />
      <ChartWrapper>
        <BarChart
          width={MAX_WIDTH - 36}
          height={315}
          data={preparedData}
          setSelectedParty={onClick}
          selectedParty={selectedPartyIndex}
        />
        <ChartLegend data={prepareCharLegendData(preparedData)} />
        <ChartNote>
          Hohe Übereinstimmungen Ihrer Stellungnahmen mit mehreren Parteien
          bedeuten nicht zwangsläufig eine inhaltliche Nähe dieser Parteien
          zueinander
        </ChartNote>
      </ChartWrapper>

      <Segment text="Abstimmungen" />
    </Wrapper>
  );
};
