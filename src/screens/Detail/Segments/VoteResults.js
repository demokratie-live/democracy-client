import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { VictoryPie } from "victory-native";

const VoteResultsWrapper = styled.View`
  height: 400;
  justify-content: center;
  align-items: center;
`;

const VoteResultNumbers = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

const VoteResult = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const VoteResultNumber = styled.Text`
  color: #4a4a4a;
  font-size: 12;
`;
const VoteResultLabel = styled.Text`
  color: #d5d5d5;
  font-size: 10;
`;

const VoteResults = ({ voteResults }) => (
  <VoteResultsWrapper>
    <VictoryPie
      allowZoom={false}
      width={400}
      height={400}
      colorScale={["#99C93E", "#D43194", "#4CB0D8", "#B1B3B4"]}
      data={[
        { x: 1, y: voteResults.yes, label: " " },
        { x: 2, y: voteResults.no, label: " " },
        { x: 3, y: voteResults.abstination, label: " " },
        { x: 4, y: voteResults.notVote, label: " " }
      ]}
      innerRadius={68}
      labelRadius={100}
      style={{ labels: { fontSize: 20, fill: "white" } }}
    />
    <VoteResultNumbers>
      <VoteResult>
        <VoteResultNumber>{voteResults.yes}</VoteResultNumber>
        <VoteResultLabel>Ja</VoteResultLabel>
      </VoteResult>
      <VoteResult>
        <VoteResultNumber>{voteResults.no}</VoteResultNumber>
        <VoteResultLabel>Nein</VoteResultLabel>
      </VoteResult>
      <VoteResult>
        <VoteResultNumber>{voteResults.abstination}</VoteResultNumber>
        <VoteResultLabel>Enthalten</VoteResultLabel>
      </VoteResult>
      <VoteResult>
        <VoteResultNumber>{voteResults.notVote}</VoteResultNumber>
        <VoteResultLabel>Nicht abg.</VoteResultLabel>
      </VoteResult>
    </VoteResultNumbers>
    {/* Andoid scroll fix */}
    <View
      style={{
        zIndex: 9999,
        position: "absolute",
        width: "100%",
        height: "100%"
      }}
    />
  </VoteResultsWrapper>
);

VoteResults.propTypes = {
  voteResults: PropTypes.shape({
    yes: PropTypes.number.isRequired,
    no: PropTypes.number.isRequired,
    abstination: PropTypes.number.isRequired,
    notVote: PropTypes.number.isRequired
  }).isRequired
};

VoteResults.defaultProps = {};

export default VoteResults;
