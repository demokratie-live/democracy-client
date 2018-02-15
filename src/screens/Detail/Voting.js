import React from "react";
import styled from "styled-components/native";

const SegmentWrapper = styled.View`
  padding-vertical: 10;
  padding-horizontal: 18;
  flex-direction: row;
  border-bottom-width: 1;
  border-bottom-color: rgba(68, 148, 211, 0.1);
  align-items: center;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const VoteWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const VoteButton = styled.Image``;

const Title = styled.Text`
  flex: 1;
  font-size: 17;
`;

const Content = styled.View`
  display: flex;
  padding-horizontal: 16;
  padding-vertical: 10;
`;

const Voting = () => (
  <Wrapper>
    <SegmentWrapper>
      <Title>Abstimmen</Title>
    </SegmentWrapper>
    <Content>
      <VoteWrapper>
        <VoteButton source={require("../../../assets/icons/voteYes.png")} />
        <VoteButton
          source={require("../../../assets/icons/voteAbstention.png")}
        />
        <VoteButton source={require("../../../assets/icons/voteNo.png")} />
      </VoteWrapper>
    </Content>
  </Wrapper>
);

export default Voting;
