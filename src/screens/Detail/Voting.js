import React from "react";
import styled from "styled-components/native";
import { graphql, compose } from "react-apollo";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";

import VOTE from "../../graphql/mutations/vote";
import VOTED from "../../graphql/queries/voted";

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
  width: 100%;
  max-width: 500;
  align-self: center;
  padding-horizontal: 18;
  padding-vertical: 11;
`;

const VoteIconButtonWrapper = styled.TouchableOpacity`
  width: 88;
  height: 88;
  border-width: 2;
  border-color: #a5c96c;
  border-radius: ${88 / 2};
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled, selection }) => {
    if (disabled) {
      return "grey";
    }
    switch (selection) {
      case "YES":
        return "#a2c76b";
      case "ABSTINATION":
        return "#4E7ED6";
      case "NO":
        return "#E33629";
      default:
        return "grey";
    }
  }};
`;

const VoteIconButton = styled(Ionicons).attrs({
  color: "#fff",
  size: 60,
  name: "ios-thumbs-up-outline"
})``;

const Title = styled.Text`
  flex: 1;
  font-size: 17;
`;

const Voting = ({ vote, procedure, voted }) => (
  <Wrapper>
    <SegmentWrapper>
      <Title>Abstimmen</Title>
    </SegmentWrapper>
    {/* <Content> */}
    <VoteWrapper>
      <VoteIconButtonWrapper
        disabled={voted}
        selection="YES"
        onPress={() => vote({ variables: { procedure, selection: "YES" } })}
      >
        <VoteIconButton />
      </VoteIconButtonWrapper>
      <VoteIconButtonWrapper
        style={{
          borderColor: "#4E92ED",
          transform: [{ rotate: "-75deg" }]
        }}
        selection="ABSTINATION"
        disabled={voted}
        onPress={() =>
          vote({ variables: { procedure, selection: "ABSTINATION" } })
        }
      >
        <VoteIconButton />
      </VoteIconButtonWrapper>
      <VoteIconButtonWrapper
        selection="NO"
        style={{
          borderColor: "#ED675B",
          transform: [{ rotate: "180deg" }]
        }}
        disabled={voted}
        onPress={() => vote({ variables: { procedure, selection: "No" } })}
      >
        <VoteIconButton />
      </VoteIconButtonWrapper>
    </VoteWrapper>
    {/* </Content> */}
  </Wrapper>
);

Voting.propTypes = {
  vote: PropTypes.func.isRequired,
  procedure: PropTypes.string.isRequired,
  voted: PropTypes.bool.isRequired
};

export default compose(
  graphql(VOTE, {
    name: "vote"
  }),
  graphql(VOTED, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: ({ data: { loading, votes } }) => ({
      voted: loading ? true : votes.voted
    })
  })
)(Voting);
