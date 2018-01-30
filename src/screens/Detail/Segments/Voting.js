import React from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
`;

const VoteWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const VoteButton = styled.Image``;

const Voting = () => (
  <Wrapper>
    <VoteWrapper>
      <VoteButton source={require("../../../../assets/icons/voteYes.png")} />
      <VoteButton
        source={require("../../../../assets/icons/voteAbstention.png")}
      />
      <VoteButton source={require("../../../../assets/icons/voteNo.png")} />
    </VoteWrapper>
  </Wrapper>
);

export default Voting;
