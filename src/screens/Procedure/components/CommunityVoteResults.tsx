import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollViewProps,
  useWindowDimensions,
} from "react-native";
import PieChart from "./Charts/PieChart";
import ChartLegend from "./Charts/ChartLegend";
import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { constituencyState } from "../../../api/state/constituency";
import { useInitialState } from "../../../api/state/initialState";
import Folding from "../../../components/Folding";
import {
  CommunityConstituencyVotes,
  CommunityVotes,
} from "../../../__generated__/graphql";
import GermanySvgComponent from "../../../components/svgs/GermanySVG";
import { getConstituencySvgs } from "../../../components/svgs/constituencies";
import { Pagination } from "@democracy-deutschland/ui";
import { PieChartWrapper, ScrollView } from "./Charts";

const RepresentativeText = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
  font-size: 12px;
  padding-top: ${({ theme }) => theme.spaces.default};
  padding-bottom: ${({ theme }) => theme.spaces.small};
  padding-horizontal: ${({ theme }) => theme.spaces.default};
`;

const CommunitySegmentText = styled.Text`
  align-self: flex-start;
  color: rgb(142, 142, 147);
  font-size: 12px;
  padding-bottom: 16px;
`;

const SvgWrapper = styled.View`
  position: absolute;
  top: 8px;
  right: 22px;
`;

interface Props {
  voteResults: CommunityVotes;
  voted: boolean;
  countryMap: React.ReactElement;
}

export const CommunityVoteResults: React.FC<Props> = ({
  voteResults,
  voted,
  countryMap,
}) => {
  const myConstituency = useRecoilValue(constituencyState);
  const { isVerified } = useInitialState();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { width } = useWindowDimensions();

  const renderCommuntiyResult = (
    comunnityResults: CommunityVotes | CommunityConstituencyVotes,
    key: string
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
          label: "Zustimmungen",
          percent: (comunnityResults.yes || 0) / votes,
          color: "#15C063",
          value: comunnityResults.yes,
        },
        {
          label: "Enthaltungen",
          percent: (comunnityResults.abstination || 0) / votes,
          color: "#2C82E4",
          value: comunnityResults.abstination,
        },
        {
          label: "Ablehnungen",
          percent: (comunnityResults.no || 0) / votes,
          color: "#EC3E31",
          value: comunnityResults.no,
        },
      ];

      const isConstituencyChart = "constituency" in comunnityResults;

      const DynSvgComp = !isConstituencyChart
        ? GermanySvgComponent
        : myConstituency
        ? getConstituencySvgs(myConstituency).default
        : null;

      return (
        <PieChartWrapper width={width} key={key}>
          <CommunitySegmentText>
            {!isConstituencyChart
              ? "Deutschland"
              : `Wahlkreis ${myConstituency || ""}`}
          </CommunitySegmentText>
          {DynSvgComp ? (
            <SvgWrapper>
              <DynSvgComp
                width={60}
                height={36}
                childProps={{
                  fill: "lightgrey",
                  stroke: "none",
                  strokeWidth: !myConstituency ? "1%" : "2%",
                }}
              />
            </SvgWrapper>
          ) : null}
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

  const screens = [renderCommuntiyResult(voteResults, "communityAll")];
  if (myConstituency && voteResults.constituencies[0]) {
    screens.push(
      renderCommuntiyResult(
        voteResults.constituencies[0],
        "communityConstituency"
      )
    );
  }
  screens.push(
    <PieChartWrapper width={width} key="countryMap">
      {countryMap}
    </PieChartWrapper>
  );

  const onMomentumScrollEnd: ScrollViewProps["onMomentumScrollEnd"] = ({
    nativeEvent,
  }) => {
    const index = Math.round(nativeEvent.contentOffset.x / width);
    if (index !== activeSlide) {
      setActiveSlide(index);
    }
  };

  return (
    <Folding
      title="Communityergebnis"
      opened={!isVerified || voted}
      paddingHorizontal={0}
    >
      <ScrollView onMomentumScrollEnd={onMomentumScrollEnd}>
        {screens}
      </ScrollView>
      <Pagination active={activeSlide} length={screens.length} />
      <RepresentativeText>
        Dieses Ergebnis wurde nicht auf seine Repräsentativität überprüft.
      </RepresentativeText>
    </Folding>
  );
};
